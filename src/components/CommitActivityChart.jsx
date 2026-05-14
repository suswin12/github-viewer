import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function CommitActivityChart({ events }) {
  const data = useMemo(() => {
    const months = {}
    events.forEach(e => {
      if (e.type === 'PushEvent') {
        const month = e.created_at?.slice(0, 7)
        if (month) months[month] = (months[month] || 0) + (e.payload?.commits?.length || 1)
      }
    })
    return Object.entries(months)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6)
      .map(([month, commits]) => ({ month: month.slice(5), commits }))
  }, [events])

  if (data.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Commit Activity (Last 6 months)</h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barSize={20}>
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={24} />
          <Tooltip
            contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#f9fafb' }}
            cursor={{ fill: 'rgba(99,102,241,0.1)' }}
          />
          <Bar dataKey="commits" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
