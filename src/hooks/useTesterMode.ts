"use client";

import { useEffect, useState } from "react";

const KEY = "tefl-tester-mode";

export function useTesterMode() {
  const [enabled, setEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem(KEY) === "true");
    setIsLoaded(true);
  }, []);

  function toggle() {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(KEY, String(next));
      return next;
    });
  }

  return { enabled, isLoaded, toggle };
}
