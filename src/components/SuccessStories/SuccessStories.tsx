"use client";

import { useStoryCarousel } from "@/lib/hooks/useStoryCarousel";
import "./SuccessStories.css";
import { StoryCard } from "./StoryCard";

interface Story {
  id: number;
  name: string;
  location: string;
  role: string;
  quote: string;
  outcome: string;
  course: string;
  image: string;
}

/**
 * SuccessStories Component - Carousel of graduate testimonials
 * Auto-rotates every 7 seconds, pauses on hover
 */
export function SuccessStories() {
  const stories: Story[] = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Bangkok, Thailand",
      role: "Primary school teacher",
      quote:
        "I went from zero teaching experience to landing a role in Bangkok within 3 weeks of getting certified. The job support team emailed schools on my behalf — that was the difference.",
      outcome: "Hired in 3 weeks",
      course: "120-HOUR PREMIER",
      image: "/images/Landing/SuccessStories/PriyaSS.svg",
    },
    {
      id: 2,
      name: "Amir Halim",
      location: "Kuala Lumpur, Malaysia",
      role: "Online English tutor",
      quote:
        "Coming from Malaysia, I was nervous about teaching online. The 30-hour course gave me a real structure for building lessons. I now have 18 regular students on iTalki.",
      outcome: "18 regular students",
      course: "30-HR ONLINE COURSE",
      image: "/images/Landing/SuccessStories/AmirSS.svg",
    },
    {
      id: 3,
      name: "Mei Lin",
      location: "Ho Chi Minh City, Vietnam",
      role: "Language centre teacher",
      quote:
        "I studied while working full time and finished in 6 weeks. The methodology units were genuinely excellent — very practical. My centre uses techniques I learned directly from the course.",
      outcome: "Promoted in 4 months",
      course: "168-HR LEVEL 5 DIPLOMA",
      image: "/images/Landing/SuccessStories/MeiSS.svg",
    },
  ];

  const carousel = useStoryCarousel(stories.length, 7000);

  return (
    <section className="success-stories">
      <div className="success-stories-container">
        <div className="success-stories-header">
          <h2 className="success-stories-title">Real Stories. Real Impact.</h2>
          <p className="success-stories-subtitle">Hear from our graduates thriving worldwide.</p>
        </div>

        {/* Carousel Wrapper */}
        <div
          className="success-stories-carousel-wrapper"
          onMouseEnter={carousel.onHover}
          onMouseLeave={carousel.onLeave}
        >
          {/* Navigation - Previous */}
          <button
            onClick={carousel.prev}
            className="success-stories-nav success-stories-nav--prev"
            aria-label="Previous story"
          >
            ←
          </button>

          {/* Stories Container */}
          <div className="success-stories-carousel">
            {stories.map((story, idx) => (
              <StoryCard
                key={story.id}
                story={story}
                isActive={idx === carousel.currentIndex}
              />
            ))}
          </div>

          {/* Navigation - Next */}
          <button
            onClick={carousel.next}
            className="success-stories-nav success-stories-nav--next"
            aria-label="Next story"
          >
            →
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="success-stories-indicators">
          {stories.map((_, idx) => (
            <button
              key={idx}
              className={`success-stories-indicator ${
                idx === carousel.currentIndex ? "active" : ""
              }`}
              onClick={() => carousel.goToStory(idx)}
              aria-label={`Go to story ${idx + 1}`}
              aria-current={idx === carousel.currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
