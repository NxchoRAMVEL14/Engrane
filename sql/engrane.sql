-- ════════════════════════════════════════════════════════════════════
--  ENGRANE · Base de datos completa (Fases 1, 2 y 3)
--  Pega TODO este archivo en tu proyecto de Supabase de Engrane → SQL Editor → Run.
--  Se puede correr varias veces sin romper nada (es idempotente): si ya
--  corriste la versión de la Fase 1, solo agrega lo nuevo.
--  Proyecto propio e independiente: no depende de Escuadra ni de Remate.
--  Todas las tablas y funciones llevan el prefijo eng_.
-- ════════════════════════════════════════════════════════════════════

-- ─────────────────────────── TABLAS ───────────────────────────

-- Maestros (cuentas con correo y contraseña de Supabase Auth)
create table if not exists public.eng_perfiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  nombre                text not null default '',
  correo                text,
  rol                   text not null default 'pendiente'
                        check (rol in ('admin','maestro','pendiente','bloqueado')),
  materias              text[] not null default '{}',   -- materias aprobadas (las pone el admin)
  materias_solicitadas  text[] not null default '{}',   -- lo que el maestro dijo que imparte
  creado                timestamptz not null default now()
);

-- Alumnos (entran con su código; los papás con el código de papás)
create table if not exists public.eng_alumnos (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null,
  apodo         text not null,
  grupo         text not null default '',
  codigo        text not null unique,
  codigo_papas  text not null unique,
  materias      text[] not null default '{}',
  activo        boolean not null default true,
  notas         text not null default '',
  creado        timestamptz not null default now()
);

-- Cada actividad terminada (práctica, jefe final, examen, etc.)
create table if not exists public.eng_intentos (
  id            bigserial primary key,
  alumno_id     uuid not null references public.eng_alumnos(id) on delete cascade,
  materia       text not null,
  tema          text,
  modo          text not null,
  aciertos      int  not null default 0,
  total         int  not null default 0,
  calificacion  int,
  xp            int  not null default 0,
  segundos      int  not null default 0,
  detalle       jsonb not null default '[]'::jsonb,   -- [{p:'id-pregunta', ok:true}]
  creado        timestamptz not null default now()
);
create index if not exists eng_intentos_alumno_idx on public.eng_intentos (alumno_id, creado desc);

-- Repetición espaciada (cuaderno de errores) por pregunta
create table if not exists public.eng_preguntas_estado (
  alumno_id    uuid not null references public.eng_alumnos(id) on delete cascade,
  pregunta     text not null,
  materia      text not null,
  tema         text,
  caja         int  not null default 1,        -- 1 a 5 (sistema Leitner)
  aciertos     int  not null default 0,
  fallos       int  not null default 0,
  proxima      date not null default current_date,
  actualizado  timestamptz not null default now(),
  primary key (alumno_id, pregunta)
);

-- Calificaciones oficiales de la boleta (para comparar antes y después)
create table if not exists public.eng_calificaciones (
  id            bigserial primary key,
  alumno_id     uuid not null references public.eng_alumnos(id) on delete cascade,
  materia       text not null,
  sub           text not null default '',      -- s1, s2, s3 en módulos; vacío en asignaturas
  parcial       int  not null check (parcial between 1 and 3),
  calificacion  int  not null check (calificacion between 0 and 10),
  actualizado   timestamptz not null default now(),
  unique (alumno_id, materia, sub, parcial)
);


-- ─────────── Fases 2 y 3 ───────────
alter table public.eng_alumnos add column if not exists tel_alumno  text not null default '';
alter table public.eng_alumnos add column if not exists tel_papas   text not null default '';

-- Misiones que deja el maestro (con fecha límite)
create table if not exists public.eng_misiones (
  id            bigserial primary key,
  materia       text not null,
  tema          text,                       -- vacío = toda la materia
  modo          text not null default 'practica',
  meta          int  not null default 80 check (meta between 0 and 100),   -- % mínimo de aciertos
  titulo        text not null,
  nota          text not null default '',
  alumnos       uuid[],                     -- vacío = todos los que llevan la materia
  fecha_limite  date not null,
  creada_por    uuid references public.eng_perfiles(id) on delete set null,
  creado        timestamptz not null default now()
);

-- Avisos que aparecen en la app (y opcionalmente como notificación)
create table if not exists public.eng_avisos (
  id        bigserial primary key,
  titulo    text not null,
  texto     text not null default '',
  materia   text,                           -- vacío = todos
  alumnos   uuid[],                         -- vacío = todos los de la materia
  para      text not null default 'todos' check (para in ('alumnos','papas','todos')),
  hasta     date not null default (current_date + 7),
  autor     uuid references public.eng_perfiles(id) on delete set null,
  creado    timestamptz not null default now()
);

-- Preguntas que agregan los maestros desde la app
create table if not exists public.eng_preguntas_extra (
  id       bigserial primary key,
  materia  text not null,
  tema     text not null,
  datos    jsonb not null,                  -- mismo formato compacto que los archivos de contenido
  activo   boolean not null default true,
  autor    uuid references public.eng_perfiles(id) on delete set null,
  creado   timestamptz not null default now()
);

-- Salas de la clase en vivo
create table if not exists public.eng_salas (
  id          bigserial primary key,
  pin         text not null,
  materia     text not null,
  titulo      text not null default '',
  abierta     boolean not null default true,
  guardada    boolean not null default false,
  creada_por  uuid references public.eng_perfiles(id) on delete set null,
  creado      timestamptz not null default now()
);

