import React, { useMemo, useState } from "react";
import { useProjects, Project } from "../hooks/usePortfolioData";

type Props = {
  projectId?: string;
  onBack: () => void;
  onProjectClick: (id: string) => void;
  onAbout?: () => void;
  onContact?: () => void;
};

const filters = [
  { label: "All", value: "all" },
  { label: "Branding", value: "branding" },
  { label: "Web", value: "web" },
  { label: "Photography", value: "photography" },
];

export default function WorkPage({ onBack, onProjectClick, onAbout, onContact }: Props) {
  const [active, setActive] = useState<string>("all");

  // Map filter to either a string or string[] for useProjects
  const activeMapping = useMemo<string | string[] | undefined>(() => {
    if (active === "all") return undefined;
    if (active === "photography") return ["photography"]; // you can expand later
    return active;
  }, [active]);

  const { projects, loading, error } = useProjects(activeMapping);

  return (
    <main className="bg-offwhite min-h-screen">
      <header className="px-gutter pt-10 pb-8">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
          <div>
            <button onClick={onBack} className="text-body-sm text-neutral-500 hover:text-offblack transition-colors">
              ← Back
            </button>
            <h1 className="mt-4 font-display text-hero leading-none">
              Work
            </h1>
            <p className="mt-4 text-body-lg text-neutral-500 max-w-2xl">
              A curated selection. Minimal layouts, strong craft, and a little fun in the details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onAbout && (
              <button className="btn-outline" onClick={onAbout}>
                About
              </button>
            )}
            {onContact && (
              <button className="btn-primary" onClick={onContact}>
                Contact
              </button>
            )}
          </div>
        </div>

        {/* ✅ Premium segmented pills */}
        <div className="max-w-7xl mx-auto mt-10">
          <div className="inline-flex flex-wrap gap-2 rounded-full border border-neutral-200 p-2 bg-white/60 backdrop-blur">
            {filters.map((filter) => {
              const isActive = active === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActive(filter.value)}
                  className={[
                    "px-4 py-2 rounded-full text-body-sm transition-all duration-300",
                    isActive
                      ? "bg-offblack text-offwhite"
                      : "text-neutral-500 hover:text-offblack hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section className="px-gutter pb-section-lg">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="py-20 text-neutral-500">Loading…</div>
          )}

          {!loading && error && (
            <div className="py-20 text-neutral-500">
              Couldn’t load projects: <span className="text-offblack">{error}</span>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="py-20 text-neutral-500">No projects found.</div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-10">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={() => onProjectClick(p.id)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left"
      aria-label={`Open project ${project.title}`}
    >
      <div className="media-frame">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-[360px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-[360px] bg-neutral-100" />
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-display-md leading-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-body-sm text-neutral-500">
            {project.category}{project.year ? ` · ${project.year}` : ""}
          </p>
        </div>

        <div className="shrink-0 w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center transition-all duration-300 group-hover:border-offblack group-hover:translate-x-0.5">
          <span className="text-offblack transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </button>
  );
}
