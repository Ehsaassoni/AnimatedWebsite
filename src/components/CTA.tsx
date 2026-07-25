import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card"
          style={{
            padding: "72px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(50% 80% at 50% 0%, rgba(91,91,240,0.18), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Let's build
          </span>
          <h2 className="h2" style={{ marginTop: 18, maxWidth: 680, margin: "18px auto 0" }}>
            Get steel that matches your spec and your schedule.
          </h2>
          <p className="lede" style={{ margin: "20px auto 0", textAlign: "center" }}>
            Send us your drawings or bill of materials — our team will
            respond with grades, availability and lead times within one
            business day.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <a href="mailto:sales@apexsteel.example" className="btn btn-primary">
              Request a Quote →
            </a>
            <a href="tel:+10000000000" className="btn btn-ghost">
              Call Sales Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
