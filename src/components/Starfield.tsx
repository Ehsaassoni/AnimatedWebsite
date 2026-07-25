import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let width = 0;
    let height = 0;
    let stars: { x: number; y: number; r: number; a: number; tw: number }[] = [];

    const seedRandom = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };

    const setup = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const rand = seedRandom(42);
      const count = Math.round((width * height) / 3600);
      stars = Array.from({ length: count }, () => ({
        x: rand() * width,
        y: rand() * height,
        r: rand() * 1.1 + 0.2,
        a: rand() * 0.6 + 0.15,
        tw: rand() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const flicker = 0.5 + 0.5 * Math.sin(t / 1400 + s.tw);
        ctx.globalAlpha = s.a * (0.55 + 0.45 * flicker);
        ctx.fillStyle = "#e6e6f7";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    setup();
    raf = requestAnimationFrame(draw);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 50% at 50% 10%, rgba(91,91,240,0.16), transparent 65%), radial-gradient(50% 40% at 80% 60%, rgba(60,50,120,0.14), transparent 70%), #08080f",
        }}
      />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(8,8,15,0.9) 100%)",
        }}
      />
    </div>
  );
}
