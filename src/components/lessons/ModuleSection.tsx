import { LessonItem } from "@/components/lessons/LessonItem";
import type { Module } from "@/lib/courses";

type ModuleSectionProps = {
  module: Module;
  isLessonComplete: (lessonId: string) => boolean;
  onToggleLesson: (lessonId: string) => void;
};

export function ModuleSection({
  module,
  isLessonComplete,
  onToggleLesson,
}: ModuleSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-medium">{module.title}</h3>
      <div className="flex flex-col">
        {module.lessons.map((lesson) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            isComplete={isLessonComplete(lesson.id)}
            onToggle={() => onToggleLesson(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}
