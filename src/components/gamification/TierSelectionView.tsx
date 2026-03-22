import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { CustomDropdown } from "./shared/CustomDropdown";
import { TIER_OPTIONS } from "../../lib/types";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import {
  setSelectedTierName,
  setTierDropdownOpen,
  setFocusedTierIndex,
  saveTierSelection,
  goBackFromTier,
} from "@/store/slices/gamificationSlice";
import { selectIsTierSaveEnabled } from "@/store/selectors/gamificationSelectors";
import { TooltipButton } from "./shared/TooltipButton";
import { getValidationMessage } from "./utils/validationMessages";
import CheckIcon from "../svg/Check";
import { DropDownLabels } from "./shared/DropDownLabels";

export const TierSelectionView = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);
  const tierSelection = useAppSelector(
    (state: RootState) => state.gamification.tierSelection,
  );
  const isTierSaveEnabled = useAppSelector(selectIsTierSaveEnabled);
  const validationMessage = getValidationMessage(state, "tier");

  // Keyboard navigation for tier dropdown
  useHotkeys(
    "down",
    () =>
      dispatch(
        setFocusedTierIndex(
          (tierSelection.focusedIndex + 1) % TIER_OPTIONS.length,
        ),
      ),
    { enabled: tierSelection.isOpen, preventDefault: true },
    [tierSelection.focusedIndex, dispatch],
  );
  useHotkeys(
    "up",
    () =>
      dispatch(
        setFocusedTierIndex(
          (tierSelection.focusedIndex - 1 + TIER_OPTIONS.length) %
            TIER_OPTIONS.length,
        ),
      ),
    { enabled: tierSelection.isOpen, preventDefault: true },
    [tierSelection.focusedIndex, dispatch],
  );
  useHotkeys(
    "enter",
    () => {
      const selectedTier = TIER_OPTIONS[tierSelection.focusedIndex];
      dispatch(setSelectedTierName(selectedTier.label));
    },
    { enabled: tierSelection.isOpen, preventDefault: true },
    [tierSelection.focusedIndex, dispatch],
  );
  useHotkeys(
    "escape",
    () => dispatch(setTierDropdownOpen(false)),
    { enabled: tierSelection.isOpen, preventDefault: true },
    [dispatch],
  );

  // Enter to save when tier is selected and dropdown is closed
  useHotkeys(
    "enter",
    () => dispatch(saveTierSelection()),
    {
      enabled: !tierSelection.isOpen && !!tierSelection.selectedTierName,
      preventDefault: true,
    },
    [tierSelection.selectedTierName, dispatch],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <DropDownLabels label="Upgrade to" />

        <CustomDropdown
          isOpen={tierSelection.isOpen}
          onToggle={() => dispatch(setTierDropdownOpen(!tierSelection.isOpen))}
          trigger={
            <span
              className={
                tierSelection.selectedTierName ? "text-text" : "text-text-muted"
              }
            >
              {tierSelection.selectedTierName || "Tier Name Here"}
            </span>
          }
        >
          <div className="p-1">
            {TIER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => dispatch(setSelectedTierName(option.label))}
                className={`w-full px-2 py-[9px] font-inter text-base leading-[140%] font-normal cursor-pointer text-left flex items-center justify-between text-text hover:bg-muted rounded-lg transition-colors${tierSelection.selectedTierName === option.label ? "text-primary hover:bg-primary-light bg-primary-light" : "text-secondary"}`}
              >
                {option.label}
                {tierSelection.selectedTierName === option.label ? (
                  <CheckIcon />
                ) : (
                  <span />
                )}
              </button>
            ))}
          </div>
        </CustomDropdown>
      </div>

      <div className="flex w-full items-center  justify-between gap-1">
        <Button
          type="button"
          variant="outline"
          className="w-[49%] -[49%] py-2 text-base leading-[140%] font-inter"
          onClick={() => dispatch(goBackFromTier())}
        >
          Go Back
        </Button>
        <TooltipButton
          type="button"
          variant="default"
          className="w-[49%] text-base leading-[140%] font-inter"
          disabled={!isTierSaveEnabled}
          tooltipMessage={validationMessage}
          onClick={() => dispatch(saveTierSelection())}
        >
          Save
        </TooltipButton>
      </div>
    </div>
  );
};
