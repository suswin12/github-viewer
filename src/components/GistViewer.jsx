import { useState, useEffect } from 'react'
import { Code2, ExternalLink, Clock } from 'lucide-react'
import { timeAgo } from '../utils/formatters'

async function fetchGists(username) {
  const res = await fetch(`https://api.github.com/users/${username}/gists?per_page=20`)
  if (!res.ok) throw new Error('Could not fetch gists')
  return res.json()
}

export default function GistViewer({ username }) {
  const [gists, setGists] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const data = await fetchGists(username)
      setGists(data)
      setLoaded(true)
    } catch {
      setError('Could not load gists')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Public Gists</h3>
        {!loaded && (
          <button onClick={load} disabled={loading}
            className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50">
            {loading ? 'Loading...' : 'Load Gists'}
          </button>
        )}
      </div>

      {!loaded && !loading && (
        <div className="flex flex-col items-center py-8 gap-2 text-gray-400">
          <Code2 size={28} />
          <p className="text-sm">Click to load public gists</p>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-400 text-sm text-center py-4">{error}</p>}

      {loaded && gists.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-6">No public gists found</p>
      )}

      {loaded && gists.length > 0 && (
        <div className="space-y-3">
          {gists.map(gist => {
            const files = Object.values(gist.files)
            const mainFile = files[0]
            return (
              <div key={gist.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition group">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {gist.description || mainFile?.filename || 'Untitled Gist'}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Code2 size={11} />
                        {mainFile?.language || 'Text'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {timeAgo(gist.updated_at)}
                      </span>
                      <span>{files.length} file{files.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <a href={gist.html_url} target="_blank" rel="noreferrer"
                    className="text-gray-300 group-hover:text-blue-500 transition shrink-0">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
