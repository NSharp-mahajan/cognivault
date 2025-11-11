import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import FeatureGrid from "../components/FeatureGrid";
import ExperienceSection from "../components/ExperienceSection";
import HowItWorks from "../components/HowItWorks";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import "../styles/landing.css";

export default function LandingPage() {
  const glowRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      ref={glowRef}
    >
      <HeroSection />

      {/* Vision Statement */}
      <section id="about" className="vision">
        <div className="container vision-wrap">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="h1" style={{ marginTop: 0, marginBottom: 16 }}>
              A second brain that learns and grows with you.
            </h2>
            <p className="subtitle" style={{ marginTop: 0, marginBottom: 28 }}>
              CogniVault is a living archive of your knowledge. It watches the threads between every
              note, voice memo, article, and meeting recap — then illuminates the moments you need in
              an instant.
            </p>
            <div className="vision-highlights">
              {[
                {
                  heading: "Remember the why",
                  body: "Map ideas to decisions, sources, and people so context is never lost.",
                },
                {
                  heading: "Surface hidden patterns",
                  body: "Our AI surfaces cross-topic insights and timelines you didn’t know existed.",
                },
                {
                  heading: "Trust the vault",
                  body: "Zero-knowledge encryption keeps every memory private, synced across devices.",
                },
              ].map((item) => (
                <div key={item.heading} className="vision-card glass">
                  <span className="vision-dot" />
                  <div>
                    <h3>{item.heading}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="vision-metrics"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {[
              { label: "Files understood", value: "2.4M+" },
              { label: "Conversations answered", value: "89K" },
              { label: "Context retrieval speed", value: "0.6s" },
            ].map((metric) => (
              <div key={metric.label} className="metric-card neon glass">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <HowItWorks />

      <ExperienceSection />

      <FeatureGrid />

      <TestimonialsCarousel />
    </motion.main>
  );
}

