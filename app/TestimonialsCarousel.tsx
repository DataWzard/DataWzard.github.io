"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 720px)");
    const tabletQuery = window.matchMedia("(max-width: 980px)");

    const updateVisibleCount = () => {
      const nextCount = mobileQuery.matches ? 1 : tabletQuery.matches ? 2 : 3;
      setVisibleCount(nextCount);
      setActivePage(0);
    };

    updateVisibleCount();
    mobileQuery.addEventListener("change", updateVisibleCount);
    tabletQuery.addEventListener("change", updateVisibleCount);

    return () => {
      mobileQuery.removeEventListener("change", updateVisibleCount);
      tabletQuery.removeEventListener("change", updateVisibleCount);
    };
  }, []);

  const pageCount = Math.ceil(testimonials.length / visibleCount);
  const startIndex = activePage * visibleCount;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + visibleCount);

  const movePage = (amount: number) => {
    setActivePage((current) => (current + amount + pageCount) % pageCount);
  };

  const goToPage = (page: number) => {
    if (page === activePage) return;
    setActivePage(page);
  };

  return (
    <div
      className="testimonial-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Professional recommendations"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") movePage(-1);
        if (event.key === "ArrowRight") movePage(1);
      }}
      onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 50) movePage(distance < 0 ? 1 : -1);
        setTouchStart(null);
      }}
    >
      <div
        className="testimonial-card-grid"
        key={`${visibleCount}-${activePage}`}
        aria-live="polite"
      >
        {visibleTestimonials.map((testimonial, offset) => (
          <figure
            className="testimonial-card animate__animated animate__jello"
            key={`${startIndex}-${offset}-${testimonial.name}`}
            style={{ animationDelay: `${offset * 80}ms` }}
          >
            <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.title}</span>
            </figcaption>
            <span className="testimonial-card-number" aria-hidden="true">
              {String(startIndex + offset + 1).padStart(2, "0")}
            </span>
          </figure>
        ))}
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots" aria-label="Choose a recommendation group">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              className={page === activePage ? "active" : ""}
              type="button"
              key={page}
              aria-label={`Show recommendation group ${page + 1} of ${pageCount}`}
              aria-current={page === activePage ? "true" : undefined}
              onClick={() => goToPage(page)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Previous recommendation group" onClick={() => movePage(-1)}>&larr;</button>
          <button type="button" aria-label="Next recommendation group" onClick={() => movePage(1)}>&rarr;</button>
        </div>
      </div>
      <p className="carousel-hint">Each step replaces the visible set. Use arrows, keyboard keys, dots, or swipe.</p>
    </div>
  );
}