import prisma from "@/lib/prisma";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const json = readFileSync("/Users/xuhong/iDev/gpt/gpts/database/gizmos.json");
  const data = JSON.parse(json.toString());
  const ids = Object.keys(data);

  Response.json(ids.length);

  const failed: any = [];
  console.log("createmany start");
  const pageSize = 5;
  const page = Math.floor(ids.length / pageSize);
  const arr = Array.from(Array(page).keys());

  for (let i of arr) {
    // console.log(i);
    const start = i * pageSize;
    const end = (i + 1) * pageSize;
    if (start > 523 && end < 1000) {
      const ids = Object.keys(data).slice(start, end);
      try {
        await prisma.gizmo.createMany({
          data: ids.map((id) => ({
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
        console.log(data[i-start]);
        console.log(JSON.stringify(failed), err);
      }
    }
  }

  //   for (let id of ids) {
  //     try {
  //       await prisma.gizmo.create({
  //         data: {
  //           slug: data[id].slug,
  //           name: data[id].name || "",
  //           description: data[id].description || "",
  //           welcomeMessage: data[id].welcomeMessage || "",
  //           promptStarters: JSON.stringify(data[id].promptStarters || []),
  //           profilePictureUrl: data[id].profilePictureUrl || "",
  //           categories: JSON.stringify(data[id].categories || []),
  //           tags: JSON.stringify(data[id].tags || []),
  //           tools: JSON.stringify(data[id].tools || []),
  //           shareRecipient: data[id].shareRecipient || "",
  //           numConversations: data[id].numConversations || 0,
  //           numPins: data[id].numPins || 0,
  //           createdAt: new Date(data[id].createdAt),
  //           updatedAt: new Date(data[id].updatedAt),
  //           inventorId: data[id].inventorId.split("-")[1],
  //           platform: "openai",
  //           model: "GPT-4",
  //         },
  //       });
  //     } catch (err) {
  //       failed.push(id);
  //       console.log(JSON.stringify(failed), err);
  //     }
  //   }

  console.log("createmany end", JSON.stringify(failed));
  return Response.json(ids.length);
}
