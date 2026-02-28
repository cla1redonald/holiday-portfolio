import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // Log the signup (Vercel KV integration comes later)
  console.log('[waitlist] New signup:', {
    email,
    variant: variant ?? 'a',
    query: query ?? '',
    timestamp: timestamp ?? new Date().toISOString(),
  });

  return NextResponse.json(
    { success: true, message: "You're on the list!" },
    { status: 200 }
  );
}
