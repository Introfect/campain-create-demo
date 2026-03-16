import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import { setDialogOpen } from "@/store/slices/gamificationSlice";
import { RewardSystemContent } from "./RewardSystemContent";
import { MobileRewardHeader } from "./MobileRewardHeader";
import { MobileRewardFooter } from "./MobileRewardFooter";
import { RewardEventDropdown } from "./RewardEventDropdown";
import { RewardTypeDropdown } from "./RewardTypeDropdown";
import { TimeBoundField } from "./TimeBoundField";

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
        className="rounded-t-2xl p-4 h-[70vh] overflow-hidden flex flex-col md:overflow-y-auto"
      >
        {/* Mobile Layout - sticky header/footer with scrollable content */}
        <div className="md:hidden flex flex-col h-full">
          <MobileRewardHeader modalView={modalView} />
          <div className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-col gap-4">
              <RewardEventDropdown />
              <RewardTypeDropdown />
              <TimeBoundField />
            </div>
          </div>
          <MobileRewardFooter />
        </div>

        {/* Desktop Layout - normal flow */}
        <div className="hidden md:block">
          <RewardSystemContent modalView={modalView} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
