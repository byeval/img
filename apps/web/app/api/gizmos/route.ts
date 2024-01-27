import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

enum SortBy {
  "newest" = "createdAt",
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const pageNo = +(searchParams.get("pageNo") || "1");
  const pageSize = +(searchParams.get("pageSize") || 30);
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");
  const skip = (pageNo - 1) * pageSize;
  const where: any = {};
  let orderBy: any = {};

  if (category === "newest") {
    orderBy = {
      createdAt: "desc",
    };
  } else if (category) {
    where["categories"] = {
      contains: category,
    };
  }

  if (keyword) {
    where["name"] = {
      contains: keyword,
    };
  }

  console.log(where, orderBy);
  const gizmos = await prisma.gizmo.findMany({
    where,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      numConversations: true,
      profilePictureUrl: true,
      inventor: true,
    },
    orderBy,
    skip,
    take: pageSize,
  });

  return Response.json(
    gizmos.map((gizmo) => ({
      ...gizmo,
      slug: `${gizmo.slug.split("-").slice(2).join("-")}-${gizmo.id}`,
    })),
  );
}
