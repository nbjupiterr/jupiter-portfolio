import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArtworkCard } from "../../components/ArtworkCard/ArtworkCard";
import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
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
const DESIGN_PREVIEW_COUNT = 6;

const filters = categoryOrder.map((id) => ({
  id,
  label: categoryMeta[id].title,
}));

const galleryTabNumerals = ["I", "II", "III", "IV"] as const;

function getScroller() {
  return document.querySelector<HTMLElement>(
    "[data-horizontal-scroller='true']",
  );
}

/** After the strip width changes, clamp scroll — do not snap to gallery start (causes tab jumps). */
function clampHorizontalScrollAfterLayout() {
  const scroller = getScroller();
  if (!scroller) return;
  const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  if (scroller.scrollLeft > max) {
    scroller.scrollLeft = max;
  }
}

/** Pull scroll back so the collapsed strip stays in the user’s view. */
function keepCollapsedGalleryInView(
  layout: HTMLElement | null,
  smooth: boolean,
) {
  const gallery = document.getElementById("gallery");
  const scroller = getScroller();
  if (!gallery || !scroller || !layout) return;

  const end = gallery.offsetLeft + layout.offsetWidth;
  const target = Math.max(
    gallery.offsetLeft,
    Math.max(0, end - scroller.clientWidth),
  );

  if (scroller.scrollLeft <= target + 2) return;

  if (smooth) {
    scroller.scrollTo({ left: target, behavior: "smooth" });
  } else {
    scroller.scrollLeft = target;
  }
}

function previewCountFor(category: ArtworkCategory) {
  return category === "design" ? DESIGN_PREVIEW_COUNT : PREVIEW_COUNT;
}

function preloadThumbnails(artworks: Artwork[]) {
  return Promise.all(
    artworks.map(
      (piece) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = piece.thumbnail;
        }),
    ),
  );
}

