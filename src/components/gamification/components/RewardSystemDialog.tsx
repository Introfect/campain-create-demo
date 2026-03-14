import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector, type RootState } from "@/store"
import { setDialogOpen } from "@/store/slices/gamificationSlice"
import { MainRewardView } from "./MainRewardView"
import { RewardDialogHeader } from "./RewardDialogHeader"
import { TierSelectionView } from "./TierSelectionView"

export const RewardSystemDialog = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector((state: RootState) => state.gamification.dialogOpen)
    const modalView = useAppSelector((state: RootState) => state.gamification.modalView)

    return (
        <Dialog open={dialogOpen} onOpenChange={(open) => dispatch(setDialogOpen(open))}>
            <DialogTrigger asChild>
                <div className="w-full px-5.5">
                    <Button variant="default" className="w-full mx-auto">
                        Enable Gamification
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="p-6 gap-4">
                <RewardDialogHeader modalView={modalView} />
                {modalView === "main" && <MainRewardView />}
                {modalView === "tier_selection" && <TierSelectionView />}
            </DialogContent>
        </Dialog>
    )
}
