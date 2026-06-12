"use client";

import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlaceCardProps {
  name: string;
  describe?: string;
  id: number;
}

export function PlaceCard({ name, describe = "", id }: PlaceCardProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`event-board/${id}`)}
      className="group rounded-xl border border-border bg-card p-6 flex flex-col gap-3 hover:border-primary transition-colors text-left w-full"
    >
      <div className="size-10 rounded-lg bg-secondary flex items-center justify-center">
        <MapPin size={20} className="text-secondary-foreground" />
      </div>
      <div>
        <p className="font-medium text-foreground line-clamp-1">{name}</p>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
          {describe || "Немає опису"}
        </p>
      </div>
    </button>
  );
}