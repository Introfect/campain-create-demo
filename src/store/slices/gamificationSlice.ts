import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RewardEventType, PeriodType, RewardType, ModalView, SavedEvent, SavedReward } from '@/lib/types'

interface GamificationState {
  // Dialog state
  dialogOpen: boolean
  modalView: ModalView

  // Reward Event state
  rewardEvent: {
    type: RewardEventType
    amount: string
    postTimes: string
    postPeriod: PeriodType
    isOpen: boolean
    isInputExpanded: boolean
    periodDropdownOpen: boolean
    focusedPeriodIndex: number
    focusedOptionIndex: number
    savedEvent: SavedEvent | null
  }

  // Reward Type state
  rewardType: {
    type: RewardType
    amount: string
    isOpen: boolean
    isInputExpanded: boolean
    focusedOptionIndex: number
    savedReward: SavedReward | null
  }

  // Tier Selection state
  tierSelection: {
    selectedTierName: string
    isOpen: boolean
    focusedIndex: number
  }

  // Time-bound state
  timeBound: {
    enabled: boolean
    endDate: Date | null
  }
}

const initialState: GamificationState = {
  dialogOpen: false,
  modalView: 'main',

  rewardEvent: {
    type: null,
    amount: '',
    postTimes: '',
    postPeriod: null,
    isOpen: false,
    isInputExpanded: false,
    periodDropdownOpen: false,
    focusedPeriodIndex: 0,
    focusedOptionIndex: 0,
    savedEvent: null,
  },

  rewardType: {
    type: null,
    amount: '',
    isOpen: false,
    isInputExpanded: false,
    focusedOptionIndex: 0,
    savedReward: null,
  },

  tierSelection: {
    selectedTierName: '',
    isOpen: false,
    focusedIndex: 0,
  },

  timeBound: {
    enabled: false,
    endDate: null,
  },
}

