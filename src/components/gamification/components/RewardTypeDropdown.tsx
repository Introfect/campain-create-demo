import { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { CustomDropdown } from "./shared/CustomDropdown"
import { AmountInput } from "./shared/AmountInput"
import { DropdownOption } from "./shared/DropdownOption"
import { getCurrentRewardLabel } from "../utils/formatters"
import { useAppDispatch, useAppSelector, type RootState } from "@/store"
import {
  setRewardTypeType,
  setRewardTypeAmount,
  setRewardTypeOpen,
} from "@/store/slices/gamificationSlice"

export const RewardTypeDropdown = () => {
  const dispatch = useAppDispatch()
  const rewardType = useAppSelector((state: RootState) => state.gamification.rewardType)
  const savedEventType = useAppSelector((state: RootState) => state.gamification.rewardEvent.savedEvent?.type)

  const rewardAmountInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus reward amount input when flat_bonus is selected
  useEffect(() => {
    if (rewardType.type === "flat_bonus" && rewardType.isOpen) {
      setTimeout(() => rewardAmountInputRef.current?.focus(), 50)
    }
  }, [rewardType.type, rewardType.isOpen])

  const isUpgradeTierDisabled = savedEventType === "post_times" || savedEventType === "is_onboarded"

  const triggerLabel = getCurrentRewardLabel(
    rewardType.type,
    rewardType.amount,
    rewardType.savedReward?.tierName || "",
    rewardType.savedReward
  )

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-secondary">Reward with *</label>

      <CustomDropdown
        isOpen={rewardType.isOpen}
        onToggle={() => dispatch(setRewardTypeOpen(!rewardType.isOpen))}
        trigger={
          <span className={rewardType.savedReward ? "text-secondary" : "text-muted-foreground"}>
            {triggerLabel}
          </span>
        }
      >
        <div className="flex flex-col">
          <DropdownOption
            label="Flat $X bonus"
            isSelected={rewardType.type === "flat_bonus"}
            onClick={() => dispatch(setRewardTypeType("flat_bonus"))}
          />

          {rewardType.type === "flat_bonus" && (
            <AmountInput
              ref={rewardAmountInputRef}
              value={rewardType.amount}
              onChange={(value) => dispatch(setRewardTypeAmount(value))}
            />
          )}

          <button
            type="button"
            onClick={() => !isUpgradeTierDisabled && dispatch(setRewardTypeType("upgrade_tier"))}
            disabled={isUpgradeTierDisabled}
            className={`px-3 py-2 text-left hover:bg-muted flex items-center gap-2 w-full transition-colors ${rewardType.type === "upgrade_tier" ? "text-primary" : "text-secondary"
              } ${isUpgradeTierDisabled ? "opacity-50 cursor-not-allowed hover:bg-transparent" : ""}`}
          >
            {rewardType.type === "upgrade_tier" ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="w-4" />
            )}
            <span>Upgrade Commission Tier</span>
          </button>
        </div>
      </CustomDropdown>
    </div>
  )
}
