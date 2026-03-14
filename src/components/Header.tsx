import { motion } from "framer-motion";
import type { PageType } from "../App";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, projectId?: string) => void;
}

const navItems = [
  { number: "01", label: "Home", page: "home" as const },
  { number: "02", label: "About", page: "home" as const },
  { number: "03", label: "Work", page: "work" as const },
  { number: "04", label: "Contact", page: "home" as const },
];

export default function Header({ onNavigate }: HeaderProps) {
  const handleScroll = (page: PageType) => {
    if (page === "home") {
      const sectionMap: Record<string, string> = {
        "02": "about",
        "04": "contact",
      };
      const section = Object.entries(navItems).find(
        ([_, item]) => item.page === page
      )?.[1]?.label;
      if (section) {
        const element = document.getElementById(section.toLowerCase());
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      onNavigate(page);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#E8DCC5] px-5 py-6 md:px-8 md:py-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <nav className="flex items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => handleScroll(item.page)}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-sm font-medium tracking-wide text-[#1847B7] transition-opacity duration-300 hover:opacity-60"
            >
              <span className="font-semibold">{item.number}</span>
              <span className="mx-1">/</span>
              {item.label}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}