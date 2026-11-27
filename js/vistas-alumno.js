// ENGRANE · pantallas del alumno (también las usan papás y maestros en modo prueba)
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const SEM_TXT = { verde: 'Dominado', amarillo: 'En camino', rojo: 'A reforzar', gris: 'Sin datos' };

  function bannerPrueba() {
    if (!ENG.ctx.prueba) return '';
    const volver = ENG.ctx.rol === 'papas' ? 'Volver al reporte' : 'Volver al panel';
    return `<div class="banner-prueba"><span>👀 Modo prueba: puedes jugar todo, pero nada se guarda.</span><button class="btn fant mini" id="b-salir-prueba">${volver}</button></div>`;
  }
  function conectarBanner() {
    const b = document.getElementById('b-salir-prueba');
    if (b) b.onclick = () => {
      ENG.salirPrueba();
    };
  }

  // ════════ Inicio del alumno ════════
  function inicio() {
    const { estado, an } = ENG.ctx;
    const al = estado.alumno;
    const nv = an.nivel;
    const materias = (al.materias || []).filter((m) => ENG.MATERIAS[m]);
    const sugerencias = materias
      .filter((m) => ENG.MATERIAS[m].disponible)
      .map((m) => ({ m, s: ENG.Progreso.sugerencia(an, m) }))
      .filter((x) => x.s);
    const insLog = an.insignias.filter((x) => x.logrado);
    const planEx = ENG.Examenes.planItems(estado).filter((x) => ENG.MATERIAS[x.m]);
    app().innerHTML = `
      ${bannerPrueba()}
      <section class="hero card">
        <div class="hero-engrane" id="ir-insignias">${ENG.engraneSVG({ tam: 84, texto: nv.n, dientes: 12 })}</div>
        <div class="hero-txt">
          <small>¡Hola!</small>
          <h1 class="apodo">${esc(al.apodo)}</h1>
          <p class="nivel-nom">Nivel ${nv.n} · <b>${esc(nv.nombre)}</b></p>
          <div class="barra-xp"><i style="width:${Math.round(nv.pct * 100)}%"></i></div>
          <small class="xp-txt">${an.xp} XP ${nv.hasta ? `· faltan ${nv.falta} para ${esc(nv.siguiente)}` : '· ¡nivel máximo!'}</small>
        </div>
      </section>
      <div class="chips-fila">
        <span class="chip grande">🔥 ${an.racha} ${an.racha === 1 ? 'día' : 'días'} de racha</span>
        <span class="chip grande">⭐ ${an.xpSemana} XP esta semana</span>
        ${ENG.API.pendientesCola() ? `<span class="chip grande alerta">📴 ${ENG.API.pendientesCola()} por subir</span>` : ''}
      </div>
      <div id="i-vivo"></div>
      ${ENG.ctx.prueba ? '' : ENG.Avisos.banner(estado, 'alumnos')}
      ${ENG.Examenes.tarjetas(estado)}
      ${ENG.Misiones.tarjetas(estado)}

      ${sugerencias.length || planEx.length ? `<h3 class="sec-tit">Hoy te toca</h3>
        ${planEx.map((x) => `<button class="card sug ${x.hecho ? 'hecho' : ''}" data-m="${x.m}" data-tipo="intensivo" data-ex="${x.id}">
          <span class="sug-ico" style="background:${ENG.MATERIAS[x.m].color}">${x.hecho ? '✔' : '⚡'}</span>
          <span><small>${esc(ENG.MATERIAS[x.m].nombre)}${x.hecho ? ' · hecho hoy' : ''}</small><b>${esc(x.texto)}</b></span><span class="flecha">›</span></button>`).join('')}
        ${sugerencias.map(({ m, s }) => `<button class="card sug" data-m="${m}" data-tipo="${s.tipo}" data-tema="${s.tema ? s.tema.id : ''}">
          <span class="sug-ico" style="background:${ENG.MATERIAS[m].color}">${ENG.MATERIAS[m].icono}</span>
          <span><small>${esc(ENG.MATERIAS[m].nombre)}</small><b>${esc(s.texto)}</b></span><span class="flecha">›</span></button>`).join('')}` : ''}

      <h3 class="sec-tit">Mis materias</h3>
      <div class="grid-materias">
        ${gruposMaterias(materias) || '<p class="vacio">Tu profe todavía no te asigna materias.</p>'}
      </div>
      <button class="card mini-card ancho-c" id="ir-lab"><span class="mini-ico">🧪</span><b>Laboratorio virtual</b><small>Neumática, fuerza de cilindros y PLC en escalera</small></button>

      <div class="dos-col">
        <button class="card mini-card" id="ir-ranking"><span class="mini-ico">🏁</span><b>Ranking semanal</b><small>Con apodos</small></button>
        <button class="card mini-card" id="ir-insignias2"><span class="mini-ico">🏅</span><b>Insignias</b><small>${insLog.length} de ${an.insignias.length}</small></button>
      </div>
      <button class="card mini-card ancho-c" id="ir-clase"><span class="mini-ico">🔴</span><b>Clase en vivo</b><small>Entra con el PIN de tu profe</small></button>
      <div id="i-push"></div>
      <p class="pie-nota">Tu nombre real solo lo ven tus profes. En el ranking apareces como <b>${esc(al.apodo)}</b>.</p>`;
    conectarBanner();
    ENG.Avisos.conectar(app());
    ENG.Misiones.conectar(app(), estado);
    ENG.Examenes.conectar(app());
    const bc = document.getElementById('ir-clase');
    if (ENG.ctx.prueba || ENG.ctx.rol !== 'alumno') bc.remove();
    else {
      bc.onclick = () => (location.hash = '#/clase');
      ENG.Clase.banner(document.getElementById('i-vivo'));
      ENG.Push.pintar(document.getElementById('i-push'), 'alumno', ENG.ctx.codigo);
    }
    app().querySelectorAll('[data-materia]').forEach((b) => (b.onclick = () => (location.hash = '#/materia/' + b.dataset.materia)));
    app().querySelectorAll('.sug').forEach((b) => {
      b.onclick = () => {
        const { m, tipo, tema } = b.dataset;
        if (tipo === 'intensivo') return ENG.Examenes.intensivo(+b.dataset.ex);
        if (tipo === 'repaso') return iniciarRepaso(m);
        if (tipo === 'examen') return elegirExamen(m);
        if (tipo === 'jefe') return iniciarJefe(ENG.Banco.temas[tema]);
        location.hash = '#/tema/' + tema;
      };
    });
    document.getElementById('ir-ranking').onclick = () => (location.hash = '#/ranking');
    document.getElementById('ir-lab').onclick = () => (location.hash = '#/lab');
    document.getElementById('ir-insignias').onclick = document.getElementById('ir-insignias2').onclick = () => (location.hash = '#/insignias');
    revelarApodo();
  }

  // Si el alumno tiene materias de varios semestres, se separan con un título
  function gruposMaterias(ids) {
    const ms = ids.filter((id) => ENG.MATERIAS[id]).map((id) => ENG.MATERIAS[id]);
    const g = ENG.porSemestre(ms);
    if (g.length < 2) return ms.map((m) => tarjetaMateria(m.id)).join('');
    return g.map(([sem, lista]) => `<div class="sem-tit full">${ENG.nombreSemestre(sem)}</div>${lista.map((m) => tarjetaMateria(m.id)).join('')}`).join('');
  }

  function tarjetaMateria(mid) {
    const m = ENG.MATERIAS[mid];
    const st = ENG.ctx.an.materias[mid] || { temas: 0, verde: 0, amarillo: 0, rojo: 0, gris: 0, dominio: 0, pendientes: 0 };
    if (!m.disponible) {
      return `<div class="card materia off"><span class="mat-ico" style="background:${m.color}">${m.icono}</span><div><b>${esc(m.nombre)}</b><small>Contenido en preparación</small></div></div>`;
    }
    const total = st.temas || ENG.Banco.temasDe(mid).length;
    return `<button class="card materia" data-materia="${mid}">
      <span class="mat-ico" style="background:${m.color}">${m.icono}</span>
      <div class="mat-cuerpo">
        <b>${esc(m.nombre)}</b><small>${esc(m.titulo)}</small>
        <div class="semaforo-barra">
          <i class="verde" style="flex:${st.verde}"></i><i class="amarillo" style="flex:${st.amarillo}"></i><i class="rojo" style="flex:${st.rojo}"></i><i class="gris" style="flex:${st.gris || (st.temas ? 0 : total)}"></i>
        </div>
        <small>${st.verde} de ${total} temas en verde${st.pendientes ? ` · <b class="txt-naranja">${st.pendientes} por repasar</b>` : ''}</small>
      </div><span class="flecha">›</span></button>`;
  }

  function revelarApodo() {
    if (ENG.ctx.rol !== 'alumno' || ENG.ctx.prueba) return;
    const al = ENG.ctx.estado.alumno;
    const k = 'eng_apodo_visto_' + al.id;
    if (ENG.ls.get(k) === al.apodo) return;
    ENG.ls.set(k, al.apodo);
    ENG.sonido('nivel');
    ENG.modal({
      clase: 'revelar',
      html: `<div class="revelar-cuerpo">${ENG.engraneSVG({ tam: 110, dientes: 14, clase: 'gira-una' })}
        <p>Tu apodo en Engrane es…</p><h2 class="apodo-grande">${esc(al.apodo)}</h2>
        <p class="peq">Así te verán los demás en el ranking. Tu nombre real solo lo ven tus profes.</p></div>`,
      botones: [{ txt: '¡Vamos! ⚙', clase: 'pri' }]
    });
  }

  // ════════ Materia ════════
  // El alumno solo entra a las materias que su maestro le activó (papás y maestros en «prueba» ven lo que se les muestra)
  function sinAcceso(mid) {
    const c = ENG.ctx;
    const al = c.estado && c.estado.alumno;
    if (c.rol !== 'alumno' || c.prueba || !al || !Array.isArray(al.materias) || al.materias.includes(mid)) return false;
    ENG.toast('Esa materia no está activada para ti. Pídesela a tu profe.', '');
    location.hash = '#/inicio';
    return true;
  }
  function materia(mid) {
    const m = ENG.MATERIAS[mid];
    if (!m || !m.disponible) return (location.hash = '#/inicio');
    if (sinAcceso(mid)) return;
    const an = ENG.ctx.an;
    const st = an.materias[mid] || { pendientes: 0, diagnostico: false, examenes: [] };
    const temas = ENG.Banco.temasDe(mid);
    const grupos = m.subs ? m.subs.map((s) => ({ s, temas: temas.filter((t) => t.sub === s.id) })) : [{ s: null, temas }];
    const ultEx = (st.examenes || []).slice(-1)[0];
    app().innerHTML = `
      ${bannerPrueba()}
      <button class="volver" id="v-volver">‹ Inicio</button>
      <header class="mat-head" style="--c:${m.color}">
        <span class="mat-ico grande" style="background:${m.color}">${m.icono}</span>
        <div><h1>${esc(m.nombre)}</h1><p>${esc(m.titulo)}</p></div>
      </header>
      ${!st.diagnostico ? `<button class="card destacado" id="a-diag"><span class="mini-ico">🧭</span><div><b>Empieza con un diagnóstico</b><small>${Math.min(30, temas.length * 2)} preguntas (2 por tema) · sin presión · así sé qué temas te cuestan</small></div><span class="flecha">›</span></button>` : ''}
      <div class="acciones">
        <button class="accion" id="a-repaso"><span>🎯</span><b>Repaso de errores</b><small>${st.pendientes ? `${st.pendientes} pendientes` : 'Al día'}</small></button>
        <button class="accion" id="a-examen"><span>🎓</span><b>Examen simulado</b><small>${ultEx ? `Último: ${ultEx.calificacion}` : '20 preguntas'}</small></button>
        <button class="accion" id="a-reloj"><span>⚡</span><b>Contra reloj</b><small>75 segundos</small></button>
        ${m.subs ? `<button class="accion" id="a-mezcla"><span>🔀</span><b>Clase mezclada</b><small>S1 + S2 + S3</small></button>` : `<button class="accion" id="a-diag2"><span>🧭</span><b>Diagnóstico</b><small>Vuelve a medirte</small></button>`}
      </div>
      <h3 class="sec-tit">Mapa de temas</h3>
      <div class="leyenda"><span><i class="sem verde"></i>Dominado</span><span><i class="sem amarillo"></i>En camino</span><span><i class="sem rojo"></i>A reforzar</span><span><i class="sem gris"></i>Sin datos</span></div>
      ${grupos.map(({ s, temas }) => `
        ${s ? `<h4 class="sub-tit"><span class="sub-tag">${s.corto}</span>${esc(s.nombre)}</h4>` : ''}
        <div class="lista-temas">${temas.map((t) => filaTema(t)).join('')}</div>`).join('')}
      <p class="fuente">Fuente: ${esc(m.fuente)}</p>`;
    conectarBanner();
    document.getElementById('v-volver').onclick = () => (location.hash = ENG.ctx.prueba && ENG.ctx.rol === 'maestro' ? '#/m/contenido' : '#/inicio');
    app().querySelectorAll('[data-tema]').forEach((b) => (b.onclick = () => (location.hash = '#/tema/' + b.dataset.tema)));
    const diag = () =>
      ENG.Motor.iniciar({ materia: mid, modo: 'diagnostico', titulo: m.nombre, preguntas: ENG.Selector.diagnostico(mid), feedback: false, repetir: diag });
    const bd = document.getElementById('a-diag');
    if (bd) bd.onclick = diag;
    const bd2 = document.getElementById('a-diag2');
    if (bd2) bd2.onclick = diag;
    document.getElementById('a-repaso').onclick = () => iniciarRepaso(mid);
    document.getElementById('a-examen').onclick = () => elegirExamen(mid);
    document.getElementById('a-reloj').onclick = () => iniciarReloj(mid, null);
    const bm = document.getElementById('a-mezcla');
    if (bm) {
      const mez = () => ENG.Motor.iniciar({ materia: mid, modo: 'mezcla', titulo: 'S1 + S2 + S3', preguntas: ENG.Selector.mezcla(mid, ENG.ctx.estado), repetir: mez });
      bm.onclick = mez;
    }
  }

  function filaTema(t) {
    const st = ENG.ctx.an.temas[t.id];
    return `<button class="fila-tema" data-tema="${t.id}">
      <i class="sem ${st.sem}" title="${SEM_TXT[st.sem]}"></i>
      <span class="ft-txt"><b>${esc(t.nombre)}</b><small>${st.n >= 2 ? `${Math.round(st.pct * 100)}% en lo último${st.n < 5 ? ' (estimado)' : ''}` : st.n ? '1 respuesta' : 'Sin empezar'}${st.leccion ? ' · 📘' : ''}</small></span>
      ${st.dominado ? '<span class="badge-dom" title="Jefe vencido">🛡️</span>' : ''}<span class="flecha">›</span></button>`;
  }

  function iniciarRepaso(mid) {
    const preguntas = ENG.Selector.repaso(mid, ENG.ctx.estado);
    if (!preguntas.length) {
      ENG.modal({ titulo: '🎯 Repaso al día', html: '<p>No tienes errores pendientes por ahora. Las preguntas que falles vuelven aquí para que las repases en los días siguientes.</p>' });
      return;
    }
    const r = () => ENG.Motor.iniciar({ materia: mid, modo: 'repaso', titulo: ENG.MATERIAS[mid].nombre, preguntas: ENG.Selector.repaso(mid, ENG.ctx.estado), repetir: r });
    r();
  }

  function elegirExamen(mid) {
    const m = ENG.MATERIAS[mid];
    const lanzar = (sub) => {
      const go = () =>
        ENG.Motor.iniciar({
          materia: mid, modo: 'examen', titulo: sub ? `${m.nombre} · ${sub.toUpperCase()}` : m.nombre,
          preguntas: ENG.Selector.examen(mid, sub, 20), feedback: false, tiempo: 25 * 60, repetir: go
        });
      go();
    };
    const html = `<p>20 preguntas, 25 minutos, sin pistas. Al final ves tu calificación como en la boleta (base 10, sin decimales) y la explicación de cada error.</p>
      ${m.subs ? `<div class="lista-botones">${[{ id: '', n: 'Todo el módulo' }, ...m.subs.map((s) => ({ id: s.id, n: `${s.corto} · ${s.nombre}` }))].map((x) => `<button class="btn sec ancho" data-sub="${x.id}">${esc(x.n)}</button>`).join('')}</div>` : ''}`;
    const md = ENG.modal({
      titulo: '🎓 Examen simulado',
      html,
      botones: m.subs ? [{ txt: 'Cancelar' }] : [{ txt: 'Cancelar' }, { txt: 'Empezar', clase: 'pri', fn: () => lanzar(null) }]
    });
    md.el.querySelectorAll('[data-sub]').forEach((b) => (b.onclick = () => { md.cerrar(); lanzar(b.dataset.sub || null); }));
  }

  function iniciarReloj(mid, tema) {
    const pool = tema ? tema.preguntas : ENG.Banco.preguntasDe(mid);
    const go = () =>
      ENG.Motor.iniciar({ materia: mid, tema: tema ? tema.id : null, modo: 'reloj', titulo: tema ? tema.nombre : ENG.MATERIAS[mid].nombre, preguntas: ENG.Selector.reloj(pool), tiempo: 75, feedback: false, repetir: go });
    go();
  }
  function iniciarJefe(tema) {
    const go = () => ENG.Motor.iniciar({ materia: tema.materia, tema: tema.id, modo: 'jefe', titulo: tema.nombre, preguntas: ENG.Selector.jefe(tema), feedback: false, repetir: go });
    go();
  }

  // ════════ Tema ════════
  function tema(tid) {
    const t = ENG.Banco.temas[tid];
    if (!t) return (location.hash = '#/inicio');
    if (sinAcceso(t.materia)) return;
    const m = ENG.MATERIAS[t.materia];
    const st = ENG.ctx.an.temas[tid];
    const sub = m.subs ? m.subs.find((s) => s.id === t.sub) : null;
    app().innerHTML = `
      ${bannerPrueba()}
      <button class="volver" id="v-volver">‹ ${esc(m.nombre)}</button>
      <header class="tema-head card" style="--c:${m.color}">
        <small>${sub ? `${sub.corto} · ${esc(sub.nombre)}` : esc(m.nombre)}</small>
        <h1>${esc(t.nombre)}</h1>
        <p class="proposito">${esc(t.proposito || '')}</p>
        <div class="tema-estado"><i class="sem ${st.sem}"></i> ${SEM_TXT[st.sem]}${st.n >= 2 ? ` · ${Math.round(st.pct * 100)}% en tus últimas respuestas` : ''}${st.dominado ? ' · 🛡️ Jefe vencido' : ''}</div>
      </header>
      <div class="lista-acts">
        <button class="act" id="t-leccion"><span class="act-ico">📘</span><span><b>Lección</b><small>${(t.leccion || []).length} tarjetas · explicación con ejemplos${st.leccion ? ' · ✓ vista' : ''}</small></span><span class="flecha">›</span></button>
        <button class="act" id="t-practica"><span class="act-ico">✏️</span><span><b>Práctica</b><small>10 preguntas con explicación al momento</small></span><span class="flecha">›</span></button>
        <button class="act" id="t-reloj"><span class="act-ico">⚡</span><span><b>Contra reloj</b><small>¿Cuántas sacas en 75 segundos?</small></span><span class="flecha">›</span></button>
        ${t.pares && t.pares.length >= 3 ? `<button class="act" id="t-memo"><span class="act-ico">🧩</span><span><b>Memorama</b><small>Encuentra las parejas</small></span><span class="flecha">›</span></button>` : ''}
        <button class="act jefe" id="t-jefe"><span class="act-ico">🛡️</span><span><b>Jefe final</b><small>10 preguntas sin pistas · 8 aciertos = tema dominado</small></span><span class="flecha">›</span></button>
      </div>
      <p class="fuente">${t.preguntas.length} preguntas en este tema · Fuente: ${esc(m.fuente)}</p>`;
    conectarBanner();
    document.getElementById('v-volver').onclick = () => (location.hash = '#/materia/' + t.materia);
    document.getElementById('t-leccion').onclick = () => ENG.Motor.leccion(t);
    const prac = () => ENG.Motor.iniciar({ materia: t.materia, tema: t.id, modo: 'practica', titulo: t.nombre, preguntas: ENG.Selector.practica(t, ENG.ctx.estado), repetir: prac });
    document.getElementById('t-practica').onclick = prac;
    document.getElementById('t-reloj').onclick = () => iniciarReloj(t.materia, t);
    const bm = document.getElementById('t-memo');
    if (bm) bm.onclick = () => ENG.Motor.memorama(t);
    document.getElementById('t-jefe').onclick = () => iniciarJefe(t);
  }

  // ════════ Ranking ════════
  async function ranking() {
    app().innerHTML = `<button class="volver" id="v-volver">‹ Inicio</button><h1 class="tit">🏁 Ranking semanal</h1>${ENG.cargandoHTML()}`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    let lista = [];
    try {
      lista = await ENG.API.ranking(ENG.ctx.rol === 'maestro' ? null : ENG.ctx.codigo);
    } catch (e) {
      app().querySelector('.cargando').outerHTML = `<p class="vacio">${esc(e.message)}</p>`;
      return;
    }
    const medalla = ['🥇', '🥈', '🥉'];
    app().querySelector('.cargando').outerHTML = `
      <p class="ayuda-txt">Se reinicia cada lunes. Cuenta la XP que ganas practicando.</p>
      <div class="ranking">${lista
        .map((r, i) => `<div class="rk-fila ${r.yo ? 'yo' : ''}"><span class="rk-pos">${medalla[i] || i + 1}</span>
          <span class="rk-nom"><b>${esc(r.apodo)}</b>${r.nombre ? `<small>${esc(r.nombre)}</small>` : r.yo ? '<small>Tú</small>' : ''}</span>
          <span class="rk-xp"><b>${r.xp_semana}</b><small>XP semana</small></span><span class="rk-xp tot"><b>${r.xp_total}</b><small>total</small></span></div>`)
        .join('') || '<p class="vacio">Todavía no hay datos.</p>'}</div>`;
  }

  // ════════ Insignias y niveles ════════
  function insignias() {
    const an = ENG.ctx.an;
    app().innerHTML = `
      <button class="volver" id="v-volver">‹ Inicio</button>
      <h1 class="tit">🏅 Insignias</h1>
      <div class="insignias">${an.insignias
        .map((x) => `<div class="ins ${x.logrado ? 'si' : 'no'}"><span class="ins-ico">${x.logrado ? x.icono : '🔒'}</span><b>${esc(x.nombre)}</b><small>${esc(x.desc)}</small></div>`)
        .join('')}</div>
      <h3 class="sec-tit">Niveles</h3>
      <div class="niveles">${ENG.Progreso.NIVELES.map(([xp, nom], i) => `<div class="nv ${an.nivel.n === i + 1 ? 'actual' : an.nivel.n > i + 1 ? 'pasado' : ''}">${ENG.engraneSVG({ tam: 34, texto: i + 1, color: an.nivel.n >= i + 1 ? 'var(--naranja)' : '#B8C4CF' })}<b>${esc(nom)}</b><small>${xp} XP</small></div>`).join('')}</div>
      <div class="card ayuda"><b>¿Cómo gano XP?</b><ul>
        <li>Cada acierto en práctica o repaso: <b>10 XP</b> (+20 si sacas 80% o más)</li>
        <li>Jefe final: <b>12 XP</b> por acierto y <b>+80</b> si lo vences</li>
        <li>Examen simulado: <b>10 XP</b> por acierto y <b>+50</b> si sacas 9 o 10</li>
        <li>Contra reloj: <b>6 XP</b> por acierto · Memorama: <b>30–50 XP</b> · Lección: <b>15 XP</b> al día</li></ul></div>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
  }

  const practicar = (t) => {
    const go = () => ENG.Motor.iniciar({ materia: t.materia, tema: t.id, modo: 'practica', titulo: t.nombre, preguntas: ENG.Selector.practica(t, ENG.ctx.estado), repetir: go });
    go();
  };
  ENG.VistasAlumno = { inicio, materia, tema, ranking, insignias, tarjetaMateria, practicar, iniciarJefe, iniciarReloj, iniciarRepaso, elegirExamen };
})();
