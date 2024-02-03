import { Nav, NavMobile } from "@imgpt/ui";

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
