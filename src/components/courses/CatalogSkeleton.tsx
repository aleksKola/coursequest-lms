import { Skeleton } from "@/components/ui/skeleton";

function CourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-1 w-full" />
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-7 w-24" />
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
