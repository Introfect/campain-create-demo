import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import { setDialogOpen } from "@/store/slices/gamificationSlice";
import { RewardSystemContent } from "./RewardSystemContent";

export const RewardSystemDialog = () => {
  const dispatch = useAppDispatch();
  const dialogOpen = useAppSelector(
    (state: RootState) => state.gamification.dialogOpen,
  );
  const modalView = useAppSelector(
    (state: RootState) => state.gamification.modalView,
  );

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => dispatch(setDialogOpen(open))}
    >
      <DialogTrigger asChild>
        <div className="w-full">
          <Button variant="default" className="w-full mx-auto">
            Enable Gamification
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="border-none max-w-full p-6 gap-4 sm:max-w-[400px]">
        <RewardSystemContent modalView={modalView} />
      </DialogContent>
    </Dialog>
  );
};
