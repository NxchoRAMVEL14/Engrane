# ⚙️ Engrane · v2.4.0 (Fases 1, 2, 3 y tandas 1, 2 y 3)

App de práctica para los alumnos que tú elijas del CETAC 19: lecciones, juegos, exámenes simulados,
niveles, misiones, avisos, notificaciones y **clase en vivo por equipos**, con **12 materias (3° y 4° semestre)**
alineadas a los programas de la SEP y un **laboratorio virtual**. GitHub Pages + Supabase.

> **Engrane es 100 % independiente**: su propia cuenta y proyecto de Supabase, su propio repositorio.
> No lee ni escribe nada de Escuadra ni de Remate.

---

## 🆕 Actualizar a v2.4 (tanda 3) · 7 min

1. **Supabase → SQL Editor**: pega todo `sql/engrane.sql` y dale **Run** (agrega la función del análisis; no borra nada).
2. **GitHub → Add file → Upload files**, respetando carpetas:
   - `index.html`, `sw.js`, `LEEME.md`
   - `css/engrane.css`
   - `js/api.js`, `js/app.js`, `js/util.js`, `js/vistas-maestro.js`, `js/tanda3.js` (nuevo)
   - `sql/engrane.sql` (para que tu copia quede al día)
3. Espera 1–2 min y abre la app. No hay que tocar la función `engrane`.

**Nuevo en v2.4**
- 📊 **Análisis del grupo** (maestros): mapa de calor alumno × tema, los temas más flojos con botón para crear misión y las 15 preguntas más falladas con su respuesta correcta.
- 🖨️ **Hojas para imprimir**: práctica o examen en papel por temas (o con las más falladas), 10 a 30 preguntas, versiones A y B barajadas, hoja de respuestas con explicación opcional. En el celular: Imprimir → Guardar como PDF.
- 🌙 **Modo oscuro** para todos: menú ☰ → Apariencia (automática según el celular, clara u oscura).
- ❓ **Ayuda** por rol y aviso de **novedades** que aparece una vez tras cada actualización.
- Arreglos: la franja verde vacía del laboratorio y el filtro por grupo de «Cambio de semestre».

## Actualizar a v2.3 (tanda 2) · 5 min

**No hay cambios en Supabase** (ni SQL ni función). Solo sube archivos a GitHub:

1. En tu repositorio: **Add file → Upload files** y arrastra, respetando carpetas:
   - `index.html`, `sw.js`
   - `css/engrane.css`
   - `js/app.js`, `js/util.js`, `js/editor.js`, `js/vistas-alumno.js`, `js/vistas-maestro.js`, `js/tanda2.js` (nuevo)
   - `contenido/catalogo.js` y los 6 nuevos: `ingles4.js`, `modulo3.js`, `matematico4.js`, `ciencias4.js`, `sociales3.js`, `historica1.js`
2. Espera 1–2 min a que GitHub Pages publique y abre la app; los celulares se actualizan solos al volver a abrirla.
3. Al iniciar el semestre: menú → **📅 Cambio de semestre** → Automático → Aplicar.

**Nuevo en v2.3**
- 📚 6 materias de **4° semestre** (527 preguntas, 44 temas): Inglés IV, Módulo III (S1, S2, S3), Pensamiento
  Matemático IV, Ciencias Naturales IV, Ciencias Sociales III y Conciencia Histórica I.
- 🗂️ Materias agrupadas por semestre en todas las listas.
- 📅 **Cambio de semestre** (admin): pasa a todos tus alumnos a las materias que siguen, sin borrar su historial.
- 🧪 **Laboratorio virtual** (alumnos y maestros): neumática con símbolos ISO (3/2, 5/2 biestable, función Y y O),
  calculadora de fuerza de cilindros, PLC en escalera (arranque–paro con enclavamiento, compuertas y TON).
  10 retos que dan 20 XP una vez al día y quedan en el historial del alumno.

## Actualizar a v2.2 (tanda 1) · 10 min

1. **SQL Editor** → pega TODO `sql/engrane.sql` → **Run** (agrega lo nuevo, no borra nada).
2. **Edge Functions → engrane → Code** → pega TODO `supabase/functions/engrane/index.ts` → **Deploy**
   (revisa que «Verify JWT» siga apagado).
3. **GitHub**: sube los archivos que cambiaron (`index.html`, `sw.js`, `css/`, `js/`, `contenido/catalogo.js`).
4. **Latido desde GitHub** (recomendado para vacaciones): en tu repositorio → **Add file → Create new file** →
   nombre `.github/workflows/latido.yml` → pega el contenido de ese archivo → **Commit**.
   Pruébalo en **Actions → Latido Engrane → Run workflow** (debe salir ✅ verde).

