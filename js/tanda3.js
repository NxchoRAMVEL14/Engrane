// ENGRANE · Tanda 3 (v2.4): modo oscuro, análisis del grupo, hojas para imprimir, ayuda y novedades
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const cfg = window.ENGRANE_CONFIG || {};

  // ═══════════════════════════ MODO OSCURO ═══════════════════════════
  const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const Tema = {
    actual: () => ENG.ls.get('eng_tema', 'auto'),
    aplicar() {
      const t = Tema.actual();
      const oscuro = t === 'oscuro' || (t === 'auto' && mq && mq.matches);
      document.documentElement.classList.toggle('oscuro', !!oscuro);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', oscuro ? '#07101A' : '#0F1E2E');
    },
    poner(t) {
      ENG.ls.set('eng_tema', t);
      Tema.aplicar();
    },
    selector: () => `<label class="campo tema-sel"><span>Apariencia</span><select id="mn-tema">
        ${[['auto', '🌓 Automática (como tu celular)'], ['claro', '☀️ Clara'], ['oscuro', '🌙 Oscura']].map(([v, t]) => `<option value="${v}" ${Tema.actual() === v ? 'selected' : ''}>${t}</option>`).join('')}
      </select></label>`
  };
  if (mq && mq.addEventListener) mq.addEventListener('change', () => Tema.actual() === 'auto' && Tema.aplicar());
  Tema.aplicar();
  ENG.Tema = Tema;

  // ═══════════════════════════ UTILIDADES ═══════════════════════════
  const misMaterias = () => {
    const p = ENG.ctx.perfil;
    const todas = Object.values(ENG.MATERIAS).filter((m) => m.disponible);
    if (!p || p.rol === 'admin') return todas;
    return todas.filter((m) => (p.materias || []).includes(m.id));
  };
  const opcionesMat = (sel) => ENG.porSemestre(misMaterias())
    .map(([s, ms]) => `<optgroup label="${ENG.nombreSemestre(s)}">${ms.map((m) => `<option value="${m.id}" ${m.id === sel ? 'selected' : ''}>${m.icono} ${esc(m.nombre)}</option>`).join('')}</optgroup>`).join('');
  const etiquetaTema = (t) => (t.sub ? t.sub.toUpperCase() + ' · ' : '') + t.nombre;
  const corto = (txt, n = 110) => (txt.length > n ? txt.slice(0, n - 1) + '…' : txt);
  const barajar = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const LETRAS = 'abcdefghij';

  // Respuesta correcta en texto (para la clave y el análisis)
  function respuestaTexto(p) {
    switch (p.tipo) {
      case 'om': return p.ops[p.ok];
      case 'vf': return p.ok ? 'Verdadero' : 'Falso';
      case 'co': return p.r.join(' / ');
      case 'nu': return `${p.r}${p.u ? ' ' + p.u : ''}`;
      case 'or': return p.partes.join(' → ');
      case 're': return p.pares.map(([a, b]) => `${a} – ${b}`).join(' · ');
      case 'ha': return p.r;
      default: return '';
    }
  }
  ENG.respuestaTexto = respuestaTexto;

  function verPregunta(p) {
    const t = ENG.Banco.temas[p.tema];
    ENG.modal({
      titulo: 'Pregunta',
      html: `<p class="peq">${esc(ENG.MATERIAS[p.materia].nombre)} · ${esc(t ? etiquetaTema(t) : p.tema)} · <span class="mono">${esc(p.id)}</span></p>
        ${p.fig ? ENG.figura(p.fig) : ''}
        <p><b>${esc(p.q)}</b></p>
        ${p.tipo === 'om' ? `<ol type="a" class="ops-lista">${p.ops.map((o, i) => `<li class="${i === p.ok ? 'txt-verde' : ''}">${esc(o)}${i === p.ok ? ' ✔' : ''}</li>`).join('')}</ol>` : `<p>Respuesta: <b class="txt-verde">${esc(respuestaTexto(p))}</b></p>`}
        ${p.exp ? `<div class="tip">${esc(p.exp)}</div>` : ''}`
    });
  }

  // ═══════════════════════════ ANÁLISIS DEL GRUPO ═══════════════════════════
  const A = { materia: null, grupo: '', datos: null };
  const colorPct = (pct) => (pct == null ? 'sin' : pct >= 80 ? 'verde' : pct >= 60 ? 'amarillo' : 'rojo');

  async function vistaAnalisis() {
    const mats = misMaterias();
    if (!mats.length) {
      app().innerHTML = `<div class="card vacio">Todavía no tienes materias asignadas.</div>`;
      return;
    }
    if (!A.materia || !mats.find((m) => m.id === A.materia)) A.materia = mats[0].id;
    if (!ENG.ctx.alumnos) {
      try { ENG.ctx.alumnos = (await ENG.API.listarAlumnos()) || []; } catch (e) { ENG.ctx.alumnos = []; }
    }
    const grupos = [...new Set((ENG.ctx.alumnos || []).map((a) => a.grupo).filter(Boolean))].sort();
    app().innerHTML = `<button class="volver" id="an-volver">‹ Panel</button>
      <h1 class="tit">📊 Análisis del grupo</h1>
      <p class="ayuda-txt">Qué temas domina cada alumno y qué preguntas se le atoran al grupo. Sale de todo lo que contestan en la app.</p>
      <div class="card form fila-filtros">
        <label class="campo"><span>Materia</span><select id="an-mat">${opcionesMat(A.materia)}</select></label>
        <label class="campo"><span>Grupo</span><select id="an-grupo"><option value="">Todos</option>${grupos.map((g) => `<option ${g === A.grupo ? 'selected' : ''}>${esc(g)}</option>`).join('')}</select></label>
      </div>
      <div id="an-zona">${ENG.cargandoHTML('Analizando…')}</div>`;
    document.getElementById('an-volver').onclick = () => (location.hash = '#/inicio');
    document.getElementById('an-mat').onchange = (e) => { A.materia = e.target.value; vistaAnalisis(); };
    document.getElementById('an-grupo').onchange = (e) => { A.grupo = e.target.value; vistaAnalisis(); };
    try {
      A.datos = await ENG.API.analisis(A.materia, A.grupo);
      pintarAnalisis();
    } catch (e) {
      document.getElementById('an-zona').innerHTML = `<div class="card vacio">${esc(e.message)}</div>`;
    }
  }

  function pintarAnalisis() {
    const d = A.datos;
    const z = document.getElementById('an-zona');
    const temas = ENG.Banco.temasDe(A.materia);
    if (!d.alumnos.length) {
      z.innerHTML = `<div class="card vacio">Nadie ${A.grupo ? 'de ese grupo ' : ''}lleva esta materia todavía.</div>`;
      return;
    }
    const celda = {};
    d.temas.forEach((x) => (celda[x.a + '|' + x.t] = x));
    const pct = (x) => (x && x.ac + x.fa > 0 ? Math.round((100 * x.ac) / (x.ac + x.fa)) : null);
    // promedio por tema
    const prom = temas.map((t) => {
      let ac = 0, fa = 0;
      d.alumnos.forEach((a) => { const x = celda[a.id + '|' + t.id]; if (x) { ac += x.ac; fa += x.fa; } });
      return ac + fa ? Math.round((100 * ac) / (ac + fa)) : null;
    });
    const conDatos = prom.map((p, i) => [p, i]).filter(([p]) => p != null).sort((x, y) => x[0] - y[0]);
    const flojos = conDatos.slice(0, 3).filter(([p]) => p < 80);
    const preguntas = d.preguntas.filter((x) => ENG.Banco.preguntas[x.p]).slice(0, 15);

    z.innerHTML = `
      ${flojos.length ? `<div class="card refuerzo"><b>🎯 Para reforzar en clase</b><ul class="lista-limpia">${flojos.map(([p, i]) => `<li><b>${esc(etiquetaTema(temas[i]))}</b> · ${p}% de aciertos del grupo <button class="btn fant mini" data-mision="${temas[i].id}">🎯 Misión</button></li>`).join('')}</ul></div>` : ''}
      <div class="card">
        <div class="mc-top"><h3 class="sec-tit">🔥 Mapa de calor</h3><small>% de aciertos por tema</small></div>
        <div class="calor-scroll"><table class="calor">
          <thead><tr><th class="fijo">Alumno</th>${temas.map((t, i) => `<th title="${esc(etiquetaTema(t))}" data-tema-i="${i}">T${i + 1}</th>`).join('')}</tr></thead>
          <tbody>
            ${d.alumnos.map((a) => `<tr><th class="fijo"><a href="#/m/alumno/${a.id}">${esc(a.nombre)}</a></th>${temas.map((t) => {
              const x = celda[a.id + '|' + t.id];
              const p = pct(x);
              return `<td class="c-${colorPct(p)}" title="${esc(t.nombre)}${x ? ` · ${x.ac} bien, ${x.fa} mal` : ''}">${p == null ? '·' : p}</td>`;
            }).join('')}</tr>`).join('')}
            <tr class="prom"><th class="fijo">Grupo</th>${prom.map((p) => `<td class="c-${colorPct(p)}">${p == null ? '·' : p}</td>`).join('')}</tr>
          </tbody></table></div>
        <details class="leyenda-temas"><summary>¿Qué tema es cada T?</summary><ol>${temas.map((t) => `<li>${esc(etiquetaTema(t))}</li>`).join('')}</ol></details>
        <p class="peq"><span class="pastilla c-verde">80–100</span> <span class="pastilla c-amarillo">60–79</span> <span class="pastilla c-rojo">0–59</span> <span class="pastilla c-sin">·</span> sin contestar</p>
      </div>
      <div class="card">
        <div class="mc-top"><h3 class="sec-tit">❌ Preguntas más falladas</h3>${preguntas.length ? `<button class="btn sec mini" id="an-hoja">🖨️ Hoja con estas</button>` : ''}</div>
        ${preguntas.length ? preguntas.map((x, i) => {
          const p = ENG.Banco.preguntas[x.p];
          const t = ENG.Banco.temas[p.tema];
          const total = x.ac + x.fa;
          return `<div class="falla">
            <span class="falla-n">${i + 1}</span>
            <div class="falla-c"><b>${esc(corto(p.q))}</b>
              <small>${esc(t ? etiquetaTema(t) : '')}</small>
              <small><span class="txt-rojo">${x.fa} fallo${x.fa === 1 ? '' : 's'}</span> · ${x.alumnos} alumno${x.alumnos === 1 ? '' : 's'} · ${Math.round((100 * x.ac) / total)}% de aciertos</small>
              <small>Correcta: <b class="txt-verde">${esc(corto(respuestaTexto(p), 80))}</b></small></div>
            <button class="btn fant mini" data-ver="${x.p}">Ver</button>
          </div>`;
        }).join('') : '<p class="vacio">Todavía no hay errores registrados en esta materia. ¡Buena señal (o aún no practican)!</p>'}
        <p class="peq">Si una pregunta la falla casi todo el grupo, revisa que esté bien redactada: puedes ocultarla desde ⚑ Reportes.</p>
      </div>`;
    z.querySelectorAll('[data-ver]').forEach((b) => (b.onclick = () => verPregunta(ENG.Banco.preguntas[b.dataset.ver])));
    z.querySelectorAll('[data-tema-i]').forEach((th) => (th.onclick = () => ENG.toast(`T${+th.dataset.temaI + 1}: ${etiquetaTema(temas[+th.dataset.temaI])}`)));
    z.querySelectorAll('[data-mision]').forEach((b) => (b.onclick = () => {
      location.hash = '#/m/misiones';
      setTimeout(() => ENG.Misiones.formulario({ id: null, materia: A.materia, tema: b.dataset.mision, modo: 'practica', meta: 80, fecha_limite: ENG.sumarDias(ENG.hoy(), 3), titulo: '', nota: '', alumnos: [] }), 400);
    }));
    const bh = document.getElementById('an-hoja');
    if (bh) bh.onclick = () => {
      H.materia = A.materia;
      H.preIds = preguntas.map((x) => x.p);
      location.hash = '#/m/hojas';
    };
  }

  // ═══════════════════════════ HOJAS PARA IMPRIMIR ═══════════════════════════
  const H = { materia: null, preIds: null, ultima: null };

  function vistaHojas() {
    const mats = misMaterias();
    if (!mats.length) {
      app().innerHTML = `<div class="card vacio">Todavía no tienes materias asignadas.</div>`;
      return;
    }
    if (!H.materia || !mats.find((m) => m.id === H.materia)) H.materia = mats[0].id;
    const pre = H.preIds;
    app().innerHTML = `<button class="volver" id="h-volver">‹ Panel</button>
      <h1 class="tit">🖨️ Hojas para imprimir</h1>
      <p class="ayuda-txt">Arma una hoja de práctica o un examen en papel con las preguntas de la app, con su hoja de respuestas. Ideal para quien no trae celular o datos.</p>
      <div class="card form" id="h-form">
        <label class="campo"><span>Materia</span><select id="h-mat">${opcionesMat(H.materia)}</select></label>
        ${pre ? `<div class="aviso">Usando las <b>${pre.length} preguntas más falladas</b> del análisis. <button class="btn fant mini" id="h-quitar-pre">Elegir temas en su lugar</button></div>` : `
        <p class="peq">Temas <button type="button" class="btn fant mini" id="h-todos">Marcar todos</button></p>
        <div class="checks scroll" id="h-temas"></div>`}
        <label class="campo"><span>Título</span><input id="h-tit" placeholder="Hoja de práctica"></label>
        <div class="fila-2">
          <label class="campo"><span>Preguntas</span><select id="h-n">${[10, 15, 20, 25, 30].map((n) => `<option ${n === 15 ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
          <label class="campo"><span>Versiones</span><select id="h-ver"><option value="1">1 (A)</option><option value="2">2 (A y B, para que no se copien)</option></select></label>
        </div>
        <label class="check"><input type="checkbox" id="h-clave" checked><span>Incluir hoja de respuestas (para ti)</span></label>
        <label class="check"><input type="checkbox" id="h-exp"><span>Incluir explicación en la hoja de respuestas</span></label>
        <p class="peq">No se incluyen las preguntas de pronunciación ni las de audio.</p>
        <div class="fila-2"><button class="btn sec" id="h-previa">👁 Vista previa</button><button class="btn pri" id="h-imprimir">🖨️ Imprimir / PDF</button></div>
      </div>
      <div id="h-previa-zona"></div>`;
    document.getElementById('h-volver').onclick = () => { H.preIds = null; location.hash = '#/inicio'; };
    document.getElementById('h-mat').onchange = (e) => { H.materia = e.target.value; H.preIds = null; vistaHojas(); };
    const bq = document.getElementById('h-quitar-pre');
    if (bq) bq.onclick = () => { H.preIds = null; vistaHojas(); };
    if (!pre) {
      const temas = ENG.Banco.temasDe(H.materia);
      document.getElementById('h-temas').innerHTML = temas.map((t) => `<label class="check"><input type="checkbox" value="${t.id}"><span>${esc(etiquetaTema(t))} <small>(${t.preguntas.filter(paraPapel).length})</small></span></label>`).join('');
      document.getElementById('h-todos').onclick = () => {
        const cs = [...document.querySelectorAll('#h-temas input')];
        const todos = cs.every((c) => c.checked);
        cs.forEach((c) => (c.checked = !todos));
      };
    }
    const armar = () => {
      const opciones = {
        titulo: document.getElementById('h-tit').value.trim() || 'Hoja de práctica',
        n: +document.getElementById('h-n').value,
        versiones: +document.getElementById('h-ver').value,
        clave: document.getElementById('h-clave').checked,
        exp: document.getElementById('h-exp').checked
      };
      let base;
      if (pre) base = pre.map((id) => ENG.Banco.preguntas[id]).filter((p) => p && paraPapel(p));
      else {
        const ids = [...document.querySelectorAll('#h-temas input:checked')].map((i) => i.value);
        if (!ids.length) { ENG.toast('Marca al menos un tema', 'mal'); return null; }
        base = elegir(ids, opciones.n);
      }
      if (!base.length) { ENG.toast('No hay preguntas para papel en esa selección', 'mal'); return null; }
      return hojaHTML(H.materia, base.slice(0, opciones.n), opciones);
    };
    document.getElementById('h-previa').onclick = () => {
      const html = armar();
      if (!html) return;
      H.ultima = html;
      document.getElementById('h-previa-zona').innerHTML = `<div class="card"><div class="mc-top"><h3 class="sec-tit">Vista previa</h3><button class="btn pri mini" id="h-imp2">🖨️ Imprimir esta</button></div><div class="hoja-previa">${html}</div></div>`;
      document.getElementById('h-imp2').onclick = () => imprimir(H.ultima);
      document.getElementById('h-previa-zona').scrollIntoView({ behavior: 'smooth' });
    };
    document.getElementById('h-imprimir').onclick = () => {
      const html = armar();
      if (html) imprimir(html);
    };
  }

  const paraPapel = (p) => p.tipo !== 'ha' && !p.audio && ENG.Banco.visible(p.id);

  // Reparte las preguntas entre los temas elegidos, mezclando niveles
  function elegir(temaIds, n) {
    const bolsas = temaIds.map((id) => barajar((ENG.Banco.temas[id].preguntas || []).filter(paraPapel)));
    const out = [];
    let i = 0;
    while (out.length < n && bolsas.some((b) => b.length)) {
      const b = bolsas[i % bolsas.length];
      if (b.length) out.push(b.shift());
      i++;
    }
    return out.sort((a, b) => temaIds.indexOf(a.tema) - temaIds.indexOf(b.tema) || a.nivel - b.nivel);
  }

  // Prepara una versión: orden y opciones barajadas (B) y guarda la clave
  function version(preguntas, letra) {
    const lista = letra === 'A' ? preguntas.slice() : barajar(preguntas);
    return lista.map((p) => {
      const it = { p };
      if (p.tipo === 'om') {
        // En el banco la respuesta suele ir primero: siempre se barajan las opciones (también en la versión A)
        const idx = barajar(p.ops.map((_, i) => i));
        it.ops = idx.map((i) => p.ops[i]);
        it.clave = LETRAS[idx.indexOf(p.ok)] + ') ' + p.ops[p.ok];
      } else if (p.tipo === 'or') {
        let orden = barajar(p.partes.map((_, i) => i));
        if (orden.every((v, i) => v === i) && orden.length > 1) orden = orden.reverse();
        it.partes = orden.map((i) => p.partes[i]);
        // número que va en cada renglón mostrado
        it.clave = orden.map((i) => i + 1).join(', ') + '  (de arriba hacia abajo)';
      } else if (p.tipo === 're') {
        const der = barajar(p.pares.map((_, i) => i));
        it.der = der.map((i) => p.pares[i][1]);
        it.clave = p.pares.map((_, i) => `${i + 1}-${LETRAS[der.indexOf(i)]}`).join(', ');
      } else it.clave = respuestaTexto(p);
      return it;
    });
  }

  function preguntaPapel(it, n) {
    const p = it.p;
    const enunciado = `<div class="hp-q"><b>${n}.</b> ${esc(p.q)}</div>`;
    const fig = p.fig ? ENG.figura(p.fig) : '';
    let cuerpo = '';
    if (p.tipo === 'om') {
      const largas = it.ops.some((o) => o.length > 28);
      cuerpo = `<div class="hp-ops ${largas ? 'una' : ''}">${it.ops.map((o, i) => `<span>${LETRAS[i]}) ${esc(o)}</span>`).join('')}</div>`;
    } else if (p.tipo === 'vf') cuerpo = `<div class="hp-linea">( &nbsp; ) Verdadero &nbsp;&nbsp;&nbsp; ( &nbsp; ) Falso</div>`;
    else if (p.tipo === 'co') cuerpo = `<div class="hp-linea">Respuesta: ______________________________</div>`;
    else if (p.tipo === 'nu') cuerpo = `<div class="hp-linea">Resultado: ________________ ${esc(p.u || '')}</div><div class="hp-proc">Procedimiento:</div>`;
    else if (p.tipo === 'or') cuerpo = `<div class="hp-peq">Escribe el orden (1, 2, 3…) en el paréntesis:</div>${it.partes.map((x) => `<div class="hp-linea">( &nbsp;&nbsp; ) ${esc(x)}</div>`).join('')}`;
    else if (p.tipo === 're') cuerpo = `<div class="hp-peq">Escribe la letra que corresponde:</div><div class="hp-rel"><div>${p.pares.map(([a], i) => `<div>${i + 1}. ${esc(a)} &nbsp;( &nbsp; )</div>`).join('')}</div><div>${it.der.map((b, i) => `<div>${LETRAS[i]}) ${esc(b)}</div>`).join('')}</div></div>`;
    return `<div class="hp-preg">${enunciado}${fig}${cuerpo}</div>`;
  }

  function hojaHTML(materia, preguntas, o) {
    const m = ENG.MATERIAS[materia];
    const letras = o.versiones === 2 ? ['A', 'B'] : ['A'];
    const vs = letras.map((l) => [l, version(preguntas, l)]);
    const cab = (l, clave) => `<div class="hp-cab">
        <div><small>${esc(cfg.ESCUELA || '')}</small><h2>${esc(o.titulo)}${clave ? ' · Respuestas' : ''}</h2><small>${esc(m.nombre)}${m.titulo ? ' · ' + esc(m.titulo) : ''}${o.versiones === 2 ? ` · Versión <b>${l}</b>` : ''}</small></div>
        ${clave ? '' : `<div class="hp-cal">Calif.<br><span></span></div>`}
      </div>
      ${clave ? '' : `<div class="hp-datos"><span>Nombre: ______________________________________</span><span>Grupo: ______</span><span>Fecha: ____________</span></div>`}`;
    const hojas = vs.map(([l, items]) => `<section class="hp-hoja">${cab(l, false)}<div class="hp-cuerpo">${items.map((it, i) => preguntaPapel(it, i + 1)).join('')}</div>
      <div class="hp-pie">Engrane · ${preguntas.length} preguntas · Cada una vale ${(10 / preguntas.length).toFixed(2).replace(/\.?0+$/, '')}</div></section>`);
    const claves = o.clave ? vs.map(([l, items]) => `<section class="hp-hoja hp-clave">${cab(l, true)}<table class="hp-tabla"><tr><th>#</th><th>Respuesta</th></tr>
      ${items.map((it, i) => `<tr><td>${i + 1}</td><td>${esc(it.clave)}${o.exp && it.p.exp ? `<br><small>${esc(it.p.exp)}</small>` : ''}</td></tr>`).join('')}</table></section>`) : [];
    return `<div class="hp">${hojas.join('')}${claves.join('')}</div>`;
  }

  function imprimir(html) {
    let div = document.getElementById('imprimir');
    if (!div) {
      div = document.createElement('div');
      div.id = 'imprimir';
      document.body.appendChild(div);
    }
    div.innerHTML = html;
    document.body.classList.add('imprimiendo');
    setTimeout(() => {
      window.print();
      setTimeout(() => document.body.classList.remove('imprimiendo'), 400);
    }, 150);
  }

  ENG.Analisis = { vista: vistaAnalisis };
  ENG.Hojas = { vista: vistaHojas, hojaHTML, elegir, version };

  // ═══════════════════════════ AYUDA Y NOVEDADES ═══════════════════════════
  const NOVEDADES = {
    '2.4.0': {
      todos: ['🌙 Modo oscuro: menú ☰ → Apariencia (automática, clara u oscura).', '❓ Ayuda: menú ☰ → Ayuda, con lo básico de tu pantalla.'],
      maestro: ['📊 Análisis del grupo: mapa de calor por tema y las preguntas que más fallan.', '🖨️ Hojas para imprimir: práctica o examen en papel con versiones A/B y hoja de respuestas.'],
      alumno: [],
      papas: []
    },
    '2.3.0': {
      todos: [],
      maestro: ['📚 Materias de 4° semestre y 📅 Cambio de semestre.', '🧪 Laboratorio virtual.'],
      alumno: ['📚 Materias de 4° semestre.', '🧪 Laboratorio virtual: neumática, fuerza y PLC con retos que dan XP.'],
      papas: []
    }
  };
  const AYUDA = {
    alumno: [
      ['🏠 Inicio', 'Arriba ves tu nivel, tu XP y tu racha. «Hoy te toca» te dice qué hacer primero: tu profe deja misiones y la app te recomienda temas.'],
      ['📚 Practicar', 'Entra a una materia y luego a un tema. Lee la lección, haz la práctica y, cuando domines el tema, vence al jefe final. El semáforo te dice cómo vas: rojo, amarillo o verde.'],
      ['🔁 Repaso', 'Las preguntas que fallas regresan días después hasta que las domines. Haz tu repaso pendiente: es lo que más sube tu calificación.'],
      ['📅 Exámenes', 'Si tu profe registra un examen, aparece una tarjeta con la cuenta regresiva y el botón de repaso intensivo.'],
      ['🧪 Laboratorio', 'Practica neumática, fuerza de cilindros y PLC. Cada reto da XP una vez al día.'],
      ['⚑ Reportar', 'Si una pregunta está mal o no se entiende, toca «Reportar» después de contestarla. Tu profe la revisa.'],
      ['🔴 Clase en vivo', 'Cuando tu profe proyecte el PIN, entra desde el menú y contesta desde tu celular.']
    ],
    papas: [
      ['📈 Reporte', 'Ves cuánto practicó su hijo esta semana, sus temas en verde, amarillo y rojo, y sus misiones.'],
      ['🧪 Pruébelo', 'Con «Prueba lo que tu hijo está viendo» usted puede contestar las mismas actividades. No cuenta para su hijo.'],
      ['🔔 Avisos', 'Active las notificaciones para recibir los avisos del maestro y el recordatorio de exámenes.']
    ],
    maestro: [
      ['👥 Alumnos', 'Da de alta alumnos, comparte sus códigos por WhatsApp y entra a su avance. Las alertas te dicen quién no ha practicado.'],
      ['🎯 Misiones y 📅 Exámenes', 'Deja tareas con fecha y meta. Registra exámenes para que tus alumnos reciban repaso intensivo y recordatorios.'],
      ['📊 Análisis', 'Mira el mapa de calor por tema y las preguntas más falladas. Desde ahí creas una misión o una hoja para imprimir.'],
      ['🖨️ Hojas', 'Arma práctica o examen en papel con versiones A y B y su hoja de respuestas. En el celular elige «Guardar como PDF».'],
      ['✏️ Preguntas y ⚑ Reportes', 'Agrega tus preguntas a cualquier tema y revisa las que reportan los alumnos; puedes ocultarlas mientras las corriges.'],
      ['🔴 Clase en vivo', 'Proyecta el PIN y juega por equipos o individual.'],
      ['💾 Respaldo (admin)', 'Descarga un respaldo cada semana; Supabase gratis no guarda copias diarias.']
    ]
  };

  const rolAyuda = () => (ENG.ctx.rol === 'maestro' ? 'maestro' : ENG.ctx.rol === 'papas' ? 'papas' : 'alumno');
  const notasDe = (v, rol) => {
    const n = NOVEDADES[v];
    return n ? n.todos.concat(n[rol] || []) : [];
  };

  function vistaAyuda() {
    const rol = rolAyuda();
    const v = ENG.VERSION;
    app().innerHTML = `<button class="volver" id="ay-volver">‹ Inicio</button>
      <h1 class="tit">❓ Ayuda</h1>
      <div class="card">${AYUDA[rol].map(([t, d]) => `<details class="ay"><summary>${t}</summary><p>${esc(d)}</p></details>`).join('')}</div>
      <div class="card">${Tema.selector()}</div>
      <div class="card"><h3 class="sec-tit">🆕 Novedades</h3>${Object.keys(NOVEDADES).map((ver) => {
        const ns = notasDe(ver, rol);
        return ns.length ? `<p><b>Versión ${ver}</b></p><ul class="lista-limpia">${ns.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
      }).join('')}<p class="peq">Estás en la versión ${esc(v)}.</p></div>
      <div class="card"><h3 class="sec-tit">📲 Instalar como app</h3><p class="peq">Android (Chrome): menú ⋮ → «Instalar app» o «Agregar a pantalla principal». iPhone (Safari): botón Compartir → «Agregar a inicio».</p></div>`;
    document.getElementById('ay-volver').onclick = () => (location.hash = '#/inicio');
    document.getElementById('mn-tema').onchange = (e) => Tema.poner(e.target.value);
    ENG.ls.set('eng_novedades', v);
  }

  const Novedades = {
    banner() {
      const rol = rolAyuda();
      if (!ENG.ctx.rol || ENG.ctx.prueba) return;
      if (ENG.ls.get('eng_novedades') === ENG.VERSION) return;
      const ns = notasDe(ENG.VERSION, rol);
      if (!ns.length || document.getElementById('novedades')) return;
      const div = document.createElement('div');
      div.className = 'card novedades';
      div.id = 'novedades';
      div.innerHTML = `<div class="mc-top"><b>🆕 Novedades de Engrane ${esc(ENG.VERSION)}</b><button class="x" aria-label="Cerrar" id="nov-x">✕</button></div>
        <ul class="lista-limpia">${ns.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
      app().prepend(div);
      div.querySelector('#nov-x').onclick = () => { ENG.ls.set('eng_novedades', ENG.VERSION); div.remove(); };
    }
  };
  ENG.Ayuda = { vista: vistaAyuda, AYUDA, NOVEDADES };
  ENG.Novedades = Novedades;
})();
