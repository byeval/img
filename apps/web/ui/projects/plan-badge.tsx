import { PlanProps } from "@/lib/types";
import { Badge } from "@imgpt/ui";

export default function PlanBadge({ plan }: { plan: PlanProps }) {
  return (
    <Badge
      variant={
        plan === "enterprise"
          ? "violet"
          : plan === "business"
          ? "sky"
          : plan === "pro"
          ? "blue"
          : "black"
      }
    >
      {plan}
    </Badge>
  );
}
