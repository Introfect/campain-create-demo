import { Input } from "@/components/ui/input";
import type { KeyboardEvent } from "react";
import { forwardRef } from "react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "e.g. 100",
      autoFocus = false,
      className = "",
      onKeyDown,
    },
    ref,
  ) => {
    return (
      <div className={`flex items-center gap-2 relative ${className}`}>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1 pl-7 "
          autoFocus={autoFocus}
        ></Input>
        <span className="text-secondary absolute left-4 top-1/2 -translate-y-1/2">
          $
        </span>
      </div>
    );
  },
);

AmountInput.displayName = "AmountInput";
