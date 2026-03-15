import { useEffect, useRef, type ReactNode } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

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

  useHotkeys("escape", () => {
    if (isOpen) onToggle()
  }, { enabled: isOpen, preventDefault: true }, [isOpen, onToggle])

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className={cn("w-full text-base leading-[140%] px-3 py-[9px] text-left bg-white border border-secondary rounded-lg flex items-center justify-between transition-colors", isOpen ? "border-primary border-2" : "border-border-secondary", triggerClassName)}
      >
        {trigger}
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <div className={cn("absolute top-full left-0 right-0 bg-white border border-border-secondary rounded-lg shadow-lg z-50 p-1", className)}>
          {children}
        </div>
      )}
    </div>
  )
}
