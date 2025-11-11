import { motion } from "framer-motion";
import { useCallback } from "react";

const steps = [
  { title: "Upload", desc: "Add your notes, documents, and thoughts to your personal vault.", icon: "📤" },
  { title: "Connect", desc: "AI links related memories and grows your knowledge graph.", icon: "🔗" },
  { title: "Recall", desc: "Chat with your memories and discover insights instantly.", icon: "💭" },
];

export default function HowItWorks() {
  const handleMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }, []);

  return (
    <section className="how-it-works">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How CogniVault Works
        </motion.h2>
        <div className="works-grid">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              className="work-card glass card-tilt"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              onMouseMove={handleMove}
            >
              <div className="work-icon">{s.icon}</div>
              <h3 className="work-title">{s.title}</h3>
              <p className="work-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


