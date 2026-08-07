import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DecoDivider } from "../DecoDivider/DecoDivider";
import { Wordmark } from "../Wordmark/Wordmark";
import styles from "./LoadingScreen.module.css";

type LoadingScreenProps = {
  visible: boolean;
  progress: number;
};

export function LoadingScreen({ visible, progress }: LoadingScreenProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.35 }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className={styles.inner}>
            <img
              className={`${styles.seal} orbit-motion`}
              src="/assets/artdeco/star.svg"
              alt=""
              aria-hidden="true"
            />
            <Wordmark size="section" interactive={false} />
            <DecoDivider variant="diamond" />
            <div className={styles.track} aria-hidden="true">
              <div
                className={styles.fill}
                style={{ width: `${Math.min(100, Math.round(progress))}%` }}
              />
            </div>
            <p className={styles.percent}>
              {Math.min(100, Math.round(progress))}%
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
