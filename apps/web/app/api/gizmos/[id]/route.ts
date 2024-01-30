import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const gizmo = await prisma.gizmo.findUnique({
    where: {
      id,
    },
    include: {
      inventor: true,
    },
  });

  return NextResponse.json(gizmo);
}
