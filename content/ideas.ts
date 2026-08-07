export type Idea = {
  title: string;
  category: string;
  excerpt: string;
};

export type IdeaLane = {
  title: string;
  description: string;
};

// The recurring themes B Donald writes and speaks about — an editorial map,
// not a tag cloud. Surfaced on the Essays page as "Recurring Themes".
export const ideaLanes: IdeaLane[] = [
  {
    title: "AI & Builder Discipline",
    description:
      "How AI changes the speed, risk, and responsibility of building.",
  },
  {
    title: "Comprehension Debt",
    description: "What happens when teams ship faster than they understand.",
  },
  {
    title: "Black Tech Ownership",
    description:
      "Visibility matters, but ownership, leverage, and durable opportunity matter more.",
  },
  {
    title: "Community as Culture",
    description:
      "Why belonging, trust, and shared language matter more than platform mechanics.",
  },
  {
    title: "Neurodivergence & Systems Thinking",
    description:
      "How naming patterns can create clarity, agency, and better systems.",
  },
  {
    title: "Faith, Purpose & Leadership",
    description:
      "Reflections on calling, responsibility, service, and meaningful work.",
  },
];

export const ideas: Idea[] = [
  {
    title: "Community is culture before it is features.",
    category: "Community and Culture",
    excerpt:
      "Real community is built through trust, safety, visibility, shared language, and mutual responsibility.",
  },
  {
    title: "Agents can build. Builders must lead.",
    category: "AI and Agentic Development",
    excerpt:
      "Agentic workflows still need human judgment, context, accountability, and review.",
  },
  {
    title: "Comprehension debt is real.",
    category: "Builder Workflows",
    excerpt:
      "Fast output without understanding creates hidden costs that builders eventually have to pay down.",
  },
  {
    title: "Visibility is not the finish line.",
    category: "Black Tech Ownership",
    excerpt:
      "Being seen matters. Owning platforms, products, narratives, and opportunities matters more.",
  },
  {
    title: "Having a name for it is power.",
    category: "Neurodivergence and Systems Thinking",
    excerpt:
      "Language can turn private patterns into clarity, agency, and better systems for building.",
  },
  {
    title: "AI adoption has a human problem.",
    category: "Founder Reflections",
    excerpt:
      "The hard part is not only tooling. It is trust, workflow, leadership, and understanding.",
  },
];
