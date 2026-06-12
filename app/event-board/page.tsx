"use client";

import { PlaceCard } from "@/components/card";
import { usePlace } from "../PlaceContext";
import { Place } from "../PlaceContext";
import { MapPin } from "lucide-react";

export default function Page() {
  const places = usePlace();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin size={16} />
          <span>Локації</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Місця проведення заходів</h1>
        <p className="text-muted-foreground">
          Оберіть місце щоб переглянути заплановані події та розташування на карті.
        </p>
      </div>

      {places.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
          <MapPin size={32} />
          <p>Місць поки немає</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place: Place) => (
            <PlaceCard
              key={place.id}
              name={place.name}
              describe={place.describe}
              id={place.id}
            />
          ))}
        </div>
      )}

    </div>
  );
}