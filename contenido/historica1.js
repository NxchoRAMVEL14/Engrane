// ENGRANE · Conciencia Histórica I «Coordenadas de la Historia» (4° semestre)
// Fuente: SEP · MCC Modelo Educativo 2025 · Conciencia Histórica I — 4 propósitos formativos
// (pasado-presente-futuro; proceso histórico y causalidad; formular preguntas históricas; diversidad de discursos).
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.historica1 = {
    temas: [
      {
        id: 'h1t1', nombre: 'Pasado, presente y futuro: el tiempo histórico',
        proposito: 'Propósito 1 · Distingue historia y conciencia histórica, tiempo cronológico e histórico, espacio histórico, cambio y continuidad.',
        leccion: [
          { t: 'Historia y conciencia histórica', h: `<ul><li><b>Historia</b>: el estudio del pasado humano con base en fuentes.</li><li><b>Conciencia histórica</b>: darte cuenta de que <b>tu presente es resultado del pasado</b> y de que tus acciones construyen el futuro.</li></ul>
            <div class="ej"><p>¿Por qué Purísima y San Francisco del Rincón son zonas zapateras? Entenderlo te ayuda a ver tu lugar en esa historia.</p></div>` },
          { t: 'Dos formas de medir el tiempo', h: `<table><tr><th>Tiempo cronológico</th><th>Tiempo histórico</th></tr><tr><td>Se mide con calendario: días, años, siglos.</td><td>Se mide por <b>procesos</b>: duraciones, ritmos y cambios de una sociedad.</td></tr><tr><td>Ej.: 1810, siglo XIX</td><td>Ej.: «la Independencia», «la Revolución industrial»</td></tr></table>
            <p>Siglo XIX = años 1801–1900. Siglo XXI = 2001–2100. a. C. / d. C. (antes / después de Cristo, o antes/de la era común).</p>` },
          { t: 'Espacio, cambio y continuidad', h: `<ul><li><b>Espacio histórico</b>: el lugar donde ocurre un proceso, transformado por las personas.</li><li><b>Cambio</b>: lo que se transforma (del caballo al automóvil).</li><li><b>Continuidad</b>: lo que permanece (la tortilla, el español, fiestas patronales).</li><li>Duraciones: <b>corta</b> (acontecimientos), <b>media</b> (coyunturas), <b>larga</b> (estructuras).</li></ul>` }
        ],
        pares: [['Historia', 'Estudio del pasado con fuentes'], ['Conciencia histórica', 'Mi presente viene del pasado'], ['Tiempo cronológico', 'Calendario'], ['Tiempo histórico', 'Procesos y ritmos'], ['Cambio', 'Lo que se transforma'], ['Continuidad', 'Lo que permanece']],
        q: [
          ['om', 'La conciencia histórica es…', ['reconocer que el presente es resultado del pasado y que construimos el futuro', 'memorizar fechas', 'leer novelas', 'olvidar el pasado'], 0, 'Te ubica en el tiempo.'],
          ['om', 'El tiempo cronológico se mide con…', ['el calendario: días, años, siglos', 'procesos sociales', 'opiniones', 'el clima'], 0, 'Es lineal y medible.'],
          ['om', 'El tiempo histórico se refiere a…', ['los procesos, ritmos y duraciones de una sociedad', 'la hora del reloj', 'el horario escolar', 'el pronóstico'], 0, 'Ej.: la Revolución Mexicana como proceso.', { n: 2 }],
          ['om', 'El año 1810 pertenece al siglo…', ['XIX', 'XVIII', 'XX', 'XVII'], 0, 'Siglo XIX: 1801–1900.'],
          ['om', 'El año 2026 pertenece al siglo…', ['XXI', 'XX', 'XXII', 'XIX'], 0, 'Siglo XXI: 2001–2100.'],
          ['nu', '¿Cuántos años pasaron entre el inicio de la Independencia (1810) y el de la Revolución (1910)?', { u: 'años', tol: 0 }, 100, '1910 − 1810.'],
          ['nu', 'Si un hecho ocurrió en el año 500 a. C. y otro en el 500 d. C., ¿cuántos años los separan? (no hay año 0)', { u: 'años', tol: 0 }, 999, '500 + 500 − 1.', { n: 3 }],
          ['om', 'Que en México se siga comiendo tortilla de maíz desde tiempos prehispánicos es un ejemplo de…', ['continuidad', 'cambio', 'ruptura', 'revolución'], 0, 'Lo que permanece.'],
          ['om', 'Pasar de las cartas al WhatsApp es un ejemplo de…', ['cambio', 'continuidad', 'tiempo cronológico', 'espacio histórico'], 0, 'Transformación.'],
          ['om', 'Las estructuras de larga duración son…', ['rasgos que tardan siglos en cambiar, como la lengua o la religión', 'noticias del día', 'un partido de fútbol', 'una elección'], 0, 'Fernand Braudel propuso las duraciones.', { n: 3 }],
          ['vf', 'El espacio histórico es solo un punto en el mapa, sin relación con las personas.', null, false, 'Es el lugar transformado por la sociedad.', { n: 2 }],
          ['re', 'Relaciona:', [['Corta duración', 'Acontecimiento'], ['Media duración', 'Coyuntura'], ['Larga duración', 'Estructura']], null, 'Duraciones históricas.', { n: 2 }]
        ]
      },
      {
        id: 'h1t2', nombre: 'Proceso histórico y causalidad',
        proposito: 'Propósito 2 · Explica un proceso histórico, sus causas y consecuencias, y distingue hechos, acontecimientos y lo trascendental.',
        leccion: [
          { t: 'Proceso histórico', h: `<p>Conjunto de hechos relacionados que se desarrollan en el tiempo y transforman a una sociedad. Tiene <b>antecedentes</b>, <b>desarrollo</b> y <b>consecuencias</b>.</p>
            <ul><li><b>Hecho</b>: algo que ocurrió y se puede comprobar.</li><li><b>Acontecimiento</b>: un hecho que tiene <b>significado</b> para una comunidad.</li><li><b>Trascendental</b>: lo que tiene efectos duraderos en el tiempo.</li></ul>` },
          { t: 'Causalidad (multicausalidad)', h: `<p>Los procesos tienen <b>varias causas</b>: económicas, políticas, sociales, culturales, ambientales. Se distinguen causas <b>de fondo</b> (estructurales) y <b>detonantes</b> (inmediatas).</p>
            <div class="ej"><p>Revolución Mexicana (1910): de fondo, concentración de tierras y desigualdad, larga permanencia de Porfirio Díaz; detonante, la reelección de 1910 y el Plan de San Luis.</p></div>
            <div class="tip">Evita explicar todo con una sola causa o con el «gran héroe».</div>` }
        ],
        pares: [['Hecho', 'Algo comprobable que ocurrió'], ['Acontecimiento', 'Hecho con significado'], ['Causa de fondo', 'Estructural'], ['Detonante', 'Causa inmediata'], ['Multicausalidad', 'Varias causas'], ['Consecuencia', 'Efecto de un proceso']],
        q: [
          ['om', 'Un proceso histórico es…', ['un conjunto de hechos relacionados que transforman a una sociedad en el tiempo', 'una fecha aislada', 'un personaje famoso', 'un documento'], 0, 'Antecedentes, desarrollo y consecuencias.'],
          ['om', 'Un acontecimiento es…', ['un hecho que tiene significado para una comunidad', 'cualquier cosa que pasa', 'una opinión', 'una leyenda'], 0, 'Se vuelve relevante para un grupo.', { n: 2 }],
          ['om', 'La multicausalidad significa que…', ['un proceso tiene varias causas relacionadas', 'solo hay una causa', 'no hay causas', 'todo lo causa un héroe'], 0, 'Económicas, políticas, sociales…'],
          ['om', 'Una causa detonante es…', ['la que desencadena de inmediato el proceso', 'la más antigua', 'la que no importa', 'una consecuencia'], 0, 'La «chispa».', { n: 2 }],
          ['om', 'Una causa de fondo de la Revolución Mexicana fue…', ['la concentración de la tierra y la desigualdad', 'la invención del celular', 'la Segunda Guerra Mundial', 'la llegada de Colón'], 0, 'Estructural.', { n: 2 }],
          ['om', 'Una causa detonante de la Revolución Mexicana fue…', ['la reelección de Porfirio Díaz en 1910', 'la Conquista', 'el TLCAN', 'la Independencia'], 0, 'Madero llamó a levantarse con el Plan de San Luis.', { n: 3 }],
          ['or', 'Ordena las partes de un proceso histórico:', ['Antecedentes', 'Desarrollo', 'Consecuencias'], null, 'Estructura del proceso.'],
          ['vf', 'Explicar un proceso histórico solo por la acción de un héroe es suficiente.', null, false, 'Hay que considerar actores colectivos y varias causas.'],
          ['om', 'Algo es trascendental en la historia cuando…', ['tiene efectos duraderos', 'sale en las noticias', 'pasó ayer', 'es divertido'], 0, 'Se proyecta en el tiempo.'],
          ['re', 'Relaciona el tipo de causa:', [['Falta de empleo', 'Económica'], ['Cambio de gobierno', 'Política'], ['Sequía prolongada', 'Ambiental'], ['Nuevas ideas o creencias', 'Cultural']], null, 'Multicausalidad.'],
          ['om', 'La industria del calzado en el Rincón es un buen ejemplo para estudiar…', ['un proceso histórico local con causas y consecuencias', 'un hecho aislado', 'una leyenda', 'un mito'], 0, 'Historia regional.', { n: 2 }]
        ]
      },
      {
        id: 'h1t3', nombre: 'Formular preguntas históricas',
        proposito: 'Propósito 3 · Plantea preguntas de investigación: identifica el problema, lo delimita en el espacio y lo ubica en su contexto histórico.',
        leccion: [
          { t: 'De la curiosidad a la pregunta', h: `<ol><li><b>Identifica</b> el problema o tema que te interesa.</li><li><b>Delimita</b>: ¿dónde? (espacio) y ¿cuándo? (tiempo).</li><li><b>Contextualiza</b>: ¿qué pasaba en ese momento?</li><li><b>Formula</b> la pregunta.</li></ol>
            <div class="ej"><p>Tema amplio: «los zapatos». Pregunta delimitada: «¿Cómo cambió el trabajo en los talleres de calzado de Purísima del Rincón entre 1970 y 2000?»</p></div>` },
          { t: 'Buenas preguntas', h: `<ul><li>Abiertas: empiezan con <b>¿por qué?, ¿cómo?, ¿qué consecuencias…?</b></li><li>Evita preguntas de sí/no o que se contestan con un dato («¿En qué año…?»).</li><li>Fuentes: <b>primarias</b> (de la época: documentos, fotos, testimonios) y <b>secundarias</b> (estudios posteriores: libros, artículos).</li></ul>` }
        ],
        pares: [['Delimitar', 'Definir dónde y cuándo'], ['Contexto', 'Lo que pasaba en ese momento'], ['Fuente primaria', 'De la época'], ['Fuente secundaria', 'Estudio posterior'], ['Pregunta abierta', '¿Por qué? ¿Cómo?'], ['Testimonio oral', 'Entrevista a quien lo vivió']],
        q: [
          ['om', '¿Cuál es la mejor pregunta histórica?', ['¿Cómo cambió el trabajo en los talleres de calzado de Purísima entre 1970 y 2000?', '¿Te gustan los zapatos?', '¿En qué año se fundó el taller?', '¿Los zapatos son bonitos?'], 0, 'Abierta, delimitada en espacio y tiempo.'],
          ['om', 'Delimitar un tema significa…', ['definir el lugar y el periodo que vas a estudiar', 'hacerlo más grande', 'copiarlo de internet', 'elegir el título'], 0, 'Espacio y tiempo.'],
          ['om', 'Una fotografía de 1950 de tu colonia es una fuente…', ['primaria', 'secundaria', 'falsa', 'terciaria siempre'], 0, 'Es de la época.'],
          ['om', 'Un libro de historia escrito en 2020 sobre la Revolución es una fuente…', ['secundaria', 'primaria', 'oral', 'arqueológica'], 0, 'Estudio posterior.'],
          ['om', 'Entrevistar a tu abuelo sobre cómo era la ciudad en su juventud es…', ['un testimonio oral (fuente primaria)', 'una fuente secundaria', 'una leyenda', 'una opinión sin valor'], 0, 'Historia oral.', { n: 2 }],
          ['or', 'Ordena los pasos para formular una pregunta histórica:', ['Identificar el tema', 'Delimitar espacio y tiempo', 'Ubicar el contexto', 'Redactar la pregunta'], null, 'De lo general a lo particular.'],
          ['om', '¿Qué tipo de pregunta conviene evitar en una investigación?', ['Una que se responde con sí o no', 'Una que empieza con ¿por qué?', 'Una que pregunta consecuencias', 'Una delimitada'], 0, 'Limita el análisis.', { n: 2 }],
          ['vf', 'Contextualizar es ubicar el tema en lo que pasaba en esa época y lugar.', null, true, 'Economía, política, sociedad de ese momento.'],
          ['om', '«¿Por qué llegaron armadoras de autos al Bajío a partir de los años 2000?» es una pregunta…', ['causal y delimitada', 'de sí o no', 'sin tiempo', 'personal'], 0, 'Busca causas.', { n: 2 }],
          ['om', 'Para investigar la historia de tu escuela, una fuente primaria sería…', ['el acta de fundación o fotos de la época', 'un video de opinión reciente', 'una novela', 'un meme'], 0, 'Documentos originales.'],
          ['re', 'Relaciona:', [['Acta de nacimiento antigua', 'Fuente primaria'], ['Libro de texto actual', 'Fuente secundaria'], ['Entrevista a un fundador', 'Testimonio oral'], ['Vasija prehispánica', 'Fuente material']], null, 'Tipos de fuentes.', { n: 2 }]
        ]
      },
      {
        id: 'h1t4', nombre: 'Diversidad de discursos históricos',
        proposito: 'Propósito 4 · Describe, organiza y analiza datos y reconoce las intenciones de los distintos discursos sobre el pasado.',
        leccion: [
          { t: 'Un pasado, varios relatos', h: `<p>Un mismo hecho puede contarse de forma distinta según <b>quién</b> lo cuenta, <b>cuándo</b>, <b>para quién</b> y <b>con qué intención</b> (informar, justificar, conmemorar, criticar, convencer).</p>
            <div class="ej"><p>La Conquista contada por un cronista español del siglo XVI, por los códices indígenas o por un historiador actual: tres perspectivas.</p></div>` },
          { t: 'Analizar un discurso', h: `<ol><li><b>Describe</b> los datos: qué dice, quién, cuándo.</li><li><b>Organiza</b>: líneas del tiempo, tablas, mapas.</li><li><b>Analiza</b>: compara fuentes, detecta hechos y opiniones, identifica la intención.</li><li><b>Concluye</b> con argumentos y cita tus fuentes.</li></ol>
            <ul><li><b>Hecho</b>: se puede comprobar. <b>Opinión</b>: es una valoración.</li><li>Ejemplos de discursos: monumentos, discursos oficiales, libros de texto, películas, corridos, redes sociales.</li></ul>` }
        ],
        pares: [['Perspectiva', 'Punto de vista'], ['Intención', 'Para qué se cuenta'], ['Hecho', 'Se comprueba'], ['Opinión', 'Es una valoración'], ['Línea del tiempo', 'Organiza datos'], ['Conmemorar', 'Recordar con honores']],
        q: [
          ['om', '¿Por qué un mismo hecho histórico se cuenta de formas distintas?', ['Por la perspectiva, la época y la intención de quien lo cuenta', 'Porque nadie sabe nada', 'Porque los hechos cambian solos', 'Porque los libros se equivocan siempre'], 0, 'Diversidad de discursos.'],
          ['om', '¿Cuál es una OPINIÓN?', ['«Fue el mejor presidente de la historia»', '«Miguel Hidalgo nació en 1753»', '«La Constitución se promulgó en 1917»', '«Guanajuato es un estado de México»'], 0, 'Es una valoración.'],
          ['om', '¿Cuál es un HECHO?', ['«La Constitución vigente se promulgó en 1917»', '«La Revolución fue lo más triste»', '«Ese héroe era el más valiente»', '«Antes se vivía mejor»'], 0, 'Se puede comprobar con fuentes.'],
          ['om', 'Un monumento a un héroe tiene normalmente la intención de…', ['conmemorar y construir identidad', 'vender', 'informar el clima', 'criticar al héroe'], 0, 'Discurso conmemorativo.', { n: 2 }],
          ['om', 'Para organizar datos de un proceso histórico es útil…', ['una línea del tiempo', 'una receta', 'un meme', 'un horóscopo'], 0, 'Ubica la secuencia y duración.'],
          ['or', 'Ordena el análisis de un discurso histórico:', ['Describir los datos', 'Organizarlos', 'Analizar e identificar intenciones', 'Concluir con argumentos'], null, 'Del dato a la interpretación.'],
          ['om', 'La Conquista contada en códices indígenas y en crónicas españolas muestra…', ['perspectivas distintas de un mismo proceso', 'que uno de los dos inventó todo', 'que no hubo Conquista', 'el mismo punto de vista'], 0, 'Contrastar fuentes.', { n: 2 }],
          ['vf', 'Un video en redes sociales sobre historia siempre es una fuente confiable.', null, false, 'Hay que verificar autor, fuentes e intención.'],
          ['om', 'Al leer una fuente histórica conviene preguntarse…', ['¿quién la escribió, cuándo y para qué?', '¿cuántas páginas tiene?', '¿de qué color es?', 'nada'], 0, 'Crítica de fuentes.'],
          ['om', 'Un corrido sobre la Revolución es un discurso…', ['popular, con una perspectiva propia', 'científico', 'neutral siempre', 'falso siempre'], 0, 'Expresa la visión de un grupo.', { n: 3 }],
          ['re', 'Relaciona el discurso con su intención típica:', [['Monumento', 'Conmemorar'], ['Artículo académico', 'Explicar con evidencias'], ['Propaganda', 'Convencer'], ['Caricatura política', 'Criticar']], null, 'Intenciones.', { n: 2 }]
        ]
      }
    ]
  };
})();
