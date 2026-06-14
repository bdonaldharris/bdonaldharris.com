type MotifVariant = "orbit" | "waveform" | "threads";

type MotifProps = {
  variant: MotifVariant;
  className?: string;
};

// Decorative, brand-aligned line motifs used to finish hero and CTA
// compositions. Purely atmospheric — always rendered aria-hidden.
export function Motif({ variant, className }: MotifProps) {
  return (
    <div
      className={`motif motif-${variant}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {variant === "orbit" && <OrbitMotif />}
      {variant === "waveform" && <WaveformMotif />}
      {variant === "threads" && <ThreadsMotif />}
    </div>
  );
}

function OrbitMotif() {
  return (
    <svg viewBox="0 0 240 240" fill="none" role="presentation">
      <circle cx="120" cy="120" r="100" stroke="rgba(154,164,184,0.14)" />
      <circle cx="120" cy="120" r="66" stroke="rgba(34,211,238,0.18)" />
      <circle cx="120" cy="120" r="34" stroke="rgba(214,169,74,0.18)" />
      <line x1="120" y1="120" x2="191" y2="49" stroke="rgba(34,211,238,0.22)" />
      <line x1="120" y1="120" x2="54" y2="120" stroke="rgba(214,169,74,0.22)" />
      <line x1="120" y1="120" x2="153" y2="177" stroke="rgba(34,211,238,0.18)" />
      <circle cx="120" cy="120" r="4.5" fill="#f7f6f3" />
      <circle cx="191" cy="49" r="5" fill="#22d3ee" />
      <circle cx="54" cy="120" r="4.5" fill="#d6a94a" />
      <circle cx="153" cy="177" r="3.5" fill="#22d3ee" />
    </svg>
  );
}

function WaveformMotif() {
  const heights = [
    20, 40, 28, 58, 44, 80, 34, 100, 54, 72, 26, 90, 42, 62, 30, 50, 22,
  ];
  return (
    <svg viewBox="0 0 240 132" fill="none" role="presentation">
      <defs>
        <linearGradient
          id="motif-wave"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="116"
          x2="0"
          y2="16"
        >
          <stop offset="0" stopColor="#d6a94a" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {heights.map((h, i) => {
        const x = 11 + i * 13.6;
        return (
          <line
            key={i}
            x1={x}
            y1={66 - h / 2}
            x2={x}
            y2={66 + h / 2}
            stroke="url(#motif-wave)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeOpacity="0.92"
          />
        );
      })}
    </svg>
  );
}

function ThreadsMotif() {
  const paths = [
    { d: "M0 26 C 70 6, 150 46, 240 22", stroke: "rgba(34,211,238,0.42)" },
    { d: "M0 60 C 80 42, 140 80, 240 54", stroke: "rgba(214,169,74,0.4)" },
    { d: "M0 95 C 60 113, 162 74, 240 99", stroke: "rgba(34,211,238,0.3)" },
    { d: "M0 130 C 92 112, 150 148, 240 124", stroke: "rgba(214,169,74,0.28)" },
    { d: "M0 160 C 70 146, 160 174, 240 152", stroke: "rgba(34,211,238,0.22)" },
  ];
  return (
    <svg viewBox="0 0 240 180" fill="none" role="presentation">
      {paths.map((p, i) => (
        <path key={i} d={p.d} stroke={p.stroke} strokeWidth="1.6" />
      ))}
      <circle cx="2" cy="26" r="3" fill="#22d3ee" />
      <circle cx="2" cy="60" r="3" fill="#d6a94a" />
      <circle cx="2" cy="95" r="2.5" fill="#22d3ee" />
    </svg>
  );
}
