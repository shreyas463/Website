import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social link-preview card (WhatsApp, LinkedIn, X, iMessage…), rendered by
 * Next from code so it always matches the site theme. Satori supports only
 * flexbox layout and inline styles.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#04070b",
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#22d3ee",
              fontWeight: 700,
            }}
          >
            ~/{profile.monogram.toLowerCase()}_
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: "#34d399",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#34d399",
              }}
            />
            {profile.availability}
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#f8fafc" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#94a3b8", maxWidth: 980 }}>
            Software Engineer — full-stack systems, intelligent products, reliable automation
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex" }}>shreyaschaudhary.netlify.app</div>
          <div style={{ display: "flex", color: "#22d3ee" }}>
            GlobalLogic × Walgreens · Cal Poly Pomona
          </div>
        </div>
      </div>
    ),
    size,
  );
}
