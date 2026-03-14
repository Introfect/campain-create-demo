import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomDropdown } from "./shared/CustomDropdown"
import { AmountInput } from "./shared/AmountInput"
import { DropdownOption } from "./shared/DropdownOption"
import { PeriodDropdown } from "./shared/PeriodDropdown"
import { getCurrentEventLabel } from "../utils/formatters"
import { PERIOD_OPTIONS } from "../types"
import { useAppDispatch, useAppSelector, type RootState } from "@/store"
import {
  setRewardEventType,
  setRewardEventAmount,
  setRewardEventPostTimes,
  setRewardEventPostPeriod,
  setRewardEventOpen,
  setPeriodDropdownOpen,
  setFocusedPeriodIndex,
  saveRewardEvent,
  cancelRewardEvent,
} from "@/store/slices/gamificationSlice"

export const RewardEventDropdown = () => {
  const dispatch = useAppDispatch()
  const rewardEvent = useAppSelector((state: RootState) => state.gamification.rewardEvent)
  
  const amountInputRef = useRef<HTMLInputElement>(null)
  const postTimesInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus amount input when cross_sales is selected
  useEffect(() => {
    if (rewardEvent.type === "cross_sales" && rewardEvent.isOpen) {
      setTimeout(() => amountInputRef.current?.focus(), 50)
    }
  }, [rewardEvent.type, rewardEvent.isOpen])

  // Auto-focus postTimes input when post_times is selected
  useEffect(() => {
    if (rewardEvent.type === "post_times" && rewardEvent.isOpen) {
      setTimeout(() => postTimesInputRef.current?.focus(), 50)
    }
  }, [rewardEvent.type, rewardEvent.isOpen])

  // Keyboard navigation for period dropdown
  useEffect(() => {
    if (!rewardEvent.periodDropdownOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          dispatch(setFocusedPeriodIndex((rewardEvent.focusedPeriodIndex + 1) % PERIOD_OPTIONS.length))
          break
        case "ArrowUp":
          e.preventDefault()
          dispatch(setFocusedPeriodIndex((rewardEvent.focusedPeriodIndex - 1 + PERIOD_OPTIONS.length) % PERIOD_OPTIONS.length))
          break
        case "Enter":
          e.preventDefault()
          dispatch(setRewardEventPostPeriod(PERIOD_OPTIONS[rewardEvent.focusedPeriodIndex].value))
          dispatch(setPeriodDropdownOpen(false))
          break
        case "Escape":
          e.preventDefault()
          dispatch(setPeriodDropdownOpen(false))
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [rewardEvent.periodDropdownOpen, rewardEvent.focusedPeriodIndex, dispatch])

  const triggerLabel = getCurrentEventLabel(
    rewardEvent.type,
    rewardEvent.amount,
    rewardEvent.postTimes,
    rewardEvent.postPeriod,
    rewardEvent.savedEvent
  )

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-secondary">Reward event *</label>

      <CustomDropdown
        isOpen={rewardEvent.isOpen}
        onToggle={() => dispatch(setRewardEventOpen(!rewardEvent.isOpen))}
        trigger={
          <span className={rewardEvent.savedEvent ? "text-secondary" : "text-muted-foreground"}>
            {triggerLabel}
          </span>
        }
      >
        <div className="flex flex-col">
          <DropdownOption
            label="Cross $X in sales"
            isSelected={rewardEvent.type === "cross_sales"}
            onClick={() => dispatch(setRewardEventType("cross_sales"))}
          />

          {rewardEvent.type === "cross_sales" && (
            <AmountInput
              ref={amountInputRef}
              value={rewardEvent.amount}
              onChange={(value) => dispatch(setRewardEventAmount(value))}
            />
          )}

          <DropdownOption
            label="Posts X times every Y period"
            isSelected={rewardEvent.type === "post_times"}
            onClick={() => dispatch(setRewardEventType("post_times"))}
          />

          {rewardEvent.type === "post_times" && (
            <div className="px-3 py-2 flex items-center gap-2">
              <Input
                ref={postTimesInputRef}
                type="number"
                value={rewardEvent.postTimes}
                onChange={(e) => dispatch(setRewardEventPostTimes(e.target.value))}
                placeholder="e.g. 4"
                className="flex-1"
                min="1"
              />

              <PeriodDropdown
                isOpen={rewardEvent.periodDropdownOpen}
                onToggle={() => dispatch(setPeriodDropdownOpen(!rewardEvent.periodDropdownOpen))}
                value={rewardEvent.postPeriod}
                onChange={(value) => dispatch(setRewardEventPostPeriod(value))}
                focusedIndex={rewardEvent.focusedPeriodIndex}
              />
            </div>
          )}

          <DropdownOption
            label="Is Onboarded"
            isSelected={rewardEvent.type === "is_onboarded"}
            onClick={() => dispatch(setRewardEventType("is_onboarded"))}
          />

          {/* Only show Save/Cancel buttons when an option with input fields is selected */}
          {(rewardEvent.type === "cross_sales" || rewardEvent.type === "post_times") && (
            <div className="flex items-center justify-end gap-2 px-3 pt-2 mt-2 border-t border-input">
              <Button type="button" variant="ghost" size="sm" onClick={() => dispatch(cancelRewardEvent())}>
                Cancel
              </Button>
              <Button type="button" variant="default" size="sm" onClick={() => dispatch(saveRewardEvent())}>
                Save
              </Button>
            </div>
          )}
        </div>
      </CustomDropdown>
    </div>
  )
}
