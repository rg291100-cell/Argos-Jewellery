import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="cart-empty__icon">🛍️</div>
          <h2 className="cart-empty__title">Your Cart is Empty</h2>
          <p className="cart-empty__sub">Discover our exquisite collections and find a piece that speaks to your soul.</p>
          <Link to="/collections" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
            Explore Collections
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>
      </div>
    );
  }

  const shipping = total >= 100000 ? 0 : 2500;
  const grandTotal = total + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <motion.div className="cart-page__header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Shopping Bag</span>
          </div>
          <h1 className="cart-page__title">Your Shopping <em className="pink-gradient-text">Bag</em></h1>
          <p className="cart-page__subtitle">{items.length} item{items.length !== 1 ? 's' : ''} selected</p>
        </motion.div>

        <div className="cart-page__body">
          {/* Items */}
          <div className="cart-items">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.key}
                  className="cart-item glass-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  layout
                >
                  {/* Thumbnail */}
                  <div className="cart-item__thumb" style={{ background: item.bg }}>
                    <span>{item.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="cart-item__info">
                    <div className="cart-item__meta">{item.category} · {item.sku}</div>
                    <Link to={`/product/${item.id}`} className="cart-item__name">{item.name}</Link>
                    {item.size && <div className="cart-item__size">Size: {item.size}</div>}
                  </div>

                  {/* Qty */}
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                  </div>

                  {/* Price */}
                  <div className="cart-item__price">
                    <span className="gradient-text">₹ {(item.price * item.qty).toLocaleString('en-IN')}</span>
                    <span className="cart-item__unit">₹ {item.price.toLocaleString('en-IN')} each</span>
                  </div>

                  {/* Remove */}
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.key)} aria-label="Remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue shopping / clear */}
            <div className="cart-items__footer">
              <Link to="/collections" className="btn-secondary">← Continue Shopping</Link>
              <button className="cart-clear-btn" onClick={clearCart}>Clear Bag</button>
            </div>
          </div>

          {/* Summary */}
          <motion.div
            className="cart-summary glass-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="cart-summary__title">Order Summary</h2>

            <div className="cart-summary__lines">
              <div className="cart-summary__line">
                <span>Subtotal</span>
                <span>₹ {total.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary__line">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'free' : ''}>
                  {shipping === 0 ? 'FREE' : `₹ ${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="cart-summary__shipping-note">
                  Add ₹ {(100000 - total).toLocaleString('en-IN')} more for free shipping
                </p>
              )}
              <div className="cart-summary__divider" />
              <div className="cart-summary__line cart-summary__line--total">
                <span>Total</span>
                <span className="gradient-text">₹ {grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Promo */}
            <div className="cart-promo">
              <input type="text" placeholder="Gift card or promo code" className="cart-promo__input" />
              <button className="cart-promo__btn">Apply</button>
            </div>

            <button className="btn-primary cart-summary__checkout" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            {/* Trust icons */}
            <div className="cart-summary__trust">
              {['🔒 Secure Payment', '📦 Free Returns', '📜 Authenticity Guaranteed'].map(t => (
                <span key={t} className="cart-summary__trust-item">{t}</span>
              ))}
            </div>

            {/* Payment icons */}
            <div className="cart-summary__payments">
              {['💳 Visa', '🏦 Mastercard', '🅿️ PayPal', '🍎 Apple Pay'].map(p => (
                <span key={p} className="cart-summary__payment">{p}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
