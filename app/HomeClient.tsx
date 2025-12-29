"use client";

import { useEffect, useMemo, useState } from "react";
import CommandPalette from "@/components/os/CommandPalette";
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
  const itemLookup = useMemo(
    () => new Map(allItems.map((item) => [item.id, item])),
    [allItems]
  );
  const paletteItems = useMemo(
    () =>
      allItems.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.status ?? item.description,
        keywords: [item.type, item.status ?? "", item.description],
      })),
    [allItems]
  );
  const [activeContext, setActiveContext] = useState<ActiveContextItem>(
    allItems[0]
  );
  const [isPaletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectPaletteItem = (itemId: string) => {
    const nextContext = itemLookup.get(itemId);
    if (nextContext) {
      setActiveContext(nextContext);
    }
    setPaletteOpen(false);
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
      <CommandPalette
        isOpen={isPaletteOpen}
        items={paletteItems}
        activeId={activeContext.id}
        onSelect={(item) => handleSelectPaletteItem(item.id)}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}
