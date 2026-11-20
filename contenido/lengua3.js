// ENGRANE · Lengua y Comunicación III «Describir culturas, apropiarse de las palabras»
// Fuente: SEP · MCCEMS Modelo Educativo 2025 · 7 propósitos formativos (sentido global del texto, movimientos
// literarios, géneros, subgéneros narrativos, poesía y figuras retóricas, reseña crítica, exposición oral formal).
// Todos los ejemplos literarios de este archivo son originales (escritos para Engrane).
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.lengua3 = {
    temas: [
      {
        id: 'l3t1', nombre: 'Sentido global de un texto',
        proposito: 'Propósito 1 · Interpreta el sentido global de un texto desde sus conocimientos previos, la intención del autor y el pensamiento crítico.',
        leccion: [
          { t: 'Leer es construir sentido', h: `<p>Comprender un texto es más que entender palabras: es descubrir de qué trata (<b>tema</b>), qué quiere decir (<b>idea principal</b>) y para qué lo escribió el autor (<b>intención</b>).</p>
            <table><tr><th>Intención</th><th>Ejemplo</th></tr><tr><td>Informar</td><td>Noticia, artículo de divulgación</td></tr><tr><td>Persuadir</td><td>Anuncio, artículo de opinión</td></tr><tr><td>Entretener</td><td>Cuento, novela</td></tr><tr><td>Instruir</td><td>Receta, manual</td></tr><tr><td>Expresar</td><td>Poema, diario</td></tr></table>` },
          { t: 'Hechos, opiniones y supuestos', h: `<ul><li><b>Hecho</b>: se puede comprobar. «El agua hierve a 100 °C al nivel del mar.»</li><li><b>Opinión</b>: es un juicio personal. «La química es la materia más difícil.»</li><li><b>Supuesto implícito</b>: algo que el autor da por cierto sin decirlo. «Hasta en prepa se puede aprender robótica» supone que se cree que es difícil para jóvenes de prepa.</li></ul>` },
          { t: 'Lectura crítica', h: `<ol><li>Activa lo que ya sabes del tema.</li><li>Pregúntate mientras lees: ¿quién lo dice?, ¿con qué pruebas?</li><li>Distingue hechos de opiniones.</li><li>Busca lo que el texto da por hecho.</li><li>Decide si los argumentos son sólidos (datos, fuentes, coherencia) o débiles (generalizaciones, ataques personales).</li></ol>` }
        ],
        pares: [['Informar', 'Noticia'], ['Persuadir', 'Anuncio'], ['Entretener', 'Cuento'], ['Instruir', 'Receta'], ['Hecho', 'Se puede comprobar'], ['Opinión', 'Juicio personal']],
        q: [
          ['om', '¿Cuál de estas oraciones es un HECHO?', ['El agua hierve a 100 °C al nivel del mar.', 'El inglés es el idioma más bonito.', 'Los lunes son los peores días.', 'La mejor música es la de antes.'], 0, 'Un hecho se puede comprobar con datos o experimentos.'],
          ['om', '¿Cuál de estas oraciones es una OPINIÓN?', ['El fútbol es el deporte más emocionante.', 'México tiene 32 entidades federativas.', 'El Sol es una estrella.', 'La Revolución Mexicana inició en 1910.'], 0, '«Más emocionante» es un juicio personal: no se puede comprobar.'],
          ['om', 'Un texto que intenta convencerte de separar la basura tiene intención…', ['persuasiva', 'narrativa', 'instructiva únicamente', 'poética'], 0, 'Busca convencer: persuadir.'],
          ['vf', 'La idea principal siempre está en la primera oración del texto.', null, false, 'Puede estar al inicio, en medio, al final o incluso no estar escrita (implícita).'],
          ['om', 'Un supuesto implícito es…', ['una idea que el autor da por cierta sin decirla', 'una cita textual', 'el título del texto', 'una palabra difícil'], 0, 'Se «lee entre líneas».'],
          ['om', 'Lee: «La cooperativa del plantel ahora vende fruta picada. Las ventas de frituras bajaron un 30 % y las de fruta se triplicaron.» ¿Cuál es la idea principal?', ['Al ofrecer fruta, los alumnos compraron más fruta y menos frituras.', 'Las frituras son malas.', 'La cooperativa cerró.', 'La fruta es cara.'], 0, 'Resume lo que dice todo el texto, sin agregar opiniones.', { n: 2 }],
          ['om', 'Con el mismo texto de la cooperativa, ¿qué se puede INFERIR?', ['A muchos alumnos les gusta la fruta si está disponible.', 'Nadie come frituras.', 'La fruta es gratis.', 'El director odia las frituras.'], 0, 'Una inferencia se apoya en los datos del texto sin exagerarlos.', { n: 2 }],
          ['om', 'Leer de forma crítica significa…', ['evaluar si las razones y fuentes sostienen lo que el texto afirma', 'criticar todo lo que se lee', 'leer muy rápido', 'aceptar lo que dice el autor'], 0, 'Crítico ≠ negativo: es examinar con razones.'],
          ['re', 'Relaciona cada intención con un texto típico:', [['Informar', 'Noticia'], ['Persuadir', 'Anuncio publicitario'], ['Entretener', 'Cuento'], ['Instruir', 'Receta']], null, 'Intenciones comunicativas.'],
          ['om', '¿Qué ayuda MÁS a comprender un texto difícil?', ['Relacionarlo con lo que ya sabes y hacerte preguntas mientras lees', 'Leerlo una sola vez muy rápido', 'Saltarte las palabras que no conoces siempre', 'Leer solo el título'], 0, 'Los conocimientos previos y las preguntas guían la comprensión.'],
          ['om', '«Hasta los jóvenes de prepa pueden aprender robótica.» ¿Qué supuesto esconde la frase?', ['Que se piensa que a los jóvenes de prepa les cuesta aprender robótica', 'Que la robótica es fácil', 'Que solo hay robots en la prepa', 'Que los adultos no aprenden'], 0, 'La palabra «hasta» delata la idea previa.', { n: 3 }],
          ['vf', 'Un argumento es más sólido cuando ofrece datos verificables y fuentes confiables.', null, true, 'Las pruebas verificables fortalecen un argumento.'],
          ['om', '«Todos los influencers mienten.» ¿Por qué es un argumento débil?', ['Generaliza sin pruebas', 'Usa datos oficiales', 'Cita una fuente confiable', 'Es un hecho comprobado'], 0, 'Las generalizaciones («todos», «nunca») suelen ser falsas.', { n: 2 }]
        ]
      },
      {
        id: 'l3t2', nombre: 'Movimientos literarios',
        proposito: 'Propósito 2 · Reconoce movimientos literarios (Barroco, Neoclasicismo, Romanticismo, Realismo, Modernismo, Vanguardias, Realismo mágico) y parafrasea lecturas.',
        leccion: [
          { t: 'Del Barroco al Realismo', h: `<table><tr><th>Movimiento</th><th>Rasgos</th><th>Autores</th></tr>
            <tr><td>Barroco (s. XVII)</td><td>Ornamento, ingenio, contrastes, juegos de palabras</td><td>Sor Juana Inés de la Cruz, Góngora, Quevedo</td></tr>
            <tr><td>Neoclasicismo (s. XVIII)</td><td>Razón, orden, intención didáctica (fábulas)</td><td>Samaniego, Iriarte, Moratín</td></tr>
            <tr><td>Romanticismo (s. XIX)</td><td>Emoción, libertad, naturaleza, lo nocturno, nacionalismo</td><td>Bécquer, Espronceda, Víctor Hugo</td></tr>
            <tr><td>Realismo (s. XIX)</td><td>Retrato fiel de la sociedad y la vida cotidiana</td><td>Galdós, Balzac, Flaubert</td></tr></table>` },
          { t: 'Del Modernismo al Realismo mágico', h: `<table><tr><th>Movimiento</th><th>Rasgos</th><th>Autores</th></tr>
            <tr><td>Modernismo (fines s. XIX)</td><td>Nace en Hispanoamérica: belleza, musicalidad, exotismo</td><td>Rubén Darío, José Martí, Amado Nervo</td></tr>
            <tr><td>Vanguardias (inicios s. XX)</td><td>Rompen reglas: surrealismo, creacionismo; en México el <b>estridentismo</b></td><td>Huidobro, Maples Arce</td></tr>
            <tr><td>Realismo mágico (s. XX)</td><td>Lo extraordinario contado como algo normal</td><td>García Márquez, Laura Esquivel</td></tr></table>
            <p>Hoy también hay <b>literaturas disidentes</b> (voces que cuestionan normas) y <b>digitales</b> (hipertexto, literatura en redes, fanfic).</p>` },
          { t: 'Parafrasear', h: `<p><b>Parafrasear</b> es decir con tus palabras lo que dice un texto <b>sin cambiar su sentido</b>.</p>
            <div class="ej"><p>Original: «El protagonista, abrumado por la nostalgia, decidió regresar al pueblo de su infancia.»</p><p>Paráfrasis: «Como extrañaba mucho su pasado, el personaje volvió al lugar donde creció.»</p></div>
            <div class="tip">No es copiar ni opinar: es reformular con fidelidad.</div>` }
        ],
        pares: [['Barroco', 'Sor Juana'], ['Modernismo', 'Rubén Darío'], ['Realismo mágico', 'García Márquez'], ['Romanticismo', 'Bécquer'], ['Estridentismo', 'Vanguardia mexicana'], ['Neoclasicismo', 'Fábulas didácticas']],
        q: [
          ['om', 'Sor Juana Inés de la Cruz pertenece al…', ['Barroco', 'Romanticismo', 'Modernismo', 'Realismo mágico'], 0, 'Siglo XVII, Nueva España.'],
          ['om', 'Rubén Darío es la gran figura del…', ['Modernismo', 'Barroco', 'Neoclasicismo', 'Realismo'], 0, 'Su libro «Azul…» (1888) es clave del Modernismo.'],
          ['om', '¿Qué movimiento cuenta lo extraordinario como si fuera algo normal?', ['Realismo mágico', 'Neoclasicismo', 'Realismo', 'Barroco'], 0, 'Ej.: «Cien años de soledad», de García Márquez.'],
          ['om', 'El Romanticismo se caracteriza por…', ['la emoción, la libertad y la naturaleza', 'la razón y las reglas', 'el retrato objetivo de la sociedad', 'los juegos de ingenio'], 0, 'Lo sentimental sobre lo racional.'],
          ['om', 'Un movimiento con intención didáctica, que valora la razón y escribió fábulas:', ['Neoclasicismo', 'Vanguardias', 'Romanticismo', 'Modernismo'], 0, 'Siglo XVIII, Ilustración.'],
          ['om', 'El estridentismo fue una vanguardia surgida en…', ['México', 'Francia', 'Argentina', 'España'], 0, 'Encabezada por Manuel Maples Arce en 1921.', { n: 2 }],
          ['or', 'Ordena los movimientos del más antiguo al más reciente:', ['Barroco', 'Neoclasicismo', 'Romanticismo', 'Realismo', 'Modernismo', 'Vanguardias'], null, 'S. XVII → XVIII → XIX (dos) → fines del XIX → XX.', { n: 2 }],
          ['om', 'Parafrasear es…', ['decir con tus palabras lo que dice el texto, sin cambiar su sentido', 'copiar el texto entre comillas', 'dar tu opinión del texto', 'resumir solo el final'], 0, 'Reformular con fidelidad.'],
          ['om', '¿Cuál es una buena paráfrasis de «Abrumado por la nostalgia, decidió volver al pueblo de su infancia»?', ['Como extrañaba su pasado, volvió al lugar donde creció.', 'Odiaba su pueblo y nunca regresó.', 'Viajó a otro país por trabajo.', 'Me parece una decisión tonta.'], 0, 'Conserva el sentido con otras palabras.', { n: 2 }],
          ['vf', 'El Realismo busca retratar con fidelidad la sociedad y la vida cotidiana.', null, true, 'Por eso describe con detalle ambientes y costumbres.'],
          ['re', 'Relaciona autor y movimiento:', [['Bécquer', 'Romanticismo'], ['Galdós', 'Realismo'], ['Laura Esquivel', 'Realismo mágico'], ['Góngora', 'Barroco']], null, 'Autores representativos.'],
          ['om', 'La literatura en hipertexto, en redes sociales o en blogs se considera literatura…', ['digital', 'barroca', 'neoclásica', 'medieval'], 0, 'Aprovecha los medios digitales.']
        ]
      },
      {
        id: 'l3t3', nombre: 'Géneros literarios',
        proposito: 'Propósito 3 · Distingue los géneros literarios: novela, cuento, poesía, drama y ensayo.',
        leccion: [
          { t: 'Los grandes géneros', h: `<table><tr><th>Género</th><th>Rasgos</th></tr>
            <tr><td><b>Narrativo</b>: novela y cuento</td><td>Un narrador cuenta hechos de personajes en un tiempo y espacio</td></tr>
            <tr><td><b>Lírico</b>: poesía</td><td>Expresa emociones; suele escribirse en verso</td></tr>
            <tr><td><b>Dramático</b>: teatro</td><td>Diálogos y acotaciones; se escribe para representarse</td></tr>
            <tr><td><b>Ensayo</b></td><td>El autor argumenta su punto de vista sobre un tema</td></tr></table>` },
          { t: 'Novela vs cuento', h: `<table><tr><th>Cuento</th><th>Novela</th></tr><tr><td>Breve</td><td>Extensa</td></tr><tr><td>Una trama, pocos personajes</td><td>Varias tramas y muchos personajes</td></tr><tr><td>Busca un efecto único</td><td>Desarrolla mundos y procesos</td></tr></table>
            <p>Estructura: <b>inicio</b> → <b>desarrollo / nudo</b> → <b>desenlace</b>. Narrador: protagonista (1a persona), testigo, omnisciente (3a persona, lo sabe todo).</p>` },
          { t: 'Teatro y ensayo', h: `<ul><li><b>Teatro</b>: actos y escenas; <b>acotaciones</b> (indicaciones entre paréntesis para actores y escenario); <b>monólogo</b> (un personaje habla solo); <b>aparte</b> (habla al público sin que otros personajes «lo oigan»).</li><li><b>Ensayo</b>: introducción (tesis), desarrollo (argumentos), conclusión. Ej.: «El laberinto de la soledad», de Octavio Paz (1950).</li></ul>` }
        ],
        pares: [['Novela', 'Extensa, varias tramas'], ['Cuento', 'Breve, un efecto'], ['Poesía', 'Expresa emociones'], ['Teatro', 'Para representarse'], ['Ensayo', 'Argumenta una postura'], ['Acotación', 'Indicación escénica']],
        q: [
          ['om', '¿Qué género se escribe para ser representado por actores?', ['Dramático (teatro)', 'Lírico', 'Ensayo', 'Narrativo'], 0, 'Diálogos y acotaciones.'],
          ['om', 'Un texto breve, con una sola trama y pocos personajes, es un…', ['cuento', 'novela', 'ensayo', 'drama'], 0, 'La novela es extensa y compleja.'],
          ['om', '¿Qué género presenta y defiende el punto de vista del autor sobre un tema?', ['Ensayo', 'Cuento', 'Poesía', 'Teatro'], 0, 'El ensayo argumenta.'],
          ['om', 'Las indicaciones entre paréntesis para los actores en una obra de teatro se llaman…', ['acotaciones', 'estrofas', 'capítulos', 'tesis'], 0, 'Ej.: (Entra María, nerviosa).'],
          ['om', 'Un narrador que sabe todo, incluso lo que piensan los personajes, es…', ['omnisciente', 'testigo', 'protagonista', 'lírico'], 0, 'Omnisciente = «lo sabe todo».'],
          ['or', 'Ordena la estructura de un relato:', ['Inicio', 'Desarrollo (nudo)', 'Desenlace'], null, 'Presentación → conflicto → resolución.'],
          ['vf', 'La poesía siempre debe tener rima.', null, false, 'Existe el verso libre, sin rima ni medida fija.'],
          ['om', '«El laberinto de la soledad», de Octavio Paz, es un…', ['ensayo', 'cuento', 'drama', 'poema épico'], 0, 'Reflexiona sobre la identidad mexicana.', { n: 2 }],
          ['om', 'Cuando un personaje de teatro habla solo, expresando lo que piensa, es un…', ['monólogo', 'diálogo', 'aparte', 'coro'], 0, 'Mono = uno.', { n: 2 }],
          ['re', 'Relaciona:', [['Novela', 'Narrativo'], ['Soneto', 'Lírico'], ['Comedia', 'Dramático'], ['Texto argumentativo de autor', 'Ensayo']], null, 'Géneros y sus formas.'],
          ['om', 'Un narrador que cuenta la historia en primera persona porque es el personaje principal es…', ['protagonista', 'omnisciente', 'testigo', 'objetivo'], 0, '«Yo» vive los hechos.'],
          ['vf', 'En la novela suele haber varias tramas y muchos personajes.', null, true, 'Por su extensión.']
        ]
      },
      {
        id: 'l3t4', nombre: 'Subgéneros narrativos',
        proposito: 'Propósito 4 · Identifica subgéneros narrativos: suspenso, terror, ciencia ficción, narrativas del cuerpo y autoficción, neorrealismo urbano y literaturas del Antropoceno.',
        leccion: [
          { t: 'Para sentir algo', h: `<ul><li><b>Suspenso</b>: mantiene la tensión; quieres saber qué va a pasar.</li><li><b>Terror</b>: provoca miedo con lo sobrenatural o lo amenazante.</li><li><b>Ciencia ficción</b>: imagina avances científicos o tecnológicos, futuros u otros mundos (Julio Verne, Isaac Asimov).</li></ul>` },
          { t: 'Para mirarnos', h: `<ul><li><b>Autoficción</b>: el autor se vuelve personaje y mezcla su vida real con ficción.</li><li><b>Narrativas del cuerpo</b>: el cuerpo y sus experiencias son el centro del relato.</li><li><b>Neorrealismo urbano</b>: la vida cotidiana en la ciudad y sus problemas sociales actuales.</li><li><b>Literaturas del Antropoceno</b>: la crisis ambiental y la relación entre humanos y naturaleza.</li></ul>` },
          { t: '¿Cómo lo reconozco?', h: `<div class="ej"><p>«En 2090, una ingeniera de Celaya programa a los últimos robots polinizadores.» → ciencia ficción + Antropoceno.</p><p>«Cada noche, la puerta del taller se abre sola a las 3:33.» → terror.</p><p>«Me llamo Nacho, como el autor, y esta es mi primera semana dando clases…» → autoficción.</p></div>` }
        ],
        pares: [['Suspenso', 'Tensión por saber qué pasa'], ['Terror', 'Provoca miedo'], ['Ciencia ficción', 'Tecnología y futuro'], ['Autoficción', 'Autor como personaje'], ['Neorrealismo urbano', 'Vida en la ciudad'], ['Antropoceno', 'Crisis ambiental']],
        q: [
          ['om', '«En 2090, los robots cuidan los cultivos porque ya no hay abejas.» ¿Qué subgénero es?', ['Ciencia ficción', 'Terror', 'Autoficción', 'Neorrealismo urbano'], 0, 'Futuro y tecnología imaginada.'],
          ['om', '«Cada noche, la puerta del taller se abre sola a las 3:33.» ¿Qué subgénero es?', ['Terror', 'Ciencia ficción', 'Autoficción', 'Ensayo'], 0, 'Lo inexplicable y amenazante provoca miedo.'],
          ['om', 'En la autoficción…', ['el autor se vuelve personaje y mezcla su vida real con ficción', 'todo ocurre en el espacio', 'siempre hay fantasmas', 'no hay narrador'], 0, 'Auto = uno mismo.'],
          ['om', 'Un relato sobre un chavo que sobrevive entre el tráfico, el trabajo informal y el transporte de una gran ciudad es…', ['neorrealismo urbano', 'ciencia ficción', 'terror', 'Realismo mágico'], 0, 'Vida cotidiana urbana y sus problemas.'],
          ['om', 'Las literaturas del Antropoceno tratan sobre…', ['la crisis ambiental y la relación humanos-naturaleza', 'castillos medievales', 'detectives', 'la vida de los reyes'], 0, 'Antropoceno: época marcada por el impacto humano en la Tierra.'],
          ['om', 'El subgénero que te mantiene en tensión por saber qué va a pasar es el…', ['suspenso', 'ensayo', 'lírico', 'didáctico'], 0, 'Intriga y tensión.'],
          ['om', '¿Qué autor es clásico de la ciencia ficción?', ['Julio Verne', 'Sor Juana', 'Bécquer', 'Góngora'], 0, '«Veinte mil leguas de viaje submarino».', { n: 2 }],
          ['re', 'Relaciona el subgénero con su rasgo:', [['Suspenso', 'Tensión'], ['Terror', 'Miedo'], ['Ciencia ficción', 'Tecnología imaginada'], ['Autoficción', 'El autor es personaje']], null, 'Rasgos principales.'],
          ['vf', 'Un mismo relato puede combinar subgéneros, por ejemplo ciencia ficción y Antropoceno.', null, true, 'Los subgéneros se mezclan con frecuencia.', { n: 2 }],
          ['om', 'Las narrativas del cuerpo ponen en el centro…', ['el cuerpo y sus experiencias', 'los viajes espaciales', 'los fantasmas', 'las leyes'], 0, 'Enfermedad, deporte, cambios, identidad corporal…'],
          ['om', 'Un cuento sobre un pueblo que se queda sin agua por la sequía y cómo la comunidad se organiza pertenece a las literaturas…', ['del Antropoceno', 'barrocas', 'de terror', 'neoclásicas'], 0, 'Tema ambiental.', { n: 2 }]
        ]
      },
      {
        id: 'l3t5', nombre: 'Poesía y figuras retóricas',
        proposito: 'Propósito 5 · Analiza la estructura de la poesía, los subgéneros líricos y las figuras retóricas (metáfora, hipérbaton, hipérbole, ironía, prosopopeya, rima y métrica).',
        leccion: [
          { t: 'Verso, estrofa, rima y métrica', h: `<ul><li><b>Verso</b>: cada línea. <b>Estrofa</b>: grupo de versos.</li><li><b>Rima consonante</b>: coinciden vocales y consonantes desde la última vocal acentuada (cami<b>no</b> / desti<b>no</b>).</li><li><b>Rima asonante</b>: solo coinciden las vocales (c<b>a</b>s<b>a</b> / m<b>a</b>l<b>a</b>).</li><li><b>Métrica</b>: se cuentan sílabas. <b>Sinalefa</b>: vocal final + vocal inicial = una sílaba. Si el verso termina en palabra <b>aguda +1</b>; <b>esdrújula −1</b>.</li><li><b>Soneto</b>: 14 versos endecasílabos (2 cuartetos y 2 tercetos).</li></ul>` },
          { t: 'Figuras retóricas', h: `<table><tr><th>Figura</th><th>Ejemplo (original)</th></tr>
            <tr><td><b>Metáfora</b>: identifica una cosa con otra</td><td>«Tus ojos son dos faros en la niebla.»</td></tr>
            <tr><td><b>Símil</b>: compara con «como»</td><td>«Rápido como un servo nuevo.»</td></tr>
            <tr><td><b>Hipérbaton</b>: altera el orden normal</td><td>«De la escuela en la puerta te esperaba.»</td></tr>
            <tr><td><b>Hipérbole</b>: exagera</td><td>«Te lo dije un millón de veces.»</td></tr>
            <tr><td><b>Ironía</b>: dice lo contrario de lo que piensa</td><td>«¡Qué día tan soleado!» (en plena tormenta)</td></tr>
            <tr><td><b>Prosopopeya</b>: da rasgos humanos a cosas</td><td>«El viento susurraba en el patio.»</td></tr></table>` },
          { t: 'Subgéneros líricos', h: `<ul><li><b>Oda</b>: exalta algo o a alguien.</li><li><b>Elegía</b>: lamenta una pérdida.</li><li><b>Égloga</b>: vida del campo y pastores.</li><li><b>Sátira</b>: se burla para criticar.</li><li><b>Canción / himno</b>: celebra o canta un sentimiento o una causa.</li></ul>` }
        ],
        pares: [['Metáfora', 'Identifica una cosa con otra'], ['Hipérbole', 'Exageración'], ['Prosopopeya', 'Rasgos humanos a cosas'], ['Ironía', 'Decir lo contrario'], ['Hipérbaton', 'Orden alterado'], ['Elegía', 'Lamenta una pérdida'], ['Oda', 'Exalta algo']],
        q: [
          ['om', '«El viento susurraba en el patio.» ¿Qué figura es?', ['Prosopopeya (personificación)', 'Hipérbole', 'Ironía', 'Hipérbaton'], 0, 'Susurrar es una acción humana.'],
          ['om', '«Te lo dije un millón de veces.» ¿Qué figura es?', ['Hipérbole', 'Metáfora', 'Prosopopeya', 'Hipérbaton'], 0, 'Exageración.'],
          ['om', '«Tus ojos son dos faros en la niebla.» ¿Qué figura es?', ['Metáfora', 'Símil', 'Ironía', 'Hipérbole'], 0, 'Identifica sin usar «como».'],
          ['om', '«De la escuela en la puerta te esperaba.» ¿Qué figura es?', ['Hipérbaton', 'Hipérbole', 'Metáfora', 'Ironía'], 0, 'Orden normal: «Te esperaba en la puerta de la escuela».', { n: 2 }],
          ['om', 'Llueve a cántaros y alguien dice: «¡Qué día tan soleado!». Es…', ['ironía', 'metáfora', 'prosopopeya', 'rima'], 0, 'Dice lo contrario de lo que pasa.'],
          ['om', '«Camino» y «destino» tienen rima…', ['consonante', 'asonante', 'libre', 'no riman'], 0, 'Coinciden vocales y consonantes: -ino.'],
          ['om', '«Casa» y «mala» tienen rima…', ['asonante', 'consonante', 'libre', 'esdrújula'], 0, 'Solo coinciden las vocales a-a.'],
          ['nu', 'Cuenta las sílabas métricas: «Mi casa tiene un jardín» (sinalefa en «tiene un»; termina en aguda).', { u: 'sílabas', tol: 0 }, 8, 'mi-ca-sa-tie-neun-jar-dín = 7 → aguda +1 = 8 (octosílabo).', { n: 3 }],
          ['om', '¿Cuántos versos tiene un soneto?', ['14', '10', '8', '20'], 0, 'Dos cuartetos y dos tercetos.'],
          ['om', 'Un poema que lamenta la muerte de un ser querido es una…', ['elegía', 'oda', 'sátira', 'égloga'], 0, 'Elegía = lamento.'],
          ['om', 'Un poema que exalta y celebra algo, por ejemplo «al maíz», es una…', ['oda', 'elegía', 'égloga', 'sátira'], 0, 'Oda = exaltación.'],
          ['om', '«Rápido como un servo nuevo.» ¿Qué figura es?', ['Símil (comparación)', 'Metáfora', 'Hipérbaton', 'Ironía'], 0, 'Usa «como»: compara.', { n: 2 }],
          ['re', 'Relaciona la figura con su definición:', [['Metáfora', 'Identifica una cosa con otra'], ['Hipérbole', 'Exagera'], ['Prosopopeya', 'Humaniza objetos'], ['Ironía', 'Dice lo contrario']], null, 'Figuras retóricas.']
        ]
      },
      {
        id: 'l3t6', nombre: 'La reseña crítica',
        proposito: 'Propósito 6 · Identifica ideas principales y secundarias, interpreta información y escribe una reseña crítica.',
        leccion: [
          { t: '¿Qué es una reseña crítica?', h: `<p>Un texto que <b>resume</b> una obra (libro, película, serie, exposición, videojuego) y la <b>valora con argumentos</b> para orientar al lector.</p>
            <div class="tip">Descriptiva = solo resume. <b>Crítica</b> = resume + evalúa con razones.</div>` },
          { t: 'Estructura', h: `<ol><li><b>Título</b> atractivo.</li><li><b>Ficha técnica</b>: título, autor/director, año, editorial o duración.</li><li><b>Resumen</b> sin revelar el final (sin spoilers).</li><li><b>Valoración</b>: qué logra y qué falla, con ejemplos.</li><li><b>Conclusión y recomendación</b>: ¿a quién se la recomiendas?</li></ol>
            <p>Conectores útiles: <i>además, sin embargo, por lo tanto, en conclusión</i>.</p>` },
          { t: 'Ideas principales y secundarias', h: `<p>La <b>principal</b> es la que, si la quitas, el párrafo pierde su sentido. Las <b>secundarias</b> la explican, la ejemplifican o la amplían.</p>
            <div class="ej"><p>«La película logra un ritmo intenso (principal). Las escenas de persecución duran apenas lo necesario (secundaria) y la música acelera la tensión (secundaria).»</p></div>` }
        ],
        pares: [['Ficha técnica', 'Datos de la obra'], ['Resumen', 'Sin spoilers'], ['Valoración', 'Juicio con argumentos'], ['Idea principal', 'Sostiene el párrafo'], ['Idea secundaria', 'Explica o ejemplifica'], ['Recomendación', 'A quién se la sugieres']],
        q: [
          ['om', 'La diferencia entre una reseña descriptiva y una crítica es que la crítica…', ['valora la obra con argumentos', 'es más corta', 'no resume nada', 'cuenta el final'], 0, 'Resume y evalúa.'],
          ['or', 'Ordena la estructura de una reseña crítica:', ['Título', 'Ficha técnica', 'Resumen sin spoilers', 'Valoración con argumentos', 'Conclusión y recomendación'], null, 'De los datos a la opinión fundamentada.'],
          ['om', '¿Qué va en la ficha técnica de una película?', ['Título, director, año y duración', 'El final de la historia', 'Tu calificación del 1 al 10', 'Memes de la película'], 0, 'Datos para identificar la obra.'],
          ['vf', 'Una buena reseña revela el final para que el lector no tenga que ver la película.', null, false, 'Se evitan los spoilers.'],
          ['om', '«La película logra un ritmo intenso. Las persecuciones duran lo necesario y la música acelera la tensión.» ¿Cuál es la idea principal?', ['La película logra un ritmo intenso.', 'Las persecuciones duran lo necesario.', 'La música acelera la tensión.', 'Ninguna.'], 0, 'Las otras dos la explican.', { n: 2 }],
          ['om', '¿Cuál es una valoración con argumento?', ['Los efectos son creíbles porque se filmaron en locaciones reales con poca animación.', 'Está padre.', 'No me gustó y ya.', 'Es la peor del mundo.'], 0, 'Da una razón concreta.'],
          ['om', '¿Qué conector usarías para presentar una idea contraria?', ['Sin embargo', 'Además', 'Por lo tanto', 'Primero'], 0, '«Sin embargo» introduce contraste.'],
          ['om', '¿Qué conector introduce una conclusión?', ['En conclusión', 'Sin embargo', 'Por ejemplo', 'Además'], 0, 'Cierra el texto.'],
          ['re', 'Relaciona cada parte con su función:', [['Ficha técnica', 'Identificar la obra'], ['Resumen', 'Contar de qué trata'], ['Valoración', 'Juzgar con razones'], ['Recomendación', 'Orientar al lector']], null, 'Partes de la reseña.'],
          ['om', 'Las ideas secundarias sirven para…', ['explicar, ejemplificar o ampliar la idea principal', 'contradecir el texto', 'cambiar de tema', 'poner el título'], 0, 'Apoyan a la principal.'],
          ['vf', 'Una reseña crítica puede reconocer aciertos y señalar fallas de la misma obra.', null, true, 'La crítica equilibrada es más creíble.', { n: 2 }]
        ]
      },
      {
        id: 'l3t7', nombre: 'Exposición oral formal',
        proposito: 'Propósito 7 · Organiza una exposición oral formal (coloquio, simposio o foro): planeación, ejecución y seguimiento.',
        leccion: [
          { t: 'Formatos', h: `<table><tr><th>Formato</th><th>¿Cómo funciona?</th></tr>
            <tr><td><b>Simposio</b></td><td>Varios especialistas exponen, uno tras otro, distintos aspectos de un mismo tema.</td></tr>
            <tr><td><b>Mesa redonda</b></td><td>Participantes con puntos de vista diferentes discuten, guiados por un moderador.</td></tr>
            <tr><td><b>Coloquio</b></td><td>Especialistas conversan sobre un tema y después el público pregunta.</td></tr>
            <tr><td><b>Foro</b></td><td>Discusión abierta en la que participa activamente el público.</td></tr>
            <tr><td><b>Panel</b></td><td>Expertos conversan entre sí de forma informal frente a un auditorio.</td></tr></table>` },
          { t: 'Roles', h: `<ul><li><b>Moderador</b>: presenta, da la palabra, controla tiempos y cierra.</li><li><b>Ponentes / expositores</b>: preparan y exponen.</li><li><b>Relator o secretario</b>: toma notas y presenta conclusiones.</li><li><b>Público</b>: escucha y pregunta con respeto.</li></ul>` },
          { t: 'Planear, ejecutar, dar seguimiento', h: `<ol><li><b>Planeación</b>: tema, objetivo, formato, invitados, fecha, lugar, equipo (proyector, micrófono), difusión.</li><li><b>Ejecución</b>: puntualidad, lenguaje formal, voz clara, contacto visual, apoyos visuales breves.</li><li><b>Seguimiento</b>: conclusiones, agradecimientos, evaluación de lo que salió bien y lo que se puede mejorar.</li></ol>` }
        ],
        pares: [['Simposio', 'Expertos exponen por turnos'], ['Mesa redonda', 'Puntos de vista distintos'], ['Foro', 'Participa el público'], ['Moderador', 'Da la palabra'], ['Relator', 'Presenta conclusiones'], ['Panel', 'Charla informal de expertos']],
        q: [
          ['om', 'Varios especialistas exponen, uno tras otro, distintos aspectos de un tema. Es un…', ['simposio', 'foro', 'debate libre', 'monólogo'], 0, 'Exposiciones sucesivas.'],
          ['om', 'Participantes con puntos de vista diferentes discuten guiados por un moderador. Es una…', ['mesa redonda', 'conferencia', 'entrevista', 'clase'], 0, 'Confrontación ordenada de posturas.'],
          ['om', 'Formato en el que el público participa activamente en la discusión:', ['Foro', 'Simposio', 'Conferencia magistral', 'Panel cerrado'], 0, 'El foro abre la palabra al público.'],
          ['om', '¿Quién da la palabra y controla los tiempos?', ['El moderador', 'El público', 'El relator', 'El conserje'], 0, 'Coordina el evento.'],
          ['om', '¿Quién toma notas y presenta las conclusiones?', ['El relator o secretario', 'El moderador', 'El público', 'El fotógrafo'], 0, 'Registra lo dicho.'],
          ['or', 'Ordena las etapas de organizar un coloquio:', ['Planeación', 'Difusión e invitaciones', 'Ejecución', 'Seguimiento y evaluación'], null, 'Antes, durante y después.'],
          ['vf', 'En una exposición formal conviene leer todo el texto de la diapositiva sin mirar al público.', null, false, 'Mejor apoyos breves y contacto visual.'],
          ['om', '¿Qué es parte de la PLANEACIÓN?', ['Definir tema, objetivo, invitados, fecha y equipo', 'Agradecer al final', 'Escribir las conclusiones', 'Evaluar cómo salió'], 0, 'Se decide antes del evento.'],
          ['om', '¿Qué es parte del SEGUIMIENTO?', ['Compartir conclusiones y evaluar qué mejorar', 'Elegir el tema', 'Invitar ponentes', 'Reservar el auditorio'], 0, 'Lo que se hace después.', { n: 2 }],
          ['re', 'Relaciona el formato con su rasgo:', [['Simposio', 'Exposiciones sucesivas'], ['Mesa redonda', 'Posturas distintas'], ['Coloquio', 'Expertos conversan y luego pregunta el público'], ['Foro', 'Discusión abierta al público']], null, 'Formatos de exposición oral.', { n: 2 }],
          ['om', '¿Qué recurso mejora una exposición oral formal?', ['Voz clara, lenguaje formal y contacto visual', 'Hablar muy rápido para terminar', 'Usar muchas groserías para captar atención', 'Dar la espalda al público'], 0, 'La forma también comunica.']
        ]
      }
    ]
  };
})();
