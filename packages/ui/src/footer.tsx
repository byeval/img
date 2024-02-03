"use client";

import { ALL_TOOLS } from "@imgpt/utils";
import va from "@vercel/analytics";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FEATURES_LIST } from "./content";
import { Github, LogoType, Twitter } from "./icons";
import { MaxWidthWrapper } from "./max-width-wrapper";

const navigation = {
  features: FEATURES_LIST.map(({ shortTitle, slug }) => ({
    name: shortTitle,
    href: `/${slug}`,
  })),
  product: [
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
    { name: "Pricing", href: "/pricing" },
    { name: "Help Center", href: "/help" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Abuse", href: "/abuse" },
  ],
  tools: ALL_TOOLS.map(({ name, slug }) => ({
    name,
    href: `/tools/${slug}`,
  })),
};

export function Footer() {
  const { domain = "img.pt" } = useParams() as { domain: string };

  const createHref = (href: string) =>
    domain === "img.pt" ? href : `https://img.pt${href}`;

  return (
    <footer className="z-10 border-t border-gray-200 bg-white/50 py-8 backdrop-blur-lg">
      <MaxWidthWrapper className="pt-10">
        <div className="flex justify-between">
          <div className="space-y-8">
            <Link
              href={createHref("/")}
              {...(domain !== "img.pt" && {
                onClick: () => {
                  va.track("Referred from custom domain", {
                    domain,
                    medium: `footer item (logo)`,
                  });
                },
              })}
            >
              <span className="sr-only">
                {process.env.NEXT_PUBLIC_APP_NAME} Logo
              </span>
              <LogoType className="h-7 text-gray-600" />
            </Link>
            <p className="max-w-xs text-sm text-gray-500">
              Make your GPTs link short and readable, attract more clicks, and
              get proper analytics of your links.
            </p>
            <div className="flex items-center space-x-2">
              <a
                href="https://twitter.com/dubdotco"
                target="_blank"
                rel="noreferrer"
                className="group rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5 text-gray-600" />
              </a>
              <div className="h-8 border-l border-gray-200" />
              <a
                href="https://github.com/dubinc/dub"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Github</span>
                <Github className="h-5 w-5 text-gray-600" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-20 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Features</h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.features.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={createHref(item.href)}
                      {...(domain !== "img.pt" && {
                        onClick: () => {
                          va.track("Referred from custom domain", {
                            domain,
                            medium: `footer item (${item.name})`,
                          });
                        },
                      })}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Product</h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={createHref(item.href)}
                      {...(domain !== "img.pt" && {
                        onClick: () => {
                          va.track("Referred from custom domain", {
                            domain,
                            medium: `footer item (${item.name})`,
                          });
                        },
                      })}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Legal</h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={createHref(item.href)}
                      {...(domain !== "img.pt" && {
                        onClick: () => {
                          va.track("Referred from custom domain", {
                            domain,
                            medium: `footer item (${item.name})`,
                          });
                        },
                      })}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600">Tools</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.tools.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={createHref(item.href)}
                        {...(domain !== "img.pt" && {
                          onClick: () => {
                            va.track("Referred from custom domain", {
                              domain,
                              medium: `footer item (${item.name})`,
                            });
                          },
                        })}
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-gray-500">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME},
            Inc.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
