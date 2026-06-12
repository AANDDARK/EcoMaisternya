"use client";

import React, { useEffect, useState } from "react";
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";

interface RecyclingPoint {
  id: number;
  name: string;
  pos: { lat: number; lng: number };
}

export default function RecyclingMap({ className }: { className?: string }) {
  const [points, setPoints] = useState<RecyclingPoint[]>([]);

  useEffect(() => {
    fetch("/api/rerecycling")
      .then((r) => r.json())
      .then(setPoints);
  }, []);

  const center = points.length > 0
    ? [points[0].pos.lng, points[0].pos.lat] as [number, number]
    : [33.4111, 49.0674] as [number, number];

  return (
    <div className={className ?? "h-[420px] w-full"}>
      <Map center={center} zoom={14}>
        {points.map((point) => (
          <MapMarker
            key={point.id}
            longitude={point.pos.lng}
            latitude={point.pos.lat}
          >
            <MarkerContent>
              <div className="bg-secondary size-4 rounded-full border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerPopup>
              <div className="space-y-1">
                <p className="text-foreground font-medium">{point.name}</p>
                <p className="text-muted-foreground text-xs">
                  {point.pos.lat.toFixed(4)}, {point.pos.lng.toFixed(4)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}