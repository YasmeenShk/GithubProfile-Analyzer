import { useState, useEffect } from "react";

export default function StatsCard({ username }) {

    const [stats, setstats] = useState(null)
    const [loading, setloading] = useState(true) //data fetching true

    useEffect(() => {
        async function fetchRepos() {
            setloading(true)

            try {
                const res = await fetch(
                    `https://api.github.com/users/${username}/repos?per_page=100`
                );

                const repos = await res.json();

                // total stars sum using reduce 
                const totalStar = repos.reduce((sum, repo) => {
                    return sum + repo.stargazers_count;
                }, 0);

                //total forks 
                const totalForks = repos.reduce(
                    (sum, repo) => sum + repo.forks_count,
                    0
                );

                //lang count
                const langCount = {};
                repos.forEach((repo) => {
                    if (repo.language) {
                        langCount[repo.language] = (langCount[repo.language] || 0) + 1; //if undefine/null = 0 
                    }
                });
                // top language
                let topLang = "";
                let max = 0;

                for (let lang in langCount) {
                    if (langCount[lang] > max) { //check lang count like 5>0
                        max = langCount[lang]; // max = 5
                        topLang = lang;
                    }
                }

                //recent push date 
                const lastPush = repos
                    .map((repo) => new Date(repo.pushed_at))
                    .sort((a, b) => b - a)[0] //latest to oldest sort

                //last active date
                const lastActive = lastPush
                    ? lastPush.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })
                    : "N/A"

                setstats({ totalStar, totalForks, topLang, lastActive })
            }
            catch (err) {
                console.error("Repos fetch failed:", err)
            }
            finally {
                setloading(false)
            }

        }

        if (username) fetchRepos();
    }, [username]);

    //totalstar , totalforks , toplanguage, last active date card
    const cards = [
        { icon: "⭐", label: "Total Stars", value: stats?.totalStar ?? "-", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950", border: "border-yellow-100 dark:border-yellow-900" },
        { icon: "🍴", label: "Total Forks", value: stats?.totalForks ?? "-", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950", border: "border-blue-100 dark:border-blue-900" },
        { icon: "🧠", label: "Top Language", value: stats?.topLang ?? "-", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950", border: "border-purple-100 dark:border-purple-900" },
        { icon: "⏱️", label: "Last Active", value: stats?.lastActive ?? "-", color: "text-green-500", bg: "bg-green-50 dark:bg-green-950", border: "border-green-100 dark:border-green-900" },
    ];

    return (
        <div className="max-w-3xl mx-auto px-6 pb-6">
            <div className=" text-base font-semibold text-gray-400 dark:text-slate-500 mb-6">
                <h3>
                    Quick Stats</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className={`rounded-xl border p-4 text-center transition-shadow hover:shadow-md ${card.bg} ${card.border}`}
                    >
                        {/* Loading skeleton */}
                        {loading ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
                                <div className="w-16 h-4 rounded bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
                                <div className="w-12 h-3 rounded bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <p className={`text-2xl mb-2 ${card.color}`}>{card.icon}</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {card.value}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                    {card.label}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}