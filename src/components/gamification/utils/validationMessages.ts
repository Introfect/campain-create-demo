import type { RootState } from "@/store";

type ValidationContext = "create" | "event" | "reward" | "tier";

export function getValidationMessage(
  state: RootState,
  context: ValidationContext,
): string | null {
  const { rewardEvent, rewardType, tierSelection } =
    state.gamification;

  if (context === "create") {
    return getCreateRewardValidationMessage(state);
  }

  if (context === "event") {
    return getEventSaveValidationMessage(rewardEvent);
  }

  if (context === "reward") {
    return getRewardSaveValidationMessage(rewardType);
  }

  if (context === "tier") {
    return getTierSaveValidationMessage(tierSelection);
  }

  return null;
}

function getCreateRewardValidationMessage(state: RootState): string | null {
  const { rewardEvent, rewardType, timeBound } = state.gamification;
  const { savedEvent } = rewardEvent;
  const { savedReward } = rewardType;

  const missingParts: string[] = [];

  // Check saved event
  if (!savedEvent || !savedEvent.type) {
    missingParts.push("a reward trigger");
  } else {
    // Validate saved event based on type
    if (savedEvent.type === "cross_sales") {
      if (!savedEvent.amount || savedEvent.amount.trim() === "") {
        missingParts.push("an amount for the sales trigger");
      }
    } else if (savedEvent.type === "post_times") {
      if (
        !savedEvent.postTimes ||
        savedEvent.postTimes.trim() === "" ||
        !savedEvent.postPeriod
      ) {
        missingParts.push("the number of posts and time period");
      }
    }
  }

  // Check saved reward
  if (!savedReward || !savedReward.type) {
    missingParts.push("a reward");
  } else {
    // Validate saved reward based on type
    if (savedReward.type === "flat_bonus") {
      if (!savedReward.amount || savedReward.amount.trim() === "") {
        missingParts.push("a bonus amount");
      }
    } else if (savedReward.type === "upgrade_tier") {
      if (!savedReward.tierName || savedReward.tierName.trim() === "") {
        missingParts.push("a tier selection");
      }
    }
  }

  // Check time-bound
  if (timeBound.enabled && !timeBound.endDate) {
    missingParts.push("a reward end date");
  }

  if (missingParts.length === 0) {
    return null;
  }

  // Specific message overrides for exact copy
  if (missingParts.length > 0) {
    // Single missing part cases
    if (missingParts.length === 1) {
      if (missingParts[0] === "a reward end date") {
        return "Choose reward end date to continue";
      }
      if (missingParts[0] === "an amount for the sales trigger") {
        return "Enter the sales target amount to continue";
      }
      if (missingParts[0] === "a bonus amount") {
        return "Enter the bonus amount to continue";
      }
    }

    // Two missing parts: trigger + reward type
    if (
      missingParts.length === 2 &&
      missingParts[0] === "a Reward Trigger" &&
      missingParts[1] === "a reward type"
    ) {
      return "Choose a reward trigger and a reward to continue";
    }
  }

  // Format the message (fallback for other cases)
  if (missingParts.length === 1) {
    const part = missingParts[0];
    if (part.startsWith("a ") || part.startsWith("an ")) {
      return `Choose ${part} to continue`;
    }
    return `Enter ${part} to continue`;
  }

  // Multiple missing parts
  const lastPart = missingParts.pop();
  const firstParts = missingParts.join(", ");
  return `Choose ${firstParts} and ${lastPart} to continue`;
}

function getEventSaveValidationMessage(
  rewardEvent: RootState["gamification"]["rewardEvent"],
): string | null {
  const { type, amount, postTimes, postPeriod } = rewardEvent;

  if (!type) {
    return "Select a reward trigger option";
  }

  if (type === "cross_sales") {
    if (!amount || amount.trim() === "") {
      return "Enter the sales target amount to continue";
    }
  }

  if (type === "post_times") {
    const missingParts: string[] = [];

    if (!postTimes || postTimes.trim() === "") {
      missingParts.push("number of posts");
    }

    if (!postPeriod) {
      missingParts.push("time period");
    }

    if (missingParts.length > 0) {
      if (missingParts.length === 1) {
        return `Select the ${missingParts[0]}`;
      }
      return `Select the ${missingParts.join(" and ")} to continue`;
    }
  }

  return null;
}

function getRewardSaveValidationMessage(
  rewardType: RootState["gamification"]["rewardType"],
): string | null {
  const { type, amount } = rewardType;

  if (!type) {
    return "Select a reward type option";
  }

  if (type === "flat_bonus") {
    if (!amount || amount.trim() === "") {
      return "Enter a bonus amount to continue";
    }
  }

  // upgrade_tier auto-saves, so this shouldn't be reached
  return null;
}

function getTierSaveValidationMessage(
  tierSelection: RootState["gamification"]["tierSelection"],
): string | null {
  const { selectedTierName } = tierSelection;

  if (!selectedTierName || selectedTierName.trim() === "") {
    return "Select a tier to upgrade to";
  }

  return null;
}
