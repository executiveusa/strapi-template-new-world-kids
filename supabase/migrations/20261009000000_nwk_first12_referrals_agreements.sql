-- New World Kids: First 12 referral, host, agreement, authorization, and hours tables.
-- Private tables live in the existing `nwkids` schema (same as mentor_intakes); public.nwk_copy is public-read page copy.
-- Plain Postgres 13+ (gen_random_uuid is built in); works on Supabase. All tables are private: row level security is on and
-- there are no policies, so only the service role (server code and staff tools) can read or write.
-- Rules encoded here come from Washington L&I (chapter 296-125 WAC, read 2026-10-09).
-- Re-check the hour limits and the wage premium before launch; the rules changed on 2026-07-01.


create schema if not exists nwkids;

-- Shared updated_at trigger ---------------------------------------------------------------
create or replace function nwkids.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- 1. Referrals: how a young person is considered (referral only, no direct applications) ---
create table if not exists nwkids.referrals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'in_review', 'accepted', 'not_now', 'closed')),
  locale text not null default 'en' check (locale in ('en', 'es')),

  -- Referrer. Staff contact the young person only through the referrer at first.
  referrer_name text not null check (char_length(referrer_name) between 2 and 120),
  referrer_org text check (char_length(referrer_org) <= 160),
  referrer_role text check (char_length(referrer_role) <= 160),
  referrer_email text not null check (referrer_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  referrer_phone text check (char_length(referrer_phone) <= 80),

  -- Young person: first name only, and nothing about their history.
  youth_first_name text not null check (char_length(youth_first_name) between 1 and 60),
  youth_age int not null check (youth_age between 16 and 19),
  county text not null check (county in ('king', 'snohomish', 'pierce', 'skagit')),
  pathway text not null
    check (pathway in ('technology', 'sports', 'food_systems', 'art', 'cross_pathway', 'not_sure')),
  interests text not null check (char_length(interests) between 10 and 2000),
  notes text check (char_length(notes) <= 2000),

  -- Consent: the young person knows, and a parent or guardian knows if under 18.
  youth_aware boolean not null check (youth_aware),
  guardian_aware boolean not null default false,
  consent boolean not null check (consent),
  check (youth_age >= 18 or guardian_aware),

  reviewed_by text,
  reviewed_at timestamptz,
  decision_note text
);
create index if not exists nwk_referrals_status_idx on nwkids.referrals (status, created_at desc);
create index if not exists nwk_referrals_county_idx on nwkids.referrals (county);
create trigger nwk_referrals_touch before update on nwkids.referrals
  for each row execute function nwkids.touch_updated_at();

-- 2. Hosts: the project or program where a participant works ---------------------------------
create table if not exists nwkids.hosts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  pathway text not null
    check (pathway in ('technology', 'sports', 'food_systems', 'art', 'cross_pathway')),
  county text not null check (county in ('king', 'snohomish', 'pierce', 'skagit')),
  worksite_address text,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  supervisor_name text,                       -- named adult present during the work
  -- Employer duties for minors (chapter 296-125 WAC): a minor work permit endorsement on the
  -- business license for every location where minors work.
  minor_work_permit_endorsement boolean not null default false,
  minor_work_permit_verified_on date,
  background_check_on date,                   -- date staff finished checks on host contacts
  status text not null default 'prospect' check (status in ('prospect', 'approved', 'paused', 'closed'))
);
create trigger nwk_hosts_touch before update on nwkids.hosts
  for each row execute function nwkids.touch_updated_at();

-- 3. Placements: one young person, one host, one mentor ---------------------------------------
create table if not exists nwkids.placements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  referral_id uuid not null references nwkids.referrals (id),
  host_id uuid not null references nwkids.hosts (id),
  slot_number int check (slot_number between 1 and 12),
  mentor_name text,
  mentor_background_check_on date,
  youth_birth_date date,                      -- proof of age is verified from a document, then stored here
  status text not null default 'proposed'
    check (status in ('proposed', 'agreed', 'active', 'paused', 'completed', 'ended')),
  started_on date,
  ended_on date,
  unique (slot_number)
);
create trigger nwk_placements_touch before update on nwkids.placements
  for each row execute function nwkids.touch_updated_at();

