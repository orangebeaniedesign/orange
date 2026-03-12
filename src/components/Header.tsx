import { useEffect, useState } from "react";
import type { PageType } from "../App";
import { Logo } from "./ui";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#f6f4ef]/35 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="px-5 md:px-8 lg:px-10">
        <div className="flex items-center justify-between py-5 md:py-6">
          <Logo onClick={() => onNavigate("home")} />
        </div>
      </div>
    </header>
  );
}