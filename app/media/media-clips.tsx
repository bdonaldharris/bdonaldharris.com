"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./media-clips.module.css";

type MediaClip = {
  id: string;
  title: string;
  category: string;
  duration?: string;
  format: "landscape" | "short";
  url: string;
};

const clips: MediaClip[] = [
  {
    id: "pSNrKKkUT-s",
    title: "HindSite: Helping Builders Stay in Command in the AI Coding Era",
    category: "Founder Insight",
    duration: "0:43",
    format: "landscape",
    url: "https://www.youtube.com/watch?v=pSNrKKkUT-s",
  },
  {
    id: "etEsM8ItD_I",
    title: "Builder Hubs on BIT Voices | Built for Real Builders",
    category: "BitVoices",
    duration: "0:29",
    format: "landscape",
    url: "https://www.youtube.com/watch?v=etEsM8ItD_I",
  },
  {
    id: "ju9Rj1ez5BM",
    title: "AI Risks: Building Ferraris Without Brakes?",
    category: "AI & Society",
    format: "short",
    url: "https://www.youtube.com/shorts/ju9Rj1ez5BM",
  },
  {
    id: "9cuYTjmjHsI",
    title: "Travel Should Be About the Traveler",
    category: "Conversation",
    format: "short",
    url: "https://www.youtube.com/shorts/9cuYTjmjHsI",
  },
  {
    id: "l7xGRs1ADE0",
    title: "AI DJ: The Future of Nightclub Entertainment?",
    category: "AI & Culture",
    format: "short",
    url: "https://www.youtube.com/shorts/l7xGRs1ADE0",
  },
  {
    id: "x06EEDrg4xg",
    title: "AI Natural Language Processing: Is It Really That Useful?",
    category: "Technology",
    format: "short",
    url: "https://www.youtube.com/shorts/x06EEDrg4xg",
  },
];

function thumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function MediaClips() {
  const [activeClip, setActiveClip] = useState<MediaClip | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function openClip(clip: MediaClip, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveClip(clip);
  }

  function closeClip() {
    setActiveClip(null);
  }

  useEffect(() => {
    if (!activeClip) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeClip();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;

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
  }, [activeClip]);

  const landscapeClips = clips.filter((clip) => clip.format === "landscape");
  const shortClips = clips.filter((clip) => clip.format === "short");

  return (
    <>
      <div className={styles.featuredGrid}>
        {landscapeClips.map((clip) => (
          <ClipCard key={clip.id} clip={clip} onOpen={openClip} />
        ))}
      </div>

      <div className={styles.shortsGrid}>
        {shortClips.map((clip) => (
          <ClipCard key={clip.id} clip={clip} onOpen={openClip} />
        ))}
      </div>

      <div className={styles.channelLink}>
        <Link
          className="button-secondary"
          href="https://www.youtube.com/@notablebit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the YouTube Channel
        </Link>
      </div>

      {activeClip && (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeClip();
          }}
        >
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-dialog-title"
          >
            <div className={styles.dialogHeader}>
              <div>
                <p className={styles.dialogCategory}>{activeClip.category}</p>
                <h3 id="media-dialog-title">{activeClip.title}</h3>
              </div>
              <button
                ref={closeButtonRef}
                className={styles.closeButton}
                type="button"
                onClick={closeClip}
                aria-label="Close video"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div
              className={`${styles.videoFrame} ${
                activeClip.format === "short" ? styles.videoFrameShort : ""
              }`}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeClip.id}`}
                title={activeClip.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <Link
              className={styles.youtubeLink}
              href={activeClip.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function ClipCard({
  clip,
  onOpen,
}: {
  clip: MediaClip;
  onOpen: (clip: MediaClip, trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      className={`${styles.card} ${
        clip.format === "short" ? styles.shortCard : styles.landscapeCard
      }`}
      type="button"
      onClick={(event) => onOpen(clip, event.currentTarget)}
      aria-label={`Play ${clip.title}`}
    >
      <span
        className={styles.thumbnail}
        style={{ backgroundImage: `url(${thumbnailUrl(clip.id)})` }}
        aria-hidden="true"
      >
        <span className={styles.thumbnailScrim} />
        <span className={styles.playIcon}>▶</span>
        {clip.duration && <span className={styles.duration}>{clip.duration}</span>}
      </span>
      <span className={styles.cardCopy}>
        <span className={styles.category}>{clip.category}</span>
        <span className={styles.title}>{clip.title}</span>
      </span>
    </button>
  );
}
