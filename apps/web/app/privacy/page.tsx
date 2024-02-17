import { Background, Footer, Nav } from "@imgpt/ui";
import { constructMetadata } from "@imgpt/utils";
import { TimerOff } from "lucide-react";

export const runtime = "edge";

export const metadata = constructMetadata({
  title: "Privacy Policy – img.pt",
  noIndex: true,
});

export default async function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Nav />
      <div>
        <h1>Privacy Policy</h1>
      </div>
      <Footer />
      <Background />
    </main>
  );
}
