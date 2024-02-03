import prisma from "@/lib/prisma";

enum SortBy {
  "newest" = "createdAt",
}

export async function searchGizmos({
  pageNo = 1,
  pageSize = 30,
  category = "newest",
  keyword = "",
}) {
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

  return gizmos.map((gizmo) => ({
    ...gizmo,
    slug: `${gizmo.slug.split("-").slice(2).join("-")}-${gizmo.id}`,
  }));
}

export async function queryGizmosByInventor({ inventorId }) {
  const gizmos = await prisma.gizmo.findMany({
    where: {
      inventorId,
    },
  });

  return gizmos.map((gizmo) => ({
    ...gizmo,
    slug: `${gizmo.slug.split("-").slice(2).join("-")}-${gizmo.id}`,
  }));
}

export async function getGizmo({ id }) {
  const gizmo = await prisma.gizmo.findUnique({
    where: {
      id,
    },
    include: {
      inventor: true,
    },
  });

  return gizmo;
}
