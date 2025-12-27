import CommandCenter from "@/components/workspaces/CommandCenter";

const metricCardStyle: React.CSSProperties = {
  padding: "0.85rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  background: "rgba(15, 23, 42, 0.7)",
};

interface WorkspaceProps {
  activeContext: ActiveContextItem;
}

export default function Workspace({ activeContext }: WorkspaceProps) {
  return (
    <main
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        background: "linear-gradient(180deg, #0b1017 0%, #0b1220 100%)",
      }}
    >
      <CommandCenter />
    </main>
  );
}