-- 4. Agreements: the youth, parent or guardian, and host agree on hours and pay ------------------
-- Hours are set together by the young person, their parent or guardian, and the host program.
-- Minors (under 18) must stay within L&I limits; a special variance raises the school-week limit.
create table if not exists nwkids.agreements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  placement_id uuid not null references nwkids.placements (id),
  youth_is_minor boolean not null,
  special_variance boolean not null default false,

  school_week_hours_per_day numeric(4, 2) not null check (school_week_hours_per_day >= 0),
  school_week_hours_per_week numeric(5, 2) not null check (school_week_hours_per_week >= 0),
  non_school_week_hours_per_day numeric(4, 2) not null check (non_school_week_hours_per_day >= 0),
  non_school_week_hours_per_week numeric(5, 2) not null check (non_school_week_hours_per_week >= 0),
  schedule_notes text,                        -- days, start and end times as agreed

  -- Pay = the applicable minimum wage (state or higher local rate) plus a fixed premium.
  base_minimum_wage_cents int not null check (base_minimum_wage_cents > 0),
  wage_premium_cents int not null default 300 check (wage_premium_cents >= 0),
  hourly_rate_cents int not null,
  check (hourly_rate_cents >= base_minimum_wage_cents + wage_premium_cents),

  status text not null default 'draft' check (status in ('draft', 'signed', 'active', 'ended')),

  -- L&I hour limits for 16 and 17 year olds, non-agricultural work.
  constraint nwk_minor_hours_limits check (
    not youth_is_minor or (
      school_week_hours_per_day <= case when special_variance then 6 else 4 end
      and school_week_hours_per_week <= case when special_variance then 28 else 20 end
      and non_school_week_hours_per_day <= 8
      and non_school_week_hours_per_week <= 48
    )
  )
);
create trigger nwk_agreements_touch before update on nwkids.agreements
  for each row execute function nwkids.touch_updated_at();

-- youth_is_minor is never taken from the caller: it is derived from the placement's birth date when known,
-- otherwise from the referral age (16 and 17 are minors; if the age is stale we keep the stricter limits).
create or replace function nwkids.set_minor_flag() returns trigger
language plpgsql set search_path = pg_catalog, nwkids, public as $$
declare v_age int; v_birth date;
begin
  select r.youth_age, p.youth_birth_date into v_age, v_birth
  from nwkids.placements p join nwkids.referrals r on r.id = p.referral_id
  where p.id = new.placement_id;
  if v_birth is not null then
    new.youth_is_minor := date_part('year', age(current_date, v_birth)) < 18;
  else
    new.youth_is_minor := coalesce(v_age, 0) < 18;
  end if;
  return new;
end $$;
create trigger nwk_agreements_a_minor before insert or update on nwkids.agreements
  for each row execute function nwkids.set_minor_flag();

create table if not exists nwkids.agreement_signatures (
  id uuid primary key default gen_random_uuid(),
  agreement_id uuid not null references nwkids.agreements (id) on delete cascade,
  signer_role text not null check (signer_role in ('youth', 'guardian', 'host')),
  signer_name text not null,
  signed_at timestamptz not null default now(),
  method text not null default 'electronic' check (method in ('electronic', 'paper')),
  unique (agreement_id, signer_role)
);

-- An agreement can only become signed or active when the youth and host have signed,
-- and a parent or guardian has too if the young person is under 18.
create or replace function nwkids.require_signatures() returns trigger
language plpgsql as $$
begin
  if new.status in ('signed', 'active') then
    if not exists (select 1 from nwkids.agreement_signatures s where s.agreement_id = new.id and s.signer_role = 'youth')
       or not exists (select 1 from nwkids.agreement_signatures s where s.agreement_id = new.id and s.signer_role = 'host')
       or (new.youth_is_minor and not exists (select 1 from nwkids.agreement_signatures s where s.agreement_id = new.id and s.signer_role = 'guardian'))
    then
      raise exception 'Agreement % needs signatures from the young person, the host, and a parent or guardian if under 18', new.id;
    end if;
  end if;
  return new;
end $$;
create trigger nwk_agreements_signatures before insert or update on nwkids.agreements
  for each row execute function nwkids.require_signatures();

-- 5. Parent/School Authorization (L&I form F700-002-000) --------------------------------------
-- Required per minor each school year; it expires every September 30. Emancipated minors do not need it.
create table if not exists nwkids.work_authorizations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  placement_id uuid not null references nwkids.placements (id),
  emancipated boolean not null default false,
  form text not null default 'F700-002-000' check (form in ('F700-002-000', 'F700-168-000')),
  employer_signed_on date,
  minor_signed_on date,
  parent_signed_on date,
  school_official_name text,
  school_official_signed_on date,
  proof_of_age_type text check (proof_of_age_type in ('birth_certificate', 'drivers_license', 'passport', 'notarized_parent_statement')),
  proof_of_age_verified_on date,
  expires_on date not null,                   -- September 30 of the school year
  revoked_on date,
  check (extract(month from expires_on) = 9 and extract(day from expires_on) = 30)
);

-- 6. Project safety screens: check each project against prohibited duties ----------------------
create table if not exists nwkids.project_screens (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  host_id uuid not null references nwkids.hosts (id),
  project_summary text not null,
  screened_by text not null,
  screened_on date not null default current_date,
  -- Under 18: no roofing, demolition, mechanical excavation, earth-moving machines,
  -- power-driven woodworking machines or saws, or power-driven metal forming or shearing.
  prohibited_duties_found boolean not null,
  federal_hazardous_orders_checked boolean not null default false,
  result text not null check (result in ('approved', 'approved_with_limits', 'rejected')),
  notes text,
  check (not (result = 'approved' and prohibited_duties_found))
);

