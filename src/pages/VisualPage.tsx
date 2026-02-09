import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useProjects } from '../hooks/usePortfolioData';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

interface VisualPageProps {
  onProjectClick?: (id: string) => void;
  onContact?: () => void;
}

export default function VisualPage({ onProjectClick, onContact }: VisualPageProps) {
  const { projects, loading } = useProjects('photography');

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <HeroSection />

      <section className="py-section-lg">
        <div className="px-gutter mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.slower, ease: easing.expoOut }}
            >
              <p className="label-caption mb-4">Gallery</p>
              <h2 className="font-serif text-display-xl">Visual Work</h2>
            </motion.div>
          </div>
        </div>

        {loading ? (
          <div className="px-gutter">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-stone-100 animate-pulse" />
              ))}
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-body-lg text-stone-500 font-light">
              Visual work coming soon.
            </p>
          </div>
        ) : (
          <Gallery projects={projects} onProjectClick={onProjectClick} />
        )}
      </section>

      <CTASection onContact={onContact} />
    </article>
  );
}

function HeroSection() {
  return (
    <section className="pt-44 md:pt-56 lg:pt-64 pb-section px-gutter">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="label-caption mb-8">
            Visual & Audiovisual
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-hero"
          >
            Visual
            <br />
            <em className="italic">Culture</em>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-body-xl text-stone-400 max-w-xl mt-10 font-light leading-relaxed"
          >
            A dedicated space for photography, motion, and audiovisual
            experimentation. Where images move and atmospheres emerge.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery({
  projects,
  onProjectClick,
}: {
  projects: { id: string; title: string; image_url: string }[];
  onProjectClick?: (id: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="px-gutter">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => {
          const isFeature = index === 0 || index === 3;
          return (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slower,
                delay: index * 0.08,
                ease: easing.expoOut,
              }}
              onClick={() => onProjectClick?.(project.id)}
              className={`group relative overflow-hidden ${
                isFeature ? 'col-span-2 row-span-2' : ''
              }`}
              data-cursor="view"
            >
              <div className={isFeature ? 'aspect-square' : 'aspect-[4/5]'}>
                <img
                  src={project.image_url}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1s] ease-expo-out group-hover:scale-[1.04]"
                />
              </div>

              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center justify-between w-full">
                  <span className="text-body-sm text-cream font-light">
                    {project.title}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-cream" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function CTASection({ onContact }: { onContact?: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: duration.slower, ease: easing.expoOut }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="label-caption mb-6">Collaboration</p>
        <h2 className="font-serif text-display-xl mb-8">
          Interested in visual work?
        </h2>
        <p className="text-body-lg text-stone-400 max-w-xl mx-auto mb-14 font-light">
          Open to collaborations on motion, photography,
          and audiovisual projects.
        </p>
        <button onClick={onContact} className="btn-primary">
          Get in touch
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
}
