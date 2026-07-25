import { motion } from "framer-motion";
import { useHorizontalScrollCards } from "../hooks/useHorizontalScrollCards";
import ScrollPager from "./ScrollPager";

const PILLARS = [
  {
    n: "01",
    title: "Quality",
    body: "Every batch is tested against IS / ASTM standards with full material traceability from mill to site, so specs on paper match steel in hand.",
  },
  {
    n: "02",
    title: "Strength",
    body: "Grades and sections selected and verified for the load conditions your structural design demands, backed by mill test certificates.",
  },
  {
    n: "03",
    title: "Precision",
    body: "Tight tolerances on cutting, drilling and fabrication mean components fit right the first time — no rework, no site delays.",
  },
  {
    n: "04",
    title: "Reliability",
    body: "Deep, diversified inventory across product lines protects your project from single-point supply failures when a size or grade runs short elsewhere.",
  },
  {
    n: "05",
    title: "Timely delivery",
    body: "Logistics planned against your construction schedule, with real-time dispatch tracking from mill to gate.",
  },
  {
    n: "06",
    title: "Service",
    body: "A dedicated account team that speaks the language of specs, drawings and site deadlines — not just price lists.",
  },
];

export default function WhyUs() {
  const { sectionRef, cardWidth, viewportWidth, gap, scrollDistance, x, index, goTo } =
    useHorizontalScrollCards(PILLARS.length, 860);

  return (
    <section
      id="why"
      ref={sectionRef}
      style={{
        position: "relative",
        height: `calc(100vh + ${scrollDistance}px)`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: 88,
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Why Apex Steel
          </span>
          <h2 className="h2" style={{ marginTop: 18, maxWidth: 620, marginInline: "auto" }}>
            Built on the fundamentals of steel supply.
          </h2>
        </div>

        <div
          style={{
            overflow: "hidden",
            width: viewportWidth,
            maxWidth: "92vw",
            marginInline: "auto",
            marginTop: 40,
          }}
        >
          <motion.div style={{ display: "flex", gap, x }}>
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="card"
                style={{
                  padding: "44px 40px",
                  width: cardWidth,
                  minHeight: 420,
                  flexShrink: 0,
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="mono" style={{ fontSize: 12, color: "var(--text-faint)" }}>
                  {p.n}
                </div>
                <h3 className="h3" style={{ marginTop: 18, fontSize: 30 }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--text-dim)", marginTop: 18, lineHeight: 1.7, fontSize: 16.5, maxWidth: 480 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <ScrollPager
          index={index}
          count={PILLARS.length}
          onPrev={() => goTo(index - 1)}
          onNext={() => goTo(index + 1)}
        />
      </div>
    </section>
  );
}
