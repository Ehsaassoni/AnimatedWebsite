import { Suspense } from "react";
import { motion } from "framer-motion";
import ProcessScene from "../three/ProcessScene";

const STEPS = [
  { n: "01", title: "Spec & Quote", body: "Share drawings or specs — we quote grades, sections and lead times within 24 hours." },
  { n: "02", title: "Source & Test", body: "Material is sourced or rolled to spec and quality-tested before it's allocated to your order." },
  { n: "03", title: "Fabricate", body: "If needed, we cut, drill and weld to your exact dimensions in-house." },
  { n: "04", title: "Deliver", body: "Dispatched on a schedule built around your site timeline, tracked door to door." },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div style={{ maxWidth: 620, marginInline: "auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            How it works
          </span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            From spec sheet to site, in four steps.
          </h2>
        </div>

        <div
          className="card"
          style={{
            height: 180,
            marginTop: 48,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Suspense fallback={null}>
            <ProcessScene />
          </Suspense>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 40,
            position: "relative",
          }}
          className="process-grid"
        >
          <div
            style={{
              position: "absolute",
              top: 11,
              left: "12.5%",
              right: "12.5%",
              height: 1,
              background: "var(--line)",
            }}
            className="process-line"
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: "#fff",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {i + 1}
              </div>
              <h3 className="h3" style={{ marginTop: 20, fontSize: 18 }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--text-dim)", marginTop: 8, lineHeight: 1.6, fontSize: 14.5 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 40px !important; }
          .process-line { display: none; }
        }
        @media (max-width: 520px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
