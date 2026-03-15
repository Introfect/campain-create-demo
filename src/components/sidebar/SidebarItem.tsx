import { cn } from "@/lib/utils";
import type { ElementType } from "react";
import { Link, useLocation } from "react-router-dom";

export function SidebarItem({
  item,
}: {
  item: { path: string; icon: ElementType; label: string };
}) {
  const Icon = item.icon;
  const location = useLocation();
  const isActive = location.pathname === item.path;
  return (
    <Link
      key={item.path}
      className={cn(
        "flex hover:bg-sidebar-accent/80 transition-colors duration-200 font-medium text-sm rounded-[10px] items-center gap-2 p-2",
        isActive ? "bg-sidebar-accent" : undefined,
      )}
      to={item.path}
    >
      <Icon className="size-5" isActive={isActive} />
      <span
        className={cn(
          "text-secondary-foreground",
          isActive ? "text-primary" : undefined,
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}
