import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, X, ChevronDown, Filter } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import './NewArrivalsPage.css';
import '../components/QuickView.css';

const NewArrivalsPage = ({ addToCart, addToWishlist, wishlistItems = [] }) => {
  const isWishlisted = (id) => wishlistItems?.some(item => item.id === id);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { products, loading, error } = useProducts();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'lowToHigh', 'highToLow'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Derive unique categories from fetched products
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter and sort products
  let displayProducts = [...products];

  if (activeCategory !== 'All') {
    displayProducts = displayProducts.filter(p => p.category === activeCategory);
  }

  if (sortOrder === 'lowToHigh') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'highToLow') {
    displayProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div className="new-arrivals-page flex-center-all" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--amber-gold)' }}>
          <div className="spinner" style={{ width: '50px', height: '50px', border: '3px solid #f3f3f3', borderTop: '3px solid var(--amber-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <h2>Loading Collection...</h2>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="new-arrivals-page" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--deep-maroon)', marginBottom: '20px' }}>Unable to load products</h2>
        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 30px' }}>{error}</p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Please ensure you have configured the Google Apps Script Web App URL.</p>
      </div>
    );
  }

  return (
    <div className="new-arrivals-page">
      <div className="new-arrivals-header">
        <div className="container">
          <span className="section-subtitle-page">Latest Trends</span>
          <h1 className="page-title">The Collection</h1>
          <p className="page-subtitle">
            Explore our complete collection of exquisite handcrafted sarees, fetched live from our boutique's inventory.
          </p>
        </div>
      </div>

      <div className="collection-controls container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '0 20px', flexWrap: 'wrap', gap: '20px' }}>
        <div className="category-filters" style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{ 
                padding: '8px 20px', 
                borderRadius: '30px', 
                border: `1px solid ${activeCategory === category ? 'var(--amber-gold)' : 'var(--soft-beige)'}`,
                background: activeCategory === category ? 'var(--cream)' : 'white',
                color: activeCategory === category ? 'var(--deep-maroon)' : 'var(--text-light)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="sort-control" style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid var(--soft-beige)', borderRadius: '8px', background: 'white' }}
          >
            <Filter size={16} /> Sort By: {sortOrder === 'default' ? 'Featured' : sortOrder === 'lowToHigh' ? 'Price: Low to High' : 'Price: High to Low'} <ChevronDown size={16} />
          </button>
          
          {isFilterOpen && (
            <div style={{ position: 'absolute', top: '100%', right: '0', marginTop: '10px', background: 'white', border: '1px solid var(--soft-beige)', borderRadius: '8px', boxShadow: 'var(--shadow-md)', zIndex: 10, width: '200px', overflow: 'hidden' }}>
              <button style={{ width: '100%', padding: '12px 20px', textAlign: 'left', borderBottom: '1px solid var(--cream)' }} onClick={() => { setSortOrder('default'); setIsFilterOpen(false); }}>Featured</button>
              <button style={{ width: '100%', padding: '12px 20px', textAlign: 'left', borderBottom: '1px solid var(--cream)' }} onClick={() => { setSortOrder('lowToHigh'); setIsFilterOpen(false); }}>Price: Low to High</button>
              <button style={{ width: '100%', padding: '12px 20px', textAlign: 'left' }} onClick={() => { setSortOrder('highToLow'); setIsFilterOpen(false); }}>Price: High to Low</button>
            </div>
          )}
        </div>
      </div>

      <div className="products-container container">
        {displayProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ color: 'var(--text-light)' }}>No products found in this category.</h3>
          </div>
        ) : (
          <div className="product-grid-4">
            {displayProducts.map((product) => (
              <div className="product-card reveal active" key={product.id}>
                <div className="product-image-container">
                  {product.stock === 0 ? (
                    <span className="product-tag" style={{ background: '#5b2126', color: 'white' }}>Out of Stock</span>
                  ) : product.badge ? (
                    <span className="product-tag">{product.badge}</span>
                  ) : product.tag ? (
                    <span className="product-tag">{product.tag}</span>
                  ) : null}
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />

                <div className="product-actions">
                  <button className="action-btn" aria-label="Add to Wishlist" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}>
                    <Heart size={20} fill={isWishlisted(product.id) ? "var(--deep-maroon)" : "none"} color={isWishlisted(product.id) ? "var(--deep-maroon)" : "currentColor"} style={{ transition: 'all 0.3s ease' }} />
                  </button>
                  <button className="action-btn" aria-label="Quick View" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openQuickView(product); }}>
                    <Eye size={20} />
                  </button>
                </div>

                <div className="add-to-cart-wrapper">
                  <button 
                    className="add-to-cart-btn" 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                    disabled={product.stock === 0}
                    style={{ opacity: product.stock === 0 ? 0.5 : 1, cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    <ShoppingBag size={18} /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>

              <div className="product-info">
                <span style={{ fontSize: '0.8rem', color: 'var(--amber-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quickview-overlay" onClick={closeQuickView}>
          <div className="quickview-modal" onClick={e => e.stopPropagation()}>
            <button className="quickview-close" onClick={closeQuickView} aria-label="Close">
              <X size={24} />
            </button>
            <div className="quickview-content">
              <div className="quickview-image-container">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="quickview-image" />
                {quickViewProduct.stock === 0 ? (
                  <span className="product-tag" style={{ background: '#5b2126', color: 'white' }}>Out of Stock</span>
                ) : (quickViewProduct.badge || quickViewProduct.tag) ? (
                  <span className="product-tag">{quickViewProduct.badge || quickViewProduct.tag}</span>
                ) : null}
              </div>
              <div className="quickview-details">
                <span style={{ fontSize: '0.8rem', color: 'var(--amber-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>{quickViewProduct.category}</span>
                <h2 className="quickview-title" style={{ marginTop: '5px' }}>{quickViewProduct.name}</h2>
                <div className="quickview-price">
                  ₹{quickViewProduct.price.toLocaleString()}
                </div>
                <div className="quickview-description">
                  {quickViewProduct.description || "Experience the epitome of elegance with this beautifully handcrafted saree. Perfect for any special occasion, it features intricate detailing and premium fabric that drapes flawlessly."}
                </div>

                <div className="quickview-attributes">
                  <div className="attribute">
                    <span className="attr-label">Fabric:</span>
                    <span className="attr-value">{quickViewProduct.name.toLowerCase().includes('silk') ? 'Pure Silk' : (quickViewProduct.name.toLowerCase().includes('organza') ? 'Organza' : 'Premium Blend')}</span>
                  </div>
                  <div className="attribute">
                    <span className="attr-label">Color:</span>
                    <span className="attr-value">{quickViewProduct.name.split(' ')[0]}</span>
                  </div>
                  <div className="attribute">
                    <span className="attr-label">Occasion:</span>
                    <span className="attr-value">{quickViewProduct.name.toLowerCase().includes('bridal') || quickViewProduct.name.toLowerCase().includes('wedding') ? 'Wedding' : 'Festive & Party'}</span>
                  </div>
                  <div className="attribute">
                    <span className="attr-label">Availability:</span>
                    <span className={`attr-value ${quickViewProduct.stock > 0 ? 'in-stock' : ''}`} style={{ color: quickViewProduct.stock === 0 ? 'var(--deep-maroon)' : 'inherit' }}>
                      {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} In Stock` : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <div className="quickview-actions">
                  <button 
                    className="btn-primary flex-1" 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(quickViewProduct); closeQuickView(); }}
                    disabled={quickViewProduct.stock === 0}
                    style={{ opacity: quickViewProduct.stock === 0 ? 0.5 : 1, cursor: quickViewProduct.stock === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    <ShoppingBag size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> {quickViewProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button className="btn-secondary flex-none" style={{ padding: '0.8rem 1.2rem' }} aria-label="Add to Wishlist" onClick={() => addToWishlist(quickViewProduct)}>
                    <Heart size={20} fill={isWishlisted(quickViewProduct.id) ? "currentColor" : "none"} style={{ transition: 'all 0.3s ease' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivalsPage;
