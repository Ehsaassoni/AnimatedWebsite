import { motion } from "framer-motion";

const AUDIENCE = [
  "Builders & Developers",
  "General Contractors",
  "Architects",
  "Structural Engineers",
  "Infrastructure Companies",
  "Manufacturers & OEMs",
];

export default function Industries() {
  return (
    <section className="section" id="industries">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Who we serve
        </span>
        <h2 className="h2" style={{ marginTop: 18, maxWidth: 640, marginInline: "auto" }}>
          Trusted by the people who build things that last.
        </h2>
        <p className="lede" style={{ marginTop: 20, maxWidth: 520, marginInline: "auto" }}>
          Whatever your role in the build, we supply steel matched to your
          spec, your schedule, and your site.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            marginTop: 48,
          }}
        >
          {AUDIENCE.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card"
              style={{
                padding: "14px 22px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                borderRadius: 999,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent-bright)",
                  boxShadow: "0 0 8px 1px var(--accent-bright)",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 14.5, fontWeight: 500 }}>{a}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
