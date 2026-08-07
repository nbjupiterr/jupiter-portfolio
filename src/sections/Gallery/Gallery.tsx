import { useMemo, useState } from "react";
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

const filters = categoryOrder.map((id) => ({
  id,
  label: categoryMeta[id].title,
}));

export function Gallery({ onSelect, onFilterChange }: GalleryProps) {
  const [filter, setFilter] = useState<ArtworkCategory>(DEFAULT_FILTER);

  const pieces = useMemo(() => artworksByCategory(filter), [filter]);

  const handleFilter = (next: ArtworkCategory) => {
    setFilter(next);
    onFilterChange?.(artworksByCategory(next));
  };

  return (
    <SectionShell id="gallery" numeral="IV" fluid className={styles.shell}>
      <div className={styles.stickyChrome}>
        <div className={styles.headingBlock}>
          <p className={styles.eyebrow}>Art Archive</p>
          <h2 id="gallery-title">Gallery</h2>
          <DecoDivider variant="diamond" />
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
                onClick={() => handleFilter(item.id)}
                data-cursor="link"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.row}>
        {pieces.map((artwork) => (
          <div key={artwork.id} className={styles.cell}>
            <ArtworkCard artwork={artwork} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
