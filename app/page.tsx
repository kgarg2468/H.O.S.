"use client";

import { useMemo, useState } from "react";
import ContextRail from "@/components/os/ContextRail";
import IntelligenceRail from "@/components/os/IntelligenceRail";
import Workspace from "@/components/os/Workspace";
import type { ActiveContextItem, RailSection } from "@/lib/types";

const sections: RailSection[] = [
  {
    title: "Buyers",
    items: [
      {
        id: "buyer-atlas",
        type: "buyer",
        title: "Atlas Capital",
        description: "Buyer profile synced with underwriting signals.",
        status: "Qualification in progress",
        metrics: [
          { label: "Lead score", value: "91" },
          { label: "Portfolio fit", value: "Industrial flex" },
          { label: "Capital ready", value: "$38.2M" },
        ],
        intelligence: [
          {
            title: "Engagement pulse",
            description: "Responded to two outreach threads in the last 24 hours.",
          },
          {
            title: "Next best action",
            description: "Schedule a site tour with the acquisitions team.",
          },
        ],
      },
      {
        id: "buyer-vertex",
        type: "buyer",
        title: "Vertex Holdings",
        description: "Enterprise buyer with pending cross-market approval.",
        status: "Awaiting investment committee review",
        metrics: [
          { label: "Lead score", value: "84" },
          { label: "Portfolio fit", value: "Medical office" },
          { label: "Capital ready", value: "$22.6M" },
        ],
        intelligence: [
          {
            title: "Risk watch",
            description: "Finance team needs updated NOI breakdown before approval.",
          },
          {
            title: "Suggested follow-up",
            description: "Send rent roll addendum and closing timeline.",
          },
        ],
      },
    ],
  },
  {
    title: "Deals",
    items: [
      {
        id: "deal-orion",
        type: "deal",
        title: "Project Orion",
        description: "Mid-market acquisition pipeline for Q3.",
        status: "Under contract · diligence day 12",
        metrics: [
          { label: "Deal value", value: "$12.4M" },
          { label: "IRR target", value: "17.8%" },
          { label: "Close ETA", value: "Aug 28" },
        ],
        intelligence: [
          {
            title: "Diligence focus",
            description: "Environmental report flagged roof replacement.",
          },
          {
            title: "Stakeholder update",
            description: "Seller counsel awaiting revised term sheet.",
          },
        ],
      },
      {
        id: "deal-nova",
        type: "deal",
        title: "Nova Exchange",
        description: "1031 exchange queue prioritization.",
        status: "LOI drafted · counter expected",
        metrics: [
          { label: "Deal value", value: "$8.1M" },
          { label: "IRR target", value: "15.2%" },
          { label: "Close ETA", value: "Sep 14" },
        ],
        intelligence: [
          {
            title: "Negotiation signal",
            description: "Broker signaled flexibility on deposit schedule.",
          },
          {
            title: "Next best action",
            description: "Prepare revised pricing sensitivity report.",
          },
        ],
      },
    ],
  },
  {
    title: "Properties",
    items: [
      {
        id: "property-harbor",
        type: "property",
        title: "Harbor Point",
        description: "Retail center with refreshed leasing momentum.",
        status: "Occupancy 92% · renewal cycle active",
        metrics: [
          { label: "NOI", value: "$1.4M" },
          { label: "Occupancy", value: "92%" },
          { label: "Top tenant", value: "Blue Harbor" },
        ],
        intelligence: [
          {
            title: "Leasing signal",
            description: "Two renewals signed ahead of schedule.",
          },
          {
            title: "Action item",
            description: "Review CAM reconciliation for Q2.",
          },
        ],
      },
      {
        id: "property-summit",
        type: "property",
        title: "Summit Ridge",
        description: "Class A office repositioning underway.",
        status: "Capital plan approval pending",
        metrics: [
          { label: "NOI", value: "$2.2M" },
          { label: "Occupancy", value: "81%" },
          { label: "Capex", value: "$1.1M" },
        ],
        intelligence: [
          {
            title: "Tenant intel",
            description: "Anchor tenant requesting expansion options.",
          },
          {
            title: "Next best action",
            description: "Draft phased build-out plan for review.",
          },
        ],
      },
    ],
  },
];

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
