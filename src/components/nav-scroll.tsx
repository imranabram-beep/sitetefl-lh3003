"use client";

import { useEffect } from "react";

/**
 * NavScroll — adds .nav-scrolled to the site-header when user scrolls
 * past 20px. Pure CSS handles the visual transition.
 * Zero deps, ~200 bytes minified.
 */
export function NavScroll() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const update = () => {
      if (window.scrollY > 20) {
        header.classList.add("nav-scrolled");
      } else {
        header.classList.remove("nav-scrolled");
      }
    };

    // Run on mount (handles page refresh mid-scroll)
    update();

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return null;
}
