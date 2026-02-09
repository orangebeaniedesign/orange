import { motion } from 'framer-motion';
import logoHorizontal from '../../assets/logo-horizontal copy copy.svg';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export function Logo({ onClick, className = '' }: LogoProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex items-center hover:opacity-80 transition-opacity ${className}`}
      aria-label="Orange Beanie Design"
      type="button"
    >
      <img
        src={logoHorizontal}
        alt="Orange Beanie Design"
        className="h-10 md:h-12 w-auto"
      />
    </motion.button>
  );
}
