import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useProjects, Project } from "../hooks/usePortfolioData";
import { easing, duration, staggerContainer, staggerItem } from "../lib/motion";
import AutoAspectImage from "../components/AutoAspectImage";

type Filter = "all" | "identity" | "digital" | "visual";

interface WorkPageProps {
  onProjectClick: (id: string) => void;
  onContact: () => void;
}

const filters: { label: string; value: Filter; mapsTo?: string[] }[] = [
  { label: "All", value: "all" },
  { label: "Identity", value: "identity", mapsTo: ["branding"] },
  { label: "Digital", value: "digital", mapsTo: ["uiux"] },
  { label: "Visual", value: "visual", mapsTo: ["motion", "photography"] },
];

/** Só controla largura/offset (não aspect) */
const layoutWidths = [
  { wrap: "", inner: "" },
  { wrap: "md:w-[78%]", inner: "" },
  { wrap: "md:w-[86%] md:ml-auto", inner: "" },
  { wrap: "md:w-[80%] md:ml-[10%]", inner: "" },
  { wrap: "md:w-[74%]", inner: "" },
  { wrap: "md:w-[84%] md:ml-auto", inner: "" },
];

export default function WorkPage({ onProjectClick, onContact }: WorkPageProps) {
  const [active, setActive] = useState<Filter>("all");
  const activeMapping = filters.find((f) => f.value === active)?.mapsTo;
  const { projects, loading } = useProjects(active === "all" ? undefined : activeMapping);

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
    <section className="pt-44 md:pt-56 lg:pt-64 pb-12 md:pb-16 px-gutter">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p variants={staggerItem} className="label-caption mb-8 md:mb-10">
            Portfolio
          </motion.p>

          <motion.h1 variants={staggerItem} className="text-hero max-w-4xl">
            Selected work,
            <br />
            <span className="underline-weird">not a showroom.</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-body-xl text-stone-600 max-w-lg mt-10 font-light leading-relaxed"
          >
            A curated set across identity, digital, and visual experiments — built to
            feel like the work, not a template.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function FilterBar({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
}) {
  return (
    <section className="px-gutter pb-16 md:pb-22">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {filters.map((filter) => {
            const isActive = active === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onChange(filter.value)}
                className={[
                  "relative text-body-sm uppercase tracking-[0.14em]",
                  "transition-colors duration-300",
                  isActive ? "text-charcoal" : "text-stone-500 hover:text-charcoal",
                ].join(" ")}
              >
                <span className={isActive ? "underline-weird" : ""}>
                  {filter.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="workFilterDot"
                    className="inline-block ml-2 align-middle h-1.5 w-1.5 rounded-full bg-charcoal/60"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectList({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (id: string) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects.map((p) => p.id).join(",")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-18 md:space-y-26"
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
  const isInView = useInView(ref, { once: true, margin: "-90px" });
  const layout = layoutWidths[index % layoutWidths.length];
  const num = String(index + 1).padStart(2, "0");

  const category = typeof project.category === "string" ? project.category : "project";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slowest, ease: easing.expoOut }}
      className={`max-w-7xl mx-auto ${layout.wrap}`}
    >
      <button
        onClick={onClick}
        className="group w-full text-left"
        data-cursor="view"
      >
        {/* imagem automática (ratio real) */}
        <div className="relative">
          <AutoAspectImage
            src={project.image_url}
            alt={project.title}
            radius={10}
            animateIn={isInView}
            className="shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
            imgClassName="transition-transform duration-[1.1s] ease-expo-out group-hover:scale-[1.02]"
          />

          {/* overlay muito subtil (só para hover) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ borderRadius: 10 }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent"
              style={{ borderRadius: 10 }}
            />
            <div
              className="absolute inset-4 border border-cream/20"
              style={{ borderRadius: 10 }}
            />
          </div>

          {/* contador */}
          <span className="pointer-events-none absolute top-5 right-5 md:top-7 md:right-7 text-overline text-cream/0 group-hover:text-cream/70 font-light tracking-[0.18em] transition-colors duration-500">
            {num}
          </span>
        </div>

        {/* texto fora da imagem (mais editorial) */}
        <div className="mt-6 md:mt-7 flex items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-stone-500">
              <span className="text-overline uppercase tracking-[0.16em]">
                {category}
              </span>
              {project.year && (
                <>
                  <span className="h-1 w-1 rounded-full bg-stone-400/60" />
                  <span className="text-overline uppercase tracking-[0.16em]">
                    {project.year}
                  </span>
                </>
              )}
            </div>

            <h3 className="mt-3 text-display-xl leading-[1.05]">
              <span className="underline-weird">{project.title}</span>
            </h3>

            {project.description ? (
              <p className="mt-4 text-body-md text-stone-600 font-light leading-relaxed max-w-2xl">
                {project.description}
              </p>
            ) : null}
          </div>

          <div className="hidden md:flex items-center gap-2 text-body-sm uppercase tracking-[0.14em] text-stone-500 group-hover:text-charcoal transition-colors duration-300">
            View
            <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-18 md:space-y-26">
      {[0, 1, 2].map((i) => {
        const num = String(i + 1).padStart(2, "0");
        const wrap = layoutWidths[i % layoutWidths.length].wrap;

        return (
          <div key={i} className={`max-w-7xl mx-auto ${wrap}`}>
            <div
              className="bg-stone-100 animate-pulse"
              style={{ borderRadius: 10, aspectRatio: "16 / 10" }}
            />
            <div className="mt-6 space-y-3">
              <div className="h-3 w-40 bg-stone-100 animate-pulse" style={{ borderRadius: 6 }} />
              <div className="h-8 w-[70%] bg-stone-100 animate-pulse" style={{ borderRadius: 8 }} />
              <div className="h-4 w-[55%] bg-stone-100 animate-pulse" style={{ borderRadius: 6 }} />
            </div>

            <div className="sr-only">{num}</div>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-32 text-center">
      <p className="text-display-lg text-stone-600 mb-4">No projects found</p>
      <p className="text-body-md text-stone-500 font-light">
        Try a different filter or check back soon.
      </p>
    </div>
  );
}

function CTASection({ onContact }: { onContact: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%] max-w-2xl"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-16" />

          <h2 className="text-display-2xl leading-[1.12] mb-8">
            Want to build something
            <br />
            clean, bold, and a bit unexpected?
          </h2>

          <p className="text-body-lg text-stone-600 font-light leading-relaxed mb-12 max-w-md">
            I’m Madeira-based and work worldwide. If you’ve got a project that needs a
            visual world — let’s talk.
          </p>

          <button onClick={onContact} className="btn-primary">
            Get in touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}
