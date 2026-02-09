import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useProjects } from '../hooks/usePortfolioData';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

interface HomePageProps {
  onViewWork: () => void;
  onViewAbout?: () => void;
  onViewContact?: () => void;
  onViewVisual?: () => void;
  onProjectClick?: (id: string) => void;
}

export default function HomePage({
  onViewWork,
  onViewContact,
  onProjectClick,
}: HomePageProps) {
  return (
    <article className="bg-cream text-charcoal">
      <HeroSection onViewWork={onViewWork} />
      <FeaturedWork onProjectClick={onProjectClick} />
      <PhilosophySection />
      <ServicesSection />
      <CTASection onViewWork={onViewWork} onViewContact={onViewContact} />
    </article>
  );
}

function HeroSection({ onViewWork }: { onViewWork: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end px-gutter pb-16 md:pb-24 overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={staggerItem}
            className="label-caption mb-8 md:mb-12"
          >
            Creative Studio
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-hero mb-8 md:mb-12"
          >
            We design with
            <br />
            <em className="font-serif italic">intention</em>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-body-xl text-stone-600 max-w-xl leading-relaxed mb-12 md:mb-16 font-light"
          >
            A creative studio focused on identity, digital experience,
            and visual storytelling for brands that care.
          </motion.p>

          <motion.div variants={staggerItem} className="flex items-center gap-8">
            <button
              onClick={onViewWork}
              className="group inline-flex items-center gap-5"
            >
              <span className="text-body-md font-light">Selected work</span>
              <span className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-cream transition-all duration-500 ease-expo-out">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-4 h-4 text-stone-400 animate-bounce" />
      </motion.div>
    </section>
  );
}

function FeaturedWork({ onProjectClick }: { onProjectClick?: (id: string) => void }) {
  const { projects, loading } = useProjects();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const display = featured.length > 0 ? featured : projects.slice(0, 3);

  if (loading) {
    return (
      <section className="py-section-lg px-gutter">
        <div className="max-w-7xl mx-auto space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-[16/9] bg-stone-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (display.length === 0) return null;

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="label-caption mb-4">Selected Projects</p>
            <h2 className="font-serif text-display-xl">Recent work</h2>
          </div>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {display.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slower,
                delay: index * 0.15,
                ease: easing.expoOut,
              }}
            >
              <button
                onClick={() => onProjectClick?.(project.id)}
                className="group w-full text-left"
                data-cursor="view"
              >
                <div className="overflow-hidden mb-6">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-[1.2s] ease-expo-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <h3 className="font-serif text-display-lg group-hover:text-stone-600 transition-colors duration-500">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-body-md text-stone-500 mt-2 max-w-xl font-light">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <span className="label-caption shrink-0 mt-2">
                    {project.category}
                  </span>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
        >
          <p className="label-caption mb-8">Philosophy</p>
          <h2 className="font-serif text-display-2xl leading-snug max-w-4xl">
            Good design is quiet. It doesn't shout -- it speaks clearly,
            moves with purpose, and stays long after the trend has passed.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      title: 'Identity & Branding',
      description: 'Visual identities and systems built for longevity. Logos, typography, color, and the details that make a brand feel like itself.',
    },
    {
      title: 'Digital Experience',
      description: 'Websites and digital products designed with clarity and craft. Where form meets function, and every interaction is intentional.',
    },
    {
      title: 'Visual Storytelling',
      description: 'Photography, motion, and visual content that captures atmosphere. Stories told through light, texture, and honest observation.',
    },
  ];

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="mb-20"
        >
          <p className="label-caption mb-4">What we do</p>
          <h2 className="font-serif text-display-xl">Areas of focus</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slower,
                delay: index * 0.1,
                ease: easing.expoOut,
              }}
            >
              <span className="text-overline uppercase text-stone-400 font-medium block mb-4">
                0{index + 1}
              </span>
              <h3 className="font-serif text-display-md mb-4">{service.title}</h3>
              <p className="text-body-md text-stone-600 font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({
  onViewWork,
  onViewContact,
}: {
  onViewWork: () => void;
  onViewContact?: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
        >
          <h2 className="font-serif text-display-2xl leading-snug mb-12">
            Design for brands that care about
            what they put into the world.
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={onViewWork} className="btn-primary">
              View work
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onViewContact} className="btn-outline">
              Start a project
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
