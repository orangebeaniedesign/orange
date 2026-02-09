import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border border-stone-300 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-gutter">
        <div className="text-center">
          <h1 className="font-serif text-display-lg text-charcoal mb-4">Project not found</h1>
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

  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1
    ? projects[currentIndex + 1]
    : null;

  const images = Array.isArray(project.images) ? (project.images as string[]) : [];

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <section className="pt-32 md:pt-40 pb-8 px-gutter">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </button>
        </div>
      </section>

      <section className="px-gutter pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={staggerItem} className="label-caption mb-6">
              {project.category}
              {project.year ? ` / ${project.year}` : ''}
            </motion.p>

            <motion.h1 variants={staggerItem} className="font-serif text-hero max-w-4xl">
              {project.title}
            </motion.h1>

            {project.description && (
              <motion.p
                variants={staggerItem}
                className="text-body-xl text-stone-600 max-w-2xl mt-8 font-light leading-relaxed"
              >
                {project.description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="px-gutter mb-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slower, delay: 0.3, ease: easing.expoOut }}
        >
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full max-w-7xl mx-auto aspect-[16/9] object-cover"
          />
        </motion.div>
      </section>

      <section className="px-gutter pb-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div className="md:col-span-1 space-y-8">
            {project.client && (
              <div>
                <p className="label-caption mb-2">Client</p>
                <p className="text-body-md">{project.client}</p>
              </div>
            )}
            <div>
              <p className="label-caption mb-2">Category</p>
              <p className="text-body-md capitalize">{project.category}</p>
            </div>
            {project.year && (
              <div>
                <p className="label-caption mb-2">Year</p>
                <p className="text-body-md">{project.year}</p>
              </div>
            )}
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-sm text-stone-600 hover:text-charcoal transition-colors duration-300"
              >
                View live project
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {project.content && (
            <div className="md:col-span-2">
              <p className="text-body-lg text-stone-700 font-light leading-relaxed whitespace-pre-line">
                {project.content}
              </p>
            </div>
          )}
        </div>
      </section>

      {images.length > 0 && <ProjectGallery images={images} title={project.title} />}

      <section className="py-section-lg px-gutter border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {nextProject ? (
            <button
              onClick={() => onProjectClick(nextProject.id)}
              className="group"
            >
              <p className="label-caption mb-3">Next project</p>
              <h3 className="font-serif text-display-lg group-hover:text-stone-600 transition-colors duration-500">
                {nextProject.title}
              </h3>
            </button>
          ) : (
            <button onClick={onBack} className="group">
              <p className="label-caption mb-3">Back to</p>
              <h3 className="font-serif text-display-lg group-hover:text-stone-600 transition-colors duration-500">
                All projects
              </h3>
            </button>
          )}

          {onContact && (
            <button onClick={onContact} className="btn-outline">
              Start a project
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>
    </article>
  );
}

function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-gutter pb-section">
      <div className="max-w-7xl mx-auto space-y-6">
        {images.map((url, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: duration.slower,
              delay: index * 0.1,
              ease: easing.expoOut,
            }}
          >
            <img
              src={url}
              alt={`${title} - ${index + 1}`}
              loading="lazy"
              className="w-full object-cover"
              data-cursor="zoom"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
