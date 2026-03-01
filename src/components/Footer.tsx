import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PageType } from "../App";
import { easing, duration } from "../lib/motion";

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
      <div className="px-gutter py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-16 mb-10">
            <div>
              <p className="text-body-xs uppercase tracking-wide text-stone-400 mb-4">Navigation</p>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className="text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-500 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-body-xs uppercase tracking-wide text-stone-400 mb-4">Social</p>
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-500"
                  >
                    {social.label}
                    <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-body-xs uppercase tracking-wide text-stone-400 mb-4">Contact</p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:orangebeaniedesign@gmail.com"
                  className="text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-500"
                >
                  orangebeaniedesign@gmail.com
                </a>
                <p className="text-body-xs text-stone-500 font-light leading-relaxed">
                  Madeira-based,<br />working worldwide.
                </p>
                <a
                  href="/cv.pdf"
                  className="group inline-flex items-center gap-2 text-body-xs text-stone-600 hover:text-charcoal transition-colors duration-500 mt-2"
                  download
                >
                  Download CV
                  <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
            <span className="text-body-xs text-stone-400 font-light">
              {new Date().getFullYear()} Orange Beanie
            </span>

            <span className="text-body-xs text-stone-400 font-light">
              Design · Photography · Motion
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
