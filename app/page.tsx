"use client";

import { useMemo, useState } from "react";
import ContextRail from "@/components/os/ContextRail";
import IntelligenceRail from "@/components/os/IntelligenceRail";
import Workspace from "@/components/os/Workspace";
import buyers from "@/data/buyers.json";
import deals from "@/data/deals.json";
import properties from "@/data/properties.json";
import type { ActiveContextItem, RailSection } from "@/lib/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number | null) =>
  value ? currencyFormatter.format(value) : "—";

const buyerItems: ActiveContextItem[] = buyers.map((buyer) => ({
  id: buyer.id,
  type: "buyer",
  title: buyer.name,
  description: buyer.notes,
  status: buyer.status.replace(/_/g, " "),
  metrics: [
    {
      label: "Budget",
      value: `${formatCurrency(buyer.budget_min)} - ${formatCurrency(
        buyer.budget_max
      )}`,
    },
    {
      label: "Locations",
      value: buyer.preferred_locations.slice(0, 2).join(", "),
    },
    {
      label: "Timeline",
      value: buyer.timeline,
    },
  ],
  intelligence: [],
}));

const dealItems: ActiveContextItem[] = deals.map((deal) => {
  const buyer = buyers.find((item) => item.id === deal.buyer_id);
  const property = properties.find((item) => item.id === deal.property_id);
  return {
    id: deal.id,
    type: "deal",
    title: `${buyer?.name ?? "Buyer"} · ${property?.neighborhood ?? "Deal"}`,
    description: property
      ? `${property.address}, ${property.city}`
      : "Active deal pipeline",
    status: deal.stage.replace(/_/g, " "),
    metrics: [
      {
        label: "List",
        value: formatCurrency(deal.list_price),
      },
      {
        label: "Offer",
        value: formatCurrency(deal.offer_price),
      },
      {
        label: "Close target",
        value: deal.close_target ?? "TBD",
      },
    ],
    intelligence: [],
  };
});

const propertyItems: ActiveContextItem[] = properties.map((property) => ({
  id: property.id,
  type: "property",
  title: property.address,
  description: `${property.neighborhood} · ${property.type.replace("_", " ")}`,
  status: property.status.replace(/_/g, " "),
  metrics: [
    {
      label: "Price",
      value: formatCurrency(property.price),
    },
    {
      label: "Beds/Baths",
      value: `${property.bedrooms} bd · ${property.bathrooms} ba`,
    },
    {
      label: "Days",
      value: `${property.days_on_market} DOM`,
    },
  ],
  intelligence: [],
}));

const sections: RailSection[] = [
  {
    title: "Command",
    items: [
      {
        id: "command",
        type: "command",
        title: "Command Center",
        description: "Portfolio-wide signal routing and priorities.",
        status: "Live feed",
        metrics: [
          { label: "Active buyers", value: `${buyers.length}` },
          { label: "Open deals", value: `${deals.length}` },
          { label: "Listings", value: `${properties.length}` },
        ],
        intelligence: [],
      },
    ],
  },
  {
    title: "Buyers",
    items: buyerItems,
  },
  {
    title: "Deals",
    items: dealItems,
  },
  {
    title: "Properties",
    items: propertyItems,
  },
];

const CONTEXTS: CommandPaletteItem[] = [
  {
    id: "kernel",
    title: "Kernel",
    description: "Inspect low-level runtime scheduling and health checks.",
    keywords: ["system", "runtime"],
  },
  {
    id: "processes",
    title: "Processes",
    description: "View active workloads and prioritize queue management.",
    keywords: ["workloads", "tasks"],
  },
  {
    id: "sensors",
    title: "Sensors",
    description: "Monitor sensor pings and stabilize signal quality.",
    keywords: ["telemetry", "feeds"],
  },
  {
    id: "operator",
    title: "Operator",
    description: "Sync operator notes and maintain situational awareness.",
    keywords: ["session", "notes"],
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    description: "Run diagnostics on live systems and loop in alerts.",
    keywords: ["alerts", "health"],
  },
];

const formatTimestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Home() {
  const allItems = useMemo(
    () => sections.flatMap((section) => section.items),
    []
  );
  const [activeContext, setActiveContext] = useState<ActiveContextItem>(
    allItems[0]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px minmax(0, 1fr) 300px",
        alignItems: "stretch",
        background: "#0b0f14",
        color: "#e2e8f0",
      }}
    >
      <ContextRail
        sections={sections}
        activeItemId={activeContext.id}
        onSelect={setActiveContext}
      />
      <Workspace activeContext={activeContext} />
      <IntelligenceRail activeContext={activeContext} />
    </div>
  );
}
