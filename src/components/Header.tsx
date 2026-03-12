import { useEffect, useState } from "react";
import type { PageType } from "../App";
import { Logo } from "./ui";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItem = (label: string, page: PageType) => (
    <button
      key={page}
      onClick={() => onNavigate(page)}
      className={`text-[13px] transition-opacity duration-300 ${
        currentPage === page ? "opacity-100" : "opacity-60 hover:opacity-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#f6f4ef]/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="px-5 md:px-8 lg:px-10">
        <div className="flex items-center justify-between py-5">
          <Logo onClick={() => onNavigate("home")} />

          <nav className="flex items-center gap-6 text-[#111111]">
            {navItem("Work", "work")}
            {navItem("About", "home")}
            {navItem("Contact", "home")}
          </nav>
        </div>
      </div>
    </header>
  );
}