export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "48px 0" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="var(--accent)" />
            <path
              d="M9 22 L9 10 L12.4 10 L12.4 18.6 L19.6 18.6 L19.6 10 L23 10 L23 22 Z"
              fill="#08090a"
            />
          </svg>
          Apex Steel
        </div>

        <p style={{ fontSize: 13, color: "var(--text-faint)", margin: 0 }}>
          © {new Date().getFullYear()} Apex Steel Manufacturing &amp; Trading
          Co. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: 24, fontSize: 13.5, color: "var(--text-dim)" }}>
          <a href="#products">Products</a>
          <a href="#industries">Industries</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
