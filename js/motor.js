// ENGRANE · motor de actividades: práctica, contra reloj, jefe final, examen, repaso, lección y memorama
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;

  // ═════════════ Selección de preguntas ═════════════
  const Selector = {
    mapa(estado) {
      const m = {};
      ((estado && estado.estado) || []).forEach((e) => (m[e.p] = e));
      return m;
    },
    priorizar(lista, mapa, n) {
      const puntos = (p) => {
        const e = mapa[p.id];
        let s = Math.random() * 2;
        if (!e) s += 3;
        else if (e.c === 1) s += 4;
        else if (e.c === 2) s += 2;
        else s += 0.4;
        return s;
      };
      return lista
        .map((p) => [puntos(p), p])
        .sort((a, b) => b[0] - a[0])
        .slice(0, n)
        .map((x) => x[1]);
    },
    // reparte n preguntas entre varios temas (para exámenes y diagnósticos)
    repartir(temas, n, filtro = () => true) {
      const colas = ENG.barajar(temas).map((t) => ENG.barajar(t.preguntas.filter(filtro)));
      const out = [];
      let i = 0;
      while (out.length < n && colas.some((c) => c.length)) {
        const c = colas[i % colas.length];
        if (c.length) out.push(c.pop());
        i++;
      }
      return ENG.barajar(out);
    },
    practica(tema, estado, n = 10) {
      // máximo 2 de pronunciación por práctica
      const elegidas = Selector.priorizar(tema.preguntas, Selector.mapa(estado), tema.preguntas.length);
      const out = [];
      let ha = 0;
      for (const p of elegidas) {
        if (out.length >= n) break;
        if (p.tipo === 'ha' && ha >= 2) continue;
        if (p.tipo === 'ha') ha++;
        out.push(p);
      }
      return ENG.barajar(out);
    },
    jefe(tema) {
      const base = tema.preguntas.filter((p) => p.tipo !== 'ha');
      const dificiles = base.filter((p) => p.nivel >= 2);
      const resto = base.filter((p) => p.nivel < 2);
      return ENG.barajar([...ENG.barajar(dificiles), ...ENG.barajar(resto)].slice(0, 10));
    },
    // Contra reloj: preguntas rápidas (opción y V/F); si el tema tiene pocas (p. ej. Matemáticas), suma las numéricas y de completar
    reloj: (preguntas) => {
      const rapidas = preguntas.filter((p) => p.tipo === 'om' || p.tipo === 'vf');
      return ENG.barajar(rapidas.length >= 8 ? rapidas : preguntas.filter((p) => ['om', 'vf', 'nu', 'co'].includes(p.tipo)));
    },
    diagnostico: (mid) => {
      const temas = ENG.Banco.temasDe(mid);
      return Selector.repartir(temas, Math.min(30, temas.length * 2), (p) => p.nivel <= 2 && p.tipo !== 'ha');
    },
    examen: (mid, sub, n = 20) => Selector.repartir(ENG.Banco.temasDe(mid, sub), n, (p) => p.tipo !== 'ha'),
    mezcla(mid, estado) {
      const mapa = Selector.mapa(estado);
      const m = ENG.MATERIAS[mid];
      return ENG.barajar(m.subs.flatMap((s) => Selector.priorizar(ENG.Banco.preguntasDe(mid, s.id), mapa, 4)));
    },
    repaso(mid, estado, n = 15) {
      const hoy = ENG.hoy();
      return ENG.barajar(
        ((estado && estado.estado) || [])
          .filter((e) => e.m === mid && e.n <= hoy && ENG.Banco.preguntas[e.p])
          .sort((a, b) => a.c - b.c || (a.n < b.n ? -1 : 1))
          .slice(0, n)
          .map((e) => ENG.Banco.preguntas[e.p])
      );
    }
  };
  ENG.Selector = Selector;

  // ═════════════ XP por modo ═════════════
  function calcularXP(modo, ac, total, extra = {}) {
    const pct = total ? ac / total : 0;
    switch (modo) {
      case 'reloj': return ac * 6;
      case 'jefe': return ac * 12 + (pct >= 0.8 ? 80 : 0);
      case 'examen': return ac * 10 + ((extra.cal || 0) >= 9 ? 50 : 0);
      case 'diagnostico': return total * 5;
      default: return ac * 10 + (total >= 5 && pct >= 0.8 ? 20 : 0);
    }
  }

  const BIEN = ['¡Bien engranado!', '¡Exacto!', '¡Eso es!', '¡Correcto!', '¡Muy bien!', '¡Lo tienes!'];
  const MAL = ['Casi. Mira la clave:', 'Aquí se aprende. La clave:', 'No pasa nada, revisa esto:', 'Ups. Así va:'];

  const NOMBRE_MODO = {
    practica: 'Práctica', reloj: 'Contra reloj', jefe: 'Jefe final', examen: 'Examen simulado',
    repaso: 'Repaso de errores', diagnostico: 'Diagnóstico', mezcla: 'Clase mezclada', memorama: 'Memorama', leccion: 'Lección'
  };
  ENG.NOMBRE_MODO = NOMBRE_MODO;

  // ═════════════ Sesión ═════════════
  let S = null;
  let timer = null;

  function detener() {
    if (timer) clearInterval(timer);
    timer = null;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  function iniciar(cfg) {
    detener();
    if (!cfg.preguntas || !cfg.preguntas.length) {
      ENG.toast('No hay preguntas para esta actividad todavía', 'mal');
      return;
    }
    S = Object.assign(
      { feedback: true, tiempo: null, idx: 0, resp: [], inicio: Date.now(), restante: cfg.tiempo || null, terminado: false },
      cfg
    );
    S.anAntes = ENG.ctx.an;
    if (S.tiempo) {
      timer = setInterval(() => {
        S.restante--;
        const el = document.getElementById('reloj-num');
        if (el) {
          el.textContent = formatoReloj(S.restante);
          el.parentElement.classList.toggle('urgente', S.restante <= 10);
        }
        if (S.restante <= 0) terminar();
      }, 1000);
    }
    location.hash = '#/sesion';
    pintar();
  }

  const formatoReloj = (s) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

  function salir() {
    if (!S || S.terminado) return history.back();
    ENG.confirmar('¿Salir de la actividad? Lo que llevas no se guardará.', 'Salir', 'Seguir').then((si) => {
      if (si) {
        detener();
        S = null;
        history.back();
      }
    });
  }

  function pintar() {
    if (!S) return;
    const app = document.getElementById('app');
    const p = S.modo === 'reloj' ? S.preguntas[S.idx % S.preguntas.length] : S.preguntas[S.idx];
    if (!p) return terminar();
    S.actual = p;
    const total = S.preguntas.length;
    const progreso = S.modo === 'reloj' ? '' : `<div class="sesion-prog"><i style="width:${(S.idx / total) * 100}%"></i></div>`;
    const cont = S.modo === 'reloj' ? `<span class="chip">✔ ${S.resp.filter((r) => r.ok).length}</span>` : `<span class="chip">${S.idx + 1} / ${total}</span>`;
    const reloj = S.tiempo ? `<span class="chip reloj ${S.restante <= 10 ? 'urgente' : ''}">⏱ <b id="reloj-num">${formatoReloj(S.restante)}</b></span>` : '';
    const prueba = ENG.ctx.prueba ? `<div class="aviso-prueba">Modo prueba · no se guarda</div>` : '';
    app.innerHTML = `
      <section class="sesion" data-modo="${S.modo}">
        ${prueba}
        <div class="sesion-top">
          <button class="btn-ico" id="s-salir" aria-label="Salir">✕</button>
          <div class="sesion-titulo"><small>${esc(NOMBRE_MODO[S.modo] || '')}</small><b>${esc(S.titulo || '')}</b></div>
          ${reloj}${cont}
        </div>
        ${progreso}
        <article class="preg card" id="preg">
          ${p.fig ? ENG.figura(p.fig) : ''}
          ${p.audio ? `<div class="audio-fila"><button class="btn sec" id="s-audio">🔊 Escuchar</button><button class="btn fant" id="s-audio-lento">🐢 Lento</button></div>` : ''}
          <p class="preg-txt">${formatear(p.q)}</p>
          <div id="resp-zona"></div>
        </article>
        <div id="retro"></div>
      </section>`;
    document.getElementById('s-salir').onclick = salir;
    if (p.audio) {
      document.getElementById('s-audio').onclick = () => ENG.hablar(p.audio);
      document.getElementById('s-audio-lento').onclick = () => ENG.hablar(p.audio, 'en-US', true);
      setTimeout(() => ENG.hablar(p.audio), 350);
    }
    pintarRespuesta(p, document.getElementById('resp-zona'));
    window.scrollTo(0, 0);
  }

  // **negritas** y ___ visibles
  function formatear(t) {
    return esc(t)
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/_{3,}/g, '<span class="hueco">_____</span>')
      .replace(/\n/g, '<br>');
  }
  ENG.formatear = formatear;

  function pintarRespuesta(p, zona) {
    const bloquear = () => zona.querySelectorAll('button,input,select').forEach((b) => (b.disabled = true));
    if (p.tipo === 'om' || p.tipo === 'vf') {
      const ops = p.tipo === 'vf' ? [['Verdadero', true], ['Falso', false]] : ENG.barajar(p.ops.map((o, i) => [o, i]));
      zona.innerHTML = `<div class="ops ${p.tipo === 'vf' ? 'vf' : ''}">${ops
        .map(([t, v], i) => `<button class="op" data-i="${i}">${p.tipo === 'om' ? `<span class="op-letra">${'ABCDEF'[i]}</span>` : ''}<span>${formatear(t)}</span></button>`)
        .join('')}</div>`;
      zona.querySelectorAll('.op').forEach((b) => {
        b.onclick = () => {
          const [, v] = ops[+b.dataset.i];
          const ok = v === p.ok;
          bloquear();
          b.classList.add(S.feedback || S.modo === 'reloj' ? (ok ? 'bien' : 'mal') : 'elegida');
          if (S.feedback && !ok) {
            const ci = ops.findIndex(([, vv]) => vv === p.ok);
            zona.querySelectorAll('.op')[ci].classList.add('bien');
          }
          responder(ok, ops[+b.dataset.i][0]);
        };
      });
      return;
    }
    if (p.tipo === 'co' || p.tipo === 'nu') {
      zona.innerHTML = `<form class="escribe" autocomplete="off">
          <input id="r-in" ${p.tipo === 'nu' ? 'inputmode="decimal"' : 'autocapitalize="off" spellcheck="false"'} placeholder="${p.tipo === 'nu' ? 'Tu resultado' : 'Escribe tu respuesta'}">
          ${p.tipo === 'nu' && p.u ? `<span class="unidad">${esc(p.u)}</span>` : ''}
        </form>
        <button class="btn pri ancho" id="r-ok">Comprobar</button>`;
      const inp = zona.querySelector('#r-in');
      const enviar = (e) => {
        e && e.preventDefault();
        const v = inp.value;
        if (!v.trim()) return inp.focus();
        let ok;
        if (p.tipo === 'nu') {
          const x = ENG.numero(v);
          ok = !isNaN(x) && Math.abs(x - p.r) <= Math.max(Math.abs(p.r) * p.tol, 1e-9);
        } else {
          ok = p.r.some((r) => ENG.normaliza(r) === ENG.normaliza(v));
        }
        bloquear();
        inp.classList.add(S.feedback || S.modo === 'reloj' ? (ok ? 'bien' : 'mal') : 'elegida');
        responder(ok, v);
      };
      zona.querySelector('form').onsubmit = enviar;
      zona.querySelector('#r-ok').onclick = enviar;
      setTimeout(() => inp.focus(), 80);
      return;
    }
    if (p.tipo === 'or') {
      const banco = ENG.barajar(p.partes.map((t, i) => ({ t, i })));
      if (banco.every((x, k) => x.i === k) && banco.length > 1) banco.reverse();
      const elegidos = [];
      const dibujar = () => {
        zona.innerHTML = `<div class="ordena-resp">${elegidos.length ? elegidos.map((x, k) => `<button class="chip-or puesto" data-k="${k}">${esc(x.t)}</button>`).join('') : '<span class="ordena-vacio">Toca las piezas en orden ⬇</span>'}</div>
          <div class="ordena-banco">${banco.map((x, k) => `<button class="chip-or" data-b="${k}">${esc(x.t)}</button>`).join('')}</div>
          <button class="btn pri ancho" id="r-ok" ${banco.length ? 'disabled' : ''}>Comprobar</button>`;
        zona.querySelectorAll('[data-b]').forEach((b) => (b.onclick = () => { elegidos.push(banco.splice(+b.dataset.b, 1)[0]); dibujar(); }));
        zona.querySelectorAll('[data-k]').forEach((b) => (b.onclick = () => { banco.push(elegidos.splice(+b.dataset.k, 1)[0]); dibujar(); }));
        zona.querySelector('#r-ok').onclick = () => {
          const ok = elegidos.every((x, k) => p.partes[k] === x.t);
          bloquear();
          zona.querySelector('.ordena-resp').classList.add(S.feedback ? (ok ? 'bien' : 'mal') : 'elegida');
          responder(ok, elegidos.map((x) => x.t).join(' | '));
        };
      };
      dibujar();
      return;
    }
    if (p.tipo === 'ha') {
      pintarHabla(p, zona, bloquear);
      return;
    }
    if (p.tipo === 're') {
      const der = ENG.barajar(p.pares.map((x) => x[1]));
      zona.innerHTML = `<div class="relaciona">${p.pares
        .map(([izq], i) => `<label class="rel-fila"><span>${esc(izq)}</span><select data-i="${i}"><option value="">— elige —</option>${der.map((d) => `<option>${esc(d)}</option>`).join('')}</select></label>`)
        .join('')}</div><button class="btn pri ancho" id="r-ok">Comprobar</button>`;
      zona.querySelector('#r-ok').onclick = () => {
        const sels = [...zona.querySelectorAll('select')];
        if (sels.some((s) => !s.value)) return ENG.toast('Completa todas las parejas', 'mal');
        let ok = true;
        sels.forEach((s) => {
          const bien = s.value === p.pares[+s.dataset.i][1];
          if (!bien) ok = false;
          if (S.feedback) s.classList.add(bien ? 'bien' : 'mal');
        });
        bloquear();
        responder(ok, sels.map((s) => s.value).join(' | '));
      };
    }
  }

  // ── Pronunciación con micrófono (Web Speech API) ──
  const palabras = (t) => ENG.normaliza(t).replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean);
  function similitud(objetivo, dicho) {
    const a = palabras(objetivo), b = palabras(dicho);
    if (!a.length) return { pct: 0, marcas: [] };
    const L = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) L[i][j] = a[i - 1] === b[j - 1] ? L[i - 1][j - 1] + 1 : Math.max(L[i - 1][j], L[i][j - 1]);
    const marcas = Array(a.length).fill(false);
    for (let i = a.length, j = b.length; i > 0 && j > 0; ) {
      if (a[i - 1] === b[j - 1]) { marcas[i - 1] = true; i--; j--; } else if (L[i - 1][j] >= L[i][j - 1]) i--; else j--;
    }
    return { pct: L[a.length][b.length] / a.length, marcas, a };
  }
  ENG.similitud = similitud;
  function pintarHabla(p, zona, bloquear) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const frase = `<p class="frase-objetivo" id="h-frase">${esc(p.r)}</p>`;
    const oir = `<div class="audio-fila"><button class="btn sec" id="h-oir">🔊 Escuchar</button><button class="btn fant" id="h-lento">🐢 Lento</button></div>`;
    const autoevalua = (motivo) => {
      zona.innerHTML = `${frase}${oir}<p class="peq">${motivo} Escucha la frase, dila en voz alta y califícate con honestidad:</p>
        <div class="ops vf"><button class="op" data-a="1">✔ Lo dije bien</button><button class="op" data-a="0">✖ Me trabé</button></div>`;
      conectarOir();
      zona.querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => { bloquear(); responder(b.dataset.a === '1', b.dataset.a === '1' ? '(autoevaluado: bien)' : '(autoevaluado: me trabé)'); }));
    };
    const conectarOir = () => {
      zona.querySelector('#h-oir').onclick = () => ENG.hablar(p.r);
      zona.querySelector('#h-lento').onclick = () => ENG.hablar(p.r, 'en-US', true);
    };
    if (!SR) return autoevalua('Este navegador no permite usar el micrófono aquí (en Android funciona con Chrome).');
    let intentos = 0;
    const pintar = (estado = '') => {
      zona.innerHTML = `${frase}${oir}<button class="btn pri grande ancho" id="h-mic">🎤 Toca y lee en voz alta</button><p class="peq centro" id="h-estado">${estado}</p>
        <button class="btn fant ancho" id="h-nomic">🙊 Ahora no puedo usar el micrófono</button>`;
      conectarOir();
      zona.querySelector('#h-mic').onclick = escuchar;
      zona.querySelector('#h-nomic').onclick = () => autoevalua('Sin micrófono:');
    };
    const escuchar = () => {
      const rec = new SR();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      const btn = zona.querySelector('#h-mic');
      btn.disabled = true;
      btn.textContent = '🎙 Te escucho… habla ahora';
      btn.classList.add('grabando');
      let listo = false;
      rec.onresult = (e) => {
        listo = true;
        const alts = [...e.results[0]].map((r) => r.transcript);
        const mejor = alts.map((t) => ({ t, s: similitud(p.r, t) })).sort((x, y) => y.s.pct - x.s.pct)[0];
        const ok = mejor.s.pct >= 0.7;
        intentos++;
        const marcado = mejor.s.a.map((w, i) => `<span class="${mejor.s.marcas[i] ? 'w-ok' : 'w-mal'}">${esc(w)}</span>`).join(' ');
        if (!ok && intentos < 2) {
          pintar(`Escuché: «${esc(mejor.t)}» (${Math.round(mejor.s.pct * 100)}%). ¡Intenta otra vez!`);
          zona.querySelector('#h-frase').innerHTML = marcado;
          return;
        }
        bloquear();
        zona.querySelector('#h-frase').innerHTML = marcado;
        const est = zona.querySelector('#h-estado') || document.createElement('p');
        est.textContent = `Escuché: «${mejor.t}» · ${Math.round(mejor.s.pct * 100)}% de la frase`;
        responder(ok, mejor.t);
      };
      rec.onerror = (e) => {
        listo = true;
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') return autoevalua('No hay permiso para el micrófono.');
        if (e.error === 'network') return autoevalua('El reconocimiento de voz necesita internet.');
        pintar(e.error === 'no-speech' ? 'No te escuché. Acércate al celular y vuelve a intentarlo.' : 'No se pudo escuchar. Intenta de nuevo.');
      };
      rec.onend = () => { if (!listo) pintar('No te escuché. Vuelve a intentarlo.'); };
      try { rec.start(); } catch (err) { autoevalua('No se pudo abrir el micrófono.'); }
    };
    pintar();
  }

  function respuestaCorrecta(p) {
    switch (p.tipo) {
      case 'om': return p.ops[p.ok];
      case 'vf': return p.ok ? 'Verdadero' : 'Falso';
      case 'co': return p.r[0];
      case 'nu': return `${p.r} ${p.u || ''}`.trim();
      case 'or': return p.partes.join(p.partes.every((x) => !/\s/.test(x)) ? ' ' : ' → ');
      case 're': return p.pares.map(([a, b]) => `${a} = ${b}`).join(' · ');
      case 'ha': return p.r;
    }
    return '';
  }
  ENG.respuestaCorrecta = respuestaCorrecta;

  function responder(ok, dada) {
    const p = S.actual;
    S.resp.push({ p: p.id, ok, t: p.tema, dada });
    ENG.sonido(ok ? 'ok' : 'mal');
    if (!ok) ENG.vibrar(40);
    if (S.modo === 'reloj') {
      setTimeout(() => {
        if (S && !S.terminado) {
          S.idx++;
          pintar();
        }
      }, ok ? 260 : 650);
      return;
    }
    if (!S.feedback) {
      setTimeout(() => siguiente(), 380);
      return;
    }
    const retro = document.getElementById('retro');
    retro.innerHTML = `<div class="retro ${ok ? 'bien' : 'mal'}">
        <b>${ok ? ENG.azar(BIEN) : ENG.azar(MAL)}</b>
        ${ok ? '' : `<p class="retro-resp">Respuesta: <b>${formatear(respuestaCorrecta(p))}</b></p>`}
        ${p.exp ? `<p>${formatear(p.exp)}</p>` : ''}
        <button class="btn ${ok ? 'pri' : 'osc'} ancho" id="r-sig">Continuar</button>
      </div>`;
    const b = document.getElementById('r-sig');
    b.onclick = siguiente;
    setTimeout(() => b.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60);
  }

  function siguiente() {
    if (!S) return;
    S.idx++;
    if (S.idx >= S.preguntas.length) terminar();
    else pintar();
  }

  async function terminar() {
    if (!S || S.terminado) return;
    S.terminado = true;
    detener();
    const total = S.resp.length;
    const ac = S.resp.filter((r) => r.ok).length;
    const seg = Math.round((Date.now() - S.inicio) / 1000);
    const usaCal = S.modo === 'examen' || S.modo === 'jefe' || S.modo === 'diagnostico';
    const cal = usaCal ? ENG.Progreso.calificacion(ac, total) : null;
    const xp = calcularXP(S.modo, ac, total, { cal });
    const intento = {
      materia: S.materia, tema: S.tema || null, modo: S.modo, aciertos: ac, total, calificacion: cal, xp, segundos: seg,
      detalle: S.resp.map((r) => ({ p: r.p, ok: r.ok }))
    };
    const respuestas = S.resp.map((r) => ({ p: r.p, ok: r.ok, t: r.t }));
    const res = await guardarIntento(intento, respuestas);
    pintarResultado({ intento, res });
  }

  async function guardarIntento(intento, respuestas) {
    if (ENG.ctx.prueba || ENG.ctx.rol !== 'alumno') return { prueba: true };
    // Actualiza el estado local al instante (por si no hay internet)
    const est = ENG.ctx.estado;
    intento.creado = new Date().toISOString();
    est.intentos.push(Object.assign({ id: 'local' }, intento));
    est.xp_total = (est.xp_total || 0) + intento.xp;
    const hoy = ENG.hoy();
    respuestas.forEach((r) => {
      let e = est.estado.find((x) => x.p === r.p);
      if (!e) est.estado.push((e = { p: r.p, m: intento.materia, t: r.t, c: 0, a: 0, f: 0, n: hoy }));
      e.c = r.ok ? Math.min((e.c || 1) + 1, 5) : 1;
      e.n = r.ok ? ENG.sumarDias(hoy, [1, 2, 4, 7, 14][e.c - 1]) : hoy;
    });
    ENG.ctx.an = ENG.Progreso.analizar(est);
    try {
      const r = await ENG.API.alumnoGuardar(ENG.ctx.codigo, intento, respuestas);
      if (!r.offline) ENG.recargarEstado && ENG.recargarEstado(true);
      return r;
    } catch (e) {
      ENG.toast('No se pudo guardar: ' + e.message, 'mal');
      return { error: true };
    }
  }
  ENG.guardarIntento = guardarIntento;

  function pintarResultado({ intento, res }) {
    const app = document.getElementById('app');
    const { aciertos: ac, total, xp, calificacion: cal, modo } = intento;
    const pct = total ? Math.round((ac / total) * 100) : 0;
    const antes = S.anAntes;
    const despues = ENG.ctx.an;
    const subio = antes && despues && despues.nivel.n > antes.nivel.n;
    const nuevas = antes && despues ? despues.insignias.filter((x) => x.logrado && !antes.insignias.find((y) => y.id === x.id).logrado) : [];
    const errores = S.resp.filter((r) => !r.ok);
    const m = ENG.MATERIAS[S.materia];
    let titulo = pct >= 90 ? '¡Excelente!' : pct >= 80 ? '¡Muy bien!' : pct >= 60 ? '¡Vas bien!' : 'Cada intento cuenta';
    let sub = '';
    if (modo === 'jefe') {
      titulo = pct >= 80 ? '🛡️ ¡Jefe vencido! Tema dominado' : 'El jefe resistió… ¡revancha!';
      sub = pct >= 80 ? '' : 'Necesitas 8 de 10. Practica los errores y vuelve.';
    }
    if (modo === 'examen') {
      const ap = cal >= (m ? m.aprobatoria : 6);
      sub = `Calificación estilo boleta: <b class="${ap ? 'txt-verde' : 'txt-rojo'}">${cal}</b> ${ap ? '(aprobado)' : `(mínimo ${m ? m.aprobatoria : 6})`}`;
    }
    if (modo === 'reloj') titulo = `⚡ ${ac} aciertos en ${S.tiempo} s`;
    if (modo === 'diagnostico') {
      titulo = '🧭 Diagnóstico listo';
      sub = 'Ya marqué en el mapa qué temas dominas y cuáles reforzar.';
    }
    ENG.sonido(pct >= 60 ? 'fin' : 'mal');
    if (subio) setTimeout(() => ENG.sonido('nivel'), 500);
    app.innerHTML = `
      <section class="resultado">
        ${res && res.prueba ? `<div class="aviso-prueba">Modo prueba · este resultado no se guardó</div>` : ''}
        ${res && res.offline ? `<div class="aviso-prueba">Sin internet: se guardó en tu celular y se subirá solo.</div>` : ''}
        <div class="res-hero card">
          <div class="res-anillo" style="--p:${pct}">${ENG.engraneSVG({ tam: 120, texto: modo === 'reloj' ? ac : pct + '%', dientes: 12, color: pct >= 80 ? 'var(--verde)' : pct >= 60 ? 'var(--amarillo)' : 'var(--naranja)' })}</div>
          <h2>${titulo}</h2>
          ${modo !== 'reloj' ? `<p class="res-num">${ac} de ${total} correctas</p>` : ''}
          ${sub ? `<p>${sub}</p>` : ''}
          ${res && res.prueba ? '' : `<p class="xp-ganado">+${xp} XP</p>`}
        </div>
        ${subio ? `<div class="card subio">${ENG.engraneSVG({ tam: 54, texto: despues.nivel.n, clase: 'gira-una' })}<div><b>¡Subiste de nivel!</b><br>Ahora eres <b>${esc(despues.nivel.nombre)}</b></div></div>` : ''}
        ${nuevas.map((x) => `<div class="card insignia-nueva"><span class="ins-ico">${x.icono}</span><div><b>Nueva insignia: ${esc(x.nombre)}</b><br><small>${esc(x.desc)}</small></div></div>`).join('')}
        ${errores.length && modo !== 'reloj' ? `<h3 class="sec-tit">Para repasar (${errores.length})</h3>
          ${errores.map((r) => {
            const p = ENG.Banco.preguntas[r.p];
            return `<div class="card error-item"><p>${formatear(p.q)}</p>
              ${r.dada != null ? `<p class="tu-resp">Tu respuesta: ${esc(r.dada)}</p>` : ''}
              <p class="ok-resp">Correcta: <b>${formatear(respuestaCorrecta(p))}</b></p>
              ${p.exp ? `<p class="exp">${formatear(p.exp)}</p>` : ''}</div>`;
          }).join('')}` : ''}
        <div class="botonera">
          <button class="btn pri" id="res-otra">↻ Otra vez</button>
          <button class="btn sec" id="res-volver">Volver</button>
        </div>
      </section>`;
    document.getElementById('res-otra').onclick = () => S.repetir && S.repetir();
    document.getElementById('res-volver').onclick = () => {
      S = null;
      history.back();
    };
    window.scrollTo(0, 0);
  }

  // ═════════════ Lección ═════════════
  function leccion(tema) {
    detener();
    S = null;
    let i = 0;
    const tarjetas = tema.leccion || [];
    location.hash = '#/sesion';
    const pintarL = () => {
      const c = tarjetas[i];
      const app = document.getElementById('app');
      app.innerHTML = `<section class="sesion leccion">
        ${ENG.ctx.prueba ? `<div class="aviso-prueba">Modo prueba · no se guarda</div>` : ''}
        <div class="sesion-top"><button class="btn-ico" id="l-salir">✕</button>
          <div class="sesion-titulo"><small>Lección</small><b>${esc(tema.nombre)}</b></div><span class="chip">${i + 1} / ${tarjetas.length}</span></div>
        <div class="sesion-prog"><i style="width:${((i + 1) / tarjetas.length) * 100}%"></i></div>
        <article class="card tarjeta-leccion">
          <h2>${esc(c.t)}</h2>
          ${c.fig ? ENG.figura(c.fig) : ''}
          <div class="leccion-html">${c.h}</div>
        </article>
        <div class="botonera">
          <button class="btn sec" id="l-ant" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
          <button class="btn pri" id="l-sig">${i === tarjetas.length - 1 ? '¡Listo! ✔' : 'Siguiente →'}</button>
        </div></section>`;
      app.querySelectorAll('[data-fig]').forEach((el) => (el.outerHTML = ENG.figura(el.dataset.fig)));
      app.querySelectorAll('[data-hablar]').forEach((b) => (b.onclick = () => ENG.hablar(b.dataset.hablar)));
      document.getElementById('l-salir').onclick = () => history.back();
      document.getElementById('l-ant').onclick = () => { i--; pintarL(); };
      document.getElementById('l-sig').onclick = async () => {
        if (i < tarjetas.length - 1) { i++; pintarL(); window.scrollTo(0, 0); return; }
        const hoy = ENG.hoy();
        const yaHoy = (ENG.ctx.estado.intentos || []).some((x) => x.modo === 'leccion' && x.tema === tema.id && ENG.diaLocal(x.creado) === hoy);
        const xp = yaHoy ? 0 : 15;
        await guardarIntento({ materia: tema.materia, tema: tema.id, modo: 'leccion', aciertos: 0, total: 0, xp, segundos: 0, detalle: [] }, []);
        if (!ENG.ctx.prueba && xp) ENG.toast(`Lección terminada · +${xp} XP`, 'ok');
        history.back();
      };
      window.scrollTo(0, 0);
    };
    pintarL();
  }

  // ═════════════ Memorama ═════════════
  function memorama(tema) {
    detener();
    const pares = ENG.barajar(tema.pares || []).slice(0, 6);
    if (pares.length < 3) return ENG.toast('Este tema no tiene memorama', 'mal');
    S = { modo: 'memorama', materia: tema.materia, tema: tema.id, titulo: tema.nombre, resp: [], terminado: false, inicio: Date.now(), preguntas: [], anAntes: ENG.ctx.an, repetir: () => memorama(tema) };
    const cartas = ENG.barajar(pares.flatMap(([a, b], i) => [{ t: a, par: i, lado: 'a' }, { t: b, par: i, lado: 'b' }]));
    let abiertas = [];
    let movs = 0;
    let hechos = 0;
    location.hash = '#/sesion';
    const app = document.getElementById('app');
    app.innerHTML = `<section class="sesion">
      ${ENG.ctx.prueba ? `<div class="aviso-prueba">Modo prueba · no se guarda</div>` : ''}
      <div class="sesion-top"><button class="btn-ico" id="m-salir">✕</button>
        <div class="sesion-titulo"><small>Memorama</small><b>${esc(tema.nombre)}</b></div><span class="chip" id="m-movs">Movimientos: 0</span></div>
      <p class="ayuda-txt">Encuentra las parejas: cada carta tiene su compañera.</p>
      <div class="memo">${cartas.map((c, i) => `<button class="memo-carta" data-i="${i}"><span class="memo-frente">${ENG.engraneSVG({ tam: 30, color: 'rgba(255,255,255,.5)', centro: 'transparent' })}</span><span class="memo-dorso">${esc(c.t)}</span></button>`).join('')}</div>
    </section>`;
    document.getElementById('m-salir').onclick = () => history.back();
    app.querySelectorAll('.memo-carta').forEach((b) => {
      b.onclick = () => {
        const c = cartas[+b.dataset.i];
        if (b.classList.contains('abierta') || b.classList.contains('hecha') || abiertas.length === 2) return;
        b.classList.add('abierta');
        abiertas.push([b, c]);
        if (abiertas.length === 2) {
          movs++;
          document.getElementById('m-movs').textContent = `Movimientos: ${movs}`;
          const [[b1, c1], [b2, c2]] = abiertas;
          if (c1.par === c2.par && c1.lado !== c2.lado) {
            ENG.sonido('ok');
            setTimeout(() => {
              b1.classList.add('hecha');
              b2.classList.add('hecha');
              abiertas = [];
              hechos++;
              if (hechos === pares.length) finMemo();
            }, 350);
          } else {
            setTimeout(() => {
              b1.classList.remove('abierta');
              b2.classList.remove('abierta');
              abiertas = [];
            }, 900);
          }
        }
      };
    });
    async function finMemo() {
      S.terminado = true;
      const xp = 30 + (movs <= pares.length * 2 ? 20 : 0);
      const intento = { materia: tema.materia, tema: tema.id, modo: 'memorama', aciertos: pares.length, total: pares.length, xp, segundos: Math.round((Date.now() - S.inicio) / 1000), detalle: [] };
      const res = await guardarIntento(intento, []);
      S.tiempo = null;
      pintarResultado({ intento: Object.assign({}, intento, { aciertos: pares.length }), res });
      const h = document.querySelector('.res-hero h2');
      if (h) h.textContent = `🧩 ¡Memorama completo en ${movs} movimientos!`;
    }
  }

  ENG.Motor = { iniciar, detener, leccion, memorama, activo: () => !!S && !S.terminado, calcularXP };
})();
