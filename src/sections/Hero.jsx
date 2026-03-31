import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import './Hero.css';
import JewelryCanvas from '../components/JewelryCanvas';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Smooth spring-based mouse parallax on canvas wrapper only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Increased damping to reduce how often the spring updates
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.8 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  useEffect(() => {
    // Throttle mouse events to every other frame for smoothness with less CPU
    let scheduled = false;
    const onMouse = (e) => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          mouseX.set(e.clientX / window.innerWidth - 0.5);
          mouseY.set(e.clientY / window.innerHeight - 0.5);
          scheduled = false;
        });
      }
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, [mouseX, mouseY]);


  return (
    <section ref={containerRef} className="hero" id="home">
      {/* Background blobs — pure CSS, GPU-composited */}
      <div className="hero__blobs">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      {/* Sparkles — pure CSS, GPU-composited, no JS loop */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="hero__sparkle"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${2.5 + i * 0.2}s`,
          }}
        >
          ✦
        </span>
      ))}

      <div className="hero__inner">
        {/* Left Content */}
        <motion.div className="hero__content" style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <span className="section-label">Est. 2010 · New Delhi</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.7 }}
          >
            <span className="hero__title-line">Where Every</span>
            <span className="hero__title-script">Gem Tells</span>
            <span className="hero__title-line">A Story</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }}
          >
            Discover handcrafted jewellery that transcends time. Each piece is a
            testament to extraordinary artistry, ethically sourced gems, and
            decades of masterful craftsmanship.
          </motion.p>

          <motion.div
            className="hero__cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2 }}
          >
            <a href="#collections" className="btn-primary">
              Explore Collections
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#story" className="btn-secondary">Our Heritage</a>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            {[
              { value: '15+', label: 'Years of Excellence' },
              { value: '50K+', label: 'Happy Clients' },
              { value: '200+', label: 'Unique Designs' },
            ].map((stat) => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value gradient-text">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - 3D Canvas */}
        <motion.div
          className="hero__canvas-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.6 }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
        >
          <div className="hero__canvas-ring" />
          <div className="hero__canvas-ring hero__canvas-ring--2" />
          <JewelryCanvas />
          <div className="hero__canvas-glow" />
        </motion.div>
      </div>

      {/* Scroll indicator — CSS animation on the line */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <span>Scroll to explore</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
