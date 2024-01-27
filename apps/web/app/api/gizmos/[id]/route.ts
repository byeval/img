import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

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

  return Response.json(gizmo);
}
