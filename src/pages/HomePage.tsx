import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '../hooks/usePortfolioData';
import { easing, duration } from '../lib/motion';

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
      <HeroSection />
      <IntroSection />
      <SelectedWork onProjectClick={onProjectClick} onViewWork={onViewWork} />
      <CloseSection onViewWork={onViewWork} onViewContact={onViewContact} />
    </article>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=1920"
          className="w-full h-full object-cover"
        >
          <source src="/home/project/public/dscf2906.jpg" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col justify-end"
      >
        <div className="px-gutter pb-16 md:pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="md:ml-[8%] lg:ml-[12%] max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: easing.expoOut }}
                className="text-caption uppercase tracking-[0.2em] text-cream/60 mb-6 md:mb-8"
              >
                Creative Studio
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.6, ease: easing.expoOut }}
                className="font-serif text-cream"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: '0.95', letterSpacing: '-0.03em' }}
              >
                Still
                <br />
                <em className="italic">Stories</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.0, ease: easing.expoOut }}
                className="text-body-lg md:text-body-xl text-cream/70 font-light leading-relaxed mt-8 md:mt-10 max-w-md"
              >
                Design that listens before it speaks.
                <br className="hidden md:block" />
                Identity, digital, and visual craft.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6, ease: easing.expoOut }}
                className="mt-10 md:mt-14"
              >
                <div className="w-8 h-[1px] bg-cream/30" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: duration.slow, ease: easing.expoOut }}
              className="label-caption"
            >
              About
            </motion.p>
          </div>

          <div className="md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slowest, ease: easing.expoOut }}
              className="font-serif text-display-2xl leading-[1.15]"
            >
              We work at the intersection of identity and atmosphere --
              crafting visual systems for brands that value restraint,
              clarity, and lasting impression.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slower, delay: 0.2, ease: easing.expoOut }}
              className="text-body-lg text-stone-500 font-light leading-relaxed mt-10 max-w-xl"
            >
              Based in Porto. Focused on branding, digital design,
              and visual storytelling for studios, cultural projects,
              and independent businesses.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectedWork({
  onProjectClick,
  onViewWork,
}: {
  onProjectClick?: (id: string) => void;
  onViewWork: () => void;
}) {
  const { projects, loading } = useProjects();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const display = featured.length > 0 ? featured : projects.slice(0, 4);

  return (
    <section ref={ref} className="pb-section-lg">
      <div className="px-gutter mb-20 md:mb-24">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slower, ease: easing.expoOut }}
          >
            <p className="label-caption mb-4">Selected Work</p>
            <h2 className="font-serif text-display-xl">Recent projects</h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: duration.slow, delay: 0.3, ease: easing.expoOut }}
            onClick={onViewWork}
            className="hidden md:flex items-center gap-3 text-body-sm text-stone-400 hover:text-charcoal transition-colors duration-500 group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </motion.button>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : display.length === 0 ? null : (
        <ProjectGrid projects={display} onProjectClick={onProjectClick} />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: duration.slow, delay: 0.4, ease: easing.expoOut }}
        className="md:hidden px-gutter mt-12"
      >
        <button
          onClick={onViewWork}
          className="flex items-center gap-3 text-body-sm text-stone-400 hover:text-charcoal transition-colors duration-500 group"
        >
          View all work
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
        </button>
      </motion.div>
    </section>
  );
}

function ProjectGrid({
  projects,
  onProjectClick,
}: {
  projects: ReturnType<typeof useProjects>['projects'];
  onProjectClick?: (id: string) => void;
}) {
  const first = projects[0];
  const middle = projects.slice(1, 3);
  const last = projects[3];

  return (
    <div className="space-y-4 md:space-y-6 px-gutter">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {first && (
          <ProjectCard
            project={first}
            index={0}
            aspectClass="aspect-[16/10] md:aspect-[2.2/1]"
            onClick={() => onProjectClick?.(first.id)}
          />
        )}

        {middle.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {middle[0] && (
              <div className="md:col-span-7">
                <ProjectCard
                  project={middle[0]}
                  index={1}
                  aspectClass="aspect-[4/3] md:aspect-[4/3]"
                  onClick={() => onProjectClick?.(middle[0].id)}
                />
              </div>
            )}
            {middle[1] && (
              <div className="md:col-span-5">
                <ProjectCard
                  project={middle[1]}
                  index={2}
                  aspectClass="aspect-[4/3] md:aspect-[4/3]"
                  onClick={() => onProjectClick?.(middle[1].id)}
                />
              </div>
            )}
          </div>
        )}

        {last && (
          <ProjectCard
            project={last}
            index={3}
            aspectClass="aspect-[16/10] md:aspect-[2.2/1]"
            onClick={() => onProjectClick?.(last.id)}
          />
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  aspectClass,
  onClick,
}: {
  project: {
    id: string;
    title: string;
    category: string;
    image_url: string;
    year?: string | number | null;
  };
  index: number;
  aspectClass: string;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: duration.slowest,
        delay: index * 0.1,
        ease: easing.expoOut,
      }}
    >
      <button
        onClick={onClick}
        className="group relative block w-full overflow-hidden"
        data-cursor="view"
      >
        <div className={aspectClass}>
          <img
            src={project.image_url}
            alt={project.title}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-expo-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-700 ease-expo-out" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600 ease-expo-out">
            <p className="text-overline uppercase tracking-[0.15em] text-cream/60 mb-2">
              {project.category}
              {project.year ? ` / ${project.year}` : ''}
            </p>
            <h3 className="font-serif text-display-lg text-cream">
              {project.title}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 px-gutter">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <div className="aspect-[2.2/1] bg-stone-100 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-7 aspect-[4/3] bg-stone-100 animate-pulse" />
          <div className="md:col-span-5 aspect-[4/3] bg-stone-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function CloseSection({
  onViewWork,
  onViewContact,
}: {
  onViewWork: () => void;
  onViewContact?: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%]"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-14" />

          <h2 className="font-serif text-display-2xl leading-[1.12] max-w-2xl mb-16">
            Good design is quiet.
            <br />
            It doesn't shout -- it speaks
            clearly, and stays.
          </h2>

          <div className="flex flex-col sm:flex-row gap-5">
            <button onClick={onViewWork} className="btn-primary">
              Explore work
              <ArrowRight className="w-4 h-4" />
            </button>
            {onViewContact && (
              <button onClick={onViewContact} className="btn-outline">
                Say hello
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
