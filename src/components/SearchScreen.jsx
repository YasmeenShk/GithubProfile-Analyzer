import { useState } from "react";
import searchIcon from "../assets/searchicon.svg";
import GithubIcon from "../assets/githublogo.svg";

function SearchScreen({onSearch, darkMode, setDarkMode}) {

    // const [darkMode, setdarkMode] = useState(false)
    const [username, setusername] = useState("")

    // search button ya enter press krne pe ye function chlta h 
    function handleSearch() {
        if (username.trim()) {
            onSearch(username.trim())    //send it to the parent
        }
    }

    return (
        <div className={darkMode ? "dark" : ""} >

            <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
                <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-500 flex items-center justify-between px-3 py-3 md:px-6 md:py-4">
                    {/*logo*/}
                    <div className="flex items-center gap-2 text-sm font-bold md:text-lg md:font-extrabold text-gray-900 dark:text-gray-100 ">
                        <span className=" w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-600 dark:bg-indigo-500 "></span>
                        GitInsight
                    </div>

                    {/* darkMode toggle*/}
                    <button onClick={() => setDarkMode(!darkMode)}
                        className="border border-grey-200 dark:border-slate-700 rounded-xl px-3 py-1 md:px-4 md:py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </nav>


                <main className="flex flex-col items-center justify-start pt-50 md:pt-0 md:justify-center min-h-[calc(100vh-65px)] px-4 md:px-6 text-center ">

                    <span className="inline-flex items-center gap-1.5 border border-blue-200 dark:border-indigo-800 rounded-full px-2 py-1 md:px-3 md:py-2 text-xs font-medium mb-3 md:mb-7 bg-blue-50 dark:bg-indigo-950 text-blue-700 dark:text-indigo-300">
                        <img src={GithubIcon} alt="github" className="w-4 h-3 md:w-5 md:h-5 " />
                        GitHub Profile Analyzer
                    </span>

                    <h1 className="text-2xl  md:text-5xl font-extrabold text-gray-900 dark:text-gray-200 leading-tight mb-2 md:mb-4">Analyze any
                        <span className="text-blue-600 dark:text-indigo-500 px-1.5">GitHub</span>
                        profile instantly</h1>

                    <p className="text-gray-500 dark:text-slate-400 text-sm md:text-lg max-w-xl mb-7 md:mb-10 leading-relaxed">Enter any username to explore their repos, languages, stars, and contribution history.</p>

                    {/* Search bar */}
                    <div className="flex items-center text-center gap-2 md:gap-3 w-full max-w-xl border border-grey-50 dark:border-indigo-800 rounded-xl  py-2 px-4 md:px-6 md:py-2 bg-blue-50 dark:bg-slate-950 text-gray-600 dark:text-gray-200  transition-all">
                        <img
                            src={searchIcon}
                            alt="Search"
                            className="w-4 h-5 md:w-7 md:h-8"
                        />

                        <input value={username}
                            onChange={(e) => setusername(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            type="text" placeholder="Enter GitHub username..."
                            className="flex-1 outline-none bg-transparent min-w-0" />

                        {/* handle search button */}
                        <button
                            onClick={handleSearch}
                            className="border border-blue-200 dark:border-indigo-800 rounded-full text-xs font-bold md:text-base px-2 md:px-3 py-1  text-blue-700 dark:text-indigo-300 bg-blue-100 hover:bg-gray-200 dark:bg-indigo-950 dark:hover:bg-slate-800 transition-all">
                            Analyze</button>
                    </div>


                    <p className={`mt-6 text-xs ${darkMode ? "text-slate-600" : "text-gray-400"}`}>
                        Try:{" "}
                        <code className={`px-1.5 py-0.5 rounded ${darkMode ? "bg-slate-800 text-slate-300" : "bg-gray-100 text-gray-600"}`}>YasmeenShk</code>{" "}
                        ·{" "}
                        <code className={`px-1.5 py-0.5 rounded ${darkMode ? "bg-slate-800 text-slate-300" : "bg-gray-100 text-gray-600"}`}>torvalds</code>
                    </p>
                </main>
            </div>



        </div>
    )
}

export default SearchScreen;