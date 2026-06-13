type ContentGridProps = {
  children: React.ReactNode;
  variant?: "two" | "three" | "four";
};

export function ContentGrid({ children, variant = "three" }: ContentGridProps) {
  return <div className={`content-grid content-grid-${variant}`}>{children}</div>;
}
