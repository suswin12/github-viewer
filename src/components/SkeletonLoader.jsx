function Bone({ className }) {
  return <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
}

export default function SkeletonLoader() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex flex-col items-center gap-4">
              <Bone className="w-24 h-24 rounded-full" />
              <Bone className="h-5 w-36" />
              <Bone className="h-3 w-24" />
              <Bone className="h-12 w-full" />
              <div className="space-y-2 w-full">
                <Bone className="h-3 w-3/4" />
                <Bone className="h-3 w-1/2" />
                <Bone className="h-3 w-2/3" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                <Bone className="w-9 h-9 rounded-lg mb-3" />
                <Bone className="h-5 w-12 mb-1" />
                <Bone className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
            <Bone className="h-5 w-32 mb-4" />
            {[1,2,3,4,5].map(i => (
              <div key={i} className="py-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <Bone className="h-4 w-48 mb-2" />
                <Bone className="h-3 w-full mb-1" />
                <Bone className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
