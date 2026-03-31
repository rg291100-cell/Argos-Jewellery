import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import './LookbookPage.css';

const lookbookEntries = [
  { id: 1, title: 'The London Edit', subtitle: 'Autumn / Winter 2025', products: [1, 2, 15], emoji: '🌆', mood: 'Urban sophistication meets old-world glamour. A palette of champagne, cream and rose gold.', size: 'large', bg: 'linear-gradient(160deg,#fff0f6,#f0e8ff)' },
  { id: 2, title: 'Riviera Mornings', subtitle: 'Resort Collection', products: [3, 7, 10], emoji: '🌊', mood: 'Sun-kissed pearls and gold. The effortless luxury of the French Riviera distilled into jewellery.', size: 'small', bg: 'linear-gradient(160deg,#f0f8ff,#e8fff0)' },
  { id: 3, title: 'Midnight Garden', subtitle: 'Limited Release', products: [9, 12, 11], emoji: '🌙', mood: 'Deep colour stones set against white gold. A garden at midnight — mysterious, lush, alive.', size: 'small', bg: 'linear-gradient(160deg,#f0e8ff,#e8f0ff)' },
  { id: 4, title: 'The Bridal Chapter', subtitle: 'Spring 2025', products: [18, 1, 17], emoji: '👰', mood: 'Every love story deserves extraordinary jewellery. Our most romantic bridal curation ever.', size: 'large', bg: 'linear-gradient(160deg,#fff0f6,#ffeef5)' },
  { id: 5, title: 'Golden Hour', subtitle: 'Summer Edit', products: [4, 16, 10], emoji: '🌅', mood: 'Yellow gold in the late afternoon light. Warm, radiant, deeply human.', size: 'small', bg: 'linear-gradient(160deg,#fffef0,#fff5e0)' },
  { id: 6, title: 'Milanese Nights', subtitle: 'Gala Collection', products: [9, 15, 12], emoji: '✨', mood: 'Diamonds for evenings that last until dawn. Maximum sparkle, maximum drama.', size: 'small', bg: 'linear-gradient(160deg,#f5f5ff,#f0f0ff)' },
];

const LookbookPage = () => {
  const [activeEntry, setActiveEntry] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Bridal', 'Resort', 'Evening', 'Everyday'];

  return (
    <div className="lookbook-page">
      {/* Hero */}
      <section className="lookbook-hero">
        <div className="lookbook-hero__bg" />
        <motion.div
          className="lookbook-hero__content container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="section-label">Argos Lookbook</span>
          <h1 className="lookbook-hero__title">
            The Art of <br />
            <em className="pink-gradient-text">Fine Dressing</em>
          </h1>
          <p className="lookbook-hero__sub">
            Curated edits, styling inspiration and behind-the-scenes stories from the world of Argos Jewellery.
          </p>
        </motion.div>
        <div className="lookbook-hero__scroll">
          <span className="float-anim" style={{ display: 'inline-block' }}>↓</span>
          Scroll to explore
        </div>
      </section>

      <div className="container">
        {/* Category filters */}
        <motion.div className="lookbook-filters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {categories.map(c => (
            <button
              key={c}
              className={`lookbook-filter ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="lookbook-grid">
          {lookbookEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              className={`lookbook-card lookbook-card--${entry.size}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveEntry(activeEntry?.id === entry.id ? null : entry)}
            >
              <div className="lookbook-card__visual" style={{ background: entry.bg }}>
                <div className="lookbook-card__emoji float-anim">
                  {entry.emoji}
                </div>
                {/* Product preview */}
                <div className="lookbook-card__products-preview">
                  {entry.products.slice(0, 3).map(pid => {
                    const p = products.find(x => x.id === pid);
                    return p ? <span key={pid} className="lookbook-mini-emoji">{p.emoji}</span> : null;
                  })}
                </div>
                <div className="lookbook-card__overlay">
                  <span>Explore Edit →</span>
                </div>
              </div>
              <div className="lookbook-card__info">
                <div className="lookbook-card__subtitle">{entry.subtitle}</div>
                <h2 className="lookbook-card__title">{entry.title}</h2>
                <p className="lookbook-card__mood">{entry.mood}</p>
              </div>

              {/* Expanded panel */}
              {activeEntry?.id === entry.id && (
                <motion.div
                  className="lookbook-expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onClick={e => e.stopPropagation()}
                >
                  <h3 className="lookbook-expanded__title">Featured in This Edit</h3>
                  <div className="lookbook-expanded__products">
                    {entry.products.map(pid => {
                      const p = products.find(x => x.id === pid);
                      return p ? (
                        <Link key={pid} to={`/product/${pid}`} className="lookbook-mini-card">
                          <div className="lookbook-mini-card__thumb" style={{ background: p.bg }}>{p.emoji}</div>
                          <div className="lookbook-mini-card__info">
                            <div className="lookbook-mini-card__name">{p.name}</div>
                            <div className="lookbook-mini-card__price gradient-text">₹ {p.price.toLocaleString('en-IN')}</div>
                          </div>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Editorial Banner */}
        <motion.div
          className="lookbook-banner glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="lookbook-banner__content">
            <span className="section-label">Editorial</span>
            <h2 className="lookbook-banner__title">Style Notes from <em className="pink-gradient-text">Our Team</em></h2>
            <p className="lookbook-banner__text">
              Each season, our creative director and master gemologists curate a completely new vision of luxury — 
              exploring new cuts, rare stones, and unexpected combinations that define the look of tomorrow.
            </p>
            <Link to="/collections" className="btn-primary" style={{ display: 'inline-flex' }}>Shop the Collection →</Link>
          </div>
          <div className="lookbook-banner__deco">
            {['💍', '📿', '✨', '👑', '💎'].map((emoji, i) => (
              <span
                key={i}
                className="lookbook-banner__emoji float-anim"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LookbookPage;
