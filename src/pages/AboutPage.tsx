import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

interface AboutPageProps {
  onContact: () => void;
  onWork: () => void;
}

export default function AboutPage({ onContact, onWork }: AboutPageProps) {
  return (
    <article className="bg-cream text-charcoal">
      <IntroSection />
      <StorySection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <CTASection onContact={onContact} onWork={onWork} />
    </article>
  );
}

function IntroSection() {
  return (
    <section className="pt-40 md:pt-48 pb-section px-gutter">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="label-caption mb-8">
            About
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-hero leading-[1.0] max-w-4xl"
          >
            Designer focused on
            identity, digital, and
            visual systems.
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section px-gutter border-t border-stone-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
        >
          <img
            src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Studio workspace"
            className="w-full aspect-[3/4] object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, delay: 0.15, ease: easing.expoOut }}
          className="flex flex-col justify-center"
        >
          <p className="label-caption mb-8">The Story</p>

          <p className="text-body-xl text-stone-700 font-light leading-relaxed mb-6">
            I work across branding, digital design, and visual content --
            building clear, consistent systems for brands that care about
            culture and intention.
          </p>

          <p className="text-body-lg text-stone-600 font-light leading-relaxed mb-6">
            Based in Porto, Portugal. I believe the best work comes from
            honest collaboration, careful observation, and the patience to
            get the details right.
          </p>

          <p className="text-body-lg text-stone-600 font-light leading-relaxed">
            Outside of client work, I stay connected to culture through
            music, travel, reading, and interactive media.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const experience = [
    { period: '2021 -- Present', role: 'Designer', company: 'A Cor Laranja', note: 'Brand & Digital' },
    { period: '2019 -- 2020', role: 'Freelance Designer', company: 'Dope Digital Agency' },
    { period: '2016', role: 'Design Intern', company: 'Teatro Baltazar Dias' },
    { period: '2014', role: '3D Design Intern', company: 'Proinov' },
  ];

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="mb-16"
        >
          <p className="label-caption">Experience</p>
        </motion.div>

        <div className="space-y-0">
          {experience.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slow,
                delay: index * 0.08,
                ease: easing.expoOut,
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-stone-200"
            >
              <span className="md:col-span-3 text-body-sm text-stone-400">{item.period}</span>
              <span className="md:col-span-4 text-body-md">{item.role}</span>
              <span className="md:col-span-3 text-body-md text-stone-600">{item.company}</span>
              {item.note && (
                <span className="md:col-span-2 text-body-sm text-stone-400">{item.note}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const capabilities = [
    'Brand Identity',
    'Visual Systems',
    'Digital Design',
    'Art Direction',
    'Motion Graphics',
    'Editorial Design',
    'Photography',
    'Print Production',
  ];

  const tools = [
    'Adobe Illustrator',
    'Photoshop',
    'InDesign',
    'After Effects',
    'Premiere Pro',
    'Blender',
    'Figma',
  ];

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
        >
          <p className="label-caption mb-10">Capabilities</p>
          <div className="space-y-4">
            {capabilities.map((skill) => (
              <div key={skill} className="border-b border-stone-200 pb-4">
                <span className="text-body-lg font-light">{skill}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, delay: 0.1, ease: easing.expoOut }}
        >
          <p className="label-caption mb-10">Tools</p>
          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool} className="border-b border-stone-200 pb-4">
                <span className="text-body-lg text-stone-600 font-light">{tool}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const education = [
    {
      period: '2017 -- 2020',
      title: 'Audiovisual & Multimedia',
      institution: 'School of Communication and Media Studies',
    },
    {
      period: '2013 -- 2016',
      title: 'Multimedia Technician',
      institution: 'Francisco Franco State School',
    },
  ];

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="mb-16"
        >
          <p className="label-caption">Education</p>
        </motion.div>

        <div className="space-y-0">
          {education.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slow,
                delay: index * 0.08,
                ease: easing.expoOut,
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-stone-200"
            >
              <span className="text-body-sm text-stone-400">{item.period}</span>
              <span className="text-body-md">{item.title}</span>
              <span className="text-body-md text-stone-600">{item.institution}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onContact, onWork }: { onContact: () => void; onWork: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          onClick={onWork}
          className="group text-left"
        >
          <p className="label-caption mb-6">Work</p>
          <h3 className="font-serif text-display-lg mb-6 group-hover:text-stone-500 transition-colors duration-500">
            View selected projects
          </h3>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-charcoal transition-colors duration-300" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, delay: 0.1, ease: easing.expoOut }}
          onClick={onContact}
          className="group text-left"
        >
          <p className="label-caption mb-6">Contact</p>
          <h3 className="font-serif text-display-lg mb-6 group-hover:text-stone-500 transition-colors duration-500">
            Start a conversation
          </h3>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-charcoal transition-colors duration-300" />
        </motion.button>
      </div>
    </section>
  );
}
