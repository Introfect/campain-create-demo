import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/gamification', label: 'Gamification', icon: '🏆' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
]

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r bg-white flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b">
          <span className="text-lg font-bold tracking-tight">Campaign Creator</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t text-xs text-gray-400">v0.1.0</div>
      </aside>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
