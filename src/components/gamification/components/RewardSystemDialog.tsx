import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RewardEventDropdown } from "./RewardEventDropdown"
import { RewardTypeDropdown } from "./RewardTypeDropdown"
import { TierSelectionView } from "./TierSelectionView"
import { TimeBoundField } from "./TimeBoundField"
import { useAppDispatch, useAppSelector, type RootState } from "@/store"
import { setDialogOpen } from "@/store/slices/gamificationSlice"

export const RewardSystemDialog = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector((state: RootState) => state.gamification.dialogOpen)
    const modalView = useAppSelector((state: RootState) => state.gamification.modalView)

    const handleDialogOpenChange = (open: boolean) => {
        dispatch(setDialogOpen(open))
    }

    const handleCreateReward = () => {
        // TODO: Handle reward creation logic
        // For now, just close the dialog
        dispatch(setDialogOpen(false))
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default">Enable Gamification</Button>
            </DialogTrigger>
            <DialogContent className="p-6 gap-4">
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium leading-[140%] text-secondary">
                        {modalView === "main" ? "Create your reward system" : "Select a commission tier"}
                    </DialogTitle>
                </DialogHeader>

                {modalView === "main" && (
                    <div className="flex flex-col gap-4">
                        <RewardEventDropdown />
                        <RewardTypeDropdown />
                        <TimeBoundField />

                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => dispatch(setDialogOpen(false))}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant="default"
                                onClick={handleCreateReward}
                            >
                                Create Reward
                            </Button>
                        </div>
                    </div>
                )}

                {modalView === "tier_selection" && <TierSelectionView />}
            </DialogContent>
        </Dialog>
    )
}
