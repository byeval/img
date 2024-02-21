"use client";

import useProject from "@/lib/swr/use-project";
import { useAddEditLinkModal } from "@/ui/modals/add-edit-link-modal";
import { useCompleteSetupModal } from "@/ui/modals/complete-setup-modal";
import { useUpgradePlanModal } from "@/ui/modals/upgrade-plan-modal";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
} from "react";
import { mutate } from "swr";
import { useCookies } from "@imgpt/ui";
import { SimpleLinkProps } from "@/lib/types";
import { toast } from "sonner";

export const ModalContext = createContext<{
  setShowCompleteSetupModal: Dispatch<SetStateAction<boolean>>;
  setShowAddEditLinkModal: Dispatch<SetStateAction<boolean>>;
  setShowUpgradePlanModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowCompleteSetupModal: () => {},
  setShowAddEditLinkModal: () => {},
  setShowUpgradePlanModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { CompleteSetupModal, setShowCompleteSetupModal } =
    useCompleteSetupModal();
  const { setShowAddEditLinkModal, AddEditLinkModal } = useAddEditLinkModal();
  const { setShowUpgradePlanModal, UpgradePlanModal } = useUpgradePlanModal();

  const [hashes, setHashes] = useCookies<SimpleLinkProps[]>("hashes__dub", [], {
    domain: !!process.env.NEXT_PUBLIC_VERCEL_URL ? ".img.pt" : undefined,
  });

  const { slug, error } = useProject();

  useEffect(() => {
    if (hashes.length > 0 && slug) {
      toast.promise(
        fetch(`/api/links/sync?projectSlug=${slug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hashes),
        }).then(async (res) => {
          if (res.status === 200) {
            await mutate(
              (key) => typeof key === "string" && key.startsWith("/api/links"),
              undefined,
              { revalidate: true },
            );
            setHashes([]);
          }
        }),
        {
          loading: "Importing links...",
          success: "Links imported successfully!",
          error: "Something went wrong while importing links.",
        },
      );
    }
  }, [hashes, slug]);

  return (
    <ModalContext.Provider
      value={{
        setShowCompleteSetupModal,
        setShowAddEditLinkModal,
        setShowUpgradePlanModal,
      }}
    >
      <CompleteSetupModal />
      <AddEditLinkModal />
      <UpgradePlanModal />
      {children}
    </ModalContext.Provider>
  );
}
