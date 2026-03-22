import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ModalView = "main" | "tier_selection";

const TITLE_MAP: Record<ModalView, string> = {
  main: "Create your reward system",
  tier_selection: "Select a commission tier",
};

interface RewardDialogHeaderProps {
  modalView: ModalView;
}

export const RewardDialogHeader = ({ modalView }: RewardDialogHeaderProps) => (
  <DialogHeader className="">
    <DialogTitle className="text-xl w-full font-medium leading-[140%] text-secondary">
      {TITLE_MAP[modalView]}
    </DialogTitle>
  </DialogHeader>
);
