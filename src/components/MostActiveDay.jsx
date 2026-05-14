import { useMemo } from 'react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

export default function MostActiveDay({ events }) {
  const { dayCounts, hourCounts, bestDay, bestHour } = useMemo(() => {
    const dayCounts = Array(7).fill(0)
    const hourCounts = Array(24).fill(0)
    events.forEach(e => {
      const d = new Date(e.created_at)
      dayCounts[d.getDay()]++
      hourCounts[d.getHours()]++
    })
    const bestDay = dayCounts.indexOf(Math.max(...dayCounts))
    const bestHour = hourCounts.indexOf(Math.max(...hourCounts))
    return { dayCounts, hourCounts, bestDay, bestHour }
  }, [events])

  const maxDay = Math.max(...dayCounts) || 1
  const maxHour = Math.max(...hourCounts) || 1

  const formatHour = h => {
    if (h === 0) return '12am'
    if (h < 12) return `${h}am`
    if (h === 12) return '12pm'
    return `${h - 12}pm`
  }

  if (events.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Most Active Times</h3>
      <p className="text-xs text-gray-400 mb-4">
        Most active on <span className="text-indigo-500 font-medium">{DAYS[bestDay]}</span> at <span className="text-indigo-500 font-medium">{formatHour(bestHour)}</span>
      </p>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">By Day</p>
      <div className="flex items-end gap-1 h-12 mb-4">
        {dayCounts.map((count, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-sm transition-all ${i === bestDay ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              style={{ height: `${(count / maxDay) * 40}px`, minHeight: count > 0 ? '4px' : '0' }}
            />
            <span className="text-[9px] text-gray-400">{DAYS[i]}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">By Hour</p>
      <div className="flex items-end gap-px h-10">
        {hourCounts.map((count, i) => (
          <div
            key={i}
            title={`${formatHour(i)}: ${count} events`}
            className={`flex-1 rounded-sm ${i === bestHour ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
            style={{ height: `${(count / maxHour) * 36}px`, minHeight: count > 0 ? '3px' : '0' }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1 text-[9px] text-gray-400">
        <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
      </div>
    </div>
  )
}
