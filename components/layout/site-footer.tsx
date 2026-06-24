import Link from "next/link";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/speaking", label: "Speaking" },
  { href: "/ideas", label: "Ideas" },
  { href: "/projects", label: "Projects" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

const ecosystemLinks = [
  { href: "https://notablebit.com/", label: "NotableBIT" },
  { href: "https://www.youtube.com/@notablebit", label: "BIT Voices Podcast" },
  { href: "https://www.bitvoices.network", label: "BitVoices Network" },
  { href: "https://www.hindsite.pro/", label: "HindSite" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/briandharris/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://www.facebook.com/bdonaldharris", label: "Facebook", icon: "facebook" },
  { href: "https://www.instagram.com/notablebit/", label: "Instagram", icon: "instagram" },
  { href: "https://www.youtube.com/@notablebit", label: "YouTube", icon: "youtube" },
  { href: "https://x.com/home", label: "X", icon: "x" },
  { href: "mailto:founder@bdonaldharris.com", label: "Email", icon: "email" },
] as const;

type SocialIconName = (typeof socialLinks)[number]["icon"];

// Subtle, brand-consistent inline icons. Decorative — each link carries a
// visible aria-label, and the svg is aria-hidden.
function SocialIcon({ name }: { name: SocialIconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  } as const;

  switch (name) {
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.08 24 18.09 24 12.07z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M23.5 6.5a3 3 0 0 0-2.11-2.12C19.5 3.87 12 3.87 12 3.87s-7.5 0-9.39.51A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.11 2.12c1.89.51 9.39.51 9.39.51s7.5 0 9.39-.51A3 3 0 0 0 23.5 17.5C24 15.6 24 12 24 12s0-3.6-.5-5.5zM9.6 15.6V8.4l6.25 3.6-6.25 3.6z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.9 1.5h3.36l-7.34 8.39L23.5 22.5h-6.76l-5.3-6.93-6.06 6.93H1.02l7.85-8.97L.5 1.5h6.93l4.79 6.33L18.9 1.5zm-1.18 19h1.86L6.36 3.4H4.36l13.36 17.1z" />
        </svg>
      );
    case "email":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3.5 6.5 8.5 6 8.5-6" />
        </svg>
      );
  }
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="footer-motto">
        <span>One Founder</span>
        <span aria-hidden="true">°</span>
        <span>One Mission</span>
        <span aria-hidden="true">°</span>
        <span>Aligned Vehicles</span>
      </p>

      <div className="footer-main">
        <div className="footer-intro">
          <p className="footer-wordmark">B Donald Harris</p>
          <p className="footer-positioning">
            Building for Black Builders in the AI Era
          </p>
        </div>

        <nav className="footer-nav-groups" aria-label="Footer navigation">
          <section aria-labelledby="footer-site">
            <h2 id="footer-site">B Donald Harris</h2>
            <ul className="footer-links-inline">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-ecosystem">
            <h2 id="footer-ecosystem">Ecosystem</h2>
            <ul className="footer-links-inline">
              {ecosystemLinks.map((link) => {
                const external = link.href.startsWith("http");

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="footer-connect">
            <h2 id="footer-connect">Connect</h2>
            <ul className="footer-social">
              {socialLinks.map((social) => {
                const external = social.href.startsWith("http");

                return (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <SocialIcon name={social.icon} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} B Donald Harris. All rights reserved.</p>
        <p>NotableBIT &deg; BIT Voices Podcast &deg; BitVoices Network</p>
      </div>
    </footer>
  );
}
