import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Artwork } from "../../data/artworks";
import { categoryMeta } from "../../data/artworks";
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const open = Boolean(artwork);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
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

      if (event.key === "Tab") {
        const dialog = document.getElementById("artwork-dialog");
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [artwork, artworks, onClose, onNavigate]);

  const duration = reduceMotion ? 0.12 : 0.28;

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
            id="artwork-dialog"
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={onClose}
              data-cursor="link"
            >
              Close
            </button>

            <div className={styles.imageWrap}>
              <img src={artwork.fullImage} alt={artwork.altText} />
            </div>

            <div className={styles.details}>
              <p className={styles.category}>
                {categoryMeta[artwork.category].title}
                {artwork.year ? ` · ${artwork.year}` : ""}
              </p>
              <h2 id={titleId} className={styles.title}>
                {artwork.title}
              </h2>
              {artwork.description ? (
                <p className={styles.description}>{artwork.description}</p>
              ) : null}

              <div className={styles.controls}>
                <button
                  type="button"
                  onClick={() => {
                    const index = artworks.findIndex(
                      (item) => item.id === artwork.id,
                    );
                    const prev =
                      artworks[(index - 1 + artworks.length) % artworks.length];
                    onNavigate(prev);
                  }}
                  data-cursor="link"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const index = artworks.findIndex(
                      (item) => item.id === artwork.id,
                    );
                    const next = artworks[(index + 1) % artworks.length];
                    onNavigate(next);
                  }}
                  data-cursor="link"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
