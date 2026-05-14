import { useState, useRef } from 'react'
import { Star, GitFork, Eye, ExternalLink } from 'lucide-react'
import { getLanguageColor, timeAgo } from '../utils/formatters'

export default function RepoPreviewPopup({ repo, children }) {
  const [show, setShow] = useState(false)
  const timer = useRef(null)

  function handleEnter() {
    timer.current = setTimeout(() => setShow(true), 400)
  }
  function handleLeave() {
    clearTimeout(timer.current)
    setShow(false)
  }

  return (
    <div className="relative inline-block" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      {show && (
        <div className="absolute z-50 left-0 top-full mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 pointer-events-none">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{repo.name}</p>
              {repo.full_name && <p className="text-xs text-gray-400">{repo.full_name}</p>}
            </div>
            {repo.language && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                <span className="w-2 h-2 rounded-full" style={{ background: getLanguageColor(repo.language) }} />
                {repo.language}
              </span>
            )}
          </div>
          {repo.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{repo.description}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
            <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
            <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
            <span className="flex items-center gap-1"><Eye size={11} />{repo.watchers_count}</span>
            <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
          </div>
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {repo.topics.slice(0, 4).map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">{t}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
