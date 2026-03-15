import { useHotkeys } from "react-hotkeys-hook"
import { Button } from "@/components/ui/button"
import { CustomDropdown } from "./shared/CustomDropdown"
import { TIER_OPTIONS } from "../../lib/types"
import { useAppDispatch, useAppSelector, type RootState } from "@/store"
import {
  setSelectedTierName,
  setTierDropdownOpen,
  setFocusedTierIndex,
  saveTierSelection,
  goBackFromTier,
} from "@/store/slices/gamificationSlice"

export const TierSelectionView = () => {
  const dispatch = useAppDispatch()
  const tierSelection = useAppSelector((state: RootState) => state.gamification.tierSelection)

  // Keyboard navigation for tier dropdown
  useHotkeys("down", () => dispatch(setFocusedTierIndex((tierSelection.focusedIndex + 1) % TIER_OPTIONS.length)), { enabled: tierSelection.isOpen, preventDefault: true }, [tierSelection.focusedIndex, dispatch])
  useHotkeys("up", () => dispatch(setFocusedTierIndex((tierSelection.focusedIndex - 1 + TIER_OPTIONS.length) % TIER_OPTIONS.length)), { enabled: tierSelection.isOpen, preventDefault: true }, [tierSelection.focusedIndex, dispatch])
  useHotkeys("enter", () => { const selectedTier = TIER_OPTIONS[tierSelection.focusedIndex]; dispatch(setSelectedTierName(selectedTier.label)) }, { enabled: tierSelection.isOpen, preventDefault: true }, [tierSelection.focusedIndex, dispatch])
  useHotkeys("escape", () => dispatch(setTierDropdownOpen(false)), { enabled: tierSelection.isOpen, preventDefault: true }, [dispatch])

  // Enter to save when tier is selected and dropdown is closed
  useHotkeys("enter", () => dispatch(saveTierSelection()), { enabled: !tierSelection.isOpen && !!tierSelection.selectedTierName, preventDefault: true }, [tierSelection.selectedTierName, dispatch])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-secondary">Upgrade to *</label>

        <CustomDropdown
          isOpen={tierSelection.isOpen}
          onToggle={() => dispatch(setTierDropdownOpen(!tierSelection.isOpen))}
          trigger={
            <span className={tierSelection.selectedTierName ? "text-secondary" : "text-muted-foreground"}>
              {tierSelection.selectedTierName || "Tier Name Here"}
            </span>
          }
        >
          <div className="py-1">
            {TIER_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => dispatch(setSelectedTierName(option.label))}
                className={`w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-colors ${index === tierSelection.focusedIndex ? "bg-muted" : ""
                  } ${tierSelection.selectedTierName === option.label ? "text-primary bg-primary-light" : "text-secondary"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </CustomDropdown>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => dispatch(goBackFromTier())}>
          Go Back
        </Button>
        <Button type="button" variant="default" onClick={() => dispatch(saveTierSelection())}>
          Save
        </Button>
      </div>
    </div>
  )
}
