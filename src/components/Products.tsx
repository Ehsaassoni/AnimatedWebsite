import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useScroll, useTransform, MotionValue } from "framer-motion";

function IconBeam({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h14M5 20h14M12 4v16M8.5 4v3M15.5 4v3M8.5 17v3M15.5 17v3"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPipe({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="7" rx="7" ry="3.2" stroke={color} strokeWidth="1.4" />
      <path d="M5 7v10a7 3.2 0 0 0 14 0V7" stroke={color} strokeWidth="1.4" />
      <ellipse cx="12" cy="7" rx="3" ry="1.4" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}
function IconSheet({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="4.2" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="4" y="10.4" width="16" height="4.2" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="4" y="15.8" width="16" height="4.2" rx="1" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}
function IconCoil({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.4" />
      <circle cx="12" cy="12" r="5.4" stroke={color} strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.3" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}
function IconBar({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 4v16M11 4v16M16 4v16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconFab({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M14.5 6.5 17.5 9.5M6.5 17.5l4-4M9.5 6.5c-1.4-1.4-3.6-1.4-5 0l1.7 1.7-1 1L3.5 7.5c-1.4 1.4-1.4 3.6 0 5l6 6c1.4 1.4 3.6 1.4 5 0l-1.7-1.7 1-1 1.7 1.7c1.4-1.4 1.4-3.6 0-5l-6-6Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PRODUCTS = [
  {
    tag: "STR",
    title: "Structural Steel",
    body: "I-beams, H-beams, angles and channels engineered for load-bearing frames in residential, commercial and industrial builds — rolled and verified against IS / ASTM sections.",
    color: "#5b5bf0",
    Icon: IconBeam,
  },
  {
    tag: "PIP",
    title: "Steel Pipes",
    body: "Seamless and welded pipes for structural, plumbing, and process applications, in a full range of diameters and wall thicknesses — pressure-tested before dispatch.",
    color: "#4f7df0",
    Icon: IconPipe,
  },
  {
    tag: "SHT",
    title: "Sheets & Plates",
    body: "Hot-rolled and cold-rolled sheets and plates for fabrication, cladding, and heavy equipment manufacturing, slit and sheared to your exact dimensions.",
    color: "#6d5bf0",
    Icon: IconSheet,
  },
  {
    tag: "COL",
    title: "Coils",
    body: "Precision-slit and full-width coils supplied to spec for downstream roll-forming and stamping operations, with consistent gauge across the full run.",
    color: "#8b5bf0",
    Icon: IconCoil,
  },
  {
    tag: "BAR",
    title: "Bars & Rods",
    body: "TMT bars, round bars and rods for reinforcement and general engineering, tested for yield strength and ductility on every batch.",
    color: "#5b8ff0",
    Icon: IconBar,
  },
  {
    tag: "FAB",
    title: "Custom Fabrication",
    body: "Cutting, drilling, welding and assembly against your drawings — delivered as project-ready components, not raw stock.",
    color: "#a05bf0",
    Icon: IconFab,
  },
];

const PER_ITEM_SCROLL = 620;

function ProductPanel({
  product,
  index,
  count,
  scrollYProgress,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  const span = end - start;
  const inRange = [start, start + span * 0.2, end - span * 0.2, end];

  const opacity = useTransform(scrollYProgress, inRange, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, inRange, [44, 0, 0, -44]);
  const blurAmt = useTransform(scrollYProgress, inRange, [10, 0, 0, 10]);
  const filter = useMotionTemplate`blur(${blurAmt}px)`;
  const numeralX = useTransform(scrollYProgress, inRange, [30, 0, 0, -30]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        y,
        filter,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <motion.div
        aria-hidden
        className="mono"
        style={{
          position: "absolute",
          right: "6%",
          top: "-8%",
          fontSize: "clamp(100px, 14vw, 180px)",
          fontWeight: 700,
          lineHeight: 1,
          color: product.color,
          opacity: 0.1,
          userSelect: "none",
          pointerEvents: "none",
          x: numeralX,
        }}
      >
        0{index + 1}
      </motion.div>

      <div
        style={{
          position: "absolute",
          left: "-6%",
          top: "-30%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${product.color}2e, transparent)`,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 22,
          position: "relative",
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${product.color}1a`,
            border: `1px solid ${product.color}55`,
          }}
        >
          <product.Icon color={product.color} />
        </span>
        <div className="mono" style={{ fontSize: 13, color: "var(--text-faint)" }}>
          {product.tag} — 0{index + 1} / 0{count}
        </div>
      </div>

      <h3
        style={{
          fontSize: "clamp(30px, 4.4vw, 58px)",
          fontWeight: 540,
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          maxWidth: 680,
          margin: 0,
          position: "relative",
        }}
      >
        {product.title}
      </h3>
      <p className="lede" style={{ marginTop: 22, maxWidth: 540, position: "relative" }}>
        {product.body}
      </p>
    </motion.div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollDistance = PRODUCTS.length * PER_ITEM_SCROLL;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const i = Math.min(PRODUCTS.length - 1, Math.floor(v * PRODUCTS.length));
      setActiveIndex(Math.max(0, i));
    });
  }, [scrollYProgress]);

  const goTo = (i: number) => {
    const clamped = Math.min(PRODUCTS.length - 1, Math.max(0, i));
    const section = sectionRef.current;
    if (!section) return;
    const progress = clamped / PRODUCTS.length;
    const top = section.offsetTop + progress * scrollDistance;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const activeColor = PRODUCTS[activeIndex].color;

  return (
    <section
      id="products"
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
            Product range
          </span>
          <h2 className="h2" style={{ marginTop: 18, maxWidth: 640, marginInline: "auto" }}>
            Every steel product,{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, ${activeColor}, var(--accent-bright))`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                transition: "background-image 0.4s ease",
              }}
            >
              one command away.
            </span>
          </h2>
        </div>

        <div
          className="container products-layout"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 220px",
            gap: 48,
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <div style={{ position: "relative", height: 300 }}>
            {PRODUCTS.map((p, i) => (
              <ProductPanel
                key={p.title}
                product={p}
                index={i}
                count={PRODUCTS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <div className="rail" style={{ position: "relative", display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 19,
                top: 12,
                bottom: 12,
                width: 1,
                background: "var(--line)",
              }}
              className="rail-spine"
            />
            {PRODUCTS.map((p, i) => (
              <button
                key={p.tag}
                type="button"
                onClick={() => goTo(i)}
                className="rail-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "9px 4px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: i === activeIndex ? `${p.color}22` : "transparent",
                    border: `1px solid ${i === activeIndex ? p.color + "77" : "var(--panel-border)"}`,
                    boxShadow: i === activeIndex ? `0 0 16px ${p.color}44` : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <p.Icon color={i === activeIndex ? p.color : "var(--text-faint)"} />
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: i === activeIndex ? "var(--text)" : "var(--text-faint)",
                    transition: "color 0.25s ease",
                  }}
                >
                  {p.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="container" style={{ marginTop: 44 }}>
          <div
            style={{
              height: 3,
              borderRadius: 3,
              background: "var(--line)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "left",
                scaleX: scrollYProgress,
                background: `linear-gradient(90deg, #5b5bf0, #a05bf0)`,
                boxShadow: "0 0 12px 1px rgba(124,124,255,0.5)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .rail-item span.mono { letter-spacing: 0.12em; }
        .rail-item:hover span:first-child { border-color: rgba(255,255,255,0.3) !important; }
        @media (max-width: 780px) {
          .products-layout { grid-template-columns: 1fr !important; }
          .rail { flex-direction: row !important; flex-wrap: wrap; gap: 10px !important; order: -1; justify-content: center; }
          .rail-spine { display: none; }
          .rail-item { padding: 4px !important; }
        }
      `}</style>
    </section>
  );
}
