-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  iata TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  seed_price_gbp INTEGER,
  embedding vector(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON destinations USING hnsw (embedding vector_cosine_ops);

CREATE OR REPLACE FUNCTION match_destinations(
  query_embedding vector(1536),
  match_count INT DEFAULT 5,
  similarity_threshold FLOAT DEFAULT 0.3
)
RETURNS TABLE (
  slug TEXT, name TEXT, iata TEXT, country TEXT,
  latitude DOUBLE PRECISION, longitude DOUBLE PRECISION,
  image_url TEXT, tags TEXT[], seed_price_gbp INTEGER,
  similarity FLOAT
)
LANGUAGE sql STABLE AS $$
  SELECT d.slug, d.name, d.iata, d.country, d.latitude, d.longitude,
    d.image_url, d.tags, d.seed_price_gbp,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM destinations d
  WHERE 1 - (d.embedding <=> query_embedding) > similarity_threshold
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
$$;
