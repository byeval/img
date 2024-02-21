import { ReactNode } from "react";
import SettingsLayout from "@/ui/layout/settings-layout";

export default function PersonalSettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tabs = [
    {
      name: "General",
      segment: null,
    },
  ];

  return <SettingsLayout tabs={tabs}>{children}</SettingsLayout>;
}
