import { GitCommit, GitPullRequest, Star, AlertCircle } from 'lucide-react'
import { timeAgo } from '../utils/formatters'

function getEventInfo(event) {
  switch (event.type) {
    case 'PushEvent':
      return {
        icon: GitCommit,
        color: 'text-green-500 bg-green-50 dark:bg-green-900/20',
        text: `Pushed to ${event.payload?.ref?.replace('refs/heads/', '') || 'branch'}`,
        repo: event.repo.name,
      }
    case 'PullRequestEvent':
      return {
        icon: GitPullRequest,
        color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
        text: `${event.payload?.action} a pull request`,
        repo: event.repo.name,
      }
    case 'WatchEvent':
      return {
        icon: Star,
        color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
        text: 'Starred',
        repo: event.repo.name,
      }
    case 'IssuesEvent':
      return {
        icon: AlertCircle,
        color: 'text-red-500 bg-red-50 dark:bg-red-900/20',
        text: `${event.payload?.action} an issue`,
        repo: event.repo.name,
      }
    default:
      return null
  }
}

export default function ActivityFeed({ events }) {
  const validEvents = events
    .map(e => ({ ...e, info: getEventInfo(e) }))
    .filter(e => e.info)
    .slice(0, 10)

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      {validEvents.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {validEvents.map(event => {
            const { icon: Icon, color, text, repo } = event.info
            return (
              <div key={event.id} className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                  <Icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {text}{' '}
                    <a
                      href={`https://github.com/${repo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {repo.split('/')[1]}
                    </a>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{timeAgo(event.created_at)}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
