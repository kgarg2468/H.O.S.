"use client";

import { useEffect, useState } from "react";
import type React from "react";
import CommandCenter from "@/components/workspaces/CommandCenter";
import BuyerWorkspace from "@/components/workspaces/BuyerWorkspace";
import DealWorkspace from "@/components/workspaces/DealWorkspace";
import PropertyWorkspace from "@/components/workspaces/PropertyWorkspace";
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

const buyers = buyersData as Buyer[];
const deals = dealsData as Deal[];
const events = eventsData as Event[];
const insights = insightsData as Insight[];
const properties = propertiesData as Property[];

interface WorkspaceProps {
  activeContext: ActiveContext;
}

export default function Workspace({ activeContext }: WorkspaceProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [activeContext.id, activeContext.type]);

  const buyer = buyers.find((item) => item.id === activeContext.id);
  const deal = deals.find((item) => item.id === activeContext.id);
  const property = properties.find((item) => item.id === activeContext.id);
  const insight = buyer
    ? insights.find((item) => item.buyer_id === buyer.id)
    : undefined;

  const buyerEvents = buyer
    ? events.filter((event) => event.buyer_id === buyer.id)
    : [];
  const dealEvents = deal
    ? events.filter((event) => event.deal_id === deal.id)
    : [];

  const contextKey = `${activeContext.type}-${activeContext.id}`;
  let content: React.ReactNode = null;

  switch (activeContext.type) {
    case "command":
      content = <CommandCenter key={contextKey} />;
      break;
    case "buyer":
      if (buyer) {
        content = (
          <BuyerWorkspace
            key={contextKey}
            buyer={buyer}
            events={buyerEvents}
            insight={insight}
          />
        );
      }
      break;
    case "deal":
      if (deal) {
        const relatedBuyer = buyers.find(
          (item) => item.id === deal.buyer_id
        );
        const relatedProperty = properties.find(
          (item) => item.id === deal.property_id
        );

        content = (
          <DealWorkspace
            key={contextKey}
            deal={deal}
            buyer={relatedBuyer}
            property={relatedProperty}
            events={dealEvents}
          />
        );
      }
      break;
    case "property":
      if (property) {
        content = (
          <PropertyWorkspace
            key={contextKey}
            property={property}
            properties={properties}
          />
        );
      }
      break;
    default:
      content = <CommandCenter key={contextKey} />;
  }

  return (
    <main
      style={{
        padding: "2rem 2.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        background: "linear-gradient(180deg, #0b1017 0%, #0b1220 100%)",
        minHeight: "100vh",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 200ms ease, transform 200ms ease",
        willChange: "opacity, transform",
      }}
    >
      {content ?? <CommandCenter />}
    </main>
  );
}
