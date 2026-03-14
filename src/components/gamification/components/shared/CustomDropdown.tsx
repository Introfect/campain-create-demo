import { useEffect, useRef, type ReactNode } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { ChevronDown } from "lucide-react"

interface CustomDropdownProps {
  isOpen: boolean
  onToggle: () => void
  trigger: ReactNode
  children: ReactNode
  className?: string
  triggerClassName?: string
}

export const CustomDropdown = ({
  isOpen,
  onToggle,
  trigger,
  children,
  className = "",
  triggerClassName = "",
}: CustomDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) {
          onToggle()
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onToggle])

  // Escape key to close dropdown
  useHotkeys("escape", () => {
    if (isOpen) onToggle()
  }, { enabled: isOpen, preventDefault: true }, [isOpen, onToggle])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full h-10 px-3 py-2 text-left bg-white border rounded-lg flex items-center justify-between transition-colors ${
          isOpen ? "border-primary ring-2 ring-primary/20" : "border-input"
        } ${triggerClassName}`}
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-input rounded-lg shadow-lg z-50 py-2">
          {children}
        </div>
      )}
    </div>
  )
}
