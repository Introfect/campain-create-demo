import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CustomDropdown } from "./shared/CustomDropdown"
import { TIER_OPTIONS } from "../types"
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
  useEffect(() => {
    if (!tierSelection.isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          dispatch(setFocusedTierIndex((tierSelection.focusedIndex + 1) % TIER_OPTIONS.length))
          break
        case "ArrowUp":
          e.preventDefault()
          dispatch(setFocusedTierIndex((tierSelection.focusedIndex - 1 + TIER_OPTIONS.length) % TIER_OPTIONS.length))
          break
        case "Enter":
          e.preventDefault()
          const selectedTier = TIER_OPTIONS[tierSelection.focusedIndex]
          dispatch(setSelectedTierName(selectedTier.label))
          break
        case "Escape":
          e.preventDefault()
          dispatch(setTierDropdownOpen(false))
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [tierSelection.isOpen, tierSelection.focusedIndex, dispatch])

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
                className={`w-full px-3 py-2 text-left hover:bg-muted transition-colors ${
                  index === tierSelection.focusedIndex ? "bg-muted" : ""
                } ${tierSelection.selectedTierName === option.label ? "text-primary font-medium" : "text-secondary"}`}
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
