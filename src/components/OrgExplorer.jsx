import { useState } from 'react'
import { Building2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

async function fetchOrgs(username) {
  const res = await fetch(`https://api.github.com/users/${username}/orgs`)
  if (!res.ok) throw new Error('Failed')
  return res.json()
}

export default function OrgExplorer({ username }) {
  const [orgs, setOrgs] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const data = await fetchOrgs(username)
      setOrgs(data)
      setLoaded(true)
    } catch {}
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Organizations</h3>
        {!loaded && (
          <button onClick={load} disabled={loading}
            className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50">
            {loading ? 'Loading...' : 'Load Orgs'}
          </button>
        )}
      </div>

      {!loaded && (
        <div className="flex flex-col items-center py-6 gap-2 text-gray-400">
          <Building2 size={24} />
          <p className="text-sm">Click to load organizations</p>
        </div>
      )}

      {loaded && orgs.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">No public organizations</p>
      )}

      {loaded && orgs.length > 0 && (
        <div className="space-y-2">
          {orgs.map(org => (
            <div key={org.id} className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onClick={() => setExpanded(expanded === org.id ? null : org.id)}
              >
                <img src={org.avatar_url} alt={org.login} className="w-8 h-8 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{org.login}</p>
                  {org.description && (
                    <p className="text-xs text-gray-400 truncate">{org.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <a href={`https://github.com/${org.login}`} target="_blank" rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-gray-300 hover:text-blue-500 transition">
                    <ExternalLink size={13} />
                  </a>
                  {expanded === org.id ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                </div>
              </div>
              {expanded === org.id && (
                <div className="px-3 pb-3 bg-gray-50 dark:bg-gray-800/50">
                  <a
                    href={`https://github.com/orgs/${org.login}/repositories`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    View all repositories →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
