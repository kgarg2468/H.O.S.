import type React from "react";

export type DealTimelineEvent = {
  id: string;
  date: string;
  title: string;
  detail: string;
};

export type DealRisk = {
  id: string;
  title: string;
  confidence: number;
  mitigation: string;
};

export type DealIntervention = {
  id: string;
  title: string;
  owner: string;
  eta: string;
};

export type DealExplainabilitySignal = {
  id: string;
  signal: string;
  impact: string;
};

export type DealWorkspaceData = {
  id: string;
  name: string;
  account: string;
  stage: string;
  value: string;
  closeDate: string;
  momentum: string;
  timeInState: string;
  timeline: DealTimelineEvent[];
  risks: DealRisk[];
  interventions: DealIntervention[];
  explainability: DealExplainabilitySignal[];
};

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

export default function DealWorkspace({
  deal,
}: {
  deal: DealWorkspaceData;
}) {
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
              {deal.name}
            </div>
            <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
              {deal.account} · {deal.stage}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600 }}>{deal.value}</div>
            <div style={{ color: "#94a3b8", marginTop: "0.25rem" }}>
              Target close {deal.closeDate}
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
          <span style={pillStyle}>Momentum: {deal.momentum}</span>
          <span style={pillStyle}>Time in state: {deal.timeInState}</span>
        </div>
      </header>

      <section style={panelStyle}>
        <div style={sectionTitleStyle}>Deal timeline</div>
        <div style={{ display: "grid", gap: "0.85rem" }}>
          {deal.timeline.map((event) => (
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
                {event.date}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{event.title}</div>
                <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                  {event.detail}
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
          <div style={sectionTitleStyle}>Momentum & time-in-state</div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Momentum signal
              </div>
              <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                {deal.momentum}
              </div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Time in current stage
              </div>
              <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                {deal.timeInState}
              </div>
            </div>
          </div>
        </div>

        <div style={panelStyle}>
          <div style={sectionTitleStyle}>Risks & confidence</div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {deal.risks.map((risk) => (
              <div key={risk.id}>
                <div style={{ fontWeight: 600 }}>{risk.title}</div>
                <div
                  style={{
                    color: "#94a3b8",
                    marginTop: "0.2rem",
                    fontSize: "0.85rem",
                  }}
                >
                  Confidence {risk.confidence}% · {risk.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={panelStyle}>
        <div style={sectionTitleStyle}>Suggested interventions</div>
        <div style={{ display: "grid", gap: "0.85rem" }}>
          {deal.interventions.map((intervention) => (
            <div
              key={intervention.id}
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
                <div style={{ fontWeight: 600 }}>{intervention.title}</div>
                <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                  Owner: {intervention.owner}
                </div>
              </div>
              <div style={{ color: "#94a3b8" }}>ETA {intervention.eta}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={panelStyle}>
        <div style={sectionTitleStyle}>Explainability</div>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {deal.explainability.map((signal) => (
            <div key={signal.id}>
              <div style={{ fontWeight: 600 }}>{signal.signal}</div>
              <div style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                {signal.impact}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
