import { SidebarItem } from "./SidebarItem"
import { navItems } from "@/constants/navLinks"

export function AppSidebar() {

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