-- Notificaciones al celular (Web Push). Las llaves las crea sola la función «engrane».
create table if not exists public.eng_push_config (
  id int primary key check (id = 1), public_key text not null, private_key text not null
);
create table if not exists public.eng_push_subs (
  id         bigserial primary key,
  endpoint   text not null unique,
  keys       jsonb not null,
  rol        text not null check (rol in ('alumno','papas','maestro')),
  alumno_id  uuid references public.eng_alumnos(id) on delete cascade,
  perfil_id  uuid references public.eng_perfiles(id) on delete cascade,
  creado     timestamptz not null default now()
);
create table if not exists public.eng_recordatorios (
  clave text primary key, enviado timestamptz not null default now(), n int not null default 0
);

-- ─────────────────────────── SEGURIDAD (RLS) ───────────────────────────
-- Solo el admin lee/escribe directo en las tablas. Todo lo demás pasa por
-- funciones que revisan el código del alumno/papá o el rol del maestro.

alter table public.eng_perfiles         enable row level security;
alter table public.eng_alumnos          enable row level security;
alter table public.eng_intentos         enable row level security;
alter table public.eng_preguntas_estado enable row level security;
alter table public.eng_calificaciones   enable row level security;
alter table public.eng_misiones         enable row level security;
alter table public.eng_avisos           enable row level security;
alter table public.eng_preguntas_extra  enable row level security;
alter table public.eng_salas            enable row level security;
alter table public.eng_push_config      enable row level security;   -- sin políticas: solo la función del servidor
alter table public.eng_push_subs        enable row level security;
alter table public.eng_recordatorios    enable row level security;   -- sin políticas: solo la función del servidor

-- ─────────────────────────── AYUDANTES ───────────────────────────

create or replace function public.eng__hoy() returns date
language sql stable set search_path = public as $$
  select (now() at time zone 'America/Mexico_City')::date
$$;

create or replace function public.eng__norm(t text) returns text
language sql immutable set search_path = public as $$
  select upper(regexp_replace(coalesce(t,''), '[^A-Za-z0-9]', '', 'g'))
$$;

create or replace function public.eng__codigo(n int default 6) returns text
language plpgsql volatile set search_path = public as $$
declare
  alfabeto text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';   -- sin 0/O, 1/I/L para no confundir
  hexa text := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
  s text := '';
  i int;
  b int;
begin
  for i in 1..n loop
    b := ('x' || substr(hexa, i*2-1, 2))::bit(8)::int;
    s := s || substr(alfabeto, 1 + (b % length(alfabeto)), 1);
  end loop;
  return s;
end $$;

create or replace function public.eng__codigo_libre() returns text
language plpgsql volatile security definer set search_path = public as $$
declare c text;
begin
  loop
    c := eng__codigo(6);
    exit when not exists (select 1 from eng_alumnos where codigo = c or codigo_papas = c);
  end loop;
  return c;
end $$;

create or replace function public.eng_es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from eng_perfiles where id = auth.uid() and rol = 'admin')
$$;

-- Materias que puede ver el usuario: NULL = todas (admin); '{}' = ninguna
create or replace function public.eng__mis_materias() returns text[]
language plpgsql stable security definer set search_path = public as $$
declare p eng_perfiles;
begin
  select * into p from eng_perfiles where id = auth.uid();
  if not found then return '{}'::text[]; end if;
  if p.rol = 'admin' then return null; end if;
  if p.rol = 'maestro' then return p.materias; end if;
  return '{}'::text[];
end $$;

create or replace function public.eng__es_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from eng_perfiles where id = auth.uid() and rol in ('admin','maestro'))
$$;

-- Políticas: el admin tiene acceso total a todas las tablas
do $$
declare t text;
begin
  foreach t in array array['eng_perfiles','eng_alumnos','eng_intentos','eng_preguntas_estado','eng_calificaciones','eng_misiones','eng_avisos','eng_preguntas_extra','eng_salas','eng_push_subs'] loop
    execute format('drop policy if exists eng_admin_todo on public.%I', t);
    execute format('create policy eng_admin_todo on public.%I for all to authenticated using (public.eng_es_admin()) with check (public.eng_es_admin())', t);
  end loop;
end $$;

-- El maestro puede leer su propio perfil
drop policy if exists eng_perfil_propio on public.eng_perfiles;
create policy eng_perfil_propio on public.eng_perfiles for select to authenticated using (id = auth.uid());

