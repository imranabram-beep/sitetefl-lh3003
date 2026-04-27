import Link from "next/link";
import "./PathfinderCard.css";

interface PathfinderCardProps {
  path: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    href: string;
  };
}

/**
 * PathfinderCard Component - Individual teaching path card
 * Clickable card with hover animations
 */
export function PathfinderCard({ path }: PathfinderCardProps) {
  return (
    <Link href={path.href} className="pathfinder-card">
      {/* Icon/Illustration */}
      <div className="pathfinder-card-icon-wrapper">
        <img
          src={path.image}
          alt={path.title}
          className="pathfinder-card-image"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="pathfinder-card-content">
        <h3 className="pathfinder-card-title">{path.title}</h3>
        <p className="pathfinder-card-description">{path.description}</p>

        {/* Tags */}
        <div className="pathfinder-card-tags">
          {path.tags.map((tag) => (
            <span key={tag} className="pathfinder-card-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className="pathfinder-card-arrow" aria-hidden="true">
        →
      </div>
    </Link>
  );
}
