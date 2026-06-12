"use client";

import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  describe?: string;
  price: number;
  onAdd: () => void;
}

export function ProductCard({ name, describe = "", price, onAdd }: ProductCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="size-10 rounded-lg bg-secondary flex items-center justify-center mb-1">
          <ShoppingBag size={20} className="text-secondary-foreground" />
        </div>
        <p className="font-medium text-foreground line-clamp-1">{name}</p>
        <p className="text-sm text-muted-foreground">
          {describe.slice(0, 40)}{describe.length > 40 ? "..." : ""}
        </p>
      </CardHeader>
      <CardFooter className="flex items-center justify-between pt-0">
        <span className="font-semibold text-foreground">{price} ₴</span>
        <Button size="sm" onClick={onAdd}>До кошика</Button>
      </CardFooter>
    </Card>
  );
}