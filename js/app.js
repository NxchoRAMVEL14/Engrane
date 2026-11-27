// ENGRANE · arranque, acceso y navegación
(function () {
  const ENG = window.ENG;
  const esc = ENG.esc;
  const app = () => document.getElementById('app');
  const SESION = 'eng_sesion';

  ENG.ctx = { rol: null, codigo: null, estado: null, an: null, prueba: false, perfil: null };

  const estadoVacio = (materias) => ({
    alumno: { id: 'prueba', nombre: 'Vista previa', apodo: 'Engrane Prueba', grupo: '', materias: materias || Object.keys(ENG.MATERIAS).filter((m) => ENG.MATERIAS[m].disponible) },
    intentos: [], estado: [], califs: [], xp_total: 0
  });

  function fijarEstado(estado) {
    estado.intentos = estado.intentos || [];
    estado.estado = estado.estado || [];
    estado.califs = estado.califs || [];
    ENG.ctx.estado = estado;
    ENG.ctx.an = ENG.Progreso.analizar(estado);
  }

  // ════════ Barra superior ════════
  function barra() {
    const b = document.getElementById('barra');
    const c = ENG.ctx;
    let der = '';
    if (c.rol === 'alumno' && c.an) {
      der = `<button class="barra-chip" id="b-perfil">${ENG.engraneSVG({ tam: 26, texto: c.an.nivel.n })}<span>${esc(c.estado.alumno.apodo)}</span></button>
        <button class="btn-ico" id="b-menu" aria-label="Menú">☰</button>`;
    } else if (c.rol === 'papas') {
      der = `<span class="barra-txt">Familia</span><button class="btn-ico" id="b-menu" aria-label="Menú">☰</button>`;
    } else if (c.rol === 'maestro') {
      der = `<span class="barra-txt">${esc((c.perfil && c.perfil.nombre) || 'Maestro')}</span><button class="btn-ico" id="b-menu" aria-label="Menú">☰</button>`;
    }
    b.innerHTML = `<div class="barra-in">
      <a class="marca" href="#/inicio"><img src="img/logo-app.png" alt="" width="34" height="34"><span>Engrane</span></a>
      <div class="barra-der">${der}</div></div>
      ${ENG.API.modo === 'demo' ? `<div class="demo-aviso">MODO DEMO · los datos se guardan solo en este dispositivo · <a href="#" id="b-salir-demo">salir del demo</a></div>` : ''}`;
    const sd = document.getElementById('b-salir-demo');
    if (sd) sd.onclick = (e) => { e.preventDefault(); ENG.API.salirDemo(); };
    const bp = document.getElementById('b-perfil');
    if (bp) bp.onclick = () => (location.hash = '#/insignias');
    const bm = document.getElementById('b-menu');
    if (bm) bm.onclick = menu;
  }

  function menu() {
    const c = ENG.ctx;
    const items = [];
    if (c.rol === 'alumno') items.push(['🏠 Inicio', '#/inicio'], ['🔴 Clase en vivo', '#/clase'], ['🧪 Laboratorio', '#/lab'], ['🏅 Insignias y niveles', '#/insignias'], ['🏁 Ranking', '#/ranking'], ['❓ Ayuda', '#/ayuda']);
    if (c.rol === 'papas') items.push(['📈 Reporte', '#/inicio'], ['🏁 Ranking', '#/ranking'], ['❓ Ayuda', '#/ayuda']);
    if (c.rol === 'maestro') items.push(['👥 Alumnos', '#/inicio'], ['🔴 Clase en vivo', '#/m/clase'], ['🎯 Misiones', '#/m/misiones'], ['🔔 Recordatorios', '#/m/recordatorios'], ['📣 Avisos', '#/m/avisos'], ['📅 Exámenes', '#/m/examenes'], ['📊 Análisis del grupo', '#/m/analisis'], ['🖨️ Hojas para imprimir', '#/m/hojas'], ['⚑ Reportes', '#/m/reportes'], ['✏️ Mis preguntas', '#/m/preguntas'], ['📚 Contenido', '#/m/contenido'], ['🧪 Laboratorio', '#/lab'], ...(c.perfil && c.perfil.rol === 'admin' ? [['📥 Importar', '#/m/importar'], ['📅 Cambio de semestre', '#/m/semestre'], ['👩‍🏫 Maestros', '#/m/maestros'], ['💾 Respaldo', '#/m/respaldo']] : []), ['🏁 Ranking', '#/ranking'], ['👤 Mi cuenta', '#/m/cuenta'], ['❓ Ayuda', '#/ayuda']);
    const md = ENG.modal({
      clase: 'menu',
      html: `<div class="lista-botones">${items.map(([t, h]) => `<button class="btn sec ancho" data-h="${h}">${t}</button>`).join('')}
        <label class="check"><input type="checkbox" id="mn-sonido" ${ENG.sonidoActivo() ? 'checked' : ''}><span>Sonidos</span></label>
        ${ENG.Tema.selector()}
        <button class="btn fant ancho" id="mn-salir">Cerrar sesión</button></div>`,
      botones: [{ txt: 'Cerrar' }]
    });
    md.el.querySelectorAll('[data-h]').forEach((b) => (b.onclick = () => { md.cerrar(); location.hash = b.dataset.h; }));
    md.el.querySelector('#mn-sonido').onchange = (e) => ENG.ls.set('eng_sonido', e.target.checked);
    md.el.querySelector('#mn-tema').onchange = (e) => ENG.Tema.poner(e.target.value);
    md.el.querySelector('#mn-salir').onclick = async () => {
      md.cerrar();
      if (await ENG.confirmar('¿Cerrar sesión en este dispositivo?', 'Cerrar sesión')) ENG.cerrarSesion();
    };
  }

  // ════════ Acceso ════════
  function pantallaEntrar(msg = '') {
    ENG.ctx = { rol: null, codigo: null, estado: null, an: null, prueba: false, perfil: null };
    barra();
    const demo = ENG.API.modo === 'demo';
    app().innerHTML = `
      <section class="entrar">
        <div class="entrar-logo"><img class="logo-grande" src="img/logo-app.png" alt="Engrane" width="132" height="132"><h1>Engrane</h1><p>Practica, sube de nivel y engrana lo que aprendes.</p></div>
        ${msg ? `<div class="card aviso">${msg}</div>` : ''}
        <div class="entrar-opciones" id="opciones">
          <button class="card opcion" data-op="alumno"><span>🎒</span><b>Soy alumno</b><small>Entro con mi código</small></button>
          <button class="card opcion" data-op="papas"><span>👪</span><b>Soy mamá o papá</b><small>Veo su avance y pruebo lo que practica</small></button>
          <button class="card opcion" data-op="maestro"><span>👩‍🏫</span><b>Soy maestro</b><small>Correo y contraseña</small></button>
        </div>
        <div id="form-acceso"></div>
        ${demo ? `<div class="card ayuda"><b>Códigos de prueba (demo)</b><br>Alumnos: DEMO11 (inglés), DEMO22 (módulo), DEMO33 (ambas)<br>Papás: PAPA11, PAPA22, PAPA33<br>Maestro: cualquier correo y contraseña</div>` : ''}
      </section>`;
    app().querySelectorAll('[data-op]').forEach((b) => (b.onclick = () => formAcceso(b.dataset.op)));
  }

  function formAcceso(op) {
    const f = document.getElementById('form-acceso');
    document.querySelectorAll('.opcion').forEach((o) => o.classList.toggle('activa', o.dataset.op === op));
    if (op === 'alumno' || op === 'papas') {
      f.innerHTML = `<form class="card form" id="f-cod">
        <label class="campo"><span>${op === 'alumno' ? 'Tu código' : 'Código de papás'}</span>
          <input id="i-cod" class="input-codigo" maxlength="9" autocomplete="off" autocapitalize="characters" placeholder="ABC 123" required></label>
        <button class="btn pri ancho" type="submit">Entrar</button>
        <p class="peq">${op === 'alumno' ? 'Te lo da tu profe por WhatsApp.' : 'Se los envía el profe de su hijo por WhatsApp.'}</p></form>`;
      document.getElementById('f-cod').onsubmit = (e) => {
        e.preventDefault();
        entrarConCodigo(op, document.getElementById('i-cod').value);
      };
      setTimeout(() => {
        const el = document.getElementById('i-cod');
        if (el) el.focus();
      }, 60);
      return;
    }
    let modo = 'entrar';
    const pintar = () => {
      f.innerHTML = `<form class="card form" id="f-mae">
        <div class="tabs mini"><button type="button" class="tab ${modo === 'entrar' ? 'activa' : ''}" data-m="entrar">Entrar</button><button type="button" class="tab ${modo === 'crear' ? 'activa' : ''}" data-m="crear">Crear cuenta</button></div>
        ${modo === 'crear' ? `<label class="campo"><span>Tu nombre</span><input id="i-nom" required placeholder="Ej. Nacho Ramírez"></label>` : ''}
        <label class="campo"><span>Correo</span><input id="i-mail" type="email" required autocomplete="email"></label>
        <label class="campo"><span>Contraseña</span><input id="i-pass" type="password" required minlength="6" autocomplete="${modo === 'crear' ? 'new-password' : 'current-password'}"></label>
        ${modo === 'crear' ? `<p class="peq">¿Qué materias impartes?</p><div class="checks">${ENG.VistasMaestro.opcionesMaterias([])}</div>
          <p class="peq">La primera cuenta que se crea queda como administrador. Las siguientes esperan aprobación.</p>` : ''}
        <button class="btn pri ancho" type="submit">${modo === 'crear' ? 'Crear cuenta' : 'Entrar'}</button>
        ${modo === 'entrar' ? `<button type="button" class="btn fant ancho" id="i-olvido">Olvidé mi contraseña</button>` : ''}
      </form>`;
      f.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { modo = b.dataset.m; pintar(); }));
      const ol = document.getElementById('i-olvido');
      if (ol) ol.onclick = async () => {
        const mail = document.getElementById('i-mail').value;
        if (!mail) return ENG.toast('Escribe tu correo primero', 'mal');
        try { await ENG.API.recuperar(mail); ENG.toast('Te mandé un correo para cambiarla ✔', 'ok'); } catch (e) { ENG.toast(e.message, 'mal'); }
      };
      document.getElementById('f-mae').onsubmit = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('[type=submit]');
        btn.disabled = true;
        const mail = document.getElementById('i-mail').value;
        const pass = document.getElementById('i-pass').value;
        try {
          if (modo === 'crear') {
            const r = await ENG.API.registrar(mail, pass, document.getElementById('i-nom').value, ENG.VistasMaestro.leerChecks(f));
            if (r && r.confirmar) {
              f.innerHTML = `<div class="card aviso">📧 Te mandamos un correo para confirmar tu cuenta. Ábrelo, confirma y luego entra aquí con tu correo y contraseña.</div>`;
              return;
            }
          } else {
            await ENG.API.entrar(mail, pass);
          }
          await arrancarMaestro();
        } catch (err) {
          ENG.toast(err.message, 'mal');
          btn.disabled = false;
        }
      };
    };
    pintar();
  }

  async function entrarConCodigo(rol, codigo, silencioso = false) {
    const cod = ENG.normCodigo(codigo);
    if (cod.length < 4) return ENG.toast('Revisa el código', 'mal');
    if (!silencioso) app().innerHTML = ENG.cargandoHTML('Entrando…');
    try {
      const estado = rol === 'alumno' ? await ENG.API.alumnoEstado(cod) : await ENG.API.papasEstado(cod);
      ENG.ls.set(SESION, { rol, codigo: cod });
      ENG.ls.set('eng_cache_' + cod, estado);
      ENG.ctx = { rol, codigo: cod, prueba: false, perfil: null };
      fijarEstado(estado);
      if (rol === 'alumno') ENG.API.vaciarCola().then((n) => n && ENG.recargarEstado(true));
      barra();
      if (location.hash === '#/inicio') ruta();
      else location.hash = '#/inicio';
    } catch (e) {
      if (e.offline) {
        const cache = ENG.ls.get('eng_cache_' + cod);
        if (cache) {
          ENG.ctx = { rol, codigo: cod, prueba: false, perfil: null };
          fijarEstado(cache);
          barra();
          ENG.toast('Sin internet: trabajando con lo guardado en tu celular', '');
          if (location.hash === '#/inicio') ruta();
          else location.hash = '#/inicio';
          return;
        }
      }
      if (e.codigo === 'CODIGO_INVALIDO') ENG.ls.del(SESION);
      pantallaEntrar(esc(e.message));
    }
  }

  async function arrancarMaestro() {
    app().innerHTML = ENG.cargandoHTML('Entrando…');
    const perfil = await ENG.API.miPerfil();
    if (!perfil) return pantallaEntrar();
    ENG.ctx = { rol: 'maestro', codigo: null, prueba: false, perfil, estado: null, an: null, alumnos: null };
    ENG.ls.set(SESION, { rol: 'maestro' });
    barra();
    if (location.hash === '#/inicio') ruta();
    else location.hash = '#/inicio';
    // Cuenta creada por el admin con contraseña temporal: pedir una propia
    ENG.API.contrasenaTemporal().then((t) => t && pedirContrasenaNueva()).catch(() => {});
  }

  function pedirContrasenaNueva() {
    ENG.modal({
      titulo: '🔒 Pon tu propia contraseña',
      cerrable: false,
      html: `<p>Entraste con una contraseña temporal. Elige una nueva que solo tú sepas.</p>
        <label class="campo"><span>Nueva contraseña (mínimo 8)</span><input id="np-1" type="password" autocomplete="new-password"></label>
        <label class="campo"><span>Repítela</span><input id="np-2" type="password" autocomplete="new-password"></label>`,
      botones: [{
        txt: 'Guardar', clase: 'pri',
        fn: async (fondo) => {
          const a = fondo.querySelector('#np-1').value, b = fondo.querySelector('#np-2').value;
          if (a.length < 8) { ENG.toast('Usa al menos 8 caracteres', 'mal'); return false; }
          if (a !== b) { ENG.toast('No coinciden', 'mal'); return false; }
          try { await ENG.API.cambiarContrasena(a); ENG.toast('¡Listo! Ya tienes tu contraseña ✔', 'ok'); }
          catch (e) { ENG.toast(e.message, 'mal'); return false; }
        }
      }]
    });
  }

  ENG.recargarEstado = async (silencioso) => {
    const c = ENG.ctx;
    if (!c.codigo || c.prueba) return;
    try {
      const estado = c.rol === 'alumno' ? await ENG.API.alumnoEstado(c.codigo) : await ENG.API.papasEstado(c.codigo);
      ENG.ls.set('eng_cache_' + c.codigo, estado);
      fijarEstado(estado);
      barra();
    } catch (e) {
      if (!silencioso) ENG.toast(e.message, 'mal');
    }
  };

  ENG.cerrarSesion = async () => {
    const s = ENG.ls.get(SESION);
    if (s && s.rol === 'maestro') await ENG.API.salir();
    ENG.ls.del(SESION);
    location.hash = '#/entrar';
    pantallaEntrar();
  };

  // ════════ Modo prueba (papás y maestros) ════════
  ENG.entrarPrueba = (hash, estado) => {
    const c = ENG.ctx;
    if (!c.prueba) c.respaldo = { estado: c.estado, an: c.an };
    c.prueba = true;
    if (c.rol === 'maestro') fijarEstado(JSON.parse(JSON.stringify(estado || estadoVacio())));
    if (location.hash === hash) ruta();
    else location.hash = hash;
  };
  ENG.salirPrueba = () => {
    const c = ENG.ctx;
    c.prueba = false;
    if (c.respaldo) {
      c.estado = c.respaldo.estado;
      c.an = c.respaldo.an;
      c.respaldo = null;
    }
    location.hash = '#/inicio';
  };

  // ════════ Rutas ════════
  ENG._ultimaRuta = '';
  function ruta() {
    const h = location.hash || '#/inicio';
    const [camino, qs] = h.slice(2).split('?');
    const partes = camino.split('/');
    const q = new URLSearchParams(qs || '');
    const c = ENG.ctx;
    if (partes[0] === 'sesion') {
      if (!document.querySelector('.sesion, .resultado')) location.replace('#/inicio');
      return;
    }
    ENG.Motor.detener();
    if (ENG.Lab) ENG.Lab.detener();
    document.body.dataset.rol = c.rol || 'nadie';
    if (!(partes[0] === 'm' && partes[1] === 'clase')) document.body.classList.remove('modo-proyector');
    if (!c.rol) return pantallaEntrar();
    // salir del modo prueba al volver al inicio
    if (partes[0] === 'inicio' && c.prueba) {
      c.prueba = false;
      if (c.respaldo) { c.estado = c.respaldo.estado; c.an = c.respaldo.an; c.respaldo = null; }
    }
    window.scrollTo(0, 0);
    try {
      switch (partes[0]) {
        case 'inicio': {
          const r = c.rol === 'alumno' ? ENG.VistasAlumno.inicio() : c.rol === 'papas' ? ENG.VistasPapas.inicio() : ENG.VistasMaestro.panel();
          Promise.resolve(r).then(() => ENG.Novedades.banner()).catch(() => {});
          return r;
        }
        case 'ayuda':
          return ENG.Ayuda.vista();
        case 'vista':
          if (!c.prueba) return (location.hash = '#/inicio');
          return ENG.VistasAlumno.inicio();
        case 'materia':
          if (c.rol === 'maestro' && !c.prueba) return ENG.entrarPrueba(h);
          if (c.rol === 'papas' && !c.prueba) c.prueba = true;
          return ENG.VistasAlumno.materia(partes[1]);
        case 'tema':
          if (c.rol === 'maestro' && !c.prueba) return ENG.entrarPrueba(h);
          if (c.rol === 'papas' && !c.prueba) c.prueba = true;
          return ENG.VistasAlumno.tema(partes[1]);
        case 'ranking':
          return ENG.VistasAlumno.ranking();
        case 'clase':
          return ENG.Clase.alumno();
        case 'lab':
          if (c.rol === 'papas') return (location.hash = '#/inicio');
          return ENG.Lab.vista();
        case 'insignias':
          if (c.rol !== 'alumno' && !c.prueba) return (location.hash = '#/inicio');
          return ENG.VistasAlumno.insignias();
        case 'm':
          if (c.rol !== 'maestro') return (location.hash = '#/inicio');
          if (partes[1] === 'alumno') return ENG.VistasMaestro.alumno(partes[2], q.get('tab') || 'avance');
          if (partes[1] === 'nuevo') return ENG.VistasMaestro.nuevo();
          if (partes[1] === 'maestros') return ENG.VistasMaestro.maestros();
          if (partes[1] === 'contenido') return ENG.VistasMaestro.contenido();
          if (partes[1] === 'cuenta') return ENG.VistasMaestro.cuenta();
          if (partes[1] === 'misiones') return ENG.Misiones.vista();
          if (partes[1] === 'avisos') return ENG.Avisos.vista();
          if (partes[1] === 'recordatorios') return ENG.Avisos.recordatorios();
          if (partes[1] === 'preguntas') return ENG.Editor.vista();
          if (partes[1] === 'clase') return ENG.Clase.host();
          if (partes[1] === 'importar') return ENG.Importar.vista();
          if (partes[1] === 'examenes') return ENG.Examenes.vista();
          if (partes[1] === 'reportes') return ENG.Reportes.vista();
          if (partes[1] === 'respaldo') return ENG.Respaldo.vista();
          if (partes[1] === 'semestre') return ENG.CambioSemestre.vista();
          if (partes[1] === 'analisis') return ENG.Analisis.vista();
          if (partes[1] === 'hojas') return ENG.Hojas.vista();
          return ENG.VistasMaestro.panel();
        case 'entrar':
          return (location.hash = '#/inicio');
        default:
          location.hash = '#/inicio';
      }
    } catch (e) {
      console.error(e);
      app().innerHTML = `<div class="card vacio">Algo falló: ${esc(e.message)} <br><button class="btn sec" onclick="location.hash='#/inicio'">Ir al inicio</button></div>`;
    }
  }
  window.addEventListener('hashchange', ruta);

  // ════════ Arranque ════════
  async function arrancar() {
    ENG.API.init();
    ENG.Banco.init();
    ENG.Banco.agregarExtra(ENG.ls.get('eng_extra', []));
    ENG.Banco.ponerOcultas(ENG.ls.get('eng_ocultas', []));
    if (ENG.API.modo === 'supabase' || ENG.API.modo === 'demo') {
      ENG.cargarExtras().catch(() => {});
      ENG.cargarOcultas().catch(() => {});
      ENG.latidoDiario();
    }
    if (ENG.API.modo === 'sin-config' || ENG.API.modo === 'sin-libreria') {
      barra();
      app().innerHTML = `<section class="card centro">
        ${ENG.engraneSVG({ tam: 80 })}
        <h2>${ENG.API.modo === 'sin-config' ? 'Falta conectar la base de datos' : 'No cargó la librería de Supabase'}</h2>
        <p>${ENG.API.modo === 'sin-config' ? 'Abre <b>config.js</b> y pega la URL y la llave <i>publishable</i> de tu proyecto de Supabase de Engrane (instrucciones en LEEME.md).' : 'Revisa tu conexión a internet y recarga.'}</p>
        <a class="btn pri" href="?demo=1">Probar en modo demo</a></section>`;
      return;
    }
    // Enlaces de WhatsApp: ?alumno=CODIGO o ?papas=CODIGO
    const q = new URLSearchParams(location.search);
    const linkAl = q.get('alumno'), linkPa = q.get('papas');
    if (linkAl || linkPa) {
      const limpio = location.pathname + (ENG.API.modo === 'demo' ? '?demo=1' : '');
      history.replaceState(null, '', limpio + '#/inicio');
      return entrarConCodigo(linkAl ? 'alumno' : 'papas', linkAl || linkPa);
    }
    // Recuperación de contraseña (llega desde el correo con #...type=recovery)
    let modalRecuperar = false;
    const pedirContrasena = () => {
      if (modalRecuperar) return;
      modalRecuperar = true;
      {
        ENG.modal({
          titulo: 'Nueva contraseña',
          html: `<label class="campo"><span>Escribe tu nueva contraseña</span><input id="np" type="password" minlength="6"></label>`,
          botones: [{ txt: 'Guardar', clase: 'pri', fn: async (el) => {
            try { await ENG.API.nuevaContrasena(el.querySelector('#np').value); ENG.toast('Contraseña cambiada ✔', 'ok'); arrancarMaestro(); }
            catch (e) { ENG.toast(e.message, 'mal'); return false; }
          } }],
          cerrable: false
        });
      }
    };
    ENG.API.alCambiarSesion((evento) => evento === 'PASSWORD_RECOVERY' && pedirContrasena());
    if (VIENE_DE_RECUPERAR) {
      const user = await ENG.API.sesion().catch(() => null);
      if (user) {
        pantallaEntrar();
        return pedirContrasena();
      }
    }
    const s = ENG.ls.get(SESION);
    if (s && (s.rol === 'alumno' || s.rol === 'papas') && s.codigo) return entrarConCodigo(s.rol, s.codigo);
    try {
      const user = await ENG.API.sesion();
      if (user) return await arrancarMaestro();
    } catch (e) {
      console.warn(e);
    }
    pantallaEntrar();
  }
  // Se lee antes de que Supabase limpie la dirección
  const VIENE_DE_RECUPERAR = /type=recovery/.test(location.hash);

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  document.addEventListener('DOMContentLoaded', arrancar);
})();
