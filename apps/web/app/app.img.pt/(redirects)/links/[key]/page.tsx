import { redirect } from "next/navigation";

export default function OldLinksStatsPage({
  params,
}: {
  params: {
    key: string;
  };
}) {
  redirect(`/analytics?domain=img.pt&key=${params.key}`);
}
