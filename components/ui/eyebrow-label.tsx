type EyebrowLabelProps = {
  children: React.ReactNode;
  tone?: "cyan" | "gold";
};

export function EyebrowLabel({ children, tone = "cyan" }: EyebrowLabelProps) {
  return (
    <p className={`eyebrow${tone === "gold" ? " eyebrow-gold" : ""}`}>{children}</p>
  );
}
