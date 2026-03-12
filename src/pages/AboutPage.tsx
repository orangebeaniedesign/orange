import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface AboutPageProps {
  onContact: () => void;
  onWork: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutPage({ onContact, onWork }: AboutPageProps) {
  return (
    <article className="bg-[#f6f4ef] text-[#111111]">
      <IntroSection />
      <ImageStorySection />
      <ExperienceSection />
      <MethodSection onWork={onWork} />
      <ClosingSection onContact={onContact} onWork={onWork} />
    </article>
  );
}

function IntroSection() {
  return (
    <section className="px-5 pb-14 pt-32 md:px-8 md:pb-18 md:pt-40 lg:px-10 lg:pb-20 lg:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease }}
            >
              <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/62">
                02/About
              </div>

              <h1
                className="max-w-[9ch] text-[18vw] font-semibold leading-[0.84] tracking-[-0.08em] md:text-[108px] lg:text-[148px]"
                style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
              >
                Playful,
                <br />
                sharp,
                <br />
                human.
              </h1>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.08, ease }}
              className="max-w-[34ch] text-[16px] leading-7 text-[#111111]/72"
            >
              I’m Claudia Brito, the person behind Orange Beanie — a Madeira-based
              designer and photographer working across branding, digital design,
              motion, image-making, and visual systems with personality.
            </motion.p>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-8 lg:col-span-3 lg:col-start-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.16, ease }}
              className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.16em] text-[#111111]/62"
            >
              <span>Branding</span>
              <span>Digital</span>
              <span>Photography</span>
              <span>Motion</span>
              <span>Visual direction</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageStorySection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", prefersReducedMotion ? "0%" : "8%"]
  );

  return (
    <section ref={ref} className="px-5 pb-16 md:px-8 md:pb-24 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.82, ease }}
              className="overflow-hidden"
            >
              <motion.div style={{ y: imageY }} className="will-change-transform">
                <img
                  src="/about/about.jpg"
                  alt="Orange Beanie portrait"
                  className="aspect-[4/5] w-full object-cover grayscale"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
                Orange Beanie
              </div>

              <p className="text-[15px] leading-7 text-[#111111]/74">
                The name comes from one very specific memory: after years of wanting
                to see McFly live, I finally did — and ended up on stage playing
                drums with them. The bassist pointed at me and said,
                <span className="italic"> “the girl with the orange beanie.”</span>
              </p>

              <p className="mt-6 text-[15px] leading-7 text-[#111111]/74">
                It stuck because it felt right. A bit odd, easy to remember,
                personal, and full of energy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="px-5 pb-16 md:px-8 md:pb-24 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="col-span-12 md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease }}
              className="text-[11px] uppercase tracking-[0.16em] text-[#111111]/50"
            >
              Background
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.82, ease }}
              className="text-[clamp(24px,2.8vw,40px)] leading-[1.45] tracking-[-0.025em] text-[#111111]/82"
            >
              I started in multimedia, then moved deeper into branding, motion,
              digital design, and visual communication. Over time I worked through
              internships, freelance collaborations, agency projects, and studio work
              — building a practice that moves between systems and instinct.
            </motion.p>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-3 lg:col-start-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="space-y-5 text-[14px] leading-6 text-[#111111]/66"
            >
              <p>
                I’ve worked with brands, campaigns, print, motion, web, and image-led
                systems — always trying to make the work feel clear and alive at the
                same time.
              </p>
              <p>
                Today I’m especially interested in long-term collaborations and
                projects with a bit of edge, warmth, or cultural texture.
              </p>
              <p>Madeira-based, working worldwide.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodSection({ onWork }: { onWork: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      title: "Clarity",
      text: "Make the idea understandable without flattening its personality.",
    },
    {
      title: "Tension",
      text: "The interesting part usually lives between polished and a little strange.",
    },
    {
      title: "Craft",
      text: "Typography, image rhythm, motion, spacing — the details are the work.",
    },
  ];

  return (
    <section ref={ref} className="px-5 pb-16 md:px-8 md:pb-24 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 grid grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
              Method
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="max-w-[12ch] text-[clamp(36px,6vw,90px)] font-semibold leading-[0.92] tracking-[-0.06em]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              A few things I keep coming back to.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 border-t border-black/12 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.06 + index * 0.06, ease }}
              className="border-b border-black/12 py-7 md:border-b-0 md:border-r md:px-6 md:py-8 last:md:border-r-0"
            >
              <div className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#111111]/46">
                0{index + 1}
              </div>
              <h3 className="text-[28px] leading-[1] tracking-[-0.04em] text-[#111111]">
                {value.title}
              </h3>
              <p className="mt-4 max-w-[28ch] text-[14px] leading-6 text-[#111111]/66">
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.76, delay: 0.16, ease }}
          onClick={onWork}
          className="mt-8 inline-flex items-center gap-2 text-[13px] underline underline-offset-[0.18em] transition-opacity duration-300 hover:opacity-60"
        >
          See selected work
          <ArrowUpRight className="h-3.5 w-3.5" />
        </motion.button>
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
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="border-t border-black/12 px-5 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="grid grid-cols-12 gap-y-8 md:gap-x-8"
        >
          <div className="col-span-12 md:col-span-8">
            <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
              Next
            </div>

            <h2
              className="max-w-[10ch] text-[clamp(38px,7vw,110px)] font-semibold leading-[0.9] tracking-[-0.07em]"
              style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}
            >
              Want to make
              <br />
              something fun?
            </h2>
          </div>

          <div className="col-span-12 md:col-span-4 md:pt-2">
            <p className="max-w-[28ch] text-[14px] leading-6 text-[#111111]/68">
              If you’ve got a project, brand, campaign, or visual idea that needs
              shape and character, let’s talk.
            </p>

            <div className="mt-8 flex flex-col gap-4 text-[11px] uppercase tracking-[0.16em] text-[#111111]/62">
              <button
                onClick={onContact}
                className="text-left transition-opacity duration-300 hover:opacity-60"
              >
                Contact
              </button>
              <button
                onClick={onWork}
                className="text-left transition-opacity duration-300 hover:opacity-60"
              >
                Work
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}