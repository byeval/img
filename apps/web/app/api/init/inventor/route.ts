import prisma from "@/lib/prisma";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const json = readFileSync(
    "/Users/xuhong/iDev/gpt/gpts/database/daily-inventors.json",
  );
  const data = JSON.parse(json.toString());
  const ids = Object.keys(data);

  const allInventors = await prisma.inventor.findMany({
    select: {
      id: true,
    },
  });
  const allIds = allInventors.map((inventor) => inventor.id);

  console.log("createmany start", allIds.length);
  const item = await prisma.inventor.createMany({
    data: ids
      .filter((id) => !allIds.includes(id.split("-")[1]))
      .map((id) => ({
        id: id.split("-")[1],
        name: data[id].displayName || "",
        website: data[id].linkTo,
        isVerified: !!data[id].isVerified,
        hasEmailSupport: !!data[id].willReceiveSupportEmails,
      })),
  });
  console.log("createmany end");
  return Response.json(ids.length);
}
