"use client";

import { useMemo, useState } from "react";
import ContextRail from "@/components/os/ContextRail";
import IntelligenceRail from "@/components/os/IntelligenceRail";
import Workspace from "@/components/os/Workspace";
import type { ActiveContextItem, RailSection } from "@/lib/types";

interface HomeClientProps {
  sections: RailSection[];
}

export default function HomeClient({ sections }: HomeClientProps) {
  const allItems = useMemo(
    () => sections.flatMap((section) => section.items),
    [sections]
  );
  const [activeContext, setActiveContext] = useState<ActiveContextItem>(
    allItems[0]
  );
  const [analysisIds, setAnalysisIds] = useState<string[]>([]);

  const handleToggleAnalysis = (propertyId: string) => {
    setAnalysisIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, propertyId];
    });
  };

  const handleRemoveAnalysis = (propertyId: string) => {
    setAnalysisIds((prev) => prev.filter((id) => id !== propertyId));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px minmax(0, 1fr) 300px",
        alignItems: "stretch",
        background: "#0b0f14",
        color: "#e2e8f0",
      }}
    >
      <ContextRail
        sections={sections}
        activeItemId={activeContext.id}
        onSelect={setActiveContext}
      />
      <Workspace
        activeContext={activeContext}
        analysisIds={analysisIds}
        onToggleAnalysis={handleToggleAnalysis}
        onRemoveAnalysis={handleRemoveAnalysis}
      />
      <IntelligenceRail activeContext={activeContext} />
    </div>
  );
}
