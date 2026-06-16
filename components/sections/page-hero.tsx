import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Motif } from "@/components/ui/motif";

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  body: string;
  tone?: "cyan" | "gold";
  motif?: "orbit" | "waveform" | "threads";
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
};

export function PageHero({
  eyebrow,
  title,
  body,
  tone,
  motif,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className={`section page-hero${motif ? " page-hero-framed" : ""}`}>
      <div className="page-hero-copy">
        {eyebrow && <EyebrowLabel tone={tone}>{eyebrow}</EyebrowLabel>}
        <h1>{title}</h1>
        <p>{body}</p>
        {(primaryCta || secondaryCta) && (
          <div className="button-row">
            {primaryCta && (
              <Link className="button-primary" href={primaryCta.href}>
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link className="button-secondary" href={secondaryCta.href}>
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
      {motif && <Motif variant={motif} className="page-hero-motif" />}
    </section>
  );
}
