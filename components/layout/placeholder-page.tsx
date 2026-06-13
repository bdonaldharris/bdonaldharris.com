type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function PlaceholderPage({ eyebrow, title, body }: PlaceholderPageProps) {
  return (
    <main className="page-shell">
      <section className="section page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </section>
    </main>
  );
}
