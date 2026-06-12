"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, ShoppingCart, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  describe: string;
  price: number;
}

interface CartItem extends Product {
  qty: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [username, setUsername] = useState("");
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setProducts);
  }, []);

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setProducts(prev => prev.filter(e => e.id !== product.id))
  }

  function removeFromCart(id: number) {
    const removed = cart.find(e => e.id === id);
    if (removed) {
      const { qty, ...product } = removed;
      setProducts(prev => [...prev, product]);
    }
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  async function placeOrder() {
    if (!username || cart.length === 0) return;
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact_username: username, products: cart }),
    });
    setCart([]);
    setUsername("");
    setOrdered(true);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <ShoppingBag size={16} />
          <span>Еко-товари</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Крамниця</h1>
        <p className="text-muted-foreground">
          Товари з перероблених матеріалів від місцевих виробників.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Products */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              describe={product.describe}
              price={product.price}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>

        {/* Cart */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingCart size={18} />
              Кошик
              {cart.length > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {cart.reduce((acc, i) => acc + i.qty, 0)}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">

            {ordered && (
              <p className="text-sm text-green-600 font-medium">Замовлення прийнято!</p>
            )}

            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground">Кошик порожній</p>
            ) : (
              <>
                <ul className="flex flex-col gap-2">
                  {cart.map(item => (
                    <li key={item.id} className="flex items-center justify-between text-sm gap-2">
                      <span className="text-foreground line-clamp-1 flex-1">
                        {item.name}
                        <span className="text-muted-foreground"> ×{item.qty}</span>
                      </span>
                      <span className="text-muted-foreground shrink-0">{item.price * item.qty} ₴</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 shrink-0"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X size={14} />
                      </Button>
                    </li>
                  ))}
                </ul>

                <Separator />

                <div className="flex justify-between text-sm font-medium text-foreground">
                  <span>Разом</span>
                  <span>{total} ₴</span>
                </div>

                <Input
                  placeholder="@username в Telegram"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />

                <Button
                  className="w-full"
                  onClick={placeOrder}
                  disabled={!username}
                >
                  Замовити
                </Button>
              </>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}