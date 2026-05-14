import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { Github, Star, GitFork, Users } from 'lucide-react'

const POPULAR = ['torvalds', 'gaearon', 'sindresorhus', 'tj', 'yyx990803', 'addyosmani']

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center">
            <Github size={32} className="text-white dark:text-gray-900" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">GitHub Profile Viewer</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Search any GitHub user — view repos, languages, activity and more.</p>

        <SearchBar large />

        <div className="mt-8">
          <p className="text-sm text-gray-400 mb-3">Try these popular profiles</p>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR.map(u => (
              <button
                key={u}
                onClick={() => navigate(`/user/${u}`)}
                className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                @{u}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: Users, label: 'Profile Overview', desc: 'Bio, followers, links' },
            { icon: Star, label: 'Repo Stats', desc: 'Stars, forks, languages' },
            { icon: GitFork, label: 'Activity Feed', desc: 'Pushes, PRs, issues' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <Icon size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
