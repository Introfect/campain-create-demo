import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/sidebar-wrapper flex h-svh w-full">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-y-auto max-w-240 mx-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
