import { Variants, Transition } from 'framer-motion';

export const easing = {
  expoOut: [0.16, 1, 0.3, 1],
  expoIn: [0.7, 0, 0.84, 0],
  expoInOut: [0.87, 0, 0.13, 1],
  smooth: [0.4, 0, 0.2, 1],
};

export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  slower: 1.2,
  slowest: 1.6,
};

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: easing.expoOut,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: duration.fast,
      ease: easing.expoIn,
    },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: easing.expoOut,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: easing.expoOut,
    },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: easing.expoOut,
    },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slower,
      ease: easing.expoOut,
    },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slower,
      ease: easing.expoOut,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.slower,
      ease: easing.expoOut,
    },
  },
};

export const slideUp: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: duration.slowest,
      ease: easing.expoOut,
    },
  },
};

export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: duration.slowest,
      ease: easing.expoOut,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.expoOut,
    },
  },
};

export const createStaggerDelay = (index: number, base = 0.08): Transition => ({
  delay: index * base,
  duration: duration.slow,
  ease: easing.expoOut,
});
