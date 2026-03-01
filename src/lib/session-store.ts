import { getSupabase } from './supabase';
import { SessionProfile } from '@/types';

/**
 * Fetch a server-side session by ID. Returns null if expired or not found.
 */
export async function getServerSession(sessionId: string): Promise<SessionProfile | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data } = await supabase
      .from('sessions')
      .select('profile')
      .eq('id', sessionId)
      .gt('expires_at', new Date().toISOString())
      .single();

    return (data?.profile as SessionProfile) ?? null;
  } catch {
    return null;
  }
}

/**
 * Upsert a session profile to the server. Extends expiry to 30 days from now.
 */
export async function saveServerSession(sessionId: string, profile: SessionProfile): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    await supabase
      .from('sessions')
      .upsert({
        id: sessionId,
        profile,
        updated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
  } catch {
    // Non-critical — session persistence is best-effort
  }
}

/**
 * Create a new server session and return its UUID. Returns null if Supabase
 * is unavailable.
 */
export async function createServerSession(profile: SessionProfile): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data } = await supabase
      .from('sessions')
      .insert({ profile })
      .select('id')
      .single();

    return data?.id ?? null;
  } catch {
    return null;
  }
}
