import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Eye, Filter, ChevronDown, CheckCircle, Truck, RefreshCw, ShieldCheck, Banknote, ShoppingBag, X } from 'lucide-react';
import './ShopCollection.css';
import '../components/QuickView.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Maroon Zari Woven Kanjivaram Silk",
    price: 12499,
    image: "/images/kanjivaram-silk.png",
    badge: "BESTSELLER"
  },
  {
    id: 2,
    name: "Maroon Tissue Banarasi Saree",
    price: 15999,
    image: "/images/maroon-banarasi.png",
    badge: "NEW"
  },
  {
    id: 3,
    name: "Emerald Green Mysore Silk",
    price: 8999,
    image: "/images/mysore-silk.png",
    badge: ""
  },
  {
    id: 4,
    name: "Peach Embroidered Organza Saree",
    price: 10500,
    image: "/images/organza-saree.png",
    badge: "LIMITED"
  },
  {
    id: 5,
    name: "Midnight Blue Silk Handloom",
    price: 14200,
    image: "/images/silk-sarees.png",
    badge: "NEW"
  },
  {
    id: 6,
    name: "Golden Festive Tissue Silk",
    price: 18500,
    image: "/images/festive-wear.png",
    badge: "BESTSELLER"
  },
  {
    id: 7,
    name: "Crimson Red Bridal Saree",
    price: 24500,
    image: "/images/wedding-collection.png",
    badge: "LIMITED"
  },
  {
    id: 8,
    name: "Pastel Pink Party Wear Geo",
    price: 7800,
    image: "/images/party-wear.png",
    badge: ""
  }
];

const SILK_SAREES = [
  {
    id: 101,
    name: "Royal Blue Kanjivaram Silk",
    price: 18500,
    image: "/images/kanjivaram-silk.png",
    badge: "NEW"
  },
  {
    id: 102,
    name: "Golden Tissue Mysore Silk",
    price: 15200,
    image: "/images/mysore-silk.png",
    badge: "BESTSELLER"
  },
  {
    id: 103,
    name: "Emerald Patola Silk",
    price: 21000,
    image: "/images/silk-sarees.png",
    badge: "PREMIUM"
  },
  {
    id: 104,
    name: "Crimson Red Banarasi Silk",
    price: 19500,
    image: "/images/maroon-banarasi.png",
    badge: "LIMITED"
  }
];

const WEDDING_COLLECTION = [
  {
    id: 201,
    name: "Classic Vermilion Bridal Saree",
    price: 35000,
    image: "/images/wedding-collection.png",
    badge: "EXCLUSIVE"
  },
  {
    id: 202,
    name: "Ivory & Gold Zari Gown Saree",
    price: 28500,
    image: "/images/festive-wear.png",
    badge: "NEW"
  },
  {
    id: 203,
    name: "Ruby Red Kanjivaram Bridal",
    price: 42000,
    image: "/images/kanjivaram-silk.png",
    badge: "LIMITED"
  },
  {
    id: 204,
    name: "Blush Pink Embroidered Net",
    price: 18500,
    image: "/images/organza-saree.png",
    badge: ""
  }
];

const PARTY_WEAR = [
  {
    id: 301,
    name: "Midnight Sequinned Georgette",
    price: 12500,
    image: "/images/silk-sarees.png",
    badge: "NEW"
  },
  {
    id: 302,
    name: "Rose Gold Pre-Draped Saree",
    price: 14200,
    image: "/images/party-wear.png",
    badge: "TRENDING"
  },
  {
    id: 303,
    name: "Silver Ombre Chiffon",
    price: 9500,
    image: "/images/organza-saree.png",
    badge: ""
  },
  {
    id: 304,
    name: "Emerald Ruffle Border Saree",
    price: 11000,
    image: "/images/festive-wear.png",
    badge: "LIMITED"
  }
];

const FESTIVE_WEAR = [
  {
    id: 401,
    name: "Mustard Yellow Silk Blend",
    price: 8500,
    image: "/images/mysore-silk.png",
    badge: "NEW"
  },
  {
    id: 402,
    name: "Ruby Red Tissue Saree",
    price: 13500,
    image: "/images/festive-wear.png",
    badge: "BESTSELLER"
  },
  {
    id: 403,
    name: "Teal Green Banarasi Art Silk",
    price: 7200,
    image: "/images/maroon-banarasi.png",
    badge: ""
  },
  {
    id: 404,
    name: "Golden Zari Woven Kanjivaram",
    price: 16500,
    image: "/images/kanjivaram-silk.png",
    badge: "PREMIUM"
  }
];

