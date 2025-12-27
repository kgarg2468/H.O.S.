import type React from "react";
import type { ActiveContextItem } from "@/lib/types";

const statusPillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.35rem 0.75rem",
  borderRadius: "999px",
  background: "rgba(59, 130, 246, 0.15)",
  color: "#bfdbfe",
  fontSize: "0.85rem",
  border: "1px solid rgba(59, 130, 246, 0.4)",
};

const panelStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.8)",
  borderRadius: "1rem",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  padding: "1.5rem",
};

const metricCardStyle: React.CSSProperties = {
  padding: "0.85rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  background: "rgba(15, 23, 42, 0.7)",
};

interface WorkspaceProps {
  activeContext: ActiveContextItem;
}

export default function Workspace({ activeContext }: WorkspaceProps) {
  return (
    <main
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        background: "linear-gradient(180deg, #0b1017 0%, #0b1220 100%)",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {activeContext.title}
          </div>
          <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
            {activeContext.description}
          </div>
        </div>
        <div style={statusPillStyle}>
          <span
            style={{
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "999px",
              background: "#38bdf8",
              display: "inline-block",
            }}
          />
          Live
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {activeContext.metrics.map((metric) => (
          <div key={metric.label} style={metricCardStyle}>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              {metric.label}
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              {metric.value}
            </div>
          </div>
        ))}
      </section>

      <section style={panelStyle}>
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          Active Focus
        </div>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          {activeContext.status}
        </p>
      </section>
    </main>
  );
}
