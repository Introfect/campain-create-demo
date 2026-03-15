import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import {
  setTimeBoundEnabled,
  setTimeBoundEndDate,
} from "@/store/slices/gamificationSlice";
import { cn } from "@/lib/utils";

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
        <label className="text-sm text-text fomt-medium">
          <p>Make the reward time bound</p>
          <p className="text-xs leading-[150%] mt-1 text-secondary-foreground">
            Choose an end date to stop this reward automatically.
          </p>
        </label>
        <Switch
          checked={enabled}
          onCheckedChange={(checked) => dispatch(setTimeBoundEnabled(checked))}
        />
      </div>

      {enabled && (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "justify-start border border-border-secondary rounded-lg text-base leading-[140%] text-text-muted bg-white h-fit py-[9px] px-3 text-left font-normal",
                isOpen
                  ? "border-primary border-2"
                  : "border-border-secondary border text-base ",
              )}
            >
              <CalendarIcon className="mr-2 size-5 text-[#4A4A4A]" />
              <span
                className={cn(
                  "text-text-muted",
                  endDate ? "text-text" : "text-text-muted",
                )}
              >
                {endDate ? format(endDate, "PPP") : "Select end date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto h-auto p-0" align="start">
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
