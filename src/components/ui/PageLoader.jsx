import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
    background: 'var(--cream)',
  }}>
    <motion.div
      style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', background: 'linear-gradient(135deg,var(--gold-dark),var(--gold),var(--rose-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Argos
    </motion.div>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--pink-400)' }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

export default PageLoader;
