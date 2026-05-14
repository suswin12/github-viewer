import { useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { getTotalStats, buildLanguageData } from '../utils/formatters'

export default function AISummary({ user, repos, events }) {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  async function generate() {
    setOpen(true)
    if (summary) return
    setLoading(true)
    setError('')

    const stats = getTotalStats(repos)
    const langs = buildLanguageData(repos).slice(0, 5).map(l => l.name).join(', ')
    const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3).map(r => `${r.name} (⭐${r.stargazers_count})`).join(', ')
    const recentActivity = events.slice(0, 5).map(e => e.type).join(', ')

    const prompt = `Analyze this GitHub developer profile and write a short, engaging 3-4 sentence professional summary:

Name: ${user.name || user.login}
Username: @${user.login}
Bio: ${user.bio || 'None'}
Location: ${user.location || 'Unknown'}
Followers: ${user.followers}
Public Repos: ${user.public_repos}
Total Stars Earned: ${stats.totalStars}
Total Forks: ${stats.totalForks}
Top Languages: ${langs}
Top Repos: ${topRepos}
Recent Activity Types: ${recentActivity}
Member Since: ${user.created_at?.slice(0, 4)}

Write a friendly, professional summary highlighting their strengths, expertise, and what makes them stand out as a developer. Keep it under 80 words.`

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      const data = await res.json()
      const text = data.content?.find(c => c.type === 'text')?.text || ''
      setSummary(text)
    } catch {
      setError('Could not generate summary. Try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={generate}
        className="flex items-center gap-2 w-full justify-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition"
      >
        <Sparkles size={15} />
        AI Profile Summary
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-indigo-500" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">AI Profile Summary</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
                <X size={16} />
              </button>
            </div>
            <div className="p-5">
              {loading && (
                <div className="flex flex-col items-center gap-3 py-8">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Analyzing profile...</p>
                </div>
              )}
              {error && <p className="text-red-400 text-sm text-center py-4">{error}</p>}
              {summary && (
                <>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{summary}</p>
                  </div>
                  <button
                    onClick={() => { setSummary(''); generate() }}
                    className="mt-3 text-xs text-indigo-500 hover:underline"
                  >
                    Regenerate ↺
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
