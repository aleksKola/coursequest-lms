import { useEffect, useMemo, useState } from "react";
import { courses, getTotalLessonCount } from "@/lib/courses";

type CompletedLessonsByCourse = Record<string, string[]>;

function storageKey(userId: string) {
  return `courseProgress:${userId}`;
}

function loadFromStorage(userId: string): CompletedLessonsByCourse {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as CompletedLessonsByCourse) : {};
  } catch {
    return {};
  }
}

export function useCourseProgress(userId: string | null | undefined) {
  const [loadedUserId, setLoadedUserId] = useState<string | null | undefined>(null);
  const [completedByCourse, setCompletedByCourse] =
    useState<CompletedLessonsByCourse>({});

  if (userId !== loadedUserId) {
    setLoadedUserId(userId);
    setCompletedByCourse(userId ? loadFromStorage(userId) : {});
  }

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(storageKey(userId), JSON.stringify(completedByCourse));
  }, [userId, completedByCourse]);

  function isLessonComplete(courseId: string, lessonId: string): boolean {
    return completedByCourse[courseId]?.includes(lessonId) ?? false;
  }

  function toggleLesson(courseId: string, lessonId: string) {
    setCompletedByCourse((prev) => {
      const completedLessonIds = prev[courseId] ?? [];
      const updatedLessonIds = completedLessonIds.includes(lessonId)
        ? completedLessonIds.filter((id) => id !== lessonId)
        : [...completedLessonIds, lessonId];
      return { ...prev, [courseId]: updatedLessonIds };
    });
  }

  const progressByCourseId = useMemo<Record<string, number>>(() => {
    const result: Record<string, number> = {};
    for (const course of courses) {
      const total = getTotalLessonCount(course);
      const completed = completedByCourse[course.id]?.length ?? 0;
      result[course.id] = total === 0 ? 0 : Math.round((completed / total) * 100);
    }
    return result;
  }, [completedByCourse]);

  return { progressByCourseId, isLessonComplete, toggleLesson };
}
