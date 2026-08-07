import type { Artwork } from "../../data/artworks";
import styles from "./ArtworkCard.module.css";

type ArtworkCardProps = {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
};

export function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onSelect(artwork)}
      aria-label={artwork.altText}
      data-cursor="view"
    >
      <span className={styles.frame}>
        <img
          src={artwork.thumbnail}
          alt={artwork.altText}
          loading="lazy"
          decoding="async"
        />
      </span>
    </button>
  );
}