-- 7. Hours log -----------------------------------------------------------------------------
create table if not exists nwkids.hours_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  placement_id uuid not null references nwkids.placements (id),
  work_date date not null,
  start_time time not null,
  end_time time not null,
  meal_break_minutes int not null default 0 check (meal_break_minutes >= 0),
  confirmed_by_supervisor text,
  check (end_time > start_time),
  unique (placement_id, work_date, start_time)
);

-- Lock everything down. Server code uses the service role, which bypasses row level security.
alter table nwkids.referrals enable row level security;
alter table nwkids.hosts enable row level security;
alter table nwkids.placements enable row level security;
alter table nwkids.agreements enable row level security;
alter table nwkids.agreement_signatures enable row level security;
alter table nwkids.work_authorizations enable row level security;
alter table nwkids.project_screens enable row level security;
alter table nwkids.hours_log enable row level security;

-- Public intake function: validates and inserts one referral. Called from the server with the service role.
create or replace function public.nwkids_submit_referral(p_payload jsonb) returns uuid
language plpgsql security definer set search_path = nwkids, public as $$
declare new_id uuid;
begin
  insert into nwkids.referrals (
    locale, referrer_name, referrer_org, referrer_role, referrer_email, referrer_phone,
    youth_first_name, youth_age, county, pathway, interests, notes,
    youth_aware, guardian_aware, consent
  ) values (
    coalesce(p_payload ->> 'locale', 'en'),
    p_payload ->> 'referrer_name', nullif(p_payload ->> 'referrer_org', ''), nullif(p_payload ->> 'referrer_role', ''),
    lower(p_payload ->> 'referrer_email'), nullif(p_payload ->> 'referrer_phone', ''),
    p_payload ->> 'youth_first_name', (p_payload ->> 'youth_age')::int, p_payload ->> 'county',
    p_payload ->> 'pathway', p_payload ->> 'interests', nullif(p_payload ->> 'notes', ''),
    coalesce((p_payload ->> 'youth_aware')::boolean, false),
    coalesce((p_payload ->> 'guardian_aware')::boolean, false),
    coalesce((p_payload ->> 'consent')::boolean, false)
  ) returning id into new_id;
  return new_id;
end $$;

revoke all on function public.nwkids_submit_referral(jsonb) from public, anon, authenticated;
grant execute on function public.nwkids_submit_referral(jsonb) to service_role;

-- 8. Editable page copy -------------------------------------------------------------------------
-- Staff can change wording in the Supabase table editor with no developer: one row per
-- page, language, and text key. The site merges these over the built-in text, refreshing about
-- every minute. Only text keys that already exist in the page are used; anything else is ignored.
-- Public content only: do not store anything private here.
create table if not exists public.nwk_copy (
  page text not null,
  locale text not null check (locale in ('en', 'es')),
  key text not null,
  value text not null check (char_length(value) <= 4000),
  updated_at timestamptz not null default now(),
  updated_by text,
  primary key (page, locale, key)
);
create trigger nwk_copy_touch before update on public.nwk_copy
  for each row execute function nwkids.touch_updated_at();
alter table public.nwk_copy enable row level security;
drop policy if exists nwk_copy_public_read on public.nwk_copy;
create policy nwk_copy_public_read on public.nwk_copy for select to anon, authenticated using (true);

-- 9. "Tell me when it is live" list for the coming-soon page ----------------------------------------
create table if not exists nwkids.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  locale text not null default 'en' check (locale in ('en', 'es')),
  consent boolean not null check (consent),
  unique (email)
);
alter table nwkids.waitlist enable row level security;

create or replace function public.nwkids_join_waitlist(p_email text, p_locale text, p_consent boolean) returns uuid
language plpgsql security definer set search_path = nwkids, public as $$
declare new_id uuid;
begin
  insert into nwkids.waitlist (email, locale, consent)
  values (lower(trim(p_email)), coalesce(nullif(p_locale, ''), 'en'), coalesce(p_consent, false))
  on conflict (email) do update set locale = excluded.locale
  returning id into new_id;
  return new_id;
end $$;
revoke all on function public.nwkids_join_waitlist(text, text, boolean) from public, anon, authenticated;
grant execute on function public.nwkids_join_waitlist(text, text, boolean) to service_role;

-- Staff tools and server code use the service role; the schema is not exposed through the public API ---------
grant usage on schema nwkids to service_role;
grant select, insert, update, delete on
  nwkids.referrals, nwkids.hosts, nwkids.placements, nwkids.agreements,
  nwkids.agreement_signatures, nwkids.work_authorizations, nwkids.project_screens,
  nwkids.hours_log, nwkids.waitlist
to service_role;
alter function nwkids.touch_updated_at() set search_path = pg_catalog, public;
alter function nwkids.require_signatures() set search_path = pg_catalog, nwkids, public;
-- Applied to the live project as four migrations (nwkids_first12_part1 to part4) on 2026-10-10.
