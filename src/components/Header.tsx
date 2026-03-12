import { motion } from "framer-motion";
import type { PageType } from "../App";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, projectId?: string) => void;
}

const navItems = [
  { number: "01", label: "HOME", page: "home" as const },
  { number: "02", label: "ABOUT", page: "home" as const },
  { number: "03", label: "WORK", page: "work" as const },
  { number: "04", label: "CONTACT", page: "home" as const },
];

export default function Header({ onNavigate }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#e9e5de] px-5 py-6 md:px-8 md:py-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <nav className="flex items-center justify-center gap-12 md:gap-16 lg:gap-20">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="group relative flex items-center gap-1.5 transition-opacity duration-300 hover:opacity-60"
            >
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[10px] font-light uppercase tracking-widest text-black"
              >
                {item.number}
                <span className="mx-0.5">/</span>
                {item.label}
              </motion.span>
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}