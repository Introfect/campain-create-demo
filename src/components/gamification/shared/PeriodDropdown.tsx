import { Check, ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
import type { PeriodType } from "@/lib/types";
import { PERIOD_OPTIONS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PeriodDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  value: PeriodType;
  onChange: (value: PeriodType) => void;
  focusedIndex: number;
}

export const PeriodDropdown = ({
  isOpen,
  onToggle,
  value,
  onChange,
  focusedIndex,
}: PeriodDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onToggle]);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full py-[9px] px-2.5 placeholder:text-text-muted text-left bg-white border rounded-lg flex items-center justify-between transition-colors text-sm ${
          isOpen ? " border-2 border-primary" : "border-border-secondary"
        }`}
      >
        <span className={value ? "text-secondary" : "text-muted-foreground"}>
          {value
            ? PERIOD_OPTIONS.find((o) => o.value === value)?.label
            : "Select duration"}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full p-1 left-0 right-0 mt-1 bg-white border border-input rounded-lg shadow-lg z-60 py-1">
          {PERIOD_OPTIONS.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value as PeriodType);
                onToggle();
              }}
              className={`w-full px-2.5 py-1.5  flex items-center rounded-md justify-between text-left text-sm hover:bg-muted transition-colors ${
                index === focusedIndex ? "bg-muted" : ""
              } ${value === option.value ? "text-primary bg-primary-light" : "text-secondary"}`}
            >
              {option.label}
              {value === option.value ? (
                <Check
                  className={cn(
                    "w-4 h-4",
                    value === option.value
                      ? "text-primary bg-primary-light"
                      : "text-secondary",
                  )}
                />
              ) : (
                <span className="w-4" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
