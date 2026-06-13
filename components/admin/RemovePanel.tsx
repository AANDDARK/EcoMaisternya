'use client';

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

type Category = "rerecycling" | "products" | "places";

interface Item {
  id: number;
  name: string;
}

export default function RemovePanel() {
  const [category, setCategory] = useState<Category>("rerecycling");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadItems(cat: Category) {
    setLoading(true);
    const res = await fetch(`/api/${cat}`);
    const data = await res.json();
    setItems(data.map((i: any) => ({ id: i.id, name: i.name })));
    setLoading(false);
  }

  useEffect(() => {
    loadItems(category);
  }, [category]);

async function remove(id: number) {
  await fetch(`/api/${category}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  setItems(prev => prev.filter(i => i.id !== id));
}

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Видалити запис</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">

        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rerecycling">Контейнери</SelectItem>
            <SelectItem value="products">Товари</SelectItem>
            <SelectItem value="places">Місця</SelectItem>
          </SelectContent>
        </Select>

        {loading ? (
          <p className="text-sm text-muted-foreground">Завантаження...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Записів немає</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {items.map(item => (
              <li key={item.id} className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
  <div className="flex items-center gap-2">
    <span className="text-xs text-muted-foreground font-mono">#{item.id}</span>
    <span className="text-sm text-foreground">{item.name}</span>
  </div>
  <Button
    variant="destructive"
    size="icon"
    className="size-7 shrink-0"
    onClick={() => remove(item.id)}
  >
    <Trash2 size={14} />
  </Button>
</li>
            ))}
          </ul>
        )}

      </CardContent>
    </Card>
  );
}