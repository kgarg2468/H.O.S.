import type React from "react";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const panelStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.85)",
  borderRadius: "1rem",
  border: "1px solid rgba(148, 163, 184, 0.16)",
  padding: "1.5rem",
  boxShadow: "0 20px 40px rgba(8, 15, 25, 0.35)",
};

const pillStyle: React.CSSProperties = {
  padding: "0.2rem 0.6rem",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
};

const feedItems = [
  {
    time: "2 min ago",
    title: "Emerge Motors requested revised rollout plan",
    detail: "Buyer asked for a 2-phase deployment with a security review.",
    tone: "#38bdf8",
  },
  {
    time: "14 min ago",
    title: "Pulse Health engaged the insights demo",
    detail: "Momentum spike after analytics walkthrough with operations.",
    tone: "#a78bfa",
  },
  {
    time: "35 min ago",
    title: "Arbor Capital flagged legal review",
    detail: "Docs in redline; legal requested updated compliance appendix.",
    tone: "#f97316",
  },
];

const priorityItems = [
  {
    label: "Align Q4 rollout scope with Emerge Motors",
    owner: "Avery",
    due: "Today",
  },
  {
    label: "Share security questionnaire update with Pulse Health",
    owner: "Jordan",
    due: "Tomorrow",
  },
  {
    label: "Confirm commercial terms for Arbor Capital",
    owner: "Riya",
    due: "Friday",
  },
];

const atRiskDeals = [
  {
    account: "Arbor Capital",
    stage: "Legal review",
    risk: "High",
    reason: "Security addendum pending",
  },
  {
    account: "Northwind Logistics",
    stage: "Procurement",
    risk: "Medium",
    reason: "Budget approval delayed",
  },
  {
    account: "Venture Vista",
    stage: "Pilot",
    risk: "Medium",
    reason: "Usage dip in week 2",
  },
];

const momentumSignals = [
  {
    label: "Buyer intent score",
    value: "82",
    trend: "+9",
    note: "Up from last week",
  },
  {
    label: "Stakeholder engagement",
    value: "12",
    trend: "+3",
    note: "Active champions",
  },
  {
    label: "Decision timeline",
    value: "18 days",
    trend: "-4",
    note: "Accelerating",
  },
];

export default function CommandCenter() {
  return (
    <section style={containerStyle}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "1.6rem", fontWeight: 600 }}>
            Command Center
          </div>
          <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
            Live signal routing for active revenue moments.
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 0.85rem",
            borderRadius: "999px",
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#bfdbfe",
            fontSize: "0.85rem",
          }}
        >
          <span
            style={{
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "999px",
              background: "#38bdf8",
              display: "inline-block",
            }}
          />
          Streaming now
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        <div style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "1rem" }}>
            Command Feed
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {feedItems.map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "999px",
                    background: item.tone,
                    marginTop: "0.35rem",
                  }}
                />
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    {item.time}
                  </div>
                  <div style={{ fontWeight: 600 }}>{item.title}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "1rem" }}>
            Priority Actions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {priorityItems.map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "999px",
                    background: "#22d3ee",
                    marginTop: "0.45rem",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.label}</div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "0.35rem",
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span>Owner: {item.owner}</span>
                    <span>•</span>
                    <span>Due {item.due}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "1rem",
        }}
      >
        <div style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "1rem" }}>
            At-Risk Deals
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {atRiskDeals.map((deal) => (
              <div
                key={deal.account}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.3fr 1fr 0.7fr",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  background: "rgba(15, 23, 42, 0.65)",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{deal.account}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                    {deal.reason}
                  </div>
                </div>
                <div style={{ color: "#cbd5f5" }}>{deal.stage}</div>
                <div>
                  <span
                    style={{
                      ...pillStyle,
                      background:
                        deal.risk === "High"
                          ? "rgba(248, 113, 113, 0.2)"
                          : "rgba(251, 191, 36, 0.2)",
                      color: deal.risk === "High" ? "#fecaca" : "#fde68a",
                      border: "1px solid rgba(248, 113, 113, 0.35)",
                    }}
                  >
                    {deal.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "1rem" }}>
            Buyer Momentum
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {momentumSignals.map((signal) => (
              <div
                key={signal.label}
                style={{
                  padding: "0.85rem",
                  borderRadius: "0.75rem",
                  background: "rgba(30, 41, 59, 0.5)",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                }}
              >
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                  {signal.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.5rem",
                    marginTop: "0.35rem",
                  }}
                >
                  <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    {signal.value}
                  </div>
                  <span
                    style={{
                      ...pillStyle,
                      background: "rgba(34, 197, 94, 0.18)",
                      color: "#86efac",
                      border: "1px solid rgba(34, 197, 94, 0.35)",
                    }}
                  >
                    {signal.trend}
                  </span>
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                  {signal.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
