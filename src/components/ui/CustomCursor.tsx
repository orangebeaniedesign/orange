import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'pointer' | 'view' | 'zoom' | 'hidden';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { stiffness: 300, damping: 25 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setIsVisible(true);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    if (isTouchDevice) return;

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorAttr === 'pointer' || target.closest('a, button')) {
        setVariant('pointer');
      } else if (cursorAttr === 'view') {
        setVariant('view');
      } else if (cursorAttr === 'zoom') {
        setVariant('zoom');
      } else if (cursorAttr === 'hidden') {
        setVariant('hidden');
      } else {
        setVariant('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, handleMouseMove]);

  if (isTouchDevice) return null;

  const getSize = () => {
    switch (variant) {
      case 'pointer': return 40;
      case 'view': return 80;
      case 'zoom': return 60;
      case 'hidden': return 0;
      default: return 10;
    }
  };

  const size = getSize();
  const showLabel = variant === 'view' || variant === 'zoom';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: isVisible ? 1 : 0,
            width: size,
            height: size,
          }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`
            rounded-full flex items-center justify-center
            ${variant === 'default' ? 'bg-charcoal' : ''}
            ${variant === 'pointer' ? 'border border-stone-600 bg-transparent' : ''}
            ${showLabel ? 'bg-charcoal' : ''}
          `}
        >
          {showLabel && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-cream uppercase tracking-wider font-medium"
            >
              {variant === 'view' ? 'View' : 'Zoom'}
            </motion.span>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
