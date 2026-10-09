export type CuratedRepository = {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  href: string;
};

export const curatedRepositories: CuratedRepository[] = [
  {
    name: "dotnet-project-creator",
    category: "Developer Tool",
    description:
      "A VS Code extension for visually scaffolding .NET projects, solutions, and Git setup.",
    technologies: ["TypeScript", "VS Code Extension", ".NET"],
    href: "https://github.com/bdonaldharris/dotnet-project-creator",
  },
  {
    name: "BuildTrace",
    category: "Hackathon",
    description:
      "Turns scattered AI-assisted build evidence into structured recaps, timelines, and publish-ready outputs.",
    technologies: ["Next.js", "React", "TypeScript", "OpenAI"],
    href: "https://github.com/bdonaldharris/BuildTrace",
  },
  {
    name: "stewart",
    category: "Hackathon",
    description:
      "An agentic MCU continuity stewardship system coordinating specialized AI analysis for creative decision support.",
    technologies: ["Python", "Google ADK", "Gemini"],
    href: "https://github.com/bdonaldharris/stewart",
  },
  {
    name: "bdonaldharris.com",
    category: "Personal Site",
    description:
      "The Next.js codebase behind this personal site, including essays, media, and the connected body of work.",
    technologies: ["Next.js", "React", "TypeScript"],
    href: "https://github.com/bdonaldharris/bdonaldharris.com",
  },
];
