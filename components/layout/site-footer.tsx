import Link from "next/link";

const footerColumns = [
  {
    title: "B Donald Harris",
    links: [
      { href: "/about", label: "About" },
      { href: "/speaking", label: "Speaking" },
      { href: "/ideas", label: "Ideas" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { href: "https://notablebit.com", label: "NotableBIT" },
      { href: "/projects#hindsite", label: "HindSite" },
      { href: "https://bitvoices.network", label: "BitVoices Network" },
      { href: "/media#bit-voices-podcast", label: "BIT Voices Podcast" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://www.linkedin.com/in/bdonaldharris", label: "LinkedIn" },
      { href: "https://www.youtube.com/@bitvoices", label: "YouTube" },
      { href: "https://www.instagram.com/bdonaldharris", label: "Instagram" },
      { href: "https://x.com/bdonaldharris", label: "X" },
      { href: "/contact", label: "Email / Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <p className="eyebrow">One founder. One mission. Aligned vehicles.</p>
        <h2>B Donald Harris</h2>
        <p>
          Building tools, platforms, and conversations for Black builders in
          the AI era.
        </p>
      </div>

      <nav className="footer-grid" aria-label="Footer navigation">
        {footerColumns.map((column) => (
          <section key={column.title} aria-labelledby={`footer-${column.title}`}>
            <h3 id={`footer-${column.title}`}>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </footer>
  );
}
