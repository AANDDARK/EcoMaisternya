'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormValues {
  name: string;
  describe?: string;
  price: number;
}

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        describe: data.describe || null,
        price: Number(data.price),
      }),
    });

    if (res.ok) reset();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Додати товар</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Назва</Label>
            <Input
              id="name"
              placeholder="Еко-сумка"
              {...register('name', { required: "Назва обов'язкова" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="describe">Опис</Label>
            <Textarea
              id="describe"
              placeholder="Короткий опис товару..."
              {...register('describe')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="price">Ціна (₴)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="150"
              {...register('price', {
                required: "Ціна обов'язкова",
                min: { value: 0, message: `Ціна не може бути від'ємною` },
              })}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : 'Додати товар'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}