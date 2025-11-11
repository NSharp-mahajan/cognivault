import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Understanding",
    icon: "🤖",
    desc: "CogniVault reads every artifact semantically — from PDFs to audio transcripts.",
    meta: ["Multilingual comprehension", "Custom ontologies"],
  },
  {
    title: "Private & Encrypted Vault",
    icon: "🔒",
    desc: "Edge-encrypted syncing with hardware key support keeps your memories sovereign.",
    meta: ["Zero-knowledge encryption", "Audit logging"],
  },
  {
    title: "Knowledge Graph Visualization",
    icon: "🕸️",
    desc: "Explore living constellations of projects, people, and decisions as they emerge.",
    meta: ["Temporal graph replay", "Layered filters"],
  },
  {
    title: "Insights & Analytics Dashboard",
    icon: "📊",
    desc: "Receive weekly narrative briefs, trend alerts, and focus suggestions.",
    meta: ["Automated summaries", "Momentum tracking"],
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="feature-grid">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Features that feel like magic
        </motion.h2>

        <div className="grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-tile glass"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
              <div className="feature-meta">
                {f.meta.map((tag) => (
                  <span key={tag} className="feature-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


