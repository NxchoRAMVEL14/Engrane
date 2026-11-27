// ENGRANE · Ciencias Sociales III «Las dinámicas de la realidad actual: la condición estudiantil al centro» (4° semestre)
// Fuente: SEP · MCC Modelo Educativo 2025 · Ciencias Sociales III — 3 propósitos formativos
// (políticas públicas y desigualdad; actores sociales y acontecimientos recientes; juventudes, derechos y participación).
// Los temas sensibles se tratan de forma informativa y neutral.
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.sociales3 = {
    temas: [
      {
        id: 's3t1', nombre: 'Políticas públicas, bienestar y desigualdad',
        proposito: 'Propósito 1 · Analiza cómo las políticas públicas influyen en la calidad de vida, el bienestar y la movilidad social de las juventudes.',
        leccion: [
          { t: 'Conceptos base', h: `<ul><li><b>Política pública</b>: acciones del gobierno para atender un problema público (becas, vacunación, transporte, seguridad).</li><li><b>Calidad de vida</b>: condiciones materiales (vivienda, ingreso, servicios) y no materiales (salud, educación, tiempo libre, seguridad).</li><li><b>Desigualdad</b>: diferencias en acceso a recursos y oportunidades entre personas o regiones.</li><li><b>Movilidad social</b>: posibilidad de mejorar tu situación respecto a la de tu familia de origen.</li></ul>` },
          { t: 'Problemas multidimensionales', h: `<p>La pobreza en México se mide de forma <b>multidimensional</b>: además del ingreso, considera carencias en educación, salud, seguridad social, vivienda, servicios básicos y alimentación.</p>
            <p>El ciclo de una política pública: <b>identificar el problema → diseñar → implementar → evaluar</b>.</p>
            <div class="tip">Tu papel: informarte, usar bien los apoyos, proponer soluciones y participar (consultas, comités escolares, proyectos comunitarios).</div>` }
        ],
        pares: [['Política pública', 'Acción del gobierno ante un problema'], ['Movilidad social', 'Mejorar respecto a tu origen'], ['Pobreza multidimensional', 'Ingreso y carencias'], ['Desigualdad', 'Diferencias de oportunidades'], ['Evaluar', 'Medir si funcionó'], ['Bienestar', 'Calidad de vida']],
        q: [
          ['om', 'Una política pública es…', ['una acción del gobierno para atender un problema público', 'una opinión personal', 'un partido político', 'una empresa privada'], 0, 'Ejemplos: becas, vacunación, transporte.'],
          ['om', '¿Cuál es un ejemplo de política pública?', ['Un programa de becas para estudiantes', 'Una fiesta familiar', 'Una red social', 'Una marca de ropa'], 0, 'Lo diseña e implementa el gobierno.'],
          ['om', 'La movilidad social es…', ['la posibilidad de mejorar tu situación respecto a tu familia de origen', 'mudarse de ciudad', 'usar transporte público', 'cambiar de escuela'], 0, 'Movilidad económica y educativa.'],
          ['om', 'Medir la pobreza de forma multidimensional significa…', ['considerar ingreso y carencias como salud, educación y vivienda', 'contar solo el dinero', 'contar solo a quien no trabaja', 'medir el tamaño de la familia'], 0, 'Varios aspectos a la vez.', { n: 2 }],
          ['or', 'Ordena el ciclo de una política pública:', ['Identificar el problema', 'Diseñar la política', 'Implementarla', 'Evaluar sus resultados'], null, 'Y con la evaluación se corrige.'],
          ['om', '¿Qué aspecto NO es material en la calidad de vida?', ['El tiempo libre y la convivencia', 'La vivienda', 'El ingreso', 'El agua potable'], 0, 'También salud emocional y seguridad.', { n: 2 }],
          ['vf', 'La desigualdad solo se refiere a diferencias de dinero.', null, false, 'También de acceso a educación, salud, servicios y oportunidades.'],
          ['om', 'Un problema multidimensional es aquel que…', ['tiene varias causas y efectos relacionados', 'solo afecta a una persona', 'se resuelve con una sola acción', 'no tiene solución'], 0, 'Ejemplo: el abandono escolar.', { n: 2 }],
          ['om', '¿Qué acción de un estudiante contribuye a una política pública?', ['Proponer y participar en un proyecto escolar o comunitario', 'Ignorar los problemas', 'Difundir rumores', 'Dejar los estudios'], 0, 'Participación responsable.'],
          ['om', 'Evaluar una política pública sirve para…', ['saber si cumplió su objetivo y mejorarla', 'castigar a los ciudadanos', 'cobrar impuestos', 'cerrarla siempre'], 0, 'Se miden resultados.'],
          ['re', 'Relaciona:', [['Beca escolar', 'Educación'], ['Campaña de vacunación', 'Salud'], ['Alumbrado público', 'Seguridad y servicios'], ['Transporte escolar', 'Movilidad']], null, 'Política y ámbito que atiende.']
        ]
      },
      {
        id: 's3t2', nombre: 'Actores sociales y el mundo actual',
        proposito: 'Propósito 2 · Identifica actores sociales y acontecimientos recientes: conflictos, organismos internacionales y el papel de México.',
        leccion: [
          { t: 'Actores sociales', h: `<p>Personas, grupos o instituciones que influyen en la vida pública: <b>gobiernos</b>, <b>organismos internacionales</b>, <b>empresas</b>, <b>organizaciones de la sociedad civil</b>, <b>medios de comunicación</b>, <b>movimientos sociales</b> y la <b>ciudadanía</b>.</p>` },
          { t: 'Organismos internacionales', h: `<table><tr><th>Organismo</th><th>Para qué</th></tr><tr><td>ONU (1945)</td><td>Paz, seguridad y derechos humanos; México es miembro fundador</td></tr><tr><td>OMS</td><td>Salud mundial</td></tr><tr><td>UNESCO</td><td>Educación, ciencia y cultura</td></tr><tr><td>OIT</td><td>Trabajo digno</td></tr><tr><td>UNICEF</td><td>Niñez y adolescencia</td></tr><tr><td>OEA</td><td>Cooperación en el continente americano</td></tr></table>
            <p>La política exterior mexicana tiene principios en el <b>artículo 89</b> de la Constitución: no intervención, autodeterminación de los pueblos, solución pacífica de controversias, cooperación internacional.</p>` },
          { t: 'Globalización', h: `<p>Interconexión económica, cultural y tecnológica entre países: comercio (tratado T-MEC con EE. UU. y Canadá), redes sociales, migración. Trae oportunidades (empleo en la industria del Bajío) y retos (desigualdad, delincuencia transnacional).</p>` }
        ],
        pares: [['ONU', 'Paz y derechos humanos'], ['OMS', 'Salud mundial'], ['UNESCO', 'Educación y cultura'], ['OIT', 'Trabajo digno'], ['T-MEC', 'México, EE. UU. y Canadá'], ['Artículo 89', 'Política exterior']],
        q: [
          ['om', '¿Qué organismo internacional se encarga de la salud mundial?', ['OMS', 'OIT', 'UNESCO', 'OEA'], 0, 'Organización Mundial de la Salud.'],
          ['om', '¿En qué año se fundó la ONU?', ['1945', '1910', '1968', '2000'], 0, 'Al terminar la Segunda Guerra Mundial.'],
          ['om', 'La OIT se ocupa de…', ['el trabajo digno', 'el deporte', 'el petróleo', 'el espacio exterior'], 0, 'Organización Internacional del Trabajo.'],
          ['om', 'El T-MEC es un tratado comercial entre…', ['México, Estados Unidos y Canadá', 'México y España', 'los países de Sudamérica', 'México y China'], 0, 'Sustituyó al TLCAN en 2020.'],
          ['om', '¿Cuál es un principio de la política exterior de México?', ['No intervención', 'Intervención militar', 'Aislamiento total', 'Dominio comercial'], 0, 'Artículo 89 constitucional.', { n: 2 }],
          ['om', 'Una organización de la sociedad civil es…', ['un grupo de ciudadanos organizados sin ser gobierno ni empresa', 'una secretaría de Estado', 'un banco', 'un partido en el poder'], 0, 'Asociaciones, fundaciones, colectivos.', { n: 2 }],
          ['om', 'La globalización es…', ['la interconexión económica, cultural y tecnológica entre países', 'la separación de los países', 'un tipo de gobierno', 'un deporte'], 0, 'Comercio, redes y migración.'],
          ['vf', 'México fue uno de los países fundadores de la ONU.', null, true, 'Firmó la Carta de San Francisco en 1945.', { n: 2 }],
          ['om', 'La UNESCO se ocupa de…', ['educación, ciencia y cultura', 'la guerra', 'el comercio de armas', 'la policía'], 0, 'Declara Patrimonio de la Humanidad, como Guanajuato capital.'],
          ['om', 'Para informarte sobre un conflicto internacional, lo más confiable es…', ['comparar varias fuentes serias y verificar los datos', 'creer el primer video que veas', 'leer solo comentarios', 'compartir sin leer'], 0, 'Pensamiento crítico.'],
          ['re', 'Relaciona el actor social:', [['Gobierno', 'Diseña políticas públicas'], ['Medios de comunicación', 'Informan a la población'], ['Movimiento social', 'Exige cambios'], ['Organismo internacional', 'Coopera entre países']], null, 'Actores sociales.']
        ]
      },
      {
        id: 's3t3', nombre: 'Migración, discriminación y movilizaciones',
        proposito: 'Propósito 2 · Analiza procesos actuales como la migración, las movilizaciones sociales y la discriminación desde varias perspectivas.',
        leccion: [
          { t: 'Migración', h: `<ul><li><b>Emigrante</b>: sale de su país. <b>Inmigrante</b>: llega a otro país. <b>Migración interna</b>: dentro del mismo país.</li><li>Causas: económicas (empleo), familiares, violencia, desastres, estudio.</li><li>México es país de <b>origen, tránsito, destino y retorno</b>. Guanajuato es de las entidades con más migración histórica a EE. UU.</li><li><b>Remesas</b>: dinero que envían los migrantes a sus familias.</li></ul>` },
          { t: 'Discriminación y participación', h: `<ul><li><b>Discriminación</b>: trato desigual por origen, género, color de piel, religión, discapacidad, preferencia, condición social… La prohíbe el <b>artículo 1°</b> de la Constitución.</li><li><b>Xenofobia</b>: rechazo a personas extranjeras.</li><li><b>Movilización social</b>: acción colectiva y pacífica para exigir derechos (marchas, peticiones, campañas). Es parte de la libertad de expresión y reunión (artículos 6 y 9).</li></ul>` }
        ],
        pares: [['Emigrante', 'Sale de su país'], ['Inmigrante', 'Llega a otro país'], ['Remesas', 'Dinero enviado a la familia'], ['Xenofobia', 'Rechazo a extranjeros'], ['Artículo 1°', 'Prohíbe la discriminación'], ['Migración interna', 'Dentro del mismo país']],
        q: [
          ['om', 'Una persona que sale de México para vivir en otro país es…', ['emigrante', 'inmigrante', 'turista', 'refugiada siempre'], 0, 'Para México es emigrante; para el otro país, inmigrante.'],
          ['om', 'Las remesas son…', ['dinero que envían los migrantes a sus familias', 'impuestos', 'préstamos del banco', 'becas escolares'], 0, 'Importantes para la economía de muchas familias.'],
          ['om', 'Una persona se muda de Oaxaca a León por trabajo. Es migración…', ['interna', 'internacional', 'de retorno', 'forzada por guerra'], 0, 'Dentro del mismo país.'],
          ['om', 'La xenofobia es…', ['el rechazo a personas extranjeras', 'el miedo a las alturas', 'el amor por otros países', 'un tipo de migración'], 0, 'Forma de discriminación.'],
          ['om', '¿Qué artículo de la Constitución prohíbe la discriminación?', ['Artículo 1°', 'Artículo 27', 'Artículo 130', 'Artículo 89'], 0, 'Derechos humanos y no discriminación.', { n: 2 }],
          ['om', 'México es, respecto a la migración, un país de…', ['origen, tránsito, destino y retorno', 'solo destino', 'solo origen', 'ningún tipo'], 0, 'Las cuatro dimensiones.', { n: 2 }],
          ['om', '¿Cuál es una causa económica de la migración?', ['Buscar empleo mejor pagado', 'Un huracán', 'Un conflicto armado', 'Un matrimonio'], 0, 'Las otras son ambientales, de violencia o familiares.'],
          ['vf', 'La libertad de reunión pacífica está reconocida en la Constitución mexicana.', null, true, 'Artículo 9.', { n: 2 }],
          ['om', 'Ejemplo de discriminación en la escuela:', ['Burlarse de un compañero por su forma de hablar o su origen', 'Pedir la palabra', 'Hacer equipo con todos', 'Ayudar a un compañero'], 0, 'Trato desigual que lastima derechos.'],
          ['om', 'Una movilización social es…', ['una acción colectiva para exigir derechos o cambios', 'un viaje familiar', 'un concierto', 'un programa de TV'], 0, 'Marchas, peticiones, campañas.'],
          ['re', 'Relaciona la causa de migración:', [['Falta de empleo', 'Económica'], ['Inundación', 'Ambiental'], ['Reunirse con la familia', 'Familiar'], ['Estudiar en otra ciudad', 'Educativa']], null, 'Tipos de causas.']
        ]
      },
      {
        id: 's3t4', nombre: 'Juventudes: identidad, redes y brecha digital',
        proposito: 'Propósito 3 · Reflexiona sobre las culturas juveniles, la diversidad y el uso de las redes sociales y la brecha digital.',
        leccion: [
          { t: 'Juventudes en plural', h: `<p>No hay una sola juventud: cambia según la región, la cultura, el género, la escuela o el trabajo. Las <b>identidades</b> se construyen con la familia, los amigos, la música, el deporte, las redes y la comunidad.</p>
            <p>La <b>diversidad</b> (cultural, sexo-genérica, de capacidades) se respeta: todas las personas tienen los mismos derechos.</p>` },
          { t: 'Redes sociales y brecha digital', h: `<ul><li>Ventajas: aprender, informarse, organizarse, emprender.</li><li>Riesgos: desinformación, ciberacoso, adicción, exposición de datos personales.</li><li><b>Brecha digital</b>: diferencia entre quienes tienen acceso, habilidades y buen uso de internet y quienes no (por ingreso, zona rural/urbana, edad).</li></ul>
            <div class="tip">Antes de compartir: ¿quién lo publica?, ¿de cuándo es?, ¿otras fuentes lo confirman?</div>` }
        ],
        pares: [['Brecha digital', 'Desigual acceso a internet'], ['Ciberacoso', 'Acoso por medios digitales'], ['Desinformación', 'Información falsa'], ['Identidad', 'Lo que te define'], ['Diversidad', 'Variedad de formas de ser'], ['Datos personales', 'Información que te identifica']],
        q: [
          ['om', 'La brecha digital es…', ['la diferencia en acceso y uso de internet entre grupos de personas', 'un tipo de virus', 'una red social', 'el tiempo frente a la pantalla'], 0, 'Por ingreso, zona o edad.'],
          ['om', '¿Qué es el ciberacoso?', ['Molestar, amenazar o exhibir a alguien por medios digitales', 'Usar mucho el celular', 'Jugar en línea', 'Mandar tareas por correo'], 0, 'Se puede denunciar.'],
          ['om', 'Antes de compartir una noticia conviene…', ['verificar la fuente, la fecha y otras fuentes', 'compartirla rápido', 'agregarle un comentario', 'cambiarle el título'], 0, 'Combate la desinformación.'],
          ['om', 'Decir «existen juventudes» en plural significa que…', ['hay muchas formas de ser joven según el contexto', 'todos los jóvenes son iguales', 'solo hay jóvenes en la ciudad', 'la juventud no existe'], 0, 'Diversidad de experiencias.', { n: 2 }],
          ['om', 'Un riesgo de publicar tu dirección y horarios en redes es…', ['que personas desconocidas sepan dónde encontrarte', 'tener más seguidores', 'ninguno', 'que se gaste la batería'], 0, 'Protege tus datos personales.'],
          ['vf', 'La brecha digital puede ser mayor en zonas rurales que en urbanas.', null, true, 'Por infraestructura y costos.'],
          ['om', '¿Qué es una ventaja de las redes sociales para los jóvenes?', ['Aprender y organizarse con otros', 'Difundir rumores', 'Exhibir a compañeros', 'Desvelarse'], 0, 'Uso responsable.'],
          ['om', 'Si ves que alguien sufre ciberacoso, lo mejor es…', ['no compartir, apoyarlo y avisar a un adulto de confianza', 'reírte', 'reenviar la publicación', 'ignorarlo siempre'], 0, 'Ser aliado.', { n: 2 }],
          ['om', 'Respetar la diversidad significa…', ['reconocer que todas las personas tienen los mismos derechos', 'que todos piensen igual', 'evitar a quien es diferente', 'imponer tus gustos'], 0, 'Base de la convivencia.'],
          ['om', 'Una noticia falsa diseñada para engañar se llama…', ['desinformación (fake news)', 'reportaje', 'editorial', 'entrevista'], 0, 'Verifica antes de creer.', { n: 2 }],
          ['re', 'Relaciona:', [['Ciberacoso', 'Acoso digital'], ['Brecha digital', 'Acceso desigual'], ['Fake news', 'Noticia falsa'], ['Huella digital', 'Rastro que dejas en internet']], null, 'Vocabulario digital.']
        ]
      },
      {
        id: 's3t5', nombre: 'Derechos de las juventudes y participación',
        proposito: 'Propósito 3 · Conoce los derechos a la salud, la educación y el trabajo digno, la estructura del gobierno y las formas de participación.',
        leccion: [
          { t: 'Tus derechos en la Constitución', h: `<table><tr><th>Derecho</th><th>Artículo</th></tr><tr><td>Educación (incluye la media superior obligatoria)</td><td>3°</td></tr><tr><td>Salud, medio ambiente sano, vivienda</td><td>4°</td></tr><tr><td>Libertad de expresión</td><td>6°</td></tr><tr><td>Trabajo digno; prohíbe el trabajo de menores de 15 años</td><td>123</td></tr></table>
            <p>A los <b>18 años</b> eres <b>ciudadano</b> (artículo 34): puedes votar y ser votado (con requisitos de edad para cada cargo).</p>` },
          { t: 'Cómo está organizado el gobierno', h: `<ul><li>Tres <b>poderes</b>: <b>Ejecutivo</b> (Presidencia), <b>Legislativo</b> (Congreso: Cámara de Diputados y Senado), <b>Judicial</b> (Suprema Corte y tribunales).</li><li>Tres <b>órdenes</b>: federal, estatal y municipal (el más cercano: el ayuntamiento).</li><li>Formas de participar: votar, consultas, presupuesto participativo, comités vecinales, consejos escolares, voluntariado, peticiones.</li></ul>` }
        ],
        pares: [['Artículo 3°', 'Educación'], ['Artículo 4°', 'Salud'], ['Artículo 123', 'Trabajo'], ['18 años', 'Ciudadanía'], ['Legislativo', 'Hace las leyes'], ['Ayuntamiento', 'Gobierno municipal']],
        q: [
          ['om', '¿Qué artículo de la Constitución establece el derecho a la educación?', ['3°', '27', '123', '89'], 0, 'Incluye la educación media superior obligatoria.'],
          ['om', 'El derecho al trabajo digno está en el artículo…', ['123', '3°', '6°', '1°'], 0, 'También regula jornada y salario.'],
          ['nu', '¿A qué edad se adquiere la ciudadanía en México?', { u: 'años', tol: 0 }, 18, 'Artículo 34.'],
          ['nu', 'Según el artículo 123, ¿por debajo de qué edad está prohibido trabajar?', { u: 'años', tol: 0 }, 15, 'Menores de 15 años.', { n: 2 }],
          ['om', '¿Qué poder hace las leyes?', ['Legislativo', 'Ejecutivo', 'Judicial', 'Municipal'], 0, 'El Congreso de la Unión.'],
          ['om', '¿Qué poder aplica e interpreta las leyes y resuelve conflictos?', ['Judicial', 'Legislativo', 'Ejecutivo', 'Electoral'], 0, 'Suprema Corte y tribunales.'],
          ['om', 'El Congreso de la Unión se forma por…', ['la Cámara de Diputados y el Senado', 'la Presidencia y la Corte', 'los gobernadores', 'los municipios'], 0, 'Poder Legislativo.', { n: 2 }],
          ['om', 'El orden de gobierno más cercano a tu comunidad es…', ['el municipal (ayuntamiento)', 'el federal', 'el internacional', 'el estatal'], 0, 'Presidencia municipal y cabildo.'],
          ['om', '¿Cuál es una forma de participación juvenil?', ['Formar parte de un comité escolar o proyecto comunitario', 'Ignorar los problemas', 'Rayar las paredes', 'No informarse'], 0, 'Participación responsable.'],
          ['vf', 'La educación media superior es obligatoria en México.', null, true, 'Desde la reforma de 2012 al artículo 3°.', { n: 2 }],
          ['re', 'Relaciona el poder con quien lo ejerce:', [['Ejecutivo', 'Presidencia de la República'], ['Legislativo', 'Congreso de la Unión'], ['Judicial', 'Suprema Corte de Justicia']], null, 'División de poderes.'],
          ['om', 'El derecho a la salud está en el artículo…', ['4°', '123', '27', '130'], 0, 'También vivienda y medio ambiente sano.', { n: 2 }]
        ]
      }
    ]
  };
})();
