import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface TooltipButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  tooltipMessage?: string | null;
  asChild?: boolean;
}

export const TooltipButton = React.forwardRef<
  HTMLButtonElement,
  TooltipButtonProps
>(({ tooltipMessage, disabled, children, className, ...buttonProps }, ref) => {
  // Only show tooltip when button is disabled and there's a message
  const shouldShowTooltip = disabled && tooltipMessage;

  console.log("TooltipButton:", {
    disabled,
    tooltipMessage,
    shouldShowTooltip,
  });

  if (!shouldShowTooltip) {
    return (
      <Button
        className={cn("w-full", className)}
        ref={ref}
        disabled={disabled}
        {...buttonProps}
      >
        {children}
      </Button>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn("inline-flex h-fit cursor-not-allowed", className)}
            style={{ pointerEvents: "auto" }}
          >
            <Button
              className="w-full text-base leading-[140%] font-inter pointer-events-none"
              ref={ref}
              disabled={disabled}
              {...buttonProps}
            >
              {children}
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={5}
          className="max-w-fit bg-text font-inter text-sm leading-[140%] text-white text-nowrap"
        >
          <p>{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

TooltipButton.displayName = "TooltipButton";
