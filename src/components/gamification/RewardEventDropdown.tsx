import { useEffect, useRef } from "react";
import type React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomDropdown } from "./shared/CustomDropdown";
import { AmountInput } from "./shared/AmountInput";
import { DropdownOption } from "./shared/DropdownOption";
import { PeriodDropdown } from "./shared/PeriodDropdown";
import { getCurrentEventLabel } from "./utils/formatters";
import { PERIOD_OPTIONS } from "../../lib/types";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import {
  setRewardEventType,
  setRewardEventAmount,
  setRewardEventPostTimes,
  setRewardEventPostPeriod,
  setRewardEventOpen,
  setPeriodDropdownOpen,
  setFocusedPeriodIndex,
  setFocusedEventOptionIndex,
  saveRewardEvent,
  cancelRewardEvent,
} from "@/store/slices/gamificationSlice";
import { selectIsEventSaveEnabled } from "@/store/selectors/gamificationSelectors";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./shared/TooltipButton";
import { getValidationMessage } from "./utils/validationMessages";
import { DropDownLabels } from "./shared/DropDownLabels";

export const RewardEventDropdown = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);
  const rewardEvent = useAppSelector(
    (state: RootState) => state.gamification.rewardEvent,
  );
  const isEventSaveEnabled = useAppSelector(selectIsEventSaveEnabled);
  const validationMessage = getValidationMessage(state, "event");

  const amountInputRef = useRef<HTMLInputElement>(null);
  const postTimesInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rewardEvent.type === "cross_sales" && rewardEvent.isOpen) {
      setTimeout(() => amountInputRef.current?.focus(), 50);
    }
  }, [rewardEvent.type, rewardEvent.isOpen]);

  useEffect(() => {
    if (rewardEvent.type === "post_times" && rewardEvent.isOpen) {
      setTimeout(() => postTimesInputRef.current?.focus(), 50);
    }
  }, [rewardEvent.type, rewardEvent.isOpen]);

  useHotkeys(
    "down",
    () =>
      dispatch(
        setFocusedPeriodIndex(
          (rewardEvent.focusedPeriodIndex + 1) % PERIOD_OPTIONS.length,
        ),
      ),
    { enabled: rewardEvent.periodDropdownOpen, preventDefault: true },
    [rewardEvent.focusedPeriodIndex, dispatch],
  );
  useHotkeys(
    "up",
    () =>
      dispatch(
        setFocusedPeriodIndex(
          (rewardEvent.focusedPeriodIndex - 1 + PERIOD_OPTIONS.length) %
            PERIOD_OPTIONS.length,
        ),
      ),
    { enabled: rewardEvent.periodDropdownOpen, preventDefault: true },
    [rewardEvent.focusedPeriodIndex, dispatch],
  );
  useHotkeys(
    "enter",
    () => {
      dispatch(
        setRewardEventPostPeriod(
          PERIOD_OPTIONS[rewardEvent.focusedPeriodIndex].value,
        ),
      );
      dispatch(setPeriodDropdownOpen(false));
    },
    { enabled: rewardEvent.periodDropdownOpen, preventDefault: true },
    [rewardEvent.focusedPeriodIndex, dispatch],
  );
  useHotkeys(
    "escape",
    () => dispatch(setPeriodDropdownOpen(false)),
    { enabled: rewardEvent.periodDropdownOpen, preventDefault: true },
    [dispatch],
  );

  const EVENT_OPTIONS_COUNT = 3;
  useHotkeys(
    "down",
    () =>
      dispatch(
        setFocusedEventOptionIndex(
          (rewardEvent.focusedOptionIndex + 1) % EVENT_OPTIONS_COUNT,
        ),
      ),
    {
      enabled: rewardEvent.isOpen && !rewardEvent.periodDropdownOpen,
      preventDefault: true,
    },
    [rewardEvent.focusedOptionIndex, dispatch],
  );
  useHotkeys(
    "up",
    () =>
      dispatch(
        setFocusedEventOptionIndex(
          (rewardEvent.focusedOptionIndex - 1 + EVENT_OPTIONS_COUNT) %
            EVENT_OPTIONS_COUNT,
        ),
      ),
    {
      enabled: rewardEvent.isOpen && !rewardEvent.periodDropdownOpen,
      preventDefault: true,
    },
    [rewardEvent.focusedOptionIndex, dispatch],
  );
  useHotkeys(
    "enter",
    () => {
      const eventTypes = ["cross_sales", "post_times", "is_onboarded"] as const;
      dispatch(setRewardEventType(eventTypes[rewardEvent.focusedOptionIndex]));
    },
    {
      enabled:
        rewardEvent.isOpen &&
        !rewardEvent.periodDropdownOpen &&
        !rewardEvent.type,
      preventDefault: true,
    },
    [rewardEvent.focusedOptionIndex, rewardEvent.type, dispatch],
  );

  // Handler for Enter on cross_sales amount input
  const handleAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(saveRewardEvent());
    }
  };
  const handlePostTimesKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      postTimesInputRef.current?.blur();
      dispatch(setPeriodDropdownOpen(true));
    }
  };

  const triggerLabel = getCurrentEventLabel(
    rewardEvent.type,
    rewardEvent.amount,
    rewardEvent.postTimes,
    rewardEvent.postPeriod,
    rewardEvent.savedEvent,
  );

  const se = rewardEvent.savedEvent;
  const pencilHoverCrossSales =
    se?.type === "cross_sales" && (se.amount?.trim() ?? "") !== "";
  const pencilHoverPostTimes =
    se?.type === "post_times" &&
    (se.postTimes?.trim() ?? "") !== "" &&
    se.postPeriod != null;
  const pencilHoverOnboarded = se?.type === "is_onboarded";

  return (
    <div className="flex flex-col gap-2">
      <DropDownLabels label="Reward event" />

      <CustomDropdown
        isOpen={rewardEvent.isOpen}
        onToggle={() => dispatch(setRewardEventOpen(!rewardEvent.isOpen))}
        trigger={
          <p
            className={cn(
              "font-",
              rewardEvent.savedEvent ? "text-text" : "text-text-muted",
            )}
          >
            {triggerLabel}
          </p>
        }
      >
        <div className="flex-col  p-1">
          <DropdownOption
            label="Cross $X in sales"
            isSelected={rewardEvent.type === "cross_sales"}
            isFocused={rewardEvent.focusedOptionIndex === 0}
            showPencilOnHoverWhenSelected={pencilHoverCrossSales}
            onClick={() => dispatch(setRewardEventType("cross_sales"))}
          />

          {rewardEvent.type === "cross_sales" &&
            rewardEvent.isInputExpanded && (
              <AmountInput
                ref={amountInputRef}
                value={rewardEvent.amount}
                onChange={(value) => dispatch(setRewardEventAmount(value))}
                onKeyDown={handleAmountKeyDown}
              />
            )}

          <DropdownOption
            label="Posts X times every Y period"
            isSelected={rewardEvent.type === "post_times"}
            isFocused={rewardEvent.focusedOptionIndex === 1}
            showPencilOnHoverWhenSelected={pencilHoverPostTimes}
            onClick={() => dispatch(setRewardEventType("post_times"))}
          />

          {rewardEvent.type === "post_times" && rewardEvent.isInputExpanded && (
            <div className="flex items-center mt-1 gap-2">
              <Input
                ref={postTimesInputRef}
                type="number"
                value={rewardEvent.postTimes}
                onChange={(e) =>
                  dispatch(setRewardEventPostTimes(e.target.value))
                }
                onKeyDown={handlePostTimesKeyDown}
                placeholder="e.g: 4"
                className="w-[48%] text-base leading-[140%] rounded-lg font-inter px-2.5 py-[9px]"
                min="1"
              />

              <PeriodDropdown
                isOpen={rewardEvent.periodDropdownOpen}
                onToggle={() =>
                  dispatch(
                    setPeriodDropdownOpen(!rewardEvent.periodDropdownOpen),
                  )
                }
                value={rewardEvent.postPeriod}
                onChange={(value) => dispatch(setRewardEventPostPeriod(value))}
                focusedIndex={rewardEvent.focusedPeriodIndex}
              />
            </div>
          )}

          <DropdownOption
            label="Is Onboarded"
            isSelected={rewardEvent.type === "is_onboarded"}
            isFocused={rewardEvent.focusedOptionIndex === 2}
            showPencilOnHoverWhenSelected={pencilHoverOnboarded}
            onClick={() => dispatch(setRewardEventType("is_onboarded"))}
          />

          {(rewardEvent.type === "cross_sales" ||
            rewardEvent.type === "post_times") &&
            rewardEvent.isInputExpanded && (
              <div className="flex w-full mt-2 h-fit items-center justify-between gap-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-[49%] py-2 text-base leading-[140%] font-inter"
                  onClick={() => dispatch(cancelRewardEvent())}
                >
                  Cancel
                </Button>
                <TooltipButton
                  type="button"
                  variant="default"
                  className="w-[49%] text-base leading-[140%] font-inter"
                  disabled={!isEventSaveEnabled}
                  tooltipMessage={validationMessage}
                  onClick={() => dispatch(saveRewardEvent())}
                >
                  Save
                </TooltipButton>
              </div>
            )}
        </div>
      </CustomDropdown>
    </div>
  );
};
