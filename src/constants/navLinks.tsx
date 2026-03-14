import { ApplicationsIcon } from "@/components/svg/Applications";
import { PaymentIcon } from "@/components/svg/Payment";
import { BrainIcon, BriefcaseIcon, HomeIcon } from "lucide-react";

export const navItems = [
    {
        path: '/home',
        icon: <HomeIcon className="size-5" />,
        label: 'Home',
    },
    {
        path: '/insights',
        icon: <BrainIcon className="size-5" />,
        label: 'Insights',
    },
    {
        path: '/gamification',
        icon: <BriefcaseIcon className="size-5" />,
        label: 'Gamification',
    },
    {
        path: '/applications',
        icon: <ApplicationsIcon className="size-5" />,
        label: 'Applications',
    },
    {
        path: '/payments',
        icon: <PaymentIcon className="size-5" />,
        label: 'Payments',
    },
]