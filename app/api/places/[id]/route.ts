import { NextRequest, NextResponse } from "next/server";
import { db } from "../../main";

interface PlaceRow {
  id: number;
  name: string;
  describe: string | null;
  pos: string;
  event_dates: string;
}

// Функція стала асинхронною через роботу з хмарою
const getById = async (id: string) => {
  const result = await db.execute({
    sql: `SELECT * FROM places WHERE id = ?`,
    args: [id]
  });
  
  // Якщо нічого не знайдено, повернеться undefined
  return result.rows[0] as unknown as PlaceRow | undefined;
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;
    
    // Додаємо await перед викликом функції
    const raw = await getById(id);
    
    if (!raw) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const place = {
      id: raw.id,
      name: raw.name,
      describe: raw.describe,
      pos: JSON.parse(raw.pos) as { lat: number; lng: number },
      eventDates: JSON.parse(raw.event_dates) as string[],
    };

    return NextResponse.json(place);
  } catch (error) {
    console.error("Error GET /api/places/[id]:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}