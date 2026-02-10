import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./ui";
import type { PageType } from "../App";
import { easing } from "../lib/motion";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const navItems: { label: string; page: PageType }[] = [
  { label: "Work", page: "work" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mobileItems = useMemo(
    () =>
      [
        { label: "Home", page: "home" as PageType },
        ...navItems,
        { label: "Visual", page: "visual" as PageType },
      ].map((it, i) => ({ ...it, idx: String(i + 1).padStart(2, "0") })),
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavigate = (page: PageType) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50",
          "transition-all duration-1000 ease-expo-out",
          scrolled
            ? "bg-cream/92 backdrop-blur-md border-b border-stone-200/50"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-gutter py-6 md:py-8">
          <div className="flex items-center gap-4">
            <Logo onClick={() => handleNavigate("home")} />
            <span
              className={[
                "hidden md:inline-block h-2 w-2",
                "rounded-full",
                scrolled ? "bg-charcoal/30" : "bg-cream/40",
              ].join(" ")}
              aria-hidden="true"
            />
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={[
                    "text-body-sm uppercase tracking-[0.14em]",
                    "transition-colors duration-500",
                    active ? "text-charcoal" : "text-stone-500 hover:text-charcoal",
                  ].join(" ")}
                >
                  <span className={active ? "underline-weird" : ""}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-caption uppercase tracking-[0.18em] text-charcoal hover:text-stone-500 transition-colors duration-500"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: easing.expoOut }}
            className="fixed inset-0 z-[100] bg-cream"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-gutter py-6">
                <Logo onClick={() => handleNavigate("home")} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-caption uppercase tracking-[0.18em] text-charcoal hover:text-stone-500 transition-colors duration-500"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>

              <div className="px-gutter">
                <div className="h-px w-full bg-charcoal/10" />
                <div className="mt-4 text-overline uppercase tracking-[0.16em] text-stone-500">
                  Navigation
                </div>
              </div>

              <nav className="flex-1 flex flex-col justify-center px-gutter">
                {mobileItems.map((item, index) => {
                  const active = currentPage === item.page;
                  return (
                    <motion.button
                      key={item.page}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.08 + index * 0.06,
                        ease: easing.expoOut,
                      }}
                      onClick={() => handleNavigate(item.page)}
                      className="group flex items-baseline justify-between py-5 text-left"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-overline text-stone-400">
                          {item.idx}
                        </span>
                        <span
                          className={[
                            "text-display-xl",
                            "transition-colors duration-500",
                            active
                              ? "text-charcoal"
                              : "text-charcoal/85 group-hover:text-charcoal",
                          ].join(" ")}
                        >
                          {item.label}
                        </span>
                      </div>

                      <span
                        className={[
                          "text-overline uppercase tracking-[0.16em]",
                          "transition-opacity duration-500",
                          active
                            ? "opacity-100 text-charcoal"
                            : "opacity-0 group-hover:opacity-70 text-stone-500",
                        ].join(" ")}
                      >
                        open
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="px-gutter py-10 border-t border-stone-200/60">
                <a
                  href="mailto:hello@orangebeanie.design"
                  className="text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-500 underline-weird"
                >
                  hello@orangebeanie.design
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
