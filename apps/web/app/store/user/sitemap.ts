import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export const runtime = "nodejs";

// Google's limit is 50,000 URLs per sitemap
const URLS_PER_SITEMAP = 30000;

export async function generateSitemaps() {
  const sitemapCount = await prisma.inventor.count();
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

  const inventors = await prisma.inventor.findMany({
    skip: start,
    take: end,
    select: {
      id: true,
      name: true,
    },
  });

  return inventors.map((inventor) => ({
    url: `${BASE_URL}/user/${inventor.id}`,
    lastModified: new Date(),
  }));
}
