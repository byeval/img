export const PLANS = [
  {
    name: "Free",
    tagline: "For hobby & side projects",
    price: {
      monthly: 0,
      yearly: 0,
    },
    limits: {
      links: 25,
      clicks: 1000,
      domains: 3,
      tags: 5,
      users: 1,
    },
    colors: {
      bg: "bg-black",
      text: "text-black",
    },
    cta: {
      text: "Start for free",
      href: "https://app.img.pt/register",
      color: "bg-black border-black hover:text-black",
    },
    featureTitle: "What's included:",
    features: [
      { text: "25 links/mo" },
      {
        text: "1K tracked clicks/mo",
      },
      { text: "30-day analytics retention" },
      { text: "3 custom domains" },
      { text: "1 user" },
      {
        text: "Community support",
        footnote: "Help center + GitHub discussions.",
      },
    ],
  },
  {
    name: "Pro",
    tagline: "For startups & small businesses",
    price: {
      monthly: 7,
      yearly: 5,
      ids: [
        "price_1OTcQBAlJJEpqkPViGtGEsbb", // new monthly (test)
        "price_1OYJeBAlJJEpqkPVLjTsjX0E", // new monthly (prod)
        "price_1OTcQBAlJJEpqkPVYlCMqdLL", // new yearly (test)
        "price_1OYJeBAlJJEpqkPVnPGEZeb0", // new yearly (prod)
      ],
    },
    limits: {
      links: 1000,
      clicks: 50000,
      tags: 25,
    },
    colors: {
      bg: "bg-blue-500",
      text: "text-blue-500",
    },
    cta: {
      text: "Get started with Pro",
      shortText: "Get started",
      href: "https://app.img.pt/register",
      color: "bg-blue-500 border-blue-500 hover:text-blue-500",
    },
    featureTitle: "Everything in Free, plus:",
    features: [
      { text: "1,000 links/mo" },
      {
        text: "50K tracked clicks/mo",
      },
      { text: "1-year analytics retention" },
      { text: "Basic support", footnote: "Basic email support." },
      {
        text: "Root domain redirect",
        footnote: {
          title:
            "Redirect vistors that land on the root of your domain (e.g. yourdomain.com) to a page of your choice.",
          cta: "Learn more.",
          href: "https://img.pt/help/article/how-to-redirect-root-domain",
        },
      },
      {
        text: "Advanced link features",
        footnote:
          "Custom social media cards, password-protected links, link expiration, link cloaking, device targeting, geo targeting, link aliases, link monitoring etc.",
      },
    ],
  },
];

export const FREE_PLAN = PLANS.find((plan) => plan.name === "free")!;

export const SELF_SERVE_PAID_PLANS = PLANS.filter((p) => p.name === "Pro");

export const FREE_PROJECTS_LIMIT = 1;
