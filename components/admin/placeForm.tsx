'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';

const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

interface FormValues {
  name: string;
  describe?: string;
  lat: number;
  lng: number;
  eventDates: { value: string }[];
}

export default function PlaceForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      eventDates: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'eventDates',
  });

  async function onSubmit(data: FormValues) {
    const res = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        describe: data.describe || null,
        pos: { lat: Number(data.lat), lng: Number(data.lng) },
        eventDates: data.eventDates.map(d => d.value).filter(Boolean),
      }),
    });

    if (res.ok) reset({ eventDates: [{ value: '' }] });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Додати місце</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Назва</Label>
            <Input
              id="name"
              placeholder="Школа №12"
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
              placeholder="Короткий опис місця..."
              {...register('describe')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lat">Широта (lat)</Label>
            <Input
              id="lat"
              type="number"
              step="any"
              placeholder="49.0674"
              {...register('lat', { required: "Широта обов'язкова" })}
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
              {...register('lng', { required: "Довгота обов'язкова" })}
            />
            {errors.lng && (
              <p className="text-sm text-destructive">{errors.lng.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Дні подій</Label>
            {fields.map((field, i) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Controller
                  control={control}
                  name={`eventDates.${i}.value`}
                  rules={{ required: true }}
                  render={({ field: f }) => (
                    <Select onValueChange={f.onChange} value={f.value}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Оберіть день" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map(day => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(i)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ value: '' })}
              className="w-fit"
            >
              <Plus size={16} />
              Додати день
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : 'Додати місце'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}