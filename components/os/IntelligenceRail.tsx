"use client";

import { useMemo, useState } from "react";
import type React from "react";
import type { ActiveContextItem } from "@/lib/types";
import insightsData from "@/data/insights.json";

const cardStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "0.9rem",
  background: "rgba(15, 23, 42, 0.65)",
  border: "1px solid rgba(148, 163, 184, 0.12)",
  boxShadow: "0 12px 40px rgba(2, 6, 23, 0.4)",
};

const toastContainerStyle: React.CSSProperties = {
  position: "fixed",
  right: "1.5rem",
  bottom: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  zIndex: 40,
  pointerEvents: "none",
};

const toastStyle: React.CSSProperties = {
  minWidth: "260px",
  maxWidth: "320px",
  background: "rgba(15, 23, 42, 0.92)",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  borderRadius: "0.85rem",
  padding: "0.85rem 1rem",
  boxShadow: "0 14px 30px rgba(2, 6, 23, 0.35)",
  color: "#e2e8f0",
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
  pointerEvents: "auto",
};

const toastHeaderStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#f8fafc",
};

const toastBodyStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#cbd5f5",
  lineHeight: 1.4,
};

const toastButtonStyle: React.CSSProperties = {
  alignSelf: "flex-end",
  background: "transparent",
  border: "none",
  color: "#94a3b8",
  fontSize: "0.75rem",
  cursor: "pointer",
  padding: 0,
};

type InsightRecord = {
  id: string;
  buyer_name?: string;
  signal_level?: "standard" | "high";
  signal_summary?: string;
};

interface IntelligenceRailProps {
  activeContext: ActiveContextItem;
}

export default function IntelligenceRail({
  activeContext,
}: IntelligenceRailProps) {
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);

  const highSignalInsights = useMemo(
    () =>
      (insightsData as InsightRecord[]).filter(
        (insight) => insight.signal_level === "high",
      ),
    [],
  );

  const visibleInsights = highSignalInsights.filter(
    (insight) => !dismissedInsights.includes(insight.id),
  );

  const handleDismiss = (insightId: string) => {
    setDismissedInsights((prev) =>
      prev.includes(insightId) ? prev : [...prev, insightId],
    );
  };

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
          Active context · <span style={{ color: "#e2e8f0" }}>{activeContext}</span>
        </div>
      </div>
      {activeContext.intelligence.map((card) => (
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
      {visibleInsights.length > 0 ? (
        <div style={toastContainerStyle} aria-live="polite">
          {visibleInsights.map((insight) => (
            <div key={insight.id} style={toastStyle} role="status">
              <div style={toastHeaderStyle}>High-signal insight</div>
              <div style={toastBodyStyle}>
                {insight.signal_summary ??
                  `New high-signal insight for ${
                    insight.buyer_name ?? "this buyer"
                  }.`}
              </div>
              <button
                type="button"
                style={toastButtonStyle}
                onClick={() => handleDismiss(insight.id)}
                aria-label="Dismiss insight toast"
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
