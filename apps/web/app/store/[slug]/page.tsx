import { getGizmo } from "@/lib/api/gizmos";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbList, WebApplication, WithContext } from "schema-dts";

const ToolDescriptionMap: any = {
  python:
    "The GPT can write and run Python code, and it can work with file uploads, perform advanced data analysis, and handle image conversions.",
  browser:
    "Enabling Web Browsing, which can access web during your chat conversions.",
  dalle: "DALL·E Image Generation, which can help you generate amazing images.",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const id = slug.split("-").reverse()[0];
  const gizmo = await getGizmo({ id });

  if (!gizmo) {
    return {
      title: "404",
    };
  }

  const {
    name,
    description,
    welcomeMessage,
    profilePictureUrl,
    createdAt,
    platform,
    model,
  } = gizmo;

  return {
    title: name,
    description: [description, welcomeMessage].join(", "),
    keywords: [
      model,
      platform,
      "imgpt",
      "chatgpt",
      "gpt store",
      "custom gpt",
      "gpt-3.5",
      "gpts",
    ],
    opengraph: {
      title: name,
      url: `https://img.pt/store/${slug}`,
      siteName: "Im GPT Store",
      publishedTime: createdAt,
      images: profilePictureUrl,
      authors: [],
    },
  };
}

export default async function Gizmo({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const id = slug.split("-").reverse()[0];
  const gizmo = await getGizmo({ id });

  if (!gizmo) {
    return null;
  }

  const {
    name,
    slug: gizmoSlug,
    description,
    welcomeMessage,
    promptStarters,
    profilePictureUrl,
    categories,
    createdAt,
    updatedAt,
    tools,
    tags,
    numConversations,
    platform,
    model,
    featured,
    inventor,
  } = gizmo;

  const starterItems = JSON.parse(promptStarters!);
  const toolItems = JSON.parse(tools!);
  const categoryItems = JSON.parse(categories!);
  const gizmoId = gizmoSlug.split("-").slice(0, 2).join("-");
  const chatgptUrl = `https://chat.openai.com/g/${gizmoId}?ref=img.pt`;

  const appJSON: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description: description!,
    applicationCategory: categoryItems.join(",")!,
    url: `https://img.pt/store/${slug}`,
    datePublished: createdAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    image: profilePictureUrl,
    author: [
      {
        "@type": "Person",
        name: inventor!.name,
        url: `https://img.pt/store/user/${inventor?.id}`,
      },
    ],
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
        name,
        item: `https://img.pt/store/${slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 lg:flex-row lg:px-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([appJSON, breadJSON]),
        }}
      />
      <div className="flex flex-1 flex-col gap-4">
        <div className="bg-card text-card-foreground flex flex-col gap-4 rounded-lg border p-5 shadow-sm lg:flex-row ">
          <div className="mr-4 h-[72px] w-[72px]">
            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt={name}
                width={72}
                height={72}
              />
            ) : (
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-token-secondary"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="mb-2 text-2xl font-semibold leading-7">{name}</h1>
            <h2 className="leading-6 text-gray-500">{description}</h2>
          </div>
          <div className="flex items-end justify-end">
            <a href={chatgptUrl} target="_blank">
              <button className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
                Try {name}
              </button>
            </a>
          </div>
          {/* <div>{numConversations}</div> */}
        </div>
        <div className="bg-card text-card-foreground space-y-4 rounded-lg border p-5 shadow-sm">
          <h3 className="font-semibold leading-none tracking-tight">
            Welcome Message
          </h3>
          <p className=" text-gray-500">{welcomeMessage}</p>
        </div>
        <div className="bg-card text-card-foreground space-y-2 rounded-lg border p-5 shadow-sm">
          <h3 className="text-md mb-4 font-medium">Prompt Starters</h3>
          <p className="text-gray-700">
            Use below prompt to quick start the chat.
          </p>
          <div className="flex flex-col space-y-2">
            {starterItems.map((item: string) => (
              <li className="text-gray-500" key={item}>
                {item}
              </li>
            ))}
          </div>
        </div>
        <div className="bg-card text-card-foreground space-y-4 rounded-lg border p-5 shadow-sm">
          <h3 className="text-md mb-4 font-medium">Tools</h3>
          <div className="flex flex-col gap-4">
            {toolItems.map((item: string) => (
              <li className="text-gray-500" key={item}>
                <strong className="text-black">{item}:</strong>{" "}
                {ToolDescriptionMap[item]}
              </li>
            ))}
          </div>
        </div>
        <div className="bg-card text-card-foreground rounded-lg border p-5 shadow-sm">
          <div className="text-token-text-tertiary text-sm font-normal">
            Powered by {platform}
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-2xl font-medium">
            <Sparkles />
            {model}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[300px]">
        <div className="bg-card text-card-foreground flex w-full flex-col gap-4 rounded-lg border p-5 shadow-sm">
          <h3 className="text-md font-medium">Author</h3>
          <div className="flex flex-col space-y-2">
            <strong>name:</strong>
            {inventor!.name}
          </div>
          {inventor?.website && (
            <div className="flex flex-col space-y-2">
              <strong>website:</strong>
              <Link target="_blank" href={inventor.website}>
                {inventor!.website}
              </Link>
            </div>
          )}
          <Link href={`/store/user/${inventor!.id}`}>
            <button className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
              View more GPTs created by he/she
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
