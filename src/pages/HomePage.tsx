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
  onViewAbout?: () => void;
  onViewContact?: () => void;
  onViewVisual?: () => void;
  onProjectClick?: (id: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomePage({
  onViewWork,
  onViewAbout,
  onViewContact,
  onProjectClick,
}: HomePageProps) {
  return (
    <article className="relative overflow-hidden bg-[#f6f4ef] text-[#111111]">
      <FloatingSmiles />
      <HeroSection
        onViewAbout={onViewAbout}
        onViewWork={onViewWork}
        onViewContact={onViewContact}
      />
      <AboutSection onViewAbout={onViewAbout} />
      <WorkSection onProjectClick={onProjectClick} onViewWork={onViewWork} />
      <ContactSection onViewContact={onViewContact} />
    </article>
  );
}

function HeroSection({
  onViewAbout,
  onViewWork,
  onViewContact,
}: {
  onViewAbout?: () => void;
  onViewWork: () => void;
  onViewContact?: () => void;
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
      id="hey"
      ref={ref}
      className="relative min-h-[100svh] px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32 lg:px-10"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-[1600px]"
      >
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-[#111111]/70">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="transition-opacity duration-300 hover:opacity-60"
              >
                01/Hey
              </button>

              <div className="hidden items-center gap-6 md:flex">
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="transition-opacity duration-300 hover:opacity-60"
                >
                  02/About
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("work")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="transition-opacity duration-300 hover:opacity-60"
                >
                  03/Work
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="transition-opacity duration-300 hover:opacity-60"
                >
                  04/Contact
                </button>
              </div>
            </div>

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
                className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.16em] text-[#111111]/68"
              >
                <button
                  onClick={() => {
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    onViewAbout?.();
                  }}
                  className="text-left transition-opacity duration-300 hover:opacity-60"
                >
                  Go to about
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById("work")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    onViewWork();
                  }}
                  className="text-left transition-opacity duration-300 hover:opacity-60"
                >
                  Go to work
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    onViewContact?.();
                  }}
                  className="text-left transition-opacity duration-300 hover:opacity-60"
                >
                  Reach out
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AboutSection({ onViewAbout }: { onViewAbout?: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-5 py-10 md:px-8 md:py-16 lg:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/64">
                02/About
              </div>

              <p className="max-w-[11ch] text-[clamp(34px,4.5vw,64px)] font-semibold leading-[0.96] tracking-[-0.05em]">
                Playful,
                <br />
                sharp,
                <br />
                human.
              </p>

              <p className="mt-8 max-w-[26ch] text-[14px] leading-6 text-[#111111]/72">
                I like graphic systems with tension, motion with intention, and
                layouts that feel clean without feeling generic.
              </p>

              {onViewAbout && (
                <button
                  onClick={onViewAbout}
                  className="mt-8 inline-flex items-center gap-2 text-[13px] text-[#111111] underline underline-offset-[0.2em] transition-opacity duration-300 hover:opacity-60"
                >
                  Open full about
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              )}
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-2 lg:col-start-6">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease }}
              className="text-[13px] leading-6 text-[#111111]/70"
            >
              I work across branding, photography, web design, art direction,
              and motion. Some projects are polished and structured; some are a
              bit more experimental. The important part is that they still feel
              honest and alive.
            </motion.p>
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-3 lg:col-start-10">
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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
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
  const { projects, loading } = useProjects();

  const displayProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    return (featured.length > 0 ? featured : projects).slice(0, 7);
  }, [projects]);

  return (
    <section id="work" className="px-5 py-16 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#111111]/64">
              03/Work
            </div>
            <h2
              className="text-[clamp(32px,6vw,88px)] font-semibold leading-[0.92] tracking-[-0.06em]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              Selected work
            </h2>
          </div>

          <button
            onClick={onViewWork}
            className="hidden md:inline-flex items-center gap-2 text-[13px] text-[#111111]/72 transition-opacity duration-300 hover:opacity-60"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="border-t border-black/18">
          {loading ? (
            <WorkSkeleton />
          ) : (
            displayProjects.map((project, index) => (
              <WorkRow
                key={project.id}
                index={index}
                title={project.title}
                middle={project.category}
                right={String(project.year ?? "Project")}
                onClick={() => onProjectClick?.(project.id)}
              />
            ))
          )}
        </div>

        <div className="mt-8 md:hidden">
          <button
            onClick={onViewWork}
            className="inline-flex items-center gap-2 text-[13px] text-[#111111]/72 transition-opacity duration-300 hover:opacity-60"
          >
            View all work
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function WorkRow({
  title,
  middle,
  right,
  onClick,
  index,
}: {
  title: string;
  middle: string;
  right: string;
  onClick?: () => void;
  index: number;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease }}
      onClick={onClick}
      className="group grid w-full grid-cols-1 gap-y-3 border-b border-black/18 py-6 text-left transition-colors duration-300 hover:bg-black/[0.02] md:grid-cols-[1.5fr_1fr_0.8fr] md:items-center md:gap-x-6 md:py-7"
    >
      <div className="text-[clamp(28px,3.8vw,54px)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#111111]">
        {title}
      </div>

      <div className="text-[12px] uppercase tracking-[0.12em] text-[#111111]/62 md:text-[11px]">
        {middle}
      </div>

      <div className="flex items-center justify-between gap-4 text-[12px] uppercase tracking-[0.12em] text-[#111111]/62 md:justify-end md:text-[11px]">
        <span>{right}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
      </div>
    </motion.button>
  );
}

