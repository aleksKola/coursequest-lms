import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import type { Lesson } from "@/lib/courses";

type LessonItemProps = {
  courseId: string;
  lesson: Lesson;
  isComplete: boolean;
  onToggle: () => void;
};

export function LessonItem({
  courseId,
  lesson,
  isComplete,
  onToggle,
}: LessonItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50">
      <Checkbox checked={isComplete} onCheckedChange={onToggle} />
      <Link
        href={`/courses/${courseId}/lessons/${lesson.id}`}
        className={
          isComplete
            ? "flex-1 text-muted-foreground line-through hover:underline"
            : "flex-1 hover:underline"
        }
      >
        {lesson.title}
      </Link>
      <span className="text-sm text-muted-foreground">{lesson.durationMinutes}m</span>
    </div>
  );
}
