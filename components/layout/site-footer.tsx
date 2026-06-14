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
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-intro">
          <p className="eyebrow eyebrow-gold">One founder. One mission. Aligned vehicles.</p>
          <p className="footer-wordmark">B Donald Harris</p>
          <p className="footer-positioning">
            Building tools, platforms, and conversations for Black builders in
            the AI era.
          </p>
        </div>

        <nav className="footer-grid" aria-label="Footer navigation">
          {footerColumns.map((column) => (
            <section key={column.title} aria-labelledby={`footer-${column.title}`}>
              <h2 id={`footer-${column.title}`}>{column.title}</h2>
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
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} B Donald Harris. All rights reserved.</p>
        <p>NotableBIT &middot; HindSite &middot; BitVoices Network &middot; BIT Voices Podcast</p>
      </div>
    </footer>
  );
}
