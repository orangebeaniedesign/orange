import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useProject, useProjects } from "../hooks/usePortfolioData";
import { easing, duration, staggerContainer, staggerItem } from "../lib/motion";
import AutoAspectImage from "../components/AutoAspectImage";

interface ProjectPageProps {
  projectId: string;
  onBack: () => void;
  onProjectClick: (id: string) => void;
  onContact?: () => void;
}

export default function ProjectPage({
  projectId,
  onBack,
  onProjectClick,
  onContact,
}: ProjectPageProps) {
  const { project, loading, error } = useProject(projectId);
  const { projects } = useProjects();

  if (loading) return <LoadingState />;
  if (error || !project) return <ErrorState onBack={onBack} />;

  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  const images = Array.isArray(project.images) ? (project.images as string[]) : [];
  const categoryLabel = getCategoryLabel(project.category);

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      {/* Top nav/back (sem hero) */}
      <div className="pt-28 md:pt-36 px-gutter">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 text-body-sm uppercase tracking-[0.14em] text-stone-500 hover:text-charcoal transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All projects
          </button>
        </div>
      </div>

      <TitleBlock title={project.title} description={project.description} />

      <MetadataStrip
        year={project.year}
        client={project.client}
        category={categoryLabel}
        url={project.project_url}
      />

      {project.content && <NarrativeBlock text={project.content} />}

      {images.length > 0 && (
        <EditorialGallery images={images} title={project.title} />
      )}

      <ProjectNavigation
        next={nextProject}
        onBack={onBack}
        onProjectClick={onProjectClick}
        onContact={onContact}
      />
    </article>
  );
}

function TitleBlock({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) {
  return (
    <section className="px-gutter pt-12 md:pt-16 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.h1 variants={staggerItem} className="text-hero max-w-5xl">
            {title}
          </motion.h1>

          {description && (
            <motion.p
              variants={staggerItem}
              className="text-body-xl md:text-display-md text-stone-600 max-w-2xl mt-7 md:mt-8 font-light leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function MetadataStrip({
  year,
  client,
  category,
  url,
}: {
  year?: string | number | null;
  client?: string | null;
  category: string;
  url?: string | null;
}) {
  const items = [
    { label: "Year", value: year },
    { label: "Client", value: client },
    { label: "Medium", value: category },
  ].filter((item) => item.value);

  return (
    <section className="px-gutter pb-18 md:pb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, delay: 0.2, ease: easing.expoOut }}
          className="border-t border-stone-200/60 pt-10"
        >
          <div className="flex flex-wrap items-start gap-x-16 gap-y-6">
            {items.map((item) => (
              <div key={item.label}>
                <p className="label-caption mb-2">{item.label}</p>
                <p className="text-body-md font-light">{String(item.value)}</p>
              </div>
            ))}

            {url && (
              <div>
                <p className="label-caption mb-2">Link</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-body-md font-light text-charcoal hover:text-stone-600 transition-colors duration-300 underline-weird"
                >
                  View live
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NarrativeBlock({ text }: { text: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-gutter pb-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%] max-w-2xl"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-14" />
          <p className="text-body-xl md:text-display-sm text-stone-700 font-light leading-[1.85] whitespace-pre-line">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/** ✅ Galeria editorial: full-bleed + alternância esquerda/direita + ritmos */
function EditorialGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <section className="pb-section-lg">
      <div className="space-y-10 md:space-y-14">
        {images.map((url, index) => (
          <EditorialItem
            key={`${url}-${index}`}
            src={url}
            alt={`${title} - ${index + 1}`}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function EditorialItem({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-90px" });

  // Padrões:
  // 0: full-bleed
  // 1: left tight
  // 2: right medium
  // 3: full-bleed
  // 4: center tight
  const mode = index % 5;

  const wrapClass =
    mode === 0 || mode === 3
      ? "px-0" // full bleed
      : "px-gutter";

  const innerClass =
    mode === 0 || mode === 3
      ? "w-full"
      : mode === 1
      ? "max-w-7xl mx-auto md:w-[74%] md:mr-auto"
      : mode === 2
      ? "max-w-7xl mx-auto md:w-[82%] md:ml-auto"
      : "max-w-7xl mx-auto md:w-[70%]";

  const radius = mode === 0 || mode === 3 ? 0 : 10;

  return (
    <div ref={ref} className={wrapClass}>
      <div className={innerClass}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: duration.slowest,
            delay: Math.min(index * 0.04, 0.25),
            ease: easing.expoOut,
          }}
        >
          <AutoAspectImage
            src={src}
            alt={alt}
            radius={radius}
            animateIn={isInView}
            className={
              mode === 0 || mode === 3
                ? ""
                : "shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            }
          />
        </motion.div>
      </div>
    </div>
  );
}

function ProjectNavigation({
  next,
  onBack,
  onProjectClick,
  onContact,
}: {
  next: { id: string; title: string; image_url: string } | null;
  onBack: () => void;
  onProjectClick: (id: string) => void;
  onContact?: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-t border-stone-200/60">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: duration.slower, ease: easing.expoOut }}
      >
        {next ? (
          <NextProjectTeaser project={next} onClick={() => onProjectClick(next.id)} />
        ) : (
          <div className="py-section px-gutter">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <button onClick={onBack} className="group">
                <p className="label-caption mb-3">Return to</p>
                <h3 className="text-display-lg group-hover:text-stone-600 transition-colors duration-300">
                  All projects
                </h3>
              </button>

              {onContact && (
                <button onClick={onContact} className="btn-outline">
                  Get in touch
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

function NextProjectTeaser({
  project,
  onClick,
}: {
  project: { id: string; title: string; image_url: string };
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group w-full text-left" data-cursor="next">
      <div className="py-12 md:py-16 px-gutter">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="label-caption mb-3">Next project</p>
            <h3 className="text-display-xl md:text-display-2xl group-hover:text-stone-600 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-charcoal group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>

      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-expo-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-600" />
      </div>
    </button>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-8 h-8 border border-stone-300 border-t-charcoal rounded-full animate-spin" />
    </div>
  );
}

function ErrorState({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-gutter">
      <div className="text-center">
        <h1 className="text-display-lg text-charcoal mb-4">Project not found</h1>
        <p className="text-body-md text-stone-500 mb-8 font-light">
          This project may have been removed or the link is incorrect.
        </p>
        <button onClick={onBack} className="btn-outline">
          <ArrowLeft className="w-4 h-4" />
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
    uiux: "UI/UX Design",
  };
  return map[category] || category;
}
