import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 text-center gap-4">
      <p className="text-8xl font-bold text-gray-200 dark:text-gray-800">404</p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white -mt-4">Page not found</h2>
      <p className="text-gray-500">The page you are looking for doesn't exist.</p>
      <Link
        to="/"
        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-80 transition mt-2"
      >
        <Home size={16} /> Go home
      </Link>
    </div>
  )
}
