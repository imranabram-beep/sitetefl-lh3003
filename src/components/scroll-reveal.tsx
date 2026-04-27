"use client";

import { useEffect } from "react";

const SELECTORS =
  ".reveal, .reveal-stagger, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale";

/**
 * ScrollReveal — SAFE version.
 *
 * Strategy: elements are VISIBLE by default (no opacity:0 in CSS).
 * This component adds class="js-reveal-ready" to <html> on mount,
 * which activates the CSS hiding ONLY when JS is running.
 * Then IntersectionObserver adds .is-visible as elements enter viewport.
 *
 * This means:
 * - SSR / no-JS users always see content
 * - Clerk hydration delay can't block content
 * - Content is never permanently invisible
 */
export function ScrollReveal() {
  useEffect(() => {
    // Step 1: Mark JS as ready — CSS will now activate hiding
    document.documentElement.classList.add("js-reveal-ready");

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    if (!els.length) return;

    // Step 2: Immediately show everything already in viewport
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 50) {
        el.classList.add("is-visible");
        if (el.classList.contains("reveal-stagger")) {
          Array.from(el.children).forEach((c) => c.classList.add("is-visible"));
        }
      }
    });

    // Step 3: Respect reduced motion — show everything, skip observer
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => {
        el.classList.add("is-visible");
        if (el.classList.contains("reveal-stagger")) {
          Array.from(el.children).forEach((c) => c.classList.add("is-visible"));
        }
      });
      return;
    }

    // Step 4: Observe remaining off-screen elements
    const remaining = els.filter((el) => !el.classList.contains("is-visible"));
    if (!remaining.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            if (el.classList.contains("reveal-stagger")) {
              Array.from(el.children).forEach((c) => c.classList.add("is-visible"));
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    remaining.forEach((el) => observer.observe(el));

    // Step 5: Hard fallback — 1.5s max, then show everything
    const fallback = setTimeout(() => {
      els.forEach((el) => {
        el.classList.add("is-visible");
        if (el.classList.contains("reveal-stagger")) {
          Array.from(el.children).forEach((c) => c.classList.add("is-visible"));
        }
      });
    }, 1500);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return null;
}
