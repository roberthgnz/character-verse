export const LatestChatHistorySkeleton = ({ character }: any) => {
  return (
    <>
      <p>Your chat history with {character.name} </p>
      <div className="grid w-full grid-cols-3 gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border-accent-background h-10 w-full animate-pulse rounded-md border"
          ></div>
        ))}
      </div>
    </>
  )
}
