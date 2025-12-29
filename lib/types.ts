export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonArray = JsonValue[];

export type MockData<T extends JsonValue = JsonValue> = T;

export type ActiveContextType = "command" | "buyer" | "deal" | "property";

export interface Buyer {
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
}

export interface Deal {
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
}

export interface Property {
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
}

export interface Event {
  id: string;
  date: string;
  type: string;
  buyer_id: string;
  property_id: string;
  deal_id: string | null;
  notes: string;
  outcome: string;
}

export interface Insight {
  id: string;
  buyer_id: string;
  buyer_name?: string;
  signal_level?: "standard" | "high";
  signal_summary?: string;
  fit_score: number;
  top_properties: string[];
  rationale: string;
  next_actions: string[];
  explainability?: string[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface IntelligenceCard {
  title: string;
  description: string;
}

export interface ActiveContext {
  id: string;
  type: ActiveContextType;
  title: string;
  description: string;
  status?: string;
  metrics?: Metric[];
  intelligence?: IntelligenceCard[];
}

export interface RailSection {
  title: string;
  items: ActiveContext[];
}
