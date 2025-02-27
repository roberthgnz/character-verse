const ChatRow = () => (
  <div className="ring-offset-background relative flex h-10 w-full items-center rounded-md">
    <div className="h-4 w-full rounded bg-gray-700"></div>
  </div>
)

export const ChatHistorySkeleton = () => {
  return (
    <div className="bg-accent h-full animate-pulse space-y-4 rounded-lg border p-4 shadow-sm">
      <div className="text-sm font-medium">Chat History</div>
      <div className="border-primary bg-primary inline-flex h-10 w-full rounded-md border px-4 py-2"></div>
      <div className="flex-1 space-y-1 overflow-y-auto">
        {[...Array(12)].map((_, index) => (
          <ChatRow key={index} />
        ))}
      </div>
    </div>
  )
}
