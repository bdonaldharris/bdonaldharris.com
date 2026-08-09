"use client";

import { Play, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type LatestPodcast = {
  videoId: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
};

export function LatestPodcastFeature({ episode }: { episode: LatestPodcast }) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const playButton = playButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
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
      playButton?.focus();
    };
  }, [open]);

  return (
    <section className="section latest-podcast" aria-labelledby="latest-podcast-heading">
      <p className="latest-podcast-kicker">Most Recent Podcast Episode</p>
      <h2 id="latest-podcast-heading">{episode.title}</h2>

      <button
        ref={playButtonRef}
        className="latest-podcast-player"
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play ${episode.title}`}
      >
        <Image
          src={episode.thumbnailUrl}
          alt=""
          fill
          sizes="(max-width: 760px) 92vw, 1120px"
        />
        <span className="latest-podcast-play" aria-hidden="true">
          <Play weight="fill" size={42} />
        </span>
      </button>

      <p className="latest-podcast-description">{episode.description}</p>

      {open && (
        <div
          className="podcast-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className="podcast-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="podcast-modal-title"
          >
            <header className="podcast-modal-header">
              <h2 id="podcast-modal-title">{episode.title}</h2>
              <button
                ref={closeButtonRef}
                className="podcast-modal-close"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video player"
              >
                <X size={26} />
              </button>
            </header>

            <div className="podcast-modal-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${episode.videoId}?autoplay=1`}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <Link
              className="button-secondary podcast-youtube-link"
              href={episode.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in YouTube
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
