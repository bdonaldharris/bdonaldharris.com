export type MediaItem = {
  title: string;
  category: string;
  description: string;
  href: string;
  status?: string;
};

export const mediaItems: MediaItem[] = [
  {
    title: "BIT Voices Podcast",
    category: "Podcast",
    description:
      "Conversations with Black technologists, founders, builders, and leaders shaping the future.",
    href: "/media#bit-voices-podcast",
    status: "Featured platform",
  },
  {
    title: "Speaking clips",
    category: "Video",
    description:
      "A future home for selected talks, panels, and short clips from speaking and media work.",
    href: "/media#speaking-appearances",
    status: "In progress",
  },
  {
    title: "Founder reflections",
    category: "Writing",
    description:
      "Selected reflections on AI-era building, workflow intelligence, community, and ownership.",
    href: "/ideas",
    status: "Ongoing",
  },
];
