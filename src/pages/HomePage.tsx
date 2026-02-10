import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useProjects } from "../hooks/usePortfolioData";
import { easing, duration } from "../lib/motion";

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
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="/dscf2906.jpg"
          alt="Hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-charcoal/10 to-transparent" />
      </motion.div>

      {/* ✅ safe area para header + título (resolve o “cortado”) */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-end"
      >
        <div className="px-gutter pb-14 md:pb-20 lg:pb-24 pt-28 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="md:ml-[8%] lg:ml-[12%] max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: easing.expoOut }}
                className="text-caption uppercase tracking-[0.22em] text-cream/75 mb-6 md:mb-7"
              >
                Design / Photography / Visual Worlds
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.25, delay: 0.5, ease: easing.expoOut }}
                className="text-cream drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                style={{
                  fontSize: "clamp(2.6rem, 7.4vw, 7.1rem)",
                  lineHeight: "0.98",
                  letterSpacing: "-0.04em",
                }}
              >
                I make things
                <br />
                <span className="underline-weird">look</span> like you.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05, delay: 0.9, ease: easing.expoOut }}
                className="text-body-lg md:text-body-xl text-cream/80 font-light leading-relaxed mt-7 md:mt-8 max-w-md"
              >
                Design, photography and visual worlds for brands — plus the odd
                experimental project in between.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.25, ease: easing.expoOut }}
                className="mt-8 md:mt-10 flex items-center gap-4"
              >
                <div className="w-10 h-[1px] bg-cream/35" />
                <span className="text-overline uppercase tracking-[0.18em] text-cream/60">
                  Madeira-based, working worldwide.
                </span>
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
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: duration.slow, ease: easing.expoOut }}
              className="label-caption"
            >
              What I do
            </motion.p>
          </div>

          <div className="md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slowest, ease: easing.expoOut }}
              className="text-display-2xl leading-[1.12]"
            >
              I build brand identities, design digital stuff, and shoot images —
              sometimes clean, sometimes a bit strange (in a good way).
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slower,
                delay: 0.15,
                ease: easing.expoOut,
              }}
              className="text-body-lg text-stone-500 font-light leading-relaxed mt-10 max-w-xl"
            >
              Agency-trained, studio-tested, still curious. Focused on brands,
              and always up for alternative collaborations and cultural projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: duration.slow,
                delay: 0.25,
                ease: easing.expoOut,
              }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {["Branding", "Design Systems", "Web", "Photography", "Art Direction"].map(
                (t) => (
                  <span
                    key={t}
                    className="text-overline uppercase tracking-[0.14em] px-3 py-1 border border-charcoal/10 text-charcoal/70"
                    style={{ borderRadius: 8 }}
                  >
                    {t}
                  </span>
                )
              )}
            </motion.div>
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const display = featured.length > 0 ? featured : projects.slice(0, 4);

  return (
    <section ref={ref} className="pb-section-lg">
      <div className="px-gutter mb-20 md:mb-24">
        <div className="mx-auto max-w-7xl flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slower, ease: easing.expoOut }}
          >
            <p className="label-caption mb-4">Selected work</p>
            <h2 className="text-display-xl">Recent projects</h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: duration.slow,
              delay: 0.25,
              ease: easing.expoOut,
            }}
            onClick={onViewWork}
            className="hidden md:flex items-center gap-3 text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-500 group"
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
        transition={{
          duration: duration.slow,
          delay: 0.35,
          ease: easing.expoOut,
        }}
        className="md:hidden px-gutter mt-12"
      >
        <button
          onClick={onViewWork}
          className="flex items-center gap-3 text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-500 group"
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
  projects: ReturnType<typeof useProjects>["projects"];
  onProjectClick?: (id: string) => void;
}) {
  const first = projects[0];
  const middle = projects.slice(1, 3);
  const last = projects[3];

  return (
    <div className="space-y-4 md:space-y-6 px-gutter">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-6">
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: duration.slowest,
        delay: index * 0.08,
        ease: easing.expoOut,
      }}
    >
      <button onClick={onClick} className="group relative block w-full overflow-hidden" data-cursor="view">
        <div className={aspectClass}>
          <img
            src={project.image_url}
            alt={project.title}
            loading={index === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-expo-out group-hover:scale-[1.035]"
          />
        </div>

        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/35 transition-all duration-700 ease-expo-out" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600 ease-expo-out">
            <p className="text-overline uppercase tracking-[0.15em] text-cream/65 mb-2">
              {project.category}
              {project.year ? ` / ${project.year}` : ""}
            </p>
            <h3 className="text-display-lg text-cream">{project.title}</h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 px-gutter">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-6">
        <div className="aspect-[2.2/1] bg-stone-100 animate-pulse" style={{ borderRadius: 10 }} />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-7 aspect-[4/3] bg-stone-100 animate-pulse" style={{ borderRadius: 10 }} />
          <div className="md:col-span-5 aspect-[4/3] bg-stone-100 animate-pulse" style={{ borderRadius: 10 }} />
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%]"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-14" />

          <h2 className="text-display-2xl leading-[1.12] max-w-2xl mb-8">
            Got a thing to build?
            <br />
            Let’s make it feel alive.
          </h2>

          <p className="text-body-lg text-stone-500 font-light leading-relaxed max-w-xl mb-12">
            I’m best with brands that want something clean, bold, and a little
            unexpected — without turning into noise.
          </p>

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

          <div className="mt-10">
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-500 underline-weird"
              download
            >
              Download CV
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
