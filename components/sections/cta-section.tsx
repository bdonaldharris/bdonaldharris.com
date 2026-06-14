import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Motif } from "@/components/ui/motif";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
  tone?: "cyan" | "gold";
  motif?: "orbit" | "waveform" | "threads";
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
  motif = "orbit",
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="section cta-section">
      <div className="cta-content">
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
      </div>
      <Motif variant={motif} className="cta-motif" />
    </section>
  );
}
