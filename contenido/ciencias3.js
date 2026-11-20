// ENGRANE · Ciencias Naturales, Experimentales y Tecnología III «Nuestro hogar. El sistema terrestre»
// Fuente: SEP · MCCEMS Modelo Educativo 2025 · CNEyT III · 8 propósitos formativos (la Tierra como sistema;
// hidrósfera y atmósfera; flujo de energía y ciclos biogeoquímicos; reacciones químicas; oxigenación de la
// atmósfera y óxidos; fotosíntesis; deterioro ambiental; innovaciones tecnológicas).
(function () {
  const ENG = window.ENG;
  ENG.CONTENIDO.ciencias3 = {
    temas: [
      {
        id: 'c3t1', nombre: 'La Tierra como sistema',
        proposito: 'Propósito 1 · Comprende a la Tierra como un sistema a partir de sus subsistemas (hidrósfera, atmósfera, litósfera y biósfera) y sus interacciones.',
        leccion: [
          { t: 'Cuatro subsistemas', h: `<table><tr><th>Subsistema</th><th>Qué incluye</th></tr>
            <tr><td><b>Litósfera</b> (geósfera)</td><td>Rocas, minerales, suelo, corteza y manto superior</td></tr>
            <tr><td><b>Hidrósfera</b></td><td>Toda el agua: océanos, ríos, lagos, glaciares, agua subterránea</td></tr>
            <tr><td><b>Atmósfera</b></td><td>Capa de gases: ≈78 % nitrógeno, ≈21 % oxígeno, ≈1 % argón y trazas de CO₂</td></tr>
            <tr><td><b>Biósfera</b></td><td>Todos los seres vivos y los lugares donde habitan</td></tr></table>` },
          { t: 'Todo está conectado', h: `<ul><li>Un volcán (litósfera) lanza gases y cenizas a la atmósfera.</li><li>La lluvia (hidrósfera) erosiona rocas y forma suelo.</li><li>Las plantas (biósfera) toman CO₂ del aire y liberan O₂.</li></ul>
            <p>La Tierra intercambia <b>energía</b> con el espacio (recibe luz solar, emite calor), pero casi no intercambia <b>materia</b>: la materia se <b>recicla</b> en ciclos.</p>` },
          { t: 'Pensar en sistemas', h: `<p>Un <b>sistema</b> es un conjunto de partes que interactúan. Un cambio en una parte afecta a las demás (como en un mecanismo: si un engrane se traba, todo se detiene).</p><div class="ej"><p>Deforestar (biósfera) → menos raíces → más erosión (litósfera) → ríos con sedimentos (hidrósfera) → menos captura de CO₂ (atmósfera).</p></div>` }
        ],
        pares: [['Litósfera', 'Rocas y suelo'], ['Hidrósfera', 'Toda el agua'], ['Atmósfera', 'Capa de gases'], ['Biósfera', 'Seres vivos'], ['Nitrógeno', '≈78 % del aire'], ['Sistema', 'Partes que interactúan']],
        q: [
          ['om', '¿Qué subsistema incluye océanos, ríos, glaciares y agua subterránea?', ['Hidrósfera', 'Litósfera', 'Atmósfera', 'Biósfera'], 0, 'Hidro = agua.'],
          ['om', '¿Qué subsistema está formado por rocas, minerales y suelo?', ['Litósfera', 'Hidrósfera', 'Biósfera', 'Atmósfera'], 0, 'Litos = piedra.'],
          ['om', 'El gas más abundante en la atmósfera es el…', ['nitrógeno', 'oxígeno', 'dióxido de carbono', 'hidrógeno'], 0, 'Alrededor del 78 %.'],
          ['nu', '¿Qué porcentaje aproximado del aire es oxígeno?', { u: '%', tol: 0.05 }, 21, 'Cerca del 21 %.'],
          ['om', 'La biósfera es…', ['el conjunto de seres vivos y los lugares donde viven', 'la capa de ozono', 'el núcleo terrestre', 'el agua dulce'], 0, 'Bio = vida.'],
          ['om', 'Un volcán que lanza gases al aire es un ejemplo de interacción entre…', ['litósfera y atmósfera', 'hidrósfera y biósfera', 'solo biósfera', 'ninguna'], 0, 'Material del interior (litósfera) llega al aire (atmósfera).'],
          ['vf', 'La Tierra intercambia energía con el espacio, pero casi no intercambia materia.', null, true, 'Recibe luz solar y emite calor; la materia se recicla.', { n: 2 }],
          ['om', 'Las plantas toman CO₂ del aire y liberan O₂. ¿Qué subsistemas interactúan?', ['Biósfera y atmósfera', 'Litósfera e hidrósfera', 'Solo atmósfera', 'Hidrósfera y litósfera'], 0, 'Seres vivos ↔ gases.'],
          ['re', 'Relaciona el ejemplo con su subsistema:', [['Un glaciar', 'Hidrósfera'], ['Un bosque', 'Biósfera'], ['Una montaña', 'Litósfera'], ['El viento', 'Atmósfera']], null, 'Ubica cada elemento.'],
          ['om', 'Si se deforesta un cerro, ¿qué ocurre en cadena?', ['Más erosión del suelo y ríos con más sedimentos', 'Aumenta la lluvia siempre', 'No pasa nada', 'Se enfría el núcleo'], 0, 'Un cambio en un subsistema afecta a los demás.', { n: 2 }],
          ['vf', 'Un sistema es un conjunto de partes que interactúan entre sí.', null, true, 'Como un mecanismo.']
        ]
      },
      {
        id: 'c3t2', nombre: 'Hidrósfera y atmósfera: materia y energía',
        proposito: 'Propósito 2 · Aplica estados de agregación, clasificación de la materia, densidad, presión y temperatura para explicar capas y composición de hidrósfera y atmósfera; ciclo del agua; clima y tiempo atmosférico.',
        leccion: [
          { t: 'La materia', h: `<ul><li><b>Estados</b>: sólido, líquido, gas (y plasma).</li><li><b>Cambios</b>: fusión (s→l), solidificación (l→s), evaporación (l→g), condensación (g→l), sublimación (s→g), deposición (g→s).</li><li><b>Clasificación</b>: sustancias puras (elementos y compuestos) y mezclas (homogéneas y heterogéneas). El aire es una mezcla homogénea; el agua pura, un compuesto.</li><li><b>Densidad</b> ρ = m / V. Agua ≈ 1 g/cm³; el hielo (≈0.92) flota.</li></ul>` },
          { t: 'Capas de la atmósfera', h: `<table><tr><th>Capa</th><th>Rasgo</th></tr><tr><td>Tropósfera</td><td>Donde vivimos y ocurre el clima (nubes, lluvia)</td></tr><tr><td>Estratósfera</td><td>Capa de ozono: filtra rayos UV</td></tr><tr><td>Mesósfera</td><td>Se queman los meteoros</td></tr><tr><td>Termósfera</td><td>Auroras; muy alta temperatura</td></tr><tr><td>Exósfera</td><td>Transición al espacio</td></tr></table>
            <p>La <b>presión atmosférica</b> disminuye con la altura (hay menos aire encima).</p>` },
          { t: 'Agua, clima y tiempo', h: `<p>≈97 % del agua es salada; del agua dulce, la mayor parte está congelada en glaciares.</p>
            <p><b>Ciclo del agua</b>: evaporación → condensación (nubes) → precipitación → escurrimiento e infiltración.</p>
            <div class="tip"><b>Tiempo atmosférico</b> = cómo está hoy (llueve, hace calor). <b>Clima</b> = promedio de muchos años (≈30) en un lugar.</div>` }
        ],
        pares: [['Evaporación', 'Líquido a gas'], ['Condensación', 'Gas a líquido'], ['Tropósfera', 'Fenómenos del clima'], ['Estratósfera', 'Capa de ozono'], ['Clima', 'Promedio de años'], ['Densidad', 'Masa entre volumen']],
        q: [
          ['om', 'El paso de gas a líquido (como el vapor en un vidrio frío) se llama…', ['condensación', 'evaporación', 'fusión', 'sublimación'], 0, 'Así se forman las nubes y el rocío.'],
          ['om', 'El aire es…', ['una mezcla homogénea', 'un elemento', 'un compuesto', 'una mezcla heterogénea'], 0, 'Gases mezclados uniformemente.'],
          ['om', '¿En qué capa de la atmósfera ocurren la lluvia y las nubes?', ['Tropósfera', 'Estratósfera', 'Mesósfera', 'Termósfera'], 0, 'La más cercana al suelo.'],
          ['om', 'La capa de ozono, que filtra los rayos UV, está en la…', ['estratósfera', 'tropósfera', 'exósfera', 'mesósfera'], 0, 'Entre ~15 y 35 km de altura.'],
          ['nu', 'Un líquido de 200 g ocupa 250 cm³. ¿Cuál es su densidad?', { u: 'g/cm³', tol: 0.01 }, 0.8, 'ρ = 200 / 250 = 0.8 g/cm³ (flotaría en agua).', { n: 2 }],
          ['vf', 'El hielo flota porque es menos denso que el agua líquida.', null, true, '≈0.92 g/cm³ contra ≈1 g/cm³.'],
          ['om', 'Al subir una montaña, la presión atmosférica…', ['disminuye', 'aumenta', 'no cambia', 'se duplica'], 0, 'Hay menos aire encima.'],
          ['om', '«Hoy está nublado y hace 18 °C en Purísima» describe…', ['el tiempo atmosférico', 'el clima', 'la hidrósfera', 'la litósfera'], 0, 'Es un estado del momento, no un promedio de años.'],
          ['or', 'Ordena el ciclo del agua empezando en el mar:', ['Evaporación', 'Condensación (nubes)', 'Precipitación', 'Escurrimiento e infiltración'], null, 'El agua circula impulsada por la energía del Sol.'],
          ['nu', '¿Qué porcentaje aproximado del agua de la Tierra es salada?', { u: '%', tol: 0.02 }, 97, 'Solo ≈3 % es dulce.'],
          ['re', 'Relaciona el cambio de estado:', [['Fusión', 'Sólido a líquido'], ['Solidificación', 'Líquido a sólido'], ['Evaporación', 'Líquido a gas'], ['Sublimación', 'Sólido a gas']], null, 'Cambios de estado.', { n: 2 }],
          ['om', 'El agua pura (H₂O) es…', ['un compuesto', 'un elemento', 'una mezcla', 'un estado de agregación'], 0, 'Dos elementos unidos químicamente.']
        ]
      },
      {
        id: 'c3t3', nombre: 'Energía en los ecosistemas y ciclos biogeoquímicos',
        proposito: 'Propósito 3 · Biomasa, productividad primaria y eficiencia ecológica; ciclo del carbono y aspectos generales de los ciclos del nitrógeno y del fósforo.',
        leccion: [
          { t: 'La energía fluye', h: `<p>Productores (plantas, algas) → consumidores primarios (herbívoros) → secundarios → terciarios; los <b>descomponedores</b> (hongos, bacterias) reciclan.</p>
            <p><b>Regla del 10 %</b> (eficiencia ecológica): a cada nivel pasa solo ≈10 % de la energía; el resto se pierde como calor.</p>
            <div class="ej"><p>10 000 kcal en pasto → 1 000 en conejos → 100 en coyotes.</p></div>
            <p><b>Productividad primaria</b>: rapidez con que los productores fijan energía y producen <b>biomasa</b> (materia orgánica).</p>` },
          { t: 'Ciclo del carbono', h: `<ul><li>Fotosíntesis: las plantas toman CO₂.</li><li>Respiración y descomposición: devuelven CO₂.</li><li>Combustión de fósiles: libera CO₂ guardado por millones de años.</li><li>Los océanos disuelven y almacenan CO₂.</li></ul>` },
          { t: 'Nitrógeno y fósforo', h: `<ul><li><b>Nitrógeno</b>: abunda en el aire (N₂) pero las plantas no lo usan así; bacterias del suelo y de raíces de leguminosas (frijol) lo <b>fijan</b>. Otras bacterias lo regresan al aire (desnitrificación).</li><li><b>Fósforo</b>: no tiene fase gaseosa importante; va de las rocas al suelo, a los seres vivos y al agua. El exceso de fertilizantes causa <b>eutrofización</b> (algas que agotan el oxígeno del agua).</li></ul>` }
        ],
        pares: [['Productor', 'Hace fotosíntesis'], ['Descomponedor', 'Recicla materia muerta'], ['Regla del 10 %', 'Eficiencia ecológica'], ['Biomasa', 'Materia orgánica'], ['Fijación de N', 'Bacterias del suelo'], ['Eutrofización', 'Exceso de nutrientes en agua']],
        q: [
          ['om', 'En una cadena trófica, las plantas son…', ['productores', 'consumidores primarios', 'descomponedores', 'consumidores secundarios'], 0, 'Producen su alimento con luz solar.'],
          ['nu', 'Si los productores tienen 10 000 kcal, ¿cuánta energía llega a los consumidores primarios (regla del 10 %)?', { u: 'kcal', tol: 0 }, 1000, '10 % de 10 000 = 1 000 kcal.'],
          ['nu', 'Siguiendo la regla del 10 %, ¿cuánta energía de esas 10 000 kcal llega a los consumidores secundarios?', { u: 'kcal', tol: 0 }, 100, '10 000 → 1 000 → 100 kcal.', { n: 2 }],
          ['om', '¿A dónde va la mayor parte de la energía que no pasa al siguiente nivel?', ['Se pierde como calor en la respiración y actividades', 'Se destruye', 'Vuelve al Sol', 'Se convierte en agua'], 0, 'La energía no se recicla: fluye y se disipa.'],
          ['om', 'Los hongos y bacterias que degradan restos de seres vivos son…', ['descomponedores', 'productores', 'herbívoros', 'carnívoros'], 0, 'Devuelven nutrientes al suelo.'],
          ['om', '¿Qué proceso SACA CO₂ de la atmósfera?', ['La fotosíntesis', 'La combustión de gasolina', 'La respiración', 'Los incendios'], 0, 'Las plantas lo usan para fabricar glucosa.'],
          ['om', '¿Qué proceso libera carbono almacenado por millones de años?', ['La quema de combustibles fósiles', 'La fotosíntesis', 'La fijación de nitrógeno', 'La infiltración'], 0, 'Petróleo, gas y carbón son carbono antiguo.'],
          ['om', '¿Quiénes convierten el N₂ del aire en formas que las plantas pueden usar?', ['Bacterias fijadoras de nitrógeno', 'Los volcanes', 'Los peces', 'Los rayos UV'], 0, 'Muchas viven en raíces de leguminosas como el frijol.', { n: 2 }],
          ['vf', 'El ciclo del fósforo no tiene una fase gaseosa importante.', null, true, 'Circula entre rocas, suelo, agua y seres vivos.', { n: 2 }],
          ['om', 'El exceso de fertilizantes en un lago provoca crecimiento de algas y falta de oxígeno. Esto se llama…', ['eutrofización', 'fotosíntesis', 'condensación', 'sublimación'], 0, 'Exceso de nutrientes (N y P).'],
          ['om', 'La productividad primaria es…', ['la rapidez con que los productores fijan energía y producen biomasa', 'la cantidad de carnívoros', 'el agua de un ecosistema', 'la temperatura promedio'], 0, 'Base energética del ecosistema.'],
          ['or', 'Ordena la cadena trófica:', ['Pasto', 'Chapulín', 'Rana', 'Serpiente', 'Águila'], null, 'Productor → consumidores de niveles cada vez más altos.']
        ]
      },
      {
        id: 'c3t4', nombre: 'Reacciones y ecuaciones químicas',
        proposito: 'Propósito 4 · Concepto y estructura de la reacción química; la ecuación química y su simbología.',
        leccion: [
          { t: '¿Qué es una reacción química?', h: `<p>Proceso en el que unas sustancias (<b>reactivos</b>) se transforman en otras nuevas (<b>productos</b>).</p><p>Evidencias: cambio de color, desprendimiento de gas (burbujas), formación de un sólido (precipitado), cambio de temperatura, emisión de luz.</p>
            <div class="tip">Derretir hielo NO es reacción química (es cambio físico): sigue siendo agua.</div>` },
          { t: 'La ecuación química', h: `<p class="frase-objetivo">2H₂ + O₂ → 2H₂O</p><ul><li><b>Coeficiente</b> (número grande al frente): cuántas moléculas.</li><li><b>Subíndice</b> (número pequeño): cuántos átomos de ese elemento en la molécula.</li><li>En 2H₂O hay 2 × 2 = <b>4 átomos de H</b> y 2 de O.</li></ul>` },
          { t: 'Simbología', h: `<table><tr><th>Símbolo</th><th>Significado</th></tr><tr><td>→</td><td>produce</td></tr><tr><td>⇄</td><td>reacción reversible</td></tr><tr><td>(s) (l) (g) (ac)</td><td>sólido, líquido, gas, disuelto en agua</td></tr><tr><td>Δ sobre la flecha</td><td>se aplica calor</td></tr><tr><td>↑ / ↓</td><td>se desprende gas / se forma precipitado</td></tr></table>
            <p><b>Ley de conservación de la masa</b> (Lavoisier): la masa de los reactivos es igual a la de los productos.</p>` }
        ],
        pares: [['Reactivos', 'Sustancias iniciales'], ['Productos', 'Sustancias nuevas'], ['Coeficiente', 'Número de moléculas'], ['Subíndice', 'Átomos en la molécula'], ['(ac)', 'Disuelto en agua'], ['Δ', 'Se aplica calor']],
        q: [
          ['om', 'En una ecuación química, las sustancias que están a la izquierda de la flecha son…', ['los reactivos', 'los productos', 'los catalizadores', 'los coeficientes'], 0, 'Reactivos → productos.'],
          ['om', '¿Cuál es una evidencia de reacción química?', ['Se desprende un gas y cambia el color', 'El hielo se derrite', 'El agua hierve', 'Se rompe un vidrio'], 0, 'Se forman sustancias nuevas.'],
          ['vf', 'Derretir hielo es una reacción química.', null, false, 'Es un cambio físico: sigue siendo H₂O.'],
          ['nu', '¿Cuántos átomos de hidrógeno hay en 2H₂O?', { u: '', tol: 0 }, 4, 'Coeficiente 2 × subíndice 2 = 4.'],
          ['nu', '¿Cuántos átomos de oxígeno hay en 3CO₂?', { u: '', tol: 0 }, 6, '3 × 2 = 6.'],
          ['om', 'El símbolo (ac) en una ecuación química significa…', ['disuelto en agua (acuoso)', 'ácido', 'sólido', 'gas'], 0, 'Acuoso.'],
          ['om', 'En 2H₂ + O₂ → 2H₂O, el número 2 que está antes de H₂O es un…', ['coeficiente', 'subíndice', 'producto', 'catalizador'], 0, 'Indica cuántas moléculas.'],
          ['nu', 'Si reaccionan 4 g de hidrógeno con 32 g de oxígeno y no sobra nada, ¿cuántos gramos de agua se forman?', { u: 'g', tol: 0 }, 36, 'Conservación de la masa: 4 + 32 = 36 g.', { n: 2 }],
          ['om', 'La ley de conservación de la masa se atribuye a…', ['Lavoisier', 'Newton', 'Darwin', 'Mendel'], 0, 'Antoine Lavoisier, siglo XVIII.'],
          ['nu', 'En CH₄ + 2O₂ → CO₂ + 2H₂O, ¿cuántos átomos de oxígeno hay en los reactivos?', { u: '', tol: 0 }, 4, '2O₂ = 2 × 2 = 4.', { n: 2 }],
          ['re', 'Relaciona el símbolo con su significado:', [['→', 'Produce'], ['(g)', 'Gas'], ['(s)', 'Sólido'], ['⇄', 'Reversible']], null, 'Simbología química.'],
          ['om', '¿Qué ecuación está balanceada?', ['2H₂ + O₂ → 2H₂O', 'H₂ + O₂ → H₂O', 'H₂ + O₂ → 2H₂O', '2H₂ + 2O₂ → H₂O'], 0, '4 H y 2 O de cada lado.', { n: 3 }]
        ]
      },
      {
        id: 'c3t5', nombre: 'El oxígeno: de la Tierra primitiva a los óxidos',
        proposito: 'Propósito 5 · Importancia del oxígeno: atmósfera reductora (Oparin-Haldane), ciclo del oxígeno y formación de óxidos básicos y ácidos.',
        leccion: [
          { t: 'La atmósfera primitiva', h: `<p>Según la hipótesis de <b>Oparin y Haldane</b>, la atmósfera primitiva era <b>reductora</b>: casi sin oxígeno libre, con metano (CH₄), amoniaco (NH₃), hidrógeno (H₂) y vapor de agua.</p>
            <p>En 1953, el experimento de <b>Miller y Urey</b> simuló esas condiciones con descargas eléctricas y obtuvo aminoácidos.</p>
            <p>Después, organismos <b>fotosintéticos</b> (cianobacterias) liberaron O₂ durante millones de años: así se oxigenó la atmósfera y se formó la capa de ozono.</p>` },
          { t: 'Ciclo del oxígeno', h: `<ul><li><b>Libera O₂</b>: la fotosíntesis.</li><li><b>Consume O₂</b>: la respiración, la combustión, la oxidación de metales (óxido).</li></ul>` },
          { t: 'Óxidos básicos y ácidos', h: `<table><tr><th>Óxido básico</th><th>Óxido ácido (anhídrido)</th></tr><tr><td>metal + O₂: 2Mg + O₂ → 2MgO</td><td>no metal + O₂: C + O₂ → CO₂</td></tr><tr><td>+ agua → hidróxido (base): MgO + H₂O → Mg(OH)₂</td><td>+ agua → oxiácido: CO₂ + H₂O → H₂CO₃</td></tr></table>
            <div class="tip">El SO₂ y los óxidos de nitrógeno de la industria forman ácidos con el agua de lluvia: <b>lluvia ácida</b>.</div>` }
        ],
        pares: [['Oparin-Haldane', 'Atmósfera reductora'], ['Miller-Urey', 'Experimento de 1953'], ['Cianobacterias', 'Liberaron O₂'], ['Óxido básico', 'Metal + oxígeno'], ['Óxido ácido', 'No metal + oxígeno'], ['Lluvia ácida', 'SO₂ y NOx']],
        q: [
          ['om', 'Según Oparin y Haldane, la atmósfera primitiva era…', ['reductora, casi sin oxígeno libre', 'igual a la actual', 'de puro oxígeno', 'de puro nitrógeno'], 0, 'Tenía CH₄, NH₃, H₂ y vapor de agua.'],
          ['om', '¿Qué gas NO formaba parte de la atmósfera primitiva propuesta por Oparin-Haldane?', ['Oxígeno libre (O₂) abundante', 'Metano', 'Amoniaco', 'Vapor de agua'], 0, 'El O₂ llegó después, por la fotosíntesis.'],
          ['om', '¿Quiénes oxigenaron la atmósfera?', ['Organismos fotosintéticos como las cianobacterias', 'Los volcanes', 'Los dinosaurios', 'Los meteoritos'], 0, 'Liberaron O₂ durante millones de años.'],
          ['om', 'El experimento de Miller y Urey (1953) obtuvo…', ['aminoácidos a partir de gases y descargas eléctricas', 'oxígeno puro', 'células completas', 'petróleo'], 0, 'Simuló la Tierra primitiva.', { n: 2 }],
          ['om', 'En el ciclo del oxígeno, ¿qué proceso LIBERA O₂?', ['La fotosíntesis', 'La respiración', 'La combustión', 'La oxidación del hierro'], 0, 'Las demás lo consumen.'],
          ['om', 'Un metal + oxígeno forma un…', ['óxido básico', 'óxido ácido', 'oxiácido', 'hidrocarburo'], 0, 'Ej.: 2Mg + O₂ → 2MgO.'],
          ['om', 'Un no metal + oxígeno forma un…', ['óxido ácido (anhídrido)', 'óxido básico', 'hidróxido', 'metal'], 0, 'Ej.: C + O₂ → CO₂.'],
          ['om', 'Óxido básico + agua produce…', ['un hidróxido (base)', 'un oxiácido', 'un metal', 'oxígeno'], 0, 'MgO + H₂O → Mg(OH)₂.', { n: 2 }],
          ['om', 'CO₂ + H₂O → H₂CO₃. El producto es un…', ['oxiácido', 'hidróxido', 'óxido básico', 'metal'], 0, 'Ácido carbónico.', { n: 2 }],
          ['vf', 'La lluvia ácida se forma cuando óxidos como el SO₂ reaccionan con el agua de la atmósfera.', null, true, 'Forman ácidos que caen con la lluvia.'],
          ['re', 'Relaciona:', [['2Mg + O₂ → 2MgO', 'Óxido básico'], ['S + O₂ → SO₂', 'Óxido ácido'], ['MgO + H₂O → Mg(OH)₂', 'Hidróxido'], ['CO₂ + H₂O → H₂CO₃', 'Oxiácido']], null, 'Tipos de compuestos.', { n: 3 }]
        ]
      },
      {
        id: 'c3t6', nombre: 'Fotosíntesis y cadenas tróficas',
        proposito: 'Propósito 6 · Comprende el proceso general de la fotosíntesis, su papel en la transferencia de energía en la cadena trófica y en la captura de CO₂ y liberación de O₂.',
        leccion: [
          { t: 'La ecuación de la fotosíntesis', h: `<p class="frase-objetivo">6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂</p><p>Ocurre en los <b>cloroplastos</b>; la <b>clorofila</b> (pigmento verde) capta la luz. Los organismos que la hacen son <b>autótrofos</b>.</p>` },
          { t: 'Dos fases', h: `<ul><li><b>Fase luminosa</b> (tilacoides): la luz rompe moléculas de agua; se libera <b>O₂</b> y se produce energía química (ATP).</li><li><b>Fase oscura o ciclo de Calvin</b> (estroma): con esa energía se fija el <b>CO₂</b> y se fabrica glucosa.</li></ul>
            <div class="tip">La respiración celular es casi lo inverso: glucosa + O₂ → CO₂ + H₂O + energía.</div>` },
          { t: 'Por qué importa', h: `<ul><li>Es la <b>entrada de energía</b> a casi todas las cadenas tróficas.</li><li><b>Captura CO₂</b>, un gas de efecto invernadero.</li><li>Produce el <b>O₂</b> que respiramos.</li></ul>` }
        ],
        pares: [['Cloroplasto', 'Organelo de la fotosíntesis'], ['Clorofila', 'Pigmento que capta luz'], ['Fase luminosa', 'Libera oxígeno'], ['Ciclo de Calvin', 'Fija el CO₂'], ['Autótrofo', 'Fabrica su alimento'], ['Glucosa', 'C₆H₁₂O₆']],
        q: [
          ['om', '¿Qué gas toman las plantas del aire para la fotosíntesis?', ['Dióxido de carbono (CO₂)', 'Oxígeno (O₂)', 'Nitrógeno (N₂)', 'Metano (CH₄)'], 0, 'Lo convierten en glucosa.'],
          ['om', '¿Qué productos se obtienen en la fotosíntesis?', ['Glucosa y oxígeno', 'CO₂ y agua', 'Proteínas y nitrógeno', 'Almidón y metano'], 0, 'C₆H₁₂O₆ + 6O₂.'],
          ['om', '¿En qué organelo ocurre la fotosíntesis?', ['Cloroplasto', 'Mitocondria', 'Núcleo', 'Ribosoma'], 0, 'La mitocondria hace la respiración.'],
          ['om', 'El pigmento verde que capta la luz es la…', ['clorofila', 'hemoglobina', 'melanina', 'queratina'], 0, 'Por eso las hojas son verdes.'],
          ['nu', 'Según la ecuación, ¿cuántas moléculas de O₂ se liberan por cada molécula de glucosa?', { u: '', tol: 0 }, 6, '… → C₆H₁₂O₆ + 6O₂.'],
          ['om', 'En la fase luminosa…', ['la luz rompe el agua y se libera O₂', 'se fija el CO₂', 'se consume glucosa', 'no se necesita luz'], 0, 'Ocurre en los tilacoides.', { n: 2 }],
          ['om', 'El ciclo de Calvin sirve para…', ['fijar el CO₂ y fabricar glucosa', 'liberar oxígeno', 'absorber agua', 'producir clorofila'], 0, 'Ocurre en el estroma.', { n: 2 }],
          ['vf', 'La respiración celular es prácticamente el proceso inverso de la fotosíntesis.', null, true, 'Usa glucosa y O₂, libera CO₂, agua y energía.'],
          ['om', 'Los organismos que fabrican su propio alimento son…', ['autótrofos', 'heterótrofos', 'descomponedores', 'parásitos'], 0, 'Auto = por sí mismo.'],
          ['om', '¿Por qué la fotosíntesis es la base de las cadenas tróficas?', ['Porque convierte la energía solar en energía química que pasa a los consumidores', 'Porque produce agua', 'Porque consume oxígeno', 'Porque ocurre de noche'], 0, 'Sin productores no hay energía para los demás niveles.'],
          ['co', 'Completa: 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6___', null, ['O₂', 'O2'], 'Se liberan 6 moléculas de oxígeno.', { n: 3 }]
        ]
      },
      {
        id: 'c3t7', nombre: 'Deterioro ambiental',
        proposito: 'Propósito 7 · Analiza la dinámica de los subsistemas terrestres y la actividad humana para comprender el deterioro ambiental, sus escalas y manifestaciones.',
        leccion: [
          { t: 'Escalas del deterioro', h: `<p>El <b>deterioro ambiental</b> es la pérdida de calidad de los subsistemas por actividades humanas (y a veces naturales).</p>
            <ul><li><b>Global</b>: calentamiento global, cambio climático, pérdida de biodiversidad.</li><li><b>Local</b>: deforestación, contaminación de un río, basura, erosión.</li></ul>` },
          { t: 'Efecto invernadero', h: `<p>Gases como CO₂, CH₄ (metano), N₂O y vapor de agua retienen parte del calor que emite la Tierra. Este efecto <b>natural</b> es necesario para la vida; el problema es que las emisiones humanas lo <b>intensifican</b> → calentamiento global → cambio climático (sequías, lluvias extremas, deshielo).</p>` },
          { t: 'Contaminación', h: `<ul><li><b>Aire</b>: partículas (PM2.5, PM10), ozono troposférico, SO₂, NOx (autos, industria, quemas).</li><li><b>Agua</b>: descargas industriales y domésticas sin tratar, plásticos, fertilizantes.</li><li><b>Suelo</b>: residuos, metales pesados, plaguicidas.</li></ul><div class="tip">Contaminación <b>antropogénica</b> = causada por actividades humanas.</div>` }
        ],
        pares: [['Global', 'Cambio climático'], ['Local', 'Deforestación'], ['Gas de efecto invernadero', 'CO₂ o metano'], ['Antropogénico', 'Causado por humanos'], ['PM2.5', 'Partículas en el aire'], ['Biodiversidad', 'Variedad de seres vivos']],
        q: [
          ['om', '¿Cuál es un problema ambiental a escala GLOBAL?', ['El cambio climático', 'La basura en una calle', 'Un tiradero municipal', 'La tala de un parque'], 0, 'Afecta a todo el planeta.'],
          ['om', '¿Cuál es un problema ambiental a escala LOCAL?', ['La deforestación de un cerro cercano', 'El calentamiento global', 'El adelgazamiento de la capa de ozono', 'La subida del nivel del mar'], 0, 'Se manifiesta en un lugar concreto.'],
          ['om', '¿Cuál es un gas de efecto invernadero?', ['Metano (CH₄)', 'Nitrógeno (N₂)', 'Argón (Ar)', 'Helio (He)'], 0, 'También CO₂, N₂O y vapor de agua.'],
          ['vf', 'El efecto invernadero natural es necesario para la vida; el problema es que las actividades humanas lo intensifican.', null, true, 'Sin él la Tierra sería mucho más fría.', { n: 2 }],
          ['om', 'Contaminación «antropogénica» significa…', ['causada por actividades humanas', 'causada por volcanes', 'que ocurre en la Antártida', 'que no tiene causa'], 0, 'Antropos = ser humano.'],
          ['om', 'Las partículas PM2.5 contaminan…', ['el aire', 'solo el suelo', 'solo el mar', 'la capa de ozono'], 0, 'Son tan pequeñas que entran a los pulmones.'],
          ['om', 'La pérdida de biodiversidad se refiere a…', ['la disminución de especies y ecosistemas', 'el aumento de la población', 'la falta de lluvia', 'el ruido'], 0, 'Extinciones y pérdida de hábitats.'],
          ['om', 'Una curtiduría descarga agua con químicos a un río sin tratarla. Contamina principalmente…', ['la hidrósfera', 'la atmósfera', 'la exósfera', 'el núcleo terrestre'], 0, 'Agua contaminada que afecta a la biósfera y al suelo.', { n: 2 }],
          ['or', 'Ordena la cadena de causas y efectos:', ['Quema de combustibles fósiles', 'Aumento de CO₂ en la atmósfera', 'Más calor retenido (efecto invernadero)', 'Calentamiento global y cambio climático'], null, 'Causa → mecanismo → efecto.', { n: 2 }],
          ['re', 'Relaciona el contaminante con lo que contamina:', [['Humo de autos', 'Aire'], ['Fertilizantes en exceso', 'Agua'], ['Plaguicidas', 'Suelo'], ['Ruido de motores', 'Ambiente sonoro']], null, 'Tipos de contaminación.'],
          ['om', 'La deforestación contribuye al cambio climático porque…', ['hay menos árboles que capturen CO₂ y se libera el carbono almacenado', 'los árboles producen CO₂', 'aumenta la capa de ozono', 'enfría el planeta'], 0, 'Los bosques son sumideros de carbono.', { n: 3 }]
        ]
      },
      {
        id: 'c3t8', nombre: 'Tecnología para cuidar el planeta',
        proposito: 'Propósito 8 · Construye explicaciones sobre innovaciones tecnológicas que usan el conocimiento de los subsistemas terrestres para reducir el deterioro ambiental.',
        leccion: [
          { t: 'Energía limpia', h: `<ul><li><b>Paneles fotovoltaicos</b>: convierten luz solar en electricidad.</li><li><b>Aerogeneradores</b>: aprovechan el viento (atmósfera).</li><li><b>Biodigestores</b>: producen biogás con estiércol y residuos orgánicos.</li><li><b>Autos eléctricos</b>: sin emisiones por el escape.</li></ul>` },
          { t: 'Agua y suelo', h: `<ul><li><b>Plantas de tratamiento</b> de aguas residuales y <b>humedales artificiales</b>.</li><li><b>Riego por goteo</b> automatizado con sensores de humedad: ahorra agua.</li><li><b>Restauración ecológica</b>: reforestar con especies nativas, recuperar suelos.</li></ul>` },
          { t: 'Mecatrónica al rescate', h: `<p>Sensores, microcontroladores y automatización ayudan a <b>medir</b> y <b>controlar</b>:</p><ul><li>Estaciones que monitorean la calidad del aire (PM2.5) en tiempo real.</li><li>Satélites y drones que detectan deforestación e incendios.</li><li>Sistemas que encienden el riego solo cuando el suelo lo necesita.</li></ul><div class="tip">Medir → analizar datos → actuar: el mismo ciclo que en un sistema de control.</div>` }
        ],
        pares: [['Panel fotovoltaico', 'Luz a electricidad'], ['Aerogenerador', 'Energía del viento'], ['Biodigestor', 'Biogás de residuos'], ['Riego por goteo', 'Ahorra agua'], ['Humedal artificial', 'Limpia agua residual'], ['Restauración ecológica', 'Reforestar con nativas']],
        q: [
          ['om', '¿Qué tecnología convierte la luz solar en electricidad?', ['Panel fotovoltaico', 'Aerogenerador', 'Biodigestor', 'Turbina de gas'], 0, 'Efecto fotovoltaico.'],
          ['om', 'Un biodigestor produce…', ['biogás a partir de residuos orgánicos', 'electricidad con el viento', 'agua potable del mar', 'gasolina'], 0, 'Aprovecha la descomposición sin oxígeno.'],
          ['om', '¿Qué innovación ahorra agua en la agricultura?', ['Riego por goteo con sensores de humedad', 'Riego por inundación', 'Regar al mediodía', 'Quemar rastrojo'], 0, 'Da el agua justa en la raíz.'],
          ['om', 'Una estación con sensores que mide PM2.5 en tiempo real ayuda a…', ['monitorear la calidad del aire', 'medir la lluvia ácida del suelo', 'producir oxígeno', 'enfriar el planeta'], 0, 'Medir permite tomar decisiones.'],
          ['om', 'Los aerogeneradores aprovechan la energía de…', ['el viento', 'el Sol directamente', 'los ríos', 'el petróleo'], 0, 'Energía eólica.'],
          ['vf', 'Reforestar con especies nativas es una acción de restauración ecológica.', null, true, 'Recupera el ecosistema original.'],
          ['om', 'Los humedales artificiales sirven para…', ['limpiar aguas residuales con plantas y microorganismos', 'generar electricidad', 'almacenar petróleo', 'producir plástico'], 0, 'Imitan la depuración natural.', { n: 2 }],
          ['om', '¿Qué tecnología ayuda a detectar la deforestación en grandes regiones?', ['Imágenes de satélite y drones', 'Termómetros de mercurio', 'Brújulas', 'Barómetros'], 0, 'Comparan imágenes a lo largo del tiempo.'],
          ['or', 'Ordena el ciclo de un sistema automático de riego:', ['El sensor mide la humedad del suelo', 'El microcontrolador compara con el valor deseado', 'Si está seco, abre la electroválvula', 'El sensor vuelve a medir'], null, 'Lazo cerrado de control.', { n: 2 }],
          ['re', 'Relaciona la tecnología con el subsistema que aprovecha o protege:', [['Aerogenerador', 'Atmósfera'], ['Planta de tratamiento', 'Hidrósfera'], ['Reforestación', 'Biósfera'], ['Control de erosión', 'Litósfera']], null, 'Tecnología y subsistemas.', { n: 3 }],
          ['om', 'Un auto eléctrico reduce principalmente…', ['las emisiones de gases por el escape', 'el uso de llantas', 'el ruido del viento', 'la necesidad de frenos'], 0, 'No quema gasolina (aunque importa cómo se genera la electricidad).']
        ]
      }
    ]
  };
})();
