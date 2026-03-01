CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No anon access" ON waitlist FOR ALL TO anon USING (false);
CREATE POLICY "Service role full access" ON waitlist FOR ALL TO service_role USING (true);

CREATE INDEX idx_waitlist_email ON waitlist (email);
