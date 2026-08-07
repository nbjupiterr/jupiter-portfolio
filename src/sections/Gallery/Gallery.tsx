import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArtworkCard } from "../../components/ArtworkCard/ArtworkCard";
import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { RevealGroup, RevealItem } from "../../components/Reveal/Reveal";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import {
  artworksByCategory,
  categoryMeta,
  categoryOrder,
  type Artwork,
  type ArtworkCategory,
} from "../../data/artworks";
import styles from "./Gallery.module.css";

type GalleryProps = {
  onSelect: (artwork: Artwork) => void;
  onFilterChange?: (pieces: Artwork[]) => void;
};

const DEFAULT_FILTER: ArtworkCategory = "design";
const PREVIEW_COUNT = 4;

const filters = categoryOrder.map((id) => ({
  id,
  label: categoryMeta[id].title,
}));

function pinScrollerToGallery() {
  const gallery = document.getElementById("gallery");
  const scroller = document.querySelector<HTMLElement>(
    "[data-horizontal-scroller='true']",
  );
  if (!gallery || !scroller) return;
  scroller.scrollLeft = gallery.offsetLeft;
}

export function Gallery({ onSelect, onFilterChange }: GalleryProps) {
  const [filter, setFilter] = useState<ArtworkCategory>(DEFAULT_FILTER);
  const [expanded, setExpanded] = useState(false);
  const pinAfterFilter = useRef(false);
  const reduceMotion = useReducedMotion();

  const pieces = useMemo(() => artworksByCategory(filter), [filter]);
  const preview = pieces.slice(0, PREVIEW_COUNT);
  const rest = expanded ? pieces.slice(PREVIEW_COUNT) : [];
  const hiddenCount = Math.max(0, pieces.length - PREVIEW_COUNT);

  useLayoutEffect(() => {
    if (!pinAfterFilter.current) return;
    pinAfterFilter.current = false;
    pinScrollerToGallery();
    const id = window.requestAnimationFrame(() => {
      pinScrollerToGallery();
      window.requestAnimationFrame(pinScrollerToGallery);
    });
    return () => window.cancelAnimationFrame(id);
  }, [filter, pieces, expanded]);

  const handleFilter = (next: ArtworkCategory) => {
    if (next === filter) return;
    pinAfterFilter.current = true;
    pinScrollerToGallery();
    setExpanded(false);
    setFilter(next);
    onFilterChange?.(artworksByCategory(next));
  };

  const toggleMore = () => {
    pinAfterFilter.current = true;
    pinScrollerToGallery();
    setExpanded((value) => !value);
  };

  return (
    <SectionShell id="gallery" numeral="IV" fluid className={styles.shell}>
      <div className={styles.layout}>
        <div className={styles.stickyChrome}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>Art Archive</p>
            <h2 id="gallery-title">Gallery</h2>
            <DecoDivider variant="crest" />
          </div>

          <div
            className={styles.filters}
            role="tablist"
            aria-label="Artwork categories"
          >
            {filters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`${styles.filter} ${active ? styles.filterActive : ""}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleFilter(item.id)}
                  data-cursor="link"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <RevealGroup className={styles.row} stagger={0.12} amount="some">
          {preview.map((artwork) => (
            <RevealItem key={artwork.id} className={styles.cell} y={22}>
              <ArtworkCard artwork={artwork} onSelect={onSelect} />
            </RevealItem>
          ))}

          {!expanded && hiddenCount > 0 ? (
            <RevealItem className={styles.moreWrap} y={16}>
              <button
                type="button"
                className={styles.moreBtn}
                onClick={toggleMore}
                data-cursor="link"
                aria-label={`See ${hiddenCount} more artworks`}
              >
                See more
              </button>
            </RevealItem>
          ) : null}

          <AnimatePresence initial={false}>
            {rest.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                className={styles.cell}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: 12 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ArtworkCard artwork={artwork} onSelect={onSelect} />
              </motion.div>
            ))}
          </AnimatePresence>

          {expanded && hiddenCount > 0 ? (
            <button
              type="button"
              className={styles.lessLink}
              onClick={toggleMore}
              data-cursor="link"
            >
              Show less
            </button>
          ) : null}
        </RevealGroup>
      </div>
    </SectionShell>
  );
}
