export type ProcessStage = {
  id: string;
  title: string;
  description: string;
  accent: string;
};

export const processStages: ProcessStage[] = [
  {
    id: "concept",
    title: "Concept",
    description:
      "Lorem ipsum reference gathering — mood, silhouette, and narrative seeds.",
    accent: "#c4a35a",
  },
  {
    id: "sketch",
    title: "Sketch",
    description:
      "Sed do eiusmod line exploration to lock pose, proportion, and flow.",
    accent: "#a68b4b",
  },
  {
    id: "base",
    title: "Base Colors",
    description:
      "Ut enim ad minim color blocking for temperature and material read.",
    accent: "#7a5c3e",
  },
  {
    id: "render",
    title: "Rendering",
    description:
      "Quis nostrud light, form, and texture pass across the focal planes.",
    accent: "#6f7f8c",
  },
  {
    id: "final",
    title: "Final",
    description:
      "Duis aute polish — edges, atmosphere, and finishing celestial details.",
    accent: "#3d342c",
  },
];
