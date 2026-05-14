import { formatDistanceToNow, format } from 'date-fns'

export function timeAgo(dateStr) {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
}

export function formatDate(dateStr) {
  return format(new Date(dateStr), 'MMM d, yyyy')
}

export function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num?.toString() || '0'
}

export function getLanguageColor(lang) {
  const colors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    Java: '#b07219', 'C++': '#f34b7d', 'C#': '#178600', C: '#555555',
    Ruby: '#701516', Go: '#00ADD8', Rust: '#dea584', PHP: '#4F5D95',
    Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB', HTML: '#e34c26',
    CSS: '#563d7c', Shell: '#89e051', Vue: '#4FC08D', Svelte: '#FF3E00',
    Scala: '#c22d40', R: '#198CE7', MATLAB: '#e16737', Lua: '#000080',
  }
  return colors[lang] || '#8b8b8b'
}

export function buildLanguageData(repos) {
  const langCount = {}
  repos.forEach(repo => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1
    }
  })
  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value, color: getLanguageColor(name) }))
}

export function getTotalStats(repos) {
  return {
    totalStars: repos.reduce((s, r) => s + r.stargazers_count, 0),
    totalForks: repos.reduce((s, r) => s + r.forks_count, 0),
    topLanguage: buildLanguageData(repos)[0]?.name || 'N/A',
    totalRepos: repos.length,
  }
}
