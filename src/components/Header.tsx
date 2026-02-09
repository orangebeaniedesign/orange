import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Logo } from './ui';
import type { PageType } from '../App';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavigate = (page: PageType) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="flex items-center justify-between px-gutter py-8 lg:py-10 bg-offwhite/80 backdrop-blur">
          {/* LOGO (BIGGER) */}
          <div className="scale-[1.4] origin-left">
            <Logo onClick={() => handleNavigate('home')} />
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="text-caption uppercase tracking-widest text-offblack hover:text-neutral-500 transition-colors"
          >
            Menu
          </button>
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-offwhite"
          >
            <div className="flex flex-col h-full">
              {/* MENU HEADER */}
              <div className="flex items-center justify-between px-gutter py-8 border-b border-neutral-200">
                {/* LOGO (BIGGER) */}
                <div className="scale-[1.4] origin-left">
                  <Logo onClick={() => handleNavigate('home')} />
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* MENU NAV */}
              <nav className="flex-1 px-gutter py-24 max-w-6xl mx-auto w-full space-y-16">
                {([
                  { label: 'Home', page: 'home' as PageType },
                  { label: 'Work', page: 'work' as PageType },
                  { label: 'Visual', page: 'visual' as PageType },
                  { label: 'About', page: 'about' as PageType },
                  { label: 'Contact', page: 'contact' as PageType },
                ]).map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNavigate(item.page)}
                    className={`block text-display-xl text-left transition-colors ${
                      currentPage === item.page
                        ? 'text-neutral-400'
                        : 'text-offblack hover:text-neutral-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* MENU FOOTER */}
              <div className="px-gutter py-10 border-t border-neutral-200 text-caption uppercase tracking-widest text-neutral-500">
                hello@orangebeanie.design
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
