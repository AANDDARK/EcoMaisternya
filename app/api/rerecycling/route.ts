export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { db } from "../main";

interface RecyclingPointRow {
  id: number;
  name: string;
  pos: string;
}

export async function GET() {
  try {
    const result = await db.execute(`SELECT * FROM rerecyclingPoint`);
    const points = result.rows as unknown as RecyclingPointRow[];

    const parsed = points.map((p) => ({
      id: p.id,
      name: p.name,
      pos: JSON.parse(p.pos) as { lat: number; lng: number },
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Помилка при отриманні пунктів переробки:", error);
    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, pos } = await req.json();

    if (!name || !pos?.lat || !pos?.lng) {
      return NextResponse.json({ error: 'Невірні дані' }, { status: 400 });
    }

    await db.execute({
      sql: `INSERT INTO rerecyclingPoint (name, pos) VALUES (?, ?)`,
      args: [name, JSON.stringify(pos)],
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Помилка при збереженні:", error);
    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID обов\'язковий' }, { status: 400 });
    }

    await db.execute({ sql: `DELETE FROM rerecyclingPoint WHERE id = ?`, args: [id] });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка видалення' }, { status: 500 });
  }
}