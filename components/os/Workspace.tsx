import BuyerWorkspace from "@/components/workspaces/BuyerWorkspace";
import DealWorkspace from "@/components/workspaces/DealWorkspace";
import PropertyWorkspace from "@/components/workspaces/PropertyWorkspace";
import type { ActiveContextItem } from "@/lib/types";

interface WorkspaceProps {
  activeContext: ActiveContextItem;
  analysisIds: string[];
  onAddToAnalysis: (propertyId: string) => void;
}

export default function Workspace({
  activeContext,
  analysisIds,
  onAddToAnalysis,
}: WorkspaceProps) {
  switch (activeContext.type) {
    case "buyer":
      return <BuyerWorkspace />;
    case "deal":
      return <DealWorkspace />;
    case "property":
      return (
        <PropertyWorkspace
          analysisIds={analysisIds}
          onAddToAnalysis={onAddToAnalysis}
        />
      );
    default:
      return null;
  }
}
