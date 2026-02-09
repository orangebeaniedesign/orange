import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useProjects, Project } from '../hooks/usePortfolioData';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

type Pillar = 'all' | 'identity' | 'digital' | 'visual';

interface WorkPageProps {
  onBack?: () => void;
  onProjectClick: (id: string) => void;
  onAbout?: () => void;
  onContact: () => void;
}

const filters: { label: string; value: Pillar; mapsTo?: string[] }[] = [
  { label: 'All Work', value: 'all' },
  { label: 'Identity', value: 'identity', mapsTo: ['branding'] },
  { label: 'Digital', value: 'digital', mapsTo: ['uiux'] },
  { label: 'Visual', value: 'visual', mapsTo: ['motion', 'photography'] },
];

export default function WorkPage({ onProjectClick, onContact }: WorkPageProps) {
  const [active, setActive] = useState<Pillar>('all');
  const activeMapping = filters.find((f) => f.value === active)?.mapsTo;
  const { projects, loading } = useProjects(active === 'all' ? undefined : activeMapping);

  return (
    <div className="min-h-screen bg-offwhite">
      <HeroSection />
      <FilterBar active={active} onFilter={setActive} />

      <section className="pb-section-lg px-gutter">
        <div className="max-w-[1400px] mx-auto">
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
    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-offwhite/60 via-offwhite/40 to-offwhite" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-end px-gutter pb-20"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-offblack" />
            <span className="text-caption uppercase tracking-widest text-neutral-600">
              Selected Work
            </span>
          </motion.div>

          <motion.h1 variants={staggerItem} className="text-hero mb-6">
            Projects that
            <br />
            <span className="text-neutral-400">shape culture.</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-body-xl text-neutral-500 max-w-xl leading-relaxed"
          >
            A curated collection across brand identity, digital design, and visual storytelling.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FilterBar({ active, onFilter }: { active: Pillar; onFilter: (v: Pillar) => void }) {
  return (
    <section className="sticky top-[72px] z-30 bg-offwhite/90 backdrop-blur-md border-b border-neutral-200/60">
      <div className="px-gutter">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 py-5 overflow-x-auto">
          {filters.map((filter) => {
            const isActive = active === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onFilter(filter.value)}
                className={`relative px-6 py-2.5 text-body-sm font-medium whitespace-nowrap transition-colors duration-300 rounded-full ${
                  isActive
                    ? 'text-offwhite'
                    : 'text-neutral-500 hover:text-offblack'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-offblack rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}

          <div className="ml-auto hidden md:block">
            <span className="text-caption text-neutral-400">
              Showing {active === 'all' ? 'all projects' : filters.find(f => f.value === active)?.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectGrid({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (id: string) => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects.map(p => p.id).join(',')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-12"
      >
        {projects.map((project, index) => {
          const isFeatured = project.featured || index === 0;
          if (isFeatured) {
            return (
              <FeaturedCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => onProjectClick(project.id)}
              />
            );
          }
          return null;
        })}

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {projects.map((project, index) => {
            const isFeatured = project.featured || index === 0;
            if (isFeatured) return null;
            return (
              <StandardCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => onProjectClick(project.id)}
              />
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function FeaturedCard({
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slower, delay: index * 0.1, ease: easing.expoOut }}
      className="mb-6"
    >
      <button onClick={onClick} className="group w-full text-left">
        <div className="relative overflow-hidden rounded-lg aspect-[16/8] md:aspect-[16/7]">
          <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-expo-out group-hover:scale-105"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-offblack/70 via-offblack/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-body-xs text-white/90 font-medium uppercase tracking-wider">
                {project.category}
              </span>
              {project.year && (
                <span className="text-caption text-white/60">{project.year}</span>
              )}
            </div>

            <div>
              <h2 className="text-display-2xl text-white mb-3 transition-transform duration-500 group-hover:translate-x-2">
                {project.title}
              </h2>
              {project.description && (
                <p className="text-body-md text-white/70 max-w-lg mb-6 leading-relaxed">
                  {project.description}
                </p>
              )}
              <div className="inline-flex items-center gap-3 text-body-sm text-white/80 group-hover:text-white transition-colors">
                <span>Explore project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function StandardCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slower, delay: (index % 2) * 0.12, ease: easing.expoOut }}
    >
      <button onClick={onClick} className="group w-full text-left">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-[1s] ease-expo-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-offblack/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-body-xs text-white/70 uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="text-display-sm text-white">{project.title}</h3>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/80" />
            </div>
          </div>
        </div>

        <div className="pt-5 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-caption uppercase tracking-widest text-neutral-400">
              {project.category}
            </span>
            {project.year && (
              <>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="text-caption text-neutral-400">{project.year}</span>
              </>
            )}
          </div>
          <h3 className="text-display-md text-offblack group-hover:text-neutral-500 transition-colors duration-300">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-body-sm text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>
      </button>
    </motion.article>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 pt-12">
      <div className="aspect-[16/7] rounded-lg bg-neutral-200 animate-pulse" />
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[4/3] rounded-lg bg-neutral-200 animate-pulse" />
            <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
            <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-32 text-center">
      <p className="text-display-md text-neutral-400 mb-4">No projects found</p>
      <p className="text-body-md text-neutral-500">
        Try a different filter or check back soon.
      </p>
    </div>
  );
}

function CTASection({ onContact }: { onContact: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-offblack/80" />
      </div>

      <div ref={ref} className="relative z-10 py-section-lg px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-8">
            Collaboration
          </span>
          <h2 className="text-display-2xl text-white leading-snug mb-8">
            Open to working with brands
            <br className="hidden md:block" />
            that value clarity and culture.
          </h2>
          <p className="text-body-lg text-neutral-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Whether it's a complete rebrand or a focused digital project,
            let's create something with lasting impact.
          </p>

          <button
            onClick={onContact}
            className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-offblack text-body-sm font-medium tracking-wide transition-all duration-300 hover:bg-neutral-100 active:scale-[0.98] rounded-full"
          >
            Start a project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
