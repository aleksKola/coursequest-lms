import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Course } from "@/lib/courses";

type CourseCardProps = {
  course: Course;
  progressPercent: number;
};

export function CourseCard({ course, progressPercent }: CourseCardProps) {
  const isComplete = progressPercent === 100;
  const durationLabel = `${Math.round(course.durationMinutes / 60)}h`;

  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex flex-col overflow-hidden rounded-xl border transition-colors hover:bg-muted/50"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {isComplete && (
          <Badge className="absolute right-2 top-2 bg-green-600 text-white dark:bg-green-500">
            Completed
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-medium leading-snug">{course.title}</h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="secondary">{course.difficulty}</Badge>
          <Badge variant="secondary">{durationLabel}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Progress
            value={progressPercent}
            className={
              isComplete
                ? "flex-1 [&_[data-slot=progress-indicator]]:bg-green-600 dark:[&_[data-slot=progress-indicator]]:bg-green-500"
                : "flex-1"
            }
          />
          <span
            className={
              isComplete
                ? "text-sm text-green-600 dark:text-green-500"
                : "text-sm text-muted-foreground"
            }
          >
            {progressPercent}%
          </span>
        </div>
      </div>
    </Link>
  );
}
