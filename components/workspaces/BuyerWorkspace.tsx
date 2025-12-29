import type React from "react";
import type { Buyer, Event, Insight } from "@/lib/types";

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

const formatCurrencyRange = (min: number, max: number) =>
  `$${min.toLocaleString("en-US")} - $${max.toLocaleString("en-US")}`;

const formatStatus = (status: string) =>
  status.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

interface BuyerWorkspaceProps {
  buyer: Buyer;
  events: Event[];
  insight?: Insight;
}

export default function BuyerWorkspace({
  buyer,
  events,
  insight,
}: BuyerWorkspaceProps) {
  const timeline = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const latestEvent = timeline[0];
  const nextActions =
    insight?.next_actions.length
      ? insight.next_actions
      : [
          "Confirm current tour availability window.",
          "Send new listings matching preferred neighborhoods.",
          "Review updated lender pre-approval timeline.",
        ];
  const explainability =
    insight?.explainability && insight.explainability.length > 0
      ? insight.explainability.slice(0, 4)
      : [
          `${buyer.preapproved ? "Pre-approved" : "Pending pre-approval"} financing shapes readiness.`,
          `Top neighborhoods: ${buyer.preferred_locations.slice(0, 2).join(", ")}.`,
          `${buyer.bedrooms_min}+ beds and ${buyer.bathrooms_min}+ baths set the search floor.`,
        ].slice(0, 4);
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
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
              {buyer.name}
            </div>
            <div style={{ color: "#94a3b8", marginTop: "0.35rem" }}>
              {buyer.email} · {buyer.phone}
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
            {buyer.preapproved ? "Pre-approved" : "Needs approval"} ·{" "}
            {formatStatus(buyer.status)}
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
          {[
            `Budget: ${formatCurrencyRange(
              buyer.budget_min,
              buyer.budget_max
            )}`,
            `Timeline: ${buyer.timeline}`,
            buyer.preapproved ? "Pre-approved" : "Needs pre-approval",
          ].map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ ...mutedTextStyle, marginTop: "1rem" }}>
          {latestEvent
            ? `Last touchpoint: ${formatDate(latestEvent.date)} · ${
                latestEvent.notes
              }`
            : "No recent touchpoints logged."}
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
                {formatCurrencyRange(buyer.budget_min, buyer.budget_max)}{" "}
                purchase range ·{" "}
                {buyer.preapproved ? "Pre-approved" : "Not pre-approved"}
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
                Neighborhoods
              </div>
              <p style={mutedTextStyle}>
                {buyer.preferred_locations.join(", ")}
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
                <li>
                  {buyer.bedrooms_min}+ beds · {buyer.bathrooms_min}+ baths
                </li>
                {buyer.must_haves.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
                Communication
              </div>
              <p style={mutedTextStyle}>
                {buyer.notes}
              </p>
            </div>
          </div>
        </div>

        <div style={panelStyle}>
          <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
            Why the OS thinks this
          </div>
          <ul style={{ ...mutedTextStyle, paddingLeft: "1.1rem", margin: 0 }}>
            {explainability.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
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
                  key={event.id}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "0.75rem",
                    background: "rgba(15, 23, 42, 0.55)",
                    border: "1px solid rgba(148, 163, 184, 0.12)",
                  }}
                >
                  <div style={{ color: "#7dd3fc", fontSize: "0.82rem" }}>
                    {formatDate(event.date)} · {formatStatus(event.type)}
                  </div>
                  <div style={{ fontWeight: 600, marginTop: "0.35rem" }}>
                    {event.outcome}
                  </div>
                  <p style={{ ...mutedTextStyle, marginTop: "0.35rem" }}>
                    {event.notes}
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
                Property types
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
                {buyer.property_types.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
