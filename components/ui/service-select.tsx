"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { cn } from "@/lib/utils/cn";
import { SERVICE_OPTIONS } from "@/types/lead";
import type { ServiceOption } from "@/types/lead";

type ServiceSelectProps = {
  name: string;
  value?: ServiceOption;
  onChange: (value: ServiceOption) => void;
  onBlur: () => void;
  placeholder?: string;
  theme?: "dark" | "light";
};

export function ServiceSelect({
  name,
  value,
  onChange,
  onBlur,
  placeholder = "Select a service",
  theme = "dark",
}: ServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        onBlur();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [onBlur]);

  function chooseService(service: ServiceOption) {
    onChange(service);
    onBlur();
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + SERVICE_OPTIONS.length) % SERVICE_OPTIONS.length;
      });
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      chooseService(SERVICE_OPTIONS[activeIndex]);
    }
  }

  function toggleSelect() {
    if (!open) {
      const selectedIndex = value ? SERVICE_OPTIONS.indexOf(value) : 0;
      setActiveIndex(Math.max(selectedIndex, 0));
    }
    setOpen((current) => !current);
  }

  return (
    <div ref={containerRef} className="relative mt-2">
      <button
        type="button"
        name={name}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={toggleSelect}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-lg border px-4 text-left text-sm outline-none transition",
          theme === "dark"
            ? "border-white/10 bg-white/[.035] hover:border-white/20 focus:border-cyan-300/50 focus:bg-white/[.055] focus:ring-4 focus:ring-cyan-300/5"
            : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
          value
            ? theme === "dark" ? "text-white" : "text-slate-950"
            : theme === "dark" ? "text-slate-600" : "text-slate-400",
        )}
      >
        <span>{value ?? placeholder}</span>
        <ChevronDown
          size={17}
          className={cn(
            "text-slate-400 transition-transform",
            open && (theme === "dark" ? "rotate-180 text-cyan-300" : "rotate-180 text-blue-600"),
          )}
        />
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          className={cn(
            "absolute z-50 mt-2 w-full overflow-hidden rounded-xl border p-1.5 shadow-2xl",
            theme === "dark"
              ? "border-white/10 bg-[#0b1020] shadow-black/50"
              : "border-slate-200 bg-white shadow-blue-950/15",
          )}
        >
          {SERVICE_OPTIONS.map((service, index) => {
            const selected = service === value;
            const active = index === activeIndex;

            return (
              <button
                key={service}
                type="button"
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseService(service)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition",
                  theme === "dark" ? "text-slate-300" : "text-slate-700",
                  active && (theme === "dark" ? "bg-white/[.07] text-white" : "bg-blue-50 text-slate-950"),
                  selected && (theme === "dark"
                    ? "bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-cyan-200"
                    : "bg-blue-600 text-white"),
                )}
              >
                {service}
                {selected && <Check size={15} className={theme === "dark" ? "text-cyan-300" : "text-white"} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
