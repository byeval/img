import prisma from "@/lib/prisma";
import { Background } from "@imgpt/ui";
import { constructMetadata } from "@imgpt/utils";
import PlaceholderContent from "./placeholder";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}) {
  const title = `imG.PT – Free ChatGPT Custom GPTs Link Shortener.`;
  const description = `imG.PT is a free URL shortener for your Custom GPTs, and get featured on the GPT store at img.pt/store.`;

  return constructMetadata({
    title,
    description,
  });
}

export async function generateStaticParams() {
  const domains =
    process.env.VERCEL_ENV === "production"
      ? await prisma.domain.findMany({
          where: {
            verified: true,
            target: null,
            NOT: {
              slug: "img.pt",
            },
          },
          select: {
            slug: true,
          },
        })
      : [];
  return domains.map(({ slug: domain }) => ({
    domain,
  }));
}

export default function CustomDomainPage() {
  return (
    <>
      <Background />
      <PlaceholderContent />
    </>
  );
}
