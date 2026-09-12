import { Checkbox } from "@/components/ui/checkbox";
import type { Lesson } from "@/lib/courses";

type LessonItemProps = {
  lesson: Lesson;
  isComplete: boolean;
  onToggle: () => void;
};

export function LessonItem({ lesson, isComplete, onToggle }: LessonItemProps) {
  return (
    <label className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50">
      <Checkbox checked={isComplete} onCheckedChange={onToggle} />
      <span className={isComplete ? "flex-1 text-muted-foreground line-through" : "flex-1"}>
        {lesson.title}
      </span>
      <span className="text-sm text-muted-foreground">{lesson.durationMinutes}m</span>
    </label>
  );
}
