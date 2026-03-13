const Gamification = () => {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Gamification</h1>
        <p className="text-gray-500 mt-1">Overview of rewards, badges, and leaderboards</p>
      </header>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Stats row */}
        <div className="rounded-xl border p-6">
          <p className="text-sm text-gray-500">Total Points</p>
          <p className="text-2xl font-bold mt-1">—</p>
        </div>
        <div className="rounded-xl border p-6">
          <p className="text-sm text-gray-500">Badges Earned</p>
          <p className="text-2xl font-bold mt-1">—</p>
        </div>
        <div className="rounded-xl border p-6">
          <p className="text-sm text-gray-500">Leaderboard Rank</p>
          <p className="text-2xl font-bold mt-1">—</p>
        </div>

        {/* Main content area */}
        <div className="col-span-full rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
          <div className="h-48 flex items-center justify-center text-gray-400">
            Leaderboard content goes here
          </div>
        </div>

        {/* Badges */}
        <div className="col-span-full md:col-span-2 rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="h-32 flex items-center justify-center text-gray-400">
            Badges content goes here
          </div>
        </div>

        {/* Rewards */}
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Rewards</h2>
          <div className="h-32 flex items-center justify-center text-gray-400">
            Rewards content goes here
          </div>
        </div>
      </main>
    </div>
  )
}

export default Gamification