-- Estado completo de un alumno (uso interno; no se expone)
create or replace function public.eng__estado(p_id uuid, p_materias text[] default null) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'alumno', jsonb_build_object('id', a.id, 'nombre', a.nombre, 'apodo', a.apodo, 'grupo', a.grupo,
               'materias', case when p_materias is null then to_jsonb(a.materias)
                                else to_jsonb(array(select unnest(a.materias) intersect select unnest(p_materias))) end),
    'intentos', coalesce((
        select jsonb_agg(to_jsonb(x) order by x.creado)
        from (select id, materia, tema, modo, aciertos, total, calificacion, xp, segundos, detalle, creado
                from eng_intentos
               where alumno_id = a.id and (p_materias is null or materia = any(p_materias))
               order by creado desc limit 500) x), '[]'::jsonb),
    'estado', coalesce((
        select jsonb_agg(jsonb_build_object('p', pregunta, 'm', materia, 't', tema, 'c', caja,
                                            'a', aciertos, 'f', fallos, 'n', proxima))
          from eng_preguntas_estado
         where alumno_id = a.id and (p_materias is null or materia = any(p_materias))), '[]'::jsonb),
    'califs', coalesce((
        select jsonb_agg(jsonb_build_object('materia', materia, 'sub', sub, 'parcial', parcial, 'cal', calificacion)
                         order by materia, sub, parcial)
          from eng_calificaciones
         where alumno_id = a.id and (p_materias is null or materia = any(p_materias))), '[]'::jsonb),
    'xp_total', (select coalesce(sum(xp), 0) from eng_intentos
                  where alumno_id = a.id and (p_materias is null or materia = any(p_materias))),
    'misiones', coalesce((
        select jsonb_agg(jsonb_build_object('id', m.id, 'materia', m.materia, 'tema', m.tema, 'modo', m.modo, 'meta', m.meta,
                         'titulo', m.titulo, 'nota', m.nota, 'fecha_limite', m.fecha_limite, 'creado', m.creado) order by m.fecha_limite)
          from eng_misiones m
         where m.materia = any(a.materias) and (m.alumnos is null or cardinality(m.alumnos) = 0 or a.id = any(m.alumnos))
           and m.fecha_limite >= eng__hoy() - 21 and (p_materias is null or m.materia = any(p_materias))), '[]'::jsonb),
    'avisos', coalesce((
        select jsonb_agg(jsonb_build_object('id', v.id, 'titulo', v.titulo, 'texto', v.texto, 'materia', v.materia, 'para', v.para,
                         'creado', v.creado) order by v.creado desc)
          from (select * from eng_avisos v
                 where v.hasta >= eng__hoy() and (v.materia is null or v.materia = any(a.materias))
                   and (v.alumnos is null or cardinality(v.alumnos) = 0 or a.id = any(v.alumnos))
                 order by v.creado desc limit 10) v), '[]'::jsonb),
    'hoy', eng__hoy()
  )
  from eng_alumnos a where a.id = p_id
$$;

-- ─────────────────────────── ALUMNOS (con código) ───────────────────────────

