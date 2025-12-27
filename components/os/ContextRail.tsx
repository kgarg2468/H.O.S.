import type React from "react";
import type { RailSection } from "@/lib/types";

const sections: RailSection[] = [
  {
    title: "System",
    items: ["Kernel", "Processes", "Memory", "Storage"],
  },
  {
    title: "Environment",
    items: ["Networks", "Sensors", "Agents", "Policies"],
  },
  {
    title: "Sessions",
    items: ["Operator", "Diagnostics", "Playback"],
  },
];

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
};

export default function ContextRail() {
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
          {section.items.map((item) => (
            <div key={item} style={itemStyle}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
