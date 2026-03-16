import { DialogTitle } from "@/components/ui/dialog";
import type { ModalView } from "@/lib/types";

const TITLE_MAP: Record<ModalView, string> = {
  main: "Create your reward system",
  tier_selection: "Select a commission tier",
};

interface MobileRewardHeaderProps {
  modalView: ModalView;
}

export const MobileRewardHeader = ({ modalView }: MobileRewardHeaderProps) => (
  <div className="sticky top-0 bg-background z-10 pb-4 border-b">
    <DialogTitle className="text-xl font-medium leading-[140%] text-secondary">
      {TITLE_MAP[modalView]}
    </DialogTitle>
  </div>
);
