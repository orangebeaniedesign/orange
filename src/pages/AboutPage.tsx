import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easing, duration } from "../lib/motion";

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
          transition={{ duration: 1, delay: 0.25, ease: easing.expoOut }}
          className="label-caption mb-10 md:mb-14"
        >
          About
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.45, ease: easing.expoOut }}
          className="text-hero leading-[0.98] max-w-5xl"
        >
          I’m Orange Beanie —
          <br />
          a multidisciplinary <em className="italic">visual maker</em>.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, delay: 0.85, ease: easing.expoOut }}
          className="mt-14 md:mt-18 md:ml-[30%] max-w-lg"
        >
          <p className="text-body-xl text-stone-600 font-light leading-relaxed">
            I design brands, build visuals, and shoot images — sometimes tidy,
            sometimes weird. I’m into projects with taste, personality, and a
            bit of risk (the good kind).
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Branding", "Digital", "Motion", "3D", "Photography", "Video"].map((t) => (
              <span
                key={t}
                className="text-overline uppercase tracking-[0.14em] px-3 py-1 border border-charcoal/10 text-charcoal/70"
                style={{ borderRadius: 10 }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PortraitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section ref={ref} className="px-gutter pb-section-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
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
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: duration.slower,
              delay: 0.25,
              ease: easing.expoOut,
            }}
            className="md:col-span-4 md:col-start-9 flex flex-col justify-end"
          >
            <p className="label-caption mb-6">Why “Orange Beanie”?</p>

            <p className="text-body-lg text-stone-600 font-light leading-relaxed">
              The name comes from one very specific moment: after 15 years of
              dreaming about seeing McFly live, I finally did — and ended up
              playing drums with them on stage. The bassist pointed at me and
              said: “the girl with the orange beanie.”
              <span className="block mt-6">
                That’s the whole vibe: show up, stand out, and turn obsession
                into something real.
              </span>
            </p>

            <div className="mt-10 w-12 h-px bg-stone-300" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatementSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

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
              The journey
            </motion.p>
          </div>

          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slowest, ease: easing.expoOut }}
              className="text-display-xl leading-[1.18] mb-10"
            >
              Design is how I translate ideas into things people actually feel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: duration.slower,
                delay: 0.15,
                ease: easing.expoOut,
              }}
              className="space-y-8 max-w-xl"
            >
              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I started in Multimedia, playing with image, video, and visual
                communication. Later I studied Audiovisual &amp; Multimedia and
                got deeper into motion, branding, and digital design.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I did internships in 3D and graphic design, then freelanced with
                Dope Digital Agency, and joined A Cor Laranja — growing from
                intern to full-time designer working across branding, print, and
                visual systems.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                Today I work mostly with brands (because that’s where I’ve got
                the reps), but I’m actively building space for more experimental,
                alternative collaborations too.
              </p>

              <p className="text-body-md text-stone-500 font-light leading-relaxed">
                Madeira-based, working worldwide.
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { heading: "Clarity", text: "Make it understandable. Make it feel right. (Then make it look great.)" },
    { heading: "Craft", text: "Typography, pacing, composition — the tiny choices are the whole thing." },
    { heading: "Motion", text: "Movement isn’t decoration. It’s timing, tension and meaning over time." },
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
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slowest, ease: easing.expoOut }}
              className="text-display-2xl leading-[1.12]"
            >
              A few rules I break
              <br />
              (and the ones I don’t).
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-14">
          {values.map((value, index) => (
            <motion.div
              key={value.heading}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slower, delay: 0.15 + index * 0.1, ease: easing.expoOut }}
            >
              <div className="w-8 h-[1px] bg-stone-300 mb-8" />
              <h3 className="text-display-md mb-5">{value.heading}</h3>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={ref} className="py-section-lg px-gutter">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slower, delay: 0.12, ease: easing.expoOut }}
            className="md:col-span-5 md:col-start-1 order-2 md:order-1"
          >
            <p className="label-caption mb-10">How I work</p>

            <div className="space-y-8">
              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I start with a conversation — not assumptions. I want to know the
                goal, the audience, the constraints, and what the project should
                feel like when people meet it.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                Then I build a visual language that can live across formats:
                identity, web, motion, and image. When it helps, I use code to
                bridge design and implementation so details translate cleanly.
              </p>

              <p className="text-body-lg text-stone-600 font-light leading-relaxed">
                I’m best in long-term collaborations — shared taste + trust + time.
                That’s where the good stuff happens.
              </p>
            </div>

            <div className="mt-10">
              <button
                onClick={onWork}
                className="text-body-sm text-stone-500 hover:text-charcoal transition-colors duration-500 underline-weird"
              >
                See projects
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-section-lg px-gutter border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slowest, ease: easing.expoOut }}
          className="md:ml-[16%] max-w-2xl"
        >
          <div className="w-10 h-[1px] bg-stone-300 mb-16" />

          <h2 className="text-display-2xl leading-[1.12] mb-8">
            Want to build something
            <br />
            clean, bold, and a bit unexpected?
          </h2>

          <p className="text-body-lg text-stone-500 font-light leading-relaxed mb-14 max-w-md">
            If you’ve got a brand, a project, or an idea that needs a visual
            world — I’m in.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button onClick={onContact} className="btn-primary">
              Say hello
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onWork} className="btn-outline">
              View work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
