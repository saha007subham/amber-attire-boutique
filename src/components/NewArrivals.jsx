import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Eye, Heart, X } from 'lucide-react';
import '../components/QuickView.css';
import './NewArrivals.css';

const products = [
  {
    id: 1,
    name: 'Maroon Zari Woven Kanjivaram Silk',
    price: '₹12,499',
    image: '/images/kanjivaram-silk.png',
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Maroon Tissue Banarasi Saree',
    price: '₹15,999',
    image: '/images/maroon-banarasi.png',
    tag: 'New'
  },
  {
    id: 3,
    name: 'Emerald Green Mysore Silk',
    price: '₹8,999',
    image: '/images/mysore-silk.png',
    tag: ''
  },
  {
    id: 4,
    name: 'Peach Embroidered Organza Saree',
    price: '₹10,500',
    image: '/images/organza-saree.png',
    tag: 'Limited'
  }
];

const NewArrivals = ({ addToCart, addToWishlist, wishlistItems = [] }) => {
  const sectionRef = useRef(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const isWishlisted = (id) => wishlistItems?.some(item => item.id === id);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const products = entry.target.querySelectorAll('.product-card');
            products.forEach((product, index) => {
              setTimeout(() => {
                product.classList.add('active');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="new-arrivals" className="new-arrivals-section reveal" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Exquisite designs fresh from the loom</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card reveal">
              <div className="product-image-container">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />

                {/* Overlay Action Buttons */}
                <div className="product-actions">
                  <button className="action-btn" aria-label="Add to Wishlist" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}>
                    <Heart size={20} fill={isWishlisted(product.id) ? "var(--deep-maroon)" : "none"} color={isWishlisted(product.id) ? "var(--deep-maroon)" : "currentColor"} style={{ transition: 'all 0.3s ease' }} />
                  </button>
                  <button className="action-btn" aria-label="Quick View" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openQuickView(product); }}>
                    <Eye size={20} />
                  </button>
                </div>

                <div className="add-to-cart-wrapper">
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button className="btn-secondary">View All Arrivals</button>
        </div>
      </div>

      {quickViewProduct && (
        <div className="quickview-overlay" onClick={closeQuickView}>
          <div className="quickview-modal" onClick={e => e.stopPropagation()}>
            <button className="quickview-close" onClick={closeQuickView} aria-label="Close">
              <X size={24} />
            </button>
            <div className="quickview-content">
              <div className="quickview-image-container">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="quickview-image" />
                {quickViewProduct.tag && <span className="product-tag">{quickViewProduct.tag}</span>}
              </div>
              <div className="quickview-details">
                <h2 className="quickview-title">{quickViewProduct.name}</h2>
                <div className="quickview-price">{quickViewProduct.price}</div>
                <div className="quickview-description">
                  Experience the epitome of elegance with this beautifully handcrafted saree. Perfect for any special occasion, it features intricate detailing and premium fabric that drapes flawlessly.
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
                    <span className="attr-value in-stock">In Stock</span>
                  </div>
                </div>

                <div className="quickview-actions">
                  <button className="btn-primary flex-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(quickViewProduct); closeQuickView(); }}>
                    <ShoppingBag size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Add to Cart
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
    </section>
  );
};

export default NewArrivals;
