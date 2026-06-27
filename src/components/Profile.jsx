import { useState, useEffect } from "react"

export default function Profile({ username }) {

  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(null)

  // api fetch and error handling / loading...
  useEffect(() => {
    async function fetchUser() {
      setloading(true)
      seterror(null)

      try {
        const res = await fetch(`https://api.github.com/users/${username}`)

        if (!res.ok) {
          throw new Error("User Not Found")
        }

        const data = await res.json()
        setuser(data)
      }
      catch (err) {
        seterror(err.message)
      }
      finally {
        setloading(false)
      }

    }
    fetchUser()

  }, [username])

  // loading screen
  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        {/* Skeleton avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
        {/* Skeleton lines */}
        <div className="w-40 h-4 rounded bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
        <div className="w-64 h-3 rounded bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
      </div>
    </div>
  );

  // error screen
  if (error) return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <p className="text-5xl mb-4">❌</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{error}</p>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">Check the username and try again</p>
      </div>
    </div>
  );

  const joinYear = new Date(user.created_at).getFullYear();
  const yearsActive = new Date().getFullYear() - joinYear;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

        {/* avatar */}
        <img
          src={user.avatar_url}
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-gray-200 dark:border-slate-700"
        />
          {/* user name */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {user.name || user.login}
          </h2>
          
          {/* userlogin */}
          <p className="text-blue-600 dark:text-indigo-600 font-medium">
            @{user.login}
          </p>

          {/* bio */}
          {user.bio && (
            <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm leading-relaxed max-w-md">
              {user.bio}
            </p>
          )}

          {/* location */}
          <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
            {user.location && (
              <span className="text-xs text-gray-500 dark:text-slate-400">
                📍 {user.location}
              </span>
            )}
          </div>

        </div>

      </div>

      {/* cards follower, following, public repo , year ative */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Followers", value: user.followers, icon: "⭐" },
          { label: "Following", value: user.following, icon: "👥" },
          { label: "Public Repos", value: user.public_repos, icon: "📦" },
          { label: "Years Active", value: yearsActive + "y", icon: "⏱️" },
        ].map((stat) => {
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          )

        })

        }

      </div>

    </div>
  )
}