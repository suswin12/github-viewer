import { useState, useRef, useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'

const shortcuts = [
  { key: '/', desc: 'Focus search bar' },
  { key: 'D', desc: 'Toggle dark mode' },
  { key: 'H', desc: 'Go to home' },
  { key: 'C', desc: 'Go to compare' },
  { key: 'Esc', desc: 'Close / unfocus' },
]

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  // Click outside close pannuvathu
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        title="Keyboard shortcuts"
      >
        <Keyboard size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-64">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Keyboard size={15} className="text-gray-500" />
              <span className="font-semibold text-sm text-gray-900 dark:text-white">Keyboard Shortcuts</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
              <X size={16} />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {shortcuts.map(s => (
              <div key={s.key} className="flex items-center justify-between py-1.5">
                <span className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</span>
                <kbd className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
