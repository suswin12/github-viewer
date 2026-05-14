import { useParams, Link } from 'react-router-dom'
import { useGitHubUser } from '../hooks/useGitHubUser'
import ProfileCard from '../components/ProfileCard'
import StatsGrid from '../components/StatsGrid'
import LanguageChart from '../components/LanguageChart'
import RepoList from '../components/RepoList'
import ActivityFeed from '../components/ActivityFeed'
import TopRepos from '../components/TopRepos'
import FollowerGrid from '../components/FollowerGrid'
import SkeletonLoader from '../components/SkeletonLoader'
import SearchBar from '../components/SearchBar'
import ContributionHeatmap from '../components/ContributionHeatmap'
import CommitActivityChart from '../components/CommitActivityChart'
import MostActiveDay from '../components/MostActiveDay'
import GistViewer from '../components/GistViewer'
import OrgExplorer from '../components/OrgExplorer'
import PDFExport from '../components/PDFExport'
import ShareCard from '../components/ShareCard'
import AISummary from '../components/AISummary'
import SimilarDevs from '../components/SimilarDevs'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function UserProfile() {
  const { username } = useParams()
  const { user, repos, events, loading, error } = useGitHubUser(username)

  if (loading) return <SkeletonLoader />

  if (error) return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <AlertCircle size={48} className="text-red-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User not found</h2>
        <p className="text-gray-500">"{username}" doesn't exist on GitHub</p>
      </div>
      <div className="w-full max-w-sm"><SearchBar /></div>
      <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
        <ArrowLeft size={16} /> Back to home
      </Link>
    </div>
  )

  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 max-w-sm">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-1 space-y-4">
          <ProfileCard user={user} />
          <div className="flex flex-col gap-2">
            <AISummary user={user} repos={repos} events={events} />
            <ShareCard user={user} repos={repos} />
            <PDFExport user={user} repos={repos} />
          </div>
          <StatsGrid repos={repos} />
          <LanguageChart repos={repos} />
          <TopRepos repos={repos} />
          <MostActiveDay events={events} />
          <FollowerGrid username={username} followerCount={user.followers} followingCount={user.following} />
          <OrgExplorer username={username} />
          <SimilarDevs repos={repos} currentUser={username} />
          <GistViewer username={username} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <ContributionHeatmap events={events} />
          <CommitActivityChart events={events} />
          <ActivityFeed events={events} />
          <RepoList repos={repos} />
        </div>

      </div>
    </div>
  )
}