export function Gallery({ onSelect, onFilterChange }: GalleryProps) {
  const [filter, setFilter] = useState<ArtworkCategory>(DEFAULT_FILTER);
  const [expanded, setExpanded] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [rowHoldHeight, setRowHoldHeight] = useState<number | null>(null);
  const clampScrollAfterFilter = useRef(false);
  const followAfterCollapse = useRef(false);
  const layoutRef = useRef<HTMLDivElement>(null);
  const rowShellRef = useRef<HTMLDivElement>(null);
  const filterBusy = useRef(false);
  const reduceMotion = useReducedMotion();

  const pieces = useMemo(() => artworksByCategory(filter), [filter]);
  const previewCount =
    filter === "design" ? DESIGN_PREVIEW_COUNT : PREVIEW_COUNT;
  const preview = pieces.slice(0, previewCount);
  const rest = expanded ? pieces.slice(previewCount) : [];
  const hiddenCount = Math.max(0, pieces.length - previewCount);

  useLayoutEffect(() => {
    if (!clampScrollAfterFilter.current) return;
    clampScrollAfterFilter.current = false;
    clampHorizontalScrollAfterLayout();
    const id = window.requestAnimationFrame(() => {
      clampHorizontalScrollAfterLayout();
      window.requestAnimationFrame(clampHorizontalScrollAfterLayout);
    });
    return () => window.cancelAnimationFrame(id);
  }, [filter]);

  const followCollapsedView = () => {
    if (!followAfterCollapse.current) return;
    followAfterCollapse.current = false;
    keepCollapsedGalleryInView(layoutRef.current, !reduceMotion);
    // Second pass after layout settles
    window.requestAnimationFrame(() => {
      keepCollapsedGalleryInView(layoutRef.current, false);
    });
  };

  const handleFilter = (next: ArtworkCategory) => {
    if (next === filter) {
      return;
    }
    if (filterBusy.current) return;

    filterBusy.current = true;
    const rowShell = rowShellRef.current;
    if (rowShell?.offsetHeight) {
      setRowHoldHeight(rowShell.offsetHeight);
    }
    setCategoryLoading(true);
    setExpanded(false);

    const nextPieces = artworksByCategory(next);
    const toPreload = nextPieces.slice(0, previewCountFor(next));

    void preloadThumbnails(toPreload).then(() => {
      clampScrollAfterFilter.current = true;
      setFilter(next);
      onFilterChange?.(nextPieces);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setCategoryLoading(false);
          setRowHoldHeight(null);
          filterBusy.current = false;
        });
      });
    });
  };

  const toggleMore = () => {
    setExpanded((value) => {
      if (value) {
        followAfterCollapse.current = true;
        // Fallback if exit-complete doesn’t fire (e.g. reduced motion)
        window.setTimeout(followCollapsedView, reduceMotion ? 0 : 420);
      }
      return !value;
    });
  };

  return (
    <SectionShell id="gallery" numeral="IV" fluid className={styles.shell}>
      <div className={styles.layout} ref={layoutRef}>
        <div className={styles.headingChrome}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>Art Archive</p>
            <h2 id="gallery-title">Gallery</h2>
            <p className={styles.lede}>
              I&apos;m most comfortable with painterly and sketchy styles, but I
              also enjoy adapting to different looks I&apos;m interested in studying.
            </p>
            <DecoDivider variant="crest" />
          </div>

          <div className={styles.categoryBar}>
            <div
              className={styles.mobileTabs}
              role="tablist"
              aria-label="Artwork categories"
            >
              {filters.map((item, index) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={item.label}
                    className={`${styles.mobileTab} ${active ? styles.mobileTabActive : ""}`}
                    disabled={categoryLoading}
                    onClick={() => handleFilter(item.id)}
                    data-cursor="link"
                  >
                    {galleryTabNumerals[index]}
                  </button>
                );
              })}
            </div>
            <p className={styles.mobileCategoryTitle} aria-live="polite">
              {categoryMeta[filter].title}
            </p>
          </div>
        </div>

        <div className={styles.strip}>
          <div className={styles.tabRail}>
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
                    disabled={categoryLoading}
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

        <div
          className={styles.rowShell}
          ref={rowShellRef}
          data-loading={categoryLoading ? "true" : "false"}
          aria-busy={categoryLoading}
          style={
            rowHoldHeight != null ? { minHeight: rowHoldHeight } : undefined
          }
        >
          {categoryLoading ? (
            <div className={styles.rowLoader} role="status">
              <span className={styles.rowLoaderStar} aria-hidden="true" />
              <span className={styles.rowLoaderText}>Loading archive</span>
            </div>
          ) : null}

          <div className={styles.row} aria-label="Gallery strip">
            {preview.map((artwork) => (
              <div key={`${filter}-${artwork.id}`} className={styles.cell}>
                <ArtworkCard artwork={artwork} onSelect={onSelect} />
              </div>
            ))}

          <AnimatePresence initial={false} onExitComplete={followCollapsedView}>
            {!expanded && hiddenCount > 0 ? (
              <motion.div
                key="see-more"
                className={styles.moreWrap}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <button
                  type="button"
                  className={styles.moreBtn}
                  onClick={toggleMore}
                  data-cursor="link"
                  aria-label={`See ${hiddenCount} more artworks`}
                >
                  See more
                </button>
              </motion.div>
            ) : null}

            {rest.map((artwork, index) => (
              <motion.div
                key={`${filter}-${artwork.id}-extra`}
                className={styles.cell}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: 12 }}
                transition={{
                  duration: 0.3,
                  delay: reduceMotion ? 0 : Math.min(index, 6) * 0.035,
                  ease: "easeOut",
                }}
              >
                <ArtworkCard artwork={artwork} onSelect={onSelect} />
              </motion.div>
            ))}

            {expanded && hiddenCount > 0 ? (
              <motion.button
                key="show-less"
                type="button"
                className={styles.lessLink}
                onClick={toggleMore}
                data-cursor="link"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                Show less
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
        </div>
        </div>
      </div>
    </SectionShell>
  );
}
