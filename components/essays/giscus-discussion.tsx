"use client";

import { useEffect, useRef } from "react";
import styles from "./giscus-discussion.module.css";

const GISCUS_REPO = "bdonaldharris/bdonaldharris.com";
const GISCUS_REPO_ID = "R_kgDOS59KfA";
const GISCUS_CATEGORY = "Essay Discussions";
const GISCUS_CATEGORY_ID = "DIC_kwDOS59KfM4DEYEQ";

export function GiscusDiscussion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.replaceChildren();

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS_REPO);
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", GISCUS_CATEGORY);
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <section className={styles.discussion} aria-labelledby="essay-discussion-title">
      <h2 id="essay-discussion-title">
        I&apos;m interested in your thoughts. Let&apos;s discuss
      </h2>
      <div ref={containerRef} className={styles.giscus} />
    </section>
  );
}
