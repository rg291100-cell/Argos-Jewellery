import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const count = 10; // kept low for frame rate

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = Math.random() * 5 + 2;
      const delay = Math.random() * 15;
      const duration = Math.random() * 20 + 15;
      const left = Math.random() * 100;
      const isGold = Math.random() > 0.5;

      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        bottom: '-20px',
        background: isGold
          ? `radial-gradient(circle, rgba(200,169,110,0.5), rgba(200,169,110,0.05))`
          : `radial-gradient(circle, rgba(242,92,148,0.4), rgba(255,160,199,0.05))`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        borderRadius: Math.random() > 0.5 ? '50%' : '0',
        transform: Math.random() > 0.5 ? 'rotate(45deg)' : '',
        willChange: 'transform, opacity',
      });

      container.appendChild(particle);
      particles.push(particle);
    }

    // Pause all CSS animations when the tab is hidden — free GPU entirely
    const onVisibilityChange = () => {
      const state = document.hidden ? 'paused' : 'running';
      particles.forEach((p) => {
        p.style.animationPlayState = state;
      });
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      particles.forEach((p) => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="particles-container" />;
};

export default Particles;
