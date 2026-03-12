import { motion } from "framer-motion";
import logoHorizontal from "../../assets/logo-horizontal copy copy.svg";

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export function Logo({ onClick, className = "" }: LogoProps) {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      aria-label="Orange Beanie"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group inline-flex items-center transition-opacity duration-300 hover:opacity-70 ${className}`}
    >
      <img
        src={logoHorizontal}
        alt="Orange Beanie"
        className="h-7 md:h-8 lg:h-9 w-auto"
        draggable="false"
      />
    </motion.button>
  );
}