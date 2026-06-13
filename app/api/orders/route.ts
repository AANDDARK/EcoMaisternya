import { NextResponse } from "next/server";
import { db } from "../main";
export async function GET() {
  try {
    const result = await db.execute(`SELECT * FROM orders`);
    const orders = result.rows as unknown as {
      id: number;
      contact_username: string;
      sum: number;
      products: string;
    }[];

    return NextResponse.json(orders.map(o => ({
      ...o,
      products: JSON.parse(o.products),
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Помилка' }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const { contact_username, products } = await request.json();

    if (!contact_username || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "Невірні дані" }, { status: 400 });
    }

    const sum = products.reduce((acc: number, p: { price: number; qty: number }) => 
      acc + p.price * p.qty, 0
    );

    // Виконуємо асинхронний запит до Turso
    const result = await db.execute({
      sql: `INSERT INTO orders (contact_username, sum, products) VALUES (?, ?, ?)`,
      args: [
        contact_username, 
        sum, 
        JSON.stringify(products)
      ]
    });

    return NextResponse.json({ 
      success: true,
      id: result.lastInsertRowid ? Number(result.lastInsertRowid) : null
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error POST /api/orders:", error);
    return NextResponse.json({ error: "Помилка збереження" }, { status: 500 });
  }
}