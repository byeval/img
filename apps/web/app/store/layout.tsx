import { Nav, NavMobile } from "@dub/ui";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavMobile />
      <Nav />
      {children}
    </main>
  );
}
