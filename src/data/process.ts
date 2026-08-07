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
      "Line exploration to lock pose, proportion, and flow before color.",
    accent: "#a68b4b",
    image: "/assets/process/sketch.jpg",
  },
  {
    id: "base",
    title: "Base Colors",
    description:
      "Color blocking for temperature, material read, and early atmosphere.",
    accent: "#c4a35a",
    image: "/assets/process/base-color.jpg",
  },
  {
    id: "light",
    title: "Light & Shadow",
    description:
      "Value pass that shapes form, depth, and the scene’s lighting story.",
    accent: "#7a5c3e",
    image: "/assets/process/light-and-shadow.jpg",
  },
  {
    id: "render",
    title: "Render",
    description:
      "Final polish — edges, texture, and finishing celestial detail.",
    accent: "#3d342c",
    image: "/assets/process/render.jpg",
  },
];
