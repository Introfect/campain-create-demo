import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDialogOpen } from "@/store/slices/gamificationSlice";
import { selectIsCreateRewardEnabled } from "@/store/selectors/gamificationSelectors";
import { RewardEventDropdown } from "./RewardEventDropdown";
import { RewardTypeDropdown } from "./RewardTypeDropdown";
import { TimeBoundField } from "./TimeBoundField";
import { TooltipButton } from "./shared/TooltipButton";
import { getValidationMessage } from "./utils/validationMessages";
import { toast } from "sonner";

export const MainRewardView = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const isCreateRewardEnabled = useAppSelector(selectIsCreateRewardEnabled);
  const validationMessage = getValidationMessage(state, "create");

  return (
    <div className="flex flex-col gap-4 md:gap-0 justify-between h-full md:h-auto ">
      <div className="flex flex-col gap-4">
        <RewardEventDropdown />
        <RewardTypeDropdown />
        <TimeBoundField />
      </div>

      <div className="flex  items-center justify-end gap-2 pt-6">
        <Button
          className="w-1/2 py-2 text-base leading-[140%] font-inter"
          type="button"
          variant="outline"
          onClick={() => dispatch(setDialogOpen(false))}
        >
          Cancel
        </Button>
        <TooltipButton
          className="w-1/2 text-base leading-[140%] font-inter"
          type="button"
          variant="default"
          disabled={!isCreateRewardEnabled}
          tooltipMessage={validationMessage}
          onClick={() => {
            toast.success("Reward created");
            dispatch(setDialogOpen(false));
          }}
        >
          Create Reward
        </TooltipButton>
      </div>
    </div>
  );
};
