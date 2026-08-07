export type ArtworkCategory =
  | "illustration"
  | "design"
  | "personal"
  | "commission";

export type Artwork = {
  id: string;
  title: string;
  category: ArtworkCategory;
  thumbnail: string;
  fullImage: string;
  altText: string;
  year?: number;
  description?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

export const categoryOrder: ArtworkCategory[] = [
  "design",
  "personal",
  "illustration",
  "commission",
];

export const categoryMeta: Record<
  ArtworkCategory,
  { id: ArtworkCategory; title: string; description: string }
> = {
  illustration: {
    id: "illustration",
    title: "Illustration",
    description:
      "Finished compositions with storytelling, environments, and detailed rendering.",
  },
  design: {
    id: "design",
    title: "Design",
    description:
      "Character and visual design — silhouette, costume, and identity systems.",
  },
  personal: {
    id: "personal",
    title: "Personal",
    description:
      "Personal pieces from the archive — explorative work beyond client briefs.",
  },
  commission: {
    id: "commission",
    title: "Commission",
    description:
      "Selected client work demonstrating direction-following and reference interpretation.",
  },
};

function piece(category: ArtworkCategory, number: number): Artwork {
  const src = `/assets/gallery/${category}/${number}.jpg`;
  const label = `${categoryMeta[category].title} ${pad(number)}`;
  return {
    id: `${category}-${pad(number)}`,
    title: label,
    category,
    thumbnail: src,
    fullImage: src,
    altText: `${label} by Jupiter`,
  };
}

/** Build numbered sets in display order from the asset folders. */
function numbered(category: ArtworkCategory, numbers: number[]): Artwork[] {
  return numbers.map((n) => piece(category, n));
}

export const artworks: Artwork[] = [
  // Display order: 03 first, 01 second-to-last, 02 last
  ...numbered("illustration", [3, 4, 5, 6, 7, 8, 1, 2]),
  // 10 removed — asset failed to load; 01 last per Moat
  ...numbered("design", [2, 3, 4, 5, 6, 7, 8, 9, 1]),
  ...numbered("personal", [1, 2, 3, 4, 5]),
  // Folder numbering skips 3 by design
  ...numbered("commission", [1, 2, 4, 5, 6, 7, 8, 9]),
];

export function artworksByCategory(category: ArtworkCategory) {
  return artworks.filter((item) => item.category === category);
}
