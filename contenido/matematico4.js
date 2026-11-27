// ENGRANE · Pensamiento Matemático IV «Trigonometría y geometría analítica» (4° semestre)
// Fuente: SEP · MCC Modelo Educativo 2025 · Pensamiento Matemático IV — 7 propósitos formativos
// (punto y recta, razones trigonométricas, polinomios en dos variables, recta, parábola, circunferencia/elipse, modelación con cónicas).
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.matematico4 = {
    temas: [
      {
        id: 'm4t1', nombre: 'Punto, recta y circunferencia',
        proposito: 'Propósito 1 · Reconoce el punto, la recta, tangentes, secantes y la circunferencia como lugares geométricos y realiza construcciones.',
        leccion: [
          { t: 'Distancia y punto medio', h: `<p>Entre A(x₁, y₁) y B(x₂, y₂):</p><ul><li><b>Distancia</b>: d = √[(x₂ − x₁)² + (y₂ − y₁)²]</li><li><b>Punto medio</b>: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</li></ul>
            <div class="ej"><p>A(1, 2) y B(4, 6): d = √(9 + 16) = <b>5</b>; M = (2.5, 4).</p></div>` },
          { t: 'Rectas y circunferencia', h: `<ul><li>Una <b>secante</b> corta a la circunferencia en <b>dos</b> puntos; una <b>tangente</b> la toca en <b>uno</b> y es <b>perpendicular al radio</b> en ese punto.</li><li><b>Circunferencia</b>: todos los puntos a la misma distancia (radio) del centro.</li><li><b>Mediatriz</b> de un segmento: recta perpendicular que pasa por su punto medio; sus puntos equidistan de los extremos.</li></ul>` }
        ],
        pares: [['Secante', 'Corta en dos puntos'], ['Tangente', 'Toca en un punto'], ['Radio', 'Centro a la orilla'], ['Diámetro', 'Dos radios'], ['Mediatriz', 'Perpendicular por el punto medio'], ['Cuerda', 'Une dos puntos de la circunferencia']],
        q: [
          ['nu', 'Distancia entre A(1, 2) y B(4, 6):', { u: '', tol: 0 }, 5, '√(3² + 4²) = 5.'],
          ['nu', 'Distancia entre (0, 0) y (6, 8):', { u: '', tol: 0 }, 10, '√(36 + 64) = 10.'],
          ['nu', 'Distancia entre (−2, 1) y (3, 13):', { u: '', tol: 0 }, 13, '√(25 + 144) = 13.', { n: 2 }],
          ['nu', 'Coordenada x del punto medio entre (2, 5) y (8, 1):', { u: '', tol: 0 }, 5, '(2 + 8)/2 = 5.'],
          ['nu', 'Coordenada y del punto medio entre (2, 5) y (8, 1):', { u: '', tol: 0 }, 3, '(5 + 1)/2 = 3.'],
          ['om', 'Una recta que toca a la circunferencia en un solo punto es…', ['tangente', 'secante', 'cuerda', 'diámetro'], 0, 'Es perpendicular al radio en ese punto.'],
          ['om', 'Una recta que corta a la circunferencia en dos puntos es…', ['secante', 'tangente', 'radio', 'mediatriz'], 0, 'El segmento entre los dos puntos es una cuerda.'],
          ['om', 'La tangente forma con el radio en el punto de tangencia un ángulo de…', ['90°', '45°', '180°', '60°'], 0, 'Son perpendiculares.', { n: 2 }],
          ['om', 'Los puntos de la mediatriz de un segmento AB…', ['están a la misma distancia de A y de B', 'están más cerca de A', 'forman un círculo', 'son paralelos a AB'], 0, 'Lugar geométrico.', { n: 2 }],
          ['vf', 'El diámetro es la cuerda más larga de una circunferencia.', null, true, 'Pasa por el centro.'],
          ['nu', 'Una circunferencia tiene diámetro 14 cm. ¿Cuánto mide su radio?', { u: 'cm', tol: 0 }, 7, 'r = d/2.'],
          ['re', 'Relaciona:', [['Tangente', 'Un punto de contacto'], ['Secante', 'Dos puntos de corte'], ['Cuerda', 'Segmento entre dos puntos de la circunferencia'], ['Radio', 'Del centro a la circunferencia']], null, 'Elementos de la circunferencia.']
        ]
      },
      {
        id: 'm4t2', nombre: 'Razones trigonométricas',
        proposito: 'Propósito 2 · Utiliza las razones trigonométricas y sus identidades para resolver triángulos y problemas.',
        leccion: [
          { t: 'SOH-CAH-TOA', h: `<p>En un triángulo rectángulo, respecto al ángulo θ:</p><ul><li><b>sen θ</b> = cateto opuesto / hipotenusa</li><li><b>cos θ</b> = cateto adyacente / hipotenusa</li><li><b>tan θ</b> = opuesto / adyacente</li></ul>
            <table><tr><th>θ</th><th>sen</th><th>cos</th><th>tan</th></tr><tr><td>30°</td><td>0.5</td><td>0.866</td><td>0.577</td></tr><tr><td>45°</td><td>0.707</td><td>0.707</td><td>1</td></tr><tr><td>60°</td><td>0.866</td><td>0.5</td><td>1.732</td></tr></table>` },
          { t: 'Identidades', h: `<ul><li><b>sen²θ + cos²θ = 1</b></li><li>tan θ = sen θ / cos θ</li><li>Recíprocas: csc = 1/sen, sec = 1/cos, cot = 1/tan.</li></ul>
            <div class="ej"><p>Una rampa de 10 m forma 30° con el piso. Altura = 10 · sen 30° = <b>5 m</b>.</p></div>` }
        ],
        pares: [['sen θ', 'Opuesto / hipotenusa'], ['cos θ', 'Adyacente / hipotenusa'], ['tan θ', 'Opuesto / adyacente'], ['sen 30°', '0.5'], ['tan 45°', '1'], ['sen² + cos²', 'Siempre da 1']],
        q: [
          ['om', 'sen θ es igual a…', ['opuesto / hipotenusa', 'adyacente / hipotenusa', 'opuesto / adyacente', 'hipotenusa / opuesto'], 0, 'SOH.'],
          ['om', 'cos θ es igual a…', ['adyacente / hipotenusa', 'opuesto / hipotenusa', 'opuesto / adyacente', 'adyacente / opuesto'], 0, 'CAH.'],
          ['nu', 'Triángulo rectángulo con catetos 3 y 4. ¿Cuánto vale sen θ si el opuesto es 3? (decimal)', { u: '', tol: 0 }, 0.6, 'Hipotenusa 5 → 3/5 = 0.6.'],
          ['nu', 'Con el mismo triángulo (opuesto 3, adyacente 4), ¿tan θ?', { u: '', tol: 0 }, 0.75, '3/4.'],
          ['nu', 'Una rampa de 10 m forma 30° con el piso. ¿Qué altura alcanza?', { u: 'm', tol: 0 }, 5, '10 × sen 30° = 5 m.'],
          ['nu', 'Una escalera de 6 m forma 60° con el piso. ¿A qué distancia de la pared está su base?', { u: 'm', tol: 0 }, 3, '6 × cos 60° = 3 m.', { n: 2 }],
          ['nu', 'Desde 20 m de un poste, el ángulo de elevación a su punta es 45°. ¿Altura del poste?', { u: 'm', tol: 0 }, 20, 'h = 20 × tan 45° = 20 m.', { n: 2 }],
          ['nu', 'Si sen θ = 0.6, ¿cuánto vale cos θ? (θ agudo)', { u: '', tol: 0 }, 0.8, '√(1 − 0.36) = 0.8.', { n: 3 }],
          ['om', '¿Cuál es una identidad trigonométrica fundamental?', ['sen²θ + cos²θ = 1', 'sen θ + cos θ = 1', 'tan θ = cos θ / sen θ', 'sen θ = 2 cos θ'], 0, 'Viene del teorema de Pitágoras.'],
          ['om', 'tan θ también se puede escribir como…', ['sen θ / cos θ', 'cos θ / sen θ', '1 / sen θ', 'sen θ · cos θ'], 0, 'Opuesto/hip ÷ adyacente/hip.', { n: 2 }],
          ['vf', 'sen 30° = cos 60°.', null, true, 'Ambos valen 0.5: ángulos complementarios.', { n: 2 }],
          ['re', 'Relaciona el valor:', [['sen 30°', '0.5'], ['tan 45°', '1'], ['cos 0°', '1 (adyacente = hipotenusa)'], ['sen 90°', '1 (opuesto = hipotenusa)']], null, 'Valores notables.'],
          ['om', 'La secante (sec θ) es el recíproco de…', ['cos θ', 'sen θ', 'tan θ', 'cot θ'], 0, 'sec θ = 1 / cos θ.', { n: 3 }]
        ]
      },
      {
        id: 'm4t3', nombre: 'Polinomios en dos variables: simetría y extensión',
        proposito: 'Propósito 3 · Analiza ecuaciones polinomiales en dos variables: intersecciones, simetrías y extensión de la gráfica.',
        leccion: [
          { t: 'Intersecciones', h: `<ul><li>Con el eje <b>x</b>: haz <b>y = 0</b> y despeja x.</li><li>Con el eje <b>y</b>: haz <b>x = 0</b> y despeja y.</li></ul><div class="ej"><p>2x + 3y = 12 → corta x en (6, 0) y y en (0, 4).</p></div>` },
          { t: 'Simetrías', h: `<table><tr><th>Simétrica respecto a…</th><th>Prueba: la ecuación no cambia si…</th></tr><tr><td>eje y</td><td>cambias x por −x</td></tr><tr><td>eje x</td><td>cambias y por −y</td></tr><tr><td>origen</td><td>cambias x por −x y y por −y</td></tr></table>
            <p>y = x² es simétrica respecto al eje y. x² + y² = 25 lo es respecto a los dos ejes y al origen.</p>` },
          { t: 'Extensión', h: `<p>Son los valores que pueden tomar x y y. En x² + y² = 25: −5 ≤ x ≤ 5 y −5 ≤ y ≤ 5. En y = x²: x cualquier real, y ≥ 0.</p>` }
        ],
        pares: [['y = 0', 'Corte con eje x'], ['x = 0', 'Corte con eje y'], ['x → −x', 'Simetría eje y'], ['y → −y', 'Simetría eje x'], ['y = x²', 'Simétrica al eje y'], ['Extensión', 'Valores posibles']],
        q: [
          ['nu', '2x + 3y = 12. ¿En qué valor de x corta al eje x?', { u: '', tol: 0 }, 6, 'y = 0 → 2x = 12.'],
          ['nu', '2x + 3y = 12. ¿En qué valor de y corta al eje y?', { u: '', tol: 0 }, 4, 'x = 0 → 3y = 12.'],
          ['nu', 'y = x² − 9. ¿Cuál es la intersección positiva con el eje x?', { u: '', tol: 0 }, 3, 'x² = 9 → x = ±3.', { n: 2 }],
          ['nu', 'y = x² − 9. ¿Dónde corta al eje y?', { u: '', tol: 0 }, -9, 'x = 0 → y = −9.'],
          ['om', 'Para saber si una gráfica es simétrica respecto al eje y, cambias…', ['x por −x', 'y por −y', 'x por y', 'nada'], 0, 'Si la ecuación queda igual, es simétrica.'],
          ['om', '¿Qué gráfica es simétrica respecto al eje y?', ['y = x²', 'y = x³', 'y = 2x + 1', 'y = x + 5'], 0, '(−x)² = x².'],
          ['om', 'La gráfica de x² + y² = 25 es simétrica respecto a…', ['los dos ejes y el origen', 'solo el eje x', 'solo el eje y', 'ninguno'], 0, 'Es una circunferencia centrada en el origen.', { n: 2 }],
          ['om', 'y = x³ es simétrica respecto…', ['al origen', 'al eje y', 'al eje x', 'a nada'], 0, '(−x)³ = −x³ → −y.', { n: 3 }],
          ['om', 'La extensión en y de y = x² es…', ['y ≥ 0', 'y ≤ 0', 'cualquier real', '−1 ≤ y ≤ 1'], 0, 'Un cuadrado nunca es negativo.', { n: 2 }],
          ['nu', 'En x² + y² = 25, ¿cuál es el máximo valor que puede tomar x?', { u: '', tol: 0 }, 5, 'Cuando y = 0.'],
          ['vf', 'Para hallar el corte con el eje y se iguala x a cero.', null, true, 'En el eje y, x = 0.'],
          ['om', 'Un polinomio en dos variables es, por ejemplo…', ['x² + xy − 3y = 7', 'x + 1 = 0', '5 = 5', '√x = y⁻¹'], 0, 'Tiene términos con x y y y exponentes enteros no negativos.', { n: 2 }]
        ]
      },
      {
        id: 'm4t4', nombre: 'La recta y sus ecuaciones',
        proposito: 'Propósito 4 · Usa la proporcionalidad directa y las formas de la ecuación de la recta para modelar situaciones.',
        leccion: [
          { t: 'Pendiente', h: `<p><b>m = (y₂ − y₁) / (x₂ − x₁)</b>. m > 0 sube, m < 0 baja, m = 0 horizontal, vertical: no definida.</p><p>Proporcionalidad directa: y = kx (pasa por el origen).</p>` },
          { t: 'Las formas de la ecuación', h: `<table><tr><th>Forma</th><th>Ecuación</th></tr><tr><td>Punto-pendiente</td><td>y − y₁ = m(x − x₁)</td></tr><tr><td>Pendiente-ordenada</td><td>y = mx + b</td></tr><tr><td>Simétrica</td><td>x/a + y/b = 1</td></tr><tr><td>General</td><td>Ax + By + C = 0</td></tr></table>
            <ul><li>Paralelas: misma pendiente. Perpendiculares: m₁ · m₂ = −1.</li></ul>
            <div class="ej"><p>Un taxi cobra $30 de banderazo y $8 por km: <b>C = 8k + 30</b>. 10 km → $110.</p></div>` }
        ],
        pares: [['m', 'Pendiente'], ['b', 'Ordenada al origen'], ['y = kx', 'Proporcionalidad directa'], ['Paralelas', 'Misma pendiente'], ['Perpendiculares', 'm₁·m₂ = −1'], ['x/a + y/b = 1', 'Forma simétrica']],
        q: [
          ['nu', 'Pendiente de la recta que pasa por (1, 2) y (3, 8):', { u: '', tol: 0 }, 3, '(8 − 2)/(3 − 1) = 3.'],
          ['nu', 'Pendiente entre (0, 5) y (5, 0):', { u: '', tol: 0 }, -1, '(0 − 5)/(5 − 0) = −1.'],
          ['nu', 'En y = 4x − 7, ¿cuál es la ordenada al origen?', { u: '', tol: 0 }, -7, 'b = −7.'],
          ['nu', 'Taxi: $30 de banderazo y $8 por km. ¿Cuánto cuesta un viaje de 10 km?', { u: '$', tol: 0 }, 110, '8 × 10 + 30 = 110.'],
          ['nu', 'Recta con m = 2 que pasa por (1, 3). ¿Cuánto vale b en y = mx + b?', { u: '', tol: 0 }, 1, '3 = 2(1) + b → b = 1.', { n: 2 }],
          ['nu', 'Una recta es perpendicular a otra de pendiente 2. ¿Cuál es su pendiente? (decimal)', { u: '', tol: 0 }, -0.5, 'm₁ · m₂ = −1 → −1/2.', { n: 2 }],
          ['om', 'Dos rectas paralelas tienen…', ['la misma pendiente', 'pendientes opuestas', 'la misma ordenada', 'pendientes recíprocas'], 0, 'No se cruzan.'],
          ['om', 'Una recta horizontal tiene pendiente…', ['0', '1', 'no definida', '−1'], 0, 'No sube ni baja.'],
          ['om', 'La ecuación x/3 + y/6 = 1 corta al eje y en…', ['6', '3', '1', '−6'], 0, 'Forma simétrica: b = 6.', { n: 2 }],
          ['om', '¿Cuál representa proporcionalidad directa?', ['y = 5x', 'y = 5x + 2', 'y = 5/x', 'y = x² '], 0, 'Pasa por el origen.'],
          ['om', 'Escribe en forma pendiente-ordenada: 2x + y − 4 = 0', ['y = −2x + 4', 'y = 2x − 4', 'y = 2x + 4', 'y = −2x − 4'], 0, 'Despeja y.', { n: 2 }],
          ['vf', 'Una pendiente negativa indica que la recta baja de izquierda a derecha.', null, true, 'Al aumentar x, y disminuye.'],
          ['nu', 'Una banda transportadora avanza 0.5 m por segundo (y = 0.5x). ¿Cuántos metros avanza en 18 s?', { u: 'm', tol: 0 }, 9, '0.5 × 18 = 9 m.']
        ]
      },
      {
        id: 'm4t5', nombre: 'La parábola',
        proposito: 'Propósito 5 · Identifica la parábola, su ecuación ordinaria (vertical u horizontal, con vértice en el origen o fuera de él) y modela con ella.',
        leccion: [
          { t: 'Definición y elementos', h: `<p>Lugar de los puntos que están a la misma distancia de un punto fijo (<b>foco</b>) y de una recta (<b>directriz</b>). El <b>vértice</b> está a medio camino; <b>p</b> es la distancia del vértice al foco. <b>Lado recto</b> = |4p|.</p>` },
          { t: 'Ecuaciones ordinarias', h: `<table><tr><th>Vértice</th><th>Abre arriba/abajo</th><th>Abre derecha/izquierda</th></tr><tr><td>(0, 0)</td><td>x² = 4py</td><td>y² = 4px</td></tr><tr><td>(h, k)</td><td>(x − h)² = 4p(y − k)</td><td>(y − k)² = 4p(x − h)</td></tr></table>
            <p>p > 0: abre hacia arriba (o a la derecha); p < 0: hacia abajo (o a la izquierda).</p>
            <div class="ej"><p>x² = 12y → 4p = 12 → p = 3: foco (0, 3), directriz y = −3.</p></div>
            <div class="tip">Las antenas parabólicas y los faros concentran la señal o la luz en el foco.</div>` }
        ],
        pares: [['Foco', 'Punto fijo'], ['Directriz', 'Recta fija'], ['Vértice', 'Punto medio entre foco y directriz'], ['x² = 4py', 'Abre arriba si p > 0'], ['y² = 4px', 'Abre a la derecha si p > 0'], ['Lado recto', '|4p|']],
        q: [
          ['nu', 'x² = 12y. ¿Cuánto vale p?', { u: '', tol: 0 }, 3, '4p = 12.'],
          ['nu', 'x² = 12y. ¿Cuánto mide el lado recto?', { u: '', tol: 0 }, 12, '|4p| = 12.'],
          ['nu', 'y² = 8x. ¿Coordenada x del foco?', { u: '', tol: 0 }, 2, '4p = 8 → p = 2 → foco (2, 0).'],
          ['nu', 'x² = −16y. ¿Cuánto vale p?', { u: '', tol: 0 }, -4, '4p = −16.', { n: 2 }],
          ['om', 'x² = −16y abre hacia…', ['abajo', 'arriba', 'la derecha', 'la izquierda'], 0, 'x² con p negativo.'],
          ['om', 'y² = 8x abre hacia…', ['la derecha', 'la izquierda', 'arriba', 'abajo'], 0, 'y² con p positivo.'],
          ['om', 'La directriz de x² = 12y es…', ['y = −3', 'y = 3', 'x = 3', 'x = −3'], 0, 'p = 3, al otro lado del vértice.', { n: 2 }],
          ['om', '¿Cuál es el vértice de (x − 2)² = 8(y + 1)?', ['(2, −1)', '(−2, 1)', '(2, 1)', '(8, −1)'], 0, '(x − h)² = 4p(y − k) → h = 2, k = −1.', { n: 2 }],
          ['om', 'Una parábola es el lugar de puntos que equidistan de…', ['un foco y una directriz', 'dos focos', 'un centro', 'dos rectas paralelas'], 0, 'Definición.'],
          ['vf', 'Las antenas parabólicas concentran la señal en el foco.', null, true, 'Propiedad de reflexión.'],
          ['nu', 'Vértice en el origen, abre hacia arriba y el foco está en (0, 5). ¿Cuánto vale 4p en x² = 4py?', { u: '', tol: 0 }, 20, 'p = 5 → 4p = 20.', { n: 3 }],
          ['om', 'Una pelota lanzada describe una trayectoria…', ['parabólica', 'circular', 'recta', 'elíptica'], 0, 'Modelo con parábola vertical.'],
          ['nu', 'Un balón sigue h = −t² + 6t (m, s). ¿Altura máxima? (vértice en t = 3)', { u: 'm', tol: 0 }, 9, 'h(3) = −9 + 18 = 9 m.', { n: 3 }]
        ]
      },
      {
        id: 'm4t6', nombre: 'Circunferencia y elipse',
        proposito: 'Propósito 6 · Determina la ecuación de la circunferencia y de la elipse; relaciona la elipse con las leyes de Kepler.',
        leccion: [
          { t: 'Circunferencia', h: `<ul><li>Centro en el origen: <b>x² + y² = r²</b>.</li><li>Centro (h, k): <b>(x − h)² + (y − k)² = r²</b>.</li></ul><div class="ej"><p>(x − 3)² + (y + 2)² = 16 → centro (3, −2), radio 4.</p></div>` },
          { t: 'Elipse', h: `<p>Suma de distancias a dos <b>focos</b> constante (= 2a).</p><ul><li>Centro en el origen, eje mayor horizontal: <b>x²/a² + y²/b² = 1</b> con a > b.</li><li><b>c² = a² − b²</b> (c = distancia del centro a cada foco). Excentricidad e = c/a (entre 0 y 1).</li></ul>
            <div class="tip">1ª ley de Kepler: los planetas giran en <b>elipses</b> con el Sol en uno de los focos. Una circunferencia es una elipse con e = 0.</div>` }
        ],
        pares: [['x² + y² = r²', 'Circunferencia en el origen'], ['(h, k)', 'Centro'], ['2a', 'Eje mayor'], ['c² = a² − b²', 'Focos de la elipse'], ['e = c/a', 'Excentricidad'], ['Kepler', 'Órbitas elípticas']],
        q: [
          ['nu', 'x² + y² = 49. ¿Radio?', { u: '', tol: 0 }, 7, 'r² = 49.'],
          ['nu', '(x − 3)² + (y + 2)² = 16. ¿Radio?', { u: '', tol: 0 }, 4, '√16.'],
          ['om', '(x − 3)² + (y + 2)² = 16. ¿Centro?', ['(3, −2)', '(−3, 2)', '(3, 2)', '(16, 0)'], 0, 'Cambia el signo de lo que está dentro.'],
          ['om', 'Ecuación de la circunferencia con centro (0, 0) y radio 5:', ['x² + y² = 25', 'x² + y² = 5', 'x + y = 25', '(x − 5)² + y² = 0'], 0, 'r² = 25.'],
          ['om', 'Ecuación con centro (1, 4) y radio 3:', ['(x − 1)² + (y − 4)² = 9', '(x + 1)² + (y + 4)² = 9', '(x − 1)² + (y − 4)² = 3', 'x² + y² = 9'], 0, '(x − h)² + (y − k)² = r².', { n: 2 }],
          ['nu', 'Elipse x²/25 + y²/9 = 1. ¿Cuánto vale c? (c² = a² − b²)', { u: '', tol: 0 }, 4, '25 − 9 = 16 → c = 4.', { n: 2 }],
          ['nu', 'En la misma elipse, ¿cuánto mide el eje mayor (2a)?', { u: '', tol: 0 }, 10, 'a = 5.'],
          ['nu', 'Excentricidad de esa elipse (e = c/a):', { u: '', tol: 0 }, 0.8, '4/5.', { n: 3 }],
          ['om', 'Según la primera ley de Kepler, las órbitas de los planetas son…', ['elipses con el Sol en un foco', 'circunferencias con el Sol en el centro', 'parábolas', 'rectas'], 0, 'Kepler, 1609.'],
          ['om', 'En una elipse, la suma de distancias de cualquier punto a los dos focos es…', ['constante e igual a 2a', 'cero', 'variable', 'igual a c'], 0, 'Definición.', { n: 2 }],
          ['vf', 'Una circunferencia es una elipse con excentricidad 0.', null, true, 'Los dos focos coinciden en el centro.', { n: 2 }],
          ['om', 'Una elipse con excentricidad cercana a 1 es…', ['muy alargada', 'casi una circunferencia', 'una recta', 'una parábola'], 0, 'e cerca de 0: casi circular.', { n: 3 }]
        ]
      },
      {
        id: 'm4t7', nombre: 'Modelación con cónicas',
        proposito: 'Propósito 7 · Modela y estima situaciones reales con las cónicas y valora sus aplicaciones.',
        leccion: [
          { t: 'Reconocer la cónica', h: `<table><tr><th>Ecuación</th><th>Cónica</th></tr><tr><td>Solo una variable al cuadrado (x² = 4py)</td><td>Parábola</td></tr><tr><td>x² y y² con el mismo coeficiente y mismo signo</td><td>Circunferencia</td></tr><tr><td>x² y y² con distinto coeficiente y mismo signo</td><td>Elipse</td></tr><tr><td>x² y y² con signos distintos</td><td>Hipérbola</td></tr></table>` },
          { t: 'Dónde aparecen', h: `<ul><li><b>Parábola</b>: antenas, faros, puentes colgantes, tiros.</li><li><b>Circunferencia</b>: engranes, poleas, levas, cobertura de una antena (radio de alcance).</li><li><b>Elipse</b>: órbitas, engranes elípticos, salas de susurros.</li><li><b>Hipérbola</b>: torres de enfriamiento, navegación por GPS (diferencias de distancia).</li></ul>
            <div class="ej"><p>Una antena WiFi alcanza 30 m: la zona cubierta es x² + y² ≤ 900. ¿El punto (18, 24)? 18² + 24² = 900 → justo en la orilla.</p></div>` }
        ],
        pares: [['Parábola', 'Antena satelital'], ['Circunferencia', 'Alcance de una antena'], ['Elipse', 'Órbita planetaria'], ['Hipérbola', 'Torre de enfriamiento'], ['x² − y² = 1', 'Signos distintos'], ['4x² + 9y² = 36', 'Coeficientes distintos']],
        q: [
          ['om', '¿Qué cónica es 4x² + 9y² = 36?', ['Elipse', 'Circunferencia', 'Parábola', 'Hipérbola'], 0, 'Mismo signo, distinto coeficiente.'],
          ['om', '¿Qué cónica es x² + y² = 36?', ['Circunferencia', 'Elipse', 'Parábola', 'Hipérbola'], 0, 'Mismo coeficiente y signo.'],
          ['om', '¿Qué cónica es x² − y² = 9?', ['Hipérbola', 'Elipse', 'Circunferencia', 'Parábola'], 0, 'Signos distintos.'],
          ['om', '¿Qué cónica es y² = 20x?', ['Parábola', 'Hipérbola', 'Elipse', 'Circunferencia'], 0, 'Solo una variable al cuadrado.'],
          ['om', 'Las antenas satelitales tienen forma de…', ['parábola (paraboloide)', 'hipérbola', 'elipse', 'recta'], 0, 'Concentran la señal en el foco.'],
          ['om', 'La zona que cubre una antena con alcance fijo es…', ['un círculo', 'una parábola', 'una hipérbola', 'una recta'], 0, 'Todos los puntos a distancia ≤ r.'],
          ['nu', 'Una antena WiFi está en el origen y alcanza 30 m. ¿Cuánto vale r² en su ecuación?', { u: '', tol: 0 }, 900, '30² = 900.'],
          ['vf', 'El punto (18, 24) está dentro o en la orilla de la zona de alcance de 30 m.', null, true, '18² + 24² = 900 = 30².', { n: 2 }],
          ['nu', 'Una polea tiene radio 12 cm. ¿Cuánto mide su circunferencia? (π = 3.1416, redondea a décimas)', { u: 'cm', tol: 0.01 }, 75.4, '2πr = 75.398.', { n: 2 }],
          ['om', 'Los planetas describen órbitas…', ['elípticas', 'parabólicas', 'hiperbólicas', 'rectas'], 0, 'Kepler.'],
          ['re', 'Relaciona la cónica con su aplicación:', [['Parábola', 'Faro de auto'], ['Elipse', 'Órbita de la Tierra'], ['Circunferencia', 'Engrane'], ['Hipérbola', 'Torre de enfriamiento']], null, 'Aplicaciones.', { n: 2 }],
          ['nu', 'Un arco parabólico mide 8 m de ancho y 4 m de alto (vértice arriba). Con x² = 4p(y − 4), ¿cuánto vale 4p? (usa el punto (4, 0))', { u: '', tol: 0 }, -4, '16 = 4p(−4) → 4p = −4.', { n: 3 }]
        ]
      }
    ]
  };
})();
