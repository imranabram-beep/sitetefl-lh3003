"use client";

import { useEffect, useState } from "react";

const KEY = "tefl-enrolments";

export function useEnrolment() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [enrolled, setEnrolled] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      setEnrolled(saved ? (JSON.parse(saved) as string[]) : []);
    } catch {
      setEnrolled([]);
    }
    setIsLoaded(true);
  }, []);

  function enrol(courseSlug: string) {
    setEnrolled((prev) => {
      if (prev.includes(courseSlug)) return prev;
      const next = [...prev, courseSlug];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }

  function isEnrolled(courseSlug: string) {
    return enrolled.includes(courseSlug);
  }

  return { isLoaded, enrolled, enrol, isEnrolled };
}
