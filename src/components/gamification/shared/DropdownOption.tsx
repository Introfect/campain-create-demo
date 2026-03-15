import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface DropdownOptionProps {
  label: string;
  isSelected: boolean;
  isFocused?: boolean;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}

export const DropdownOption = ({
  label,
  isSelected,
  isFocused = false,
  onClick,
  icon,
  className = "",
}: DropdownOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 text-left rounded-lg hover:bg-muted flex items-center justify-between gap-2 w-full transition-colors ${
        isFocused ? "bg-muted" : ""
      } ${isSelected ? "text-primary bg-primary-light" : "text-secondary"} ${className}`}
    >
      {icon}
      <span>{label}</span>
      {isSelected ? <Check className="w-4 h-4" /> : <span className="w-4" />}
    </button>
  );
};
