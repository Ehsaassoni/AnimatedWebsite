import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Why Apex", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid",
        borderColor: scrolled ? "var(--line)" : "transparent",
        background: scrolled ? "var(--nav-bg-scrolled)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
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
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.01em",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="var(--accent)" />
            <path
              d="M9 22 L9 10 L12.4 10 L12.4 18.6 L19.6 18.6 L19.6 10 L23 10 L23 22 Z"
              fill="#08090a"
            />
          </svg>
          Apex&nbsp;Steel
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
          <a href="tel:+10000000000" style={{ fontSize: 14.5, color: "var(--text-dim)" }} className="nav-link">
            Call Sales
          </a>
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary" style={{ padding: "9px 20px" }}>
            Get a Quote
          </a>
        </div>
      </div>

      <style>{`
        .nav-link { transition: color 0.15s ease; }
        .nav-link:hover { color: var(--text); }
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
}
