import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Clock, X } from 'lucide-react'

export default function SearchBar({ large = false }) {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('searchHistory') || '[]'))
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (!ref.current?.contains(e.target)) setShowDropdown(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(username) {
    const u = (username || query).trim()
    if (!u) return
    const newHistory = [u, ...history.filter(h => h !== u)].slice(0, 8)
    setHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    setShowDropdown(false)
    setQuery('')
    navigate(`/user/${u}`)
  }

  function removeHistory(item, e) {
    e.stopPropagation()
    const updated = history.filter(h => h !== item)
    setHistory(updated)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
  }

  return (
    <div ref={ref} className="relative w-full">
      <div className={`flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ${large ? 'px-4 py-3' : 'px-3 py-2'}`}>
        <Search size={large ? 20 : 16} className="text-gray-400 shrink-0" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Search GitHub username..."
          className={`flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 ${large ? 'text-lg' : 'text-sm'}`}
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={16} />
          </button>
        )}
        <button
          onClick={() => handleSearch()}
          className={`bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-80 transition ${large ? 'px-5 py-2 text-sm' : 'px-3 py-1 text-xs'}`}
        >
          Search
        </button>
      </div>

      {showDropdown && history.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
          <p className="text-xs text-gray-400 px-4 py-2 border-b border-gray-100 dark:border-gray-700">Recent searches</p>
          {history.map(item => (
            <div
              key={item}
              onClick={() => handleSearch(item)}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
              </div>
              <button
                onClick={e => removeHistory(item, e)}
                className="text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
