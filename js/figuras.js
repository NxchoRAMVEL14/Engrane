// ENGRANE · figuras dibujadas por la app (infografías y símbolos ISO 1219)
(function () {
  const ENG = window.ENG;
  const T = 'var(--tinta)';
  const N = 'var(--naranja)';
  const A = 'var(--azul)';
  const svg = (vb, cuerpo, alto = 'auto') =>
    `<svg class="fig" viewBox="${vb}" style="height:${alto}" xmlns="http://www.w3.org/2000/svg" font-family="inherit" stroke-linecap="round" stroke-linejoin="round">${cuerpo}</svg>`;
  const txt = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 11}" fill="${o.c || T}" text-anchor="${o.a || 'middle'}" font-weight="${o.w || 600}">${t}</text>`;
  const flecha = (x1, y1, x2, y2, c = N, w = 2.2) => {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const L = 8;
    const p1 = [x2 - L * Math.cos(ang - 0.4), y2 - L * Math.sin(ang - 0.4)];
    const p2 = [x2 - L * Math.cos(ang + 0.4), y2 - L * Math.sin(ang + 0.4)];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/><path d="M${x2},${y2}L${p1}L${p2}Z" fill="${c}" stroke="${c}"/>`;
  };
  const resorte = (x1, y, x2, h = 7, n = 6) => {
    let d = `M${x1},${y}`;
    const paso = (x2 - x1) / n;
    for (let i = 0; i < n; i++) d += `L${x1 + paso * (i + 0.5)},${y + (i % 2 ? h : -h)}`;
    return `<path d="${d}L${x2},${y}" fill="none" stroke="${T}" stroke-width="1.6"/>`;
  };

  // ── Isométrico (proyección) ──
  const c30 = Math.cos(Math.PI / 6), s30 = 0.5;
  function iso(p, ox, oy, k) {
    const [x, y, z] = p;
    return [ox + (x - y) * c30 * k, oy + (-z + (x + y) * s30) * k];
  }
  function cara(pts, ox, oy, k, fill) {
    return `<polygon points="${pts.map((p) => iso(p, ox, oy, k).map((n) => n.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${T}" stroke-width="1.6"/>`;
  }

  const F = {
    // Bloque en L: isométrico + 3 vistas (sistema europeo)
    'iso-vistas': () => {
      const k = 26, ox = 70, oy = 70;
      const caras = [
        [[[0, 0, 1], [2, 0, 1], [2, 2, 1], [0, 2, 1]], '#FDE3CF'],
        [[[3, 0, 0], [3, 2, 0], [3, 2, 2], [3, 0, 2]], '#C9D6E3'],
        [[[2, 0, 2], [3, 0, 2], [3, 2, 2], [2, 2, 2]], '#FDE3CF'],
        [[[0, 2, 0], [3, 2, 0], [3, 2, 2], [2, 2, 2], [2, 2, 1], [0, 2, 1]], '#E8EEF4']
      ];
      const u = 18; // unidad en vistas
      const ax = 215, ay = 22; // alzado (arriba-izq de la composición)
      const alz = `<path d="M${ax},${ay + 2 * u}h${3 * u}v${-2 * u}h${-u}v${u}h${-2 * u}Z" fill="#E8EEF4" stroke="${T}" stroke-width="1.6"/>`;
      const py = ay + 2 * u + 22;
      const pla = `<rect x="${ax}" y="${py}" width="${3 * u}" height="${2 * u}" fill="#FDE3CF" stroke="${T}" stroke-width="1.6"/><line x1="${ax + 2 * u}" y1="${py}" x2="${ax + 2 * u}" y2="${py + 2 * u}" stroke="${T}" stroke-width="1.6"/>`;
      const lx = ax + 3 * u + 22;
      const lat = `<rect x="${lx}" y="${ay}" width="${2 * u}" height="${2 * u}" fill="#C9D6E3" stroke="${T}" stroke-width="1.6"/><line x1="${lx}" y1="${ay + u}" x2="${lx + 2 * u}" y2="${ay + u}" stroke="${T}" stroke-width="1.6"/>`;
      return svg('0 0 360 175',
        caras.map(([p, f]) => cara(p, ox, oy, k, f)).join('') +
        txt(70, 168, 'Isométrico', { s: 12 }) +
        alz + pla + lat +
        txt(ax + 1.5 * u, ay - 6, 'Alzado') + txt(ax + 1.5 * u, py + 2 * u + 14, 'Planta') + txt(lx + u, ay - 6, 'Lateral izq.') +
        `<line x1="${ax - 10}" y1="${ay + 2 * u + 11}" x2="${lx + 2 * u + 8}" y2="${ay + 2 * u + 11}" stroke="${A}" stroke-dasharray="3 3" stroke-width="1"/>` +
        `<line x1="${ax + 3 * u + 11}" y1="${ay - 2}" x2="${ax + 3 * u + 11}" y2="${py + 2 * u + 4}" stroke="${A}" stroke-dasharray="3 3" stroke-width="1"/>` +
        txt(300, 160, 'Sistema europeo (ISO-E)', { s: 10, c: A })
      );
    },

    // Acomodo de vistas: europeo vs americano
    'sistemas-vistas': () => {
      const caja = (x, y, t, f = '#fff') => `<rect x="${x}" y="${y}" width="58" height="30" rx="4" fill="${f}" stroke="${T}" stroke-width="1.4"/>` + txt(x + 29, y + 19, t, { s: 10 });
      return svg('0 0 340 170',
        txt(85, 14, 'EUROPEO · 1er cuadrante', { s: 10.5, c: A }) +
        caja(55, 55, 'Alzado', '#E8EEF4') + caja(55, 105, 'Planta', '#FDE3CF') + caja(120, 55, 'Lat. izq.', '#C9D6E3') +
        txt(85, 160, 'Planta ABAJO · lateral izq. a la DERECHA', { s: 8.5 }) +
        `<line x1="170" y1="20" x2="170" y2="150" stroke="${T}" stroke-dasharray="4 4" stroke-width="1"/>` +
        txt(255, 14, 'AMERICANO · 3er cuadrante', { s: 10.5, c: N }) +
        caja(225, 75, 'Alzado', '#E8EEF4') + caja(225, 25, 'Planta', '#FDE3CF') + caja(290 - 5, 75, 'Lat. der.', '#C9D6E3') +
        txt(255, 160, 'Planta ARRIBA · lateral der. a la DERECHA', { s: 8.5 })
      );
    },

    // Tipos de línea
    lineas: () => {
      const fila = (y, attrs, t) => `<line x1="12" y1="${y}" x2="150" y2="${y}" stroke="${T}" ${attrs}/>` + txt(160, y + 4, t, { a: 'start', s: 10.5 });
      return svg('0 0 340 150',
        fila(20, 'stroke-width="3"', 'Continua gruesa: contornos y aristas visibles') +
        fila(52, 'stroke-width="1.6" stroke-dasharray="8 5"', 'Discontinua (trazos): aristas ocultas') +
        fila(84, 'stroke-width="1.3" stroke-dasharray="18 4 2 4"', 'Trazo y punto: ejes y centros') +
        fila(116, 'stroke-width="1"', 'Continua fina: cotas, auxiliares, rayado')
      );
    },

    // Partes de una cota
    cotas: () =>
      svg('0 0 300 150',
        `<rect x="70" y="60" width="160" height="60" fill="#E8EEF4" stroke="${T}" stroke-width="2.6"/>` +
        `<line x1="70" y1="56" x2="70" y2="18" stroke="${T}" stroke-width="1"/><line x1="230" y1="56" x2="230" y2="18" stroke="${T}" stroke-width="1"/>` +
        flecha(150, 28, 72, 28, T, 1.2) + flecha(150, 28, 228, 28, T, 1.2) +
        txt(150, 23, '160', { s: 13, w: 700 }) +
        txt(40, 22, 'Línea auxiliar', { s: 9.5, c: A }) + `<line x1="40" y1="26" x2="68" y2="38" stroke="${A}" stroke-width="1"/>` +
        txt(262, 48, 'Línea de cota', { s: 9.5, c: A }) + `<line x1="248" y1="44" x2="212" y2="30" stroke="${A}" stroke-width="1"/>` +
        txt(150, 142, 'La cifra siempre es la medida REAL (mm), aunque el dibujo esté a escala', { s: 9 })
      ),

    // Clases de palancas
    palancas: () => {
      const pal = (x, orden, t) => {
        // orden: posiciones [fulcro, potencia, resistencia] a lo largo de la barra (0..1)
        const L = 92, y = 52;
        const pos = (f) => x + f * L;
        const [f, p, r] = orden;
        return `<line x1="${x}" y1="${y}" x2="${x + L}" y2="${y}" stroke="${T}" stroke-width="4"/>` +
          `<path d="M${pos(f) - 8},${y + 15}L${pos(f) + 8},${y + 15}L${pos(f)},${y + 2}Z" fill="${A}"/>` +
          flecha(pos(p), y - 30, pos(p), y - 4, N, 2.4) + txt(pos(p), y - 33, 'P', { s: 11, c: N }) +
          `<rect x="${pos(r) - 8}" y="${y - 18}" width="16" height="14" fill="#C9D6E3" stroke="${T}"/>` + txt(pos(r), y - 21, 'R', { s: 11 }) +
          txt(x + L / 2, y + 34, t, { s: 10.5 });
      };
      return svg('0 0 340 100',
        pal(10, [0.5, 0.05, 0.95], '1er género') +
        pal(124, [0.02, 0.97, 0.55], '2º género') +
        pal(238, [0.02, 0.5, 0.97], '3er género') +
        txt(170, 98, 'F = fulcro (apoyo) · P = potencia (fuerza) · R = resistencia (carga)', { s: 8.5 })
      );
    },

    // Transmisión por engranes
    engranes: () =>
      svg('0 0 300 160',
        `<path d="${ENG.rutaEngrane(95, 80, 40, 33, 10)}" fill="${N}" stroke="${T}" stroke-width="1"/><circle cx="95" cy="80" r="7" fill="#fff" stroke="${T}"/>` +
        `<path transform="rotate(9 179 80)" d="${ENG.rutaEngrane(179, 80, 52, 45, 20)}" fill="#C9D6E3" stroke="${T}" stroke-width="1"/><circle cx="179" cy="80" r="8" fill="#fff" stroke="${T}"/>` +
        txt(95, 140, 'Motriz Z₁ = 10', { s: 11, c: N }) + txt(185, 150, 'Conducido Z₂ = 20', { s: 11 }) +
        `<path d="M70,30 A40,40 0 0 1 120,30" fill="none" stroke="${N}" stroke-width="2"/><path d="M120,30 l-9,-3 l3,9z" fill="${N}"/>` +
        `<path d="M210,20 A55,55 0 0 0 150,20" fill="none" stroke="${T}" stroke-width="2"/><path d="M150,20 l9,-3 l-3,9z" fill="${T}"/>` +
        txt(265, 70, 'n₁·Z₁ = n₂·Z₂', { s: 11, c: A }) + txt(265, 88, 'Giran en', { s: 9.5 }) + txt(265, 100, 'sentido contrario', { s: 9.5 })
      ),

    // Mecanismo de cuatro barras
    'cuatro-barras': () => {
      const A1 = [60, 130], B1 = [240, 130], C1 = [95, 60], D1 = [215, 45];
      const ln = (p, q, c, w = 5) => `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${c}" stroke-width="${w}"/>`;
      const pin = (p) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#fff" stroke="${T}" stroke-width="2"/>`;
      let ground = '';
      for (let x = 45; x < 260; x += 10) ground += `<line x1="${x}" y1="142" x2="${x - 8}" y2="152" stroke="${T}" stroke-width="1"/>`;
      return svg('0 0 300 165',
        `<line x1="40" y1="142" x2="262" y2="142" stroke="${T}" stroke-width="2"/>` + ground +
        `<path d="M50,142L60,130L70,142Z" fill="${T}"/><path d="M230,142L240,130L250,142Z" fill="${T}"/>` +
        ln(A1, C1, N) + ln(C1, D1, A) + ln(B1, D1, '#7A8B9C') +
        pin(A1) + pin(B1) + pin(C1) + pin(D1) +
        txt(55, 92, 'Manivela', { s: 10, c: N, a: 'end' }) + txt(55, 104, '(motriz)', { s: 9, c: N, a: 'end' }) +
        txt(155, 42, 'Acoplador / biela (conector)', { s: 10, c: A }) +
        txt(262, 90, 'Balancín', { s: 10, a: 'start' }) + txt(262, 102, '(conducido)', { s: 9, a: 'start' }) +
        txt(150, 162, 'Bancada (eslabón fijo)', { s: 10 })
      );
    },

    // Biela–manivela–corredera
    'biela-manivela': () =>
      svg('0 0 320 130',
        `<circle cx="70" cy="65" r="38" fill="none" stroke="${T}" stroke-dasharray="4 4" stroke-width="1"/>` +
        `<line x1="70" y1="65" x2="97" y2="38" stroke="${N}" stroke-width="6"/>` +
        `<line x1="97" y1="38" x2="225" y2="65" stroke="${A}" stroke-width="5"/>` +
        `<rect x="215" y="50" width="44" height="30" rx="3" fill="#C9D6E3" stroke="${T}" stroke-width="1.6"/>` +
        `<line x1="200" y1="47" x2="300" y2="47" stroke="${T}" stroke-width="2"/><line x1="200" y1="83" x2="300" y2="83" stroke="${T}" stroke-width="2"/>` +
        `<circle cx="70" cy="65" r="5" fill="#fff" stroke="${T}" stroke-width="2"/><circle cx="97" cy="38" r="4" fill="#fff" stroke="${T}" stroke-width="2"/><circle cx="225" cy="65" r="4" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        txt(70, 122, 'Manivela (gira)', { s: 10, c: N }) + txt(160, 30, 'Biela', { s: 10, c: A }) + txt(255, 108, 'Corredera (va y viene)', { s: 10 }) +
        flecha(235, 98, 290, 98, T, 1.5) + flecha(275, 98, 220, 98, T, 1.5)
      ),

    // ── Símbolos ISO 1219 ──
    'cil-de': () =>
      svg('0 0 220 90',
        `<rect x="30" y="20" width="130" height="40" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        `<line x1="70" y1="20" x2="70" y2="60" stroke="${T}" stroke-width="4"/><line x1="70" y1="40" x2="205" y2="40" stroke="${T}" stroke-width="4"/>` +
        `<line x1="45" y1="60" x2="45" y2="78" stroke="${T}" stroke-width="2"/><line x1="145" y1="60" x2="145" y2="78" stroke="${T}" stroke-width="2"/>`
      , '90px'),
    'cil-se': () =>
      svg('0 0 220 90',
        `<rect x="30" y="20" width="130" height="40" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        `<line x1="70" y1="20" x2="70" y2="60" stroke="${T}" stroke-width="4"/><line x1="70" y1="40" x2="205" y2="40" stroke="${T}" stroke-width="4"/>` +
        resorte(74, 30, 156, 6, 8) +
        `<line x1="45" y1="60" x2="45" y2="78" stroke="${T}" stroke-width="2"/>`
      , '90px'),
    v32: () => {
      // posición izquierda = accionada (1→2, 3 bloqueado); derecha = reposo (2→3, 1 bloqueado)
      const bx = 70, by = 20, w = 50, h = 50;
      const tapon = (x, y) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 9}" stroke="${T}" stroke-width="1.6"/><line x1="${x - 6}" y1="${y - 9}" x2="${x + 6}" y2="${y - 9}" stroke="${T}" stroke-width="1.6"/>`;
      return svg('0 0 260 110',
        `<rect x="${bx}" y="${by}" width="${w}" height="${h}" fill="#fff" stroke="${T}" stroke-width="1.8"/><rect x="${bx + w}" y="${by}" width="${w}" height="${h}" fill="#fff" stroke="${T}" stroke-width="1.8"/>` +
        flecha(bx + 15, by + h, bx + 15, by + 3, T, 1.6) + tapon(bx + 35, by + h) +
        flecha(bx + w + 15, by, bx + w + 35, by + h - 3, T, 1.6) + tapon(bx + w + 15, by + h) +
        // pulsador
        `<line x1="${bx}" y1="${by + 25}" x2="${bx - 22}" y2="${by + 25}" stroke="${T}" stroke-width="1.6"/><path d="M${bx - 22},${by + 13} A12,12 0 0 0 ${bx - 22},${by + 37}" fill="none" stroke="${T}" stroke-width="2"/>` +
        // resorte
        resorte(bx + 2 * w, by + 25, bx + 2 * w + 30, 7, 6) +
        // líneas de puertos (debajo/arriba de la posición de reposo)
        `<line x1="${bx + w + 15}" y1="${by}" x2="${bx + w + 15}" y2="${by - 12}" stroke="${T}" stroke-width="1.6"/>` +
        `<line x1="${bx + w + 15}" y1="${by + h}" x2="${bx + w + 15}" y2="${by + h + 12}" stroke="${T}" stroke-width="1.6"/>` +
        `<line x1="${bx + w + 35}" y1="${by + h}" x2="${bx + w + 35}" y2="${by + h + 12}" stroke="${T}" stroke-width="1.6"/>` +
        txt(bx + w + 25, by - 4, '2', { s: 10 }) + txt(bx + w + 8, by + h + 22, '1', { s: 10 }) + txt(bx + w + 42, by + h + 22, '3', { s: 10 })
      , '110px');
    },
    v52: () => {
      const bx = 70, by = 20, w = 60, h = 50;
      const tapon = (x, y) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 9}" stroke="${T}" stroke-width="1.6"/><line x1="${x - 5}" y1="${y - 9}" x2="${x + 5}" y2="${y - 9}" stroke="${T}" stroke-width="1.6"/>`;
      const puerto = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${T}" stroke-width="1.6"/>`;
      return svg('0 0 290 116',
        `<rect x="${bx}" y="${by}" width="${w}" height="${h}" fill="#fff" stroke="${T}" stroke-width="1.8"/><rect x="${bx + w}" y="${by}" width="${w}" height="${h}" fill="#fff" stroke="${T}" stroke-width="1.8"/>` +
        // accionada (izq): 1→4, 2→3, 5 bloqueado
        flecha(bx + 30, by + h, bx + 15, by + 3, T, 1.5) + flecha(bx + 45, by, bx + 50, by + h - 3, T, 1.5) + tapon(bx + 10, by + h) +
        // reposo (der): 1→2, 4→5, 3 bloqueado
        flecha(bx + w + 30, by + h, bx + w + 45, by + 3, T, 1.5) + flecha(bx + w + 15, by, bx + w + 10, by + h - 3, T, 1.5) + tapon(bx + w + 50, by + h) +
        puerto(bx + w + 15, by, by - 8) + puerto(bx + w + 45, by, by - 8) +
        puerto(bx + w + 10, by + h, by + h + 8) + puerto(bx + w + 30, by + h, by + h + 8) + puerto(bx + w + 50, by + h, by + h + 8) +
        // solenoide
        `<rect x="${bx - 26}" y="${by + 15}" width="18" height="20" fill="#fff" stroke="${T}" stroke-width="1.6"/><line x1="${bx - 26}" y1="${by + 35}" x2="${bx - 8}" y2="${by + 15}" stroke="${T}" stroke-width="1.4"/><line x1="${bx - 8}" y1="${by + 25}" x2="${bx}" y2="${by + 25}" stroke="${T}" stroke-width="1.6"/>` +
        resorte(bx + 2 * w, by + 25, bx + 2 * w + 30, 7, 6) +
        txt(bx + w + 22, by - 8, '4', { s: 10 }) + txt(bx + w + 52, by - 8, '2', { s: 10 }) +
        txt(bx + w + 10, by + h + 21, '5', { s: 10 }) + txt(bx + w + 30, by + h + 21, '1', { s: 10 }) + txt(bx + w + 50, by + h + 21, '3', { s: 10 })
      , '116px');
    },
    compresor: () =>
      svg('0 0 120 110',
        `<circle cx="60" cy="58" r="32" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        `<path d="M60,28 L49,47 L71,47 Z" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        `<line x1="60" y1="26" x2="60" y2="6" stroke="${T}" stroke-width="2"/>`
      , '100px'),
    bomba: () =>
      svg('0 0 120 110',
        `<circle cx="60" cy="58" r="32" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        `<path d="M60,28 L49,47 L71,47 Z" fill="${T}" stroke="${T}" stroke-width="2"/>` +
        `<line x1="60" y1="26" x2="60" y2="6" stroke="${T}" stroke-width="2"/><line x1="60" y1="90" x2="60" y2="104" stroke="${T}" stroke-width="2"/>`
      , '100px'),
    antirretorno: () =>
      svg('0 0 120 120',
        `<line x1="60" y1="8" x2="60" y2="112" stroke="${T}" stroke-width="2"/>` +
        // asiento en «V» y la bola apoyada dentro de él
        `<path d="M38,42 L60,74 L82,42" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        `<circle cx="60" cy="50" r="13" fill="#fff" stroke="${T}" stroke-width="2"/>`
      , '100px'),
    manometro: () =>
      svg('0 0 120 120',
        `<circle cx="60" cy="52" r="32" fill="#fff" stroke="${T}" stroke-width="2"/>` + flecha(38, 74, 82, 30, T, 1.8) +
        `<line x1="60" y1="84" x2="60" y2="112" stroke="${T}" stroke-width="2"/>`
      , '100px'),
    deposito: () =>
      svg('0 0 140 100',
        `<path d="M25,30 L25,80 L115,80 L115,30" fill="none" stroke="${T}" stroke-width="2.4"/>` +
        `<line x1="70" y1="5" x2="70" y2="62" stroke="${T}" stroke-width="2"/>`
      , '90px'),

    // Prensa hidráulica (Pascal)
    prensa: () =>
      svg('0 0 320 150',
        `<path d="M40,40 L40,120 L280,120 L280,40 M80,40 L80,95 L190,95 L190,40" fill="#D7E6F5" stroke="${T}" stroke-width="2"/>` +
        `<rect x="42" y="50" width="36" height="8" fill="${T}"/><rect x="192" y="45" width="86" height="10" fill="${T}"/>` +
        flecha(60, 8, 60, 46, N, 2.4) + txt(75, 20, 'F₁', { s: 13, c: N, a: 'start' }) +
        flecha(235, 42, 235, 6, N, 3) + txt(250, 22, 'F₂', { s: 13, c: N, a: 'start' }) +
        txt(60, 140, 'A₁ (chico)', { s: 10 }) + txt(235, 140, 'A₂ (grande)', { s: 10 }) +
        txt(160, 112, 'F₁/A₁ = F₂/A₂', { s: 12, c: A })
      ),

    // Fuerza de un cilindro
    'fuerza-cilindro': () =>
      svg('0 0 320 120',
        `<rect x="40" y="30" width="170" height="56" fill="#fff" stroke="${T}" stroke-width="2"/>` +
        `<rect x="40" y="31" width="80" height="54" fill="#D7E6F5"/>` +
        `<rect x="120" y="30" width="10" height="56" fill="${T}"/><line x1="130" y1="58" x2="270" y2="58" stroke="${T}" stroke-width="7"/>` +
        txt(80, 63, 'P', { s: 18, c: A, w: 800 }) + flecha(275, 58, 312, 58, N, 3) + txt(300, 48, 'F', { s: 15, c: N, w: 800 }) +
        txt(160, 108, 'F = P × A   ·   A = π·D² / 4', { s: 12, c: T })
      ),

    // Diagrama de escalera con enclavamiento
    escalera: () => {
      const na = (x, y, t) => `<line x1="${x}" y1="${y - 9}" x2="${x}" y2="${y + 9}" stroke="${T}" stroke-width="2"/><line x1="${x + 10}" y1="${y - 9}" x2="${x + 10}" y2="${y + 9}" stroke="${T}" stroke-width="2"/>` + txt(x + 5, y - 13, t, { s: 9 });
      const nc = (x, y, t) => na(x, y, t) + `<line x1="${x - 3}" y1="${y + 9}" x2="${x + 13}" y2="${y - 9}" stroke="${T}" stroke-width="1.6"/>`;
      const bob = (x, y, t) => `<circle cx="${x}" cy="${y}" r="10" fill="#fff" stroke="${T}" stroke-width="2"/>` + txt(x, y - 15, t, { s: 9 });
      const h = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${T}" stroke-width="1.6"/>`;
      return svg('0 0 330 160',
        `<line x1="20" y1="15" x2="20" y2="150" stroke="${T}" stroke-width="3"/><line x1="310" y1="15" x2="310" y2="150" stroke="${T}" stroke-width="3"/>` +
        txt(20, 11, '+24 V', { s: 9 }) + txt(310, 11, '0 V', { s: 9 }) +
        // renglón 1
        h(20, 50, 50) + nc(50, 50, 'PARO') + h(60, 100, 50) + na(100, 50, 'MARCHA') + h(110, 250, 50) + bob(260, 50, 'K1') + h(270, 310, 50) +
        `<line x1="90" y1="50" x2="90" y2="90" stroke="${T}" stroke-width="1.6"/><line x1="125" y1="50" x2="125" y2="90" stroke="${T}" stroke-width="1.6"/>` +
        h(90, 102, 90) + na(102, 90, 'K1') + h(112, 125, 90) +
        // renglón 2
        h(20, 100, 130) + na(100, 130, 'K1') + h(110, 250, 130) + `<rect x="250" y="120" width="22" height="20" fill="#fff" stroke="${T}" stroke-width="2"/><line x1="250" y1="140" x2="272" y2="120" stroke="${T}" stroke-width="1.4"/>` + txt(261, 114, 'Y1', { s: 9 }) + h(272, 310, 130) +
        txt(190, 82, '← enclavamiento (memoria)', { s: 9, c: N })
      );
    }
  };

  ENG.figura = (id) => (F[id] ? `<div class="figura">${F[id]()}</div>` : '');
  ENG.FIGURAS = F;
})();
