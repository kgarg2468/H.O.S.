import type React from "react";

const panelStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.82)",
  borderRadius: "1rem",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  padding: "1.5rem",
  boxShadow: "0 20px 50px rgba(2, 6, 23, 0.35)",
};

const mutedTextStyle: React.CSSProperties = {
  color: "#94a3b8",
  lineHeight: 1.6,
};

const tagStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.25rem 0.6rem",
  borderRadius: "999px",
  background: "rgba(59, 130, 246, 0.16)",
  color: "#bfdbfe",
  border: "1px solid rgba(59, 130, 246, 0.35)",
  fontSize: "0.75rem",
  fontWeight: 600,
};

const statusPillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.35rem 0.75rem",
  borderRadius: "999px",
  background: "rgba(74, 222, 128, 0.16)",
  color: "#86efac",
  border: "1px solid rgba(74, 222, 128, 0.45)",
  fontSize: "0.85rem",
  fontWeight: 600,
};

const timeline = [
  {
    time: "Today · 9:15 AM",
    title: "Tour feedback logged",
    detail:
      "Loved the Pacific Heights lighting, wants a similar view corridor.",
  },
  {
    time: "Yesterday · 4:02 PM",
    title: "Financing update",
    detail: "Pre-approval confirmed at $2.4M with 25% down payment.",
  },
  {
    time: "Sep 12 · 1:30 PM",
    title: "Discovery call",
    detail: "Moving timeline set for mid-November; needs home office + guest.",
  },
];

const nextActions = [
  "Send 3 off-market opportunities in Pacific Heights under $2.3M.",
  "Confirm inspection contingencies with lender by Friday.",
  "Schedule second showing for 18 Laurel Street with spouse.",
];

const doNotShow = [
  "High HOA fees above $950/month",
  "Street-facing bedrooms on high-traffic roads",
  "Renovations older than 10 years without permits",
];

export default function BuyerWorkspace() {
  return (
    <main
      style={{
        padding: "2rem 2.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        background: "linear-gradient(180deg, #0b1017 0%, #0b1220 100%)",
        minHeight: "100vh",
      }}
    >
      <header style={panelStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>
              Elena Ramirez
            </div>
            <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
              VP of Product · Arcadia Fintech · San Francisco, CA
            </div>
          </div>
          <div style={statusPillStyle}>
            <span
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "999px",
                background: "#4ade80",
                display: "inline-block",
              }}
            />
            Active buyer · Touring
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          {["Priority: High", "Pre-approved", "Timeline: 60 days"].map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ ...mutedTextStyle, marginTop: "1rem" }}>
          Last touchpoint: 3 hours ago · Responds best via text between 4-6 PM.
        </div>
      </header>

      <section style={{ display: "grid", gap: "1.5rem" }}>
        <div style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
            Preference Profile
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
                Budget + financing
              </div>
              <p style={mutedTextStyle}>
                $2.1M - $2.4M purchase range · Conventional loan · 25% down.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
                Neighborhoods
              </div>
              <p style={mutedTextStyle}>
                Pacific Heights, Noe Valley, Duboce Triangle. Open to Cole
                Valley for turnkey inventory.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
                Must-haves
              </div>
              <ul
                style={{
                  ...mutedTextStyle,
                  paddingLeft: "1.1rem",
                  margin: 0,
                }}
              >
                <li>3+ bedrooms, dedicated office, 2 parking spots</li>
                <li>Natural light + south-facing living area</li>
                <li>Walk score 85+</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
                Communication
              </div>
              <p style={mutedTextStyle}>
                Prefers bi-weekly summaries, 2-3 listings per email, proactive
                heads-up on off-market opportunities.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
            gap: "1.5rem",
          }}
        >
          <div style={panelStyle}>
            <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
              Timeline
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              {timeline.map((event) => (
                <div
                  key={event.title}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "0.75rem",
                    background: "rgba(15, 23, 42, 0.55)",
                    border: "1px solid rgba(148, 163, 184, 0.12)",
                  }}
                >
                  <div style={{ color: "#7dd3fc", fontSize: "0.82rem" }}>
                    {event.time}
                  </div>
                  <div style={{ fontWeight: 600, marginTop: "0.35rem" }}>
                    {event.title}
                  </div>
                  <p style={{ ...mutedTextStyle, marginTop: "0.35rem" }}>
                    {event.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={panelStyle}>
              <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
                Next actions
              </div>
              <ol
                style={{
                  ...mutedTextStyle,
                  paddingLeft: "1.1rem",
                  margin: 0,
                  display: "grid",
                  gap: "0.75rem",
                }}
              >
                {nextActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ol>
            </div>

            <div style={panelStyle}>
              <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
                Do-not-show list
              </div>
              <ul
                style={{
                  ...mutedTextStyle,
                  paddingLeft: "1.1rem",
                  margin: 0,
                  display: "grid",
                  gap: "0.65rem",
                }}
              >
                {doNotShow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
