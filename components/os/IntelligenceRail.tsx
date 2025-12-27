import type React from "react";
import type { IntelligenceCard } from "@/lib/types";

const cards: IntelligenceCard[] = [
  {
    title: "Signal Sweep",
    description: "Watch incoming telemetry and prioritize action items.",
  },
  {
    title: "Recommendations",
    description: "Suggested next moves based on active context signals.",
  },
  {
    title: "Insights",
    description: "Summaries distilled from logs and operator guidance.",
  },
];

const cardStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "0.9rem",
  background: "rgba(15, 23, 42, 0.65)",
  border: "1px solid rgba(148, 163, 184, 0.12)",
  boxShadow: "0 12px 40px rgba(2, 6, 23, 0.4)",
};

export type IntelligenceNotification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
};

type IntelligenceRailProps = {
  activeContext: string;
  notifications: IntelligenceNotification[];
};

export default function IntelligenceRail({
  activeContext,
  notifications,
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
          Proactive guidance and signals
        </div>
        <div style={{ color: "#5b6b82", marginTop: "0.6rem" }}>
          Active context · <span style={{ color: "#e2e8f0" }}>{activeContext}</span>
        </div>
      </div>

      {notifications.length > 0 && (
        <div
          style={{
            padding: "0.9rem",
            borderRadius: "0.9rem",
            background: "rgba(59, 130, 246, 0.12)",
            border: "1px solid rgba(59, 130, 246, 0.35)",
            boxShadow: "0 16px 30px rgba(15, 23, 42, 0.35)",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
            HIGH-SIGNAL ALERT
          </div>
          {notifications.map((notification) => (
            <div key={notification.id}>
              <div style={{ fontWeight: 600 }}>{notification.title}</div>
              <div style={{ color: "#cbd5f5", fontSize: "0.9rem" }}>
                {notification.message}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                {notification.timestamp}
              </div>
            </div>
          ))}
        </div>
      )}

      {cards.map((card) => (
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
