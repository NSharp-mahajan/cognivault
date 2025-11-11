import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const conversationSamples = [
  {
    from: "You",
    text: "Where did we outline the 2026 product vision?",
  },
  {
    from: "CogniVault",
    text: "You detailed it during the Q4 strategy sync with Mira. Pulling key points and follow-up tasks...",
  },
  {
    from: "CogniVault",
    text: "Connected notes • Product Vision 2026 • Founder Q4 Sync • Market Outlook.pdf",
  },
];

export default function ExperienceSection() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const wrapRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const el = wrapRef.current;
    el?.addEventListener("mousemove", onMove);
    return () => el?.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="experience">
      <div className="container">
        <div className="split glass" ref={wrapRef} style={{ position: "relative", borderRadius: 20, padding: 32 }}>
          <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />

          <motion.div
            className="experience-preview"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="preview-screen">
              <div className="preview-header">
                <span className="status-dot" />
                Live memory chat
              </div>
              <div className="preview-messages">
                {conversationSamples.map((message, index) => (
                  <div
                    key={index}
                    className={`preview-bubble ${message.from === "You" ? "outgoing" : "incoming"}`}
                  >
                    <span className="preview-author">{message.from}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="preview-input">
                Ask CogniVault anything…
              </div>
            </div>
          </motion.div>

          <motion.div
            className="experience-copy"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>Chat with Your Memories.</h2>
            <p className="subtitle" style={{ marginTop: 0, marginBottom: 22 }}>
              Every conversation taps into your private knowledge graph, synthesizing timelines, context,
              and relationships the moment you ask. There’s no need to organize — your vault already knows.
            </p>
            <div className="experience-points">
              {[
                {
                  title: "Natural memory chat",
                  desc: "Converse with a deeply personal assistant that remembers tone, priority, and outcomes.",
                },
                {
                  title: "AI-generated insights",
                  desc: "Weekly memory briefs and intelligent nudges keep projects moving without manual effort.",
                },
                {
                  title: "Personalized graph connections",
                  desc: "See how people, documents, and decisions weave together through living visual maps.",
                },
              ].map((item) => (
                <div key={item.title} className="experience-point">
                  <span className="spark" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="experience-footnote">
              <span className="metric-chip">Memory accuracy 98.4%</span>
              <span className="metric-chip">Latency under 700ms</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


