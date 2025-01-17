import { withSession } from "@/lib/auth";
import { isReservedKey } from "@/lib/edge-config";
import prisma from "@/lib/prisma";
import { DEFAULT_REDIRECTS } from "@imgpt/utils";
import { NextResponse } from "next/server";

// GET /api/projects/[slug]/exists – check if a project exists
export const GET = withSession(async ({ params }) => {
  const { slug } = params;
  if ((await isReservedKey(slug)) || DEFAULT_REDIRECTS[slug]) {
    return NextResponse.json(1);
  }
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
    select: {
      slug: true,
    },
  });
  if (project) {
    return NextResponse.json(1);
  } else {
    return NextResponse.json(0);
  }
});
