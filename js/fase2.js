// ENGRANE · Fase 2 y 3: misiones, avisos, recordatorios, notificaciones, importar y exportar
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const esAdmin = () => ENG.ctx.perfil && ENG.ctx.perfil.rol === 'admin';
  const misMaterias = () => {
    const p = ENG.ctx.perfil;
    const todas = Object.values(ENG.MATERIAS);
    if (!p || p.rol === 'admin') return todas;
    return todas.filter((m) => (p.materias || []).includes(m.id));
  };
  const opcionesMateria = (sel = '', vacio = '') =>
    (vacio ? `<option value="">${vacio}</option>` : '') +
    misMaterias().map((m) => `<option value="${m.id}" ${m.id === sel ? 'selected' : ''}>${m.icono} ${esc(m.nombre)}</option>`).join('');
  const nombreMateria = (id) => (ENG.MATERIAS[id] ? ENG.MATERIAS[id].nombre : id || 'Todas');
  const telWa = (t) => {
    const d = String(t || '').replace(/\D/g, '');
    if (!d) return '';
    return d.length === 10 ? '52' + d : d;
  };

  // ══════════════════════════ MISIONES ══════════════════════════
  const MODOS_MISION = [
    ['practica', '✏️ Práctica'], ['jefe', '🛡️ Jefe final'], ['examen', '🎓 Examen simulado'], ['leccion', '📘 Lección'],
    ['reloj', '⚡ Contra reloj'], ['memorama', '🧩 Memorama'], ['repaso', '🎯 Repaso de errores'], ['cualquiera', '⚙️ Cualquier actividad']
  ];
  const nombreModo = (m) => (MODOS_MISION.find((x) => x[0] === m) || [m, m])[1];

  const Misiones = {
    cumple(m, it) {
      if (it.materia !== m.materia) return false;
      if (m.tema && it.tema !== m.tema) return false;
      if (m.modo !== 'cualquiera' && it.modo !== m.modo) return false;
      if (new Date(it.creado) < new Date(m.creado)) return false;
      if (m.modo === 'leccion' || m.modo === 'memorama') return true;
      return it.total > 0 && (it.aciertos / it.total) * 100 >= m.meta;
    },
    estado(m, intentos) {
      const ok = (intentos || []).filter((it) => Misiones.cumple(m, it));
      const hoy = ENG.hoy();
      if (ok.length) {
        const f = ENG.diaLocal(ok[0].creado);
        return { hecha: true, tarde: f > m.fecha_limite, fecha: f };
      }
      return { hecha: false, vencida: hoy > m.fecha_limite, dias: Math.round((Date.parse(m.fecha_limite) - Date.parse(hoy)) / 864e5) };
    },
    textoFecha(m, st) {
      if (st.hecha) return st.tarde ? `✔ Cumplida (tarde, ${ENG.fechaCorta(st.fecha)})` : `✔ Cumplida ${ENG.fechaCorta(st.fecha)}`;
      if (st.vencida) return `⏰ Venció el ${ENG.fechaCorta(m.fecha_limite)}`;
      if (st.dias === 0) return '⏳ Vence HOY';
      if (st.dias === 1) return '⏳ Vence mañana';
      return `Vence el ${ENG.diaSemana(m.fecha_limite)} ${ENG.fechaCorta(m.fecha_limite)}`;
    },
    meta(m) {
      if (m.modo === 'leccion' || m.modo === 'memorama') return 'Termínala';
      return `${m.meta}% de aciertos o más`;
    },
    // Tarjetas en el inicio del alumno
    tarjetas(estado) {
      const ms = (estado.misiones || []).filter((m) => ENG.MATERIAS[m.materia]);
      if (!ms.length) return '';
      const filas = ms
        .map((m) => ({ m, st: Misiones.estado(m, estado.intentos) }))
        .filter(({ st }) => !st.hecha || ENG.sumarDias(st.fecha, 3) >= ENG.hoy())
        .sort((a, b) => (a.st.hecha - b.st.hecha) || (a.m.fecha_limite < b.m.fecha_limite ? -1 : 1));
      if (!filas.length) return '';
      return `<h3 class="sec-tit">🎯 Misiones de tu profe</h3>${filas
        .map(({ m, st }) => {
          const t = m.tema && ENG.Banco.temas[m.tema];
          return `<div class="card mision ${st.hecha ? 'hecha' : st.vencida ? 'vencida' : st.dias <= 1 ? 'urgente' : ''}">
            <div class="mis-cuerpo"><small>${esc(nombreMateria(m.materia))}${t ? ' · ' + esc(t.nombre) : ''}</small><b>${esc(m.titulo)}</b>
            <small>${nombreModo(m.modo)} · ${Misiones.meta(m)}${m.nota ? ' · ' + esc(m.nota) : ''}</small>
            <span class="mis-fecha">${Misiones.textoFecha(m, st)}</span></div>
            ${st.hecha ? '<span class="mis-ok">✔</span>' : `<button class="btn pri mini" data-mision="${m.id}">Ir</button>`}</div>`;
        })
        .join('')}`;
    },
    conectar(root, estado) {
      root.querySelectorAll('[data-mision]').forEach((b) => {
        b.onclick = () => Misiones.iniciar((estado.misiones || []).find((m) => String(m.id) === b.dataset.mision));
      });
    },
    iniciar(m) {
      if (!m) return;
      const V = ENG.VistasAlumno;
      const t = m.tema && ENG.Banco.temas[m.tema];
      if (!t) {
        if (m.modo === 'examen') return V.elegirExamen(m.materia);
        if (m.modo === 'repaso') return V.iniciarRepaso(m.materia);
        if (m.modo === 'reloj') return V.iniciarReloj(m.materia, null);
        return (location.hash = '#/materia/' + m.materia);
      }
      if (m.modo === 'practica' || m.modo === 'cualquiera') return V.practicar(t);
      if (m.modo === 'jefe') return V.iniciarJefe(t);
      if (m.modo === 'leccion') return ENG.Motor.leccion(t);
      if (m.modo === 'memorama') return ENG.Motor.memorama(t);
      if (m.modo === 'reloj') return V.iniciarReloj(t.materia, t);
      if (m.modo === 'repaso') return V.iniciarRepaso(t.materia);
      location.hash = '#/tema/' + t.id;
    },

    // ── Vista del maestro ──
    async vista() {
      app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">🎯 Misiones</h1>
        <p class="ayuda-txt">Deja una actividad con fecha límite. A los alumnos les aparece en su inicio con un botón «Ir», y si activaron las notificaciones les llega un recordatorio el día anterior.</p>
        <button class="btn pri" id="mi-nueva">+ Nueva misión</button>
        <div id="mi-lista">${ENG.cargandoHTML()}</div>`;
      document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
      document.getElementById('mi-nueva').onclick = () => Misiones.formulario();
      try {
        const [ms, alumnos] = await Promise.all([ENG.API.misionesListar(), ENG.ctx.alumnos ? Promise.resolve(ENG.ctx.alumnos) : ENG.API.listarAlumnos()]);
        ENG.ctx.alumnos = alumnos;
        const estados = {};
        await Promise.all(alumnos.filter((a) => a.activo).map(async (a) => {
          try { estados[a.id] = await ENG.API.estadoAlumno(a.id); } catch (e) {}
        }));
        const cont = document.getElementById('mi-lista');
        if (!ms.length) return (cont.innerHTML = '<div class="card vacio">Todavía no hay misiones.</div>');
        cont.innerHTML = ms.map((m) => {
          const dest = alumnos.filter((a) => a.activo && (a.materias || []).includes(m.materia) && (!m.alumnos || !m.alumnos.length || m.alumnos.includes(a.id)));
          const filas = dest.map((a) => {
            const st = Misiones.estado(m, estados[a.id] ? estados[a.id].intentos : []);
            return `<li class="${st.hecha ? 'ok' : st.vencida ? 'no' : ''}">${st.hecha ? (st.tarde ? '🟡' : '✅') : st.vencida ? '❌' : '⏳'} ${esc(a.nombre)}</li>`;
          }).join('');
          const hechas = dest.filter((a) => Misiones.estado(m, estados[a.id] ? estados[a.id].intentos : []).hecha).length;
          const t = m.tema && ENG.Banco.temas[m.tema];
          return `<div class="card">
            <div class="mc-top"><div><b>${esc(m.titulo)}</b><small>${esc(nombreMateria(m.materia))}${t ? ' · ' + esc(t.nombre) : ''} · ${nombreModo(m.modo)} · ${Misiones.meta(m)}</small>
              <small>Fecha límite: ${ENG.diaSemana(m.fecha_limite)} ${ENG.fechaCorta(m.fecha_limite)} · ${hechas} de ${dest.length} cumplida${dest.length === 1 ? '' : 's'}</small></div>
              <div class="mini-botones"><button class="btn fant mini" data-edit="${m.id}">Editar</button><button class="btn fant mini" data-del="${m.id}">Borrar</button></div></div>
            <ul class="lista-estado">${filas || '<li>Sin alumnos con esa materia.</li>'}</ul></div>`;
        }).join('');
        cont.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => Misiones.formulario(ms.find((m) => String(m.id) === b.dataset.edit))));
        cont.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
          if (!(await ENG.confirmar('¿Borrar esta misión?', 'Borrar'))) return;
          try { await ENG.API.misionBorrar(+b.dataset.del); Misiones.vista(); } catch (e) { ENG.toast(e.message, 'mal'); }
        }));
      } catch (e) {
        document.getElementById('mi-lista').innerHTML = `<div class="card vacio">${esc(e.message)}</div>`;
      }
    },
    formulario(m = null) {
      const alumnos = (ENG.ctx.alumnos || []).filter((a) => a.activo);
      const mat0 = m ? m.materia : (misMaterias().find((x) => x.disponible) || {}).id;
      const md = ENG.modal({
        titulo: m ? 'Editar misión' : 'Nueva misión',
        html: `<form class="form" id="f-mis" onsubmit="return false">
          <label class="campo"><span>Materia</span><select id="mi-mat">${opcionesMateria(mat0)}</select></label>
          <label class="campo"><span>Tema</span><select id="mi-tema"></select></label>
          <label class="campo"><span>Actividad</span><select id="mi-modo">${MODOS_MISION.map(([k, t]) => `<option value="${k}" ${m && m.modo === k ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
          <label class="campo"><span>Mínimo de aciertos (%)</span><input id="mi-meta" type="number" min="0" max="100" value="${m ? m.meta : 80}"></label>
          <label class="campo"><span>Fecha límite</span><input id="mi-fecha" type="date" value="${m ? m.fecha_limite : ENG.sumarDias(ENG.hoy(), 3)}"></label>
          <label class="campo"><span>Título (lo ven los alumnos)</span><input id="mi-tit" value="${m ? esc(m.titulo) : ''}" placeholder="Se llena solo"></label>
          <label class="campo"><span>Nota (opcional)</span><input id="mi-nota" value="${m ? esc(m.nota || '') : ''}"></label>
          <p class="peq">¿Para quién? (si no marcas a nadie, es para todos los que llevan la materia)</p>
          <div class="checks" id="mi-al"></div></form>`,
        botones: [{ txt: 'Cancelar' }, { txt: 'Guardar', clase: 'pri', fn: async (el) => {
          const v = (id) => el.querySelector(id).value;
          const datos = {
            id: m ? m.id : null, materia: v('#mi-mat'), tema: v('#mi-tema'), modo: v('#mi-modo'), meta: +v('#mi-meta') || 0,
            fecha_limite: v('#mi-fecha'), titulo: v('#mi-tit').trim() || autoTitulo(el), nota: v('#mi-nota'),
            alumnos: [...el.querySelectorAll('#mi-al input:checked')].map((i) => i.value)
          };
          if (!datos.fecha_limite) { ENG.toast('Pon la fecha límite', 'mal'); return false; }
          try { await ENG.API.misionGuardar(datos); ENG.toast('Misión guardada ✔', 'ok'); Misiones.vista(); } catch (e) { ENG.toast(e.message, 'mal'); return false; }
        } }]
      });
      const el = md.el;
      const autoTitulo = (root) => {
        const t = ENG.Banco.temas[root.querySelector('#mi-tema').value];
        const modo = root.querySelector('#mi-modo').value;
        const verbo = { practica: 'Practica', jefe: 'Vence al jefe final de', examen: 'Haz el examen simulado de', leccion: 'Estudia la lección de', reloj: 'Juega contra reloj', memorama: 'Completa el memorama de', repaso: 'Repasa tus errores de', cualquiera: 'Practica' }[modo];
        return `${verbo} ${t ? t.nombre : nombreMateria(root.querySelector('#mi-mat').value)}`;
      };
      const pintarTemas = () => {
        const mid = el.querySelector('#mi-mat').value;
        const temas = ENG.Banco.temasDe(mid);
        el.querySelector('#mi-tema').innerHTML = `<option value="">Toda la materia</option>` + temas.map((t) => `<option value="${t.id}" ${m && m.tema === t.id ? 'selected' : ''}>${t.sub ? t.sub.toUpperCase() + ' · ' : ''}${esc(t.nombre)}</option>`).join('');
        el.querySelector('#mi-al').innerHTML = alumnos.filter((a) => (a.materias || []).includes(mid))
          .map((a) => `<label class="check"><input type="checkbox" value="${a.id}" ${m && m.alumnos && m.alumnos.includes(a.id) ? 'checked' : ''}><span>${esc(a.nombre)} <small>${esc(a.apodo)}</small></span></label>`).join('') || '<p class="peq">Nadie lleva esta materia todavía.</p>';
        el.querySelector('#mi-tit').placeholder = autoTitulo(el);
      };
      el.querySelector('#mi-mat').onchange = pintarTemas;
      el.querySelector('#mi-tema').onchange = el.querySelector('#mi-modo').onchange = () => (el.querySelector('#mi-tit').placeholder = autoTitulo(el));
      pintarTemas();
    },
    // Resumen para el reporte de papás
    resumenHTML(estado) {
      const ms = (estado.misiones || []).filter((m) => ENG.MATERIAS[m.materia]);
      if (!ms.length) return '';
      const filas = ms.map((m) => ({ m, st: Misiones.estado(m, estado.intentos) }));
      const hechas = filas.filter((x) => x.st.hecha).length;
      return `<div class="card"><b>🎯 Misiones del profe: ${hechas} de ${ms.length} cumplidas</b><ul class="lista-estado">${filas
        .map(({ m, st }) => `<li class="${st.hecha ? 'ok' : st.vencida ? 'no' : ''}">${st.hecha ? (st.tarde ? '🟡' : '✅') : st.vencida ? '❌' : '⏳'} ${esc(m.titulo)} <small>· ${Misiones.textoFecha(m, st)}</small></li>`)
        .join('')}</ul></div>`;
    }
  };

  // ══════════════════════════ AVISOS ══════════════════════════
  const VISTOS = 'eng_avisos_vistos';
  const Avisos = {
    banner(estado, para) {
      const vistos = new Set(ENG.ls.get(VISTOS, []));
      const lista = (estado.avisos || []).filter((v) => (v.para === 'todos' || v.para === para) && !vistos.has(v.id)).slice(0, 3);
      return lista.map((v) => `<div class="card aviso-app"><span class="av-ico">📣</span><div class="av-txt"><b>${esc(v.titulo)}</b>${v.texto ? `<p>${esc(v.texto)}</p>` : ''}<small>${v.materia ? esc(nombreMateria(v.materia)) + ' · ' : ''}${ENG.fechaCorta(v.creado)}</small></div><button class="btn fant mini" data-visto="${v.id}">Entendido</button></div>`).join('');
    },
    conectar(root, alCambiar) {
      root.querySelectorAll('[data-visto]').forEach((b) => (b.onclick = () => {
        const s = ENG.ls.get(VISTOS, []);
        s.push(+b.dataset.visto || b.dataset.visto);
        ENG.ls.set(VISTOS, s.slice(-80));
        b.closest('.aviso-app').remove();
        alCambiar && alCambiar();
      }));
    },
    async vista() {
      app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">📣 Avisos</h1>
        <form class="card form" id="f-av" onsubmit="return false">
          <label class="campo"><span>Título</span><input id="av-tit" maxlength="120" placeholder="Ej. El jueves examen del 3er parcial"></label>
          <label class="campo"><span>Mensaje</span><textarea id="av-txt" rows="3" maxlength="1000"></textarea></label>
          <label class="campo"><span>Materia</span><select id="av-mat">${opcionesMateria('', esAdmin() ? 'Todas mis materias / general' : '')}</select></label>
          <label class="campo"><span>¿Quién lo ve?</span><select id="av-para"><option value="todos">Alumnos y papás</option><option value="alumnos">Solo alumnos</option><option value="papas">Solo papás</option></select></label>
          <label class="campo"><span>Se muestra durante</span><select id="av-dias"><option value="3">3 días</option><option value="7" selected>1 semana</option><option value="14">2 semanas</option><option value="30">1 mes</option></select></label>
          <label class="check"><input type="checkbox" id="av-push" checked><span>También como notificación al celular (a quien la activó)</span></label>
          <div class="botonera izq"><button class="btn pri" id="av-guardar">Publicar aviso</button><button class="btn sec" id="av-wa">📲 Mandar por WhatsApp</button></div>
        </form>
        <h3 class="sec-tit">Publicados</h3><div id="av-lista">${ENG.cargandoHTML()}</div>`;
      document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
      const leer = () => ({ titulo: document.getElementById('av-tit').value.trim(), texto: document.getElementById('av-txt').value.trim(), materia: document.getElementById('av-mat').value, para: document.getElementById('av-para').value, dias: +document.getElementById('av-dias').value });
      document.getElementById('av-wa').onclick = () => {
        const v = leer();
        if (!v.titulo) return ENG.toast('Escribe un título', 'mal');
        ENG.whatsapp(`📣 *${v.titulo}*${v.texto ? '\n' + v.texto : ''}\n\nEngrane: ${ENG.urlApp()}`);
      };
      document.getElementById('av-guardar').onclick = async () => {
        const v = leer();
        if (!v.titulo) return ENG.toast('Escribe un título', 'mal');
        try {
          await ENG.API.avisoGuardar(v);
          let extra = '';
          if (document.getElementById('av-push').checked) {
            try {
              const r = await ENG.API.funcion({ action: 'aviso', titulo: v.titulo, texto: v.texto, materia: v.materia || null, para: v.para });
              extra = r.demo ? ' (en demo no se mandan notificaciones)' : ` · notificación a ${r.sent} celular${r.sent === 1 ? '' : 'es'}`;
            } catch (e) { extra = ` · la notificación no salió: ${e.message}`; }
          }
          ENG.toast('Aviso publicado ✔' + extra, 'ok');
          Avisos.vista();
        } catch (e) { ENG.toast(e.message, 'mal'); }
      };
      try {
        const l = await ENG.API.avisosListar();
        const cont = document.getElementById('av-lista');
        cont.innerHTML = l.map((v) => `<div class="card"><div class="mc-top"><div><b>${esc(v.titulo)}</b><small>${esc(nombreMateria(v.materia))} · para ${v.para === 'todos' ? 'alumnos y papás' : v.para} · hasta ${ENG.fechaCorta(v.hasta)}</small>${v.texto ? `<p class="peq">${esc(v.texto)}</p>` : ''}</div><button class="btn fant mini" data-del="${v.id}">Borrar</button></div></div>`).join('') || '<div class="card vacio">Sin avisos.</div>';
        cont.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
          try { await ENG.API.avisoBorrar(+b.dataset.del); Avisos.vista(); } catch (e) { ENG.toast(e.message, 'mal'); }
        }));
      } catch (e) { document.getElementById('av-lista').innerHTML = `<div class="card vacio">${esc(e.message)}</div>`; }
    },

    // ── Recordatorios (quién necesita un empujón) ──
    async recordatorios() {
      app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">🔔 Recordatorios</h1>
        <p class="ayuda-txt">Quién practicó hoy y quién necesita un empujón. Los mensajes de WhatsApp ya van escritos; si capturas los teléfonos en «Datos» del alumno, se abren directo en su chat.</p>
        <div id="re-lista">${ENG.cargandoHTML()}</div>`;
      document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
      try {
        const [alumnos, resumen, push] = await Promise.all([ENG.API.listarAlumnos(), ENG.API.resumen(), ENG.API.pushResumen().catch(() => ({}))]);
        ENG.ctx.alumnos = alumnos;
        const r = {};
        resumen.forEach((x) => (r[x.id] = x));
        const hoy = ENG.hoy(), ayer = ENG.sumarDias(hoy, -1);
        const filas = alumnos.filter((a) => a.activo).map((a) => {
          const x = r[a.id] || { dias: [] };
          const dias = new Set(x.dias || []);
          let estado, clase, orden;
          if (dias.has(hoy)) { estado = '✅ Ya practicó hoy'; clase = 'ok'; orden = 3; }
          else if (dias.has(ayer)) { estado = '🔥 Racha en riesgo: practicó ayer, hoy no'; clase = 'riesgo'; orden = 1; }
          else if (!x.ultima) { estado = '⚠ Todavía no entra a Engrane'; clase = 'no'; orden = 0; }
          else { const n = Math.round((Date.parse(hoy) - Date.parse(ENG.diaLocal(x.ultima))) / 864e5); estado = `⏸ ${n} días sin practicar`; clase = n >= 3 ? 'no' : 'riesgo'; orden = n >= 3 ? 0 : 2; }
          return { a, estado, clase, orden, x, celulares: push[a.id] || 0 };
        }).sort((p, q) => p.orden - q.orden || p.a.nombre.localeCompare(q.a.nombre));
        const pendientes = filas.filter((f) => f.clase !== 'ok');
        const cont = document.getElementById('re-lista');
        cont.innerHTML = `${pendientes.length ? `<button class="btn pri ancho" id="re-todos">🔔 Notificar a los ${pendientes.length} que no han practicado hoy</button>` : '<div class="card vacio">¡Todos practicaron hoy! 🎉</div>'}
          ${filas.map((f) => `<div class="card rec ${f.clase}"><div class="mc-top"><div><b>${esc(f.a.nombre)}</b><small>${esc(f.a.apodo)} · ${f.estado}${f.x.pendientes ? ` · ${f.x.pendientes} por repasar` : ''}</small><small>${f.celulares ? `🔔 ${f.celulares} celular${f.celulares === 1 ? '' : 'es'} con notificaciones` : 'Sin notificaciones activadas'}</small></div></div>
            <div class="botonera izq"><button class="btn sec mini" data-wa-al="${f.a.id}">📲 Alumno</button><button class="btn sec mini" data-wa-pa="${f.a.id}">📲 Papás</button>${f.celulares ? `<button class="btn fant mini" data-push="${f.a.id}">🔔 Notificar</button>` : ''}</div></div>`).join('')}`;
        const porId = (id) => alumnos.find((a) => a.id === id);
        const firma = ENG.ctx.perfil && ENG.ctx.perfil.nombre ? `\n— Profe ${ENG.ctx.perfil.nombre}` : '';
        cont.querySelectorAll('[data-wa-al]').forEach((b) => (b.onclick = () => {
          const a = porId(b.dataset.waAl);
          const link = a.codigo ? `${ENG.urlApp()}?alumno=${a.codigo}` : ENG.urlApp();
          ENG.whatsapp(`¡Hola, ${a.nombre.split(' ')[0]}! 👋 Hoy toca tu ratito de Engrane ⚙. Con 10 minutos mantienes tu racha y subes de nivel.\n${link}${firma}`, telWa(a.tel_alumno));
        }));
        cont.querySelectorAll('[data-wa-pa]').forEach((b) => (b.onclick = () => {
          const a = porId(b.dataset.waPa);
          const link = a.codigo_papas ? `${ENG.urlApp()}?papas=${a.codigo_papas}` : ENG.urlApp();
          ENG.whatsapp(`Hola, familia de ${a.nombre.split(' ')[0]} 👋 Les comparto que esta semana le vendría muy bien practicar en Engrane unos minutos al día. Aquí pueden ver su avance y probar lo que está viendo:\n${link}${firma}`, telWa(a.tel_papas));
        }));
        const notificar = async (ids, titulo, texto) => {
          try {
            const res = await ENG.API.funcion({ action: 'aviso', alumnos: ids, para: 'alumnos', titulo, texto, materia: null });
            ENG.toast(res.demo ? 'En demo no se mandan notificaciones' : `Notificación enviada a ${res.sent} celular${res.sent === 1 ? '' : 'es'} ✔`, 'ok');
          } catch (e) { ENG.toast(e.message, 'mal'); }
        };
        cont.querySelectorAll('[data-push]').forEach((b) => (b.onclick = () => notificar([b.dataset.push], '⚙ Engrane te espera', 'Unos minutos hoy y sigues subiendo de nivel. ¡Vamos!')));
        const bt = document.getElementById('re-todos');
        if (bt) bt.onclick = () => notificar(pendientes.map((f) => f.a.id), '⚙ Engrane te espera', 'Unos minutos hoy y sigues subiendo de nivel. ¡Vamos!');
      } catch (e) { document.getElementById('re-lista').innerHTML = `<div class="card vacio">${esc(e.message)}</div>`; }
    }
  };

  // ══════════════════════════ NOTIFICACIONES (Web Push) ══════════════════════════
  const b64aBytes = (b64) => {
    const p = '='.repeat((4 - (b64.length % 4)) % 4);
    const s = atob((b64 + p).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from([...s].map((c) => c.charCodeAt(0)));
  };
  const esIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
  const instalada = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const Push = {
    async estado() {
      if (ENG.API.modo === 'demo') return 'demo';
      if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return esIOS() && !instalada() ? 'instalar' : 'no-soporta';
      if (Notification.permission === 'denied') return 'bloqueado';
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        const sub = reg && (await reg.pushManager.getSubscription());
        return sub ? 'activo' : 'apagado';
      } catch (e) { return 'apagado'; }
    },
    async activar(rol, codigo) {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') throw new Error('No diste permiso de notificaciones.');
      const reg = await navigator.serviceWorker.ready;
      const { publicKey } = await ENG.API.funcion({ action: 'key' });
      if (!publicKey) throw new Error('El servidor no dio la llave de notificaciones.');
      let sub = await reg.pushManager.getSubscription();
      if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64aBytes(publicKey) });
      const j = sub.toJSON();
      if (rol === 'maestro') await ENG.API.pushGuardarMaestro(j);
      else await ENG.API.pushGuardar(codigo, rol, j);
      try { await ENG.API.funcion({ action: 'test', endpoint: j.endpoint }); } catch (e) {}
      return true;
    },
    async desactivar() {
      const reg = await navigator.serviceWorker.getRegistration();
      const sub = reg && (await reg.pushManager.getSubscription());
      if (sub) {
        try { await ENG.API.pushQuitar(sub.endpoint); } catch (e) {}
        await sub.unsubscribe();
      }
    },
    // Tarjeta para activar (alumno, papás o maestro). Si ya están activas, no se muestra (salvo forzar).
    async pintar(contenedor, rol, codigo, { forzar = false } = {}) {
      if (!contenedor) return;
      const st = await Push.estado();
      if (st === 'activo' && !forzar) return (contenedor.innerHTML = '');
      if (ENG.ls.get('eng_push_omitir_' + rol) && !forzar && st !== 'activo') return (contenedor.innerHTML = '');
      const txt = {
        alumno: 'Activa los recordatorios: te aviso si tu racha está por apagarse y cuando tu profe deja una misión.',
        papas: 'Reciban el resumen de cada domingo y los avisos del profe en este celular.',
        maestro: 'Recibe el resumen de cada lunes en este celular.'
      }[rol];
      const msg = {
        demo: 'En el modo demo no se mandan notificaciones.',
        'no-soporta': 'Este navegador no permite notificaciones. En Android usa Chrome.',
        instalar: 'En iPhone primero instala Engrane: Compartir → «Agregar a pantalla de inicio», y ábrela desde ese ícono.',
        bloqueado: 'Las notificaciones están bloqueadas para Engrane. Actívalas en los ajustes del navegador.',
        activo: '✔ Activadas en este celular.'
      }[st];
      contenedor.innerHTML = `<div class="card push-card"><span class="av-ico">🔔</span><div class="av-txt"><b>Notificaciones</b><p>${msg || txt}</p>
        <div class="botonera izq">${st === 'apagado' ? '<button class="btn pri mini" data-p="on">Activar</button>' : ''}${st === 'activo' ? '<button class="btn sec mini" data-p="test">Probar</button><button class="btn fant mini" data-p="off">Desactivar</button>' : ''}${st !== 'activo' && !forzar ? '<button class="btn fant mini" data-p="omitir">Ahora no</button>' : ''}</div></div></div>`;
      contenedor.querySelectorAll('[data-p]').forEach((b) => (b.onclick = async () => {
        const acc = b.dataset.p;
        b.disabled = true;
        try {
          if (acc === 'on') { await Push.activar(rol, codigo); ENG.toast('¡Notificaciones activadas! ✔', 'ok'); }
          if (acc === 'off') { await Push.desactivar(); ENG.toast('Notificaciones desactivadas', ''); }
          if (acc === 'test') {
            const reg = await navigator.serviceWorker.getRegistration();
            const sub = reg && (await reg.pushManager.getSubscription());
            const r = await ENG.API.funcion({ action: 'test', endpoint: sub ? sub.endpoint : '' });
            ENG.toast(r.sent ? 'Te mandé una notificación de prueba' : r.error || 'No salió la prueba', r.sent ? 'ok' : 'mal');
          }
          if (acc === 'omitir') ENG.ls.set('eng_push_omitir_' + rol, true);
        } catch (e) { ENG.toast(e.message, 'mal'); }
        Push.pintar(contenedor, rol, codigo, { forzar });
      }));
    }
  };

  // ══════════════════════════ IMPORTAR Y EXPORTAR ══════════════════════════
  // Engrane es independiente: los alumnos y calificaciones se pegan desde Excel, Google Sheets o cualquier lista.
  const normNombre = (s) => ENG.normaliza(String(s || '')).replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
  const soloDigitos = (s) => String(s || '').replace(/\D/g, '');
  // Un renglón pegado → { nombre, tel_alumno, tel_papas, cal }. Acepta columnas de Excel (tabulador), «;», «|»
  // o texto suelto como «1. Juan Pérez 4771234567» o «Juan Pérez, 8.5».
  function leerRenglon(linea) {
    let celdas = String(linea || '').split(/\t|;|\|/).map((c) => c.trim()).filter(Boolean);
    if (celdas.length > 1 && /^\d{1,3}[.)]?$/.test(celdas[0])) celdas.shift(); // número de lista en su columna
    if (celdas.length === 1) {
      const t = celdas[0].replace(/^\d{1,3}\s*[.)-]?\s+(?=\D)/, '');
      const m = t.match(/^(.*?[a-záéíóúüñ)])\s*,?\s+([\d\s.,+()-]+)$/i);
      if (!m) celdas = [t.trim()];
      else {
        const cola = m[2].trim();
        const dig = soloDigitos(cola);
        // «477 123 4567» = un teléfono escrito con espacios
        const telEspaciado = (dig.length === 10 || dig.length === 20) && !/[.,]\d/.test(cola) && !cola.split(/\s+/).some((x) => soloDigitos(x).length >= 10);
        celdas = telEspaciado ? [m[1].trim(), dig.slice(0, 10), ...(dig.length === 20 ? [dig.slice(10)] : [])] : [m[1].trim(), ...cola.split(/\s+/)];
      }
    }
    celdas = celdas.map((c) => c.replace(/[,;]+$/, '').trim()).filter(Boolean);
    // Renglón de encabezados de Excel («No. | Nombre | Teléfono…»): se ignora
    if (celdas.some((c) => /^(nombres?|nombre (completo|del alumno|de la alumna)|alumn[oa]s?|apellidos?.*)$/.test(normNombre(c)))) return { nombre: '', tel_alumno: '', tel_papas: '', cal: null };
    const nombre = (celdas.find((c) => /[a-záéíóúüñ]/i.test(c)) || '').replace(/\s+/g, ' ').trim();
    const tels = celdas.filter((c) => soloDigitos(c).length >= 10).map(soloDigitos);
    const nums = celdas.filter((c) => /^\d{1,3}([.,]\d+)?$/.test(c)).map((c) => parseFloat(c.replace(',', '.'))).filter((x) => x <= 100);
    return { nombre, tel_alumno: tels[0] || '', tel_papas: tels[1] || '', cal: nums.length ? nums[nums.length - 1] : null };
  }
  function buscarAlumno(alumnos, nombre) {
    const n = normNombre(nombre);
    if (!n) return null;
    const exacto = alumnos.filter((a) => normNombre(a.nombre) === n);
    if (exacto.length === 1) return exacto[0];
    // «Juan Pablo» encuentra a «Juan Pablo Hernández» (o al revés) solo si es único
    const pal = n.split(' ');
    const parecidos = alumnos.filter((a) => {
      const an = normNombre(a.nombre).split(' ');
      return pal.every((w) => an.includes(w)) || an.every((w) => pal.includes(w));
    });
    return parecidos.length === 1 ? parecidos[0] : null;
  }

  const Importar = {
    async vista() {
      if (!esAdmin()) return (location.hash = '#/inicio');
      app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">📥 Importar</h1>
        <p class="ayuda-txt">Copia la lista desde Excel, Google Sheets o tu lista de asistencia y pégala aquí. Un alumno por renglón.</p>
        <section class="card">
          <h3>1. Alumnos nuevos</h3>
          <p class="peq">Columnas opcionales: <b>Nombre</b> · teléfono del alumno · teléfono de papás (10 dígitos). El número de lista se ignora.</p>
          <textarea id="im-txt" rows="7" placeholder="Héctor Ramírez\t4771234567\t4777654321&#10;Isai López&#10;Juan Pablo Hernández"></textarea>
          <label>Grupo<input id="im-grupo" placeholder="3°A Mecatrónica" maxlength="40"></label>
          <p class="peq"><b>Materias que va a practicar:</b></p>
          <div class="checks" id="im-mats">${ENG.VistasMaestro.opcionesMaterias([], true)}</div>
          <button class="btn sec ancho" id="im-revisar">Revisar lista</button>
          <div id="im-prev"></div>
        </section>
        <section class="card">
          <h3>2. Calificaciones de un parcial (opcional)</h3>
          <p class="peq">Pega <b>Nombre</b> y <b>calificación</b> por renglón (de tu boleta o lista). Se buscan los alumnos que ya están en Engrane.</p>
          <div class="fila2">
            <label>Materia<select id="ic-mat">${Object.values(ENG.MATERIAS).filter((m) => m.disponible).map((m) => `<option value="${m.id}">${m.icono} ${esc(m.nombre)}</option>`).join('')}</select></label>
            <label>Parcial<select id="ic-par"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></label>
          </div>
          <label id="ic-sub-l">Submódulo<select id="ic-sub"></select></label>
          <textarea id="ic-txt" rows="6" placeholder="Héctor Ramírez\t7&#10;Isai López\t8"></textarea>
          <button class="btn sec ancho" id="ic-revisar">Revisar calificaciones</button>
          <div id="ic-prev"></div>
        </section>
        <section class="card"><h3>3. Exportar</h3><p class="peq">El avance de todos tus alumnos en un archivo que abre Excel.</p>
          <button class="btn sec ancho" id="im-exportar">⬇️ Descargar avance (CSV)</button></section>`;
      document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
      document.getElementById('im-exportar').onclick = () => Importar.exportar();
      let alumnos = [];
      try { alumnos = await ENG.API.listarAlumnos(); ENG.ctx.alumnos = alumnos; } catch (e) { ENG.toast(e.message, 'mal'); }

      // ── Alumnos ──
      document.getElementById('im-revisar').onclick = () => {
        const filas = document.getElementById('im-txt').value.split(/\r?\n/).map(leerRenglon).filter((r) => (r.nombre.match(/[a-záéíóúüñ]/gi) || []).length >= 3);
        const prev = document.getElementById('im-prev');
        if (!filas.length) { prev.innerHTML = '<p class="peq txt-rojo">No encontré nombres. Pega un alumno por renglón.</p>'; return; }
        const vistos = new Set();
        prev.innerHTML = `<div class="checks im-lista">${filas.map((r, i) => {
          const ya = alumnos.find((a) => normNombre(a.nombre) === normNombre(r.nombre));
          const rep = vistos.has(normNombre(r.nombre));
          vistos.add(normNombre(r.nombre));
          const tel = [r.tel_alumno && '📱 ' + r.tel_alumno, r.tel_papas && '👪 ' + r.tel_papas].filter(Boolean).join(' · ');
          return `<label class="check"><input type="checkbox" value="${i}" ${ya || rep ? 'disabled' : 'checked'}><span>${esc(r.nombre)}
            ${tel ? `<small>${tel}</small>` : ''}${ya ? ' <small class="txt-verde">· ya está en Engrane</small>' : rep ? ' <small>· repetido</small>' : ''}</span></label>`;
        }).join('')}</div><button class="btn pri ancho" id="im-agregar">Agregar marcados</button>`;
        document.getElementById('im-agregar').onclick = async (ev) => {
          const marcados = [...prev.querySelectorAll('input:checked')].map((i) => filas[+i.value]);
          const mats = [...document.querySelectorAll('#im-mats input:checked')].map((i) => i.value);
          if (!marcados.length) return ENG.toast('Marca al menos a un alumno', 'mal');
          if (!mats.length) return ENG.toast('Elige al menos una materia', 'mal');
          ev.target.disabled = true;
          const grupo = document.getElementById('im-grupo').value.trim();
          const usados = alumnos.map((a) => a.apodo);
          let n = 0;
          for (const r of marcados) {
            try {
              const apodo = ENG.Apodos.nuevo(usados);
              usados.push(apodo);
              const a = await ENG.API.crearAlumno({ nombre: r.nombre, grupo, apodo, materias: mats });
              if (r.tel_alumno || r.tel_papas) await ENG.API.actualizarAlumno(a.id, { tel_alumno: r.tel_alumno, tel_papas: r.tel_papas });
              n++;
            } catch (e) { ENG.toast(`${r.nombre}: ${e.message}`, 'mal'); }
          }
          ENG.ctx.alumnos = null;
          ENG.toast(`${n} alumno${n === 1 ? '' : 's'} agregado${n === 1 ? '' : 's'} ✔ Mándales su acceso desde su ficha.`, 'ok');
          Importar.vista();
        };
      };

      // ── Calificaciones ──
      const pintarSubs = () => {
        const m = ENG.MATERIAS[document.getElementById('ic-mat').value];
        const subs = (m && m.subs) || [];
        document.getElementById('ic-sub-l').hidden = !subs.length;
        document.getElementById('ic-sub').innerHTML = subs.length
          ? `<option value="todos">Los ${subs.length} (como en la boleta)</option>` + subs.map((x) => `<option value="${x.id}">${esc(x.nombre)}</option>`).join('')
          : '';
      };
      document.getElementById('ic-mat').onchange = pintarSubs;
      pintarSubs();
      document.getElementById('ic-revisar').onclick = () => {
        const mid = document.getElementById('ic-mat').value;
        const conMateria = alumnos.filter((a) => (a.materias || []).includes(mid));
        const filas = document.getElementById('ic-txt').value.split(/\r?\n/).map(leerRenglon).filter((r) => r.nombre && r.cal != null)
          .map((r) => ({ ...r, cal: Math.max(0, Math.min(10, Math.floor(r.cal > 10 ? r.cal / 10 : r.cal))), al: buscarAlumno(conMateria, r.nombre) }));
        const prev = document.getElementById('ic-prev');
        if (!filas.length) { prev.innerHTML = '<p class="peq txt-rojo">Pega renglones con nombre y calificación.</p>'; return; }
        const ok = filas.filter((f) => f.al);
        prev.innerHTML = `<ul class="lista-estado">${filas.map((f) => f.al
          ? `<li class="ok">✔ ${esc(f.nombre)} → <b>${esc(f.al.nombre)}</b>: ${f.cal}</li>`
          : `<li class="no">✖ ${esc(f.nombre)}: no lo encontré entre los alumnos de ${esc(ENG.MATERIAS[mid].nombre)}</li>`).join('')}</ul>
          ${ok.length ? `<button class="btn pri ancho" id="ic-guardar">Guardar ${ok.length} calificaci${ok.length === 1 ? 'ón' : 'ones'}</button>` : ''}`;
        const g = document.getElementById('ic-guardar');
        if (g) g.onclick = async () => {
          g.disabled = true;
          const par = +document.getElementById('ic-par').value;
          const subSel = document.getElementById('ic-sub').value;
          const subs = !ENG.MATERIAS[mid].subs ? [''] : subSel === 'todos' ? ENG.MATERIAS[mid].subs.map((x) => x.id) : [subSel];
          let n = 0;
          for (const f of ok) for (const sub of subs) {
            try { await ENG.API.guardarCalif(f.al.id, mid, sub, par, f.cal); n++; } catch (e) { ENG.toast(`${f.al.nombre}: ${e.message}`, 'mal'); }
          }
          ENG.toast(`${n} calificaci${n === 1 ? 'ón guardada' : 'ones guardadas'} ✔`, 'ok');
          prev.innerHTML = `<p class="peq txt-verde">Listo. Las ves en la pestaña 📝 Boleta de cada alumno.</p>`;
        };
      };
    },
    // CSV para consejo técnico o para abrir en Excel
    async exportar() {
      ENG.toast('Preparando el archivo…', '');
      try {
        const alumnos = await ENG.API.listarAlumnos();
        const filas = [['Nombre', 'Apodo', 'Grupo', 'Materias', 'Nivel', 'XP total', 'XP semana', 'Racha (días)', 'Días activos', 'Última actividad', '% aciertos', 'Temas en verde', 'Jefes vencidos', 'Último examen', 'Misiones cumplidas']];
        for (const a of alumnos.filter((x) => x.activo)) {
          const est = await ENG.API.estadoAlumno(a.id);
          const an = ENG.Progreso.analizar(est);
          const mats = (a.materias || []).filter((m) => ENG.MATERIAS[m]);
          const verde = mats.map((m) => `${ENG.MATERIAS[m].nombre}: ${an.materias[m] ? an.materias[m].verde : 0}/${ENG.Banco.temasDe(m).length}`).join(' | ');
          const ex = an.examenes.slice(-1)[0];
          const ms = est.misiones || [];
          filas.push([a.nombre, a.apodo, a.grupo, mats.map((m) => ENG.MATERIAS[m].nombre).join(' | '), `${an.nivel.n} ${an.nivel.nombre}`, an.xp, an.xpSemana, an.racha, an.diasActivos,
            an.ultima ? ENG.diaLocal(an.ultima) : '', an.respuestas ? Math.round((an.aciertos / an.respuestas) * 100) : '', verde, an.dominados,
            ex ? `${ex.calificacion} (${ENG.MATERIAS[ex.materia] ? ENG.MATERIAS[ex.materia].nombre : ex.materia})` : '', `${ms.filter((m) => Misiones.estado(m, est.intentos).hecha).length}/${ms.length}`]);
        }
        const csv = '﻿' + filas.map((f) => f.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        const aEl = document.createElement('a');
        aEl.href = url;
        aEl.download = `engrane-avance-${ENG.hoy()}.csv`;
        document.body.appendChild(aEl);
        aEl.click();
        setTimeout(() => { URL.revokeObjectURL(url); aEl.remove(); }, 500);
      } catch (e) { ENG.toast(e.message, 'mal'); }
    }
  };

  ENG.Misiones = Misiones;
  ENG.Avisos = Avisos;
  ENG.Push = Push;
  ENG.Importar = Importar;
  ENG.telWa = telWa;
})();
