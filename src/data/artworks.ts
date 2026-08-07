export type ArtworkCategory =
  | "illustration"
  | "design"
  | "studies"
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

const placeholder = (
  title: string,
  category: ArtworkCategory,
  hue: number,
) => {
  const label = encodeURIComponent(title);
  const cat = encodeURIComponent(category);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue},28%,78%)"/>
      <stop offset="100%" stop-color="hsl(${hue + 24},22%,62%)"/>
    </linearGradient>
    <radialGradient id="orb" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="hsla(42,45%,70%,0.55)"/>
      <stop offset="100%" stop-color="hsla(42,30%,40%,0)"/>
    </radialGradient>
  </defs>
  <rect width="900" height="1200" fill="url(#g)"/>
  <rect width="900" height="1200" fill="url(#orb)"/>
  <circle cx="450" cy="420" r="180" fill="none" stroke="hsla(40,40%,25%,0.35)" stroke-width="1.5"/>
  <circle cx="450" cy="420" r="110" fill="none" stroke="hsla(40,40%,25%,0.25)" stroke-width="1"/>
  <circle cx="450" cy="420" r="8" fill="hsla(40,35%,20%,0.55)"/>
  <g fill="hsla(40,35%,20%,0.4)">
    <circle cx="220" cy="220" r="2.5"/>
    <circle cx="680" cy="260" r="2"/>
    <circle cx="720" cy="520" r="2.5"/>
    <circle cx="180" cy="560" r="2"/>
    <circle cx="300" cy="780" r="2"/>
    <circle cx="620" cy="820" r="2.5"/>
  </g>
  <text x="450" y="980" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="hsla(30,30%,18%,0.75)">${label}</text>
  <text x="450" y="1030" text-anchor="middle" font-family="Georgia, serif" font-size="20" letter-spacing="4" fill="hsla(30,25%,25%,0.55)">${cat}</text>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const artworks: Artwork[] = [
  {
    id: "illu-01",
    title: "Observatory Night",
    category: "illustration",
    year: 2025,
    description: "Lorem ipsum dolor sit amet, narrative composition study.",
    altText: "Placeholder illustration titled Observatory Night",
    thumbnail: placeholder("Observatory Night", "illustration", 200),
    fullImage: placeholder("Observatory Night", "illustration", 200),
  },
  {
    id: "illu-02",
    title: "Procession of Moons",
    category: "illustration",
    year: 2025,
    altText: "Placeholder illustration titled Procession of Moons",
    thumbnail: placeholder("Procession of Moons", "illustration", 18),
    fullImage: placeholder("Procession of Moons", "illustration", 18),
  },
  {
    id: "illu-03",
    title: "Celestial Market",
    category: "illustration",
    year: 2024,
    description: "Consectetur adipiscing elit, sed do eiusmod tempor.",
    altText: "Placeholder illustration titled Celestial Market",
    thumbnail: placeholder("Celestial Market", "illustration", 160),
    fullImage: placeholder("Celestial Market", "illustration", 160),
  },
  {
    id: "illu-04",
    title: "Atlas Unbound",
    category: "illustration",
    year: 2024,
    altText: "Placeholder illustration titled Atlas Unbound",
    thumbnail: placeholder("Atlas Unbound", "illustration", 35),
    fullImage: placeholder("Atlas Unbound", "illustration", 35),
  },
  {
    id: "des-01",
    title: "Orbital Scout",
    category: "design",
    year: 2025,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    altText: "Placeholder design artwork titled Orbital Scout",
    thumbnail: placeholder("Orbital Scout", "design", 28),
    fullImage: placeholder("Orbital Scout", "design", 28),
  },
  {
    id: "des-02",
    title: "Moonlit Herald",
    category: "design",
    year: 2025,
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    altText: "Placeholder design artwork titled Moonlit Herald",
    thumbnail: placeholder("Moonlit Herald", "design", 210),
    fullImage: placeholder("Moonlit Herald", "design", 210),
  },
  {
    id: "des-03",
    title: "Gilded Archivist",
    category: "design",
    year: 2024,
    description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    altText: "Placeholder design artwork titled Gilded Archivist",
    thumbnail: placeholder("Gilded Archivist", "design", 42),
    fullImage: placeholder("Gilded Archivist", "design", 42),
  },
  {
    id: "stu-01",
    title: "Starfold Twin",
    category: "studies",
    year: 2024,
    altText: "Placeholder study titled Starfold Twin",
    thumbnail: placeholder("Starfold Twin", "studies", 330),
    fullImage: placeholder("Starfold Twin", "studies", 330),
  },
  {
    id: "stu-02",
    title: "Gesture Orbit",
    category: "studies",
    year: 2025,
    description: "Lorem ipsum gesture and form study.",
    altText: "Placeholder study titled Gesture Orbit",
    thumbnail: placeholder("Gesture Orbit", "studies", 95),
    fullImage: placeholder("Gesture Orbit", "studies", 95),
  },
  {
    id: "stu-03",
    title: "Value Drift",
    category: "studies",
    year: 2024,
    altText: "Placeholder study titled Value Drift",
    thumbnail: placeholder("Value Drift", "studies", 250),
    fullImage: placeholder("Value Drift", "studies", 250),
  },
  {
    id: "comm-01",
    title: "Client Portrait I",
    category: "commission",
    year: 2025,
    description: "Lorem ipsum commission sample from client reference.",
    altText: "Placeholder commission artwork titled Client Portrait I",
    thumbnail: placeholder("Client Portrait I", "commission", 12),
    fullImage: placeholder("Client Portrait I", "commission", 12),
  },
  {
    id: "comm-02",
    title: "Emblem Study",
    category: "commission",
    year: 2025,
    altText: "Placeholder commission artwork titled Emblem Study",
    thumbnail: placeholder("Emblem Study", "commission", 55),
    fullImage: placeholder("Emblem Study", "commission", 55),
  },
  {
    id: "comm-03",
    title: "Costume Sheet",
    category: "commission",
    year: 2024,
    description: "Ut labore et dolore magna aliqua.",
    altText: "Placeholder commission artwork titled Costume Sheet",
    thumbnail: placeholder("Costume Sheet", "commission", 185),
    fullImage: placeholder("Costume Sheet", "commission", 185),
  },
];

export const categoryOrder: ArtworkCategory[] = [
  "illustration",
  "design",
  "studies",
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
      "Character and visual design work — silhouette, costume, and identity systems.",
  },
  studies: {
    id: "studies",
    title: "Studies",
    description:
      "Sketches, value drills, and exploratory pieces from the practice archive.",
  },
  commission: {
    id: "commission",
    title: "Commission",
    description:
      "Selected client work demonstrating direction-following and reference interpretation.",
  },
};

export function artworksByCategory(category: ArtworkCategory) {
  return artworks.filter((piece) => piece.category === category);
}
