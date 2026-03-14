import { Input } from "@/components/ui/input"
import { forwardRef } from "react"

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  className?: string
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ value, onChange, placeholder = "e.g. 100", autoFocus = false, className = "" }, ref) => {
    return (
      <div className={`px-3 py-2 flex items-center gap-2 ${className}`}>
        <span className="text-secondary">$</span>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          autoFocus={autoFocus}
        />
      </div>
    )
  }
)

AmountInput.displayName = "AmountInput"
