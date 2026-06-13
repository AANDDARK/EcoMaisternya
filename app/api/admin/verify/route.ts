export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { otpStore } from '../send/route';


export async function POST(req: Request) {
  const { code } = await req.json();
  const email = process.env.ADMIN_EMAIL
  if(!email) throw new Error();
  const entry = otpStore.get(email);

  if (!entry || entry.code !== code || Date.now() > entry.expires) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
  }

  otpStore.delete(email);

  const cookieStore = await cookies();
  cookieStore.set('admin_auth', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
  });

  return NextResponse.json({ ok: true });
}