**Qué trae:**
- 🔑 **Maestros sin correo**: «Crear cuenta» genera una contraseña temporal que mandas por WhatsApp; al entrar, el maestro pone la suya.
- ⚑ **Reportar preguntas**: alumnos y maestros marcan errores; tú los ves en ⚑ Reportes, puedes **ocultar** la pregunta para todos y copiar los reportes para corregirlos.
- 📅 **Exámenes**: fecha, parcial y temas; los alumnos ven cuenta regresiva y **Repaso intensivo** (prioriza sus temas flojos y sus errores); notificación 3 días y 1 día antes (también a papás).
- ⚡ **Hoy te toca**: el repaso del examen aparece primero y se marca ✔ al hacerlo.
- 💾 **Respaldo**: descarga todo en un archivo (y restaurar). El panel te recuerda si pasaron 7 días.
- 🫀 **Latido**: la app, los recordatorios automáticos y GitHub mantienen activo el proyecto gratis.

## 1. Crear el proyecto de Supabase · 5 min

1. Con tu cuenta nueva entra a supabase.com → **New project**. Nombre: `engrane`.
   Región: la más cercana (p. ej. *East US* o *West US*). Guarda la contraseña de la base de datos.
2. Cuando termine de crearse: **SQL Editor → New query** → pega TODO `sql/engrane.sql` → **Run**.
   (Se puede volver a correr sin problema).
3. **Project Settings → API Keys** (o «Data API»): copia la **Project URL** y la llave
   **publishable** (`sb_publishable_…`; si no aparece, la **anon public**).
   ⚠️ Nunca uses la llave *secret* / *service_role* en la app.
4. **Authentication → URL Configuration**:
   - **Site URL**: `https://TU-USUARIO.github.io/engrane/`
   - **Redirect URLs → Add URL**: `https://TU-USUARIO.github.io/engrane/**`
   (Así funcionan «olvidé mi contraseña» y las invitaciones a maestros).
5. (Opcional) **Authentication → Sign In / Providers → Email**: si apagas «Confirm email»,
   los maestros entran sin confirmar su correo.

## 2. Subir a GitHub Pages · 5 min

1. `config.js` **ya trae** la Project URL y la llave publishable de tu proyecto (`lkhgxvokjbymgerkyxrz`).
   (Opcional) En `APP_URL` pon la dirección de la app.
2. Repositorio nuevo `engrane` → arrastra **todo el contenido** de esta carpeta → **Commit**.
3. **Settings → Pages → Branch: main / (root) → Save**. Queda en `https://TU-USUARIO.github.io/engrane/`.

## 3. Función de notificaciones · 5 min

1. Supabase → **Edge Functions → Deploy a new function → Via Editor**. Nombre: **`engrane`**.
2. Borra lo que trae, pega TODO `supabase/functions/engrane/index.ts` → **Deploy**.
3. En los ajustes de la función **apaga «Verify JWT»** (igual que en Remate) → Save.
4. Corre `sql/engrane_notificaciones.sql` en el **SQL Editor** (ya trae los datos de tu proyecto).

Las llaves de notificación se crean solas la primera vez. Si este paso no se hace, la app funciona
igual, solo sin notificaciones push (WhatsApp sí funciona siempre).

## 4. Clase en vivo (tiempo real)

Usa **Supabase Realtime** (canales «broadcast»), que viene activo en proyectos nuevos. Si al abrir una
sala sale «No se pudo conectar en tiempo real»: **Project Settings → Realtime** y permite el acceso a
canales públicos (que no esté en «Private channels only»).

## 5. Primer uso

1. Abre la app → **Soy maestro → Crear cuenta**. **La primera cuenta queda como ADMIN** (tú),
   así que créala tú antes de compartir la app.
2. **📥 Importar** (pestaña del panel): copia tu lista desde Excel, Google Sheets o la lista de
   asistencia y pégala; elige grupo y materias. También puedes pegar las **calificaciones de un parcial**
   (nombre + calificación). O da de alta uno por uno con **+ Nuevo alumno**.
   - Pilotos: Héctor → Inglés III · Isai y Juan Pablo → Módulo II. Puedes activarles más materias.
3. En **🔑 Accesos** de cada alumno manda por **WhatsApp** su enlace (y el de los papás).
4. Pide que hagan primero el **Diagnóstico** y que activen las **🔔 notificaciones**
   (en iPhone hay que instalar la app primero: Compartir → «Agregar a inicio»).
5. **Otros maestros**: en **👩‍🏫 Maestros → Crear cuenta** escribes su correo y materias; Engrane te da una
   contraseña temporal para mandarla por WhatsApp. (El correo de invitación de Supabase solo llega a los
   miembros de tu equipo de Supabase, máximo 2 por hora).
6. **Cada semana**: 💾 Respaldo → Descargar, y guarda el archivo en tu Drive.

## 6. Probar sin Supabase (modo demo)

Abre `…/engrane/?demo=1`. Todo se guarda solo en ese equipo. Alumnos `DEMO11`, `DEMO22`, `DEMO33`;
papás `PAPA11`, `PAPA22`, `PAPA33`; maestro: cualquier correo y contraseña.
Para probar la clase en vivo en demo: abre dos pestañas del mismo navegador (maestro y alumno).

