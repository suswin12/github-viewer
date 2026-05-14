import { Star, GitFork, ExternalLink } from 'lucide-react'
import { getLanguageColor } from '../utils/formatters'

export default function TopRepos({ repos }) {
  const top5 = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5)

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Starred Repos</h3>
      <div className="space-y-3">
        {top5.map((repo, i) => (
          <div key={repo.id} className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-300 dark:text-gray-600 w-5 shrink-0">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline truncate"
                >
                  {repo.name}
                </a>
                {repo.language && (
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: getLanguageColor(repo.language) }} />
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
