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
    <article className="relative overflow-hidden bg-[#f6f4ef] text-[#111111]">
      <FloatingSmiles />
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
    ["0%", prefersReducedMotion ? "0%" : "18%"]
  );

  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.72]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-36 lg:px-10"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-[1600px]"
      >
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="max-w-[8ch] text-[18vw] font-semibold leading-[0.84] tracking-[-0.08em] md:text-[118px] lg:text-[160px] xl:text-[178px]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              Orange
              <br />
              <span className="italic font-semibold">Beanie</span>
            </motion.h1>
          </div>

          <div className="col-span-12 mt-2 grid grid-cols-12 gap-y-8 md:mt-8 md:gap-x-8">
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.18, ease }}
                className="max-w-[12ch] text-[clamp(28px,5vw,56px)] font-semibold leading-[0.96] tracking-[-0.05em]"
              >
                Design
                <br />
                Photography
                <br />
                Motion
              </motion.p>
            </div>

            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.32, ease }}
                className="max-w-[28ch] text-[14px] leading-6 text-[#111111]/72"
              >
                Orange Beanie is the creative work of Claudia Brito — a
                Madeira-based designer and photographer building visual systems,
                brand worlds, and digital experiences with personality.
              </motion.p>
            </div>

            <div className="col-span-12 md:col-span-3 lg:col-span-3 lg:col-start-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.42, ease }}
              >
                <button
                  onClick={onViewWork}
                  className="inline-flex items-center gap-2 text-[13px] underline underline-offset-[0.18em] transition-opacity duration-300 hover:opacity-60"
                >
                  View work
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
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