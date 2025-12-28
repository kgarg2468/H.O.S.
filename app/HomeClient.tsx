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
      <Workspace activeContext={activeContext} />
      <IntelligenceRail activeContext={activeContext} />
    </div>
  );
}
