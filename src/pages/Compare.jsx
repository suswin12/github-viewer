import { useState } from 'react'
import { getUser, getRepos } from '../services/github'
import { formatNumber, getTotalStats } from '../utils/formatters'
import { Star, GitFork, Users, BookOpen, ExternalLink } from 'lucide-react'

export default function Compare() {
  const [user1, setUser1] = useState('')
  const [user2, setUser2] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function compare() {
    if (!user1.trim() || !user2.trim()) return setError('Please enter both usernames')
    setLoading(true)
    setError('')
    try {
      const [[u1, u2], [r1, r2]] = await Promise.all([
        Promise.all([getUser(user1), getUser(user2)]),
        Promise.all([getRepos(user1), getRepos(user2)]),
      ])
      setData({ u1, u2, s1: getTotalStats(r1), s2: getTotalStats(r2) })
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  const metrics = data ? [
    { label: 'Followers', icon: Users, v1: data.u1.followers, v2: data.u2.followers },
    { label: 'Public Repos', icon: BookOpen, v1: data.u1.public_repos, v2: data.u2.public_repos },
    { label: 'Total Stars', icon: Star, v1: data.s1.totalStars, v2: data.s2.totalStars },
    { label: 'Total Forks', icon: GitFork, v1: data.s1.totalForks, v2: data.s2.totalForks },
  ] : []

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Compare Profiles</h1>
      <p className="text-gray-500 mb-8">Side-by-side comparison of two GitHub users</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={user1}
          onChange={e => setUser1(e.target.value)}
          placeholder="First username"
          className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white outline-none text-sm"
        />
        <span className="text-gray-400 self-center text-sm font-medium hidden sm:block">vs</span>
        <input
          value={user2}
          onChange={e => setUser2(e.target.value)}
          placeholder="Second username"
          className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white outline-none text-sm"
        />
        <button
          onClick={compare}
          disabled={loading}
          className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-80 transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Compare'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {data && (
        <div className="space-y-4 mt-8">
          <div className="grid grid-cols-2 gap-4">
            {[{ u: data.u1, s: data.s1 }, { u: data.u2, s: data.s2 }].map(({ u }) => (
              <div key={u.login} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center shadow-sm">
                <img src={u.avatar_url} alt={u.login} className="w-16 h-16 rounded-full mx-auto mb-3 ring-4 ring-gray-100 dark:ring-gray-800" />
                <p className="font-bold text-gray-900 dark:text-white">{u.name || u.login}</p>
                <p className="text-sm text-gray-500">@{u.login}</p>
                <a href={u.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline mt-2">
                  <ExternalLink size={11} /> GitHub
                </a>
              </div>
            ))}
          </div>

          {metrics.map(({ label, icon: Icon, v1, v2 }) => {
            const winner = v1 > v2 ? 0 : v1 < v2 ? 1 : -1
            return (
              <div key={label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={15} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold flex-1 text-right ${winner === 0 ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                    {formatNumber(v1)} {winner === 0 && '🏆'}
                  </span>
                  <span className="text-gray-300 text-sm">vs</span>
                  <span className={`text-lg font-bold flex-1 ${winner === 1 ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                    {winner === 1 && '🏆'} {formatNumber(v2)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
