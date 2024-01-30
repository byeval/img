import Image from "next/image";
import Link from "next/link";

export default function GizmoCard({ gizmo }) {
  return (
    <Link
      className="group flex h-[112px] items-center gap-2.5 overflow-hidden rounded-xl bg-gray-50 px-1 py-4 hover:bg-gray-100 md:px-3 md:py-4 lg:px-3"
      target="_blank"
      href={`/store/${gizmo.slug}`}
      key={gizmo.slug}
    >
      <div className="flex w-full flex-grow items-center gap-4 overflow-hidden">
        <div className="h-12 w-12 flex-shrink-0">
          <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
            <Image
              src={gizmo.profilePictureUrl}
              className="bg-token-surface-secondary dark:bg-token-surface-tertiary h-full w-full"
              alt="GPT"
              width="80"
              height="80"
            />
          </div>
        </div>
        <div className="overflow-hidden text-ellipsis break-words">
          <span className="line-clamp-1 mb-2 text-sm font-medium leading-tight">
            {gizmo.name}
          </span>
          <span className="line-clamp-3 text-xs text-gray-700">
            {gizmo.description}
          </span>
          <div className="text-token-text-tertiary mt-1 flex items-center gap-1 text-ellipsis whitespace-nowrap pr-1 text-xs">
            <div className="text-token-text-tertiary text-xs text-gray-600">
              By {gizmo.inventor?.name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
