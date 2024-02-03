import { NavMobile, Nav, Footer } from "@imgpt/ui";

export default function CustomDomainLayout(props) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <NavMobile />
      <Nav />
      {props.children}
      <Footer />
    </div>
  );
}