create or replace function public.eng_alumno_estado(p_codigo text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_id uuid;
begin
  select id into v_id from eng_alumnos where codigo = eng__norm(p_codigo) and activo;
  if v_id is null then raise exception 'CODIGO_INVALIDO'; end if;
  return eng__estado(v_id, null);
end $$;

create or replace function public.eng_alumno_guardar(p_codigo text, p_intento jsonb, p_respuestas jsonb default '[]'::jsonb)
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare
  v_id     uuid;
  v_total  int;
  v_ac     int;
  v_xp     int;
  v_cal    int;
  v_creado timestamptz;
  v_nuevo  bigint;
  r        jsonb;
  v_ok     boolean;
  v_hoy    date := eng__hoy();
  v_mat    text := left(coalesce(p_intento->>'materia', ''), 40);
begin
  select id into v_id from eng_alumnos where codigo = eng__norm(p_codigo) and activo;
  if v_id is null then raise exception 'CODIGO_INVALIDO'; end if;
  if v_mat = '' then raise exception 'FALTA_MATERIA'; end if;

  v_total  := least(greatest(coalesce((p_intento->>'total')::int, 0), 0), 200);
  v_ac     := least(greatest(coalesce((p_intento->>'aciertos')::int, 0), 0), v_total);
  v_xp     := least(greatest(coalesce((p_intento->>'xp')::int, 0), 0), v_total * 25 + 150);
  v_cal    := case when p_intento ? 'calificacion' and p_intento->>'calificacion' is not null
                   then least(greatest((p_intento->>'calificacion')::int, 0), 10) end;
  -- Para intentos guardados sin internet: se respeta la hora del celular (máx. 14 días atrás)
  v_creado := least(greatest(coalesce((p_intento->>'creado')::timestamptz, now()), now() - interval '14 days'), now());

  insert into eng_intentos (alumno_id, materia, tema, modo, aciertos, total, calificacion, xp, segundos, detalle, creado)
  values (v_id, v_mat, nullif(left(coalesce(p_intento->>'tema', ''), 40), ''),
          left(coalesce(p_intento->>'modo', 'practica'), 20), v_ac, v_total, v_cal, v_xp,
          least(greatest(coalesce((p_intento->>'segundos')::int, 0), 0), 36000),
          coalesce(p_intento->'detalle', '[]'::jsonb), v_creado)
  returning id into v_nuevo;

  for r in select * from jsonb_array_elements(coalesce(p_respuestas, '[]'::jsonb)) loop
    continue when coalesce(r->>'p', '') = '';
    v_ok := coalesce((r->>'ok')::boolean, false);
    insert into eng_preguntas_estado as e (alumno_id, pregunta, materia, tema, caja, aciertos, fallos, proxima, actualizado)
    values (v_id, left(r->>'p', 40), v_mat, nullif(left(coalesce(r->>'t', ''), 40), ''),
            case when v_ok then 2 else 1 end,
            case when v_ok then 1 else 0 end,
            case when v_ok then 0 else 1 end,
            case when v_ok then v_hoy + 1 else v_hoy end,
            now())
    on conflict (alumno_id, pregunta) do update set
      caja        = case when v_ok then least(e.caja + 1, 5) else 1 end,
      aciertos    = e.aciertos + case when v_ok then 1 else 0 end,
      fallos      = e.fallos   + case when v_ok then 0 else 1 end,
      proxima     = case when v_ok then v_hoy + (array[1,2,4,7,14])[least(e.caja + 1, 5)] else v_hoy end,
      tema        = coalesce(excluded.tema, e.tema),
      actualizado = now();
  end loop;

  return jsonb_build_object('ok', true, 'id', v_nuevo,
           'xp_total', (select coalesce(sum(xp), 0) from eng_intentos where alumno_id = v_id));
end $$;

-- Ranking: alumnos y papás ven solo apodos; maestros ven también nombres
create or replace function public.eng_ranking(p_codigo text default null) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_yo     uuid;
  v_staff  boolean := eng__es_staff();
  v_semana timestamptz := (date_trunc('week', now() at time zone 'America/Mexico_City')) at time zone 'America/Mexico_City';
begin
  if p_codigo is not null then
    select id into v_yo from eng_alumnos where (codigo = eng__norm(p_codigo) or codigo_papas = eng__norm(p_codigo)) and activo;
  end if;
  if v_yo is null and not v_staff then raise exception 'SIN_ACCESO'; end if;

  return coalesce((
    select jsonb_agg(fila order by (fila->>'xp_semana')::int desc, (fila->>'xp_total')::int desc)
    from (
      select jsonb_build_object(
               'apodo', a.apodo,
               'nombre', case when v_staff then a.nombre else null end,
               'yo', a.id = v_yo,
               'xp_total',  coalesce((select sum(i.xp) from eng_intentos i where i.alumno_id = a.id), 0),
               'xp_semana', coalesce((select sum(i.xp) from eng_intentos i where i.alumno_id = a.id and i.creado >= v_semana), 0)
             ) as fila
        from eng_alumnos a
       where a.activo
    ) t), '[]'::jsonb);
end $$;

-- ─────────────────────────── PAPÁS (con código de papás) ───────────────────────────

create or replace function public.eng_papas_estado(p_codigo text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_id uuid;
begin
  select id into v_id from eng_alumnos where codigo_papas = eng__norm(p_codigo) and activo;
  if v_id is null then raise exception 'CODIGO_INVALIDO'; end if;
  return eng__estado(v_id, null);
end $$;

-- ─────────────────────────── MAESTROS ───────────────────────────

-- Se llama al entrar. Si no hay admin todavía, el primero en registrarse queda como admin.
create or replace function public.eng_registrar_perfil(p_nombre text default '', p_materias text[] default '{}')
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_rol text;
  p     eng_perfiles;
begin
  if v_uid is null then raise exception 'SIN_SESION'; end if;
  select * into p from eng_perfiles where id = v_uid;
  if not found then
    v_rol := case when exists (select 1 from eng_perfiles where rol = 'admin') then 'pendiente' else 'admin' end;
    insert into eng_perfiles (id, nombre, correo, rol, materias_solicitadas)
    values (v_uid, coalesce(nullif(trim(p_nombre), ''), ''),
            (select email from auth.users where id = v_uid), v_rol, coalesce(p_materias, '{}'))
    returning * into p;
  elsif (coalesce(trim(p_nombre), '') <> '' and p.nombre = '') or (cardinality(coalesce(p_materias, '{}')) > 0 and cardinality(p.materias_solicitadas) = 0) then
    update eng_perfiles
       set nombre = case when p.nombre = '' then coalesce(nullif(trim(p_nombre), ''), '') else p.nombre end,
           materias_solicitadas = case when cardinality(p.materias_solicitadas) = 0 then coalesce(p_materias, '{}') else p.materias_solicitadas end
     where id = v_uid returning * into p;
  end if;
  return to_jsonb(p);
end $$;

-- El maestro puede actualizar su nombre y las materias que dice impartir (no su rol ni sus materias aprobadas)
create or replace function public.eng_solicitar_materias(p_nombre text, p_materias text[]) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare p eng_perfiles;
begin
  update eng_perfiles set nombre = coalesce(nullif(trim(p_nombre), ''), nombre),
                          materias_solicitadas = coalesce(p_materias, '{}')
   where id = auth.uid() returning * into p;
  if not found then raise exception 'SIN_PERFIL'; end if;
  return to_jsonb(p);
end $$;

-- Lista de alumnos que puede ver el maestro (el admin ve también los códigos)
create or replace function public.eng_listar_alumnos() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_mat   text[] := eng__mis_materias();
  v_admin boolean := eng_es_admin();
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', a.id, 'nombre', a.nombre, 'apodo', a.apodo, 'grupo', a.grupo,
             'materias', case when v_admin then to_jsonb(a.materias)
                              else to_jsonb(array(select unnest(a.materias) intersect select unnest(v_mat))) end,
             'activo', a.activo, 'notas', case when v_admin then a.notas else '' end,
             'codigo', case when v_admin then a.codigo end,
             'codigo_papas', case when v_admin then a.codigo_papas end,
             'tel_alumno', case when v_admin then a.tel_alumno else '' end,
             'tel_papas', case when v_admin then a.tel_papas else '' end,
             'creado', a.creado) order by a.nombre)
      from eng_alumnos a
     where v_admin or a.materias && v_mat), '[]'::jsonb);
end $$;

