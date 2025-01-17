"use client";

import useProject from "@/lib/swr/use-project";
import useTags from "@/lib/swr/use-tags";
import useUsers from "@/lib/swr/use-users";
import PlanBadge from "@/ui/projects/plan-badge";
import { Divider } from "@/ui/shared/icons";
import ProgressBar from "@/ui/shared/progress-bar";
import { Button, InfoTooltip, NumberTooltip, useRouterStuff } from "@imgpt/ui";
import { HOME_DOMAIN, getFirstAndLastDay, nFormatter } from "@imgpt/utils";
import va from "@vercel/analytics";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Confetti from "react-dom-confetti";
import { toast } from "sonner";
import { mutate } from "swr";
import { MaxWidthWrapper } from "@imgpt/ui";

export default function ProjectBillingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    slug,
    plan,
    usage,
    usageLimit,
    linksUsage,
    linksLimit,
    billingCycleStart,
  } = useProject();

  const [clicked, setClicked] = useState(false);

  const [billingStart, billingEnd] = useMemo(() => {
    if (billingCycleStart) {
      const { firstDay, lastDay } = getFirstAndLastDay(billingCycleStart);
      const start = firstDay.toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
      const end = lastDay.toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
      return [start, end];
    }
    return [];
  }, [billingCycleStart]);

  const { queryParams } = useRouterStuff();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (searchParams?.get("success")) {
      toast.success("Upgrade success!");
      setConfetti(true);
      setTimeout(() => {
        mutate(`/api/projects/${slug}`);
        // track upgrade event
        plan &&
          va.track("Upgraded Plan", {
            plan,
          });
      }, 1000);
    }
  }, [searchParams, plan]);

  return (
    <MaxWidthWrapper>
      <Confetti active={confetti} config={{ elementCount: 200, spread: 90 }} />
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex flex-col space-y-3 p-10">
          <h2 className="text-xl font-medium">Plan &amp; Usage</h2>
          <p className="text-sm text-gray-500">
            You are currently on the{" "}
            {plan ? (
              <PlanBadge plan={plan} />
            ) : (
              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-200">
                load
              </span>
            )}{" "}
            plan.
            {billingStart && billingEnd && (
              <>
                {" "}
                Current billing cycle:{" "}
                <span className="font-medium text-black">
                  {billingStart} - {billingEnd}
                </span>
                .
              </>
            )}
          </p>
        </div>
        <div className="grid divide-y divide-gray-200 border-y border-gray-200">
          <UsageCategory
            title="Link Clicks"
            unit="clicks"
            tooltip="Number of billable link clicks for your current billing cycle."
            usage={usage}
            usageLimit={usageLimit}
          />
          <div className="grid divide-y divide-gray-200 border-y border-gray-200">
            <UsageCategory
              title="Created Links"
              unit="links"
              tooltip="Number of short links created in the current billing cycle."
              usage={linksUsage}
              usageLimit={linksLimit}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between space-y-3 px-10 py-4 text-center sm:flex-row sm:space-y-0 sm:text-left">
          {plan ? (
            <p className="text-sm text-gray-500">
              {plan === "enterprise"
                ? "You're on the Enterprise plan."
                : plan === "business"
                ? "Need more clicks or links? Contact us for an Enterprise quote."
                : `For higher limits, upgrade to the ${
                    plan === "free" ? "Pro" : "Business"
                  } plan.`}
            </p>
          ) : (
            <div className="h-3 w-28 animate-pulse rounded-full bg-gray-200" />
          )}
          <div>
            {plan ? (
              plan === "free" ? (
                <Button
                  text="Upgrade"
                  onClick={() =>
                    queryParams({
                      set: {
                        upgrade: "pro",
                      },
                    })
                  }
                  variant="success"
                />
              ) : plan === "business" ? (
                <a
                  href={`${HOME_DOMAIN}/enterprise`}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-md border border-violet-600 bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-violet-600 focus:outline-none"
                >
                  Contact Sales
                </a>
              ) : (
                <Button
                  text="Manage Subscription"
                  onClick={() => {
                    setClicked(true);
                    fetch(`/api/projects/${slug}/billing/manage`, {
                      method: "POST",
                    })
                      .then(async (res) => {
                        const url = await res.json();
                        router.push(url);
                      })
                      .catch((err) => {
                        alert(err);
                        setClicked(false);
                      });
                  }}
                  loading={clicked}
                />
              )
            ) : (
              <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

function UsageCategory({
  title,
  unit,
  tooltip,
  usage,
  usageLimit,
  numberOnly,
}: {
  title: string;
  unit: string;
  tooltip: string;
  usage?: number;
  usageLimit?: number;
  numberOnly?: boolean;
}) {
  return (
    <div className="p-10">
      <div className="flex items-center space-x-2">
        <h3 className="font-medium">{title}</h3>
        <InfoTooltip content={tooltip} />
      </div>
      {numberOnly ? (
        <div className="mt-4 flex items-center">
          {usage || usage === 0 ? (
            <p className="text-2xl font-semibold text-black">
              {nFormatter(usage, { full: true })}
            </p>
          ) : (
            <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200" />
          )}
          <Divider className="h-8 w-8 text-gray-500" />
          <p className="text-2xl font-semibold text-gray-400">
            {nFormatter(usageLimit, { full: true })}
          </p>
        </div>
      ) : (
        <div className="mt-2 flex flex-col space-y-2">
          {usage !== undefined && usageLimit ? (
            <p className="text-sm text-gray-600">
              <NumberTooltip value={usage}>
                <span>{nFormatter(usage)} </span>
              </NumberTooltip>
              / {nFormatter(usageLimit)} {unit} (
              {((usage / usageLimit) * 100).toFixed(1)}%)
            </p>
          ) : (
            <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200" />
          )}
          <ProgressBar value={usage} max={usageLimit} />
        </div>
      )}
    </div>
  );
}
