import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { useScrollRoot } from "../../hooks/useScrollRoot";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child */
  stagger?: number;
  /**
   * Intersection amount. Prefer "some" for wide horizontal sections
   * so they don't fade out while still on screen.
   */
  amount?: number | "some" | "all";
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  as?: "div" | "li";
};

export function revealItemVariants(x = 0, y = 26): Variants {
  return {
    hidden: {
      opacity: 0,
      x,
      y,
      transition: {
        duration: 0.38,
        ease: [0.4, 0, 1, 1],
      },
    },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

/**
 * Parent for staggered enter / reverse-exit.
 * Direct animated children should be RevealItem.
 */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.14,
  amount = 0.4,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();
  const scrollRoot = useScrollRoot();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount,
    root: scrollRoot ?? undefined,
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      variants={{
        hidden: {
          transition: {
            staggerChildren: Math.max(0.07, stagger * 0.7),
            staggerDirection: -1,
          },
        },
        shown: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** One beat in a RevealGroup sequence */
export function RevealItem({
  children,
  className = "",
  x = 0,
  y = 26,
  as = "div",
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const variants = revealItemVariants(x, y);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "variants">;

/** Single-block reveal when stagger is not needed */
export function Reveal({
  children,
  className = "",
  delay = 0,
  x = 0,
  y = 22,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const scrollRoot = useScrollRoot();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.4,
    root: scrollRoot ?? undefined,
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      variants={revealItemVariants(x, y)}
      transition={
        inView
          ? { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.36, ease: [0.4, 0, 1, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
