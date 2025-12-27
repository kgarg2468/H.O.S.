"use client";

import type React from "react";
import { useState } from "react";

import DealWorkspace, {
  type DealWorkspaceData,
} from "@/components/workspaces/DealWorkspace";

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
  padding: "1.25rem",
};

const deals: DealWorkspaceData[] = [
  {
    id: "atlas-ai",
    name: "Atlas AI Expansion",
    account: "Novaxis Health",
    stage: "Security review",
    value: "$1.8M",
    closeDate: "Nov 18, 2024",
    momentum: "Accelerating · +12% activity",
    timeInState: "23 days",
    timeline: [
      {
        id: "timeline-1",
        date: "Oct 03",
        title: "Executive demo completed",
        detail: "Clinical ops leadership aligned on rollout scope.",
      },
      {
        id: "timeline-2",
        date: "Oct 09",
        title: "Security questionnaire received",
        detail: "Legal requested SOC 2 bridge letter.",
      },
      {
        id: "timeline-3",
        date: "Oct 15",
        title: "Pilot ROI shared",
        detail: "Projected 18% reduction in intake backlog.",
      },
    ],
    risks: [
      {
        id: "risk-1",
        title: "Legal turnaround slower than expected",
        confidence: 72,
        mitigation: "Deliver security addendum and weekly check-ins.",
      },
      {
        id: "risk-2",
        title: "IT budget freeze signals",
        confidence: 58,
        mitigation: "Align on phased billing with CFO sponsor.",
      },
    ],
    interventions: [
      {
        id: "intervention-1",
        title: "Schedule exec alignment with COO",
        owner: "J. Rivera",
        eta: "Oct 22",
      },
      {
        id: "intervention-2",
        title: "Send updated security posture deck",
        owner: "L. Chen",
        eta: "Oct 20",
      },
    ],
    explainability: [
      {
        id: "signal-1",
        signal: "Stakeholder engagement up 25% week-over-week",
        impact: "Higher buying committee participation raises close odds.",
      },
      {
        id: "signal-2",
        signal: "No competitor mentions in last 4 meetings",
        impact: "Reduced competitive pressure keeps pricing power stable.",
      },
    ],
  },
  {
    id: "vertex-one",
    name: "VertexOne Renewal",
    account: "Frontier Logistics",
    stage: "Negotiation",
    value: "$620K",
    closeDate: "Oct 31, 2024",
    momentum: "Stable · 4 touchpoints this week",
    timeInState: "11 days",
    timeline: [
      {
        id: "timeline-1",
        date: "Sep 25",
        title: "Renewal pricing proposal shared",
        detail: "3-year commitment with tiered support.",
      },
      {
        id: "timeline-2",
        date: "Oct 02",
        title: "Procurement feedback logged",
        detail: "Wants flexible payment schedule.",
      },
      {
        id: "timeline-3",
        date: "Oct 08",
        title: "Service roadmap review",
        detail: "Ops team requested Q1 analytics upgrade.",
      },
    ],
    risks: [
      {
        id: "risk-1",
        title: "Procurement pushing for deeper discount",
        confidence: 64,
        mitigation: "Offer value add services in place of discount.",
      },
      {
        id: "risk-2",
        title: "Exec sponsor traveling for two weeks",
        confidence: 41,
        mitigation: "Provide async recap and ask delegate sign-off.",
      },
    ],
    interventions: [
      {
        id: "intervention-1",
        title: "Draft alternative payment schedule",
        owner: "M. Singh",
        eta: "Oct 18",
      },
      {
        id: "intervention-2",
        title: "Lock renewal session with finance",
        owner: "A. Gomez",
        eta: "Oct 21",
      },
    ],
    explainability: [
      {
        id: "signal-1",
        signal: "QBR attendance rate at 92%",
        impact: "Retention risk stays low with strong leadership buy-in.",
      },
      {
        id: "signal-2",
        signal: "Support ticket volume down 18%",
        impact: "Positive service sentiment supports renewal confidence.",
      },
    ],
  },
  {
    id: "northwind",
    name: "Northwind Core",
    account: "Starlight Retail",
    stage: "Discovery",
    value: "$940K",
    closeDate: "Dec 12, 2024",
    momentum: "Warming · 2 new stakeholders added",
    timeInState: "6 days",
    timeline: [
      {
        id: "timeline-1",
        date: "Oct 10",
        title: "Discovery kickoff",
        detail: "Outlined supply chain automation use cases.",
      },
      {
        id: "timeline-2",
        date: "Oct 11",
        title: "Data readiness assessment",
        detail: "Shared current ERP integration map.",
      },
      {
        id: "timeline-3",
        date: "Oct 14",
        title: "Stakeholder mapping",
        detail: "Added merchandising and finance leads.",
      },
    ],
    risks: [
      {
        id: "risk-1",
        title: "Undefined decision criteria",
        confidence: 55,
        mitigation: "Run decision workshop with VP Ops.",
      },
      {
        id: "risk-2",
        title: "Implementation timeline overlap",
        confidence: 37,
        mitigation: "Share phased deployment timeline.",
      },
    ],
    interventions: [
      {
        id: "intervention-1",
        title: "Send business case template",
        owner: "D. Howard",
        eta: "Oct 17",
      },
      {
        id: "intervention-2",
        title: "Book on-site process walk-through",
        owner: "S. Patel",
        eta: "Oct 24",
      },
    ],
    explainability: [
      {
        id: "signal-1",
        signal: "Senior VP requested integration demo",
        impact: "Signals executive curiosity, improves qualification odds.",
      },
      {
        id: "signal-2",
        signal: "Competitive chatter flagged in first call",
        impact: "Early competition raises need for differentiation.",
      },
    ],
  },
];

const dealButtonBase: React.CSSProperties = {
  width: "100%",
  textAlign: "left",
  borderRadius: "0.85rem",
  border: "1px solid transparent",
  padding: "0.85rem",
  background: "rgba(15, 23, 42, 0.6)",
  color: "#e2e8f0",
  cursor: "pointer",
  display: "grid",
  gap: "0.35rem",
};

export default function Workspace() {
  const [selectedDealId, setSelectedDealId] = useState(deals[0].id);
  const selectedDeal = deals.find((deal) => deal.id === selectedDealId) ?? deals[0];

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
            Deal workspace
          </div>
          <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
            Timeline, momentum, risk, and intervention view
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
          gridTemplateColumns: "minmax(240px, 280px) minmax(0, 1fr)",
          gap: "1.5rem",
        }}
      >
        <aside style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
            Active deals
          </div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {deals.map((deal) => {
              const isSelected = deal.id === selectedDealId;

              return (
                <button
                  key={deal.id}
                  type="button"
                  onClick={() => setSelectedDealId(deal.id)}
                  style={{
                    ...dealButtonBase,
                    border: isSelected
                      ? "1px solid rgba(56, 189, 248, 0.6)"
                      : "1px solid rgba(148, 163, 184, 0.12)",
                    background: isSelected
                      ? "rgba(30, 64, 175, 0.25)"
                      : "rgba(15, 23, 42, 0.55)",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{deal.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                    {deal.account}
                  </div>
                  <div style={{ color: "#cbd5f5", fontSize: "0.85rem" }}>
                    {deal.stage} · {deal.value}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <DealWorkspace deal={selectedDeal} />
      </section>
    </main>
  );
}
