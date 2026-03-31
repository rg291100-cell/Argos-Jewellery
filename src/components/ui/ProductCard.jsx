import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product, index = 0, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [adding, setAdding] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 1200);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggle(product);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        className="product-card product-card--list hoverable"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="product-card__visual product-card__visual--list" style={{ background: product.bg }}>
          <div className="product-card__emoji">{product.emoji}</div>
          <span className="product-card__tag" style={{ background: product.tagColor }}>{product.tag}</span>
        </div>
        <div className="product-card__info product-card__info--list">
          <div className="product-card__meta">
            <span className="product-card__category">{product.category}</span>
            <div className="star-rating">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</div>
            <span className="product-card__reviews">({product.reviews})</span>
          </div>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__desc">{product.shortDesc}</p>
          <div className="product-card__footer">
            <div className="product-card__pricing">
              <span className="product-card__price gradient-text">₹ {product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && <span className="product-card__original">₹ {product.originalPrice.toLocaleString('en-IN')}</span>}
            </div>
            <div className="product-card__actions-row">
              <button className={`product-card__wishlist ${wishlisted ? 'active' : ''}`} onClick={handleWishlist}>
                {wishlisted ? '❤️' : '🤍'}
              </button>
              <button className={`btn-primary btn-sm product-card__cart ${adding ? 'adding' : ''}`} onClick={handleAddToCart} disabled={!product.inStock}>
                {adding ? '✓ Added!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="product-card hoverable"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -10 }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-card__visual" style={{ background: product.bg }}>
        <div className="product-card__emoji float-anim">
          {product.emoji}
        </div>
        <div className="product-card__shine" />
        <span className="product-card__tag" style={{ background: product.tagColor }}>{product.tag}</span>
        {!product.inStock && <div className="product-card__out-of-stock">Out of Stock</div>}
        <div className="product-card__actions">
          <motion.button
            className={`product-card__wishlist ${wishlisted ? 'active' : ''}`}
            onClick={handleWishlist}
            whileTap={{ scale: 0.85 }}
          >
            {wishlisted ? '❤️' : '🤍'}
          </motion.button>
          <button className="product-card__quick-view" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            View Details
          </button>
        </div>
      </div>
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__category">{product.category}</span>
          <div className="star-rating" style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>
            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
          </div>
          <span className="product-card__reviews">({product.reviews})</span>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.shortDesc}</p>
        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price gradient-text">₹ {product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && <span className="product-card__original">₹ {product.originalPrice.toLocaleString('en-IN')}</span>}
          </div>
          <button
            className={`product-card__cart btn-primary btn-sm ${adding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {adding ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
