import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useProjects } from "../hooks/usePortfolioData";
import { easing, duration, staggerContainer, staggerItem } from "../lib/motion";
import AutoAspectImage from "../components/AutoAspectImage";

interface VisualPageProps {
  onProjectClick?: (id: string) => void;
  onContact?: () => void;
}

export default function VisualPage({ onProjectClick, onContact }: VisualPageProps) {
  const { projects, loading } = useProjects("photography");

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <HeroSection />

      <section className="py-section-lg">
        <div className="px-gutter mb-14 md:mb-18">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: duration.slower, ease: easing.expoOut }}
            >
              <p className="label-caption mb-4">Gallery</p>
              <h2 className="text-display-xl">
                Visual work,
                <br />
                <span className="underline-weird">no rules.</span>
              </h2>
              <p className="text-body-lg text-stone-600 font-light leading-relaxed mt-7 max-w-xl">
                Photography + motion fragments. A space for experiments, mood,
                texture and atmosphere.
              </p>
            </motion.div>
          </div>
        </div>

        {loading ? (
          <VisualSkeleton />
        ) : projects.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-body-lg text-stone-500 font-light">
              Visual work coming soon.
            </p>
          </div>
        ) : (
          <MasonryGallery projects={projects} onProjectClick={onProjectClick} />
        )}
      </section>

      <CTASection onContact={onContact} />
    </article>
  );
}

function HeroSection() {
  return (
    <section className="pt-44 md:pt-56 lg:pt-64 pb-14 md:pb-18 px-gutter">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p variants={staggerItem} className="label-caption mb-8">
            Visual & Audiovisual
          </motion.p>

          <motion.h1 variants={staggerItem} className="text-hero">
            Visual
            <br />
            culture.
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-body-xl text-stone-600 max-w-xl mt-10 font-light leading-relaxed"
          >
            A dedicated space for photography, motion, and audiovisual
            experimentation — where images move and atmospheres emerge.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function MasonryGallery({
  projects,
  onProjectClick,
}: {
  projects: { id: string; title: string; image_url: string }[];
  onProjectClick?: (id: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="px-gutter">
      <div className="max-w-7xl mx-auto">
        {/* Masonry simples com CSS columns (super leve e automatico) */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slower,
                delay: Math.min(index * 0.04, 0.35),
                ease: easing.expoOut,
              }}
              onClick={() => onProjectClick?.(project.id)}
              className="group mb-4 md:mb-6 break-inside-avoid w-full text-left"
              data-cursor="view"
            >
              <div className="relative">
                <AutoAspectImage
                  src={project.image_url}
                  alt={project.title}
                  radius={10}
                  animateIn={isInView}
                  className="shadow-[0_12px_34px_rgba(0,0,0,0.06)]"
                  imgClassName="transition-transform duration-[1.1s] ease-expo-out group-hover:scale-[1.02]"
                />

                {/* overlay clean */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ borderRadius: 10 }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent"
                    style={{ borderRadius: 10 }}
                  />
                  <div
                    className="absolute inset-4 border border-cream/25"
                    style={{ borderRadius: 10 }}
                  />
                </div>

                {/* title reveal */}
                <div className="pointer-events-none absolute inset-0 flex items-end p-5 md:p-6">
                  <div className="w-full translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-body-sm text-cream font-light">
                        {project.title}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-cream/90" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualSkeleton() {
  return (
    <div className="px-gutter">
      <div className="max-w-7xl mx-auto columns-2 md:columns-3 gap-4 md:gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="mb-4 md:mb-6 break-inside-avoid bg-stone-100 animate-pulse"
            style={{ borderRadius: 10, aspectRatio: i % 3 === 0 ? "4 / 5" : i % 3 === 1 ? "1 / 1" : "3 / 4" }}
          />
        ))}
      </div>
    </div>
  );
}

function CTASection({ onContact }: { onContact?: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200/60">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: duration.slower, ease: easing.expoOut }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="label-caption mb-6">Collaboration</p>
        <h2 className="text-display-xl mb-7">
          Want to make
          <br />
          <span className="underline-weird">something visual?</span>
        </h2>
        <p className="text-body-lg text-stone-600 max-w-xl mx-auto mb-12 font-light leading-relaxed">
          Open to collaborations on photography, motion, and audiovisual projects —
          from clean campaigns to weird experiments.
        </p>
        <button onClick={onContact} className="btn-primary">
          Get in touch
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
}
