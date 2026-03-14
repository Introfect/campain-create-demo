export type RewardEventType = "cross_sales" | "post_times" | "is_onboarded" | null
export type PeriodType = "14_days" | "1_month" | "2_months" | "3_months" | "1_year" | null
export type RewardType = "flat_bonus" | "upgrade_tier" | null
export type ModalView = "main" | "tier_selection"

export interface SavedEvent {
  type: RewardEventType
  amount?: string
  postTimes?: string
  postPeriod?: PeriodType
}

export interface SavedReward {
  type: RewardType
  amount?: string
  tierName?: string
}

export const PERIOD_OPTIONS = [
  { value: "14_days", label: "14 days" },
  { value: "1_month", label: "1 month" },
  { value: "2_months", label: "2 months" },
  { value: "3_months", label: "3 months" },
  { value: "1_year", label: "1 year" },
] as const

export const TIER_OPTIONS = [
  { value: "tier_1", label: "Tier 1" },
  { value: "tier_2", label: "Tier 2" },
  { value: "tier_3", label: "Tier 3" },
  { value: "tier_4", label: "Tier 4" },
  { value: "tier_5", label: "Tier 5" },
  { value: "tier_6", label: "Tier 6" },
] as const
