// Drip unlock logic
// A student must complete each module in order before the next one unlocks.
// The "current" module is the first one they haven't completed yet.

import type { Course } from "./data";
import { makeKey } from "@/hooks/useProgress";

export type ModuleStatus = "completed" | "current" | "locked";

export type DripEntry = {
  courseSlug: string;
  unitSlug: string;
  moduleSlug: string;
  key: string;
  status: ModuleStatus;
};

/**
 * Returns a map of compositeKey -> ModuleStatus for every module in a course.
 *
 * Rules:
 *  - completed  → student has marked this module done
 *  - current    → first incomplete module (the one they should do next)
 *  - locked     → any module after the current one
 */
export function getDripStatuses(
  course: Course,
  completedKeys: string[],
): Record<string, ModuleStatus> {
  const statuses: Record<string, ModuleStatus> = {};
  let foundCurrent = false;

  for (const unit of course.units) {
    for (const mod of unit.modules) {
      const key = makeKey(course.slug, unit.slug, mod.slug);

      if (completedKeys.includes(key)) {
        statuses[key] = "completed";
      } else if (!foundCurrent) {
        statuses[key] = "current"; // first incomplete = unlocked/active
        foundCurrent = true;
      } else {
        statuses[key] = "locked";
      }
    }
  }

  return statuses;
}

/**
 * Returns the status of a single module.
 */
export function getModuleStatus(
  course: Course,
  unitSlug: string,
  moduleSlug: string,
  completedKeys: string[],
): ModuleStatus {
  const statuses = getDripStatuses(course, completedKeys);
  const key = makeKey(course.slug, unitSlug, moduleSlug);
  return statuses[key] ?? "locked";
}
