export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { db } from "../../main";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const result = await db.execute({
      sql: `SELECT products FROM orders WHERE id = ?`,
      args: [id],
    });

    if (!result.rows[0]) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const products = JSON.parse(result.rows[0].products as string) as {
      id: number;
      name: string;
      describe: string;
      price: number;
    }[];

    for (const product of products) {
      await db.execute({
        sql: `INSERT INTO products (name, describe, price) VALUES (?, ?, ?)`,
        args: [product.name, product.describe ?? null, product.price],
      });
    }

    await db.execute({ sql: `DELETE FROM orders WHERE id = ?`, args: [id] });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка' }, { status: 500 });
  }
}