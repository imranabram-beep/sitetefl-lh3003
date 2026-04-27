"use client";

import { useEffect, useState } from "react";
import type { Progress } from "./progress";

const STORAGE_KEY = "tefl_progress";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage:", error);
      setProgress({});
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProgress = (updated: Progress) => {
    setProgress(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save progress to localStorage:", error);
    }
  };

  const ensureModuleExists = (
    current: Progress,
    courseSlug: string,
    unitSlug: string,
    moduleSlug: string,
  ) => {
    if (!current[courseSlug]) {
      current[courseSlug] = {};
    }

    if (!current[courseSlug][unitSlug]) {
      current[courseSlug][unitSlug] = {};
    }

    if (!current[courseSlug][unitSlug][moduleSlug]) {
      current[courseSlug][unitSlug][moduleSlug] = {
        completed: false,
        quizPassed: false,
      };
    }
  };

  const markLessonComplete = (
    courseSlug: string,
    unitSlug: string,
    moduleSlug: string,
  ) => {
    const updated: Progress = structuredClone(progress);

    ensureModuleExists(updated, courseSlug, unitSlug, moduleSlug);
    updated[courseSlug][unitSlug][moduleSlug].completed = true;

    saveProgress(updated);
  };

  const markQuizPassed = (
    courseSlug: string,
    unitSlug: string,
    moduleSlug: string,
  ) => {
    const updated: Progress = structuredClone(progress);

    ensureModuleExists(updated, courseSlug, unitSlug, moduleSlug);
    updated[courseSlug][unitSlug][moduleSlug].quizPassed = true;

    saveProgress(updated);
  };

  const markLessonIncomplete = (
    courseSlug: string,
    unitSlug: string,
    moduleSlug: string,
  ) => {
    const updated: Progress = structuredClone(progress);

    ensureModuleExists(updated, courseSlug, unitSlug, moduleSlug);
    updated[courseSlug][unitSlug][moduleSlug].completed = false;

    saveProgress(updated);
  };

  const markQuizUnpassed = (
    courseSlug: string,
    unitSlug: string,
    moduleSlug: string,
  ) => {
    const updated: Progress = structuredClone(progress);

    ensureModuleExists(updated, courseSlug, unitSlug, moduleSlug);
    updated[courseSlug][unitSlug][moduleSlug].quizPassed = false;

    saveProgress(updated);
  };

  const resetProgress = () => {
    setProgress({});

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to reset progress in localStorage:", error);
    }
  };

  const getModuleProgress = (
    courseSlug: string,
    unitSlug: string,
    moduleSlug: string,
  ) => {
    return (
      progress[courseSlug]?.[unitSlug]?.[moduleSlug] ?? {
        completed: false,
        quizPassed: false,
      }
    );
  };

  return {
    progress,
    isLoaded,
    markLessonComplete,
    markQuizPassed,
    markLessonIncomplete,
    markQuizUnpassed,
    resetProgress,
    getModuleProgress,
  };
}