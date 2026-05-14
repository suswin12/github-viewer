import { useState } from 'react'
import { getUser, getRepos } from '../services/github'
import { getTotalStats, formatNumber } from '../utils/formatters'
import { Trophy, Plus, X, Star, GitFork, Users, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Leaderboard() {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function addUser() {
    const u = input.trim()
    if (!u) return
    if (users.find(x => x.login === u)) { setError('User already added'); return }
    if (users.length >= 8) { setError('Max 8 users'); return }
    setLoading(true); setError('')
    try {
      const [user, repos] = await Promise.all([getUser(u), getRepos(u)])
      const stats = getTotalStats(repos)
      setUsers(prev => [...prev, { ...user, ...stats }])
      setInput('')
    } catch { setError('User not found') }
    setLoading(false)
  }

  function removeUser(login) {
    setUsers(prev => prev.filter(u => u.login !== login))
  }

  const sorted = [...users].sort((a, b) => b.totalStars - a.totalStars)

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <Trophy size={24} className="text-yellow-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Developer Leaderboard</h1>
      </div>
      <p className="text-gray-500 mb-8 ml-9">Add up to 8 GitHub users and rank them by stars</p>

      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addUser()}
          placeholder="Enter GitHub username..."
          className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none"
        />
        <button
          onClick={addUser}
          disabled={loading}
          className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-80 transition disabled:opacity-50 flex items-center gap-1.5"
        >
          <Plus size={15} />
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {sorted.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Trophy size={40} className="mx-auto mb-3 opacity-30" />
          <p>Add some GitHub users to start ranking!</p>
        </div>
      ) : (
        <div className="space-y-3 mt-6">
          {sorted.map((user, i) => (
            <div key={user.login} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <span className="text-2xl w-8 text-center">{medals[i] || `#${i + 1}`}</span>
              <img src={user.avatar_url} alt={user.login}
                onClick={() => navigate(`/user/${user.login}`)}
                className="w-11 h-11 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name || user.login}</p>
                <p className="text-xs text-gray-400">@{user.login}</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400" />{formatNumber(user.totalStars)}</span>
                <span className="flex items-center gap-1"><GitFork size={12} />{formatNumber(user.totalForks)}</span>
                <span className="flex items-center gap-1"><Users size={12} />{formatNumber(user.followers)}</span>
                <span className="flex items-center gap-1"><BookOpen size={12} />{user.public_repos}</span>
              </div>
              <button onClick={() => removeUser(user.login)} className="text-gray-300 hover:text-red-400 transition ml-2">
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
