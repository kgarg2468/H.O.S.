"use client";

import { useState } from "react";
import ContextRail from "@/components/os/ContextRail";
import IntelligenceRail from "@/components/os/IntelligenceRail";
import Workspace from "@/components/os/Workspace";
import type {
  ActiveContext,
  Buyer,
  Deal,
  Insight,
  Property,
  RailSection,
} from "@/lib/types";
import buyersData from "@/data/buyers.json";
import dealsData from "@/data/deals.json";
import insightsData from "@/data/insights.json";
import propertiesData from "@/data/properties.json";

const buyers = buyersData as Buyer[];
const deals = dealsData as Deal[];
const insights = insightsData as Insight[];
const properties = propertiesData as Property[];

const formatStatus = (value: string) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

const formatCurrency = (value: number) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const sections: RailSection[] = [
  {
    title: "Buyers",
    items: buyers.slice(0, 2).map((buyer) => {
      const insight = insights.find((item) => item.buyer_id === buyer.id);
      return {
        id: buyer.id,
        type: "buyer",
        title: buyer.name,
        description: buyer.notes,
        status: formatStatus(buyer.status),
        metrics: [
          {
            label: "Budget",
            value: `${formatCurrency(buyer.budget_min)} - ${formatCurrency(
              buyer.budget_max
            )}`,
          },
          { label: "Timeline", value: buyer.timeline },
          { label: "Preapproved", value: buyer.preapproved ? "Yes" : "No" },
        ],
        intelligence: insight
          ? [
              {
                title: "Fit score",
                description: `${insight.fit_score} · ${insight.rationale}`,
              },
              {
                title: "Next action",
                description: insight.next_actions[0] ?? "Review buyer plan.",
              },
            ]
          : [],
      };
    }),
  },
  {
    title: "Deals",
    items: deals.slice(0, 2).map((deal) => {
      const buyer = buyers.find((item) => item.id === deal.buyer_id);
      const property = properties.find(
        (item) => item.id === deal.property_id
      );
      return {
        id: deal.id,
        type: "deal",
        title: buyer ? `${buyer.name} · ${deal.id}` : `Deal ${deal.id}`,
        description: property
          ? `${property.address} · ${property.neighborhood}`
          : "Active deal pipeline",
        status: `${formatStatus(deal.stage)} · ${formatStatus(deal.status)}`,
        metrics: [
          { label: "List price", value: formatCurrency(deal.list_price) },
          {
            label: "Offer price",
            value: formatCurrency(deal.offer_price ?? deal.list_price),
          },
          {
            label: "Close target",
            value: deal.close_target ?? "TBD",
          },
        ],
        intelligence: [
          {
            title: "Financing",
            description: formatStatus(deal.financing),
          },
          {
            title: "Contingencies",
            description: deal.contingencies.length
              ? deal.contingencies.join(", ")
              : "None",
          },
        ],
      };
    }),
  },
  {
    title: "Properties",
    items: properties.slice(0, 2).map((property) => ({
      id: property.id,
      type: "property",
      title: property.address,
      description: `${property.neighborhood} · ${formatStatus(property.type)}`,
      status: `${formatStatus(property.status)} · ${property.days_on_market} DOM`,
      metrics: [
        { label: "Price", value: formatCurrency(property.price) },
        { label: "Beds", value: `${property.bedrooms}` },
        { label: "Baths", value: `${property.bathrooms}` },
      ],
      intelligence: [
        {
          title: "Highlights",
          description: property.features.slice(0, 2).join(", "),
        },
        {
          title: "Listed",
          description: `${property.days_on_market} days on market`,
        },
      ],
    })),
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

const commandContext: ActiveContext = {
  id: "command-center",
  type: "command",
  title: "Command Center",
  description: "Live signal routing for active revenue moments.",
  status: "System ready",
  metrics: [],
  intelligence: [],
};

export default function Home() {
  const [activeContext, setActiveContext] = useState<ActiveContext>(
    commandContext
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
