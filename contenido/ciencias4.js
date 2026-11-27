// ENGRANE · Ciencias Naturales, Experimentales y Tecnología IV «El poder de la química» (4° semestre)
// Fuente: SEP · MCC Modelo Educativo 2025 · CNEyT IV — 8 propósitos formativos
// (reacciones, balanceo y mol, equilibrio, ácidos y bases, redox y combustión, química orgánica, biomoléculas, respiración celular).
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.ciencias4 = {
    temas: [
      {
        id: 'c4t1', nombre: 'Reacciones químicas y su clasificación',
        proposito: 'Propósito 1 · Reconoce las características de las reacciones químicas y las clasifica.',
        leccion: [
          { t: '¿Cómo sé que hubo reacción?', h: `<p>Evidencias: cambio de color, desprendimiento de gas (burbujas), formación de un sólido (<b>precipitado</b>), cambio de temperatura, emisión de luz u olor.</p>
            <ul><li><b>Exotérmica</b>: libera calor (combustión, un hot pack).</li><li><b>Endotérmica</b>: absorbe calor (compresa fría, fotosíntesis).</li></ul>` },
          { t: 'Tipos', h: `<table><tr><th>Tipo</th><th>Forma</th><th>Ejemplo</th></tr><tr><td>Síntesis</td><td>A + B → AB</td><td>2H₂ + O₂ → 2H₂O</td></tr><tr><td>Descomposición</td><td>AB → A + B</td><td>2H₂O → 2H₂ + O₂ (electrólisis)</td></tr><tr><td>Sustitución simple</td><td>A + BC → AC + B</td><td>Zn + 2HCl → ZnCl₂ + H₂</td></tr><tr><td>Doble sustitución</td><td>AB + CD → AD + CB</td><td>AgNO₃ + NaCl → AgCl↓ + NaNO₃</td></tr><tr><td>Neutralización</td><td>ácido + base → sal + agua</td><td>HCl + NaOH → NaCl + H₂O</td></tr></table>` }
        ],
        pares: [['Exotérmica', 'Libera calor'], ['Endotérmica', 'Absorbe calor'], ['Síntesis', 'A + B → AB'], ['Descomposición', 'AB → A + B'], ['Precipitado', 'Sólido que se forma'], ['Neutralización', 'Ácido + base']],
        q: [
          ['om', '¿Cuál es evidencia de una reacción química?', ['Se forman burbujas de gas nuevo', 'El hielo se derrite', 'El agua hierve', 'El papel se dobla'], 0, 'Los otros son cambios físicos.'],
          ['om', 'Una reacción que libera calor es…', ['exotérmica', 'endotérmica', 'nuclear', 'física'], 0, 'Exo = hacia fuera.'],
          ['om', 'Una compresa fría instantánea funciona con una reacción…', ['endotérmica', 'exotérmica', 'de combustión', 'nuclear'], 0, 'Absorbe calor de tu piel.'],
          ['om', '2H₂ + O₂ → 2H₂O es una reacción de…', ['síntesis', 'descomposición', 'sustitución simple', 'doble sustitución'], 0, 'Dos sustancias forman una.'],
          ['om', 'La electrólisis del agua (2H₂O → 2H₂ + O₂) es…', ['descomposición', 'síntesis', 'neutralización', 'combustión'], 0, 'Una sustancia se separa.'],
          ['om', 'Zn + 2HCl → ZnCl₂ + H₂ es…', ['sustitución simple', 'doble sustitución', 'síntesis', 'descomposición'], 0, 'El zinc desplaza al hidrógeno.', { n: 2 }],
          ['om', 'AgNO₃ + NaCl → AgCl↓ + NaNO₃ es…', ['doble sustitución', 'sustitución simple', 'síntesis', 'combustión'], 0, 'Intercambian parejas y se forma un precipitado.', { n: 2 }],
          ['om', 'HCl + NaOH → NaCl + H₂O es…', ['neutralización', 'síntesis', 'combustión', 'descomposición'], 0, 'Ácido + base → sal + agua.'],
          ['vf', 'La fotosíntesis es una reacción endotérmica.', null, true, 'Absorbe energía de la luz.', { n: 2 }],
          ['vf', 'Disolver azúcar en agua es una reacción química.', null, false, 'Es un cambio físico: no se forma una sustancia nueva.'],
          ['re', 'Relaciona el tipo con su forma general:', [['Síntesis', 'A + B → AB'], ['Descomposición', 'AB → A + B'], ['Sustitución simple', 'A + BC → AC + B'], ['Doble sustitución', 'AB + CD → AD + CB']], null, 'Clasificación.', { n: 2 }],
          ['om', 'En una ecuación química, la flecha separa…', ['reactivos (izquierda) de productos (derecha)', 'metales de no metales', 'sólidos de gases', 'átomos de moléculas'], 0, 'Reactivos → productos.']
        ]
      },
      {
        id: 'c4t2', nombre: 'Balanceo, mol y masa molar',
        proposito: 'Propósito 2 · Balancea ecuaciones y aplica el mol, la masa molar y la conservación de la masa.',
        leccion: [
          { t: 'Ley de conservación de la masa', h: `<p>Lavoisier: en una reacción la masa <b>no se crea ni se destruye</b>. Por eso debe haber el mismo número de átomos de cada elemento a cada lado.</p>
            <p><b>Tanteo</b>: ajusta coeficientes (nunca subíndices), empezando por metales, luego no metales, al final H y O.</p><div class="ej"><p>CH₄ + O₂ → CO₂ + H₂O → <b>CH₄ + 2O₂ → CO₂ + 2H₂O</b></p></div>` },
          { t: 'El mol', h: `<ul><li>1 mol = <b>6.022 × 10²³</b> partículas (número de Avogadro).</li><li><b>Masa molar</b>: suma de masas atómicas en g/mol. H = 1, C = 12, N = 14, O = 16, Na = 23, Cl = 35.5.</li><li>H₂O = 2(1) + 16 = <b>18 g/mol</b>. CO₂ = 12 + 2(16) = <b>44 g/mol</b>.</li><li>moles = masa / masa molar.</li></ul>` }
        ],
        pares: [['Lavoisier', 'Conservación de la masa'], ['Avogadro', '6.022 × 10²³'], ['H₂O', '18 g/mol'], ['CO₂', '44 g/mol'], ['Coeficiente', 'Número delante de la fórmula'], ['Subíndice', 'No se cambia al balancear']],
        q: [
          ['nu', 'Masa molar del agua (H = 1, O = 16):', { u: 'g/mol', tol: 0 }, 18, '2 + 16.'],
          ['nu', 'Masa molar del CO₂ (C = 12, O = 16):', { u: 'g/mol', tol: 0 }, 44, '12 + 32.'],
          ['nu', 'Masa molar del NaCl (Na = 23, Cl = 35.5):', { u: 'g/mol', tol: 0 }, 58.5, '23 + 35.5.'],
          ['nu', '¿Cuántos moles hay en 36 g de agua?', { u: 'mol', tol: 0 }, 2, '36 / 18.'],
          ['nu', '¿Cuántos gramos son 3 mol de CO₂?', { u: 'g', tol: 0 }, 132, '3 × 44.', { n: 2 }],
          ['nu', 'Masa molar del CH₄ (C = 12, H = 1):', { u: 'g/mol', tol: 0 }, 16, '12 + 4.'],
          ['nu', 'Balancea: CH₄ + __O₂ → CO₂ + 2H₂O. ¿Coeficiente del O₂?', { u: '', tol: 0 }, 2, '4 O a la derecha → 2 O₂.', { n: 2 }],
          ['nu', 'Balancea: N₂ + 3H₂ → __NH₃. ¿Coeficiente del NH₃?', { u: '', tol: 0 }, 2, '2 N y 6 H.', { n: 2 }],
          ['nu', 'Reaccionan 4 g de H₂ con 32 g de O₂ y no sobra nada. ¿Cuántos gramos de agua se forman?', { u: 'g', tol: 0 }, 36, 'Conservación de la masa: 4 + 32.', { n: 3 }],
          ['om', 'Al balancear una ecuación se pueden cambiar…', ['solo los coeficientes', 'los subíndices', 'los símbolos', 'las flechas'], 0, 'Cambiar subíndices cambia la sustancia.'],
          ['om', '¿Cuántas partículas hay en 1 mol?', ['6.022 × 10²³', '1000', '6.022 × 10⁻²³', '100'], 0, 'Número de Avogadro.'],
          ['vf', 'En una reacción química, la masa de los productos es igual a la de los reactivos.', null, true, 'Ley de Lavoisier.']
        ]
      },
      {
        id: 'c4t3', nombre: 'Equilibrio químico',
        proposito: 'Propósito 3 · Distingue reacciones reversibles e irreversibles e interpreta el equilibrio químico y su constante.',
        leccion: [
          { t: 'Reversible o irreversible', h: `<ul><li><b>Irreversible</b>: va en un solo sentido (quemar papel).</li><li><b>Reversible</b> (⇌): los productos vuelven a formar reactivos.</li><li><b>Equilibrio</b>: la velocidad de ida = velocidad de vuelta; las concentraciones ya no cambian (pero la reacción sigue: equilibrio <b>dinámico</b>).</li></ul>` },
          { t: 'Constante y Le Châtelier', h: `<p>Para aA + bB ⇌ cC + dD: <b>K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</b>. K grande → predominan productos; K pequeña → reactivos.</p>
            <p><b>Le Châtelier</b>: si perturbas un equilibrio, el sistema se desplaza para contrarrestar: agregar reactivo → hacia productos; subir la presión → hacia donde hay menos moles de gas; calentar una exotérmica → hacia reactivos.</p>
            <div class="ej"><p>Haber: N₂ + 3H₂ ⇌ 2NH₃ (exotérmica). Alta presión favorece al amoniaco (4 moles de gas → 2).</p></div>` }
        ],
        pares: [['⇌', 'Reacción reversible'], ['Equilibrio dinámico', 'Ida = vuelta'], ['K grande', 'Predominan productos'], ['Le Châtelier', 'Contrarresta el cambio'], ['Más presión', 'Hacia menos moles de gas'], ['Irreversible', 'Un solo sentido']],
        q: [
          ['om', 'El símbolo ⇌ indica una reacción…', ['reversible', 'irreversible', 'nuclear', 'de combustión'], 0, 'Va en ambos sentidos.'],
          ['om', 'Quemar papel es una reacción…', ['irreversible', 'reversible', 'en equilibrio', 'física'], 0, 'No puedes recuperar el papel.'],
          ['om', 'En el equilibrio químico…', ['la velocidad de ida es igual a la de vuelta', 'la reacción se detiene por completo', 'ya no hay reactivos', 'la masa desaparece'], 0, 'Equilibrio dinámico.'],
          ['om', 'Si K es muy grande, en el equilibrio predominan…', ['los productos', 'los reactivos', 'los catalizadores', 'los gases nobles'], 0, 'Productos en el numerador.', { n: 2 }],
          ['om', 'Si agregas más reactivo a un sistema en equilibrio, este se desplaza hacia…', ['los productos', 'los reactivos', 'ningún lado', 'el catalizador'], 0, 'Le Châtelier.', { n: 2 }],
          ['om', 'En N₂ + 3H₂ ⇌ 2NH₃, aumentar la presión favorece…', ['la formación de NH₃', 'la formación de N₂', 'nada', 'la descomposición'], 0, '4 moles de gas → 2: menos moles.', { n: 3 }],
          ['om', 'Si calientas una reacción exotérmica en equilibrio, se desplaza hacia…', ['los reactivos', 'los productos', 'ningún lado', 'el estado sólido'], 0, 'El calor actúa como producto.', { n: 3 }],
          ['nu', 'Para A ⇌ B, en el equilibrio [A] = 0.5 M y [B] = 2 M. ¿K = [B]/[A]?', { u: '', tol: 0 }, 4, '2 / 0.5.', { n: 2 }],
          ['vf', 'En el equilibrio químico la reacción se detiene.', null, false, 'Sigue en ambos sentidos a igual velocidad.'],
          ['vf', 'Un catalizador cambia el valor de K.', null, false, 'Solo hace que se llegue más rápido al equilibrio.', { n: 3 }],
          ['om', 'El proceso Haber produce…', ['amoniaco para fertilizantes', 'gasolina', 'acero', 'vidrio'], 0, 'N₂ + 3H₂ ⇌ 2NH₃.']
        ]
      },
      {
        id: 'c4t4', nombre: 'Ácidos, bases y pH',
        proposito: 'Propósito 4 · Explica ácidos y bases según Arrhenius, Brønsted-Lowry y Lewis, y usa la escala de pH.',
        leccion: [
          { t: 'Tres teorías', h: `<table><tr><th>Teoría</th><th>Ácido</th><th>Base</th></tr><tr><td>Arrhenius</td><td>Libera H⁺ en agua</td><td>Libera OH⁻ en agua</td></tr><tr><td>Brønsted-Lowry</td><td><b>Dona</b> H⁺ (protón)</td><td><b>Acepta</b> H⁺</td></tr><tr><td>Lewis</td><td><b>Acepta</b> un par de electrones</td><td><b>Dona</b> un par de electrones</td></tr></table>` },
          { t: 'La escala de pH', h: `<p><b>pH = −log[H⁺]</b>. Va de 0 a 14: <b>< 7 ácido</b>, <b>7 neutro</b>, <b>> 7 básico</b>. Cada unidad = 10 veces más (o menos) ácido.</p>
            <ul><li>Jugo gástrico ≈ 1.5 · limón ≈ 2 · refresco ≈ 3 · agua pura 7 · sangre ≈ 7.4 · jabón ≈ 10 · cloro ≈ 12.5</li><li>pH + pOH = 14.</li></ul>
            <div class="tip">Indicadores: papel tornasol (rojo en ácido, azul en base), fenolftaleína (rosa en base), col morada.</div>` }
        ],
        pares: [['Arrhenius ácido', 'Libera H⁺'], ['Arrhenius base', 'Libera OH⁻'], ['Brønsted ácido', 'Dona protón'], ['Lewis base', 'Dona par de electrones'], ['pH 7', 'Neutro'], ['pH + pOH', '14']],
        q: [
          ['om', 'Según Arrhenius, un ácido es una sustancia que en agua libera…', ['H⁺', 'OH⁻', 'electrones', 'Na⁺'], 0, 'Las bases liberan OH⁻.'],
          ['om', 'Según Brønsted-Lowry, una base…', ['acepta un protón (H⁺)', 'dona un protón', 'dona OH⁻ siempre', 'acepta electrones'], 0, 'Ácido dona, base acepta.'],
          ['om', 'Según Lewis, un ácido…', ['acepta un par de electrones', 'dona un par de electrones', 'libera OH⁻', 'es siempre un metal'], 0, 'Base de Lewis: dona el par.', { n: 3 }],
          ['om', 'Una sustancia con pH 3 es…', ['ácida', 'básica', 'neutra', 'salina'], 0, 'Menor que 7.'],
          ['om', '¿Cuál es básica?', ['Jabón (pH ≈ 10)', 'Limón (pH ≈ 2)', 'Refresco (pH ≈ 3)', 'Vinagre (pH ≈ 3)'], 0, 'Mayor que 7.'],
          ['nu', 'Si [H⁺] = 10⁻⁴ M, ¿cuál es el pH?', { u: '', tol: 0 }, 4, 'pH = −log(10⁻⁴) = 4.', { n: 2 }],
          ['nu', 'Una solución tiene pH 9. ¿Cuánto vale su pOH?', { u: '', tol: 0 }, 5, '14 − 9.', { n: 2 }],
          ['nu', '¿Cuántas veces más ácida es una solución de pH 3 que una de pH 5?', { u: 'veces', tol: 0 }, 100, '10² = 100.', { n: 3 }],
          ['om', 'El papel tornasol azul se vuelve rojo en…', ['un ácido', 'una base', 'agua pura', 'aceite'], 0, 'Indicador ácido-base.'],
          ['om', 'La fenolftaleína se pone rosa en…', ['una base', 'un ácido', 'agua neutra', 'alcohol'], 0, 'Incolora en ácido.', { n: 2 }],
          ['vf', 'El agua pura a 25 °C tiene pH 7.', null, true, 'Es neutra.'],
          ['re', 'Relaciona con su pH aproximado:', [['Jugo gástrico', '1.5'], ['Agua pura', '7'], ['Sangre', '7.4'], ['Cloro doméstico', '12.5']], null, 'Escala de pH.', { n: 2 }]
        ]
      },
      {
        id: 'c4t5', nombre: 'Óxido-reducción y combustión',
        proposito: 'Propósito 5 · Identifica reacciones de óxido-reducción y de combustión y sus aplicaciones e impactos.',
        leccion: [
          { t: 'Oxidar y reducir', h: `<p><b>OIL RIG</b> (en español: «<b>pierde</b> se <b>oxida</b>, <b>gana</b> se <b>reduce</b>»):</p><ul><li><b>Oxidación</b>: pierde electrones; su número de oxidación <b>aumenta</b>.</li><li><b>Reducción</b>: gana electrones; su número de oxidación <b>disminuye</b>.</li><li>El <b>agente reductor</b> se oxida; el <b>agente oxidante</b> se reduce.</li></ul>
            <div class="ej"><p>Fe → Fe³⁺ + 3e⁻ (oxidación: el hierro se oxida y se forma herrumbre).</p></div>` },
          { t: 'Combustión y aplicaciones', h: `<ul><li>Combustión completa: combustible + O₂ → <b>CO₂ + H₂O</b> + energía.</li><li>Incompleta (poco oxígeno): produce <b>CO</b> (monóxido, muy tóxico) y hollín.</li><li>Triángulo del fuego: combustible, oxígeno y calor.</li><li>Redox en la vida diaria: baterías, galvanizado, corrosión, respiración.</li></ul>` }
        ],
        pares: [['Oxidación', 'Pierde electrones'], ['Reducción', 'Gana electrones'], ['Agente reductor', 'Se oxida'], ['Agente oxidante', 'Se reduce'], ['Combustión completa', 'CO₂ + H₂O'], ['CO', 'Combustión incompleta']],
        q: [
          ['om', 'La oxidación es…', ['pérdida de electrones', 'ganancia de electrones', 'ganancia de protones', 'pérdida de neutrones'], 0, '«Pierde se oxida».'],
          ['om', 'La reducción es…', ['ganancia de electrones', 'pérdida de electrones', 'pérdida de masa', 'ganancia de oxígeno siempre'], 0, '«Gana se reduce».'],
          ['om', 'En Fe → Fe³⁺ + 3e⁻ el hierro…', ['se oxida', 'se reduce', 'no cambia', 'se neutraliza'], 0, 'Pierde 3 electrones.'],
          ['om', 'El agente oxidante…', ['se reduce', 'se oxida', 'no participa', 'es siempre el oxígeno'], 0, 'Oxida a otro y él gana electrones.', { n: 2 }],
          ['om', 'Los productos de la combustión completa de un hidrocarburo son…', ['CO₂ y H₂O', 'CO y hollín', 'H₂ y O₂', 'NaCl y H₂O'], 0, 'Con suficiente oxígeno.'],
          ['om', 'Un calentador en un baño cerrado y sin ventilación es peligroso porque produce…', ['monóxido de carbono (CO)', 'oxígeno', 'nitrógeno', 'vapor de agua solamente'], 0, 'Combustión incompleta: gas tóxico e inodoro.'],
          ['nu', 'En el ion Fe³⁺, ¿cuál es el número de oxidación del hierro?', { u: '', tol: 0 }, 3, 'Carga del ion.'],
          ['nu', 'Número de oxidación del oxígeno en la mayoría de sus compuestos:', { u: '', tol: 0 }, -2, 'Excepto en peróxidos (−1).', { n: 2 }],
          ['om', '¿Cuáles son los tres lados del triángulo del fuego?', ['Combustible, oxígeno y calor', 'Agua, aire y tierra', 'Gas, luz y humo', 'Carbono, hidrógeno y nitrógeno'], 0, 'Quita uno y se apaga.'],
          ['vf', 'La corrosión de un metal es una reacción de óxido-reducción.', null, true, 'El metal se oxida.'],
          ['om', 'El galvanizado protege al acero porque…', ['el zinc se oxida primero y protege al hierro', 'lo pinta', 'lo hace más pesado', 'elimina el oxígeno del aire'], 0, 'Protección de sacrificio.', { n: 3 }],
          ['om', 'Una pila o batería funciona gracias a…', ['una reacción redox', 'una neutralización', 'la evaporación', 'la fusión nuclear'], 0, 'Transfiere electrones por el circuito.', { n: 2 }]
        ]
      },
      {
        id: 'c4t6', nombre: 'Química orgánica',
        proposito: 'Propósito 6 · Reconoce los compuestos del carbono: enlaces, grupos funcionales, nomenclatura básica y polímeros.',
        leccion: [
          { t: 'El carbono', h: `<p>El carbono forma <b>4 enlaces</b> y cadenas largas. Hidrocarburos:</p><table><tr><th>Familia</th><th>Enlace C–C</th><th>Terminación</th><th>Ejemplo</th></tr><tr><td>Alcanos</td><td>sencillo</td><td>-ano</td><td>metano CH₄, propano C₃H₈</td></tr><tr><td>Alquenos</td><td>doble</td><td>-eno</td><td>eteno (etileno) C₂H₄</td></tr><tr><td>Alquinos</td><td>triple</td><td>-ino</td><td>etino (acetileno) C₂H₂</td></tr></table>
            <p>Prefijos: met (1), et (2), prop (3), but (4), pent (5), hex (6). Alcanos: <b>CₙH₂ₙ₊₂</b>.</p>` },
          { t: 'Grupos funcionales y polímeros', h: `<table><tr><th>Grupo</th><th>Fórmula</th><th>Ejemplo</th></tr><tr><td>Alcohol</td><td>–OH</td><td>etanol</td></tr><tr><td>Ácido carboxílico</td><td>–COOH</td><td>ácido acético (vinagre)</td></tr><tr><td>Cetona</td><td>C=O en medio</td><td>acetona</td></tr><tr><td>Aldehído</td><td>–CHO</td><td>formaldehído</td></tr><tr><td>Amina</td><td>–NH₂</td><td>metilamina</td></tr></table>
            <p><b>Polímeros</b>: cadenas de muchas unidades (monómeros). Polietileno (bolsas), PVC (tubería), PET (botellas), nylon.</p>` }
        ],
        pares: [['Alcano', 'Enlace sencillo'], ['Alqueno', 'Enlace doble'], ['Alquino', 'Enlace triple'], ['–OH', 'Alcohol'], ['–COOH', 'Ácido carboxílico'], ['Monómero', 'Unidad de un polímero']],
        q: [
          ['nu', '¿Cuántos enlaces forma normalmente el carbono?', { u: '', tol: 0 }, 4, 'Es tetravalente.'],
          ['om', 'Un hidrocarburo con un enlace doble C=C es un…', ['alqueno', 'alcano', 'alquino', 'alcohol'], 0, 'Terminación -eno.'],
          ['om', 'El acetileno de los sopletes (C₂H₂) es un…', ['alquino', 'alcano', 'alqueno', 'éter'], 0, 'Triple enlace.', { n: 2 }],
          ['om', '¿Cuántos carbonos tiene el propano?', ['3', '1', '2', '4'], 0, 'met 1, et 2, prop 3, but 4.'],
          ['nu', 'Alcano con 4 carbonos (butano): ¿cuántos hidrógenos tiene? (CₙH₂ₙ₊₂)', { u: '', tol: 0 }, 10, '2(4) + 2.', { n: 2 }],
          ['om', 'El grupo –OH caracteriza a los…', ['alcoholes', 'ácidos carboxílicos', 'aminas', 'cetonas'], 0, 'Como el etanol.'],
          ['om', 'El vinagre contiene ácido acético, que tiene el grupo…', ['–COOH', '–OH', '–NH₂', '–CHO'], 0, 'Ácido carboxílico.'],
          ['om', 'Las botellas de agua están hechas del polímero…', ['PET', 'PVC', 'nylon', 'caucho'], 0, 'Tereftalato de polietileno.'],
          ['om', 'Un polímero es…', ['una molécula grande formada por muchos monómeros', 'un átomo de carbono', 'un ácido fuerte', 'un metal'], 0, 'Poli = muchos.'],
          ['vf', 'El metano (CH₄) es el principal componente del gas natural.', null, true, 'El alcano más sencillo.'],
          ['re', 'Relaciona el grupo funcional:', [['–OH', 'Alcohol'], ['–COOH', 'Ácido carboxílico'], ['–NH₂', 'Amina'], ['C=O en medio de la cadena', 'Cetona']], null, 'Grupos funcionales.', { n: 3 }],
          ['om', 'La tubería de drenaje blanca suele ser de…', ['PVC', 'PET', 'polietileno de bolsa', 'nylon'], 0, 'Policloruro de vinilo.', { n: 2 }]
        ]
      },
      {
        id: 'c4t7', nombre: 'Biomoléculas',
        proposito: 'Propósito 7 · Reconoce la estructura y función de carbohidratos, lípidos, proteínas y ácidos nucleicos.',
        leccion: [
          { t: 'Las cuatro familias', h: `<table><tr><th>Biomolécula</th><th>Unidad</th><th>Función principal</th><th>Ejemplos</th></tr><tr><td>Carbohidratos</td><td>monosacáridos (glucosa)</td><td>Energía rápida y estructura</td><td>almidón, celulosa, glucógeno</td></tr><tr><td>Lípidos</td><td>ácidos grasos y glicerol</td><td>Reserva de energía, membranas</td><td>aceites, colesterol, fosfolípidos</td></tr><tr><td>Proteínas</td><td><b>aminoácidos</b></td><td>Estructura, enzimas, transporte, defensa</td><td>hemoglobina, colágeno, anticuerpos</td></tr><tr><td>Ácidos nucleicos</td><td>nucleótidos</td><td>Información genética</td><td>ADN, ARN</td></tr></table>` },
          { t: 'Detalles que importan', h: `<ul><li>Hay <b>20 aminoácidos</b>; los <b>esenciales</b> (9 en adultos) deben venir de la dieta.</li><li>Las <b>enzimas</b> son proteínas que aceleran reacciones (catalizadores biológicos).</li><li>ADN: bases A–T y C–G, doble hélice. ARN: usa U en lugar de T.</li><li>1 g de grasa ≈ 9 kcal; 1 g de carbohidrato o proteína ≈ 4 kcal.</li></ul>` }
        ],
        pares: [['Glucosa', 'Monosacárido'], ['Aminoácido', 'Unidad de proteína'], ['Nucleótido', 'Unidad de ADN'], ['Enzima', 'Catalizador biológico'], ['Celulosa', 'Pared de las plantas'], ['A–T', 'Par de bases del ADN']],
        q: [
          ['om', 'Las proteínas están formadas por…', ['aminoácidos', 'monosacáridos', 'nucleótidos', 'ácidos grasos solamente'], 0, 'Unidas por enlaces peptídicos.'],
          ['om', '¿Qué biomolécula guarda la información genética?', ['Ácidos nucleicos (ADN y ARN)', 'Lípidos', 'Carbohidratos', 'Vitaminas'], 0, 'Secuencia de bases.'],
          ['om', 'La principal fuente de energía rápida son los…', ['carbohidratos', 'ácidos nucleicos', 'minerales', 'proteínas estructurales'], 0, 'Glucosa.'],
          ['om', 'Las membranas celulares están formadas principalmente por…', ['fosfolípidos', 'almidón', 'ADN', 'celulosa'], 0, 'Lípidos.', { n: 2 }],
          ['om', 'Una enzima es…', ['una proteína que acelera reacciones', 'un azúcar', 'una grasa', 'un tipo de ADN'], 0, 'Catalizador biológico.'],
          ['om', 'En el ADN, la adenina (A) se une con…', ['timina (T)', 'citosina (C)', 'guanina (G)', 'uracilo (U)'], 0, 'A–T y C–G.', { n: 2 }],
          ['om', 'Los aminoácidos esenciales…', ['se deben obtener de la dieta', 'los fabrica el cuerpo siempre', 'son azúcares', 'están solo en el ADN'], 0, 'El cuerpo no los sintetiza.', { n: 2 }],
          ['nu', '¿Cuántos aminoácidos distintos forman las proteínas humanas?', { u: '', tol: 0 }, 20, 'Los 20 aminoácidos estándar.'],
          ['nu', '¿Cuántas kcal aporta 10 g de grasa? (9 kcal/g)', { u: 'kcal', tol: 0 }, 90, '10 × 9.', { n: 2 }],
          ['vf', 'El ARN usa uracilo en lugar de timina.', null, true, 'U en lugar de T.', { n: 2 }],
          ['om', 'La celulosa es un carbohidrato que forma…', ['la pared celular de las plantas', 'los músculos', 'la sangre', 'el ADN'], 0, 'No la digerimos: es fibra.'],
          ['re', 'Relaciona la biomolécula con su unidad:', [['Proteína', 'Aminoácido'], ['Ácido nucleico', 'Nucleótido'], ['Carbohidrato', 'Monosacárido'], ['Triglicérido', 'Glicerol y ácidos grasos']], null, 'Monómeros.', { n: 3 }]
        ]
      },
      {
        id: 'c4t8', nombre: 'Respiración celular',
        proposito: 'Propósito 8 · Explica la respiración celular (glucólisis, ciclo de Krebs, cadena de transporte de electrones) y la fermentación.',
        leccion: [
          { t: 'La ecuación general', h: `<p><b>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energía (ATP)</b>. Es casi lo contrario de la fotosíntesis.</p>
            <table><tr><th>Etapa</th><th>Dónde</th><th>Qué pasa</th><th>ATP aprox.</th></tr><tr><td>Glucólisis</td><td>Citoplasma</td><td>Glucosa → 2 piruvatos</td><td>2</td></tr><tr><td>Ciclo de Krebs</td><td>Matriz de la mitocondria</td><td>Libera CO₂ y carga NADH/FADH₂</td><td>2</td></tr><tr><td>Cadena de transporte de electrones</td><td>Membrana interna de la mitocondria</td><td>O₂ recibe electrones y forma agua</td><td>≈ 26–34</td></tr></table>
            <p>Total ≈ <b>30–38 ATP</b> por glucosa.</p>` },
          { t: 'Sin oxígeno: fermentación', h: `<ul><li><b>Láctica</b> (músculos en esfuerzo intenso, yogur): piruvato → ácido láctico.</li><li><b>Alcohólica</b> (levaduras: pan, cerveza): piruvato → etanol + CO₂ (el CO₂ esponja el pan).</li><li>Solo produce <b>2 ATP</b> por glucosa (de la glucólisis).</li></ul>` }
        ],
        pares: [['Glucólisis', 'Citoplasma'], ['Ciclo de Krebs', 'Matriz mitocondrial'], ['Cadena de electrones', 'Membrana interna'], ['ATP', 'Moneda de energía'], ['Fermentación láctica', 'Músculo y yogur'], ['Fermentación alcohólica', 'Levadura y pan']],
        q: [
          ['om', '¿Dónde ocurre la glucólisis?', ['En el citoplasma', 'En la mitocondria', 'En el núcleo', 'En el cloroplasto'], 0, 'Primera etapa, no necesita oxígeno.'],
          ['om', 'El ciclo de Krebs ocurre en…', ['la matriz de la mitocondria', 'el citoplasma', 'el núcleo', 'la pared celular'], 0, 'Libera CO₂.'],
          ['om', 'La etapa que produce más ATP es…', ['la cadena de transporte de electrones', 'la glucólisis', 'la fermentación', 'el ciclo de Calvin'], 0, 'Fosforilación oxidativa.'],
          ['om', 'En la respiración aerobia, el oxígeno…', ['recibe los electrones al final de la cadena y forma agua', 'se convierte en glucosa', 'se libera', 'no participa'], 0, 'Aceptor final.', { n: 2 }],
          ['nu', 'En la glucólisis, una glucosa se divide en ¿cuántas moléculas de piruvato?', { u: '', tol: 0 }, 2, 'Dos de 3 carbonos.'],
          ['nu', 'Ganancia neta de ATP en la glucólisis:', { u: 'ATP', tol: 0 }, 2, 'Por glucosa.', { n: 2 }],
          ['nu', 'En C₆H₁₂O₆ + 6O₂ → __CO₂ + 6H₂O, ¿coeficiente del CO₂?', { u: '', tol: 0 }, 6, '6 carbonos.'],
          ['om', 'Cuando corres mucho y tus músculos no reciben suficiente oxígeno hacen…', ['fermentación láctica', 'fermentación alcohólica', 'fotosíntesis', 'ciclo de Krebs más rápido'], 0, 'Producen ácido láctico.'],
          ['om', 'El pan se esponja por el CO₂ de la…', ['fermentación alcohólica de la levadura', 'fermentación láctica', 'respiración de la harina', 'combustión del horno'], 0, 'Levadura.', { n: 2 }],
          ['vf', 'La fermentación produce mucho más ATP que la respiración aerobia.', null, false, 'Solo 2 ATP frente a ≈ 30–38.'],
          ['or', 'Ordena las etapas de la respiración celular aerobia:', ['Glucólisis', 'Ciclo de Krebs', 'Cadena de transporte de electrones'], null, 'Citoplasma → matriz → membrana interna.'],
          ['om', 'La respiración celular es casi el proceso inverso de…', ['la fotosíntesis', 'la digestión', 'la fermentación', 'la mitosis'], 0, 'Una libera O₂ y la otra lo consume.', { n: 2 }]
        ]
      }
    ]
  };
})();
