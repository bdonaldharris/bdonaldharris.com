"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  sectionId?: string;
};

const navItems: readonly NavItem[] = [
  { href: "/#home", label: "Home", sectionId: "home" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/essays", label: "Essays" },
  { href: "/projects", label: "Projects" },
  { href: "/#media", label: "Media", sectionId: "media" },
  { href: "/#speaking", label: "Speaking", sectionId: "speaking" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
] as const;

const homeSectionIds = navItems.flatMap((item) =>
  item.sectionId ? [item.sectionId] : [],
);

function NavigationLinks({
  activeItem,
  onSelect,
}: {
  activeItem: (item: NavItem) => boolean;
  onSelect?: () => void;
}) {
  return navItems.map((item) => {
    const active = activeItem(item);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? (item.sectionId ? "location" : "page") : undefined}
        data-active={active ? "true" : undefined}
        onClick={onSelect}
      >
        {item.label}
      </Link>
    );
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeHomeSection, setActiveHomeSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const setSectionFromHash = () => {
      const sectionId = window.location.hash.slice(1);
      if (homeSectionIds.includes(sectionId)) setActiveHomeSection(sectionId);
    };

    setSectionFromHash();
    window.addEventListener("hashchange", setSectionFromHash);

    const sections = homeSectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);
    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target.id);
          else visibleSections.delete(entry.target.id);
        });

        const visibleSection = [...homeSectionIds]
          .reverse()
          .find((sectionId) => visibleSections.has(sectionId));
        if (visibleSection) setActiveHomeSection(visibleSection);
      },
      { rootMargin: "-80px 0px -55%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("hashchange", setSectionFromHash);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const isActive = (item: NavItem) =>
    item.sectionId
      ? pathname === "/" && activeHomeSection === item.sectionId
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  const handleMobileSelection = () => {
    setIsMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          className="wordmark"
          href="/#home"
          aria-label="B Donald Harris home"
        >
          <span>B Donald Harris</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavigationLinks activeItem={isActive} />
        </nav>

        <div className="mobile-menu">
          <button
            ref={menuButtonRef}
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-primary-navigation"
            aria-label={
              isMenuOpen ? "Close primary navigation" : "Open primary navigation"
            }
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          {isMenuOpen && (
            <nav id="mobile-primary-navigation" aria-label="Mobile navigation">
              <NavigationLinks
                activeItem={isActive}
                onSelect={handleMobileSelection}
              />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