-- Resumen para el tablero: XP total, XP de la semana, última actividad y días activos (60 días)
create or replace function public.eng_resumen_maestro() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_mat    text[] := eng__mis_materias();
  v_admin  boolean := eng_es_admin();
  v_semana timestamptz := (date_trunc('week', now() at time zone 'America/Mexico_City')) at time zone 'America/Mexico_City';
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'id', a.id,
      'xp_total',  coalesce((select sum(xp) from eng_intentos i where i.alumno_id = a.id and (v_admin or i.materia = any(v_mat))), 0),
      'xp_semana', coalesce((select sum(xp) from eng_intentos i where i.alumno_id = a.id and i.creado >= v_semana and (v_admin or i.materia = any(v_mat))), 0),
      'ultima',    (select max(creado) from eng_intentos i where i.alumno_id = a.id and (v_admin or i.materia = any(v_mat))),
      'dias', coalesce((select jsonb_agg(distinct (i.creado at time zone 'America/Mexico_City')::date)
                          from eng_intentos i
                         where i.alumno_id = a.id and i.creado > now() - interval '60 days'
                           and (v_admin or i.materia = any(v_mat))), '[]'::jsonb),
      'pendientes', (select count(*) from eng_preguntas_estado e
                      where e.alumno_id = a.id and e.proxima <= eng__hoy() and (v_admin or e.materia = any(v_mat)))
    ))
    from eng_alumnos a
    where a.activo and (v_admin or a.materias && v_mat)), '[]'::jsonb);
end $$;

create or replace function public.eng_estado_maestro(p_alumno uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_mat text[] := eng__mis_materias();
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  if v_mat is not null and not exists (select 1 from eng_alumnos where id = p_alumno and materias && v_mat) then
    raise exception 'SIN_ACCESO';
  end if;
  return eng__estado(p_alumno, v_mat);
end $$;

create or replace function public.eng_guardar_calif(p_alumno uuid, p_materia text, p_sub text, p_parcial int, p_cal int)
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare v_mat text[] := eng__mis_materias();
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  if v_mat is not null and not (p_materia = any(v_mat)) then raise exception 'SIN_ACCESO'; end if;
  if p_cal is null then
    delete from eng_calificaciones where alumno_id = p_alumno and materia = p_materia
       and sub = coalesce(p_sub, '') and parcial = p_parcial;
  else
    insert into eng_calificaciones (alumno_id, materia, sub, parcial, calificacion)
    values (p_alumno, p_materia, coalesce(p_sub, ''), p_parcial, p_cal)
    on conflict (alumno_id, materia, sub, parcial)
    do update set calificacion = excluded.calificacion, actualizado = now();
  end if;
  return jsonb_build_object('ok', true);
end $$;

-- ─────────────────────────── SOLO ADMIN ───────────────────────────

create or replace function public.eng_crear_alumno(p_nombre text, p_apodo text, p_grupo text, p_materias text[])
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare a eng_alumnos;
begin
  if not eng_es_admin() then raise exception 'SIN_ACCESO'; end if;
  if coalesce(trim(p_nombre), '') = '' then raise exception 'FALTA_NOMBRE'; end if;
  insert into eng_alumnos (nombre, apodo, grupo, codigo, codigo_papas, materias)
  values (trim(p_nombre), coalesce(nullif(trim(p_apodo), ''), 'Engrane Nuevo'), coalesce(p_grupo, ''),
          eng__codigo_libre(), eng__codigo_libre(), coalesce(p_materias, '{}'))
  returning * into a;
  return to_jsonb(a);
end $$;

create or replace function public.eng_regenerar_codigo(p_alumno uuid, p_tipo text) returns text
language plpgsql volatile security definer set search_path = public as $$
declare c text := eng__codigo_libre();
begin
  if not eng_es_admin() then raise exception 'SIN_ACCESO'; end if;
  if p_tipo = 'papas' then
    update eng_alumnos set codigo_papas = c where id = p_alumno;
  else
    update eng_alumnos set codigo = c where id = p_alumno;
  end if;
  return c;
end $$;

create or replace function public.eng_listar_perfiles() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not eng_es_admin() then raise exception 'SIN_ACCESO'; end if;
  return coalesce((select jsonb_agg(to_jsonb(p) order by p.creado) from eng_perfiles p), '[]'::jsonb);
end $$;

create or replace function public.eng_actualizar_perfil(p_id uuid, p_rol text, p_materias text[]) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare p eng_perfiles;
begin
  if not eng_es_admin() then raise exception 'SIN_ACCESO'; end if;
  if p_id = auth.uid() and p_rol <> 'admin' then raise exception 'NO_PUEDES_QUITARTE_ADMIN'; end if;
  update eng_perfiles set rol = coalesce(p_rol, rol), materias = coalesce(p_materias, materias)
   where id = p_id returning * into p;
  return to_jsonb(p);
end $$;

-- ─────────────────────────── FASE 2: MISIONES ───────────────────────────

-- ¿Puede el usuario actual trabajar con esta materia?
create or replace function public.eng__puede_materia(p_materia text) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare v_mat text[] := eng__mis_materias();
begin
  if not eng__es_staff() then return false; end if;
  return v_mat is null or p_materia = any(v_mat);
end $$;

create or replace function public.eng_mision_guardar(p_id bigint, p_materia text, p_tema text, p_modo text, p_meta int,
                                                     p_titulo text, p_nota text, p_alumnos uuid[], p_fecha date)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare m eng_misiones;
begin
  if not eng__puede_materia(p_materia) then raise exception 'SIN_ACCESO'; end if;
  if coalesce(trim(p_titulo), '') = '' then raise exception 'FALTA_TITULO'; end if;
  if p_id is null then
    insert into eng_misiones (materia, tema, modo, meta, titulo, nota, alumnos, fecha_limite, creada_por)
    values (p_materia, nullif(p_tema, ''), coalesce(p_modo, 'practica'), least(greatest(coalesce(p_meta, 80), 0), 100),
            trim(p_titulo), coalesce(p_nota, ''), case when cardinality(p_alumnos) > 0 then p_alumnos end, p_fecha, auth.uid())
    returning * into m;
  else
    update eng_misiones set materia = p_materia, tema = nullif(p_tema, ''), modo = coalesce(p_modo, 'practica'),
           meta = least(greatest(coalesce(p_meta, 80), 0), 100), titulo = trim(p_titulo), nota = coalesce(p_nota, ''),
           alumnos = case when cardinality(p_alumnos) > 0 then p_alumnos end, fecha_limite = p_fecha
     where id = p_id and (creada_por = auth.uid() or eng_es_admin()) returning * into m;
    if not found then raise exception 'SIN_ACCESO'; end if;
  end if;
  return to_jsonb(m);
end $$;

create or replace function public.eng_mision_borrar(p_id bigint) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
begin
  delete from eng_misiones where id = p_id and (creada_por = auth.uid() or eng_es_admin());
  if not found then raise exception 'SIN_ACCESO'; end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.eng_misiones_listar() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_mat text[] := eng__mis_materias();
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  return coalesce((select jsonb_agg(to_jsonb(m) order by m.fecha_limite desc) from eng_misiones m
                    where (v_mat is null or m.materia = any(v_mat)) and m.fecha_limite >= eng__hoy() - 60), '[]'::jsonb);
end $$;

-- ─────────────────────────── FASE 2: AVISOS ───────────────────────────

create or replace function public.eng_aviso_guardar(p_titulo text, p_texto text, p_materia text, p_alumnos uuid[], p_para text, p_dias int)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare v eng_avisos;
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  if nullif(p_materia, '') is null and not eng_es_admin() then raise exception 'ELIGE_MATERIA'; end if;
  if nullif(p_materia, '') is not null and not eng__puede_materia(p_materia) then raise exception 'SIN_ACCESO'; end if;
  if coalesce(trim(p_titulo), '') = '' then raise exception 'FALTA_TITULO'; end if;
  insert into eng_avisos (titulo, texto, materia, alumnos, para, hasta, autor)
  values (left(trim(p_titulo), 120), left(coalesce(p_texto, ''), 1000), nullif(p_materia, ''),
          case when cardinality(p_alumnos) > 0 then p_alumnos end,
          case when p_para in ('alumnos','papas','todos') then p_para else 'todos' end,
          eng__hoy() + least(greatest(coalesce(p_dias, 7), 1), 60), auth.uid())
  returning * into v;
  return to_jsonb(v);
end $$;

create or replace function public.eng_aviso_borrar(p_id bigint) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
begin
  delete from eng_avisos where id = p_id and (autor = auth.uid() or eng_es_admin());
  if not found then raise exception 'SIN_ACCESO'; end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.eng_avisos_listar() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_mat text[] := eng__mis_materias();
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  return coalesce((select jsonb_agg(to_jsonb(v) order by v.creado desc) from (
            select * from eng_avisos v where (v_mat is null or v.materia = any(v_mat) or v.autor = auth.uid())
             order by v.creado desc limit 60) v), '[]'::jsonb);
end $$;

-- ─────────────────────────── FASE 2: EDITOR DE PREGUNTAS ───────────────────────────

-- Todos (alumnos incluidos) cargan las preguntas activas: no son datos personales
create or replace function public.eng_preguntas_extra() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'materia', materia, 'tema', tema, 'datos', datos) order by id), '[]'::jsonb)
    from eng_preguntas_extra where activo
