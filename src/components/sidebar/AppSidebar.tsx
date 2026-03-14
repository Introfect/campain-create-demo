import { logoUrl } from "@/constants/common"
import { SidebarItem } from "./SidebarItem"
import { navItems } from "@/constants/navLinks"

export function AppSidebar() {

    return (
        <div className="h-screen w-47 font-plus-jakarta-sans bg-sidebar p-4">
            <img src={logoUrl} alt="logo" className="w-full" />
            <div className="flex mt-6 flex-col gap-1">
                {navItems.map((item) => {
                    return (
                        <SidebarItem key={item.path} item={item} />
                    )
                })}
            </div>
        </div>
    )
}