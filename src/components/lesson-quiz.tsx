"use client";

import { useMemo, useState } from "react";
import type { LessonActivity, ActivityOption } from "@/lib/data";

type LessonQuizProps = {
  activity: LessonActivity;
  onPass?: () => void;
};

export function LessonQuiz({ activity, onPass }: LessonQuizProps) {
  if (activity.type === "quiz_multiple_choice") {
    return <MultipleChoiceQuiz activity={activity} onPass={onPass} />;
  }

  if (activity.type === "quiz_true_false") {
    return <TrueFalseQuiz activity={activity} onPass={onPass} />;
  }

  if (activity.type === "activity_dropdown") {
    return <DropdownActivity activity={activity} />;
  }

  if (activity.type === "activity_click_reveal") {
    return <ClickRevealActivity activity={activity} />;
  }

  return null;
}

function MultipleChoiceQuiz({
  activity,
  onPass,
}: {
  activity: Extract<LessonActivity, { type: "quiz_multiple_choice" }>;
  onPass?: () => void;
}) {
  const questions = activity.questions;
  const passPercent = activity.passPercent ?? 80;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [passTriggered, setPassTriggered] = useState(false);

  const currentQuestion = questions[currentIndex];
  const passMark = Math.ceil((questions.length * passPercent) / 100);

  function handleNext() {
    if (!selectedAnswerId) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedAnswerId;
    setAnswers(updatedAnswers);

    if (currentIndex === questions.length - 1) {
      const finalScore = questions.reduce((total, question, index) => {
        return total + (updatedAnswers[index] === question.correctAnswerId ? 1 : 0);
      }, 0);

      setFinished(true);

      if (finalScore >= passMark && onPass && !passTriggered) {
        onPass();
        setPassTriggered(true);
      }
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedAnswerId(updatedAnswers[nextIndex] ?? "");
  }

  function handlePrevious() {
    if (currentIndex === 0) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedAnswerId;
    setAnswers(updatedAnswers);

    const previousIndex = currentIndex - 1;
    setCurrentIndex(previousIndex);
    setSelectedAnswerId(updatedAnswers[previousIndex] ?? "");
  }

  function handleRetry() {
    setCurrentIndex(0);
    setSelectedAnswerId("");
    setAnswers([]);
    setFinished(false);
    setPassTriggered(false);
  }

  const finalScore = questions.reduce((total, question, index) => {
    return total + (answers[index] === question.correctAnswerId ? 1 : 0);
  }, 0);

  const passed = finalScore >= passMark;

  return (
    <QuizShell title={activity.title ?? "Quiz"}>
      {!finished ? (
        <>
          <p className="quiz-progress">
            Question {currentIndex + 1} of {questions.length}
          </p>

          <p className="quiz-question">
            <strong>{currentQuestion.question}</strong>
          </p>

          <OptionsList
            options={currentQuestion.options}
            selectedId={selectedAnswerId}
            onSelect={setSelectedAnswerId}
          />

          <QuizNav
            onPrevious={handlePrevious}
            onNext={handleNext}
            previousDisabled={currentIndex === 0}
            nextDisabled={!selectedAnswerId}
            isLast={currentIndex === questions.length - 1}
          />
        </>
      ) : (
        <QuizResults
          finalScore={finalScore}
          total={questions.length}
          passMark={passMark}
          passed={passed}
          onRetry={!passed ? handleRetry : undefined}
        />
      )}
    </QuizShell>
  );
}

function TrueFalseQuiz({
  activity,
  onPass,
}: {
  activity: Extract<LessonActivity, { type: "quiz_true_false" }>;
  onPass?: () => void;
}) {
  const questions = activity.questions;
  const passPercent = activity.passPercent ?? 80;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [passTriggered, setPassTriggered] = useState(false);

  const currentQuestion = questions[currentIndex];
  const passMark = Math.ceil((questions.length * passPercent) / 100);

  function handleNext() {
    if (!selectedAnswer) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    if (currentIndex === questions.length - 1) {
      const finalScore = questions.reduce((total, question, index) => {
        const expected = question.correctAnswer ? "true" : "false";
        return total + (updatedAnswers[index] === expected ? 1 : 0);
      }, 0);

      setFinished(true);

      if (finalScore >= passMark && onPass && !passTriggered) {
        onPass();
        setPassTriggered(true);
      }
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedAnswer(updatedAnswers[nextIndex] ?? "");
  }

  function handlePrevious() {
    if (currentIndex === 0) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    const previousIndex = currentIndex - 1;
    setCurrentIndex(previousIndex);
    setSelectedAnswer(updatedAnswers[previousIndex] ?? "");
  }

  function handleRetry() {
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setFinished(false);
    setPassTriggered(false);
  }

  const finalScore = questions.reduce((total, question, index) => {
    const expected = question.correctAnswer ? "true" : "false";
    return total + (answers[index] === expected ? 1 : 0);
  }, 0);

  const passed = finalScore >= passMark;

  const options: ActivityOption[] = [
    { id: "true", text: "True" },
    { id: "false", text: "False" },
  ];

  return (
    <QuizShell title={activity.title ?? "Quiz"}>
      {!finished ? (
        <>
          <p className="quiz-progress">
            Question {currentIndex + 1} of {questions.length}
          </p>

          <p className="quiz-question">
            <strong>{currentQuestion.question}</strong>
          </p>

          <OptionsList
            options={options}
            selectedId={selectedAnswer}
            onSelect={setSelectedAnswer}
          />

          <QuizNav
            onPrevious={handlePrevious}
            onNext={handleNext}
            previousDisabled={currentIndex === 0}
            nextDisabled={!selectedAnswer}
            isLast={currentIndex === questions.length - 1}
          />
        </>
      ) : (
        <QuizResults
          finalScore={finalScore}
          total={questions.length}
          passMark={passMark}
          passed={passed}
          onRetry={!passed ? handleRetry : undefined}
        />
      )}
    </QuizShell>
  );
}

function DropdownActivity({
  activity,
}: {
  activity: Extract<LessonActivity, { type: "activity_dropdown" }>;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const results = useMemo(() => {
    return activity.questions.map((question) => {
      const chosen = answers[question.id] ?? "";
      const isCorrect = chosen === question.correctAnswerId;
      return { id: question.id, isCorrect };
    });
  }, [activity.questions, answers]);

  function handleChange(questionId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  return (
    <div className="dropdown-activity">
      {activity.title ? <h3>{activity.title}</h3> : null}
      {activity.description ? <p>{activity.description}</p> : null}

      {activity.questions.map((question) => {
        const result = results.find((r) => r.id === question.id);
        const showState = checked && result;

        return (
          <div
            key={question.id}
            className={`dropdown-card ${
              showState ? (result.isCorrect ? "is-correct" : "is-wrong") : ""
            }`}
          >
            <p style={{ marginBottom: "8px" }}>{question.prompt}</p>

            {question.helperText ? (
              <p style={{ marginBottom: "8px", opacity: 0.75 }}>{question.helperText}</p>
            ) : null}

            <select
              value={answers[question.id] ?? ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              <option value="">--Select--</option>
              {question.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              ))}
            </select>

            {checked ? (
              <p className="dropdown-result">
                {result?.isCorrect ? "Correct" : "Not correct"}
              </p>
            ) : null}
          </div>
        );
      })}

      <button
        onClick={() => setChecked(true)}
        className="dropdown-check-button"
      >
        Check answers
      </button>
    </div>
  );
}

function ClickRevealActivity({
  activity,
}: {
  activity: Extract<LessonActivity, { type: "activity_click_reveal" }>;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  function toggleItem(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return (
    <div>
      {activity.title ? <h3>{activity.title}</h3> : null}
      {activity.description ? <p>{activity.description}</p> : null}
      {activity.instruction ? <p>{activity.instruction}</p> : null}

      <div className="click-reveal-grid">
        {activity.items.map((item) => {
          const isSelected = selected.includes(item.id);
          const showCorrect = revealed && item.isCorrect && isSelected;
          const showWrong = revealed && !item.isCorrect && isSelected;

          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              type="button"
              className={`click-reveal-item ${
                showCorrect
                  ? "is-correct"
                  : showWrong
                  ? "is-wrong"
                  : isSelected
                  ? "is-selected"
                  : ""
              }`}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="click-reveal-button"
        >
          Click here to see the answers
        </button>
      ) : (
        <div style={{ fontSize: "14px", opacity: 0.8 }}>
          Correct answers have been highlighted.
        </div>
      )}
    </div>
  );
}

function QuizShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="quiz-shell">
      <h3 className="quiz-heading">{title}</h3>
      {children}
    </div>
  );
}

function OptionsList({
  options,
  selectedId,
  onSelect,
}: {
  options: ActivityOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="quiz-options">
      {options.map((option) => (
        <label
          key={option.id}
          className={`quiz-option ${selectedId === option.id ? "is-selected" : ""}`}
        >
          <input
            type="radio"
            name="option"
            value={option.id}
            checked={selectedId === option.id}
            onChange={() => onSelect(option.id)}
            style={{ margin: 0 }}
          />
          <span className="quiz-option-text">{option.text}</span>
        </label>
      ))}
    </div>
  );
}

function QuizNav({
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  isLast,
}: {
  onPrevious: () => void;
  onNext: () => void;
  previousDisabled: boolean;
  nextDisabled: boolean;
  isLast: boolean;
}) {
  return (
    <div className="quiz-nav">
      <button
        onClick={onPrevious}
        disabled={previousDisabled}
        className="button-secondary"
      >
        Previous
      </button>

      <button onClick={onNext} disabled={nextDisabled}>
        {isLast ? "Submit quiz" : "Next question"}
      </button>
    </div>
  );
}

function QuizResults({
  finalScore,
  total,
  passMark,
  passed,
  onRetry,
}: {
  finalScore: number;
  total: number;
  passMark: number;
  passed: boolean;
  onRetry?: () => void;
}) {
  return (
    <div className="quiz-results">
      <p>
        Your score: {finalScore} / {total}
      </p>
      <p>
        Pass mark: {passMark} / {total} ({Math.round((passMark / total) * 100)}%)
      </p>

      {passed ? (
        <p className="quiz-results-pass">
          Quiz passed. You can now complete this lesson.
        </p>
      ) : (
        <p className="quiz-results-fail">
          You scored below the pass mark. Please retake the quiz.
        </p>
      )}

      {!passed && onRetry ? <button onClick={onRetry}>Retake quiz</button> : null}
    </div>
  );
}