export const site = {
  name: "Jupiter",
  realName: "Gennievieve C. Begonia",
  title: "Artist",
  linktree: "https://linktr.ee/nb.jupiterr",
  bio: `I'm a self-taught artist from Metro Manila, Philippines, currently studying BS Information Technology at Quezon City University. I started with traditional art in 2018, then moved into digital drawing in 2021 — and I've been hooked on designing characters and illustrations ever since.`,
  focus:
    "Tools: Procreate, Ibis Paint, MediBang, and Clip Studio Paint",
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
