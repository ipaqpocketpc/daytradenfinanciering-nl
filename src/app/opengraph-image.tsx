import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Daytraden Financiering - Krijg Trading Kapitaal"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(5, 150, 105, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
            }}
          >
            Daytraden Financiering
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: "linear-gradient(90deg, #059669 0%, #10B981 50%, #059669 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 20,
            }}
          >
            Trading Kapitaal Krijgen
          </span>
          <span
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Tot €200.000 trading kapitaal zonder eigen geld
          </span>
        </div>

        {/* Bottom Badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              backgroundColor: "rgba(5, 150, 105, 0.2)",
              border: "1px solid rgba(5, 150, 105, 0.3)",
              color: "#10B981",
              fontSize: 18,
            }}
          >
            daytradenfinanciering.nl
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
