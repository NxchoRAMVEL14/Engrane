// ENGRANE · utilidades comunes
(function () {
  const ENG = (window.ENG = window.ENG || {});
  ENG.VERSION = '2.1.1';
  const TZ = 'America/Mexico_City';

  ENG.$ = (sel, root = document) => root.querySelector(sel);
  ENG.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  ENG.esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  ENG.barajar = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  ENG.azar = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ── Fechas (siempre en hora del centro de México) ──
  const fmtDia = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  ENG.diaLocal = (d) => fmtDia.format(d instanceof Date ? d : new Date(d));
  ENG.hoy = () => ENG.diaLocal(new Date());
  ENG.sumarDias = (ymd, n) => {
    const [y, m, d] = ymd.split('-').map(Number);
    const f = new Date(Date.UTC(y, m - 1, d + n));
    return f.toISOString().slice(0, 10);
  };
  ENG.lunesDeEstaSemana = () => {
    const hoy = ENG.hoy();
    const [y, m, d] = hoy.split('-').map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 domingo
    return ENG.sumarDias(hoy, -((dow + 6) % 7));
  };
  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  ENG.fechaCorta = (x) => {
    if (!x) return '—';
    const ymd = x.length === 10 ? x : ENG.diaLocal(x);
    const [y, m, d] = ymd.split('-').map(Number);
    return `${d} ${MESES[m - 1]}`;
  };
  ENG.diaSemana = (ymd) => {
    const [y, m, d] = ymd.split('-').map(Number);
    return DIAS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  };
  ENG.hace = (iso) => {
    if (!iso) return 'nunca';
    const dias = Math.round((Date.parse(ENG.hoy()) - Date.parse(ENG.diaLocal(iso))) / 864e5);
    if (dias <= 0) return 'hoy';
    if (dias === 1) return 'ayer';
    if (dias < 7) return `hace ${dias} días`;
    if (dias < 14) return 'hace 1 semana';
    return `hace ${Math.floor(dias / 7)} semanas`;
  };
  ENG.minutos = (seg) => {
    const m = Math.round((seg || 0) / 60);
    if (m < 60) return `${m} min`;
    return `${Math.floor(m / 60)} h ${m % 60} min`;
  };

  // ── Almacenamiento local seguro ──
  ENG.ls = {
    get(k, def = null) {
      try {
        const v = localStorage.getItem(k);
        return v == null ? def : JSON.parse(v);
      } catch (e) {
        return def;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch (e) {}
    },
    del(k) {
      try {
        localStorage.removeItem(k);
      } catch (e) {}
    }
  };

  // ── Normalizar respuestas escritas ──
  ENG.normaliza = (s) =>
    String(s ?? '')
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/[“”]/g, '"')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[.!?¡¿,;:]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  ENG.numero = (s) => {
    const t = String(s ?? '').trim().replace(/\s/g, '').replace(',', '.');
    if (!/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i.test(t)) return NaN;
    return parseFloat(t);
  };
  ENG.formatoCodigo = (c) => (c ? String(c).replace(/(.{3})(.{3})/, '$1 $2') : '');
  ENG.normCodigo = (c) => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

  // ── Avisos ──
  ENG.toast = (msg, tipo = '') => {
    const box = document.getElementById('toasts');
    if (!box) return alert(msg);
    const t = document.createElement('div');
    t.className = 'toast ' + tipo;
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(() => t.classList.add('fuera'), 2800);
    setTimeout(() => t.remove(), 3300);
  };

  ENG.modal = ({ titulo = '', html = '', botones = [{ txt: 'Cerrar' }], cerrable = true, clase = '' }) => {
    const fondo = document.createElement('div');
    fondo.className = 'modal-fondo';
    fondo.innerHTML = `<div class="modal ${clase}" role="dialog" aria-modal="true">
      ${titulo ? `<h3>${titulo}</h3>` : ''}
      <div class="modal-cuerpo">${html}</div>
      <div class="modal-botones"></div></div>`;
    const cerrar = () => fondo.remove();
    const cont = fondo.querySelector('.modal-botones');
    botones.forEach((b) => {
      const el = document.createElement('button');
      el.className = 'btn ' + (b.clase || 'sec');
      el.textContent = b.txt;
      el.onclick = async () => {
        if (b.fn) {
          const r = await b.fn(fondo);
          if (r === false) return;
        }
        cerrar();
      };
      cont.appendChild(el);
    });
    if (cerrable) fondo.addEventListener('click', (e) => e.target === fondo && cerrar());
    document.body.appendChild(fondo);
    const primero = fondo.querySelector('input,select,textarea');
    if (primero) setTimeout(() => primero.focus(), 50);
    return { cerrar, el: fondo };
  };

  ENG.confirmar = (msg, si = 'Sí', no = 'Cancelar') =>
    new Promise((res) => {
      ENG.modal({
        html: `<p>${msg}</p>`,
        botones: [
          { txt: no, clase: 'sec', fn: () => res(false) },
          { txt: si, clase: 'pri', fn: () => res(true) }
        ],
        cerrable: false
      });
    });

  ENG.copiar = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      ENG.toast('Copiado ✔', 'ok');
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        ENG.toast('Copiado ✔', 'ok');
      } catch (e2) {
        ENG.toast('No se pudo copiar', 'mal');
      }
      ta.remove();
    }
  };

  ENG.whatsapp = (texto, tel = '') => {
    const url = `https://wa.me/${tel}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  ENG.urlApp = () => {
    const c = (window.ENGRANE_CONFIG || {}).APP_URL;
    if (c) return c.replace(/\/?$/, '/');
    return location.origin + location.pathname.replace(/index\.html$/, '');
  };

  // ── Engrane dibujado (para insignias de nivel y adornos) ──
  ENG.rutaEngrane = (cx, cy, rExt, rInt, dientes) => {
    const pts = [];
    const paso = (2 * Math.PI) / dientes;
    for (let i = 0; i < dientes; i++) {
      const a = i * paso - Math.PI / 2;
      const base = paso * 0.56,
        punta = paso * 0.34;
      pts.push([rInt, a - base / 2], [rExt, a - punta / 2], [rExt, a + punta / 2], [rInt, a + base / 2]);
    }
    return 'M' + pts.map(([r, a]) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`).join('L') + 'Z';
  };
  ENG.engraneSVG = ({ tam = 56, color = 'var(--naranja)', centro = 'var(--tinta)', texto = '', dientes = 10, clase = '' } = {}) => {
    const r = 50;
    return `<svg class="engrane-svg ${clase}" viewBox="0 0 100 100" width="${tam}" height="${tam}" aria-hidden="true">
      <path d="${ENG.rutaEngrane(r, r, 49, 39, dientes)}" fill="${color}"/>
      <circle cx="50" cy="50" r="29" fill="${centro}"/>
      ${texto !== '' ? `<text x="50" y="51" text-anchor="middle" dominant-baseline="central" font-size="${String(texto).length > 2 ? 22 : 30}" font-weight="800" fill="#fff" font-family="inherit">${ENG.esc(texto)}</text>` : `<circle cx="50" cy="50" r="10" fill="${color}"/>`}
    </svg>`;
  };

  // ── Sonidos cortos (se pueden apagar) ──
  let ctxAudio = null;
  ENG.sonidoActivo = () => ENG.ls.get('eng_sonido', true);
  ENG.sonido = (tipo) => {
    if (!ENG.sonidoActivo()) return;
    try {
      ctxAudio = ctxAudio || new (window.AudioContext || window.webkitAudioContext)();
      const notas = { ok: [660, 880], mal: [220, 180], nivel: [523, 659, 784, 1047], fin: [523, 784] }[tipo] || [440];
      notas.forEach((f, i) => {
        const o = ctxAudio.createOscillator();
        const g = ctxAudio.createGain();
        o.type = tipo === 'mal' ? 'square' : 'triangle';
        o.frequency.value = f;
        const t0 = ctxAudio.currentTime + i * 0.09;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
        o.connect(g).connect(ctxAudio.destination);
        o.start(t0);
        o.stop(t0 + 0.18);
      });
    } catch (e) {}
  };
  ENG.vibrar = (ms = 30) => {
    try {
      navigator.vibrate && navigator.vibrate(ms);
    } catch (e) {}
  };

  // ── Voz (para escuchar inglés) ──
  ENG.hablar = (texto, lang = 'en-US', lento = false) => {
    if (!('speechSynthesis' in window)) {
      ENG.toast('Tu navegador no puede leer en voz alta', 'mal');
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = lang;
    u.rate = lento ? 0.7 : 0.92;
    const voces = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2)));
    const pref = voces.find((v) => v.lang === lang) || voces[0];
    if (pref) u.voice = pref;
    speechSynthesis.speak(u);
  };
  if ('speechSynthesis' in window) speechSynthesis.getVoices();

  ENG.cargandoHTML = (txt = 'Cargando…') => `<div class="cargando">${ENG.engraneSVG({ tam: 54, clase: 'gira' })}<p>${txt}</p></div>`;
})();
