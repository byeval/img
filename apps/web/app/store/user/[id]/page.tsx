import { queryGizmosByInventor, searchGizmos } from "@/lib/api/gizmos";
import { getInventor } from "@/lib/api/inventors";
import GizmoCard from "@/ui/store/gizmo-card";
import { BreadcrumbList, Person, WithContext } from "schema-dts";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const inventor = await getInventor({ id });

  if (!inventor) {
    return {
      title: "404",
    };
  }

  const { name } = inventor;

  return {
    title: name,
    description: `custom gpts created by ${name}`,
    keywords: [
      "imgpt",
      "chatgpt",
      "gpt store",
      "custom gpt",
      "gpt-3.5",
      "gpts",
      name,
    ],
    opengraph: {
      title: name,
      url: `https://img.pt/store/user/${id}`,
      siteName: "Im GPT Store",
    },
  };
}

export default async function Inventor({ params }: { params: { id: string } }) {
  const { id } = params;
  const [inventor, gizmos] = await Promise.all([
    getInventor({ id }),
    queryGizmosByInventor({ inventorId: id }),
  ]);

  const { name } = inventor!;

  const personJSON: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
  };

  const breadJSON: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Store",
        item: "https://img.pt/store",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: name || "anonymous",
        item: `https://img.pt/store/user/${id}`,
      },
    ],
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 lg:px-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJSON, breadJSON]),
        }}
      />
      <h1 className="mb-2 text-2xl font-semibold leading-7">
        GPTs Created by {name || "anonymous"}
      </h1>
      <div className="">
        <div className="grid grid-cols-1 gap-x-1.5 gap-y-1 md:grid-cols-2 md:gap-x-2 md:gap-y-1.5 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-2.5">
          {gizmos.map((gizmo: any) => (
            <GizmoCard gizmo={gizmo} key={gizmo.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
