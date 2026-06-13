export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const otpStore = new Map<string, { code: string; expires: number }>();

export async function POST() {
  const email = process.env.ADMIN_EMAIL
  if(!email) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { code, expires: Date.now() + 10 * 60 * 1000 });

  await resend.emails.send({
    from: 'ЕкоМайстерня <onboarding@resend.dev>',
    to: email,
    subject: 'Код для входу в адмін панель',
    html: `<p>Ваш код: <strong>${code}</strong></p><p>Дійсний 10 хвилин.</p>`,
  });

  return NextResponse.json({ ok: true });
}

export { otpStore };