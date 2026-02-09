import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '../hooks/usePortfolioData';

type Pillar = 'all' | 'identity' | 'digital' | 'visual';

interface WorkPageProps {
  onBack?: () => void;
  onProjectClick: (id: string) => void;
  onAbout?: () => void;
  onContact: () => void;
}

const filters: {
  label: string;
  value: Pillar;
  mapsTo?: string[];
}[] = [
  { label: 'All', value: 'all' },
  { label: 'Identity', value: 'identity', mapsTo: ['branding'] },
  { label: 'Digital', value: 'digital', mapsTo: ['uiux'] },
  { label: 'Visual', value: 'visual', mapsTo: ['motion', 'photography'] },
];

export default function WorkPage({ onProjectClick, onContact }: WorkPageProps) {
  const [active, setActive] = useState<Pillar>('all');

  const activeMapping = filters.find((f) => f.value === active)?.mapsTo;

  const { projects, loading } = useProjects(active === 'all' ? undefined : activeMapping);

  return (
    <div className="min-h-screen">
      {/* INTRO */}
      <section className="pt-40 pb-32 px-gutter">
        <div className="max-w-6xl">
          <span className="text-caption uppercase tracking-widest text-neutral-500 block mb-10">
            Selected Work
          </span>

          <h1 className="text-hero leading-[1.05] mb-16">
            A selection of projects
            <br />
            across brand, digital
            <br />
            and visual design.
          </h1>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-8 mt-16">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActive(filter.value)}
                className={`text-body-lg transition-colors ${
                  active === filter.value
                    ? 'text-offblack'
                    : 'text-neutral-400 hover:text-offblack'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT LIST */}
      <section className="pb-section-lg px-gutter">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="space-y-32">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[16/9] bg-neutral-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-40">
              {projects.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  index={index}
                  project={project}
                  onClick={() => onProjectClick(project.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-display-lg leading-relaxed mb-16">
            Open to working with brands that value clarity, culture and longevity.
          </p>

          <button onClick={onContact} className="btn-primary">
            Start a project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

interface ProjectRowProps {
  project: {
    id: string;
    title: string;
    category: string;
    image_url: string;
    description?: string | null;
  };
  index: number;
  onClick: () => void;
}

function ProjectRow({ project, index, onClick }: ProjectRowProps) {
  const isReversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article>
      <button onClick={onClick} className="group w-full text-left">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* IMAGE */}
          <div className={`lg:col-span-8 ${isReversed ? 'lg:col-start-5' : ''}`}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* META */}
          <div className={`lg:col-span-4 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-caption text-neutral-400 tabular-nums">{number}</span>
              <span className="text-caption uppercase tracking-widest text-neutral-400">
                {project.category}
              </span>
            </div>

            <h3 className="text-display-lg mb-6 group-hover:text-neutral-500 transition-colors">
              {project.title}
            </h3>

            {project.description && (
              <p className="text-body-md text-neutral-500 leading-relaxed mb-8 max-w-sm">
                {project.description}
              </p>
            )}

            <span className="inline-flex items-center gap-2 text-body-sm text-neutral-400 group-hover:text-offblack transition-colors">
              View project
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
