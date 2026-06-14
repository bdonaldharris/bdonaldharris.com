import { EyebrowLabel } from "@/components/ui/eyebrow-label";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  tone?: "cyan" | "gold";
};

export function SectionHeading({ eyebrow, title, body, tone }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow && <EyebrowLabel tone={tone}>{eyebrow}</EyebrowLabel>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
