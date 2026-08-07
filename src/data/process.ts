export type ProcessStage = {
  id: string;
  title: string;
  description: string;
  accent: string;
  image: string;
};

export const processStages: ProcessStage[] = [
  {
    id: "sketch",
    title: "Sketch",
    description:
      "Brainstorming the concept and sketching the base before color.",
    accent: "#a68b4b",
    image: "/assets/process/sketch.jpg",
  },
  {
    id: "base",
    title: "Base Colors",
    description:
      "Color blocking for base colors — no shadows or lighting yet.",
    accent: "#c4a35a",
    image: "/assets/process/base-color.jpg",
  },
  {
    id: "light",
    title: "Light & Shadow",
    description:
      "Value drafting — placing shadow and light, then adjusting until it feels right.",
    accent: "#7a5c3e",
    image: "/assets/process/light-and-shadow.jpg",
  },
  {
    id: "render",
    title: "Render",
    description: "Detailing and polishing the final piece.",
    accent: "#3d342c",
    image: "/assets/process/render.jpg",
  },
];
