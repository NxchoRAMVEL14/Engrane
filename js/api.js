// ENGRANE · conexión con Supabase (y modo demo sin internet)
(function () {
  const ENG = window.ENG;
  const cfg = window.ENGRANE_CONFIG || {};
  let sb = null;
  let modo = 'supabase';

  const ERRORES = {
    CODIGO_INVALIDO: 'Ese código no existe o está desactivado. Revísalo con tu profe.',
    SIN_ACCESO: 'No tienes permiso para esto.',
    SIN_SESION: 'Tu sesión terminó. Vuelve a entrar.',
    FALTA_NOMBRE: 'Falta el nombre.',
    NO_PUEDES_QUITARTE_ADMIN: 'No puedes quitarte el rol de administrador.',
    FALTA_TITULO: 'Escribe un título.',
    ELIGE_MATERIA: 'Elige una materia.',
    SALA_NO_EXISTE: 'No encontré una clase abierta con ese PIN.',
    YA_GUARDADA: 'Los resultados de esta clase ya se guardaron.',
    DATOS_INVALIDOS: 'Revisa los datos de la pregunta.',
    SUSCRIPCION_INVALIDA: 'No se pudo registrar este celular.',
    DEMASIADOS: 'Ya mandaste muchos reportes hoy. ¡Gracias! Mañana puedes mandar más.',
    'Invalid login credentials': 'Correo o contraseña incorrectos.',
    'Email not confirmed': 'Falta confirmar tu correo: revisa tu bandeja (y spam).',
    'User already registered': 'Ese correo ya tiene cuenta. Usa "Entrar".'
  };
  function traducir(err) {
    const msg = (err && (err.message || err.error_description || err.msg)) || String(err);
    const offline = !navigator.onLine || /Failed to fetch|NetworkError|Load failed|fetch/i.test(msg);
    for (const k in ERRORES) if (msg.includes(k)) return Object.assign(new Error(ERRORES[k]), { codigo: k });
    if (offline) return Object.assign(new Error('Sin conexión a internet.'), { offline: true });
    if (/Password should be/i.test(msg)) return new Error('La contraseña debe tener al menos 6 caracteres.');
    return new Error(msg);
  }

  function init() {
    const q = new URLSearchParams(location.search);
    if (q.has('demo') || cfg.DEMO || ENG.ls.get('eng_demo_activo')) {
      modo = 'demo';
      ENG.ls.set('eng_demo_activo', true);
      return;
    }
    if (!cfg.SUPABASE_URL || /TU-PROYECTO/.test(cfg.SUPABASE_URL) || /PEGA-AQUI/.test(cfg.SUPABASE_ANON_KEY || '')) {
      modo = 'sin-config';
      return;
    }
    if (!window.supabase) {
      modo = 'sin-libreria';
      return;
    }
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  }

  async function rpc(nombre, params = {}) {
    if (modo === 'demo') return Demo.rpc(nombre, params);
    const { data, error } = await sb.rpc(nombre, params);
    if (error) throw traducir(error);
    return data;
  }

  // ── Cola de intentos sin internet ──
  const OUTBOX = 'eng_outbox';
  async function vaciarCola() {
    const cola = ENG.ls.get(OUTBOX, []);
    if (!cola.length || !navigator.onLine) return 0;
    const quedan = [];
    let enviados = 0;
    for (const item of cola) {
      try {
        await rpc('eng_alumno_guardar', { p_codigo: item.codigo, p_intento: item.intento, p_respuestas: item.respuestas });
        enviados++;
      } catch (e) {
        if (e.offline) quedan.push(item);
        // si el código ya no existe, se descarta
      }
    }
    ENG.ls.set(OUTBOX, quedan);
    return enviados;
  }
  window.addEventListener('online', () => vaciarCola().then((n) => n && ENG.toast(`Se subieron ${n} actividades guardadas sin internet ✔`, 'ok')));

  const API = {
    init,
    get modo() {
      return modo;
    },
    pendientesCola: () => ENG.ls.get(OUTBOX, []).length,
    vaciarCola,

    // ── Alumno ──
    alumnoEstado: (codigo) => rpc('eng_alumno_estado', { p_codigo: codigo }),
    async alumnoGuardar(codigo, intento, respuestas) {
      intento.creado = intento.creado || new Date().toISOString();
      try {
        return await rpc('eng_alumno_guardar', { p_codigo: codigo, p_intento: intento, p_respuestas: respuestas });
      } catch (e) {
        if (e.offline) {
          const cola = ENG.ls.get(OUTBOX, []);
          cola.push({ codigo, intento, respuestas });
          ENG.ls.set(OUTBOX, cola);
          return { ok: true, offline: true };
        }
        throw e;
      }
    },
    ranking: (codigo) => rpc('eng_ranking', { p_codigo: codigo || null }),

    // ── Papás ──
    papasEstado: (codigo) => rpc('eng_papas_estado', { p_codigo: codigo }),

    // ── Maestros ──
    async sesion() {
      if (modo === 'demo') return Demo.sesion();
      if (!sb) return null;
      const { data } = await sb.auth.getSession();
      return data.session ? data.session.user : null;
    },
    async entrar(correo, pass) {
      if (modo === 'demo') return Demo.entrar(correo);
      const { data, error } = await sb.auth.signInWithPassword({ email: correo.trim(), password: pass });
      if (error) throw traducir(error);
      return data.user;
    },
    async registrar(correo, pass, nombre, materias) {
      if (modo === 'demo') return Demo.entrar(correo, nombre);
      const { data, error } = await sb.auth.signUp({
        email: correo.trim(),
        password: pass,
        options: { data: { nombre, materias }, emailRedirectTo: ENG.urlApp() }
      });
      if (error) throw traducir(error);
      return { user: data.user, confirmar: !data.session };
    },
    async recuperar(correo) {
      if (modo === 'demo') return true;
      const { error } = await sb.auth.resetPasswordForEmail(correo.trim(), { redirectTo: ENG.urlApp() });
      if (error) throw traducir(error);
      return true;
    },
    async nuevaContrasena(pass) {
      const { error } = await sb.auth.updateUser({ password: pass });
      if (error) throw traducir(error);
    },
    alCambiarSesion(fn) {
      if (sb) sb.auth.onAuthStateChange((evento, sesion) => fn(evento, sesion));
    },
    async salir() {
      if (modo === 'demo') return Demo.salir();
      if (sb) await sb.auth.signOut();
    },
    async miPerfil() {
      const user = await API.sesion();
      if (!user) return null;
      const meta = user.user_metadata || {};
      return rpc('eng_registrar_perfil', { p_nombre: meta.nombre || '', p_materias: meta.materias || [] });
    },
    solicitarMaterias: (nombre, materias) => rpc('eng_solicitar_materias', { p_nombre: nombre, p_materias: materias }),
    listarAlumnos: () => rpc('eng_listar_alumnos'),
    resumen: () => rpc('eng_resumen_maestro'),
    estadoAlumno: (id) => rpc('eng_estado_maestro', { p_alumno: id }),
    crearAlumno: (d) => rpc('eng_crear_alumno', { p_nombre: d.nombre, p_apodo: d.apodo, p_grupo: d.grupo || '', p_materias: d.materias || [] }),
    regenerarCodigo: (id, tipo) => rpc('eng_regenerar_codigo', { p_alumno: id, p_tipo: tipo }),
    guardarCalif: (alumno, materia, sub, parcial, cal) =>
      rpc('eng_guardar_calif', { p_alumno: alumno, p_materia: materia, p_sub: sub || '', p_parcial: parcial, p_cal: cal }),
    listarPerfiles: () => rpc('eng_listar_perfiles'),
    actualizarPerfil: (id, rol, materias) => rpc('eng_actualizar_perfil', { p_id: id, p_rol: rol, p_materias: materias }),
    async actualizarAlumno(id, cambios) {
      if (modo === 'demo') return Demo.actualizarAlumno(id, cambios);
      const { data, error } = await sb.from('eng_alumnos').update(cambios).eq('id', id).select().single();
      if (error) throw traducir(error);
      return data;
    },
    async borrarAlumno(id) {
      if (modo === 'demo') return Demo.borrarAlumno(id);
      const { error } = await sb.from('eng_alumnos').delete().eq('id', id);
      if (error) throw traducir(error);
    },
    salirDemo() {
      ENG.ls.del('eng_demo_activo');
      ENG.ls.del('eng_sesion');
      location.href = location.pathname;
    },

    // ── Fase 2 y 3 ──
    misionesListar: () => rpc('eng_misiones_listar'),
    misionGuardar: (m) => rpc('eng_mision_guardar', { p_id: m.id || null, p_materia: m.materia, p_tema: m.tema || '', p_modo: m.modo, p_meta: m.meta, p_titulo: m.titulo, p_nota: m.nota || '', p_alumnos: m.alumnos || [], p_fecha: m.fecha_limite }),
    misionBorrar: (id) => rpc('eng_mision_borrar', { p_id: id }),
    avisosListar: () => rpc('eng_avisos_listar'),
    avisoGuardar: (v) => rpc('eng_aviso_guardar', { p_titulo: v.titulo, p_texto: v.texto || '', p_materia: v.materia || '', p_alumnos: v.alumnos || [], p_para: v.para || 'todos', p_dias: v.dias || 7 }),
    avisoBorrar: (id) => rpc('eng_aviso_borrar', { p_id: id }),
    preguntasExtra: () => rpc('eng_preguntas_extra'),
    preguntasExtraStaff: () => rpc('eng_preguntas_extra_staff'),
    preguntaGuardar: (x) => rpc('eng_pregunta_guardar', { p_id: x.id || null, p_materia: x.materia, p_tema: x.tema, p_datos: x.datos, p_activo: x.activo !== false }),
    preguntaBorrar: (id) => rpc('eng_pregunta_borrar', { p_id: id }),
    salaCrear: (materia, titulo) => rpc('eng_sala_crear', { p_materia: materia, p_titulo: titulo || '' }),
    salaCerrar: (id) => rpc('eng_sala_cerrar', { p_id: id }),
    salasActivas: (codigo) => rpc('eng_salas_activas', { p_codigo: codigo }),
    salaBuscar: (codigo, pin) => rpc('eng_sala_buscar', { p_codigo: codigo, p_pin: pin }),
    claseGuardar: (sala, resultados) => rpc('eng_clase_guardar', { p_sala: sala, p_resultados: resultados }),
    pushGuardar: (codigo, rol, sub) => rpc('eng_push_guardar', { p_codigo: codigo, p_rol: rol, p_sub: sub }),
    pushGuardarMaestro: (sub) => rpc('eng_push_guardar_maestro', { p_sub: sub }),
    pushQuitar: (endpoint) => rpc('eng_push_quitar', { p_endpoint: endpoint }),
    pushResumen: () => rpc('eng_push_resumen'),

    // ── Tanda 1 (v2.2) ──
    latido: () => rpc('eng_latido').catch(() => null),
    sistemaEstado: () => rpc('eng_sistema_estado'),
    respaldo: () => rpc('eng_respaldo'),
    restaurar: (datos) => rpc('eng_restaurar', { p: datos }),
    examenesListar: () => rpc('eng_examenes_listar'),
    examenGuardar: (e) => rpc('eng_examen_guardar', { p_id: e.id || null, p_materia: e.materia, p_titulo: e.titulo, p_fecha: e.fecha, p_parcial: e.parcial || null, p_temas: e.temas || [], p_nota: e.nota || '', p_alumnos: e.alumnos || [] }),
    examenBorrar: (id) => rpc('eng_examen_borrar', { p_id: id }),
    reporteCrear: (r) => rpc('eng_reporte_crear', { p_codigo: r.codigo || null, p_pregunta: r.pregunta, p_materia: r.materia, p_tema: r.tema || '', p_motivo: r.motivo, p_texto: r.texto || '' }),
    reportesListar: () => rpc('eng_reportes_listar'),
    reporteResolver: (pregunta, resuelto) => rpc('eng_reporte_resolver', { p_pregunta: pregunta, p_resuelto: resuelto !== false }),
    preguntaOcultar: (pregunta, materia, ocultar, motivo) => rpc('eng_pregunta_ocultar', { p_pregunta: pregunta, p_materia: materia, p_ocultar: ocultar !== false, p_motivo: motivo || '' }),
    ocultas: () => rpc('eng_ocultas'),
    // ── Tanda 3 (v2.4) ──
    analisis: (materia, grupo) => rpc('eng_analisis', { p_materia: materia, p_grupo: grupo || '' }),
    // ¿La cuenta del maestro trae contraseña temporal? (la crea el admin)
    async contrasenaTemporal() {
      if (modo === 'demo' || !sb) return false;
      const { data } = await sb.auth.getUser();
      return !!(data && data.user && data.user.user_metadata && data.user.user_metadata.temporal);
    },
    async cambiarContrasena(pass) {
      if (modo === 'demo') return true;
      const { error } = await sb.auth.updateUser({ password: pass, data: { temporal: false } });
      if (error) throw traducir(error);
      return true;
    },
    // Función del servidor «engrane» (notificaciones e invitaciones)
    async funcion(body) {
      if (modo === 'demo') return Demo.funcion(body);
      const { data, error } = await sb.functions.invoke('engrane', { body });
      if (error) {
        let msg = error.message;
        try { const j = await error.context.json(); if (j && j.error) msg = j.error; } catch (e) {}
        if (/Failed to send|not found|404/i.test(msg)) msg = 'La función «engrane» no está publicada todavía en Supabase (ver LEEME, paso 4).';
        throw new Error(msg);
      }
      if (data && data.error) throw new Error(data.error);
      // Si la función publicada no es la de Engrane (p. ej. se quedó el «Hello» de ejemplo de Supabase)
      const esperado = { key: 'publicKey', invitar: 'ok', crear_maestro: 'password', aviso: 'sent', test: 'sent' }[body.action];
      if (esperado && (!data || typeof data !== 'object' || !(esperado in data))) {
        throw new Error('La función «engrane» de Supabase no tiene el código de Engrane. Vuelve a pegar supabase/functions/engrane/index.ts completo y dale Deploy (LEEME, paso 3).');
      }
      return data;
    },
    // Canal en tiempo real para la clase en vivo
    canal(nombre) {
      if (modo === 'demo' || !sb) return Demo.canal(nombre);
      const ch = sb.channel(nombre, { config: { broadcast: { self: false, ack: false } } });
      const manejadores = {};
      let listo = false;
      const cola = [];
      return {
        on(evento, fn) {
          (manejadores[evento] = manejadores[evento] || []).push(fn);
          ch.on('broadcast', { event: evento }, ({ payload }) => fn(payload));
          return this;
        },
        conectar(alListo) {
          ch.subscribe((estado) => {
            if (estado === 'SUBSCRIBED') {
              listo = true;
              cola.splice(0).forEach(([e, p]) => ch.send({ type: 'broadcast', event: e, payload: p }));
              alListo && alListo(true);
            } else if (estado === 'CHANNEL_ERROR' || estado === 'TIMED_OUT') alListo && alListo(false, estado);
          });
          return this;
        },
        enviar(evento, payload) {
          if (!listo) return cola.push([evento, payload]);
          ch.send({ type: 'broadcast', event: evento, payload });
        },
        cerrar() { try { sb.removeChannel(ch); } catch (e) {} }
      };
    }
  };
  ENG.API = API;

  // ══════════════════════════════════════════════════════════════
  //  MODO DEMO: imita a Supabase guardando todo en este celular.
  //  Sirve para probar la app antes de conectar la base de datos.
  // ══════════════════════════════════════════════════════════════
  const Demo = (function () {
    const KEY = 'eng_demo_db';
    const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Math.random().toString(36).slice(2));
    const cod = () => {
      const al = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
      let s = '';
      for (let i = 0; i < 6; i++) s += al[Math.floor(Math.random() * al.length)];
      return s;
    };
    function db() {
      let d = ENG.ls.get(KEY);
      if (!d) {
        d = { alumnos: [], intentos: [], estado: [], califs: [], perfiles: [], misiones: [], avisos: [], extra: [], salas: [], sesion: null, seq: 1 };
        const base = [
          ['Ana Demo', 'Polea Serena', ['ingles3'], 'DEMO11', 'PAPA11'],
          ['Beto Demo', 'Pistón Veloz', ['modulo2'], 'DEMO22', 'PAPA22'],
          ['Carla Demo', 'Chispa Creativa', ['modulo2', 'ingles3'], 'DEMO33', 'PAPA33']
        ];
        base.forEach(([nombre, apodo, materias, c, p]) =>
          d.alumnos.push({ id: uuid(), nombre, apodo, grupo: '3A', codigo: c, codigo_papas: p, materias, activo: true, notas: '', creado: new Date().toISOString() })
        );
        ENG.ls.set(KEY, d);
      }
      return d;
    }
    const guardar = (d) => ENG.ls.set(KEY, d);
    const tabla = (d, t) => (d[t] = d[t] || []);
    const err = (c) => {
      throw Object.assign(new Error(ERRORES[c] || c), { codigo: c });
    };
    const porCodigo = (c, campo = 'codigo') => db().alumnos.find((a) => a[campo] === ENG.normCodigo(c) && a.activo);
    function estado(a) {
      const d = db();
      const ints = d.intentos.filter((i) => i.alumno_id === a.id).slice(-500);
      return {
        alumno: { id: a.id, nombre: a.nombre, apodo: a.apodo, grupo: a.grupo, materias: a.materias },
        intentos: ints,
        estado: d.estado.filter((e) => e.alumno_id === a.id).map(({ alumno_id, ...r }) => r),
        califs: d.califs.filter((c) => c.alumno_id === a.id).map(({ alumno_id, ...r }) => r),
        xp_total: d.intentos.filter((i) => i.alumno_id === a.id).reduce((s, i) => s + i.xp, 0),
        misiones: tabla(d, 'misiones').filter((m) => a.materias.includes(m.materia) && (!m.alumnos || !m.alumnos.length || m.alumnos.includes(a.id)) && m.fecha_limite >= ENG.sumarDias(ENG.hoy(), -21)),
        avisos: tabla(d, 'avisos').filter((v) => v.hasta >= ENG.hoy() && (!v.materia || a.materias.includes(v.materia)) && (!v.alumnos || !v.alumnos.length || v.alumnos.includes(a.id))).slice(-10).reverse(),
        examenes: tabla(d, 'examenes').filter((e) => a.materias.includes(e.materia) && (!e.alumnos || !e.alumnos.length || e.alumnos.includes(a.id)) && e.fecha >= ENG.sumarDias(ENG.hoy(), -1)).sort((x, y) => (x.fecha < y.fecha ? -1 : 1)),
        hoy: ENG.hoy()
      };
    }
    const INTERVALOS = [1, 2, 4, 7, 14];
    const fn = {
      eng_alumno_estado: ({ p_codigo }) => estado(porCodigo(p_codigo) || err('CODIGO_INVALIDO')),
      eng_papas_estado: ({ p_codigo }) => estado(porCodigo(p_codigo, 'codigo_papas') || err('CODIGO_INVALIDO')),
      eng_alumno_guardar: ({ p_codigo, p_intento: it, p_respuestas }) => {
        const a = porCodigo(p_codigo) || err('CODIGO_INVALIDO');
        const d = db();
        const total = Math.max(0, Math.min(200, it.total | 0));
        d.intentos.push({
          id: d.seq++, alumno_id: a.id, materia: it.materia, tema: it.tema || null, modo: it.modo,
          aciertos: Math.min(total, it.aciertos | 0), total, calificacion: it.calificacion ?? null,
          xp: Math.min(Math.max(0, it.xp | 0), total * 25 + 150), segundos: it.segundos | 0,
          detalle: it.detalle || [], creado: it.creado || new Date().toISOString()
        });
        const hoy = ENG.hoy();
        (p_respuestas || []).forEach((r) => {
          let e = d.estado.find((x) => x.alumno_id === a.id && x.p === r.p);
          if (!e) {
            e = { alumno_id: a.id, p: r.p, m: it.materia, t: r.t, c: r.ok ? 2 : 1, a: r.ok ? 1 : 0, f: r.ok ? 0 : 1, n: r.ok ? ENG.sumarDias(hoy, 1) : hoy };
            d.estado.push(e);
          } else {
            e.c = r.ok ? Math.min(e.c + 1, 5) : 1;
            e.a += r.ok ? 1 : 0;
            e.f += r.ok ? 0 : 1;
            e.n = r.ok ? ENG.sumarDias(hoy, INTERVALOS[e.c - 1]) : hoy;
          }
        });
        guardar(d);
        return { ok: true, xp_total: d.intentos.filter((i) => i.alumno_id === a.id).reduce((s, i) => s + i.xp, 0) };
      },
      eng_ranking: ({ p_codigo }) => {
        const d = db();
        const yo = p_codigo ? porCodigo(p_codigo) || porCodigo(p_codigo, 'codigo_papas') : null;
        const staff = !!d.sesion;
        if (!yo && !staff) err('SIN_ACCESO');
        const lunes = ENG.lunesDeEstaSemana();
        return d.alumnos
          .filter((a) => a.activo)
          .map((a) => {
            const ints = d.intentos.filter((i) => i.alumno_id === a.id);
            return {
              apodo: a.apodo, nombre: staff ? a.nombre : null, yo: !!yo && yo.id === a.id,
              xp_total: ints.reduce((s, i) => s + i.xp, 0),
              xp_semana: ints.filter((i) => ENG.diaLocal(i.creado) >= lunes).reduce((s, i) => s + i.xp, 0)
            };
          })
          .sort((x, y) => y.xp_semana - x.xp_semana || y.xp_total - x.xp_total);
      },
      eng_registrar_perfil: ({ p_nombre }) => {
        const d = db();
        return d.perfiles.find((p) => p.id === d.sesion) || err('SIN_SESION');
      },
      eng_solicitar_materias: ({ p_nombre, p_materias }) => {
        const d = db();
        const p = d.perfiles.find((x) => x.id === d.sesion);
        p.nombre = p_nombre || p.nombre;
        p.materias_solicitadas = p_materias;
        guardar(d);
        return p;
      },
      eng_listar_alumnos: () => db().alumnos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)),
      eng_resumen_maestro: () => {
        const d = db();
        const lunes = ENG.lunesDeEstaSemana();
        const hoy = ENG.hoy();
        return d.alumnos.filter((a) => a.activo).map((a) => {
          const ints = d.intentos.filter((i) => i.alumno_id === a.id);
          return {
            id: a.id,
            xp_total: ints.reduce((s, i) => s + i.xp, 0),
            xp_semana: ints.filter((i) => ENG.diaLocal(i.creado) >= lunes).reduce((s, i) => s + i.xp, 0),
            ultima: ints.length ? ints[ints.length - 1].creado : null,
            dias: [...new Set(ints.map((i) => ENG.diaLocal(i.creado)))],
            pendientes: d.estado.filter((e) => e.alumno_id === a.id && e.n <= hoy).length
          };
        });
      },
      eng_estado_maestro: ({ p_alumno }) => estado(db().alumnos.find((a) => a.id === p_alumno) || err('SIN_ACCESO')),
      eng_crear_alumno: ({ p_nombre, p_apodo, p_grupo, p_materias }) => {
        if (!String(p_nombre || '').trim()) err('FALTA_NOMBRE');
        const d = db();
        const a = { id: uuid(), nombre: p_nombre.trim(), apodo: p_apodo, grupo: p_grupo, codigo: cod(), codigo_papas: cod(), materias: p_materias, activo: true, notas: '', creado: new Date().toISOString() };
        d.alumnos.push(a);
        guardar(d);
        return a;
      },
      eng_regenerar_codigo: ({ p_alumno, p_tipo }) => {
        const d = db();
        const a = d.alumnos.find((x) => x.id === p_alumno);
        const c = cod();
        if (p_tipo === 'papas') a.codigo_papas = c;
        else a.codigo = c;
        guardar(d);
        return c;
      },
      eng_guardar_calif: ({ p_alumno, p_materia, p_sub, p_parcial, p_cal }) => {
        const d = db();
        d.califs = d.califs.filter((c) => !(c.alumno_id === p_alumno && c.materia === p_materia && c.sub === p_sub && c.parcial === p_parcial));
        if (p_cal != null) d.califs.push({ alumno_id: p_alumno, materia: p_materia, sub: p_sub, parcial: p_parcial, cal: p_cal });
        guardar(d);
        return { ok: true };
      },
      eng_listar_perfiles: () => db().perfiles,
      eng_misiones_listar: () => tabla(db(), 'misiones').slice().reverse(),
      eng_mision_guardar: (p) => {
        if (!String(p.p_titulo || '').trim()) err('FALTA_TITULO');
        const d = db();
        const m = { id: p.p_id || d.seq++, materia: p.p_materia, tema: p.p_tema || null, modo: p.p_modo, meta: p.p_meta, titulo: p.p_titulo, nota: p.p_nota, alumnos: p.p_alumnos && p.p_alumnos.length ? p.p_alumnos : null, fecha_limite: p.p_fecha, creado: new Date().toISOString() };
        const l = tabla(d, 'misiones');
        const i = l.findIndex((x) => x.id === m.id);
        if (i >= 0) { m.creado = l[i].creado; l[i] = m; } else l.push(m);
        guardar(d);
        return m;
      },
      eng_mision_borrar: ({ p_id }) => { const d = db(); d.misiones = tabla(d, 'misiones').filter((x) => x.id !== p_id); guardar(d); return { ok: true }; },
      eng_avisos_listar: () => tabla(db(), 'avisos').slice().reverse(),
      eng_aviso_guardar: (p) => {
        if (!String(p.p_titulo || '').trim()) err('FALTA_TITULO');
        const d = db();
        const v = { id: d.seq++, titulo: p.p_titulo, texto: p.p_texto, materia: p.p_materia || null, alumnos: p.p_alumnos && p.p_alumnos.length ? p.p_alumnos : null, para: p.p_para, hasta: ENG.sumarDias(ENG.hoy(), p.p_dias || 7), creado: new Date().toISOString() };
        tabla(d, 'avisos').push(v);
        guardar(d);
        return v;
      },
      eng_aviso_borrar: ({ p_id }) => { const d = db(); d.avisos = tabla(d, 'avisos').filter((x) => x.id !== p_id); guardar(d); return { ok: true }; },
      eng_preguntas_extra: () => tabla(db(), 'extra').filter((x) => x.activo),
      eng_preguntas_extra_staff: () => tabla(db(), 'extra').map((x) => ({ ...x, autor: 'Profe Demo', mia: true })).reverse(),
      eng_pregunta_guardar: (p) => {
        const d = db();
        const x = { id: p.p_id || d.seq++, materia: p.p_materia, tema: p.p_tema, datos: p.p_datos, activo: p.p_activo !== false, creado: new Date().toISOString() };
        const l = tabla(d, 'extra');
        const i = l.findIndex((y) => y.id === x.id);
        if (i >= 0) l[i] = x; else l.push(x);
        guardar(d);
        return x;
      },
      eng_pregunta_borrar: ({ p_id }) => { const d = db(); d.extra = tabla(d, 'extra').filter((x) => x.id !== p_id); guardar(d); return { ok: true }; },
      eng_sala_crear: ({ p_materia, p_titulo }) => {
        const d = db();
        tabla(d, 'salas').forEach((s) => (s.abierta = false));
        const s = { id: d.seq++, pin: String(Math.floor(100000 + Math.random() * 900000)), materia: p_materia, titulo: p_titulo, abierta: true, guardada: false, creado: new Date().toISOString() };
        d.salas.push(s);
        guardar(d);
        return s;
      },
      eng_sala_cerrar: ({ p_id }) => { const d = db(); tabla(d, 'salas').forEach((s) => s.id === p_id && (s.abierta = false)); guardar(d); return { ok: true }; },
      eng_salas_activas: ({ p_codigo }) => {
        const a = porCodigo(p_codigo) || err('CODIGO_INVALIDO');
        return tabla(db(), 'salas').filter((s) => s.abierta && a.materias.includes(s.materia));
      },
      eng_sala_buscar: ({ p_codigo, p_pin }) => {
        porCodigo(p_codigo) || err('CODIGO_INVALIDO');
        return tabla(db(), 'salas').find((s) => s.abierta && s.pin === String(p_pin).replace(/\D/g, '')) || err('SALA_NO_EXISTE');
      },
      eng_clase_guardar: ({ p_sala, p_resultados }) => {
        const d = db();
        const s = tabla(d, 'salas').find((x) => x.id === p_sala) || err('SIN_ACCESO');
        if (s.guardada) err('YA_GUARDADA');
        let n = 0;
        (p_resultados || []).forEach((r) => {
          if (!d.alumnos.find((a) => a.id === r.alumno_id && a.activo)) return;
          const bono = { 1: 50, 2: 30, 3: 20 }[r.puesto] || 0;
          d.intentos.push({ id: d.seq++, alumno_id: r.alumno_id, materia: s.materia, tema: null, modo: 'clase', aciertos: r.aciertos, total: r.total, calificacion: null, xp: Math.min(r.aciertos * 10 + bono, r.total * 25 + 150), segundos: r.segundos || 0, detalle: [], creado: new Date().toISOString() });
          n++;
        });
        s.guardada = true;
        s.abierta = false;
        guardar(d);
        return { ok: true, guardados: n };
      },
      // Tanda 1 (v2.2)
      eng_latido: () => { const d = db(); d.latido = (d.latido || 0) + 1; guardar(d); return { ok: true, n: d.latido }; },
      eng_sistema_estado: () => { const d = db(); return d.respaldo ? { respaldo: { actualizado: d.respaldo } } : {}; },
      eng_respaldo: () => {
        const d = db();
        d.respaldo = new Date().toISOString();
        guardar(d);
        return { engrane: 'respaldo', version: 1, fecha: d.respaldo, eng_alumnos: d.alumnos, eng_intentos: d.intentos, eng_examenes: tabla(d, 'examenes'), demo: true };
      },
      eng_restaurar: ({ p }) => {
        if (!p || p.engrane !== 'respaldo') err('DATOS_INVALIDOS');
        const d = db();
        let n = 0;
        (p.eng_alumnos || []).forEach((a) => { if (!d.alumnos.find((x) => x.id === a.id || x.codigo === a.codigo)) { d.alumnos.push(a); n++; } });
        (p.eng_intentos || []).forEach((i) => { if (!d.intentos.find((x) => x.id === i.id) && d.alumnos.find((a) => a.id === i.alumno_id)) d.intentos.push(i); });
        guardar(d);
        return { alumnos: n };
      },
      eng_examenes_listar: () => tabla(db(), 'examenes').filter((e) => e.fecha >= ENG.sumarDias(ENG.hoy(), -30)).map((e) => ({ ...e, mio: true })).sort((x, y) => (x.fecha < y.fecha ? -1 : 1)),
      eng_examen_guardar: (p) => {
        if (!String(p.p_titulo || '').trim()) err('FALTA_TITULO');
        if (!p.p_fecha) err('DATOS_INVALIDOS');
        const d = db();
        const e = { id: p.p_id || d.seq++, materia: p.p_materia, titulo: p.p_titulo.trim(), fecha: p.p_fecha, parcial: p.p_parcial || null, temas: p.p_temas || [], nota: p.p_nota || '', alumnos: p.p_alumnos && p.p_alumnos.length ? p.p_alumnos : null, creado: new Date().toISOString() };
        const l = tabla(d, 'examenes');
        const i = l.findIndex((x) => x.id === e.id);
        if (i >= 0) l[i] = e; else l.push(e);
        guardar(d);
        return e;
      },
      eng_examen_borrar: ({ p_id }) => { const d = db(); d.examenes = tabla(d, 'examenes').filter((x) => x.id !== p_id); guardar(d); return { ok: true }; },
      eng_reporte_crear: (p) => {
        const d = db();
        const a = p.p_codigo ? porCodigo(p.p_codigo) || err('CODIGO_INVALIDO') : null;
        const l = tabla(d, 'reportes');
        if (l.find((r) => r.pregunta === p.p_pregunta && !r.resuelto && (a ? r.alumno_id === a.id : !r.alumno_id))) return { ok: true, repetido: true };
        l.push({ id: d.seq++, pregunta: p.p_pregunta, materia: p.p_materia, tema: p.p_tema || null, motivo: p.p_motivo, texto: p.p_texto || '', alumno_id: a ? a.id : null, quien: a ? a.apodo : 'Profe Demo', resuelto: false, creado: new Date().toISOString() });
        guardar(d);
        return { ok: true };
      },
      eng_reportes_listar: () => {
        const d = db();
        const oc = tabla(d, 'ocultas');
        return tabla(d, 'reportes').slice().reverse().sort((x, y) => x.resuelto - y.resuelto).map((r) => ({ ...r, oculta: oc.some((o) => o.pregunta === r.pregunta) }));
      },
      eng_reporte_resolver: ({ p_pregunta, p_resuelto }) => { const d = db(); tabla(d, 'reportes').forEach((r) => r.pregunta === p_pregunta && (r.resuelto = p_resuelto !== false)); guardar(d); return { ok: true }; },
      eng_pregunta_ocultar: ({ p_pregunta, p_materia, p_ocultar, p_motivo }) => {
        const d = db();
        d.ocultas = tabla(d, 'ocultas').filter((o) => o.pregunta !== p_pregunta);
        if (p_ocultar !== false) d.ocultas.push({ pregunta: p_pregunta, materia: p_materia, motivo: p_motivo || '' });
        guardar(d);
        return { ok: true };
      },
      eng_ocultas: () => tabla(db(), 'ocultas').map((o) => o.pregunta),
      eng_analisis: ({ p_materia, p_grupo }) => {
        const d = db();
        if (!d.sesion) err('SIN_ACCESO');
        const als = d.alumnos.filter((a) => a.activo && a.materias.includes(p_materia) && (!p_grupo || a.grupo === p_grupo));
        const ids = new Set(als.map((a) => a.id));
        const es = d.estado.filter((e) => ids.has(e.alumno_id) && e.m === p_materia);
        const temaDe = (pid) => pid.replace(/-[^-]*$/, '');
        const T = {};
        const P = {};
        es.forEach((e) => {
          const k = e.alumno_id + '|' + temaDe(e.p);
          T[k] = T[k] || { a: e.alumno_id, t: temaDe(e.p), ac: 0, fa: 0 };
          T[k].ac += e.a; T[k].fa += e.f;
          P[e.p] = P[e.p] || { p: e.p, ac: 0, fa: 0, alumnos: 0, pendientes: 0 };
          P[e.p].ac += e.a; P[e.p].fa += e.f; P[e.p].alumnos += e.f > 0 ? 1 : 0; P[e.p].pendientes += e.c === 1 ? 1 : 0;
        });
        return {
          alumnos: als.map((a) => ({ id: a.id, nombre: a.nombre, grupo: a.grupo })).sort((x, y) => x.nombre.localeCompare(y.nombre)),
          temas: Object.values(T),
          preguntas: Object.values(P).filter((x) => x.fa > 0).sort((x, y) => y.fa - x.fa || y.alumnos - x.alumnos).slice(0, 60)
        };
      },
      eng_push_guardar: () => ({ ok: true }),
      eng_push_guardar_maestro: () => ({ ok: true }),
      eng_push_quitar: () => ({ ok: true }),
      eng_push_resumen: () => ({}),
      eng_actualizar_perfil: ({ p_id, p_rol, p_materias }) => {
        const d = db();
        const p = d.perfiles.find((x) => x.id === p_id);
        if (p_rol) p.rol = p_rol;
        if (p_materias) p.materias = p_materias;
        guardar(d);
        return p;
      }
    };
    // Canal local entre pestañas del mismo navegador (para probar la clase en vivo en modo demo)
    function canal(nombre) {
      const bc = 'BroadcastChannel' in window ? new BroadcastChannel(nombre) : null;
      const man = {};
      if (bc) bc.onmessage = (e) => (man[e.data.e] || []).forEach((fn) => fn(e.data.p));
      return {
        on(ev, fn) { (man[ev] = man[ev] || []).push(fn); return this; },
        conectar(alListo) { setTimeout(() => alListo && alListo(!!bc), 30); return this; },
        enviar(ev, p) { bc && bc.postMessage({ e: ev, p: JSON.parse(JSON.stringify(p)) }); },
        cerrar() { bc && bc.close(); }
      };
    }
    return {
      canal,
      async funcion(body) {
        await new Promise((r) => setTimeout(r, 80));
        if (body.action === 'key') return { publicKey: '' };
        if (body.action === 'aviso') return { sent: 0, failed: 0, removed: 0, demo: true };
        if (body.action === 'invitar') return { ok: true, demo: true };
        if (body.action === 'crear_maestro') {
          const d = db();
          if (!d.perfiles.find((x) => x.correo === body.correo)) d.perfiles.push({ id: uuid(), nombre: body.nombre || '', correo: body.correo, rol: 'maestro', materias: body.materias || [], materias_solicitadas: body.materias || [], creado: new Date().toISOString() });
          guardar(d);
          return { ok: true, demo: true, password: 'Engrane-' + cod().slice(0, 4), nuevo: true };
        }
        return { ok: true, demo: true };
      },
      async rpc(nombre, params) {
        await new Promise((r) => setTimeout(r, 60));
        if (!fn[nombre]) throw new Error('Función demo no disponible: ' + nombre);
        return JSON.parse(JSON.stringify(fn[nombre](params || {})));
      },
      sesion() {
        const d = db();
        return d.sesion ? { id: d.sesion, email: 'profe@demo', user_metadata: {} } : null;
      },
      entrar(correo, nombre) {
        const d = db();
        let p = d.perfiles.find((x) => x.correo === correo);
        if (!p) {
          p = { id: uuid(), nombre: nombre || 'Profe Demo', correo, rol: d.perfiles.length ? 'pendiente' : 'admin', materias: [], materias_solicitadas: [], creado: new Date().toISOString() };
          d.perfiles.push(p);
        }
        d.sesion = p.id;
        guardar(d);
        return { id: p.id, email: correo };
      },
      salir() {
        const d = db();
        d.sesion = null;
        guardar(d);
      },
      actualizarAlumno(id, cambios) {
        const d = db();
        const a = d.alumnos.find((x) => x.id === id);
        Object.assign(a, cambios);
        guardar(d);
        return a;
      },
      borrarAlumno(id) {
        const d = db();
        d.alumnos = d.alumnos.filter((x) => x.id !== id);
        d.intentos = d.intentos.filter((x) => x.alumno_id !== id);
        d.estado = d.estado.filter((x) => x.alumno_id !== id);
        guardar(d);
      }
    };
  })();
})();
