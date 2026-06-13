'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface Order {
  id: number;
  contact_username: string;
  sum: number;
  products: Product[];
}

export default function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => { loadOrders(); }, []);

  async function approve(id: number) {
    await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    setOrders(prev => prev.filter(o => o.id !== id));
  }

  async function cancel(id: number) {
    await fetch('/api/orders/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setOrders(prev => prev.filter(o => o.id !== id));
  }

  if (loading) return <p className="text-sm text-muted-foreground">Завантаження...</p>;

  if (orders.length === 0) return <p className="text-sm text-muted-foreground">Замовлень немає</p>;

  return (
    <div className="flex flex-col gap-4">
      {orders.map(order => (
        <Card key={order.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="font-mono text-muted-foreground text-sm">#{order.id}</span>
                {order.contact_username}
              </CardTitle>
              <Badge variant="secondary">{order.sum} ₴</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <ul className="flex flex-col gap-1">
              {order.products.map((p, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-foreground">{p.name} ×{p.qty}</span>
                  <span className="text-muted-foreground">{p.price * p.qty} ₴</span>
                </li>
              ))}
            </ul>
            <Separator />
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => approve(order.id)}
              >
                <Check size={14} />
                Підтвердити
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="flex-1"
                onClick={() => cancel(order.id)}
              >
                <X size={14} />
                Скасувати
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}