$$;

create or replace function public.eng_preguntas_extra_staff() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_mat text[] := eng__mis_materias();
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', x.id, 'materia', x.materia, 'tema', x.tema, 'datos', x.datos,
                     'activo', x.activo, 'creado', x.creado, 'autor', p.nombre, 'mia', x.autor = auth.uid()) order by x.id desc)
                     from eng_preguntas_extra x left join eng_perfiles p on p.id = x.autor
                    where v_mat is null or x.materia = any(v_mat)), '[]'::jsonb);
end $$;

create or replace function public.eng_pregunta_guardar(p_id bigint, p_materia text, p_tema text, p_datos jsonb, p_activo boolean)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare x eng_preguntas_extra;
begin
  if not eng__puede_materia(p_materia) then raise exception 'SIN_ACCESO'; end if;
  if jsonb_typeof(p_datos) <> 'array' or pg_column_size(p_datos) > 20000 then raise exception 'DATOS_INVALIDOS'; end if;
  if p_id is null then
    insert into eng_preguntas_extra (materia, tema, datos, activo, autor)
    values (p_materia, p_tema, p_datos, coalesce(p_activo, true), auth.uid()) returning * into x;
  else
    update eng_preguntas_extra set materia = p_materia, tema = p_tema, datos = p_datos, activo = coalesce(p_activo, activo)
     where id = p_id and (autor = auth.uid() or eng_es_admin()) returning * into x;
    if not found then raise exception 'SIN_ACCESO'; end if;
  end if;
  return to_jsonb(x);
end $$;

create or replace function public.eng_pregunta_borrar(p_id bigint) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
begin
  delete from eng_preguntas_extra where id = p_id and (autor = auth.uid() or eng_es_admin());
  if not found then raise exception 'SIN_ACCESO'; end if;
  return jsonb_build_object('ok', true);
end $$;

-- ─────────────────────────── FASE 2: CLASE EN VIVO ───────────────────────────

