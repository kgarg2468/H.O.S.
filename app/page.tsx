import HomeClient from "@/app/HomeClient";
import { loadMockJsonSync } from "@/lib/mock";
import type { RailSection } from "@/lib/types";

type Buyer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget_min: number;
  budget_max: number;
  preferred_locations: string[];
  property_types: string[];
  bedrooms_min: number;
  bathrooms_min: number;
  must_haves: string[];
  timeline: string;
  preapproved: boolean;
  status: string;
  notes: string;
};

type Deal = {
  id: string;
  buyer_id: string;
  property_id: string;
  stage: string;
  list_price: number;
  offer_price: number | null;
  financing: string;
  contingencies: string[];
  offer_date: string | null;
  close_target: string | null;
  agent: string;
  status: string;
};

type Property = {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  features: string[];
  status: string;
  listed_at: string;
  days_on_market: number;
};

type Insight = {
  id: string;
  buyer_id: string;
  fit_score: number;
  top_properties: string[];
  rationale: string;
  next_actions: string[];
};

const buyers = loadMockJsonSync<Buyer[]>("data/buyers.json");
const deals = loadMockJsonSync<Deal[]>("data/deals.json");
const properties = loadMockJsonSync<Property[]>("data/properties.json");
const insights = loadMockJsonSync<Insight[]>("data/insights.json");

const propertiesById = new Map(properties.map((property) => [property.id, property]));
const buyersById = new Map(buyers.map((buyer) => [buyer.id, buyer]));
const insightsByBuyer = new Map(
  insights.map((insight) => [insight.buyer_id, insight])
);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number | null | undefined): string =>
  value == null ? "TBD" : currencyFormatter.format(value);

const formatStatus = (value: string): string =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatDate = (value: string | null): string =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "TBD";

const formatBathrooms = (value: number): string =>
  Number.isInteger(value) ? value.toString() : value.toFixed(1);

const sections: RailSection[] = [
  {
    title: "Buyers",
    items: buyers.map((buyer) => {
      const insight = insightsByBuyer.get(buyer.id);
      const topProperties = insight?.top_properties
        .map((propertyId) => propertiesById.get(propertyId)?.address)
        .filter(Boolean)
        .slice(0, 2);
      return {
        id: buyer.id,
        type: "buyer",
        title: buyer.name,
        description: buyer.notes,
        status: `${formatStatus(buyer.status)} · ${buyer.timeline}`,
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
            label: "Preapproved",
            value: buyer.preapproved ? "Yes" : "Pending",
          },
        ],
        intelligence: [
          {
            title: "Fit score",
            description: insight
              ? `${insight.fit_score}/100 · ${insight.rationale}`
              : "Insight pending.",
          },
          {
            title: "Next actions",
            description: insight?.next_actions?.length
              ? insight.next_actions.join(" · ")
              : topProperties?.length
              ? `Review top matches: ${topProperties.join(", ")}.`
              : "Prepare next outreach touchpoint.",
          },
        ],
      };
    }),
  },
  {
    title: "Deals",
    items: deals.map((deal) => {
      const property = propertiesById.get(deal.property_id);
      const buyer = buyersById.get(deal.buyer_id);
      return {
        id: deal.id,
        type: "deal",
        title: property ? property.address : `Deal ${deal.id}`,
        description: `${buyer?.name ?? "Unknown buyer"} · ${
          property?.neighborhood ?? "Property"
        }`,
        status: `${formatStatus(deal.stage)} · ${formatStatus(deal.status)}`,
        metrics: [
          { label: "List price", value: formatCurrency(deal.list_price) },
          { label: "Offer price", value: formatCurrency(deal.offer_price) },
          { label: "Close target", value: formatDate(deal.close_target) },
        ],
        intelligence: [
          {
            title: "Financing",
            description: `${formatStatus(deal.financing)} · Agent ${deal.agent}`,
          },
          {
            title: "Contingencies",
            description: deal.contingencies.length
              ? deal.contingencies.map(formatStatus).join(" · ")
              : "None",
          },
        ],
      };
    }),
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
    items: properties.map((property) => ({
      id: property.id,
      type: "property",
      title: property.address,
      description: `${property.neighborhood} · ${property.city}, ${property.state}`,
      status: `${formatStatus(property.status)} · ${
        property.days_on_market
      } days on market`,
      metrics: [
        { label: "Price", value: formatCurrency(property.price) },
        {
          label: "Beds/Baths",
          value: `${property.bedrooms} bd / ${formatBathrooms(
            property.bathrooms
          )} ba`,
        },
        { label: "Sqft", value: property.sqft.toLocaleString("en-US") },
      ],
      intelligence: [
        {
          title: "Top features",
          description: property.features.slice(0, 3).join(" · "),
        },
        {
          title: "Listing",
          description: `Listed ${formatDate(
            property.listed_at
          )} · ${property.days_on_market} DOM`,
        },
      ],
    })),
  },
];

export default function Home() {
  return <HomeClient sections={sections} />;
}
