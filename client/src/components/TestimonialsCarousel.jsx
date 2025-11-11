import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "CogniVault feels like a creative partner — it recalls the narrative behind every product decision instantly.",
    name: "Sarah Levi",
    title: "Product Lead · Paris",
    avatar: "/assets/avatar-sarah.png",
  },
  {
    quote:
      "It’s the only workspace where research, transcripts, and experiments stay searchable. The graph view is unreal.",
    name: "Levi Fisher",
    title: "Research Director · Toronto",
    avatar: "/assets/avatar-levi.png",
  },
  {
    quote:
      "Within a week it became our institutional memory. Onboarding, retros, investor updates — everything is connected.",
    name: "Amelia Trinh",
    title: "Founder · Singapore",
    avatar: "/assets/avatar-amelia.png",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((idx) => (idx - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setCurrent((idx) => (idx + 1) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="container testimonials-inner">
        <div className="testimonials-header">
          <h2>Trusted by teams who can’t forget.</h2>
          <div className="pagination">
            <button type="button" onClick={prev} aria-label="Previous testimonial">
              ←
            </button>
            <button type="button" onClick={next} aria-label="Next testimonial">
              →
            </button>
          </div>
        </div>

        <div className="testimonials-track">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="testimonial-card"
            >
              <div className="testimonial-quote">“</div>
              <p className="testimonial-text">{testimonials[current].quote}</p>
              <div className="testimonial-person">
                <div className="avatar">
                  <span>{testimonials[current].name.split(" ")[0][0]}</span>
                </div>
                <div>
                  <div className="person-name">{testimonials[current].name}</div>
                  <div className="person-title">{testimonials[current].title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-thumbs">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`thumb ${current === index ? "active" : ""}`}
                onClick={() => setCurrent(index)}
                aria-label={`Show testimonial from ${item.name}`}
              >
                <span>{item.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


