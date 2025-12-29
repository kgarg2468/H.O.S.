"use client";

import type React from "react";
import { useMemo, useState } from "react";
import type { Property } from "@/lib/types";

const panelStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.8)",
  borderRadius: "1rem",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  padding: "1.5rem",
};

const chipStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.4rem 0.75rem",
  borderRadius: "999px",
  background: "rgba(59, 130, 246, 0.15)",
  color: "#bfdbfe",
  fontSize: "0.85rem",
  border: "1px solid rgba(59, 130, 246, 0.4)",
};

const formatPrice = (price: number) =>
  `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const formatType = (type: string) =>
  type
    .split("_")
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
    .join(" ");

interface PropertyWorkspaceProps {
  property: Property;
  properties: Property[];
}

export default function PropertyWorkspace({
  property,
  properties,
}: PropertyWorkspaceProps) {
  const analysisLimit = 3;
  const [analysisIds, setAnalysisIds] = useState<string[]>([]);

  const comparableProperties = useMemo(() => {
    return properties
      .filter(
        (item) => item.id !== property.id && item.type === property.type
      )
      .slice(0, 3);
  }, [properties, property.id, property.type]);

  const relatedProperties = useMemo(
    () => properties.filter((item) => item.id !== property.id).slice(0, 4),
    [properties, property.id]
  );

  const isInAnalysis = analysisIds.includes(property.id);
  const isAtLimit = analysisIds.length >= analysisLimit;
  const selectedProperty = property;

  const detailChips = [
    {
      label: "Type",
      value: formatType(property.type),
    },
    {
      label: "Beds",
      value: `${property.bedrooms}`,
    },
    {
      label: "Baths",
      value: `${property.bathrooms}`,
    },
    {
      label: "Sq Ft",
      value: `${property.sqft.toLocaleString("en-US")}`,
    },
    {
      label: "Price",
      value: formatPrice(property.price),
    },
    {
      label: "Days on market",
      value: `${property.days_on_market} days`,
    },
    {
      label: "Status",
      value: formatType(property.status),
    },
  ];

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Property Workspace
          </div>
          <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
            {property.address}, {property.city}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setAnalysisIds((prev) =>
              prev.includes(property.id)
                ? prev.filter((id) => id !== property.id)
                : [...prev, property.id]
            );
          }}
          disabled={!isInAnalysis && isAtLimit}
          style={{
            padding: "0.6rem 1.1rem",
            borderRadius: "999px",
            border: "1px solid rgba(59, 130, 246, 0.5)",
            background: isInAnalysis
              ? "rgba(59, 130, 246, 0.25)"
              : isAtLimit
                ? "rgba(15, 23, 42, 0.4)"
                : "rgba(15, 23, 42, 0.8)",
            color: isInAnalysis
              ? "#e0f2fe"
              : isAtLimit
                ? "#64748b"
                : "#bfdbfe",
            fontWeight: 600,
            cursor: !isInAnalysis && isAtLimit ? "not-allowed" : "pointer",
          }}
        >
          {isInAnalysis
            ? "Added to analysis"
            : isAtLimit
              ? "Analysis tray full"
              : "Add to analysis"}
        </button>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {relatedProperties.map((item) => (
          <div
            key={item.id}
            style={{
              textAlign: "left",
              background: "rgba(15, 23, 42, 0.8)",
              borderRadius: "0.9rem",
              border: "1px solid rgba(148, 163, 184, 0.12)",
              padding: "0.85rem 1rem",
              color: "#e2e8f0",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
              {item.address}
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
              {item.neighborhood} · {formatPrice(item.price)}
            </div>
          </div>
        ))}
      </section>

      <section style={panelStyle}>
        <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
          Property details
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {detailChips.map((chip) => (
            <div key={chip.label} style={chipStyle}>
              <span style={{ color: "#7dd3fc" }}>{chip.label}:</span>
              <span>{chip.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "1.5rem",
        }}
      >
        <div style={{ ...panelStyle, minHeight: "260px" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
            Map preview
          </div>
          <div
            style={{
              height: "190px",
              borderRadius: "0.9rem",
              border: "1px dashed rgba(148, 163, 184, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.85))",
              color: "#94a3b8",
            }}
          >
            Map placeholder · {selectedProperty.neighborhood}
          </div>
        </div>

        <div style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
            Remarks
          </div>
          <p style={{ color: "#cbd5f5", lineHeight: 1.6 }}>
            {property.address} offers {property.bedrooms} beds and
            {" "}
            {property.bathrooms} baths with
            {" "}
            {property.sqft.toLocaleString("en-US")} sq ft. Listed
            {" "}
            {property.days_on_market} days ago at
            {" "}
            {formatPrice(property.price)}. Key highlights include
            {" "}
            {property.features.slice(0, 3).join(", ")}.
          </p>
        </div>
      </section>

      <section style={panelStyle}>
        <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
          Comparable listings
        </div>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {comparableProperties.map((property) => (
            <div
              key={property.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(148, 163, 184, 0.12)",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{property.address}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                  {property.bedrooms} bed · {property.bathrooms} bath ·
                  {" "}
                  {property.sqft.toLocaleString("en-US")} sq ft
                </div>
              </div>
              <div style={{ fontWeight: 600, color: "#e0f2fe" }}>
                {formatPrice(property.price)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
