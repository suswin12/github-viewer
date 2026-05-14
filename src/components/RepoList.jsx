import { useState, useMemo } from 'react'
import { Star, GitFork, ExternalLink, Search } from 'lucide-react'
import { timeAgo, getLanguageColor } from '../utils/formatters'

export default function RepoList({ repos }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('updated')
  const [filterLang, setFilterLang] = useState('all')

  const languages = useMemo(() => {
    const langs = [...new Set(repos.map(r => r.language).filter(Boolean))]
    return langs.sort()
  }, [repos])

  const filtered = useMemo(() => {
    let list = [...repos]
    if (search) list = list.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase()))
    if (filterLang !== 'all') list = list.filter(r => r.language === filterLang)
    list.sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
      if (sortBy === 'forks') return b.forks_count - a.forks_count
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
    return list
  }, [repos, search, sortBy, filterLang])

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Repositories ({filtered.length})</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search repositories..."
              className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none"
            />
          </div>
          <select
            value={filterLang}
            onChange={e => setFilterLang(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 outline-none"
          >
            <option value="all">All Languages</option>
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 outline-none"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-800">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-sm">No repositories found</p>
        ) : (
          filtered.map(repo => (
            <div key={repo.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline truncate"
                    >
                      {repo.name}
                    </a>
                    {repo.fork && (
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">fork</span>
                    )}
                  </div>
                  {repo.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: getLanguageColor(repo.language) }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1"><Star size={12} />{repo.stargazers_count}</span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1"><GitFork size={12} />{repo.forks_count}</span>
                    )}
                    <span>Updated {timeAgo(repo.updated_at)}</span>
                  </div>
                </div>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition shrink-0 mt-1">
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
