// ENGRANE · cálculo de avance, niveles, rachas e insignias
(function () {
  const ENG = window.ENG;

  const NIVELES = [
    [0, 'Aprendiz'], [150, 'Aprendiz II'], [400, 'Operador'], [750, 'Operador II'], [1200, 'Técnico'],
    [1800, 'Técnico II'], [2600, 'Especialista'], [3600, 'Especialista II'], [5000, 'Ingeniero'], [7000, 'Ingeniero Engrane']
  ];

  const INSIGNIAS = [
    { id: 'primer', icono: '⚙️', nombre: 'Primer giro', desc: 'Terminaste tu primera actividad.', ok: (s) => s.actividades >= 1 },
    { id: 'diag', icono: '🧭', nombre: 'Punto de partida', desc: 'Hiciste un diagnóstico.', ok: (s) => s.diagnosticos >= 1 },
    { id: 'racha3', icono: '🔥', nombre: 'Engranando', desc: '3 días seguidos practicando.', ok: (s) => s.mejorRacha >= 3 },
    { id: 'racha7', icono: '🚀', nombre: 'Motor encendido', desc: '7 días seguidos practicando.', ok: (s) => s.mejorRacha >= 7 },
    { id: 'racha14', icono: '🏭', nombre: 'Máquina imparable', desc: '14 días seguidos practicando.', ok: (s) => s.mejorRacha >= 14 },
    { id: 'dias10', icono: '📅', nombre: 'Constancia', desc: 'Practicaste en 10 días distintos.', ok: (s) => s.diasActivos >= 10 },
    { id: 'ac100', icono: '💯', nombre: '100 aciertos', desc: 'Llevas 100 respuestas correctas.', ok: (s) => s.aciertos >= 100 },
    { id: 'ac500', icono: '🏆', nombre: '500 aciertos', desc: 'Llevas 500 respuestas correctas.', ok: (s) => s.aciertos >= 500 },
    { id: 'dom1', icono: '🛡️', nombre: 'Jefe vencido', desc: 'Dominaste tu primer tema (jefe final con 8 o más).', ok: (s) => s.dominados >= 1 },
    { id: 'dom5', icono: '👑', nombre: 'Maestro de temas', desc: 'Dominaste 5 temas.', ok: (s) => s.dominados >= 5 },
    { id: 'exa9', icono: '🎓', nombre: 'Examen de 9+', desc: 'Sacaste 9 o 10 en un examen simulado.', ok: (s) => s.mejorExamen >= 9 },
    { id: 'reloj', icono: '⚡', nombre: 'Rayo', desc: '12 aciertos o más en contra reloj.', ok: (s) => s.mejorReloj >= 12 },
    { id: 'memo', icono: '🧩', nombre: 'Memoria de acero', desc: 'Completaste un memorama.', ok: (s) => s.memoramas >= 1 },
    { id: 'repaso', icono: '🎯', nombre: 'Cazador de errores', desc: '20 aciertos en repasos de errores.', ok: (s) => s.aciertosRepaso >= 20 }
  ];

  function nivel(xp) {
    let i = 0;
    while (i + 1 < NIVELES.length && xp >= NIVELES[i + 1][0]) i++;
    const desde = NIVELES[i][0];
    const hasta = NIVELES[i + 1] ? NIVELES[i + 1][0] : null;
    return {
      n: i + 1, nombre: NIVELES[i][1], desde, hasta,
      pct: hasta ? Math.min(1, (xp - desde) / (hasta - desde)) : 1,
      falta: hasta ? hasta - xp : 0, siguiente: NIVELES[i + 1] ? NIVELES[i + 1][1] : null
    };
  }

  function calcRacha(diasSet, hoy) {
    let d = diasSet.has(hoy) ? hoy : ENG.sumarDias(hoy, -1);
    let n = 0;
    while (diasSet.has(d)) {
      n++;
      d = ENG.sumarDias(d, -1);
    }
    return n;
  }
  function mejorRacha(diasOrd) {
    let mejor = 0, act = 0, prev = null;
    diasOrd.forEach((d) => {
      act = prev && ENG.sumarDias(prev, 1) === d ? act + 1 : 1;
      mejor = Math.max(mejor, act);
      prev = d;
    });
    return mejor;
  }

  // Con 2 respuestas ya hay un color (estimado); con más se vuelve más confiable
  function semaforo(n, pct) {
    if (n < 2) return 'gris';
    if (pct < 0.6) return 'rojo';
    if (pct < 0.8) return 'amarillo';
    return 'verde';
  }

  // estado = lo que regresa eng_alumno_estado / eng_papas_estado / eng_estado_maestro
  function analizar(estado) {
    const B = ENG.Banco;
    const hoy = ENG.hoy();
    const lunes = ENG.lunesDeEstaSemana();
    const intentos = (estado && estado.intentos) || [];
    const materiasAlumno = (estado && estado.alumno && estado.alumno.materias) || [];
    const dias = new Set();
    const s = {
      xp: (estado && estado.xp_total) || intentos.reduce((a, i) => a + (i.xp || 0), 0),
      xpSemana: 0, actividades: 0, diagnosticos: 0, aciertos: 0, respuestas: 0, dominados: 0,
      mejorExamen: 0, mejorReloj: 0, memoramas: 0, aciertosRepaso: 0, segSemana: 0,
      temas: {}, materias: {}, porDia: {}, examenes: [], ultima: null
    };
    // respuestas por tema en orden cronológico
    const respTema = {};
    const dominado = {};
    const jefes = {};
    intentos.forEach((it) => {
      const dia = ENG.diaLocal(it.creado);
      dias.add(dia);
      s.porDia[dia] = (s.porDia[dia] || 0) + (it.segundos || 0);
      if (dia >= lunes) {
        s.xpSemana += it.xp || 0;
        s.segSemana += it.segundos || 0;
      }
      s.actividades++;
      s.ultima = it.creado;
      if (it.modo === 'diagnostico') s.diagnosticos++;
      if (it.modo === 'memorama' && it.aciertos >= it.total && it.total > 0) s.memoramas++;
      if (it.modo === 'reloj') s.mejorReloj = Math.max(s.mejorReloj, it.aciertos);
      if (it.modo === 'repaso') s.aciertosRepaso += it.aciertos;
      if (it.modo === 'examen') {
        s.mejorExamen = Math.max(s.mejorExamen, it.calificacion || 0);
        s.examenes.push(it);
      }
      if (it.modo === 'jefe' && it.tema) {
        jefes[it.tema] = Math.max(jefes[it.tema] || 0, it.total ? it.aciertos / it.total : 0);
        if (it.total && it.aciertos / it.total >= 0.8) dominado[it.tema] = true;
      }
      if (it.modo !== 'memorama' && it.modo !== 'leccion') {
        (it.detalle || []).forEach((d) => {
          if (!d || !d.p) return;
          const t = B.temaDePregunta(d.p);
          (respTema[t] = respTema[t] || []).push(!!d.ok);
          s.respuestas++;
          if (d.ok) s.aciertos++;
        });
      }
    });
    // lecciones vistas
    const lecciones = {};
    intentos.filter((i) => i.modo === 'leccion' && i.tema).forEach((i) => (lecciones[i.tema] = (lecciones[i.tema] || 0) + 1));

    // por tema
    Object.values(B.temas).forEach((t) => {
      const r = respTema[t.id] || [];
      const ult = r.slice(-12);
      const pct = ult.length ? ult.filter(Boolean).length / ult.length : 0;
      s.temas[t.id] = {
        n: r.length, pct, sem: semaforo(ult.length, pct), dominado: !!dominado[t.id],
        mejorJefe: jefes[t.id] || 0, leccion: !!lecciones[t.id]
      };
      if (dominado[t.id]) s.dominados++;
    });

    // pendientes de repaso
    const pend = {};
    ((estado && estado.estado) || []).forEach((e) => {
      if (e.n <= hoy && B.preguntas[e.p]) pend[e.m] = (pend[e.m] || 0) + 1;
    });

    // por materia
    const mids = new Set([...materiasAlumno, ...intentos.map((i) => i.materia)]);
    mids.forEach((mid) => {
      const temas = B.temasDe(mid);
      const c = { verde: 0, amarillo: 0, rojo: 0, gris: 0 };
      let sumaPct = 0;
      temas.forEach((t) => {
        const st = s.temas[t.id];
        c[st.sem]++;
        sumaPct += st.n >= 2 ? st.pct : 0;
      });
      const ints = intentos.filter((i) => i.materia === mid);
      s.materias[mid] = {
        temas: temas.length, ...c, dominio: temas.length ? sumaPct / temas.length : 0,
        dominados: temas.filter((t) => s.temas[t.id].dominado).length,
        diagnostico: ints.some((i) => i.modo === 'diagnostico'),
        examenes: ints.filter((i) => i.modo === 'examen'),
        pendientes: pend[mid] || 0,
        segSemana: ints.filter((i) => ENG.diaLocal(i.creado) >= lunes).reduce((a, i) => a + (i.segundos || 0), 0),
        xp: ints.reduce((a, i) => a + (i.xp || 0), 0),
        ultima: ints.length ? ints[ints.length - 1].creado : null
      };
    });

    const diasOrd = [...dias].sort();
    s.diasActivos = dias.size;
    s.dias = dias;
    s.racha = calcRacha(dias, hoy);
    s.mejorRacha = mejorRacha(diasOrd);
    s.nivel = nivel(s.xp);
    s.pendientes = Object.values(pend).reduce((a, b) => a + b, 0);
    s.insignias = INSIGNIAS.map((x) => ({ ...x, logrado: x.ok(s) }));
    return s;
  }

  // Qué le conviene hacer ahora en una materia
  function sugerencia(an, mid) {
    const temas = ENG.Banco.temasDe(mid);
    if (!temas.length) return null;
    const m = an.materias[mid];
    if (m && m.pendientes >= 5) return { tipo: 'repaso', texto: `Tienes ${m.pendientes} preguntas por repasar` };
    const nuevo = temas.find((t) => an.temas[t.id].n < 2);
    const flojo = temas
      .filter((t) => an.temas[t.id].n >= 2 && (an.temas[t.id].sem === 'rojo' || an.temas[t.id].sem === 'amarillo'))
      .sort((a, b) => an.temas[a.id].pct - an.temas[b.id].pct)[0];
    if (flojo && (!nuevo || an.temas[flojo.id].sem === 'rojo')) return { tipo: 'tema', tema: flojo, texto: `Refuerza: ${flojo.nombre}` };
    if (nuevo) return { tipo: 'tema', tema: nuevo, texto: `${an.temas[nuevo.id].n ? 'Sigue con' : 'Empieza'}: ${nuevo.nombre}` };
    const sinJefe = temas.find((t) => !an.temas[t.id].dominado);
    if (sinJefe) return { tipo: 'jefe', tema: sinJefe, texto: `Vence al jefe final de: ${sinJefe.nombre}` };
    return { tipo: 'examen', texto: 'Todo en verde: haz un examen simulado' };
  }

  // Calificación al estilo de la boleta: base 10, sin decimales, hacia abajo, mínima 5
  const calificacion = (ac, total) => (total ? Math.max(5, Math.floor((ac / total) * 10 + 1e-9)) : 5);

  ENG.Progreso = { NIVELES, INSIGNIAS, nivel, analizar, sugerencia, calificacion, semaforo };
})();
