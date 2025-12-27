import type React from "react";
import { useMemo, useState } from "react";
import AnalysisTray, { type Property } from "../workspaces/AnalysisTray";

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

const buttonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "0.65rem",
  padding: "0.45rem 0.85rem",
  background: "rgba(56, 189, 248, 0.18)",
  color: "#e2e8f0",
  cursor: "pointer",
  fontWeight: 600,
};

const properties: Property[] = [
  {
    id: "harbor-view",
    name: "Harbor View",
    address: "112 Dockside Ave",
    price: "$8.4M",
    capRate: "5.4%",
    occupancy: "93%",
    noi: "$505K",
  },
  {
    id: "radius-lofts",
    name: "Radius Lofts",
    address: "41 Market Loop",
    price: "$6.1M",
    capRate: "5.8%",
    occupancy: "96%",
    noi: "$410K",
  },
  {
    id: "copperline-yard",
    name: "Copperline Yard",
    address: "88 Foundry Street",
    price: "$9.3M",
    capRate: "5.6%",
    occupancy: "91%",
    noi: "$545K",
  },
  {
    id: "atlas-point",
    name: "Atlas Point",
    address: "23 Beacon Row",
    price: "$7.7M",
    capRate: "5.2%",
    occupancy: "94%",
    noi: "$462K",
  },
];

export default function Workspace() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedProperties = useMemo(
    () => properties.filter((property) => selectedIds.includes(property.id)),
    [selectedIds]
  );

  const availableProperties = useMemo(
    () => properties.filter((property) => !selectedIds.includes(property.id)),
    [selectedIds]
  );

  const addProperty = (propertyId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(propertyId) || prev.length >= 4) {
        return prev;
      }
      return [...prev, propertyId];
    });
  };

  const removeProperty = (propertyId: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== propertyId));
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>Property Intake</div>
            <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
              Add up to four properties for analysis
            </div>
          </div>
          <div style={{ color: "#94a3b8" }}>
            {selectedIds.length}/4 selected
          </div>
        </div>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {availableProperties.map((property) => (
            <div
              key={property.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                padding: "0.85rem",
                borderRadius: "0.85rem",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(148, 163, 184, 0.12)",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{property.name}</div>
                <div style={{ color: "#94a3b8", marginTop: "0.25rem" }}>
                  {property.address}
                </div>
              </div>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  opacity: selectedIds.length >= 4 ? 0.5 : 1,
                  cursor:
                    selectedIds.length >= 4 ? "not-allowed" : "pointer",
                }}
                onClick={() => addProperty(property.id)}
                disabled={selectedIds.length >= 4}
              >
                Add
              </button>
            </div>
          ))}
          {availableProperties.length === 0 ? (
            <div style={{ color: "#64748b" }}>
              All available properties are in the tray.
            </div>
          ) : null}
        </div>
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

      <AnalysisTray
        selectedProperties={selectedProperties}
        onRemove={removeProperty}
      />
    </main>
  );
}
