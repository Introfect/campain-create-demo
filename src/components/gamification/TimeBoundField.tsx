import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import {
  setTimeBoundEnabled,
  setTimeBoundEndDate,
} from "@/store/slices/gamificationSlice";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "../svg/Calendar";

export const TimeBoundField = () => {
  const dispatch = useAppDispatch();
  const { enabled, endDate } = useAppSelector(
    (state: RootState) => state.gamification.timeBound,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    dispatch(setTimeBoundEndDate(date || null));
    setIsOpen(false); // Close the popover after selection
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <label className="text-sm text-text font-medium">
          <p className="font-plus-jakarta-sans  py-1 leading-[140%] text-sm font-medium">
            Make the reward time bound
          </p>
          <p className="text-xs font-normal leading-[150%]  text-secondary-foreground">
            Choose an end date to stop this reward automatically.
          </p>
        </label>
        <Switch
          className="cursor-pointer"
          checked={enabled}
          onCheckedChange={(checked) => dispatch(setTimeBoundEnabled(checked))}
        />
      </div>

      {enabled && (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "justify-start border cursor-pointer outline outline-white border-border-secondary rounded-lg font-inter text-base leading-[140%] text-text-muted hover:bg-white bg-white h-fit py-[9px] px-2.5 flex items-center gap-2 text-left font-normal",
                isOpen
                  ? " border outline border-primary outline-primary "
                  : "border-border-secondary border text-base ",
              )}
            >
              <CalendarIcon />
              <span
                className={cn(
                  "text-text-muted",
                  endDate ? "text-text" : "text-text-muted",
                )}
              >
                {endDate ? format(endDate, "PPP") : "Select End Date"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto border-0 outline-none h-auto p-0"
            align="start"
            sideOffset={3}
            collisionPadding={16}
            avoidCollisions={true}
          >
            <Calendar
              mode="single"
              selected={endDate || undefined}
              onSelect={handleDateSelect}
              disabled={{
                before: new Date(new Date().setDate(new Date().getDate() + 1)),
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
