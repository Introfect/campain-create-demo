import { RewardDialogHeader } from "./RewardDialogHeader";
import { MainRewardView } from "./MainRewardView";
import { TierSelectionView } from "./TierSelectionView";
import type { ModalView } from "@/lib/types";

interface RewardSystemContentProps {
  modalView: ModalView;
}

export const RewardSystemContent = ({
  modalView,
}: RewardSystemContentProps) => {
  return (
    <>
      <RewardDialogHeader modalView={modalView} />
      {modalView === "main" && <MainRewardView />}
      {modalView === "tier_selection" && <TierSelectionView />}
    </>
  );
};
