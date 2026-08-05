import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useIsDesktopExperience } from "../../hooks/useMediaQuery";
import styles from "./CustomCursor.module.css";

type CursorMode = "default" | "link" | "view";

export function CustomCursor() {
  const enabled = useIsDesktopExperience();
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 420, damping: 38, mass: 0.25 });
  const y = useSpring(mouseY, { stiffness: 420, damping: 38, mass: 0.25 });
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  useEffect(() => {
    if (!enabled || reduceMotion) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    document.body.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      if (!target) {
        setMode("default");
        return;
      }

      if (target.closest("[data-cursor='view']")) {
        setMode("view");
      } else if (target.closest("a, button, [data-cursor='link']")) {
        setMode("link");
      } else {
        setMode("default");
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, mouseX, mouseY, reduceMotion]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      className={`${styles.cursor} ${styles[mode]}`}
      aria-hidden="true"
      style={{
        transform,
        opacity: visible ? 1 : 0,
      }}
    >
      <span className={styles.star} />
      {mode === "view" ? <span className={styles.label}>View</span> : null}
    </motion.div>
  );
}