create or replace function public.eng_sala_crear(p_materia text, p_titulo text) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare s eng_salas; v_pin text;
begin
  if not eng__puede_materia(p_materia) then raise exception 'SIN_ACCESO'; end if;
  update eng_salas set abierta = false where creada_por = auth.uid() and abierta;
  loop
    v_pin := lpad((floor(random() * 900000) + 100000)::int::text, 6, '0');
    exit when not exists (select 1 from eng_salas where pin = v_pin and abierta);
  end loop;
  insert into eng_salas (pin, materia, titulo, creada_por) values (v_pin, p_materia, coalesce(p_titulo, ''), auth.uid())
  returning * into s;
  return to_jsonb(s);
end $$;

create or replace function public.eng_sala_cerrar(p_id bigint) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
begin
  update eng_salas set abierta = false where id = p_id and (creada_por = auth.uid() or eng_es_admin());
  return jsonb_build_object('ok', true);
end $$;

-- Salas abiertas (últimas 4 horas) de las materias del alumno
create or replace function public.eng_salas_activas(p_codigo text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare a eng_alumnos;
begin
  select * into a from eng_alumnos where codigo = eng__norm(p_codigo) and activo;
  if not found then raise exception 'CODIGO_INVALIDO'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', s.id, 'pin', s.pin, 'materia', s.materia, 'titulo', s.titulo) order by s.creado desc)
                     from eng_salas s where s.abierta and s.creado > now() - interval '4 hours' and s.materia = any(a.materias)), '[]'::jsonb);
end $$;

