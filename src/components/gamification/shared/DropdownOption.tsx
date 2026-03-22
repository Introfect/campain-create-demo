import { PencilIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import CheckIcon from "@/components/svg/Check";

interface DropdownOptionProps {
  label: string;
  isSelected: boolean;
  isFocused?: boolean;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
  /** When true and selected, check fades on row hover and pencil shows (saved-config edit affordance). */
  showPencilOnHoverWhenSelected?: boolean;
}

export const DropdownOption = ({
  label,
  isSelected,
  isFocused: _isFocused = false,
  onClick,
  className = "",
  showPencilOnHoverWhenSelected = false,
}: DropdownOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group px-2 py-[9px] border-0 text-base leading-[140%] font-inter cursor-pointer text-left rounded-lg hover:bg-muted flex items-center justify-between gap-2 w-full transition-colors",
        isSelected
          ? "text-primary hover:bg-primary-light bg-primary-light"
          : "text-secondary",
        className,
      )}
    >
      <span>{label}</span>
      {isSelected ? (
        showPencilOnHoverWhenSelected ? (
          <span className="relative shrink-0">
            <CheckIcon className="transition-opacity group-hover:opacity-0" />
            <img
              src="/Edit.svg"
              className="size-6 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            />
          </span>
        ) : (
          <CheckIcon className=" shrink-0" />
        )
      ) : (
        <span className="w-4 shrink-0" />
      )}
    </button>
  );
};
