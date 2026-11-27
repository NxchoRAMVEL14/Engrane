// ENGRANE · panel del maestro (admin y maestros invitados)
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const esAdmin = () => ENG.ctx.perfil && ENG.ctx.perfil.rol === 'admin';
  const firma = () => (ENG.ctx.perfil && ENG.ctx.perfil.nombre ? `Profe ${ENG.ctx.perfil.nombre}` : '');

  function rachaDe(dias) {
    const set = new Set(dias || []);
    let d = set.has(ENG.hoy()) ? ENG.hoy() : ENG.sumarDias(ENG.hoy(), -1);
    let n = 0;
    while (set.has(d)) { n++; d = ENG.sumarDias(d, -1); }
    return n;
  }
  const chipsMaterias = (mats) => (mats || []).map((m) => (ENG.MATERIAS[m] ? `<span class="chip mat" style="--c:${ENG.MATERIAS[m].color}">${ENG.MATERIAS[m].icono} ${esc(ENG.MATERIAS[m].nombre)}</span>` : '')).join('');

  async function cargarAlumnos() {
    const [alumnos, resumen] = await Promise.all([ENG.API.listarAlumnos(), ENG.API.resumen()]);
    const r = {};
    (resumen || []).forEach((x) => (r[x.id] = x));
    ENG.ctx.alumnos = alumnos || [];
    ENG.ctx.resumen = r;
    return { alumnos: ENG.ctx.alumnos, r };
  }

  // ════════ Panel principal ════════
  async function panel() {
    const p = ENG.ctx.perfil;
    if (p.rol === 'pendiente' || p.rol === 'bloqueado') return espera();
    app().innerHTML = `
      <section class="panel-head">
        <div><small>${esAdmin() ? 'Administrador' : 'Maestro'}</small><h1>Hola, ${esc(p.nombre || 'profe')}</h1></div>
        ${esAdmin() ? `<button class="btn pri" id="m-nuevo">+ Nuevo alumno</button>` : ''}
      </section>
      <div class="m-nav">
        <button class="m-tab destaca" data-r="#/m/clase">🔴 Clase en vivo</button>
        <button class="m-tab" data-r="#/m/misiones">🎯 Misiones</button>
        <button class="m-tab" data-r="#/m/recordatorios">🔔 Recordatorios</button>
        <button class="m-tab" data-r="#/m/avisos">📣 Avisos</button>
        <button class="m-tab" data-r="#/m/examenes">📅 Exámenes</button>
        <button class="m-tab" data-r="#/m/analisis">📊 Análisis</button>
        <button class="m-tab" data-r="#/m/hojas">🖨️ Hojas</button>
        <button class="m-tab" data-r="#/m/reportes" id="m-tab-reportes">⚑ Reportes</button>
        <button class="m-tab" data-r="#/m/preguntas">✏️ Mis preguntas</button>
        <button class="m-tab" data-r="#/m/contenido">📚 Contenido</button>
        <button class="m-tab" data-r="#/ranking">🏁 Ranking</button>
        ${esAdmin() ? `<button class="m-tab" data-r="#/m/semestre">📅 Cambio de semestre</button><button class="m-tab" data-r="#/m/importar">📥 Importar</button><button class="m-tab" data-r="#/m/maestros" id="m-tab-maestros">👩‍🏫 Maestros</button><button class="m-tab" data-r="#/m/respaldo">💾 Respaldo</button>` : ''}
        <button class="m-tab" id="m-exportar">⬇️ Exportar avance</button>
        <button class="m-tab" data-r="#/m/cuenta">👤 Mi cuenta</button>
      </div>
      <div id="m-aviso-respaldo"></div>
      <h3 class="sec-tit">Alumnos</h3>
      <div id="m-lista">${ENG.cargandoHTML()}</div>`;
    app().querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => (location.hash = b.dataset.r)));
    const bn = document.getElementById('m-nuevo');
    if (bn) bn.onclick = () => (location.hash = '#/m/nuevo');
    document.getElementById('m-exportar').onclick = () => ENG.Importar.exportar();
    ENG.Respaldo.aviso(document.getElementById('m-aviso-respaldo'));
    ENG.Reportes.contarAbiertos().then((n) => {
      const t = document.getElementById('m-tab-reportes');
      if (t && n) t.innerHTML += ` <span class="badge">${n}</span>`;
    });
    try {
      const { alumnos, r } = await cargarAlumnos();
      const lista = document.getElementById('m-lista');
      if (!lista) return;
      if (!alumnos.length) {
        lista.innerHTML = `<div class="card vacio">${esAdmin() ? 'Aún no hay alumnos. Agrega el primero con «+ Nuevo alumno».' : 'Todavía no tienes alumnos con tus materias.'}</div>`;
      } else {
        lista.innerHTML = `<div class="grid-alumnos">${alumnos.map((a) => tarjetaAlumno(a, r[a.id])).join('')}</div>`;
        lista.querySelectorAll('[data-al]').forEach((b) => (b.onclick = () => (location.hash = '#/m/alumno/' + b.dataset.al)));
      }
      if (esAdmin()) {
        const perfiles = await ENG.API.listarPerfiles();
        const pend = perfiles.filter((x) => x.rol === 'pendiente').length;
        const t = document.getElementById('m-tab-maestros');
        if (t && pend) t.innerHTML += ` <span class="badge">${pend}</span>`;
      }
    } catch (e) {
      const lista = document.getElementById('m-lista');
      if (lista) lista.innerHTML = `<div class="card vacio">${esc(e.message)}</div>`;
    }
  }

  function tarjetaAlumno(a, r = {}) {
    const racha = rachaDe(r.dias);
    const dias = r.ultima ? Math.round((Date.parse(ENG.hoy()) - Date.parse(ENG.diaLocal(r.ultima))) / 864e5) : null;
    const alerta = !a.activo ? 'Desactivado' : dias == null ? 'Aún no entra' : dias >= 3 ? `${dias} días sin practicar` : '';
    const nv = ENG.Progreso.nivel(r.xp_total || 0);
    return `<button class="card alumno-card ${a.activo ? '' : 'inactivo'}" data-al="${a.id}">
      ${ENG.engraneSVG({ tam: 46, texto: nv.n })}
      <div class="ac-cuerpo">
        <b>${esc(a.nombre)}</b><small>${esc(a.apodo)}${a.grupo ? ' · ' + esc(a.grupo) : ''}</small>
        <div class="chips-mini">${chipsMaterias(a.materias)}</div>
        <div class="ac-datos"><span>⭐ ${r.xp_semana || 0} XP sem.</span><span>🔥 ${racha}</span><span>🕒 ${ENG.hace(r.ultima)}</span>${r.pendientes ? `<span>🎯 ${r.pendientes}</span>` : ''}</div>
        ${alerta ? `<span class="alerta-txt">⚠ ${alerta}</span>` : ''}
      </div><span class="flecha">›</span></button>`;
  }

  function espera() {
    const p = ENG.ctx.perfil;
    app().innerHTML = `<section class="card centro espera">
      ${ENG.engraneSVG({ tam: 80, clase: 'gira' })}
      <h2>${p.rol === 'bloqueado' ? 'Tu acceso está desactivado' : 'Tu cuenta espera aprobación'}</h2>
      <p>${p.rol === 'bloqueado' ? 'Habla con el administrador de Engrane.' : 'El administrador de Engrane debe aprobarte y asignarte tus materias. Cuando lo haga, entra de nuevo.'}</p>
      <label class="campo"><span>Tu nombre</span><input id="e-nombre" value="${esc(p.nombre || '')}"></label>
      <p class="peq">Materias que impartes:</p>
      <div class="checks">${opcionesMaterias(p.materias_solicitadas || [])}</div>
      <div class="botonera"><button class="btn sec" id="e-guardar">Guardar</button><button class="btn pri" id="e-reintentar">Ya me aprobaron ↻</button><button class="btn fant" id="e-salir">Salir</button></div>
    </section>`;
    document.getElementById('e-guardar').onclick = async () => {
      try {
        ENG.ctx.perfil = await ENG.API.solicitarMaterias(document.getElementById('e-nombre').value, leerChecks(app()));
        ENG.toast('Guardado ✔', 'ok');
      } catch (e) { ENG.toast(e.message, 'mal'); }
    };
    document.getElementById('e-reintentar').onclick = () => location.reload();
    document.getElementById('e-salir').onclick = () => ENG.cerrarSesion();
  }

  const opcionesMaterias = (marcadas = [], soloDisponibles = false) =>
    ENG.porSemestre(Object.values(ENG.MATERIAS).filter((m) => !soloDisponibles || m.disponible))
      .map(([sem, ms]) => `<div class="sem-tit">${ENG.nombreSemestre(sem)}</div>` + ms
        .map((m) => `<label class="check"><input type="checkbox" value="${m.id}" ${marcadas.includes(m.id) ? 'checked' : ''}><span>${m.icono} ${esc(m.nombre)}${m.disponible ? '' : ' <small>(sin contenido aún)</small>'}</span></label>`)
        .join(''))
      .join('');
  const leerChecks = (root) => [...root.querySelectorAll('.checks input:checked')].map((i) => i.value);

  // ════════ Nuevo alumno ════════
  function nuevo() {
    if (!esAdmin()) return (location.hash = '#/inicio');
    const usados = (ENG.ctx.alumnos || []).map((a) => a.apodo);
    let apodo = ENG.Apodos.nuevo(usados);
    app().innerHTML = `
      <button class="volver" id="v-volver">‹ Alumnos</button>
      <h1 class="tit">Nuevo alumno</h1>
      <form class="card form" id="f-nuevo">
        <label class="campo"><span>Nombre completo</span><input id="n-nombre" required placeholder="Ej. Juan Pablo Gutiérrez"></label>
        <label class="campo"><span>Grupo</span><input id="n-grupo" value="3A"></label>
        <div class="campo"><span>Apodo (se crea solo, al azar)</span>
          <div class="apodo-fila"><b id="n-apodo">${esc(apodo)}</b><button type="button" class="btn sec" id="n-otro">🎲 Otro</button></div></div>
        <p class="peq">Materias que va a practicar:</p>
        <div class="checks">${opcionesMaterias([], true)}</div>
        <button class="btn pri ancho" type="submit">Crear y generar códigos</button>
      </form>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    document.getElementById('n-otro').onclick = () => {
      apodo = ENG.Apodos.nuevo(usados);
      document.getElementById('n-apodo').textContent = apodo;
    };
    document.getElementById('f-nuevo').onsubmit = async (e) => {
      e.preventDefault();
      const materias = leerChecks(app());
      if (!materias.length) return ENG.toast('Elige al menos una materia', 'mal');
      try {
        const a = await ENG.API.crearAlumno({ nombre: document.getElementById('n-nombre').value, grupo: document.getElementById('n-grupo').value, apodo, materias });
        ENG.ctx.alumnos = null;
        ENG.toast('Alumno creado ✔', 'ok');
        location.hash = '#/m/alumno/' + a.id + '?tab=accesos';
      } catch (err) { ENG.toast(err.message, 'mal'); }
    };
  }

  // ════════ Detalle de alumno ════════
  async function alumno(id, tab = 'avance') {
    app().innerHTML = `<button class="volver" id="v-volver">‹ Alumnos</button>${ENG.cargandoHTML()}`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    let a, estado;
    try {
      if (!ENG.ctx.alumnos) await cargarAlumnos();
      a = ENG.ctx.alumnos.find((x) => x.id === id);
      if (!a) throw new Error('No encontré a ese alumno.');
      estado = await ENG.API.estadoAlumno(id);
    } catch (e) {
      app().innerHTML = `<button class="volver" onclick="location.hash='#/inicio'">‹ Alumnos</button><div class="card vacio">${esc(e.message)}</div>`;
      return;
    }
    const an = ENG.Progreso.analizar(estado);
    const tabs = [['avance', '📈 Avance'], ['boleta', '📝 Boleta'], ...(esAdmin() ? [['accesos', '🔑 Accesos'], ['datos', '✏️ Datos']] : [])];
    app().innerHTML = `
      <button class="volver" id="v-volver">‹ Alumnos</button>
      <header class="al-head">
        ${ENG.engraneSVG({ tam: 56, texto: an.nivel.n })}
        <div><h1>${esc(a.nombre)}</h1><p>${esc(a.apodo)} · ${esc(a.grupo || '')} ${a.activo ? '' : '· <b class="txt-rojo">desactivado</b>'}</p><div class="chips-mini">${chipsMaterias(a.materias)}</div></div>
      </header>
      <div class="tabs">${tabs.map(([k, t]) => `<button class="tab ${k === tab ? 'activa' : ''}" data-tab="${k}">${t}</button>`).join('')}</div>
      <div id="tab-cuerpo"></div>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    app().querySelectorAll('[data-tab]').forEach((b) => (b.onclick = () => {
      app().querySelectorAll('.tab').forEach((x) => x.classList.toggle('activa', x === b));
      pintarTab(b.dataset.tab);
    }));
    const pintarTab = (k) => {
      const c = document.getElementById('tab-cuerpo');
      if (k === 'avance') tabAvance(c, a, estado, an);
      if (k === 'boleta') tabBoleta(c, a, estado);
      if (k === 'accesos') tabAccesos(c, a);
      if (k === 'datos') tabDatos(c, a);
    };
    pintarTab(tab);
  }

  function tabAvance(c, a, estado, an) {
    const recientes = (estado.intentos || []).slice(-15).reverse();
    c.innerHTML = `
      <div class="botonera izq">
        <button class="btn sec" id="d-imprimir">🖨 Imprimir reporte</button>
        <button class="btn sec" id="d-wa">📲 Resumen a papás</button>
        <button class="btn sec" id="d-ver">👁 Ver como alumno</button>
      </div>
      ${ENG.Reporte.html(estado, an, { para: 'maestro' })}
      <h3 class="sec-tit">Actividad reciente</h3>
      <div class="card tabla-wrap"><table class="tabla"><thead><tr><th>Fecha</th><th>Materia</th><th>Actividad</th><th>Tema</th><th>Resultado</th></tr></thead><tbody>
        ${recientes.map((i) => {
          const t = i.tema && ENG.Banco.temas[i.tema];
          return `<tr><td>${ENG.fechaCorta(i.creado)}</td><td>${esc(ENG.MATERIAS[i.materia] ? ENG.MATERIAS[i.materia].nombre : i.materia)}</td><td>${esc(ENG.NOMBRE_MODO[i.modo] || i.modo)}</td><td>${t ? esc(t.nombre) : '—'}</td><td>${i.total ? `${i.aciertos}/${i.total}` : '✓'}${i.calificacion != null ? ` · <b>${i.calificacion}</b>` : ''}</td></tr>`;
        }).join('') || '<tr><td colspan="5">Sin actividad todavía.</td></tr>'}
      </tbody></table></div>`;
    document.getElementById('d-imprimir').onclick = () => imprimir(ENG.Reporte.html(estado, an, { para: 'papas', imprimir: true }));
    document.getElementById('d-wa').onclick = () => {
      let txt = ENG.Reporte.whatsapp(estado, an, firma());
      if (a.codigo_papas) txt += `\n\nPueden ver su reporte y probar lo que practica aquí: ${ENG.urlApp()}?papas=${a.codigo_papas}`;
      ENG.whatsapp(txt, ENG.telWa(a.tel_papas));
    };
    document.getElementById('d-ver').onclick = () => ENG.entrarPrueba('#/vista', estado);
  }

  function tabBoleta(c, a, estado) {
    const mats = (a.materias || []).filter((m) => ENG.MATERIAS[m]);
    const califs = estado.califs || [];
    c.innerHTML = `<p class="ayuda-txt">Captura las calificaciones oficiales de la boleta para comparar antes y después de practicar. Se guardan al salir de cada casilla.</p>
      ${mats.map((mid) => {
        const m = ENG.MATERIAS[mid];
        const subs = m.subs ? m.subs : [{ id: '', corto: m.nombre }];
        return `<div class="card"><h3>${m.icono} ${esc(m.nombre)}</h3><table class="tabla-boleta edit"><thead><tr><th></th><th>1er P.</th><th>2do P.</th><th>3er P.</th></tr></thead><tbody>
          ${subs.map((s) => `<tr><td>${esc(s.corto)}</td>${[1, 2, 3].map((p) => {
            const v = califs.find((x) => x.materia === mid && x.sub === s.id && x.parcial === p);
            return `<td><input class="in-cal" inputmode="numeric" maxlength="2" data-m="${mid}" data-s="${s.id}" data-p="${p}" value="${v ? v.cal : ''}"></td>`;
          }).join('')}</tr>`).join('')}</tbody></table></div>`;
      }).join('')}`;
    c.querySelectorAll('.in-cal').forEach((inp) => {
      inp.onchange = async () => {
        const v = inp.value.trim();
        const n = v === '' ? null : parseInt(v, 10);
        if (n != null && (isNaN(n) || n < 0 || n > 10)) { inp.classList.add('mal'); return ENG.toast('Calificación de 0 a 10', 'mal'); }
        try {
          await ENG.API.guardarCalif(a.id, inp.dataset.m, inp.dataset.s, +inp.dataset.p, n);
          inp.classList.remove('mal');
          inp.classList.add('guardado');
          setTimeout(() => inp.classList.remove('guardado'), 900);
          const i = califs.findIndex((x) => x.materia === inp.dataset.m && x.sub === inp.dataset.s && x.parcial === +inp.dataset.p);
          if (i >= 0) califs.splice(i, 1);
          if (n != null) califs.push({ materia: inp.dataset.m, sub: inp.dataset.s, parcial: +inp.dataset.p, cal: n });
        } catch (e) { ENG.toast(e.message, 'mal'); }
      };
    });
  }

  function tabAccesos(c, a) {
    const url = ENG.urlApp();
    const nombre = (a.nombre || '').split(' ')[0];
    const mats = (a.materias || []).map((m) => (ENG.MATERIAS[m] ? ENG.MATERIAS[m].nombre : m)).join(' y ');
    const msgAl = `¡Hola, ${nombre}! 👋 Ya tienes acceso a Engrane ⚙ para practicar ${mats}.\nEntra aquí: ${url}?alumno=${a.codigo}\nTu código: ${ENG.formatoCodigo(a.codigo)}\nTip: agrégala a tu pantalla de inicio para tenerla como app. ¡A subir de nivel!`;
    const msgPa = `Hola, familia de ${nombre} 👋\nCon este enlace pueden ver el avance de ${nombre} en Engrane y probar lo que está practicando:\n${url}?papas=${a.codigo_papas}\nCódigo de papás: ${ENG.formatoCodigo(a.codigo_papas)}${firma() ? `\n— ${firma()}` : ''}`;
    c.innerHTML = `
      <div class="card acceso">
        <h3>🎒 Acceso del alumno</h3>
        <p class="codigo-grande">${ENG.formatoCodigo(a.codigo)}</p>
        <div class="botonera izq"><button class="btn pri" id="x-wa-al">📲 Enviar por WhatsApp</button><button class="btn sec" id="x-cp-al">Copiar enlace</button><button class="btn fant" id="x-rg-al">↻ Nuevo código</button></div>
      </div>
      <div class="card acceso">
        <h3>👪 Acceso de papás</h3>
        <p class="codigo-grande">${ENG.formatoCodigo(a.codigo_papas)}</p>
        <p class="peq">Ven el reporte y pueden «probar lo que su hijo está viendo» sin afectar sus resultados.</p>
        <div class="botonera izq"><button class="btn pri" id="x-wa-pa">📲 Enviar por WhatsApp</button><button class="btn sec" id="x-cp-pa">Copiar enlace</button><button class="btn fant" id="x-rg-pa">↻ Nuevo código</button></div>
      </div>
      <p class="ayuda-txt">Si un código se comparte con quien no debe, genera uno nuevo: el anterior deja de funcionar.</p>`;
    document.getElementById('x-wa-al').onclick = () => ENG.whatsapp(msgAl, ENG.telWa(a.tel_alumno));
    document.getElementById('x-wa-pa').onclick = () => ENG.whatsapp(msgPa, ENG.telWa(a.tel_papas));
    document.getElementById('x-cp-al').onclick = () => ENG.copiar(`${url}?alumno=${a.codigo}`);
    document.getElementById('x-cp-pa').onclick = () => ENG.copiar(`${url}?papas=${a.codigo_papas}`);
    const regen = (tipo) => async () => {
      if (!(await ENG.confirmar(`¿Generar un código nuevo de ${tipo === 'papas' ? 'papás' : 'alumno'}? El anterior dejará de funcionar.`, 'Generar'))) return;
      try {
        const nuevo = await ENG.API.regenerarCodigo(a.id, tipo);
        if (tipo === 'papas') a.codigo_papas = nuevo;
        else a.codigo = nuevo;
        tabAccesos(c, a);
        ENG.toast('Código nuevo listo ✔', 'ok');
      } catch (e) { ENG.toast(e.message, 'mal'); }
    };
    document.getElementById('x-rg-al').onclick = regen('alumno');
    document.getElementById('x-rg-pa').onclick = regen('papas');
  }

  function tabDatos(c, a) {
    let apodo = a.apodo;
    c.innerHTML = `<form class="card form" id="f-datos">
      <label class="campo"><span>Nombre completo</span><input id="d-nombre" value="${esc(a.nombre)}" required></label>
      <label class="campo"><span>Grupo</span><input id="d-grupo" value="${esc(a.grupo || '')}"></label>
      <div class="dos-col"><label class="campo"><span>WhatsApp del alumno</span><input id="d-tel-al" inputmode="tel" value="${esc(a.tel_alumno || '')}" placeholder="10 dígitos"></label>
      <label class="campo"><span>WhatsApp de papá/mamá</span><input id="d-tel-pa" inputmode="tel" value="${esc(a.tel_papas || '')}" placeholder="10 dígitos"></label></div>
      <div class="campo"><span>Apodo</span><div class="apodo-fila"><b id="d-apodo">${esc(apodo)}</b><button type="button" class="btn sec" id="d-otro">🎲 Otro</button></div></div>
      <p class="peq">Materias que practica:</p>
      <div class="checks">${opcionesMaterias(a.materias || [], true)}</div>
      <label class="check"><input type="checkbox" id="d-activo" ${a.activo ? 'checked' : ''}><span>Activo (si lo apagas, su código deja de funcionar)</span></label>
      <label class="campo"><span>Notas privadas (solo tú)</span><textarea id="d-notas" rows="3">${esc(a.notas || '')}</textarea></label>
      <button class="btn pri ancho" type="submit">Guardar cambios</button>
    </form>
    <button class="btn peligro" id="d-borrar">🗑 Borrar alumno y todo su avance</button>`;
    document.getElementById('d-otro').onclick = () => {
      apodo = ENG.Apodos.nuevo((ENG.ctx.alumnos || []).map((x) => x.apodo));
      document.getElementById('d-apodo').textContent = apodo;
    };
    document.getElementById('f-datos').onsubmit = async (e) => {
      e.preventDefault();
      try {
        const cambios = {
          nombre: document.getElementById('d-nombre').value.trim(), grupo: document.getElementById('d-grupo').value.trim(), apodo,
          materias: leerChecks(c), activo: document.getElementById('d-activo').checked, notas: document.getElementById('d-notas').value,
          tel_alumno: document.getElementById('d-tel-al').value.replace(/[^\d+]/g, ''), tel_papas: document.getElementById('d-tel-pa').value.replace(/[^\d+]/g, '')
        };
        await ENG.API.actualizarAlumno(a.id, cambios);
        Object.assign(a, cambios);
        ENG.toast('Guardado ✔', 'ok');
        alumno(a.id, 'datos');
      } catch (err) { ENG.toast(err.message, 'mal'); }
    };
    document.getElementById('d-borrar').onclick = async () => {
      if (!(await ENG.confirmar(`¿Borrar a ${esc(a.nombre)} y TODO su avance? No se puede deshacer. (Si solo quieres pausarlo, desmarca «Activo».)`, 'Borrar'))) return;
      try {
        await ENG.API.borrarAlumno(a.id);
        ENG.ctx.alumnos = null;
        ENG.toast('Alumno borrado', 'ok');
        location.hash = '#/inicio';
      } catch (err) { ENG.toast(err.message, 'mal'); }
    };
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

  // ════════ Maestros (solo admin) ════════
  async function maestros() {
    if (!esAdmin()) return (location.hash = '#/inicio');
    app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">👩‍🏫 Maestros</h1>
      <p class="ayuda-txt">Crea la cuenta del maestro con su correo y sus materias. Engrane le hace una <b>contraseña temporal</b> que tú le mandas por WhatsApp; la primera vez que entre, pondrá la suya. Solo verá a los alumnos que practican esas materias, sin sus códigos.</p>
      <form class="card form" id="f-inv" onsubmit="return false">
        <div class="dos-col"><label class="campo"><span>Nombre</span><input id="inv-nom" placeholder="Ej. Teacher Ana"></label><label class="campo"><span>Correo</span><input id="inv-mail" type="email" placeholder="correo@ejemplo.com"></label></div>
        <label class="campo"><span>WhatsApp del maestro (opcional)</span><input id="inv-tel" inputmode="tel" placeholder="10 dígitos"></label>
        <div class="checks">${opcionesMaterias([], false)}</div>
        <button class="btn pri" id="inv-crear">🔑 Crear cuenta</button>
        <button class="btn fant" id="inv-ok">✉️ Mejor mandar invitación por correo</button>
        <p class="peq">El correo de Supabase solo llega a los correos de tu equipo de Supabase (máximo 2 por hora); por eso conviene «Crear cuenta». Si el maestro ya tenía cuenta o invitación, se le pone una contraseña temporal nueva.</p>
      </form>
      <div id="mm-lista">${ENG.cargandoHTML()}</div>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    const datosForm = () => {
      const f = document.getElementById('f-inv');
      return { correo: document.getElementById('inv-mail').value.trim(), nombre: document.getElementById('inv-nom').value.trim(), materias: leerChecks(f), tel: document.getElementById('inv-tel').value };
    };
    document.getElementById('inv-crear').onclick = async (ev) => {
      const d = datosForm();
      if (!d.correo) return ENG.toast('Escribe el correo', 'mal');
      if (!d.materias.length) return ENG.toast('Elige al menos una materia', 'mal');
      ev.target.disabled = true;
      try {
        const r = await ENG.API.funcion({ action: 'crear_maestro', correo: d.correo, nombre: d.nombre, materias: d.materias });
        const nombres = d.materias.map((m) => (ENG.MATERIAS[m] ? ENG.MATERIAS[m].nombre : m)).join(', ');
        const txt = `Hola${d.nombre ? ' ' + d.nombre.split(' ')[0] : ''} 👋 Te di acceso a *Engrane*, la app de práctica del CETAC 19 (${nombres}).\n\n` +
          `1) Entra a: ${ENG.urlApp()}\n2) Toca «Soy maestro» → Entrar\n3) Correo: ${d.correo}\n4) Contraseña temporal: *${r.password}*\n\nAl entrar te pedirá poner tu propia contraseña.`;
        ENG.modal({
          titulo: r.nuevo === false ? '🔑 Contraseña temporal nueva' : '🔑 Cuenta creada',
          html: `<p>Mándale esto al maestro. <b>Solo se muestra una vez.</b></p>
            <div class="caja-clave"><small>Correo</small><b>${esc(d.correo)}</b><small>Contraseña temporal</small><b class="mono">${esc(r.password)}</b></div>
            ${r.demo ? '<p class="peq">(En modo demo la contraseña no sirve: es solo de muestra.)</p>' : ''}`,
          botones: [
            { txt: '💬 Mandar por WhatsApp', clase: 'pri', fn: () => { ENG.whatsapp(txt, ENG.telWa(d.tel)); return false; } },
            { txt: '📋 Copiar mensaje', clase: 'sec', fn: () => { ENG.copiar(txt); return false; } },
            { txt: 'Listo', clase: 'fant' }
          ]
        });
        maestros();
      } catch (e) { ENG.toast(e.message, 'mal'); ev.target.disabled = false; }
    };
    document.getElementById('inv-ok').onclick = async () => {
      const d = datosForm();
      if (!d.correo) return ENG.toast('Escribe el correo', 'mal');
      try {
        const r = await ENG.API.funcion({ action: 'invitar', correo: d.correo, nombre: d.nombre, materias: d.materias, url: ENG.urlApp() });
        ENG.toast(r.demo ? 'En demo no se mandan correos' : 'Invitación enviada ✔ (si no llega, usa «Crear cuenta»)', 'ok');
        maestros();
      } catch (e) { ENG.toast(e.message, 'mal'); }
    };
    try {
      const perfiles = await ENG.API.listarPerfiles();
      const cont = document.getElementById('mm-lista');
      cont.innerHTML = perfiles.map((p) => `<div class="card maestro-card" data-id="${p.id}">
        <div class="mc-top"><div><b>${esc(p.nombre || '(sin nombre)')}</b><small>${esc(p.correo || '')}</small></div><span class="rol rol-${p.rol}">${p.rol}</span></div>
        ${p.materias_solicitadas && p.materias_solicitadas.length ? `<p class="peq">Dice que imparte: ${p.materias_solicitadas.map((m) => esc(ENG.MATERIAS[m] ? ENG.MATERIAS[m].nombre : m)).join(', ')}</p>` : ''}
        ${p.rol === 'admin' ? '<p class="peq">Ve todo.</p>' : `<div class="checks">${opcionesMaterias(p.materias && p.materias.length ? p.materias : p.materias_solicitadas || [])}</div>
        <div class="botonera izq">
          <button class="btn pri" data-acc="aprobar">${p.rol === 'maestro' ? 'Guardar materias' : 'Aprobar'}</button>
          ${p.rol !== 'bloqueado' ? '<button class="btn fant" data-acc="bloquear">Bloquear</button>' : ''}
        </div>`}
      </div>`).join('') || '<p class="vacio">Sin maestros todavía.</p>';
      cont.querySelectorAll('[data-acc]').forEach((b) => {
        b.onclick = async () => {
          const card = b.closest('.maestro-card');
          try {
            if (b.dataset.acc === 'aprobar') await ENG.API.actualizarPerfil(card.dataset.id, 'maestro', leerChecks(card));
            else await ENG.API.actualizarPerfil(card.dataset.id, 'bloqueado', null);
            ENG.toast('Listo ✔', 'ok');
            maestros();
          } catch (e) { ENG.toast(e.message, 'mal'); }
        };
      });
    } catch (e) {
      document.getElementById('mm-lista').innerHTML = `<div class="card vacio">${esc(e.message)}</div>`;
    }
  }

  // ════════ Contenido ════════
  function contenido() {
    const mats = Object.values(ENG.MATERIAS).filter((m) => m.disponible);
    app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">📚 Contenido</h1>
      <p class="ayuda-txt">Todo sale de los programas oficiales de la SEP. Toca «Probar» para jugarlo como alumno (no se guarda nada).</p>
      ${mats.map((m, i) => {
        const temas = ENG.Banco.temasDe(m.id);
        const cab = i === 0 || mats[i - 1].semestre !== m.semestre ? `<h3 class="sec-tit">${ENG.nombreSemestre(m.semestre)}</h3>` : '';
        const nq = temas.reduce((s, t) => s + t.preguntas.length, 0);
        return cab + `<div class="card cont-mat">
          <div class="mc-top"><div><b>${m.icono} ${esc(m.nombre)}</b><small>${esc(m.titulo)} · ${temas.length} temas · ${nq} preguntas</small></div><button class="btn pri" data-probar="${m.id}">Probar</button></div>
          <p class="fuente">Fuente: ${esc(m.fuente)}</p>
          <ol class="lista-cont">${temas.map((t) => `<li><b>${esc(t.nombre)}</b> <small>${t.sub ? t.sub.toUpperCase() + ' · ' : ''}${(t.leccion || []).length} tarjetas · ${t.preguntas.length} preguntas${t.pares ? ' · memorama' : ''}</small><br><small class="txt-gris">${esc(t.proposito || '')}</small></li>`).join('')}</ol>
        </div>`;
      }).join('')}`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    app().querySelectorAll('[data-probar]').forEach((b) => (b.onclick = () => ENG.entrarPrueba('#/materia/' + b.dataset.probar)));
  }

  // ════════ Mi cuenta ════════
  function cuenta() {
    const p = ENG.ctx.perfil;
    app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">👤 Mi cuenta</h1>
      <div class="card form">
        <p><b>${esc(p.correo || '')}</b> · <span class="rol rol-${p.rol}">${p.rol}</span></p>
        <label class="campo"><span>Nombre (aparece en mensajes a papás)</span><input id="c-nombre" value="${esc(p.nombre || '')}"></label>
        ${esAdmin() ? '' : `<p class="peq">Materias que imparto (el admin decide cuáles puedes ver):</p><div class="checks">${opcionesMaterias(p.materias_solicitadas || [])}</div>`}
        <button class="btn pri" id="c-guardar">Guardar</button>
      </div>
      <div id="c-push"></div>
      ${ENG.API.modo === 'demo' ? '' : `<form class="card form" id="f-pass" onsubmit="return false"><b>🔒 Cambiar contraseña</b>
        <label class="campo"><span>Nueva contraseña (mínimo 8)</span><input id="c-pass" type="password" autocomplete="new-password"></label>
        <button class="btn sec" id="c-pass-ok">Cambiar</button></form>`}
      <div class="card"><label class="check"><input type="checkbox" id="c-sonido" ${ENG.sonidoActivo() ? 'checked' : ''}><span>Sonidos de la app</span></label></div>
      <button class="btn sec ancho" id="c-salir">Cerrar sesión</button>
      <p class="pie-nota">Engrane v${ENG.VERSION} · ${ENG.API.modo === 'demo' ? 'modo demo' : 'conectado a Supabase'}</p>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    document.getElementById('c-guardar').onclick = async () => {
      try {
        ENG.ctx.perfil = Object.assign(p, await ENG.API.solicitarMaterias(document.getElementById('c-nombre').value, esAdmin() ? p.materias_solicitadas || [] : leerChecks(app())));
        ENG.toast('Guardado ✔', 'ok');
      } catch (e) { ENG.toast(e.message, 'mal'); }
    };
    document.getElementById('c-sonido').onchange = (e) => ENG.ls.set('eng_sonido', e.target.checked);
    const bp = document.getElementById('c-pass-ok');
    if (bp) bp.onclick = async () => {
      const v = document.getElementById('c-pass').value;
      if (v.length < 8) return ENG.toast('Usa al menos 8 caracteres', 'mal');
      try { await ENG.API.cambiarContrasena(v); ENG.toast('Contraseña cambiada ✔', 'ok'); document.getElementById('c-pass').value = ''; } catch (e) { ENG.toast(e.message, 'mal'); }
    };
    document.getElementById('c-salir').onclick = () => ENG.cerrarSesion();
    ENG.Push.pintar(document.getElementById('c-push'), 'maestro', null, { forzar: true });
  }

  ENG.VistasMaestro = { panel, nuevo, alumno, maestros, contenido, cuenta, opcionesMaterias, leerChecks };
})();
