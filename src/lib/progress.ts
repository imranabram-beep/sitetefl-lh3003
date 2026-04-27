export type ModuleProgress = {
  completed: boolean;
  quizPassed: boolean;
};

export type Progress = {
  [courseSlug: string]: {
    [unitSlug: string]: {
      [moduleSlug: string]: ModuleProgress;
    };
  };
};