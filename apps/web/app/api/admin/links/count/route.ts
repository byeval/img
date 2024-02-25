import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GPT_DOMAINS, LEGAL_USER_ID } from "@imgpt/utils";

// GET /api/links – get all user links
export const GET = withAdmin(async ({ searchParams }) => {
  let { groupBy, search, domain } = searchParams as {
    groupBy?: "domain";
    search?: string;
    domain?: string;
  };

  let response;

  if (groupBy) {
    response = await prisma.link.groupBy({
      by: [groupBy],
      where: {
        ...(search && {
          OR: [
            {
              key: { contains: search },
            },
            {
              url: { contains: search },
            },
          ],
        }),
        // when filtering by domain, only filter by domain if the filter group is not "Domains"
        ...(domain && groupBy !== "domain"
          ? {
              domain,
            }
          : {
              domain: {
                in: GPT_DOMAINS.map((domain) => domain.slug),
              },
            }),
        userId: {
          not: LEGAL_USER_ID,
        },
      },
      _count: true,
      orderBy: {
        _count: {
          [groupBy]: "desc",
        },
      },
    });
  } else {
    response = await prisma.link.count({
      where: {
        ...(search && {
          OR: [
            {
              key: { contains: search },
            },
            {
              url: { contains: search },
            },
          ],
        }),
        ...(domain
          ? { domain }
          : {
              domain: {
                in: GPT_DOMAINS.map((domain) => domain.slug),
              },
            }),
      },
    });
  }

  return NextResponse.json(response);
});
