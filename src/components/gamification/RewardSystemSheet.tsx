import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import { setDialogOpen } from "@/store/slices/gamificationSlice";
import { RewardSystemContent } from "./RewardSystemContent";

export const RewardSystemSheet = () => {
  const dispatch = useAppDispatch();
  const dialogOpen = useAppSelector(
    (state: RootState) => state.gamification.dialogOpen,
  );
  const modalView = useAppSelector(
    (state: RootState) => state.gamification.modalView,
  );

  return (
    <Sheet
      open={dialogOpen}
      onOpenChange={(open) => dispatch(setDialogOpen(open))}
    >
      <SheetTrigger asChild>
        <div className="w-full px-5.5">
          <Button variant="default" className="w-full mx-auto">
            Enable Gamification
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-6 h-[70vh] overflow-y-auto"
      >
        <RewardSystemContent modalView={modalView} />
      </SheetContent>
    </Sheet>
  );
};
