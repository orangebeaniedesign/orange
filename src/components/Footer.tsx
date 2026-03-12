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

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer({ onNavigate }: FooterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <footer ref={ref} className="bg-[#f6f4ef] border-t border-black/10">
      <div className="px-5 md:px-8 lg:px-10 py-16 md:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-[1600px]"
        >
          <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="mb-5 text-[10px] uppercase tracking-[0.16em] text-[#111111]/42">
                Contact
              </div>

              <h2
                className="max-w-[8ch] text-[clamp(54px,9vw,140px)] font-semibold leading-[0.9] tracking-[-0.07em] text-[#111111]"
                style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
              >
                Let’s make
                <br />
                something fun.
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="mailto:orangebeaniedesign@gmail.com"
                  className="inline-flex items-center gap-2 text-[14px] text-[#111111]/85 transition-opacity duration-300 hover:opacity-60"
                >
                  orangebeaniedesign@gmail.com
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <span className="text-[13px] text-[#111111]/45">
                  Madeira-based, working worldwide.
                </span>
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <div className="space-y-10">
                <div>
                  <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[#111111]/42">
                    Elsewhere
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-3 text-[13px] text-[#111111]/75">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 transition-opacity duration-300 hover:opacity-60"
                      >
                        {social.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[#111111]/42">
                    Practice
                  </div>

                  <p className="max-w-[24ch] text-[13px] leading-6 text-[#111111]/48">
                    Branding, motion graphics, photography, visual design, and
                    playful digital experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-black/10 pt-5 flex flex-col gap-2 text-[10px] uppercase tracking-[0.14em] text-[#111111]/38 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Orange Beanie</span>
            <span>Design / Motion / Photography</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}