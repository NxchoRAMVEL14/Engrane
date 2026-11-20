// ENGRANE · Pensamiento Matemático III «Pensamiento algebraico e introducción a geometría plana»
// Fuente: SEP · MCCEMS Modelo Educativo 2025 · Pensamiento Matemático III · 6 propósitos formativos
// (ecuaciones lineales, ecuaciones con dos incógnitas, sistemas de ecuaciones, ecuaciones cuadráticas,
// introducción a la geometría plana y teorema del triángulo de Napoleón). Respuestas numéricas verificadas.
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.matematico3 = {
    temas: [
      {
        id: 'm3t1', nombre: 'Ecuaciones lineales (una incógnita)',
        proposito: 'Propósito 1 · Aplica la aritmética y el álgebra para encontrar el valor de una incógnita en ecuaciones lineales de situaciones de interés.',
        leccion: [
          { t: '¿Qué es una ecuación?', h: `<p>Una <b>ecuación</b> es una igualdad con al menos una cantidad desconocida (<b>incógnita</b>). Tiene dos <b>miembros</b> separados por el signo =.</p>
            <div class="ej"><p><b>3x + 5</b> = <b>20</b> → miembro izquierdo · miembro derecho. Términos: 3x, 5 y 20. Incógnita: x.</p></div>
            <p>Forma estándar de la ecuación lineal (de primer grado): <b>ax + b = 0</b>, con a ≠ 0.</p>` },
          { t: 'La regla de oro: la balanza', h: `<p>Lo que haces de un lado, lo haces del otro: sumar, restar, multiplicar o dividir (≠ 0) en ambos miembros conserva la igualdad.</p>
            <div class="ej"><p>4x − 6 = 18 → (+6 a ambos) 4x = 24 → (÷4) <b>x = 6</b>. Comprobación: 4(6) − 6 = 18 ✔</p></div>
            <div class="tip">«Pasar restando» es en realidad restar en ambos lados. Siempre comprueba sustituyendo.</div>` },
          { t: 'Del problema a la ecuación', h: `<ol><li>Lee y decide qué es la incógnita (x = …).</li><li>Traduce: «el doble» = 2x, «3 más» = + 3, «consecutivos» = x, x + 1, x + 2.</li><li>Resuelve y comprueba que tenga sentido.</li></ol>
            <div class="ej"><p>Plan de datos: $150 fijos + $20 por GB extra = $290 → 150 + 20x = 290 → 20x = 140 → <b>x = 7 GB</b>.</p></div>` }
        ],
        pares: [['Incógnita', 'Valor desconocido (x)'], ['Miembro', 'Cada lado del ='], ['ax + b = 0', 'Forma estándar lineal'], ['Comprobar', 'Sustituir el resultado'], ['El doble de x', '2x'], ['Consecutivos', 'x, x + 1, x + 2']],
        q: [
          ['om', 'En 3x + 5 = 20, ¿cuál es la incógnita?', ['x', '3', '5', '20'], 0, 'La incógnita es la letra cuyo valor buscamos.'],
          ['nu', 'Resuelve: 3x + 5 = 20', { u: '', tol: 0 }, 5, '3x = 15 → x = 5.'],
          ['nu', 'Resuelve: 5x − 7 = 2x + 11', { u: '', tol: 0 }, 6, '5x − 2x = 11 + 7 → 3x = 18 → x = 6.'],
          ['nu', 'Resuelve: 2(x − 3) = 14', { u: '', tol: 0 }, 10, 'x − 3 = 7 → x = 10.'],
          ['nu', 'Resuelve: x/4 + 3 = 9', { u: '', tol: 0 }, 24, 'x/4 = 6 → x = 24.'],
          ['om', 'La forma estándar de una ecuación lineal es…', ['ax + b = 0', 'ax² + bx + c = 0', 'a² + b² = c²', 'y = x²'], 0, 'Primer grado: la x tiene exponente 1.'],
          ['vf', 'Si sumas el mismo número en ambos miembros de una ecuación, la igualdad se conserva.', null, true, 'Es la propiedad de la igualdad (la balanza).'],
          ['nu', 'Un plan de datos cuesta $150 fijos más $20 por GB extra. Pagaste $290. ¿Cuántos GB extra usaste?', { u: 'GB', tol: 0 }, 7, '150 + 20x = 290 → 20x = 140 → x = 7.', { n: 2 }],
          ['nu', 'Tres números consecutivos suman 96. ¿Cuál es el menor?', { u: '', tol: 0 }, 31, 'x + (x + 1) + (x + 2) = 96 → 3x + 3 = 96 → x = 31.', { n: 2 }],
          ['or', 'Ordena los pasos para resolver 4x − 6 = 18:', ['Sumar 6 en ambos miembros: 4x = 24', 'Dividir entre 4: x = 6', 'Comprobar: 4(6) − 6 = 18 ✔'], null, 'Primero se aísla el término con x y luego se despeja.'],
          ['om', '¿Dónde está el error? 2x + 6 = 10 → 2x = 16 → x = 8', ['Debió restar 6: 2x = 4, así que x = 2', 'Debió multiplicar por 2', 'No hay error', 'Debió dividir 10 entre 6'], 0, 'Para quitar +6 se resta 6 en ambos lados.', { n: 2 }],
          ['nu', 'Un servomotor gira 60° por segundo. Si parte de 30°, ¿en cuántos segundos llega a 210°?', { u: 's', tol: 0 }, 3, '30 + 60t = 210 → 60t = 180 → t = 3 s.', { n: 2 }],
          ['co', 'Completa: si 7x = 42, entonces x = ___', null, ['6'], '42 ÷ 7 = 6.'],
          ['nu', 'El largo de un rectángulo es el doble del ancho y su perímetro es 54 cm. ¿Cuánto mide el ancho?', { u: 'cm', tol: 0 }, 9, '2(2a + a) = 54 → 6a = 54 → a = 9 cm.', { n: 3 }]
        ]
      },
      {
        id: 'm3t2', nombre: 'Ecuaciones lineales con dos incógnitas',
        proposito: 'Propósito 2 · Aplica la aritmética y el álgebra para resolver ecuaciones lineales con dos incógnitas en situaciones de interés.',
        leccion: [
          { t: 'Dos incógnitas, muchas soluciones', h: `<p>Forma: <b>ax + by = c</b>. Cada solución es una <b>pareja (x, y)</b> que cumple la igualdad, y hay <b>infinitas</b>.</p>
            <div class="ej"><p>2x + 3y = 12: (3, 2) ✔ porque 6 + 6 = 12; (0, 4) ✔; (6, 0) ✔; (2, 3) ✖ porque 4 + 9 = 13.</p></div>` },
          { t: 'Despejar y graficar', h: `<p>Despeja y para tabular: 2x + y = 8 → <b>y = 8 − 2x</b>.</p>
            <table><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>4</td></tr><tr><th>y</th><td>8</td><td>6</td><td>4</td><td>0</td></tr></table>
            <p>Todas las parejas forman una <b>línea recta</b>. En <b>y = mx + b</b>: m es la pendiente (inclinación) y b la ordenada al origen (donde corta al eje y).</p>` },
          { t: 'Intersecciones con los ejes', h: `<ul><li>Con el eje y: haz x = 0. En 3x + 2y = 12 → 2y = 12 → y = 6 → punto (0, 6).</li><li>Con el eje x: haz y = 0. 3x = 12 → x = 4 → punto (4, 0).</li></ul><div class="tip">Con dos puntos ya puedes trazar la recta.</div>` }
        ],
        pares: [['ax + by = c', 'Lineal con dos incógnitas'], ['Pareja (x, y)', 'Una solución'], ['Infinitas', 'Número de soluciones'], ['Pendiente m', 'Inclinación de la recta'], ['Ordenada al origen', 'Corte con el eje y'], ['Haz x = 0', 'Intersección con eje y']],
        q: [
          ['om', '¿Cuál es una ecuación lineal con dos incógnitas?', ['2x + 3y = 12', 'x² + y = 4', 'xy = 6', '3x = 9'], 0, 'Ambas incógnitas con exponente 1 y sin multiplicarse entre sí.'],
          ['vf', 'Una ecuación lineal con dos incógnitas tiene infinitas soluciones.', null, true, 'Cada punto de la recta es una solución.'],
          ['om', '¿Qué pareja (x, y) es solución de 2x + 3y = 12?', ['(3, 2)', '(2, 3)', '(1, 4)', '(4, 2)'], 0, '2(3) + 3(2) = 6 + 6 = 12 ✔'],
          ['nu', 'En x + y = 10, si x = 7, ¿cuánto vale y?', { u: '', tol: 0 }, 3, 'y = 10 − 7 = 3.'],
          ['om', 'Despeja y en 2x + y = 8:', ['y = 8 − 2x', 'y = 2x − 8', 'y = 8 + 2x', 'y = 4 − x'], 0, 'Resta 2x en ambos lados.'],
          ['om', 'La gráfica de una ecuación lineal con dos incógnitas es…', ['una línea recta', 'una parábola', 'un círculo', 'un solo punto'], 0, 'Por eso se llama lineal.'],
          ['nu', 'En 3x + 2y = 12, ¿en qué valor de y corta al eje y? (haz x = 0)', { u: '', tol: 0 }, 6, '2y = 12 → y = 6.'],
          ['nu', 'En 3x + 2y = 12, ¿en qué valor de x corta al eje x? (haz y = 0)', { u: '', tol: 0 }, 4, '3x = 12 → x = 4.'],
          ['om', 'Boletos: adulto $50 y estudiante $30; se juntaron $400. Con x = adultos y y = estudiantes, ¿qué ecuación lo modela?', ['50x + 30y = 400', '30x + 50y = 400', 'x + y = 400', '80(x + y) = 400'], 0, 'Precio × cantidad de cada tipo.', { n: 2 }],
          ['om', 'Con 50x + 30y = 400, ¿qué combinación es posible?', ['5 adultos y 5 estudiantes', '4 adultos y 5 estudiantes', '6 adultos y 2 estudiantes', '2 adultos y 8 estudiantes'], 0, '250 + 150 = 400 ✔', { n: 2 }],
          ['nu', 'En y = 2x − 1, ¿cuánto vale y si x = 4?', { u: '', tol: 0 }, 7, '2(4) − 1 = 7.'],
          ['om', 'En y = 3x + 2, la pendiente es…', ['3', '2', '5', '−3'], 0, 'En y = mx + b, m es el coeficiente de x.', { n: 2 }],
          ['vf', 'El punto (0, 0) es solución de x + y = 5.', null, false, '0 + 0 = 0 ≠ 5.']
        ]
      },
      {
        id: 'm3t3', nombre: 'Sistemas de ecuaciones 2×2',
        proposito: 'Propósito 3 · Aplica la aritmética, el álgebra y el método gráfico para resolver sistemas de ecuaciones lineales (sustitución, igualación, reducción, gráfico y determinantes).',
        leccion: [
          { t: 'Dos ecuaciones a la vez', h: `<p>Un sistema 2×2 busca la pareja (x, y) que cumple <b>las dos</b> ecuaciones. Gráficamente es el <b>punto donde se cruzan</b> las rectas.</p>
            <table><tr><th>Rectas</th><th>Soluciones</th></tr><tr><td>Se cortan</td><td>Una</td></tr><tr><td>Paralelas</td><td>Ninguna</td></tr><tr><td>La misma recta</td><td>Infinitas</td></tr></table>` },
          { t: 'Métodos algebraicos', h: `<ul><li><b>Sustitución</b>: despeja una incógnita y sustitúyela en la otra ecuación.</li><li><b>Igualación</b>: despeja la misma incógnita en ambas e iguala.</li><li><b>Reducción</b> (suma y resta): suma o resta las ecuaciones para eliminar una incógnita.</li></ul>
            <div class="ej"><p>x + y = 10 y x − y = 4 → sumando: 2x = 14 → <b>x = 7</b>, y = 3.</p></div>` },
          { t: 'Determinantes (Cramer)', h: `<p>Para ax + by = c y dx + ey = f:</p><p>D = a·e − b·d · Dx = c·e − b·f · Dy = a·f − c·d → <b>x = Dx/D, y = Dy/D</b>.</p>
            <div class="ej"><p>3x + 2y = 16, x − y = 2 → D = 3(−1) − 2(1) = −5; Dx = 16(−1) − 2(2) = −20 → x = 4; Dy = 3(2) − 16(1) = −10 → y = 2.</p></div>` }
        ],
        pares: [['Sustitución', 'Despejar y reemplazar'], ['Igualación', 'Despejar lo mismo e igualar'], ['Reducción', 'Eliminar sumando o restando'], ['Método gráfico', 'Punto de cruce'], ['Rectas paralelas', 'Sin solución'], ['Misma recta', 'Infinitas soluciones']],
        q: [
          ['om', 'Resolver un sistema de dos ecuaciones lineales es encontrar…', ['los valores de x y y que cumplen ambas ecuaciones a la vez', 'solo el valor de x', 'la pendiente de cada recta', 'el área entre las rectas'], 0, 'La solución común.'],
          ['nu', 'Resuelve x + y = 10 ; x − y = 4. ¿Cuánto vale x?', { u: '', tol: 0 }, 7, 'Sumando: 2x = 14 → x = 7.'],
          ['nu', 'Del sistema x + y = 10 ; x − y = 4, ¿cuánto vale y?', { u: '', tol: 0 }, 3, 'y = 10 − 7 = 3.'],
          ['nu', 'Sustitución: y = 2x ; x + y = 12. ¿Cuánto vale x?', { u: '', tol: 0 }, 4, 'x + 2x = 12 → 3x = 12 → x = 4.'],
          ['nu', 'Reducción: 2x + 3y = 13 ; 2x − y = 1. ¿Cuánto vale y?', { u: '', tol: 0 }, 3, 'Restando: 4y = 12 → y = 3 (y x = 2).'],
          ['re', 'Relaciona el método con su idea:', [['Sustitución', 'Despejar y reemplazar en la otra ecuación'], ['Igualación', 'Despejar la misma incógnita e igualar'], ['Reducción', 'Sumar o restar para eliminar una incógnita'], ['Gráfico', 'Buscar el cruce de las rectas']], null, 'Cuatro caminos, la misma solución.'],
          ['om', 'Si las dos rectas del sistema son paralelas, el sistema…', ['no tiene solución', 'tiene una solución', 'tiene infinitas soluciones', 'tiene dos soluciones'], 0, 'Nunca se cruzan.'],
          ['om', 'Si las dos ecuaciones representan la misma recta, el sistema…', ['tiene infinitas soluciones', 'no tiene solución', 'tiene una solución', 'se vuelve cuadrático'], 0, 'Todos sus puntos coinciden.', { n: 2 }],
          ['nu', 'Calcula el determinante |2 3; 1 4| = 2·4 − 3·1', { u: '', tol: 0 }, 5, '8 − 3 = 5.', { n: 2 }],
          ['nu', 'En el taller hay 20 piezas entre engranes y poleas. Un engrane cuesta $15 y una polea $10; en total son $250. ¿Cuántos engranes hay?', { u: '', tol: 0 }, 10, 'e + p = 20 y 15e + 10p = 250 → 15e + 10(20 − e) = 250 → 5e = 50 → e = 10.', { n: 2 }],
          ['nu', 'Cine: 2 palomitas + 1 refresco = $110 y 1 palomita + 1 refresco = $70. ¿Cuánto cuesta una palomita?', { u: 'pesos', tol: 0 }, 40, 'Restando las ecuaciones: 1 palomita = 110 − 70 = $40.', { n: 2 }],
          ['om', 'En el método gráfico, la solución es…', ['el punto de intersección de las rectas', 'siempre el origen', 'la recta con mayor pendiente', 'donde cada recta corta al eje y'], 0, 'El punto común a ambas rectas.'],
          ['nu', 'Por determinantes: 3x + 2y = 16 ; x − y = 2. ¿Cuánto vale x?', { u: '', tol: 0 }, 4, 'D = −5, Dx = −20 → x = 4.', { n: 3 }],
          ['or', 'Ordena los pasos del método de sustitución:', ['Despejar una incógnita en una ecuación', 'Sustituir esa expresión en la otra ecuación', 'Resolver la ecuación de una incógnita', 'Sustituir el valor para hallar la otra incógnita', 'Comprobar en ambas ecuaciones'], null, 'Despejar → sustituir → resolver → encontrar la otra → comprobar.']
        ]
      },
      {
        id: 'm3t4', nombre: 'Ecuaciones cuadráticas',
        proposito: 'Propósito 4 · Aplica la aritmética y el álgebra para resolver ecuaciones cuadráticas (forma general) en situaciones de interés.',
        leccion: [
          { t: 'Forma general', h: `<p><b>ax² + bx + c = 0</b>, con a ≠ 0. Puede tener 2, 1 o 0 soluciones reales.</p>
            <ul><li>Incompleta pura (b = 0): x² = 49 → x = ±7.</li><li>Incompleta mixta (c = 0): x² − 4x = 0 → x(x − 4) = 0 → x = 0 o x = 4.</li></ul>` },
          { t: 'Factorización', h: `<p>Busca dos números que <b>multiplicados den c</b> y <b>sumados den b</b>.</p>
            <div class="ej"><p>x² − 5x + 6 = 0 → (−2)(−3) = 6 y −2 − 3 = −5 → (x − 2)(x − 3) = 0 → x = 2 o x = 3.</p></div>` },
          { t: 'Fórmula general y discriminante', h: `<p><b>x = (−b ± √(b² − 4ac)) / 2a</b>. El <b>discriminante</b> Δ = b² − 4ac decide:</p>
            <table><tr><th>Δ</th><th>Soluciones reales</th></tr><tr><td>&gt; 0</td><td>Dos</td></tr><tr><td>= 0</td><td>Una (doble)</td></tr><tr><td>&lt; 0</td><td>Ninguna</td></tr></table>
            <div class="ej"><p>x² + 2x − 8 = 0 → Δ = 4 + 32 = 36 → x = (−2 ± 6)/2 → x = 2 o x = −4.</p></div>` }
        ],
        pares: [['ax² + bx + c = 0', 'Forma general'], ['Discriminante', 'b² − 4ac'], ['Δ < 0', 'Sin soluciones reales'], ['Δ = 0', 'Una solución doble'], ['x² − 5x + 6', '(x − 2)(x − 3)'], ['x² = 49', 'x = ±7']],
        q: [
          ['om', 'La forma general de la ecuación cuadrática es…', ['ax² + bx + c = 0, con a ≠ 0', 'ax + b = 0', 'y = mx + b', 'a² + b² = c²'], 0, 'El término de mayor grado es x².'],
          ['om', 'En 2x² − 5x + 3 = 0, los coeficientes son…', ['a = 2, b = −5, c = 3', 'a = 2, b = 5, c = 3', 'a = −5, b = 2, c = 3', 'a = 3, b = −5, c = 2'], 0, 'a acompaña a x², b a x y c es el término independiente (con su signo).'],
          ['nu', 'Resuelve x² = 49 (escribe la raíz positiva).', { u: '', tol: 0 }, 7, 'x = ±7.'],
          ['om', 'Las soluciones de x² − 5x + 6 = 0 son…', ['x = 2 y x = 3', 'x = −2 y x = −3', 'x = 1 y x = 6', 'x = −1 y x = 6'], 0, '(x − 2)(x − 3) = 0.'],
          ['om', 'Las soluciones de x² − 4x = 0 son…', ['x = 0 y x = 4', 'solo x = 4', 'x = 2 y x = −2', 'solo x = 0'], 0, 'x(x − 4) = 0.'],
          ['nu', 'Calcula el discriminante de x² + 2x − 8 = 0', { u: '', tol: 0 }, 36, 'b² − 4ac = 4 − 4(1)(−8) = 36.'],
          ['om', 'Si el discriminante es negativo, la ecuación…', ['no tiene soluciones reales', 'tiene dos soluciones reales', 'tiene una solución real', 'es lineal'], 0, 'No existe la raíz cuadrada real de un negativo.', { n: 2 }],
          ['om', 'La fórmula general es…', ['x = (−b ± √(b² − 4ac)) / 2a', 'x = −b / a', 'x = (b ± √(b² + 4ac)) / 2a', 'x = c / a'], 0, 'También llamada «chicharronera».'],
          ['nu', 'Con la fórmula general, ¿cuál es la solución positiva de x² + 2x − 8 = 0?', { u: '', tol: 0 }, 2, 'x = (−2 ± 6)/2 → 2 o −4.', { n: 2 }],
          ['nu', 'Una placa rectangular mide 3 cm más de largo que de ancho y su área es 40 cm². ¿Cuánto mide el ancho?', { u: 'cm', tol: 0 }, 5, 'x(x + 3) = 40 → x² + 3x − 40 = 0 → (x + 8)(x − 5) = 0 → x = 5.', { n: 2 }],
          ['nu', 'Una pieza cuadrada tiene 144 cm² de área. ¿Cuánto mide su lado?', { u: 'cm', tol: 0 }, 12, 'l² = 144 → l = 12 cm.'],
          ['vf', 'Una ecuación cuadrática tiene como máximo dos soluciones reales.', null, true, 'Su gráfica (parábola) corta al eje x a lo más dos veces.'],
          ['nu', 'Se lanza una pelota y su altura es h = −5t² + 20t. ¿A los cuántos segundos vuelve al suelo (t > 0)?', { u: 's', tol: 0 }, 4, 't(−5t + 20) = 0 → t = 0 o t = 4.', { n: 3 }],
          ['om', 'Factoriza x² + 7x + 12:', ['(x + 3)(x + 4)', '(x + 2)(x + 6)', '(x − 3)(x − 4)', '(x + 1)(x + 12)'], 0, '3 · 4 = 12 y 3 + 4 = 7.', { n: 2 }]
        ]
      },
      {
        id: 'm3t5', nombre: 'Ángulos, triángulos y Pitágoras',
        proposito: 'Propósito 5 · Introducción a la geometría plana: ángulos (definición, tipos y componentes) y teorema de Pitágoras.',
        leccion: [
          { t: 'Ángulos', h: `<p>Un ángulo tiene <b>vértice</b>, dos <b>lados</b> y una <b>amplitud</b> (en grados, se mide con transportador).</p>
            <table><tr><th>Tipo</th><th>Medida</th></tr><tr><td>Agudo</td><td>&lt; 90°</td></tr><tr><td>Recto</td><td>90°</td></tr><tr><td>Obtuso</td><td>entre 90° y 180°</td></tr><tr><td>Llano</td><td>180°</td></tr></table>
            <ul><li><b>Complementarios</b>: suman 90°. <b>Suplementarios</b>: suman 180°.</li><li><b>Opuestos por el vértice</b>: son iguales.</li></ul>` },
          { t: 'Triángulos y polígonos', h: `<ul><li>Los ángulos interiores de un triángulo suman <b>180°</b>.</li><li>Los de un cuadrilátero suman <b>360°</b>. En general: 180°(n − 2).</li><li>Por lados: equilátero, isósceles, escaleno. Por ángulos: acutángulo, rectángulo, obtusángulo.</li></ul>` },
          { t: 'Teorema de Pitágoras', h: `<p>En un triángulo <b>rectángulo</b>: <b>c² = a² + b²</b> (c = hipotenusa, el lado más largo, opuesto al ángulo recto).</p>
            <div class="ej"><p>Catetos 6 y 8 → c = √(36 + 64) = √100 = <b>10</b>.<br>Hipotenusa 13 y cateto 5 → b = √(169 − 25) = √144 = <b>12</b>.</p></div>
            <div class="tip">Ternas famosas: 3-4-5, 5-12-13, 8-15-17, 7-24-25.</div>` }
        ],
        pares: [['Agudo', 'Menos de 90°'], ['Obtuso', 'Entre 90° y 180°'], ['Complementarios', 'Suman 90°'], ['Suplementarios', 'Suman 180°'], ['Hipotenusa', 'Opuesta al ángulo recto'], ['c² = a² + b²', 'Teorema de Pitágoras']],
        q: [
          ['om', 'Un ángulo de 90° es…', ['recto', 'agudo', 'obtuso', 'llano'], 0, 'Forma una «escuadra».'],
          ['om', 'Un ángulo de 135° es…', ['obtuso', 'agudo', 'recto', 'llano'], 0, 'Está entre 90° y 180°.'],
          ['nu', '¿Cuánto mide el complemento de un ángulo de 35°?', { u: '°', tol: 0 }, 55, '90° − 35° = 55°.'],
          ['nu', '¿Cuánto mide el suplemento de un ángulo de 110°?', { u: '°', tol: 0 }, 70, '180° − 110° = 70°.'],
          ['nu', 'Dos ángulos de un triángulo miden 50° y 60°. ¿Cuánto mide el tercero?', { u: '°', tol: 0 }, 70, '180° − 50° − 60° = 70°.'],
          ['om', 'Los ángulos opuestos por el vértice son…', ['iguales', 'siempre suplementarios', 'siempre complementarios', 'siempre rectos'], 0, 'Se forman al cruzarse dos rectas y miden lo mismo.'],
          ['re', 'Relaciona cada elemento del ángulo:', [['Vértice', 'Punto donde se unen los lados'], ['Lados', 'Semirrectas que lo forman'], ['Amplitud', 'Abertura medida en grados'], ['Transportador', 'Instrumento para medirlo']], null, 'Componentes de un ángulo.'],
          ['nu', 'Los catetos de un triángulo rectángulo miden 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?', { u: 'cm', tol: 0 }, 10, '√(36 + 64) = √100 = 10.'],
          ['nu', 'La hipotenusa mide 13 cm y un cateto 5 cm. ¿Cuánto mide el otro cateto?', { u: 'cm', tol: 0 }, 12, '√(169 − 25) = √144 = 12.'],
          ['nu', 'Una escalera de 5 m se apoya en una pared y su base está a 3 m de la pared. ¿A qué altura toca la pared?', { u: 'm', tol: 0 }, 4, '√(25 − 9) = √16 = 4 m.', { n: 2 }],
          ['vf', 'El teorema de Pitágoras solo se cumple en triángulos rectángulos.', null, true, 'Requiere un ángulo de 90°.'],
          ['om', 'En un triángulo rectángulo, el lado más largo es…', ['la hipotenusa', 'el cateto adyacente', 'el cateto opuesto', 'la altura'], 0, 'Está frente al ángulo recto.'],
          ['nu', '¿Cuánto mide la diagonal de una placa rectangular de 9 cm × 12 cm?', { u: 'cm', tol: 0 }, 15, '√(81 + 144) = √225 = 15 cm.', { n: 3 }],
          ['om', 'Un triángulo con lados de 7, 24 y 25 cm es…', ['rectángulo, porque 7² + 24² = 25²', 'equilátero', 'obtusángulo', 'imposible de construir'], 0, '49 + 576 = 625 ✔', { n: 2 }],
          ['nu', '¿Cuánto suman los ángulos interiores de un cuadrilátero?', { u: '°', tol: 0 }, 360, '180°(4 − 2) = 360°.']
        ]
      },
      {
        id: 'm3t6', nombre: 'El triángulo de Napoleón (geometría euclidiana)',
        proposito: 'Propósito 6 · Revisa el teorema del triángulo de Napoleón como problema-meta para aplicar resultados de la geometría euclidiana.',
        leccion: [
          { t: 'El problema-meta', h: `<p><b>Teorema de Napoleón</b>: si sobre cada lado de <b>cualquier</b> triángulo construyes hacia afuera un triángulo <b>equilátero</b>, los <b>centros</b> de esos tres equiláteros forman otro triángulo <b>equilátero</b>.</p>
            <div class="tip">Pruébalo en GeoGebra: mueve los vértices del triángulo original y verás que el triángulo de los centros sigue siendo equilátero.</div>` },
          { t: 'Lo que necesitas de Euclides', h: `<ul><li><b>Equilátero</b>: 3 lados iguales y 3 ángulos de 60°. Altura h = (√3/2)·a. Área A = (√3/4)·a².</li><li><b>Construcción</b> (Elementos, libro I): con compás, arcos de radio AB desde A y desde B; su cruce es el tercer vértice.</li><li><b>Congruencia</b>: LLL, LAL, ALA.</li></ul>` },
          { t: 'Rectas y puntos notables', h: `<table><tr><th>Rectas</th><th>Se cortan en…</th></tr><tr><td>Medianas (vértice → punto medio del lado opuesto)</td><td><b>Baricentro</b> (divide cada mediana 2 : 1)</td></tr><tr><td>Alturas</td><td>Ortocentro</td></tr><tr><td>Mediatrices</td><td>Circuncentro</td></tr><tr><td>Bisectrices</td><td>Incentro</td></tr></table>
            <p>En un equilátero los cuatro puntos coinciden: ese es su «centro».</p>` }
        ],
        pares: [['Medianas', 'Baricentro'], ['Alturas', 'Ortocentro'], ['Mediatrices', 'Circuncentro'], ['Bisectrices', 'Incentro'], ['Equilátero', 'Tres ángulos de 60°'], ['LLL', 'Tres lados iguales']],
        q: [
          ['om', '¿Qué afirma el teorema de Napoleón?', ['Los centros de equiláteros construidos sobre los lados de cualquier triángulo forman un triángulo equilátero', 'Los ángulos de un triángulo suman 180°', 'c² = a² + b²', 'Todo triángulo es equilátero'], 0, 'Funciona para cualquier triángulo.'],
          ['nu', '¿Cuánto mide cada ángulo interior de un triángulo equilátero?', { u: '°', tol: 0 }, 60, '180° ÷ 3 = 60°.'],
          ['om', 'El baricentro es el punto donde se cortan…', ['las medianas', 'las alturas', 'las mediatrices', 'las bisectrices'], 0, 'También es el centro de gravedad del triángulo.'],
          ['om', 'Una mediana une…', ['un vértice con el punto medio del lado opuesto', 'dos vértices', 'el centro con un vértice', 'los puntos medios de dos lados'], 0, 'Hay tres medianas.'],
          ['re', 'Relaciona cada recta notable con su punto:', [['Medianas', 'Baricentro'], ['Alturas', 'Ortocentro'], ['Mediatrices', 'Circuncentro'], ['Bisectrices', 'Incentro']], null, 'Rectas y puntos notables.'],
          ['vf', 'En un triángulo equilátero, baricentro, ortocentro, circuncentro e incentro coinciden.', null, true, 'Por su simetría.', { n: 2 }],
          ['nu', 'Altura de un triángulo equilátero de lado 10 cm (h = (√3/2)·a). Redondea a décimas.', { u: 'cm', tol: 0.01 }, 8.66, '(1.732/2)·10 ≈ 8.66 ≈ 8.7 cm.', { n: 2 }],
          ['nu', 'El baricentro divide cada mediana en razón 2 : 1. Si una mediana mide 9 cm, ¿cuánto hay del vértice al baricentro?', { u: 'cm', tol: 0 }, 6, '9 · 2/3 = 6 cm.', { n: 2 }],
          ['om', 'Dos triángulos con sus tres lados respectivamente iguales son congruentes por el criterio…', ['LLL', 'AAA', 'LLA', 'AA'], 0, 'Lado-lado-lado.'],
          ['nu', 'Perímetro de un triángulo equilátero de lado 7 cm:', { u: 'cm', tol: 0 }, 21, '3 · 7 = 21 cm.'],
          ['om', 'Para comprobar el teorema de Napoleón, ¿qué construyes sobre cada lado del triángulo?', ['Un triángulo equilátero', 'Un cuadrado', 'Un círculo de radio 1', 'Una recta paralela'], 0, 'Luego localizas el centro de cada equilátero.'],
          ['nu', 'Área de un triángulo equilátero de lado 4 cm (A = (√3/4)·a²). Redondea a centésimas.', { u: 'cm²', tol: 0.01 }, 6.93, '(1.732/4)·16 ≈ 6.93 cm².', { n: 3 }],
          ['or', 'Ordena la construcción de un triángulo equilátero con regla y compás sobre el segmento AB:', ['Trazar el segmento AB', 'Con centro en A y radio AB, trazar un arco', 'Con centro en B y el mismo radio, trazar otro arco', 'Unir el cruce de los arcos con A y con B'], null, 'Es la primera proposición de los Elementos de Euclides.'],
          ['om', 'Euclides es famoso por su obra…', ['Los Elementos', 'La República', 'El Príncipe', 'Principia'], 0, 'Base de la geometría euclidiana (c. 300 a. C.).', { n: 2 }]
        ]
      }
    ]
  };
})();