function WorkSkeleton() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-y-3 border-b border-black/18 py-6 md:grid-cols-[1.5fr_1fr_0.8fr] md:items-center md:gap-x-6 md:py-7"
        >
          <div className="h-10 w-[44%] animate-pulse bg-black/6 md:h-12" />
          <div className="h-3 w-[65%] animate-pulse bg-black/6" />
          <div className="h-3 w-[40%] animate-pulse bg-black/6 md:ml-auto" />
        </div>
      ))}
    </div>
  );
}

function ContactSection({
  onViewContact,
}: {
  onViewContact?: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
        >
          <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/64">
            04/Contact
          </div>

          <h2
            className="max-w-[7.5ch] text-[18vw] font-semibold leading-[0.84] tracking-[-0.08em] md:text-[110px] lg:text-[150px]"
            style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
          >
            Want to
            <br />
            reach out?
          </h2>

          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
            <a
              href="mailto:orangebeaniedesign@gmail.com"
              className="inline-flex items-center gap-2 text-[clamp(24px,3vw,48px)] font-semibold tracking-[-0.04em] underline underline-offset-[0.15em] transition-opacity duration-300 hover:opacity-60"
            >
              orangebeaniedesign@gmail.com
              <ArrowUpRight className="h-5 w-5" />
            </a>

            <div className="flex flex-wrap gap-x-10 gap-y-4 text-[12px] uppercase tracking-[0.14em] text-[#111111]/68">
              <a
                href="https://www.instagram.com/imtheorangebeanie/"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-300 hover:opacity-60"
              >
                Instagram
              </a>
              <a
                href="https://www.behance.net/claudianbrito"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-300 hover:opacity-60"
              >
                Behance
              </a>
              <button
                onClick={onViewContact}
                className="transition-opacity duration-300 hover:opacity-60"
              >
                Contact page
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingSmiles() {
  const prefersReducedMotion = useReducedMotion();

  const items = [
    {
      size: 330,
      left: "-4%",
      top: "4%",
      rotate: -12,
      duration: 12,
      colors:
        "from-[#66b84d]/80 via-[#f0efe8]/70 to-[#d7cfc1]/85",
      inner: "from-white/70 to-white/15",
    },
    {
      size: 260,
      left: "36%",
      top: "6%",
      rotate: 10,
      duration: 11,
      colors:
        "from-[#5a66ff]/85 via-[#ff39cf]/85 to-[#ff68b6]/85",
      inner: "from-white/40 to-white/10",
    },
    {
      size: 300,
      left: "68%",
      top: "7%",
      rotate: 16,
      duration: 13,
      colors:
        "from-[#f4ecff]/88 via-[#dbcfe2]/78 to-[#efe8f3]/88",
      inner: "from-white/50 to-white/10",
    },
    {
      size: 270,
      left: "30%",
      top: "78%",
      rotate: -16,
      duration: 10,
      colors:
        "from-[#ff4329]/82 via-[#f7a327]/80 to-[#ff55c8]/78",
      inner: "from-white/38 to-white/12",
    },
    {
      size: 220,
      left: "95%",
      top: "6%",
      rotate: 12,
      duration: 10,
      colors:
        "from-[#7a5110]/88 via-[#d99e25]/82 to-[#8b5f13]/84",
      inner: "from-white/35 to-white/10",
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: 1,
            y: prefersReducedMotion ? 0 : [0, -10, 0],
            rotate: prefersReducedMotion
              ? item.rotate
              : [item.rotate, item.rotate + 4, item.rotate],
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.2 + i * 0.08, ease },
            y: {
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: item.duration + 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute"
          style={{
            width: item.size,
            height: item.size,
            left: item.left,
            top: item.top,
            filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.10))",
          }}
        >
          <div
            className={`relative h-full w-full rounded-full bg-gradient-to-br ${item.colors} opacity-95`}
            style={{
              boxShadow:
                "inset 0 0 0 8px rgba(255,255,255,0.22), inset 0 0 18px rgba(255,255,255,0.16)",
            }}
          >
            <div
              className={`absolute inset-[10%] rounded-full bg-gradient-to-br ${item.inner}`}
              style={{
                boxShadow:
                  "inset 0 0 0 2px rgba(255,255,255,0.25), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            />

            <div className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-transparent" />

            <div className="absolute left-[28%] top-[34%] h-[7%] w-[7%] rounded-full bg-white/80 blur-[0.2px]" />
            <div className="absolute right-[28%] top-[34%] h-[7%] w-[7%] rounded-full bg-white/80 blur-[0.2px]" />

            <div
              className="absolute left-1/2 top-[56%] h-[20%] w-[36%] -translate-x-1/2 rounded-b-[999px] border-b-[9px] border-white/78"
              style={{
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
              }}
            />

            <div className="absolute inset-[7%] rounded-full bg-white/[0.04] blur-md" />
          </div>
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_22%),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.09),transparent_18%)]" />
    </div>
  );
}