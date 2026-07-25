import { motion } from "framer-motion";

const POINTS = [
  {
    title: "Precision manufacturing",
    body: "Every section, sheet and bar is rolled, cut and finished to tight tolerances, verified against IS / ASTM specifications before it leaves the mill.",
  },
  {
    title: "Full-spectrum inventory",
    body: "Structural steel, pipes, sheets, coils and bars held in depth — so large projects don't stall waiting on a single missing size.",
  },
  {
    title: "Custom fabrication",
    body: "In-house cutting, drilling and welding turn raw stock into project-ready components matched to your drawings.",
  },
];

const STATS: [string, string][] = [
  ["18+", "Years in steel trade"],
  ["120K+", "Tonnes shipped / yr"],
  ["99.3%", "On-time delivery rate"],
];

export default function Overview() {
  return (
    <section className="section" id="overview">
      <div className="container" style={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Who we are
          </span>
          <h2 className="h2" style={{ marginTop: 18, maxWidth: 680, marginInline: "auto" }}>
            Steel infrastructure for builders who can't afford delays.
          </h2>
          <p className="lede" style={{ marginTop: 20, maxWidth: 560, marginInline: "auto" }}>
            We manufacture and trade high-quality steel products for
            residential, commercial and industrial construction — supplying
            contractors, architects, engineers, infrastructure companies and
            manufacturers with material they can plan a schedule around.
          </p>
        </motion.div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 56,
            marginTop: 56,
            flexWrap: "wrap",
          }}
        >
          {STATS.map(([n, l]) => (
            <div key={l}>
              <div className="numeral" style={{ fontSize: 32, fontWeight: 550 }}>
                {n}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-faint)", marginTop: 6 }}>
                {l}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginTop: 64,
            textAlign: "left",
          }}
          className="overview-grid"
        >
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card"
              style={{ padding: "30px 28px" }}
            >
              <div
                className="mono"
                style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 14 }}
              >
                0{i + 1}
              </div>
              <h3 className="h3">{p.title}</h3>
              <p style={{ color: "var(--text-dim)", marginTop: 10, lineHeight: 1.6, fontSize: 15 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .overview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
