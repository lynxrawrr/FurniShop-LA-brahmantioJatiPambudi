import { useEffect, useRef, useState } from "react";

export function useHideOnScroll({ threshold = 8, topOffset = 0 } = {}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY.current;

      // keep visible near top
      if (y <= topOffset) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      // ignore tiny moves (prevent jitter)
      if (Math.abs(delta) < threshold) return;

      // down = hide, up = show
      setHidden(delta > 0);
      lastY.current = y;
    };

    lastY.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topOffset]);

  return hidden;
}
