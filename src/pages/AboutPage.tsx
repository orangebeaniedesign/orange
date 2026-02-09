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
          About me
          <br />
          <em className="italic">Orange Beanie Design</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: easing.expoOut }}
          className="mt-14 md:mt-18 md:ml-[30%] max-w-lg"
        >
          <p className="text-body-xl text-stone-500 font-light leading-relaxed">
            I’m a freelance graphic designer with a passion for creating bold, story-driven visuals that connect. My work spans branding, editorial, motion design, 3D, photography, and video — always guided by a love for meaningful design and strong visual identity.
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
              The name Orange Beanie Design comes from one unforgettable moment. After dreaming for 15 years of seeing my favorite band, McFly, I finally did — and ended up playing drums with them on stage. The bassist pointed me out in the crowd and said, “the girl with the orange beanie.” That moment captured everything I believe in as a creative: standing out, showing up, and turning passion into something real.
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
              Design, for me, is just that, 
               <br />a way to turn ideas into moments that leave a mark.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slower, delay: 0.2, ease: easing.expoOut }}
              className="space-y-8 max-w-xl"
            >
              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I work across motion design, web design, and branding — often blending
                visual storytelling with systems thinking. I like work that feels precise,
                human, and intentionally crafted.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                My practice sits between strategy and aesthetics. Sometimes that means
                building a brand identity from the ground up. Other times it’s shaping a
                website experience, or giving a message rhythm through motion.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I collaborate with studios, cultural projects, and independent businesses
                who believe design isn’t decoration — it’s clarity, feeling, and direction
                made visible.
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
      heading: 'Clarity',
      text: 'Good design makes things easier to understand — visually, emotionally, and functionally.',
    },
    {
      heading: 'Craft',
      text: 'Details matter. Typography, pacing, and composition are where the work becomes believable.',
    },
    {
      heading: 'Motion',
      text: 'Movement isn’t decoration — it’s communication. It guides attention and adds meaning over time.',
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
              A few principles that
              shape the work.
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
            <p className="label-caption mb-10">How I work</p>

            <div className="space-y-8">
              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                My process starts with conversation, not assumptions. I want to understand
                the goal, the audience, the constraints — and what the brand should feel
                like when people meet it.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                From there, I build a visual language that can live across formats:
                identity, web, and motion. When it helps, I use code to bridge design and
                implementation so things translate cleanly.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I’m building my freelance practice with long-term collaboration in mind.
                The best work happens when there’s trust, shared taste, and time to get
                the details right.
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
            and clear communication —
            I’d love to hear from you.
          </h2>

          <p className="text-body-lg text-stone-400 font-light leading-relaxed mb-16 max-w-md">
            Whether it’s motion for a campaign, a website refresh,
            or a brand identity built with care.
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
