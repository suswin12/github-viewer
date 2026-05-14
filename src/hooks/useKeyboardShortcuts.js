import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useKeyboardShortcuts({ setDark }) {
  const navigate = useNavigate()

  useEffect(() => {
    function handler(e) {
      const tag = e.target.tagName.toLowerCase()
      const isTyping = tag === 'input' || tag === 'textarea'

      if (e.key === 'Escape') {
        document.activeElement?.blur()
        return
      }
      if (isTyping) return

      if (e.key === '/') {
        e.preventDefault()
        const input = document.querySelector('input[placeholder*="username"]')
        input?.focus()
      }
      if (e.key === 'd' || e.key === 'D') {
        setDark(p => !p)
      }
      if (e.key === 'h' || e.key === 'H') {
        navigate('/')
      }
      if (e.key === 'c' || e.key === 'C') {
        navigate('/compare')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setDark, navigate])
}
