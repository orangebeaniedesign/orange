import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Play } from 'lucide-react';
import { useProjects } from '../hooks/usePortfolioData';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

interface VisualPageProps {
  onBack?: () => void;
  onProjectClick?: (id: string) => void;
  onContact?: () => void;
}

export default function VisualPage({ onProjectClick, onContact }: VisualPageProps) {
  const { projects, loading } = useProjects('photography');

  return (
    <div className="min-h-screen">
      <HeroSection />

      <MotionReelSection />

      <section className="py-section-lg">
        <div className="px-gutter mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easing.expoOut }}
            >
              <span className="text-caption uppercase tracking-widest text-neutral-500 mb-4 block">
                Gallery
              </span>
              <h2 className="text-display-xl text-offblack">Visual Work</h2>
            </motion.div>
          </div>
        </div>

        {loading ? (
          <div className="px-gutter">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-neutral-200 animate-pulse" />
              ))}
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-body-lg text-neutral-500">Visual work coming soon.</p>
          </div>
        ) : (
          <MoodboardGallery projects={projects} onProjectClick={onProjectClick} />
        )}
      </section>

      <MotionLoopsSection />

      <section className="py-section-lg px-gutter border-t border-neutral-200">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span variants={staggerItem} className="text-caption uppercase tracking-widest text-neutral-500 mb-6 block">
              Collaboration
            </motion.span>
            <motion.h2 variants={staggerItem} className="text-display-xl text-offblack mb-6">
              Interested in visual work?
            </motion.h2>
            <motion.p variants={staggerItem} className="text-body-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
              Open to collaborations on motion, photography, and audiovisual projects.
            </motion.p>
            <motion.div variants={staggerItem}>
              <button onClick={onContact} className="btn-primary" data-cursor="pointer">
                Start a conversation
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ scale: videoScale, opacity: videoOpacity }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-offwhite/70 via-offwhite/50 to-offblack" />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 min-h-screen flex flex-col justify-end px-gutter pb-24">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-5xl">
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-caption uppercase tracking-widest text-neutral-300">Visual & Audiovisual</span>
          </motion.div>

          <motion.h1 variants={staggerItem} className="text-hero text-offblack mb-6">
            Visual
            <br />
            <span className="text-neutral-400">Culture</span>
          </motion.h1>

          <motion.p variants={staggerItem} className="text-display-sm text-neutral-300 max-w-2xl leading-relaxed font-light">
            A dedicated space for motion, photography and audiovisual experimentation.
            Where images move, sounds resonate, and atmospheres emerge.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MotionReelSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={ref} className="py-section-lg">
      <div className="px-gutter mb-12">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <span className="text-caption uppercase tracking-widest text-neutral-500 mb-4 block">Motion Reel</span>
            <h2 className="text-display-lg text-offblack">In Movement</h2>
          </div>
          <span className="text-caption text-neutral-600 hidden md:block">2024</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slower, ease: easing.expoOut }}
        className="relative aspect-[21/9] overflow-hidden group"
      >
        <motion.div style={{ y }} className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source
              src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-offwhite/20 group-hover:bg-offwhite/40 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Play className="w-10 h-10 text-offblack ml-1" fill="currentColor" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

interface MoodboardGalleryProps {
  projects: { id: string; title: string; image_url: string }[];
  onProjectClick: (id: string) => void;
}

function MoodboardGallery({ projects, onProjectClick }: MoodboardGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-gutter">
        {projects.slice(0, 4).map((project, index) => (
          <MoodboardItem
            key={project.id}
            project={project}
            index={index}
            size={index === 0 ? 'large' : 'normal'}
            onClick={() => onProjectClick(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

function MoodboardItem({
  project,
  index,
  size,
  onClick,
}: {
  project: { id: string; title: string; image_url: string };
  index: number;
  size: 'normal' | 'large';
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slower, delay: index * 0.08, ease: easing.expoOut }}
      onClick={onClick}
      className={`group relative overflow-hidden ${size === 'large' ? 'col-span-2 row-span-2' : ''}`}
    >
      <div className={`relative ${size === 'large' ? 'aspect-square' : 'aspect-[4/5]'}`}>
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-offwhite/0 group-hover:bg-offwhite/40 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center justify-between w-full">
            <span className="text-body-sm text-offblack font-medium">{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-offblack" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function MotionLoopsSection() {
  const loops = [
    { title: 'Abstract Forms', duration: '0:08' },
    { title: 'Typography in Motion', duration: '0:12' },
    { title: 'Color Study', duration: '0:06' },
  ];

  return (
    <section className="py-section-lg px-gutter border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing.expoOut }}
          className="mb-16"
        >
          <span className="text-caption uppercase tracking-widest text-neutral-500 mb-4 block">
            Motion Loops
          </span>
          <h2 className="text-display-lg text-offblack">Experimental Work</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {loops.map((loop, index) => (
            <MotionLoopCard key={loop.title} loop={loop} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MotionLoopCard({
  loop,
  index,
}: {
  loop: { title: string; duration: string };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slower, delay: index * 0.1, ease: easing.expoOut }}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden mb-6">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-offwhite/0 group-hover:bg-offwhite/30 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
            <Play className="w-5 h-5 text-offblack ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-body-lg text-offblack group-hover:text-accent transition-colors">
          {loop.title}
        </h3>
        <span className="text-caption text-neutral-500">{loop.duration}</span>
      </div>
    </motion.div>
  );
}
