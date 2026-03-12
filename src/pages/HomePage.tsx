import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useProjects } from "../hooks/usePortfolioData";

interface HomePageProps {
  onViewWork: () => void;
  onProjectClick?: (id: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomePage({
  onViewWork,
  onProjectClick,
}: HomePageProps) {
  return (
    <article className="relative overflow-hidden bg-white text-[#111111]">
      <HeroSection onViewWork={onViewWork} />
      <AboutSection />
      <WorkSection onProjectClick={onProjectClick} onViewWork={onViewWork} />
    </article>
  );
}

function HeroSection({
  onViewWork,
}: {
  onViewWork: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", prefersReducedMotion ? "0%" : "12%"]
  );

  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.7]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-[#e9e5de] px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24 lg:px-10 overflow-hidden"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-[1600px] h-full flex flex-col justify-between"
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-24 md:mb-32 lg:mb-40 h-64 md:h-80 lg:h-96 bg-black/5 rounded-lg"></div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(80px,12vw,240px)] font-black leading-[0.9] tracking-[-0.04em] text-black"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              Orange
              <br />
              Beanie
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 text-[11px] font-light tracking-widest text-black/60"
        >
          ©2026
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative px-5 py-10 md:px-8 md:py-16 lg:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <p className="max-w-[11ch] text-[clamp(34px,4.5vw,64px)] font-semibold leading-[0.96] tracking-[-0.05em]">
                Playful,
                <br />
                sharp,
                <br />
                human.
              </p>

              <p className="mt-8 max-w-[26ch] text-[14px] leading-6 text-[#111111]/72">
                I work across branding, photography, web design, art direction,
                and motion. I like graphic systems with tension and layouts that
                feel clean without feeling generic.
              </p>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-6">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease }}
              className="text-[13px] leading-6 text-[#111111]/70"
            >
              Orange Beanie comes from a personal moment that stuck — a strange,
              memorable detail that ended up feeling like the right name for a
              practice built on personality, instinct, and craft.
            </motion.p>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.14, ease }}
              className="relative overflow-hidden bg-[#d9d6cf]"
            >
              <img
                src="/dscf2906.jpg"
                alt="Orange Beanie portrait"
                className="aspect-[0.92/1] w-full object-cover grayscale"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection({
  onProjectClick,
  onViewWork,
}: {
  onProjectClick?: (id: string) => void;
  onViewWork: () => void;
}) {
  const { projects } = useProjects();

  const displayProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    return (featured.length ? featured : projects).slice(0, 5);
  }, [projects]);

  return (
    <section className="px-5 py-16 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between">
          <h2
            className="text-[clamp(32px,6vw,88px)] font-semibold tracking-[-0.06em]"
            style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
          >
            Selected work
          </h2>

          <button
            onClick={onViewWork}
            className="hidden md:inline-flex items-center gap-2 text-[13px] hover:opacity-60"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="border-t border-black/20">
          {displayProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectClick?.(project.id)}
              className="grid w-full grid-cols-[1.6fr_1fr_0.7fr] border-b border-black/20 py-6 text-left hover:bg-black/[0.02]"
            >
              <span className="text-[32px] font-semibold tracking-[-0.04em]">
                {project.title}
              </span>

              <span className="text-[11px] uppercase tracking-[0.14em] text-[#111111]/60">
                {project.category}
              </span>

              <span className="text-right text-[11px] uppercase tracking-[0.14em] text-[#111111]/60">
                {project.year ?? "Project"} ↗
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingSmiles() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-20">
      {/* decorative background removed for brevity */}
    </div>
  );
}