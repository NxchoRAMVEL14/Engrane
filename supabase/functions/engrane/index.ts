// Engrane · función «engrane» (Supabase Edge Function). Publicarla SIN «Verify JWT».
// Acciones (body.action):
//  - key:      llave pública para que el celular active las notificaciones (las llaves se crean solas la 1a vez).
//  - test:     notificación de prueba al celular que la pide (body.endpoint).
//  - aviso:    un maestro manda un aviso a alumnos y/o papás (requiere sesión de maestro).
//  - invitar:  el admin invita a un maestro por correo (requiere sesión de admin).
//  - crear_maestro: el admin crea la cuenta de un maestro con contraseña temporal (sin correo).
//  - cron:     recordatorios automáticos; la llama pg_cron cada 15 min (sql/engrane_notificaciones.sql).
// Mismo patrón que las funciones «avisos» y «recordatorios» de Remate.
import webpush from 'npm:web-push@3.6.7';
import { createClient } from 'npm:@supabase/supabase-js@2';

const VERSION = '2.2.0';
const TZ = 'America/Mexico_City';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
type Row = Record<string, any>;

const diaLocal = (d: Date | string) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(typeof d === 'string' ? new Date(d) : d);
function ahora() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).map((x) => [x.type, x.value]));
  const fecha = `${p.year}-${p.month}-${p.day}`;
  return { fecha, hora: +p.hour + +p.minute / 60, dow: new Date(`${fecha}T12:00:00Z`).getUTCDay() };
}
const sumarDias = (f: string, n: number) => { const t = new Date(`${f}T12:00:00Z`); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
const primerNombre = (s: string) => String(s || '').trim().split(/\s+/)[0] || '';

// ¿Este intento cumple la misión? (misma regla que en la app)
function cumple(m: Row, it: Row) {
  if (it.materia !== m.materia) return false;
  if (m.tema && it.tema !== m.tema) return false;
  if (m.modo !== 'cualquiera' && it.modo !== m.modo) return false;
  if (new Date(it.creado) < new Date(m.creado)) return false;
  if (m.modo === 'leccion' || m.modo === 'memorama') return true;
  return it.total > 0 && (it.aciertos / it.total) * 100 >= m.meta;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  try {
    const body = await req.json().catch(() => ({}));
    if (body?.ping) return json({ pong: true, version: VERSION });

    // Llave de servidor: la nueva (SUPABASE_SECRET_KEYS) si existe; si no, la clásica service_role.
    let secret = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    try { const k = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}'); if (k.default) secret = k.default; } catch { /* sin llaves nuevas */ }
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, secret, { auth: { persistSession: false, autoRefreshToken: false } });

    let { data: cfg } = await admin.from('eng_push_config').select('*').eq('id', 1).maybeSingle();
    if (!cfg) {
      const k = webpush.generateVAPIDKeys();
      await admin.from('eng_push_config').insert({ id: 1, public_key: k.publicKey, private_key: k.privateKey });
      ({ data: cfg } = await admin.from('eng_push_config').select('*').eq('id', 1).maybeSingle());
    }
    if (!cfg) return json({ error: 'No se pudieron crear las llaves. ¿Ya corriste sql/engrane.sql?' }, 500);
    if (body.action === 'key') return json({ publicKey: cfg.public_key });
    webpush.setVapidDetails('mailto:avisos@engrane.app', cfg.public_key, cfg.private_key);

    const enviar = async (subs: Row[], payload: Row, ttl = 60 * 60 * 12) => {
      if (!subs.length) return { sent: 0, failed: 0, removed: 0 };
      const txt = JSON.stringify(payload);
      const res = await Promise.allSettled(subs.map((s) => webpush.sendNotification({ endpoint: s.endpoint, keys: s.keys }, txt, { TTL: ttl })));
      const dead = subs.filter((_, i) => { const r = res[i]; return r.status === 'rejected' && [404, 410].includes((r.reason as { statusCode?: number })?.statusCode ?? 0); }).map((s) => s.id);
      if (dead.length) await admin.from('eng_push_subs').delete().in('id', dead);
      return { sent: res.filter((r) => r.status === 'fulfilled').length, failed: res.filter((r) => r.status === 'rejected').length, removed: dead.length };
    };

    if (body.action === 'test') {
      const { data: s } = await admin.from('eng_push_subs').select('*').eq('endpoint', String(body.endpoint || ''));
      if (!s?.length) return json({ sent: 0, error: 'Este celular todavía no está registrado.' });
      return json(await enviar(s, { title: 'Engrane ⚙', body: '¡Listo! Las notificaciones funcionan en este celular.', url: './#/inicio' }, 600));
    }

    if (body.action === 'aviso' || body.action === 'invitar' || body.action === 'crear_maestro') {
      const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
      const { data: au } = await admin.auth.getUser(token);
      const user = au?.user;
      if (!user) return json({ error: 'Tu sesión terminó. Vuelve a entrar.' }, 401);
      const { data: perfil } = await admin.from('eng_perfiles').select('*').eq('id', user.id).maybeSingle();
      if (!perfil || !['admin', 'maestro'].includes(perfil.rol)) return json({ error: 'Solo maestros aprobados.' }, 403);

      if (body.action === 'invitar') {
        if (perfil.rol !== 'admin') return json({ error: 'Solo el administrador puede invitar.' }, 403);
        const correo = String(body.correo || '').trim().toLowerCase();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return json({ error: 'Correo no válido.' }, 400);
        const materias = Array.isArray(body.materias) ? body.materias.map(String).slice(0, 12) : [];
        const nombre = String(body.nombre || '').slice(0, 80);
        const { data: inv, error } = await admin.auth.admin.inviteUserByEmail(correo, { redirectTo: String(body.url || ''), data: { nombre, materias } });
        if (error) return json({ error: error.message }, 400);
        if (inv?.user?.id) {
          await admin.from('eng_perfiles').upsert({ id: inv.user.id, nombre, correo, rol: 'maestro', materias, materias_solicitadas: materias }, { onConflict: 'id' });
        }
        return json({ ok: true });
      }

      if (body.action === 'crear_maestro') {
        if (perfil.rol !== 'admin') return json({ error: 'Solo el administrador puede crear cuentas.' }, 403);
        const correo = String(body.correo || '').trim().toLowerCase();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return json({ error: 'Correo no válido.' }, 400);
        const materias = Array.isArray(body.materias) ? body.materias.map(String).slice(0, 12) : [];
        const nombre = String(body.nombre || '').slice(0, 80);
        // Contraseña temporal fácil de dictar: Engrane-XXXX-99
        const letras = 'ABCDEFGHJKMNPQRSTUVWXYZ';
        const rnd = crypto.getRandomValues(new Uint32Array(6));
        const password = `Engrane-${[0, 1, 2, 3].map((i) => letras[rnd[i] % letras.length]).join('')}-${10 + (rnd[4] % 90)}`;
        const meta = { nombre, materias, temporal: true };
        // ¿Ya existe? (p. ej. una invitación por correo que nunca llegó)
        let existente: Row | null = null;
        for (let page = 1; page <= 20 && !existente; page++) {
          const { data: lista, error: e1 } = await admin.auth.admin.listUsers({ page, perPage: 200 });
          if (e1) return json({ error: e1.message }, 400);
          existente = (lista?.users || []).find((u: Row) => (u.email || '').toLowerCase() === correo) || null;
          if (!lista?.users?.length || lista.users.length < 200) break;
        }
        let id: string;
        if (existente) {
          if (existente.id === user.id) return json({ error: 'Esa es tu propia cuenta.' }, 400);
          const { error: e2 } = await admin.auth.admin.updateUserById(existente.id, { password, email_confirm: true, user_metadata: { ...(existente.user_metadata || {}), ...meta } });
          if (e2) return json({ error: e2.message }, 400);
          id = existente.id;
        } else {
          const { data: nuevo, error: e3 } = await admin.auth.admin.createUser({ email: correo, password, email_confirm: true, user_metadata: meta });
          if (e3) return json({ error: e3.message }, 400);
          id = nuevo.user.id;
        }
        const { data: yaPerfil } = await admin.from('eng_perfiles').select('rol').eq('id', id).maybeSingle();
        const rol = yaPerfil?.rol === 'admin' ? 'admin' : 'maestro';
        await admin.from('eng_perfiles').upsert({ id, nombre, correo, rol, materias, materias_solicitadas: materias }, { onConflict: 'id' });
        return json({ ok: true, password, nuevo: !existente });
      }

      // aviso
      const materia = body.materia ? String(body.materia) : null;
      if (perfil.rol === 'maestro' && (!materia || !(perfil.materias || []).includes(materia))) return json({ error: 'No tienes esa materia.' }, 403);
      const { data: als } = await admin.from('eng_alumnos').select('id, materias').eq('activo', true);
      let ids = (als || []).filter((a: Row) => !materia || (a.materias || []).includes(materia)).map((a: Row) => a.id);
      if (Array.isArray(body.alumnos) && body.alumnos.length) ids = ids.filter((id: string) => body.alumnos.includes(id));
      if (!ids.length) return json({ sent: 0, failed: 0, removed: 0 });
      const roles = body.para === 'papas' ? ['papas'] : body.para === 'alumnos' ? ['alumno'] : ['alumno', 'papas'];
      const { data: subs } = await admin.from('eng_push_subs').select('*').in('alumno_id', ids).in('rol', roles);
      return json(await enviar(subs || [], { title: String(body.titulo || 'Engrane').slice(0, 80), body: String(body.texto || '').slice(0, 300), url: String(body.url || './#/inicio').slice(0, 200) }, 60 * 60 * 24));
    }

    if (body.action === 'cron' || body.source === 'cron') {
      const { fecha, hora, dow } = ahora();
      const ayer = sumarDias(fecha, -1), manana = sumarDias(fecha, 1);
      // Latido: actividad en la base para que el proyecto gratis no se pause
      await admin.rpc('eng_latido');
      const { data: subs } = await admin.from('eng_push_subs').select('*');
      if (!subs?.length) return json({ ok: true, nota: 'Nadie ha activado notificaciones todavía.' });
      const { data: als } = await admin.from('eng_alumnos').select('id, nombre, apodo, materias').eq('activo', true);
      const { data: ints } = await admin.from('eng_intentos').select('alumno_id, materia, tema, modo, aciertos, total, segundos, creado')
        .gte('creado', new Date(Date.now() - 40 * 864e5).toISOString()).limit(20000);
      const porAlumno = new Map<string, Row[]>();
      for (const it of ints || []) { const l = porAlumno.get(it.alumno_id) || []; l.push(it); porAlumno.set(it.alumno_id, l); }
      const dias = (id: string) => new Set((porAlumno.get(id) || []).map((it) => diaLocal(it.creado)));
      const subsDe = (id: string, rol: string) => subs.filter((s: Row) => s.alumno_id === id && s.rol === rol);
      const reclamar = async (clave: string) => !(await admin.from('eng_recordatorios').insert({ clave })).error;
      const out: Row[] = [];

      // 1) Racha en riesgo (7 a 9 pm)
      if (hora >= 19 && hora < 21) {
        for (const a of als || []) {
          const d = dias(a.id);
          if (d.has(fecha) || !d.has(ayer)) continue;
          const s = subsDe(a.id, 'alumno');
          if (!s.length || !(await reclamar(`racha|${a.id}|${fecha}`))) continue;
          let n = 0, x = ayer;
          while (d.has(x)) { n++; x = sumarDias(x, -1); }
          const r = await enviar(s, { title: `🔥 Racha de ${n} día${n === 1 ? '' : 's'}`, body: `${a.apodo}, unos minutos de Engrane hoy y no la pierdes. ¡Tú puedes!`, url: './#/inicio' }, 60 * 60 * 5);
          out.push({ tipo: 'racha', alumno: a.id, ...r });
        }
      }

      // 2) Misiones que vencen mañana y no están cumplidas (4 a 8 pm)
      if (hora >= 16 && hora < 20) {
        const { data: ms } = await admin.from('eng_misiones').select('*').eq('fecha_limite', manana);
        for (const m of ms || []) {
          for (const a of als || []) {
            if (!(a.materias || []).includes(m.materia)) continue;
            if (Array.isArray(m.alumnos) && m.alumnos.length && !m.alumnos.includes(a.id)) continue;
            if ((porAlumno.get(a.id) || []).some((it) => cumple(m, it))) continue;
            const s = subsDe(a.id, 'alumno');
            if (!s.length || !(await reclamar(`mision|${m.id}|${a.id}`))) continue;
            const r = await enviar(s, { title: '🎯 Tu misión vence mañana', body: m.titulo, url: './#/inicio' }, 60 * 60 * 12);
            out.push({ tipo: 'mision', alumno: a.id, ...r });
          }
        }
      }

      // 2b) Exámenes en 3 días y mañana (4 a 8 pm): alumno y papás
      if (hora >= 16 && hora < 20) {
        const en3 = sumarDias(fecha, 3);
        const { data: exs } = await admin.from('eng_examenes').select('*').in('fecha', [manana, en3]);
        for (const e of exs || []) {
          const cuando = e.fecha === manana ? 'mañana' : 'en 3 días';
          for (const a of als || []) {
            if (!(a.materias || []).includes(e.materia)) continue;
            if (Array.isArray(e.alumnos) && e.alumnos.length && !e.alumnos.includes(a.id)) continue;
            const sa = subsDe(a.id, 'alumno');
            if (sa.length && (await reclamar(`examen|${e.id}|${a.id}|${e.fecha === manana ? 1 : 3}`))) {
              const r = await enviar(sa, { title: `📅 Examen ${cuando}`, body: `${e.titulo}. Entra a tu Repaso intensivo: 10 minutos hoy cuentan.`, url: './#/inicio' }, 60 * 60 * 12);
              out.push({ tipo: 'examen', alumno: a.id, ...r });
            }
            const sp = subsDe(a.id, 'papas');
            if (e.fecha === manana && sp.length && (await reclamar(`examen-papas|${e.id}|${a.id}`))) {
              const r = await enviar(sp, { title: '📅 Examen mañana', body: `${primerNombre(a.nombre)} tiene «${e.titulo}» mañana. Un repaso hoy en Engrane le ayuda.`, url: './#/inicio' }, 60 * 60 * 12);
              out.push({ tipo: 'examen-papas', alumno: a.id, ...r });
            }
          }
        }
      }

      // 3) Domingo 6 a 8 pm: resumen a los papás
      if (dow === 0 && hora >= 18 && hora < 20) {
        const lunes = sumarDias(fecha, -6);
        for (const a of als || []) {
          const s = subsDe(a.id, 'papas');
          if (!s.length || !(await reclamar(`semana|${a.id}|${fecha}`))) continue;
          const sem = (porAlumno.get(a.id) || []).filter((it) => diaLocal(it.creado) >= lunes);
          const nd = new Set(sem.map((it) => diaLocal(it.creado))).size;
          const min = Math.round(sem.reduce((t, it) => t + (it.segundos || 0), 0) / 60);
          const txt = nd ? `${primerNombre(a.nombre)} practicó ${nd} día${nd === 1 ? '' : 's'} esta semana (${min} min). Toquen para ver su reporte.`
            : `${primerNombre(a.nombre)} no practicó esta semana. Unos minutos al día hacen la diferencia.`;
          const r = await enviar(s, { title: 'Engrane · resumen de la semana', body: txt, url: './#/inicio' }, 60 * 60 * 24);
          out.push({ tipo: 'semana', alumno: a.id, ...r });
        }
      }

      // 4) Lunes 7:30 a 11 am: resumen a los maestros
      if (dow === 1 && hora >= 7.5 && hora < 11) {
        const ms = subs.filter((s: Row) => s.rol === 'maestro');
        if (ms.length && (await reclamar(`maestros|${fecha}`))) {
          const desde = sumarDias(fecha, -7);
          const activos = (als || []).filter((a: Row) => [...dias(a.id)].some((d) => d >= desde && d < fecha)).length;
          const r = await enviar(ms, { title: 'Engrane · tu lunes', body: `La semana pasada practicaron ${activos} de ${(als || []).length} alumnos. Revisa quién necesita un empujón.`, url: './#/m/recordatorios' }, 60 * 60 * 8);
          out.push({ tipo: 'maestros', ...r });
        }
      }
      return json({ ok: true, version: VERSION, enviados: out });
    }

    return json({ error: 'Acción desconocida' }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});
