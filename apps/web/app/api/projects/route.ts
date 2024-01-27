import { NextResponse } from "next/server";
import {
  addDomainToVercel,
  domainExists,
  setRootDomain,
  validateDomain,
} from "@/lib/api/domains";
import { withSession } from "@/lib/auth";
import { isReservedKey } from "@/lib/edge-config";
import prisma from "@/lib/prisma";
import {
  DEFAULT_REDIRECTS,
  FREE_PROJECTS_LIMIT,
  validSlugRegex,
} from "@dub/utils";

// GET /api/projects - get all projects for the current user
export const GET = withSession(async ({ session }) => {
  const projects = await prisma.project.findMany({
    where: {
      users: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      domains: true,
      users: {
        where: {
          userId: session.user.id,
        },
        select: {
          role: true,
        },
      },
    },
  });
  return NextResponse.json(projects);
});

export const POST = withSession(async ({ req, session }) => {
  const { name, slug, domain } = await req.json();

  if (!name || !slug) {
    return new Response("Missing name or slug", { status: 422 });
  }
  let slugError: string | null = null;

  // check if slug is too long
  if (slug.length > 48) {
    slugError = "Slug must be less than 48 characters";

    // check if slug is valid
  } else if (!validSlugRegex.test(slug)) {
    slugError = "Invalid slug";

    // check if slug is reserved
  } else if ((await isReservedKey(slug)) || DEFAULT_REDIRECTS[slug]) {
    slugError = "Cannot use reserved slugs";
  }

  if (domain) {
    const validDomain = await validateDomain(domain);
    if (slugError || validDomain !== true) {
      return NextResponse.json(
        {
          slugError,
          domainError: validDomain === true ? null : validDomain,
        },
        { status: 422 },
      );
    }
  }

  const freeProjects = await prisma.project.count({
    where: {
      plan: "free",
      users: {
        some: {
          userId: session.user.id,
          role: "owner",
        },
      },
    },
  });

  if (freeProjects >= FREE_PROJECTS_LIMIT) {
    return new Response(
      `You can only create up to ${FREE_PROJECTS_LIMIT} free projects. Additional projects require a paid plan.`,
      { status: 403 },
    );
  }

  const [slugExist, domainExist] = await Promise.all([
    prisma.project.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
      },
    }),
    domain ? domainExists(domain) : false,
  ]);
  if (slugExist || domainExist) {
    return NextResponse.json(
      {
        slugError: slugExist ? "Slug is already in use." : null,
        domainError: domainExist ? "Domain is already in use." : null,
      },
      { status: 422 },
    );
  }
  const response = await Promise.all([
    prisma.project.create({
      data: {
        name,
        slug,
        users: {
          create: {
            userId: session.user.id,
            role: "owner",
          },
        },
        ...(domain && {
          domains: {
            create: {
              slug: domain,
              primary: true,
            },
          },
        }),
        billingCycleStart: new Date().getDate(),
      },
      include: {
        domains: true,
      },
    }),
    addDomainToVercel(domain),
  ]);

  await setRootDomain({
    id: response[0].domains[0].id,
    domain,
    projectId: response[0].id,
  });

  return NextResponse.json(response);
});
