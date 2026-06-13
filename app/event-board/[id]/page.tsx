import { notFound } from 'next/navigation'
import { Place } from '../../PlaceContext'
import PlaceMap from '@/components/PlaceMap'
import { CalendarDays, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/places/${id}`)

  if (!res.ok) notFound()

  const place: Place = await res.json()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <MapPin size={14} />
            <span>Місце проведення</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{place.name}</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">{place.describe}</p>
        </div>

        <Separator className="mb-6" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Map */}
          <div className="md:col-span-2 rounded-xl overflow-hidden border border-border">
            <PlaceMap lat={place.pos.lat} lng={place.pos.lng} name={place.name} />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">

            {/* Дати */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <CalendarDays size={16} />
                  Дати подій
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {place.eventDates.map((date, i) => (
                  <Badge key={i} variant="secondary" className="justify-start font-normal">
                      {date}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Координати */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <MapPin size={16} />
                  Координати
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground font-mono">
                <span>lat: {place.pos.lat}</span>
                <span>lng: {place.pos.lng}</span>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}