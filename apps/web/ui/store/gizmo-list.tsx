"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_DOMAIN } from "@dub/utils";
import GizmoCard from "./gizmo-card";

const searchCategory = {
  name: "Search",
  value: "search",
  description: "Search for a GPT",
};

const defaultCategories = [
  {
    name: "Featured",
    value: "featured",
    description: "Featured by community and staff picks",
  },
  {
    name: "Newest",
    value: "newest",
    description: "Newest GPTs on GPT Store",
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
  const [loading, setLoading] = useState(false);
  const [gizmos, setGizmos] = useState(items);
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [keyword, setKeyword] = useState("");
  const selectedCategoryItem = categories.find(
    (item) => item.value === selectedCategory,
  );
  const filterRef = useRef<any>({
    pageNo: 1,
  });

  useEffect(() => {
    if (keyword) {
      if (!categories.find((item) => item.value === "search")) {
        setCategories([searchCategory, ...categories]);
        setSelectedCategory("search");
      }
    } else {
      setCategories(defaultCategories);
      setSelectedCategory("featured");
    }
  }, [keyword]);

  const fetchGizmos = () => {
    const query = new URLSearchParams(filterRef.current);
    setLoading(true);
    fetch(`https://img.pt/api/gizmos?${query}`, {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then((items) => {
        if (filterRef.current.pageNo === 1) {
          setGizmos(items);
        } else {
          setGizmos([...gizmos, ...items]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    let params: any = {
      pageNo: 1,
    };
    if (keyword) {
      params.keyword = keyword;
    } else {
      params.category = selectedCategory;
    }
    filterRef.current = params;
    fetchGizmos();
  };

  const handleCategory = (category: any) => {
    setSelectedCategory(category.value);
    filterRef.current = {
      pageNo: 1,
      category: category.value,
    };
    fetchGizmos();
  };

  const handleFetchMore = () => {
    filterRef.current.pageNo = filterRef.current.pageNo + 1;
    fetchGizmos();
  };

  return (
    <div>
      <div className="group relative z-10 mb-6 mt-2 flex-grow rounded-xl shadow-[0px_10px_10px_-6px_rgba(0,0,0,0.04)]">
        <Search className="pointer-none absolute top-0 left-4 mr-2 h-full text-gray-500" />
        <input
          className=" z-10 h-12 w-full rounded-xl border border-gray-200 py-2 pr-3 pl-12 text-base font-normal outline-0 delay-100 hover:border-gray-300 hover:bg-gray-50 md:h-14"
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
      <div className="sticky top-14 z-10 -ml-4 mb-12 w-screen bg-white py-2 text-sm md:ml-0 md:w-full md:pb-0">
        <div className="no-scrollbar flex scroll-m-5 gap-1.5 overflow-x-auto md:overflow-hidden">
          {categories.map((category) => (
            <div
              key={category.value}
              onClick={() => handleCategory(category)}
              className={`cursor-pointer scroll-mx-5 whitespace-nowrap rounded-3xl px-3 py-2 first:ml-4 last:mr-4 md:px-2 md:first:ml-0 md:last:mr-0 ${
                selectedCategory === category.value
                  ? "border-token-text-primary bg-black text-white md:rounded-none md:border-b-2 md:bg-transparent md:text-black"
                  : "md:text-token-text-tertiary bg-gray-50 hover:bg-gray-100 md:rounded-lg md:bg-transparent md:hover:bg-gray-50"
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <div className="h-fit scroll-mt-28 last:min-h-[calc(100vh-8rem)]">
        <div className="mb-4">
          <div className="text-xl font-medium md:text-2xl">
            {selectedCategoryItem!.name}
          </div>
          <div className="text-token-text-tertiary text-sm md:text-base">
            {selectedCategoryItem!.description}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-1.5 gap-y-1 md:grid-cols-2 md:gap-x-2 md:gap-y-1.5 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-2.5">
          {gizmos.map((gizmo: any) => (
            <GizmoCard gizmo={gizmo} key={gizmo.slug} />
          ))}
        </div>
      </div>
      <div className="my-10 flex justify-center">
        <button
          disabled={loading}
          onClick={handleFetchMore}
          className=" focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 w-48 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? "Loading" : " Load More GPTs"}
        </button>
      </div>
    </div>
  );
}
