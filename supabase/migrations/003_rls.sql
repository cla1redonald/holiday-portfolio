-- Enable RLS on all tables
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Destinations: public read-only, service role can write
CREATE POLICY "Public read access" ON destinations FOR SELECT TO anon USING (true);
CREATE POLICY "Service role full access" ON destinations FOR ALL TO service_role USING (true);

-- Sessions: no anon access (all access through service role on server)
CREATE POLICY "No anon access" ON sessions FOR ALL TO anon USING (false);
CREATE POLICY "Service role full access" ON sessions FOR ALL TO service_role USING (true);
