// ENGRANE · editor de preguntas para maestros (se guardan en Supabase y les salen a los alumnos)
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const TIPOS = [
    ['om', 'Opción múltiple'], ['vf', 'Verdadero / Falso'], ['co', 'Completar (escribir)'], ['nu', 'Numérica (cálculo)'],
    ['or', 'Ordenar piezas'], ['re', 'Relacionar parejas'], ['ha', 'Pronunciación (inglés, con micrófono)']
  ];
  const nombreTipo = (t) => (TIPOS.find((x) => x[0] === t) || [t, t])[1];
  let filtro = { materia: '', tema: '' };

  // Carga las preguntas de los maestros al banco (para que salgan en práctica, exámenes, etc.)
  ENG.cargarExtras = async () => {
    let lista = ENG.ls.get('eng_extra', []);
    try {
      lista = await ENG.API.preguntasExtra();
      ENG.ls.set('eng_extra', lista);
    } catch (e) {}
    ENG.Banco.agregarExtra(lista || []);
  };

  function materiasMias() {
    const p = ENG.ctx.perfil;
    return Object.values(ENG.MATERIAS).filter((m) => m.disponible && (p.rol === 'admin' || (p.materias || []).includes(m.id)));
  }

  async function vista() {
    const mats = materiasMias();
    if (!mats.length) {
      app().innerHTML = `<button class="volver" onclick="location.hash='#/inicio'">‹ Panel</button><div class="card vacio">No tienes materias asignadas.</div>`;
      return;
    }
    if (!filtro.materia || !mats.find((m) => m.id === filtro.materia)) filtro = { materia: mats[0].id, tema: '' };
    app().innerHTML = `<button class="volver" id="v-volver">‹ Panel</button><h1 class="tit">✏️ Mis preguntas</h1>
      <p class="ayuda-txt">Agrega preguntas a cualquier tema. Salen en práctica, contra reloj, jefe final, exámenes y clase en vivo, igual que las de la SEP. Puedes apagarlas sin borrarlas.</p>
      <div class="card form filtros"><div class="dos-col">
        <label class="campo"><span>Materia</span><select id="ed-mat">${mats.map((m) => `<option value="${m.id}" ${m.id === filtro.materia ? 'selected' : ''}>${m.icono} ${esc(m.nombre)}</option>`).join('')}</select></label>
        <label class="campo"><span>Tema</span><select id="ed-tema"></select></label></div>
        <button class="btn pri" id="ed-nueva">+ Nueva pregunta</button></div>
      <div id="ed-lista">${ENG.cargandoHTML()}</div>`;
    document.getElementById('v-volver').onclick = () => (location.hash = '#/inicio');
    const selTema = document.getElementById('ed-tema');
    const pintarTemas = () => {
      selTema.innerHTML = `<option value="">Todos los temas</option>` + ENG.Banco.temasDe(filtro.materia).map((t) => `<option value="${t.id}" ${t.id === filtro.tema ? 'selected' : ''}>${t.sub ? t.sub.toUpperCase() + ' · ' : ''}${esc(t.nombre)}</option>`).join('');
    };
    pintarTemas();
    document.getElementById('ed-mat').onchange = (e) => { filtro = { materia: e.target.value, tema: '' }; pintarTemas(); lista(); };
    selTema.onchange = (e) => { filtro.tema = e.target.value; lista(); };
    document.getElementById('ed-nueva').onclick = () => formulario({ materia: filtro.materia, tema: filtro.tema || (ENG.Banco.temasDe(filtro.materia)[0] || {}).id });
    lista();
  }

  async function lista() {
    const cont = document.getElementById('ed-lista');
    try {
      const todas = await ENG.API.preguntasExtraStaff();
      const l = todas.filter((x) => x.materia === filtro.materia && (!filtro.tema || x.tema === filtro.tema));
      if (!l.length) return (cont.innerHTML = `<div class="card vacio">Aún no hay preguntas tuyas aquí. Las ${ENG.Banco.preguntasDe(filtro.materia).length} preguntas del programa SEP siguen funcionando.</div>`);
      cont.innerHTML = l.map((x) => {
        const [tipo, q] = x.datos;
        const t = ENG.Banco.temas[x.tema];
        return `<div class="card ed-item ${x.activo ? '' : 'apagada'}"><div class="mc-top"><div><small>${esc(nombreTipo(tipo))} · ${t ? esc(t.nombre) : x.tema}${x.autor ? ' · ' + esc(x.autor) : ''}</small><b>${ENG.formatear(q)}</b></div></div>
          <div class="botonera izq"><button class="btn sec mini" data-ed="${x.id}">Editar</button><button class="btn fant mini" data-on="${x.id}">${x.activo ? 'Apagar' : 'Encender'}</button><button class="btn fant mini" data-del="${x.id}">Borrar</button></div></div>`;
      }).join('');
      const porId = (id) => l.find((x) => String(x.id) === String(id));
      cont.querySelectorAll('[data-ed]').forEach((b) => (b.onclick = () => formulario(porId(b.dataset.ed))));
      cont.querySelectorAll('[data-on]').forEach((b) => (b.onclick = async () => {
        const x = porId(b.dataset.on);
        try { await ENG.API.preguntaGuardar({ ...x, activo: !x.activo }); await ENG.cargarExtras(); lista(); } catch (e) { ENG.toast(e.message, 'mal'); }
      }));
      cont.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
        if (!(await ENG.confirmar('¿Borrar esta pregunta?', 'Borrar'))) return;
        try { await ENG.API.preguntaBorrar(+b.dataset.del); await ENG.cargarExtras(); lista(); } catch (e) { ENG.toast(e.message, 'mal'); }
      }));
    } catch (e) { cont.innerHTML = `<div class="card vacio">${esc(e.message)}</div>`; }
  }

  function formulario(x) {
    const d = x.datos || ['om', '', ['', '', '', ''], 0, '', {}];
    const [tipo0, q0, data0, resp0, exp0, extra0 = {}] = d;
    const temas = ENG.Banco.temasDe(x.materia);
    const md = ENG.modal({
      titulo: x.id ? 'Editar pregunta' : 'Nueva pregunta',
      clase: 'ancho',
      html: `<form class="form" id="f-ed" onsubmit="return false">
        <label class="campo"><span>Tema</span><select id="e-tema">${temas.map((t) => `<option value="${t.id}" ${t.id === x.tema ? 'selected' : ''}>${t.sub ? t.sub.toUpperCase() + ' · ' : ''}${esc(t.nombre)}</option>`).join('')}</select></label>
        <label class="campo"><span>Tipo</span><select id="e-tipo">${TIPOS.filter(([k]) => k !== 'ha' || x.materia === 'ingles3').map(([k, t]) => `<option value="${k}" ${k === tipo0 ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label class="campo"><span id="e-q-et">Pregunta</span><textarea id="e-q" rows="2" placeholder="Usa ___ para un hueco y **así** para negritas">${esc(q0)}</textarea></label>
        <div id="e-campos"></div>
        <label class="campo"><span>Explicación (se muestra al contestar)</span><textarea id="e-exp" rows="2">${esc(exp0 || '')}</textarea></label>
        <div class="dos-col"><label class="campo"><span>Dificultad</span><select id="e-n"><option value="1" ${(extra0.n || 1) === 1 ? 'selected' : ''}>Básica</option><option value="2" ${extra0.n === 2 ? 'selected' : ''}>Media</option><option value="3" ${extra0.n === 3 ? 'selected' : ''}>Difícil</option></select></label>
        ${x.materia === 'ingles3' ? `<label class="campo"><span>Audio (texto en inglés que se lee en voz alta, opcional)</span><input id="e-audio" value="${esc(extra0.audio || '')}"></label>` : ''}</div>
      </form>`,
      botones: [{ txt: 'Cancelar' }, { txt: 'Guardar', clase: 'pri', fn: async (el) => {
        try {
          const datos = leer(el);
          await ENG.API.preguntaGuardar({ id: x.id, materia: x.materia, tema: el.querySelector('#e-tema').value, datos, activo: x.activo !== false });
          await ENG.cargarExtras();
          ENG.toast('Pregunta guardada ✔', 'ok');
          filtro.tema = el.querySelector('#e-tema').value;
          vista();
        } catch (e) { ENG.toast(e.message, 'mal'); return false; }
      } }]
    });
    const el = md.el;
    const campos = () => {
      const t = el.querySelector('#e-tipo').value;
      const mismo = t === tipo0;
      el.querySelector('#e-q-et').textContent = t === 'ha' ? 'Instrucción (ej. Read aloud:)' : 'Pregunta';
      let h = '';
      if (t === 'om') {
        const ops = mismo && Array.isArray(data0) ? data0 : ['', '', '', ''];
        h = `<p class="peq">Opciones (marca la correcta). Puedes dejar vacías las que no uses.</p>${[0, 1, 2, 3, 4].map((i) => `<label class="op-ed"><input type="radio" name="e-ok" value="${i}" ${mismo && resp0 === i ? 'checked' : !mismo && i === 0 ? 'checked' : ''}><input class="e-op" value="${esc(ops[i] || '')}" placeholder="Opción ${'ABCDE'[i]}"></label>`).join('')}`;
      } else if (t === 'vf') {
        h = `<p class="peq">Respuesta correcta</p><label class="check"><input type="radio" name="e-vf" value="1" ${!mismo || resp0 ? 'checked' : ''}><span>Verdadero</span></label><label class="check"><input type="radio" name="e-vf" value="0" ${mismo && !resp0 ? 'checked' : ''}><span>Falso</span></label>`;
      } else if (t === 'co') {
        h = `<label class="campo"><span>Respuestas aceptadas (separadas con |)</span><input id="e-r" value="${esc(mismo ? [].concat(resp0).join(' | ') : '')}" placeholder="studied | Studied"></label><p class="peq">No importan mayúsculas, acentos ni el punto final.</p>`;
      } else if (t === 'nu') {
        h = `<div class="dos-col"><label class="campo"><span>Resultado</span><input id="e-r" inputmode="decimal" value="${mismo ? resp0 : ''}"></label><label class="campo"><span>Unidad</span><input id="e-u" value="${esc(mismo && data0 ? data0.u || '' : '')}" placeholder="N, mm, rpm…"></label></div>
          <label class="campo"><span>Margen de error aceptado (%)</span><input id="e-tol" type="number" min="0" max="20" step="0.5" value="${mismo && data0 ? (data0.tol ?? 0.02) * 100 : 2}"></label>`;
      } else if (t === 'or') {
        h = `<label class="campo"><span>Piezas en el orden CORRECTO (una por renglón)</span><textarea id="e-partes" rows="5">${esc(mismo && Array.isArray(data0) ? data0.join('\n') : '')}</textarea></label><p class="peq">El alumno las verá revueltas.</p>`;
      } else if (t === 're') {
        h = `<label class="campo"><span>Parejas (una por renglón: izquierda = derecha)</span><textarea id="e-pares" rows="5" placeholder="Pascal = Presión igual en todo el fluido">${esc(mismo && Array.isArray(data0) ? data0.map((p) => p.join(' = ')).join('\n') : '')}</textarea></label>`;
      } else if (t === 'ha') {
        h = `<label class="campo"><span>Frase en inglés que el alumno debe decir</span><input id="e-r" value="${esc(mismo ? resp0 : '')}" placeholder="I have never been to Mexico City."></label>`;
      }
      el.querySelector('#e-campos').innerHTML = h;
    };
    el.querySelector('#e-tipo').onchange = campos;
    campos();
  }

  function leer(el) {
    const t = el.querySelector('#e-tipo').value;
    const q = el.querySelector('#e-q').value.trim();
    const exp = el.querySelector('#e-exp').value.trim();
    const extra = { n: +el.querySelector('#e-n').value };
    const au = el.querySelector('#e-audio');
    if (au && au.value.trim()) extra.audio = au.value.trim();
    if (!q) throw new Error('Escribe la pregunta.');
    if (t === 'om') {
      const ops = [...el.querySelectorAll('.e-op')].map((i) => i.value.trim());
      const okIdx = +(el.querySelector('input[name=e-ok]:checked') || {}).value || 0;
      if (!ops[okIdx]) throw new Error('La opción marcada como correcta está vacía.');
      const usadas = ops.map((o, i) => [o, i]).filter(([o]) => o);
      if (usadas.length < 2) throw new Error('Escribe al menos 2 opciones.');
      return ['om', q, usadas.map(([o]) => o), usadas.findIndex(([, i]) => i === okIdx), exp, extra];
    }
    if (t === 'vf') return ['vf', q, null, el.querySelector('input[name=e-vf]:checked').value === '1', exp, extra];
    if (t === 'co') {
      const r = el.querySelector('#e-r').value.split('|').map((s) => s.trim()).filter(Boolean);
      if (!r.length) throw new Error('Escribe al menos una respuesta aceptada.');
      return ['co', q, null, r, exp, extra];
    }
    if (t === 'nu') {
      const r = ENG.numero(el.querySelector('#e-r').value);
      if (isNaN(r)) throw new Error('El resultado debe ser un número.');
      return ['nu', q, { u: el.querySelector('#e-u').value.trim(), tol: Math.max(0, +el.querySelector('#e-tol').value || 0) / 100 }, r, exp, extra];
    }
    if (t === 'or') {
      const partes = el.querySelector('#e-partes').value.split('\n').map((s) => s.trim()).filter(Boolean);
      if (partes.length < 2) throw new Error('Escribe al menos 2 piezas.');
      if (new Set(partes).size !== partes.length) throw new Error('Hay piezas repetidas.');
      return ['or', q, partes, null, exp, extra];
    }
    if (t === 're') {
      const pares = el.querySelector('#e-pares').value.split('\n').map((s) => s.split('=').map((x) => x.trim())).filter((p) => p.length >= 2 && p[0] && p[1]).map((p) => [p[0], p.slice(1).join('=')]);
      if (pares.length < 2) throw new Error('Escribe al menos 2 parejas con «=».');
      return ['re', q, pares, null, exp, extra];
    }
    if (t === 'ha') {
      const r = el.querySelector('#e-r').value.trim();
      if (!r) throw new Error('Escribe la frase en inglés.');
      return ['ha', q, null, r, exp, extra];
    }
    throw new Error('Tipo desconocido');
  }

  ENG.Editor = { vista };
})();
