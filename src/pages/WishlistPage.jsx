import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import './WishlistPage.css';

const WishlistPage = () => {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="wishlist-empty">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="wishlist-empty__icon">🤍</div>
          <h2 className="wishlist-empty__title">Your Wishlist is Empty</h2>
          <p className="wishlist-empty__sub">Save the pieces that captivate you and revisit them whenever you like.</p>
          <Link to="/collections" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
            Explore Collections →
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleMoveAllToCart = () => {
    items.forEach(item => addToCart(item));
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <motion.div className="wishlist-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Wishlist</span>
          </div>
          <h1 className="wishlist-title">My <em className="pink-gradient-text">Wishlist</em></h1>
          <p className="wishlist-subtitle">{items.length} piece{items.length !== 1 ? 's' : ''} saved</p>
        </motion.div>

        <div className="wishlist-toolbar">
          <span className="wishlist-count">{items.length} saved items</span>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn-secondary btn-sm" onClick={handleMoveAllToCart}>
              🛍️ Move All to Cart
            </button>
            <button
              className="btn-secondary btn-sm"
              onClick={() => items.forEach(item => toggle(item))}
              style={{ color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)' }}
            >
              🗑️ Clear Wishlist
            </button>
          </div>
        </div>

        <motion.div
          className="wishlist-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* Recommendations */}
        <div className="wishlist-reco">
          <h2 className="wishlist-reco__title">You Might Also Love</h2>
          <p className="wishlist-reco__sub">Based on your taste in fine jewellery</p>
          <Link to="/collections" className="btn-secondary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
            Browse All Collections →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
