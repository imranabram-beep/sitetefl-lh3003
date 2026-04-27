"use client";

import { useEffect, useState } from "react";

// v2 key — uses composite "course:unit:module" keys so two courses
// with a module of the same slug never collide.
const STORAGE_KEY = "tefl-progress-v2";

type ProgressState = {
  completed: string[]; // composite keys: "courseSlug:unitSlug:moduleSlug"
  quizPassed: string[]; // same format
};

export function makeKey(courseSlug: string, unitSlug: string, moduleSlug: string) {
  return `${courseSlug}:${unitSlug}:${moduleSlug}`;
}

function safeParseProgress(value: string | null): ProgressState {
  if (!value) return { completed: [], quizPassed: [] };
  try {
    const parsed = JSON.parse(value);
    return {
      completed: Array.isArray(parsed?.completed) ? parsed.completed : [],
      quizPassed: Array.isArray(parsed?.quizPassed) ? parsed.quizPassed : [],
    };
  } catch {
    return { completed: [], quizPassed: [] };
  }
}

export function useProgress() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    completed: [],
    quizPassed: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setProgress(safeParseProgress(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress, isLoaded]);

  function markLessonComplete(courseSlug: string, unitSlug: string, moduleSlug: string) {
    const key = makeKey(courseSlug, unitSlug, moduleSlug);
    setProgress((prev) => {
      if (prev.completed.includes(key)) return prev;
      return { ...prev, completed: [...prev.completed, key] };
    });
  }

  const markModuleComplete = markLessonComplete;

  function markQuizPassed(courseSlug: string, unitSlug: string, moduleSlug: string) {
    const key = makeKey(courseSlug, unitSlug, moduleSlug);
    setProgress((prev) => {
      if (prev.quizPassed.includes(key)) return prev;
      return { ...prev, quizPassed: [...prev.quizPassed, key] };
    });
  }

  function isCompleted(courseSlug: string, unitSlug: string, moduleSlug: string) {
    return progress.completed.includes(makeKey(courseSlug, unitSlug, moduleSlug));
  }

  function isQuizPassed(courseSlug: string, unitSlug: string, moduleSlug: string) {
    return progress.quizPassed.includes(makeKey(courseSlug, unitSlug, moduleSlug));
  }

  function getModuleProgress(courseSlug: string, unitSlug: string, moduleSlug: string) {
    const completed = isCompleted(courseSlug, unitSlug, moduleSlug);
    return {
      completed,
      lessonCompleted: completed,
      quizPassed: isQuizPassed(courseSlug, unitSlug, moduleSlug),
    };
  }

  return {
    isLoaded,
    progress,
    completedKeys: progress.completed,
    markLessonComplete,
    markModuleComplete,
    markQuizPassed,
    isCompleted,
    isQuizPassed,
    getModuleProgress,
  };
}
