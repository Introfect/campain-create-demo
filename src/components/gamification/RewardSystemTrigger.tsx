import { useIsMobile } from "@/hooks/use-mobile";
import { RewardSystemDialog } from "./RewardSystemDialog";
import { RewardSystemSheet } from "./RewardSystemSheet";

export const RewardSystemTrigger = () => {
  const isMobile = useIsMobile();

  // Render Sheet on mobile, Dialog on desktop/tablet
  return isMobile ? <RewardSystemSheet /> : <RewardSystemDialog />;
};
