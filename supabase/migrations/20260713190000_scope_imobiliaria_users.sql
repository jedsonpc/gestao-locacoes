-- Separa os perfis por aplicativo e preserva somente os acessos da Imobiliária.
alter table public.app_users add column if not exists app_key text;

update public.app_users
set app_key = case
  when lower(email) like '%@riodospassos.com' or invited_by is not null then 'imobiliaria'
  else 'locacoes'
end
where app_key is null or btrim(app_key) = '';

update public.app_users
set name = initcap(replace(replace(replace(split_part(email, '@', 1), '.', ' '), '_', ' '), '-', ' '))
where btrim(coalesce(name, '')) = '';

alter table public.app_users alter column app_key set default 'locacoes';
alter table public.app_users alter column app_key set not null;
alter table public.app_users drop constraint if exists app_users_app_key_check;
alter table public.app_users add constraint app_users_app_key_check
  check (app_key in ('imobiliaria', 'locacoes'));

create index if not exists app_users_app_key_idx on public.app_users(app_key, active, name);

update auth.users as auth_user
set raw_app_meta_data = coalesce(auth_user.raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('app', 'imobiliaria', 'app_key', 'imobiliaria'),
    updated_at = now()
from public.app_users as app_user
where app_user.user_id = auth_user.id
  and app_user.app_key = 'imobiliaria';

create or replace function public.handle_imobiliaria_auth_user()
returns trigger language plpgsql security definer set search_path=public as $$
declare
  metadata_role text;
  metadata_app_key text;
  resolved_app_key text;
begin
  metadata_role := lower(
    translate(
      coalesce(new.raw_app_meta_data->>'role', new.raw_user_meta_data->>'role', ''),
      'áàâãäéèêëíìîïóòôõöúùûüç',
      'aaaaaeeeeiiiiooooouuuuc'
    )
  );

  metadata_app_key := lower(coalesce(
    new.raw_app_meta_data->>'app_key',
    new.raw_app_meta_data->>'app',
    new.raw_user_meta_data->>'app_key',
    new.raw_user_meta_data->>'app',
    ''
  ));

  resolved_app_key := case
    when metadata_app_key in ('imobiliaria', 'locacoes') then metadata_app_key
    when lower(coalesce(new.email, '')) like '%@riodospassos.com' then 'imobiliaria'
    else 'locacoes'
  end;

  insert into public.app_users(user_id, name, email, role, app_key)
  values(
    new.id,
    coalesce(
      nullif(btrim(new.raw_user_meta_data->>'name'), ''),
      initcap(replace(replace(replace(split_part(coalesce(new.email, ''), '@', 1), '.', ' '), '_', ' '), '-', ' '))
    ),
    coalesce(new.email, ''),
    case
      when metadata_role in ('admin', 'administrador', 'administrator', 'owner', 'proprietario', 'master') then 'admin'
      when metadata_role in ('financeiro', 'operacional', 'consulta') then metadata_role
      else 'consulta'
    end,
    resolved_app_key
  ) on conflict(user_id) do update set
    name = case when btrim(public.app_users.name) = '' then excluded.name else public.app_users.name end,
    email = excluded.email,
    role = case when excluded.role = 'admin' then 'admin' else public.app_users.role end,
    app_key = case when excluded.app_key = 'imobiliaria' then 'imobiliaria' else public.app_users.app_key end,
    active = case when excluded.role = 'admin' then true else public.app_users.active end,
    updated_at = now();
  return new;
end; $$;

drop trigger if exists on_imobiliaria_auth_user_created on auth.users;
create trigger on_imobiliaria_auth_user_created
after insert or update of email, raw_app_meta_data, raw_user_meta_data on auth.users
for each row execute function public.handle_imobiliaria_auth_user();
