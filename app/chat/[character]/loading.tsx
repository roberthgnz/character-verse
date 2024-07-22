import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function Loading() {
  return (
    <div className="bg-background flex h-[calc(100vh_-_8rem)] flex-col items-center justify-center">
      <LoadingSkeleton />
    </div>
  )
}
