'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function AdminLogin() {
  const [step, setStep] = useState<'send' | 'sended'>('send');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function sendCode() {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    setLoading(false);
    if (res.ok) {
      setStep('sended');
    } else {
      setError('Цей email не має доступу');
    }
  }

  async function verifyCode() {
    if (code.length < 6) return;
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Невірний або прострочений код');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Адмін панель</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'send' ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground text-center">
                Код буде відправлено на вашу пошту
              </p>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button onClick={sendCode} className="w-full" disabled={loading}>
                {loading ? 'Відправляємо...' : 'Отримати код'}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-sm text-muted-foreground text-center">
                Код був відправлений
              </p>
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                onComplete={verifyCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button onClick={verifyCode} className="w-full" disabled={loading || code.length < 6}>
                {loading ? 'Перевіряємо...' : 'Увійти'}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep('send')}>
                Назад
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}