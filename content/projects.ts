export type Project = {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  href: string;
  logo: string;
};

export const projects: Project[] = [
  {
    id: "notablebit",
    title: "NotableBIT",
    category: "Company / studio",
    status: "Active company home",
    description:
      "Technology studio and company home for product, strategy, platform work, and aligned ecosystem initiatives.",
    href: "https://notablebit.com/",
    logo: "/images/notablebit-logo.webp",
  },
  {
    id: "bit-voices-podcast",
    title: "BIT Voices Podcast",
    category: "Podcast",
    status: "Public media work",
    description:
      "Conversations with Black technologists, founders, builders, and leaders shaping what comes next.",
    href: "https://www.youtube.com/@notablebit",
    logo: "/images/bit-voices-podcast-logo.webp",
  },
  {
    id: "bitvoices-network",
    title: "BitVoices Network",
    category: "Community and media",
    status: "Growing platform",
    description:
      "A platform and media ecosystem amplifying Black excellence in tech and creating visibility, community, and ownership pathways.",
    href: "https://www.bitvoices.network",
    logo: "/images/bitvoices-logo.webp",
  },
  {
    id: "hindsite",
    title: "HindSite",
    category: "Workflow intelligence",
    status: "Being built",
    description:
      "Workflow intelligence for builders navigating AI-assisted development, comprehension debt, project memory, and accountable review.",
    href: "https://www.hindsite.pro/",
    logo: "/images/hindsite-logo.webp",
  },
];
