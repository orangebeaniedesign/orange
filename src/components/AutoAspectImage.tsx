import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easing } from "../lib/motion";

type Fit = "cover" | "contain";

export default function AutoAspectImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  fit = "cover",
  radius = 10,
  priority = false,
  animateIn = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fit?: Fit;
  radius?: number;
  priority?: boolean;
  animateIn?: boolean;
}) {
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth || 1;
      const h = img.naturalHeight || 1;
      setRatio(w / h);
    };
    img.onerror = () => {
      if (cancelled) return;
      setRatio(null);
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  const MotionImg: any = animateIn ? motion.img : "img";

  return (
    <div
      className={`relative overflow-hidden bg-stone-100 ${className}`}
      style={{
        borderRadius: radius,
        aspectRatio: ratio ? String(ratio) : "16 / 10", // fallback enquanto carrega
      }}
    >
      <MotionImg
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        initial={animateIn ? { scale: 1.03 } : undefined}
        animate={animateIn ? { scale: 1 } : undefined}
        transition={animateIn ? { duration: 1.6, ease: easing.expoOut } : undefined}
        className={`absolute inset-0 h-full w-full ${
          fit === "cover" ? "object-cover" : "object-contain"
        } ${imgClassName}`}
      />
    </div>
  );
}
