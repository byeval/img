import { GizmoList } from "@/ui/store/gizmo-list";
import { API_DOMAIN } from "@imgpt/utils";
import GizmoTops from "@/ui/store/gizmo-tops";
import { searchGizmos } from "@/lib/api/gizmos";

export default async function Store() {
  const gizmos = await searchGizmos({});

  return (
    <div className="mx-auto max-w-screen-xl overflow-x-clip px-4 lg:px-20">
      <div className="mt-12 mb-8">
        <h1 className="my-2 text-center text-3xl font-bold md:my-4 md:text-5xl">
          I'm GPT Store.
        </h1>
        <h1 className="text-token-text-secondary mx-auto w-full text-center text-sm font-light md:text-lg md:leading-tight">
          Discover and create custom versions of ChatGPT that combine
          instructions, extra knowledge, and any combination of skills.
        </h1>
      </div>
      <GizmoList items={gizmos} />
      <GizmoTops items={gizmos} />
      <div className="mt-12 flex justify-center">
        <div className="mb-12 text-xl font-medium md:text-2xl">
          Frequently asked questions
        </div>
      </div>
    </div>
  );
}