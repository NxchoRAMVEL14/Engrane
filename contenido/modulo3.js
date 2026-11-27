// ENGRANE · Módulo III «Programa dispositivos de control» (4° semestre)
// Fuente: SEP · Programa de estudios Técnico en Mecatrónica (junio 2024), Módulo III, págs. 54–… :
//   S1 Instala elementos de potencia y control (96 h) · S2 Programa controladores lógicos (96 h) · S3 Programa sistemas embebidos (80 h).
// Normas citadas: NOM-001-SEDE-2012 (instalaciones eléctricas), NOM-029-STPS-2011 (mantenimiento eléctrico seguro), IEC 61131-3 (lenguajes de PLC).
(function () {
  const ENG = window.ENG;
  const esc = (s) => s.replace(/</g, '&lt;');
  ENG.CONTENIDO.modulo3 = {
    temas: [
      // ═══════════════ S1 · Instala elementos de potencia y control ═══════════════
      {
        id: 'mo3s1t1', sub: 's1', nombre: 'Planos y simbología del tablero',
        proposito: 'S1 · Interpreta planos y diagramas del tablero de control: identifica elementos eléctricos y electrónicos de forma física y por simbología.',
        leccion: [
          { t: 'Dos diagramas, dos trabajos', h: `<table><tr><th>Diagrama de fuerza (potencia)</th><th>Diagrama de control (mando)</th></tr>
            <tr><td>Lleva la energía al motor: protecciones, contactos principales del contactor, relevador térmico, motor.</td><td>Decide cuándo trabaja: botones, bobina del contactor, contactos auxiliares, lámparas piloto, PLC.</td></tr>
            <tr><td>Alto voltaje y corriente (220/440 V CA).</td><td>Voltaje bajo y seguro (24 V CD o 120 V CA).</td></tr></table>` },
          { t: 'Los protagonistas', h: `<ul>
            <li><b>Contactor</b>: interruptor accionado por un electroimán. Bobina <b>A1–A2</b>; contactos principales <b>1-2, 3-4, 5-6</b> (L1→T1…); auxiliares <b>13-14 (NA)</b> y <b>21-22 (NC)</b>.</li>
            <li><b>Relevador de sobrecarga (térmico)</b>: protege al motor contra sobrecorriente prolongada. Contacto <b>95-96 NC</b> que abre el control; 97-98 NA para alarma.</li>
            <li><b>Interruptor termomagnético</b>: protege la línea contra <b>sobrecarga</b> (parte térmica) y <b>cortocircuito</b> (parte magnética).</li>
            <li><b>Fusible</b>: se funde y abre el circuito; hay que reemplazarlo.</li>
            <li><b>Botón de paro</b>: NC, rojo. <b>Botón de arranque</b>: NA, verde. <b>Paro de emergencia</b>: hongo rojo con enclavamiento.</li></ul>` },
          { t: 'NA y NC', h: `<p><b>NA</b> (normalmente abierto, NO): en reposo <b>no deja pasar</b> corriente; al accionarlo, cierra.<br><b>NC</b> (normalmente cerrado, NC): en reposo <b>sí deja pasar</b>; al accionarlo, abre.</p>
            <div class="tip">«Normalmente» = sin presionar y sin energizar. Los planos siempre dibujan los contactos en reposo.</div>
            <p>Hay dos familias de símbolos: <b>IEC</b> (europea, la más usada en México) y <b>NEMA/ANSI</b> (estadounidense).</p>` }
        ],
        pares: [['Contactor', 'Interruptor con electroimán'], ['A1–A2', 'Bobina del contactor'], ['95-96', 'Contacto NC del térmico'], ['Termomagnético', 'Sobrecarga y cortocircuito'], ['Botón de paro', 'NC rojo'], ['Botón de arranque', 'NA verde'], ['Diagrama de fuerza', 'Lleva energía al motor']],
        q: [
          ['om', '¿Qué elemento es un interruptor accionado por un electroimán y sirve para conectar un motor a distancia?', ['Contactor', 'Fusible', 'Lámpara piloto', 'Transformador'], 0, 'La bobina (A1–A2) atrae los contactos y los cierra.'],
          ['om', 'Las terminales A1 y A2 de un contactor corresponden a…', ['la bobina', 'los contactos principales', 'el contacto auxiliar NC', 'la tierra física'], 0, 'Al energizar A1–A2 el contactor «jala».'],
          ['om', '¿Qué protege el relevador de sobrecarga (térmico)?', ['Al motor contra una sobrecorriente prolongada', 'Contra descargas atmosféricas', 'Contra bajo voltaje solamente', 'Al operador de quemaduras'], 0, 'Se calienta con la corriente y abre su contacto 95-96.'],
          ['om', 'Un interruptor termomagnético protege contra…', ['sobrecarga y cortocircuito', 'solo cortocircuito', 'solo humedad', 'falta de neutro'], 0, 'Parte térmica: sobrecarga. Parte magnética: cortocircuito.'],
          ['om', 'En reposo, un contacto NC…', ['deja pasar la corriente', 'no deja pasar la corriente', 'está quemado', 'solo funciona en CD'], 0, 'Normalmente cerrado.'],
          ['om', 'El botón de PARO normalmente es…', ['NC y rojo', 'NA y verde', 'NA y rojo', 'NC y verde'], 0, 'Al presionarlo abre el circuito de control.'],
          ['om', 'En un contactor, los contactos 13-14 suelen ser…', ['auxiliares NA', 'auxiliares NC', 'principales', 'de la bobina'], 0, 'Terminación 3-4 = NA; 1-2 = NC (21-22).', { n: 2 }],
          ['om', 'El contacto 95-96 del relevador térmico es…', ['NC y abre el circuito de control al dispararse', 'NA y arranca el motor', 'la bobina', 'la entrada de fuerza'], 0, 'Al dispararse, abre y el contactor suelta.', { n: 2 }],
          ['re', 'Relaciona el diagrama con lo que contiene:', [['Fuerza', 'Contactos principales y motor'], ['Control', 'Botones y bobina'], ['Protección', 'Termomagnético y fusibles'], ['Señalización', 'Lámparas piloto']], null, 'Cada parte del tablero tiene su función.'],
          ['vf', 'Los planos eléctricos dibujan los contactos en su estado de reposo.', null, true, 'Sin presionar y sin energizar.'],
          ['om', '¿Qué familia de símbolos eléctricos es la más usada en México?', ['IEC', 'NEMA', 'DIN de tuberías', 'ISO 1219'], 0, 'ISO 1219 es de neumática e hidráulica.', { n: 2 }],
          ['om', 'Un fusible, a diferencia de un termomagnético…', ['se funde y hay que reemplazarlo', 'se rearma con una palanca', 'no protege contra cortocircuito', 'funciona solo en CD'], 0, 'El termomagnético se vuelve a armar.'],
          ['om', 'El diagrama de control normalmente trabaja con…', ['voltaje bajo y seguro, como 24 V CD', '440 V CA', 'alta presión', '13 200 V'], 0, 'Separar control de fuerza da seguridad.', { n: 2 }]
        ]
      },
      {
        id: 'mo3s1t2', sub: 's1', nombre: 'Voltaje, corriente y potencia',
        proposito: 'S1 · Determina los voltajes de operación de cada elemento y realiza cálculos de voltaje, amperaje y potencia.',
        leccion: [
          { t: 'Las tres fórmulas que siempre usas', h: `<table><tr><th>Fórmula</th><th>Para qué</th></tr><tr><td><b>V = I · R</b></td><td>Ley de Ohm</td></tr><tr><td><b>P = V · I</b></td><td>Potencia (monofásica, carga resistiva)</td></tr><tr><td><b>P = √3 · V · I · FP</b></td><td>Potencia trifásica (FP = factor de potencia)</td></tr></table>
            <div class="ej"><p>Foco de 60 W a 120 V → I = 60 / 120 = <b>0.5 A</b>.</p><p>1 HP = <b>746 W</b>.</p></div>` },
          { t: 'Voltajes en México', h: `<ul><li>Casa: <b>127 V</b> CA monofásico (también se dice 120 V), <b>60 Hz</b>.</li><li>Entre fases en baja tensión: <b>220 V</b> (sistema 220/127 V).</li><li>Industria: <b>440 o 480 V</b> trifásico para motores grandes.</li><li>Control: <b>24 V CD</b> (PLC, sensores) o <b>120 V CA</b>.</li></ul>
            <div class="tip">Antes de conectar, revisa el voltaje de la bobina en la placa del contactor: una bobina de 24 V CD se quema en 127 V CA.</div>` },
          { t: 'Corriente de un motor trifásico', h: `<p>Despejando: <b>I = P / (√3 · V · FP)</b>.</p><div class="ej"><p>Motor de 5 kW a 440 V, FP 0.9 → I = 5000 / (1.732 × 440 × 0.9) ≈ <b>7.3 A</b>.</p></div>` }
        ],
        pares: [['V = I·R', 'Ley de Ohm'], ['P = V·I', 'Potencia monofásica'], ['1 HP', '746 W'], ['127 V', 'Contacto de casa'], ['24 V CD', 'Control y PLC'], ['60 Hz', 'Frecuencia en México']],
        q: [
          ['nu', 'Un foco de 60 W trabaja a 120 V. ¿Cuánta corriente consume?', { u: 'A', tol: 0 }, 0.5, 'I = P / V = 60 / 120 = 0.5 A.'],
          ['nu', 'Una resistencia recibe 24 V y circulan 0.5 A. ¿Cuánto vale la resistencia?', { u: 'Ω', tol: 0 }, 48, 'R = V / I = 24 / 0.5 = 48 Ω.'],
          ['nu', '¿Cuántos watts tiene un motor de 3 HP?', { u: 'W', tol: 0.005 }, 2238, '3 × 746 = 2238 W.'],
          ['nu', 'Una parrilla de 1270 W se conecta a 127 V. ¿Qué corriente consume?', { u: 'A', tol: 0 }, 10, '1270 / 127 = 10 A.'],
          ['om', '¿Cuál es el voltaje de un contacto de casa en México?', ['127 V CA', '220 V CD', '24 V CD', '440 V CA'], 0, 'Monofásico, 60 Hz.'],
          ['om', '¿Qué frecuencia tiene la red eléctrica en México?', ['60 Hz', '50 Hz', '100 Hz', '0 Hz'], 0, 'En Europa es de 50 Hz.'],
          ['om', 'Un PLC y sus sensores normalmente se alimentan con…', ['24 V CD', '440 V CA', '127 V CD', '5 kV'], 0, 'Voltaje de control seguro.'],
          ['nu', 'Potencia trifásica: V = 220 V, I = 10 A, FP = 0.85. ¿Cuántos watts? (P = √3·V·I·FP)', { u: 'W', tol: 0.02 }, 3239, '1.732 × 220 × 10 × 0.85 ≈ 3239 W.', { n: 2 }],
          ['nu', 'Motor trifásico de 5 kW a 440 V con FP 0.9. ¿Qué corriente toma? (redondea a décimas)', { u: 'A', tol: 0.02 }, 7.3, 'I = 5000 / (1.732 × 440 × 0.9) ≈ 7.3 A.', { n: 3 }],
          ['vf', 'Una bobina de contactor de 24 V CD puede conectarse a 127 V CA sin problema.', null, false, 'Se quema: revisa siempre el voltaje de la bobina.'],
          ['om', 'Si en un circuito el voltaje se mantiene y la resistencia aumenta, la corriente…', ['disminuye', 'aumenta', 'no cambia', 'se vuelve alterna'], 0, 'I = V / R.', { n: 2 }],
          ['co', 'Completa: la ley de Ohm dice V = I · ___', null, ['R'], 'Voltaje = corriente × resistencia.']
        ]
      },
      {
        id: 'mo3s1t3', sub: 's1', nombre: 'Conductores y protecciones',
        proposito: 'S1 · Determina el calibre del conductor, dimensiones de componentes y protecciones del circuito con tablas de especificaciones.',
        leccion: [
          { t: 'El calibre AWG', h: `<p>En el sistema AWG, <b>mientras más pequeño el número, más grueso el cable</b> y más corriente soporta.</p>
            <table><tr><th>Calibre (cobre)</th><th>Protección máxima típica</th><th>Uso común</th></tr><tr><td>14 AWG</td><td>15 A</td><td>Alumbrado</td></tr><tr><td>12 AWG</td><td>20 A</td><td>Contactos</td></tr><tr><td>10 AWG</td><td>30 A</td><td>Cargas mayores, motores pequeños</td></tr></table>
            <div class="tip">Los valores exactos están en las tablas de la NOM-001-SEDE: dependen del aislamiento, la temperatura y cuántos cables van juntos.</div>` },
          { t: 'Motores: el 125 %', h: `<ul><li>Los conductores de un motor se calculan al <b>125 %</b> de su corriente nominal (la de la placa).</li><li>El <b>relevador térmico</b> se ajusta a la corriente nominal del motor.</li><li>El arranque toma de 6 a 8 veces la corriente nominal por un instante: por eso el interruptor del motor no debe ser tan sensible como uno de alumbrado.</li></ul>
            <div class="ej"><p>Motor de 16 A → conductor para 1.25 × 16 = <b>20 A</b>.</p></div>` },
          { t: 'Colores y caída de tensión', h: `<ul><li><b>Neutro</b>: blanco o gris. <b>Tierra física</b>: verde, verde con franja amarilla o desnudo.</li><li><b>Fases</b>: otros colores (negro, rojo, azul…).</li><li>Caída de tensión recomendada: no más de <b>3 %</b> en el circuito derivado.</li></ul>` }
        ],
        pares: [['14 AWG', '15 A'], ['12 AWG', '20 A'], ['10 AWG', '30 A'], ['Neutro', 'Blanco o gris'], ['Tierra física', 'Verde o desnudo'], ['125 %', 'Conductores de motor']],
        q: [
          ['om', 'En el sistema AWG, ¿cuál cable es más grueso?', ['10 AWG', '12 AWG', '14 AWG', '18 AWG'], 0, 'Menor número = más grueso.'],
          ['om', '¿De qué color debe ser el conductor de tierra física?', ['Verde, verde con franja amarilla o desnudo', 'Blanco', 'Rojo', 'Negro'], 0, 'NOM-001-SEDE.'],
          ['om', '¿De qué color se identifica el neutro?', ['Blanco o gris', 'Verde', 'Rojo', 'Azul siempre'], 0, 'Las fases van en otros colores.'],
          ['nu', 'Un motor tiene corriente nominal de 16 A. ¿Para qué corriente se calculan sus conductores (125 %)?', { u: 'A', tol: 0 }, 20, '1.25 × 16 = 20 A.'],
          ['nu', 'Motor de 24 A nominales. Corriente para calcular sus conductores (125 %):', { u: 'A', tol: 0 }, 30, '1.25 × 24 = 30 A.', { n: 2 }],
          ['om', 'El relevador térmico de un motor se ajusta a…', ['la corriente nominal de la placa del motor', 'el doble de la corriente', 'el voltaje', 'la velocidad'], 0, 'Así dispara si el motor se sobrecarga.'],
          ['om', 'Un circuito de contactos de 20 A normalmente usa cable…', ['12 AWG', '18 AWG', '20 AWG', '4/0 AWG'], 0, '12 AWG con protección de 20 A.'],
          ['vf', 'Un cable más delgado de lo necesario se calienta y puede provocar un incendio.', null, true, 'Por eso se respeta la tabla de ampacidad.'],
          ['om', 'Al arrancar, un motor toma por un instante…', ['de 6 a 8 veces su corriente nominal', 'la mitad de su corriente', 'cero corriente', 'la misma corriente que en vacío'], 0, 'Corriente de arranque.', { n: 2 }],
          ['nu', 'Un circuito de 127 V tiene 3 % de caída de tensión. ¿Cuántos volts se pierden? (redondea a décimas)', { u: 'V', tol: 0.02 }, 3.8, '0.03 × 127 = 3.81 V.', { n: 2 }],
          ['om', '¿Qué norma mexicana regula las instalaciones eléctricas?', ['NOM-001-SEDE', 'NOM-017-STPS', 'ISO 1219', 'NOM-008-SCFI'], 0, 'La NOM-017-STPS es de equipo de protección personal.', { n: 3 }],
          ['re', 'Relaciona el calibre con su protección típica:', [['14 AWG', '15 A'], ['12 AWG', '20 A'], ['10 AWG', '30 A']], null, 'Cobre, tabla típica.']
        ]
      },
      {
        id: 'mo3s1t4', sub: 's1', nombre: 'Arranque de motores, medición y seguridad',
        proposito: 'S1 · Conecta, mide y comprueba el sistema de potencia y control aplicando normas de seguridad.',
        leccion: [
          { t: 'Arranque–paro con enclavamiento', h: `<p>Al soltar el botón de arranque, el motor sigue porque un <b>contacto auxiliar NA del contactor</b> (13-14) está en <b>paralelo</b> con el botón: se «autoalimenta». A esto se le llama <b>enclavamiento</b> o <b>autorretención</b>.</p>
            <p>El paro (NC) y el 95-96 del térmico van en <b>serie</b>: si cualquiera abre, la bobina se desenergiza.</p>` },
          { t: 'Inversión de giro', h: `<ul><li>Un motor trifásico invierte su giro al <b>intercambiar dos fases</b>.</li><li>Se usan dos contactores (adelante y atrás) con <b>enclavamiento eléctrico</b>: el NC de cada uno va en serie con la bobina del otro, para que nunca entren juntos (sería un cortocircuito).</li><li>El arranque <b>estrella–delta</b> reduce la corriente de arranque a <b>1/3</b>.</li></ul>` },
          { t: 'Medir sin riesgos', h: `<ul><li><b>Voltaje</b>: el multímetro va en <b>paralelo</b>. <b>Corriente</b>: en <b>serie</b> o con <b>amperímetro de gancho</b> abrazando <b>un solo</b> conductor.</li><li><b>Continuidad y resistencia</b>: siempre <b>sin energía</b>.</li><li>Antes de trabajar: <b>bloqueo y etiquetado</b> (LOTO) y comprobar ausencia de voltaje (NOM-029-STPS).</li><li>EPP: guantes dieléctricos, lentes, calzado dieléctrico.</li></ul>` }
        ],
        pares: [['Enclavamiento', 'Auxiliar NA en paralelo'], ['Inversión de giro', 'Intercambiar dos fases'], ['Estrella–delta', 'Corriente a 1/3'], ['Voltímetro', 'En paralelo'], ['Amperímetro', 'En serie'], ['LOTO', 'Bloqueo y etiquetado']],
        q: [
          ['om', '¿Qué hace que el motor siga funcionando al soltar el botón de arranque?', ['Un contacto auxiliar NA del contactor en paralelo con el botón', 'El relevador térmico', 'El botón de paro', 'El fusible'], 0, 'Es el enclavamiento o autorretención.'],
          ['om', '¿Cómo se invierte el giro de un motor trifásico?', ['Intercambiando dos de sus fases', 'Cambiando el neutro', 'Bajando el voltaje', 'Quitando la tierra'], 0, 'Se invierte el campo giratorio.'],
          ['om', 'En la inversión de giro, el enclavamiento eléctrico sirve para…', ['que los dos contactores nunca entren al mismo tiempo', 'que el motor gire más rápido', 'ahorrar cable', 'medir corriente'], 0, 'Si entran juntos hay cortocircuito entre fases.', { n: 2 }],
          ['om', 'El voltímetro se conecta…', ['en paralelo con el elemento', 'en serie', 'sin energía', 'al neutro solamente'], 0, 'Mide diferencia de potencial entre dos puntos.'],
          ['om', 'Para medir corriente sin abrir el circuito se usa…', ['un amperímetro de gancho', 'un megóhmetro', 'un probador de continuidad', 'un vernier'], 0, 'Abraza un solo conductor.'],
          ['vf', 'Para medir corriente con gancho se deben abrazar la fase y el neutro juntos.', null, false, 'Juntos se anulan: lee 0. Abraza solo uno.', { n: 2 }],
          ['vf', 'La continuidad y la resistencia se miden con el circuito desenergizado.', null, true, 'Con energía dañas el multímetro y te arriesgas.'],
          ['om', 'LOTO significa…', ['bloqueo y etiquetado de la energía antes de trabajar', 'lote de tornillos', 'línea de tierra', 'lectura de tensión'], 0, 'Lock-out / Tag-out.'],
          ['om', 'El arranque estrella–delta sirve para…', ['reducir la corriente de arranque', 'invertir el giro', 'aumentar la velocidad', 'medir el voltaje'], 0, 'En estrella arranca con 1/3 de la corriente.', { n: 2 }],
          ['or', 'Ordena el procedimiento seguro antes de cambiar un contactor:', ['Avisar y apagar el interruptor', 'Colocar candado y etiqueta (LOTO)', 'Comprobar ausencia de voltaje con el multímetro', 'Hacer el cambio', 'Retirar candado y probar'], null, 'NOM-029-STPS: nunca confíes en que «ya está apagado».', { n: 2 }],
          ['om', 'En el circuito de control, el botón de paro y el contacto 95-96 van…', ['en serie con la bobina', 'en paralelo con el arranque', 'en el circuito de fuerza', 'a tierra'], 0, 'Si cualquiera abre, la bobina suelta.', { n: 3 }],
          ['om', '¿Qué EPP es indispensable para trabajar cerca de partes energizadas?', ['Guantes dieléctricos y lentes de seguridad', 'Guantes de látex', 'Lentes de sol', 'Tapones solamente'], 0, 'Protección contra choque eléctrico y arco.']
        ]
      },

      // ═══════════════ S2 · Programa controladores lógicos ═══════════════
      {
        id: 'mo3s2t1', sub: 's2', nombre: 'El PLC: partes, entradas y salidas',
        proposito: 'S2 · Identifica puertos de entrada, salida, voltaje y comunicación del controlador y clasifica sus funciones.',
        leccion: [
          { t: '¿Qué es un PLC?', h: `<p>Un <b>controlador lógico programable</b> es una computadora industrial que lee <b>entradas</b>, ejecuta un <b>programa</b> y maneja <b>salidas</b>. Nació en <b>1968</b> para sustituir los tableros de relevadores en la industria automotriz (General Motors).</p>
            <p>Partes: <b>fuente</b>, <b>CPU</b> (procesador y memoria), <b>módulos de entrada y salida</b> y <b>puerto de comunicación</b> (USB, Ethernet, RS-485).</p>` },
          { t: 'Entradas y salidas', h: `<table><tr><th>Entradas (sensores)</th><th>Salidas (actuadores)</th></tr><tr><td>Botones, selectores, finales de carrera, sensores inductivos y fotoeléctricos</td><td>Bobinas de contactores, lámparas, electroválvulas, alarmas</td></tr></table>
            <ul><li><b>Digitales</b>: 0 o 1 (encendido/apagado). <b>Analógicas</b>: un rango, como <b>4–20 mA</b> o <b>0–10 V</b> (temperatura, presión, nivel).</li><li>Salidas tipo <b>relevador</b> (CA o CD, más lentas) o tipo <b>transistor</b> (solo CD, rápidas).</li><li>Direcciones: Siemens <b>I0.0 / Q0.0</b>; Schneider <b>%I0.0 / %Q0.0</b>.</li></ul>` },
          { t: 'El ciclo de escaneo', h: `<ol><li>Lee todas las entradas.</li><li>Ejecuta el programa de arriba hacia abajo.</li><li>Actualiza las salidas.</li><li>Diagnóstico y comunicación… y vuelve a empezar (en milisegundos).</li></ol>
            <p>Lenguajes de la norma <b>IEC 61131-3</b>: escalera (LD), bloques de funciones (FBD), texto estructurado (ST), diagrama secuencial (SFC) y lista de instrucciones (IL).</p>` }
        ],
        pares: [['PLC', 'Computadora industrial'], ['Entrada', 'Sensor o botón'], ['Salida', 'Contactor o lámpara'], ['4–20 mA', 'Señal analógica'], ['Q0.0', 'Salida en Siemens'], ['IEC 61131-3', 'Lenguajes de PLC']],
        q: [
          ['om', '¿Qué hace un PLC?', ['Lee entradas, ejecuta un programa y maneja salidas', 'Solo mide voltaje', 'Solo genera energía', 'Reemplaza al motor'], 0, 'Es el cerebro del tablero.'],
          ['om', '¿Cuál es una ENTRADA del PLC?', ['Un sensor inductivo', 'La bobina de un contactor', 'Una lámpara piloto', 'Una electroválvula'], 0, 'Las entradas informan; las salidas actúan.'],
          ['om', '¿Cuál es una SALIDA del PLC?', ['Una electroválvula', 'Un botón de arranque', 'Un final de carrera', 'Un selector'], 0, 'Recibe la orden del PLC.'],
          ['or', 'Ordena el ciclo de escaneo del PLC:', ['Leer entradas', 'Ejecutar el programa', 'Actualizar salidas', 'Diagnóstico y comunicación'], null, 'Se repite continuamente en milisegundos.'],
          ['om', 'Una señal de 4–20 mA es…', ['analógica', 'digital', 'de potencia', 'de tierra'], 0, 'Representa un rango, como una temperatura.'],
          ['om', 'Las salidas tipo transistor…', ['solo manejan CD y son rápidas', 'manejan CA y CD y son lentas', 'no existen', 'son entradas'], 0, 'Las de relevador manejan CA o CD.', { n: 2 }],
          ['om', 'En un PLC Siemens, la primera salida digital se escribe…', ['Q0.0', 'I0.0', 'M0.0', 'A1'], 0, 'I = entrada, Q = salida, M = marca interna.'],
          ['om', 'El PLC nació en 1968 para sustituir…', ['los tableros de relevadores', 'los motores', 'las computadoras personales', 'los cables de cobre'], 0, 'En la industria automotriz.', { n: 2 }],
          ['om', '¿Qué norma define los lenguajes de programación de PLC?', ['IEC 61131-3', 'NOM-001-SEDE', 'ISO 1219', 'IEEE 754'], 0, 'LD, FBD, ST, SFC e IL.', { n: 2 }],
          ['re', 'Relaciona el lenguaje con su descripción:', [['LD', 'Escalera'], ['FBD', 'Bloques de funciones'], ['ST', 'Texto estructurado'], ['SFC', 'Diagrama secuencial']], null, 'IEC 61131-3.', { n: 3 }],
          ['vf', 'Un PLC ejecuta su programa una sola vez al encenderse.', null, false, 'Lo ejecuta en ciclos continuos.'],
          ['om', '¿Por qué puerto se carga normalmente el programa a un PLC moderno?', ['USB o Ethernet', 'El contacto 95-96', 'La entrada analógica', 'La bobina'], 0, 'Puerto de comunicación con la computadora.']
        ]
      },
      {
        id: 'mo3s2t2', sub: 's2', nombre: 'Lógica booleana y tablas de verdad',
        proposito: 'S2 · Identifica funciones booleanas y tablas de verdad; determina estados lógicos de entradas y salidas.',
        leccion: [
          { t: 'Compuertas básicas', h: `<table><tr><th>Función</th><th>Sale 1 cuando…</th><th>En escalera</th></tr><tr><td><b>AND</b> (A·B)</td><td>A <b>y</b> B son 1</td><td>Contactos en <b>serie</b></td></tr><tr><td><b>OR</b> (A+B)</td><td>A <b>o</b> B (o ambos) son 1</td><td>Contactos en <b>paralelo</b></td></tr><tr><td><b>NOT</b> (A̅)</td><td>A es 0</td><td>Contacto <b>NC</b></td></tr><tr><td><b>XOR</b></td><td>A y B son diferentes</td><td>—</td></tr><tr><td><b>NAND / NOR</b></td><td>Lo contrario de AND / OR</td><td>—</td></tr></table>` },
          { t: 'Tablas de verdad', h: `<p>Con <b>n</b> entradas hay <b>2ⁿ</b> combinaciones: 2 entradas → 4 renglones; 3 entradas → 8.</p>
            <table><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>XOR</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr></table>` },
          { t: 'Del problema a la función', h: `<div class="ej"><p>«La prensa baja solo si el operador presiona <b>los dos</b> botones (A y B) y la guarda está cerrada (G)» → <b>Q = A · B · G</b>.</p></div>
            <p>Para simplificar se usan el álgebra de Boole (A + A·B = A) y los mapas de Karnaugh.</p>` }
        ],
        pares: [['AND', 'Serie'], ['OR', 'Paralelo'], ['NOT', 'Contacto NC'], ['XOR', 'Entradas diferentes'], ['3 entradas', '8 combinaciones'], ['A + A·B', 'A']],
        q: [
          ['om', 'En escalera, dos contactos en SERIE equivalen a la función…', ['AND', 'OR', 'NOT', 'XOR'], 0, 'Deben cerrarse los dos.'],
          ['om', 'Dos contactos en PARALELO equivalen a…', ['OR', 'AND', 'NAND', 'NOT'], 0, 'Basta con uno.'],
          ['om', 'Si A = 1 y B = 0, la salida de una compuerta AND es…', ['0', '1', 'indefinida', '2'], 0, 'AND necesita ambas en 1.'],
          ['om', 'Si A = 1 y B = 0, la salida de una compuerta OR es…', ['1', '0', 'indefinida', '−1'], 0, 'Basta una en 1.'],
          ['om', 'Si A = 1 y B = 1, la salida de una XOR es…', ['0', '1', 'indefinida', 'depende del voltaje'], 0, 'XOR da 1 solo cuando son diferentes.', { n: 2 }],
          ['nu', '¿Cuántas combinaciones tiene la tabla de verdad de 3 entradas?', { u: '', tol: 0 }, 8, '2³ = 8.'],
          ['nu', '¿Y con 4 entradas?', { u: '', tol: 0 }, 16, '2⁴ = 16.', { n: 2 }],
          ['om', 'La función NOT en escalera se representa con…', ['un contacto NC', 'un contacto NA', 'una bobina', 'un temporizador'], 0, 'Conduce cuando la entrada está en 0.'],
          ['om', '«La prensa baja si se presionan los dos botones A y B y la guarda G está cerrada.» La función es…', ['Q = A · B · G', 'Q = A + B + G', 'Q = A + B · G', 'Q = NOT A'], 0, 'Todas deben cumplirse: AND.', { n: 2 }],
          ['om', 'Simplifica: A + A·B =', ['A', 'B', 'A·B', '1'], 0, 'Ley de absorción.', { n: 3 }],
          ['om', 'Una NAND da 0 solo cuando…', ['todas sus entradas son 1', 'todas son 0', 'son diferentes', 'nunca'], 0, 'Es lo contrario de AND.', { n: 2 }],
          ['re', 'Relaciona la compuerta con su regla:', [['AND', 'Todas en 1'], ['OR', 'Al menos una en 1'], ['NOT', 'Invierte'], ['XOR', 'Diferentes']], null, 'Lógica digital.']
        ]
      },
      {
        id: 'mo3s2t3', sub: 's2', nombre: 'Diagrama de escalera',
        proposito: 'S2 · Elabora un diagrama de escalera, lo carga al PLC y verifica su funcionamiento.',
        leccion: [
          { t: 'Las piezas de la escalera', h: `<p>Dos <b>rieles</b> verticales y <b>peldaños</b> (rungs) que se leen de izquierda a derecha y de arriba hacia abajo.</p>
            <table><tr><th>Símbolo</th><th>Nombre</th><th>Conduce cuando…</th></tr><tr><td class="mono">--| |--</td><td>Contacto NA (examinar si cerrado)</td><td>la entrada vale 1</td></tr><tr><td class="mono">--|/|--</td><td>Contacto NC (examinar si abierto)</td><td>la entrada vale 0</td></tr><tr><td class="mono">--( )--</td><td>Bobina</td><td>escribe el resultado del peldaño en la salida</td></tr><tr><td class="mono">--(S)-- / --(R)--</td><td>Set / Reset</td><td>enciende / apaga y lo mantiene</td></tr></table>` },
          { t: 'Arranque–paro en el PLC', h: `<pre class="escalera">|  I0.0 Arranque   I0.1 Paro      Q0.0 Motor
|----| |--------+-----| |---------( )----|
|               |
|  Q0.0         |
|----| |--------+</pre>
            <p>El contacto <b>Q0.0</b> en paralelo con el arranque es el <b>enclavamiento</b>.</p>
            <div class="tip">⚠ Si el botón de paro físico es <b>NC</b>, en el programa se usa un contacto <b>NA</b> (I0.1 vale 1 mientras no lo presionas). Así, si se corta el cable, la máquina se detiene: es más seguro.</div>` },
          { t: 'Buenas prácticas', h: `<ul><li>No repitas la misma bobina en dos peldaños (doble bobina): gana el último.</li><li>Comenta cada peldaño.</li><li>Prueba primero en el simulador; luego carga al PLC y verifica con las lámparas de estado de E/S.</li></ul>` }
        ],
        pares: [['--| |--', 'Contacto NA'], ['--|/|--', 'Contacto NC'], ['--( )--', 'Bobina'], ['(S)', 'Set: enciende y mantiene'], ['(R)', 'Reset: apaga'], ['Rung', 'Peldaño']],
        q: [
          ['om', 'El símbolo --| |-- en escalera es…', ['un contacto NA', 'un contacto NC', 'una bobina', 'un temporizador'], 0, 'Conduce cuando la entrada vale 1.'],
          ['om', 'El símbolo --( )-- es…', ['una bobina (salida)', 'un contacto NA', 'un contador', 'un riel'], 0, 'Escribe el resultado del peldaño.'],
          ['om', 'Un diagrama de escalera se lee…', ['de izquierda a derecha y de arriba hacia abajo', 'de abajo hacia arriba', 'en cualquier orden', 'de derecha a izquierda'], 0, 'Igual que el ciclo de escaneo.'],
          ['om', 'En el arranque–paro, ¿qué contacto se pone en paralelo con el arranque?', ['Un contacto de la misma salida Q0.0', 'El paro', 'Otra bobina', 'Un temporizador'], 0, 'Es el enclavamiento.'],
          ['om', 'Si el botón de paro físico es NC, en el programa se usa un contacto…', ['NA, porque la entrada vale 1 mientras no se presiona', 'NC', 'Set', 'de bobina'], 0, 'Truco clásico: es más seguro ante un cable roto.', { n: 3 }],
          ['om', 'La instrucción Set (S)…', ['enciende la salida y la mantiene aunque la condición desaparezca', 'apaga la salida', 'cuenta pulsos', 'mide tiempo'], 0, 'Se apaga con Reset (R).'],
          ['vf', 'Usar la misma bobina en dos peldaños distintos es una buena práctica.', null, false, 'Doble bobina: solo cuenta el último peldaño.', { n: 2 }],
          ['or', 'Ordena el trabajo con el PLC:', ['Hacer la tabla de E/S', 'Dibujar el diagrama de escalera', 'Probar en el simulador', 'Cargar el programa al PLC', 'Verificar con la máquina'], null, 'Planear, programar, simular, cargar y comprobar.'],
          ['om', 'Para que una lámpara Q0.1 encienda solo si I0.0 está activo y I0.2 NO lo está, se usa…', ['I0.0 NA en serie con I0.2 NC', 'I0.0 NC en paralelo con I0.2 NA', 'solo I0.2 NA', 'dos bobinas'], 0, 'A · NOT B.', { n: 2 }],
          ['re', 'Relaciona:', [['--|/|--', 'Contacto NC'], ['(R)', 'Reset'], ['Riel', 'Línea vertical de energía'], ['Peldaño', 'Una línea de lógica']], null, 'Vocabulario de escalera.'],
          ['om', '¿Para qué se comenta cada peldaño?', ['Para que otra persona entienda y dé mantenimiento al programa', 'Para que corra más rápido', 'Porque el PLC lo exige', 'Para ahorrar memoria'], 0, 'Un buen programa se explica solo.']
        ]
      },
      {
        id: 'mo3s2t4', sub: 's2', nombre: 'Temporizadores y contadores',
        proposito: 'S2 · Clasifica funciones del controlador: temporizadores y contadores para automatizar secuencias.',
        leccion: [
          { t: 'Temporizadores', h: `<table><tr><th>Tipo</th><th>Qué hace</th><th>Ejemplo</th></tr><tr><td><b>TON</b></td><td>Retardo a la <b>conexión</b>: la salida enciende cuando la entrada lleva PT segundos activa</td><td>Arrancar la banda 5 s después de la alarma</td></tr><tr><td><b>TOF</b></td><td>Retardo a la <b>desconexión</b>: la salida sigue PT segundos después de apagar la entrada</td><td>Ventilador que sigue 30 s tras apagar el horno</td></tr><tr><td><b>TP</b></td><td>Pulso de duración fija</td><td>Sello de 2 s</td></tr></table>
            <p><b>PT</b> = tiempo programado (preset); <b>ET</b> = tiempo transcurrido.</p>` },
          { t: 'Contadores', h: `<ul><li><b>CTU</b>: cuenta hacia arriba con cada pulso; al llegar a <b>PV</b> activa su salida.</li><li><b>CTD</b>: cuenta hacia abajo.</li><li><b>CTUD</b>: arriba y abajo.</li><li><b>CV</b> = valor actual. Se reinicia con <b>R</b> (reset).</li></ul>
            <div class="ej"><p>Cada 12 piezas que detecta el sensor, la caja se cierra: CTU con PV = 12; al terminar se hace reset.</p></div>` }
        ],
        pares: [['TON', 'Retardo a la conexión'], ['TOF', 'Retardo a la desconexión'], ['CTU', 'Cuenta hacia arriba'], ['CTD', 'Cuenta hacia abajo'], ['PT', 'Tiempo programado'], ['PV', 'Valor a alcanzar']],
        q: [
          ['om', 'Un temporizador que enciende su salida después de que la entrada lleva cierto tiempo activa es…', ['TON', 'TOF', 'CTU', 'CTD'], 0, 'Retardo a la conexión.'],
          ['om', 'Un ventilador debe seguir girando 30 s después de apagar el horno. Usas…', ['TOF', 'TON', 'CTU', 'Set'], 0, 'Retardo a la desconexión.'],
          ['om', 'En un temporizador, PT significa…', ['el tiempo programado', 'el tiempo transcurrido', 'el puerto', 'la potencia'], 0, 'ET es el transcurrido.'],
          ['om', 'Para cerrar una caja cada 12 piezas usas…', ['un contador CTU con PV = 12', 'un TOF de 12 s', 'una bobina Set', 'un contacto NC'], 0, 'Cuenta pulsos del sensor.'],
          ['nu', 'Un TON tiene PT = 5 s. Si la entrada se activa a los 3 s del arranque y no se apaga, ¿a qué segundo se enciende la salida?', { u: 's', tol: 0 }, 8, '3 + 5 = 8 s.', { n: 2 }],
          ['nu', 'Un CTU con PV = 10 lleva CV = 7. ¿Cuántos pulsos faltan para que active su salida?', { u: 'pulsos', tol: 0 }, 3, '10 − 7 = 3.'],
          ['nu', 'Un semáforo: verde 25 s, amarillo 3 s, rojo 30 s. ¿Cuánto dura el ciclo completo?', { u: 's', tol: 0 }, 58, '25 + 3 + 30 = 58 s.', { n: 2 }],
          ['vf', 'Un contador debe reiniciarse (reset) para volver a contar desde cero.', null, true, 'Con la entrada R.'],
          ['om', 'Si la entrada de un TON se desactiva antes de cumplir PT…', ['el tiempo se reinicia y la salida no enciende', 'la salida enciende igual', 'el PLC se apaga', 'se vuelve TOF'], 0, 'Necesita la entrada activa todo el tiempo.', { n: 3 }],
          ['re', 'Relaciona:', [['TON', 'Retardo a la conexión'], ['TOF', 'Retardo a la desconexión'], ['CTU', 'Cuenta ascendente'], ['CTD', 'Cuenta descendente']], null, 'Funciones del PLC.'],
          ['om', 'CV en un contador significa…', ['el valor actual de la cuenta', 'el voltaje de control', 'la velocidad', 'el valor máximo del PLC'], 0, 'Current value.', { n: 2 }]
        ]
      },

      // ═══════════════ S3 · Programa sistemas embebidos ═══════════════
      {
        id: 'mo3s3t1', sub: 's3', nombre: 'Microcontroladores y tarjetas',
        proposito: 'S3 · Identifica puertos de entrada, salida, voltaje y comunicación del sistema embebido y la función de sus periféricos.',
        leccion: [
          { t: 'Sistema embebido', h: `<p>Es una computadora pequeña <b>dedicada a una tarea</b> dentro de un aparato (lavadora, auto, termostato). Su corazón es un <b>microcontrolador</b>: procesador + memoria + periféricos (E/S, ADC, temporizadores, comunicación) en un solo chip.</p>
            <div class="tip">Un <b>microprocesador</b> (el de tu compu) necesita memoria y periféricos externos; un <b>microcontrolador</b> los trae dentro.</div>` },
          { t: 'Arduino UNO y ESP32', h: `<table><tr><th></th><th>Arduino UNO</th><th>ESP32</th></tr><tr><td>Chip</td><td>ATmega328P, 16 MHz</td><td>Doble núcleo, hasta 240 MHz</td></tr><tr><td>Voltaje lógico</td><td><b>5 V</b></td><td><b>3.3 V</b></td></tr><tr><td>E/S</td><td>14 digitales (6 PWM) y 6 analógicas (A0–A5)</td><td>Muchas, con WiFi y Bluetooth</td></tr><tr><td>ADC</td><td>10 bits: 0 a 1023</td><td>12 bits: 0 a 4095</td></tr></table>` },
          { t: 'Puertos de comunicación', h: `<ul><li><b>UART</b> (TX/RX): monitor serie y módulos.</li><li><b>I²C</b> (SDA/SCL): varios sensores y pantallas con solo 2 cables.</li><li><b>SPI</b> (MOSI, MISO, SCK, SS): rápido, para memorias SD y pantallas.</li><li><b>USB</b>: para cargar el programa.</li></ul>
            <div class="ej"><p>Lectura del ADC (UNO): valor = V / 5 × 1023. Con 2.5 V → ≈ 512.</p></div>` }
        ],
        pares: [['Microcontrolador', 'CPU + memoria + periféricos'], ['Arduino UNO', '5 V'], ['ESP32', '3.3 V con WiFi'], ['ADC 10 bits', '0 a 1023'], ['I²C', 'SDA y SCL'], ['UART', 'TX y RX']],
        q: [
          ['om', '¿Qué diferencia a un microcontrolador de un microprocesador?', ['El microcontrolador trae memoria y periféricos dentro del chip', 'El microcontrolador es más grande', 'El microprocesador no hace cálculos', 'No hay diferencia'], 0, 'Todo en un solo chip.'],
          ['om', '¿Con qué voltaje lógico trabaja el Arduino UNO?', ['5 V', '3.3 V', '12 V', '127 V'], 0, 'El ESP32 trabaja a 3.3 V.'],
          ['om', '¿Cuántas entradas analógicas tiene el Arduino UNO?', ['6 (A0 a A5)', '14', '2', '20'], 0, 'Tiene 14 E/S digitales.'],
          ['nu', 'Un ADC de 10 bits, ¿cuántos valores distintos puede dar?', { u: 'valores', tol: 0 }, 1024, '2¹⁰ = 1024 (de 0 a 1023).'],
          ['nu', 'Con un ADC de 10 bits y referencia de 5 V, ¿qué valor aproximado lee el Arduino con 2.5 V?', { u: '', tol: 0.01 }, 512, '2.5 / 5 × 1023 ≈ 511.5 → 512.', { n: 2 }],
          ['om', '¿Qué tarjeta trae WiFi y Bluetooth integrados?', ['ESP32', 'Arduino UNO', 'Un PLC de relevadores', 'Una protoboard'], 0, 'Ideal para IoT.'],
          ['om', 'El bus I²C usa las líneas…', ['SDA y SCL', 'TX y RX', 'MOSI y MISO', 'A1 y A2'], 0, 'Datos y reloj.', { n: 2 }],
          ['vf', 'Conectar una señal de 5 V directo a un pin del ESP32 es seguro.', null, false, 'Trabaja a 3.3 V: puede dañarse. Usa divisor o convertidor de nivel.', { n: 2 }],
          ['om', 'Un sistema embebido es…', ['una computadora dedicada a una tarea dentro de un aparato', 'un programa de oficina', 'una red social', 'un cable de datos'], 0, 'Lavadoras, autos, termostatos…'],
          ['re', 'Relaciona el puerto con sus líneas:', [['UART', 'TX y RX'], ['I²C', 'SDA y SCL'], ['SPI', 'MOSI, MISO y SCK'], ['USB', 'Cargar el programa']], null, 'Comunicación.', { n: 3 }],
          ['om', '¿Cuántos pines PWM tiene el Arduino UNO?', ['6', '14', '1', '0'], 0, 'Marcados con ~ (3, 5, 6, 9, 10, 11).', { n: 2 }]
        ]
      },
      {
        id: 'mo3s3t2', sub: 's3', nombre: 'Programación básica (Arduino)',
        proposito: 'S3 · Identifica el software e instrucciones, elabora y captura el código con la sintaxis correcta.',
        leccion: [
          { t: 'La estructura', h: `<pre class="codigo">void setup() {        // corre UNA vez
  pinMode(13, OUTPUT);
}
void loop() {         // se repite siempre
  digitalWrite(13, HIGH);
  delay(1000);        // 1000 ms = 1 s
  digitalWrite(13, LOW);
  delay(1000);
}</pre>` },
          { t: 'Instrucciones clave', h: `<table><tr><th>Instrucción</th><th>Para qué</th></tr><tr><td>pinMode(pin, OUTPUT / INPUT / INPUT_PULLUP)</td><td>Configura el pin</td></tr><tr><td>digitalWrite(pin, HIGH / LOW)</td><td>Enciende o apaga una salida</td></tr><tr><td>digitalRead(pin)</td><td>Lee 0 o 1</td></tr><tr><td>analogRead(A0)</td><td>Lee 0 a 1023</td></tr><tr><td>analogWrite(pin, 0–255)</td><td>PWM</td></tr><tr><td>Serial.begin(9600) · Serial.println(x)</td><td>Monitor serie</td></tr></table>
            <div class="tip">Cada instrucción termina en <b>;</b> y las llaves { } deben cerrar. Mayúsculas y minúsculas importan: <b>digitalwrite</b> da error.</div>` },
          { t: 'Variables y decisiones', h: `<pre class="codigo">int boton = 2;
void setup() { pinMode(boton, INPUT_PULLUP); pinMode(13, OUTPUT); }
void loop() {
  if (digitalRead(boton) == LOW) { digitalWrite(13, HIGH); }
  else { digitalWrite(13, LOW); }
}</pre><p>Tipos: <b>int</b> (enteros), <b>float</b> (decimales), <b>bool</b> (true/false). Ciclos: <b>for</b> y <b>while</b>.</p>` }
        ],
        pares: [['setup()', 'Corre una vez'], ['loop()', 'Se repite siempre'], ['delay(1000)', '1 segundo'], ['digitalWrite', 'Enciende o apaga'], ['analogRead', '0 a 1023'], ['Serial.println', 'Escribe en el monitor']],
        q: [
          ['om', '¿Qué función de Arduino se ejecuta una sola vez al encender?', ['setup()', 'loop()', 'delay()', 'main()'], 0, 'loop() se repite siempre.'],
          ['om', '¿Qué hace delay(1000)?', ['Espera 1 segundo', 'Espera 1000 segundos', 'Repite 1000 veces', 'Enciende el pin 1000'], 0, 'El argumento está en milisegundos.'],
          ['om', 'Para configurar el pin 13 como salida se escribe…', ['pinMode(13, OUTPUT);', 'digitalWrite(13, OUTPUT);', 'pinMode(OUTPUT, 13);', 'pin13 = salida;'], 0, 'Primero el pin, luego el modo.'],
          ['om', '¿Qué instrucción enciende el LED del pin 13?', ['digitalWrite(13, HIGH);', 'digitalRead(13);', 'analogRead(13);', 'pinMode(13, HIGH);'], 0, 'HIGH = 5 V en el UNO.'],
          ['om', 'Este código no compila: «digitalWrite(13, HIGH)» (sin nada más). ¿Qué falta?', ['El punto y coma ;', 'Las comillas', 'Un delay', 'Nada'], 0, 'Cada instrucción termina en ;.', { n: 2 }],
          ['om', 'Con INPUT_PULLUP, al presionar un botón conectado a tierra, digitalRead da…', ['LOW (0)', 'HIGH (1)', '1023', 'error'], 0, 'La resistencia interna lo mantiene en HIGH sin presionar.', { n: 3 }],
          ['om', 'Para ver valores en la computadora mientras corre el programa usas…', ['Serial.begin(9600) y Serial.println()', 'digitalWrite()', 'pinMode()', 'delay()'], 0, 'Monitor serie.'],
          ['om', '¿Qué tipo de variable guarda 3.75?', ['float', 'int', 'bool', 'char'], 0, 'Decimales: float.', { n: 2 }],
          ['or', 'Ordena el código para que un LED parpadee dentro de loop():', ['digitalWrite(13, HIGH);', 'delay(500); // encendido', 'digitalWrite(13, LOW);', 'delay(500); // apagado'], null, 'Enciende, espera, apaga, espera.'],
          ['vf', 'En Arduino, digitalwrite y digitalWrite son la misma instrucción.', null, false, 'Distingue mayúsculas y minúsculas.'],
          ['nu', 'Un LED parpadea con delay(250) encendido y delay(250) apagado. ¿Cuántos parpadeos completos da en 1 segundo?', { u: 'parpadeos', tol: 0 }, 2, 'Cada ciclo dura 500 ms → 2 por segundo.', { n: 2 }],
          ['om', '¿Qué instrucción lee un potenciómetro en A0?', ['analogRead(A0)', 'digitalRead(A0)', 'analogWrite(A0)', 'Serial.read(A0)'], 0, 'Devuelve 0 a 1023.']
        ]
      },
      {
        id: 'mo3s3t3', sub: 's3', nombre: 'Sensores y actuadores con la tarjeta',
        proposito: 'S3 · Elabora el diagrama para ensamblar o simular el sistema embebido y ensambla los elementos de potencia y control.',
        leccion: [
          { t: 'LED y su resistencia', h: `<p><b>R = (Vfuente − VLED) / I</b>. LED rojo (≈2 V) a 5 V con 20 mA → R = (5 − 2) / 0.02 = <b>150 Ω</b> (usa el valor comercial siguiente: 220 Ω).</p>
            <p>Botones: resistencia <b>pull-down</b> (lee 0 en reposo) o <b>pull-up</b> (lee 1 en reposo; con INPUT_PULLUP ya viene dentro).</p>` },
          { t: 'PWM y servos', h: `<ul><li><b>analogWrite(pin, valor)</b> con 0–255: 0 = apagado, 255 = 100 %, ≈127 = 50 %. Regula brillo o velocidad.</li><li><b>Servo</b> (librería Servo.h): servo.write(90) lo lleva a 90° (rango 0–180°).</li><li><b>map(x, 0, 1023, 0, 180)</b> convierte la lectura de un potenciómetro en ángulo.</li></ul>` },
          { t: 'Cargas de potencia', h: `<ul><li>Un pin del Arduino da poca corriente: para un <b>relevador</b> se usa un <b>transistor</b> y un <b>diodo de rueda libre</b> (protege del pico de la bobina).</li><li>Para un <b>motor de CD</b> que cambie de giro: <b>puente H</b> (por ejemplo L298N) con fuente externa y <b>tierra común</b>.</li><li>Ultrasónico HC-SR04: distancia (cm) = tiempo (µs) × 0.0343 / 2.</li></ul>` }
        ],
        pares: [['Pull-up', 'Lee 1 en reposo'], ['PWM 255', '100 %'], ['Servo.write(90)', '90 grados'], ['Puente H', 'Invertir motor DC'], ['Diodo de rueda libre', 'Protege del pico'], ['map()', 'Cambia de escala']],
        q: [
          ['nu', 'LED de 2 V, fuente de 5 V, corriente de 20 mA. ¿Qué resistencia necesita?', { u: 'Ω', tol: 0 }, 150, 'R = (5 − 2) / 0.02 = 150 Ω.'],
          ['nu', 'LED azul de 3 V a 5 V con 10 mA. ¿Resistencia?', { u: 'Ω', tol: 0 }, 200, '(5 − 3) / 0.01 = 200 Ω.', { n: 2 }],
          ['om', 'Con analogWrite, ¿qué valor da aproximadamente 50 % de brillo?', ['127', '255', '1023', '50'], 0, 'Rango 0–255.'],
          ['om', '¿Qué instrucción lleva un servo a 90°?', ['servo.write(90);', 'digitalWrite(90);', 'analogRead(90);', 'delay(90);'], 0, 'Con la librería Servo.h.'],
          ['om', 'Para invertir el giro de un motor de CD con Arduino se usa…', ['un puente H como el L298N', 'un LED', 'una resistencia de 220 Ω', 'un pull-up'], 0, 'Invierte la polaridad.'],
          ['om', 'Para activar un relevador con Arduino se usa un transistor y…', ['un diodo de rueda libre', 'un capacitor de 1 F', 'un LED infrarrojo', 'nada más'], 0, 'El diodo absorbe el pico de voltaje de la bobina.', { n: 2 }],
          ['om', 'map(512, 0, 1023, 0, 180) da aproximadamente…', ['90', '512', '180', '0'], 0, 'La mitad del rango de entrada → mitad del de salida.', { n: 2 }],
          ['nu', 'El HC-SR04 mide un eco de 1000 µs. ¿A cuántos cm está el objeto? (× 0.0343 ÷ 2, redondea a décimas)', { u: 'cm', tol: 0.01 }, 17.2, '1000 × 0.0343 / 2 = 17.15 cm.', { n: 3 }],
          ['vf', 'Si el motor usa una fuente externa, sus tierras deben unirse con la del Arduino (tierra común).', null, true, 'Sin referencia común las señales no funcionan.', { n: 2 }],
          ['om', 'Una resistencia pull-down hace que el pin lea…', ['0 cuando el botón no está presionado', '1 cuando el botón no está presionado', '1023', 'un valor al azar'], 0, 'La pull-up hace lo contrario.'],
          ['re', 'Relaciona el componente con su uso:', [['Servo', 'Posición en grados'], ['Puente H', 'Giro del motor DC'], ['LDR', 'Detecta luz'], ['HC-SR04', 'Mide distancia']], null, 'Sensores y actuadores.']
        ]
      },
      {
        id: 'mo3s3t4', sub: 's3', nombre: 'Cargar, verificar y ahorrar energía',
        proposito: 'S3 · Carga el programa, verifica el funcionamiento del sistema embebido y optimiza el uso de energía (nexo agua-energía-alimento).',
        leccion: [
          { t: 'Del código a la tarjeta', h: `<ol><li><b>Verificar/compilar</b>: revisa la sintaxis y traduce a lenguaje máquina.</li><li><b>Elegir tarjeta y puerto</b> (COM o /dev/tty…).</li><li><b>Cargar (subir)</b> por USB.</li><li><b>Probar</b> con el Monitor serie y el circuito.</li></ol>
            <p>También puedes simular antes (por ejemplo en Tinkercad o Wokwi).</p>` },
          { t: 'Depurar como profesional', h: `<ul><li>Lee el primer error del compilador: suele indicar la línea.</li><li>Imprime valores con Serial.println para ver qué pasa.</li><li>Revisa conexiones: tierra común, pines correctos, polaridad del LED.</li><li>Un pin del UNO no debe pasar de <b>20 mA</b> recomendados (40 mA es el máximo absoluto).</li></ul>` },
          { t: 'Energía con propósito', h: `<p>Un sistema de <b>riego automático</b> con sensor de humedad solo abre la válvula cuando el suelo está seco: ahorra agua y energía y cuida los cultivos (nexo <b>agua–energía–alimento</b>).</p>
            <ul><li>Apaga módulos que no usas; usa modos de <b>bajo consumo (sleep)</b> en tarjetas con batería.</li><li>Evita delay() largos si necesitas responder rápido: usa millis().</li></ul>` }
        ],
        pares: [['Compilar', 'Revisar y traducir el código'], ['Cargar', 'Subir por USB'], ['Monitor serie', 'Ver valores'], ['20 mA', 'Corriente recomendada por pin'], ['Sleep', 'Bajo consumo'], ['millis()', 'Tiempo sin bloquear']],
        q: [
          ['or', 'Ordena los pasos para programar la tarjeta:', ['Escribir el código', 'Verificar / compilar', 'Elegir tarjeta y puerto', 'Cargar por USB', 'Probar con el monitor serie'], null, 'Del código a la prueba.'],
          ['om', '¿Qué hace el botón «Verificar» del IDE de Arduino?', ['Revisa la sintaxis y compila', 'Sube el programa', 'Borra la tarjeta', 'Mide voltaje'], 0, 'No carga nada a la tarjeta.'],
          ['om', 'El monitor serie sirve para…', ['ver valores que imprime el programa mientras corre', 'alimentar la tarjeta', 'soldar', 'medir resistencia'], 0, 'Depuración.'],
          ['om', 'La corriente recomendada por pin del Arduino UNO es de…', ['20 mA', '2 A', '200 mA', '20 A'], 0, '40 mA es el máximo absoluto.', { n: 2 }],
          ['om', 'Un riego automático que abre la válvula solo cuando el suelo está seco ayuda al nexo…', ['agua–energía–alimento', 'aire–fuego–tierra', 'voltaje–corriente–resistencia', 'ninguno'], 0, 'Ahorra agua y energía y cuida los cultivos.'],
          ['om', 'En una tarjeta con batería, para ahorrar energía se usa…', ['el modo de bajo consumo (sleep)', 'delay infinito', 'más LEDs', 'un voltaje mayor'], 0, 'Apaga partes del chip mientras espera.', { n: 2 }],
          ['om', 'El compilador marca error en la línea 12. ¿Qué haces primero?', ['Leer el primer mensaje y revisar esa línea y la anterior', 'Cambiar de computadora', 'Reinstalar todo', 'Cargar de todos modos'], 0, 'Muchas veces falta un ; en la línea anterior.', { n: 2 }],
          ['vf', 'Antes de armar el circuito real conviene simularlo.', null, true, 'Evita quemar componentes.'],
          ['om', '¿Por qué conviene usar millis() en lugar de delay() largos?', ['Porque el programa puede seguir leyendo sensores mientras mide el tiempo', 'Porque es más bonito', 'Porque delay no existe', 'Porque ahorra cable'], 0, 'delay() detiene todo.', { n: 3 }],
          ['om', 'Un LED no prende y el código está bien. ¿Qué revisas?', ['Polaridad del LED, resistencia y tierra', 'El color de la tarjeta', 'El nombre del archivo', 'Nada'], 0, 'La pata larga (ánodo) va al positivo.'],
          ['re', 'Relaciona la acción con su herramienta:', [['Compilar', 'Botón Verificar'], ['Cargar', 'Puerto USB'], ['Depurar', 'Monitor serie'], ['Simular', 'Tinkercad o Wokwi']], null, 'Flujo de trabajo.']
        ]
      }
    ]
  };
  void esc;
})();
