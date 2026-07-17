-- Cadastro central de usuários e perfis do App Imobiliária.
create table if not exists public.app_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null,
  role text not null default 'consulta' check (role in ('admin','financeiro','operacional','consulta')),
  active boolean not null default true,
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists app_users_email_unique on public.app_users(lower(email));
alter table public.app_users enable row level security;

drop policy if exists "user reads own app profile" on public.app_users;
create policy "user reads own app profile" on public.app_users for select to authenticated
using (user_id=auth.uid());

-- Preserva o proprietário atual como administrador e converte os demais
-- usuários existentes para consulta até que o perfil seja revisado no app.
insert into public.app_users(user_id,name,email,role,active)
select id,
       coalesce(raw_user_meta_data->>'name',''),
       coalesce(email,''),
       case
         when lower(coalesce(email,''))='jedsonpc@hotmail.com' then 'admin'
         when raw_app_meta_data->>'role' in ('admin','financeiro','operacional','consulta') then raw_app_meta_data->>'role'
         else 'consulta'
       end,
       true
from auth.users
on conflict(user_id) do update set
  email=excluded.email,
  name=case when public.app_users.name='' then excluded.name else public.app_users.name end,
  updated_at=now();

create or replace function public.handle_imobiliaria_auth_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.app_users(user_id,name,email,role)
  values(
    new.id,
    coalesce(new.raw_user_meta_data->>'name',''),
    coalesce(new.email,''),
    case when new.raw_app_meta_data->>'role' in ('admin','financeiro','operacional','consulta')
      then new.raw_app_meta_data->>'role' else 'consulta' end
  ) on conflict(user_id) do update set email=excluded.email,updated_at=now();
  return new;
end; $$;

drop trigger if exists on_imobiliaria_auth_user_created on auth.users;
create trigger on_imobiliaria_auth_user_created
after insert or update of email on auth.users
for each row execute function public.handle_imobiliaria_auth_user();

grant select on public.app_users to authenticated;
