// ENGRANE · Pensamiento Filosófico y Humanidades II «Las reflexiones filosóficas sobre el Conocer»
// Fuente: SEP · MCCEMS Modelo Educativo 2025 · PFyH II · 5 propósitos formativos (Ser, existencia y
// conocimiento; fundamentos éticos; desafíos éticos de ciencia y tecnología / bioética; desigualdades de
// género y perspectivas feministas; integración y praxis transformadora).
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.filosofico2 = {
    temas: [
      {
        id: 'f2t1', nombre: 'Ser, existencia y conocimiento',
        proposito: 'Propósito 1 · Cuestiona y reflexiona sobre los fundamentos del Ser, con pensamiento crítico sobre Existencia, Ser y Conocimiento (análisis filosófico-ontológico).',
        leccion: [
          { t: 'Del asombro al logos', h: `<p>Para Platón y Aristóteles, la filosofía nace del <b>asombro</b>: preguntarse por lo que parece obvio.</p>
            <p>Los primeros filósofos griegos pasaron del <b>mito</b> (explicar con dioses y relatos) al <b>logos</b> (explicar con razones). Tales de Mileto propuso que el principio (<i>arjé</i>) de todo era el <b>agua</b>.</p>` },
          { t: 'Preguntar por el Ser', h: `<p>La <b>ontología</b> estudia el ser: ¿qué es lo que existe?</p>
            <ul><li><b>Parménides</b>: el ser es uno e inmutable; el cambio es apariencia.</li><li><b>Heráclito</b>: todo fluye; la realidad es <b>devenir</b> (cambio).</li><li><b>Platón</b>, alegoría de la caverna: confundimos sombras (apariencias) con la realidad.</li><li><b>Sartre</b> (existencialismo): «la existencia precede a la esencia»: primero existimos y luego nos definimos con nuestras decisiones.</li></ul>` },
          { t: '¿Cómo conocemos?', h: `<p>La <b>epistemología</b> estudia el conocimiento.</p><table><tr><th>Corriente</th><th>Idea</th><th>Autor</th></tr><tr><td>Racionalismo</td><td>La razón es la fuente segura</td><td>Descartes: «pienso, luego existo»</td></tr><tr><td>Empirismo</td><td>Todo viene de la experiencia; la mente es una «tabla rasa»</td><td>Locke, Hume</td></tr><tr><td>Escepticismo</td><td>Dudar de que podamos conocer con certeza</td><td>Pirrón</td></tr><tr><td>Criticismo</td><td>Une razón y experiencia, y examina sus límites</td><td>Kant</td></tr></table>` }
        ],
        pares: [['Ontología', 'Estudio del ser'], ['Epistemología', 'Estudio del conocimiento'], ['Heráclito', 'Todo fluye'], ['Parménides', 'El ser es inmutable'], ['Descartes', 'Pienso, luego existo'], ['Empirismo', 'Conocer por experiencia'], ['Mito', 'Explicación con relatos']],
        q: [
          ['om', '¿Qué rama de la filosofía estudia el ser y lo que existe?', ['Ontología', 'Ética', 'Lógica', 'Estética'], 0, 'Onto = ser.'],
          ['om', '¿Qué rama estudia el conocimiento: su origen, alcance y límites?', ['Epistemología', 'Ontología', 'Política', 'Estética'], 0, 'Episteme = conocimiento.'],
          ['om', 'Según Platón y Aristóteles, la filosofía comienza con…', ['el asombro', 'el miedo', 'la riqueza', 'la religión'], 0, 'Preguntar por lo que parece obvio.'],
          ['om', 'Pasar del mito al logos significa…', ['explicar la realidad con razones y no solo con relatos de dioses', 'dejar de pensar', 'creer en todos los mitos', 'estudiar solo matemáticas'], 0, 'Logos = razón, discurso.'],
          ['om', '«Todo fluye; nadie se baña dos veces en el mismo río.» ¿Qué filósofo defendía el devenir?', ['Heráclito', 'Parménides', 'Descartes', 'Locke'], 0, 'La realidad es cambio.'],
          ['om', '«Pienso, luego existo» es de…', ['Descartes', 'Sartre', 'Hume', 'Tales'], 0, 'Racionalismo, siglo XVII.'],
          ['om', 'Para el empirismo, el conocimiento proviene…', ['de la experiencia de los sentidos', 'solo de la razón', 'de los sueños', 'de la autoridad'], 0, 'La mente es una «tabla rasa».'],
          ['om', 'En la alegoría de la caverna, las sombras representan…', ['las apariencias que confundimos con la realidad', 'la verdad absoluta', 'a los filósofos', 'la luz del sol'], 0, 'Salir de la caverna es buscar el conocimiento verdadero.', { n: 2 }],
          ['om', '«La existencia precede a la esencia» (Sartre) significa que…', ['primero existimos y después nos definimos con lo que elegimos', 'nacemos con un destino fijo', 'la esencia es más importante', 'no existimos'], 0, 'Existencialismo: somos responsables de quiénes llegamos a ser.', { n: 2 }],
          ['om', 'Tales de Mileto propuso que el principio (arjé) de todas las cosas era…', ['el agua', 'el fuego', 'los números', 'el aire'], 0, 'Primer filósofo según la tradición.'],
          ['re', 'Relaciona la corriente con su idea:', [['Racionalismo', 'La razón es la fuente segura'], ['Empirismo', 'Todo viene de la experiencia'], ['Escepticismo', 'Duda de la certeza'], ['Criticismo', 'Examina los límites de la razón']], null, 'Teorías del conocimiento.', { n: 2 }],
          ['vf', 'Reconocer los límites de lo que podemos conocer también es parte del pensamiento filosófico.', null, true, 'Kant y los escépticos lo exploraron.']
        ]
      },
      {
        id: 'f2t2', nombre: 'Fundamentos éticos y dilemas morales',
        proposito: 'Propósito 2 · Comprende los fundamentos éticos y su aplicación en la vida cotidiana, reflexionando críticamente sobre dilemas morales.',
        leccion: [
          { t: 'Ética y moral', h: `<ul><li><b>Moral</b>: normas, costumbres y valores que un grupo considera correctos.</li><li><b>Ética</b>: reflexión filosófica que examina y justifica esas normas.</li></ul>
            <p>Un <b>dilema moral</b> es una situación en la que hay que elegir entre dos opciones que chocan con valores importantes.</p>` },
          { t: 'Tres grandes teorías', h: `<table><tr><th>Teoría</th><th>¿Qué hace correcta una acción?</th><th>Autor</th></tr>
            <tr><td>Ética de las virtudes</td><td>Actuar con virtud (término medio) para vivir bien (eudaimonía)</td><td>Aristóteles</td></tr>
            <tr><td>Deontología</td><td>Cumplir el deber; obrar de modo que tu regla pueda ser ley universal; tratar a las personas siempre como fin</td><td>Kant</td></tr>
            <tr><td>Utilitarismo</td><td>Las consecuencias: la mayor felicidad para el mayor número</td><td>Bentham, Mill</td></tr></table>` },
          { t: 'Libertad y responsabilidad', h: `<ul><li><b>Autonomía</b>: darse a uno mismo las normas con la razón. <b>Heteronomía</b>: seguir normas impuestas desde fuera (miedo, premio, presión).</li><li>Sin libertad no hay responsabilidad: responder por lo que elegimos.</li></ul><div class="ej"><p>Dilema: tu mejor amigo copió en el examen y el maestro pregunta quién fue. ¿Lealtad o honestidad?</p></div>` }
        ],
        pares: [['Moral', 'Normas de un grupo'], ['Ética', 'Reflexión sobre la moral'], ['Kant', 'Deber e imperativo'], ['Utilitarismo', 'Mayor felicidad'], ['Aristóteles', 'Virtud y término medio'], ['Autonomía', 'Normas propias por razón']],
        q: [
          ['om', 'La ética es…', ['la reflexión filosófica sobre la moral', 'un reglamento escolar', 'una ley del gobierno', 'una costumbre familiar'], 0, 'La moral son las normas; la ética las examina.'],
          ['om', 'Según el utilitarismo, una acción es buena si…', ['produce la mayor felicidad para el mayor número', 'cumple el deber sin importar consecuencias', 'la ordena una autoridad', 'beneficia solo a quien la hace'], 0, 'Bentham y Mill.'],
          ['om', 'Para Kant, actuar moralmente es…', ['cumplir el deber por respeto a una regla que pueda ser universal', 'buscar el placer', 'obedecer por miedo', 'seguir la moda'], 0, 'Deontología: ética del deber.'],
          ['om', 'Para Aristóteles, la virtud está en…', ['el término medio entre dos extremos', 'el exceso', 'la riqueza', 'evitar pensar'], 0, 'Valentía: entre cobardía y temeridad.'],
          ['om', 'Un dilema moral es…', ['una situación en la que hay que elegir entre opciones que chocan con valores importantes', 'un problema de matemáticas', 'una pregunta sin importancia', 'una regla escrita'], 0, 'Ninguna opción es «gratis».'],
          ['om', 'Si alguien no copia en el examen solo porque teme que lo descubran, actúa con…', ['heteronomía', 'autonomía', 'eudaimonía', 'empirismo'], 0, 'La norma viene de fuera (miedo al castigo).', { n: 2 }],
          ['om', '«Trata a las personas siempre como un fin y nunca solo como un medio» corresponde a…', ['Kant', 'Bentham', 'Tales', 'Heráclito'], 0, 'Formulación del imperativo categórico.', { n: 2 }],
          ['re', 'Relaciona la teoría con su criterio:', [['Ética de virtudes', 'Carácter virtuoso'], ['Deontología', 'Deber'], ['Utilitarismo', 'Consecuencias'], ['Heteronomía', 'Norma impuesta desde fuera']], null, 'Teorías éticas.'],
          ['vf', 'Sin libertad para elegir no podemos hablar de responsabilidad moral.', null, true, 'Respondemos por lo que elegimos.'],
          ['om', 'Un utilitarista, ante el dilema de decir una verdad que dañaría a muchos, se fijaría sobre todo en…', ['las consecuencias para todas las personas afectadas', 'la regla sin excepción', 'lo que diga la mayoría en redes', 'su propio beneficio'], 0, 'Evalúa resultados.', { n: 3 }],
          ['om', 'La moral, a diferencia de la ética, se refiere a…', ['las normas y costumbres que un grupo considera correctas', 'una disciplina científica', 'las leyes físicas', 'los gustos personales'], 0, 'Moral (mores = costumbres).']
        ]
      },
      {
        id: 'f2t3', nombre: 'Bioética, ciencia y tecnología',
        proposito: 'Propósito 3 · Desarrolla conciencia crítica sobre los desafíos éticos de los avances científicos y tecnológicos (perspectivas bioéticas).',
        leccion: [
          { t: '¿Qué es la bioética?', h: `<p>Ética aplicada a la vida, la salud y el ambiente. El término se popularizó con el oncólogo Van Rensselaer <b>Potter</b> (1970-1971).</p>
            <p>Principios clásicos:</p><ul><li><b>Autonomía</b>: respetar las decisiones informadas de cada persona (consentimiento informado).</li><li><b>Beneficencia</b>: buscar el bien.</li><li><b>No maleficencia</b>: no causar daño.</li><li><b>Justicia</b>: repartir beneficios y cargas con equidad.</li></ul>` },
          { t: 'Desafíos actuales', h: `<ul><li><b>Inteligencia artificial</b>: sesgos, privacidad de datos, ¿quién responde si falla?</li><li><b>Automatización y robots</b>: productividad vs. empleo y seguridad laboral.</li><li><b>Edición genética</b> (CRISPR): curar enfermedades vs. riesgos y desigualdad.</li><li><b>Datos personales</b>: redes sociales, cámaras, reconocimiento facial.</li></ul>` },
          { t: 'Principio de precaución', h: `<p>Si una tecnología puede causar daños graves y hay incertidumbre científica, conviene actuar con cautela antes de usarla a gran escala.</p><div class="tip">Pregunta clave: ¿que algo se <b>pueda</b> hacer significa que se <b>deba</b> hacer?</div>` }
        ],
        pares: [['Autonomía', 'Decisión informada'], ['Beneficencia', 'Buscar el bien'], ['No maleficencia', 'No dañar'], ['Justicia', 'Reparto equitativo'], ['Consentimiento informado', 'Aceptar sabiendo riesgos'], ['Precaución', 'Cautela ante la incertidumbre']],
        q: [
          ['om', 'La bioética es…', ['la ética aplicada a la vida, la salud y el ambiente', 'una rama de la química', 'un tipo de biología marina', 'una ley de tránsito'], 0, 'Bios = vida.'],
          ['om', 'El principio de «no maleficencia» significa…', ['no causar daño', 'hacer siempre lo que pide el paciente', 'repartir recursos', 'investigar más'], 0, 'Primero, no dañar.'],
          ['om', 'El consentimiento informado se relaciona con el principio de…', ['autonomía', 'justicia', 'beneficencia', 'precaución'], 0, 'La persona decide conociendo riesgos y beneficios.'],
          ['om', 'Que todas las personas tengan acceso equitativo a un tratamiento corresponde al principio de…', ['justicia', 'autonomía', 'no maleficencia', 'beneficencia'], 0, 'Reparto justo de beneficios y cargas.'],
          ['re', 'Relaciona el principio con su significado:', [['Autonomía', 'Respetar decisiones informadas'], ['Beneficencia', 'Buscar el bien'], ['No maleficencia', 'No causar daño'], ['Justicia', 'Equidad en el reparto']], null, 'Principios de la bioética.'],
          ['om', 'Un sistema de IA que rechaza más solicitudes de un grupo social por los datos con que fue entrenado presenta un problema de…', ['sesgo', 'velocidad', 'memoria RAM', 'batería'], 0, 'Los datos sesgados reproducen injusticias.', { n: 2 }],
          ['om', 'El principio de precaución recomienda…', ['actuar con cautela si una tecnología puede causar daños graves y hay incertidumbre', 'usar toda tecnología nueva de inmediato', 'prohibir la ciencia', 'ignorar los riesgos'], 0, 'Prevenir antes que lamentar.'],
          ['vf', 'Que algo sea técnicamente posible no significa automáticamente que sea éticamente correcto.', null, true, 'Poder ≠ deber.'],
          ['om', 'Una fábrica automatiza una línea con robots. ¿Qué pregunta ÉTICA conviene hacerse?', ['¿Cómo se capacitará o reubicará a los trabajadores y se garantizará su seguridad?', '¿De qué color serán los robots?', '¿Cuántos tornillos llevan?', '¿Qué marca de PLC es más bonita?'], 0, 'La tecnología afecta a personas.', { n: 2 }],
          ['om', 'La edición genética con CRISPR plantea un dilema porque…', ['podría curar enfermedades, pero tiene riesgos y podría aumentar la desigualdad', 'no funciona', 'es ilegal en todo el mundo', 'solo sirve para plantas'], 0, 'Beneficios y riesgos a la vez.', { n: 3 }],
          ['om', 'Compartir en redes la foto de un compañero sin su permiso afecta principalmente…', ['su privacidad y autonomía', 'la velocidad de internet', 'la memoria del celular', 'nada'], 0, 'Los datos personales son de cada persona.']
        ]
      },
      {
        id: 'f2t4', nombre: 'Género y perspectivas feministas',
        proposito: 'Propósito 4 · Analiza las desigualdades de género desde una mirada filosófica, contrastando diversas perspectivas feministas.',
        leccion: [
          { t: 'Conceptos básicos', h: `<ul><li><b>Sexo</b>: características biológicas.</li><li><b>Género</b>: roles, expectativas y normas que una sociedad asigna a mujeres y hombres; cambian según la época y la cultura.</li><li><b>Estereotipo de género</b>: idea simplificada sobre cómo «debe» ser alguien por su género («los hombres no lloran», «las mujeres no son buenas para la mecánica»).</li><li><b>Igualdad</b>: mismos derechos. <b>Equidad</b>: dar a cada quien lo que necesita para llegar a esa igualdad.</li></ul>` },
          { t: 'Voces en la historia', h: `<ul><li><b>Sor Juana Inés de la Cruz</b> (Respuesta a sor Filotea, 1691): defendió el derecho de las mujeres a estudiar.</li><li><b>Mary Wollstonecraft</b> (1792): pidió educación igual para mujeres.</li><li><b>Simone de Beauvoir</b> (El segundo sexo, 1949): «No se nace mujer: se llega a serlo».</li><li><b>Hermila Galindo</b> impulsó el voto femenino en México; las mujeres obtuvieron el voto federal en <b>1953</b>.</li><li><b>Rosario Castellanos</b> reflexionó sobre la cultura y la condición de las mujeres en México.</li></ul>` },
          { t: 'Perspectivas que se contrastan', h: `<table><tr><th>Perspectiva</th><th>Sostiene que…</th></tr><tr><td>Feminismo liberal</td><td>Basta con garantizar iguales derechos y oportunidades legales</td></tr><tr><td>Feminismo radical</td><td>La desigualdad tiene raíz en una estructura social (patriarcado) que hay que transformar</td></tr><tr><td>Interseccionalidad (K. Crenshaw, 1989)</td><td>El género se cruza con clase, etnia, discapacidad, etc., y produce desigualdades distintas</td></tr><tr><td>Feminismos comunitarios y decoloniales</td><td>Parten de la experiencia de mujeres indígenas y latinoamericanas y de sus comunidades</td></tr></table>
            <div class="tip">En filosofía se analizan los argumentos de cada postura, sus coincidencias y sus críticas.</div>` }
        ],
        pares: [['Sexo', 'Rasgos biológicos'], ['Género', 'Roles asignados socialmente'], ['Estereotipo', 'Idea simplificada'], ['Equidad', 'Según lo que se necesita'], ['Interseccionalidad', 'Cruce de desigualdades'], ['Voto femenino federal', '1953 en México']],
        q: [
          ['om', 'En los estudios de género, «género» se refiere a…', ['los roles, expectativas y normas que una sociedad asigna', 'solo las características biológicas', 'el tipo de ropa', 'un género literario'], 0, 'Cambia según la época y la cultura.'],
          ['om', '«Las mujeres no son buenas para la mecánica» es un ejemplo de…', ['estereotipo de género', 'dato científico', 'ley', 'argumento válido'], 0, 'Generaliza sin fundamento.'],
          ['om', 'Dar a cada persona lo que necesita para alcanzar la igualdad de oportunidades es…', ['equidad', 'igualdad formal', 'estereotipo', 'heteronomía'], 0, 'Igualdad = mismos derechos; equidad = apoyos según necesidades.', { n: 2 }],
          ['om', '¿Quién defendió en 1691 el derecho de las mujeres a estudiar, en su «Respuesta a sor Filotea»?', ['Sor Juana Inés de la Cruz', 'Simone de Beauvoir', 'Rosario Castellanos', 'Frida Kahlo'], 0, 'Novohispana, siglo XVII.'],
          ['om', '«No se nace mujer: se llega a serlo» es una idea de…', ['Simone de Beauvoir', 'Kant', 'Mary Shelley', 'Sor Juana'], 0, 'El segundo sexo (1949).'],
          ['nu', '¿En qué año obtuvieron las mujeres el derecho al voto en elecciones federales en México?', { u: '', tol: 0 }, 1953, 'Reforma constitucional de 1953; votaron por primera vez a nivel federal en 1955.', { n: 2 }],
          ['om', 'La interseccionalidad (Kimberlé Crenshaw) sostiene que…', ['el género se cruza con clase, etnia y otras condiciones, produciendo desigualdades distintas', 'todas las desigualdades son iguales', 'el género no importa', 'solo importa la clase social'], 0, 'Las desigualdades se combinan.', { n: 2 }],
          ['re', 'Relaciona la perspectiva con su planteamiento:', [['Feminismo liberal', 'Iguales derechos y oportunidades legales'], ['Feminismo radical', 'Transformar la estructura social'], ['Interseccionalidad', 'Cruce de género, clase y etnia'], ['Feminismo comunitario', 'Experiencia de mujeres indígenas']], null, 'Perspectivas que se contrastan.', { n: 3 }],
          ['vf', 'Los roles de género pueden cambiar según la época y la cultura.', null, true, 'Son construcciones sociales.'],
          ['om', 'Mary Wollstonecraft (1792) pidió sobre todo…', ['educación igual para las mujeres', 'abolir las escuelas', 'el voto de los niños', 'cerrar las fábricas'], 0, 'Vindicación de los derechos de la mujer.'],
          ['om', 'Para analizar filosóficamente un debate de género, lo más adecuado es…', ['examinar los argumentos de cada postura, sus coincidencias y sus críticas', 'burlarse de quien piensa distinto', 'repetir lo que dicen las redes', 'evitar el tema'], 0, 'Pensamiento crítico y diálogo respetuoso.']
        ]
      },
      {
        id: 'f2t5', nombre: 'Praxis transformadora y humanismo',
        proposito: 'Propósito 5 · Integra Ontología, Ética, Bioética y Humanidades para proponer acciones (praxis) que transformen su entorno.',
        leccion: [
          { t: 'Praxis: pensar y actuar', h: `<p><b>Praxis</b> es la unión de <b>reflexión</b> y <b>acción</b> para transformar la realidad.</p><ul><li>Marx: los filósofos han interpretado el mundo; se trata de <b>transformarlo</b>.</li><li><b>Adolfo Sánchez Vázquez</b>, filósofo que vivió y enseñó en México, escribió <i>Filosofía de la praxis</i> (1967).</li><li><b>Paulo Freire</b> (Pedagogía del oprimido): educar es reflexionar y actuar juntos sobre el mundo.</li></ul>` },
          { t: 'Humanismo', h: `<p>El <b>humanismo</b> pone en el centro la <b>dignidad</b> de las personas, su libertad y su capacidad de crear. En el Renacimiento, Pico della Mirandola escribió el <i>Discurso sobre la dignidad del hombre</i>: el ser humano puede elegir en qué convertirse.</p>` },
          { t: 'De la idea al proyecto', h: `<ol><li><b>Problematizar</b>: ¿qué situación de mi comunidad me inquieta?</li><li><b>Reflexionar</b>: ¿qué es (ontología)?, ¿qué es justo (ética)?, ¿qué riesgos hay (bioética)?</li><li><b>Dialogar</b> con otros puntos de vista.</li><li><b>Actuar</b> con un proyecto concreto.</li><li><b>Evaluar</b> y volver a pensar.</li></ol><div class="tip">La <b>ética del pensamiento</b>: somos responsables de lo que pensamos y difundimos.</div>` }
        ],
        pares: [['Praxis', 'Reflexión más acción'], ['Humanismo', 'Dignidad humana al centro'], ['Sánchez Vázquez', 'Filosofía de la praxis'], ['Freire', 'Pedagogía del oprimido'], ['Pico della Mirandola', 'Dignidad del hombre'], ['Problematizar', 'Cuestionar una situación']],
        q: [
          ['om', 'La praxis es…', ['la unión de reflexión y acción para transformar la realidad', 'solo teoría', 'solo práctica sin pensar', 'un ejercicio de gimnasia'], 0, 'Pensar y actuar juntos.'],
          ['om', 'El humanismo pone en el centro…', ['la dignidad y la libertad de las personas', 'el dinero', 'la tecnología por sí misma', 'la obediencia'], 0, 'Valor de cada ser humano.'],
          ['om', '¿Qué filósofo, que vivió y enseñó en México, escribió «Filosofía de la praxis»?', ['Adolfo Sánchez Vázquez', 'Octavio Paz', 'José Vasconcelos', 'Sor Juana'], 0, 'Publicada en 1967.', { n: 2 }],
          ['om', 'Paulo Freire propuso una educación basada en…', ['reflexionar y actuar juntos sobre el mundo', 'memorizar sin preguntar', 'castigos', 'competir siempre'], 0, 'Pedagogía del oprimido.'],
          ['or', 'Ordena los pasos de un proyecto de praxis en tu comunidad:', ['Problematizar una situación', 'Reflexionar con ética y filosofía', 'Dialogar con otros puntos de vista', 'Actuar con un proyecto', 'Evaluar los resultados'], null, 'Pensar → dialogar → actuar → evaluar.'],
          ['om', 'Organizar con tu grupo una campaña para reparar y donar calculadoras viejas, después de analizar por qué faltan materiales, es un ejemplo de…', ['praxis', 'escepticismo', 'heteronomía', 'mito'], 0, 'Reflexión que se convierte en acción.', { n: 2 }],
          ['vf', 'Para la filosofía de la praxis, interpretar el mundo no basta: también hay que transformarlo.', null, true, 'Idea central de la praxis.'],
          ['om', 'La «ética del pensamiento» nos recuerda que…', ['somos responsables de lo que pensamos y difundimos', 'pensar no tiene consecuencias', 'solo los filósofos piensan', 'todo da igual'], 0, 'Las ideas también afectan a otros.'],
          ['om', 'Pico della Mirandola sostuvo que el ser humano…', ['puede elegir en qué convertirse', 'tiene un destino fijo', 'no tiene libertad', 'es igual a un animal'], 0, 'Discurso sobre la dignidad del hombre (Renacimiento).', { n: 2 }],
          ['re', 'Relaciona la pregunta con la rama filosófica:', [['¿Qué es realmente esto?', 'Ontología'], ['¿Es justo?', 'Ética'], ['¿Qué riesgos tiene para la vida?', 'Bioética'], ['¿Cómo lo sabemos?', 'Epistemología']], null, 'Integrar ramas para analizar un problema.', { n: 3 }]
        ]
      }
    ]
  };
})();
