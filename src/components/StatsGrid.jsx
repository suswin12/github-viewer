import { Star, GitFork, Code2, BookOpen } from 'lucide-react'
import { getTotalStats, formatNumber } from '../utils/formatters'

export default function StatsGrid({ repos }) {
  const { totalStars, totalForks, topLanguage, totalRepos } = getTotalStats(repos)

  const stats = [
    { label: 'Total Stars', value: formatNumber(totalStars), icon: Star, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
    { label: 'Total Forks', value: formatNumber(totalForks), icon: GitFork, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Top Language', value: topLanguage, icon: Code2, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Public Repos', value: totalRepos, icon: BookOpen, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
            <Icon size={18} />
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  )
}
