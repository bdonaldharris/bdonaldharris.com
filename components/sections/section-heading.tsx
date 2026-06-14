import { EyebrowLabel } from "@/components/ui/eyebrow-label";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
