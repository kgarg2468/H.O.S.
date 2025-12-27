"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export type CommandPaletteItem = {
  id: string;
  title: string;
  description: string;
  keywords?: string[];
};

type CommandPaletteProps = {
  isOpen: boolean;
  items: CommandPaletteItem[];
  activeId?: string;
  onSelect: (item: CommandPaletteItem) => void;
  onClose: () => void;
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.65)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "10vh",
  zIndex: 40,
};

const panelStyle: React.CSSProperties = {
  width: "min(720px, 90vw)",
  background: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  borderRadius: "1rem",
  boxShadow: "0 20px 60px rgba(2, 6, 23, 0.6)",
  padding: "1.25rem",
  color: "#e2e8f0",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 0.9rem",
  borderRadius: "0.75rem",
  background: "rgba(15, 23, 42, 0.6)",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  color: "#e2e8f0",
  fontSize: "1rem",
  outline: "none",
};

const itemStyle: React.CSSProperties = {
  padding: "0.75rem 0.9rem",
  borderRadius: "0.75rem",
  border: "1px solid transparent",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

export default function CommandPalette({
  isOpen,
  items,
  activeId,
  onSelect,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return items;
    }

    return items.filter((item) => {
      const haystack = [
        item.title,
        item.description,
        ...(item.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [items, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setHighlightedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (!filteredItems.length) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredItems.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev === 0 ? filteredItems.length - 1 : prev - 1
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();
        onSelect(filteredItems[highlightedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems, highlightedIndex, isOpen, onClose, onSelect]);

  if (!isOpen) {
    return null;
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 600 }}>Jump to context</div>
          <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>⌘K</div>
        </div>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search contexts"
          style={{ ...inputStyle, marginTop: "0.75rem" }}
        />
        <div
          style={{
            marginTop: "0.9rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          {filteredItems.length === 0 ? (
            <div style={{ color: "#94a3b8", padding: "0.5rem" }}>
              No matches. Try another query.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isActive = item.id === activeId;
              const isHighlighted = index === highlightedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  style={{
                    ...itemStyle,
                    background: isHighlighted
                      ? "rgba(59, 130, 246, 0.18)"
                      : "transparent",
                    borderColor: isActive
                      ? "rgba(59, 130, 246, 0.4)"
                      : "transparent",
                    textAlign: "left",
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => onSelect(item)}
                >
                  <span style={{ fontWeight: 600 }}>{item.title}</span>
                  <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                    {item.description}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
