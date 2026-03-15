import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { setDialogOpen } from "@/store/slices/gamificationSlice";
import { RewardEventDropdown } from "./RewardEventDropdown";
import { RewardTypeDropdown } from "./RewardTypeDropdown";
import { TimeBoundField } from "./TimeBoundField";

export const MainRewardView = () => {
  const dispatch = useAppDispatch();

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
          onClick={() => dispatch(setDialogOpen(false))}
        >
          Create Reward
        </Button>
      </div>
    </div>
  );
};
