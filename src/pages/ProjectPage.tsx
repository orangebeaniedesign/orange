import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useProject, useProjects } from "../hooks/usePortfolioData";
import AutoAspectImage from "../components/AutoAspectImage";

interface ProjectPageProps {
  projectId: string;
  onBack: () => void;
  onProjectClick: (id: string) => void;
  onContact?: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectPage({
  projectId,
  onBack,
  onProjectClick,
  onContact,
}: ProjectPageProps) {
  const { project, loading, error } = useProject(projectId);
  const { projects } = useProjects();

  const nextProject = useMemo(() => {
    const currentIndex = projects.findIndex((p) => p.id === projectId);
    if (currentIndex >= 0 && currentIndex < projects.length - 1) {
      return projects[currentIndex + 1];
    }
    return null;
  }, [projects, projectId]);

  if (loading) return <LoadingState />;
  if (error || !project) return <ErrorState onBack={onBack} />;

  const images = Array.isArray(project.images) ? (project.images as string[]) : [];
  const categoryLabel = getCategoryLabel(project.category);

  return (
    <article className="min-h-screen bg-[#f6f4ef] text-[#111111]">
      <BackBar onBack={onBack} />
      <ProjectHeader
        title={project.title}
        description={project.description}
        year={project.year}
        client={project.client}
        category={categoryLabel}
        url={project.project_url}
      />

      {project.content ? <NarrativeBlock text={project.content} /> : null}

      {images.length > 0 ? (
        <EditorialGallery images={images} title={project.title} />
      ) : project.image_url ? (
        <SingleHeroImage src={project.image_url} alt={project.title} />
      ) : null}

      <BottomNav
        next={nextProject}
        onBack={onBack}
        onProjectClick={onProjectClick}
        onContact={onContact}
      />
    </article>
  );
}

function BackBar({ onBack }: { onBack: () => void }) {
  return (
    <section className="px-5 pt-28 md:px-8 md:pt-34 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#111111]/62 transition-opacity duration-300 hover:opacity-60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to work
        </motion.button>
      </div>
    </section>
  );
}

function ProjectHeader({
  title,
  description,
  year,
  client,
  category,
  url,
}: {
  title: string;
  description?: string | null;
  year?: string | number | null;
  client?: string | null;
  category: string;
  url?: string | null;
}) {
  return (
    <section className="px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10 lg:px-10 lg:pb-18">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/62">
                Project
              </div>

              <h1
                className="max-w-[9ch] text-[16vw] font-semibold leading-[0.84] tracking-[-0.08em] md:text-[98px] lg:text-[138px]"
                style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
              >
                {title}
              </h1>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.08, ease }}
                className="max-w-[36ch] text-[16px] leading-7 text-[#111111]/72"
              >
                {description}
              </motion.p>
            ) : null}
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.14, ease }}
              className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-black/12 pt-5"
            >
              {year ? <MetaItem label="Year" value={String(year)} /> : null}
              {client ? <MetaItem label="Client" value={client} /> : null}
              <MetaItem label="Type" value={category} />
              {url ? (
                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
                    Link
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] text-[#111111] underline underline-offset-[0.18em] transition-opacity duration-300 hover:opacity-60"
                  >
                    View live
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
        {label}
      </div>
      <div className="text-[14px] leading-6 text-[#111111]/78">{value}</div>
    </div>
  );
}

function NarrativeBlock({ text }: { text: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="px-5 pb-16 md:px-8 md:pb-24 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="grid grid-cols-12 gap-y-8 md:gap-x-8"
        >
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
              Notes
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <p className="whitespace-pre-line text-[clamp(22px,2.4vw,34px)] leading-[1.5] tracking-[-0.02em] text-[#111111]/78">
              {text}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SingleHeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="pb-16 md:pb-24 lg:pb-28">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <AutoAspectImage src={src} alt={alt} radius={0} animateIn={isInView} />
        </motion.div>
      </div>
    </section>
  );
}

function EditorialGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <section className="pb-16 md:pb-24 lg:pb-28">
      <EditorialFlow images={images} title={title} />
    </section>
  );
}

type RatioInfo = { src: string; ratio: number | null };

function EditorialFlow({ images, title }: { images: string[]; title: string }) {
  const [info, setInfo] = React.useState<RatioInfo[]>(
    images.map((src) => ({ src, ratio: null }))
  );

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      const results = await Promise.all(
        images.map(
          (src) =>
            new Promise<RatioInfo>((resolve) => {
              const img = new Image();
              img.onload = () => {
                const ratio =
                  img.naturalWidth && img.naturalHeight
                    ? img.naturalWidth / img.naturalHeight
                    : null;
                resolve({ src, ratio });
              };
              img.onerror = () => resolve({ src, ratio: null });
              img.src = src;
            })
        )
      );

      if (!cancelled) setInfo(results);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [images]);

  const isWide = (ratio: number | null) => (ratio ?? 0) >= 1.25;

  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < info.length) {
    const a = info[i];
    const b = info[i + 1];

    if (b && isWide(a.ratio) && isWide(b.ratio)) {
      nodes.push(
        <ImagePair
          key={`${a.src}-${b.src}-pair`}
          a={{ src: a.src, alt: `${title} ${i + 1}` }}
          b={{ src: b.src, alt: `${title} ${i + 2}` }}
          index={i}
        />
      );
      i += 2;
      continue;
    }

    nodes.push(
      <ImageSingle
        key={`${a.src}-single`}
        src={a.src}
        alt={`${title} ${i + 1}`}
        index={i}
      />
    );
    i += 1;
  }

  return <>{nodes}</>;
}

