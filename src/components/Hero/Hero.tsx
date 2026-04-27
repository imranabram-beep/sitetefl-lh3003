"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./Hero.css";

/**
 * Hero Component - Premium hero section with rotating background images
 * Full-width hero with dark overlay, white text, and dual CTAs
 */
export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/Landing/Slideshow/hero-slide-1.jpeg",
      location: "Bangkok, Thailand",
      title: "Teach English in Asia.",
      subtitle: "Start Your TEFL Journey.",
      description: "Get certified, earn a competitive salary, and build a life abroad with flexible TEFL courses designed for real job outcomes.",
    },
    {
      image: "/images/Landing/Slideshow/hero-slide-2.jpeg",
      location: "Seoul, South Korea",
      title: "Join 205,000+",
      subtitle: "Teachers Teaching Abroad.",
      description: "Train with a trusted TEFL provider and unlock real teaching opportunities across Thailand, Vietnam, Korea and beyond.",
    },
    {
      image: "/images/Landing/Slideshow/hero-slide-3.jpeg",
      location: "Kuala Lumpur, Malaysia",
      title: "Build a Life You Don't",
      subtitle: "Want to Leave.",
      description: "Competitive salaries, visa support, and a global teaching community ready to help you succeed abroad.",
    },
    {
      image: "/images/Landing/Slideshow/hero-slide-4.jpeg",
      location: "Siem Reap, Cambodia",
      title: "Study Online.",
      subtitle: "Teach Anywhere.",
      description: "Flexible TEFL courses you can complete in weeks, designed around your schedule — not the other way round.",
    },
    {
      image: "/images/Landing/Slideshow/hero-slide-5.jpeg",
      location: "Hanoi, Vietnam",
      title: "Your TEFL certificate.",
      subtitle: "Your ticket to Asia.",
      description: "From classroom-ready training to job placement support — everything you need to start teaching abroad with confidence.",
    },
  ];

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentContent = slides[currentSlide];

  return (
    <section className="hero">
      {/* Background Image with Dark Overlay */}
      <div
        className="hero-background"
        style={{
          backgroundImage: `url('${currentContent.image}')`,
        }}
      />
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-wrapper">
        <div className="hero-glass-card">
          <div className="hero-content">
            {/* Location Label */}
            <div className="hero-location">
            <span className="hero-location-dot" aria-hidden="true" />
            <span className="hero-location-text">{currentContent.location}</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            {currentContent.title}
            <br />
            {currentContent.subtitle}
          </h1>

          <p className="hero-subtitle">
            {currentContent.description}
          </p>

          {/* Dual CTA Buttons */}
          <div className="hero-ctas">
            <Link href="/courses" className="hero-cta hero-cta--primary">
              Start your journey
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M10 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/courses" className="hero-cta hero-cta--secondary">
              Compare courses
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>320+</strong>
              <span>Partner schools</span>
            </div>
            <div className="hero-stat">
              <strong>24 hrs</strong>
              <span>Job support response</span>
            </div>
          </div>
        </div>
          </div>
      </div>
    </section>
  );
}
