// ENGRANE · Inglés III (A2) «What We Were, We Share»
// Fuente: SEP · MCCEMS Modelo Educativo 2025 · Inglés III — 8 propósitos formativos.
// En 'om' la respuesta correcta es el índice indicado (las opciones se barajan al mostrarse).
(function () {
  const ENG = window.ENG;
  const H = (t) => `<button class="hablar" data-hablar="${t.replace(/"/g, '&quot;')}">🔊</button>`;

  ENG.CONTENIDO.ingles3 = {
    temas: [
      // ───────────────────────── PROPÓSITO 1 ─────────────────────────
      {
        id: 'i3t1',
        nombre: 'Rutinas en pasado (verbos regulares)',
        proposito: 'Propósito 1 · Habla sobre rutinas pasadas y recientes en la vida cotidiana.',
        leccion: [
          { t: '¿Para qué sirve el pasado simple?', h: `<p>Para contar acciones que <b>ya terminaron</b> en un momento del pasado.</p>
            <div class="ej"><p>I <b>walked</b> to school yesterday. ${H('I walked to school yesterday.')}</p><p>She <b>cleaned</b> her room last weekend. ${H('She cleaned her room last weekend.')}</p></div>
            <p><b>Expresiones de tiempo pasado:</b> yesterday, last night, last week, last month, two days ago, in 2024.</p>` },
          { t: 'Verbos regulares: + ed', h: `<table><tr><th>Regla</th><th>Ejemplo</th></tr>
            <tr><td>Casi todos: + ed</td><td>work → work<b>ed</b></td></tr>
            <tr><td>Termina en e: + d</td><td>dance → danc<b>ed</b></td></tr>
            <tr><td>Consonante + y → ied</td><td>study → stud<b>ied</b></td></tr>
            <tr><td>Vocal + y: + ed</td><td>play → play<b>ed</b></td></tr>
            <tr><td>Consonante-vocal-consonante corta: dobla</td><td>stop → sto<b>pped</b></td></tr></table>
            <div class="tip">El pasado es igual para todas las personas: I worked, he worked, they worked.</div>` },
          { t: 'Negativo y preguntas', h: `<p><b>Negativo:</b> didn't (did not) + verbo en forma base.</p>
            <div class="ej"><p>I <b>didn't watch</b> TV yesterday. ${H("I didn't watch TV yesterday.")}</p></div>
            <p><b>Pregunta:</b> Did + sujeto + verbo base?</p>
            <div class="ej"><p><b>Did</b> you <b>finish</b> your homework? — Yes, I did. / No, I didn't. ${H("Did you finish your homework? Yes, I did.")}</p></div>
            <div class="tip">⚠ Después de <b>did</b> o <b>didn't</b> el verbo NO lleva -ed: I didn't watch ✔ · I didn't watched ✘</div>` },
          { t: 'Cómo suena la -ed', h: `<table><tr><th>Sonido</th><th>Cuándo</th><th>Ejemplos</th></tr>
            <tr><td>/t/</td><td>después de sonidos sordos (k, p, s, ch, sh)</td><td>worked ${H('worked')} watched ${H('watched')}</td></tr>
            <tr><td>/d/</td><td>después de sonidos sonoros</td><td>played ${H('played')} cleaned ${H('cleaned')}</td></tr>
            <tr><td>/ɪd/ (suena «id»)</td><td>solo después de t o d</td><td>wanted ${H('wanted')} needed ${H('needed')}</td></tr></table>` },
          { t: 'Vocabulario de rutinas', h: `<ul><li>walk to school · clean my room · help my mom</li><li>watch TV · listen to music · cook dinner</li><li>wash the dishes · play soccer · study for a test</li></ul>
            <div class="ej"><p>Yesterday I <b>cleaned</b> my room, <b>helped</b> my mom and <b>listened</b> to music. ${H('Yesterday I cleaned my room, helped my mom and listened to music.')}</p></div>
            <div class="tip">Algunas rutinas usan verbos irregulares (get up → got up, have → had, do → did). Los practicas en el tema «Narrar eventos».</div>` }
        ],
        pares: [['work', 'worked'], ['study', 'studied'], ['play', 'played'], ['stop', 'stopped'], ['dance', 'danced'], ['watch', 'watched'], ['clean', 'cleaned'], ['cry', 'cried']],
        q: [
          ['om', 'Yesterday I ___ (walk) to school.', ['walked', 'walk', 'walks', 'walking'], 0, 'Pasado simple de un verbo regular: walk + ed.'],
          ['co', 'Last night she ___ (study) for the exam.', null, ['studied'], 'Consonante + y → ied: study → studied.'],
          ['co', 'We ___ (play) soccer last Saturday.', null, ['played'], 'Vocal + y: solo se agrega -ed: played.'],
          ['co', 'The bus ___ (stop) in front of the school.', null, ['stopped'], 'Consonante-vocal-consonante corta: se dobla la última letra: stopped.'],
          ['om', 'Choose the correct negative of: "I watched TV yesterday."', ["I didn't watch TV yesterday.", "I didn't watched TV yesterday.", "I don't watched TV yesterday.", 'I not watched TV yesterday.'], 0, "Después de didn't el verbo va en forma base: didn't watch."],
          ['om', '___ you clean your room last weekend?', ['Did', 'Do', 'Does', 'Were'], 0, 'Para preguntar en pasado simple se usa Did + sujeto + verbo base.'],
          ['om', 'Did they finish the project? — Yes, they ___.', ['did', 'do', 'finished', "didn't"], 0, 'La respuesta corta repite el auxiliar: Yes, they did.'],
          ['vf', '"Two days ago" is a past time expression.', null, true, '«Ago» significa «hace»: two days ago = hace dos días.'],
          ['om', 'Which sentence is in the past simple?', ['My dad cooked dinner last night.', 'My dad cooks dinner every night.', 'My dad is cooking dinner now.', 'My dad will cook dinner tonight.'], 0, 'Cooked + last night = pasado simple.'],
          ['or', 'Order the sentence:', ['I', 'helped', 'my', 'mom', 'yesterday'], null, 'Sujeto + verbo en pasado + complemento + tiempo.'],
          ['om', 'Listen. What did Ana do last weekend?', ['She visited her grandparents.', 'She played soccer.', 'She studied math.', 'She watched a movie.'], 0, 'Audio: "Last weekend, Ana visited her grandparents and cooked a big lunch."', { audio: 'Last weekend, Ana visited her grandparents and cooked a big lunch.', n: 2 }],
          ['om', 'How does the -ed sound in "wanted"?', ['/ɪd/ (like "id")', '/t/', '/d/', 'It is silent'], 0, 'Después de t o d, la -ed suena «id»: want-id.', { audio: 'wanted', n: 2 }],
          ['re', 'Match each verb with its past form:', [['dance', 'danced'], ['try', 'tried'], ['plan', 'planned'], ['open', 'opened']], null, 'try → tried (y → ied); plan → planned (se dobla la n).'],
          ['co', "I didn't ___ (listen) to music yesterday.", null, ['listen'], "Después de didn't el verbo va en forma base, sin -ed.", { n: 2 }],
          ['om', 'Choose the correct time expression: "I visited my cousins ___."', ['last month', 'tomorrow', 'every day', 'next week'], 0, 'Visited es pasado, así que necesita una expresión de pasado.'],
          ['co', 'Listen and write the verb: "We ___ the dishes after dinner."', null, ['washed'], 'Audio: "We washed the dishes after dinner."', { audio: 'We washed the dishes after dinner.', n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'I walked to school and played soccer after class.', 'Pasado regular: walked /wɔːkt/, played /pleɪd/. La -ed suena /t/ después de k y /d/ después de vocal.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'We watched a movie and cooked dinner yesterday.', 'watched /wɒtʃt/, cooked /kʊkt/: la -ed suena /t/.', { n: 2 }]
        ]
      },
      // ───────────────────────── PROPÓSITO 2 ─────────────────────────
      {
        id: 'i3t2',
        nombre: 'Experiencias recientes (present perfect)',
        proposito: 'Propósito 2 · Comparte experiencias personales recientes: qué ha hecho y con quién.',
        leccion: [
          { t: 'Estructura: have / has + participio', h: `<div class="formula">have / has + participio</div>
            <div class="ej"><p>I <b>have visited</b> Guanajuato. ${H('I have visited Guanajuato.')}</p><p>She <b>has finished</b> her homework. ${H('She has finished her homework.')}</p></div>
            <p>He, she, it → <b>has</b>. I, you, we, they → <b>have</b>.</p><p>Contracciones: I've, you've, we've, they've · he's, she's, it's.</p>` },
          { t: '¿Cuándo se usa?', h: `<ul><li><b>Experiencias de vida</b> sin decir cuándo: Have you <b>ever</b> eaten sushi?</li><li><b>Algo reciente</b> que importa ahora: I've <b>just</b> finished.</li></ul>
            <table><tr><th>Palabra</th><th>Significa</th><th>Ejemplo</th></tr>
            <tr><td>ever</td><td>alguna vez (preguntas)</td><td>Have you ever played volleyball?</td></tr>
            <tr><td>never</td><td>nunca</td><td>I have never flown.</td></tr>
            <tr><td>just</td><td>acabar de</td><td>She has just arrived.</td></tr>
            <tr><td>already</td><td>ya (afirmativo)</td><td>We have already eaten.</td></tr>
            <tr><td>yet</td><td>todavía / ya (al final, en negativas y preguntas)</td><td>I haven't finished yet.</td></tr></table>` },
          { t: 'Participios', h: `<p><b>Regulares:</b> igual que el pasado: visited, played, studied.</p>
            <table><tr><th>Base</th><th>Participio</th><th>Base</th><th>Participio</th></tr>
            <tr><td>be</td><td>been</td><td>see</td><td>seen</td></tr><tr><td>go</td><td>gone / been</td><td>eat</td><td>eaten</td></tr>
            <tr><td>do</td><td>done</td><td>make</td><td>made</td></tr><tr><td>take</td><td>taken</td><td>write</td><td>written</td></tr>
            <tr><td>buy</td><td>bought</td><td>win</td><td>won</td></tr></table>` },
          { t: 'Negativo y preguntas', h: `<div class="ej"><p>I <b>haven't seen</b> that movie. ${H("I haven't seen that movie.")}</p><p>He <b>hasn't called</b> yet. ${H("He hasn't called yet.")}</p>
            <p><b>Have</b> you <b>ever been</b> to Mexico City? — Yes, I have. / No, I haven't. ${H('Have you ever been to Mexico City? No, I haven\'t.')}</p></div>` },
          { t: 'Ojo: si dices CUÁNDO, usa pasado simple', h: `<table><tr><th>Present perfect (sin fecha)</th><th>Past simple (con fecha)</th></tr>
            <tr><td>I <b>have seen</b> that movie.</td><td>I <b>saw</b> that movie <b>last week</b>.</td></tr>
            <tr><td>She <b>has visited</b> León.</td><td>She <b>visited</b> León <b>in 2024</b>.</td></tr></table>` }
        ],
        pares: [['see', 'seen'], ['eat', 'eaten'], ['go', 'gone'], ['do', 'done'], ['write', 'written'], ['be', 'been'], ['take', 'taken'], ['buy', 'bought']],
        q: [
          ['om', 'I ___ visited the Cervantino festival.', ['have', 'has', 'am', 'did'], 0, 'Con I se usa have + participio.'],
          ['om', 'She ___ finished her project.', ['has', 'have', 'is', 'did'], 0, 'Con she se usa has.'],
          ['co', 'Have you ever ___ (eat) tamales de elote?', null, ['eaten'], 'Participio de eat: eaten.'],
          ['co', 'We have ___ (see) that movie three times.', null, ['seen'], 'Participio de see: seen.'],
          ['om', 'Choose the correct question:', ['Have you ever been to Guadalajara?', 'Did you ever been to Guadalajara?', 'Has you ever been to Guadalajara?', 'Have you ever went to Guadalajara?'], 0, 'Have + you + ever + participio (been).'],
          ['om', "I haven't finished my homework ___.", ['yet', 'already', 'just', 'ever'], 0, 'Yet va al final en oraciones negativas y preguntas.'],
          ['om', 'They have ___ arrived. They are here now!', ['just', 'yet', 'ever', 'never'], 0, 'Just = acaban de: algo muy reciente.'],
          ['vf', '"She has went to the market" is correct.', null, false, 'El participio de go es gone: She has gone to the market.'],
          ['om', 'Has Luis called you? — No, he ___.', ["hasn't", "haven't", "didn't", "isn't"], 0, 'Respuesta corta con has → hasn\'t.'],
          ['om', 'Which one is correct?', ['I met my best friend in 2023.', 'I have met my best friend in 2023.', 'I have meet my best friend in 2023.', 'I meeted my best friend in 2023.'], 0, 'Con una fecha exacta (in 2023) se usa pasado simple.', { n: 2 }],
          ['or', 'Order the question:', ['Have', 'you', 'ever', 'played', 'volleyball?'], null, 'Have + sujeto + ever + participio.'],
          ['re', 'Match the verb with its participle:', [['write', 'written'], ['do', 'done'], ['take', 'taken'], ['be', 'been']], null, 'Son participios irregulares: hay que memorizarlos.'],
          ['om', 'Listen. What has Marco done this week?', ['He has cleaned his room and helped his grandmother.', 'He has played video games.', 'He has visited a museum.', "He hasn't done anything."], 0, 'Audio: "This week, Marco has cleaned his room and he has helped his grandmother."', { audio: 'This week, Marco has cleaned his room and he has helped his grandmother.', n: 2 }],
          ['co', 'My sister ___ (never / travel) by plane.', null, ['has never traveled', 'has never travelled'], 'Has + never + participio: has never traveled.', { n: 3 }],
          ['om', '"I\'ve already done my homework" means…', ['Ya hice mi tarea.', 'Todavía no hago mi tarea.', 'Nunca hago mi tarea.', 'Voy a hacer mi tarea.'], 0, 'Already = ya.'],
          ['om', 'Listen and choose what you hear.', ["I haven't seen her yet.", 'I have seen her yesterday.', "I didn't see her.", 'I have never seen her.'], 0, "Audio: \"I haven't seen her yet.\"", { audio: "I haven't seen her yet.", n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'I have never been to Mexico City.', 'Present perfect: have + participio (been).', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'She has already finished her homework.', 'has + already + finished: la -ed final suena /t/.', { n: 2 }]
        ]
      },
      // ───────────────────────── PROPÓSITO 3 ─────────────────────────
      {
        id: 'i3t3',
        nombre: 'Lugares y lo que puedes hacer',
        proposito: 'Propósito 3 · Describe lugares conocidos y lo que se puede hacer en ellos.',
        leccion: [
          { t: 'There is / There are', h: `<table><tr><th></th><th>Singular</th><th>Plural</th></tr>
            <tr><td>Afirmativo</td><td>There <b>is</b> a park.</td><td>There <b>are</b> two banks.</td></tr>
            <tr><td>Negativo</td><td>There <b>isn't</b> a cinema.</td><td>There <b>aren't any</b> museums.</td></tr>
            <tr><td>Pregunta</td><td><b>Is there</b> a library?</td><td><b>Are there any</b> restaurants?</td></tr></table>
            <div class="ej"><p>Is there a hospital near here? — Yes, there is. ${H('Is there a hospital near here? Yes, there is.')}</p></div>` },
          { t: 'Can / can\'t: lo que se puede hacer', h: `<p><b>Can</b> + verbo base (sin «to»).</p>
            <div class="ej"><p>In the park, you <b>can ride</b> a bike. ${H('In the park, you can ride a bike.')}</p><p>At the library, you <b>can't talk</b> loudly. ${H("At the library, you can't talk loudly.")}</p></div>
            <div class="tip">✘ can to ride · ✘ can riding · ✔ can ride</div>` },
          { t: 'Preposiciones de lugar', h: `<table><tr><th>Inglés</th><th>Español</th></tr>
            <tr><td>next to</td><td>junto a / al lado de</td></tr><tr><td>between</td><td>entre</td></tr>
            <tr><td>in front of</td><td>enfrente de / delante de</td></tr><tr><td>behind</td><td>detrás de</td></tr>
            <tr><td>across from</td><td>enfrente (del otro lado de la calle)</td></tr><tr><td>near</td><td>cerca de</td></tr>
            <tr><td>on the corner</td><td>en la esquina</td></tr></table>` },
          { t: 'Lugares públicos y naturales', h: `<ul><li>city hall (presidencia municipal) · main square (plaza principal) · church · market</li>
            <li>library · hospital · bus station (central de autobuses) · stadium · museum · park</li>
            <li>river · forest · lake · mountain · beach</li></ul>
            <div class="ej"><p>In my town there is a big main square. The church is next to the square. You can buy fruit at the market. ${H('In my town there is a big main square. The church is next to the square. You can buy fruit at the market.')}</p></div>` }
        ],
        pares: [['next to', 'junto a'], ['between', 'entre'], ['behind', 'detrás de'], ['in front of', 'enfrente de'], ['near', 'cerca de'], ['city hall', 'presidencia municipal'], ['river', 'río'], ['forest', 'bosque']],
        q: [
          ['om', '___ a library near my school.', ['There is', 'There are', 'There be', 'It have'], 0, 'Singular (a library) → There is.'],
          ['om', '___ many students in the classroom.', ['There are', 'There is', 'Is there', 'It are'], 0, 'Plural (many students) → There are.'],
          ['om', '___ a hospital in your town? — Yes, there is.', ['Is there', 'Are there', 'There is', 'Has there'], 0, 'Pregunta en singular: Is there…?'],
          ['om', 'The river is dangerous. You ___ swim there.', ["can't", 'can', 'must', 'have'], 0, "Can't = no se puede."],
          ['om', 'In the park, you can ___ a bike.', ['ride', 'to ride', 'riding', 'rides'], 0, 'Can + verbo base.'],
          ['om', 'The bank is ___ the pharmacy and the bakery.', ['between', 'next', 'behind of', 'in'], 0, 'Between = entre dos cosas.'],
          ['om', 'Translate: «La tienda está enfrente de la escuela.»', ['The store is in front of the school.', 'The store is behind the school.', 'The store is between the school.', 'The store is next the school.'], 0, 'In front of = enfrente de.'],
          ['vf', '"Behind" means "detrás de".', null, true, 'Behind = detrás de.'],
          ['re', 'Match the places:', [['city hall', 'presidencia municipal'], ['market', 'mercado'], ['bus station', 'central de autobuses'], ['main square', 'plaza principal']], null, 'Vocabulario de lugares públicos.'],
          ['om', 'Listen. Where is the museum?', ['Next to the church.', 'Behind the market.', 'Between the bank and the school.', 'Near the river.'], 0, 'Audio: "The museum is next to the church, across from the main square."', { audio: 'The museum is next to the church, across from the main square.', n: 2 }],
          ['co', 'There ___ any cinemas in my town. (negativo)', null, ["aren't", 'are not'], "Plural negativo: There aren't any…", { n: 2 }],
          ['or', 'Order the sentence:', ['You', 'can', 'buy', 'fruit', 'at', 'the', 'market'], null, 'Sujeto + can + verbo + complemento + lugar.'],
          ['om', 'Which sentence is correct?', ['There are two parks in my neighborhood.', 'There is two parks in my neighborhood.', 'There are a park in my neighborhood.', 'There have two parks in my neighborhood.'], 0, 'Two parks es plural → There are.'],
          ['om', 'What can you do at the library?', ['You can read and borrow books.', 'You can swim.', 'You can buy tortillas.', 'You can play soccer.'], 0, 'En la biblioteca puedes leer y pedir libros prestados.'],
          ['om', 'Listen and choose the place.', ['forest', 'river', 'market', 'stadium'], 0, 'Audio: "forest" = bosque.', { audio: 'forest' }],
          ['ha', 'Speaking · Read aloud:', null, 'You can swim in the river and walk in the forest.', 'can + verbo base: «can swim», «can walk».', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'There is a big market near my house.', 'There is + singular: «There is a big market».', { n: 2 }]
        ]
      },
      // ───────────────────────── PROPÓSITO 4 ─────────────────────────
      {
        id: 'i3t4',
        nombre: 'Hábitos, frecuencia y preferencias',
        proposito: 'Propósito 4 · Habla sobre hábitos, frecuencia y preferencias; compara lo que hacen o prefieren las personas.',
        leccion: [
          { t: 'Adverbios de frecuencia', h: `<p><b>always</b> (100%) → <b>usually</b> → <b>often</b> → <b>sometimes</b> → <b>rarely</b> → <b>never</b> (0%)</p>
            <ul><li>Van <b>antes</b> del verbo: I <b>always</b> eat breakfast.</li><li>Van <b>después</b> de be: She <b>is never</b> late.</li></ul>
            <div class="ej"><p>How often do you play volleyball? — Twice a week. ${H('How often do you play volleyball? Twice a week.')}</p></div>` },
          { t: 'Like + sustantivo / like + -ing', h: `<div class="ej"><p>I like <b>music</b>. ${H('I like music.')}</p><p>He likes <b>playing</b> football. ${H('He likes playing football.')}</p><p>They don't like <b>studying</b> at night. ${H("They don't like studying at night.")}</p></div>
            <div class="tip">He / she / it → <b>likes</b>, <b>doesn't like</b>, <b>Does</b> she like…?</div>` },
          { t: 'Comparativos', h: `<table><tr><th>Adjetivo</th><th>Comparativo</th></tr>
            <tr><td>corto: tall</td><td>tall<b>er</b> than</td></tr><tr><td>c-v-c: big</td><td>bi<b>gger</b> than</td></tr>
            <tr><td>termina en y: easy</td><td>eas<b>ier</b> than</td></tr><tr><td>largo: interesting</td><td><b>more</b> interesting than</td></tr>
            <tr><td>good / bad</td><td><b>better</b> / <b>worse</b> than</td></tr></table>
            <div class="ej"><p>Volleyball is more exciting than chess. ${H('Volleyball is more exciting than chess.')}</p></div>` },
          { t: 'Superlativos', h: `<table><tr><th>Adjetivo</th><th>Superlativo</th></tr>
            <tr><td>tall</td><td><b>the</b> tall<b>est</b></td></tr><tr><td>big</td><td><b>the</b> bi<b>ggest</b></td></tr>
            <tr><td>easy</td><td><b>the</b> eas<b>iest</b></td></tr><tr><td>popular</td><td><b>the most</b> popular</td></tr>
            <tr><td>good / bad</td><td><b>the best</b> / <b>the worst</b></td></tr></table>
            <div class="ej"><p>This is the best taco place in town! ${H('This is the best taco place in town!')}</p></div>` }
        ],
        pares: [['good', 'better'], ['bad', 'worse'], ['big', 'bigger'], ['easy', 'easier'], ['always', 'siempre'], ['never', 'nunca'], ['rarely', 'casi nunca'], ['often', 'a menudo']],
        q: [
          ['om', 'I ___ eat breakfast. I never skip it!', ['always', 'never', 'rarely', 'sometimes'], 0, 'Si nunca te lo saltas, siempre (always) desayunas.'],
          ['om', 'Which sentence is correct?', ['She is never late.', 'She never is late.', 'Never she is late.', 'She is late never.'], 0, 'Con el verbo be, el adverbio va después: is never.'],
          ['om', 'He ___ playing football.', ['likes', 'like', 'liking', 'is like'], 0, 'He → likes.'],
          ['om', "They don't like ___ at night.", ['studying', 'study', 'studies', 'studied'], 0, 'Like + verbo con -ing.'],
          ['co', 'Volleyball is ___ (exciting) than chess.', null, ['more exciting'], 'Adjetivo largo → more + adjetivo.'],
          ['co', 'My brother is ___ (tall) than me.', null, ['taller'], 'Adjetivo corto → + er.'],
          ['om', 'This is the ___ pizza in town!', ['best', 'better', 'goodest', 'most good'], 0, 'Superlativo de good: the best.'],
          ['om', 'Mexico City is ___ city in Mexico.', ['the biggest', 'the bigger', 'biggest', 'the most big'], 0, 'Superlativo: the + big + g + est.'],
          ['vf', '"Rarely" means almost never.', null, true, 'Rarely = casi nunca.'],
          ['or', 'Order the sentence:', ['I', 'usually', 'listen', 'to', 'music', 'after', 'school'], null, 'El adverbio va antes del verbo principal.'],
          ['om', 'How often do you play volleyball? — ___', ['Twice a week.', 'Yes, I do.', 'At the park.', 'With my friends.'], 0, 'How often pregunta la frecuencia.'],
          ['om', 'Listen. What does Sofía prefer?', ['Playing basketball.', 'Swimming.', 'Watching TV.', 'Running.'], 0, 'Audio: "Sofía likes swimming, but she prefers playing basketball with her friends."', { audio: 'Sofía likes swimming, but she prefers playing basketball with her friends.', n: 2 }],
          ['re', 'Match the adverbs:', [['always', 'siempre'], ['usually', 'normalmente'], ['sometimes', 'a veces'], ['never', 'nunca']], null, 'Adverbios de frecuencia.'],
          ['om', 'For me, English is ___ than math.', ['easier', 'more easy', 'easyer', 'the easiest'], 0, 'easy → easier (y → ier).', { n: 2 }],
          ['co', 'Summer is ___ (hot) season of the year.', null, ['the hottest'], 'Superlativo: the + hot + t + est.', { n: 3 }],
          ['ha', 'Speaking · Read aloud:', null, "I usually get up at six o'clock.", 'Adverbio de frecuencia antes del verbo: usually get up.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'I prefer pizza to hamburgers.', 'prefer A to B = prefiero A en lugar de B.', { n: 2 }]
        ]
      },
      // ───────────────────────── PROPÓSITO 5 ─────────────────────────
      {
        id: 'i3t5',
        nombre: 'Reglas y responsabilidades',
        proposito: 'Propósito 5 · Habla de responsabilidades y reglas en casa, en la escuela o en la comunidad.',
        leccion: [
          { t: 'Must / mustn\'t', h: `<p><b>Must</b> + verbo base = obligación o regla fuerte. <b>Mustn't</b> = está prohibido.</p>
            <div class="ej"><p>You <b>must</b> wear safety glasses in the workshop. ${H('You must wear safety glasses in the workshop.')}</p><p>You <b>mustn't</b> use your phone during the exam. ${H("You mustn't use your phone during the exam.")}</p></div>` },
          { t: 'Have to / don\'t have to', h: `<p><b>Have to</b> = tienes que (obligación). He / she / it → <b>has to</b>.</p>
            <p><b>Don't have to</b> = NO es necesario (puedes, pero no es obligatorio).</p>
            <div class="ej"><p>I <b>have to</b> do my homework. ${H('I have to do my homework.')}</p><p>We <b>don't have to</b> wear a uniform on Fridays. ${H("We don't have to wear a uniform on Fridays.")}</p></div>
            <p>Pregunta: <b>Do</b> you <b>have to</b>…? — Yes, I do. / No, I don't.</p>` },
          { t: '⚠ La trampa', h: `<table><tr><th>mustn't</th><th>don't have to</th></tr><tr><td>PROHIBIDO</td><td>NO ES NECESARIO</td></tr>
            <tr><td>You mustn't run in the workshop.<br>(No corras: es peligroso)</td><td>You don't have to come on Saturday.<br>(Si quieres vienes; no es obligatorio)</td></tr></table>` },
          { t: 'Tareas de la casa y reglas', h: `<ul><li>do the dishes (lavar los trastes) · make the bed (tender la cama)</li><li>take out the trash (sacar la basura) · sweep the floor (barrer)</li><li>feed the dog (darle de comer al perro) · set the table (poner la mesa)</li></ul>
            <p><b>En el taller:</b> be on time · wear safety glasses · keep the workshop clean · raise your hand.</p>` }
        ],
        pares: [['do the dishes', 'lavar los trastes'], ['make the bed', 'tender la cama'], ['take out the trash', 'sacar la basura'], ['sweep the floor', 'barrer'], ['feed the dog', 'darle de comer al perro'], ['set the table', 'poner la mesa']],
        q: [
          ['om', "It's the rule: you ___ wear safety glasses in the workshop.", ['must', "mustn't", "don't have to", 'can not'], 0, 'Regla obligatoria → must.'],
          ['om', "You ___ run in the workshop. It's dangerous!", ["mustn't", 'must', 'have to', "don't have to"], 0, "Prohibido → mustn't."],
          ['om', 'Tomorrow is Saturday, so I ___ get up early.', ["don't have to", "mustn't", 'must', 'has to'], 0, "No es necesario → don't have to."],
          ['om', 'She ___ take out the trash every night.', ['has to', 'have to', 'must to', 'haves to'], 0, 'She → has to.'],
          ['vf', '"You mustn\'t use your phone" means using your phone is optional.', null, false, "Mustn't significa que está prohibido."],
          ['vf', '"We don\'t have to wear a uniform on Fridays" means the uniform is not necessary on Fridays.', null, true, "Don't have to = no es necesario."],
          ['re', 'Match the chores:', [['do the dishes', 'lavar los trastes'], ['make the bed', 'tender la cama'], ['take out the trash', 'sacar la basura'], ['sweep the floor', 'barrer']], null, 'Vocabulario de tareas de la casa.'],
          ['om', 'Do you have to make your bed? — Yes, I ___.', ['do', 'have', 'must', 'am'], 0, 'La pregunta usa do → Yes, I do.'],
          ['co', 'Students ___ (must / not) cheat on exams.', null, ["mustn't", 'must not'], "Prohibido → mustn't.", { n: 2 }],
          ['or', 'Order the sentence:', ['We', 'have', 'to', 'keep', 'the', 'workshop', 'clean'], null, 'Sujeto + have to + verbo + complemento.'],
          ['om', 'Listen. What does Pedro have to do today?', ['Feed the dog and do the dishes.', 'Cook dinner.', 'Make the bed.', 'Nothing.'], 0, 'Audio: "Pedro has to feed the dog and do the dishes, but he doesn\'t have to cook."', { audio: "Pedro has to feed the dog and do the dishes, but he doesn't have to cook.", n: 2 }],
          ['om', 'Which one means «no es necesario»?', ["don't have to", "mustn't", 'must', 'has to'], 0, "Don't have to = no es necesario."],
          ['co', 'My dad ___ (have to) work on Saturdays.', null, ['has to'], 'He → has to.', { n: 2 }],
          ['om', 'Choose the correct sentence:', ['You must arrive on time.', 'You must to arrive on time.', 'You musts arrive on time.', 'You must arriving on time.'], 0, 'Must + verbo base, sin «to» y sin -s.'],
          ['ha', 'Speaking · Read aloud:', null, 'You must wear safety glasses in the workshop.', 'must + verbo base, sin «to».', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, "We don't have to wear a uniform on Fridays.", "don't have to = no es necesario.", { n: 2 }]
        ]
      },
      // ───────────────────────── PROPÓSITO 6 ─────────────────────────
      {
        id: 'i3t6',
        nombre: 'Instrucciones y direcciones',
        proposito: 'Propósito 6 · Da y comprende instrucciones más completas (recetas, direcciones, tareas digitales).',
        leccion: [
          { t: 'El imperativo', h: `<p>Verbo en forma base, <b>sin sujeto</b>.</p>
            <div class="ej"><p>Open your book. ${H('Open your book.')} · Speak clearly. ${H('Speak clearly.')}</p><p><b>Don't</b> forget your ID. ${H("Don't forget your ID.")} · <b>Don't</b> touch the cables. ${H("Don't touch the cables.")}</p></div>
            <div class="tip">Para sonar amable agrega <b>please</b>: Please close the door.</div>` },
          { t: 'Conectores de secuencia', h: `<p><b>First</b> → <b>Then</b> → <b>After that</b> / <b>Next</b> → <b>Finally</b></p>
            <div class="ej"><p><b>Agua de limón:</b> First, wash the limes. Then, cut them in half. After that, squeeze them into a jar of water. Next, add sugar and stir. Finally, add ice and serve. ${H('First, wash the limes. Then, cut them in half. After that, squeeze them into a jar of water. Next, add sugar and stir. Finally, add ice and serve.')}</p></div>` },
          { t: 'Cómo dar direcciones', h: `<ul><li>go straight (sigue derecho) · turn left / turn right</li><li>cross the street · walk two blocks · it's on your left / right · at the corner</li></ul>
            <div class="ej"><p>Go straight two blocks and turn left. The library is on your right. ${H('Go straight two blocks and turn left. The library is on your right.')}</p></div>` },
          { t: 'Instrucciones digitales', h: `<ul><li>download the app · log in · type your password</li><li>click the button · scroll down · save the file</li></ul>
            <div class="ej"><p>Type your password and click "Log in". ${H('Type your password and click Log in.')}</p></div>` }
        ],
        pares: [['turn left', 'dar vuelta a la izquierda'], ['go straight', 'sigue derecho'], ['cross the street', 'cruza la calle'], ['save the file', 'guarda el archivo'], ['log in', 'iniciar sesión'], ['stir', 'revolver'], ['cut', 'cortar']],
        q: [
          ['om', '___ your safety glasses before you use the drill.', ['Put on', 'Puts on', 'Putting on', 'To put on'], 0, 'Imperativo: verbo en forma base.'],
          ['om', "___ touch the cables. They're dangerous!", ["Don't", "Doesn't", 'Not', 'No to'], 0, "Imperativo negativo: Don't + verbo."],
          ['or', 'Put the recipe steps in order:', ['First, wash the limes.', 'Then, cut them in half.', 'After that, squeeze them into the water.', 'Finally, add sugar and ice.'], null, 'First → Then → After that → Finally.'],
          ['om', 'Which word starts the LAST step?', ['Finally', 'First', 'Then', 'After that'], 0, 'Finally = finalmente.'],
          ['om', '«Dobla a la derecha» in English is…', ['Turn right', 'Turn left', 'Go straight', 'Cross right'], 0, 'Right = derecha; left = izquierda.'],
          ['om', 'Listen and choose the correct directions.', ['Straight two blocks, left, library on the right.', 'Turn right, then go straight.', 'Turn left, library on the left.', 'Cross the street and go back.'], 0, 'Audio: "Go straight two blocks and turn left. The library is on your right."', { audio: 'Go straight two blocks and turn left. The library is on your right.', n: 2 }],
          ['vf', '"Don\'t forget to bring your ID" is a negative imperative.', null, true, "Don't + verbo = imperativo negativo."],
          ['co', '___ (speak) clearly, please.', null, ['speak'], 'Imperativo: forma base del verbo.'],
          ['om', 'Which is an instruction for a computer?', ['Type your password and click "Log in".', 'I typed my password.', 'She is typing.', 'Did you type?'], 0, 'Las instrucciones usan imperativo.'],
          ['re', 'Match the connectors:', [['First', 'Primero'], ['Then', 'Luego'], ['After that', 'Después de eso'], ['Finally', 'Finalmente']], null, 'Conectores para ordenar pasos.'],
          ['or', 'Order the instruction:', ['Walk', 'straight', 'until', 'you', 'see', 'the', 'park'], null, 'Imperativo + dirección + hasta + referencia.'],
          ['om', 'Choose the polite instruction:', ['Please close the door.', 'Close you the door.', 'You closing the door.', 'Closes the door, please.'], 0, 'Please + imperativo.'],
          ['om', 'In a recipe, "stir" means…', ['revolver / mover con la cuchara', 'cortar', 'hervir', 'lavar'], 0, 'Stir = revolver.'],
          ['co', '___ (not / run) in the workshop.', null, ["Don't run", 'Do not run'], "Imperativo negativo: Don't run.", { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'Turn left and go straight ahead.', 'Imperativos: turn, go. «straight ahead» = todo derecho.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'The bank is next to the supermarket.', 'next to = junto a.', { n: 2 }]
        ]
      },
      // ───────────────────────── PROPÓSITO 7 ─────────────────────────
      {
        id: 'i3t7',
        nombre: 'Narrar eventos (verbos irregulares)',
        proposito: 'Propósito 7 · Relata eventos cotidianos y su secuencia usando conectores.',
        leccion: [
          { t: 'Verbos irregulares', h: `<p>No llevan -ed: <b>cambian</b> de forma y se memorizan.</p>
            <table><tr><th>Base</th><th>Pasado</th><th>Base</th><th>Pasado</th></tr>
            <tr><td>go</td><td>went</td><td>have</td><td>had</td></tr><tr><td>get</td><td>got</td><td>make</td><td>made</td></tr>
            <tr><td>take</td><td>took</td><td>see</td><td>saw</td></tr><tr><td>eat</td><td>ate</td><td>drink</td><td>drank</td></tr>
            <tr><td>come</td><td>came</td><td>buy</td><td>bought</td></tr><tr><td>find</td><td>found</td><td>lose</td><td>lost</td></tr>
            <tr><td>leave</td><td>left</td><td>meet</td><td>met</td></tr><tr><td>give</td><td>gave</td><td>tell</td><td>told</td></tr>
            <tr><td>write</td><td>wrote</td><td>win</td><td>won</td></tr><tr><td>do</td><td>did</td><td>sleep</td><td>slept</td></tr></table>` },
          { t: 'Was / were', h: `<p>I / he / she / it → <b>was</b> · you / we / they → <b>were</b></p>
            <div class="ej"><p>The game <b>was</b> amazing. We <b>were</b> very happy. ${H('The game was amazing. We were very happy.')}</p><p><b>Were</b> you tired? — No, I <b>wasn't</b>. ${H("Were you tired? No, I wasn't.")}</p></div>` },
          { t: 'Negativo y pregunta', h: `<p>Igual que con los regulares: <b>didn't</b> / <b>Did</b> + verbo base.</p>
            <div class="ej"><p>I <b>didn't go</b> to the party. ${H("I didn't go to the party.")} · <b>Did</b> you <b>see</b> the game? ${H('Did you see the game?')}</p></div>
            <div class="tip">✘ didn't went · ✔ didn't go</div>` },
          { t: 'Cuenta una historia', h: `<p>Conectores: <b>First</b>, <b>Then</b>, <b>After that</b>, <b>Later</b> (más tarde), <b>Suddenly</b> (de repente), <b>Finally</b> / <b>In the end</b>.</p>
            <div class="ej"><p>Last Saturday I went to León with my family. First, we ate tacos. Then, we went to the stadium. Suddenly, it started to rain! Later, we bought ice cream. Finally, we came home very tired. ${H('Last Saturday I went to León with my family. First, we ate tacos. Then, we went to the stadium. Suddenly, it started to rain! Later, we bought ice cream. Finally, we came home very tired.')}</p></div>` }
        ],
        pares: [['go', 'went'], ['eat', 'ate'], ['see', 'saw'], ['buy', 'bought'], ['take', 'took'], ['make', 'made'], ['come', 'came'], ['find', 'found'], ['lose', 'lost'], ['write', 'wrote']],
        q: [
          ['om', 'Last summer we ___ to the beach.', ['went', 'goed', 'go', 'gone'], 0, 'Pasado de go: went.'],
          ['co', 'Yesterday I ___ (eat) enchiladas.', null, ['ate'], 'Pasado de eat: ate.'],
          ['co', 'She ___ (buy) new shoes last week.', null, ['bought'], 'Pasado de buy: bought.'],
          ['om', 'We ___ very tired after the game.', ['were', 'was', 'are', 'been'], 0, 'We → were.'],
          ['om', 'Choose the correct negative:', ["I didn't see the movie.", "I didn't saw the movie.", "I don't saw the movie.", 'I not see the movie.'], 0, "Didn't + verbo base."],
          ['om', '___ you go to the party on Friday?', ['Did', 'Were', 'Do', 'Went'], 0, 'Pregunta en pasado: Did + sujeto + verbo base.'],
          ['om', 'We walked home. ___, a big dog ran after us!', ['Suddenly', 'First', 'Always', 'Tomorrow'], 0, 'Suddenly = de repente: algo inesperado.'],
          ['re', 'Match the verbs with their past form:', [['take', 'took'], ['make', 'made'], ['come', 'came'], ['write', 'wrote']], null, 'Verbos irregulares.'],
          ['vf', '"Goed" is the correct past of "go".', null, false, 'Go es irregular: went.'],
          ['or', 'Put the story in order:', ['First, we arrived at the stadium.', 'Then, we bought our tickets.', 'Later, the game started.', 'Finally, we went home happy.'], null, 'First → Then → Later → Finally.'],
          ['om', 'Listen. What happened to Diego?', ['He lost his keys and found them in his backpack.', 'He found a dog.', 'He lost his phone at school.', 'He bought new keys.'], 0, 'Audio: "Yesterday Diego lost his keys. He looked everywhere, and finally he found them in his backpack."', { audio: 'Yesterday Diego lost his keys. He looked everywhere, and finally he found them in his backpack.', n: 2 }],
          ['co', 'I ___ (have) a great time at the fair.', null, ['had'], 'Pasado de have: had.'],
          ['om', 'Which connector means «más tarde»?', ['Later', 'Suddenly', 'First', 'Before'], 0, 'Later = más tarde.'],
          ['co', 'They ___ (not / come) to class yesterday.', null, ["didn't come", 'did not come'], "Didn't + verbo base: didn't come.", { n: 3 }],
          ['om', 'Was the exam difficult? — No, it ___.', ["wasn't", "weren't", "didn't", "isn't"], 0, "It → was / wasn't."],
          ['co', 'Listen and write the verb: "We ___ a cake for my mom."', null, ['made'], 'Audio: "We made a cake for my mom." (make → made)', { audio: 'We made a cake for my mom.', n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'Last summer we went to the beach and swam in the sea.', 'Irregulares: go → went, swim → swam.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'I bought a new phone and took a lot of pictures.', 'buy → bought, take → took.', { n: 2 }]
        ]
      },
      // ───────────────────────── PROPÓSITO 8 ─────────────────────────
      {
        id: 'i3t8',
        nombre: 'Lo uso todo: experiencias y recomendaciones',
        proposito: 'Propósito 8 · Consolida lo aprendido con producción guiada: experiencias, descripciones y recomendaciones.',
        leccion: [
          { t: '¿Present perfect o past simple?', h: `<table><tr><th>Present perfect</th><th>Past simple</th></tr>
            <tr><td>Sin tiempo exacto, experiencias</td><td>Tiempo terminado y exacto</td></tr>
            <tr><td>ever, never, just, already, yet</td><td>yesterday, last…, …ago, in 2023</td></tr>
            <tr><td>I <b>have been</b> to Guanajuato.</td><td>I <b>went</b> there last year.</td></tr></table>
            <div class="ej"><p>— Have you ever been to Guanajuato city? — Yes, I have. I went there last year. — What did you do? — I visited the Callejón del Beso. ${H('Have you ever been to Guanajuato city? Yes, I have. I went there last year. What did you do? I visited the Callejón del Beso.')}</p></div>` },
          { t: 'Recomendar: should', h: `<p><b>Should</b> + verbo base = «deberías» (consejo, recomendación).</p>
            <div class="ej"><p>You <b>should visit</b> the main square at night. ${H('You should visit the main square at night.')}</p><p>You <b>shouldn't miss</b> the fair. ${H("You shouldn't miss the fair.")}</p></div>` },
          { t: 'Escribe un mensaje corto', h: `<ol><li>Saludo: <i>Hi Ana!</i></li><li>Experiencia: <i>I have been to…</i></li><li>Detalle en pasado: <i>Last month I visited…</i></li><li>Recomendación: <i>You should…</i></li><li>Despedida: <i>See you soon!</i></li></ol>
            <div class="ej"><p>Hi Ana! I have been to Guanajuato city twice. Last month I visited the mummies museum. It was amazing! You should go. See you soon! ${H('Hi Ana! I have been to Guanajuato city twice. Last month I visited the mummies museum. It was amazing! You should go. See you soon!')}</p></div>` },
          { t: 'Errores que ya no vas a cometer', h: `<table><tr><th>✘</th><th>✔</th></tr>
            <tr><td>I have went</td><td>I have gone</td></tr><tr><td>I have seen it yesterday</td><td>I saw it yesterday</td></tr>
            <tr><td>Did you went?</td><td>Did you go?</td></tr><tr><td>He like music</td><td>He likes music</td></tr>
            <tr><td>There is two parks</td><td>There are two parks</td></tr><tr><td>You must to study</td><td>You must study</td></tr></table>` }
        ],
        pares: [['yesterday', 'ayer'], ['ever', 'alguna vez'], ['already', 'ya'], ['just', 'acabar de'], ['ago', 'hace (tiempo)'], ['should', 'deberías']],
        q: [
          ['om', 'I ___ that movie last weekend.', ['saw', 'have seen', 'have saw', 'seen'], 0, 'Last weekend es tiempo exacto → pasado simple.'],
          ['om', '___ you ever ___ to Guanajuato city?', ['Have / been', 'Did / been', 'Have / went', 'Has / go'], 0, 'Experiencia sin fecha: Have + ever + been.'],
          ['om', 'She ___ her homework yet.', ["hasn't finished", "didn't finished", "hasn't finish", 'not finished'], 0, "Yet + negativo → hasn't + participio."],
          ['om', 'When I was a child, I ___ in Guadalajara.', ['lived', 'have lived', 'live', 'have live'], 0, '«When I was a child» es un tiempo terminado → pasado simple.'],
          ['vf', '"I have seen him yesterday" is correct.', null, false, 'Con yesterday se usa pasado simple: I saw him yesterday.'],
          ['om', 'Which word goes with the present perfect?', ['already', 'yesterday', 'last night', 'ago'], 0, 'Already se usa con present perfect.'],
          ['om', "You ___ visit the Callejón del Beso. It's beautiful!", ['should', 'should to', 'shoulds', 'are should'], 0, 'Recomendación: should + verbo base.'],
          ['re', 'Match the expression with the tense:', [['last year', 'past simple'], ['ever', 'present perfect'], ['two days ago', 'past simple'], ['just', 'present perfect']], null, 'Tiempo exacto → past simple; experiencias/recientes → present perfect.'],
          ['or', 'Order the sentence:', ['I', 'have', 'never', 'eaten', 'sushi'], null, 'Sujeto + have + never + participio.'],
          ['om', 'Listen. When did Karla go to the science museum?', ['Last Sunday.', 'She has never been.', 'Yesterday.', 'Last year.'], 0, 'Audio: "Karla has visited many museums. She went to the science museum last Sunday."', { audio: 'Karla has visited many museums. She went to the science museum last Sunday.', n: 2 }],
          ['co', 'We ___ (win) the game last Friday!', null, ['won'], 'Pasado de win: won.'],
          ['om', 'Find the correct version of: "There is two parks and you can to run there."', ['There are two parks and you can run there.', 'There is two parks and you can run there.', 'There are two parks and you can to run there.', 'There is two park and you can running there.'], 0, 'Plural → there are; can + verbo base.', { n: 3 }],
          ['om', 'Read: "Hi Ana! I have been to Guanajuato city twice. Last month I visited the mummies museum. You should go!" — How many times has the writer been there?', ['Twice', 'Once', 'Never', 'Three times'], 0, 'Twice = dos veces.', { n: 2 }],
          ['om', 'Choose the best reply: "Have you ever played volleyball?"', ['Yes, I have. I played last week.', 'Yes, I did ever.', 'Yes, I have played last week.', "No, I didn't ever."], 0, 'Respuesta corta con have; el detalle con fecha va en pasado simple.'],
          ['ha', 'Speaking · Read aloud:', null, 'I have visited Guanajuato and I recommend it.', 'Present perfect + recomendación.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'You should try the food, it is delicious.', 'should + verbo base = deberías.', { n: 2 }]
        ]
      }
    ]
  };
})();
