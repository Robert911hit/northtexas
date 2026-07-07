import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Roofing", href: "#services" },
  { label: "Storm Damage", href: "#insurance" },
  { label: "Gutters", href: "#services" },
  { label: "Exterior", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_-8px_rgba(11,31,58,0.15)]"
          : "bg-transparent"
      )}
    >
      <div className="container-tight flex h-16 md:h-20 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2.5 group shrink-0">
          <div className={cn(
            "rounded-md transition-all",
            scrolled ? "bg-white p-1" : "bg-white/95 backdrop-blur p-1.5 shadow-lg"
          )}>
            <img src="/ntr-logo.svg" alt="North Texas Roofing" className="h-8 md:h-10 w-auto" />
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-semibold rounded-md transition-colors relative group",
                scrolled ? "text-navy hover:text-orange-brand" : "text-white/95 hover:text-orange-brand drop-shadow"
              )}
            >
              {item.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-orange-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:+19725550199"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md border transition-colors",
              scrolled
                ? "border-navy/20 text-navy hover:bg-navy hover:text-white"
                : "border-white/40 text-white hover:bg-white hover:text-navy"
            )}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">(972) 555-0199</span>
            <span className="lg:hidden">Call</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-md bg-orange-brand text-white shadow-glow hover:opacity-90 transition"
          >
            Free Inspection
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={cn(
            "xl:hidden md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md",
            scrolled ? "text-navy" : "text-white"
          )}
        >
          <Menu className="w-6 h-6" />
        </button>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={cn(
            "hidden md:inline-flex xl:hidden items-center justify-center w-10 h-10 rounded-md",
            scrolled ? "text-navy" : "text-white"
          )}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-navy-deep text-white">
          <div className="container-tight flex h-20 items-center justify-between">
            <div className="bg-white rounded-md p-1.5"><img src="/ntr-logo.svg" alt="North Texas Roofing" className="h-8 w-auto" /></div>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-10 h-10 grid place-items-center">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="container-tight flex flex-col gap-1 mt-8">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 text-2xl font-bold border-b border-white/10 hover:text-orange-brand transition"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-8">
              <a href="#contact" onClick={() => setOpen(false)} className="text-center py-4 rounded-md bg-orange-brand font-bold">
                Free Inspection
              </a>
              <a href="tel:+19725550199" className="text-center py-4 rounded-md border border-white/30 font-semibold inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> (972) 555-0199
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
