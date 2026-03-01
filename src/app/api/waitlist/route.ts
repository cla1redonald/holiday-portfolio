import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function redactEmail(email: string): string {
  const [local, domain] = email.split('@');
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, variant, query, timestamp } = body as {
    email?: string;
    variant?: string;
    query?: string;
    timestamp?: string;
  };

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  // Log the signup as a fallback
  console.log('[waitlist] New signup:', {
    email: redactEmail(email),
    variant: variant ?? 'a',
    query: query ?? '',
    timestamp: timestamp ?? new Date().toISOString(),
  });

  // Persist to Supabase (upsert handles duplicates gracefully)
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from('waitlist')
      .upsert({ email }, { onConflict: 'email' });

    if (error) {
      console.error('[waitlist] Supabase upsert error:', error);
      return NextResponse.json({ error: 'Failed to save email. Please try again.' }, { status: 500 });
    }
  }

  return NextResponse.json(
    { success: true, message: "You're on the list!" },
    { status: 200 }
  );
}
