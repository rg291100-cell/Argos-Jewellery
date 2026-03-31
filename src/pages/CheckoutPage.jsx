import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.css';

const steps = ['Delivery', 'Payment', 'Review'];

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  const shipping = total >= 100000 ? 0 : 2500;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'GB',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveCard: false,
    giftNote: '',
    giftWrap: false,
  });

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleNext = () => {
    if (step < 2) setStep(s => s + 1);
    else {
      setPlaced(true);
      clearCart();
    }
  };

  if (items.length === 0 && !placed) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', padding: '8rem 2rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '4rem' }}>🛍️</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem' }}>Your bag is empty</h2>
        <Link to="/collections" className="btn-primary" style={{ display: 'inline-flex', marginTop: '0.5rem' }}>Browse Collections</Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="checkout-success">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="checkout-success__card glass-card">
          <motion.div
            className="checkout-success__icon"
            animate={{ rotate: [0, 360], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 0.9 }}
          >✨</motion.div>
          <h1 className="checkout-success__title">Order Confirmed</h1>
          <p className="checkout-success__sub">Thank you for your order. A confirmation has been sent to <strong>{form.email}</strong>.</p>
          <p className="checkout-success__ref">Order reference: <strong className="gradient-text">ARG-{Date.now().toString().slice(-6)}</strong></p>
          <div className="checkout-success__btns">
            <Link to="/" className="btn-primary">Continue Shopping</Link>
            <Link to="/account" className="btn-secondary">View Account</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Header */}
        <div className="checkout-page__header">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span>
            <Link to="/cart">Bag</Link> <span>›</span>
            <span>Checkout</span>
          </div>
          <h1 className="checkout-page__title">Secure <em className="pink-gradient-text">Checkout</em></h1>
        </div>

        {/* Progress */}
        <div className="checkout-steps">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="checkout-step__circle">
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="checkout-step__label">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`checkout-step__line ${i < step ? 'done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="checkout-body">
          {/* Form area */}
          <div className="checkout-form-area">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="delivery" className="checkout-form glass-card"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="checkout-form__title">Delivery Details</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Isabelle" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Fontaine" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="hello@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+44 7700 900000" />
                    </div>
                  </div>
                  <div className="form-group form-group--full">
                    <label>Address</label>
                    <input type="text" value={form.address} onChange={e => update('address', e.target.value)} placeholder="12 Belgravia Square" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" value={form.city} onChange={e => update('city', e.target.value)} placeholder="London" />
                    </div>
                    <div className="form-group">
                      <label>Postcode</label>
                      <input type="text" value={form.postcode} onChange={e => update('postcode', e.target.value)} placeholder="SW1X 8AB" />
                    </div>
                  </div>
                  <div className="form-group form-group--full">
                    <label>Country</label>
                    <select value={form.country} onChange={e => update('country', e.target.value)}>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="IN">India</option>
                      <option value="AE">UAE</option>
                    </select>
                  </div>

                  {/* Gift options */}
                  <div className="checkout-gift">
                    <label className="checkout-toggle">
                      <input type="checkbox" checked={form.giftWrap} onChange={e => update('giftWrap', e.target.checked)} />
                      <span className="checkout-toggle__label">🎁 Add luxury gift wrapping (+₹1,500)</span>
                    </label>
                    {form.giftWrap && (
                      <textarea
                        className="checkout-gift-note"
                        value={form.giftNote}
                        onChange={e => update('giftNote', e.target.value)}
                        placeholder="Write your personal gift message..."
                        rows={3}
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="payment" className="checkout-form glass-card"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="checkout-form__title">Payment Details</h2>
                  <div className="checkout-pay-icons">
                    {['💳 Visa', '💳 Mastercard', '🅿️ PayPal', '🍎 Apple Pay', '🤖 Google Pay'].map(p => (
                      <span key={p} className="checkout-pay-icon">{p}</span>
                    ))}
                  </div>
                  <div className="form-group form-group--full">
                    <label>Name on Card</label>
                    <input type="text" value={form.cardName} onChange={e => update('cardName', e.target.value)} placeholder="Isabelle Fontaine" />
                  </div>
                  <div className="form-group form-group--full">
                    <label>Card Number</label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={e => update('cardNumber', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" value={form.expiry} onChange={e => update('expiry', e.target.value)} placeholder="MM / YY" maxLength={7} />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="password" value={form.cvv} onChange={e => update('cvv', e.target.value)} placeholder="•••" maxLength={4} />
                    </div>
                  </div>
                  <label className="checkout-toggle">
                    <input type="checkbox" checked={form.saveCard} onChange={e => update('saveCard', e.target.checked)} />
                    <span className="checkout-toggle__label">Save card for future purchases</span>
                  </label>
                  <div className="checkout-secure-note">
                    🔒 Your payment information is encrypted and secure. We never store card details.
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="review" className="checkout-form glass-card"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="checkout-form__title">Review Your Order</h2>
                  <div className="review-section">
                    <h3 className="review-section__title">Delivery To</h3>
                    <p>{form.firstName} {form.lastName}</p>
                    <p>{form.address}, {form.city}, {form.postcode}</p>
                    <p>{form.email} · {form.phone}</p>
                    {form.giftWrap && <p>🎁 Gift wrapped · "{form.giftNote}"</p>}
                  </div>
                  <div className="review-section">
                    <h3 className="review-section__title">Items</h3>
                    {items.map(item => (
                      <div key={item.key} className="review-item">
                        <span className="review-item__emoji">{item.emoji}</span>
                        <div className="review-item__info">
                          <div className="review-item__name">{item.name}</div>
                          {item.size && <div className="review-item__size">Size: {item.size}</div>}
                        </div>
                        <div className="review-item__price gradient-text">
                          ₹ {(item.price * item.qty).toLocaleString('en-IN')} × {item.qty}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="review-totals">
                    <div className="review-total-line"><span>Subtotal</span><span>₹ {total.toLocaleString('en-IN')}</span></div>
                    <div className="review-total-line"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `₹ ${shipping}`}</span></div>
                    {form.giftWrap && <div className="review-total-line"><span>Gift Wrap</span><span>₹ 1,500</span></div>}
                    <div className="review-total-line review-total-line--grand">
                      <span>Total</span>
                      <span className="gradient-text">₹ {(grandTotal + (form.giftWrap ? 1500 : 0)).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="checkout-nav">
              {step > 0 && (
                <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              <button className="btn-primary checkout-nav__next" onClick={handleNext}>
                {step === 2 ? '✓ Place Order' : 'Continue →'}
              </button>
            </div>
          </div>

          {/* Mini Order Summary */}
          <div className="checkout-mini-summary">
            <div className="checkout-mini-summary__inner glass-card">
              <h3 className="checkout-mini-summary__title">Order Summary</h3>
              <div className="checkout-mini-items">
                {items.map(item => (
                  <div key={item.key} className="checkout-mini-item">
                    <div className="checkout-mini-item__thumb" style={{ background: item.bg }}>{item.emoji}</div>
                    <div className="checkout-mini-item__info">
                      <div className="checkout-mini-item__name">{item.name}</div>
                      <div className="checkout-mini-item__price gradient-text">₹ {(item.price * item.qty).toLocaleString('en-IN')}</div>
                    </div>
                    <div className="checkout-mini-item__qty">×{item.qty}</div>
                  </div>
                ))}
              </div>
              <div className="checkout-mini-divider" />
              <div className="checkout-mini-total">
                <span>Total</span>
                <span className="gradient-text">₹ {grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="checkout-security">
                🔒 Checkout secured with 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
