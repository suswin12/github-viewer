import { useMemo } from 'react'

function getWeeksData(events) {
  const counts = {}
  events.forEach(e => {
    const day = e.created_at?.slice(0, 10)
    if (day) counts[day] = (counts[day] || 0) + 1
  })
  const weeks = []
  const today = new Date()
  for (let w = 51; w >= 0; w--) {
    const week = []
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today)
      date.setDate(today.getDate() - (w * 7 + d))
      const key = date.toISOString().slice(0, 10)
      week.push({ date: key, count: counts[key] || 0 })
    }
    weeks.push(week)
  }
  return weeks
}

function getColor(count) {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
  if (count <= 2) return 'bg-green-200 dark:bg-green-900'
  if (count <= 5) return 'bg-green-400 dark:bg-green-700'
  if (count <= 9) return 'bg-green-500 dark:bg-green-600'
  return 'bg-green-600 dark:bg-green-500'
}

export default function ContributionHeatmap({ events }) {
  const weeks = useMemo(() => getWeeksData(events), [events])

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Contribution Activity</h3>
        <span className="text-xs text-gray-400">{events.length} events</span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-0.5 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map(({ date, count }) => (
                <div key={date} title={`${date}: ${count} events`}
                  className={`w-3 h-3 rounded-sm ${getColor(count)} cursor-pointer hover:scale-125 transition-transform`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-xs text-gray-400">Less</span>
        {['bg-gray-100 dark:bg-gray-800','bg-green-200','bg-green-400','bg-green-500','bg-green-600'].map((c,i)=>(
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-gray-400">More</span>
      </div>
    </div>
  )
}
