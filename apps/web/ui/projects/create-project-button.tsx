"use client";

import useProjects from "@/lib/swr/use-projects";
import { ModalContext } from "@/ui/modals/provider";
import { Button } from "@imgpt/ui";
import { TooltipContent } from "@imgpt/ui/src/tooltip";
import { FREE_PROJECTS_LIMIT, HOME_DOMAIN } from "@imgpt/utils";
import { useContext } from "react";

export default function CreateProjectButton() {
  const { setShowAddProjectModal } = useContext(ModalContext);
  const { freeProjects, exceedingFreeProjects } = useProjects();

  return (
    <div>
      <Button
        text="Create project"
        disabledTooltip={
          exceedingFreeProjects ? (
            <TooltipContent
              title={`You can only create up to ${FREE_PROJECTS_LIMIT} free projects. Additional projects require a paid plan.`}
              cta="Upgrade to Pro"
              href={
                freeProjects
                  ? `/${freeProjects[0].slug}/settings/billing?upgrade=pro`
                  : `${HOME_DOMAIN}/pricing`
              }
            />
          ) : undefined
        }
        onClick={() => setShowAddProjectModal(true)}
      />
    </div>
  );
}
