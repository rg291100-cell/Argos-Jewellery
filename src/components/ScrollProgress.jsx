import { useEffect, useRef } from 'react';

/**
 * Thin gold/pink progress bar at the very top of the viewport.
 * Uses direct DOM style mutation — zero React re-renders on scroll.
 */
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let rafId = null;
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export default ScrollProgress;
