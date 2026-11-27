// ENGRANE · Tanda 2 (v2.3): laboratorio virtual (neumática, fuerza, PLC) y cambio de semestre
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  ENG.NOMBRE_MODO.laboratorio = 'Laboratorio';

  // ═══════════════════════════ LABORATORIO ═══════════════════════════
  const RETOS = [
    { id: 'n1', g: 'neu', mat: 'modulo2', t: 'Saca el vástago del cilindro de simple efecto' },
    { id: 'n2', g: 'neu', mat: 'modulo2', t: 'Con la 5/2 biestable: saca el cilindro y luego regrésalo' },
    { id: 'n3', g: 'neu', mat: 'modulo2', t: 'Saca el cilindro con la válvula de simultaneidad (función Y)' },
    { id: 'n4', g: 'neu', mat: 'modulo2', t: 'Saca el cilindro con la válvula selectora usando un solo botón (función O)' },
    { id: 'f1', g: 'fza', mat: 'modulo2', t: 'Con 6 bar, elige el cilindro MÁS CHICO que empuje al menos 1000 N' },
    { id: 'p1', g: 'plc', mat: 'modulo3', t: 'Arranca el motor y suelta el botón: debe seguir girando' },
    { id: 'p2', g: 'plc', mat: 'modulo3', t: 'Detén el motor con el botón de paro' },
    { id: 'p3', g: 'plc', mat: 'modulo3', t: 'Con el motor girando, simula que se dispara el térmico' },
    { id: 'g1', g: 'log', mat: 'modulo3', t: 'Recorre las 4 combinaciones de la tabla de verdad de una compuerta' },
    { id: 't1', g: 'ton', mat: 'modulo3', t: 'Haz que el temporizador TON cumpla su tiempo y active Q0.0' }
  ];
  const XP_RETO = 20;
  const hechos = () => {
    const est = ENG.ctx.estado;
    const s = new Set();
    ((est && est.intentos) || []).forEach((i) => { if (i.modo === 'laboratorio' && i.tema) s.add(i.tema.replace(/^lab-/, '')); });
    (L.local || []).forEach((x) => s.add(x));
    return s;
  };
  const hechoHoy = (id) => {
    const est = ENG.ctx.estado;
    const hoy = ENG.hoy();
    return ((est && est.intentos) || []).some((i) => i.modo === 'laboratorio' && i.tema === 'lab-' + id && ENG.diaLocal(i.creado) === hoy);
  };

  const L = { tab: 'neu', local: [], raf: 0, vistos: {} };

  async function logro(id) {
    if (L.vistos[id]) return;
    L.vistos[id] = true;
    const r = RETOS.find((x) => x.id === id);
    if (!r) return;
    ENG.sonido('nivel');
    ENG.vibrar && ENG.vibrar(40);
    const c = ENG.ctx;
    if (c.rol === 'alumno' && !c.prueba) {
      const mats = (c.estado && c.estado.alumno && c.estado.alumno.materias) || [];
      const materia = mats.includes(r.mat) ? r.mat : mats.find((m) => /^modulo/.test(m)) || mats[0] || r.mat;
      const xp = hechoHoy(id) ? 0 : XP_RETO;
      await ENG.guardarIntento({ materia, tema: 'lab-' + id, modo: 'laboratorio', aciertos: 1, total: 1, xp, segundos: 0, detalle: [] }, []);
      aviso(`🎉 Reto logrado${xp ? ` · +${xp} XP` : ''}`, r.t);
    } else {
      L.local.push(id);
      aviso('🎉 Reto logrado', r.t);
    }
    pintarRetos();
  }

  function aviso(tit, txt) {
    const el = document.getElementById('lab-logro');
    if (!el) return;
    el.innerHTML = `<b>${esc(tit)}</b><small>${esc(txt)}</small>`;
    el.hidden = false;
    el.classList.remove('sale');
    void el.offsetWidth;
    el.classList.add('sale');
    clearTimeout(L.tAviso);
    L.tAviso = setTimeout(() => { el.hidden = true; }, 3500);
  }

  function pintarRetos() {
    const cont = document.getElementById('lab-retos');
    if (!cont) return;
    const h = hechos();
    const lista = RETOS.filter((r) => r.g === L.tab || (L.tab === 'plc' && (r.g === 'log' || r.g === 'ton')) );
    cont.innerHTML = `<h3 class="sec-tit">🎯 Retos de esta mesa</h3>` + lista.map((r) =>
      `<div class="reto ${h.has(r.id) ? 'ok' : ''}"><span>${h.has(r.id) ? '✅' : '⬜'}</span><span>${esc(r.t)}</span></div>`).join('') +
      `<p class="peq">Cada reto da ${XP_RETO} XP una vez al día.</p>`;
  }

  function vista() {
    cancelAnimationFrame(L.raf);
    L.vistos = {};
    app().innerHTML = `<button class="volver" id="lab-volver">‹ Inicio</button>
      <h1 class="tit">🧪 Laboratorio virtual</h1>
      <p class="ayuda-txt">Practica sin miedo a romper nada. Después, compruébalo en el taller con tu profe.</p>
      <div class="tabs" id="lab-tabs">
        <button class="tab" data-t="neu">💨 Neumática</button><button class="tab" data-t="fza">🧮 Fuerza</button><button class="tab" data-t="plc">🪜 PLC</button>
      </div>
      <div class="lab-logro" id="lab-logro" hidden role="status"></div>
      <div id="lab-zona"></div>
      <div class="card" id="lab-retos"></div>`;
    document.getElementById('lab-volver').onclick = () => (location.hash = '#/inicio');
    app().querySelectorAll('#lab-tabs button').forEach((b) => (b.onclick = () => { L.tab = b.dataset.t; mesa(); }));
    mesa();
  }

  function mesa() {
    cancelAnimationFrame(L.raf);
    app().querySelectorAll('#lab-tabs button').forEach((b) => b.classList.toggle('activa', b.dataset.t === L.tab));
    const z = document.getElementById('lab-zona');
    if (L.tab === 'neu') neumatica(z);
    else if (L.tab === 'fza') fuerza(z);
    else plc(z);
    pintarRetos();
  }

  // ─────────────── Neumática ───────────────
  const AZUL = '#1F6FEB';
  const GRIS = '#98A2B3';
  function neumatica(z) {
    const N = { modo: 'simple', pos: 0, dest: 0, P: 6, boton: false, v52: 12, A: false, B: false, salio: false };
    L.N = N;
    z.innerHTML = `<div class="card">
      <div class="seg" id="n-modo">
        <button data-m="simple">Simple efecto + 3/2</button><button data-m="doble">Doble efecto + 5/2</button>
        <button data-m="and">Función Y</button><button data-m="or">Función O</button>
      </div>
      <div class="lab-svg" id="n-svg"></div>
      <div class="lab-ctrl" id="n-ctrl"></div>
      <label class="campo"><span>Presión de la red: <b id="n-p">6</b> bar</span><input type="range" id="n-pres" min="2" max="8" step="1" value="6"></label>
      <div class="tip" id="n-exp"></div>
    </div>`;
    const ctrl = () => {
      const c = document.getElementById('n-ctrl');
      if (N.modo === 'simple') {
        c.innerHTML = `<button class="btn-fisico verde" id="n-bot">Mantén presionado<br><small>Botón de la 3/2 NC</small></button>`;
        mantener(document.getElementById('n-bot'), (v) => { N.boton = v; actualizar(); });
      } else if (N.modo === 'doble') {
        c.innerHTML = `<button class="btn-fisico verde" id="n-14">Señal 14<br><small>sacar</small></button><button class="btn-fisico rojo" id="n-12">Señal 12<br><small>meter</small></button>`;
        document.getElementById('n-14').onclick = () => { N.v52 = 14; actualizar(); };
        document.getElementById('n-12').onclick = () => { N.v52 = 12; actualizar(); };
      } else {
        c.innerHTML = `<button class="btn-fisico interruptor" id="n-a">Botón A<br><small>${N.A ? 'presionado' : 'suelto'}</small></button><button class="btn-fisico interruptor" id="n-b">Botón B<br><small>${N.B ? 'presionado' : 'suelto'}</small></button>`;
        const pon = () => {
          document.getElementById('n-a').classList.toggle('on', N.A);
          document.getElementById('n-b').classList.toggle('on', N.B);
          document.getElementById('n-a').querySelector('small').textContent = N.A ? 'presionado' : 'suelto';
          document.getElementById('n-b').querySelector('small').textContent = N.B ? 'presionado' : 'suelto';
        };
        document.getElementById('n-a').onclick = () => { N.A = !N.A; pon(); actualizar(); };
        document.getElementById('n-b').onclick = () => { N.B = !N.B; pon(); actualizar(); };
        pon();
      }
      const exp = {
        simple: 'La válvula 3/2 normalmente cerrada bloquea el aire (1) en reposo. Al presionar, conecta 1→2 y el aire empuja el pistón. Al soltar, el resorte la regresa: 2→3 escapa el aire y el resorte del cilindro mete el vástago.',
        doble: 'La 5/2 biestable «recuerda» la última señal: con 14 conecta 1→4 (sale el vástago) y con 12 conecta 1→2 (regresa). No necesitas mantener presionado.',
        and: 'La válvula de simultaneidad (función Y) solo deja pasar aire si llega por sus DOS entradas. Se usa en prensas: el operador necesita las dos manos fuera de peligro.',
        or: 'La válvula selectora (función O) deja pasar el aire que llegue por CUALQUIERA de sus entradas. Sirve para mandar el cilindro desde dos lugares distintos.'
      }[N.modo];
      document.getElementById('n-exp').textContent = exp;
    };
    const senal = () => (N.modo === 'simple' ? N.boton : N.modo === 'doble' ? N.v52 === 14 : N.modo === 'and' ? N.A && N.B : N.A || N.B);
    const actualizar = () => { N.dest = senal() ? 1 : 0; dibujar(); };
    function dibujar() {
      const s = document.getElementById('n-svg');
      if (!s) return;
      s.innerHTML = svgNeumatica(N, senal());
    }
    z.querySelectorAll('#n-modo button').forEach((b) => (b.onclick = () => {
      N.modo = b.dataset.m; N.boton = false; N.A = false; N.B = false; N.v52 = 12; N.salio = false;
      z.querySelectorAll('#n-modo button').forEach((x) => x.classList.toggle('activo', x === b));
      ctrl(); actualizar();
    }));
    z.querySelector('#n-modo button').classList.add('activo');
    document.getElementById('n-pres').oninput = (e) => { N.P = +e.target.value; document.getElementById('n-p').textContent = N.P; dibujar(); };
    ctrl(); actualizar();
    let t0 = performance.now();
    const paso = (t) => {
      if (!document.getElementById('n-svg')) return;
      const dt = Math.min((t - t0) / 1000, 0.1);
      t0 = t;
      if (N.pos !== N.dest) {
        const v = 0.25 + N.P * 0.1; // más presión, más rápido
        N.pos = N.dest > N.pos ? Math.min(N.dest, N.pos + v * dt) : Math.max(N.dest, N.pos - v * dt * (N.modo === 'doble' ? 1 : 0.8));
        dibujar();
        if (N.pos >= 1) {
          N.salio = true;
          if (N.modo === 'simple') logro('n1');
          if (N.modo === 'and' && N.A && N.B) logro('n3');
          if (N.modo === 'or' && N.A !== N.B) logro('n4');
        }
        if (N.pos <= 0 && N.salio && N.modo === 'doble') logro('n2');
      }
      L.raf = requestAnimationFrame(paso);
    };
    L.raf = requestAnimationFrame(paso);
  }

  function mantener(btn, fn) {
    const on = (e) => { e.preventDefault(); btn.classList.add('on'); fn(true); };
    const off = () => { if (btn.classList.contains('on')) { btn.classList.remove('on'); fn(false); } };
    btn.addEventListener('pointerdown', on);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, off));
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
    btn.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') on(e); });
    btn.addEventListener('keyup', off);
  }

  // Dibujo ISO 1219 simplificado
  function svgNeumatica(N, sen) {
    const col = (b) => (b ? AZUL : GRIS);
    const px = 160 + N.pos * 110; // pistón
    const doble = N.modo === 'doble';
    const presA = doble ? N.v52 === 14 : sen; // cámara del émbolo
    const presB = doble && N.v52 === 12; // cámara del vástago
    let s = `<svg viewBox="0 0 360 250" class="neu" role="img" aria-label="Circuito neumático">`;
    // cilindro
    s += `<rect x="150" y="30" width="140" height="46" rx="3" fill="#F8FAFC" stroke="#344054" stroke-width="2"/>`;
    s += `<rect x="152" y="32" width="${px - 152}" height="42" fill="${presA ? '#D0E3FF' : '#F8FAFC'}"/>`;
    s += `<rect x="${px + 8}" y="32" width="${288 - px - 8}" height="42" fill="${presB ? '#D0E3FF' : '#F8FAFC'}"/>`;
    if (!doble) { // resorte
      let zz = `M${px + 10} 53`;
      const largo = 285 - px - 10;
      for (let i = 1; i <= 8; i++) zz += ` L${px + 10 + (largo * i) / 8} ${i % 2 ? 40 : 66}`;
      s += `<path d="${zz}" fill="none" stroke="#667085" stroke-width="1.5"/>`;
    }
    s += `<rect x="${px}" y="32" width="8" height="42" fill="#344054"/>`;
    s += `<rect x="${px + 8}" y="49" width="150" height="8" fill="#667085"/>`;
    s += `<rect x="288" y="30" width="4" height="46" fill="#344054"/>`;
    s += `<text x="220" y="20" text-anchor="middle" class="et">${doble ? 'Cilindro de doble efecto' : 'Cilindro de simple efecto'}</text>`;
    // válvula
    const W = 150;
    if (N.modo === 'doble') {
      const tx = N.v52 === 14 ? 50 : 0;
      s += `<path d="M${W + 15} 150 V110 H165 V76" fill="none" stroke="${col(presA)}" stroke-width="3"/>`;
      s += `<path d="M${W + 35} 150 V120 H275 V76" fill="none" stroke="${col(presB)}" stroke-width="3"/>`;
      s += `<path d="M${W + 25} 190 V215" stroke="${AZUL}" stroke-width="3"/>${fuente(W + 25, 215)}`;
      s += escape(W + 8, 190) + escape(W + 42, 190);
      s += `<g transform="translate(${tx} 0)">`;
      s += caja(W - 50, 150, [flecha(25, 40, 15, 0), flecha(35, 0, 42, 40)]) + caja(W, 150, [flecha(25, 40, 35, 0), flecha(15, 0, 8, 40)]);
      s += `<rect x="${W - 62}" y="160" width="12" height="20" fill="${N.v52 === 14 ? AZUL : '#fff'}" stroke="#344054"/><text x="${W - 70}" y="200" class="et">14</text>`;
      s += `<rect x="${W + 50}" y="160" width="12" height="20" fill="${N.v52 === 12 ? AZUL : '#fff'}" stroke="#344054"/><text x="${W + 56}" y="200" class="et">12</text>`;
      s += `</g>`;
      s += `<text x="${W + 13}" y="146" class="et">4</text><text x="${W + 33}" y="146" class="et">2</text><text x="${W + 22}" y="203" class="et">1</text>`;
    } else {
      const tx = sen ? 50 : 0;
      const etiqueta = N.modo === 'and' ? 'Y' : N.modo === 'or' ? '≥1' : '';
      s += `<path d="M${W + 25} 150 V110 H165 V76" fill="none" stroke="${col(sen)}" stroke-width="3"/>`;
      if (etiqueta) {
        // entradas A y B hacia el elemento lógico, que manda la señal a la válvula (pilotaje)
        s += `<rect x="40" y="95" width="44" height="30" rx="4" fill="#fff" stroke="#344054" stroke-width="2"/><text x="62" y="115" text-anchor="middle" class="et b">${etiqueta}</text>`;
        s += `<path d="M20 160 V125 H48" fill="none" stroke="${col(N.A)}" stroke-width="3"/><path d="M100 160 V125 H76" fill="none" stroke="${col(N.B)}" stroke-width="3"/>`;
        s += `<circle cx="20" cy="170" r="10" fill="${N.A ? AZUL : '#fff'}" stroke="#344054"/><text x="20" y="174" text-anchor="middle" class="et b">A</text>`;
        s += `<circle cx="100" cy="170" r="10" fill="${N.B ? AZUL : '#fff'}" stroke="#344054"/><text x="100" y="174" text-anchor="middle" class="et b">B</text>`;
        s += `<path d="M62 95 V80 H130 V170 H${W - 50 + tx - 12}" fill="none" stroke="${col(sen)}" stroke-width="2" stroke-dasharray="5 3"/>`;
      }
      s += `<path d="M${W + 15} 190 V215" stroke="${AZUL}" stroke-width="3"/>${fuente(W + 15, 215)}`;
      s += escape(W + 35, 190);
      s += `<g transform="translate(${tx} 0)">`;
      s += caja(W - 50, 150, [flecha(15, 40, 25, 0), bloqueo(35, 40)]) + caja(W, 150, [flecha(25, 0, 35, 40), bloqueo(15, 40)]);
      if (etiqueta) s += `<path d="M${W - 50} 170 H${W - 62}" stroke="#344054" stroke-width="2"/><rect x="${W - 64}" y="163" width="6" height="14" fill="${sen ? AZUL : '#fff'}" stroke="#344054"/>`;
      else s += `<path d="M${W - 50} 170 H${W - 66}" stroke="#344054" stroke-width="2"/><path d="M${W - 66} 160 V180" stroke="#344054" stroke-width="3"/><path d="M${W - 70} 162 h-6 v16 h6" fill="none" stroke="#344054" stroke-width="2"/>`;
      // resorte de retorno de la válvula
      s += `<path d="M${W + 50} 170 l6 -8 l6 16 l6 -16 l6 16 l6 -8" fill="none" stroke="#344054" stroke-width="1.5"/>`;
      s += `</g>`;
      s += `<text x="${W + 23}" y="146" class="et">2</text><text x="${W + 12}" y="203" class="et">1</text><text x="${W + 38}" y="203" class="et">3</text>`;
      s += `<text x="${W + 25}" y="242" text-anchor="middle" class="et">${N.modo === 'simple' ? 'Válvula 3/2 NC con botón y resorte' : 'Válvula 3/2 NC pilotada'}</text>`;
    }
    if (N.modo === 'doble') s += `<text x="${W + 25}" y="242" text-anchor="middle" class="et">Válvula 5/2 biestable (memoria)</text>`;
    s += `<text x="330" y="110" text-anchor="end" class="et b">${N.pos >= 1 ? 'Afuera ✔' : N.pos <= 0 ? 'Adentro' : 'Moviéndose…'}</text>`;
    s += `</svg>`;
    return s;
  }
  const caja = (x, y, cosas) => `<g transform="translate(${x} ${y})"><rect width="50" height="40" fill="#fff" stroke="#344054" stroke-width="2"/>${cosas.join('')}</g>`;
  const flecha = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    const p = (d, g) => `${x2 - d * Math.cos(a + g)},${y2 - d * Math.sin(a + g)}`;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#344054" stroke-width="1.6"/><polygon points="${x2},${y2} ${p(7, 0.4)} ${p(7, -0.4)}" fill="#344054"/>`;
  };
  const bloqueo = (x, y) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 10}" stroke="#344054" stroke-width="1.6"/><line x1="${x - 5}" y1="${y - 10}" x2="${x + 5}" y2="${y - 10}" stroke="#344054" stroke-width="1.6"/>`;
  const fuente = (x, y) => `<circle cx="${x}" cy="${y + 8}" r="8" fill="#fff" stroke="#344054" stroke-width="2"/><polygon points="${x},${y + 3} ${x - 4},${y + 11} ${x + 4},${y + 11}" fill="#344054"/>`;
  const escape = (x, y) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 10}" stroke="#344054" stroke-width="1.6"/><polygon points="${x},${y + 10} ${x - 6},${y + 20} ${x + 6},${y + 20}" fill="none" stroke="#344054" stroke-width="1.6"/>`;

  // ─────────────── Fuerza de cilindros ───────────────
  const DIAM = [[12, 6], [16, 6], [20, 8], [25, 10], [32, 12], [40, 16], [50, 20], [63, 20], [80, 25], [100, 25]];
  const fuerzas = (P, D, d) => {
    const pa = P * 1e5;
    const A1 = (Math.PI * (D / 1000) ** 2) / 4;
    const A2 = (Math.PI * ((D / 1000) ** 2 - (d / 1000) ** 2)) / 4;
    return { av: pa * A1, re: pa * A2 };
  };
  ENG.Lab = { fuerzas, RETOS };
  function fuerza(z) {
    const F = { P: 6, i: 5 };
    z.innerHTML = `<div class="card">
      <h3 class="sec-tit">Calculadora de fuerza</h3>
      <p class="peq">F = P · A &nbsp;·&nbsp; A = π·D²/4 &nbsp;·&nbsp; 1 bar = 100 000 Pa</p>
      <label class="campo"><span>Presión: <b id="f-pv"></b> bar</span><input type="range" id="f-p" min="1" max="10" step="0.5" value="6"></label>
      <label class="campo"><span>Diámetro del émbolo: <b id="f-dv"></b> mm <small>(vástago <span id="f-vv"></span> mm)</small></span><input type="range" id="f-d" min="0" max="${DIAM.length - 1}" step="1" value="5"></label>
      <div class="fz-res">
        <div><small>Fuerza al salir</small><b id="f-av"></b><small id="f-avk"></small></div>
        <div><small>Fuerza al regresar</small><b id="f-re"></b><small id="f-rek"></small></div>
      </div>
      <div class="fz-barra"><i id="f-barra"></i><span class="meta-1000">1000 N</span></div>
      <p class="tip">Al regresar empuja menos porque el vástago le quita área al émbolo. En la práctica, la fricción reduce la fuerza real a un 85–90 % de la teórica.</p>
      <p class="peq" id="f-pista"></p>
    </div>`;
    const pintar = () => {
      const [D, d] = DIAM[F.i];
      const { av, re } = fuerzas(F.P, D, d);
      document.getElementById('f-pv').textContent = F.P;
      document.getElementById('f-dv').textContent = D;
      document.getElementById('f-vv').textContent = d;
      document.getElementById('f-av').textContent = Math.round(av).toLocaleString('es-MX') + ' N';
      document.getElementById('f-avk').textContent = '≈ ' + Math.round(av / 9.81) + ' kgf';
      document.getElementById('f-re').textContent = Math.round(re).toLocaleString('es-MX') + ' N';
      document.getElementById('f-rek').textContent = '≈ ' + Math.round(re / 9.81) + ' kgf';
      document.getElementById('f-barra').style.width = Math.min(100, (av / 2000) * 100) + '%';
      const pista = document.getElementById('f-pista');
      pista.textContent = '';
      if (F.P === 6) {
        const ok = av >= 1000;
        const menor = F.i > 0 && fuerzas(6, DIAM[F.i - 1][0], DIAM[F.i - 1][1]).av >= 1000;
        if (ok && !menor) logro('f1');
        else if (ok && menor) pista.textContent = '💡 Funciona, pero hay un cilindro más chico (y más barato) que también lo logra.';
      }
    };
    document.getElementById('f-p').oninput = (e) => { F.P = +e.target.value; pintar(); };
    document.getElementById('f-d').oninput = (e) => { F.i = +e.target.value; pintar(); };
    pintar();
  }

  // ─────────────── PLC: escalera ───────────────
  function plc(z) {
    const S = { sub: L.plcSub || 'ap' };
    z.innerHTML = `<div class="card"><div class="seg" id="p-sub">
      <button data-s="ap">Arranque–paro</button><button data-s="log">Compuertas</button><button data-s="ton">Temporizador TON</button></div>
      <div id="p-zona"></div></div>`;
    z.querySelectorAll('#p-sub button').forEach((b) => {
      b.classList.toggle('activo', b.dataset.s === S.sub);
      b.onclick = () => { L.plcSub = b.dataset.s; plc(z); };
    });
    const pz = document.getElementById('p-zona');
    if (S.sub === 'ap') arranqueParo(pz);
    else if (S.sub === 'log') compuertas(pz);
    else temporizador(pz);
  }

  // Contacto en escalera (x = inicio, y = renglón)
  const VERDE = '#2F9E44';
  const cable = (x1, y1, x2, y2, on) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${on ? VERDE : GRIS}" stroke-width="${on ? 4 : 2.5}" stroke-linecap="round"/>`;
  const contacto = (x, y, nombre, cerrado, nc, entrada) => `
    <line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 14}" stroke="#344054" stroke-width="3"/>
    <line x1="${x + 20}" y1="${y - 14}" x2="${x + 20}" y2="${y + 14}" stroke="#344054" stroke-width="3"/>
    ${nc ? `<line x1="${x - 2}" y1="${y + 14}" x2="${x + 22}" y2="${y - 14}" stroke="#344054" stroke-width="2"/>` : ''}
    ${cerrado ? `<rect x="${x + 3}" y="${y - 10}" width="14" height="20" fill="${VERDE}" opacity=".35"/>` : ''}
    <text x="${x + 10}" y="${y - 22}" text-anchor="middle" class="et b">${nombre}</text>
    <text x="${x + 10}" y="${y + 30}" text-anchor="middle" class="et">${entrada}</text>`;
  const bobina = (x, y, nombre, on, txt) => `
    <path d="M${x + 6} ${y - 14} q-10 14 0 28 M${x + 22} ${y - 14} q10 14 0 28" fill="none" stroke="#344054" stroke-width="3"/>
    ${on ? `<circle cx="${x + 14}" cy="${y}" r="9" fill="${VERDE}" opacity=".45"/>` : ''}
    <text x="${x + 14}" y="${y - 22}" text-anchor="middle" class="et b">${nombre}</text>
    <text x="${x + 14}" y="${y + 30}" text-anchor="middle" class="et">${txt}</text>`;

  function arranqueParo(pz) {
    const E = { arr: false, paro: false, term: false, Q: false };
    pz.innerHTML = `<div class="lab-svg" id="ap-svg"></div>
      <div class="lab-ctrl">
        <button class="btn-fisico verde" id="ap-arr">Arranque<br><small>NA · I0.0</small></button>
        <button class="btn-fisico rojo" id="ap-paro">Paro<br><small>NC · I0.1</small></button>
        <button class="btn-fisico interruptor" id="ap-term">Térmico<br><small>95-96 · I0.2</small></button>
      </div>
      <div class="motor-fila"><span class="motor ${E.Q ? 'gira' : ''}" id="ap-motor">⚙️</span><b id="ap-est">Motor detenido</b></div>
      <div class="io" id="ap-io"></div>
      <p class="tip">El paro y el térmico son contactos físicos <b>NC</b>: mientras nadie los toca, la entrada del PLC vale <b>1</b>. Por eso en el programa se dibujan como contactos <b>NA</b>. Si un cable se corta, la entrada cae a 0 y el motor se detiene: falla segura.</p>`;
    const scan = (origen) => {
      const I0 = E.arr ? 1 : 0;
      const I1 = E.paro ? 0 : 1;
      const I2 = E.term ? 0 : 1;
      const antes = E.Q;
      E.Q = !!((I0 || E.Q) && I1 && I2);
      const rama = !!(I0 || antes);
      const tras1 = rama && I1;
      const svg = `<svg viewBox="0 0 360 170" class="esc" role="img" aria-label="Diagrama de escalera arranque-paro">
        <line x1="12" y1="10" x2="12" y2="160" stroke="${VERDE}" stroke-width="5"/><line x1="348" y1="10" x2="348" y2="160" stroke="#344054" stroke-width="5"/>
        ${cable(12, 50, 46, 50, true)}${contacto(46, 50, 'I0.0', !!I0, false, 'Arranque')}${cable(66, 50, 110, 50, !!I0)}
        ${cable(30, 50, 30, 125, true)}${cable(30, 125, 46, 125, true)}${contacto(46, 125, 'Q0.0', antes, false, 'Enclavamiento')}${cable(66, 125, 110, 125, antes)}
        ${cable(110, 50, 110, 125, rama)}
        ${cable(110, 50, 140, 50, rama)}${contacto(140, 50, 'I0.1', !!I1, false, 'Paro')}${cable(160, 50, 200, 50, tras1)}
        ${contacto(200, 50, 'I0.2', !!I2, false, 'Térmico')}${cable(220, 50, 286, 50, E.Q)}
        ${bobina(286, 50, 'Q0.0', E.Q, 'Motor')}${cable(314, 50, 348, 50, E.Q)}
      </svg>`;
      document.getElementById('ap-svg').innerHTML = svg;
      document.getElementById('ap-motor').classList.toggle('gira', E.Q);
      document.getElementById('ap-est').textContent = E.Q ? 'Motor girando' : E.term ? 'Térmico disparado: rearma para volver a arrancar' : 'Motor detenido';
      document.getElementById('ap-io').innerHTML = [['I0.0', I0], ['I0.1', I1], ['I0.2', I2], ['Q0.0', E.Q ? 1 : 0]]
        .map(([n, v]) => `<span class="led ${v ? 'on' : ''}">${n} = ${v}</span>`).join('');
      document.getElementById('ap-term').classList.toggle('on', E.term);
      document.getElementById('ap-term').querySelector('small').textContent = E.term ? 'DISPARADO · toca para rearmar' : '95-96 · I0.2';
      // retos
      if (origen === 'suelta-arr' && E.Q) logro('p1');
      if (origen === 'paro' && antes && !E.Q) logro('p2');
      if (origen === 'term' && antes && !E.Q) logro('p3');
    };
    mantener(document.getElementById('ap-arr'), (v) => { E.arr = v; scan(v ? 'arr' : 'suelta-arr'); });
    mantener(document.getElementById('ap-paro'), (v) => { E.paro = v; scan(v ? 'paro' : 'suelta-paro'); });
    document.getElementById('ap-term').onclick = () => { E.term = !E.term; scan(E.term ? 'term' : 'rearme'); };
    scan('');
  }

  const PUERTAS = {
    AND: { f: (a, b) => a && b, esc: 'A y B en serie' },
    OR: { f: (a, b) => a || b, esc: 'A y B en paralelo' },
    NAND: { f: (a, b) => !(a && b), esc: 'A NC en paralelo con B NC' },
    NOR: { f: (a, b) => !(a || b), esc: 'A NC en serie con B NC' },
    XOR: { f: (a, b) => a !== b, esc: '(A con B NC) en paralelo con (A NC con B)' }
  };
  function compuertas(pz) {
    const G = { g: 'AND', A: false, B: false, vistos: new Set() };
    pz.innerHTML = `<div class="seg" id="g-sel">${Object.keys(PUERTAS).map((k) => `<button data-g="${k}">${k}</button>`).join('')}</div>
      <div class="lab-ctrl"><button class="btn-fisico interruptor" id="g-a">A = 0</button><button class="btn-fisico interruptor" id="g-b">B = 0</button>
      <span class="foco" id="g-q">Q</span></div>
      <table class="tv" id="g-tv"></table><p class="peq" id="g-esc"></p>`;
    const pintar = () => {
      const P = PUERTAS[G.g];
      const q = P.f(G.A, G.B);
      G.vistos.add(`${+G.A}${+G.B}`);
      if (G.vistos.size === 4) logro('g1');
      document.getElementById('g-a').textContent = `A = ${+G.A}`;
      document.getElementById('g-b').textContent = `B = ${+G.B}`;
      document.getElementById('g-a').classList.toggle('on', G.A);
      document.getElementById('g-b').classList.toggle('on', G.B);
      document.getElementById('g-q').classList.toggle('on', q);
      document.getElementById('g-q').textContent = `Q = ${+q}`;
      document.getElementById('g-tv').innerHTML = `<tr><th>A</th><th>B</th><th>Q = ${G.g}</th><th></th></tr>` + [[0, 0], [0, 1], [1, 0], [1, 1]]
        .map(([a, b]) => `<tr class="${a === +G.A && b === +G.B ? 'actual' : ''}"><td>${a}</td><td>${b}</td><td>${+P.f(!!a, !!b)}</td><td>${G.vistos.has(`${a}${b}`) ? '✓' : ''}</td></tr>`).join('');
      document.getElementById('g-esc').innerHTML = `En escalera: <b>${P.esc}</b>.`;
      pz.querySelectorAll('#g-sel button').forEach((b) => b.classList.toggle('activo', b.dataset.g === G.g));
    };
    pz.querySelectorAll('#g-sel button').forEach((b) => (b.onclick = () => { G.g = b.dataset.g; G.vistos = new Set(); pintar(); }));
    document.getElementById('g-a').onclick = () => { G.A = !G.A; pintar(); };
    document.getElementById('g-b').onclick = () => { G.B = !G.B; pintar(); };
    pintar();
  }

  function temporizador(pz) {
    const T = { in: false, PT: 3, ET: 0, Q: false };
    pz.innerHTML = `<label class="campo"><span>PT (tiempo programado): <b id="t-ptv">3</b> s</span><input type="range" id="t-pt" min="1" max="10" step="1" value="3"></label>
      <div class="lab-ctrl"><button class="btn-fisico interruptor" id="t-in">I0.0 = 0</button><span class="foco" id="t-q">Q0.0 = 0</span></div>
      <div class="fz-barra"><i id="t-barra"></i></div><p class="peq">ET (transcurrido): <b id="t-et">0.0</b> s</p>
      <p class="tip">TON = retardo a la conexión. La salida se activa cuando la entrada lleva PT segundos encendida. Si apagas la entrada antes, el tiempo vuelve a cero.</p>`;
    document.getElementById('t-pt').oninput = (e) => { T.PT = +e.target.value; document.getElementById('t-ptv').textContent = T.PT; };
    document.getElementById('t-in').onclick = () => { T.in = !T.in; if (!T.in) { T.ET = 0; T.Q = false; } };
    let t0 = performance.now();
    const paso = (t) => {
      if (!document.getElementById('t-in')) return;
      const dt = Math.min((t - t0) / 1000, 0.1);
      t0 = t;
      if (T.in && !T.Q) {
        T.ET = Math.min(T.PT, T.ET + dt);
        if (T.ET >= T.PT) { T.Q = true; logro('t1'); }
      }
      document.getElementById('t-in').textContent = `I0.0 = ${+T.in}`;
      document.getElementById('t-in').classList.toggle('on', T.in);
      document.getElementById('t-q').textContent = `Q0.0 = ${+T.Q}`;
      document.getElementById('t-q').classList.toggle('on', T.Q);
      document.getElementById('t-barra').style.width = (T.ET / T.PT) * 100 + '%';
      document.getElementById('t-et').textContent = T.ET.toFixed(1);
      L.raf = requestAnimationFrame(paso);
    };
    L.raf = requestAnimationFrame(paso);
  }

  ENG.Lab.vista = vista;
  ENG.Lab.detener = () => cancelAnimationFrame(L.raf);

  // ═══════════════════════════ CAMBIO DE SEMESTRE ═══════════════════════════
  // Qué materia sigue de cada una (mismo campo disciplinar). Lengua y Filosófico no tienen continuación en 4°.
  const SIGUE = { ingles3: 'ingles4', modulo2: 'modulo3', matematico3: 'matematico4', ciencias3: 'ciencias4' };
  const nombre = (id) => (ENG.MATERIAS[id] ? ENG.MATERIAS[id].nombre : id);

  function planSemestre(alumno, cfg) {
    const antes = (alumno.materias || []).slice();
    let despues;
    if (cfg.modo === 'auto') {
      despues = [];
      antes.forEach((m) => {
        if (SIGUE[m]) despues.push(SIGUE[m]);
        else if (ENG.MATERIAS[m] && ENG.MATERIAS[m].semestre === 3) { /* se quita */ } else despues.push(m);
      });
      if (cfg.extra) ['sociales3', 'historica1'].forEach((m) => despues.push(m));
    } else {
      despues = antes.filter((m) => !cfg.quitar.includes(m)).concat(cfg.agregar);
    }
    despues = [...new Set(despues)].filter((m) => ENG.MATERIAS[m]);
    const cambia = despues.length !== antes.length || despues.some((m) => !antes.includes(m));
    return { antes, despues, cambia };
  }
  ENG.planSemestre = planSemestre;

  function vistaSemestre() {
    if (!(ENG.ctx.perfil && ENG.ctx.perfil.rol === 'admin')) return (location.hash = '#/inicio');
    const alumnos = (ENG.ctx.alumnos || []).slice().sort((a, b) => (a.grupo || '').localeCompare(b.grupo || '') || a.nombre.localeCompare(b.nombre));
    const grupos = [...new Set(alumnos.map((a) => a.grupo || 'Sin grupo'))];
    const chk = (ids, pre) => ids.map((id) => `<label class="check"><input type="checkbox" value="${id}" ${pre.includes(id) ? 'checked' : ''}><span>${ENG.MATERIAS[id].icono} ${esc(nombre(id))}</span></label>`).join('');
    const m3 = Object.values(ENG.MATERIAS).filter((m) => m.semestre === 3).map((m) => m.id);
    const m4 = Object.values(ENG.MATERIAS).filter((m) => m.semestre === 4).map((m) => m.id);
    app().innerHTML = `<button class="volver" id="cs-volver">‹ Panel</button>
      <h1 class="tit">📅 Cambio de semestre</h1>
      <p class="ayuda-txt">Pasa a tus alumnos al siguiente semestre en un solo paso. <b>No se borra nada</b>: su historial, XP e insignias se quedan; solo cambian las materias que ven.</p>
      <div class="card form">
        <label class="check"><input type="radio" name="cs-modo" value="auto" checked><span><b>Automático</b>: cada materia pasa a la que sigue (Inglés III → IV, Módulo II → III, Matemático III → IV, Ciencias III → IV). Lengua III y Filosófico II se quitan.</span></label>
        <label class="check sub" id="cs-extra-l"><input type="checkbox" id="cs-extra"><span>Agregar también Ciencias Sociales III y Conciencia Histórica I</span></label>
        <label class="check"><input type="radio" name="cs-modo" value="manual"><span><b>Manual</b>: elige qué quitar y qué agregar</span></label>
        <div id="cs-manual" hidden>
          <p class="peq">Quitar:</p><div class="checks" id="cs-quitar">${chk(m3, m3)}</div>
          <p class="peq">Agregar:</p><div class="checks" id="cs-agregar">${chk(m4, [])}</div>
        </div>
      </div>
      <div class="card">
        <div class="mc-top"><b>Alumnos</b><label class="peq" style="margin-left:auto">Grupo <select id="cs-grupo"><option value="">Todos</option>${grupos.map((g) => `<option>${esc(g)}</option>`).join('')}</select></label></div>
        <div class="checks scroll" id="cs-alumnos">${alumnos.map((a) => `<label class="check" data-grupo="${esc(a.grupo || 'Sin grupo')}"><input type="checkbox" value="${a.id}" checked><span>${esc(a.nombre)} <small>${esc(a.grupo || '')}</small></span></label>`).join('') || '<p class="vacio">Aún no tienes alumnos.</p>'}</div>
      </div>
      <div class="card" id="cs-vista"></div>
      <button class="btn pri ancho" id="cs-aplicar">Aplicar cambios</button>`;
    const leer = () => {
      const modo = app().querySelector('input[name="cs-modo"]:checked').value;
      const sel = (id) => [...document.querySelectorAll(`#${id} input:checked`)].map((i) => i.value);
      const visibles = [...document.querySelectorAll('#cs-alumnos label')].filter((l) => !l.hidden).map((l) => l.querySelector('input')).filter((i) => i.checked).map((i) => i.value);
      return { modo, extra: document.getElementById('cs-extra').checked, quitar: sel('cs-quitar'), agregar: sel('cs-agregar'), ids: visibles };
    };
    const previa = () => {
      const cfg = leer();
      document.getElementById('cs-manual').hidden = cfg.modo !== 'manual';
      document.getElementById('cs-extra-l').hidden = cfg.modo !== 'auto';
      const planes = alumnos.filter((a) => cfg.ids.includes(a.id)).map((a) => [a, planSemestre(a, cfg)]).filter(([, p]) => p.cambia);
      document.getElementById('cs-vista').innerHTML = `<h3 class="sec-tit">Vista previa · ${planes.length} alumno${planes.length === 1 ? '' : 's'} con cambios</h3>` +
        (planes.map(([a, p]) => `<div class="cs-fila"><b>${esc(a.nombre)}</b><small>${p.antes.map(nombre).map(esc).join(', ') || '—'}</small><small>→ ${p.despues.map(nombre).map(esc).join(', ') || '—'}</small></div>`).join('') || '<p class="peq">Nada que cambiar con esta selección.</p>');
      return { cfg, planes };
    };
    app().querySelectorAll('input').forEach((i) => (i.onchange = previa));
    document.getElementById('cs-grupo').onchange = (e) => {
      document.querySelectorAll('#cs-alumnos label').forEach((l) => (l.hidden = !!e.target.value && l.dataset.grupo !== e.target.value));
      previa();
    };
    document.getElementById('cs-volver').onclick = () => (location.hash = '#/inicio');
    document.getElementById('cs-aplicar').onclick = async () => {
      const { planes } = previa();
      if (!planes.length) return ENG.toast('No hay cambios que aplicar', 'mal');
      if (!(await ENG.confirmar(`¿Cambiar las materias de ${planes.length} alumno(s)? Su historial no se borra.`, 'Aplicar'))) return;
      const btn = document.getElementById('cs-aplicar');
      btn.disabled = true;
      let ok = 0;
      for (const [a, p] of planes) {
        try {
          await ENG.API.actualizarAlumno(a.id, { materias: p.despues });
          a.materias = p.despues;
          ok++;
          btn.textContent = `Guardando… ${ok}/${planes.length}`;
        } catch (e) { ENG.toast(`${a.nombre}: ${e.message}`, 'mal'); }
      }
      ENG.toast(`Listo: ${ok} alumno(s) cambiados ✔`, 'ok');
      btn.disabled = false;
      btn.textContent = 'Aplicar cambios';
      previa();
    };
    previa();
  }
  ENG.CambioSemestre = { vista: vistaSemestre, SIGUE };
})();
