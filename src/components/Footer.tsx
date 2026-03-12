import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PageType } from "../App";
import { easing, duration } from "../lib/motion";
import { Logo } from "./ui/Logo";

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const navLinks: { label: string; page: PageType }[] = [
  { label: "Work", page: "work" },
  { label: "Visual", page: "visual" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

const socials = [
  { label: "Instagram", url: "https://www.instagram.com/imtheorangebeanie/" },
  { label: "Vimeo", url: "" },
  { label: "Behance", url: "https://www.behance.net/claudianbrito" },
];

export default function Footer({ onNavigate }: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer ref={ref} className="border-t border-stone-200 bg-cream">
      <div className="px-gutter py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-12">
            <div>
              <div onClick={() => onNavigate("home")} className="cursor-pointer mb-4">
                <Logo className="h-5 md:h-6" />
              </div>
              <p className="text-body-xs text-stone-400 font-light">
                {new Date().getFullYear()} Orange Beanie
              </p>
            </div>

            <div>
              <h3 className="text-body-xs font-medium uppercase tracking-wide text-charcoal mb-4">
                Navigation
              </h3>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className="text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-body-xs font-medium uppercase tracking-wide text-charcoal mb-4">
                Social
              </h3>
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-300 text-left"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-body-xs font-medium uppercase tracking-wide text-charcoal mb-4">
                Contact
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:orangebeaniedesign@gmail.com"
                  className="text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-300 text-left"
                >
                  orangebeaniedesign@gmail.com
                </a>
                <a
                  href="/cv.pdf"
                  className="text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-300 text-left"
                  download
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200/60">
            <p className="text-body-xs text-stone-400 font-light">
              Design - Photography - Motion
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
