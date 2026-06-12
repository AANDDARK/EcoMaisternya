import { NextResponse } from "next/server";
import { db } from "../main";

interface ProductRow {
  id: number;
  name: string;
  describe: string | null;
  price: number;
}

export async function GET() {
  try {
    // Виконуємо асинхронний запит до Turso
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