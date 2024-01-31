import { inter, satoshi } from "@/styles/fonts";
import "@/styles/globals.css";
import { cn, constructMetadata } from "@dub/utils";
import { TooltipProvider } from "@dub/ui/src/tooltip";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(satoshi.variable, inter.variable)}>
      <body>
        <TooltipProvider>
          <Toaster closeButton />
          {children}
          <Analytics />
          <SpeedInsights />
        </TooltipProvider>
      </body>
      <GoogleAnalytics gaId="G-X6T98X49LH" />
    </html>
  );
}
