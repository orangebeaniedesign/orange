import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useProjects, Project } from '../hooks/usePortfolioData';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

type Filter = 'all' | 'identity' | 'digital' | 'visual';

interface WorkPageProps {
  onProjectClick: (id: string) => void;
  onContact: () => void;
}

const filters: { label: string; value: Filter; mapsTo?: string[] }[] = [
  { label: 'All', value: 'all' },
  { label: 'Identity', value: 'identity', mapsTo: ['branding'] },
  { label: 'Digital', value: 'digital', mapsTo: ['uiux'] },
  { label: 'Visual', value: 'visual', mapsTo: ['motion', 'photography'] },
];

export default function WorkPage({ onProjectClick, onContact }: WorkPageProps) {
  const [active, setActive] = useState<Filter>('all');
  const activeMapping = filters.find((f) => f.value === active)?.mapsTo;
  const { projects, loading } = useProjects(active === 'all' ? undefined : activeMapping);

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <HeroSection />

      <section className="px-gutter pb-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          {filters.map((filter) => {
            const isActive = active === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActive(filter.value)}
                className={`relative px-5 py-2 text-body-sm transition-colors duration-300 ${
                  isActive ? 'text-charcoal' : 'text-stone-400 hover:text-charcoal'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="workFilter"
                    className="absolute inset-0 border-b border-charcoal"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-gutter pb-section-lg">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSkeleton />
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <ProjectGrid projects={projects} onProjectClick={onProjectClick} />
          )}
        </div>
      </section>

      <CTASection onContact={onContact} />
    </article>
  );
}

function HeroSection() {
  return (
    <section className="pt-40 md:pt-48 pb-16 md:pb-20 px-gutter">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="label-caption mb-6">
            Portfolio
          </motion.p>
          <motion.h1 variants={staggerItem} className="font-serif text-hero">
            Selected Work
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-body-xl text-stone-500 max-w-xl mt-6 font-light"
          >
            A curated collection across brand identity, digital design,
            and visual storytelling.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectGrid({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (id: string) => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects.map((p) => p.id).join(',')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 pt-12"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isLarge={index === 0}
            onClick={() => onProjectClick(project.id)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({
  project,
  index,
  isLarge,
  onClick,
}: {
  project: Project;
  index: number;
  isLarge: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: duration.slower,
        delay: (index % 2) * 0.1,
        ease: easing.expoOut,
      }}
      className={isLarge ? 'md:col-span-2' : ''}
    >
      <button
        onClick={onClick}
        className="group w-full text-left"
        data-cursor="view"
      >
        <div className="overflow-hidden">
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className={`w-full object-cover transition-transform duration-[1.2s] ease-expo-out group-hover:scale-[1.03] ${
              isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'
            }`}
          />
        </div>

        <div className="flex items-start justify-between gap-6 mt-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="label-caption">{project.category}</span>
              {project.year && (
                <>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span className="text-caption text-stone-400">{project.year}</span>
                </>
              )}
            </div>
            <h3 className="font-serif text-display-md group-hover:text-stone-600 transition-colors duration-500">
              {project.title}
            </h3>
          </div>

          <ArrowUpRight className="w-5 h-5 text-stone-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </button>
    </motion.article>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 pt-12">
      <div className="md:col-span-2 space-y-4">
        <div className="aspect-[16/9] bg-stone-100 animate-pulse" />
        <div className="h-4 w-24 bg-stone-100 animate-pulse" />
        <div className="h-6 w-48 bg-stone-100 animate-pulse" />
      </div>
      {[1, 2].map((i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-[4/3] bg-stone-100 animate-pulse" />
          <div className="h-4 w-24 bg-stone-100 animate-pulse" />
          <div className="h-6 w-48 bg-stone-100 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-32 text-center">
      <p className="font-serif text-display-md text-stone-400 mb-3">No projects found</p>
      <p className="text-body-md text-stone-500 font-light">
        Try a different filter or check back soon.
      </p>
    </div>
  );
}

function CTASection({ onContact }: { onContact: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: duration.slower, ease: easing.expoOut }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="label-caption mb-6">Collaboration</p>
        <h2 className="font-serif text-display-2xl leading-snug mb-8">
          Open to working with brands that
          value clarity and culture.
        </h2>
        <p className="text-body-lg text-stone-500 max-w-xl mx-auto mb-12 font-light">
          Whether it's a complete rebrand or a focused digital project,
          let's create something with lasting impact.
        </p>
        <button onClick={onContact} className="btn-primary">
          Start a project
        </button>
      </motion.div>
    </section>
  );
}
