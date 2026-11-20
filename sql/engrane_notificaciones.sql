-- ════════════════════════════════════════════════════════════════════
--  ENGRANE · Recordatorios automáticos (correr UNA vez, después de
--  publicar la función «engrane» en Edge Functions).
--
--  Ya trae los datos de tu proyecto de Engrane (los mismos de config.js).
--
--  Cada 15 minutos llama a la función; ella decide qué toca mandar:
--   · 7–9 pm: «no pierdas tu racha» al alumno que practicó ayer y hoy no.
--   · 4–8 pm: misión que vence mañana y no está cumplida.
--   · Domingo 6–8 pm: resumen de la semana a los papás.
--   · Lunes 7:30–11 am: resumen de la semana a los maestros.
--  Cada aviso se manda una sola vez (tabla eng_recordatorios).
-- ════════════════════════════════════════════════════════════════════
create extension if not exists pg_net;
create extension if not exists pg_cron;

do $$
declare
  v_url text := 'https://lkhgxvokjbymgerkyxrz.supabase.co';      -- 👉 tu Project URL
  v_key text := 'sb_publishable_Hh0dHh233fCpTO_e5A76Vg_nMoi6pKt';       -- 👉 tu llave publishable
begin
  if v_url like '%TU-PROYECTO%' or v_key like 'PEGA-AQUI%' then
    raise exception 'Primero cambia las 2 líneas marcadas con 👉 (Project URL y llave publishable) y vuelve a correr.';
  end if;
  v_url := rtrim(v_url, '/');

  perform cron.unschedule(jobid) from cron.job where jobname = 'engrane-recordatorios';
  perform cron.schedule('engrane-recordatorios', '*/15 * * * *', format($cmd$
    select net.http_post(
      url := %L,
      headers := jsonb_build_object('Content-Type', 'application/json', 'apikey', %L),
      body := jsonb_build_object('action', 'cron'),
      timeout_milliseconds := 20000
    );
  $cmd$, v_url || '/functions/v1/engrane', v_key));
end $$;

-- Para revisar que corre: select * from cron.job_run_details order by start_time desc limit 5;
-- Para apagarlo:          select cron.unschedule('engrane-recordatorios');
