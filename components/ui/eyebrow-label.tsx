type EyebrowLabelProps = {
  children: React.ReactNode;
};

export function EyebrowLabel({ children }: EyebrowLabelProps) {
  return <p className="eyebrow">{children}</p>;
}
