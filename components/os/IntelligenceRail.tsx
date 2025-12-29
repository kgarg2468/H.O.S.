"use client";

import { useMemo, useState } from "react";
import type React from "react";
import type {
  ActiveContext,
  Buyer,
  Deal,
  Event,
  Insight,
  Property,
} from "@/lib/types";
import buyersData from "@/data/buyers.json";
import dealsData from "@/data/deals.json";
import eventsData from "@/data/events.json";
import insightsData from "@/data/insights.json";
import propertiesData from "@/data/properties.json";

const cardStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "0.9rem",
  background: "rgba(15, 23, 42, 0.65)",
  border: "1px solid rgba(148, 163, 184, 0.12)",
  boxShadow: "0 12px 40px rgba(2, 6, 23, 0.4)",
  transition:
    "border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, background-color 160ms ease",
};

const cardHoverStyle: React.CSSProperties = {
  border: "1px solid rgba(148, 163, 184, 0.35)",
  background: "rgba(30, 41, 59, 0.8)",
  boxShadow: "0 16px 36px rgba(15, 23, 42, 0.5)",
  transform: "translateY(-2px)",
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
  transition:
    "border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, background-color 160ms ease",
};

const toastHoverStyle: React.CSSProperties = {
  border: "1px solid rgba(148, 163, 184, 0.45)",
  background: "rgba(30, 41, 59, 0.95)",
  transform: "translateY(-2px)",
  boxShadow: "0 18px 36px rgba(2, 6, 23, 0.5)",
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
  transition: "color 160ms ease",
};

const toastButtonHoverStyle: React.CSSProperties = {
  color: "#e2e8f0",
};

interface IntelligenceRailProps {
  activeContext: ActiveContext;
}

const buyers = buyersData as Buyer[];
const deals = dealsData as Deal[];
const events = eventsData as Event[];
const insights = insightsData as Insight[];
const properties = propertiesData as Property[];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number | null | undefined) =>
  typeof value === "number" ? currencyFormatter.format(value) : "—";

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

const titleCase = (value: string) =>
  value
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");

const buildCommandCards = () => {
  const recentEvents = [...eventsData]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
    .map(
      (event) =>
        `${formatDate(event.date)} · ${titleCase(event.type)} — ${event.notes}`
    );
  const priorities = insightsData
    .flatMap((insight) => insight.next_actions)
    .slice(0, 3);

  return [
    {
      title: "What Changed",
      description:
        recentEvents.length > 0
          ? recentEvents.map((item) => `• ${item}`).join("\n")
          : "No new activity logged today.",
    },
    {
      title: "Today’s Priorities",
      description:
        priorities.length > 0
          ? priorities.map((item) => `• ${item}`).join("\n")
          : "No priority actions queued.",
    },
  ];
};

const buildBuyerCards = (buyerId: string) => {
  const buyer = buyersData.find((item) => item.id === buyerId);
  const insight = insightsData.find((item) => item.buyer_id === buyerId);
  const buyerEvents = eventsData
    .filter((event) => event.buyer_id === buyerId)
    .sort((a, b) => b.date.localeCompare(a.date));
  const riskSignals = [
    buyer?.preapproved === false
      ? "Financing pre-approval still pending."
      : null,
    buyerEvents[0]
      ? `Latest update: ${titleCase(buyerEvents[0].type)} (${buyerEvents[0].outcome}).`
      : null,
    buyerEvents.some((event) => event.outcome.includes("counter"))
      ? "Recent offer counter indicates negotiation risk."
      : null,
  ].filter(Boolean) as string[];

  return [
    {
      title: "Insights",
      description: insight
        ? [
            `Fit score: ${insight.fit_score}`,
            `Rationale: ${insight.rationale}`,
            `Top properties: ${insight.top_properties.join(", ")}`,
            `Next actions: ${insight.next_actions.join("; ")}`,
          ].join("\n")
        : "No insight profile available yet.",
    },
    {
      title: "Risk",
      description:
        riskSignals.length > 0
          ? riskSignals.map((item) => `• ${item}`).join("\n")
          : "No active risk flags for this buyer.",
    },
    {
      title: "Memory Timeline",
      description:
        buyerEvents.length > 0
          ? buyerEvents
              .slice(0, 3)
              .map(
                (event) =>
                  `• ${formatDate(event.date)} · ${titleCase(
                    event.type
                  )}: ${event.notes} (${event.outcome})`
              )
              .join("\n")
          : "No recent buyer activity logged.",
    },
  ];
};

const buildDealCards = (dealId: string) => {
  const deal = dealsData.find((item) => item.id === dealId);
  const dealEvents = eventsData
    .filter((event) => event.deal_id === dealId)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (!deal) {
    return [
      {
        title: "Risk Signals",
        description: "No deal record found for this context.",
      },
      {
        title: "Interventions",
        description: "Confirm deal details to surface interventions.",
      },
    ];
  }

  const riskSignals = [
    deal.contingencies.length > 0
      ? `Contingencies open: ${deal.contingencies.join(", ")}`
      : "No contingencies currently flagged.",
    deal.stage === "negotiation"
      ? "Negotiation stage increases counter risk."
      : null,
    deal.financing === "fha"
      ? "Financing type FHA may extend appraisal timelines."
      : null,
  ].filter(Boolean) as string[];

  const interventions = [
    dealEvents[0]
      ? `Review latest event: ${titleCase(
          dealEvents[0].type
        )} (${dealEvents[0].outcome}).`
      : "Log next milestone update.",
    deal.offer_price && deal.list_price
      ? `Align pricing strategy at ${formatCurrency(
          deal.offer_price
        )} vs list ${formatCurrency(deal.list_price)}.`
      : "Confirm offer strategy with buyer.",
    `Coordinate with ${deal.agent} on close target ${deal.close_target ?? "TBD"}.`,
  ];

  return [
    {
      title: "Risk Signals",
      description: riskSignals.map((item) => `• ${item}`).join("\n"),
    },
    {
      title: "Interventions",
      description: interventions.map((item) => `• ${item}`).join("\n"),
    },
  ];
};

