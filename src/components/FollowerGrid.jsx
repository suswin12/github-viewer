import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFollowers, getFollowing } from '../services/github'
import { Users } from 'lucide-react'

export default function FollowerGrid({ username, followerCount, followingCount }) {
  const [tab, setTab] = useState('followers')
  const [list, setList] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function load(type) {
    setTab(type)
    setLoading(true)
    try {
      const data = type === 'followers' ? await getFollowers(username) : await getFollowing(username)
      setList(data)
      setLoaded(true)
    } catch {}
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-1 mb-4">
        {[
          { key: 'followers', label: `Followers (${followerCount})` },
          { key: 'following', label: `Following (${followingCount})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => load(t.key)}
            className={`flex-1 py-2 text-sm rounded-lg font-medium transition ${tab === t.key && loaded
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {!loaded ? (
        <button
          onClick={() => load('followers')}
          className="w-full py-8 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
        >
          <Users size={24} />
          <span className="text-sm">Click to load followers</span>
        </button>
      ) : loading ? (
        <div className="grid grid-cols-4 gap-2">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-2 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">No {tab} found</p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {list.map(user => (
            <button
              key={user.id}
              onClick={() => navigate(`/user/${user.login}`)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full ring-2 ring-transparent group-hover:ring-blue-400 transition"
              />
              <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-blue-500 truncate w-full text-center">
                {user.login}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
