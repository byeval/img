import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  LEGAL_PROJECT_ID,
  LEGAL_USER_ID,
  getDomainWithoutWWW,
} from "@imgpt/utils";
import { formatRedisLink, redis } from "@/lib/upstash";
import { get } from "@vercel/edge-config";

// DELETE /api/admin/links/[linkId]/ban – ban a link
export const DELETE = withAdmin(async ({ params }) => {
  const { linkId } = params as { linkId: string };

  const link = await prisma.link.findUnique({
    where: {
      id: linkId,
    },
  });

  if (!link) {
    return NextResponse.next();
  }

  const blacklistedDomains = (await get("domains")) as string[];

  const response = await Promise.all([
    prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        userId: LEGAL_USER_ID,
        projectId: LEGAL_PROJECT_ID,
      },
    }),
    redis.hset(link.domain, {
      [link.key.toLowerCase()]: {
        ...(await formatRedisLink(link)),
        projectId: LEGAL_PROJECT_ID,
      },
    }),
    fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items?teamId=${process.env.TEAM_ID_VERCEL}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              operation: "update",
              key: "domains",
              value: [...blacklistedDomains, getDomainWithoutWWW(link.url)],
            },
          ],
        }),
      },
    ),
  ]);

  return NextResponse.json(response);
});