const buildPropertyCards = (propertyId: string) => {
  const property = propertiesData.find((item) => item.id === propertyId);
  if (!property) {
    return [
      {
        title: "Comps",
        description: "No property record found for this context.",
      },
      {
        title: "Risk Notes",
        description: "Confirm property details to generate risk notes.",
      },
    ];
  }

  const comps = propertiesData
    .filter(
      (item) =>
        item.id !== property.id &&
        item.type === property.type &&
        Math.abs(item.price - property.price) < 120000
    )
    .sort(
      (a, b) =>
        Math.abs(a.price - property.price) -
        Math.abs(b.price - property.price)
    )
    .slice(0, 3);

  const propertyEvents = eventsData
    .filter((event) => event.property_id === propertyId)
    .sort((a, b) => b.date.localeCompare(a.date));

  const riskNotes = [
    property.days_on_market > 20
      ? `Extended time on market (${property.days_on_market} days).`
      : null,
    property.status !== "available"
      ? `Status: ${titleCase(property.status)}.`
      : "Listing is active.",
    propertyEvents[0]
      ? `Latest showing: ${propertyEvents[0].notes}`
      : null,
  ].filter(Boolean) as string[];

  return [
    {
      title: "Comps",
      description:
        comps.length > 0
          ? comps
              .map(
                (comp) =>
                  `• ${comp.address} · ${formatCurrency(comp.price)} · ${comp.bedrooms} bd/${comp.bathrooms} ba`
              )
              .join("\n")
          : "No close comps in this segment.",
    },
    {
      title: "Risk Notes",
      description:
        riskNotes.length > 0
          ? riskNotes.map((item) => `• ${item}`).join("\n")
          : "No risk notes available.",
    },
  ];
};

const buildCardsForContext = (activeContext: ActiveContext) => {
  switch (activeContext.type) {
    case "command":
      return buildCommandCards();
    case "buyer":
      return buildBuyerCards(activeContext.id);
    case "deal":
      return buildDealCards(activeContext.id);
    case "property":
      return buildPropertyCards(activeContext.id);
    default:
      return [];
  }
};

export default function IntelligenceRail({
  activeContext,
}: IntelligenceRailProps) {
  const cards = activeContext.intelligence ?? buildCardsForContext(activeContext);
  const [hoveredCardTitle, setHoveredCardTitle] = useState<string | null>(null);
  const [hoveredToastId, setHoveredToastId] = useState<string | null>(null);
  const [hoveredDismissId, setHoveredDismissId] = useState<string | null>(null);
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);

  const insightSignals = useMemo<InsightRecord[]>(
    () =>
      insights.map((insight) => {
        const buyer = buyers.find((item) => item.id === insight.buyer_id);
        const signalLevel = insight.fit_score >= 85 ? "high" : "standard";
        return {
          id: insight.id,
          buyer_name: buyer?.name,
          signal_level: signalLevel,
          signal_summary:
            signalLevel === "high"
              ? `Fit score ${insight.fit_score} · ${insight.rationale}`
              : undefined,
        };
      }),
    []
  );

  const visibleInsights = useMemo(
    () =>
      insightSignals
        .filter(
          (insight) =>
            insight.signal_level === "high" &&
            !dismissedInsights.includes(insight.id)
        )
        .slice(0, 2),
    [dismissedInsights, insightSignals]
  );

  const handleDismiss = (id: string) => {
    setDismissedInsights((prev) =>
      prev.includes(id) ? prev : [...prev, id]
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
          Active context ·{" "}
          <span style={{ color: "#e2e8f0" }}>{activeContext.type}</span>
        </div>
      </div>
      {cards.map((card) => (
        <div
          key={card.title}
          onMouseEnter={() => setHoveredCardTitle(card.title)}
          onMouseLeave={() => setHoveredCardTitle(null)}
          style={{
            ...cardStyle,
            ...(hoveredCardTitle === card.title ? cardHoverStyle : null),
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
            {card.title}
          </div>
          {card.description.split("\n").map((line, index) => (
            <p
              key={`${card.title}-${index}`}
              style={{ color: "#94a3b8", lineHeight: 1.6, margin: 0 }}
            >
              {line}
            </p>
          ))}
        </div>
      ))}
      <div style={{ marginTop: "auto", fontSize: "0.85rem", color: "#64748b" }}>
        Intelligence feed synced · 00:42s
      </div>
      {visibleInsights.length > 0 ? (
        <div style={toastContainerStyle} aria-live="polite">
          {visibleInsights.map((insight) => (
            <div
              key={insight.id}
              style={{
                ...toastStyle,
                ...(hoveredToastId === insight.id ? toastHoverStyle : null),
              }}
              onMouseEnter={() => setHoveredToastId(insight.id)}
              onMouseLeave={() => setHoveredToastId(null)}
              role="status"
            >
              <div style={toastHeaderStyle}>High-signal insight</div>
              <div style={toastBodyStyle}>
                {insight.signal_summary ??
                  `New high-signal insight for ${
                    insight.buyer_name ?? "this buyer"
                  }.`}
              </div>
              <button
                type="button"
                style={{
                  ...toastButtonStyle,
                  ...(hoveredDismissId === insight.id
                    ? toastButtonHoverStyle
                    : null),
                }}
                onClick={() => handleDismiss(insight.id)}
                onMouseEnter={() => setHoveredDismissId(insight.id)}
                onMouseLeave={() => setHoveredDismissId(null)}
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
