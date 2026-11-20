// ENGRANE · reporte de avance (papás y maestros) y pantalla de papás
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');

  // ── Reporte reutilizable ──
  function reporteHTML(estado, an, { para = 'papas', imprimir = false } = {}) {
    const al = estado.alumno;
    const cfg = window.ENGRANE_CONFIG || {};
    const hoy = ENG.hoy();
    const dias14 = Array.from({ length: 14 }, (_, i) => ENG.sumarDias(hoy, i - 13));
    const materias = (al.materias || []).filter((m) => ENG.MATERIAS[m]);
    const nombreCorto = esc((al.nombre || '').split(' ')[0]);
    const califs = estado.califs || [];

    const bloqueMateria = (mid) => {
      const m = ENG.MATERIAS[mid];
      const st = an.materias[mid];
      const temas = ENG.Banco.temasDe(mid);
      if (!m.disponible || !temas.length) {
        return `<div class="card rep-mat"><h3>${m.icono} ${esc(m.nombre)}</h3><p class="vacio">Contenido en preparación.</p>${califsHTML(mid)}</div>`;
      }
      const fuertes = temas.filter((t) => an.temas[t.id].sem === 'verde');
      const flojos = temas.filter((t) => an.temas[t.id].sem === 'rojo' || an.temas[t.id].sem === 'amarillo').sort((a, b) => an.temas[a.id].pct - an.temas[b.id].pct);
      const sin = temas.filter((t) => an.temas[t.id].sem === 'gris');
      const exs = (st && st.examenes) || [];
      return `<div class="card rep-mat">
        <h3>${m.icono} ${esc(m.nombre)} <small>${esc(m.titulo)}</small></h3>
        <div class="semaforo-barra grande">
          <i class="verde" style="flex:${st ? st.verde : 0}"></i><i class="amarillo" style="flex:${st ? st.amarillo : 0}"></i><i class="rojo" style="flex:${st ? st.rojo : 0}"></i><i class="gris" style="flex:${st ? st.gris : temas.length}"></i>
        </div>
        <p class="rep-cifras"><b>${st ? st.verde : 0}</b> de ${temas.length} temas en verde · <b>${st ? st.dominados : 0}</b> jefes vencidos · ${ENG.minutos(st ? st.segSemana : 0)} esta semana</p>
        ${fuertes.length ? `<p><b class="txt-verde">✔ Domina:</b> ${fuertes.map((t) => esc(t.nombre)).join(', ')}</p>` : ''}
        ${flojos.length ? `<p><b class="txt-rojo">↻ A reforzar:</b> ${flojos.map((t) => `${esc(t.nombre)} (${Math.round(an.temas[t.id].pct * 100)}%)`).join(', ')}</p>` : ''}
        ${sin.length ? `<p class="txt-gris">Sin practicar aún: ${sin.length} tema${sin.length === 1 ? '' : 's'}</p>` : ''}
        ${exs.length ? `<p><b>Exámenes simulados:</b> ${exs.slice(-4).map((e) => `<span class="cal ${e.calificacion >= m.aprobatoria ? 'ok' : 'no'}">${e.calificacion}</span> <small>${ENG.fechaCorta(e.creado)}</small>`).join(' · ')}</p>` : ''}
        ${califsHTML(mid)}
      </div>`;
    };
    function califsHTML(mid) {
      const m = ENG.MATERIAS[mid];
      const cs = califs.filter((c) => c.materia === mid);
      if (!cs.length) return '';
      const subs = m.subs ? m.subs.map((s) => s.id) : [''];
      return `<table class="tabla-boleta"><thead><tr><th>Boleta</th><th>1er P.</th><th>2do P.</th><th>3er P.</th></tr></thead><tbody>${subs
        .map((s) => `<tr><td>${s ? s.toUpperCase() : esc(m.nombre)}</td>${[1, 2, 3]
          .map((p) => {
            const c = cs.find((x) => x.sub === s && x.parcial === p);
            return `<td>${c ? `<span class="cal ${c.cal >= m.aprobatoria ? 'ok' : 'no'}">${c.cal}</span>` : '—'}</td>`;
          })
          .join('')}</tr>`)
        .join('')}</tbody></table>`;
    }

    const consejos = [];
    const flojoGlobal = materias
      .flatMap((mid) => ENG.Banco.temasDe(mid).filter((t) => an.temas[t.id].sem === 'rojo'))
      .slice(0, 2);
    if (an.racha === 0) consejos.push(`Pídanle 10 minutos de Engrane hoy: la constancia pesa más que una sesión larga.`);
    else consejos.push(`Lleva ${an.racha} día${an.racha === 1 ? '' : 's'} seguidos: ¡reconózcanselo! Mantener la racha motiva mucho.`);
    flojoGlobal.forEach((t) => consejos.push(`Pregúntenle qué entendió de «${esc(t.nombre)}» y que les explique un ejemplo con sus palabras.`));
    consejos.push('Usen el botón «Prueba lo que tu hijo está viendo» y jueguen una ronda juntos: ¡que él les gane!');

    return `<div class="reporte ${imprimir ? 'imprimible' : ''}">
      <div class="rep-head card">
        ${ENG.engraneSVG({ tam: 64, texto: an.nivel.n, dientes: 12 })}
        <div><small>${esc(cfg.ESCUELA || '')}</small><h2>${esc(al.nombre)}</h2>
          <p>Apodo: <b>${esc(al.apodo)}</b> · Nivel ${an.nivel.n} (${esc(an.nivel.nombre)}) · ${an.xp} XP</p>
          <p class="peq">Reporte al ${ENG.fechaCorta(hoy)} · última actividad: ${ENG.hace(an.ultima)}</p></div>
      </div>
      <div class="kpis">
        <div class="kpi"><b>${an.racha}</b><small>días de racha</small></div>
        <div class="kpi"><b>${ENG.minutos(an.segSemana)}</b><small>practicados esta semana</small></div>
        <div class="kpi"><b>${an.diasActivos}</b><small>días activos en total</small></div>
        <div class="kpi"><b>${an.respuestas ? Math.round((an.aciertos / an.respuestas) * 100) : 0}%</b><small>de aciertos (${an.respuestas} respuestas)</small></div>
      </div>
      <div class="card"><b>Últimos 14 días</b>
        <div class="calendario">${dias14
          .map((d) => `<div class="cal-dia ${an.porDia[d] != null ? 'activo' : ''} ${d === hoy ? 'hoy' : ''}" title="${d}"><small>${ENG.diaSemana(d)[0].toUpperCase()}</small><i></i><small>${+d.slice(8)}</small></div>`)
          .join('')}</div></div>
      ${ENG.Misiones.resumenHTML(estado)}
      ${materias.map(bloqueMateria).join('')}
      ${para === 'papas' ? `<div class="card consejos"><b>💡 Cómo apoyar en casa</b><ul>${consejos.map((c) => `<li>${c}</li>`).join('')}</ul></div>` : ''}
    </div>`;
  }

  function textoWhatsApp(estado, an, firma = '') {
    const al = estado.alumno;
    const nom = (al.nombre || '').split(' ')[0];
    const lineas = [`Hola, familia de ${nom} 👋`, `Les comparto su avance en Engrane:`];
    lineas.push(`• Racha: ${an.racha} día(s) · practicó ${ENG.minutos(an.segSemana)} esta semana`);
    (al.materias || []).forEach((mid) => {
      const m = ENG.MATERIAS[mid];
      if (!m || !m.disponible) return;
      const temas = ENG.Banco.temasDe(mid);
      const st = an.materias[mid];
      const flojos = temas.filter((t) => an.temas[t.id].sem === 'rojo' || an.temas[t.id].sem === 'amarillo').map((t) => t.nombre);
      lineas.push(`• ${m.nombre}: ${st ? st.verde : 0}/${temas.length} temas dominados${flojos.length ? `. A reforzar: ${flojos.slice(0, 3).join(', ')}` : ''}`);
      const ex = st && st.examenes.slice(-1)[0];
      if (ex) lineas.push(`  Último examen simulado: ${ex.calificacion}`);
    });
    if (firma) lineas.push(`— ${firma}`);
    return lineas.join('\n');
  }

  // ── Pantalla de papás ──
  function inicio() {
    ENG.ctx.prueba = false;
    const { estado, an } = ENG.ctx;
    const nombreCorto = (estado.alumno.nombre || '').split(' ')[0];
    const mats = (estado.alumno.materias || []).filter((m) => ENG.MATERIAS[m] && ENG.MATERIAS[m].disponible);
    app().innerHTML = `
      <section class="papas-hero card">
        <div><small>Familia de</small><h1>${esc(nombreCorto)}</h1><p>Aquí ven cómo va y pueden probar exactamente lo que está practicando.</p></div>
        <button class="btn pri grande" id="p-probar">▶ Prueba lo que tu hijo está viendo</button>
      </section>
      ${ENG.Avisos.banner(estado, 'papas')}
      ${reporteHTML(estado, an, { para: 'papas' })}
      <div id="p-push"></div>
      <div class="botonera"><button class="btn sec" id="p-ranking">🏁 Ver ranking</button><button class="btn fant" id="p-act">↻ Actualizar</button></div>`;
    ENG.Avisos.conectar(app());
    ENG.Push.pintar(document.getElementById('p-push'), 'papas', ENG.ctx.codigo);
    document.getElementById('p-probar').onclick = () => {
      if (mats.length === 1) return ENG.entrarPrueba('#/materia/' + mats[0]);
      const md = ENG.modal({
        titulo: '¿Qué materia quieren probar?',
        html: `<div class="lista-botones">${mats.map((m) => `<button class="btn sec ancho" data-m="${m}">${ENG.MATERIAS[m].icono} ${esc(ENG.MATERIAS[m].nombre)}</button>`).join('')}</div>`,
        botones: [{ txt: 'Cancelar' }]
      });
      md.el.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { md.cerrar(); ENG.entrarPrueba('#/materia/' + b.dataset.m); }));
    };
    document.getElementById('p-ranking').onclick = () => (location.hash = '#/ranking');
    document.getElementById('p-act').onclick = () => ENG.recargarEstado().then(() => inicio());
  }

  ENG.Reporte = { html: reporteHTML, whatsapp: textoWhatsApp };
  ENG.VistasPapas = { inicio };
})();
