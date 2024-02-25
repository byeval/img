import { fetcher } from "@imgpt/utils";
import { useRouterStuff } from "@imgpt/ui";
import useSWR from "swr";
import { useEffect, useState } from "react";
export default function useLinksCount({
  groupBy,
}: {
  groupBy?: "domain";
} = {}) {
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.host.startsWith("admin.")) {
      setAdmin(true);
    }
  }, []);

  const { data, error } = useSWR<any>(
    !admin
      ? `/api/links/count${getQueryString(
          {
            ...(groupBy && { groupBy }),
          },
          {
            ignore: ["import", "upgrade"],
          },
        )}`
      : `/api/admin/links/count${getQueryString({
          ...(groupBy && { groupBy }),
        })}`,
    fetcher,
    {
      dedupingInterval: 30000,
      keepPreviousData: true,
    },
  );

  return {
    data,
    loading: !error && !data,
    error,
  };
}
