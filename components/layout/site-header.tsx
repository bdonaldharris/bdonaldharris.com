"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const homeItems = [
  { href: "/#about", label: "About", section: "about" },
  { href: "/#media", label: "Media", section: "media" },
  { href: "/#speaking", label: "Speaking", section: "speaking" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

const homeSectionItems = homeItems;

const primaryItems = [
  { href: "/essays", label: "Essays" },
  { href: "/projects", label: "Projects" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [isDesktopHomeMenuOpen, setIsDesktopHomeMenuOpen] = useState(false);
  const [isPointerInsideDesktopHome, setIsPointerInsideDesktopHome] = useState(false);
  const [isKeyboardFocusWithinDesktopHome, setIsKeyboardFocusWithinDesktopHome] = useState(false);
  const [suppressPointerOpenAfterHomeClick, setSuppressPointerOpenAfterHomeClick] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHomeMenuOpen, setIsMobileHomeMenuOpen] = useState(false);
  const desktopHomeMenuRef = useRef<HTMLDivElement>(null);
  const desktopHomeLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const lastDesktopHomeInteractionRef = useRef<"keyboard" | "pointer">("keyboard");
  const suppressNextDesktopHomeFocusRef = useRef(false);
  const shouldRestoreDesktopFocusRef = useRef(false);
  const shouldRestoreMobileFocusRef = useRef(false);

  useEffect(() => {
    const recordPointerInteraction = () => {
      lastDesktopHomeInteractionRef.current = "pointer";
    };
    const recordKeyboardInteraction = () => {
      lastDesktopHomeInteractionRef.current = "keyboard";
    };

    window.addEventListener("pointerdown", recordPointerInteraction, true);
    window.addEventListener("keydown", recordKeyboardInteraction, true);
    return () => {
      window.removeEventListener("pointerdown", recordPointerInteraction, true);
      window.removeEventListener("keydown", recordKeyboardInteraction, true);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", ...homeSectionItems.map((item) => item.section)];
    const header = document.querySelector<HTMLElement>(".site-header");

    const updateActiveSection = () => {
      const headerOffset = (header?.offsetHeight ?? 60) + 1;
      let nextSection = "home";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= headerOffset) {
          nextSection = sectionId;
        }
      }

      setActiveSection(nextSection);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-60px 0px -35%",
      threshold: 0,
    });

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isDesktopHomeMenuOpen) return;

    const desktopHomeMenu = desktopHomeMenuRef.current;
    const desktopHomeLink = desktopHomeLinkRef.current;

    const closeOnDismiss = (restoreFocus: boolean) => {
      shouldRestoreDesktopFocusRef.current = restoreFocus;
      setIsDesktopHomeMenuOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!desktopHomeMenu?.contains(event.target as Node)) {
        closeOnDismiss(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOnDismiss(true);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);

      if (shouldRestoreDesktopFocusRef.current) {
        suppressNextDesktopHomeFocusRef.current = true;
        desktopHomeLink?.focus();
        shouldRestoreDesktopFocusRef.current = false;
      }
    };
  }, [isDesktopHomeMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const mobileMenuTrigger = mobileMenuTriggerRef.current;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      shouldRestoreMobileFocusRef.current = true;
      setIsMobileHomeMenuOpen(false);
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (shouldRestoreMobileFocusRef.current) {
        mobileMenuTrigger?.focus();
        shouldRestoreMobileFocusRef.current = false;
      }
    };
  }, [isMobileMenuOpen]);

  const isHomeActive = pathname === "/";
  const isPrimaryActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const closeDesktopHomeMenu = (restoreFocus = false) => {
    shouldRestoreDesktopFocusRef.current = restoreFocus;
    setIsDesktopHomeMenuOpen(false);
  };

  const closeMobileMenu = (restoreFocus = false) => {
    shouldRestoreMobileFocusRef.current = restoreFocus;
    setIsMobileHomeMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          className="wordmark"
          href="/#home"
          aria-current={isHomeActive ? "page" : undefined}
          aria-label="B Donald Harris home"
          data-active={isHomeActive ? "true" : undefined}
        >
          <span>B Donald Harris</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <div
            ref={desktopHomeMenuRef}
            className="desktop-home-menu"
            onPointerEnter={() => {
              setIsPointerInsideDesktopHome(true);

              if (!suppressPointerOpenAfterHomeClick) {
                setIsDesktopHomeMenuOpen(true);
              }
            }}
            onPointerLeave={() => {
              setIsPointerInsideDesktopHome(false);
              setSuppressPointerOpenAfterHomeClick(false);

              if (!isKeyboardFocusWithinDesktopHome) {
                closeDesktopHomeMenu();
              }
            }}
            onFocusCapture={() => {
              if (suppressNextDesktopHomeFocusRef.current) {
                suppressNextDesktopHomeFocusRef.current = false;
                return;
              }

              setIsKeyboardFocusWithinDesktopHome(
                lastDesktopHomeInteractionRef.current === "keyboard",
              );
              setIsDesktopHomeMenuOpen(true);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsKeyboardFocusWithinDesktopHome(false);

                if (!isPointerInsideDesktopHome) {
                  closeDesktopHomeMenu();
                }
              }
            }}
          >
            <Link
              ref={desktopHomeLinkRef}
              className="desktop-home-link"
              href="/"
              aria-current={isHomeActive ? "page" : undefined}
              data-active={isHomeActive ? "true" : undefined}
              onClick={(event) => {
                if (event.detail === 0) return;

                setSuppressPointerOpenAfterHomeClick(true);
                setIsKeyboardFocusWithinDesktopHome(false);
                closeDesktopHomeMenu();
                event.currentTarget.blur();
              }}
            >
              Home
            </Link>
            <button
              className="desktop-home-disclosure"
              type="button"
              aria-label="Toggle Home section navigation"
              aria-expanded={isDesktopHomeMenuOpen}
              aria-controls="desktop-home-navigation"
              onClick={() => setIsDesktopHomeMenuOpen((open) => !open)}
            >
              <span aria-hidden="true">▾</span>
            </button>
            {isDesktopHomeMenuOpen && (
              <div id="desktop-home-navigation" className="desktop-home-submenu" role="group" aria-label="Home sections">
                {homeSectionItems.map((item) => {
                  const active = isHomeActive && activeSection === item.section;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      data-active={active ? "true" : undefined}
                      onClick={() => closeDesktopHomeMenu()}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {primaryItems.map((item) => {
            const active = isPrimaryActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                data-active={active ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mobile-menu">
          <button
            ref={mobileMenuTriggerRef}
            className="mobile-menu-trigger"
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              if (isMobileMenuOpen) {
                closeMobileMenu(true);
                return;
              }

              setIsMobileMenuOpen(true);
            }}
          >
            <span />
            <span />
            <span />
          </button>

          {isMobileMenuOpen && (
            <nav id="mobile-navigation" aria-label="Mobile navigation">
              <div className="mobile-home-menu">
                <div className="mobile-home-menu-row">
                  <Link
                    className="mobile-home-link"
                    href="/"
                    aria-current={isHomeActive ? "page" : undefined}
                    data-active={isHomeActive ? "true" : undefined}
                    onClick={() => closeMobileMenu()}
                  >
                    Home
                  </Link>
                  <button
                    className="mobile-home-disclosure"
                    type="button"
                    aria-label="Toggle Home section navigation"
                    aria-expanded={isMobileHomeMenuOpen}
                    aria-controls="mobile-home-navigation"
                    onClick={() => setIsMobileHomeMenuOpen((open) => !open)}
                  >
                    <span aria-hidden="true">▾</span>
                  </button>
                </div>
                {isMobileHomeMenuOpen && (
                  <div id="mobile-home-navigation" className="mobile-home-submenu" role="group" aria-label="Home sections">
                    {homeSectionItems.map((item) => {
                      const active = isHomeActive && activeSection === item.section;

                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          data-active={active ? "true" : undefined}
                          onClick={() => closeMobileMenu()}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {primaryItems.map((item) => {
                const active = isPrimaryActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-active={active ? "true" : undefined}
                    onClick={() => closeMobileMenu()}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
