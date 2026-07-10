-- =============================================
-- Paw Pack Pantry — Supabase schema
-- Run this in your Supabase SQL editor
-- =============================================

-- Newsletter subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- News posts
create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  body text not null,
  date date not null default current_date,
  image_url text,
  published boolean default false,
  created_at timestamptz default now()
);

-- Menu items (optional — site has hardcoded items but these take precedence)
create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price text default 'Rs ___',
  description text,
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Gallery items
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  story text,
  image_url text,
  type text check (type in ('pack', 'testimony', 'mission')) default 'pack',
  active boolean default true,
  created_at timestamptz default now()
);

-- Invoices
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_no bigint generated always as identity,
  customer_name text not null,
  pet_name text,
  contact_number text,
  address text,
  delivery_date text,
  issue_date date not null default current_date,
  items jsonb not null default '[]',
  delivery_fee numeric not null default 0,
  is_preorder boolean not null default true,
  reference text,
  source text not null default 'manual', -- 'manual' (admin UI) or 'whatsapp' (automated webhook)
  created_at timestamptz default now()
);

-- =============================================
-- Row Level Security (read-only for anon users)
-- =============================================

alter table newsletter_subscribers enable row level security;
alter table news_posts enable row level security;
alter table menu_items enable row level security;
alter table gallery_items enable row level security;
alter table invoices enable row level security;

-- Invoices hold customer PII (names, phone numbers, addresses) — no anon/authenticated
-- policy is defined for this table on purpose, so RLS blocks the public REST API entirely.
-- All reads/writes go through app/api/invoices/* and app/api/orders/whatsapp/*, which use
-- the service-role key (SUPABASE_SERVICE_ROLE_KEY, server-only) to bypass RLS after checking
-- either the admin session cookie or the WhatsApp webhook secret.

-- Anyone can read published posts / active items
create policy "read published posts" on news_posts for select using (published = true);
create policy "read active menu" on menu_items for select using (active = true);
create policy "read active gallery" on gallery_items for select using (active = true);

-- Anyone can insert a newsletter subscriber (form on site)
create policy "subscribe to newsletter" on newsletter_subscribers for insert with check (true);

-- Prevent public from reading subscriber emails
create policy "no public read on subscribers" on newsletter_subscribers for select using (false);
