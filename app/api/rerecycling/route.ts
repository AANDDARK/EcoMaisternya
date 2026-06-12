import { NextResponse } from "next/server";
import { db } from "../main"; // Переконайся, що шлях до твого нового db.ts правильний

interface RecyclingPointRow {
  id: number;
  name: string;
  pos: string;
}

export async function GET() {
  try {
    // Виконуємо асинхронний запит до хмарної БД
    const result = await db.execute(`SELECT * FROM rerecyclingPoint`);
    
    // Результати запиту лежать у масиві result.rows
    const points = result.rows as unknown as RecyclingPointRow[];

    const parsed = points.map((p) => ({
      id: p.id,
      name: p.name,
      pos: JSON.parse(p.pos) as { lat: number; lng: number },
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Помилка при отриманні пунктів переробки:", error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}