## 7. ¿Qué incluye?

**Contenido (1 183 preguntas, 93 temas, cada tema = un propósito formativo SEP o un submódulo de la carrera)**
| Materia | Temas | Preguntas |
|---|---|---|
| **3° semestre** | | |
| Inglés III «What We Were, We Share» (con audio y **pronunciación con micrófono**) | 8 | 136 |
| Módulo II · S1, S2 y S3 | 15 | 207 |
| Lengua y Comunicación III | 7 | 83 |
| Pensamiento Matemático III | 6 | 84 |
| Ciencias Naturales, Experimentales y Tecnología III | 8 | 91 |
| Pensamiento Filosófico y Humanidades II | 5 | 55 |
| **4° semestre** | | |
| Inglés IV «Should I Stay or Should I Go?» (con audio y pronunciación) | 8 | 104 |
| Módulo III «Programa dispositivos de control» · S1, S2 y S3 | 12 | 140 |
| Pensamiento Matemático IV «Trigonometría y geometría analítica» | 7 | 87 |
| Ciencias Naturales IV «El poder de la química» | 8 | 95 |
| Ciencias Sociales III «Las dinámicas de la realidad actual» | 5 | 56 |
| Conciencia Histórica I «Coordenadas de la Historia» | 4 | 45 |

**Alumno**: apodo de mecatrónica, niveles, XP, racha, insignias, ranking semanal; por materia:
diagnóstico, semáforo de temas, repaso espaciado de errores, examen simulado con calificación estilo
boleta, contra reloj; por tema: lección, práctica, memorama y jefe final. Misiones con fecha, avisos,
notificaciones y **Clase en vivo** desde su celular. Sin internet sigue funcionando y sube al reconectar.

**Papás**: reporte semanal, misiones cumplidas, avisos, notificaciones y «Prueba lo que tu hijo está
viendo» (no cuenta para el alumno).

**Maestro**
- 🎯 **Misiones**: tema + actividad + % mínimo + fecha límite; ves quién cumplió.
- 📣 **Avisos**: a alumnos, papás o ambos; por notificación y/o WhatsApp.
- 🔔 **Recordatorios**: quién no ha practicado o tiene misión pendiente; WhatsApp o push en un toque.
- ✏️ **Mis preguntas**: agrega tus propias preguntas a cualquier tema (opción múltiple, V/F, completar,
  numérica con margen, ordenar, relacionar y pronunciación).
- 🔴 **Clase en vivo**: proyectas el PIN, los alumnos contestan en su celular, por equipos (Pistones,
  Servos, Engranes, Bielas) o individual, con podio y XP para cada uno.
- 📥 **Importar**: pega alumnos (con teléfonos) y calificaciones de parcial desde Excel; **⬇️ Exportar** el avance a CSV.
- Tablero con alertas, boleta, reporte imprimible, «Ver como alumno», maestros invitados.

## 8. Actualizar después

- Sube los archivos que cambien **y también `sw.js`** con versión nueva (así se actualizan los celulares).
- Preguntas nuevas en `contenido/*.js`: **siempre al final** de cada tema. Lo más fácil: usa
  **✏️ Mis preguntas** en la app.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html`, `css/`, `js/` | La app (`fase2.js` misiones/avisos/push/importar, `clase.js` clase en vivo, `editor.js` preguntas) |
| `contenido/` | Catálogo y las 12 materias |
| `config.js` | Datos de tu proyecto de Supabase (ya llenos) |
| `sql/engrane.sql` | Base de datos completa (tablas, seguridad y funciones) |
| `sql/engrane_notificaciones.sql` | Recordatorios automáticos cada 15 min (ya lleno) |
| `supabase/functions/engrane/index.ts` | Función de notificaciones e invitaciones |
| `img/` | Logo e íconos (tu ícono de Gemini) |
| `.github/workflows/latido.yml` | Latido cada 2 días desde GitHub para que Supabase no pause el proyecto |
| `js/tanda1.js` | Reportes, exámenes, repaso intensivo, respaldo y latido |
| `js/tanda2.js` | Laboratorio virtual y cambio de semestre |
| `js/tanda3.js` | Modo oscuro, análisis del grupo, hojas para imprimir, ayuda y novedades |
| `sw.js`, `manifest.webmanifest` | Instalar como app y funcionar sin internet |

**Fuentes del contenido**: SEP · MCCEMS Modelo Educativo 2025 (programas de Inglés III, Lengua y
Comunicación III, Pensamiento Matemático III, Ciencias Naturales, Experimentales y Tecnología III y
Pensamiento Filosófico y Humanidades II); SEP · Programa de estudios de Técnico en Mecatrónica
(junio 2024), Módulo II; NOM-008-SCFI-2002; NOM-017-STPS-2008; ISO 1219. Todos los textos y
ejemplos literarios son originales de Engrane.
