import Link from "next/link";
import { Gem } from "lucide-react";
import { GizmoList } from "@/ui/store/gizmo-list";
import { API_DOMAIN } from "@dub/utils";

export default async function Store() {
  const res = await fetch(`${API_DOMAIN}/api/gizmos`, {
    next: { revalidate: 0 },
  });

  const gizmos = await res.json();

  return (
    <main>
      <div className="mx-auto max-w-screen-xl overflow-x-clip px-4">
        <div className="my-12">
          <h1 className="my-2 text-center text-3xl font-bold md:my-4 md:text-5xl">
            I'm GPT Store.
          </h1>
          <h1 className="text-token-text-secondary mx-auto w-full text-center text-sm font-light md:text-lg md:leading-tight">
            Discover and create custom versions of ChatGPT that combine
            instructions, extra knowledge, and any combination of skills.
          </h1>
        </div>
        <GizmoList items={gizmos} />
        <Link href="/store" className="flex justify-center">
          <button className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
            Explore more on GPT Store
          </button>
        </Link>
        <div className="mt-12 flex justify-center">
          <div className="mb-12 text-xl font-medium md:text-2xl">
            Frequently asked questions
          </div>
        </div>
      </div>
    </main>
  );
}
