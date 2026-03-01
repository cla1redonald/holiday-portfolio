import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerSession, saveServerSession } from '@/lib/session-store';
import { getRedis } from '@/lib/redis';

const ALLOWED_EVENTS = ['breakdown_click', 'pro_interest', 'booking_intent'] as const;
type TrackEvent = typeof ALLOWED_EVENTS[number];

async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const redis = getRedis();
    if (!redis) return false;
    const key = `ratelimit:track:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 60);
    return count > 20; // 20 events per minute
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (await isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();
    const event = body.event as string;

    if (!ALLOWED_EVENTS.includes(event as TrackEvent)) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    // Read session from cookie
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('roami_sid')?.value;
    if (!sessionId) {
      return NextResponse.json({ ok: true }); // No session — can't persist, but that's fine
    }

    const session = await getServerSession(sessionId);
    if (!session) {
      return NextResponse.json({ ok: true });
    }

    // Update session based on event
    if (event === 'breakdown_click') {
      session.breakdownClicks = (session.breakdownClicks ?? 0) + 1;
    } else if (event === 'pro_interest') {
      session.proInterestClicked = true;
      if (body.email && typeof body.email === 'string') {
        session.proInterestEmail = body.email.slice(0, 200);
      }
    }

    await saveServerSession(sessionId, session);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Track API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