create or replace function public.eng_sala_buscar(p_codigo text, p_pin text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_ok boolean; s eng_salas;
begin
  select true into v_ok from eng_alumnos where codigo = eng__norm(p_codigo) and activo;
  if v_ok is null then raise exception 'CODIGO_INVALIDO'; end if;
  select * into s from eng_salas where pin = regexp_replace(coalesce(p_pin, ''), '\D', '', 'g') and abierta and creado > now() - interval '4 hours'
   order by creado desc limit 1;
  if not found then raise exception 'SALA_NO_EXISTE'; end if;
  return jsonb_build_object('id', s.id, 'pin', s.pin, 'materia', s.materia, 'titulo', s.titulo);
end $$;

-- Al terminar la clase el maestro guarda los resultados: cada alumno recibe su XP
create or replace function public.eng_clase_guardar(p_sala bigint, p_resultados jsonb) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare s eng_salas; r jsonb; v_al uuid; v_ac int; v_tot int; v_pu int; n int := 0;
begin
  select * into s from eng_salas where id = p_sala;
  if not found or not (s.creada_por = auth.uid() or eng_es_admin()) then raise exception 'SIN_ACCESO'; end if;
  if s.guardada then raise exception 'YA_GUARDADA'; end if;
  for r in select * from jsonb_array_elements(coalesce(p_resultados, '[]'::jsonb)) loop
    v_al := (r->>'alumno_id')::uuid;
    continue when not exists (select 1 from eng_alumnos where id = v_al and activo);
    v_tot := least(greatest(coalesce((r->>'total')::int, 0), 0), 60);
    v_ac  := least(greatest(coalesce((r->>'aciertos')::int, 0), 0), v_tot);
    v_pu  := coalesce((r->>'puesto')::int, 99);
    insert into eng_intentos (alumno_id, materia, tema, modo, aciertos, total, xp, segundos, detalle)
    values (v_al, s.materia, null, 'clase', v_ac, v_tot,
            least(v_ac * 10 + case v_pu when 1 then 50 when 2 then 30 when 3 then 20 else 0 end, v_tot * 25 + 150),
            least(greatest(coalesce((r->>'segundos')::int, 0), 0), 7200), '[]'::jsonb);
    n := n + 1;
  end loop;
  update eng_salas set guardada = true, abierta = false where id = p_sala;
  return jsonb_build_object('ok', true, 'guardados', n);
end $$;

-- ─────────────────────────── FASE 2: NOTIFICACIONES ───────────────────────────

create or replace function public.eng_push_guardar(p_codigo text, p_rol text, p_sub jsonb) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare v_id uuid;
begin
  if p_rol = 'papas' then select id into v_id from eng_alumnos where codigo_papas = eng__norm(p_codigo) and activo;
  else select id into v_id from eng_alumnos where codigo = eng__norm(p_codigo) and activo; end if;
  if v_id is null then raise exception 'CODIGO_INVALIDO'; end if;
  if coalesce(p_sub->>'endpoint', '') !~ '^https://' or jsonb_typeof(p_sub->'keys') <> 'object' then raise exception 'SUSCRIPCION_INVALIDA'; end if;
  insert into eng_push_subs (endpoint, keys, rol, alumno_id, perfil_id)
  values (p_sub->>'endpoint', p_sub->'keys', case when p_rol = 'papas' then 'papas' else 'alumno' end, v_id, null)
  on conflict (endpoint) do update set keys = excluded.keys, rol = excluded.rol, alumno_id = excluded.alumno_id, perfil_id = null;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.eng_push_guardar_maestro(p_sub jsonb) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  if coalesce(p_sub->>'endpoint', '') !~ '^https://' or jsonb_typeof(p_sub->'keys') <> 'object' then raise exception 'SUSCRIPCION_INVALIDA'; end if;
  insert into eng_push_subs (endpoint, keys, rol, alumno_id, perfil_id)
  values (p_sub->>'endpoint', p_sub->'keys', 'maestro', null, auth.uid())
  on conflict (endpoint) do update set keys = excluded.keys, rol = 'maestro', alumno_id = null, perfil_id = auth.uid();
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.eng_push_quitar(p_endpoint text) returns jsonb
language sql volatile security definer set search_path = public as $$
  delete from eng_push_subs where endpoint = p_endpoint returning jsonb_build_object('ok', true)
$$;

-- Cuántos celulares tienen activadas las notificaciones (para el panel)
create or replace function public.eng_push_resumen() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not eng__es_staff() then raise exception 'SIN_ACCESO'; end if;
  return coalesce((select jsonb_object_agg(coalesce(alumno_id::text, 'maestros'), n) from (
            select alumno_id, count(*) as n from eng_push_subs group by alumno_id) t), '{}'::jsonb);
end $$;

-- ─────────────────────────── PERMISOS ───────────────────────────

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.eng_perfiles, public.eng_alumnos, public.eng_intentos,
      public.eng_preguntas_estado, public.eng_calificaciones to authenticated;
grant usage, select on sequence public.eng_intentos_id_seq, public.eng_calificaciones_id_seq to authenticated;

-- Funciones internas: nadie las llama desde la app
revoke execute on function public.eng__estado(uuid, text[]) from public, anon, authenticated;
revoke execute on function public.eng__codigo(int)            from public, anon, authenticated;
revoke execute on function public.eng__codigo_libre()         from public, anon, authenticated;

-- Funciones para alumnos y papás (sin cuenta, con código)
grant execute on function public.eng_alumno_estado(text)                to anon, authenticated;
grant execute on function public.eng_alumno_guardar(text, jsonb, jsonb) to anon, authenticated;
grant execute on function public.eng_papas_estado(text)                 to anon, authenticated;
grant execute on function public.eng_ranking(text)                      to anon, authenticated;

-- Funciones para maestros (con cuenta)
revoke execute on function public.eng_registrar_perfil(text, text[])   from anon;
revoke execute on function public.eng_solicitar_materias(text, text[]) from anon;
revoke execute on function public.eng_listar_alumnos()                 from anon;
revoke execute on function public.eng_resumen_maestro()                from anon;
revoke execute on function public.eng_estado_maestro(uuid)             from anon;
revoke execute on function public.eng_guardar_calif(uuid, text, text, int, int) from anon;
revoke execute on function public.eng_crear_alumno(text, text, text, text[])    from anon;
revoke execute on function public.eng_regenerar_codigo(uuid, text)     from anon;
revoke execute on function public.eng_listar_perfiles()                from anon;
revoke execute on function public.eng_actualizar_perfil(uuid, text, text[]) from anon;
grant execute on function public.eng_registrar_perfil(text, text[])    to authenticated;
grant execute on function public.eng_solicitar_materias(text, text[])  to authenticated;
grant execute on function public.eng_listar_alumnos()                  to authenticated;
grant execute on function public.eng_resumen_maestro()                 to authenticated;
grant execute on function public.eng_estado_maestro(uuid)              to authenticated;
grant execute on function public.eng_guardar_calif(uuid, text, text, int, int) to authenticated;
grant execute on function public.eng_crear_alumno(text, text, text, text[])    to authenticated;
grant execute on function public.eng_regenerar_codigo(uuid, text)      to authenticated;
grant execute on function public.eng_listar_perfiles()                 to authenticated;
grant execute on function public.eng_actualizar_perfil(uuid, text, text[]) to authenticated;
grant execute on function public.eng_es_admin()                        to authenticated;


-- Fases 2 y 3
grant usage, select on sequence public.eng_misiones_id_seq, public.eng_avisos_id_seq, public.eng_preguntas_extra_id_seq,
      public.eng_salas_id_seq, public.eng_push_subs_id_seq to authenticated;
grant select, insert, update, delete on public.eng_misiones, public.eng_avisos, public.eng_preguntas_extra,
      public.eng_salas, public.eng_push_subs to authenticated;
revoke all on public.eng_push_config, public.eng_recordatorios from anon, authenticated;
revoke execute on function public.eng__puede_materia(text) from public, anon, authenticated;
-- para alumnos y papás (con código) y para todos
grant execute on function public.eng_preguntas_extra()                to anon, authenticated;
grant execute on function public.eng_salas_activas(text)              to anon, authenticated;
grant execute on function public.eng_sala_buscar(text, text)          to anon, authenticated;
grant execute on function public.eng_push_guardar(text, text, jsonb)  to anon, authenticated;
grant execute on function public.eng_push_quitar(text)                to anon, authenticated;
-- solo maestros
do $$
declare f text;
begin
  foreach f in array array[
    'eng_mision_guardar(bigint, text, text, text, int, text, text, uuid[], date)', 'eng_mision_borrar(bigint)', 'eng_misiones_listar()',
    'eng_aviso_guardar(text, text, text, uuid[], text, int)', 'eng_aviso_borrar(bigint)', 'eng_avisos_listar()',
    'eng_preguntas_extra_staff()', 'eng_pregunta_guardar(bigint, text, text, jsonb, boolean)', 'eng_pregunta_borrar(bigint)',
    'eng_sala_crear(text, text)', 'eng_sala_cerrar(bigint)', 'eng_clase_guardar(bigint, jsonb)',
    'eng_push_guardar_maestro(jsonb)', 'eng_push_resumen()'] loop
    execute format('revoke execute on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

-- Listo. Siguiente paso: abre la app, entra como maestro y regístrate.
-- La primera cuenta que se registre queda como ADMIN (tú).
