export default function ScrollPager({
  index,
  count,
  onPrev,
  onNext,
}: {
  index: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginTop: 32,
      }}
    >
      <span className="numeral" style={{ fontSize: 14, color: "var(--text-faint)" }}>
        {index + 1} / {count}
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          className="pager-btn"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index === count - 1}
          className="pager-btn"
          aria-label="Next"
        >
          →
        </button>
      </div>

      <style>{`
        .pager-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--panel-border);
          background: rgba(255,255,255,0.05);
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          transition: background 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
        }
        .pager-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.24);
        }
        .pager-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
      `}</style>
    </div>
  );
}
