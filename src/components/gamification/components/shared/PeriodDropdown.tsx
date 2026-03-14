import { ChevronDown } from "lucide-react"
import { useRef, useEffect } from "react"
import type { PeriodType } from "../../types"
import { PERIOD_OPTIONS } from "../../types"

interface PeriodDropdownProps {
  isOpen: boolean
  onToggle: () => void
  value: PeriodType
  onChange: (value: PeriodType) => void
  focusedIndex: number
}

export const PeriodDropdown = ({ isOpen, onToggle, value, onChange, focusedIndex }: PeriodDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onToggle])

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full h-8 px-2.5 py-1 text-left bg-white border rounded-lg flex items-center justify-between transition-colors text-sm ${
          isOpen ? "border-primary ring-2 ring-primary/20" : "border-input"
        }`}
      >
        <span className={value ? "text-secondary" : "text-muted-foreground"}>
          {value ? PERIOD_OPTIONS.find((o) => o.value === value)?.label : "Select duration"}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-input rounded-lg shadow-lg z-60 py-1">
          {PERIOD_OPTIONS.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value as PeriodType)
                onToggle()
              }}
              className={`w-full px-2.5 py-1.5 text-left text-sm hover:bg-muted transition-colors ${
                index === focusedIndex ? "bg-muted" : ""
              } ${value === option.value ? "text-primary font-medium" : "text-secondary"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
