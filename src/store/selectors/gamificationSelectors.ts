import type { RootState } from '@/store'
import type {
  ValidatedRewardEvent,
  ValidatedRewardWith,
} from '@/lib/types'

function isValidatedEvent(
  savedEvent: RootState['gamification']['rewardEvent']['savedEvent']
): savedEvent is ValidatedRewardEvent {
  if (!savedEvent || !savedEvent.type) return false

  switch (savedEvent.type) {
    case 'cross_sales':
      return !!savedEvent.amount && savedEvent.amount.trim() !== ''
    case 'post_times':
      return (
        !!savedEvent.postTimes &&
        savedEvent.postTimes.trim() !== '' &&
        !!savedEvent.postPeriod
      )
    case 'is_onboarded':
      return true
    default:
      return false
  }
}

function isValidatedReward(
  savedReward: RootState['gamification']['rewardType']['savedReward']
): savedReward is ValidatedRewardWith {
  if (!savedReward || !savedReward.type) return false

  switch (savedReward.type) {
    case 'flat_bonus':
      return !!savedReward.amount && savedReward.amount.trim() !== ''
    case 'upgrade_tier':
      return !!savedReward.tierName && savedReward.tierName.trim() !== ''
    default:
      return false
  }
}

export const selectIsEventSaveEnabled = (state: RootState): boolean => {
  const { type, amount, postTimes, postPeriod } = state.gamification.rewardEvent

  if (type === 'cross_sales') {
    return amount.trim() !== ''
  }

  if (type === 'post_times') {
    return postTimes.trim() !== '' && postPeriod !== null
  }

  return false
}

export const selectIsRewardSaveEnabled = (state: RootState): boolean => {
  const { type, amount } = state.gamification.rewardType

  if (type === 'flat_bonus') {
    return amount.trim() !== ''
  }

  return false
}

export const selectIsTierSaveEnabled = (state: RootState): boolean => {
  const { selectedTierName } = state.gamification.tierSelection
  return selectedTierName.trim() !== ''
}

export const selectIsCreateRewardEnabled = (state: RootState): boolean => {
  const { savedEvent } = state.gamification.rewardEvent
  const { savedReward } = state.gamification.rewardType
  const { enabled, endDate } = state.gamification.timeBound

  if (!isValidatedEvent(savedEvent)) {
    return false
  }

  if (!isValidatedReward(savedReward)) {
    return false
  }

  if (enabled && !endDate) {
    return false
  }

  return true
}
