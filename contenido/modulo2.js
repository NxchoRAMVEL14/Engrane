// ENGRANE · Módulo II «Construye sistemas mecatrónicos»
// Fuente: SEP · Programa de estudios de Técnico en Mecatrónica (junio 2024), Módulo II, págs. 32–53.
// S1 Dibuja planos de elementos mecánicos (64 h) · S2 Construye mecanismos (112 h) · S3 Neumática e hidráulica (96 h)
// En 'om' la respuesta correcta es el índice indicado (las opciones se barajan al mostrarse).
(function () {
  const ENG = window.ENG;


  ENG.CONTENIDO.modulo2 = {
    temas: [
      // ═════════════════════════ SUBMÓDULO 1 ═════════════════════════
      {
        id: 'm2s1t1', sub: 's1',
        nombre: 'Unidades y conversiones',
        proposito: 'Aplica los sistemas de unidades en la elaboración de dibujos 2D, realizando conversiones (S1).',
        leccion: [
          { t: 'Dos sistemas de unidades', h: `<p><b>Sistema Internacional (SI, métrico):</b> metro (m), milímetro (mm). 1 m = 1000 mm · 1 cm = 10 mm. En México es el sistema oficial (NOM-008-SCFI-2002) y los planos mecánicos se acotan en <b>mm</b>.</p>
            <p><b>Sistema inglés:</b> pulgada (in o "), pie (ft o '). 1 ft = 12 in. Lo verás en tornillos, brocas y tubería.</p>` },
          { t: 'La conversión clave', h: `<div class="formula">1 in = 25.4 mm (exacto)</div>
            <ul><li>pulgadas → mm: <b>multiplica</b> × 25.4</li><li>mm → pulgadas: <b>divide</b> ÷ 25.4</li></ul>
            <div class="ej"><p>2 in × 25.4 = <b>50.8 mm</b></p><p>127 mm ÷ 25.4 = <b>5 in</b></p><p>1 ft = 12 × 25.4 = <b>304.8 mm</b></p></div>` },
          { t: 'Fracciones de pulgada', h: `<table><tr><th>Fracción</th><th>Decimal</th><th>mm</th></tr>
            <tr><td>1/8</td><td>0.125</td><td>3.175</td></tr><tr><td>1/4</td><td>0.25</td><td>6.35</td></tr>
            <tr><td>3/8</td><td>0.375</td><td>9.525</td></tr><tr><td>1/2</td><td>0.5</td><td>12.7</td></tr><tr><td>3/4</td><td>0.75</td><td>19.05</td></tr></table>
            <div class="tip">Truco: primero pasa la fracción a decimal (divide arriba entre abajo) y luego × 25.4.</div>` },
          { t: 'Cómo se escriben las unidades', h: `<ul><li>Símbolos en minúscula: mm, m, kg (excepto los que vienen de un nombre: N de Newton, Pa de Pascal).</li>
            <li>Sin punto y sin plural: <b>25 mm</b> ✔ · 25 mms. ✘</li><li>Deja un espacio entre el número y la unidad: 25 mm.</li></ul>` }
        ],
        pares: [['1 in', '25.4 mm'], ['1 ft', '12 in'], ['1 m', '1000 mm'], ['1 cm', '10 mm'], ['1/2 in', '12.7 mm'], ['1/4 in', '6.35 mm'], ['3/4 in', '19.05 mm']],
        q: [
          ['nu', 'Convierte 2 in a milímetros.', { u: 'mm', tol: 0.005 }, 50.8, '2 × 25.4 = 50.8 mm.'],
          ['nu', 'Convierte 127 mm a pulgadas.', { u: 'in', tol: 0.005 }, 5, '127 ÷ 25.4 = 5 in.'],
          ['nu', '¿Cuántos mm mide una pieza de 3/4 in?', { u: 'mm', tol: 0.005 }, 19.05, '3/4 = 0.75 → 0.75 × 25.4 = 19.05 mm.'],
          ['om', '¿Cuál es la equivalencia exacta de 1 pulgada?', ['25.4 mm', '2.54 mm', '10 mm', '30.48 mm'], 0, '1 in = 25.4 mm (2.54 cm).'],
          ['om', 'En México, ¿en qué unidad se acotan normalmente los planos mecánicos?', ['Milímetros (mm)', 'Centímetros (cm)', 'Metros (m)', 'Pies (ft)'], 0, 'En dibujo mecánico se acota en mm y se indica en el cuadro de datos.'],
          ['om', '¿Qué norma mexicana establece el Sistema General de Unidades de Medida?', ['NOM-008-SCFI', 'NOM-017-STPS', 'ISO 1219', 'NOM-001-SEDE'], 0, 'NOM-008-SCFI-2002: Sistema General de Unidades de Medida.'],
          ['om', '¿Cuál está bien escrito?', ['25 mm', '25 mms.', '25MM', '25 Mm'], 0, 'Símbolo en minúscula, sin punto, sin plural y con espacio.'],
          ['nu', 'Una placa mide 1.5 ft. ¿Cuántas pulgadas son?', { u: 'in', tol: 0.001 }, 18, '1.5 × 12 = 18 in.'],
          ['nu', 'Convierte 300 mm a pulgadas (2 decimales).', { u: 'in', tol: 0.002 }, 11.81, '300 ÷ 25.4 = 11.81 in.'],
          ['vf', 'Para pasar de milímetros a pulgadas se multiplica por 25.4.', null, false, 'De mm a in se DIVIDE entre 25.4; de in a mm se multiplica.'],
          ['om', 'Un tornillo de 1/4 in mide aproximadamente…', ['6.35 mm', '2.5 mm', '4 mm', '25 mm'], 0, '0.25 × 25.4 = 6.35 mm.'],
          ['re', 'Relaciona cada símbolo:', [['m', 'metro'], ['mm', 'milímetro'], ['in', 'pulgada'], ['ft', 'pie']], null, 'Símbolos de longitud.'],
          ['nu', 'Una flecha mide 0.5 m. ¿Cuántos milímetros son?', { u: 'mm', tol: 0.001 }, 500, '0.5 × 1000 = 500 mm.'],
          ['nu', 'Convierte 3/8 in a milímetros.', { u: 'mm', tol: 0.003 }, 9.525, '3/8 = 0.375 → 0.375 × 25.4 = 9.525 mm.', { n: 2 }],
          ['nu', 'Un tubo de 1 ft, ¿cuántos mm mide?', { u: 'mm', tol: 0.002 }, 304.8, '12 × 25.4 = 304.8 mm.', { n: 2 }]
        ]
      },
      {
        id: 'm2s1t2', sub: 's1',
        nombre: 'Líneas, escalas y cotas',
        proposito: 'Representa piezas mecánicas en un plano aplicando métodos y técnicas de dibujo (S1).',
        leccion: [
          { t: 'Tipos de línea', fig: 'lineas', h: `<p>Cada línea tiene un significado. Si usas la equivocada, quien fabrica lee otra cosa.</p>` },
          { t: 'Escalas', h: `<p><b>Escala = tamaño del dibujo : tamaño real</b></p>
            <ul><li><b>1:1</b> natural · <b>1:2, 1:5, 1:10</b> reducción (pieza grande) · <b>2:1, 5:1</b> ampliación (pieza chica)</li></ul>
            <div class="ej"><p>Escala 1:2 → una pieza de 80 mm se <b>dibuja</b> de 40 mm.</p><p>Escala 2:1 → 15 mm reales se dibujan de 30 mm.</p></div>` },
          { t: 'Partes de una cota', fig: 'cotas', h: `<ul><li><b>Líneas auxiliares</b>: salen de la pieza (finas).</li><li><b>Línea de cota</b>: con flechas en los extremos (fina).</li><li><b>Cifra</b>: encima de la línea, centrada. Es la medida <b>REAL</b>.</li><li>Símbolos: <b>Ø</b> diámetro · <b>R</b> radio.</li></ul>` },
          { t: 'Reglas de oro para acotar', h: `<ol><li>No repitas cotas.</li><li>No acotes sobre aristas ocultas.</li><li>Las cotas cortas van más cerca de la pieza y las largas más afuera (así no se cruzan).</li><li>Las unidades (mm) se indican una vez en el cuadro de datos.</li></ol>` }
        ],
        pares: [['Continua gruesa', 'Aristas visibles'], ['Discontinua', 'Aristas ocultas'], ['Trazo y punto', 'Ejes y centros'], ['Continua fina', 'Líneas de cota'], ['Ø', 'Diámetro'], ['R', 'Radio'], ['1:2', 'Reducción'], ['2:1', 'Ampliación']],
        q: [
          ['om', '¿Qué línea representa una arista oculta?', ['Discontinua (trazos)', 'Continua gruesa', 'Trazo y punto', 'Continua fina'], 0, 'Lo que no se ve desde esa vista se dibuja con trazos.'],
          ['om', 'El eje de simetría o el centro de un agujero se dibuja con línea…', ['de trazo y punto', 'continua gruesa', 'discontinua', 'ondulada'], 0, 'Trazo y punto (fina) para ejes y centros.'],
          ['om', 'Una escala 1:5 significa que…', ['el dibujo es 5 veces más pequeño que la pieza', 'el dibujo es 5 veces más grande', 'cada mm del dibujo es 1 mm real', 'la pieza mide 5 mm'], 0, 'Primero va el dibujo y luego lo real: 1 en el dibujo = 5 en la realidad.'],
          ['nu', 'En escala 1:2, ¿de cuántos mm se DIBUJA una pieza que mide 80 mm?', { u: 'mm', tol: 0.001 }, 40, '80 ÷ 2 = 40 mm en el papel.'],
          ['nu', 'En escala 2:1, ¿de cuántos mm se dibuja una pieza de 15 mm?', { u: 'mm', tol: 0.001 }, 30, '15 × 2 = 30 mm en el papel.'],
          ['om', 'Plano a escala 1:2. Una cota dice 60. ¿Cuánto mide la pieza real?', ['60 mm', '30 mm', '120 mm', '2 mm'], 0, 'La cifra de cota SIEMPRE es la medida real, sin importar la escala.', { n: 2 }],
          ['om', 'El símbolo Ø antes de una cota indica…', ['diámetro', 'radio', 'ángulo', 'espesor'], 0, 'Ø = diámetro; R = radio.'],
          ['om', 'Para que un tornillo de 8 mm se vea grande y claro en el plano, usarías escala…', ['5:1', '1:5', '1:1', '1:10'], 0, 'Para piezas chicas se amplía: 2:1, 5:1.'],
          ['vf', 'Las líneas de cota se dibujan con línea continua gruesa.', null, false, 'Cotas y auxiliares van con línea continua FINA; la gruesa es para contornos.'],
          ['re', 'Relaciona cada línea con su uso:', [['Continua gruesa', 'Contornos visibles'], ['Discontinua', 'Aristas ocultas'], ['Trazo y punto', 'Ejes de simetría'], ['Continua fina', 'Cotas y rayado']], null, 'Tipos de línea en dibujo técnico.'],
          ['om', '¿Dónde va la cifra de cota?', ['Encima de la línea de cota, centrada', 'Dentro de la pieza siempre', 'En el cuadro de datos', 'Al final de la línea auxiliar'], 0, 'La cifra va sobre la línea de cota, centrada.'],
          ['vf', 'Es buena práctica repetir la misma cota en dos vistas para que no se pierda.', null, false, 'Repetir cotas confunde y puede causar errores si una cambia.'],
          ['om', 'Con varias cotas paralelas, las más cortas van…', ['más cerca de la pieza', 'más lejos de la pieza', 'dentro de la pieza', 'en otra hoja'], 0, 'Así las líneas no se cruzan.', { n: 2 }],
          ['nu', 'Un dibujo a escala 1:10 mide 35 mm en el papel. ¿Cuánto mide la pieza real?', { u: 'mm', tol: 0.001 }, 350, '35 × 10 = 350 mm.', { n: 2 }]
        ]
      },
      {
        id: 'm2s1t3', sub: 's1',
        nombre: 'Isométrico y vistas ortogonales',
        proposito: 'Elabora dibujo isométrico y proyección de vistas ortogonales empleando procedimientos de dibujo técnico (S1).',
        leccion: [
          { t: 'Dibujo isométrico', fig: 'iso-vistas', h: `<ul><li>Muestra la pieza en 3D sobre el papel.</li><li>Los tres ejes forman <b>120°</b> entre sí.</li><li>Las aristas «horizontales» se trazan a <b>30°</b> de la horizontal; las verticales siguen verticales.</li><li>Se mide a escala real sobre los ejes.</li></ul>` },
          { t: 'Vistas ortogonales', h: `<table><tr><th>Vista</th><th>Nombre</th><th>Muestra</th></tr>
            <tr><td>Frontal</td><td>Alzado</td><td>ancho y alto</td></tr><tr><td>Superior</td><td>Planta</td><td>ancho y profundidad</td></tr>
            <tr><td>Lateral</td><td>Perfil</td><td>profundidad y alto</td></tr></table>
            <p>El <b>alzado</b> es la vista que da más información de la forma. Casi siempre bastan <b>3 vistas</b> (a veces 2).</p>` },
          { t: 'Sistema europeo vs americano', fig: 'sistemas-vistas', h: `<ul><li><b>Europeo</b> (1er cuadrante, ISO-E): planta <b>debajo</b> del alzado; lateral izquierda a la derecha.</li><li><b>Americano</b> (3er cuadrante, ISO-A): planta <b>arriba</b> del alzado; lateral derecha a la derecha.</li></ul>
            <div class="tip">El sistema que usa el plano se indica en el cuadro de datos con su símbolo (un cono truncado).</div>` },
          { t: 'Cómo trazar las vistas', h: `<ol><li>Elige el alzado.</li><li>Dibuja cajas con las medidas generales.</li><li>Proyecta con líneas finas: alzado y planta comparten el <b>ancho</b>; alzado y lateral comparten el <b>alto</b>.</li><li>Remarca visibles (gruesa) y ocultas (trazos).</li><li>Agrega ejes y acota.</li></ol>` }
        ],
        pares: [['Alzado', 'Vista frontal'], ['Planta', 'Vista superior'], ['Perfil', 'Vista lateral'], ['Isométrico', 'Ejes a 120°'], ['Europeo', '1er cuadrante'], ['Americano', '3er cuadrante']],
        q: [
          ['om', 'En isométrico, las aristas horizontales se trazan a…', ['30° respecto a la horizontal', '45° respecto a la horizontal', '15° respecto a la horizontal', '90° respecto a la horizontal'], 0, 'En isométrico se usan líneas a 30°.'],
          ['om', 'En isométrico, los tres ejes forman entre sí ángulos de…', ['120°', '90°', '60°', '45°'], 0, '3 × 120° = 360°.'],
          ['om', '¿Qué dos medidas muestra el ALZADO (vista frontal)?', ['Ancho y alto', 'Ancho y profundidad', 'Profundidad y alto', 'Solo el alto'], 0, 'Desde el frente ves ancho y alto.'],
          ['om', '¿Qué dos medidas muestra la PLANTA (vista superior)?', ['Ancho y profundidad', 'Ancho y alto', 'Profundidad y alto', 'Solo la profundidad'], 0, 'Desde arriba ves ancho y profundidad.'],
          ['om', 'En el sistema EUROPEO, la planta se coloca…', ['debajo del alzado', 'arriba del alzado', 'a la izquierda del alzado', 'en otra hoja'], 0, 'Europeo (1er cuadrante): planta abajo.'],
          ['om', 'En el sistema AMERICANO, la planta se coloca…', ['arriba del alzado', 'debajo del alzado', 'a la derecha del alzado', 'detrás del alzado'], 0, 'Americano (3er cuadrante): planta arriba.'],
          ['om', '¿Qué vista conviene elegir como alzado?', ['La que muestra más detalles de la forma', 'La más pequeña', 'Siempre la de arriba', 'La que tenga más aristas ocultas'], 0, 'El alzado debe dar la mayor información.'],
          ['vf', 'El sistema europeo también se conoce como proyección en el primer cuadrante (primer diedro).', null, true, 'Europeo = 1er cuadrante; americano = 3er cuadrante.'],
          ['om', 'Observa la pieza. En la vista lateral izquierda aparece una línea horizontal a media altura. ¿Qué es?', ['La arista donde termina la parte baja y empieza el escalón alto', 'Un eje de simetría', 'Una arista oculta', 'Una cota'], 0, 'Desde la izquierda ves la cara baja y, detrás y arriba, el escalón: la línea separa ambas superficies.', { fig: 'iso-vistas', n: 2 }],
          ['om', 'Si una arista NO se ve desde la dirección de la vista, se dibuja con…', ['línea discontinua', 'línea gruesa', 'trazo y punto', 'no se dibuja nunca'], 0, 'Aristas ocultas = trazos.'],
          ['vf', 'El alzado y la vista lateral comparten la misma altura.', null, true, 'Por eso se alinean horizontalmente.'],
          ['om', '¿Cuántas vistas bastan normalmente para definir una pieza sencilla?', ['3 (a veces 2)', 'Siempre 6', '1', 'Siempre 4'], 0, 'Se dibujan solo las vistas necesarias.'],
          ['re', 'Relaciona la vista con las medidas que muestra:', [['Alzado', 'Ancho y alto'], ['Planta', 'Ancho y profundidad'], ['Lateral', 'Profundidad y alto']], null, 'Cada vista muestra dos dimensiones.'],
          ['om', '¿Dónde se indica qué sistema de proyección usa un plano?', ['En el cuadro de datos, con su símbolo', 'En la vista lateral', 'No se indica', 'En la cota más grande'], 0, 'Va en el cuadro de datos.', { n: 2 }]
        ]
      },
      {
        id: 'm2s1t4', sub: 's1',
        nombre: 'Croquis 2D en CAD (FreeCAD)',
        proposito: 'Esboza elementos mecánicos en 2D utilizando software de CAD, identificando sus funciones y comandos (S1).',
        leccion: [
          { t: '¿Qué es CAD?', h: `<p>Diseño asistido por computadora. En el plantel usamos <b>FreeCAD</b> (libre y gratuito).</p>
            <p>Flujo: <b>Part Design</b> → <b>Body</b> (cuerpo) → <b>Sketch</b> (croquis 2D en un plano) → operación 3D.</p>
            <div class="tip">Para extruir, el croquis debe estar <b>cerrado</b>: sin huecos entre líneas.</div>` },
          { t: 'Restricciones geométricas', h: `<table><tr><th>Restricción</th><th>Qué hace</th></tr>
            <tr><td>Coincidente</td><td>Une dos puntos</td></tr><tr><td>Horizontal / Vertical</td><td>Alinea una línea</td></tr>
            <tr><td>Paralela / Perpendicular</td><td>Mismo sentido / 90°</td></tr><tr><td>Tangente</td><td>Arco que toca sin esquina</td></tr>
            <tr><td>Igual</td><td>Mismas medidas</td></tr><tr><td>Simétrica</td><td>Espejo respecto a un eje</td></tr></table>
            <p>Y de <b>cota</b>: distancia, longitud, radio/diámetro, ángulo.</p>` },
          { t: 'Grados de libertad (GDL)', h: `<p>Cuánto se puede mover algo todavía: punto libre = <b>2</b> GDL · línea = <b>4</b> · círculo = <b>3</b> (centro x, y y radio).</p>
            <p>Cada restricción quita GDL. Con <b>0 GDL</b> el croquis está <b>completamente restringido</b> (FreeCAD lo avisa y cambia el color).</p>
            <ul><li><b>Redundante</b>: sobra una restricción.</li><li><b>Conflicto</b>: dos restricciones se contradicen.</li></ul>` },
          { t: 'Buenas prácticas', h: `<ol><li>Dibuja la forma aproximada.</li><li>Pon primero restricciones geométricas.</li><li>Al final, las cotas.</li><li>Usa <b>geometría de construcción</b> para guías y ejes: no forma parte del sólido.</li></ol>` }
        ],
        pares: [['Coincidente', 'Une dos puntos'], ['Horizontal', 'Alinea con el eje X'], ['Tangente', 'Toca sin esquina'], ['Igual', 'Mismas medidas'], ['Simétrica', 'Espejo de un eje'], ['Perpendicular', 'Forma 90°']],
        q: [
          ['om', 'Para que un croquis pueda volverse sólido con una extrusión, debe estar…', ['cerrado (sin huecos)', 'abierto', 'en 3D', 'sin restricciones'], 0, 'Un perfil abierto no encierra un área.'],
          ['om', '¿Cuántos grados de libertad tiene un punto libre en un croquis 2D?', ['2', '1', '3', '4'], 0, 'Se puede mover en X y en Y.'],
          ['om', '¿Cuántos grados de libertad tiene un círculo libre?', ['3 (centro x, centro y y radio)', '2', '4', '1'], 0, 'Posición del centro (2) + tamaño (1).'],
          ['om', 'Un croquis con 0 grados de libertad está…', ['completamente restringido', 'roto', 'sin cotas', 'en conflicto'], 0, 'Ya no se puede mover nada: está totalmente definido.'],
          ['om', '¿Qué restricción usas para que dos líneas midan lo mismo?', ['Igual', 'Coincidente', 'Paralela', 'Tangente'], 0, 'Igual = mismas medidas.'],
          ['om', '¿Qué restricción une el final de una línea con el inicio de otra?', ['Coincidente', 'Perpendicular', 'Simétrica', 'Horizontal'], 0, 'Coincidente une puntos.'],
          ['om', 'Para que un arco toque una línea suavemente, sin esquina, usas…', ['Tangente', 'Perpendicular', 'Igual', 'Vertical'], 0, 'Tangente = transición suave.'],
          ['vf', 'La geometría de construcción forma parte del sólido final.', null, false, 'Solo sirve de guía.'],
          ['om', 'FreeCAD avisa «restricción redundante». ¿Qué significa?', ['Sobra una restricción: ya estaba definida por otras', 'Falta una cota', 'El croquis está abierto', 'Hay que reiniciar FreeCAD'], 0, 'Quita la restricción que sobra.', { n: 2 }],
          ['om', '¿En qué banco de trabajo de FreeCAD se modelan piezas a partir de croquis?', ['Part Design', 'TechDraw', 'Spreadsheet', 'Start'], 0, 'Part Design: cuerpo + croquis + operaciones.', { n: 2 }],
          ['or', 'Ordena el flujo para modelar una pieza en FreeCAD:', ['Crear un cuerpo (Body)', 'Crear un croquis en un plano', 'Dibujar y restringir el perfil', 'Aplicar una operación 3D'], null, 'Body → Sketch → restringir → operación.'],
          ['nu', 'Una línea libre tiene 4 GDL. Le pones restricción horizontal y una cota de longitud. ¿Cuántos GDL le quedan?', { u: 'GDL', tol: 0 }, 2, '4 − 1 − 1 = 2 (todavía se puede mover de lugar).', { n: 2 }],
          ['vf', 'Es mejor poner primero las cotas y al final dibujar la forma.', null, false, 'Primero forma, luego restricciones geométricas y al final cotas.'],
          ['re', 'Relaciona la cota con lo que mide:', [['Distancia', 'Longitud entre puntos'], ['Radio', 'Tamaño de un arco'], ['Ángulo', 'Abertura entre líneas'], ['Diámetro', 'Ancho de un círculo']], null, 'Restricciones de cota.']
        ]
      },
      {
        id: 'm2s1t5', sub: 's1',
        nombre: 'Modelado 3D: extruir, revolución, vaciado',
        proposito: 'Aplica funciones (extruir, revolución, vaciado, entre otras) para construir piezas en 3D y determina el método de elaboración (S1).',
        leccion: [
          { t: 'Operaciones que AGREGAN material', h: `<ul><li><b>Extrusión / protrusión (Pad)</b>: estira un croquis cerrado una distancia.</li><li><b>Revolución (Revolution)</b>: gira un croquis alrededor de un eje → flechas, poleas, bujes.</li></ul>` },
          { t: 'Operaciones que QUITAN material', h: `<ul><li><b>Vaciado (Pocket)</b>: extrusión que corta.</li><li><b>Ranura (Groove)</b>: revolución que corta (ej. canal de una polea).</li><li><b>Agujero (Hole)</b>: barrenos con diámetro, profundidad y hasta rosca.</li></ul>` },
          { t: 'Acabados y repeticiones', h: `<ul><li><b>Redondeo (Fillet)</b>: arista viva → curva.</li><li><b>Chaflán (Chamfer)</b>: arista cortada en ángulo (bisel).</li><li><b>Patrón lineal / polar</b>: repite en fila o en círculo.</li><li><b>Simetría (Mirrored)</b>: copia espejo.</li></ul>` },
          { t: '¿Qué método elijo?', h: `<table><tr><th>Pieza</th><th>Método</th></tr>
            <tr><td>Placa con 4 barrenos</td><td>Extrusión + agujero + patrón</td></tr><tr><td>Polea</td><td>Revolución + ranura</td></tr>
            <tr><td>Eslabón</td><td>Extrusión del contorno + agujeros</td></tr><tr><td>Brida con 6 barrenos</td><td>Extrusión + agujero + patrón polar</td></tr></table>
            <div class="tip">🌱 Impacto ecológico: diseña con el material justo, evita desperdicio y simula antes de fabricar.</div>` }
        ],
        pares: [['Extrusión (Pad)', 'Agrega material estirando'], ['Vaciado (Pocket)', 'Quita material estirando'], ['Revolución', 'Gira un perfil en un eje'], ['Ranura (Groove)', 'Quita material girando'], ['Redondeo (Fillet)', 'Suaviza aristas'], ['Chaflán', 'Bisel en aristas'], ['Patrón polar', 'Repite en círculo']],
        q: [
          ['om', 'Para modelar una flecha (eje) con varios diámetros, lo más práctico es…', ['Revolución de un perfil', 'Extrusión de un cuadrado', 'Vaciado', 'Chaflán'], 0, 'Las piezas redondas salen de girar un perfil.'],
          ['om', '¿Qué operación QUITA material siguiendo un croquis?', ['Vaciado (Pocket)', 'Extrusión (Pad)', 'Revolución', 'Redondeo'], 0, 'Pocket = vaciado.'],
          ['om', 'Para repetir 6 agujeros alrededor de una brida circular usas…', ['Patrón polar', 'Patrón lineal', 'Simetría', 'Chaflán'], 0, 'Polar = en círculo.'],
          ['om', 'Una placa rectangular de 5 mm de espesor se hace con…', ['Extrusión de 5 mm de un rectángulo', 'Revolución', 'Ranura', 'Redondeo'], 0, 'Perfil constante → extrusión.'],
          ['om', '¿Qué hace un redondeo (Fillet)?', ['Convierte una arista viva en curva', 'Corta en ángulo una arista', 'Agrega un agujero', 'Copia la pieza'], 0, 'Fillet = redondeo.'],
          ['vf', 'El chaflán corta la arista en ángulo (bisel).', null, true, 'Chamfer = chaflán.'],
          ['om', 'Para hacer el canal donde va la banda de una polea usas…', ['Ranura (Groove)', 'Extrusión', 'Patrón lineal', 'Simetría'], 0, 'Groove quita material girando.', { n: 2 }],
          ['om', '¿Qué necesita una revolución además del croquis?', ['Un eje de giro', 'Un patrón', 'Una cota de espesor', 'Un segundo cuerpo'], 0, 'El perfil gira alrededor de un eje.'],
          ['vf', 'Diseñar con menos material y simular antes de fabricar ayuda a reducir el impacto ecológico.', null, true, 'Menos desperdicio y menos piezas fallidas.'],
          ['or', 'Ordena para hacer una placa con barrenos:', ['Croquis del rectángulo', 'Extrusión (Pad)', 'Agujero (Hole) en una esquina', 'Patrón para repetir los agujeros'], null, 'Primero el cuerpo, luego el agujero y al final repetirlo.', { n: 2 }],
          ['om', 'Para que un lado de la pieza sea copia espejo del otro usas…', ['Simetría (Mirrored)', 'Patrón polar', 'Revolución', 'Vaciado'], 0, 'Mirrored = simetría.'],
          ['re', 'Relaciona el comando de FreeCAD con su nombre en español:', [['Pad', 'Extrusión'], ['Pocket', 'Vaciado'], ['Revolution', 'Revolución'], ['Fillet', 'Redondeo']], null, 'Comandos de Part Design.'],
          ['om', 'Un eslabón (barra con un agujero en cada extremo) se modela mejor con…', ['Extrusión del contorno y agujeros', 'Revolución', 'Ranura', 'Solo un patrón polar'], 0, 'Perfil plano constante → extrusión.'],
          ['vf', 'La operación Agujero (Hole) permite definir diámetro, profundidad e incluso rosca.', null, true, 'Por eso es mejor que un vaciado circular para barrenos.', { n: 2 }]
        ]
      },
      {
        id: 'm2s1t6', sub: 's1',
        nombre: 'El plano y el cuadro de datos',
        proposito: 'Modela piezas en un plano con sus elementos: vistas, cotas, cuadro de datos, escala y material (S1).',
        leccion: [
          { t: 'Del modelo 3D al plano', h: `<p>En FreeCAD, el banco <b>TechDraw</b> genera las vistas a partir del modelo. Si cambias el modelo, las vistas se actualizan. Después agregas cotas y llenas el cuadro de datos.</p>` },
          { t: 'Cuadro de datos (cajetín)', h: `<p>Va <b>abajo a la derecha</b> del formato. Contiene:</p>
            <ul><li>Nombre de la pieza y número de plano</li><li>Escala y unidades (mm)</li><li>Material</li><li>Sistema de proyección</li><li>Dibujó / revisó / fecha / institución</li></ul>` },
          { t: 'Formatos de hoja', h: `<table><tr><th>Formato</th><th>Medidas</th></tr><tr><td>A4</td><td>210 × 297 mm</td></tr><tr><td>A3</td><td>297 × 420 mm</td></tr><tr><td>Carta (no ISO)</td><td>216 × 279 mm</td></tr></table>` },
          { t: 'Checklist de un buen plano', h: `<ul><li>✔ Vistas correctas y alineadas</li><li>✔ Todas las cotas necesarias, sin repetir</li><li>✔ Tipos de línea correctos</li><li>✔ Escala, material y nombre</li><li>✔ Limpio y legible</li></ul>
            <div class="tip">Quien fabrica solo tiene tu plano: debe poder hacer la pieza sin preguntarte nada.</div>` }
        ],
        pares: [['A4', '210 × 297 mm'], ['A3', '297 × 420 mm'], ['Cuadro de datos', 'Abajo a la derecha'], ['TechDraw', 'Planos en FreeCAD'], ['Escala', 'Dibujo : real'], ['Material', 'Ej. aluminio 6061']],
        q: [
          ['om', '¿Dónde se ubica normalmente el cuadro de datos?', ['Abajo a la derecha del formato', 'Arriba a la izquierda', 'En el centro', 'En la parte de atrás'], 0, 'Es su lugar estándar.'],
          ['om', '¿Cuál NO va en el cuadro de datos?', ['La calificación del examen', 'La escala', 'El material', 'El nombre de la pieza'], 0, 'El cuadro lleva datos técnicos de la pieza.'],
          ['om', '¿Qué banco de FreeCAD hace planos 2D a partir del modelo 3D?', ['TechDraw', 'Sketcher', 'Part Design', 'Mesh'], 0, 'TechDraw = dibujo técnico.'],
          ['om', 'Medidas de una hoja A4:', ['210 × 297 mm', '297 × 420 mm', '216 × 279 mm', '100 × 150 mm'], 0, '216 × 279 mm es tamaño carta, no A4.'],
          ['vf', 'Si modificas el modelo 3D en FreeCAD, las vistas de TechDraw se pueden actualizar.', null, true, 'Las vistas están ligadas al modelo.'],
          ['om', '¿Por qué es importante indicar el material?', ['Para que quien fabrique use el material correcto', 'Para que se vea bonito', 'No es importante', 'Para saber la escala'], 0, 'El material cambia el proceso, el costo y la resistencia.'],
          ['re', 'Relaciona el dato con un ejemplo:', [['Escala', '1:2'], ['Unidades', 'mm'], ['Material', 'Acrílico'], ['Proyección', 'Sistema europeo']], null, 'Datos típicos del cajetín.'],
          ['vf', 'Un plano bien hecho permite fabricar la pieza sin preguntarle nada al diseñador.', null, true, 'Ese es el objetivo del plano.'],
          ['om', 'Una hoja A3 mide…', ['297 × 420 mm', '210 × 297 mm', '420 × 594 mm', '148 × 210 mm'], 0, 'A3 es el doble de A4.', { n: 2 }],
          ['om', 'En el plano de un ensamble, la tabla con número, nombre y cantidad de cada pieza se llama…', ['Lista de partes (o de materiales)', 'Cuadro de escalas', 'Hoja de cálculo', 'Vista auxiliar'], 0, 'También se conoce como BOM.', { n: 2 }],
          ['or', 'Ordena el proceso para entregar un plano:', ['Modelar la pieza en 3D', 'Insertar vistas en TechDraw', 'Agregar cotas', 'Llenar el cuadro de datos y revisar'], null, 'Modelo → vistas → cotas → cajetín.'],
          ['om', '¿Qué dato del cuadro dice cuántas veces más chico o grande está el dibujo?', ['La escala', 'El número de plano', 'La fecha', 'El material'], 0, 'Escala = dibujo : real.']
        ]
      },
      // ═════════════════════════ SUBMÓDULO 2 ═════════════════════════
      {
        id: 'm2s2t1', sub: 's2',
        nombre: 'Ensambles y vista explosionada',
        proposito: 'Ensambla piezas prediseñadas con restricciones (coincidente, concéntrica, tangente, paralela, ortogonal) y representa el ensamble en vista explosionada (S2).',
        leccion: [
          { t: '¿Qué es un ensamble?', h: `<p>Unir piezas en CAD con <b>restricciones</b> que imitan cómo se unen en la realidad. La primera pieza (base) se <b>fija</b>.</p>
            <p>En FreeCAD 1.0 el banco <b>Assembly</b> usa «uniones» (joints): fija, de giro (revoluta), deslizante, cilíndrica…</p>` },
          { t: 'Restricciones de ensamble', h: `<table><tr><th>Restricción</th><th>Ejemplo</th></tr>
            <tr><td>Coincidente</td><td>Dos caras planas juntas</td></tr><tr><td>Concéntrica</td><td>Perno dentro de un agujero</td></tr>
            <tr><td>Tangente</td><td>Rodillo sobre una superficie</td></tr><tr><td>Paralela</td><td>Dos caras en el mismo sentido</td></tr>
            <tr><td>Perpendicular (ortogonal)</td><td>Caras a 90°</td></tr></table>` },
          { t: 'Grados de libertad en 3D', h: `<p>Una pieza libre tiene <b>6 GDL</b>: 3 traslaciones (X, Y, Z) + 3 rotaciones.</p>
            <div class="ej"><p>Perno <b>concéntrico</b> a un agujero → todavía gira y se desliza (2 GDL).</p><p>+ <b>coincidente</b> en una cara → solo gira (1 GDL): ¡una bisagra!</p></div>` },
          { t: 'Simulación y vista explosionada', h: `<ul><li><b>Simulación</b>: mueve el ensamble para detectar <b>colisiones</b> (piezas que chocan) antes de fabricar. Ahorra material y dinero.</li>
            <li><b>Vista explosionada</b>: separa las piezas en la dirección en que se arman para mostrar el orden de ensamble. Lleva <b>globos</b> (números) y <b>lista de partes</b>.</li></ul>` }
        ],
        pares: [['Concéntrica', 'Ejes alineados'], ['Coincidente', 'Caras juntas'], ['Tangente', 'Curva que toca'], ['Fija', 'Pieza base sin mover'], ['Vista explosionada', 'Piezas separadas'], ['Colisión', 'Piezas que chocan']],
        q: [
          ['om', '¿Cuántos grados de libertad tiene una pieza libre en el espacio?', ['6', '3', '2', '12'], 0, '3 traslaciones + 3 rotaciones.'],
          ['om', 'Para meter un perno en un agujero, la restricción principal es…', ['Concéntrica', 'Tangente', 'Paralela', 'Simétrica'], 0, 'Alinea los ejes.'],
          ['om', 'Para que dos caras planas queden pegadas usas…', ['Coincidente', 'Concéntrica', 'Tangente', 'Ángulo'], 0, 'Coincidente junta caras o puntos.'],
          ['om', '¿Para qué sirve una vista explosionada?', ['Para mostrar cómo se arman las piezas y en qué orden', 'Para ver la pieza por dentro', 'Para calcular la fuerza', 'Para pintar la pieza'], 0, 'Es una guía de armado.'],
          ['vf', 'Simular el movimiento del ensamble ayuda a detectar colisiones antes de fabricar.', null, true, 'Mejor descubrirlo en la computadora que en el taller.'],
          ['om', 'Un perno concéntrico en un agujero, sin más restricciones, todavía puede…', ['girar y deslizarse a lo largo del eje', 'nada, ya está fijo', 'solo moverse en X', 'deformarse'], 0, 'Quedan 2 GDL.', { n: 2 }],
          ['om', '¿Qué pieza conviene fijar primero en un ensamble?', ['La base o bancada', 'El tornillo más pequeño', 'La última pieza', 'Ninguna'], 0, 'Todo se arma sobre la base.'],
          ['om', 'En la vista explosionada, los números que identifican cada pieza se llaman…', ['Globos', 'Cotas', 'Ejes', 'Escalas'], 0, 'Cada globo corresponde a una fila de la lista de partes.', { n: 2 }],
          ['re', 'Relaciona la restricción con lo que hace:', [['Coincidente', 'Caras juntas'], ['Concéntrica', 'Ejes alineados'], ['Paralela', 'Mismo sentido sin tocarse'], ['Perpendicular', 'Forman 90°']], null, 'Restricciones de ensamble.'],
          ['vf', 'Los 6 grados de libertad de una pieza son 3 traslaciones y 3 rotaciones.', null, true, 'Moverse en X, Y, Z y girar en X, Y, Z.'],
          ['om', 'Una bisagra (unión de giro) deja libre…', ['1 grado de libertad: el giro', '6 grados', '0 grados', '3 traslaciones'], 0, 'Solo puede girar sobre su eje.', { n: 2 }],
          ['om', '¿Qué ventaja ecológica tiene detectar colisiones en la computadora?', ['Evita fabricar piezas que no sirven y desperdiciar material', 'Ninguna', 'Hace la pieza más pesada', 'Gasta más material'], 0, 'Menos piezas fallidas = menos desperdicio.']
        ]
      },
      {
        id: 'm2s2t2', sub: 's2',
        nombre: 'Elementos de un mecanismo',
        proposito: 'Clasifica los elementos de los mecanismos y diseña sus piezas: base, eslabón motriz, eslabón conector y eslabón conducido (S2).',
        leccion: [
          { t: 'Eslabones', fig: 'cuatro-barras', h: `<ul><li><b>Base / bancada</b>: fija, sostiene todo.</li><li><b>Motriz</b>: recibe el movimiento (motor o mano) → entrada.</li><li><b>Conector / acoplador</b>: transmite (ej. biela).</li><li><b>Conducido</b>: entrega el movimiento y hace el trabajo → salida.</li></ul>` },
          { t: 'Pares cinemáticos (pares de enlace)', h: `<table><tr><th>Par</th><th>Ejemplo</th><th>GDL</th></tr>
            <tr><td>Rotación</td><td>Pasador, bisagra</td><td>1</td></tr><tr><td>Prismático</td><td>Corredera en guía</td><td>1</td></tr>
            <tr><td>Cilíndrico</td><td>Eje que gira y se desliza</td><td>2</td></tr><tr><td>Esférico</td><td>Rótula</td><td>3</td></tr></table>
            <p><b>Inferiores</b>: contacto en superficie. <b>Superiores</b>: contacto en línea o punto (levas, engranes).</p>` },
          { t: 'Tipos de movimiento', h: `<ul><li><b>Rotatorio</b>: gira (rueda).</li><li><b>Lineal</b>: en línea recta (banda transportadora).</li><li><b>Alternativo</b>: va y viene en línea (pistón).</li><li><b>Oscilante</b>: va y viene en arco (péndulo, columpio).</li></ul>` },
          { t: 'Mecanismo de cuatro barras', h: `<p><b>Manivela</b> (gira completa) · <b>acoplador</b> · <b>balancín</b> (oscila) · <b>bancada</b>.</p>
            <p>Lo encuentras en limpiaparabrisas, pinzas, garras y brazos articulados… ¡como en sus proyectos!</p>` }
        ],
        pares: [['Bancada', 'Eslabón fijo'], ['Motriz', 'Recibe el movimiento'], ['Conector', 'Transmite (biela)'], ['Conducido', 'Entrega el movimiento'], ['Rótula', 'Par esférico'], ['Corredera', 'Par prismático'], ['Pasador', 'Par de rotación']],
        q: [
          ['om', 'El eslabón que recibe el movimiento del motor se llama…', ['eslabón motriz', 'eslabón conducido', 'bancada', 'acoplador'], 0, 'Motriz = de entrada.'],
          ['om', 'El eslabón que NO se mueve y sostiene al mecanismo es la…', ['base o bancada', 'manivela', 'biela', 'corredera'], 0, 'Bancada = eslabón fijo.'],
          ['om', 'En un mecanismo de cuatro barras, el eslabón que da vueltas completas es la…', ['manivela', 'bancada', 'balancín', 'corredera'], 0, 'El balancín solo oscila.'],
          ['om', '¿Qué hace el acoplador en este mecanismo?', ['Transmite el movimiento de la manivela al balancín', 'Fija el mecanismo', 'Genera la energía', 'Frena el mecanismo'], 0, 'Es el eslabón conector.', { fig: 'cuatro-barras', n: 2 }],
          ['om', 'Un pasador que une dos eslabones y solo permite girar forma un par…', ['de rotación (1 GDL)', 'prismático', 'esférico (3 GDL)', 'fijo'], 0, 'Par de rotación.'],
          ['om', 'La rótula de un brazo (como la de la suspensión de un auto) es un par…', ['esférico', 'prismático', 'de rotación', 'helicoidal'], 0, 'Permite girar en tres ejes.'],
          ['om', 'Movimiento que va y viene en línea recta (como un pistón):', ['Alternativo', 'Rotatorio', 'Oscilante', 'Circular continuo'], 0, 'Alternativo = vaivén rectilíneo.'],
          ['om', 'El movimiento de un columpio o péndulo es…', ['Oscilante', 'Rotatorio', 'Lineal continuo', 'Alternativo rectilíneo'], 0, 'Va y viene en arco.'],
          ['vf', 'Los engranes y las levas forman pares superiores porque se tocan en una línea o en un punto.', null, true, 'Superior = contacto en línea o punto.', { n: 2 }],
          ['re', 'Relaciona el movimiento con un ejemplo:', [['Rotatorio', 'Rueda que gira'], ['Lineal', 'Banda transportadora'], ['Alternativo', 'Pistón'], ['Oscilante', 'Péndulo']], null, 'Tipos de movimiento.'],
          ['om', 'En una garra de robot, el eslabón conducido es el que…', ['abre y cierra los dedos (hace el trabajo)', 'está atornillado a la mesa', 'recibe la corriente', 'mide la presión'], 0, 'El conducido entrega el movimiento útil.', { n: 2 }],
          ['vf', 'Una corredera que se desliza en una guía forma un par prismático de 1 grado de libertad.', null, true, 'Solo se desliza en una dirección.'],
          ['or', 'Ordena el recorrido del movimiento:', ['Motor', 'Eslabón motriz', 'Eslabón conector', 'Eslabón conducido'], null, 'Entrada → transmisión → salida.']
        ]
      },
      {
        id: 'm2s2t3', sub: 's2',
        nombre: 'Mecanismos de transmisión',
        proposito: 'Arma mecanismos de sistemas mecatrónicos analizando su funcionamiento y movimiento (S2).',
        leccion: [
          { t: 'Palancas', fig: 'palancas', h: `<ul><li><b>1er género</b>: fulcro en medio → balancín, tijeras, pinzas de corte.</li><li><b>2º género</b>: resistencia en medio → carretilla, cascanueces, destapador.</li><li><b>3er género</b>: potencia en medio → pinzas de depilar, caña de pescar, antebrazo.</li></ul>
            <div class="formula">P × dP = R × dR</div>` },
          { t: 'Engranes', fig: 'engranes', h: `<div class="formula">n₁ · Z₁ = n₂ · Z₂</div>
            <ul><li>Chico mueve a grande → <b>baja la velocidad</b> y <b>sube el torque</b> (fuerza de giro).</li><li>Engranes externos giran en <b>sentido contrario</b>.</li><li>Un engrane <b>loco</b> (intermedio) cambia el sentido sin cambiar la relación.</li></ul>
            <div class="ej"><p>Z₁ = 20 a 300 rpm, Z₂ = 60 → n₂ = 300 × 20 ÷ 60 = <b>100 rpm</b></p></div>` },
          { t: 'Poleas, banda y cadena', h: `<div class="formula">n₁ · D₁ = n₂ · D₂</div>
            <ul><li>Banda abierta: mismo sentido. Banda cruzada: sentido contrario.</li><li>Cadena y catarina (bicicleta): igual, pero sin patinar.</li></ul>
            <div class="ej"><p>Polea de 50 mm a 1200 rpm mueve a una de 150 mm → 1200 × 50 ÷ 150 = <b>400 rpm</b></p></div>` },
          { t: 'Mecanismos que transforman el movimiento', fig: 'biela-manivela', h: `<ul><li><b>Piñón–cremallera</b>: giro ↔ lineal (dirección de auto).</li><li><b>Biela–manivela</b>: giro ↔ vaivén (motor, compresor de pistón).</li><li><b>Leva–seguidor</b>: giro → vaivén con «programa» (árbol de levas).</li><li><b>Tornillo sin fin–corona</b>: gran reducción, ejes a 90°; normalmente no se puede mover desde la salida.</li></ul>` }
        ],
        pares: [['Carretilla', 'Palanca de 2º género'], ['Tijeras', 'Palanca de 1er género'], ['Pinzas de depilar', 'Palanca de 3er género'], ['Piñón–cremallera', 'Giro a lineal'], ['Biela–manivela', 'Giro a vaivén'], ['Sin fin–corona', 'Gran reducción'], ['Leva', 'Movimiento programado']],
        q: [
          ['om', 'Una carretilla es una palanca de…', ['2º género (resistencia en medio)', '1er género', '3er género', 'no es palanca'], 0, 'Rueda = fulcro; carga en medio; fuerza en los mangos.'],
          ['om', 'Las tijeras son una palanca de…', ['1er género (fulcro en medio)', '2º género', '3er género', 'ninguno'], 0, 'El tornillo central es el fulcro.'],
          ['om', 'Las pinzas de depilar son una palanca de…', ['3er género (potencia en medio)', '1er género', '2º género', 'ninguno'], 0, 'Aprietas en medio.'],
          ['nu', 'Palanca: la carga R = 200 N está a 0.2 m del fulcro y empujas a 0.8 m. ¿Qué fuerza P necesitas?', { u: 'N', tol: 0.001 }, 50, 'P × 0.8 = 200 × 0.2 → P = 40 ÷ 0.8 = 50 N.'],
          ['nu', 'Engrane motriz Z₁ = 20 a 300 rpm mueve a uno de Z₂ = 60. ¿A cuántas rpm gira el conducido?', { u: 'rpm', tol: 0.001 }, 100, 'n₂ = 300 × 20 ÷ 60 = 100 rpm.'],
          ['om', 'Si un engrane chico mueve a uno grande, el grande gira…', ['más lento y con más torque', 'más rápido y con más torque', 'más rápido y con menos torque', 'igual'], 0, 'Se reduce la velocidad y aumenta la fuerza de giro.'],
          ['om', 'Dos engranes externos que engranan giran…', ['en sentido contrario', 'en el mismo sentido', 'no giran', 'depende del material'], 0, 'Por eso se usa un engrane loco para conservar el sentido.', { fig: 'engranes' }],
          ['nu', 'Polea motriz de 50 mm a 1200 rpm, polea conducida de 150 mm. ¿rpm de la conducida?', { u: 'rpm', tol: 0.001 }, 400, '1200 × 50 ÷ 150 = 400 rpm.'],
          ['om', '¿Qué mecanismo convierte giro en movimiento lineal, como en la dirección de un auto?', ['Piñón–cremallera', 'Poleas', 'Palanca de 3er género', 'Engrane loco'], 0, 'El piñón gira y la cremallera avanza en línea.'],
          ['om', 'En un motor de combustión, el mecanismo que convierte el vaivén del pistón en giro es…', ['Biela–manivela', 'Tornillo sin fin', 'Piñón–cremallera', 'Polea'], 0, 'También se usa al revés en compresores de pistón.'],
          ['om', '¿Qué mecanismo da gran reducción, con ejes a 90°, y normalmente no se mueve desde la salida?', ['Tornillo sin fin–corona', 'Poleas con banda abierta', 'Palanca', 'Engranes rectos iguales'], 0, 'Por eso se usa en elevadores y portones.', { n: 2 }],
          ['vf', 'Con banda cruzada, las dos poleas giran en sentido contrario.', null, true, 'La banda cruzada invierte el sentido.'],
          ['nu', 'Motriz Z₁ = 12, conducido Z₂ = 36. ¿Cuántas vueltas da el motriz por cada vuelta del conducido?', { u: 'vueltas', tol: 0.001 }, 3, '36 ÷ 12 = 3 vueltas: relación 3:1.', { n: 2 }],
          ['re', 'Relaciona el mecanismo con un ejemplo:', [['Leva–seguidor', 'Árbol de levas'], ['Cadena–catarina', 'Bicicleta'], ['Piñón–cremallera', 'Dirección de auto'], ['Biela–manivela', 'Motor de pistón']], null, 'Mecanismos en la vida real.'],
          ['vf', 'Un engrane loco cambia el sentido de giro pero no la relación de velocidades.', null, true, 'Solo invierte el sentido.', { n: 3 }]
        ]
      },
      {
        id: 'm2s2t4', sub: 's2',
        nombre: 'Materiales, herramientas y seguridad',
        proposito: 'Determina el material y la geometría de las piezas y construye con herramientas manuales siguiendo las normas de seguridad e higiene (S2).',
        leccion: [
          { t: 'Materiales para prototipos', h: `<table><tr><th>Material</th><th>✔</th><th>✘</th></tr>
            <tr><td>MDF</td><td>Barato, fácil de cortar (láser, caladora)</td><td>No resiste humedad; su polvo daña: usa cubrebocas</td></tr>
            <tr><td>Acrílico</td><td>Transparente, corte láser, se dobla con calor</td><td>Se raya y es frágil al golpe</td></tr>
            <tr><td>PLA (impresión 3D)</td><td>Fácil de imprimir</td><td>Se ablanda con calor (~60 °C)</td></tr>
            <tr><td>Aluminio</td><td>Ligero, casi no se oxida</td><td>Más caro</td></tr>
            <tr><td>Acero</td><td>Muy resistente</td><td>Pesado; se oxida si no se protege</td></tr></table>
            <div class="tip">🌱 Acomoda las piezas en la hoja para que sobre menos (anidado) y reutiliza sobrantes.</div>` },
          { t: 'Herramientas manuales', h: `<ul><li><b>Segueta</b>: cortar metal o plástico.</li><li><b>Lima</b>: desbastar y afinar bordes.</li><li><b>Taladro y brocas</b>: barrenos.</li><li><b>Vernier (calibrador)</b>: medir con precisión.</li><li><b>Escuadra</b>: verificar 90°. <b>Prensa</b>: sujetar la pieza.</li></ul>` },
          { t: 'Seguridad e higiene (NOM-017-STPS-2008: EPP)', h: `<ul><li>🥽 Lentes de seguridad <b>siempre</b> en el taller.</li><li>👟 Calzado cerrado, cabello recogido, sin pulseras ni anillos cerca de máquinas que giran.</li><li>🚫 <b>Sin guantes</b> en el taladro de columna: se pueden enrollar.</li><li>🗜 Sujeta la pieza con prensa, nunca con la mano.</li><li>🔌 Desconecta antes de cambiar la broca. Área limpia y ordenada.</li></ul>` },
          { t: 'Cómo leer el vernier', h: `<ol><li>Lee los mm de la escala fija hasta el <b>cero del nonio</b>.</li><li>Busca la línea del nonio que <b>coincide</b> con una de la escala fija.</li><li>Multiplica esa línea por la resolución (0.05 o 0.02 mm) y súmala.</li></ol>
            <div class="ej"><p>Cero pasó 23 mm, coincide la línea 7, resolución 0.05 → 23 + 7 × 0.05 = <b>23.35 mm</b></p></div>
            <p>Partes: mordazas exteriores (afuera), interiores (agujeros) y varilla de profundidad.</p>` }
        ],
        pares: [['MDF', 'No resiste humedad'], ['Acrílico', 'Transparente'], ['PLA', 'Impresión 3D'], ['Aluminio', 'Ligero'], ['Segueta', 'Cortar metal'], ['Lima', 'Afinar bordes'], ['Vernier', 'Medir con precisión']],
        q: [
          ['om', '¿Qué equipo de protección es obligatorio SIEMPRE en el taller?', ['Lentes de seguridad', 'Guantes para el taladro', 'Gorra', 'Audífonos con música'], 0, 'Las esquirlas pueden saltar en cualquier momento.'],
          ['vf', 'Usar guantes al trabajar en el taladro de columna es lo más seguro.', null, false, 'El guante puede enrollarse en la broca y jalar tu mano.'],
          ['om', '¿Qué norma mexicana trata el equipo de protección personal?', ['NOM-017-STPS-2008', 'NOM-008-SCFI-2002', 'ISO 1219', 'NOM-001-SEDE'], 0, 'NOM-017-STPS: EPP en los centros de trabajo.', { n: 2 }],
          ['om', 'Material transparente que se corta con láser pero es frágil al golpe:', ['Acrílico', 'MDF', 'Acero', 'Aluminio'], 0, 'Acrílico (PMMA).'],
          ['om', '¿Qué material NO conviene para una pieza que se moja seguido?', ['MDF', 'Aluminio', 'Acrílico', 'Acero inoxidable'], 0, 'El MDF se hincha con la humedad.'],
          ['om', 'Para medir el diámetro INTERIOR de un agujero con el vernier usas…', ['las mordazas interiores', 'las mordazas exteriores', 'la varilla de profundidad', 'la escala del flexómetro'], 0, 'Las mordazas chicas de arriba.'],
          ['om', 'Para sujetar una pieza al taladrar debes usar…', ['una prensa', 'tu mano', 'la mano de un compañero', 'cinta adhesiva'], 0, 'La broca puede atorarse y girar la pieza.'],
          ['om', '¿Qué herramienta usas para cortar a mano un perfil de aluminio?', ['Segueta', 'Lima', 'Desarmador', 'Vernier'], 0, 'Segueta = arco con hoja de sierra.'],
          ['vf', 'Acomodar las piezas en la hoja de MDF para que sobre menos material ayuda al ambiente y ahorra dinero.', null, true, 'Optimización de recursos.'],
          ['om', 'Una pieza de PLA impresa en 3D se puede deformar si…', ['se calienta (por ejemplo, dentro de un auto al sol)', 'se moja con agua fría', 'se pinta', 'se lija'], 0, 'El PLA se ablanda alrededor de 60 °C.', { n: 2 }],
          ['nu', 'Vernier de 0.05 mm: el cero del nonio pasó 23 mm y coincide la línea 7. ¿Cuánto mide?', { u: 'mm', tol: 0.001 }, 23.35, '23 + 7 × 0.05 = 23.35 mm.', { n: 3 }],
          ['re', 'Relaciona la herramienta con su uso:', [['Lima', 'Afinar bordes'], ['Taladro', 'Hacer barrenos'], ['Escuadra', 'Verificar 90°'], ['Prensa', 'Sujetar la pieza']], null, 'Herramientas del taller.'],
          ['om', 'Antes de cambiar la broca del taladro debes…', ['desconectarlo', 'subir la velocidad', 'ponerte guantes', 'mojar la broca'], 0, 'Nunca manipules una máquina que puede encenderse.']
        ]
      },
      // ═════════════════════════ SUBMÓDULO 3 ═════════════════════════
      {
        id: 'm2s3t1', sub: 's3',
        nombre: 'Presión, caudal y fuerza',
        proposito: 'Identifica las propiedades de los fluidos en neumática e hidráulica (presión, caudal y fuerza), sus unidades y conversiones (S3).',
        leccion: [
          { t: 'Neumática vs hidráulica', h: `<table><tr><th></th><th>Neumática</th><th>Hidráulica</th></tr>
            <tr><td>Fluido</td><td>Aire comprimido (compresible)</td><td>Aceite (casi incompresible)</td></tr>
            <tr><td>Presión típica</td><td>~6 bar</td><td>Decenas a cientos de bar</td></tr>
            <tr><td>Ventaja</td><td>Rápida, limpia</td><td>Fuerzas muy grandes, precisa</td></tr></table>
            <p><b>Electro</b>neumática y <b>electro</b>hidráulica: las válvulas se controlan con electricidad.</p>` },
          { t: 'Presión', h: `<div class="formula">P = F ÷ A</div>
            <table><tr><th>Unidad</th><th>Equivale</th></tr><tr><td>Pa</td><td>1 N/m²</td></tr><tr><td>bar</td><td>100 000 Pa = 100 kPa</td></tr>
            <tr><td>psi</td><td>1 bar ≈ 14.5 psi</td></tr><tr><td>MPa</td><td>1 MPa = 10 bar</td></tr></table>
            <div class="tip">El manómetro marca presión <b>manométrica</b> (sobre la atmosférica).</div>` },
          { t: 'Caudal', h: `<p>Volumen que pasa por unidad de tiempo: <b>L/min</b>, m³/h.</p><div class="formula">Q = A × v</div>
            <p>Más caudal → el cilindro se mueve <b>más rápido</b>.</p>` },
          { t: 'Principio de Pascal', fig: 'prensa', h: `<p>La presión aplicada a un fluido encerrado se transmite <b>igual en todas direcciones</b>. Así una fuerza pequeña en un émbolo chico produce una fuerza grande en uno grande.</p>
            <div class="ej"><p>A₁ = 2 cm², A₂ = 50 cm², F₁ = 100 N → F₂ = 100 × 50 ÷ 2 = <b>2500 N</b></p></div>` }
        ],
        pares: [['Presión', 'Fuerza ÷ área'], ['Caudal', 'Volumen ÷ tiempo'], ['1 bar', '100 kPa'], ['1 MPa', '10 bar'], ['Neumática', 'Aire comprimido'], ['Hidráulica', 'Aceite'], ['Pascal', 'Presión igual en todo el fluido']],
        q: [
          ['om', 'La neumática trabaja con…', ['aire comprimido', 'aceite', 'agua salada', 'corriente eléctrica'], 0, 'Neuma = aire.'],
          ['om', '¿Por qué la hidráulica logra fuerzas más grandes que la neumática?', ['Trabaja a presiones mucho más altas con aceite casi incompresible', 'Porque el aceite pesa más', 'Porque usa motores eléctricos', 'Porque sus cilindros son más largos'], 0, 'Más presión × misma área = más fuerza.', { n: 2 }],
          ['nu', 'Convierte 6 bar a psi (1 bar ≈ 14.5 psi).', { u: 'psi', tol: 0.01 }, 87, '6 × 14.5 = 87 psi.'],
          ['nu', 'Convierte 2 bar a kPa.', { u: 'kPa', tol: 0.001 }, 200, '1 bar = 100 kPa → 200 kPa.'],
          ['nu', 'Una fuerza de 500 N actúa sobre 0.01 m². ¿Cuál es la presión en Pa?', { u: 'Pa', tol: 0.001 }, 50000, 'P = 500 ÷ 0.01 = 50 000 Pa (0.5 bar).'],
          ['om', '1 bar equivale a…', ['100 000 Pa', '1000 Pa', '10 Pa', '1 Pa'], 0, '1 bar = 100 kPa.'],
          ['om', 'El caudal se mide en…', ['L/min', 'bar', 'N', 'mm'], 0, 'Volumen ÷ tiempo.'],
          ['vf', 'Si aumentas el caudal que llega a un cilindro, este se mueve más rápido.', null, true, 'Q = A × v: con la misma área, más caudal = más velocidad.'],
          ['om', 'El principio de Pascal dice que la presión en un fluido encerrado…', ['se transmite igual en todas direcciones', 'solo empuja hacia abajo', 'desaparece al moverse', 'depende del color del fluido'], 0, 'Base de prensas y gatos hidráulicos.'],
          ['nu', 'Prensa hidráulica: émbolo chico de 2 cm², grande de 50 cm². Si empujas con 100 N, ¿qué fuerza sale en el grande?', { u: 'N', tol: 0.001 }, 2500, 'F₂ = 100 × 50 ÷ 2 = 2500 N.', { fig: 'prensa', n: 2 }],
          ['om', 'La presión típica de una red de aire comprimido industrial es cercana a…', ['6 bar', '0.1 bar', '600 bar', '6000 bar'], 0, 'Entre 6 y 7 bar es lo común.', { n: 2 }],
          ['nu', 'Convierte 145 psi a bar (1 bar ≈ 14.5 psi).', { u: 'bar', tol: 0.001 }, 10, '145 ÷ 14.5 = 10 bar.'],
          ['vf', 'El aire es compresible; por eso es difícil detener un cilindro neumático con precisión a la mitad de su carrera.', null, true, 'El aire actúa como resorte.', { n: 3 }],
          ['re', 'Relaciona cada unidad:', [['Pa', 'N/m²'], ['bar', '100 kPa'], ['psi', 'Libra por pulgada²'], ['L/min', 'Caudal']], null, 'Unidades de presión y caudal.']
        ]
      },
      {
        id: 'm2s3t2', sub: 's3',
        nombre: 'Simbología neumática e hidráulica',
        proposito: 'Reconoce sistemas neumáticos, electroneumáticos, hidráulicos y electrohidráulicos en un plano, considerando su simbología (S3).',
        leccion: [
          { t: 'Símbolos ISO 1219: energía', fig: 'compresor', h: `<p>Los diagramas usan símbolos, no dibujos reales.</p><ul><li>Triángulo <b>hueco</b> = neumática (aire). Este es un <b>compresor</b>.</li><li>Triángulo <b>relleno</b> = hidráulica (aceite): así se dibuja la <b>bomba hidráulica</b>.</li></ul>` },
          { t: 'Cilindros', fig: 'cil-se', h: `<p><b>Simple efecto</b> (arriba): un puerto; sale con aire y regresa con resorte.</p>${'<div class="figura" data-fig="cil-de"></div>'}<p><b>Doble efecto</b>: dos puertos; sale y entra con aire.</p>` },
          { t: 'Válvulas de vías', fig: 'v32', h: `<ul><li>Cada <b>cuadro</b> = una posición.</li><li><b>Flechas</b> = por dónde pasa el aire. <b>T</b> = puerto bloqueado.</li><li>Nombre <b>vías/posiciones</b>: 3/2 = 3 conexiones, 2 posiciones.</li><li>Las conexiones se dibujan en la posición de <b>reposo</b>.</li></ul><p>Esta es una 3/2 normalmente cerrada, con pulsador y retorno por resorte.</p>` },
          { t: 'Numeración de puertos', fig: 'v52', h: `<table><tr><th>Puerto</th><th>Función</th></tr><tr><td>1</td><td>Alimentación (presión)</td></tr><tr><td>2 y 4</td><td>Salidas de trabajo</td></tr><tr><td>3 y 5</td><td>Escapes</td></tr><tr><td>12 y 14</td><td>Pilotaje (14 conecta 1 → 4)</td></tr></table>
            <p>En hidráulica: <b>P</b> presión, <b>T</b> tanque, <b>A</b> y <b>B</b> trabajo. Arriba: 5/2 con solenoide y resorte.</p>` },
          { t: 'Accionamientos y otros símbolos', h: `<ul><li>Pulsador, palanca, pedal, rodillo (final de carrera), resorte, <b>solenoide</b> (rectángulo con diagonal), piloto neumático.</li><li><b>FRL</b>: filtro, regulador y lubricador. <b>Manómetro</b>: círculo con flecha. <b>Antirretorno</b>: bola y asiento. <b>Depósito</b>: rectángulo abierto.</li></ul>` }
        ],
        pares: [['Triángulo hueco', 'Neumática'], ['Triángulo relleno', 'Hidráulica'], ['Puerto 1', 'Alimentación'], ['Puertos 3 y 5', 'Escapes'], ['Puertos 2 y 4', 'Trabajo'], ['Cuadro', 'Posición de la válvula'], ['T en el cuadro', 'Puerto bloqueado']],
        q: [
          ['om', '¿Qué símbolo es este?', ['Cilindro de simple efecto con retorno por resorte', 'Cilindro de doble efecto', 'Válvula 3/2', 'Compresor'], 0, 'Un solo puerto y un resorte.', { fig: 'cil-se' }],
          ['om', '¿Qué símbolo es este?', ['Cilindro de doble efecto', 'Cilindro de simple efecto', 'Motor neumático', 'Manómetro'], 0, 'Dos puertos, sin resorte.', { fig: 'cil-de' }],
          ['om', 'Esta válvula es una…', ['3/2 accionada por pulsador con retorno por resorte', '5/2 con solenoide', '2/2 por palanca', '4/3 de centro cerrado'], 0, '3 puertos (1, 2, 3), 2 cuadros, botón a la izquierda y resorte a la derecha.', { fig: 'v32', n: 2 }],
          ['om', 'Esta válvula es una…', ['5/2 accionada por solenoide con retorno por resorte', '3/2 por pulsador', '5/3 por palanca', '2/2 por rodillo'], 0, '5 puertos, 2 posiciones, solenoide y resorte.', { fig: 'v52', n: 2 }],
          ['om', 'Este símbolo representa un…', ['compresor (fuente de aire)', 'bomba hidráulica', 'manómetro', 'motor eléctrico'], 0, 'Triángulo hueco apuntando hacia afuera = compresor.', { fig: 'compresor', n: 2 }],
          ['om', 'Triángulo RELLENO dentro del círculo, apuntando hacia afuera:', ['bomba hidráulica', 'compresor de aire', 'válvula antirretorno', 'depósito'], 0, 'Relleno = hidráulica.', { fig: 'bomba', n: 2 }],
          ['om', '¿Qué es?', ['Manómetro (mide presión)', 'Válvula de vías', 'Compresor', 'Filtro'], 0, 'Círculo con flecha.', { fig: 'manometro' }],
          ['om', 'Este símbolo es una…', ['válvula antirretorno (deja pasar en un solo sentido)', 'válvula 3/2', 'bomba', 'silenciador'], 0, 'Una bola contra un asiento.', { fig: 'antirretorno', n: 2 }],
          ['om', 'En una válvula 3/2, ¿qué significa el «2»?', ['2 posiciones', '2 vías', '2 bar', '2 solenoides'], 0, 'Primero vías, luego posiciones.'],
          ['om', 'En una válvula 5/2, el puerto 1 es…', ['la alimentación (presión)', 'un escape', 'una salida de trabajo', 'el pilotaje'], 0, '1 = entrada de aire.'],
          ['om', 'Los puertos 3 y 5 de una válvula son…', ['escapes', 'alimentación', 'salidas al cilindro', 'pilotajes'], 0, 'Por ahí sale el aire usado.'],
          ['om', 'En hidráulica, la letra T en una válvula significa…', ['tanque (retorno al depósito)', 'temperatura', 'trabajo', 'tornillo'], 0, 'P = presión, T = tanque, A y B = trabajo.', { n: 2 }],
          ['vf', 'Cada cuadro en el símbolo de una válvula representa una posición.', null, true, 'Por eso una 5/2 tiene 2 cuadros.'],
          ['om', 'El accionamiento por solenoide se dibuja como…', ['un rectángulo con una línea diagonal', 'un círculo con triángulo', 'un resorte en zigzag', 'un botón redondo'], 0, 'Así se representa la bobina.'],
          ['om', 'La unidad FRL prepara el aire. FRL significa…', ['Filtro, Regulador y Lubricador', 'Fuerza, Resistencia y Longitud', 'Flujo, Retorno y Llave', 'Fusible, Relé y Lámpara'], 0, 'Limpia, ajusta la presión y lubrica.'],
          ['re', 'Relaciona el puerto con su función:', [['1', 'Alimentación'], ['2 y 4', 'Salidas de trabajo'], ['3 y 5', 'Escapes'], ['14', 'Pilotaje que conecta 1 con 4']], null, 'Numeración ISO 5599.']
        ]
      },
      {
        id: 'm2s3t3', sub: 's3',
        nombre: 'Cálculo de fuerza y caudal',
        proposito: 'Selecciona elementos neumáticos e hidráulicos haciendo el cálculo de fuerza y caudal (S3).',
        leccion: [
          { t: 'Fuerza de un cilindro', fig: 'fuerza-cilindro', h: `<div class="formula">F = P × A · A = π·D²/4</div>
            <div class="tip">Truco de unidades: <b>F [N] = P [bar] × A [cm²] × 10</b> (porque 1 bar = 10 N/cm²).</div>
            <div class="ej"><p>D = 50 mm = 5 cm → A = π × 5² ÷ 4 = <b>19.63 cm²</b></p><p>A 6 bar: F = 6 × 19.63 × 10 = <b>1178 N</b> (≈ 1.18 kN)</p></div>
            <p>Es fuerza <b>teórica</b>: la real es un poco menor por la fricción.</p>` },
          { t: 'Fuerza de retroceso', h: `<p>Al regresar, el aire empuja el área <b>anular</b> (émbolo menos vástago):</p><div class="formula">A = π·(D² − d²)/4</div>
            <div class="ej"><p>D = 50 mm, d = 20 mm → A = π × (25 − 4) ÷ 4 = <b>16.49 cm²</b> → a 6 bar: ≈ <b>989 N</b></p></div>` },
          { t: 'Caudal y velocidad', h: `<div class="formula">Q = A × v</div>
            <div class="ej"><p>Cilindro hidráulico D = 40 mm → A = 12.57 cm². Velocidad 10 cm/s → Q = 125.7 cm³/s</p><p>× 60 ÷ 1000 = <b>7.54 L/min</b></p></div>` },
          { t: 'Pasos para no fallar', h: `<ol><li>Pasa todo a cm y bar.</li><li>Calcula el área.</li><li>Multiplica.</li><li>Revisa unidades.</li><li>Redondea hasta el final.</li></ol>
            <div class="tip">Si duplicas el diámetro, el área (y la fuerza) se multiplica por <b>4</b>.</div>` }
        ],
        pares: [['F', 'P × A'], ['A', 'π·D²/4'], ['Q', 'A × v'], ['1 L', '1000 cm³'], ['1 bar', '10 N/cm²'], ['Retroceso', 'Área anular']],
        q: [
          ['nu', 'Área de un émbolo de D = 50 mm, en cm² (A = π·D²/4 con D en cm).', { u: 'cm²', tol: 0.005 }, 19.63, 'π × 5² ÷ 4 = 19.63 cm².'],
          ['nu', 'Cilindro de D = 50 mm a 6 bar. Fuerza teórica de avance (F = P × A × 10).', { u: 'N', tol: 0.01 }, 1178, '6 × 19.63 × 10 = 1178 N.'],
          ['nu', 'Cilindro de D = 32 mm a 6 bar. Fuerza de avance.', { u: 'N', tol: 0.01 }, 482.5, 'A = π × 3.2² ÷ 4 = 8.04 cm² → 6 × 8.04 × 10 ≈ 482.5 N.', { n: 2 }],
          ['nu', 'Cilindro de D = 100 mm a 5 bar. Fuerza de avance.', { u: 'N', tol: 0.01 }, 3927, 'A = π × 10² ÷ 4 = 78.54 cm² → 5 × 78.54 × 10 = 3927 N.', { n: 2 }],
          ['om', 'Al retroceder, un cilindro de doble efecto tiene menos fuerza porque…', ['el vástago ocupa parte del área del émbolo', 'el aire se cansa', 'la presión aumenta', 'el resorte ayuda'], 0, 'Área anular = émbolo − vástago.'],
          ['nu', 'Área anular de retroceso: D = 50 mm, vástago d = 20 mm (en cm²).', { u: 'cm²', tol: 0.005 }, 16.49, 'π × (5² − 2²) ÷ 4 = π × 21 ÷ 4 = 16.49 cm².', { n: 3 }],
          ['om', 'Si duplicas el diámetro del cilindro (misma presión), la fuerza…', ['se multiplica por 4', 'se duplica', 'queda igual', 'se reduce a la mitad'], 0, 'El área depende de D²: (2D)² = 4D².', { n: 2 }],
          ['om', 'Si duplicas la presión (mismo cilindro), la fuerza…', ['se duplica', 'se multiplica por 4', 'no cambia', 'baja'], 0, 'F = P × A: proporcional a la presión.'],
          ['nu', 'Necesitas 2000 N con aire a 6 bar. ¿Qué área mínima necesitas? (A = F ÷ (P × 10))', { u: 'cm²', tol: 0.005 }, 33.33, '2000 ÷ 60 = 33.33 cm² → elegirías un cilindro comercial de Ø 70 mm o más.', { n: 3 }],
          ['nu', 'Un cilindro con A = 12.57 cm² avanza a 10 cm/s. ¿Caudal en cm³/s?', { u: 'cm³/s', tol: 0.005 }, 125.7, 'Q = 12.57 × 10 = 125.7 cm³/s.'],
          ['nu', 'Convierte 125.7 cm³/s a L/min.', { u: 'L/min', tol: 0.005 }, 7.54, '125.7 × 60 ÷ 1000 = 7.54 L/min.', { n: 2 }],
          ['vf', 'La fuerza calculada con F = P × A es teórica; la real es un poco menor por la fricción.', null, true, 'Por eso se elige un cilindro con margen.'],
          ['nu', 'Prensa: A₁ = 4 cm², A₂ = 80 cm², F₁ = 150 N. ¿F₂?', { u: 'N', tol: 0.001 }, 3000, 'F₂ = 150 × 80 ÷ 4 = 3000 N.'],
          ['om', '¿Qué determina la VELOCIDAD de un cilindro?', ['El caudal que le llega', 'Solo la presión', 'El color del cilindro', 'Solo la longitud de la manguera'], 0, 'v = Q ÷ A.']
        ]
      },
      {
        id: 'm2s3t4', sub: 's3',
        nombre: 'Electroneumática y electrohidráulica',
        proposito: 'Prepara componentes eléctricos de acuerdo con el diagrama de escalera y realiza las conexiones aplicando normas de seguridad (S3).',
        leccion: [
          { t: 'Electroválvulas', h: `<p>Una <b>electroválvula</b> tiene una bobina (solenoide) que, al energizarse, mueve la corredera. Así controlas el aire o aceite con botones, sensores, relevadores o un PLC. En tableros didácticos se usa <b>24 V CD</b>.</p>
            <ul><li><b>Monoestable</b>: 1 bobina + resorte → regresa al quitar la corriente.</li><li><b>Biestable</b>: 2 bobinas, sin resorte → se queda en la última posición (memoria).</li></ul>` },
          { t: 'Elementos eléctricos', h: `<table><tr><th>Elemento</th><th>Qué hace</th></tr>
            <tr><td>Pulsador NA</td><td>Deja pasar corriente solo mientras lo presionas → MARCHA</td></tr>
            <tr><td>Pulsador NC</td><td>Corta la corriente al presionarlo → PARO</td></tr>
            <tr><td>Relevador (K1)</td><td>Bobina que acciona sus contactos NA/NC</td></tr>
            <tr><td>Final de carrera</td><td>Detecta mecánicamente que el cilindro llegó</td></tr>
            <tr><td>Sensor reed</td><td>Detecta el imán del émbolo</td></tr><tr><td>Inductivo</td><td>Detecta metal</td></tr><tr><td>Capacitivo</td><td>Detecta casi cualquier material</td></tr></table>` },
          { t: 'Diagrama de escalera', fig: 'escalera', h: `<p>Dos rieles (+24 V y 0 V). En cada renglón: contactos a la izquierda, bobina o carga a la derecha.</p>
            <p><b>Enclavamiento (autorretención)</b>: un contacto NA de K1 en paralelo con MARCHA mantiene encendido a K1 al soltar el botón. PARO (NC) lo apaga.</p>` },
          { t: 'Seguridad', h: `<ul><li>Trabaja sin energía (eléctrica <b>y</b> neumática).</li><li>Despresuriza antes de quitar mangueras.</li><li>Nunca dirijas aire comprimido hacia el cuerpo.</li><li>Revisa conexiones antes de energizar y ten el paro de emergencia a la mano.</li><li>Lentes de seguridad siempre.</li></ul>` }
        ],
        pares: [['NA', 'Normalmente abierto'], ['NC', 'Normalmente cerrado'], ['K1', 'Relevador'], ['Y1', 'Bobina de válvula'], ['Sensor reed', 'Detecta imán'], ['Inductivo', 'Detecta metal'], ['Enclavamiento', 'Memoria con relevador']],
        q: [
          ['om', 'Un pulsador NA (normalmente abierto)…', ['deja pasar corriente solo mientras lo presionas', 'siempre deja pasar corriente', 'corta la corriente al presionarlo', 'no funciona en 24 V'], 0, 'En reposo está abierto.'],
          ['om', 'Para el botón de PARO se usa un contacto…', ['NC (normalmente cerrado)', 'NA', 'de rodillo', 'reed'], 0, 'Si un cable se rompe, la máquina se detiene: es más seguro.'],
          ['om', '¿Qué hace la bobina (solenoide) de una electroválvula?', ['Mueve la corredera al energizarse', 'Mide la presión', 'Comprime el aire', 'Lubrica el cilindro'], 0, 'Es un electroimán.'],
          ['om', 'Un sensor magnético (reed) en un cilindro detecta…', ['el imán del émbolo (su posición)', 'la temperatura del aire', 'el color de la pieza', 'la presión exacta'], 0, 'Los cilindros con émbolo magnético lo permiten.'],
          ['om', 'Un sensor inductivo detecta…', ['objetos metálicos cercanos', 'cualquier líquido', 'solo la luz', 'el sonido'], 0, 'Funciona con un campo electromagnético.'],
          ['om', 'En el diagrama, ¿para qué sirve el contacto K1 en paralelo con MARCHA?', ['Mantiene encendido a K1 al soltar el botón (enclavamiento)', 'Apaga la máquina', 'Mide el voltaje', 'Cambia el sentido del cilindro'], 0, 'Es la «memoria» del circuito.', { fig: 'escalera', n: 2 }],
          ['om', 'En el diagrama, ¿qué pasa al presionar PARO?', ['Se abre el circuito, K1 se desenergiza y Y1 se apaga', 'K1 se enciende', 'No pasa nada', 'El cilindro acelera'], 0, 'PARO es NC: al presionarlo abre el renglón.', { fig: 'escalera', n: 2 }],
          ['om', 'Válvula con dos bobinas y sin resorte, que se queda en la última posición:', ['Biestable', 'Monoestable', 'Antirretorno', 'Reguladora de caudal'], 0, 'Tiene «memoria».', { n: 2 }],
          ['vf', 'Antes de quitar una manguera neumática hay que despresurizar el circuito.', null, true, 'La manguera puede latiguear y lastimar.'],
          ['vf', 'Es seguro sacudirse la ropa con aire comprimido.', null, false, 'El aire a presión puede meterse en la piel o lastimar ojos y oídos.'],
          ['om', 'Voltaje de control común en tableros didácticos de electroneumática:', ['24 V CD', '440 V CA', '5000 V', '1.5 V'], 0, '24 V CD es seguro y estándar en automatización.', { n: 2 }],
          ['re', 'Relaciona el elemento con su símbolo o función:', [['MARCHA', 'Pulsador NA'], ['PARO', 'Pulsador NC'], ['K1', 'Bobina de relevador'], ['Y1', 'Solenoide de válvula']], null, 'Nombres típicos en diagramas.'],
          ['om', 'Un final de carrera (limit switch) sirve para…', ['detectar que el cilindro llegó a su posición', 'regular la presión', 'filtrar el aire', 'medir el caudal'], 0, 'Lo acciona el vástago o una leva.'],
          ['vf', 'Un sensor capacitivo puede detectar materiales no metálicos como plástico o madera.', null, true, 'A diferencia del inductivo.', { n: 2 }]
        ]
      },
      {
        id: 'm2s3t5', sub: 's3',
        nombre: 'Circuitos y secuencias',
        proposito: 'Elabora diagramas con simulador, arma y opera circuitos neumáticos e hidráulicos, y valida su funcionamiento (S3).',
        leccion: [
          { t: 'Mando directo e indirecto', h: `<ul><li><b>Directo</b>: la válvula de botón alimenta directo al cilindro (cilindros chicos, cerca del operador).</li><li><b>Indirecto</b>: un botón (válvula de señal) pilotea una válvula de potencia que mueve el cilindro (cilindros grandes, control a distancia, más seguro).</li></ul>` },
          { t: 'Funciones lógicas', h: `<ul><li><b>Y (AND)</b>: dos condiciones a la vez → válvula de simultaneidad. Ej. <b>mando a dos manos</b>: la prensa solo baja si aprietas dos botones; así tus manos quedan lejos.</li><li><b>O (OR)</b>: cualquiera de dos botones → válvula selectora.</li></ul>` },
          { t: 'Control de velocidad', h: `<p><b>Reguladora de caudal unidireccional</b> = estrangulación + antirretorno: regula la velocidad en un sentido.</p>
            <div class="tip">En cilindros de doble efecto conviene regular el aire de <b>escape</b>: el movimiento es más estable.</div>` },
          { t: 'Secuencias', h: `<p>Cilindros con letras: A, B… <b>+</b> = sale · <b>−</b> = entra. Sensores: a0 (A adentro), a1 (A afuera).</p>
            <div class="ej"><p>Sujetar y marcar: <b>A+</b> (sujeta) → <b>B+</b> (marca) → <b>B−</b> (regresa marcador) → <b>A−</b> (suelta).</p></div>` },
          { t: 'Del simulador al tablero', h: `<ol><li>Simula en un software especializado (por ejemplo, FluidSIM).</li><li>Arma por partes, siguiendo el diagrama.</li><li>Prueba con presión baja y revisa fugas.</li><li>Valida que cumpla la secuencia; si falla, corrige.</li><li>Anótalo en tu bitácora.</li></ol>` }
        ],
        pares: [['A+', 'Cilindro A sale'], ['A−', 'Cilindro A entra'], ['Función Y', 'Mando a dos manos'], ['Función O', 'Cualquier botón'], ['Mando directo', 'Botón mueve cilindro'], ['Mando indirecto', 'Botón pilotea válvula'], ['Reguladora', 'Controla velocidad']],
        q: [
          ['om', 'En un mando INDIRECTO…', ['un botón pilotea una válvula de potencia que mueve el cilindro', 'el botón alimenta directo al cilindro', 'no se usa aire', 'el cilindro se mueve solo'], 0, 'La señal y la potencia van separadas.'],
          ['om', 'Para que una prensa solo baje si el operador aprieta DOS botones a la vez, se usa la función…', ['Y (AND)', 'O (OR)', 'NO (NOT)', 'Memoria'], 0, 'Ambas condiciones al mismo tiempo.'],
          ['om', 'Para mover un cilindro desde DOS lugares distintos (cualquiera de los dos), usas…', ['una válvula selectora (función O)', 'una válvula de simultaneidad', 'un manómetro', 'un silenciador'], 0, 'Función O.'],
          ['om', 'En una secuencia, «A+» significa…', ['el cilindro A sale (avanza)', 'el cilindro A entra', 'A recibe más presión', 'A se apaga'], 0, '+ sale, − entra.'],
          ['or', 'Ordena la secuencia para sujetar (A) y marcar (B) una pieza:', ['A+', 'B+', 'B−', 'A−'], null, 'Sujeta, marca, regresa el marcador y suelta.'],
          ['om', 'Para regular la velocidad de un cilindro se usa una…', ['válvula reguladora de caudal', 'válvula antirretorno sola', 'unidad FRL', 'válvula 3/2'], 0, 'Controla cuánto aire pasa.'],
          ['vf', 'En cilindros de doble efecto se recomienda regular el aire de escape para un movimiento más estable.', null, true, 'El cilindro queda «acolchonado» entre aire.', { n: 2 }],
          ['om', '¿Por qué conviene simular el circuito antes de armarlo?', ['Para detectar errores sin riesgo ni desperdicio', 'Porque es obligatorio usar internet', 'Para que el aire salga más frío', 'No conviene'], 0, 'Lo pide el programa: elaborar diagramas con un simulador especializado.'],
          ['vf', 'El mando directo es ideal para cilindros muy grandes y lejanos.', null, false, 'Para esos se usa mando indirecto.'],
          ['om', 'El mando a dos manos es una medida de…', ['seguridad: las dos manos quedan lejos de la zona de peligro', 'ahorro de aire', 'velocidad', 'decoración'], 0, 'Protege las manos del operador.'],
          ['re', 'Relaciona cada movimiento:', [['A+', 'Sale A'], ['A−', 'Entra A'], ['B+', 'Sale B'], ['B−', 'Entra B']], null, 'Notación de secuencias.'],
          ['om', 'Al probar un circuito nuevo por primera vez, conviene…', ['usar presión baja y revisar fugas', 'usar la presión máxima', 'quitar el manómetro', 'no usar lentes'], 0, 'Si algo está mal conectado, el golpe es menor.'],
          ['om', '¿Qué indica el sensor «a1» en una secuencia?', ['que el cilindro A llegó afuera (extendido)', 'que el cilindro A está adentro', 'la presión de la red', 'el número de piezas'], 0, 'a0 = adentro, a1 = afuera.', { n: 3 }]
        ]
      }
    ]
  };
})();
