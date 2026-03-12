import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project, useProjects } from "../hooks/usePortfolioData";

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

const ease = [0.22, 1, 0.36, 1] as const;

export default function WorkPage({ onProjectClick, onContact }: WorkPageProps) {
  const [active, setActive] = useState<Filter>("all");
  const activeMapping = filters.find((f) => f.value === active)?.mapsTo;
  const { projects, loading } = useProjects(active === "all" ? undefined : activeMapping);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const ay = Number(a.year ?? 0);
      const by = Number(b.year ?? 0);
      return by - ay;
    });
  }, [projects]);

  return (
    <article className="min-h-screen bg-[#f6f4ef] text-[#111111]">
      <HeroSection />
      <FilterBar active={active} onChange={setActive} />

      <section className="px-5 pb-16 md:px-8 md:pb-24 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-[1600px]">
          {loading ? (
            <WorkSkeleton />
          ) : sortedProjects.length === 0 ? (
            <EmptyState />
          ) : (
            <ProjectIndex projects={sortedProjects} onProjectClick={onProjectClick} />
          )}
        </div>
      </section>

      <CTASection onContact={onContact} />
    </article>
  );
}

function HeroSection() {
  return (
    <section className="px-5 pb-10 pt-32 md:px-8 md:pb-14 md:pt-40 lg:px-10 lg:pb-16 lg:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="grid grid-cols-12 gap-y-8 md:gap-x-8"
        >
          <div className="col-span-12">
            <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/64">
              03/Work
            </div>

            <h1
              className="max-w-[8.5ch] text-[18vw] font-semibold leading-[0.84] tracking-[-0.08em] md:text-[110px] lg:text-[150px]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              Selected
              <br />
              work.
            </h1>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-7 lg:col-span-3 lg:col-start-9">
            <p className="text-[14px] leading-6 text-[#111111]/72">
              A tighter list of projects across identity, digital design,
              photography, motion, and visual experiments. Less showroom,
              more index.
            </p>
          </div>
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
    <section className="px-5 pb-10 md:px-8 md:pb-12 lg:px-10 lg:pb-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-black/12 pb-5">
          {filters.map((filter) => {
            const isActive = active === filter.value;

            return (
              <button
                key={filter.value}
                onClick={() => onChange(filter.value)}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-60"
                style={{ opacity: isActive ? 1 : 0.58 }}
              >
                <span>{filter.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="work-filter-dot"
                    className="h-1.5 w-1.5 rounded-full bg-[#111111]/70"
                    transition={{ type: "spring", stiffness: 440, damping: 32 }}
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

function ProjectIndex({
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
        transition={{ duration: 0.3 }}
        className="border-t border-black/18"
      >
        {projects.map((project, index) => (
          <ProjectLine
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

function ProjectLine({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const category =
    typeof project.category === "string" && project.category.trim().length > 0
      ? project.category
      : "project";

  const year =
    project.year !== null && project.year !== undefined && String(project.year).trim() !== ""
      ? String(project.year)
      : "—";

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay: index * 0.04, ease }}
      onClick={onClick}
      className="group grid w-full grid-cols-1 gap-y-4 border-b border-black/18 py-6 text-left transition-colors duration-300 hover:bg-black/[0.02] md:grid-cols-[80px_minmax(0,1.4fr)_minmax(0,0.8fr)_110px] md:items-start md:gap-x-6 md:py-8"
      data-cursor="view"
    >
      <div className="text-[11px] uppercase tracking-[0.16em] text-[#111111]/44">
        {String(index + 1).padStart(2, "0")}/
      </div>

      <div>
        <h2 className="text-[clamp(30px,4.6vw,68px)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#111111]">
          {project.title}
        </h2>

        {project.description ? (
          <p className="mt-3 max-w-[46ch] text-[14px] leading-6 text-[#111111]/66">
            {project.description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1 pt-1 text-[11px] uppercase tracking-[0.14em] text-[#111111]/58 md:pt-2">
        <span>{category}</span>
        <span>{project.featured ? "Featured" : "Selected"}</span>
      </div>

      <div className="flex items-center justify-between gap-4 pt-1 text-[11px] uppercase tracking-[0.14em] text-[#111111]/58 md:justify-end md:pt-2">
        <span>{year}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
      </div>
    </motion.button>
  );
}

function WorkSkeleton() {
  return (
    <div className="border-t border-black/18">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-y-4 border-b border-black/18 py-6 md:grid-cols-[80px_minmax(0,1.4fr)_minmax(0,0.8fr)_110px] md:items-start md:gap-x-6 md:py-8"
        >
          <div className="h-3 w-8 animate-pulse bg-black/6" />
          <div>
            <div className="h-10 w-[60%] animate-pulse bg-black/6 md:h-12" />
            <div className="mt-3 h-4 w-[70%] animate-pulse bg-black/6" />
          </div>
          <div className="h-3 w-[70%] animate-pulse bg-black/6 md:mt-2" />
          <div className="h-3 w-12 animate-pulse bg-black/6 md:ml-auto md:mt-2" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-24 text-left md:py-32">
      <div className="text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
        03/Work
      </div>
      <h2 className="mt-4 text-[clamp(32px,5vw,72px)] font-semibold leading-[0.94] tracking-[-0.06em]">
        No projects here yet.
      </h2>
      <p className="mt-4 max-w-[32ch] text-[14px] leading-6 text-[#111111]/66">
        Try another filter, or add a few projects to start building the index.
      </p>
    </div>
  );
}

function CTASection({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="border-t border-black/12 px-5 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="grid grid-cols-12 gap-y-8 md:gap-x-8"
        >
          <div className="col-span-12 md:col-span-8">
            <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/64">
              Next
            </div>

            <h2
              className="max-w-[10ch] text-[clamp(36px,7vw,110px)] font-semibold leading-[0.9] tracking-[-0.07em]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              Want to build
              <br />
              something fun?
            </h2>
          </div>

          <div className="col-span-12 md:col-span-4 md:pt-3">
            <p className="max-w-[28ch] text-[14px] leading-6 text-[#111111]/68">
              If you’ve got a brand, digital product, campaign, or visual idea
              that needs shape and personality, let’s talk.
            </p>

            <button
              onClick={onContact}
              className="mt-8 inline-flex items-center gap-2 text-[13px] underline underline-offset-[0.18em] transition-opacity duration-300 hover:opacity-60"
            >
              Back to landing
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}