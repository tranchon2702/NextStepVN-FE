"use client";

import { useEffect } from "react";

export default function HeaderScrollEffect() {
  useEffect(() => {
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;

      const currentScrollY = window.scrollY;
      
      // Add scrolled class when scrolled down
      if (currentScrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide header
        header.classList.add("header-hidden");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header immediately
        header.classList.remove("header-hidden");
      }

      lastScrollY = currentScrollY;
    };

    // Set initial state
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Retry finding header after components load
    const timeout = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return null; // This component doesn't render anything
}
