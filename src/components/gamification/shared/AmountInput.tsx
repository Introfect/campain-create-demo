import DollarIcon from "@/components/svg/Dollar";
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      // Allow empty string, numbers, and single decimal point
      if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
        onChange(newValue);
      }
    };

    return (
      <div
        className={`flex items-center mt-1 font-inter  gap-2 relative ${className}`}
      >
        <Input
          ref={ref}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1 pl-8 pt-[9px] h-auto font-inter text-base leading-[140%]"
          autoFocus={autoFocus}
          maxLength={15}
        ></Input>

        <DollarIcon className="absolute left-4 top-1/2 text-text -translate-y-1/2" />
      </div>
    );
  },
);

AmountInput.displayName = "AmountInput";
