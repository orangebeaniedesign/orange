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

      <ProjectIntro
        title={project.title}
        description={project.description}
        year={project.year}
        client={project.client}
        category={categoryLabel}
        url={project.project_url}
      />

      {project.image_url ? (
        <HeroImage src={project.image_url} alt={project.title} />
      ) : null}

      <OverviewSection
        description={project.description}
        content={project.content}
      />

      {images.length > 0 ? (
        <EditorialGallery images={images} title={project.title} />
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
    <section className="px-3 pt-24 md:px-6 md:pt-28 lg:px-8 lg:pt-30">
      <div className="mx-auto max-w-[1500px]">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#111111]/58 transition-opacity duration-300 hover:opacity-60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All work
        </motion.button>
      </div>
    </section>
  );
}

function ProjectIntro({
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
    <section className="px-3 pb-8 pt-8 md:px-6 md:pb-10 md:pt-10 lg:px-8 lg:pb-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-12 gap-y-6 md:gap-x-6">
          <div className="col-span-12 md:col-span-9">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              className="text-[clamp(28px,5vw,54px)] font-semibold leading-[0.95] tracking-[-0.05em]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              {title}
            </motion.h1>
          </div>

          <div className="col-span-12 md:col-span-3 md:text-right">
            {url ? (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease }}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#111111]/66 underline underline-offset-[0.2em] transition-opacity duration-300 hover:opacity-60"
              >
                Website
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.a>
            ) : null}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
          className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-black/12 pt-4 md:grid-cols-4"
        >
          <MetaCell label="Creative Direction" value={client || "—"} />
          <MetaCell label="Visual" value={category} />
          <MetaCell label="Motion" value={year ? String(year) : "—"} />
          <MetaCell label="See Project" value={url ? "↗" : "—"} alignRight />
        </motion.div>

        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mt-8 max-w-[60ch] text-[14px] leading-6 text-[#111111]/68"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}

function MetaCell({
  label,
  value,
  alignRight = false,
}: {
  label: string;
  value: string;
  alignRight?: boolean;
}) {
  return (
    <div className={alignRight ? "md:text-right" : ""}>
      <div className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-[#111111]/44">
        {label}
      </div>
      <div className="text-[11px] uppercase tracking-[0.12em] text-[#111111]/68">
        {value}
      </div>
    </div>
  );
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-3 pb-12 md:px-6 md:pb-16 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <AutoAspectImage src={src} alt={alt} radius={0} animateIn={isInView} />
        </motion.div>
      </div>
    </section>
  );
}

function OverviewSection({
  description,
  content,
}: {
  description?: string | null;
  content?: string | null;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  if (!description && !content) return null;

  return (
    <section ref={ref} className="px-3 pb-14 md:px-6 md:pb-18 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-12 gap-y-8 md:gap-x-8"
        >
          <div className="col-span-12 md:col-span-3">
            <h2
              className="text-[clamp(22px,2.4vw,34px)] font-semibold leading-[0.98] tracking-[-0.04em]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              Project
              <br />
              overview
            </h2>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="text-[13px] leading-6 text-[#111111]/68">
              {description ||
                "This project focused on crafting a visual world with clarity, mood, and a strong digital presence."}
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="text-[13px] leading-6 text-[#111111]/68">
              {content
                ? trimText(content, 230)
                : "The system was designed to feel immersive, structured, and expressive across multiple touchpoints."}
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="text-[13px] leading-6 text-[#111111]/68">
              The result is a cleaner, more editorial project page where the images do more of the talking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EditorialGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <section className="pb-14 md:pb-20 lg:pb-24">
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
    <div ref={ref} className="px-3 pb-4 md:px-6 md:pb-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.22), ease }}
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

  const mode = index % 4;

  const wrapClass =
    mode === 0 ? "px-3 pb-4 md:px-6 md:pb-6 lg:px-8" : "px-3 pb-4 md:px-6 md:pb-6 lg:px-8";

  const innerClass =
    mode === 0
      ? "mx-auto max-w-[1500px]"
      : mode === 1
      ? "mx-auto max-w-[1500px] md:w-[92%]"
      : mode === 2
      ? "mx-auto max-w-[1500px] md:w-[78%]"
      : "mx-auto max-w-[1500px] md:w-[86%] md:ml-auto";

  return (
    <div ref={ref} className={wrapClass}>
      <div className={innerClass}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.22), ease }}
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
      className="border-t border-black/12 px-3 py-14 md:px-6 md:py-18 lg:px-8 lg:py-22"
    >
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="grid grid-cols-12 gap-y-8 md:gap-x-8"
        >
          <div className="col-span-12 md:col-span-8">
            <div className="mb-3 text-[10px] uppercase tracking-[0.14em] text-[#111111]/46">
              {next ? "Next Project" : "Return"}
            </div>

            <button
              onClick={() => (next ? onProjectClick(next.id) : onBack())}
              className="group text-left"
            >
              <h2
                className="text-[clamp(36px,8vw,82px)] font-semibold leading-[0.9] tracking-[-0.06em] transition-opacity duration-300 group-hover:opacity-60"
                style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
              >
                {next ? next.title : "Back to Work"}
              </h2>
            </button>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-10 md:pt-2">
            <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.14em] text-[#111111]/58">
              <button
                onClick={onBack}
                className="text-left transition-opacity duration-300 hover:opacity-60"
              >
                All work
              </button>

              {next ? (
                <button
                  onClick={() => onProjectClick(next.id)}
                  className="text-left transition-opacity duration-300 hover:opacity-60"
                >
                  Open next
                </button>
              ) : null}

              {onContact ? (
                <button
                  onClick={onContact}
                  className="text-left transition-opacity duration-300 hover:opacity-60"
                >
                  Landing page
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
    <div className="flex min-h-screen items-center justify-center bg-[#f6f4ef] px-5">
      <div className="max-w-[520px] text-left">
        <div className="mb-4 text-[10px] uppercase tracking-[0.14em] text-[#111111]/46">
          Error
        </div>
        <h1
          className="text-[clamp(32px,6vw,64px)] font-semibold leading-[0.94] tracking-[-0.06em]"
          style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
        >
          Project not found.
        </h1>
        <p className="mt-4 max-w-[32ch] text-[14px] leading-6 text-[#111111]/66">
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

function trimText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}