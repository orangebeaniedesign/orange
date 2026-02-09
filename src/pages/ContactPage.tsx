import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, ArrowUpRight, MapPin, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { easing, duration, staggerContainer, staggerItem } from '../lib/motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
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

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slower, ease: easing.expoOut }}
          className="text-center max-w-lg"
        >
          <div className="w-14 h-14 mx-auto mb-8 border border-stone-300 rounded-full flex items-center justify-center">
            <Send className="w-5 h-5 text-stone-600" />
          </div>
          <h1 className="font-serif text-display-lg text-charcoal mb-6">
            Message received
          </h1>
          <p className="text-body-lg text-stone-500 font-light leading-relaxed">
            Thanks for reaching out. I'll review your message and
            get back to you within 24-48 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <section className="pt-40 md:pt-48 pb-section px-gutter">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={staggerItem} className="label-caption mb-8">
              Contact
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-serif text-hero max-w-3xl"
            >
              Let's start a
              <br />
              <em className="italic">conversation</em>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-body-xl text-stone-500 max-w-xl mt-8 font-light"
            >
              I collaborate with brands and teams looking for clarity,
              strong visual systems, and thoughtful execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-section px-gutter border-t border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FormSection
            formData={formData}
            isSubmitting={isSubmitting}
            error={error}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
          <ContactInfo />
        </div>
      </section>
    </article>
  );
}

function FormSection({
  formData,
  isSubmitting,
  error,
  onSubmit,
  onChange,
}: {
  formData: FormData;
  isSubmitting: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slower, ease: easing.expoOut }}
    >
      <p className="label-caption mb-10">Project enquiry</p>

      <form onSubmit={onSubmit} className="space-y-10">
        <div>
          <label className="label-caption block mb-3">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={onChange}
            className="input-field"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="label-caption block mb-3">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={onChange}
            className="input-field"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="label-caption block mb-3">Subject</label>
          <input
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={onChange}
            className="input-field"
            placeholder="Brand identity, website, visual content..."
          />
        </div>

        <div>
          <label className="label-caption block mb-3">Project details</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={onChange}
            className="input-field resize-none"
            placeholder="Tell me about your project, timeline, and goals..."
          />
        </div>

        {error && <p className="text-body-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
          <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}

function ContactInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const socials = [
    { label: 'Instagram', url: 'https://instagram.com/orangebeanie' },
    { label: 'Vimeo', url: 'https://vimeo.com/orangebeanie' },
    { label: 'Behance', url: 'https://behance.net/orangebeanie' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slower, delay: 0.15, ease: easing.expoOut }}
      className="space-y-12 lg:pt-4"
    >
      <div>
        <p className="label-caption mb-6">Direct</p>
        <div className="space-y-6">
          <a
            href="mailto:hello@orangebeanie.design"
            className="flex items-center gap-4 group"
          >
            <div className="w-11 h-11 border border-stone-300 rounded-full flex items-center justify-center group-hover:border-charcoal transition-colors duration-300">
              <Mail className="w-4 h-4 text-stone-500 group-hover:text-charcoal transition-colors" />
            </div>
            <div>
              <p className="label-caption mb-1">Email</p>
              <p className="text-body-md group-hover:text-stone-600 transition-colors">
                hello@orangebeanie.design
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 border border-stone-300 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-stone-500" />
            </div>
            <div>
              <p className="label-caption mb-1">Location</p>
              <p className="text-body-md">Porto, Portugal</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="label-caption mb-6">Social</p>
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 border-b border-stone-200 group"
          >
            <span className="text-body-md group-hover:text-stone-600 transition-colors">
              {social.label}
            </span>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-charcoal transition-colors" />
          </a>
        ))}
      </div>

      <div className="p-8 border border-stone-200">
        <p className="label-caption mb-3">Availability</p>
        <p className="text-body-lg font-light mb-2">
          Currently accepting projects
        </p>
        <p className="text-body-sm text-stone-500">
          Typical response time: 24-48 hours
        </p>
      </div>
    </motion.div>
  );
}
