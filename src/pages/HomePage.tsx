import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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
    <article className="relative overflow-hidden bg-[#E8DCC5] text-[#1847B7]">
      <HeroSection />
      <AboutSection />
      <SelectedWorkSection onProjectClick={onProjectClick} onViewWork={onViewWork} />
      <ContactSection />
    </article>
  );
}

function HeroSection() {
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
      className="relative min-h-[100svh] px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24 lg:px-10"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-[1600px]"
      >
        <div className="grid grid-cols-12 gap-8 items-start pt-8">
          <div className="col-span-12 md:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="text-[80px] md:text-[120px] lg:text-[160px] font-black leading-[0.9] tracking-[-0.02em]"
              style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
            >
              <span
                className="block"
                style={{
                  WebkitTextStroke: "2.5px #1847B7",
                  color: "transparent",
                }}>
                ORANGE
              </span>
              <br />
              <span className="text-[#1847B7]">BEANIE</span>
              <span className="text-lg md:text-2xl ml-1 text-[#1847B7]">®</span>
            </motion.h1>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center justify-center pt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease }}
              className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-[#FF6A00]/15 to-[#FF6A00]/5 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-[#1847B7]/30 text-sm font-medium">
                Beanie Visual
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 text-sm md:text-base font-semibold text-[#1847B7]"
        >
          ®2026
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} id="about" className="relative px-5 py-20 md:px-8 md:py-32 lg:px-10 bg-[#E8DCC5]">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Playful,
                <br />
                Sharp,
                <br />
                human.
              </h2>

              <p className="mt-8 text-xs md:text-sm leading-relaxed text-[#1847B7]/80 font-medium uppercase tracking-widest">
                Skills:
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 flex items-center gap-3"
              >
                <div className="w-6 h-6 bg-[#FF6A00] transform rotate-45"></div>
              </motion.div>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="text-sm md:text-base leading-relaxed text-[#1847B7]/80"
            >
              Orange Beanie comes from a personal moment that stuck — a strange, memorable detail that ended up feeling like the right name for a practice built on personality, instinct, and craft.
            </motion.p>
          </div>

          <div className="col-span-12 md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="aspect-square bg-gray-300 rounded-lg overflow-hidden"
            >
              <img
                src="/dscf2906.jpg"
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectedWorkSection({
  onProjectClick,
  onViewWork,
}: {
  onProjectClick?: (id: string) => void;
  onViewWork: () => void;
}) {
  const { projects } = useProjects();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    return (featured.length ? featured : projects).slice(0, 3);
  }, [projects]);

  return (
    <section ref={ref} className="px-5 py-20 md:px-8 md:py-32 lg:px-10 bg-[#E8DCC5]">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="flex items-end justify-between mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Selected work
          </h2>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={onViewWork}
            className="hidden md:flex items-center gap-2 text-xs font-bold text-[#1847B7] hover:opacity-60 transition-opacity uppercase tracking-widest"
          >
            View all
          </motion.button>
        </motion.div>

        <div className="border-t-2 border-[#1847B7]">
          {displayProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => onProjectClick?.(project.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease }}
              className="grid w-full grid-cols-[2fr_1fr_1fr] border-b-2 border-[#1847B7] py-6 text-left hover:bg-[#1847B7]/5 transition-colors gap-8"
            >
              <span className="text-2xl md:text-3xl font-bold text-[#1847B7]">
                {project.title}
              </span>

              <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-[#1847B7]/70">
                {project.category}
              </span>

              <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-[#1847B7]/70 text-right">
                {project.year ?? "Project"}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="px-5 py-20 md:px-8 md:py-32 lg:px-10 bg-[#E8DCC5]">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-8">
                Let's work
                <br />
                together?
              </h2>

              <p className="text-sm md:text-base leading-relaxed text-[#1847B7]/80 mb-8">
                Branding, motion graphics, photography, visual design, and playful digital experiences.
              </p>

              <motion.a
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                href="mailto:orangebeaniedesign@gmail.com"
                className="text-sm md:text-base font-bold text-[#1847B7] hover:opacity-60 transition-opacity underline underline-offset-2"
              >
                orangebeaniedesign@gmail.com
              </motion.a>

              <p className="mt-6 text-xs uppercase tracking-widest font-bold text-[#1847B7]/60">
                Madeira-based, working worldwide.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-12 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-[#FF6A00] transform rotate-45"></div>
              </motion.div>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <h3 className="text-3xl md:text-4xl font-black mb-12 text-[#1847B7]">Say hi!</h3>

              <form className="space-y-6">
                <div className="border-b-2 border-[#1847B7]/30 pb-3">
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#1847B7]/60 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full bg-transparent text-[#1847B7] placeholder-[#1847B7]/40 focus:outline-none text-sm"
                  />
                </div>

                <div className="border-b-2 border-[#1847B7]/30 pb-3">
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#1847B7]/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder=""
                    className="w-full bg-transparent text-[#1847B7] placeholder-[#1847B7]/40 focus:outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full bg-[#1847B7] text-white py-4 font-bold hover:bg-[#1847B7]/90 transition-colors"
                >
                  Send
                </button>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-12 flex justify-end"
              >
                <div className="w-12 h-12 bg-[#FF6A00] rounded-lg"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}