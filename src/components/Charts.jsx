import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Har language ka ek color
const COLORS = [
  "#2563EB", "#7C3AED", "#059669", "#D97706",
  "#DC2626", "#0891B2", "#DB2777", "#65A30D"
]

export default function Charts({ username }) {

  const [langData, setLangData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        )
        const repos = await res.json()

        // Language count 
        const langCount = {}
        repos.forEach((repo) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1
          }
        })

        // Recharts format: [{ name, value }]
        const formatted = Object.entries(langCount)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)  // descending sort
          .slice(0, 6)  // top 6 languages

        setLangData(formatted)
      } catch (err) {
        console.error("Chart fetch failed:", err)
      } finally {
        setLoading(false)
      }
    }

    if (username) fetchRepos()
  }, [username])

  // Loading state
  if (loading) return (
    <div className="max-w-3xl mx-auto px-6 pb-6">
      <div className="w-40 h-4 rounded bg-gray-200 dark:bg-slate-700 animate-pulse mb-4"></div>
      <div className="w-full h-64 rounded-xl bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
    </div>
  )

  // if no language 
  if (langData.length === 0) return (
    <div className="max-w-3xl mx-auto px-6 pb-6">
      <p className="text-gray-400 dark:text-slate-500 text-sm">No language data found 😴</p>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-6 pb-8">

      {/* Section heading */}
      <h3 className="text-sm font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
        Language Distribution
      </h3>

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">

        {/* ResponsiveContainer = chart apne aap resize ho jaata hai */}
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={langData}
              cx="50%"          // center x
              cy="50%"          // center y
              innerRadius={60}  // donut hole size
              outerRadius={100} // chart size
              paddingAngle={3}  // gap between slices
              dataKey="value"
            >
             
              {langData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* Hover tooltip */}
            <Tooltip
              formatter={(value, name) => [`${value} repos`, name]}
              contentStyle={{
                background: "var(--tooltip-bg, #fff)",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "13px"
              }}
            />

            {/* Legend — color + name */}
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ fontSize: "12px", color: "inherit" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
}