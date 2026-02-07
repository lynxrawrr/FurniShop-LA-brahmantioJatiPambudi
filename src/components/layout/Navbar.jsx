import { useEffect, useMemo, useState } from "react";
import Container from "./Container.jsx";
import MobileMenu from "./MobileMenu.jsx";
import { RiMenu3Fill } from "react-icons/ri";
import { useHideOnScroll } from "../../utils/useHideOnScroll.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScroll({ threshold: 10, topOffset: 40 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(
    () => [
      { label: "Home", href: "#" },
      { label: "About", href: "#about" },
      { label: "Features", href: "#products" },
      { label: "Contact", href: "#contact" },
    ],
    [],
  );

  return (
    <header
      id="top"
      className={[
        "fixed inset-x-0 top-0 z-150 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        "transition-colors duration-300",
        scrolled
          ? "bg-dark/60 backdrop-blur border-b border-white/10"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <Container className="flex items-center justify-between py-6">
        {/* Brand */}
        <a href="#top" className="text-2xl font-bold tracking-tight text-white">
          FurniShop
        </a>

        {/* Desktop Menu */}
        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/85 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center p-2 md:hidden"
          aria-label="Open menu"
        >
          <RiMenu3Fill className="w-8 h-8 translate-x-2.5 text-white" />
        </button>

        <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
      </Container>
    </header>
  );
}
