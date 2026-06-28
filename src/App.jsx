import { useState } from "react";
import SearchScreen from "./components/SearchScreen";
import Profile from "./components/Profile";
import StatsCard from "./components/Statscard";

function App() {
  const [darkMode, setDarkMode] = useState(false); // dark mode
  const [username, setUsername] = useState(null);   // searched username

  return (
    <StatsCard/>

    // dark Mode 
    // <div className={darkMode ? "dark" : ""}>
    //   <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">

    //     {!username ? (
    //       // Search screen 
    //       <SearchScreen
    //         darkMode={darkMode}
    //         setDarkMode={setDarkMode}
    //         onSearch={(u) => setUsername(u)}
    //       />
    //     ) : (
    //       // Profile
    //       <>
    //         {/* Top bar with back button */}
    //         <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-6 py-4">
    //           <button
    //             onClick={() => setUsername(null)} // back to search
    //             className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
    //           >
    //             ← Back to Search
    //           </button>
    //           <button
    //             onClick={() => setDarkMode(!darkMode)}
    //             className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
    //           >
    //             {darkMode ? "☀️ Light" : "🌙 Dark"}
    //           </button>
    //         </nav>

    //         <Profile username={username} />
    //       </>
    //     )}

    //   </div>
    // </div>
  );
}

export default App;