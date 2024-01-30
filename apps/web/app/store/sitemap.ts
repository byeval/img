import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export const runtime = "nodejs";

// Google's limit is 50,000 URLs per sitemap
const URLS_PER_SITEMAP = 50000;

export async function generateSitemaps() {
  const sitemapCount = await prisma.gizmo.count();
  const sitemapCountRounded = Math.ceil(sitemapCount / URLS_PER_SITEMAP);

  return new Array(sitemapCountRounded).fill(null).map((_, i) => ({ id: i }));
}

const BASE_URL = "https://img.pt/store";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const start = id * URLS_PER_SITEMAP;
  const end = start + URLS_PER_SITEMAP;
  const gizmos = await prisma.gizmo.findMany({
    skip: start,
    take: end,
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      updatedAt: true,
    },
  });

  return gizmos.map((gizmo) => ({
    url: `${BASE_URL}/${gizmo.slug.split("-").slice(2).join("-")}-${gizmo.id}`,
    lastModified: gizmo.updatedAt,
  }));
}
