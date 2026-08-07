export const site = {
  name: "Jupiter",
  realName: "Gennievieve C. Begonia",
  title: "Artist",
  linktree: "https://linktr.ee/nb.jupiterr",
  bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
  focus:
    "Character design, narrative illustration, and commissioned visual storytelling.",
  closing:
    "Thank you for walking through the archive. Find commissions, socials, and updates on Linktree.",
} as const;

export const navItems = [
  { id: "about", label: "About", numeral: "II" },
  { id: "process", label: "Process", numeral: "III" },
  { id: "gallery", label: "Gallery", numeral: "IV" },
  { id: "contact", label: "Contact", numeral: "V" },
] as const;

export type NavId = (typeof navItems)[number]["id"] | "hero";
