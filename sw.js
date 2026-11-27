// ENGRANE · service worker: la app abre y funciona aunque no haya internet
// Cada vez que subas cambios, sube también este archivo con un número de versión nuevo.
const VERSION = 'engrane-v2.4.0';
const ARCHIVOS = [
  './', 'index.html', 'config.js', 'manifest.webmanifest', 'css/engrane.css',
  'js/util.js', 'js/apodos.js', 'js/api.js', 'js/progreso.js', 'js/figuras.js', 'js/motor.js',
  'js/vistas-alumno.js', 'js/vistas-papas.js', 'js/vistas-maestro.js', 'js/fase2.js', 'js/editor.js', 'js/clase.js', 'js/tanda1.js', 'js/tanda2.js', 'js/tanda3.js', 'js/app.js',
  'contenido/catalogo.js', 'contenido/ingles3.js', 'contenido/modulo2.js', 'contenido/lengua3.js', 'contenido/matematico3.js',
  'contenido/ciencias3.js', 'contenido/filosofico2.js',
  'contenido/ingles4.js', 'contenido/modulo3.js', 'contenido/matematico4.js', 'contenido/ciencias4.js', 'contenido/sociales3.js', 'contenido/historica1.js',
  'img/favicon.png', 'img/logo-app.png', 'img/icon-192.png', 'img/icon-512.png'
];
const LIB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then(async (c) => {
      await c.addAll(ARCHIVOS);
      try { await c.add(new Request(LIB, { mode: 'no-cors' })); } catch (err) {}
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Datos de Supabase: siempre a la red
  if (url.hostname.endsWith('supabase.co')) return;
  // Archivos de la app: primero red (para recibir cambios), si falla usa la copia guardada
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        if (r && (r.ok || r.type === 'opaque')) {
          const copia = r.clone();
          caches.open(VERSION).then((c) => c.put(e.request, copia));
        }
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});

// ── Notificaciones (Web Push) ──
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Engrane', {
    body: d.body || '', icon: 'img/icon-192.png', badge: 'img/favicon.png', tag: d.tag || undefined,
    data: { url: d.url || './#/inicio' }
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
    for (const w of ws) {
      if (w.url.startsWith(self.registration.scope) && 'focus' in w) { w.navigate(url).catch(() => {}); return w.focus(); }
    }
    return self.clients.openWindow(url);
  }));
});
