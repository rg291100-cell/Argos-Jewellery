import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ui/ProductCard';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [notify, setNotify] = useState(false);

  const related = product ? getRelatedProducts(product.related || []) : [];
  const wishlisted = product ? isWishlisted(product.id) : false;

  useEffect(() => { window.scrollTo(0, 0); setSelectedSize(null); setQty(1); setActiveImg(0); }, [id]);

  if (!product) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', padding: '8rem 2rem' }}>
        <div style={{ fontSize: '4rem' }}>💎</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', margin: '1rem 0' }}>Product Not Found</h2>
        <Link to="/collections" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>Browse Collections</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      setNotify(true);
      setTimeout(() => setNotify(false), 3000);
      return;
    }
    setAdding(true);
    addToCart(product, selectedSize, qty);
    setTimeout(() => setAdding(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="pdp">
      {/* Breadcrumb */}
      <div className="container pdp__breadcrumb">
        <Link to="/">Home</Link> <span>›</span>
        <Link to="/collections">Collections</Link> <span>›</span>
        <Link to={`/collections/${product.category}`}>{product.category}</Link> <span>›</span>
        <span>{product.name}</span>
      </div>

      <div className="container pdp__body">
        {/* Left: Images */}
        <div className="pdp__gallery">
          <div className="pdp__gallery-main" style={{ background: product.bg }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                className="pdp__gallery-emoji"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                {product.images[activeImg]}
              </motion.div>
            </AnimatePresence>
            {product.tag && (
              <span className="pdp__tag" style={{ background: product.tagColor }}>{product.tag}</span>
            )}
            {discount && (
              <span className="pdp__discount">-{discount}%</span>
            )}
            {/* Floating deco rings */}
            <div className="pdp__deco-ring pdp__deco-ring--1" />
            <div className="pdp__deco-ring pdp__deco-ring--2" />
          </div>

          {/* Thumbnails */}
          <div className="pdp__thumbnails">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`pdp__thumb ${i === activeImg ? 'active' : ''}`}
                onClick={() => setActiveImg(i)}
                style={{ background: product.bg }}
              >
                {img}
              </button>
            ))}
          </div>

          {/* Trust badges */}
          <div className="pdp__trust">
            {[
              { icon: '🔒', text: 'Secure Payment' },
              { icon: '📦', text: 'Free Delivery' },
              { icon: '↩️', text: '30-Day Returns' },
              { icon: '📜', text: 'Certified' },
            ].map(t => (
              <div key={t.text} className="pdp__trust-item">
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="pdp__info">
          <div className="pdp__category">{product.category} · SKU: {product.sku}</div>
          <h1 className="pdp__title">{product.name}</h1>

          {/* Rating */}
          <div className="pdp__rating">
            <span className="pdp__stars">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</span>
            <span className="pdp__review-count">{product.reviews} reviews</span>
            <span className="pdp__divider">·</span>
            <span className={`pdp__stock ${product.inStock ? 'in' : 'out'}`}>
              {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="pdp__price-wrap">
            <span className="pdp__price gradient-text">₹ {product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="pdp__original">₹ {product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="pdp__save">Save ₹ {(product.originalPrice - product.price).toLocaleString('en-IN')}</span>
              </>
            )}
          </div>

          <p className="pdp__desc">{product.shortDesc}</p>

          <div className="pdp__divider-line" />

          {/* Size selector */}
          {product.sizes.length > 1 && (
            <div className="pdp__size-wrap">
              <div className="pdp__size-header">
                <span className="pdp__label">
                  {product.category === 'rings' ? 'Ring Size' :
                   product.category === 'bracelets' ? 'Bracelet Size' :
                   product.category === 'necklaces' ? 'Chain Length' : 'Size'}
                </span>
                <button className="pdp__size-guide">Size Guide →</button>
              </div>
              <div className="pdp__sizes">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`pdp__size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {notify && (
                  <motion.p className="pdp__size-notify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ⚠️ Please select a size before adding to cart
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Qty + Add */}
          <div className="pdp__add-wrap">
            <div className="pdp__qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className={`btn-primary pdp__add-btn ${adding ? 'adding' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{ flex: 1 }}
            >
              {adding ? '✓ Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              {!adding && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
            </button>
            <button
              className={`pdp__wishlist-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => toggle(product)}
              aria-label="Wishlist"
            >
              {wishlisted ? '❤️' : '🤍'}
            </button>
          </div>

          <button className="pdp__buy-now" onClick={() => { handleAddToCart(); setTimeout(() => navigate('/cart'), 400); }}>
            Buy Now — ₹ {(product.price * qty).toLocaleString('en-IN')}
          </button>

          {/* Tabs */}
          <div className="pdp__tabs">
            {['details', 'materials', 'care', 'delivery'].map(tab => (
              <button
                key={tab}
                className={`pdp__tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="pdp__tab-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'details' && <p>{product.longDesc}</p>}
              {activeTab === 'materials' && (
                <ul className="pdp__materials-list">
                  {product.materials.map(m => <li key={m}>{m}</li>)}
                </ul>
              )}
              {activeTab === 'care' && <p>{product.careInstructions}</p>}
              {activeTab === 'delivery' && <p>{product.delivery}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pdp__related container">
          <div className="pdp__related-header">
            <span className="section-label">You May Also Love</span>
            <h2 className="pdp__related-title">Complete the <em className="pink-gradient-text">Look</em></h2>
          </div>
          <div className="pdp__related-grid">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
