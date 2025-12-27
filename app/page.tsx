import ContextRail from "@/components/os/ContextRail";
import IntelligenceRail from "@/components/os/IntelligenceRail";
import Workspace from "@/components/os/Workspace";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px minmax(0, 1fr) 300px",
        background: "#0b0f14",
        color: "#e2e8f0",
      }}
    >
      <ContextRail />
      <Workspace />
      <IntelligenceRail />
    </div>
  );
}
