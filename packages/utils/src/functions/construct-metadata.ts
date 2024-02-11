import { Metadata } from "next";
import { HOME_DOMAIN } from "../constants";

export function constructMetadata({
  title = `imG.PT – Free ChatGPT Custom GPTs Link Shortener.`,
  description = `imG.PT is a free URL shortener for your custom GPTs, and get featured on the GPT store at img.pt/store.`,
  image = "https://img.pt/_static/thumbnail.png",
  icons = [
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      url: "/logo-180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/logo-32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/logo-16.png",
    },
  ],
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@imgptai",
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
