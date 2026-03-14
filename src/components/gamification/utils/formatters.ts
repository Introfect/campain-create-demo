import type { PeriodType, RewardEventType, SavedEvent, RewardType, SavedReward } from "../types"
import { PERIOD_OPTIONS } from "../types"

export const formatPeriod = (period: PeriodType): string => {
  if (!period) return ""
  const option = PERIOD_OPTIONS.find((opt) => opt.value === period)
  return option?.label || ""
}

export const getEventTriggerLabel = (savedEvent: SavedEvent | null): string => {
  if (savedEvent?.type === "cross_sales") {
    return savedEvent.amount ? `Cross $${savedEvent.amount} in sales` : "Cross $X in sales"
  }
  if (savedEvent?.type === "post_times") {
    const times = savedEvent.postTimes || "X"
    const period = savedEvent.postPeriod ? formatPeriod(savedEvent.postPeriod) : "Y period"
    return `Posts ${times} times every ${period}`
  }
  if (savedEvent?.type === "is_onboarded") {
    return "Is Onboarded"
  }
  return "Reward event *"
}

export const getCurrentEventLabel = (
  rewardEvent: RewardEventType,
  amount: string,
  postTimes: string,
  postPeriod: PeriodType,
  savedEvent: SavedEvent | null
): string => {
  if (rewardEvent === "cross_sales") {
    return amount ? `Cross $${amount} in sales` : "Cross $X in sales"
  }
  if (rewardEvent === "post_times") {
    const times = postTimes || "X"
    const period = postPeriod ? formatPeriod(postPeriod) : "Y period"
    return `Posts ${times} times every ${period}`
  }
  return getEventTriggerLabel(savedEvent)
}

export const getRewardTriggerLabel = (savedReward: SavedReward | null): string => {
  if (savedReward?.type === "flat_bonus") {
    return savedReward.amount ? `Flat $${savedReward.amount} bonus` : "Flat $X bonus"
  }
  if (savedReward?.type === "upgrade_tier") {
    return savedReward.tierName ? `Upgrade to (${savedReward.tierName})` : "Upgrade Commission Tier"
  }
  return "Reward with *"
}

export const getCurrentRewardLabel = (
  rewardType: RewardType,
  rewardAmount: string,
  selectedTierName: string,
  savedReward: SavedReward | null
): string => {
  if (rewardType === "flat_bonus") {
    return rewardAmount ? `Flat $${rewardAmount} bonus` : "Flat $X bonus"
  }
  if (rewardType === "upgrade_tier") {
    return selectedTierName ? `Upgrade to (${selectedTierName})` : "Upgrade Commission Tier"
  }
  return getRewardTriggerLabel(savedReward)
}
