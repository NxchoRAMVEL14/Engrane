// ENGRANE · Tanda 1 (v2.2): reportar y ocultar preguntas, calendario de exámenes con repaso intensivo,
// plan «Hoy te toca», respaldos y latido para que el proyecto gratis de Supabase no se pause.
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const esAdmin = () => ENG.ctx && ENG.ctx.perfil && ENG.ctx.perfil.rol === 'admin';
  const materiasMias = () => {
    const p = ENG.ctx.perfil;
    return Object.values(ENG.MATERIAS).filter((m) => m.disponible && (p.rol === 'admin' || (p.materias || []).includes(m.id)));
  };
  const nombreMat = (mid) => (ENG.MATERIAS[mid] ? ENG.MATERIAS[mid].nombre : mid);
  const diasEntre = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
  const fechaCorta = (f) => {
    const d = new Date(f + 'T12:00:00');
    return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  // ══════════════════════════ PREGUNTAS OCULTAS ══════════════════════════
  ENG.cargarOcultas = async () => {
    let l = ENG.ls.get('eng_ocultas', []);
    try {
      l = await ENG.API.ocultas();
      ENG.ls.set('eng_ocultas', l);
    } catch (e) {}
    ENG.Banco.ponerOcultas(l || []);
  };

  // ══════════════════════════ REPORTES ══════════════════════════
  const MOTIVOS = [
    ['respuesta', 'La respuesta que marca como correcta está mal'],
    ['entender', 'No se entiende la pregunta'],
    ['escritura', 'Error de escritura o de dedo'],
    ['tema', 'No es de lo que vemos en clase'],
    ['otro', 'Otra cosa']
  ];
  const MOTIVO_TXT = Object.fromEntries(MOTIVOS);

  const Reportes = {
    puede() {
      const c = ENG.ctx;
      if (!c || ENG.API.modo === 'sin-config') return false;
      return (c.rol === 'alumno' && !c.prueba) || c.rol === 'maestro';
    },
    boton() {
      return Reportes.puede() ? '<button class="link-reportar" id="r-reportar">⚑ ¿Ves un error en esta pregunta? Repórtalo</button>' : '';
    },
    conectar(p, cont) {
      const b = cont.querySelector('#r-reportar');
      if (b) b.onclick = () => Reportes.abrir(p, b);
    },
    abrir(p, boton) {
      if (!p) return;
      ENG.modal({
        titulo: '⚑ Reportar pregunta',
        html: `<p class="peq">${esc(String(p.q).replace(/<[^>]+>/g, '').slice(0, 160))}</p>
          <div class="lista-radios">${MOTIVOS.map(([k, t], i) => `<label class="check"><input type="radio" name="rp-mot" value="${k}" ${i === 0 ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div>
          <label class="campo"><span>¿Qué viste? (opcional)</span><textarea id="rp-txt" rows="3" maxlength="500" placeholder="Ej. creo que la correcta es la B porque…"></textarea></label>`,
        botones: [
          { txt: 'Cancelar' },
          {
            txt: 'Mandar reporte', clase: 'pri',
            fn: async (fondo) => {
              const motivo = (fondo.querySelector('input[name=rp-mot]:checked') || {}).value || 'otro';
              const texto = fondo.querySelector('#rp-txt').value.trim();
              try {
                const c = ENG.ctx;
                const r = await ENG.API.reporteCrear({ codigo: c.rol === 'alumno' ? c.codigo : null, pregunta: p.id, materia: p.materia, tema: p.tema, motivo, texto });
                ENG.toast(r && r.repetido ? 'Ya lo habías reportado. ¡Gracias!' : '¡Gracias! Tu profe lo va a revisar ✔', 'ok');
                if (boton) { boton.disabled = true; boton.textContent = '✔ Reportada'; }
              } catch (e) {
                ENG.toast(e.message, 'mal');
                return false;
              }
            }
          }
        ]
      });
    },

    // Bandeja del maestro
    async vista() {
      app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">⚑ Reportes</h1>
        <p class="ayuda-txt">Preguntas que alumnos o maestros marcaron con un posible error. Si de verdad está mal, <b>ocúltala</b>: deja de salir para todos al instante. Luego copia los reportes y mándaselos a Claude para corregirlos en el contenido.</p>
        <div class="botonera izq"><button class="btn sec" id="rp-copiar">📋 Copiar reportes abiertos</button></div>
        <div id="rp-lista">${ENG.cargandoHTML()}</div>`;
      document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
      let lista = [];
      const pintar = () => {
        // agrupar por pregunta
        const grupos = {};
        lista.forEach((r) => (grupos[r.pregunta] = grupos[r.pregunta] || []).push(r));
        const ids = Object.keys(grupos).sort((a, b) => {
          const ra = grupos[a].every((x) => x.resuelto), rb = grupos[b].every((x) => x.resuelto);
          return ra - rb || grupos[b].length - grupos[a].length;
        });
        const cont = document.getElementById('rp-lista');
        if (!ids.length) {
          cont.innerHTML = '<div class="card vacio">Sin reportes. 🎉</div>';
          return;
        }
        cont.innerHTML = ids.map((pid) => {
          const rs = grupos[pid];
          const p = ENG.Banco.preguntas[pid];
          const resuelto = rs.every((x) => x.resuelto);
          const oculta = rs[0].oculta;
          return `<div class="card rep ${resuelto ? 'resuelto' : ''}" data-p="${esc(pid)}" data-m="${esc(rs[0].materia)}">
            <div class="mc-top"><div><b>${esc(nombreMat(rs[0].materia))}</b><small>${esc(p ? (ENG.Banco.temas[p.tema] || {}).nombre || '' : pid)} · ${esc(pid)}</small></div>
              <span class="badge-n">${rs.length} reporte${rs.length === 1 ? '' : 's'}</span></div>
            ${p ? `<p class="rep-q">${ENG.formatear(p.q)}</p><p class="peq">Marcada como correcta: <b>${ENG.formatear(ENG.respuestaCorrecta(p))}</b></p>` : '<p class="peq">(Pregunta borrada o cambiada)</p>'}
            <ul class="rep-motivos">${rs.map((x) => `<li><b>${esc(MOTIVO_TXT[x.motivo] || x.motivo)}</b>${x.texto ? ` — «${esc(x.texto)}»` : ''} <small>· ${esc(x.quien || '')} · ${ENG.textoFecha ? ENG.textoFecha(x.creado) : new Date(x.creado).toLocaleDateString('es-MX')}</small></li>`).join('')}</ul>
            ${oculta ? '<p class="peq txt-naranja">🙈 Oculta para todos</p>' : ''}
            <div class="botonera izq">
              <button class="btn ${oculta ? 'sec' : 'pri'} mini" data-acc="${oculta ? 'mostrar' : 'ocultar'}">${oculta ? '👁 Volver a mostrar' : '🙈 Ocultar para todos'}</button>
              <button class="btn fant mini" data-acc="${resuelto ? 'reabrir' : 'resolver'}">${resuelto ? '↺ Reabrir' : '✔ Marcar revisado'}</button>
            </div></div>`;
        }).join('');
        cont.querySelectorAll('[data-acc]').forEach((b) => (b.onclick = async () => {
          const card = b.closest('.rep');
          const pid = card.dataset.p, mid = card.dataset.m;
          try {
            if (b.dataset.acc === 'ocultar') await ENG.API.preguntaOcultar(pid, mid, true, 'Reportada');
            if (b.dataset.acc === 'mostrar') await ENG.API.preguntaOcultar(pid, mid, false);
            if (b.dataset.acc === 'resolver') await ENG.API.reporteResolver(pid, true);
            if (b.dataset.acc === 'reabrir') await ENG.API.reporteResolver(pid, false);
            await ENG.cargarOcultas();
            await cargar();
          } catch (e) { ENG.toast(e.message, 'mal'); }
        }));
      };
      const cargar = async () => {
        lista = await ENG.API.reportesListar();
        pintar();
      };
      document.getElementById('rp-copiar').onclick = () => {
        const abiertos = lista.filter((r) => !r.resuelto);
        if (!abiertos.length) return ENG.toast('No hay reportes abiertos', '');
        const txt = 'Reportes de Engrane para corregir:\n\n' + [...new Set(abiertos.map((r) => r.pregunta))].map((pid) => {
          const p = ENG.Banco.preguntas[pid];
          const rs = abiertos.filter((r) => r.pregunta === pid);
          return `• ${pid} (${nombreMat(rs[0].materia)})\n  Pregunta: ${p ? String(p.q).replace(/<[^>]+>/g, '') : '?'}\n  Marcada como correcta: ${p ? String(ENG.respuestaCorrecta(p)).replace(/<[^>]+>/g, '') : '?'}\n` +
            rs.map((r) => `  - ${MOTIVO_TXT[r.motivo] || r.motivo}${r.texto ? ': ' + r.texto : ''}`).join('\n');
        }).join('\n\n');
        ENG.copiar(txt);
      };
      try { await cargar(); } catch (e) { document.getElementById('rp-lista').innerHTML = `<div class="card vacio">${esc(e.message)}</div>`; }
    },
    async contarAbiertos() {
      try { return new Set((await ENG.API.reportesListar()).filter((r) => !r.resuelto).map((r) => r.pregunta)).size; } catch (e) { return 0; }
    }
  };

  // ══════════════════════════ EXÁMENES ══════════════════════════
  function proximos(estado, dias = 21) {
    const hoy = (estado && estado.hoy) || ENG.hoy();
    return ((estado && estado.examenes) || []).filter((e) => e.fecha >= hoy && diasEntre(hoy, e.fecha) <= dias)
      .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  }
  function cuandoTxt(hoy, f) {
    const d = diasEntre(hoy, f);
    return d === 0 ? '¡Hoy!' : d === 1 ? 'Mañana' : `En ${d} días`;
  }
  // Preguntas del repaso intensivo: errores pendientes de esos temas + más preguntas de los temas flojos
  function seleccionIntensivo(ex, n = 15) {
    const B = ENG.Banco, an = ENG.ctx.an, estado = ENG.ctx.estado;
    let temas = (ex.temas && ex.temas.length ? ex.temas : B.temasDe(ex.materia).map((t) => t.id)).filter((t) => B.temas[t]);
    if (!temas.length) temas = B.temasDe(ex.materia).map((t) => t.id);
    const peso = (tid) => {
      const st = (an && an.temas[tid]) || { sem: 'gris' };
      return { rojo: 3, gris: 3, amarillo: 2, verde: 1 }[st.sem] || 2;
    };
    const hoy = ENG.hoy();
    const usados = new Set();
    const out = [];
    // 1) hasta 5 errores pendientes
    ((estado && estado.estado) || []).filter((e) => temas.includes(e.t) && e.n <= hoy && B.visible(e.p))
      .sort((a, b) => a.c - b.c).slice(0, 5).forEach((e) => { out.push(B.preguntas[e.p]); usados.add(e.p); });
    // 2) reparto por peso
    const bolsa = [];
    temas.forEach((tid) => {
      const ps = ENG.barajar(B.temas[tid].preguntas.filter((p) => p.tipo !== 'ha' && !usados.has(p.id)));
      for (let k = 0; k < peso(tid); k++) bolsa.push(ps);
    });
    let guard = 0;
    while (out.length < n && guard++ < 500 && bolsa.some((l) => l.length)) {
      const l = bolsa[Math.floor(Math.random() * bolsa.length)];
      const p = l.shift();
      if (p && !usados.has(p.id)) { out.push(p); usados.add(p.id); }
    }
    return ENG.barajar(out);
  }

  const Examenes = {
    proximos,
    // Tarjetas para el inicio del alumno y de papás
    tarjetas(estado, { papas = false } = {}) {
      const l = proximos(estado);
      if (!l.length) return '';
      const hoy = estado.hoy || ENG.hoy();
      return `<h3 class="sec-tit">📅 Próximos exámenes</h3>${l.map((e) => {
        const d = diasEntre(hoy, e.fecha);
        const m = ENG.MATERIAS[e.materia] || {};
        const temas = (e.temas || []).map((t) => (ENG.Banco.temas[t] || {}).nombre).filter(Boolean);
        return `<div class="card examen ${d <= 2 ? 'urgente' : ''}">
          <div class="ex-cuenta"><b>${d === 0 ? 'HOY' : d}</b><small>${d === 0 ? '' : d === 1 ? 'día' : 'días'}</small></div>
          <div class="ex-cuerpo"><small>${m.icono || ''} ${esc(m.nombre || e.materia)}${e.parcial ? ` · ${e.parcial}º parcial` : ''}</small>
            <b>${esc(e.titulo)}</b><small>${esc(fechaCorta(e.fecha))}${temas.length ? ' · ' + esc(temas.join(', ')) : ' · toda la materia'}</small>
            ${e.nota ? `<small class="ex-nota">📝 ${esc(e.nota)}</small>` : ''}
            ${papas ? '' : `<button class="btn ${d <= 7 ? 'pri' : 'sec'} mini" data-intensivo="${e.id}">⚡ Repaso intensivo</button>`}
          </div></div>`;
      }).join('')}`;
    },
    conectar(cont) {
      cont.querySelectorAll('[data-intensivo]').forEach((b) => (b.onclick = () => Examenes.intensivo(+b.dataset.intensivo)));
    },
    intensivo(id) {
      const ex = ((ENG.ctx.estado && ENG.ctx.estado.examenes) || []).find((e) => e.id === id);
      if (!ex) return;
      const go = () => ENG.Motor.iniciar({ materia: ex.materia, modo: 'intensivo', titulo: ex.titulo, preguntas: seleccionIntensivo(ex), feedback: true, repetir: go });
      go();
    },
    // Renglones para «Hoy te toca»: exámenes de los próximos 7 días
    planItems(estado) {
      const hoy = estado.hoy || ENG.hoy();
      const hechoHoy = (mid) => ((estado.intentos) || []).some((it) => it.modo === 'intensivo' && it.materia === mid && ENG.diaLocal(it.creado) === hoy);
      return proximos(estado, 7).map((e) => ({
        id: e.id, m: e.materia, hecho: hechoHoy(e.materia),
        texto: `⚡ Repaso intensivo: ${e.titulo} (${cuandoTxt(hoy, e.fecha).toLowerCase()})`
      }));
    },

    // Vista del maestro
    async vista() {
      const mats = materiasMias();
      app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">📅 Exámenes</h1>
        <p class="ayuda-txt">Pon la fecha de tus exámenes. A tus alumnos les aparece la cuenta regresiva y un <b>Repaso intensivo</b> con los temas que elijas; les llega una notificación 3 días antes y un día antes (también a los papás).</p>
        ${mats.length ? '<button class="btn pri" id="ex-nuevo">+ Nuevo examen</button>' : '<div class="card vacio">No tienes materias asignadas.</div>'}
        <div id="ex-lista">${ENG.cargandoHTML()}</div>`;
      document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
      const bn = document.getElementById('ex-nuevo');
      if (bn) bn.onclick = () => Examenes.formulario({});
      try {
        const l = await ENG.API.examenesListar();
        const hoy = ENG.hoy();
        const cont = document.getElementById('ex-lista');
        cont.innerHTML = l.length ? l.map((e) => {
          const pasado = e.fecha < hoy;
          const temas = (e.temas || []).map((t) => (ENG.Banco.temas[t] || {}).nombre).filter(Boolean);
          return `<div class="card examen ${pasado ? 'pasado' : diasEntre(hoy, e.fecha) <= 2 ? 'urgente' : ''}">
            <div class="ex-cuenta"><b>${pasado ? '✓' : diasEntre(hoy, e.fecha)}</b><small>${pasado ? 'pasó' : 'días'}</small></div>
            <div class="ex-cuerpo"><small>${esc(nombreMat(e.materia))}${e.parcial ? ` · ${e.parcial}º parcial` : ''}</small><b>${esc(e.titulo)}</b>
              <small>${esc(fechaCorta(e.fecha))} · ${temas.length ? esc(temas.join(', ')) : 'toda la materia'}${e.alumnos && e.alumnos.length ? ` · ${e.alumnos.length} alumno(s)` : ''}</small>
              ${e.mio || esAdmin() ? `<div class="mini-botones"><button class="btn fant mini" data-ed="${e.id}">Editar</button><button class="btn fant mini" data-del="${e.id}">Borrar</button></div>` : ''}
            </div></div>`;
        }).join('') : '<div class="card vacio">Sin exámenes programados.</div>';
        cont.querySelectorAll('[data-ed]').forEach((b) => (b.onclick = () => Examenes.formulario(l.find((x) => x.id === +b.dataset.ed))));
        cont.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
          if (!(await ENG.confirmar('¿Borrar este examen?', 'Borrar'))) return;
          try { await ENG.API.examenBorrar(+b.dataset.del); Examenes.vista(); } catch (e) { ENG.toast(e.message, 'mal'); }
        }));
      } catch (e) {
        document.getElementById('ex-lista').innerHTML = `<div class="card vacio">${esc(e.message)}</div>`;
      }
    },
    formulario(e) {
      const mats = materiasMias();
      const mid0 = e.materia || mats[0].id;
      const opsTemas = (mid, sel) => ENG.Banco.temasDe(mid).map((t) => `<label class="check"><input type="checkbox" value="${t.id}" ${(sel || []).includes(t.id) ? 'checked' : ''}><span>${t.sub ? t.sub.toUpperCase() + ' · ' : ''}${esc(t.nombre)}</span></label>`).join('');
      ENG.modal({
        titulo: e.id ? 'Editar examen' : '📅 Nuevo examen',
        clase: 'ancho',
        html: `<form class="form" id="f-ex" onsubmit="return false">
          <label class="campo"><span>Materia</span><select id="ex-mat">${mats.map((m) => `<option value="${m.id}" ${m.id === mid0 ? 'selected' : ''}>${m.icono} ${esc(m.nombre)}</option>`).join('')}</select></label>
          <label class="campo"><span>Título</span><input id="ex-tit" maxlength="120" value="${esc(e.titulo || '')}" placeholder="Ej. Examen 2º parcial"></label>
          <div class="dos-col"><label class="campo"><span>Fecha</span><input id="ex-fecha" type="date" value="${esc(e.fecha || ENG.sumarDias(ENG.hoy(), 7))}"></label>
            <label class="campo"><span>Parcial</span><select id="ex-par"><option value="">—</option>${[1, 2, 3].map((n) => `<option value="${n}" ${e.parcial === n ? 'selected' : ''}>${n}º</option>`).join('')}</select></label></div>
          <p class="peq"><b>Temas que entran</b> (si no marcas ninguno, entra toda la materia):</p>
          <div class="checks scroll" id="ex-temas">${opsTemas(mid0, e.temas)}</div>
          <label class="campo"><span>Nota para los alumnos (opcional)</span><input id="ex-nota" maxlength="500" value="${esc(e.nota || '')}" placeholder="Ej. Traer calculadora y formulario"></label>
        </form>`,
        botones: [
          { txt: 'Cancelar' },
          {
            txt: 'Guardar', clase: 'pri',
            fn: async (fondo) => {
              const q = (s) => fondo.querySelector(s);
              const d = {
                id: e.id, materia: q('#ex-mat').value, titulo: q('#ex-tit').value.trim(), fecha: q('#ex-fecha').value,
                parcial: +q('#ex-par').value || null, temas: [...fondo.querySelectorAll('#ex-temas input:checked')].map((i) => i.value),
                nota: q('#ex-nota').value.trim(), alumnos: e.alumnos || []
              };
              if (!d.titulo) { ENG.toast('Escribe un título', 'mal'); return false; }
              if (!d.fecha) { ENG.toast('Elige la fecha', 'mal'); return false; }
              try { await ENG.API.examenGuardar(d); ENG.toast('Examen guardado ✔', 'ok'); Examenes.vista(); }
              catch (err) { ENG.toast(err.message, 'mal'); return false; }
            }
          }
        ]
      });
      const sel = document.getElementById('ex-mat');
      sel.onchange = () => (document.getElementById('ex-temas').innerHTML = opsTemas(sel.value, []));
    }
  };

  // ══════════════════════════ RESPALDOS ══════════════════════════
  const Respaldo = {
    async vista() {
      if (!esAdmin()) return (location.hash = '#/inicio');
      app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">💾 Respaldo</h1>
        <p class="ayuda-txt">El plan gratis de Supabase <b>no guarda copias</b>. Descarga un respaldo cada semana y guárdalo en tu Drive o en tu compu: trae alumnos, códigos, avance, calificaciones, misiones, exámenes y tus preguntas.</p>
        <div class="card" id="rs-estado">${ENG.cargandoHTML()}</div>
        <button class="btn pri ancho" id="rs-bajar">⬇️ Descargar respaldo ahora</button>
        <div class="card form"><b>Restaurar desde un archivo</b>
          <p class="peq">Solo agrega lo que falte: no borra ni cambia lo que ya está. Útil si cambias de proyecto de Supabase o si algo se borró por error. Las cuentas de los maestros no se restauran (vuelves a crearlas en 👩‍🏫 Maestros).</p>
          <input type="file" id="rs-archivo" accept="application/json,.json">
          <div id="rs-res"></div></div>
        <div class="card"><b>🫀 Latido</b><p class="peq">Supabase pausa los proyectos gratis que pasan 7 días sin actividad (por ejemplo, en vacaciones). Engrane manda un «latido» solo: cada vez que alguien abre la app, cada 15 minutos desde los recordatorios automáticos y, si lo activaste, cada 2 días desde GitHub (ver LEEME).</p></div>`;
      document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
      const pintarEstado = async () => {
        try {
          const s = await ENG.API.sistemaEstado();
          const f = (x) => (x ? new Date(x).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : 'nunca');
          const viejo = !s.respaldo || Date.now() - new Date(s.respaldo.actualizado) > 7 * 864e5;
          document.getElementById('rs-estado').innerHTML = `<p>Último respaldo: <b class="${viejo ? 'txt-rojo' : 'txt-verde'}">${f(s.respaldo && s.respaldo.actualizado)}</b></p>
            <p>Último latido: <b>${f(s.latido && s.latido.actualizado)}</b></p>`;
        } catch (e) { document.getElementById('rs-estado').textContent = e.message; }
      };
      pintarEstado();
      document.getElementById('rs-bajar').onclick = async (ev) => {
        ev.target.disabled = true;
        try {
          const datos = await ENG.API.respaldo();
          const blob = new Blob([JSON.stringify(datos)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `engrane-respaldo-${ENG.hoy()}.json`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
          ENG.toast(`Respaldo descargado ✔ (${(datos.eng_alumnos || []).length} alumnos)`, 'ok');
          pintarEstado();
        } catch (e) { ENG.toast(e.message, 'mal'); }
        ev.target.disabled = false;
      };
      document.getElementById('rs-archivo').onchange = async (ev) => {
        const f = ev.target.files[0];
        if (!f) return;
        let datos;
        try { datos = JSON.parse(await f.text()); } catch (e) { return ENG.toast('Ese archivo no es un respaldo de Engrane', 'mal'); }
        if (!datos || datos.engrane !== 'respaldo') return ENG.toast('Ese archivo no es un respaldo de Engrane', 'mal');
        const n = (datos.eng_alumnos || []).length;
        if (!(await ENG.confirmar(`¿Restaurar el respaldo del ${new Date(datos.fecha).toLocaleDateString('es-MX')} (${n} alumnos)? Solo se agrega lo que falte.`, 'Restaurar'))) return;
        try {
          const r = await ENG.API.restaurar(datos);
          document.getElementById('rs-res').innerHTML = `<p class="txt-verde">Listo ✔ Se agregaron: ${Object.entries(r).map(([k, v]) => `${v} ${esc(k)}`).join(', ')}.</p>`;
          ENG.ctx.alumnos = null;
        } catch (e) { ENG.toast(e.message, 'mal'); }
      };
    },
    // Aviso en el panel del admin cuando el respaldo tiene más de 7 días
    async aviso(cont) {
      if (!esAdmin() || !cont || ENG.API.modo === 'demo') return;
      try {
        const s = await ENG.API.sistemaEstado();
        const dias = s.respaldo ? Math.floor((Date.now() - new Date(s.respaldo.actualizado)) / 864e5) : null;
        if (dias !== null && dias < 7) return;
        cont.innerHTML = `<button class="card aviso-app ancho-c" id="rs-aviso"><span class="av-ico">💾</span><span class="av-txt"><b>${dias === null ? 'Haz tu primer respaldo' : `Tu último respaldo fue hace ${dias} días`}</b><p class="peq">Un toque y lo guardas en tu Drive. El plan gratis de Supabase no guarda copias.</p></span></button>`;
        document.getElementById('rs-aviso').onclick = () => (location.hash = '#/m/respaldo');
      } catch (e) {}
    }
  };

  // ══════════════════════════ LATIDO ══════════════════════════
  // Una vez al día por celular: suficiente para que Supabase vea actividad.
  ENG.latidoDiario = () => {
    if (ENG.API.modo !== 'supabase') return;
    const hoy = ENG.hoy();
    if (ENG.ls.get('eng_latido_dia') === hoy) return;
    ENG.API.latido().then((r) => r && ENG.ls.set('eng_latido_dia', hoy));
  };

  ENG.Reportes = Reportes;
  ENG.Examenes = Examenes;
  ENG.Respaldo = Respaldo;
})();
