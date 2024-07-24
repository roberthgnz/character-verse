import { Skeleton } from "@/components/ui/skeleton"

export const ChatMessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="bg-muted h-4 w-[400px] animate-[pulse_1s_ease-in-out_infinite]" />
      <Skeleton className="bg-muted h-4 w-[350px] animate-[pulse_2s_ease-in-out_infinite]" />
      <Skeleton className="bg-muted h-4 w-[300px] animate-[pulse_3s_ease-in-out_infinite]" />
    </div>
  )
}
