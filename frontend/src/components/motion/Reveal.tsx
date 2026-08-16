import { motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useApp } from "../../lib/AppContext";

interface RevealProps {
  children: ReactNode;
  /** Stagger index — 0.1s between items */
  index?: number;
  delay?: number;
  className?: string;
}

/**
 * Animates `.default-header .col-row` (and the section right after the
 * header) from opacity 0 / y 1em / blur / scale .975 into place with a
 * 1.4s expo-out and 0.1s stagger on page enter.
 *
 * The animation only plays on the very first page enter (when `pageEntered`
 * flips false → true). Pages mounted after that render fully visible —
 * otherwise the transition overlay would expose their hidden state and the
 * route change would look like a blank screen.
 */
export function Reveal({ children, index = 0, delay = 0.2, className }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const { pageEntered } = useApp();
  const enteredAtMount = useRef(pageEntered);

  if (reduced || enteredAtMount.current) {
    return <div className={className}>{children}</div>;
  }

  const hidden = { opacity: 0, y: "1em", filter: "blur(0.25em)", scale: 0.975, rotate: 0.001 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={pageEntered ? { opacity: 1, y: "0em", filter: "blur(0em)", scale: 1, rotate: 0.001 } : hidden}
      transition={{ duration: 1.4, ease: EASE.expoOut, delay: delay + index * 0.1 }}
    >
      {children}
    </motion.div>
  );
}
