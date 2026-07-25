function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 10v7M7.5 7.2v.01M11.5 17v-4.2c0-1.5 1-2.3 2.2-2.3s2 .8 2 2.3V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "48px 0 32px" }}>
      <div className="container">
        <div
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
            Ehsaas Steel
          </div>

          <p style={{ fontSize: 13, color: "var(--text-faint)", margin: 0 }}>
            © {new Date().getFullYear()} Ehsaas Steel Manufacturing &amp; Trading
            Co. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: 24, fontSize: 13.5, color: "var(--text-dim)" }}>
            <a href="#products">Products</a>
            <a href="#industries">Industries</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-faint)" }}>
            Site crafted by Ehsaas
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href="https://www.instagram.com/ehsaassoniii/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ehsaas on Instagram"
              className="dev-credit-link"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/ehsaas-soni-5313b1250/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ehsaas on LinkedIn"
              className="dev-credit-link"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .dev-credit-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid var(--panel-border);
          background: var(--overlay-soft);
          color: var(--text-faint);
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }
        .dev-credit-link:hover {
          color: var(--text);
          border-color: var(--overlay-border-hover);
          background: var(--overlay-med);
        }
      `}</style>
    </footer>
  );
}
