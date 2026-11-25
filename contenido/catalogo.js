// ENGRANE · catálogo de materias y banco de preguntas
// Formato de cada pregunta en los archivos de contenido:
//   ['om', 'pregunta', ['opción A','opción B',...], índiceCorrecto, 'explicación', {extra}]
//   ['vf', 'afirmación', null, true|false, 'explicación']
//   ['co', 'completa con ___', null, ['respuesta','otra válida'], 'explicación']
//   ['or', 'ordena', ['paso 1','paso 2',...en orden correcto], null, 'explicación']
//   ['re', 'relaciona', [['izq','der'],...], null, 'explicación']
//   ['nu', 'calcula', {u:'N', tol:0.02}, valorCorrecto, 'explicación']
//   ['ha', 'Read aloud:', null, 'Frase en inglés que se dice al micrófono', 'explicación']
//   extra: {n: nivel 1-3, audio: 'texto que se lee en inglés', fig: 'id de figura'}
// ⚠ Para no perder el avance de los alumnos, agrega preguntas NUEVAS SIEMPRE AL FINAL de cada tema.
(function () {
  const ENG = window.ENG;

  ENG.MATERIAS = {
    ingles3: {
      id: 'ingles3', nombre: 'Inglés III', titulo: 'What we were, we share', semestre: 3, aprobatoria: 6,
      color: '#1F6FEB', icono: '💬', disponible: true,
      fuente: 'SEP · MCCEMS Modelo Educativo 2025 · Inglés III (A2) «What We Were, We Share» · 8 propósitos formativos'
    },
    modulo2: {
      id: 'modulo2', nombre: 'Módulo II', titulo: 'Construye sistemas mecatrónicos', semestre: 3, aprobatoria: 7,
      color: '#F26B1D', icono: '⚙️', disponible: true,
      fuente: 'SEP · Programa de estudios Técnico en Mecatrónica (junio 2024) · Módulo II, págs. 32–53',
      subs: [
        { id: 's1', corto: 'S1', nombre: 'Dibuja planos de elementos mecánicos', horas: 64 },
        { id: 's2', corto: 'S2', nombre: 'Construye mecanismos de sistemas mecatrónicos', horas: 112 },
        { id: 's3', corto: 'S3', nombre: 'Instala sistemas neumáticos, electroneumáticos, hidráulicos y electrohidráulicos', horas: 96 }
      ]
    },
    lengua3: {
      id: 'lengua3', nombre: 'Lengua y Comunicación III', titulo: 'Describir culturas, apropiarse de las palabras', semestre: 3, aprobatoria: 6,
      color: '#8E44AD', icono: '📖', disponible: true,
      fuente: 'SEP · MCCEMS Modelo Educativo 2025 · Lengua y Comunicación III · 7 propósitos formativos'
    },
    matematico3: {
      id: 'matematico3', nombre: 'Pensamiento Matemático III', titulo: 'Pensamiento algebraico e introducción a geometría plana', semestre: 3, aprobatoria: 6,
      color: '#0E9384', icono: '📐', disponible: true,
      fuente: 'SEP · MCCEMS Modelo Educativo 2025 · Pensamiento Matemático III · 6 propósitos formativos'
    },
    ciencias3: {
      id: 'ciencias3', nombre: 'Ciencias Naturales III', titulo: 'Nuestro hogar. El sistema terrestre', semestre: 3, aprobatoria: 6,
      color: '#2E9E4F', icono: '🌎', disponible: true,
      fuente: 'SEP · MCCEMS Modelo Educativo 2025 · Ciencias Naturales, Experimentales y Tecnología III · 8 propósitos formativos'
    },
    filosofico2: {
      id: 'filosofico2', nombre: 'Pensamiento Filosófico y Hum. II', titulo: 'Las reflexiones filosóficas sobre el Conocer', semestre: 3, aprobatoria: 6,
      color: '#C0392B', icono: '🧠', disponible: true,
      fuente: 'SEP · MCCEMS Modelo Educativo 2025 · Pensamiento Filosófico y Humanidades II · 5 propósitos formativos'
    }
  };
  ENG.CONTENIDO = ENG.CONTENIDO || {};

  // ── Banco: convierte el contenido compacto en objetos listos para usar ──
  const Banco = {
    preguntas: {}, // id → pregunta
    temas: {}, // id → tema
    porMateria: {}, // materia → [temas]
    ocultas: new Set(), // preguntas que un maestro ocultó mientras se corrigen
    listo: false,
    init() {
      if (Banco.listo) return;
      for (const mid in ENG.CONTENIDO) {
        const cont = ENG.CONTENIDO[mid];
        Banco.porMateria[mid] = [];
        cont.temas.forEach((t, orden) => {
          const tema = Object.assign({}, t, { materia: mid, orden, preguntas: [] });
          (t.q || []).forEach((arr, i) => {
            const p = normalizar(tema, arr, i);
            if (p) {
              Banco.preguntas[p.id] = p;
              tema.preguntas.push(p);
            }
          });
          delete tema.q;
          tema._todas = tema.preguntas;
          Banco.temas[tema.id] = tema;
          Banco.porMateria[mid].push(tema);
        });
      }
      Banco.listo = true;
      Banco.refiltrar();
    },
    // tema.preguntas = todas las preguntas del tema menos las ocultas
    refiltrar() {
      Object.values(Banco.temas).forEach((t) => (t.preguntas = (t._todas || []).filter((p) => !Banco.ocultas.has(p.id))));
    },
    ponerOcultas(ids) {
      Banco.ocultas = new Set(ids || []);
      Banco.refiltrar();
    },
    visible: (pid) => !!Banco.preguntas[pid] && !Banco.ocultas.has(pid),
    temasDe(mid, sub) {
      return (Banco.porMateria[mid] || []).filter((t) => !sub || t.sub === sub);
    },
    preguntasDe(mid, sub) {
      return Banco.temasDe(mid, sub).flatMap((t) => t.preguntas);
    },
    temaDePregunta(pid) {
      return pid.slice(0, pid.lastIndexOf('-'));
    },
    // Preguntas que agregan los maestros desde la app (id: tema-x123)
    agregarExtra(lista) {
      Object.values(Banco.temas).forEach((t) => (t._todas = (t._todas || []).filter((p) => !p.extra)));
      Object.keys(Banco.preguntas).forEach((k) => Banco.preguntas[k].extra && delete Banco.preguntas[k]);
      (lista || []).forEach((x) => {
        const tema = Banco.temas[x.tema];
        if (!tema || !Array.isArray(x.datos)) return;
        try {
          const p = normalizar(tema, x.datos, 0, `${tema.id}-x${x.id}`);
          if (!p) return;
          p.extra = true;
          Banco.preguntas[p.id] = p;
          tema._todas.push(p);
        } catch (e) {}
      });
      Banco.refiltrar();
    }
  };

  function normalizar(tema, arr, i, idFijo) {
    const [tipo, q, data, resp, exp, extra0] = arr;
    const extra = extra0 || {};
    const id = idFijo || `${tema.id}-${String(i + 1).padStart(2, '0')}`;
    const p = { id, tema: tema.id, materia: tema.materia, tipo, q, exp: exp || '', nivel: extra.n || 1, audio: extra.audio || null, fig: extra.fig || null, ayuda: extra.ayuda || null };
    switch (tipo) {
      case 'om':
        p.ops = data;
        p.ok = resp;
        break;
      case 'vf':
        p.ok = !!resp;
        break;
      case 'co':
        p.r = Array.isArray(resp) ? resp : [resp];
        break;
      case 'or':
        p.partes = data;
        break;
      case 're':
        p.pares = data;
        break;
      case 'ha':
        p.r = String(resp);
        break;
      case 'nu':
        p.r = resp;
        p.u = (data && data.u) || '';
        p.tol = (data && data.tol) ?? 0.02;
        break;
      default:
        console.warn('Tipo de pregunta desconocido', tipo, id);
        return null;
    }
    return p;
  }
  ENG.Banco = Banco;
})();
