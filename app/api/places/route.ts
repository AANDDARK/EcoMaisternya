import { NextRequest, NextResponse } from "next/server";
import { db } from "../main"; 

interface PlaceRow {
  id: number;
  name: string;
  describe: string | null;
  pos: string;
  event_dates: string;
}

// Функція стала асинхронною
async function getAllPlacesFromDB() {
  const result = await db.execute('SELECT * FROM places');
  const rawPlaces = result.rows as unknown as PlaceRow[];

  return rawPlaces.map((place) => ({
    id: place.id,
    name: place.name,
    describe: place.describe,
    pos: JSON.parse(place.pos) as { lat: number; lng: number },
    eventDates: JSON.parse(place.event_dates) as string[], 
  }));
}

export async function GET() {
  try {
    // Додали await для очікування результату з БД
    const places = await getAllPlacesFromDB();
    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    console.error("Error GET /api/places:", error);
    return NextResponse.json({ error: "Can't access to loading places" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, describe, pos, eventDates } = body;

    if (!name || !pos || !eventDates || !Array.isArray(eventDates)) {
      return NextResponse.json({ error: "Don't wrote required fields or not right file format" }, { status: 400 });
    }

    // Виконуємо асинхронний INSERT запит до Turso
    const result = await db.execute({
      sql: `INSERT INTO places (name, describe, pos, event_dates) VALUES (?, ?, ?, ?)`,
      args: [
        name,
        describe || null,
        JSON.stringify(pos),        
        JSON.stringify(eventDates)
      ]
    });

    return NextResponse.json({ 
      success: true, 
      // Turso повертає BigInt для lastInsertRowid, тому безпечніше приводити до Number
      id: result.lastInsertRowid ? Number(result.lastInsertRowid) : null 
    }, { status: 201 });

  } catch (error) {
    console.error("Error POST /api/places:", error);
    return NextResponse.json({ error: "Can't save place" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID обов\'язковий' }, { status: 400 });
    }

    await db.execute({ sql: `DELETE FROM places WHERE id = ?`, args: [id] });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка видалення' }, { status: 500 });
  }
}