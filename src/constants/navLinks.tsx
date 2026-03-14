import { ApplicationsIcon } from "@/components/svg/Applications";
import { PaymentIcon } from "@/components/svg/Payment";
import { BrainIcon } from "@/components/svg/Brain";
import { BriefcaseIcon } from "@/components/svg/Briefcase";
import { HomeIcon } from "@/components/svg/Home";

export const navItems = [
    {
        path: '/home',
        icon: HomeIcon,
        label: 'Home',
    },
    {
        path: '/insights',
        icon: BrainIcon,
        label: 'Insights',
    },
    {
        path: '/gamification',
        icon: BriefcaseIcon,
        label: 'Gamification',
    },
    {
        path: '/applications',
        icon: ApplicationsIcon,
        label: 'Applications',
    },
    {
        path: '/payments',
        icon: PaymentIcon,
        label: 'Payments',
    },
]