import useLinks from "@/lib/swr/use-links";
import { LoadingSpinner, useRouterStuff } from "@imgpt/ui";
import { Search, XCircle } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function LinkFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { queryParams } = useRouterStuff();
  const searchInputRef = useRef(); // this is a hack to clear the search input when the clear button is clicked

  useEffect(() => {
    if (searchParams?.has("search")) {
      queryParams({
        set: { showArchived: "true" },
      });
    }
  }, [pathname, searchParams]);

  const showClearButton = useMemo(() => {
    return ["sort", "search", "userId", "page"].some((param) =>
      searchParams?.has(param),
    );
  }, [searchParams]);

  return (
    <div className="grid w-full rounded-md bg-white px-5 lg:divide-y lg:divide-gray-300">
      <div className="grid gap-3 py-6">
        <div className="flex items-center justify-between">
          <h3 className="ml-1 mt-2 font-semibold">Filter Links</h3>
          {showClearButton && <ClearButton searchInputRef={searchInputRef} />}
        </div>
        <SearchBox searchInputRef={searchInputRef} />
      </div>
    </div>
  );
}

const ClearButton = ({ searchInputRef }) => {
  const router = useRouter();
  const { slug } = useParams() as { slug?: string };
  return (
    <button
      onClick={() => {
        router.replace(`/${slug || "links"}`);
        searchInputRef.current.value = "";
      }}
      className="group flex items-center justify-center space-x-1 rounded-md border border-gray-400 px-2 py-1 transition-all hover:border-gray-600 active:bg-gray-100"
    >
      <XCircle className="h-4 w-4 text-gray-500 transition-all group-hover:text-black" />
      <p className="text-sm text-gray-500 transition-all group-hover:text-black">
        Clear
      </p>
    </button>
  );
};

const SearchBox = ({ searchInputRef }) => {
  const searchParams = useSearchParams();
  const { queryParams } = useRouterStuff();
  const debounced = useDebouncedCallback((value) => {
    queryParams({
      set: {
        search: value,
      },
      del: "page",
    });
  }, 500);
  const { isValidating } = useLinks();

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    // only focus on filter input when:
    // - user is not typing in an input or textarea
    // - there is no existing modal backdrop (i.e. no other modal is open)
    if (
      e.key === "/" &&
      target.tagName !== "INPUT" &&
      target.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {isValidating && searchInputRef.current?.value.length > 0 ? (
          <LoadingSpinner className="h-4 w-4" />
        ) : (
          <Search className="h-4 w-4 text-gray-400" />
        )}
      </div>
      <input
        ref={searchInputRef}
        type="text"
        className="peer w-full rounded-md border border-gray-300 pl-10 text-black placeholder:text-gray-400 focus:border-black focus:ring-0 sm:text-sm"
        placeholder="Search..."
        defaultValue={searchParams?.get("search") || ""}
        onChange={(e) => {
          debounced(e.target.value);
        }}
      />
    </div>
  );
};
