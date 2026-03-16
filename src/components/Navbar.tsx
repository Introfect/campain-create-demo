import { useGetPathName } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const location = useLocation();

  const pathName = useGetPathName({ path: location.pathname });

  return (
    <header className="flex items-center py-5 justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu - only visible below md breakpoint */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-1/2 "
            bottomClassName="hidden"
          >
            <AppSidebar />
          </SheetContent>
        </Sheet>
        <p className="text-lg text-secondary leading-[140%] font-semibold">
          {pathName}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src="/Notification.svg"
          alt="user"
          className="size-8 cursor-pointer"
        />
        <img
          src="/profile.jpg"
          alt="user"
          className="size-8 rounded-full cursor-pointer object-cover bg-primary"
        />
      </div>
    </header>
  );
}
