import { ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onBack?: () => void;
  onContact: () => void;
  onWork: () => void;
}

export default function AboutPage({ onContact, onWork }: AboutPageProps) {
  return (
    <article className="bg-offwhite text-offblack">
      {/* INTRO */}
      <section className="pt-40 px-gutter">
        <div className="max-w-5xl">
          <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-8">
            About
          </span>

          <h1 className="text-hero leading-[1.05] mb-12">
            Designer focused on
            <br />
            identity, digital
            <br />
            and visual systems.
          </h1>

          <p className="text-display-md text-neutral-600 max-w-2xl leading-relaxed">
            I work across branding, digital design and visual content — building
            clear, consistent systems for brands that care about culture and
            intention.
          </p>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="py-section-lg px-gutter">
        <div className="max-w-6xl mx-auto">
          <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-16">
            Work Experience
          </span>

          <div className="space-y-10">
            <Experience
              period="2021 — 2025"
              role="Intern and full-time Designer"
              company="A Cor Laranja"
              description="Projetos Gráficos"
            />
            <Experience
              period="2019 — 2020"
              role="Freelance Designer"
              company="Dope Digital Agency"
            />
            <Experience
              period="2016"
              role="Intern Designer"
              company="Teatro Baltazar Dias"
            />
            <Experience
              period="2014"
              role="Intern 3D Designer"
              company="Proinov"
            />
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-16">
            Education
          </span>

          <div className="space-y-10">
            <Education
              period="2017 — 2020"
              title="Undergraduate degree in Audiovisual & Multimedia"
              institution="School of Communication and Media Studies"
            />
            <Education
              period="2013 — 2016"
              title="Multimedia Technician"
              institution="Francisco Franco State School"
            />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-16">
            Skills
          </span>

          <div className="grid md:grid-cols-2 gap-16">
            <ul className="space-y-3 text-body-lg text-neutral-600">
              <li>Graphic Design</li>
              <li>Branding</li>
              <li>Motion Graphics</li>
              <li>Editorial Design</li>
              <li>Photography / Video</li>
            </ul>

            <ul className="space-y-3 text-body-lg text-neutral-600">
              <li>Image Editing</li>
              <li>Print Production</li>
              <li>Logo Design</li>
              <li>Project Management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SOFTWARE */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-16">
            Software
          </span>

          <p className="text-body-lg text-neutral-600 max-w-3xl leading-relaxed">
            Adobe Illustrator, InDesign, Photoshop, After Effects, Premiere Pro,
            Animate
          </p>

          <p className="text-body-lg text-neutral-600 mt-4">Blender (3D)</p>
        </div>
      </section>

      {/* INTERESTS */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
          <div>
            <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-8">
              Interests
            </span>

            <p className="text-display-md leading-relaxed text-neutral-600 max-w-md">
              Outside of client work, I stay connected to culture through music,
              travel, reading and interactive media.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            <InterestItem title="Bateria" />
            <InterestItem title="Viagens" />
            <InterestItem title="Livros" />
            <InterestItem title="Jogos" />
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
          <div>
            <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-8">
              Online Courses
            </span>

            <ul className="space-y-3 text-body-lg text-neutral-600">
              <li>Introduction to After Effects</li>
              <li>Animated Collages</li>
              <li>Introduction to Adobe Animate</li>
            </ul>

            <p className="text-body-sm text-neutral-400 mt-4">Domestika Courses</p>
          </div>

          <div>
            <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-8">
              Certifications
            </span>

            <p className="text-body-lg text-neutral-600">
              Principles of Digital Marketing
            </p>

            <p className="text-body-sm text-neutral-400 mt-4">Google Courses</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
          <button onClick={onWork} className="group text-left">
            <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-6">
              Work
            </span>
            <h3 className="text-display-lg mb-6 group-hover:text-neutral-500 transition-colors">
              View selected projects
            </h3>
            <ArrowRight className="w-6 h-6 text-neutral-400 group-hover:text-offblack transition-colors" />
          </button>

          <button onClick={onContact} className="group text-left">
            <span className="text-caption uppercase tracking-widest text-neutral-400 block mb-6">
              Contact
            </span>
            <h3 className="text-display-lg mb-6 group-hover:text-neutral-500 transition-colors">
              Start a conversation
            </h3>
            <ArrowRight className="w-6 h-6 text-neutral-400 group-hover:text-offblack transition-colors" />
          </button>
        </div>
      </section>
    </article>
  );
}

function Experience({
  period,
  role,
  company,
  description,
}: {
  period: string;
  role: string;
  company: string;
  description?: string;
}) {
  return (
    <div className="grid md:grid-cols-4 gap-6 border-b border-neutral-200 pb-6">
      <span className="text-caption text-neutral-400">{period}</span>
      <span className="text-body-lg">{role}</span>
      <span className="text-body-md text-neutral-600">{company}</span>
      {description && <span className="text-body-sm text-neutral-400">{description}</span>}
    </div>
  );
}

function Education({
  period,
  title,
  institution,
}: {
  period: string;
  title: string;
  institution: string;
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6 border-b border-neutral-200 pb-6">
      <span className="text-caption text-neutral-400">{period}</span>
      <span className="text-body-lg">{title}</span>
      <span className="text-body-md text-neutral-600">{institution}</span>
    </div>
  );
}

function InterestItem({ title }: { title: string }) {
  return (
    <div className="border-t border-neutral-200 pt-4">
      <span className="text-body-lg text-offblack">{title}</span>
    </div>
  );
}
