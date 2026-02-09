import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './ui';
import type { PageType } from '../App';
import { easing } from '../lib/motion';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const navItems: { label: string; page: PageType }[] = [
  { label: 'Work', page: 'work' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavigate = (page: PageType) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-expo-out ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md border-b border-stone-200/60'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-gutter py-6 md:py-8">
          <Logo onClick={() => handleNavigate('home')} />

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`text-body-sm tracking-wide transition-colors duration-300 ${
                  currentPage === item.page
                    ? 'text-charcoal'
                    : 'text-stone-500 hover:text-charcoal'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-caption uppercase tracking-widest text-charcoal hover:text-stone-500 transition-colors"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easing.expoOut }}
            className="fixed inset-0 z-[100] bg-cream"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-gutter py-6">
                <Logo onClick={() => handleNavigate('home')} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-caption uppercase tracking-widest text-charcoal"
                >
                  Close
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center px-gutter">
                {[
                  { label: 'Home', page: 'home' as PageType },
                  ...navItems,
                  { label: 'Visual', page: 'visual' as PageType },
                ].map((item, index) => (
                  <motion.button
                    key={item.page}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.06,
                      ease: easing.expoOut,
                    }}
                    onClick={() => handleNavigate(item.page)}
                    className={`block text-left py-4 font-serif text-display-2xl transition-colors duration-300 ${
                      currentPage === item.page
                        ? 'text-stone-400'
                        : 'text-charcoal hover:text-stone-500'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="px-gutter py-8 border-t border-stone-200">
                <span className="text-body-sm text-stone-500">
                  hello@orangebeanie.design
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
