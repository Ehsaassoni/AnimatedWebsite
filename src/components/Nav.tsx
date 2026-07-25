import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Why Ehsaas", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid",
        borderColor: scrolled || menuOpen ? "var(--line)" : "transparent",
        background: scrolled || menuOpen ? "var(--nav-bg-scrolled)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.01em",
            flexShrink: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="var(--accent)" />
            <path
              d="M9 22 L9 10 L12.4 10 L12.4 18.6 L19.6 18.6 L19.6 10 L23 10 L23 22 Z"
              fill="#08090a"
            />
          </svg>
          Ehsaas&nbsp;Steel
        </a>

        <nav
          style={{
            display: "flex",
            gap: 30,
            fontSize: 14.5,
            color: "var(--text-dim)",
          }}
          className="nav-links"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <a
            href="tel:+10000000000"
            style={{ fontSize: 14.5, color: "var(--text-dim)" }}
            className="nav-link call-sales-link"
          >
            Call Sales
          </a>
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary get-quote-btn" style={{ padding: "9px 20px" }}>
            Get a Quote
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="menu-btn"
          >
            <span className={`menu-icon ${menuOpen ? "open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid var(--line)",
              background: "var(--nav-bg-scrolled)",
              backdropFilter: "blur(14px)",
            }}
            className="mobile-menu"
          >
            <div
              className="container"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 32px 28px",
                gap: 4,
              }}
            >
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-link"
                  style={{ padding: "13px 0", fontSize: 17, borderBottom: "1px solid var(--line)" }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+10000000000"
                onClick={() => setMenuOpen(false)}
                className="mobile-link"
                style={{ padding: "13px 0", fontSize: 17, color: "var(--text-dim)" }}
              >
                Call Sales
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary"
                style={{ marginTop: 14, width: "100%" }}
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link { transition: color 0.15s ease; }
        .nav-link:hover { color: var(--text); }
        .mobile-link { color: var(--text); }
        .menu-btn {
          display: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--panel-border);
          background: var(--overlay-soft);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .menu-icon { position: relative; width: 15px; height: 11px; display: inline-block; }
        .menu-icon span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1.4px;
          background: var(--text);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease, top 0.25s ease;
        }
        .menu-icon span:nth-child(1) { top: 0; }
        .menu-icon span:nth-child(2) { top: 5px; }
        .menu-icon span:nth-child(3) { top: 10px; }
        .menu-icon.open span:nth-child(1) { top: 5px; transform: rotate(45deg); }
        .menu-icon.open span:nth-child(2) { opacity: 0; }
        .menu-icon.open span:nth-child(3) { top: 5px; transform: rotate(-45deg); }

        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .call-sales-link { display: none !important; }
          .menu-btn { display: flex !important; }
        }
        @media (max-width: 420px) {
          .get-quote-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
