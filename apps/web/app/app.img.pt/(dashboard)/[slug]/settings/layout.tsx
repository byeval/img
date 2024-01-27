import { ReactNode } from "react";
import SettingsLayout from "@/ui/layout/settings-layout";

export default function ProjectSettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tabs = [
    {
      name: "General",
      segment: null,
    },
    {
      name: "Billing",
      segment: "billing",
    },
    {
      name: "Security",
      segment: "security",
    },
  ];

  return <SettingsLayout tabs={tabs}>{children}</SettingsLayout>;
}
