import { motion, useInView } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import { useRef } from "react";
import type { PageType } from "../App";

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const socialLinks = [
  { label: "Instagram", icon: Instagram, url: "https://www.instagram.com/imtheorangebeanie/" },
  { label: "Behance", icon: Linkedin, url: "https://www.behance.net/claudianbrito" },
  { label: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer({ onNavigate }: FooterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <footer ref={ref} className="bg-[#1847B7]">
      <div className="px-5 md:px-8 lg:px-10 py-16 md:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-[1600px]"
        >
          <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8 text-white">
            <div className="md:col-span-7">
              <div className="mb-5 text-xs uppercase tracking-widest font-bold text-white/60">
                Get in touch
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="mailto:orangebeaniedesign@gmail.com"
                  className="text-sm md:text-base font-bold text-white hover:opacity-70 transition-opacity"
                >
                  orangebeaniedesign@gmail.com
                </a>

                <span className="text-xs md:text-sm text-white/60">
                  Madeira-based, working worldwide.
                </span>
              </div>
            </div>

            <div className="md:col-span-5 md:col-start-8 flex items-start justify-between">
              <div>
                <div className="mb-4 text-xs uppercase tracking-widest font-bold text-white/60">
                  Socials
                </div>

                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:opacity-70 transition-opacity"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-16 h-16 bg-white/10 rounded-full flex-shrink-0"
              ></motion.div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/20 pt-6 flex flex-col gap-3 text-xs md:text-sm uppercase tracking-widest font-bold text-white/60 md:flex-row md:items-center md:justify-between">
            <span>© 2026 Orange Beanie Design</span>
            <span>Design / Motion / Photography</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}