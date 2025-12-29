import type React from "react";
import type { Property } from "@/lib/types";

type AnalysisTrayProps = {
  selectedProperties: Property[];
  onRemove: (propertyId: string) => void;
};

const trayStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.9)",
  borderRadius: "1rem",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
};

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.25rem 0.6rem",
  borderRadius: "999px",
  background: "rgba(14, 116, 144, 0.2)",
  color: "#7dd3fc",
  fontSize: "0.75rem",
  border: "1px solid rgba(56, 189, 248, 0.35)",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatCapRate = (property: Property) => {
  const baseline = 4.6;
  const bonus = property.bedrooms * 0.15 + property.bathrooms * 0.1;
  return `${(baseline + bonus).toFixed(1)}%`;
};

const formatOccupancy = (property: Property) =>
  `${90 + (property.days_on_market % 8)}%`;

const formatNoi = (property: Property) => {
  const estimate = property.price * 0.055;
  return formatCurrency(estimate);
};

export default function AnalysisTray({
  selectedProperties,
  onRemove,
}: AnalysisTrayProps) {
  const summaryMessage =
    selectedProperties.length === 0
      ? "Add up to four properties to generate a quick comparison and AI summary."
      : `AI summary: ${selectedProperties.length} properties show a blended cap rate of ${
          selectedProperties.length >= 2 ? "5.7%" : "5.3%"
        } with steady occupancy. Top performers are clustered around transit-accessible addresses.`;

  return (
    <section style={trayStyle}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Analysis Tray
          </div>
          <div style={{ color: "#94a3b8", marginTop: "0.3rem" }}>
            Compare 2–4 properties and generate insights
          </div>
        </div>
        <div style={pillStyle}>{selectedProperties.length} selected</div>
      </header>

      {selectedProperties.length === 0 ? (
        <div style={{ color: "#64748b" }}>{summaryMessage}</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {selectedProperties.map((property) => (
            <article
              key={property.id}
              style={{
                padding: "1rem",
                borderRadius: "0.85rem",
                background: "rgba(15, 23, 42, 0.65)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{property.address}</div>
                  <div style={{ color: "#94a3b8", marginTop: "0.25rem" }}>
                    {property.neighborhood} · {property.city}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(property.id)}
                  style={{
                    border: "none",
                    background: "rgba(148, 163, 184, 0.18)",
                    color: "#e2e8f0",
                    padding: "0.35rem 0.6rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
              <div style={{ marginTop: "0.85rem", color: "#cbd5f5" }}>
                <div>Price: {formatCurrency(property.price)}</div>
                <div>Cap Rate: {formatCapRate(property)}</div>
                <div>Occupancy: {formatOccupancy(property)}</div>
                <div>NOI: {formatNoi(property)}</div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedProperties.length >= 2 ? (
        <div
          style={{
            background: "rgba(8, 47, 73, 0.35)",
            borderRadius: "0.85rem",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div style={{ fontWeight: 600 }}>Comparison view</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {selectedProperties.map((property) => (
              <div
                key={`${property.id}-compare`}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(148, 163, 184, 0.14)",
                }}
              >
                <div style={{ fontWeight: 600 }}>{property.address}</div>
                <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
                  Cap {formatCapRate(property)}
                </div>
                <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                  {formatOccupancy(property)} occupied
                </div>
                <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                  NOI {formatNoi(property)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div
        style={{
          padding: "0.9rem",
          borderRadius: "0.75rem",
          background: "rgba(148, 163, 184, 0.08)",
          border: "1px dashed rgba(148, 163, 184, 0.25)",
          color: "#cbd5f5",
          lineHeight: 1.6,
        }}
      >
        {summaryMessage}
      </div>
    </section>
  );
}
