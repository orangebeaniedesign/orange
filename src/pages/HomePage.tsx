import { ArrowRight } from "lucide-react";

interface HomePageProps {
  onViewWork: () => void;
  onViewAbout?: () => void;
  onViewContact?: () => void;
  onViewVisual?: () => void;
  onProjectClick?: (id: string) => void;
  onContact?: () => void;
}

const BASE = import.meta.env.BASE_URL;

export default function HomePage({ onViewWork, onViewContact, onContact }: HomePageProps) {
  return (
    <article className="bg-offwhite text-offblack">
      {/* HERO WITH SUBTLE VIDEO */}
      <section className="relative min-h-screen flex items-center px-gutter overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src={`${BASE}videos/hero.mp4`} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-offwhite/80" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl">
          <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-8">
            Creative Direction & Design
          </span>

          <h1 className="text-hero leading-[1.05] mb-12">OrangeBeanie</h1>

          <p className="text-display-md text-neutral-600 max-w-2xl leading-relaxed mb-16">
            Brand identity, digital design and visual systems for culture-driven
            brands.
          </p>

          <button
            onClick={onViewWork}
            className="group inline-flex items-center gap-6"
          >
            <span className="text-body-lg">Selected work</span>
            <span className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:border-offblack transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      <section className="py-section-lg">
        <img
          src={`${BASE}images/featured-project.jpg`}
          alt="Featured project"
          className="w-full h-[70vh] object-cover"
        />
      </section>

      {/* AREAS OF FOCUS */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-lg mb-20">Areas of focus</h2>

          <div className="grid md:grid-cols-3 gap-16">
            <FocusItem
              title="Identity & Branding"
              description="Visual identities and systems built for longevity."
              image={`${BASE}images/focus-branding.jpg`}
            />
            <FocusItem
              title="Digital Design"
              description="Web and digital experiences with clarity and intent."
              image={`${BASE}images/focus-digital.jpg`}
            />
            <FocusItem
              title="Visual Content"
              description="Photography, motion and visual storytelling."
              image={`${BASE}images/focus-visual.jpg`}
            />
          </div>
        </div>
      </section>

      {/* SECOND IMAGE STRIP */}
      <section className="py-section-lg">
        <img
          src={`${BASE}images/secondary-project.jpg`}
          alt="Selected work detail"
          className="w-full h-[60vh] object-cover"
        />
      </section>

      {/* CTA */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-display-lg leading-relaxed mb-16">
            Design for brands that care about what they put into the world.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={onViewWork} className="btn-primary">
              View work
            </button>

            <button onClick={onViewContact ?? onContact} className="btn-outline">
              Start a project
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

function FocusItem({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div>
      <div className="aspect-[4/3] mb-6 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-display-sm mb-4">{title}</h3>
      <p className="text-body-md text-neutral-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
