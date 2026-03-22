import { useRef, useEffect } from "react";
import type { PeriodType } from "@/lib/types";
import { PERIOD_OPTIONS } from "@/lib/types";
import ChevDownIcon from "@/components/svg/ChevDoen";
import CheckIcon from "@/components/svg/Check";

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
    <div className="relative w-full flex-1 " ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex-1 py-[9px] cursor-pointer text-base font-inter leading-[140%] px-2.5 placeholder:text-text-muted text-left bg-white border rounded-lg flex items-center justify-between transition-colors ${
          isOpen
            ? " ring ring-primary border border-primary"
            : "ring ring-border-secondary outline outline-white"
        }`}
      >
        <span className={value ? "text-secondary" : "text-muted-foreground"}>
          {value
            ? PERIOD_OPTIONS.find((o) => o.value === value)?.label
            : "Select duration"}
        </span>
        <ChevDownIcon
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full p-1 left-0 right-0 mt-1 bg-white border border-input rounded-lg shadow-lg z-60 py-1">
          {PERIOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value as PeriodType);
                onToggle();
              }}
              className={`w-full px-2 text-base leading-[140%] font-inter py-[9px] text-text cursor-pointer rounded-lg flex items-center justify-between text-left hover:bg-muted transition-colors ${value === option.value ? "text-primary hover:bg-primary-light bg-primary-light" : "text-secondary"}`}
            >
              {option.label}
              {value === option.value ? (
                <CheckIcon />
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
