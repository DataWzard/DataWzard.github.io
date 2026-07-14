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
  const active = testimonials[activeIndex];

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
      <div className="testimonial-slide" aria-live="polite">
        <div className="testimonial-marker" aria-hidden="true">
          <span>“</span>
          <p>{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</p>
        </div>
        <figure key={active.name}>
          <blockquote>{active.quote}</blockquote>
          <figcaption>
            <strong>{active.name}</strong>
            <span>{active.title}</span>
          </figcaption>
        </figure>
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots" aria-label="Choose a recommendation">
          {testimonials.map((testimonial, index) => (
            <button
              className={index === activeIndex ? "active" : ""}
              type="button"
              key={testimonial.name}
              aria-label={`Show recommendation ${index + 1} from ${testimonial.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Previous recommendation" onClick={() => goTo(activeIndex - 1)}>←</button>
          <button type="button" aria-label="Next recommendation" onClick={() => goTo(activeIndex + 1)}>→</button>
        </div>
      </div>
      <p className="carousel-hint">Use arrows, keyboard keys, dots, or swipe to browse all recommendations.</p>
    </div>
  );
}