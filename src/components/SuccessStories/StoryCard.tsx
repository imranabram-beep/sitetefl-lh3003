interface StoryCardProps {
  story: {
    id: number;
    name: string;
    location: string;
    role: string;
    quote: string;
    outcome: string;
    course: string;
    image: string;
  };
  isActive: boolean;
}

/**
 * StoryCard Component - Individual success story card
 * Shows student testimonial with smooth transitions
 */
export function StoryCard({ story, isActive }: StoryCardProps) {
  return (
    <div
      className={`success-stories-card ${isActive ? "active" : ""}`}
      style={{
        opacity: isActive ? 1 : 0.3,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {/* Image/Avatar Placeholder */}
      <div className="success-stories-card-image-placeholder">
        {story.image.startsWith('/') ? (
          <img
            src={story.image}
            alt={story.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        ) : (
          <div className="success-stories-card-image-content">{story.image}</div>
        )}
      </div>

      {/* Content */}
      <div className="success-stories-card-content">
        <div className="success-stories-card-course">{story.course}</div>
        <div className="success-stories-card-outcome">{story.outcome}</div>

        <blockquote className="success-stories-card-quote">"{story.quote}"</blockquote>

        <div className="success-stories-card-author">
          <strong>{story.name}</strong>
          <span>{story.location}</span>
          <span>{story.role}</span>
        </div>
      </div>
    </div>
  );
}
