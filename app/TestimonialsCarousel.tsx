"use client";

import { useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const visibleTestimonials = [0, 1, 2].map(
    (offset) => testimonials[(activeIndex + offset) % testimonials.length],
  );

  const goTo = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  return (
    <div
      className="testimonial-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Professional recommendations"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(activeIndex - 1);
        if (event.key === "ArrowRight") goTo(activeIndex + 1);
      }}
      onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 50) goTo(activeIndex + (distance < 0 ? 1 : -1));
        setTouchStart(null);
      }}
    >
      <div className="testimonial-card-grid" aria-live="polite">
        {visibleTestimonials.map((testimonial, offset) => (
          <figure className="testimonial-card" key={`${activeIndex}-${testimonial.name}`}>
            <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.title}</span>
            </figcaption>
            <span className="testimonial-card-number" aria-hidden="true">
              {String(((activeIndex + offset) % testimonials.length) + 1).padStart(2, "0")}
            </span>
          </figure>
        ))}
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots" aria-label="Choose a recommendation">
          {testimonials.map((testimonial, index) => (
            <button
              className={index === activeIndex ? "active" : ""}
              type="button"
              key={testimonial.name}
              aria-label={`Start with recommendation ${index + 1} from ${testimonial.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Previous recommendations" onClick={() => goTo(activeIndex - 1)}>&larr;</button>
          <button type="button" aria-label="Next recommendations" onClick={() => goTo(activeIndex + 1)}>&rarr;</button>
        </div>
      </div>
      <p className="carousel-hint">Use arrows, keyboard keys, dots, or swipe to browse all recommendations.</p>
    </div>
  );
}