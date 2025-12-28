export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonArray = JsonValue[];

export type MockData<T extends JsonValue = JsonValue> = T;

export type ActiveContextType = "buyer" | "deal" | "property" | "command";

export interface Metric {
  label: string;
  value: string;
}

export interface IntelligenceCard {
  title: string;
  description: string;
}

export interface ActiveContextItem {
  id: string;
  type: ActiveContextType;
  title: string;
  description: string;
  status: string;
  metrics: Metric[];
  intelligence: IntelligenceCard[];
}

export interface RailSection {
  title: string;
  items: ActiveContextItem[];
}
