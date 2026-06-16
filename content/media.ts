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
    href: "https://www.youtube.com/@notablebit",
    status: "Featured platform",
  },
  {
    title: "Speaking & Conversations",
    category: "Speaking",
    description:
      "A clear path for invitations, panels, podcasts, workshops, and public conversations.",
    href: "/speaking",
    status: "Available for invitations",
  },
  {
    title: "Founder Reflections / Ideas",
    category: "Writing",
    description:
      "Selected reflections on AI-era building, workflow intelligence, community, and ownership.",
    href: "/ideas",
    status: "Ongoing",
  },
];
