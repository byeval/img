"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "@dub/utils";

const searchCategory = {
  name: "Search",
  value: "search",
  description: "Search for a GPT",
};

const defaultCategories = [
  {
    name: "Top Picks",
    value: "picked",
    description: "Curated top picks from this week",
  },
  {
    name: "Newest",
    value: "newest",
    description: "Newest GPTs on PickedGPT",
  },
  {
    name: "DALL·E",
    value: "dalle",
    description:
      "DALL·E Image Generation, which can help you generate amazing images.",
  },
  {
    name: "Writing",
    value: "writing",
    description:
      "Writing, which can help you write stories, essays, poems, and more.",
  },
  {
    name: "Productivity",
    value: "productivity",
    description:
      "Productivity, which can help you write stories, essays, poems, and more.",
  },
  {
    name: "Research & Analysis",
    value: "research",
    description:
      "Research & Analysis, which can help you write stories, essays, poems, and more.",
  },
  {
    name: "Programming",
    value: "programming",
    description:
      "Programming, which can help you write stories, essays, poems, and more.",
  },
  {
    name: "Education",
    value: "education",
    description:
      "Education, which can help you write stories, essays, poems, and more.",
  },
  {
    name: "Lifestyle",
    value: "lifestyle",
    description:
      "Lifestyle, which can help you write stories, essays, poems, and more.",
  },
];

export function GizmoList({ items }: any) {
  const [gizmos, setGizmos] = useState(items);
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("picked");
  const [keyword, setKeyword] = useState("");
  const selectedCategoryItem = categories.find(
    (item) => item.value === selectedCategory,
  );

  useEffect(() => {
    if (keyword) {
      if (!categories.find((item) => item.value === "search")) {
        setCategories([searchCategory, ...categories]);
        setSelectedCategory("search");
      }
    } else {
      setCategories(defaultCategories);
      setSelectedCategory("picked");
    }
  }, [keyword]);

  const fetchGizmos = (params: any) => {
    const query = new URLSearchParams(params);

    fetch(`${API_DOMAIN}/api/gizmos?${query}`, {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then((items) => {
        setGizmos(items);
      });
  };

  const handleSearch = () => {
    let params: any = {};
    if (keyword) {
      params.keyword = keyword;
    } else {
      params.category = selectedCategory;
    }
    fetchGizmos(params);
  };

  const handleCategory = (category: any) => {
    setSelectedCategory(category.value);
    fetchGizmos({
      category: category.value,
    });
  };

  return (
    <div>
      <div className="group relative z-20 mb-6 mt-2 flex-grow rounded-xl shadow-[0px_10px_10px_-6px_rgba(0,0,0,0.04)]">
        <Search className="pointer-none absolute top-0 left-6 mr-2 h-full text-gray-500" />
        <input
          className="hover:dark-border-gray-500 z-10 h-12 w-full rounded-xl border border-gray-200 py-2 pr-3 pl-12 text-base font-normal outline-0 delay-100 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 hover:dark:bg-gray-700 md:h-14"
          placeholder="Search public GPTs"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <div className="sticky top-14 z-10 -ml-4 mb-12 w-screen bg-white py-2 text-sm dark:bg-gray-800 md:ml-0 md:w-full md:pb-0">
        <div className="no-scrollbar flex scroll-m-5 gap-1.5 overflow-x-auto md:overflow-hidden">
          {categories.map((category) => (
            <div
              key={category.value}
              onClick={() => handleCategory(category)}
              className={`cursor-pointer scroll-mx-5 whitespace-nowrap rounded-3xl px-3 py-2 first:ml-4 last:mr-4 md:px-2 md:first:ml-0 md:last:mr-0 ${
                selectedCategory === category.value
                  ? "border-token-text-primary bg-black text-white dark:bg-gray-100 dark:text-gray-800 md:rounded-none md:border-b-2 md:bg-transparent md:text-black dark:md:bg-transparent dark:md:text-white"
                  : "md:text-token-text-tertiary bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 md:rounded-lg md:bg-transparent md:hover:bg-gray-50 dark:md:bg-transparent dark:md:hover:bg-gray-700"
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <div className="h-fit scroll-mt-28 last:min-h-[calc(100vh-8rem)]">
        <div>
          <div className="text-xl font-medium md:text-2xl">
            {selectedCategoryItem!.name}
          </div>
          <div className="text-token-text-tertiary text-sm md:text-base">
            {selectedCategoryItem!.description}
          </div>
        </div>
        <div className="mb-10 mt-4">
          <div className="grid grid-cols-2 gap-x-1.5 gap-y-1 md:gap-x-2 md:gap-y-1.5 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-2.5">
            {gizmos.map((gizmo: any, index: number) => (
              <Link
                className="group flex h-[104px] items-center gap-2.5 overflow-hidden rounded-xl bg-gray-50 px-1 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 md:px-3 md:py-4 lg:px-3"
                target="_blank"
                href={`/store/${gizmo.slug}`}
                key={gizmo.slug}
              >
                <div className="flex w-full flex-grow items-center gap-4 overflow-hidden">
                  <div className="h-12 w-12 flex-shrink-0">
                    <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
                      {/* <Image
                        src={gizmo.profilePictureUrl}
                        className="h-full w-full bg-token-surface-secondary dark:bg-token-surface-tertiary"
                        alt="GPT"
                        width="80"
                        height="80"
                      /> */}
                    </div>
                  </div>
                  <div className="overflow-hidden text-ellipsis break-words">
                    <span className="line-clamp-2 text-sm font-medium leading-tight">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
