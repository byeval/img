import { MessageCircleMore } from "lucide-react";
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
        <div className="h-20 w-20 flex-shrink-0">
          <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
            <img
              src={gizmo.profilePictureUrl || '/favicon.svg'}
              className="bg-token-surface-secondary dark:bg-token-surface-tertiary h-full w-full"
              alt="GPT"
              width="80"
              height="80"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between overflow-hidden text-ellipsis break-words">
          <span className="line-clamp-1 mb-2 text-base font-medium leading-tight">
            {gizmo.name}
          </span>
          <span className="line-clamp-2 text-sm text-gray-700">
            {gizmo.description}
          </span>
          <div className="text-token-text-tertiary mt-1 flex items-center justify-between gap-1 text-ellipsis whitespace-nowrap pr-1 text-xs">
            <div className="text-token-text-tertiary text-xs text-gray-600">
              By {gizmo.inventor?.name || "anonymous"}
            </div>
            {gizmo.numConversations > 0 && (
              <div className="flex gap-1">
                <MessageCircleMore
                  width={16}
                  height={16}
                  color="#666"
                  className=" text-gray-500"
                />
                {gizmo.numConversations}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
