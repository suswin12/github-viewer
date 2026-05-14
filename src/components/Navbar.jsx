import { Link } from 'react-router-dom'
import { Moon, Sun, Github, GitCompare, Trophy } from 'lucide-react'
import KeyboardShortcuts from './KeyboardShortcuts'

export default function Navbar({ dark, setDark }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white hover:opacity-80 transition">
          <Github size={22} />
          <span>GitView</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link to="/compare"
            className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <GitCompare size={16} />
            <span className="hidden sm:inline">Compare</span>
          </Link>
          <Link to="/leaderboard"
            className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Trophy size={16} />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
          <KeyboardShortcuts />
          <button
            onClick={() => setDark(d => !d)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
