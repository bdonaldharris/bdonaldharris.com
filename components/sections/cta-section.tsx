import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
  tone?: "cyan" | "gold";
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
};

export function CTASection({
  eyebrow,
  title,
  body,
  tone = "gold",
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="section cta-section">
      <SectionHeading eyebrow={eyebrow} title={title} body={body} tone={tone} />
      <div className="button-row">
        <Link className="button-primary" href={primaryCta.href}>
          {primaryCta.label}
        </Link>
        {secondaryCta && (
          <Link className="button-secondary" href={secondaryCta.href}>
            {secondaryCta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
