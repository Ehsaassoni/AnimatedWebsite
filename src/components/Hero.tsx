import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import SteelScene from "../three/SteelScene";
import Starfield from "./Starfield";

const TAGS = ["Precision engineered", "Rapid dispatch", "Full traceability", "Zero-compromise QA"];

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 160,
        overflow: "hidden",
      }}
    >
      <Starfield />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <div
            className="mono"
            style={{ fontSize: 13, color: "var(--text-dim)", letterSpacing: "0.14em" }}
          >
            Precision. Speed. Reliability.
          </div>
          <h1 className="h1" style={{ maxWidth: 760, marginTop: 16 }}>
            Command your steel supply chain.
          </h1>
          <p
            className="lede"
            style={{ marginTop: 20, maxWidth: 560, marginInline: "auto" }}
          >
            Structural steel, pipes, sheets, coils and bars — manufactured to
            spec and delivered to your schedule, every time. Every section is
            rolled and cut to millimetre tolerance, so what leaves our mill
            matches your drawings exactly — less rework, less waste, faster
            builds.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 36,
            }}
          >
            <form
              className="pill-cta"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <a href="#contact" className="btn btn-primary">
                Request a quote
              </a>
            </form>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 28,
            }}
          >
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--text-faint)",
                  padding: "7px 14px",
                  borderRadius: 999,
                  border: "1px solid var(--panel-border)",
                  background: "var(--overlay-soft)",
                  letterSpacing: "0.08em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            width: "min(760px, 92vw)",
            height: "min(560px, 56vh)",
            position: "relative",
            marginTop: 24,
          }}
        >
          <Suspense fallback={null}>
            <SteelScene />
          </Suspense>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              className="mono"
              style={{ fontSize: 13, color: "var(--text-dim)", letterSpacing: "0.1em" }}
            >
              Structural Grade Steel
            </span>
          </div>
        </motion.div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
