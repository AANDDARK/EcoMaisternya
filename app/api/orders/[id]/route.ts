export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { db } from "../../main";

type Props = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Props) {
  const { id } = await params;
  await db.execute({ sql: `DELETE FROM orders WHERE id = ?`, args: [id] });
  return NextResponse.json({ ok: true });
}