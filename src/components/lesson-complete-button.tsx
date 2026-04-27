type LessonCompleteButtonProps = {
  completed?: boolean;
  onClick?: () => void;
};

export function LessonCompleteButton({
  completed = false,
  onClick,
}: LessonCompleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={completed}
      style={{
        marginTop: "12px",
        padding: "10px 16px",
        background: completed ? "#999" : "#0f4c3a",
        color: "#fff",
        borderRadius: "999px",
        border: "none",
        cursor: completed ? "default" : "pointer",
      }}
    >
      {completed ? "Lesson Completed" : "Mark Lesson Complete"}
    </button>
  );
}