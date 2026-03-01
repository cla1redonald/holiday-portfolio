import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const supabase = getSupabase();
  let dbStatus = 'no client';
  if (supabase) {
    const { data, error } = await supabase.from('destinations').select('slug').limit(1);
    dbStatus = error ? `error: ${error.message}` : `ok (${data?.length ?? 0} rows)`;
  }
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      supabaseUrl: !!process.env.SUPABASE_URL,
      supabaseUrlPublic: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      duffel: !!process.env.DUFFEL_API_TOKEN,
      upstashUrl: !!process.env.UPSTASH_REDIS_REST_URL,
    },
    db: dbStatus,
  });
}
