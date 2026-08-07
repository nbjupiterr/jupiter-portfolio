import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Artwork } from "../../data/artworks";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import styles from "./ArtworkModal.module.css";

type ArtworkModalProps = {
  artwork: Artwork | null;
  artworks: Artwork[];
  onClose: () => void;
  onNavigate: (artwork: Artwork) => void;
};

export function ArtworkModal({
  artwork,
  artworks,
  onClose,
  onNavigate,
}: ArtworkModalProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 899px)");
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const open = Boolean(artwork);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!artwork) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const index = artworks.findIndex((item) => item.id === artwork.id);
        if (index < 0) return;
        const nextIndex =
          event.key === "ArrowRight"
            ? (index + 1) % artworks.length
            : (index - 1 + artworks.length) % artworks.length;
        onNavigate(artworks[nextIndex]);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [artwork, artworks, onClose, onNavigate]);

  const duration = reduceMotion ? 0.12 : 0.38;
  const motionInitial =
    reduceMotion || isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.96 };
  const motionAnimate = isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 };
  const motionExit =
    reduceMotion || isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.98 };

  return (
    <AnimatePresence>
      {artwork ? (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            id="artwork-dialog"
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            initial={motionInitial}
            animate={motionAnimate}
            exit={motionExit}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id={titleId} className={styles.visuallyHidden}>
              {artwork.title}
            </h2>

            <figure className={styles.frame}>
              <img src={artwork.fullImage} alt={artwork.altText} />
            </figure>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
