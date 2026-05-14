const BASE_URL = 'https://api.github.com'

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  ...(import.meta.env.VITE_GITHUB_TOKEN && {
    'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
  })
}

export async function getUser(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers })
  if (res.status === 404) throw new Error('User not found')
  if (!res.ok) throw new Error('Something went wrong')
  return res.json()
}

export async function getRepos(username) {
  const res = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`, { headers })
  if (!res.ok) throw new Error('Could not fetch repos')
  return res.json()
}

export async function getEvents(username) {
  const res = await fetch(`${BASE_URL}/users/${username}/events/public?per_page=30`, { headers })
  if (!res.ok) throw new Error('Could not fetch events')
  return res.json()
}

export async function getFollowers(username) {
  const res = await fetch(`${BASE_URL}/users/${username}/followers?per_page=24`, { headers })
  if (!res.ok) throw new Error('Could not fetch followers')
  return res.json()
}

export async function getFollowing(username) {
  const res = await fetch(`${BASE_URL}/users/${username}/following?per_page=24`, { headers })
  if (!res.ok) throw new Error('Could not fetch following')
  return res.json()
}
