import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
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
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="section page-hero">
      <EyebrowLabel>{eyebrow}</EyebrowLabel>
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
    </section>
  );
}
