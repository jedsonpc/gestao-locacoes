-- Sincroniza administradores definidos nos metadados do Supabase Auth.
update public.app_users as app_user
set role = 'admin', active = true, updated_at = now()
from auth.users as auth_user
where app_user.user_id = auth_user.id
  and lower(
    translate(
      coalesce(auth_user.raw_app_meta_data->>'role', auth_user.raw_user_meta_data->>'role', ''),
      'áàâãäéèêëíìîïóòôõöúùûüç',
      'aaaaaeeeeiiiiooooouuuuc'
    )
  ) in ('admin', 'administrador', 'administrator', 'owner', 'proprietario', 'master');

create or replace function public.handle_imobiliaria_auth_user()
returns trigger language plpgsql security definer set search_path=public as $$
declare
  metadata_role text;
begin
  metadata_role := lower(
    translate(
      coalesce(new.raw_app_meta_data->>'role', new.raw_user_meta_data->>'role', ''),
      'áàâãäéèêëíìîïóòôõöúùûüç',
      'aaaaaeeeeiiiiooooouuuuc'
    )
  );

  insert into public.app_users(user_id,name,email,role)
  values(
    new.id,
    coalesce(new.raw_user_meta_data->>'name',''),
    coalesce(new.email,''),
    case
      when metadata_role in ('admin','administrador','administrator','owner','proprietario','master') then 'admin'
      when metadata_role in ('financeiro','operacional','consulta') then metadata_role
      else 'consulta'
    end
  ) on conflict(user_id) do update set
    email=excluded.email,
    role=case when excluded.role='admin' then 'admin' else public.app_users.role end,
    active=case when excluded.role='admin' then true else public.app_users.active end,
    updated_at=now();
  return new;
end; $$;

drop trigger if exists on_imobiliaria_auth_user_created on auth.users;
create trigger on_imobiliaria_auth_user_created
after insert or update of email, raw_app_meta_data, raw_user_meta_data on auth.users
for each row execute function public.handle_imobiliaria_auth_user();
