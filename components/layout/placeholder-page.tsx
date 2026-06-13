import { PageHero } from "@/components/sections/page-hero";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function PlaceholderPage({ eyebrow, title, body }: PlaceholderPageProps) {
  return (
    <main className="page-shell">
      <PageHero eyebrow={eyebrow} title={title} body={body} />
    </main>
  );
}
