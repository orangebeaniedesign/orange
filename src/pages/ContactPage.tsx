import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage({ onBack }: { onBack?: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!supabase) {
      setError('Database not configured.');
      setIsSubmitting(false);
      return;
    }

    const { error: submitError } = await supabase
      .from('contact_submissions')
      .insert(formData);

    if (submitError) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------- SUCCESS STATE ---------- */

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 mx-auto mb-8 border border-accent rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-display-lg text-offblack mb-6">
            Message received
          </h1>
          <p className="text-body-lg text-neutral-400 leading-relaxed">
            Thanks for reaching out. I’ll review your message and get back to you
            within <strong>24–48 hours</strong>.
          </p>
        </motion.div>
      </div>
    );
  }

  /* ---------- FORM ---------- */

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-section px-gutter">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span
              variants={staggerItem}
              className="text-caption uppercase tracking-widest text-neutral-500 mb-8 block"
            >
              Contact
            </motion.span>

            <motion.h1
              variants={staggerItem}
              className="text-display-2xl text-offblack mb-8 max-w-3xl"
            >
              Let's start a project
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-body-xl text-neutral-400 max-w-xl"
            >
              I collaborate with brands and teams looking for clarity, strong
              visual systems and thoughtful execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-section px-gutter border-t border-neutral-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* FORM */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slower, ease: easing.expoOut }}
              className="mb-12"
            >
              <span className="text-caption uppercase tracking-widest text-neutral-500 mb-4 block">
                Project Enquiry
              </span>
              <h2 className="text-display-md text-offblack">
                Tell me about your idea
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <FormField label="Name" delay={0}>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-line"
                  placeholder="Your name"
                />
              </FormField>

              <FormField label="Email" delay={0.05}>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-line"
                  placeholder="your@email.com"
                />
              </FormField>

              <FormField label="Subject (optional)" delay={0.1}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-line"
                  placeholder="Brand identity, website, visual content…"
                />
              </FormField>

              <FormField label="Project details" delay={0.15}>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-line resize-none"
                  placeholder="What are you trying to build? Timeline, goals, scope…"
                />
              </FormField>

              {error && <p className="text-body-sm text-red-500">{error}</p>}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: duration.slow,
                  delay: 0.2,
                  ease: easing.expoOut,
                }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending…' : 'Send message'}
                  <Send className="w-4 h-4" />
                </button>
              </motion.div>
            </form>
          </div>

          {/* INFO */}
          <ContactInfo />
        </div>
      </section>

      <footer className="py-12 px-gutter border-t border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-body-sm text-neutral-400">
              OrangeBeanie Design
            </span>
          </div>
          <span className="text-caption text-neutral-600">
            Porto, Portugal
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function FormField({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slow, delay, ease: easing.expoOut }}
    >
      <label className="label-caption block mb-3">{label}</label>
      {children}
    </motion.div>
  );
}

function ContactInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slower, delay: 0.2, ease: easing.expoOut }}
      className="space-y-12 lg:pt-16"
    >
      <div>
        <span className="text-caption uppercase tracking-widest text-neutral-500 mb-6 block">
          Direct Contact
        </span>
        <div className="space-y-6">
          <a
            href="mailto:hello@orangebeanie.design"
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 border border-neutral-700 flex items-center justify-center group-hover:border-accent transition-colors">
              <Mail className="w-5 h-5 text-neutral-400 group-hover:text-accent transition-colors" />
            </div>
            <div>
              <p className="label-caption mb-1">Email</p>
              <p className="text-body-md text-offblack group-hover:text-accent transition-colors">
                hello@orangebeanie.design
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-neutral-700 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="label-caption mb-1">Location</p>
              <p className="text-body-md text-offblack">Porto, Portugal</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="text-caption uppercase tracking-widest text-neutral-500 mb-6 block">
          Social
        </span>
        {[
          { label: 'Instagram', url: 'https://instagram.com/orangebeanie' },
          { label: 'Vimeo', url: 'https://vimeo.com/orangebeanie' },
        ].map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-3 border-b border-neutral-800 group"
          >
            <span className="text-body-md text-offblack group-hover:text-accent">
              {social.label}
            </span>
            <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-accent" />
          </a>
        ))}
      </div>

      <div className="p-8 border border-neutral-800">
        <span className="text-caption uppercase tracking-widest text-neutral-500 mb-4 block">
          Availability
        </span>
        <p className="text-body-lg text-offblack mb-2">
          Currently accepting projects
        </p>
        <p className="text-body-sm text-neutral-500">
          Typical response time: 24–48 hours
        </p>
      </div>
    </motion.div>
  );
}
