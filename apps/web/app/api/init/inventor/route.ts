import prisma from "@/lib/prisma";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const json = readFileSync(
    "/Users/xuhong/iDev/gpt/gpts/database/inventors.json",
  );
  const data = JSON.parse(json.toString());
  const ids = Object.keys(data);

  console.log("createmany start");
  const item = await prisma.inventor.createMany({
    data: ids.slice(1).map((id) => ({
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
