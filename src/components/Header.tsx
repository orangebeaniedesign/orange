import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PageType } from "../App";
import { Logo } from "./ui";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const navItems: { label: string; page: PageType; index: string }[] = [
  { label: "Hey", page: "home", index: "01" },
  { label: "About", page: "about", index: "02" },
  { label: "Work", page: "work", index: "03" },
  { label: "Contact", page: "contact", index: "04" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const mobileItems = useMemo(
    () => [
      ...navItems,
      { label: "Visual", page: "visual" as PageType, index: "05" },
    ],
    []
  );

  const handleNavigate = (page: PageType) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#f6f4ef]/85 backdrop-blur-xl"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="px-5 md:px-8 lg:px-10">
          <div className="flex items-center justify-between py-5 md:py-6">
            <div className="flex items-center gap-4">
              <div className={scrolled ? "text-[#111111]" : "text-[#111111]"}>
                <Logo onClick={() => handleNavigate("home")} />
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 lg:gap-10">
              {navItems.map((item) => {
                const active = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavigate(item.page)}
                    className="group flex items-center gap-2 uppercase tracking-[0.16em] text-[11px] lg:text-[12px] text-[#111111] transition-opacity duration-300 hover:opacity-100"
                    style={{ opacity: active ? 1 : 0.68 }}
                  >
                    <span className="text-[#7b7b74]">{item.index}/</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden uppercase tracking-[0.16em] text-[11px] text-[#111111]"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#f6f4ef]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex h-full flex-col px-5 md:px-8">
              <div className="flex items-center justify-between py-5">
                <Logo onClick={() => handleNavigate("home")} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="uppercase tracking-[0.16em] text-[11px] text-[#111111]"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>

              <div className="h-px w-full bg-black/10" />

              <nav className="flex flex-1 flex-col justify-center py-10">
                {mobileItems.map((item, index) => {
                  const active = currentPage === item.page;

                  return (
                    <motion.button
                      key={item.page}
                      onClick={() => handleNavigate(item.page)}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.05 + index * 0.05,
                        ease,
                      }}
                      className="group flex items-end justify-between border-b border-black/10 py-5 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <span className="pt-3 text-[11px] uppercase tracking-[0.16em] text-[#7b7b74]">
                          {item.index}/
                        </span>

                        <span
                          className={[
                            "text-[16vw] leading-[0.88] tracking-[-0.06em] font-semibold",
                            "md:text-[96px] lg:text-[120px]",
                            active ? "text-[#111111]" : "text-[#111111]/88",
                          ].join(" ")}
                          style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
                        >
                          {item.label}
                        </span>
                      </div>

                      <span className="mb-3 hidden uppercase tracking-[0.16em] text-[11px] text-[#7b7b74] md:block">
                        Open
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="border-t border-black/10 py-6">
                <a
                  href="mailto:orangebeaniedesign@gmail.com"
                  className="text-[13px] text-[#111111]/70 transition-opacity duration-300 hover:opacity-100"
                >
                  orangebeaniedesign@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}