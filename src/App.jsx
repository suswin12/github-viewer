import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import Compare from './pages/Compare'
import Leaderboard from './pages/Leaderboard'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'

function AppInner({ dark, setDark }) {
  useKeyboardShortcuts({ setDark })
  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default function App() {
  const [dark, setDark] = useDarkMode()
  return (
    <BrowserRouter>
      <AppInner dark={dark} setDark={setDark} />
    </BrowserRouter>
  )
}
