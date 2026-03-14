
import { AppSidebar } from "@/components/sidebar/AppSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/sidebar-wrapper flex min-h-svh w-full">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto bg-red-200">
        {children}
      </main>
    </div >
  )
}
