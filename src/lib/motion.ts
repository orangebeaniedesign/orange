import { Variants, Transition } from 'framer-motion';

export const easing = {
  expoOut: [0.16, 1, 0.3, 1],
  expoIn: [0.7, 0, 0.84, 0],
  expoInOut: [0.87, 0, 0.13, 1],
  smooth: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.1, 0.25, 1],
};

export const duration = {
  fast: 0.35,
  normal: 0.7,
  slow: 1.0,
  slower: 1.4,
  slowest: 1.8,
};

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: easing.expoOut,
      when: 'beforeChildren',
      staggerChildren: 0.12,
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
  hidden: { opacity: 0, y: 20 },
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
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: easing.expoOut,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.slower,
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
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
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
