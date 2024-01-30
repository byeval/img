import GizmoCard from "./gizmo-card";

export default function GizmoTops({ items }) {
  return (
    <div className="h-fit scroll-mt-28 last:min-h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <div className="text-xl font-medium md:text-2xl">Top Picks</div>
        <div className="text-token-text-tertiary text-sm md:text-base">
          Curated top picks from this week
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-1.5 gap-y-1 md:grid-cols-2 md:gap-x-2 md:gap-y-1.5 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-2.5">
        {items.map((gizmo: any) => (
          <GizmoCard gizmo={gizmo} key={gizmo.slug} />
        ))}
      </div>
    </div>
  );
}
