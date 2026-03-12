import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PageType } from "../App";
import { Logo } from "./ui";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, projectId?: string) => void;
}

const navItems = [
  { label: "HEY", section: "hey", index: "01" },
  { label: "ABOUT", section: "about", index: "02" },
  { label: "WORK", page: "work" as PageType, index: "03" },
  { label: "CONTACT", section: "footer-contact", index: "04" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const mobileItems = useMemo(() => navItems, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSectionNav = (section: string) => {
    if (currentPage !== "home") {
      onNavigate("home");
      requestAnimationFrame(() => {
        setTimeout(() => scrollToSection(section), 120);
      });
    } else {
      scrollToSection(section);
    }
    setMenuOpen(false);
  };

  const handlePageNav = (page: PageType) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-[#f6f4ef]/82 backdrop-blur-xl" : "bg-transparent",
        ].join(" ")}
      >
        <div className="px-5 md:px-8 lg:px-10">
          <div className="flex items-center justify-between py-5 md:py-6">
            <Logo onClick={() => handlePageNav("home")} className="relative z-10" />

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const active = item.page
                  ? currentPage === item.page
                  : currentPage === "home";

                return (
                  <button
                    key={item.label}
                    onClick={() =>
                      item.page
                        ? handlePageNav(item.page)
                        : handleSectionNav(item.section!)
                    }
                    className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#111111] transition-opacity duration-300 hover:opacity-100"
                    style={{ opacity: active ? 1 : 0.56 }}
                  >
                    <span className="rounded-sm border border-[#4a7fe0] px-1.5 py-[1px] text-[#111111]">
                      {item.index}/
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-[11px] uppercase tracking-[0.16em] text-[#111111]"
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
            transition={{ duration: 0.3, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex h-full flex-col px-5 md:px-8">
              <div className="flex items-center justify-between py-5">
                <Logo onClick={() => handlePageNav("home")} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-[11px] uppercase tracking-[0.16em] text-[#111111]"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>

              <div className="h-px w-full bg-black/10" />

              <nav className="flex flex-1 flex-col justify-center py-10">
                {mobileItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() =>
                      item.page
                        ? handlePageNav(item.page)
                        : handleSectionNav(item.section!)
                    }
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.04 + index * 0.05,
                      ease,
                    }}
                    className="flex items-end justify-between border-b border-black/10 py-5 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="pt-3 text-[11px] uppercase tracking-[0.16em] text-[#7b7b74]">
                        {item.index}/
                      </span>
                      <span
                        className="text-[15vw] font-semibold leading-[0.88] tracking-[-0.06em] text-[#111111] md:text-[96px]"
                        style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </motion.button>
                ))}
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