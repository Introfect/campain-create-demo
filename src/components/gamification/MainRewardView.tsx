import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDialogOpen } from "@/store/slices/gamificationSlice";
import { selectIsCreateRewardEnabled } from "@/store/selectors/gamificationSelectors";
import { RewardEventDropdown } from "./RewardEventDropdown";
import { RewardTypeDropdown } from "./RewardTypeDropdown";
import { TimeBoundField } from "./TimeBoundField";

export const MainRewardView = () => {
  const dispatch = useAppDispatch();
  const isCreateRewardEnabled = useAppSelector(selectIsCreateRewardEnabled);

  return (
    <div className="flex flex-col gap-4">
      <RewardEventDropdown />
      <RewardTypeDropdown />
      <TimeBoundField />

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button
          className="w-1/2"
          type="button"
          variant="outline"
          onClick={() => dispatch(setDialogOpen(false))}
        >
          Cancel
        </Button>
        <Button
          className="w-1/2"
          type="button"
          variant="default"
          disabled={!isCreateRewardEnabled}
          onClick={() => dispatch(setDialogOpen(false))}
        >
          Create Reward
        </Button>
      </div>
    </div>
  );
};