const SECTIONS_CONFIG = [
  { id: 'New Arrival', title: 'New Arrivals', data: MOCK_PRODUCTS },
  { id: 'Exclusive Silk Collection', title: 'Exclusive Silk Collection', data: SILK_SAREES },
  { id: 'Wedding Collection', title: 'Wedding Collection', data: WEDDING_COLLECTION },
  { id: 'Party Wear', title: 'Party Wear', data: PARTY_WEAR },
  { id: 'Festive Wear', title: 'Festive Wear', data: FESTIVE_WEAR },
];

const ShopCollection = ({ addToCart, addToWishlist, wishlistItems = [] }) => {
  const isWishlisted = (id) => wishlistItems?.some(item => item.id === id);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const checkSearchQuery = (product) => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return product.name.toLowerCase().includes(lowerQuery) || 
           (product.category && product.category.toLowerCase().includes(lowerQuery));
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handlePriceSelect = (range) => {
    setSelectedPriceRange(range);
  };

  const checkPriceRange = (price, range) => {
    if (!range) return true;
    switch (range) {
      case '0 - 5000': return price >= 0 && price <= 5000;
      case '5001 - 10000': return price > 5000 && price <= 10000;
      case '10001 - 15000': return price > 10000 && price <= 15000;
      case 'Above 15000': return price > 15000;
      default: return true;
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const checkColor = (name, color) => {
    if (!color) return true;
    const lowerName = name.toLowerCase();
    switch (color) {
      case 'Red': return lowerName.includes('red') || lowerName.includes('crimson') || lowerName.includes('vermilion') || lowerName.includes('ruby');
      case 'Green': return lowerName.includes('green') || lowerName.includes('emerald') || lowerName.includes('teal');
      case 'Blue': return lowerName.includes('blue') || lowerName.includes('midnight');
      case 'Maroon': return lowerName.includes('maroon');
      case 'Gold': return lowerName.includes('gold') || lowerName.includes('yellow') || lowerName.includes('mustard');
      case 'Pink': return lowerName.includes('pink') || lowerName.includes('peach') || lowerName.includes('rose');
      default: return true;
    }
  };

  const orderedSections = selectedCategory
    ? [
      SECTIONS_CONFIG.find(s => s.id === selectedCategory),
      ...SECTIONS_CONFIG.filter(s => s.id !== selectedCategory)
    ]
    : SECTIONS_CONFIG;

  return (
    <div className="shop-page">
      {/* Page Header */}
      <div className="shop-header">
        <div className="container">

          <h1 className="shop-title">Shop Saree Collection</h1>
          <p className="shop-subtitle">
            Explore our curated selection of handcrafted sarees blending tradition with elegance.
          </p>
        </div>
      </div>

      {/* Filter & Sorting Section */}
      <div className="shop-controls-wrapper">
        <div className="container">
          {searchQuery && (
            <div className="search-active-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '1rem 1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eaeaea' }}>
              <span style={{ fontSize: '1.1rem', color: '#333' }}>
                Search results for: <strong style={{ color: '#c68e3b', fontWeight: '600' }}>"{searchQuery}"</strong>
              </span>
              <button 
                onClick={() => navigate('/shop')}
                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '4px', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#eee'; e.currentTarget.style.color = '#333'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#666'; }}
                aria-label="Clear Search"
              >
                <X size={16} /> Clear Search
              </button>
            </div>
          )}
          <div className="shop-controls">
            <div className="filter-bar">
              <div className="filter-dropdown category-dropdown">
                <span>{selectedCategory || 'Category'}</span> <ChevronDown size={14} />
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => handleCategorySelect('New Arrival')}>New Arrival</button>
                  <button className="dropdown-item" onClick={() => handleCategorySelect('Exclusive Silk Collection')}>Exclusive Silk Collection</button>
                  <button className="dropdown-item" onClick={() => handleCategorySelect('Wedding Collection')}>Wedding Collection</button>
                  <button className="dropdown-item" onClick={() => handleCategorySelect('Party Wear')}>Party Wear</button>
                  <button className="dropdown-item" onClick={() => handleCategorySelect('Festive Wear')}>Festive Wear</button>
                  {selectedCategory && <button className="dropdown-item" onClick={() => handleCategorySelect(null)} style={{ borderTop: '1px solid #ebebeb', color: '#8b5a2b' }}>Clear Selection</button>}
                </div>
              </div>
              <div className="filter-dropdown category-dropdown">
                <span>{selectedPriceRange || 'Price Range'}</span> <ChevronDown size={14} />
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => handlePriceSelect('0 - 5000')}>0 - 5000</button>
                  <button className="dropdown-item" onClick={() => handlePriceSelect('5001 - 10000')}>5001 - 10000</button>
                  <button className="dropdown-item" onClick={() => handlePriceSelect('10001 - 15000')}>10001 - 15000</button>
                  <button className="dropdown-item" onClick={() => handlePriceSelect('Above 15000')}>Above 15000</button>
                  {selectedPriceRange && <button className="dropdown-item" onClick={() => handlePriceSelect(null)} style={{ borderTop: '1px solid #ebebeb', color: '#8b5a2b' }}>Clear Selection</button>}
                </div>
              </div>
              <div className="filter-dropdown category-dropdown">
                <span>{selectedColor || 'Color'}</span> <ChevronDown size={14} />
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => handleColorSelect('Red')}>Red</button>
                  <button className="dropdown-item" onClick={() => handleColorSelect('Green')}>Green</button>
                  <button className="dropdown-item" onClick={() => handleColorSelect('Blue')}>Blue</button>
                  <button className="dropdown-item" onClick={() => handleColorSelect('Maroon')}>Maroon</button>
                  <button className="dropdown-item" onClick={() => handleColorSelect('Gold')}>Gold</button>
                  <button className="dropdown-item" onClick={() => handleColorSelect('Pink')}>Pink</button>
                  {selectedColor && <button className="dropdown-item" onClick={() => handleColorSelect(null)} style={{ borderTop: '1px solid #ebebeb', color: '#8b5a2b' }}>Clear Selection</button>}
                </div>
              </div>
            </div>

            <div className="sort-bar">
              <label>Sort By:</label>
              <div className="sort-dropdown">
                <span>Featured</span> <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="shop-products">
        <div className="container">
          {/* Dynamically Ordered and Filtered Collections */}
          {orderedSections.every(section =>
            section.data.filter(product => checkPriceRange(product.price, selectedPriceRange) && checkColor(product.name, selectedColor) && checkSearchQuery(product)).length === 0
          ) ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#c68e3b' }}>Oops</div>
              <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>No product found</h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>We couldn't find any sarees matching your selected filters.</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSelectedColor(null);
                  setSelectedPriceRange(null);
                  setSelectedCategory(null);
                  if (searchQuery) navigate('/shop');
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            orderedSections.map((section, index) => {
              const filteredData = section.data.filter(product => checkPriceRange(product.price, selectedPriceRange) && checkColor(product.name, selectedColor) && checkSearchQuery(product));

              // Skip rendering the section entirely if no products match the price filter
              if (filteredData.length === 0) return null;

              return (
                <div className="collection-highlight" key={section.id} style={{ marginTop: index === 0 ? '0' : '5rem', marginBottom: '4rem' }}>
                  <h2 className="shop-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{section.title}</h2>
                  <div className="product-grid-4">
                    {filteredData.map((product) => (
                      <div className="product-card" key={product.id}>
                        <div className="product-image-container">
                          {product.badge && <span className="product-tag">{product.badge}</span>}
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
                            <button className="add-to-cart-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}>
                              <ShoppingBag size={18} /> Add to Cart
                            </button>
                          </div>
                        </div>

                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>
                          <span className="product-price">₹{product.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Trust Section */}
      <div className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon"><Truck size={32} /></div>
              <h4>Free Shipping</h4>
              <p>Across India on all orders</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><RefreshCw size={32} /></div>
              <h4>Easy 7-Day Returns</h4>
              <p>Hassle-free exchange policy</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><ShieldCheck size={32} /></div>
              <h4>Secure Payments</h4>
              <p>100% safe and encrypted</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><Banknote size={32} /></div>
              <h4>Cash on Delivery</h4>
              <p>Available on select pin codes</p>
            </div>
          </div>
        </div>
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
                {quickViewProduct.badge && <span className="product-tag">{quickViewProduct.badge}</span>}
              </div>
              <div className="quickview-details">
                <h2 className="quickview-title">{quickViewProduct.name}</h2>
                <div className="quickview-price">₹{quickViewProduct.price.toLocaleString()}</div>
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
    </div>
  );
};

export default ShopCollection;
