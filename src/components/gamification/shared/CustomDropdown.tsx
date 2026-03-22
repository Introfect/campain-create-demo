import { useEffect, useRef, type ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "@/lib/utils";
import ChevDownIcon from "@/components/svg/ChevDoen";

interface CustomDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
}

export const CustomDropdown = ({
  isOpen,
  onToggle,
  trigger,
  children,
  className = "",
  triggerClassName = "",
}: CustomDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          onToggle();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onToggle]);

  useHotkeys(
    "escape",
    () => {
      if (isOpen) onToggle();
    },
    { enabled: isOpen, preventDefault: true },
    [isOpen, onToggle],
  );

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full text-base leading-[140%] font-inter px-2.5 py-[9px] text-left bg-white border border-secondary outline outline-white hover:cursor-pointer rounded-lg flex items-center justify-between transition-colors",
          isOpen
            ? "border-primary border outline outline-primary"
            : "border-border-secondary",
          triggerClassName,
        )}
      >
        {trigger}
        <ChevDownIcon
          className={cn(" transition-transform", isOpen ? "rotate-180" : "")}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-[45px] left-0 right-0 bg-white border border-border-secondary rounded-lg  z-50",
            className,
          )}
          style={{
            boxShadow: "0px 4px 2px 0px rgba(48, 48, 48, 0.04)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
