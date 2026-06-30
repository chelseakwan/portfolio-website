import { ImageResponse } from "next/og";

// Static OG / link-preview image (PRD §8.2). The animated hero can't be
// captured in a static preview, so this is the designed fallback card.
export const alt = "Chelsea Kwan — Math, markets & data.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F1EAD8",
          color: "#161310",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontFamily: "monospace",
            opacity: 0.6,
          }}
        >
          CK.
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 1, fontWeight: 700 }}>
            Chelsea Kwan
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Math, markets &amp; data.
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontFamily: "monospace",
            opacity: 0.6,
          }}
        >
          Math &amp; Business @ Northeastern
        </div>
      </div>
    ),
    { ...size }
  );
}
