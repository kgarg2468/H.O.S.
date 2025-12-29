"use client";

import { useState } from "react";
import type React from "react";
import type { ActiveContext, RailSection } from "@/lib/types";

const headerStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#8b949e",
  marginBottom: "0.75rem",
};

const itemStyle: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  borderRadius: "0.6rem",
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(148, 163, 184, 0.12)",
  marginBottom: "0.5rem",
  fontSize: "0.9rem",
  transition:
    "background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
};

const itemMetaStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#94a3b8",
  marginTop: "0.35rem",
};

const activeItemStyle: React.CSSProperties = {
  border: "1px solid rgba(59, 130, 246, 0.55)",
  background: "rgba(59, 130, 246, 0.15)",
  color: "#e0f2fe",
  boxShadow: "0 8px 18px rgba(59, 130, 246, 0.18)",
};

const hoverItemStyle: React.CSSProperties = {
  border: "1px solid rgba(148, 163, 184, 0.4)",
  background: "rgba(148, 163, 184, 0.12)",
  transform: "translateY(-1px)",
  boxShadow: "0 10px 20px rgba(15, 23, 42, 0.25)",
};

interface ContextRailProps {
  sections: RailSection[];
  activeItemId: ActiveContext["id"];
  onSelect: (item: ActiveContext) => void;
}

export default function ContextRail({
  sections,
  activeItemId,
  onSelect,
}: ContextRailProps) {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1.75rem",
        background: "#0f1520",
        borderRight: "1px solid rgba(148, 163, 184, 0.12)",
      }}
    >
      <div>
        <div style={{ fontSize: "1.15rem", fontWeight: 600 }}>
          Context Rail
        </div>
        <div style={{ color: "#6b7280", marginTop: "0.4rem" }}>
          Live system awareness
        </div>
      </div>
      {sections.map((section) => (
        <div key={section.title}>
          <div style={headerStyle}>{section.title}</div>
          {section.items.map((item) => {
            const isActive = item.id === activeItemId;
            const isHovered = item.id === hoveredItemId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                style={{
                  ...itemStyle,
                  ...(isActive ? activeItemStyle : null),
                  ...(isHovered && !isActive ? hoverItemStyle : null),
                  textAlign: "left",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div style={itemMetaStyle}>{item.status}</div>
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
