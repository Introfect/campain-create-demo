import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDialogOpen } from "@/store/slices/gamificationSlice";
import { selectIsCreateRewardEnabled } from "@/store/selectors/gamificationSelectors";
import { TooltipButton } from "./shared/TooltipButton";
import { getValidationMessage } from "./utils/validationMessages";
import { toast } from "sonner";

export const MobileRewardFooter = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const isCreateRewardEnabled = useAppSelector(selectIsCreateRewardEnabled);
  const validationMessage = getValidationMessage(state, "create");

  return (
    <div className="sticky bottom-0 bg-background z-10 pt-4 border-t">
      <div className="flex items-center justify-end gap-2">
        <Button
          className="w-1/2"
          type="button"
          variant="outline"
          onClick={() => dispatch(setDialogOpen(false))}
        >
          Cancel
        </Button>
        <TooltipButton
          className="w-1/2"
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
