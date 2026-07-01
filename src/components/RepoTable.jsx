import { useState } from "react";

export default function RepoTable() {
    const [searchRepo, setsearchRepo] = useState("")
    const [langFilter, setlangFilter] = useState("All Languages")

    const repos = [
        {
            name: "aircontrol",
            desc: "Hand gesture mouse controller using MediaPipe and OpenCV",
            lang: "Python",
            date: "Updated 28 May 2026",
            stars: 210,
            forks: 47,
        },
        {
            name: "github-analyzer",
            desc: "Analyze any GitHub profile with stats, charts and repo insights",
            lang: "JavaScript",
            date: "Updated 15 Jun 2026",
            stars: 142,
            forks: 23,
        },
        {
            name: "studyai-chatbot",
            desc: "AI powered exam prep chatbot built with React and Groq API",
            lang: "JavaScript",
            date: "Updated 10 Jun 2026",
            stars: 89,
            forks: 11,
        },
        {
            name: "react-quiz-app",
            desc: "QuizCraft — interactive quiz platform with score tracking",
            lang: "JavaScript",
            date: "Updated 12 May 2026",
            stars: 73,
            forks: 14,
        },
        {
            name: "portfolio-v2",
            desc: "Personal portfolio website with dark mode and animations",
            lang: "CSS",
            date: "Updated 20 May 2026",
            stars: 56,
            forks: 8,
        },
    ];

    const filteredRepo = repos.filter((repo) => (
        repo.name.toLocaleLowerCase().includes(searchRepo.toLocaleLowerCase())
    ))


    // language badge color
    const langColors = {
        Python: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        JavaScript: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
        CSS: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
        Java: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
        HTML: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    };

    return (
        <div className="max-w-3xl mx-auto px-6 pb-12">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Repositories ({repos.length})
            </h3>

            <div className="flex flex-col gap-3 mb-5">
                {/* search bar */}
                <input
                    value={searchRepo}
                    onChange={(e) => setsearchRepo(e.target.value)}
                    type="text"
                    placeholder="Search Repos..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-slate-500 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 transition-all"
                />

                <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 transition-all">
                    <option>All Languages</option>
                    <option>JavaScript</option>
                    <option>Python</option>
                    <option>HTML</option>
                    <option>CSS</option>
                </select>

                <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 transition-all">
                    <option value="">Sort by Stars</option>
                    <option value="">Sort by Forks</option>
                    <option value="">Sort by Updated</option>
                </select>
            </div>

            {/* repo cards */}
            <div className="flex flex-col gap-3">
                {filteredRepo.map((repo) => (
                    <div
                        key={repo.name}
                        className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            {/* left- name, description, badge+date */}
                            <div className="min-w-0">

                                <a href=""
                                    className="font-semibold text-blue-600 dark:text-indigo-400 hover:underline text-sm"
                                >
                                    {repo.name}
                                </a>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                    {repo.desc}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${langColors[repo.lang] || "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {repo.lang}
                                    </span>
                                    <span className="text-xs text-gray-400 dark:text-slate-500">
                                        {repo.date}
                                    </span>
                                </div>
                            </div>

                            {/* right - stars + forks */}
                            <div className="flex items-center gap-3 shrink-0 text-xs text-gray-500 dark:text-slate-400">
                                <span className="flex items-center gap-1">⭐ {repo.stars}</span>
                                <span className="flex items-center gap-1">🍴 {repo.forks}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}