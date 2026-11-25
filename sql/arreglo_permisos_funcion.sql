-- ENGRANE · Arreglo rápido: permisos para la función «engrane» (correr una vez)
-- Función «engrane» (notificaciones, invitaciones, recordatorios): usa la llave de servidor (service_role).
-- Los proyectos nuevos de Supabase (desde mayo 2026) ya no dan permisos automáticos a las tablas nuevas,
-- así que se los damos explícitamente, solo a las tablas de Engrane.
do $$
declare t text;
begin
  if not exists (select 1 from pg_roles where rolname = 'service_role') then return; end if;
  execute 'grant usage on schema public to service_role';
  for t in select tablename from pg_tables where schemaname = 'public' and tablename like 'eng\_%' loop
    execute format('grant select, insert, update, delete on public.%I to service_role', t);
  end loop;
  for t in select sequencename from pg_sequences where schemaname = 'public' and sequencename like 'eng\_%' loop
    execute format('grant usage, select, update on sequence public.%I to service_role', t);
  end loop;
end $$;

