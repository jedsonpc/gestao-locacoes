-- Permissões mínimas para a Edge Function segura de gestão de usuários.
grant usage on schema public to service_role;
grant select, insert, update on table public.app_users to service_role;

