// ENGRANE · Clase en vivo por equipos (el maestro proyecta; los alumnos contestan en su celular)
// Tiempo real con Supabase Realtime (broadcast). En modo demo usa BroadcastChannel entre pestañas.
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const COLORES = ['#F26B1D', '#1F6FEB', '#E0A800', '#14A05A'];
  const FORMAS = ['▲', '◆', '●', '■'];
  const EQUIPOS = [
    { n: 'Pistones', c: '#F26B1D', i: '🔶' }, { n: 'Servos', c: '#1F6FEB', i: '🔷' },
    { n: 'Engranes', c: '#14A05A', i: '🟢' }, { n: 'Bielas', c: '#8E44AD', i: '🟣' }
  ];
  const canalDe = (s) => `eng-sala-${s.id}-${s.pin}`;
  let H = null; // anfitrión (maestro)
  let A = null; // alumno

  // ══════════════════════════ MAESTRO ══════════════════════════
  function hostConfig() {
    if (H) return hostPintar();
    const p = ENG.ctx.perfil;
    const mats = Object.values(ENG.MATERIAS).filter((m) => m.disponible && (p.rol === 'admin' || (p.materias || []).includes(m.id)));
    if (!mats.length) {
      app().innerHTML = `<button class="volver" onclick="location.hash='#/inicio'">‹ Panel</button><div class="card vacio">No tienes materias con contenido asignadas.</div>`;
      return;
    }
    app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">🔴 Clase en vivo</h1>
      <p class="ayuda-txt">Proyecta esta pantalla. Los alumnos entran desde su Engrane (les aparece «Clase en vivo») o con el PIN, y contestan en su celular. Al final cada uno recibe su XP.</p>
      <form class="card form" id="f-clase" onsubmit="return false">
        <label class="campo"><span>Materia</span><select id="cl-mat">${mats.map((m) => `<option value="${m.id}">${m.icono} ${esc(m.nombre)}</option>`).join('')}</select></label>
        <div class="campo"><span>Temas</span><div class="checks" id="cl-temas"></div></div>
        <div class="dos-col">
          <label class="campo"><span>Preguntas</span><select id="cl-n"><option>5</option><option selected>10</option><option>15</option><option>20</option></select></label>
          <label class="campo"><span>Segundos por pregunta</span><select id="cl-t"><option>15</option><option selected>20</option><option>30</option><option>45</option></select></label>
        </div>
        <div class="dos-col">
          <label class="campo"><span>Modo</span><select id="cl-modo"><option value="equipos">Por equipos</option><option value="individual">Individual</option></select></label>
          <label class="campo"><span>Equipos</span><select id="cl-eq"><option>2</option><option selected>3</option><option>4</option></select></label>
        </div>
        <button class="btn pri grande ancho" id="cl-abrir">Abrir sala</button>
      </form>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    const pintarTemas = () => {
      const mid = document.getElementById('cl-mat').value;
      document.getElementById('cl-temas').innerHTML = `<label class="check"><input type="checkbox" id="cl-todos" checked><span><b>Todos</b></span></label>` +
        ENG.Banco.temasDe(mid).map((t) => `<label class="check"><input type="checkbox" class="cl-t" value="${t.id}" checked><span>${t.sub ? t.sub.toUpperCase() + ' · ' : ''}${esc(t.nombre)}</span></label>`).join('');
      document.getElementById('cl-todos').onchange = (e) => document.querySelectorAll('.cl-t').forEach((c) => (c.checked = e.target.checked));
    };
    document.getElementById('cl-mat').onchange = pintarTemas;
    pintarTemas();
    document.getElementById('cl-abrir').onclick = () => {
      const temas = [...document.querySelectorAll('.cl-t:checked')].map((c) => c.value);
      if (!temas.length) return ENG.toast('Elige al menos un tema', 'mal');
      hostAbrir({
        materia: document.getElementById('cl-mat').value, temas,
        n: +document.getElementById('cl-n').value, t: +document.getElementById('cl-t').value,
        modo: document.getElementById('cl-modo').value, equipos: +document.getElementById('cl-eq').value
      });
    };
  }

  function preparar(p) {
    if (p.tipo === 'vf') return { id: p.id, texto: p.q, tipo: 'vf', ops: ['Verdadero', 'Falso'], ok: p.ok ? 0 : 1, fig: p.fig, exp: p.exp };
    const orden = ENG.barajar(p.ops.map((o, i) => i)).slice(0, 4);
    if (!orden.includes(p.ok)) orden[0] = p.ok;
    const ops = ENG.barajar(orden);
    return { id: p.id, texto: p.q, tipo: 'om', ops: ops.map((i) => p.ops[i]), ok: ops.indexOf(p.ok), fig: p.fig, exp: p.exp };
  }

  async function hostAbrir(cfg) {
    const pool = ENG.barajar(cfg.temas.flatMap((t) => ENG.Banco.temas[t].preguntas).filter((p) => p.tipo === 'om' || p.tipo === 'vf'));
    if (!pool.length) return ENG.toast('Esos temas no tienen preguntas de opción múltiple', 'mal');
    let sala;
    try {
      sala = await ENG.API.salaCrear(cfg.materia, `${ENG.MATERIAS[cfg.materia].nombre}`);
    } catch (e) { return ENG.toast(e.message, 'mal'); }
    H = { cfg, sala, preguntas: pool.slice(0, cfg.n).map(preparar), jugadores: new Map(), idx: -1, fase: 'espera', resp: new Map(), inicio: 0, timer: null, guardado: false, conectado: false, t0: Date.now() };
    H.canal = ENG.API.canal(canalDe(sala))
      .on('unir', hostUnir)
      .on('respuesta', hostRespuesta)
      .conectar((ok, err) => {
        H && (H.conectado = ok);
        if (!ok) ENG.toast('No se pudo conectar en tiempo real (' + (err || 'sin conexión') + '). Revisa el LEEME: Realtime.', 'mal');
        hostPintar();
      });
    H.latido = setInterval(() => H && (H.fase === 'espera' || H.fase === 'pregunta') && enviarEstado(), 2500);
    hostPintar();
  }

  function equipoLibre() {
    const n = H.cfg.equipos;
    const cuenta = Array(n).fill(0);
    H.jugadores.forEach((j) => j.equipo != null && cuenta[j.equipo]++);
    return cuenta.indexOf(Math.min(...cuenta));
  }

  function hostUnir({ id, apodo }) {
    if (!H || !id) return;
    if (!H.jugadores.has(id)) {
      H.jugadores.set(id, { id, apodo: String(apodo || 'Alumno').slice(0, 40), equipo: H.cfg.modo === 'equipos' ? equipoLibre() : null, puntos: 0, aciertos: 0, respondidas: 0 });
      ENG.sonido('ok');
    }
    const j = H.jugadores.get(id);
    H.canal.enviar('bienvenida', { id, equipo: j.equipo, modo: H.cfg.modo });
    enviarEstado();
    if (H.fase === 'espera') hostPintar();
  }

  function ranking() {
    return [...H.jugadores.values()].sort((a, b) => b.puntos - a.puntos || b.aciertos - a.aciertos);
  }
  function equipos() {
    if (H.cfg.modo !== 'equipos') return [];
    return EQUIPOS.slice(0, H.cfg.equipos).map((e, i) => {
      const m = [...H.jugadores.values()].filter((j) => j.equipo === i);
      return { ...e, idx: i, miembros: m.length, puntos: m.length ? Math.round(m.reduce((s, j) => s + j.puntos, 0) / m.length) : 0 };
    }).sort((a, b) => b.puntos - a.puntos);
  }

  function estadoPublico() {
    const base = { fase: H.fase, total: H.preguntas.length, idx: H.idx, materia: H.cfg.materia, modo: H.cfg.modo };
    if (H.fase === 'pregunta') {
      const q = H.preguntas[H.idx];
      return { ...base, texto: q.texto, ops: q.ops, tipo: q.tipo, segundos: H.cfg.t, restante: Math.max(0, H.cfg.t * 1000 - (Date.now() - H.inicio)) };
    }
    if (H.fase === 'revelar' || H.fase === 'fin') {
      const rk = ranking();
      const puestos = {};
      rk.forEach((j, i) => (puestos[j.id] = i + 1));
      const res = {};
      H.resp.forEach((r, id) => (res[id] = { ok: r.ok, pts: r.pts }));
      const totales = {};
      rk.forEach((j) => (totales[j.id] = { puntos: j.puntos, aciertos: j.aciertos }));
      return { ...base, correcta: H.fase === 'revelar' ? H.preguntas[H.idx].ok : null, textoCorrecta: H.fase === 'revelar' ? H.preguntas[H.idx].ops[H.preguntas[H.idx].ok] : null, res, puestos, totales, jugadores: rk.length, top: rk.slice(0, 5).map((j) => ({ apodo: j.apodo, puntos: j.puntos })), equipos: equipos() };
    }
    return base;
  }
  const enviarEstado = () => H && H.canal.enviar('estado', estadoPublico());

  function siguiente() {
    clearInterval(H.timer);
    H.idx++;
    if (H.idx >= H.preguntas.length) return terminar();
    H.fase = 'pregunta';
    H.resp = new Map();
    H.inicio = Date.now();
    enviarEstado();
    hostPintar();
    H.timer = setInterval(() => {
      const rest = Math.max(0, Math.ceil((H.cfg.t * 1000 - (Date.now() - H.inicio)) / 1000));
      const el = document.getElementById('h-reloj');
      if (el) el.textContent = rest;
      if (rest <= 0) revelar();
    }, 250);
  }

  function hostRespuesta({ id, idx, op }) {
    if (!H || H.fase !== 'pregunta' || idx !== H.idx || H.resp.has(id) || !H.jugadores.has(id)) return;
    const pasado = Date.now() - H.inicio;
    if (pasado > H.cfg.t * 1000 + 1500) return;
    const ok = op === H.preguntas[H.idx].ok;
    const pts = ok ? Math.round(500 + 500 * Math.max(0, 1 - pasado / (H.cfg.t * 1000))) : 0;
    H.resp.set(id, { op, ok, pts });
    const j = H.jugadores.get(id);
    j.respondidas++;
    if (ok) { j.aciertos++; j.puntos += pts; }
    const el = document.getElementById('h-cuenta');
    if (el) el.textContent = `${H.resp.size} / ${H.jugadores.size}`;
    if (H.resp.size >= H.jugadores.size) setTimeout(revelar, 400);
  }

  function revelar() {
    if (!H || H.fase !== 'pregunta') return;
    clearInterval(H.timer);
    H.fase = 'revelar';
    ENG.sonido('fin');
    enviarEstado();
    hostPintar();
  }

  async function terminar() {
    const h = H;
    clearInterval(h.timer);
    h.fase = 'fin';
    enviarEstado();
    ENG.sonido('nivel');
    hostPintar();
    if (h.guardado || h.guardando || !h.jugadores.size) return;
    h.guardando = true;
    const rk = ranking();
    const segundos = Math.round((Date.now() - h.t0) / 1000);
    try {
      const r = await ENG.API.claseGuardar(h.sala.id, rk.map((j, i) => ({ alumno_id: j.id, aciertos: j.aciertos, total: h.preguntas.length, puesto: i + 1, segundos })));
      h.guardado = true;
      h.msgGuardado = `XP guardada para ${r.guardados} alumno${r.guardados === 1 ? '' : 's'} ✔`;
    } catch (e) {
      h.msgGuardado = 'No se pudo guardar la XP: ' + e.message;
    }
    h.guardando = false;
    if (H !== h) return;
    enviarEstado();
    hostPintar();
  }

  function hostSalir(forzar) {
    if (!H) return true;
    if (!forzar && H.fase !== 'fin' && H.jugadores.size && !confirm('¿Cerrar la clase en vivo? Se pierde lo que lleva.')) return false;
    const v = H;
    H = null;
    clearInterval(v.timer);
    clearInterval(v.latido);
    try { v.canal.enviar('estado', { fase: 'cerrada' }); } catch (e) {}
    setTimeout(() => { try { v.canal.cerrar(); } catch (e) {} }, 400);
    if (!v.guardado) ENG.API.salaCerrar(v.sala.id).catch(() => {});
    return true;
  }

  function hostPintar() {
    if (!H) return hostConfig();
    if (!/^#\/m\/clase/.test(location.hash)) return;
    document.body.classList.add('modo-proyector');
    const m = ENG.MATERIAS[H.cfg.materia];
    const url = ENG.urlApp().replace(/^https?:\/\//, '');
    let cuerpo = '';
    if (H.fase === 'espera') {
      const js = [...H.jugadores.values()];
      const grupos = H.cfg.modo === 'equipos'
        ? EQUIPOS.slice(0, H.cfg.equipos).map((e, i) => `<div class="eq-col" style="--c:${e.c}"><b>${e.i} ${e.n}</b>${js.filter((j) => j.equipo === i).map((j) => `<span class="pj">${esc(j.apodo)}</span>`).join('')}</div>`).join('')
        : `<div class="eq-col" style="--c:#1d4e89"><b>Jugadores</b>${js.map((j) => `<span class="pj">${esc(j.apodo)}</span>`).join('')}</div>`;
      cuerpo = `<div class="pin-caja"><small>Entra a Engrane → «Clase en vivo» o escribe el PIN</small><div class="pin">${H.sala.pin.replace(/(\d{3})(\d{3})/, '$1 $2')}</div><small>${esc(url)}</small></div>
        <p class="cl-estado">${H.conectado ? `🟢 Conectado · ${js.length} alumno${js.length === 1 ? '' : 's'} dentro` : '🟡 Conectando…'}</p>
        <div class="eq-grid">${grupos}</div>
        <div class="botonera"><button class="btn pri grande" id="h-empezar" ${js.length ? '' : 'disabled'}>▶ Empezar (${H.preguntas.length} preguntas)</button></div>`;
    } else if (H.fase === 'pregunta') {
      const q = H.preguntas[H.idx];
      const pq = ENG.Banco.preguntas[q.id];
      cuerpo = `<div class="h-top"><span class="chip">Pregunta ${H.idx + 1} / ${H.preguntas.length}</span><span class="h-reloj" id="h-reloj">${H.cfg.t}</span><span class="chip" id="h-cuenta">${H.resp.size} / ${H.jugadores.size}</span></div>
        ${pq && pq.fig ? ENG.figura(pq.fig) : ''}
        <h2 class="h-preg">${ENG.formatear(q.texto)}</h2>
        <div class="h-ops ${q.tipo}">${q.ops.map((o, i) => `<div class="h-op" style="--c:${COLORES[i]}"><span>${FORMAS[i]}</span>${ENG.formatear(o)}</div>`).join('')}</div>
        <div class="botonera"><button class="btn sec" id="h-revelar">Mostrar respuesta</button></div>`;
    } else if (H.fase === 'revelar') {
      const q = H.preguntas[H.idx];
      const cuenta = q.ops.map((_, i) => [...H.resp.values()].filter((r) => r.op === i).length);
      const max = Math.max(1, ...cuenta);
      const eq = equipos();
      cuerpo = `<div class="h-top"><span class="chip">Pregunta ${H.idx + 1} / ${H.preguntas.length}</span></div>
        <h2 class="h-preg">${ENG.formatear(q.texto)}</h2>
        <div class="h-ops ${q.tipo}">${q.ops.map((o, i) => `<div class="h-op ${i === q.ok ? 'correcta' : 'atenuada'}" style="--c:${COLORES[i]}"><span>${i === q.ok ? '✔' : FORMAS[i]}</span>${ENG.formatear(o)}<em>${cuenta[i]}</em><i style="width:${(cuenta[i] / max) * 100}%"></i></div>`).join('')}</div>
        ${q.exp ? `<p class="h-exp">💡 ${ENG.formatear(q.exp)}</p>` : ''}
        <div class="h-tablas">${eq.length ? `<div class="card"><b>Equipos (promedio)</b>${eq.map((e, i) => `<div class="h-fila"><span>${i + 1}. ${e.i} ${e.n}</span><b>${e.puntos}</b></div>`).join('')}</div>` : ''}
          <div class="card"><b>Top 5</b>${ranking().slice(0, 5).map((j, i) => `<div class="h-fila"><span>${['🥇', '🥈', '🥉'][i] || i + 1 + '.'} ${esc(j.apodo)}</span><b>${j.puntos}</b></div>`).join('')}</div></div>
        <div class="botonera"><button class="btn pri grande" id="h-sig">${H.idx + 1 >= H.preguntas.length ? '🏁 Ver resultados' : 'Siguiente ▶'}</button></div>`;
    } else if (H.fase === 'fin') {
      const rk = ranking();
      const eq = equipos();
      cuerpo = `<h2 class="h-preg">🏁 ¡Fin de la clase!</h2>
        ${eq.length ? `<div class="podio-eq" style="--c:${eq[0].c}">🏆 Gana el equipo <b>${eq[0].i} ${eq[0].n}</b> con ${eq[0].puntos} puntos promedio</div>` : ''}
        <div class="podio">${[1, 0, 2].map((i) => rk[i] ? `<div class="pd pd${i + 1}"><span>${['🥇', '🥈', '🥉'][i]}</span><b>${esc(rk[i].apodo)}</b><small>${rk[i].puntos} pts · ${rk[i].aciertos}/${H.preguntas.length}</small><i></i></div>` : '').join('')}</div>
        <div class="card"><b>Todos</b>${rk.map((j, i) => `<div class="h-fila"><span>${i + 1}. ${esc(j.apodo)}${j.equipo != null ? ' ' + EQUIPOS[j.equipo].i : ''}</span><b>${j.puntos} · ${j.aciertos}/${H.preguntas.length}</b></div>`).join('')}</div>
        <p class="cl-estado">${H.msgGuardado || 'Guardando XP…'}</p>
        <div class="botonera"><button class="btn pri" id="h-otra">Otra ronda</button><button class="btn sec" id="h-cerrar">Cerrar</button></div>`;
    }
    app().innerHTML = `<section class="clase-host"><div class="h-cab"><b>🔴 ${esc(m.nombre)} · en vivo</b><button class="btn fant mini" id="h-salir">✕ Cerrar sala</button></div>${cuerpo}</section>`;
    const on = (id, fn) => { const el = document.getElementById(id); if (el) el.onclick = fn; };
    on('h-empezar', siguiente);
    on('h-revelar', revelar);
    on('h-sig', siguiente);
    on('h-salir', () => { if (hostSalir()) { document.body.classList.remove('modo-proyector'); location.hash = '#/inicio'; } });
    on('h-cerrar', () => { hostSalir(true); document.body.classList.remove('modo-proyector'); location.hash = '#/inicio'; });
    on('h-otra', () => { const cfg = H.cfg; hostSalir(true); setTimeout(() => hostAbrir(cfg), 350); });
  }

  // ══════════════════════════ ALUMNO ══════════════════════════
  async function alumno() {
    const c = ENG.ctx;
    if (c.rol !== 'alumno' || c.prueba) {
      app().innerHTML = `<button class="volver" onclick="location.hash='#/inicio'">‹ Inicio</button><div class="card vacio">La clase en vivo es para alumnos con su código.</div>`;
      return;
    }
    if (A) return alumnoPintar();
    app().innerHTML = `<button class="volver" id="v-volver">‹ Inicio</button><h1 class="tit">🔴 Clase en vivo</h1>
      <div id="cl-salas">${ENG.cargandoHTML('Buscando clases abiertas…')}</div>
      <form class="card form" id="f-pin"><label class="campo"><span>¿Te dieron un PIN?</span><input id="cl-pin" class="input-codigo" inputmode="numeric" maxlength="7" placeholder="000 000"></label><button class="btn pri ancho">Entrar</button></form>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    document.getElementById('f-pin').onsubmit = async (e) => {
      e.preventDefault();
      try { unirse(await ENG.API.salaBuscar(c.codigo, document.getElementById('cl-pin').value)); } catch (err) { ENG.toast(err.message, 'mal'); }
    };
    try {
      const salas = await ENG.API.salasActivas(c.codigo);
      const cont = document.getElementById('cl-salas');
      if (!cont) return;
      cont.innerHTML = salas.length
        ? salas.map((s) => `<button class="card destacado" data-sala="${s.id}"><span class="mini-ico">🔴</span><div><b>${esc(ENG.MATERIAS[s.materia] ? ENG.MATERIAS[s.materia].nombre : s.materia)} · en vivo</b><small>Toca para entrar</small></div><span class="flecha">›</span></button>`).join('')
        : '<div class="card vacio">No hay clases abiertas ahorita. Cuando tu profe abra una, aparecerá aquí.</div>';
      cont.querySelectorAll('[data-sala]').forEach((b) => (b.onclick = () => unirse(salas.find((s) => String(s.id) === b.dataset.sala))));
    } catch (e) {
      const cont = document.getElementById('cl-salas');
      if (cont) cont.innerHTML = `<div class="card vacio">${esc(e.message)}</div>`;
    }
  }

  function unirse(sala) {
    const yo = ENG.ctx.estado.alumno;
    A = { sala, yo, equipo: null, estado: { fase: 'conectando' }, respondida: -1, mia: null, bienvenido: false };
    A.canal = ENG.API.canal(canalDe(sala))
      .on('bienvenida', (p) => {
        if (!A || p.id !== yo.id) return;
        A.bienvenido = true;
        A.equipo = p.equipo;
        alumnoPintar();
      })
      .on('estado', (p) => {
        if (!A) return;
        const antes = A.estado;
        A.estado = p;
        A.recibido = Date.now();
        if (p.fase === 'cerrada') {
          // Si ya terminó, se queda viendo su resultado; si no, sale
          if (antes && antes.fase === 'fin') { A.estado = antes; return; }
          ENG.toast('El profe cerró la clase', '');
          return alumnoSalir();
        }
        if (antes && antes.fase === p.fase && antes.idx === p.idx && p.fase !== 'fin') return actualizarReloj();
        if (p.fase === 'revelar') {
          const r = p.res && p.res[yo.id];
          ENG.sonido(r && r.ok ? 'ok' : 'mal');
          if (!(r && r.ok)) ENG.vibrar(60);
        }
        alumnoPintar();
      })
      .conectar((ok) => {
        if (!A) return;
        if (!ok) { ENG.toast('No se pudo conectar a la clase', 'mal'); return alumnoSalir(); }
        const pedir = () => A && !A.bienvenido && A.canal.enviar('unir', { id: yo.id, apodo: yo.apodo });
        pedir();
        A.reintento = setInterval(() => (A && A.bienvenido ? clearInterval(A.reintento) : pedir()), 2500);
      });
    A.relojTimer = setInterval(actualizarReloj, 250);
    alumnoPintar();
  }

  function alumnoSalir() {
    if (!A) return;
    clearInterval(A.reintento);
    clearInterval(A.relojTimer);
    try { A.canal.cerrar(); } catch (e) {}
    A = null;
    if (/^#\/clase/.test(location.hash)) location.hash = '#/inicio';
  }

  function actualizarReloj() {
    const el = document.getElementById('a-reloj');
    if (!el || !A || A.estado.fase !== 'pregunta') return;
    const rest = Math.max(0, Math.ceil((A.estado.restante - (Date.now() - A.recibido)) / 1000));
    el.textContent = rest;
  }

  function alumnoPintar() {
    if (!A || !/^#\/clase/.test(location.hash)) return;
    const p = A.estado;
    const eq = A.equipo != null ? EQUIPOS[A.equipo] : null;
    const cab = `<div class="a-cab" style="--c:${eq ? eq.c : 'var(--azul)'}"><span>${eq ? `${eq.i} Equipo ${eq.n}` : '🔴 En vivo'}</span><b>${esc(A.yo.apodo)}</b></div>`;
    let cuerpo = '';
    if (!A.bienvenido || p.fase === 'conectando') cuerpo = `<div class="a-centro">${ENG.cargandoHTML('Entrando a la clase…')}</div>`;
    else if (p.fase === 'espera') cuerpo = `<div class="a-centro"><div class="a-grande">✔</div><h2>¡Estás dentro!</h2><p>Mira el proyector. Cuando el profe empiece, aquí te salen los botones.</p></div>`;
    else if (p.fase === 'pregunta') {
      if (A.respondida === p.idx) cuerpo = `<div class="a-centro"><div class="a-grande">⏳</div><h2>Respuesta enviada</h2><p>Espera a que todos contesten…</p></div>`;
      else cuerpo = `<div class="a-top"><span>Pregunta ${p.idx + 1}/${p.total}</span><span class="a-reloj" id="a-reloj">${p.segundos}</span></div>
        <p class="a-preg">${ENG.formatear(p.texto)}</p>
        <div class="a-ops ${p.tipo}">${p.ops.map((o, i) => `<button class="a-op" data-op="${i}" style="--c:${COLORES[i]}"><span>${FORMAS[i]}</span>${ENG.formatear(o)}</button>`).join('')}</div>`;
    } else if (p.fase === 'revelar') {
      const r = p.res && p.res[A.yo.id];
      const tot = p.totales && p.totales[A.yo.id];
      cuerpo = `<div class="a-centro ${r && r.ok ? 'bien' : 'mal'}"><div class="a-grande">${r ? (r.ok ? '✔' : '✖') : '⌛'}</div>
        <h2>${r ? (r.ok ? `¡Correcto! +${r.pts}` : 'Esta no fue') : 'No alcanzaste a contestar'}</h2>
        ${!(r && r.ok) ? `<p>Era: <b>${ENG.formatear(p.textoCorrecta || '')}</b></p>` : ''}
        <p>Vas en el lugar <b>${p.puestos[A.yo.id] || '—'}</b> de ${p.jugadores} · ${tot ? tot.puntos : 0} puntos</p></div>`;
    } else if (p.fase === 'fin') {
      const tot = p.totales && p.totales[A.yo.id];
      const lugar = p.puestos && p.puestos[A.yo.id];
      const eqGan = p.equipos && p.equipos[0];
      cuerpo = `<div class="a-centro"><div class="a-grande">${['🥇', '🥈', '🥉'][lugar - 1] || '🏁'}</div><h2>Quedaste en el lugar ${lugar || '—'}</h2>
        <p>${tot ? `${tot.aciertos} de ${p.total} correctas · ${tot.puntos} puntos` : ''}</p>
        ${eqGan ? `<p>🏆 Ganó el equipo <b>${eqGan.i} ${eqGan.n}</b>${eq && eq.n === eqGan.n ? ' — ¡el tuyo!' : ''}</p>` : ''}
        <p class="peq">Tu XP se suma cuando el profe guarda la clase.</p>
        <button class="btn pri" id="a-fin">Volver al inicio</button></div>`;
    }
    app().innerHTML = `<section class="clase-alumno">${cab}${cuerpo}<button class="btn fant mini a-salir" id="a-salir">Salir de la clase</button></section>`;
    app().querySelectorAll('[data-op]').forEach((b) => (b.onclick = () => {
      if (A.respondida === p.idx) return;
      A.respondida = p.idx;
      A.canal.enviar('respuesta', { id: A.yo.id, idx: p.idx, op: +b.dataset.op });
      ENG.vibrar(20);
      alumnoPintar();
    }));
    const s = document.getElementById('a-salir');
    if (s) s.onclick = alumnoSalir;
    const f = document.getElementById('a-fin');
    if (f) f.onclick = () => { alumnoSalir(); ENG.recargarEstado(true).then(() => (location.hash = '#/inicio')); };
  }

  // Al salir de la ruta
  window.addEventListener('hashchange', () => {
    if (H && !/^#\/m\/clase/.test(location.hash)) {
      if (H.fase === 'fin' || !H.jugadores.size) hostSalir(true);
      else if (!hostSalir()) { history.go(1); return; }
      document.body.classList.remove('modo-proyector');
    }
    if (!/^#\/m\/clase/.test(location.hash)) document.body.classList.remove('modo-proyector');
    if (A && !/^#\/clase/.test(location.hash)) alumnoSalir();
  });

  // Banner en el inicio del alumno si hay una clase abierta
  async function banner(contenedor) {
    const c = ENG.ctx;
    if (!contenedor || c.rol !== 'alumno' || c.prueba) return;
    try {
      const salas = await ENG.API.salasActivas(c.codigo);
      if (!salas.length) return;
      const s = salas[0];
      contenedor.innerHTML = `<button class="card en-vivo" id="b-vivo"><span class="punto-vivo"></span><div><b>Clase en vivo: ${esc(ENG.MATERIAS[s.materia] ? ENG.MATERIAS[s.materia].nombre : s.materia)}</b><small>Toca para entrar</small></div><span class="flecha">›</span></button>`;
      document.getElementById('b-vivo').onclick = () => { location.hash = '#/clase'; setTimeout(() => unirse(s), 60); };
    } catch (e) {}
  }

  ENG.Clase = { host: hostConfig, alumno, banner, hostPintar };
})();
