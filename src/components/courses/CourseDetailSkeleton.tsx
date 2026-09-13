import { Skeleton } from "@/components/ui/skeleton";

export function CourseDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col items-center gap-6">
        <Skeleton className="aspect-video w-full max-w-2xl" />

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="mt-2 h-1 w-32" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
