import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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

const staggerPatterns = [
  { cols: 'md:col-span-12', aspect: 'aspect-[16/9]' },
  { cols: 'md:col-span-7 md:col-start-1', aspect: 'aspect-[4/5]' },
  { cols: 'md:col-span-6 md:col-start-7', aspect: 'aspect-[3/4]' },
  { cols: 'md:col-span-8 md:col-start-3', aspect: 'aspect-[16/10]' },
  { cols: 'md:col-span-6 md:col-start-1', aspect: 'aspect-[3/4]' },
  { cols: 'md:col-span-7 md:col-start-6', aspect: 'aspect-[4/5]' },
];

export default function WorkPage({ onProjectClick, onContact }: WorkPageProps) {
  const [active, setActive] = useState<Filter>('all');
  const activeMapping = filters.find((f) => f.value === active)?.mapsTo;
  const { projects, loading } = useProjects(active === 'all' ? undefined : activeMapping);

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <HeroSection />
      <FilterBar active={active} onChange={setActive} />

      <section className="px-gutter pb-section-lg">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSkeleton />
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <ProjectList projects={projects} onProjectClick={onProjectClick} />
          )}
        </div>
      </section>

      <CTASection onContact={onContact} />
    </article>
  );
}

function HeroSection() {
  return (
    <section className="pt-40 md:pt-52 lg:pt-60 pb-12 md:pb-16 px-gutter">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="label-caption mb-8 md:mb-10">
            Portfolio
          </motion.p>
          <motion.h1 variants={staggerItem} className="font-serif text-hero max-w-4xl">
            Selected Work
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-body-xl text-stone-500 max-w-lg mt-8 font-light leading-relaxed"
          >
            A curated collection of projects across brand identity,
            digital experience, and visual narrative.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function FilterBar({ active, onChange }: { active: Filter; onChange: (f: Filter) => void }) {
  return (
    <section className="px-gutter pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          {filters.map((filter) => {
            const isActive = active === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onChange(filter.value)}
                className={`relative px-5 py-2.5 text-body-sm transition-colors duration-500 ${
                  isActive ? 'text-charcoal' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="workFilter"
                    className="absolute inset-x-0 bottom-0 h-[1px] bg-charcoal"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectList({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (id: string) => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects.map((p) => p.id).join(',')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-20 md:space-y-32"
      >
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            onClick={() => onProjectClick(project.id)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectRow({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const pattern = staggerPatterns[index % staggerPatterns.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slowest, ease: easing.expoOut }}
      className="grid grid-cols-1 md:grid-cols-12"
    >
      <div className={pattern.cols}>
        <button
          onClick={onClick}
          className="group relative w-full text-left overflow-hidden block"
          data-cursor="view"
        >
          <div className="overflow-hidden">
            <img
              src={project.image_url}
              alt={project.title}
              loading="lazy"
              className={`w-full ${pattern.aspect} object-cover transition-transform duration-[1.4s] ease-expo-out group-hover:scale-[1.04]`}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-expo-out" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
            <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-expo-out">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-caption uppercase tracking-widest text-cream-200/80 font-medium">
                  {project.category}
                </span>
                {project.year && (
                  <>
                    <span className="w-[3px] h-[3px] rounded-full bg-cream-200/50" />
                    <span className="text-caption uppercase tracking-widest text-cream-200/60">
                      {project.year}
                    </span>
                  </>
                )}
              </div>
              <h3 className="font-serif text-display-xl md:text-display-2xl text-cream leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          <ProjectCounter index={index} />
        </button>
      </div>
    </motion.div>
  );
}

function ProjectCounter({ index }: { index: number }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <span className="absolute top-5 right-5 md:top-8 md:right-8 text-overline text-cream-200/0 group-hover:text-cream-200/50 font-light tracking-widest transition-colors duration-700 ease-expo-out">
      {num}
    </span>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-20 md:space-y-32">
      {[0, 1, 2].map((i) => {
        const pattern = staggerPatterns[i % staggerPatterns.length];
        return (
          <div key={i} className="grid grid-cols-1 md:grid-cols-12">
            <div className={pattern.cols}>
              <div className={`${pattern.aspect} bg-stone-100 animate-pulse`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-40 text-center">
      <p className="font-serif text-display-lg text-stone-400 mb-4">No projects found</p>
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%] max-w-2xl"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-14" />

          <h2 className="font-serif text-display-2xl leading-[1.12] mb-8">
            Open to working with brands
            that value clarity and culture.
          </h2>

          <p className="text-body-lg text-stone-500 font-light leading-relaxed mb-14 max-w-md">
            Whether it's a complete rebrand or a focused digital project,
            let's create something with lasting impact.
          </p>

          <button onClick={onContact} className="btn-primary">
            Start a project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
