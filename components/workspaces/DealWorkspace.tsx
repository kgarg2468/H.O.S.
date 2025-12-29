"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import type { Buyer, Deal, Event, Property } from "@/lib/types";

const panelStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.8)",
  borderRadius: "1rem",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  padding: "1.5rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: "0.75rem",
  fontSize: "1.05rem",
};

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.35rem 0.75rem",
  borderRadius: "999px",
  background: "rgba(56, 189, 248, 0.12)",
  color: "#bae6fd",
  fontSize: "0.85rem",
  border: "1px solid rgba(56, 189, 248, 0.35)",
};

const formatPrice = (price: number | null) =>
  price === null
    ? "—"
    : `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "TBD";

const formatStatus = (value: string) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

const getRefreshDelayMs = () => 30000 + Math.floor(Math.random() * 30001);

interface DealWorkspaceProps {
  deal: Deal;
  buyer?: Buyer;
  property?: Property;
  events: Event[];
}

export default function DealWorkspace({
  deal,
  buyer,
  property,
  events,
}: DealWorkspaceProps) {
  const timeline = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const explainability = [
    deal.offer_price && deal.list_price
      ? `Offer ${formatPrice(deal.offer_price)} is ${
          deal.offer_price >= deal.list_price ? "at/above" : "below"
        } list ${formatPrice(deal.list_price)}.`
      : "Offer price pending to validate pricing signal.",
    deal.contingencies.length > 0
      ? `Open contingencies: ${deal.contingencies
          .map(formatStatus)
          .join(", ")}.`
      : "No contingencies flagged on the contract.",
    `Financing type: ${formatStatus(deal.financing)}.`,
    timeline[0]
      ? `Latest milestone: ${formatStatus(timeline[0].type)} (${
          timeline[0].outcome
        }).`
      : "No recent timeline events logged.",
  ]
    .filter(Boolean)
    .slice(0, 4);
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header style={panelStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ fontSize: "1.35rem", fontWeight: 600 }}>
              {buyer?.name ?? "Buyer"} · {property?.address ?? "Property"}
            </div>
            <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
              Deal {deal.id} · {formatStatus(deal.stage)}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600 }}>
              {formatPrice(deal.offer_price ?? deal.list_price)}
            </div>
            <div style={{ color: "#94a3b8", marginTop: "0.25rem" }}>
              Target close {formatDate(deal.close_target)}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginTop: "1rem",
          }}
        >
          <span style={pillStyle}>Financing: {deal.financing}</span>
          <span style={pillStyle}>Status: {formatStatus(deal.status)}</span>
        </div>
      </header>

      <section style={panelStyle}>
        <div style={sectionTitleStyle}>Why the OS thinks this</div>
        <ul
          style={{
            color: "#94a3b8",
            lineHeight: 1.6,
            paddingLeft: "1.1rem",
            margin: 0,
          }}
        >
          {explainability.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      <section style={panelStyle}>
        <div style={sectionTitleStyle}>Deal timeline</div>
        <div style={{ display: "grid", gap: "0.85rem" }}>
          {timeline.map((event) => (
            <div
              key={event.id}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(148, 163, 184, 0.12)",
              }}
            >
              <div style={{ color: "#94a3b8", minWidth: "90px" }}>
                {formatDate(event.date)}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>
                  {formatStatus(event.type)}
                </div>
                <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                  {event.notes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <div style={panelStyle}>
          <div style={sectionTitleStyle}>Financials</div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                List price
              </div>
              <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                {formatPrice(deal.list_price)}
              </div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Offer price
              </div>
              <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                {formatPrice(deal.offer_price)}
              </div>
            </div>
          </div>
        </div>

        <div style={panelStyle}>
          <div style={sectionTitleStyle}>Participants</div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Agent
              </div>
              <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                {deal.agent}
              </div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Buyer
              </div>
              <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                {buyer?.name ?? "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={panelStyle}>
        <div style={sectionTitleStyle}>Offer details</div>
        <div style={{ display: "grid", gap: "0.85rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.12)",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>Offer submitted</div>
              <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                {formatDate(deal.offer_date)}
              </div>
            </div>
            <div style={{ color: "#94a3b8" }}>
              Close target {formatDate(deal.close_target)}
            </div>
          </div>
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "0.75rem",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.12)",
            }}
          >
            <div style={{ fontWeight: 600 }}>Contingencies</div>
            <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
              {deal.contingencies.length
                ? deal.contingencies.join(", ")
                : "None"}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