export const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    // Dialog actions
    setDialogOpen: (state: GamificationState, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        // Reset all state when dialog closes
        return initialState
      }
      state.dialogOpen = action.payload
    },

    setModalView: (state: GamificationState, action: PayloadAction<ModalView>) => {
      state.modalView = action.payload
      if (action.payload === 'tier_selection') {
        state.tierSelection.isOpen = true
      }
    },

    // Reward Event actions
    setRewardEventType: (state: GamificationState, action: PayloadAction<RewardEventType>) => {
      state.rewardEvent.type = action.payload
      state.rewardEvent.isInputExpanded = true // Expand input fields when option is clicked

      // If "Is Onboarded" is selected, save immediately and close
      if (action.payload === 'is_onboarded') {
        state.rewardEvent.savedEvent = {
          type: action.payload,
          amount: '',
          postTimes: '',
          postPeriod: null,
        }
        state.rewardEvent.isOpen = false
        state.rewardEvent.isInputExpanded = false

        // Clear reward if incompatible
        if (state.rewardType.savedReward?.type === 'upgrade_tier') {
          state.rewardType.savedReward = null
          state.rewardType.type = null
          state.rewardType.amount = ''
        }
        return
      }

      // Clear incompatible fields
      if (action.payload !== 'cross_sales') {
        state.rewardEvent.amount = ''
      }
      if (action.payload !== 'post_times') {
        state.rewardEvent.postTimes = ''
        state.rewardEvent.postPeriod = null
      }

      // Clear reward if incompatible
      if (action.payload === 'post_times' &&
        state.rewardType.savedReward?.type === 'upgrade_tier') {
        state.rewardType.savedReward = null
        state.rewardType.type = null
        state.rewardType.amount = ''
      }
    },

    setRewardEventAmount: (state: GamificationState, action: PayloadAction<string>) => {
      state.rewardEvent.amount = action.payload
    },

    setRewardEventPostTimes: (state: GamificationState, action: PayloadAction<string>) => {
      state.rewardEvent.postTimes = action.payload
    },

    setRewardEventPostPeriod: (state: GamificationState, action: PayloadAction<PeriodType>) => {
      state.rewardEvent.postPeriod = action.payload
    },

    setRewardEventOpen: (state: GamificationState, action: PayloadAction<boolean>) => {
      // When closing dropdown
      if (!action.payload && state.rewardEvent.isOpen) {
        // Validate if current selection is complete
        const isComplete = 
          (state.rewardEvent.type === 'cross_sales' && state.rewardEvent.amount.trim() !== '') ||
          (state.rewardEvent.type === 'post_times' && state.rewardEvent.postTimes.trim() !== '' && state.rewardEvent.postPeriod !== null) ||
          state.rewardEvent.type === 'is_onboarded'
        
        // If incomplete, revert to saved state
        if (!isComplete) {
          const saved = state.rewardEvent.savedEvent
          state.rewardEvent.type = saved?.type || null
          state.rewardEvent.amount = saved?.amount || ''
          state.rewardEvent.postTimes = saved?.postTimes || ''
          state.rewardEvent.postPeriod = saved?.postPeriod || null
        }
        state.rewardEvent.isInputExpanded = false
      }
      
      state.rewardEvent.isOpen = action.payload
      // Collapse input fields when dropdown is opened
      if (action.payload) {
        state.rewardEvent.isInputExpanded = false
      }
    },

    setPeriodDropdownOpen: (state: GamificationState, action: PayloadAction<boolean>) => {
      state.rewardEvent.periodDropdownOpen = action.payload
    },

    setFocusedPeriodIndex: (state: GamificationState, action: PayloadAction<number>) => {
      state.rewardEvent.focusedPeriodIndex = action.payload
    },

    setFocusedEventOptionIndex: (state: GamificationState, action: PayloadAction<number>) => {
      state.rewardEvent.focusedOptionIndex = action.payload
    },

    saveRewardEvent: (state: GamificationState) => {
      state.rewardEvent.savedEvent = {
        type: state.rewardEvent.type,
        amount: state.rewardEvent.amount,
        postTimes: state.rewardEvent.postTimes,
        postPeriod: state.rewardEvent.postPeriod,
      }
      state.rewardEvent.isOpen = false
      state.rewardEvent.isInputExpanded = false
    },

    cancelRewardEvent: (state: GamificationState) => {
      const saved = state.rewardEvent.savedEvent
      state.rewardEvent.type = saved?.type || null
      state.rewardEvent.amount = saved?.amount || ''
      state.rewardEvent.postTimes = saved?.postTimes || ''
      state.rewardEvent.postPeriod = saved?.postPeriod || null
      state.rewardEvent.isOpen = false
      state.rewardEvent.isInputExpanded = false
    },

    // Reward Type actions
    setRewardTypeType: (state: GamificationState, action: PayloadAction<RewardType>) => {
      state.rewardType.type = action.payload
      state.rewardType.isInputExpanded = true // Expand input fields when option is clicked

      if (action.payload === 'flat_bonus') {
        // Keep dropdown open so the amount input field is visible and focused
        // Don't auto-save - user must click Save button
      } else if (action.payload === 'upgrade_tier') {
        state.rewardType.isOpen = false
        state.rewardType.isInputExpanded = false
        state.rewardType.savedReward = { type: action.payload }
        state.modalView = 'tier_selection'
        state.tierSelection.isOpen = true
      }

      // Clear amounts based on selection
      if (action.payload !== 'flat_bonus') {
        state.rewardType.amount = ''
      }
    },

    setRewardTypeAmount: (state: GamificationState, action: PayloadAction<string>) => {
      state.rewardType.amount = action.payload
      // Don't auto-save - user must click Save button
    },

    setRewardTypeOpen: (state: GamificationState, action: PayloadAction<boolean>) => {
      // When closing dropdown
      if (!action.payload && state.rewardType.isOpen) {
        // Validate if current selection is complete
        const isComplete = 
          state.rewardType.type === 'flat_bonus' && state.rewardType.amount.trim() !== ''
        
        // If incomplete, revert to saved state (but not for upgrade_tier which has its own flow)
        if (!isComplete && state.rewardType.type !== 'upgrade_tier') {
          const saved = state.rewardType.savedReward
          state.rewardType.type = saved?.type || null
          state.rewardType.amount = saved?.amount || ''
        }
        state.rewardType.isInputExpanded = false
      }
      
      state.rewardType.isOpen = action.payload
      // Collapse input fields when dropdown is opened
      if (action.payload) {
        state.rewardType.isInputExpanded = false
      }
    },

    setFocusedRewardOptionIndex: (state: GamificationState, action: PayloadAction<number>) => {
      state.rewardType.focusedOptionIndex = action.payload
    },

    saveRewardType: (state: GamificationState) => {
      state.rewardType.savedReward = {
        type: state.rewardType.type,
        amount: state.rewardType.amount,
      }
      state.rewardType.isOpen = false
      state.rewardType.isInputExpanded = false
    },

    cancelRewardType: (state: GamificationState) => {
      const saved = state.rewardType.savedReward
      state.rewardType.type = saved?.type || null
      state.rewardType.amount = saved?.amount || ''
      state.rewardType.isOpen = false
      state.rewardType.isInputExpanded = false
    },

    // Tier Selection actions
    setSelectedTierName: (state: GamificationState, action: PayloadAction<string>) => {
      state.tierSelection.selectedTierName = action.payload
      state.tierSelection.isOpen = false
    },

    setTierDropdownOpen: (state: GamificationState, action: PayloadAction<boolean>) => {
      state.tierSelection.isOpen = action.payload
    },

    setFocusedTierIndex: (state: GamificationState, action: PayloadAction<number>) => {
      state.tierSelection.focusedIndex = action.payload
    },

    saveTierSelection: (state: GamificationState) => {
      if (state.tierSelection.selectedTierName) {
        state.rewardType.savedReward = {
          type: 'upgrade_tier',
          tierName: state.tierSelection.selectedTierName
        }
      }
      state.modalView = 'main'
    },

    goBackFromTier: (state: GamificationState) => {
      // If no tier was saved previously, reset upgrade_tier selection
      if (!state.rewardType.savedReward?.tierName) {
        state.rewardType.type = null
        state.rewardType.savedReward = null
      }
      
      // Restore tier name from saved state
      state.tierSelection.selectedTierName = state.rewardType.savedReward?.tierName || ''
      state.modalView = 'main'
    },

    // Time-bound actions
    setTimeBoundEnabled: (state: GamificationState, action: PayloadAction<boolean>) => {
      state.timeBound.enabled = action.payload
      // Clear date when disabled
      if (!action.payload) {
        state.timeBound.endDate = null
      }
    },

    setTimeBoundEndDate: (state: GamificationState, action: PayloadAction<Date | null>) => {
      state.timeBound.endDate = action.payload
    },
  },
})

export const {
  setDialogOpen,
  setModalView,
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
  setRewardTypeType,
  setRewardTypeAmount,
  setRewardTypeOpen,
  setFocusedRewardOptionIndex,
  saveRewardType,
  cancelRewardType,
  setSelectedTierName,
  setTierDropdownOpen,
  setFocusedTierIndex,
  saveTierSelection,
  goBackFromTier,
  setTimeBoundEnabled,
  setTimeBoundEndDate,
} = gamificationSlice.actions

export default gamificationSlice.reducer
