export * from "./cctlds";
export * from "./countries";
export * from "./pricing";

export const LOCALHOST_GEO_DATA = {
  city: "San Francisco",
  region: "CA",
  country: "US",
  latitude: "37.7695",
  longitude: "-122.385",
};
export const LOCALHOST_IP = "63.141.57.109";

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring" } },
};

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export const SWIPE_REVEAL_ANIMATION_SETTINGS = {
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.15, ease: "easeOut" },
};

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const PAGINATION_LIMIT = 100;

export const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN || "img.pt";

export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`;

export const APP_HOSTNAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "app.localhost:8888",
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}:8888`,
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : "http://localhost:8888";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NGROK_URL || "http://localhost:8888";

export const API_HOSTNAMES = new Set([
  `api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `api.${SHORT_DOMAIN}`,
  "api.localhost:8888",
]);

export const API_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : "http://api.localhost:8888";

export const ADMIN_HOSTNAMES = new Set([
  `admin.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "admin.localhost:8888",
]);

export const DEFAULT_REDIRECTS = {
  home: "https://img.pt",
  signin: "https://app.img.pt/login",
  login: "https://app.img.pt/login",
  register: "https://app.img.pt/register",
  signup: "https://app.img.pt/register",
  app: "https://app.img.pt",
  dashboard: "https://app.img.pt",
  links: "https://app.img.pt/links",
  settings: "https://app.img.pt/settings",
  welcome: "https://app.img.pt/welcome",
};

export const GPT_HEADERS = {
  headers: {
    "x-powered-by": "img.pt - chatgpt link shortner",
  },
};

export const GOOGLE_FAVICON_URL =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";

export const GPT_LOGO = "https://d2vwwcvoksz7ty.cloudfront.net/logo.png";
export const GPT_THUMBNAIL =
  "https://d2vwwcvoksz7ty.cloudfront.net/thumbnail.png";

export const IMGPT_PROJECT_ID = "cl7pj5kq4006835rbjlt2ofka";
export const LEGAL_PROJECT_ID = "clrflia0j0000vs7sqfhz9c7q";
export const LEGAL_USER_ID = "clqei1lgc0000vsnzi01pbf47";

export const HIDE_BACKGROUND_SEGMENTS = [
  "stats",
  "changelog",
  "terms",
  "privacy",
  "abuse",
];

export const GPT_DOMAINS = [
  {
    id: "clce1z7ch00j0rbstbjufva4j",
    slug: SHORT_DOMAIN,
    verified: true,
    primary: true,
    archived: false,
    target: `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
    type: "redirect",
    placeholder: "https://img.pt/help/article/what-is-gpt",
    clicks: 0,
    allowedHostnames: [],
    projectId: IMGPT_PROJECT_ID,
  },
];

export const ALL_TOOLS = [
  { name: "Metatags API", slug: "metatags" },
  { name: "QR Code Generator", slug: "qr-code" },
  { name: "Link Inspector", slug: "inspector" },
];

export const SECOND_LEVEL_DOMAINS = new Set([
  "com",
  "co",
  "net",
  "org",
  "edu",
  "gov",
  "in",
]);

export const SPECIAL_APEX_DOMAINS = new Set([
  "my.id",
  "github.io",
  "vercel.app",
  "now.sh",
  "pages.dev",
  "webflow.io",
  "netlify.app",
  "fly.dev",
  "web.app",
]);

export const DEFAULT_LINK_PROPS = {
  key: "",
  url: "",
  domain: "",
  archived: false,
  expiresAt: null,
  password: null,

  title: null,
  description: null,
  image: null,
  rewrite: false,
  ios: null,
  android: null,

  clicks: 0,
  userId: "",

  proxy: false,
};

export const SAML_PROVIDERS = [
  {
    name: "Okta",
    logo: "/_static/icons/okta.svg",
    saml: "okta",
    samlModalCopy: "Metadata URL",
    scim: "okta-scim-v2",
    scimModalCopy: {
      url: "SCIM 2.0 Base URL",
      token: "OAuth Bearer Token",
    },
    wip: false,
  },
  {
    name: "Azure AD",
    logo: "/_static/icons/azure.svg",
    saml: "azure",
    samlModalCopy: "App Federation Metadata URL",
    scim: "azure-scim-v2",
    scimModalCopy: {
      url: "Tenant URL",
      token: "Secret Token",
    },
    wip: false,
  },
  {
    name: "Google",
    logo: "/_static/icons/google.svg",
    saml: "google",
    samlModalCopy: "XML Metadata File",
    scim: "google",
    scimModalCopy: {
      url: "SCIM 2.0 Base URL",
      token: "OAuth Bearer Token",
    },
    wip: false,
  },
];
