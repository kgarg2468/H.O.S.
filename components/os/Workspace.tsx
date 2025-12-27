import type React from "react";

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

export default function Workspace() {
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
            Workspace
          </div>
          <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
            Central orchestration surface
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
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {["Mission Brief", "Active Workflows", "Resource Queue"].map(
          (title) => (
            <div key={title} style={panelStyle}>
              <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                {title}
              </div>
              <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>
                Curated overview of system state for rapid control and handoff.
              </p>
            </div>
          )
        )}
      </section>

      <section style={panelStyle}>
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          Command Surface
        </div>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          Issue directives, monitor feedback loops, and keep the operating space in
          focus. This pane stays persistent as the OS shell loads.
        </p>
      </section>
    </main>
  );
}
