import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 76% 38%, rgba(34,211,238,0.12), transparent 34%), radial-gradient(circle at 66% 66%, rgba(214,169,74,0.14), transparent 38%), linear-gradient(135deg, #070b12 0%, #0b1220 58%, #090d14 100%)",
          color: "#f4e6c5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            opacity: 0.55,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              style={{
                position: "absolute",
                left: `${590 + row * 72}px`,
                top: `${72 + row * 72}px`,
                width: `${410 - row * 26}px`,
                height: "1px",
                background: row % 2 === 0 ? "#d6a94a" : "#22d3ee",
              }}
            />
          ))}
          {[0, 1, 2, 3, 4].map((col) => (
            <div
              key={col}
              style={{
                position: "absolute",
                left: `${690 + col * 92}px`,
                top: "110px",
                width: "1px",
                height: `${330 + col * 20}px`,
                background: col % 2 === 0 ? "#22d3ee" : "#d6a94a",
              }}
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((node) => (
            <div
              key={node}
              style={{
                position: "absolute",
                left: `${645 + (node % 4) * 122}px`,
                top: `${128 + Math.floor(node / 4) * 210 + (node % 2) * 42}px`,
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                border: `2px solid ${node % 2 === 0 ? "#22d3ee" : "#d6a94a"}`,
                background: "#0b1220",
              }}
            />
          ))}
        </div>

        <div
          style={{
            width: "650px",
            padding: "72px 0 0 72px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "72px",
              height: "3px",
              background: "linear-gradient(90deg, #d6a94a, #22d3ee)",
            }}
          />
          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.04,
              letterSpacing: "-1.5px",
              maxWidth: "610px",
            }}
          >
            Listen to the Software: Building With AI as an Act of Discovery
          </div>
          <div
            style={{
              marginTop: "8px",
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              color: "rgba(244,230,197,0.72)",
            }}
          >
            B Donald Harris
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "56px",
            bottom: "46px",
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(244,230,197,0.55)",
          }}
        >
          bdonaldharris.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
