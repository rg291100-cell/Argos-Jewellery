import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Collections.css';

const collections = [
  {
    id: 1,
    title: 'Eternal Rose',
    subtitle: 'Rings Collection',
    desc: 'Timeless rose-gold bands set with the finest pink sapphires, celebrating love that lasts forever.',
    price: 'From ₹1,33,750',
    badge: 'Bestseller',
    gradient: 'linear-gradient(135deg, #ffe0ef, #ffc2d4, #f8a8c2)',
    accentColor: 'var(--pink-400)',
    icon: '💍',
    pieces: '28 Pieces',
  },
  {
    id: 2,
    title: 'Lumière',
    subtitle: 'Necklace Collection',
    desc: 'Cascading diamond and pearl pendants that capture light with every movement.',
    price: 'From ₹2,24,700',
    badge: 'New Arrival',
    gradient: 'linear-gradient(135deg, #fdf8f0, #f2e8d0, #e8d5a3)',
    accentColor: 'var(--gold)',
    icon: '📿',
    pieces: '15 Pieces',
  },
  {
    id: 3,
    title: 'Aurora Borealis',
    subtitle: 'Earrings Collection',
    desc: 'Multi-stone drop earrings inspired by the dancing northern lights — radiant and hypnotic.',
    price: 'From ₹95,230',
    badge: 'Limited Edition',
    gradient: 'linear-gradient(135deg, #f5e6ff, #e8c8f8, #d4a8f0)',
    accentColor: '#b76eb7',
    icon: '✨',
    pieces: '32 Pieces',
  },
  {
    id: 4,
    title: 'Venetian Lace',
    subtitle: 'Bracelet Collection',
    desc: 'Delicate filigree bracelets inspired by Renaissance Venetian craftsmanship and baroque opulence.',
    price: 'From ₹83,460',
    badge: 'Exclusive',
    gradient: 'linear-gradient(135deg, #fff0e8, #ffd6b8, #f4b88a)',
    accentColor: '#c87040',
    icon: '⛓️',
    pieces: '20 Pieces',
  },
];

// Stagger container — children animate in sequence from parent trigger
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const CollectionCard = ({ item }) => (
  <motion.div
    className="collection-card hoverable"
    variants={cardVariants}
    whileHover={{ y: -12, transition: { duration: 0.3 } }}
  >
    {/* Visual area */}
    <div className="collection-card__visual" style={{ background: item.gradient }}>
      {/* CSS-animated icon — no JS loop needed */}
      <div className="collection-card__icon float-anim">
        {item.icon}
      </div>

      {/* Orbiting ring decoration */}
      <div className="collection-card__orbit" style={{ borderColor: item.accentColor + '40' }} />
      <div className="collection-card__orbit collection-card__orbit--2" style={{ borderColor: item.accentColor + '25' }} />

      {/* Sparkle dots */}
      <span className="collection-card__dot collection-card__dot--1" style={{ background: item.accentColor }} />
      <span className="collection-card__dot collection-card__dot--2" style={{ background: item.accentColor }} />
      <span className="collection-card__dot collection-card__dot--3" style={{ background: item.accentColor }} />

      <span className="collection-card__badge" style={{ background: item.accentColor }}>
        {item.badge}
      </span>
      <span className="collection-card__pieces">{item.pieces}</span>
    </div>

    {/* Info */}
    <div className="collection-card__info glass-card">
      <span className="collection-card__subtitle">{item.subtitle}</span>
      <h3 className="collection-card__title">{item.title}</h3>
      <p className="collection-card__desc">{item.desc}</p>
      <div className="collection-card__footer">
        <span className="collection-card__price gradient-text">{item.price}</span>
        <button className="collection-card__btn">
          <span>Explore</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </motion.div>
);

const Collections = () => {
  // Single inView for the whole section — drives all card animations via stagger
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="collections" className="collections">
      <div className="container">
        <motion.div
          className="collections__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Our Collections</span>
          <h2 className="collections__title">
            Crafted for Those Who
            <br />
            <em className="pink-gradient-text">Deserve the Finest</em>
          </h2>
          <div className="diamond-divider">
            <span />
          </div>
          <p className="collections__subtitle">
            Each collection is a unique world — a symphony of precious metals, 
            rare gemstones, and unparalleled artistry.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="collections__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {collections.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </motion.div>

        <motion.div
          className="collections__cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#" className="btn-secondary">View All Collections</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
