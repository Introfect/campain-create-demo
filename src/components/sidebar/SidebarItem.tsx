import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function SidebarItem({ item }: { item: { path: string, icon: React.ReactNode, label: string } }) {
    const location = useLocation()
    const isActive = location.pathname === item.path;
    return (
        <Link key={item.path} className={cn("flex  font-medium text-sm rounded-[10px] items-center gap-2 p-2", isActive ? "bg-sidebar-accent" : undefined)} to={item.path}>
            {item.icon}
            <span className={cn("text-secondary-foreground", isActive ? "text-primary" : undefined)}>{item.label}</span>
        </Link>
    )
}