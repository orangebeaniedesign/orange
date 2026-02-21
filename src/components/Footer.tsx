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
  { label: "Vimeo", url: "https://vimeo.com/orangebeanie" },
  { label: "Behance", url: "https://www.behance.net/claudianbrito" },
];

export default function Footer({ onNavigate }: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer ref={ref} className="border-t border-stone-200 bg-cream">
      <div className="px-gutter py-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 mb-24">
            <div>
              <p className="label-caption mb-7">Navigation</p>
              <nav className="space-y-4">
                {navLinks.map((link, i) => (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className="group flex items-baseline gap-3 text-body-md text-stone-500 hover:text-charcoal transition-colors duration-500"
                  >
                    <span className="text-overline text-stone-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="underline-weird">{link.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <p className="label-caption mb-7">Elsewhere</p>
              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-body-md text-stone-500 hover:text-charcoal transition-colors duration-500"
                  >
                    <span className="underline-weird">{social.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="label-caption mb-7">Say hello</p>
              <a
                href="mailto:orangebeaniedesign@gmail.com"
                className="text-body-md text-stone-500 hover:text-charcoal transition-colors duration-500 underline-weird"
              >
                orangebeaniedesign@gmail.com
              </a>

              <p className="text-body-sm text-stone-400 font-light mt-5">
                Madeira-based, working worldwide.
              </p>

              {/* opcional: CV link mantém-se (mesmo sem PDF por agora, porque ainda não vais publicar) */}
              <div className="mt-6">
                <a
                  href="/cv.pdf"
                  className="text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-500 underline-weird inline-flex items-center gap-2"
                  download
                >
                  Download CV
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
