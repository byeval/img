import prisma from "@/lib/prisma";

export async function getInventor({ id }) {
  const inventor = await prisma.inventor.findUnique({
    where: {
      id,
    },
  });

  return inventor;
}
