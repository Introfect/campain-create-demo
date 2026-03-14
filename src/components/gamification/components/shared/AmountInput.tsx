import { Input } from "@/components/ui/input"
import type { KeyboardEvent } from "react"
import { forwardRef } from "react"

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  className?: string
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ value, onChange, placeholder = "e.g. 100", autoFocus = false, className = "", onKeyDown }, ref) => {
    return (
      <div className={`px-3 py-2 flex items-center gap-2 ${className}`}>
        <span className="text-secondary">$</span>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1"
          autoFocus={autoFocus}
        />
      </div>
    )
  }
)

AmountInput.displayName = "AmountInput"
