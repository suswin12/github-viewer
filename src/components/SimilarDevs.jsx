import { useState } from 'react'
import { Users2, ExternalLink } from 'lucide-react'
import { buildLanguageData } from '../utils/formatters'
import { useNavigate } from 'react-router-dom'

async function searchSimilar(language) {
  const res = await fetch(
    `https://api.github.com/search/users?q=language:${language}&sort=followers&per_page=6`
  )
  if (!res.ok) throw new Error('Search failed')
  return res.json()
}

export default function SimilarDevs({ repos, currentUser }) {
  const [devs, setDevs] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const topLang = buildLanguageData(repos)[0]?.name

  async function load() {
    if (!topLang) return
    setLoading(true); setError('')
    try {
      const data = await searchSimilar(topLang)
      const filtered = data.items.filter(u => u.login !== currentUser)
      setDevs(filtered.slice(0, 6))
      setLoaded(true)
    } catch { setError('Could not load suggestions') }
    setLoading(false)
  }

  if (!topLang) return null

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Similar Developers</h3>
          <p className="text-xs text-gray-400 mt-0.5">Top {topLang} developers on GitHub</p>
        </div>
        {!loaded && (
          <button onClick={load} disabled={loading}
            className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50">
            {loading ? 'Finding...' : 'Find'}
          </button>
        )}
      </div>

      {!loaded && !loading && (
        <div className="flex flex-col items-center py-6 gap-2 text-gray-400">
          <Users2 size={24} />
          <p className="text-sm">Click to find similar {topLang} developers</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex flex-col items-center gap-1.5 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-2 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-400 text-sm text-center py-4">{error}</p>}

      {loaded && devs.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {devs.map(dev => (
            <button
              key={dev.id}
              onClick={() => navigate(`/user/${dev.login}`)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <img src={dev.avatar_url} alt={dev.login}
                className="w-12 h-12 rounded-full ring-2 ring-transparent group-hover:ring-indigo-400 transition" />
              <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 truncate w-full text-center">
                {dev.login}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
