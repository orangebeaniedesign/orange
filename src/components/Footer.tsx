import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { PageType } from "../App";

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const socialLinks = [
  { label: "Instagram", url: "https://www.instagram.com/imtheorangebeanie/" },
  { label: "Behance", url: "https://www.behance.net/claudianbrito" },
];

const navLinks: { label: string; page: PageType; index: string }[] = [
  { label: "Hey", page: "home", index: "01" },
  { label: "About", page: "about", index: "02" },
  { label: "Work", page: "work", index: "03" },
  { label: "Contact", page: "contact", index: "04" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer({ onNavigate }: FooterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <footer ref={ref} className="bg-[#f6f4ef] border-t border-black/10">
      <div className="px-5 md:px-8 lg:px-10 py-16 md:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-[1600px]"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_0.8fr] lg:gap-10">
            <div>
              <div className="mb-6 text-[11px] uppercase tracking-[0.16em] text-[#7b7b74]">
                04/Contact
              </div>

              <h2
                className="max-w-[10ch] text-[17vw] leading-[0.88] tracking-[-0.07em] text-[#111111] md:text-[96px] lg:text-[140px]"
                style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
              >
                Let’s make
                <br />
                something fun.
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="mailto:orangebeaniedesign@gmail.com"
                  className="group inline-flex items-center gap-2 text-[15px] text-[#111111] transition-opacity duration-300 hover:opacity-70"
                >
                  orangebeaniedesign@gmail.com
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <span className="text-[13px] text-[#111111]/55">
                  Madeira-based, working worldwide.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <div className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#7b7b74]">
                  Navigate
                </div>

                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.page}
                      onClick={() => onNavigate(link.page)}
                      className="group flex items-center gap-2 text-left text-[14px] text-[#111111]/78 transition-colors duration-300 hover:text-[#111111]"
                    >
                      <span className="text-[#7b7b74]">{link.index}/</span>
                      <span>{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#7b7b74]">
                  Elsewhere
                </div>

                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-[14px] text-[#111111]/78 transition-colors duration-300 hover:text-[#111111]"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#7b7b74]">
                  Practice
                </div>

                <p className="max-w-[28ch] text-[14px] leading-6 text-[#111111]/65">
                  Branding, motion graphics, photography, visual design, and playful digital experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-black/10 pt-5 flex flex-col gap-2 text-[11px] uppercase tracking-[0.14em] text-[#7b7b74] md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Orange Beanie</span>
            <span>Design / Motion / Photography</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}