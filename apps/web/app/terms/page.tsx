import { Background, Footer, Nav } from "@imgpt/ui";
import { constructMetadata } from "@imgpt/utils";
import { TimerOff } from "lucide-react";

export const runtime = "edge";

export const metadata = constructMetadata({
  title: "Terms of Service – img.pt",
  noIndex: true,
});

export default async function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Nav />
      <div>
        <h1>Terms of Service</h1>
        <p>These are the terms of service</p>
      </div>
      <Footer />
      <Background />
    </main>
  );
}
