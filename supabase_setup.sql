-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/hraeiiykewvfpubpisev/sql)

-- 1. Create the site_data table
CREATE TABLE IF NOT EXISTS site_data (
  id        INTEGER PRIMARY KEY DEFAULT 1,
  data      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE site_data ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can READ the site data (portfolio is public)
CREATE POLICY "Public read"
  ON site_data
  FOR SELECT
  USING (true);

-- 4. Only authenticated users can INSERT / UPDATE / DELETE
CREATE POLICY "Auth write"
  ON site_data
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 5. Insert the initial empty row (the app will upsert into id = 1)
INSERT INTO site_data (id, data)
VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;
