import { useMemo, useState } from "react";
import { ArtworkCard } from "../../components/ArtworkCard/ArtworkCard";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import {
  artworks,
  artworksByCategory,
  categoryMeta,
  type Artwork,
  type ArtworkCategory,
} from "../../data/artworks";
import styles from "./Gallery.module.css";

type FilterId = "all" | ArtworkCategory;

type GalleryProps = {
  onSelect: (artwork: Artwork) => void;
  onFilterChange?: (pieces: Artwork[]) => void;
};

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "character", label: categoryMeta.character.title },
  { id: "illustration", label: categoryMeta.illustration.title },
  { id: "commission", label: categoryMeta.commission.title },
];

export function Gallery({ onSelect, onFilterChange }: GalleryProps) {
  const [filter, setFilter] = useState<FilterId>("all");

  const pieces = useMemo(() => {
    if (filter === "all") return artworks;
    return artworksByCategory(filter);
  }, [filter]);

  const description =
    filter === "all"
      ? "Character art, illustrations, and commissions — selected work from the archive."
      : categoryMeta[filter].description;

  const handleFilter = (next: FilterId) => {
    setFilter(next);
    const nextPieces =
      next === "all" ? artworks : artworksByCategory(next);
    onFilterChange?.(nextPieces);
  };

  return (
    <SectionShell id="gallery" numeral="IV" wide scrollable>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Art Archive</p>
        <h2 id="gallery-title">Gallery</h2>
        <p className={styles.lede}>{description}</p>

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

      <div className={styles.grid}>
        {pieces.map((artwork, index) => (
          <div
            key={artwork.id}
            className={`${styles.cell} ${index % 3 === 1 ? styles.offset : ""}`}
          >
            <ArtworkCard artwork={artwork} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
