import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  bindScrollDirection,
  getScrollDirection,
} from "../../hooks/scrollDirection";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  as?: "div" | "li";
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number | "some" | "all";
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

/**
 * Open on the way forward, close on the way back:
 * - L?R: fade in when entering the screen; keep open (no close while going forward)
 * - R?L: fade out while leaving the screen (still visible so you see it close)
 *
 * Uses the browser viewport as IO root so horizontal-scroller clipping works.
 */
function useScrollOpenClose() {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    bindScrollDirection();

    const ENTER = 0.15;
    const EXIT = 0.4;

    const apply = (ratio: number, intersecting: boolean) => {
      const dir = getScrollDirection();

      if (intersecting && ratio >= ENTER) {
        setOpen(true);
        return;
      }

      // Only close while scrolling back, and while still partly on screen
      if (dir < 0 && (!intersecting || ratio < EXIT)) {
        setOpen(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        apply(entry.intersectionRatio, entry.isIntersecting);
      },
      {
        root: null,
        threshold: [0, 0.08, 0.15, 0.25, 0.4, 0.55, 0.75, 1],
      },
    );

    observer.observe(node);

    // Sync current state on mount (e.g. already on screen)
    const rect = node.getBoundingClientRect();
    const vw = window.innerWidth || 1;
    const visible = Math.max(
      0,
      Math.min(rect.right, vw) - Math.max(rect.left, 0),
    );
    const ratio = rect.width > 0 ? visible / rect.width : 0;
    apply(ratio, ratio > 0);

    return () => observer.disconnect();
  }, []);

  return { ref, open };
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
  shown: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function RevealGroup({
  children,
  className = "",
  stagger = 0.12,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();
  const { ref, open } = useScrollOpenClose();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref as never}
      className={className}
      initial="hidden"
      animate={open ? "shown" : "hidden"}
      variants={{
        hidden: {
          transition: {
            staggerChildren: Math.max(0.08, stagger * 0.85),
            staggerDirection: -1,
          },
        },
        shown: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.03,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  as = "div",
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { ref, open } = useScrollOpenClose();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{
        duration: open ? 0.45 : 0.5,
        delay: open ? delay : 0,
        ease: open ? "easeOut" : "easeIn",
      }}
    >
      {children}
    </MotionTag>
  );
}
