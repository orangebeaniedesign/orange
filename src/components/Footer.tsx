import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PageType } from '../App';
import { easing, duration } from '../lib/motion';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const navLinks: { label: string; page: PageType }[] = [
  { label: 'Work', page: 'work' },
  { label: 'Visual', page: 'visual' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

const socials = [
  { label: 'Instagram', url: 'https://instagram.com/orangebeanie' },
  { label: 'Vimeo', url: 'https://vimeo.com/orangebeanie' },
  { label: 'Behance', url: 'https://behance.net/orangebeanie' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className="block text-body-md text-stone-500 hover:text-charcoal transition-colors duration-500"
                  >
                    {link.label}
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
                    className="flex items-center gap-2 text-body-md text-stone-500 hover:text-charcoal transition-colors duration-500 group"
                  >
                    {social.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="label-caption mb-7">Say hello</p>
              <a
                href="mailto:hello@orangebeanie.design"
                className="text-body-md text-stone-500 hover:text-charcoal transition-colors duration-500"
              >
                hello@orangebeanie.design
              </a>
              <p className="text-body-sm text-stone-400 font-light mt-5">
                Porto, Portugal
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200/60">
            <span className="text-body-xs text-stone-400 font-light">
              {new Date().getFullYear()} OrangeBeanie Design
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
