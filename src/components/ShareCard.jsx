import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { formatNumber, getTotalStats, buildLanguageData, getLanguageColor } from '../utils/formatters'

export default function ShareCard({ user, repos }) {
  const [copied, setCopied] = useState(false)
  const [show, setShow] = useState(false)

  const stats = getTotalStats(repos)
  const langs = buildLanguageData(repos).slice(0, 4)

  function copyLink() {
    navigator.clipboard.writeText(`https://github.com/${user.login}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="flex items-center gap-2 w-full justify-center py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <Share2 size={15} />
        Share Profile Card
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">Share Profile</h3>

              {/* Preview Card */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-5 text-white mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <img src={user.avatar_url} alt={user.login} className="w-14 h-14 rounded-full ring-2 ring-white/30" />
                  <div>
                    <p className="font-bold text-lg leading-tight">{user.name || user.login}</p>
                    <p className="text-white/70 text-sm">@{user.login}</p>
                  </div>
                </div>
                {user.bio && <p className="text-white/80 text-xs mb-4 leading-relaxed">{user.bio}</p>}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Followers', val: formatNumber(user.followers) },
                    { label: 'Stars', val: formatNumber(stats.totalStars) },
                    { label: 'Repos', val: formatNumber(user.public_repos) },
                  ].map(s => (
                    <div key={s.label} className="bg-white/10 rounded-xl p-2 text-center">
                      <p className="font-bold text-base">{s.val}</p>
                      <p className="text-white/60 text-[10px]">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {langs.map(l => (
                    <span key={l.name} className="flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-0.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                      {l.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyLink}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                  {copied ? 'Copied!' : 'Copy GitHub Link'}
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
