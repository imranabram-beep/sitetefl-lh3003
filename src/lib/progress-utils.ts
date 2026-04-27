import type { Course } from "./data";
import type { Progress } from "./progress";

export function isModuleFullyComplete(
  progress: Progress,
  courseSlug: string,
  unitSlug: string,
  moduleSlug: string,
) {
  const moduleProgress = progress[courseSlug]?.[unitSlug]?.[moduleSlug];

  return Boolean(moduleProgress?.completed && moduleProgress?.quizPassed);
}

export function getUnitProgress(
  course: Course,
  unitSlug: string,
  progress: Progress,
) {
  const unit = course.units.find((item) => item.slug === unitSlug);

  if (!unit) {
    return {
      completedModules: 0,
      totalModules: 0,
      percent: 0,
    };
  }

  const totalModules = unit.modules.length;

  if (totalModules === 0) {
    return {
      completedModules: 0,
      totalModules: 0,
      percent: 0,
    };
  }

  const completedModules = unit.modules.filter((module) =>
    isModuleFullyComplete(progress, course.slug, unit.slug, module.slug),
  ).length;

  return {
    completedModules,
    totalModules,
    percent: Math.round((completedModules / totalModules) * 100),
  };
}

export function getCourseProgress(course: Course, progress: Progress) {
  let totalModules = 0;
  let completedModules = 0;

  course.units.forEach((unit) => {
    unit.modules.forEach((module) => {
      totalModules += 1;

      if (
        isModuleFullyComplete(progress, course.slug, unit.slug, module.slug)
      ) {
        completedModules += 1;
      }
    });
  });

  if (totalModules === 0) {
    return {
      completedModules: 0,
      totalModules: 0,
      percent: 0,
    };
  }

  return {
    completedModules,
    totalModules,
    percent: Math.round((completedModules / totalModules) * 100),
  };
}