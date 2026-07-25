import { Suspense, useMemo, useState } from "react";
import { motion } from "framer-motion";
import CoreScene from "../three/CoreScene";
import { useTheme } from "../theme/ThemeContext";
import { getScenePalette } from "../three/palette";

const PILLARS = [
  {
    n: "01",
    title: "Quality",
    body: "Every batch tested against IS / ASTM standards with full material traceability from mill to site.",
  },
  {
    n: "02",
    title: "Strength",
    body: "Grades and sections verified for the load conditions your structural design demands.",
  },
  {
    n: "03",
    title: "Precision",
    body: "Tight tolerances on cutting, drilling and fabrication — components fit right the first time.",
  },
  {
    n: "04",
    title: "Reliability",
    body: "Deep, diversified inventory protects your project from single-point supply failures.",
  },
  {
    n: "05",
    title: "Timely delivery",
    body: "Logistics planned against your construction schedule, tracked from mill to gate.",
  },
  {
    n: "06",
    title: "Service",
    body: "A dedicated account team that speaks the language of specs, drawings and deadlines.",
  },
];

const RADIUS = 38;

function polar(i: number, total: number) {
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

export default function WhyUs() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { theme } = useTheme();
  const palette = useMemo(() => getScenePalette(theme), [theme]);

  return (
    <section className="section" id="why">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Why Apex Steel
        </span>
        <h2 className="h2" style={{ marginTop: 18, maxWidth: 620, marginInline: "auto" }}>
          Six fundamentals. One steel partner.
        </h2>
        <p className="lede" style={{ marginTop: 16, maxWidth: 520, marginInline: "auto" }}>
          Everything we do orbits around a simple core: steel that performs
          exactly as specified, every time.
        </p>
      </div>

      <div
        className="why-orbit"
        style={{
          position: "relative",
          width: "min(760px, 94vw)",
          aspectRatio: "1 / 1",
          marginInline: "auto",
          marginTop: 48,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        >
          {PILLARS.map((p, i) => {
            const { x, y } = polar(i, PILLARS.length);
            const active = hovered === null || hovered === i;
            return (
              <motion.line
                key={p.title}
                x1={50}
                y1={50}
                x2={x}
                y2={y}
                stroke={active ? palette.lineFaint : "var(--line)"}
                strokeWidth={hovered === i ? 0.6 : 0.3}
                strokeOpacity={(active ? 0.7 : 0.3) * palette.opacityMult}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
              />
            );
          })}
          {PILLARS.map((p, i) => {
            const { x, y } = polar(i, PILLARS.length);
            return (
              <motion.circle
                key={`pulse-${p.title}`}
                r={0.9}
                fill={palette.dot}
                cx={50}
                cy={50}
                initial={{ cx: 50, cy: 50, opacity: 0 }}
                animate={{ cx: [50, x], cy: [50, y], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  delay: 1 + i * 0.3,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 130,
            height: 130,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -30,
              borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(91,91,240,0.35), transparent)",
              filter: "blur(12px)",
            }}
          />
          <Suspense fallback={null}>
            <CoreScene />
          </Suspense>
        </div>

        {PILLARS.map((p, i) => {
          const { x, y } = polar(i, PILLARS.length);
          const active = hovered === null || hovered === i;
          return (
            <div
              key={p.title}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: hovered === i ? 3 : 2,
              }}
            >
              <motion.div
                className="card why-node"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.25, ease: "easeOut" }}
                animate={{ opacity: active ? 1 : 0.5 }}
                style={{
                  width: 190,
                  padding: "18px 18px",
                  textAlign: "left",
                  borderColor: hovered === i ? "rgba(124,124,255,0.5)" : undefined,
                  transition: "border-color 0.3s ease",
                }}
              >
                <div className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>
                  {p.n}
                </div>
                <h3 className="h3" style={{ marginTop: 8, fontSize: 17 }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--text-dim)", marginTop: 8, fontSize: 13.5, lineHeight: 1.55 }}>
                  {p.body}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="container why-mobile-list" style={{ marginTop: 40, display: "none" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {PILLARS.map((p) => (
            <div key={p.title} className="card" style={{ padding: "22px 20px", textAlign: "left" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>
                {p.n}
              </div>
              <h3 className="h3" style={{ marginTop: 10, fontSize: 17 }}>
                {p.title}
              </h3>
              <p style={{ color: "var(--text-dim)", marginTop: 8, fontSize: 13.5, lineHeight: 1.55 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-node { cursor: default; }
        @media (max-width: 720px) {
          .why-orbit { display: none; }
          .why-mobile-list { display: block !important; }
        }
        @media (max-width: 480px) {
          .why-mobile-list > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
