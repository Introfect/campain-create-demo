import { useEffect, useRef } from "react";
import type React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomDropdown } from "./shared/CustomDropdown";
import { AmountInput } from "./shared/AmountInput";
import { DropdownOption } from "./shared/DropdownOption";
import { getCurrentRewardLabel } from "./utils/formatters";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import {
  setRewardTypeType,
  setRewardTypeAmount,
  setRewardTypeOpen,
  setFocusedRewardOptionIndex,
  saveRewardType,
  cancelRewardType,
} from "@/store/slices/gamificationSlice";
import { selectIsRewardSaveEnabled } from "@/store/selectors/gamificationSelectors";
import { TooltipButton } from "./shared/TooltipButton";
import { getValidationMessage } from "./utils/validationMessages";
import { DropDownLabels } from "./shared/DropDownLabels";

export const RewardTypeDropdown = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);
  const rewardType = useAppSelector(
    (state: RootState) => state.gamification.rewardType,
  );
  const savedEventType = useAppSelector(
    (state: RootState) => state.gamification.rewardEvent.savedEvent?.type,
  );
  const isRewardSaveEnabled = useAppSelector(selectIsRewardSaveEnabled);
  const validationMessage = getValidationMessage(state, "reward");

  const rewardAmountInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus reward amount input when flat_bonus is selected
  useEffect(() => {
    if (rewardType.type === "flat_bonus" && rewardType.isOpen) {
      setTimeout(() => rewardAmountInputRef.current?.focus(), 50);
    }
  }, [rewardType.type, rewardType.isOpen]);

  const isUpgradeTierDisabled =
    savedEventType === "post_times" || savedEventType === "is_onboarded";

  // Keyboard navigation for main dropdown options (2 options: flat_bonus, upgrade_tier)
  const REWARD_OPTIONS_COUNT = 2;
  useHotkeys(
    "down",
    () =>
      dispatch(
        setFocusedRewardOptionIndex(
          (rewardType.focusedOptionIndex + 1) % REWARD_OPTIONS_COUNT,
        ),
      ),
    { enabled: rewardType.isOpen, preventDefault: true },
    [rewardType.focusedOptionIndex, dispatch],
  );
  useHotkeys(
    "up",
    () =>
      dispatch(
        setFocusedRewardOptionIndex(
          (rewardType.focusedOptionIndex - 1 + REWARD_OPTIONS_COUNT) %
            REWARD_OPTIONS_COUNT,
        ),
      ),
    { enabled: rewardType.isOpen, preventDefault: true },
    [rewardType.focusedOptionIndex, dispatch],
  );
  useHotkeys(
    "enter",
    () => {
      const rewardTypes = ["flat_bonus", "upgrade_tier"] as const;
      const selectedType = rewardTypes[rewardType.focusedOptionIndex];
      if (selectedType === "upgrade_tier" && !isUpgradeTierDisabled) {
        dispatch(setRewardTypeType(selectedType));
      } else if (selectedType === "flat_bonus") {
        dispatch(setRewardTypeType(selectedType));
      }
    },
    { enabled: rewardType.isOpen && !rewardType.type, preventDefault: true },
    [
      rewardType.focusedOptionIndex,
      rewardType.type,
      isUpgradeTierDisabled,
      dispatch,
    ],
  );

  // Handler for Enter on flat_bonus amount input
  const handleRewardAmountKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(saveRewardType());
    }
  };

  const triggerLabel = getCurrentRewardLabel(
    rewardType.type,
    rewardType.amount,
    rewardType.savedReward?.tierName || "",
    rewardType.savedReward,
  );

  const rewardInputOptions =
    rewardType.type === "flat_bonus" && rewardType.isInputExpanded;

  const sr = rewardType.savedReward;
  const flatPencilOnHover =
    sr?.type === "flat_bonus" && (sr.amount?.trim() ?? "") !== "";
  const upgradePencilOnHover =
    sr?.type === "upgrade_tier" && !!sr.tierName?.trim();

  return (
    <div className="flex flex-col gap-2">
      <DropDownLabels label="Reward with" />

      <CustomDropdown
        isOpen={rewardType.isOpen}
        onToggle={() => dispatch(setRewardTypeOpen(!rewardType.isOpen))}
        trigger={
          <span
            className={
              rewardType.savedReward ? "text-secondary" : "text-text-muted"
            }
          >
            {triggerLabel}
          </span>
        }
      >
        <div className="flex flex-col p-1">
          <DropdownOption
            label="Flat $X bonus"
            isSelected={rewardType.type === "flat_bonus"}
            isFocused={rewardType.focusedOptionIndex === 0}
            showPencilOnHoverWhenSelected={flatPencilOnHover}
            onClick={() => dispatch(setRewardTypeType("flat_bonus"))}
          />

          {rewardInputOptions && (
            <>
              <AmountInput
                ref={rewardAmountInputRef}
                value={rewardType.amount}
                onChange={(value) => dispatch(setRewardTypeAmount(value))}
                onKeyDown={handleRewardAmountKeyDown}
              />
            </>
          )}

          <button
            type="button"
            onClick={() =>
              !isUpgradeTierDisabled &&
              dispatch(setRewardTypeType("upgrade_tier"))
            }
            disabled={isUpgradeTierDisabled}
            className={`group p-[9px] text-base leading-[140%] font-inter fornt-normal cursor-pointer text-left hover:bg-muted rounded-lg flex items-center justify-between gap-2 w-full transition-colors ${
              rewardType.type === "upgrade_tier"
                ? "text-primary hover:bg-primary-light bg-primary-light"
                : "text-secondary"
            } ${isUpgradeTierDisabled ? "text-text-muted cursor-not-allowed hover:bg-transparent" : ""}`}
          >
            <span className="text-base leading-[140%] font-inter font-normal">
              Upgrade Commission Tier
            </span>
            {rewardType.type === "upgrade_tier" ? (
              upgradePencilOnHover ? (
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
              <span className="w-6 shrink-0" />
            )}
          </button>
          {rewardInputOptions && (
            <div className="flex w-full mt-1 items-center justify-between gap-1">
              <Button
                type="button"
                variant="outline"
                className="w-[49%] -[49%] py-2 text-base leading-[140%] font-inter"
                onClick={() => dispatch(cancelRewardType())}
              >
                Cancel
              </Button>
              <TooltipButton
                type="button"
                variant="default"
                className="w-[49%] text-base leading-[140%] font-inter"
                disabled={!isRewardSaveEnabled}
                tooltipMessage={validationMessage}
                onClick={() => dispatch(saveRewardType())}
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
