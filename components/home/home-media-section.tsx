"use client";

import { Play, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MediaItem = {
  videoId: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  format: string;
};

type MediaArtifact = {
  featuredPodcast: MediaItem;
  recentVideos: MediaItem[];
  shorts: MediaItem[];
};

export function HomeMediaSection({ media }: { media: MediaArtifact }) {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeItem) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItem(null);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [activeItem]);

  function openItem(item: MediaItem, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveItem(item);
  }

  return (
    <>
      <div className="home-section-band">
        <div className="home-section-band-inner">MEDIA</div>
      </div>

      <section className="home-media-content" aria-label="Media">
        <div className="home-media-grid">
          <article className="media-featured">
            <p className="latest-podcast-kicker">Most Recent Podcast Episode</p>
            <h2>{media.featuredPodcast.title}</h2>
            <MediaTrigger item={media.featuredPodcast} variant="featured" onOpen={openItem} />
            <p className="latest-podcast-description">{media.featuredPodcast.description}</p>
          </article>

          <div className="media-rail">
            {media.recentVideos.length > 0 && (
              <section className="media-collection" aria-label="Recent Videos">
                <div className="media-recent-list">
                  {media.recentVideos.map((item) => (
                    <MediaTrigger key={item.videoId} item={item} variant="recent" onOpen={openItem} />
                  ))}
                </div>
              </section>
            )}

            {media.shorts.length > 0 && (
              <section className="media-collection" aria-label="Shorts">
                <div className="media-shorts-list">
                  {media.shorts.map((item) => (
                    <MediaTrigger key={item.videoId} item={item} variant="short" onOpen={openItem} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      {activeItem && (
        <div
          className="podcast-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveItem(null);
          }}
        >
          <div
            ref={dialogRef}
            className="podcast-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-modal-title"
          >
            <header className="podcast-modal-header">
              <h2 id="media-modal-title">{activeItem.title}</h2>
              <button
                ref={closeButtonRef}
                className="podcast-modal-close"
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close video player"
              >
                <X size={26} />
              </button>
            </header>

            <div
              className={`podcast-modal-video${activeItem.format === "short" ? " podcast-modal-video-short" : ""}`}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeItem.videoId}?autoplay=1`}
                title={activeItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <Link
              className="button-secondary podcast-youtube-link"
              href={activeItem.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in YouTube
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function MediaTrigger({
  item,
  variant,
  onOpen,
}: {
  item: MediaItem;
  variant: "featured" | "recent" | "short";
  onOpen: (item: MediaItem, trigger: HTMLButtonElement) => void;
}) {
  const label = variant === "featured" ? `Play ${item.title}` : `Watch ${item.title}`;

  return (
    <button
      className={`media-trigger media-trigger-${variant}`}
      type="button"
      onClick={(event) => onOpen(item, event.currentTarget)}
      aria-label={label}
    >
      <span className="media-trigger-thumbnail">
        <Image
          src={item.thumbnailUrl}
          alt=""
          fill
          sizes={variant === "featured" ? "(max-width: 860px) 100vw, 64vw" : "(max-width: 540px) 44vw, 18vw"}
        />
        <span className="media-trigger-play" aria-hidden="true">
          <Play weight="fill" />
        </span>
      </span>
      {variant !== "featured" && <span className="media-trigger-title">{item.title}</span>}
    </button>
  );
}
