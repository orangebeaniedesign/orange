import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useProject, useProjects } from '../hooks/usePortfolioData';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

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
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  const images = Array.isArray(project.images) ? (project.images as string[]) : [];
  const categoryLabel = getCategoryLabel(project.category);

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <HeroImage
        src={project.image_url}
        alt={project.title}
        onBack={onBack}
      />

      <TitleBlock
        title={project.title}
        description={project.description}
      />

      <MetadataStrip
        year={project.year}
        client={project.client}
        category={categoryLabel}
        url={project.project_url}
      />

      {project.content && <NarrativeBlock text={project.content} />}

      {images.length > 0 && (
        <GalleryFlow images={images} title={project.title} />
      )}

      <ProjectNavigation
        prev={prevProject}
        next={nextProject}
        onBack={onBack}
        onProjectClick={onProjectClick}
        onContact={onContact}
      />
    </article>
  );
}

function HeroImage({
  src,
  alt,
  onBack,
}: {
  src: string;
  alt: string;
  onBack: () => void;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section ref={ref} className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, opacity }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: easing.expoOut }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-cream/20" />

      <div className="absolute top-0 left-0 right-0 pt-32 md:pt-40 px-gutter z-10">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 text-body-sm text-cream/80 hover:text-cream transition-colors duration-500 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
            All projects
          </button>
        </div>
      </div>
    </section>
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
    <section className="px-gutter pt-20 md:pt-28 pb-14 md:pb-18">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={staggerItem}
            className="font-serif text-hero max-w-5xl"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              variants={staggerItem}
              className="text-body-xl md:text-display-md text-stone-500 max-w-2xl mt-8 md:mt-10 font-light leading-relaxed italic font-serif"
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
    { label: 'Year', value: year },
    { label: 'Client', value: client },
    { label: 'Medium', value: category },
  ].filter((item) => item.value);

  return (
    <section className="px-gutter pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, delay: 0.5, ease: easing.expoOut }}
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
                  className="inline-flex items-center gap-2 text-body-md font-light text-charcoal hover:text-stone-600 transition-colors duration-500"
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="px-gutter pb-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%] max-w-2xl"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-14" />
          <p className="text-body-xl md:text-display-sm text-stone-700 font-light leading-[1.8] whitespace-pre-line">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const galleryLayouts = [
  { wrapper: '', aspect: 'aspect-[16/9]' },
  { wrapper: 'md:w-[75%]', aspect: 'aspect-[4/5]' },
  { wrapper: 'md:w-[85%] md:ml-auto', aspect: 'aspect-[3/2]' },
];

function GalleryFlow({ images, title }: { images: string[]; title: string }) {
  return (
    <section className="pb-section-lg">
      <div className="space-y-20 md:space-y-32">
        {images.map((url, index) => (
          <GalleryImage
            key={index}
            src={url}
            alt={`${title} - ${index + 1}`}
            layout={galleryLayouts[index % galleryLayouts.length]}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryImage({
  src,
  alt,
  layout,
  index,
}: {
  src: string;
  alt: string;
  layout: (typeof galleryLayouts)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="px-gutter">
      <div className={`max-w-7xl mx-auto ${layout.wrapper}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: duration.slowest,
            delay: index * 0.06,
            ease: easing.expoOut,
          }}
          className="overflow-hidden"
        >
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            initial={{ scale: 1.04 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 2.4, ease: easing.expoOut }}
            className={`w-full ${layout.aspect} object-cover`}
            data-cursor="zoom"
          />
        </motion.div>
      </div>
    </div>
  );
}

function ProjectNavigation({
  prev,
  next,
  onBack,
  onProjectClick,
  onContact,
}: {
  prev: { id: string; title: string; image_url: string } | null;
  next: { id: string; title: string; image_url: string } | null;
  onBack: () => void;
  onProjectClick: (id: string) => void;
  onContact?: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
                <h3 className="font-serif text-display-lg group-hover:text-stone-600 transition-colors duration-500">
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
    <button
      onClick={onClick}
      className="group w-full text-left"
      data-cursor="next"
    >
      <div className="py-12 md:py-16 px-gutter">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="label-caption mb-3">Next project</p>
            <h3 className="font-serif text-display-xl md:text-display-2xl group-hover:text-stone-600 transition-colors duration-500">
              {project.title}
            </h3>
          </div>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-charcoal group-hover:translate-x-1 transition-all duration-500" />
        </div>
      </div>

      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.4s] ease-expo-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-700" />
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
        <h1 className="font-serif text-display-lg text-charcoal mb-4">
          Project not found
        </h1>
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
    branding: 'Brand Identity',
    motion: 'Motion Design',
    photography: 'Photography',
    uiux: 'UI/UX Design',
  };
  return map[category] || category;
}
