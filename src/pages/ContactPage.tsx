import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

const EMAIL = 'hello@orangebeanie.design';
const LOCATION = 'Porto, Portugal';

const socials = [
  { label: 'Instagram', url: 'https://instagram.com/orangebeanie' },
  { label: 'Vimeo', url: 'https://vimeo.com/orangebeanie' },
  { label: 'Behance', url: 'https://behance.net/orangebeanie' },
];

export default function ContactPage() {
  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <HeroSection />
      <EmailBlock />
      <SocialsBlock />
      <ClosingBlock />
    </article>
  );
}

function HeroSection() {
  return (
    <section className="pt-40 md:pt-52 lg:pt-60 pb-section px-gutter">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="label-caption mb-8">
            Say hello
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-hero max-w-4xl"
          >
            I'd love to
            <br />
            hear from you
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-body-xl md:text-display-md text-stone-500 max-w-xl mt-10 md:mt-14 font-light leading-relaxed"
          >
            Whether it's a new project, a creative collaboration,
            or just a friendly hello — my inbox is always open.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function EmailBlock() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section ref={ref} className="px-gutter pb-section">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="border-t border-stone-200 pt-12 md:pt-16"
        >
          <p className="label-caption mb-8">Write to me</p>

          <a
            href={`mailto:${EMAIL}`}
            className="group block"
          >
            <span className="font-serif text-display-xl md:text-display-2xl text-charcoal group-hover:text-stone-600 transition-colors duration-500 break-all">
              {EMAIL}
            </span>
          </a>

          <button
            onClick={handleCopy}
            className="mt-6 inline-flex items-center gap-2.5 text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-300"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy email address
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function SocialsBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-gutter pb-section">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="border-t border-stone-200 pt-12 md:pt-16"
        >
          <p className="label-caption mb-10">Elsewhere</p>

          <div className="space-y-0">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 border-b border-stone-200 first:border-t-0 transition-colors duration-300 hover:border-stone-400"
              >
                <span className="font-serif text-display-md md:text-display-lg text-charcoal group-hover:text-stone-600 transition-colors duration-500">
                  {social.label}
                </span>
                <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-charcoal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ClosingBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-gutter pb-section-lg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="border-t border-stone-200 pt-12 md:pt-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="label-caption mb-4">Based in</p>
              <p className="font-serif text-display-md text-charcoal">
                {LOCATION}
              </p>
              <p className="text-body-md text-stone-500 font-light mt-3">
                Available for remote work worldwide
              </p>
            </div>

            <div className="text-right">
              <p className="label-caption mb-4">Availability</p>
              <p className="text-body-md text-stone-700 font-light">
                Currently accepting projects
              </p>
              <p className="text-body-sm text-stone-500 mt-1">
                Typical response within 48 hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
