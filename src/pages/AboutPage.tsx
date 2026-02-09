import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { easing, duration } from '../lib/motion';

interface AboutPageProps {
  onContact: () => void;
  onWork: () => void;
}

export default function AboutPage({ onContact, onWork }: AboutPageProps) {
  return (
    <article className="bg-cream text-charcoal">
      <OpeningSection />
      <PortraitSection />
      <StatementSection />
      <ValuesSection />
      <PerspectiveSection />
      <ClosingSection onContact={onContact} onWork={onWork} />
    </article>
  );
}

function OpeningSection() {
  return (
    <section className="pt-44 md:pt-56 lg:pt-64 pb-section px-gutter">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: easing.expoOut }}
          className="label-caption mb-10 md:mb-14"
        >
          About
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: easing.expoOut }}
          className="font-serif text-hero leading-[0.98] max-w-5xl"
        >
          Design is an act
          <br />
          of <em className="italic">listening</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: easing.expoOut }}
          className="mt-14 md:mt-18 md:ml-[30%] max-w-lg"
        >
          <p className="text-body-xl text-stone-500 font-light leading-relaxed">
            Before any line is drawn, there is a conversation.
            Before any system takes shape, there is understanding.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PortraitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section ref={ref} className="px-gutter pb-section-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slowest, ease: easing.expoOut }}
            className="md:col-span-7 md:col-start-1 overflow-hidden"
          >
            <motion.div style={{ y }} className="will-change-transform">
              <img
                src="https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Atmospheric landscape"
                className="w-full aspect-[4/5] md:aspect-[3/4] object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slower, delay: 0.3, ease: easing.expoOut }}
            className="md:col-span-4 md:col-start-9 flex flex-col justify-end"
          >
            <p className="text-body-lg text-stone-600 font-light leading-relaxed">
              Porto-based creative studio working across branding,
              digital, and visual storytelling. Small by intention.
              Thoughtful by nature.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatementSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: duration.slow, ease: easing.expoOut }}
              className="label-caption"
            >
              The Practice
            </motion.p>
          </div>

          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slowest, ease: easing.expoOut }}
              className="font-serif text-display-xl leading-[1.2] mb-14"
            >
              Every project begins with stillness -- a careful pause
              to understand what already exists before imagining what
              could be.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slower, delay: 0.2, ease: easing.expoOut }}
              className="space-y-8 max-w-xl"
            >
              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I've never been drawn to loudness in design. The work I admire most
                is the kind that feels inevitable -- as though it couldn't have been
                any other way. That quiet confidence is what I chase in every brief.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                My practice sits between strategy and aesthetics. I design
                identities, digital experiences, and visual systems -- always
                starting from the story a brand carries, even when it hasn't been
                told yet.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I work closely with studios, cultural projects, and independent
                businesses who share a belief that good design is not decoration.
                It's clarity, made visible.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      heading: 'Restraint',
      text: 'Knowing what to leave out is as important as knowing what to include. Every element earns its place.',
    },
    {
      heading: 'Intention',
      text: 'Nothing is arbitrary. Color, type, space -- each decision is a considered response to a real need.',
    },
    {
      heading: 'Longevity',
      text: 'Trends pass. The work that matters is built to endure -- rooted in meaning, not in the moment.',
    },
  ];

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-24 md:mb-32">
          <div className="md:col-span-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: duration.slow, ease: easing.expoOut }}
              className="label-caption"
            >
              Values
            </motion.p>
          </div>

          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slowest, ease: easing.expoOut }}
              className="font-serif text-display-2xl leading-[1.15]"
            >
              Three principles that
              shape everything.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-14">
          {values.map((value, index) => (
            <motion.div
              key={value.heading}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slower,
                delay: 0.2 + index * 0.12,
                ease: easing.expoOut,
              }}
            >
              <div className="w-8 h-[1px] bg-stone-300 mb-8" />
              <h3 className="font-serif text-display-md mb-5">
                {value.heading}
              </h3>
              <p className="text-body-md text-stone-500 font-light leading-relaxed">
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerspectiveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slower, delay: 0.15, ease: easing.expoOut }}
            className="md:col-span-5 md:col-start-1 order-2 md:order-1"
          >
            <p className="label-caption mb-10">Process</p>

            <div className="space-y-8">
              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                The process is deliberately unhurried. I begin with conversation,
                not mood boards. With questions, not assumptions. Understanding
                the texture of a brand -- its voice, its audience, its quiet
                ambitions -- takes time.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                From that foundation, visual language emerges naturally.
                Typography, color, spatial rhythm -- each element grows
                from the same root, creating systems that feel whole
                rather than assembled.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I prefer lasting relationships over quick transactions.
                The best outcomes happen when trust is built, and when
                both sides care enough to get the details right.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slowest, ease: easing.expoOut }}
            className="md:col-span-5 md:col-start-8 order-1 md:order-2 overflow-hidden"
          >
            <motion.div style={{ y: imgY }} className="will-change-transform">
              <img
                src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Studio detail"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClosingSection({
  onContact,
  onWork,
}: {
  onContact: () => void;
  onWork: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%] max-w-2xl"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-16" />

          <h2 className="font-serif text-display-2xl leading-[1.12] mb-10">
            If you value thoughtful work
            and honest conversation --
            I'd like to hear from you.
          </h2>

          <p className="text-body-lg text-stone-400 font-light leading-relaxed mb-16 max-w-md">
            Whether it's a new identity, a digital presence,
            or a visual system that needs rethinking.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button onClick={onContact} className="btn-primary">
              Say hello
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onWork} className="btn-outline">
              View the work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
