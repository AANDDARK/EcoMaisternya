import { NextRequest, NextResponse } from "next/server";
import { db } from "../main";

interface ProductRow {
  id: number;
  name: string;
  describe: string | null;
  price: number;
}

export async function GET() {
  try {

    const result = await db.execute(`SELECT * FROM products`);
    
    // Дістаємо масив рядків з result.rows
    const products = result.rows as unknown as ProductRow[];
    
    console.log(products);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Помилка завантаження товарів:", error);
    return NextResponse.json({ error: "Помилка завантаження" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { name, describe, price } = await req.json();

    if (!name || price === undefined) {
      return NextResponse.json({ error: 'Невірні дані' }, { status: 400 });
    }

    await db.execute({
      sql: `INSERT INTO products (name, describe, price) VALUES (?, ?, ?)`,
      args: [name, describe ?? null, price],
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка збереження' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID обов\'язковий' }, { status: 400 });
    }

    await db.execute({ sql: `DELETE FROM products WHERE id = ?`, args: [id] });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка видалення' }, { status: 500 });
  }
}