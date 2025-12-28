import type React from "react";
import type { ActiveContext } from "@/lib/types";

const cardStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "0.9rem",
  background: "rgba(15, 23, 42, 0.65)",
  border: "1px solid rgba(148, 163, 184, 0.12)",
  boxShadow: "0 12px 40px rgba(2, 6, 23, 0.4)",
};

interface IntelligenceRailProps {
  activeContext: ActiveContext;
}

export default function IntelligenceRail({
  activeContext,
}: IntelligenceRailProps) {
  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1.75rem",
        background: "#0d1320",
        borderLeft: "1px solid rgba(148, 163, 184, 0.12)",
      }}
    >
      <div>
        <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          Intelligence Rail
        </div>
        <div style={{ color: "#7c879a", marginTop: "0.4rem" }}>
          Signals for {activeContext.title}
        </div>
        <div style={{ color: "#5b6b82", marginTop: "0.6rem" }}>
          Active context ·{" "}
          <span style={{ color: "#e2e8f0" }}>{activeContext.type}</span>
        </div>
      </div>
      {(activeContext.intelligence ?? []).map((card) => (
        <div key={card.title} style={cardStyle}>
          <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
            {card.title}
          </div>
          <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>
            {card.description}
          </p>
        </div>
      ))}
      <div style={{ marginTop: "auto", fontSize: "0.85rem", color: "#64748b" }}>
        Intelligence feed synced · 00:42s
      </div>
    </aside>
  );
}