function ImagePair({
  a,
  b,
  index,
}: {
  a: { src: string; alt: string };
  b: { src: string; alt: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="px-5 pb-4 md:px-8 md:pb-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, delay: Math.min(index * 0.04, 0.22), ease }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          <AutoAspectImage src={a.src} alt={a.alt} radius={0} animateIn={isInView} />
          <AutoAspectImage src={b.src} alt={b.alt} radius={0} animateIn={isInView} />
        </motion.div>
      </div>
    </div>
  );
}

function ImageSingle({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mode = index % 5;

  const wrapClass =
    mode === 0 || mode === 3 ? "px-0 pb-4 md:pb-6" : "px-5 pb-4 md:px-8 md:pb-6 lg:px-10";

  const innerClass =
    mode === 0 || mode === 3
      ? "w-full"
      : mode === 1
      ? "mx-auto max-w-[1600px] md:w-[74%] md:mr-auto"
      : mode === 2
      ? "mx-auto max-w-[1600px] md:w-[82%] md:ml-auto"
      : "mx-auto max-w-[1600px] md:w-[70%]";

  return (
    <div ref={ref} className={wrapClass}>
      <div className={innerClass}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, delay: Math.min(index * 0.04, 0.22), ease }}
        >
          <AutoAspectImage src={src} alt={alt} radius={0} animateIn={isInView} />
        </motion.div>
      </div>
    </div>
  );
}

function BottomNav({
  next,
  onBack,
  onProjectClick,
  onContact,
}: {
  next: { id: string; title: string } | null;
  onBack: () => void;
  onProjectClick: (id: string) => void;
  onContact?: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="border-t border-black/12 px-5 py-14 md:px-8 md:py-18 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="grid grid-cols-12 gap-y-10 md:gap-x-8"
        >
          <div className="col-span-12 md:col-span-7">
            {next ? (
              <>
                <div className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
                  Next project
                </div>

                <button onClick={() => onProjectClick(next.id)} className="group text-left">
                  <h2
                    className="text-[clamp(34px,6vw,92px)] font-semibold leading-[0.92] tracking-[-0.06em] transition-opacity duration-300 group-hover:opacity-60"
                    style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
                  >
                    {next.title}
                  </h2>
                </button>
              </>
            ) : (
              <>
                <div className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
                  Return
                </div>

                <button onClick={onBack} className="group text-left">
                  <h2
                    className="text-[clamp(34px,6vw,92px)] font-semibold leading-[0.92] tracking-[-0.06em] transition-opacity duration-300 group-hover:opacity-60"
                    style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
                  >
                    All projects
                  </h2>
                </button>
              </>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-2">
            <div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.16em] text-[#111111]/62">
              <button
                onClick={onBack}
                className="text-left transition-opacity duration-300 hover:opacity-60"
              >
                Back to work
              </button>

              {next ? (
                <button
                  onClick={() => onProjectClick(next.id)}
                  className="text-left transition-opacity duration-300 hover:opacity-60"
                >
                  Open next project
                </button>
              ) : null}

              {onContact ? (
                <button
                  onClick={onContact}
                  className="text-left transition-opacity duration-300 hover:opacity-60"
                >
                  Back to landing
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f4ef]">
      <div className="h-8 w-8 animate-spin rounded-full border border-black/18 border-t-black/70" />
    </div>
  );
}

function ErrorState({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f4ef] px-5 md:px-8 lg:px-10">
      <div className="max-w-[520px] text-left">
        <div className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
          Error
        </div>
        <h1
          className="text-[clamp(36px,6vw,84px)] font-semibold leading-[0.92] tracking-[-0.07em]"
          style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
        >
          Project not found.
        </h1>
        <p className="mt-5 max-w-[32ch] text-[14px] leading-6 text-[#111111]/66">
          This project may have been removed, renamed, or the link is no longer valid.
        </p>
        <button
          onClick={onBack}
          className="mt-8 inline-flex items-center gap-2 text-[13px] underline underline-offset-[0.18em] transition-opacity duration-300 hover:opacity-60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to work
        </button>
      </div>
    </div>
  );
}

function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    branding: "Brand Identity",
    motion: "Motion Design",
    photography: "Photography",
    uiux: "Digital Design",
  };

  return map[category] || category;
}