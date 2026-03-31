import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Featured.css';

const products = [
  {
    id: 1,
    name: 'Pink Sapphire Solitaire',
    category: 'Rings',
    price: '₹ 4,12,000',
    originalPrice: '₹ 4,81,500',
    tag: 'Best Seller',
    tagColor: 'var(--pink-500)',
    emoji: '💍',
    bg: 'linear-gradient(145deg, #fff0f6, #ffd6e7, #ffc2dc)',
    rating: 5,
    reviews: 124,
    desc: 'A stunning oval pink sapphire, cradled in 18k rose gold.',
  },
  {
    id: 2,
    name: 'Diamond Rivière Necklace',
    category: 'Necklaces',
    price: '₹ 6,63,400',
    originalPrice: null,
    tag: 'New',
    tagColor: 'var(--gold-dark)',
    emoji: '📿',
    bg: 'linear-gradient(145deg, #fdf8f0, #f0e8d5, #e8d5a3)',
    rating: 5,
    reviews: 89,
    desc: 'Forty-two brilliant-cut diamonds, perfectly matched in size and brilliance.',
  },
  {
    id: 3,
    name: 'Pearl Cascade Earrings',
    category: 'Earrings',
    price: '₹ 1,55,150',
    originalPrice: '₹ 1,92,600',
    tag: 'Sale',
    tagColor: 'var(--rose-gold)',
    emoji: '✨',
    bg: 'linear-gradient(145deg, #f8f0ff, #edd6f8, #e0b8f5)',
    rating: 4,
    reviews: 56,
    desc: 'South Sea pearls cascading from diamond-set tops in white gold.',
  },
  {
    id: 4,
    name: 'Baguette Tennis Bracelet',
    category: 'Bracelets',
    price: '₹ 4,38,700',
    originalPrice: null,
    tag: 'Exclusive',
    tagColor: '#c87040',
    emoji: '⛓️',
    bg: 'linear-gradient(145deg, #fff5ee, #ffe0cc, #ffc8a0)',
    rating: 5,
    reviews: 41,
    desc: 'Thirty baguette-cut diamonds set in an elegant yellow gold bar setting.',
  },
  {
    id: 5,
    name: 'Rose Gold Love Knot',
    category: 'Rings',
    price: '₹ 2,35,400',
    originalPrice: null,
    tag: 'Limited',
    tagColor: 'var(--pink-500)',
    emoji: '💕',
    bg: 'linear-gradient(145deg, #fff0f6, #ffe0ef, #ffc8e0)',
    rating: 5,
    reviews: 77,
    desc: 'An interlocking knot design symbolising eternal love, in 18k rose gold.',
  },
  {
    id: 6,
    name: 'Celestial Star Pendant',
    category: 'Necklaces',
    price: '₹ 1,04,860',
    originalPrice: '₹ 1,28,400',
    tag: 'Sale',
    tagColor: 'var(--rose-gold)',
    emoji: '⭐',
    bg: 'linear-gradient(145deg, #f0f4ff, #d8e4ff, #bcd0ff)',
    rating: 4,
    reviews: 103,
    desc: 'A pavé diamond star nestled on a delicate 18k white gold chain.',
  },
];

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

const StarRating = ({ count }) => (
  <div className="star-rating">
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? 'var(--gold)' : 'var(--pink-200)' }}>★</span>
    ))}
  </div>
);

// Stagger variant — only one parent observer triggers all cards
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState(false);

  return (
    <motion.div
      className="product-card hoverable"
      variants={cardVariants}
      whileHover={{ y: -8 }}
    >
      {/* Visual */}
      <div className="product-card__visual" style={{ background: product.bg }}>
        {/* CSS float animation — no JS rAF */}
        <div className="product-card__emoji float-anim">
          {product.emoji}
        </div>

        {/* Shine sweep */}
        <div className="product-card__shine" />

        <span className="product-card__tag" style={{ background: product.tagColor }}>
          {product.tag}
        </span>

        {/* Action buttons */}
        <div className="product-card__actions">
          <motion.button
            className={`product-card__wishlist ${wishlist ? 'active' : ''}`}
            onClick={() => setWishlist(!wishlist)}
            whileTap={{ scale: 0.85 }}
            aria-label="Add to wishlist"
          >
            {wishlist ? '❤️' : '🤍'}
          </motion.button>
          <button className="product-card__quick-view" aria-label="Quick view">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__category">{product.category}</span>
          <StarRating count={product.rating} />
          <span className="product-card__reviews">({product.reviews})</span>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.desc}</p>
        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price gradient-text">{product.price}</span>
            {product.originalPrice && (
              <span className="product-card__original">{product.originalPrice}</span>
            )}
          </div>
          <button className="product-card__cart btn-primary btn-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Featured = () => {
  // Single inView for the section — one IntersectionObserver for all cards
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="featured" className="featured">
      <div className="container">
        <motion.div
          className="featured__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Featured Pieces</span>
          <h2 className="featured__title">
            Handpicked for
            <br />
            <em className="pink-gradient-text">Exceptional Taste</em>
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="featured__filters"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`featured__filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div className="featured__filter-active" layoutId="filterActive" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Products — single stagger container */}
        <AnimatePresence mode="wait">
          <motion.div
            ref={ref}
            key={activeCategory}
            className="featured__grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="featured__cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a href="#" className="btn-secondary">Shop All Jewellery</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;
