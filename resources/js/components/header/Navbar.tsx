import NavLinks from "./NavLinks";
import Logo from "./Logo";

// Definimos los enlaces en una variable separada
const leftLinks = [
  { href: "/about", label: "Nosotros" },
  { href: "/projects", label: "Proyectos" },
];

const rightLinks = [
  { href: "/contact", label: "Contactanos" },
];

export default function Navbar() {
  return (
    <div className="h-full w-[1200px] m-auto p-5">
      <div className="h-full w-full flex justify-between items-center">
        <Logo  />
        <NavLinks links={leftLinks}  />
        <NavLinks links={rightLinks}  />
      </div>
    </div>
  );
}
