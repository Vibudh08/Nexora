import { ImageResponse } from "next/og";

export const alt = "Nexora Digital Growth Marketing Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #050816, #0B1020, #111B39)",
          color: "#ffffff",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ color: "#67e8f9", fontSize: 28, fontWeight: 700 }}>
            NEXORA DIGITAL
          </div>
          <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: -4, marginTop: 28 }}>
            Marketing that drives revenue, not just traffic.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
