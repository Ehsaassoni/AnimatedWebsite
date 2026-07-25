import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useHorizontalScrollCards(count: number, desktopCardWidth = 860) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(desktopCardWidth);
  const [visibleCards, setVisibleCards] = useState(1.15);
  const gap = 28;

  useLayoutEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCardWidth(w - 64);
        setVisibleCards(1);
      } else if (w < 1000) {
        setCardWidth(Math.min(560, w - 140));
        setVisibleCards(1.08);
      } else {
        setCardWidth(Math.min(desktopCardWidth, Math.round(w * 0.56)));
        setVisibleCards(1.15);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktopCardWidth]);

  const viewportWidth = visibleCards * cardWidth + (Math.ceil(visibleCards) - 1) * gap;
  const totalWidth = count * cardWidth + (count - 1) * gap;
  const scrollDistance = Math.max(totalWidth - viewportWidth, 0);
  const step = cardWidth + gap;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const scrolled = v * scrollDistance;
      const i = Math.round(scrolled / step);
      setIndex(Math.min(count - 1, Math.max(0, i)));
    });
  }, [scrollYProgress, scrollDistance, step, count]);

  const goTo = (i: number) => {
    const clamped = Math.min(count - 1, Math.max(0, i));
    const section = sectionRef.current;
    if (!section) return;
    const targetScrolled = Math.min(clamped * step, scrollDistance);
    const top = section.offsetTop + targetScrolled;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return { sectionRef, cardWidth, viewportWidth, gap, scrollDistance, x, index, goTo };
}
