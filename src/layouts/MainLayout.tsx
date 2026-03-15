import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh w-full">
      {/* Desktop/Tablet Sidebar - hidden on mobile */}
      <aside className="hidden md:block h-screen w-47">
        <AppSidebar />
      </aside>

      <main className="flex-1 px-4 xl:px-0 flex flex-col overflow-y-auto md:max-w-240 mx-auto w-full">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
