"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CommandPalette, {
  type CommandPaletteItem,
} from "@/components/os/CommandPalette";
import ContextRail from "@/components/os/ContextRail";
import IntelligenceRail, {
  type IntelligenceNotification,
} from "@/components/os/IntelligenceRail";
import Workspace from "@/components/os/Workspace";

const CONTEXTS: CommandPaletteItem[] = [
  {
    id: "kernel",
    title: "Kernel",
    description: "Inspect low-level runtime scheduling and health checks.",
    keywords: ["system", "runtime"],
  },
  {
    id: "processes",
    title: "Processes",
    description: "View active workloads and prioritize queue management.",
    keywords: ["workloads", "tasks"],
  },
  {
    id: "sensors",
    title: "Sensors",
    description: "Monitor sensor pings and stabilize signal quality.",
    keywords: ["telemetry", "feeds"],
  },
  {
    id: "operator",
    title: "Operator",
    description: "Sync operator notes and maintain situational awareness.",
    keywords: ["session", "notes"],
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    description: "Run diagnostics on live systems and loop in alerts.",
    keywords: ["alerts", "health"],
  },
];

const formatTimestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Home() {
  const [activeContext, setActiveContext] = useState(CONTEXTS[0]);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [notifications, setNotifications] = useState<
    IntelligenceNotification[]
  >([]);
  const notificationTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const pushNotification = useCallback((notification: IntelligenceNotification) => {
    setNotifications((prev) => [notification, ...prev].slice(0, 2));
    const timer = setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== notification.id));
    }, 4200);
    notificationTimers.current.push(timer);
  }, []);

  useEffect(() => {
    return () => {
      notificationTimers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectContext = useCallback(
    (item: CommandPaletteItem) => {
      setActiveContext(item);
      setIsPaletteOpen(false);
      pushNotification({
        id: `context-${item.id}-${Date.now()}`,
        title: "Context switched",
        message: `${item.title} is now the primary focus area.`,
        timestamp: formatTimestamp(),
      });
    },
    [pushNotification]
  );

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
      <CommandPalette
        isOpen={isPaletteOpen}
        items={CONTEXTS}
        activeId={activeContext.id}
        onSelect={handleSelectContext}
        onClose={() => setIsPaletteOpen(false)}
      />
      <ContextRail />
      <Workspace />
      <IntelligenceRail
        activeContext={activeContext.title}
        notifications={notifications}
      />
    </div>
  );
}
