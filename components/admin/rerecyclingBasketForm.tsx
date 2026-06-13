'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface FormValues {
  name: string;
  lat: number;
  lng: number;
}

export default function RerecyclingBasketForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    const res = await fetch('/api/rerecycling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        pos: { lat: Number(data.lat), lng: Number(data.lng) },
      }),
    });

    if (res.ok) {
      reset();
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Додати контейнер</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Назва</Label>
            <Input
              id="name"
              placeholder="Пункт переробки №1"
              {...register('name', { required: "Назва обов'язкова" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lat">Широта (lat)</Label>
            <Input
              id="lat"
              type="number"
              step="any"
              placeholder="49.0674"
              {...register('lat', {
                required: "Широта обов'язкова",
                min: { value: -90, message: 'Мін -90' },
                max: { value: 90, message: 'Макс 90' },
              })}
            />
            {errors.lat && (
              <p className="text-sm text-destructive">{errors.lat.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lng">Довгота (lng)</Label>
            <Input
              id="lng"
              type="number"
              step="any"
              placeholder="33.4111"
              {...register('lng', {
                required: "Довгота обов'язкова",
                min: { value: -180, message: 'Мін -180' },
                max: { value: 180, message: 'Макс 180' },
              })}
            />
            {errors.lng && (
              <p className="text-sm text-destructive">{errors.lng.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : 'Додати контейнер'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}