import CommandCenter from "@/components/workspaces/CommandCenter";

export default function Workspace() {
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
