-- =====================================================================
-- Planet'Claim — schéma Supabase
-- À exécuter UNE fois : Supabase > SQL Editor > New query > coller > Run.
-- Ré-exécutable sans risque (ne supprime aucune donnée).
-- =====================================================================
-- Rôles : admin (tout + accès), staff (équipe), cf (Coste Fermon, lecture de l'espace partagé).
-- Personne n'a accès tant que son e-mail n'est pas dans public.members.

-- ---------- tables ----------
create table if not exists public.members (
  email text primary key check (email = lower(email)),
  role  text not null check (role in ('admin','staff','cf')),
  name  text not null default '',
  added bigint
);

create table if not exists public.profiles (
  uid   uuid primary key references auth.users(id) on delete cascade,
  name  text not null default '',
  email text not null default '',
  role  text not null default '',
  seen  bigint
);

-- Toutes les données de l'application : une ligne = un document (collection + identifiant).
create table if not exists public.docs (
  col        text not null check (col ~ '^[a-z_]{1,40}$'),
  id         text not null check (length(id) between 1 and 200),
  data       jsonb not null,
  ts         double precision,
  updated_by uuid default auth.uid(),
  updated_at timestamptz not null default now(),
  primary key (col, id)
);
create index if not exists docs_col_ts on public.docs (col, ts desc);

-- ---------- fonctions d'accès ----------
-- Rôle de l'utilisateur connecté (null si non inscrit ou e-mail non confirmé).
create or replace function public.my_role() returns text
language sql stable security definer set search_path = public, auth as $$
  select m.role
  from auth.users u
  join public.members m on m.email = lower(u.email)
  where u.id = auth.uid() and u.email_confirmed_at is not null
$$;
revoke all on function public.my_role() from public, anon;
grant execute on function public.my_role() to authenticated;

create or replace function public.is_staff() returns boolean
language sql stable as $$ select coalesce(public.my_role() in ('admin','staff'), false) $$;
create or replace function public.is_admin() returns boolean
language sql stable as $$ select coalesce(public.my_role() = 'admin', false) $$;

-- Un fichier est visible par Coste Fermon seulement s'il est cité dans l'espace partagé.
create or replace function public.cf_can_read(object_name text) returns boolean
language sql stable security definer set search_path = public as $$
  select public.my_role() = 'cf' and length(object_name) >= 16 and exists (
    select 1 from public.docs d where d.col = 'cf_share' and position(object_name in d.data::text) > 0)
$$;
grant execute on function public.cf_can_read(text) to authenticated;

-- ---------- sécurité ligne à ligne ----------
alter table public.members  enable row level security;
alter table public.profiles enable row level security;
alter table public.docs     enable row level security;
revoke all on public.members, public.profiles, public.docs from anon;
grant select, insert, update, delete on public.members, public.profiles, public.docs to authenticated;

drop policy if exists members_read  on public.members;
drop policy if exists members_write on public.members;
drop policy if exists members_upd   on public.members;
drop policy if exists members_del   on public.members;
create policy members_read on public.members for select to authenticated
  using (public.is_admin() or email = lower(auth.jwt()->>'email'));
create policy members_write on public.members for insert to authenticated with check (public.is_admin());
create policy members_upd on public.members for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy members_del on public.members for delete to authenticated
  using (public.is_admin() and email <> lower(auth.jwt()->>'email'));   -- un admin ne peut pas se retirer lui-même

drop policy if exists profiles_read  on public.profiles;
drop policy if exists profiles_write on public.profiles;
drop policy if exists profiles_upd   on public.profiles;
create policy profiles_read on public.profiles for select to authenticated
  using (public.is_staff() or uid = auth.uid());
create policy profiles_write on public.profiles for insert to authenticated
  with check (uid = auth.uid() and public.my_role() is not null);
create policy profiles_upd on public.profiles for update to authenticated
  using (uid = auth.uid()) with check (uid = auth.uid() and public.my_role() is not null);

drop policy if exists docs_staff   on public.docs;
drop policy if exists docs_cf_read on public.docs;
create policy docs_staff on public.docs for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy docs_cf_read on public.docs for select to authenticated
  using (public.my_role() = 'cf' and (col = 'cf_share' or (col = 'config' and id = 'cf')));

-- ---------- temps réel ----------
alter table public.docs replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.docs;
exception when duplicate_object then null; end $$;

-- ---------- fichiers joints ----------
insert into storage.buckets (id, name, public, file_size_limit)
values ('assets', 'assets', false, 26214400)            -- privé, 25 Mo max
on conflict (id) do update set public = false, file_size_limit = 26214400;

-- Les règles de storage.objects sont créées seulement si elles n'existent pas encore
-- (Supabase interdit de les supprimer en SQL : pour les modifier, passez par Storage > Policies).
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'assets_read') then
    create policy assets_read on storage.objects for select to authenticated
      using (bucket_id = 'assets' and (public.is_staff() or public.cf_can_read(name)));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'assets_insert') then
    create policy assets_insert on storage.objects for insert to authenticated
      with check (bucket_id = 'assets' and public.is_staff());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'assets_delete') then
    create policy assets_delete on storage.objects for delete to authenticated
      using (bucket_id = 'assets' and public.is_admin());
  end if;
end $$;
