"use client";

import LinksContainer from "@/ui/links/links-container";
import { useAddEditLinkModal } from "@/ui/modals/add-edit-link-modal";
import { MaxWidthWrapper } from "@imgpt/ui";

export default function ProjectLinksClient() {
  const { AddEditLinkModal, AddEditLinkButton } = useAddEditLinkModal();

  return (
    <>
      <AddEditLinkModal />
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-600">Links</h1>
            <div className="flex">
              <AddEditLinkButton />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <LinksContainer AddEditLinkButton={AddEditLinkButton} />
    </>
  );
}
