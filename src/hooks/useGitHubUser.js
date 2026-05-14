import { useState, useEffect } from 'react'
import { getUser, getRepos, getEvents } from '../services/github'

export function useGitHubUser(username) {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return
    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])
    setEvents([])

    Promise.all([getUser(username), getRepos(username), getEvents(username)])
      .then(([userData, reposData, eventsData]) => {
        setUser(userData)
        setRepos(reposData)
        setEvents(eventsData)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [username])

  return { user, repos, events, loading, error }
}
