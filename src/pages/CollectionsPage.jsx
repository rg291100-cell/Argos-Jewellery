import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { products, collections } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import './CollectionsPage.css';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
];

const CollectionsPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [sort, setSort] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const activeCollection = collections.find(c => c.id === category);

  const filtered = useMemo(() => {
    let list = category ? products.filter(p => p.category === category) : [...products];
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'newest': return [...list].filter(p => p.isNew).concat(list.filter(p => !p.isNew));
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [category, sort, searchQuery]);

  useEffect(() => { window.scrollTo(0, 0); }, [category]);

  return (
    <div className="collections-page">
      {/* Hero banner */}
      <section className="coll-hero">
        <div className="coll-hero__bg" />
        <div className="container coll-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>›</span>
              <Link to="/collections">Collections</Link>
              {category && <><span>›</span> <span>{activeCollection?.label || category}</span></>}
              {searchQuery && <><span>›</span> <span>Search: "{searchQuery}"</span></>}
            </div>
            <div className="coll-hero__content">
              {activeCollection ? (
                <>
                  <div className="coll-hero__icon">{activeCollection.icon}</div>
                  <h1 className="coll-hero__title">{activeCollection.label}</h1>
                  <p className="coll-hero__subtitle">{activeCollection.count} exceptional pieces, each a masterwork</p>
                </>
              ) : searchQuery ? (
                <>
                  <h1 className="coll-hero__title">Search Results</h1>
                  <p className="coll-hero__subtitle">{filtered.length} results for "{searchQuery}"</p>
                </>
              ) : (
                <>
                  <h1 className="coll-hero__title">All Collections</h1>
                  <p className="coll-hero__subtitle">Explore our complete universe of fine jewellery — {products.length} extraordinary pieces</p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container">
        {/* Category nav pills */}
        {!searchQuery && (
          <motion.div
            className="coll-cats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/collections" className={`coll-cat-pill ${!category ? 'active' : ''}`}>
              All <span className="coll-cat-count">{products.length}</span>
            </Link>
            {collections.map(c => (
              <Link key={c.id} to={`/collections/${c.id}`} className={`coll-cat-pill ${category === c.id ? 'active' : ''}`}>
                {c.icon} {c.label} <span className="coll-cat-count">{products.filter(p => p.category === c.id).length}</span>
              </Link>
            ))}
          </motion.div>
        )}

        {/* Toolbar */}
        <div className="coll-toolbar">
          <span className="coll-count">{filtered.length} piece{filtered.length !== 1 ? 's' : ''}</span>
          <div className="coll-toolbar__right">
            <select className="coll-sort" value={sort} onChange={e => setSort(e.target.value)}>
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="coll-view-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} aria-label="Grid view">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              </button>
              <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} aria-label="List view">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="2"/><rect x="3" y="11" width="18" height="2"/><rect x="3" y="18" width="18" height="2"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Grid / List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${sort}-${viewMode}`}
            ref={ref}
            className={viewMode === 'grid' ? 'coll-grid' : 'coll-list'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length > 0 ? (
              filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} viewMode={viewMode} />
              ))
            ) : (
              <div className="coll-empty">
                <div className="coll-empty__icon">🔍</div>
                <h3>No pieces found</h3>
                <p>Try adjusting your search or browse all collections</p>
                <Link to="/collections" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>Browse All</Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CollectionsPage;
