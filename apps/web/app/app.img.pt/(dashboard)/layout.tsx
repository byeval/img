import { constructMetadata } from "@imgpt/utils";
import { MaxWidthWrapper } from "@imgpt/ui";
import { HOME_DOMAIN } from "@imgpt/utils";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import UserDropdown from "@/ui/layout/user-dropdown";
import NavTabs from "@/ui/layout/nav-tabs";
import Providers from "./providers";

export const dynamic = "force-static";
export const metadata = constructMetadata();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen w-full bg-gray-50">
        <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
          <MaxWidthWrapper>
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/">
                  <img className="h-6 w-24" src="/logo.svg" />
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href={`${HOME_DOMAIN}/store`}
                  className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
                  target="_blank"
                >
                  GPTStore
                </a>
                <a
                  href={`${HOME_DOMAIN}/changelog`}
                  className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
                  target="_blank"
                >
                  Changelog
                </a>
                <a
                  href={`${HOME_DOMAIN}/help`}
                  className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
                  target="_blank"
                >
                  Help
                </a>
                <UserDropdown />
              </div>
            </div>
            <Suspense fallback={<div className="h-12 w-full" />}>
              <NavTabs />
            </Suspense>
          </MaxWidthWrapper>
        </div>
        {children}
      </div>
    </Providers>
  );
}
