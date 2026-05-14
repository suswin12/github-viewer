import { useState } from 'react'
import { X, BookOpen, ExternalLink } from 'lucide-react'

async function fetchReadme(owner, repo) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { Accept: 'application/vnd.github.v3.html' }
  })
  if (!res.ok) throw new Error('No README found')
  return res.text()
}

export default function ReadmeViewer({ owner, repoName, repoUrl }) {
  const [open, setOpen] = useState(false)
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function openReadme() {
    setOpen(true)
    if (html) return
    setLoading(true)
    setError('')
    try {
      const content = await fetchReadme(owner, repoName)
      setHtml(content)
    } catch {
      setError('No README found for this repository.')
    }
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={openReadme}
        className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
        title="View README"
      >
        <BookOpen size={12} /> README
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-gray-500" />
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{repoName} / README</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={repoUrl} target="_blank" rel="noreferrer"
                  className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                  <ExternalLink size={12} /> Open repo
                </a>
                <button onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-6 flex-1">
              {loading && (
                <div className="flex items-center justify-center py-16">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {error && <p className="text-gray-400 text-sm text-center py-12">{error}</p>}
              {html && (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
