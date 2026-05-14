import { MapPin, Link2, Twitter, Building, Calendar, Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { formatDate, formatNumber } from '../utils/formatters'

export default function ProfileCard({ user }) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex flex-col items-center text-center gap-3">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.name || user.login}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">@{user.login}</p>
        </div>
        {user.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{user.bio}</p>
        )}

        <div className="flex gap-6 py-3 border-y border-gray-100 dark:border-gray-800 w-full justify-center">
          {[
            { label: 'Followers', value: formatNumber(user.followers) },
            { label: 'Following', value: formatNumber(user.following) },
            { label: 'Repos', value: formatNumber(user.public_repos) },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="w-full space-y-2 text-sm text-left">
          {user.company && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Building size={14} className="shrink-0" />
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin size={14} className="shrink-0" />
              <span>{user.location}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Link2 size={14} className="shrink-0" />
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate">
                {user.blog}
              </a>
            </div>
          )}
          {user.twitter_username && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Twitter size={14} className="shrink-0" />
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                @{user.twitter_username}
              </a>
            </div>
          )}
          {user.created_at && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={14} className="shrink-0" />
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full pt-2">
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl py-2.5 text-sm font-medium hover:opacity-80 transition"
          >
            <ExternalLink size={14} />
            View on GitHub
          </a>
          <button
            onClick={copyLink}
            className="px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
