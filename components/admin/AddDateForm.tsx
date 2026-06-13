'use client';

import { usePlace } from "@/app/PlaceContext";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

interface FormValues {
  placeId: string;
  day: string;
}

export default function AddDateForm() {
  const places = usePlace();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    const res = await fetch(`/api/places/${data.placeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day: data.day }),
    });

    if (res.ok) reset();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Додати день події</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <Label>Місце</Label>
            <Controller
              control={control}
              name="placeId"
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть місце" />
                  </SelectTrigger>
                  <SelectContent>
                    {places.map(place => (
                      <SelectItem key={place.id} value={String(place.id)}>
                        {place.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>День тижня</Label>
            <Controller
              control={control}
              name="day"
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
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
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : 'Додати день'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}