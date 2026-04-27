import { useState, useEffect } from "react";

/**
 * Custom hook for carousel auto-rotation
 * Handles automatic story advancement with pause-on-hover functionality
 */
export function useStoryCarousel(totalStories: number, intervalMs: number = 7000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isHovering) return; // Pause when hovering

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalStories);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isHovering, totalStories, intervalMs]);

  // Navigate to specific story
  const goToStory = (index: number) => {
    setCurrentIndex(index % totalStories);
  };

  // Next story
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalStories);
  };

  // Previous story
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalStories) % totalStories);
  };

  return {
    currentIndex,
    goToStory,
    next,
    prev,
    onHover: () => setIsHovering(true),
    onLeave: () => setIsHovering(false),
  };
}
