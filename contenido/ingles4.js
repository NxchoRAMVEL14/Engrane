// ENGRANE · Inglés IV (A2+) «Should I Stay or Should I Go?» (4° semestre)
// Fuente: SEP · MCC Modelo Educativo 2025 · Inglés IV — 8 propósitos formativos (experiencias pasadas, preferencias,
// rutinas, consejos, planes, cortesía, anécdotas, consolidación).
(function () {
  const ENG = window.ENG;
  const H = (t) => `<button class="hablar" data-hablar="${t.replace(/"/g, '&quot;')}">🔊</button>`;
  ENG.CONTENIDO.ingles4 = {
    temas: [
      {
        id: 'i4t1', nombre: 'Experiencias pasadas en orden',
        proposito: 'Propósito 1 · Describe experiencias pasadas con mayor detalle y conexión (qué ocurrió, dónde y cómo).',
        leccion: [
          { t: 'Pasado simple: repaso rápido', h: `<p>Regulares + <b>ed</b> (visit → visited). Irregulares de memoria: go → <b>went</b>, see → <b>saw</b>, eat → <b>ate</b>, have → <b>had</b>, take → <b>took</b>, buy → <b>bought</b>.</p>
            <div class="ej"><p>Last summer we <b>went</b> to Guanajuato and <b>visited</b> the mummies museum. ${H('Last summer we went to Guanajuato and visited the mummies museum.')}</p></div>
            <div class="tip">Negativo y pregunta con <b>did</b> + verbo base: I didn't go · Did you go?</div>` },
          { t: 'Conectores de secuencia', h: `<p><b>First</b> → <b>then</b> → <b>after that</b> → <b>finally / in the end</b>.</p>
            <div class="ej"><p><b>First</b>, we arrived at the fair. <b>Then</b>, we ate tacos. <b>After that</b>, we watched the fireworks. <b>In the end</b>, we went home very tired. ${H('First, we arrived at the fair. Then, we ate tacos. After that, we watched the fireworks. In the end, we went home very tired.')}</p></div>` },
          { t: 'Dónde y cómo', h: `<ul><li>Lugar: <b>at</b> the school, <b>in</b> León, <b>on</b> the bus.</li><li>Modo: quickly, happily, by bus, with my friends.</li><li>Temas: travel, community celebrations (la feria, el día de muertos), school events.</li></ul>` }
        ],
        pares: [['go', 'went'], ['see', 'saw'], ['eat', 'ate'], ['buy', 'bought'], ['take', 'took'], ['First', 'Primero'], ['In the end', 'Al final']],
        q: [
          ['om', 'Yesterday we ___ to the school festival.', ['went', 'go', 'goed', 'going'], 0, 'go → went (irregular).'],
          ['om', 'She ___ a lot of photos at the parade.', ['took', 'taked', 'take', 'takes'], 0, 'take → took.'],
          ['om', 'Choose the correct negative: «I ___ the fireworks.»', ["didn't see", "didn't saw", "don't saw", 'not saw'], 0, 'did not + verbo base.'],
          ['om', '«___ you visit your grandparents last weekend?»', ['Did', 'Do', 'Were', 'Was'], 0, 'Pregunta en pasado simple con Did.'],
          ['or', 'Order the story:', ['First, we arrived at the fair.', 'Then, we ate tacos.', 'After that, we watched the fireworks.', 'In the end, we went home.'], null, 'First → then → after that → in the end.'],
          ['om', 'Which connector shows the LAST action?', ['In the end', 'First', 'Then', 'After that'], 0, 'También «finally».'],
          ['co', 'Complete: We ___ (buy) souvenirs in Guanajuato.', null, ['bought'], 'buy → bought.', { n: 2 }],
          ['co', 'Complete: They ___ (visit) the museum by bus.', null, ['visited'], 'Regular: + ed.'],
          ['om', 'Choose the correct preposition: «We stayed ___ a hotel ___ León.»', ['at / in', 'in / on', 'on / at', 'at / on'], 0, 'at a hotel · in a city.', { n: 2 }],
          ['vf', '«I didn\'t went to the party» is correct.', null, false, 'Correct: I didn\'t go.', { n: 2 }],
          ['re', 'Match the verb with its past form:', [['have', 'had'], ['eat', 'ate'], ['see', 'saw'], ['make', 'made']], null, 'Irregular verbs.'],
          ['ha', 'Speaking · Read aloud:', null, 'First we arrived at the fair, then we ate tacos.', 'Sequence connectors + past simple.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'Last summer I went to the beach with my family.', 'go → went.', { n: 2 }]
        ]
      },
      {
        id: 'i4t2', nombre: 'Preferencias y comparaciones',
        proposito: 'Propósito 2 · Expresa y justifica preferencias de forma respetuosa comparando opciones cotidianas.',
        leccion: [
          { t: 'Comparativos y superlativos', h: `<table><tr><th>Adjetivo</th><th>Comparativo</th><th>Superlativo</th></tr><tr><td>cheap</td><td>cheaper than</td><td>the cheapest</td></tr><tr><td>big</td><td>bigger than</td><td>the biggest</td></tr><tr><td>easy</td><td>easier than</td><td>the easiest</td></tr><tr><td>comfortable</td><td>more comfortable than</td><td>the most comfortable</td></tr><tr><td>good / bad</td><td>better / worse than</td><td>the best / the worst</td></tr></table>
            <div class="ej"><p>The bus is <b>cheaper than</b> a taxi. ${H('The bus is cheaper than a taxi.')}</p></div>` },
          { t: 'Conectar ideas: and, so, but', h: `<ul><li><b>and</b>: suma. I like tacos <b>and</b> tortas.</li><li><b>but</b>: contraste. The bike is slow, <b>but</b> it is cheap.</li><li><b>so</b>: consecuencia. It was cold, <b>so</b> I wore a jacket.</li></ul>
            <div class="ej"><p>I prefer the bus <b>because</b> it is cheaper. ${H('I prefer the bus because it is cheaper.')}</p></div>` }
        ],
        pares: [['cheap', 'cheaper'], ['big', 'bigger'], ['easy', 'easier'], ['good', 'better'], ['bad', 'worse'], ['expensive', 'more expensive']],
        q: [
          ['om', 'The bus is ___ than the taxi.', ['cheaper', 'more cheap', 'cheapest', 'cheap'], 0, 'Adjetivo corto: + er + than.'],
          ['om', 'This is ___ restaurant in town.', ['the best', 'the better', 'the goodest', 'best than'], 0, 'good → better → the best.'],
          ['om', 'A sofa is ___ than a chair.', ['more comfortable', 'comfortabler', 'most comfortable', 'comfortable'], 0, 'Adjetivo largo: more … than.'],
          ['om', 'The bike is slow, ___ it is cheap.', ['but', 'so', 'and', 'because'], 0, 'Contraste.'],
          ['om', 'It was raining, ___ I took an umbrella.', ['so', 'but', 'and', 'or'], 0, 'Consecuencia.'],
          ['co', 'Complete: My backpack is ___ (big) than yours.', null, ['bigger'], 'CVC: duplica la consonante.', { n: 2 }],
          ['co', 'Complete: Math is ___ (easy) than chemistry for me.', null, ['easier'], 'y → ier.', { n: 2 }],
          ['om', 'Which is a respectful way to disagree?', ["I see your point, but I prefer the park.", "You're wrong.", "That's stupid.", 'No.'], 0, 'Respeta y justifica.'],
          ['vf', '«This is the most cheap shirt» is correct.', null, false, 'Correct: the cheapest.', { n: 2 }],
          ['re', 'Match:', [['bad', 'worse'], ['far', 'farther'], ['hot', 'hotter'], ['happy', 'happier']], null, 'Comparatives.', { n: 3 }],
          ['om', 'Choose the best answer: «Why do you prefer the subway?»', ['Because it is faster than the bus.', 'Yes, I do.', 'The subway.', 'I prefer.'], 0, 'Justifica con because + razón.'],
          ['ha', 'Speaking · Read aloud:', null, 'I prefer the bus because it is cheaper than a taxi.', 'Comparative + because.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'The park is bigger, but the plaza is more beautiful.', 'Comparatives with but.', { n: 2 }]
        ]
      },
      {
        id: 'i4t3', nombre: 'Rutinas y hábitos (con razones)',
        proposito: 'Propósito 3 · Explica hábitos y rutinas, qué se hace y por qué, considerando el contexto.',
        leccion: [
          { t: 'Presente simple completo', h: `<ul><li>He/She/It + <b>s</b>: She <b>studies</b>, he <b>watches</b>, it <b>goes</b>.</li><li>Negativo: <b>don't / doesn't</b> + base. He <b>doesn't eat</b> junk food.</li><li>Pregunta: <b>Do / Does</b> + sujeto + base? <b>Does</b> she <b>exercise</b>?</li></ul>
            <div class="ej"><p>I exercise three times a week <b>because</b> it gives me energy. ${H('I exercise three times a week because it gives me energy.')}</p></div>` },
          { t: 'Frecuencia y tiempo', h: `<p>always · usually · often · sometimes · rarely · never (antes del verbo; después de <b>be</b>).</p><p>once a week · twice a day · every morning.</p>
            <div class="ej"><p>She <b>usually</b> gets up at six. ${H('She usually gets up at six.')} · He <b>is never</b> late. ${H('He is never late.')}</p></div>` }
        ],
        pares: [['always', 'siempre'], ['usually', 'normalmente'], ['sometimes', 'a veces'], ['never', 'nunca'], ['twice a week', 'dos veces por semana'], ['because', 'porque']],
        q: [
          ['om', 'She ___ her homework every afternoon.', ['does', 'do', 'doing', 'did'], 0, 'Tercera persona: does.'],
          ['om', 'He ___ eat junk food.', ["doesn't", "don't", 'not', "isn't"], 0, 'He + doesn\'t + base.'],
          ['om', '___ your brother play soccer?', ['Does', 'Do', 'Is', 'Are'], 0, 'Does + he/she/it.'],
          ['om', 'Choose the correct order:', ['I usually get up at six.', 'I get usually up at six.', 'Usually I get at six up.', 'I get up usually six.'], 0, 'El adverbio va antes del verbo principal.'],
          ['om', 'Choose the correct order with «be»:', ['He is never late.', 'He never is late.', 'Never he is late.', 'He is late never.'], 0, 'Después del verbo be.', { n: 2 }],
          ['co', 'Complete: My mom ___ (watch) the news every night.', null, ['watches'], 'ch → es.'],
          ['co', 'Complete: Carlos ___ (study) English on Saturdays.', null, ['studies'], 'consonante + y → ies.', { n: 2 }],
          ['om', 'Why do you sleep eight hours? — ___', ['Because it helps me concentrate.', 'Yes, I do.', 'At night.', 'Eight hours.'], 0, 'because + razón.'],
          ['om', '«Twice a week» means…', ['dos veces por semana', 'dos semanas', 'cada dos días', 'una vez a la semana'], 0, 'once = una vez, twice = dos veces.'],
          ['vf', '«She don\'t like coffee» is correct.', null, false, 'Correct: She doesn\'t like coffee.'],
          ['re', 'Match the adverb with its meaning:', [['always', '100 %'], ['usually', 'casi siempre'], ['sometimes', 'a veces'], ['never', '0 %']], null, 'Adverbs of frequency.'],
          ['ha', 'Speaking · Read aloud:', null, 'I usually study in the morning because I feel more awake.', 'Frequency + because.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'She exercises twice a week and drinks a lot of water.', 'Third person -s.', { n: 2 }]
        ]
      },
      {
        id: 'i4t4', nombre: 'Dar consejos con should',
        proposito: 'Propósito 4 · Pide y da consejos empáticos sobre salud, estudio y vida diaria.',
        leccion: [
          { t: 'Should / shouldn\'t', h: `<p><b>should</b> + verbo base = deberías (recomendación). <b>shouldn't</b> = no deberías.</p>
            <div class="ej"><p>You look tired. You <b>should</b> go to bed early. ${H('You look tired. You should go to bed early.')}</p><p>You <b>shouldn't</b> use your phone before sleeping. ${H("You shouldn't use your phone before sleeping.")}</p></div>
            <p>Pedir consejo: <b>What should I do?</b> ${H('What should I do?')} · <b>Should I</b> talk to the teacher?</p>` },
          { t: 'Imperativos (repaso) y empatía', h: `<ul><li>Imperativo: <b>Drink</b> water. <b>Don't skip</b> breakfast.</li><li>Empatía: <b>I'm sorry to hear that.</b> ${H("I'm sorry to hear that.")} · <b>Don't worry.</b> · <b>Why don't you…?</b></li></ul>` }
        ],
        pares: [['should', 'deberías'], ["shouldn't", 'no deberías'], ['What should I do?', '¿Qué debo hacer?'], ["Don't worry", 'No te preocupes'], ["I'm sorry to hear that", 'Lamento oír eso'], ['Why don\'t you…?', '¿Por qué no…?']],
        q: [
          ['om', 'I have a headache. — You ___ take a break.', ['should', 'shouldn\'t', 'should to', 'shoulds'], 0, 'should + verbo base.'],
          ['om', 'You ___ eat so much sugar.', ["shouldn't", 'should', "don't should", 'not should'], 0, 'Recomendación negativa.'],
          ['om', 'Choose the correct sentence:', ['You should study more.', 'You should to study more.', 'You should studies more.', 'You should studying more.'], 0, 'Sin «to» y sin -s.'],
          ['om', 'How do you ask for advice?', ['What should I do?', 'What I should do?', 'What do I should?', 'Should what I do?'], 0, 'Should + sujeto + verbo.'],
          ['om', 'Your friend failed a test. The most empathetic answer is…', ["I'm sorry to hear that. Why don't we study together?", "That's your problem.", 'Ha ha.', 'You should be smarter.'], 0, 'Empatía + propuesta.'],
          ['om', 'Choose the negative imperative:', ["Don't skip breakfast.", 'Not skip breakfast.', "Doesn't skip breakfast.", 'Skip not breakfast.'], 0, "Don't + verbo base."],
          ['co', 'Complete: You look tired. You ___ go to bed early.', null, ['should'], 'Consejo.'],
          ['vf', '«He shoulds rest» is correct.', null, false, 'Should no cambia: He should rest.', { n: 2 }],
          ['om', '«Why don\'t you talk to your teacher?» is…', ['a suggestion', 'a complaint', 'an order', 'a past action'], 0, 'Sugerencia amable.', { n: 2 }],
          ['re', 'Match the problem with the advice:', [["I'm always tired.", 'You should sleep more.'], ['I have a toothache.', 'You should see a dentist.'], ["I'm stressed about exams.", 'You should make a study plan.'], ['I feel thirsty.', 'You should drink water.']], null, 'Problem → advice.', { n: 2 }],
          ['om', '___ I bring my calculator to the exam?', ['Should', 'Do should', 'Am', 'Shoulds'], 0, 'Pregunta con should al inicio.'],
          ['ha', 'Speaking · Read aloud:', null, "You look tired. You should go to bed early.", 'Advice with should.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, "I'm sorry to hear that. Why don't we study together?", 'Empathy + suggestion.', { n: 2 }]
        ]
      },
      {
        id: 'i4t5', nombre: 'Planes y metas: going to y will',
        proposito: 'Propósito 5 · Habla de planes y metas personales o comunitarias y por qué son importantes.',
        leccion: [
          { t: 'Be going to', h: `<p><b>am / is / are + going to + verbo base</b> = planes ya decididos.</p>
            <div class="ej"><p>Next summer I'm <b>going to</b> work in my uncle's workshop. ${H("Next summer I'm going to work in my uncle's workshop.")}</p><p>Are you <b>going to</b> study engineering? ${H('Are you going to study engineering?')}</p></div>` },
          { t: 'Will (introducción)', h: `<ul><li>Decisiones del momento: The phone is ringing. <b>I'll</b> answer it.</li><li>Predicciones y promesas: I think it <b>will</b> rain. I <b>will</b> help you.</li><li>Negativo: <b>won't</b> (will not).</li></ul>
            <div class="ej"><p>I <b>won't</b> forget your birthday. ${H("I won't forget your birthday.")}</p></div>` }
        ],
        pares: [["I'm going to", 'Voy a (plan)'], ["I'll", 'Yo haré (decisión)'], ["won't", 'no haré'], ['next year', 'el próximo año'], ['goal', 'meta'], ['tomorrow', 'mañana']],
        q: [
          ['om', 'Next year I ___ study engineering.', ["'m going to", 'going to', 'am go to', 'will to'], 0, 'am going to + base.'],
          ['om', 'They ___ visit the museum on Saturday.', ['are going to', 'is going to', 'going', 'goes to'], 0, 'They are.'],
          ['om', 'The phone is ringing. — I ___ answer it!', ["'ll", "'m going to", 'answered', 'am'], 0, 'Decisión del momento: will.', { n: 2 }],
          ['om', 'Choose the negative of «I will forget»:', ["I won't forget.", "I willn't forget.", "I don't will forget.", 'I not will forget.'], 0, "won't = will not."],
          ['om', '___ you going to join the robotics club?', ['Are', 'Do', 'Will', 'Is'], 0, 'Pregunta: Are you going to…?'],
          ['co', 'Complete: She ___ going to plant trees in the community project.', null, ['is'], 'She is going to.'],
          ['om', 'Which sentence is a PREDICTION?', ['I think it will rain tomorrow.', "I'm going to buy a bike; I saved the money.", 'I bought a bike.', 'I buy a bike every year.'], 0, 'Predicción con will.', { n: 2 }],
          ['vf', '«We are going to visiting Mexico City» is correct.', null, false, 'going to + verbo base: visit.', { n: 2 }],
          ['om', 'Why is your community project important? — ___', ['Because it will help clean the river.', 'Yes, it is.', 'Next week.', 'The river.'], 0, 'Justifica la meta.'],
          ['re', 'Match the use:', [['Plan already decided', 'be going to'], ['Decision at the moment', 'will'], ['Promise', 'will'], ['Negative of will', "won't"]], null, 'Future forms.', { n: 3 }],
          ['om', 'My goal for this semester ___ to pass Module III with 9.', ['is', 'are', 'am', 'be'], 0, 'My goal is…'],
          ['ha', 'Speaking · Read aloud:', null, "Next summer I'm going to work in my uncle's workshop.", 'be going to.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'I think technology will help our community.', 'Prediction with will.', { n: 2 }]
        ]
      },
      {
        id: 'i4t6', nombre: 'Cortesía y conversaciones breves',
        proposito: 'Propósito 6 · Inicia, mantiene y cierra conversaciones sociales breves con respeto y empatía.',
        leccion: [
          { t: 'Expresiones de cortesía', h: `<ul><li>Saludar: <b>Nice to meet you.</b> ${H('Nice to meet you.')} · How's it going?</li><li>Ofrecer: <b>Would you like</b> some water? ${H('Would you like some water?')} — Yes, please. / No, thank you.</li><li>Pedir: <b>Could you</b> help me, please? ${H('Could you help me, please?')}</li><li>Cerrar: It was nice talking to you. <b>See you later!</b></li></ul>` },
          { t: 'Small talk', h: `<p>Preguntas para mantener la plática: Where are you from? · What do you do? · Do you like…? · How was your weekend?</p>
            <div class="tip">Contesta y regresa la pregunta: «Great, thanks! <b>And you?</b>»</div>` }
        ],
        pares: [['Nice to meet you', 'Mucho gusto'], ['Would you like…?', '¿Te gustaría…?'], ['Could you…?', '¿Podrías…?'], ['See you later', 'Nos vemos'], ['No, thank you', 'No, gracias'], ['And you?', '¿Y tú?']],
        q: [
          ['om', 'Choose the polite offer:', ['Would you like some coffee?', 'You want coffee?', 'Coffee, take.', 'Give me coffee.'], 0, 'Would you like…?'],
          ['om', 'Would you like a sandwich? — ___', ['Yes, please.', 'Yes, I would like.', 'Yes, I like.', 'Yes, please you.'], 0, 'Respuesta natural.'],
          ['om', 'The best answer to «Nice to meet you»:', ['Nice to meet you too.', 'Yes.', 'Thank you very much.', "I'm fine."], 0, 'Se regresa el saludo.'],
          ['om', 'Choose the most polite request:', ['Could you open the window, please?', 'Open the window.', 'Window!', 'You open window.'], 0, 'Could you… please?'],
          ['om', 'How was your weekend? — Great, thanks! ___', ['And you?', 'Goodbye.', "I'm Carlos.", 'Please.'], 0, 'Regresa la pregunta para mantener la conversación.'],
          ['or', 'Order the conversation:', ['Hi! Nice to meet you.', 'Nice to meet you too. Where are you from?', "I'm from Purísima. And you?", "I'm from León. It was nice talking to you!"], null, 'Saludo → preguntas → cierre.', { n: 2 }],
          ['om', 'Which expression CLOSES a conversation?', ['It was nice talking to you.', 'Nice to meet you.', 'Would you like…?', 'Where are you from?'], 0, 'Despedida amable.'],
          ['vf', '«Would you like to dance?» is an invitation.', null, true, 'Invitación cortés.'],
          ['co', 'Complete: ___ you like some water?', null, ['Would'], 'Would you like…?'],
          ['re', 'Match:', [['Greeting', 'How\'s it going?'], ['Offer', 'Would you like…?'], ['Request', 'Could you…?'], ['Closing', 'See you later!']], null, 'Conversation parts.', { n: 2 }],
          ['om', 'Someone asks «Could you help me?». A polite negative answer is…', ["I'm sorry, I can't right now.", 'No.', 'Never.', 'Help yourself.'], 0, 'Disculpa + razón breve.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'Nice to meet you. Would you like some water?', 'Courtesy expressions.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'It was nice talking to you. See you later!', 'Closing a conversation.', { n: 2 }]
        ]
      },
      {
        id: 'i4t7', nombre: 'Contar una anécdota',
        proposito: 'Propósito 7 · Narra una experiencia significativa, real o imaginaria, con claridad y en orden.',
        leccion: [
          { t: 'Pasado continuo', h: `<p><b>was / were + verbo-ing</b> = acción en progreso en el pasado. Con el pasado simple cuenta una interrupción:</p>
            <div class="ej"><p>I <b>was walking</b> home <b>when</b> it <b>started</b> to rain. ${H('I was walking home when it started to rain.')}</p><p><b>While</b> we <b>were playing</b> soccer, the power <b>went</b> out. ${H('While we were playing soccer, the power went out.')}</p></div>` },
          { t: 'Emociones y adverbios', h: `<ul><li>happy · nervous · proud · scared · surprised · embarrassed · excited</li><li>Tiempo: suddenly, later, that night, the next day. Lugar: at the station, in the workshop.</li></ul>
            <div class="ej"><p>I felt very <b>proud</b> when my robot won. ${H('I felt very proud when my robot won.')}</p></div>` }
        ],
        pares: [['was walking', 'iba caminando'], ['when', 'cuando'], ['while', 'mientras'], ['proud', 'orgulloso'], ['scared', 'asustado'], ['suddenly', 'de repente']],
        q: [
          ['om', 'I ___ dinner when my friend called.', ['was cooking', 'cooked', 'were cooking', 'cook'], 0, 'Acción en progreso + interrupción.'],
          ['om', 'They ___ soccer when it started to rain.', ['were playing', 'was playing', 'played', 'are playing'], 0, 'They were.'],
          ['om', '___ I was studying, my brother turned on the music.', ['While', 'When', 'Then', 'After'], 0, 'While + acción larga.', { n: 2 }],
          ['om', 'I was walking home ___ I saw an accident.', ['when', 'while', 'during', 'for'], 0, 'when + acción corta.', { n: 2 }],
          ['om', 'My robot won the contest. I felt very ___.', ['proud', 'scared', 'bored', 'embarrassed'], 0, 'Orgulloso.'],
          ['om', 'The lights went out ___ and everybody screamed.', ['suddenly', 'proud', 'yesterday morning was', 'never'], 0, 'De repente.'],
          ['co', 'Complete: We ___ (wait) for the bus when it arrived.', null, ['were waiting'], 'were + -ing.', { n: 2 }],
          ['vf', '«She were sleeping when I arrived» is correct.', null, false, 'She was sleeping.'],
          ['or', 'Order the anecdote:', ['Last Friday I was walking to school.', 'Suddenly, a dog started to follow me.', 'I was scared, but it was friendly.', 'In the end, I took it to a shelter.'], null, 'Situación → suceso → emoción → final.', { n: 2 }],
          ['re', 'Match the emotion:', [['nervous', 'nervioso'], ['excited', 'emocionado'], ['embarrassed', 'avergonzado'], ['surprised', 'sorprendido']], null, 'Emotion adjectives.'],
          ['om', 'Which sentence uses past continuous?', ['I was reading when you called.', 'I read a book.', 'I read books every day.', 'I will read.'], 0, 'was + -ing.'],
          ['ha', 'Speaking · Read aloud:', null, 'I was walking home when it started to rain.', 'Past continuous + past simple.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'I felt very proud when my robot won the contest.', 'Emotions in a story.', { n: 2 }]
        ]
      },
      {
        id: 'i4t8', nombre: 'Repaso integrador: presente, pasado y futuro',
        proposito: 'Propósito 8 · Consolida estrategias para comprender y expresar ideas de forma clara y estructurada (notas, correos, relatos).',
        leccion: [
          { t: 'Los tres tiempos', h: `<table><tr><th>Tiempo</th><th>Ejemplo</th></tr><tr><td>Presente</td><td>I <b>study</b> mechatronics.</td></tr><tr><td>Pasado</td><td>Yesterday I <b>fixed</b> a motor.</td></tr><tr><td>Futuro</td><td>Next year I'<b>m going to</b> work at a factory.</td></tr></table>
            <div class="ej"><p>Hi Ana! I <b>finished</b> my project yesterday. Now I <b>am</b> very happy. Tomorrow I'<b>m going to</b> present it. See you! ${H("Hi Ana! I finished my project yesterday. Now I am very happy. Tomorrow I'm going to present it. See you!")}</p></div>` },
          { t: 'Un párrafo bien armado', h: `<ol><li><b>Topic sentence</b>: la idea principal.</li><li><b>Supporting sentences</b>: detalles con conectores (first, also, because, but, so).</li><li><b>Concluding sentence</b>: cierre.</li></ol><p>Correo breve: saludo (Hi / Dear) → mensaje → despedida (Best regards / See you).</p>` }
        ],
        pares: [['study', 'presente'], ['fixed', 'pasado'], ["I'm going to", 'futuro'], ['Topic sentence', 'Idea principal'], ['Dear', 'Saludo formal'], ['Best regards', 'Despedida formal']],
        q: [
          ['om', 'Yesterday I ___ a motor in the workshop.', ['fixed', 'fix', 'am fixing', "'m going to fix"], 0, 'Yesterday → pasado.'],
          ['om', 'Every day she ___ to school by bike.', ['goes', 'went', 'is going to', 'go'], 0, 'Every day → presente simple.'],
          ['om', 'Next month we ___ visit a factory.', ['are going to', 'visited', 'visits', 'were'], 0, 'Next month → futuro.'],
          ['om', 'Which is the best TOPIC sentence?', ['My school has a great robotics club.', 'Also, we have three robots.', 'Finally, I love it.', 'Because it is fun.'], 0, 'Presenta la idea principal.', { n: 2 }],
          ['om', 'A good closing for a formal email is…', ['Best regards,', 'Hey!', 'LOL', 'Bye bye bye'], 0, 'Formal.'],
          ['co', 'Complete: I ___ (finish) my project yesterday.', null, ['finished'], 'Pasado regular.'],
          ['co', 'Complete: Tomorrow I am going ___ present it.', null, ['to'], 'going to + verbo.'],
          ['or', 'Order the email:', ['Dear Mr. López,', 'I am writing to ask about the internship.', 'Could you send me more information?', 'Best regards, Ana'], null, 'Saludo → motivo → petición → despedida.', { n: 2 }],
          ['vf', 'A concluding sentence introduces a completely new topic.', null, false, 'Cierra la idea del párrafo.', { n: 2 }],
          ['re', 'Match the time expression with the tense:', [['yesterday', 'past simple'], ['every day', 'present simple'], ['next week', 'going to'], ['right now', 'present continuous']], null, 'Time markers.', { n: 2 }],
          ['om', 'Read: «Hi Ana! I finished my project yesterday. Tomorrow I\'m going to present it.» When is the presentation?', ['Tomorrow', 'Yesterday', 'Today', 'Next year'], 0, 'Comprensión de lectura.'],
          ['ha', 'Speaking · Read aloud:', null, "I study mechatronics. Yesterday I fixed a motor, and tomorrow I'm going to program a PLC.", 'Present, past and future.', { n: 2 }],
          ['ha', 'Speaking · Read aloud:', null, 'Dear Mr. Lopez, I am writing to ask about the internship.', 'Formal email.', { n: 2 }]
        ]
      }
    ]
  };
})();
