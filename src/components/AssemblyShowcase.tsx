import { Suspense } from "react";
import { motion } from "framer-motion";
import AssemblyScene from "../three/AssemblyScene";

const STATS: [string, string][] = [
  ["±1mm", "Cut tolerance"],
  ["100%", "Batches tested"],
  ["9s", "Assembly cycle shown"],
];

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)" }}>
        {label}
      </div>
      <div style={{ fontSize: 13.5, marginTop: 4, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

export default function AssemblyShowcase() {
  return (
    <section className="section" id="assembly">
      <div className="container assembly-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Precision fabrication</span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            Watch it come together.
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Every frame is cut, drilled and welded to drawing before it ships.
            This is a live render of a standard structural bay — columns,
            plates and bracing assembling exactly to spec, on loop.
          </p>

          <div style={{ display: "flex", gap: 40, marginTop: 40, flexWrap: "wrap" }}>
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="numeral" style={{ fontSize: 24, fontWeight: 550 }}>
                  {n}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-faint)", marginTop: 4 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="card"
          style={{
            position: "relative",
            overflow: "hidden",
            height: 600,
            maxWidth: 560,
            marginInline: "auto",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 12px",
              borderRadius: 999,
              background: "var(--scrim)",
              border: "1px solid var(--panel-border)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="live-dot" />
            <span className="mono" style={{ fontSize: 10.5, color: "var(--text-dim)" }}>
              LIVE
            </span>
          </div>

          <div style={{ position: "absolute", inset: 0 }}>
            <Suspense fallback={null}>
              <AssemblyScene />
            </Suspense>
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "18px 26px",
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid var(--panel-border)",
              background: "var(--scrim)",
              backdropFilter: "blur(10px)",
            }}
          >
            <InfoItem label="Grade" value="IS 2062" />
            <InfoItem label="Members" value="09" />
            <InfoItem label="Tolerance" value="±1mm" />
          </div>
        </motion.div>
      </div>

      <style>{`
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3ddc84;
          box-shadow: 0 0 8px 2px rgba(61,220,132,0.6);
          animation: livePulse 1.6s ease-in-out infinite;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @media (max-width: 900px) {
          .assembly-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
