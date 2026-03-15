import { logoUrl } from "@/constants/common";
import { SidebarItem } from "./SidebarItem";
import { navItems } from "@/constants/navLinks";
import ProfileIcon from "../svg/Profile";

export function AppSidebar() {
  return (
    <div className="h-full flex flex-col justify-between  w-full md:w-47 font-plus-jakarta-sans bg-sidebar p-4">
      <div>
        <img src={logoUrl} alt="logo" className="w-40 md:w-full mb-6" />
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            return <SidebarItem key={item.path} item={item} />;
          })}
        </div>
      </div>
      <SidebarItem
        item={{ path: "/profile", icon: ProfileIcon, label: "Profile" }}
      />
    </div>
  );
}
