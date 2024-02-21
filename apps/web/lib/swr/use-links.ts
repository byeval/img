import { fetcher } from "@imgpt/utils";
import { useRouterStuff } from "@imgpt/ui";
import { type Link as LinkProps } from "@prisma/client";
import useSWR from "swr";
import { UserProps } from "../types";
import { useEffect, useState } from "react";

export default function useLinks() {
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.host.startsWith("admin.")) {
      setAdmin(true);
    }
  }, []);

  const { data: links, isValidating } = useSWR<
    (LinkProps & {
      user: UserProps;
    })[]
  >(
    !admin
      ? `/api/links${getQueryString(
          {},
          {
            ignore: ["import", "upgrade"],
          },
        )}`
      : `/api/admin/links${getQueryString()}`,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  return {
    links,
    isValidating,
  };
}
