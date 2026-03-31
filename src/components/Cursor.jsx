import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use raw vars – no React state – to avoid re-renders
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let cursorScale = 1;
    let followerScale = 1;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // GPU-composited transform: translate3d – zero layout reflow
      cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0) scale(${cursorScale})`;

      // Smooth lerp for follower
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.transform = `translate3d(calc(${followerX}px - 50%), calc(${followerY}px - 50%), 0) scale(${followerScale})`;

      rafId.current = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      cursorScale = 2.5;
      followerScale = 1.5;
    };
    const onMouseLeaveLink = () => {
      cursorScale = 1;
      followerScale = 1;
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    const addLinkListeners = () => {
      document.querySelectorAll('a, button, .hoverable').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };
    addLinkListeners();

    rafId.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'var(--pink-400)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'transform 0.15s cubic-bezier(0.25,0.46,0.45,0.94)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid var(--gold)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'none',
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default Cursor;
