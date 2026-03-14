import { Link, useLocation } from "react-router-dom"
import { BriefcaseIcon } from "../svg/Briefcase"
import { HomeIcon } from "../svg/Home"
import { ApplicationsIcon } from "../svg/Applications"
import { BrainIcon } from "../svg/Brain"
import { PaymentIcon } from "../svg/Payment"
import { SidebarItem } from "./SidebarItem"

export function AppSidebar() {
    const navItems = [
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
    return (
        <div className="h-screen font-plus-jakarta-sans bg-sidebar p-4">
            <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                    return (
                        <SidebarItem key={item.path} item={item} />
                    )
                })}
            </div>
        </div>
    )
}