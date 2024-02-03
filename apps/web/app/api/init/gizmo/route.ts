import prisma from "@/lib/prisma";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const json = readFileSync(
    "/Users/xuhong/iDev/gpt/gpts/database/daily-gizmos.json",
  );
  const data = JSON.parse(json.toString());
  const ids = Object.keys(data);

  Response.json(ids.length);

  const allGizmos = await prisma.gizmo.findMany({
    select: {
      slug: true,
    },
  });
  const allSlugs = allGizmos.map((gizmo) => gizmo.slug);

  console.log("createmany start", allSlugs.length);

  const pageSize = 100;
  const page = Math.floor(ids.length / pageSize) + 1;
  const arr = Array.from(Array(page).keys());
  const failed: any = [];

  for (let i of arr) {
    console.log(i);
    const start = i * pageSize;
    const end = (i + 1) * pageSize;
    if (start > 5000 && end < 6000) {
      const ids = Object.keys(data).slice(start, end);
      try {
        await prisma.gizmo.createMany({
          data: ids
            .filter((id) => !allSlugs.includes(data[id].slug))
            .map((id) => ({
              slug: data[id].slug,
              name: data[id].name || "",
              description: data[id].description || "",
              welcomeMessage: data[id].welcomeMessage || "",
              promptStarters: JSON.stringify(data[id].promptStarters || []),
              profilePictureUrl: data[id].profilePictureUrl || "",
              categories: JSON.stringify(data[id].categories || []),
              tags: JSON.stringify(data[id].tags || []),
              tools: JSON.stringify(data[id].tools || []),
              shareRecipient: data[id].shareRecipient || "",
              numConversations: data[id].numConversations || 0,
              numPins: data[id].numPins || 0,
              createdAt: new Date(data[id].createdAt),
              updatedAt: new Date(data[id].updatedAt),
              inventorId: data[id].inventorId.split("-")[1],
              platform: "openai",
              model: "GPT-4",
            })),
        });
      } catch (err) {
        failed.push(i);
        console.log(data[i - start]);
        console.log(JSON.stringify(failed), err);
      }
    }
  }

  console.log("createmany end", JSON.stringify(failed));
  return Response.json(ids.length);
}
