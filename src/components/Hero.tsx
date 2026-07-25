import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import SteelScene from "../three/SteelScene";
import Starfield from "./Starfield";

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
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="h1" style={{ maxWidth: 760 }}>
            Command your steel supply chain.
          </h1>
          <p
            className="lede"
            style={{ marginTop: 20, maxWidth: 520, marginInline: "auto" }}
          >
            Structural steel, pipes, sheets, coils and bars — manufactured to
            spec and delivered to your schedule, every time.
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
