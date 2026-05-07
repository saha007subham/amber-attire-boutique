import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { products } = useProducts();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setResults([]);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerQuery = query.toLowerCase();
      // Remove duplicates by id if any exist
      const uniqueProducts = Array.from(new Map(products.map(item => [item.id, item])).values());
      const matches = uniqueProducts.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        (product.category && product.category.toLowerCase().includes(lowerQuery))
      );
      setResults(matches.slice(0, 5)); // Show top 5 results
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleResultClick = (product) => {
    navigate(`/shop?search=${encodeURIComponent(product.name)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-container" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <form className="search-modal-form" onSubmit={handleSubmit}>
            <Search className="search-modal-icon" size={24} />
            <input
              ref={inputRef}
              type="text"
              className="search-modal-input"
              placeholder="Search for sarees, collections, colors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </form>
          <button className="search-close-btn" onClick={onClose} aria-label="Close search">
            <X size={28} />
          </button>
        </div>

        {query.trim().length > 1 && (
          <div className="search-results-container">
            {results.length > 0 ? (
              <>
                <div className="search-results-label">Products</div>
                <div className="search-results-list">
                  {results.map((product) => (
                    <div 
                      key={product.id} 
                      className="search-result-item"
                      onClick={() => handleResultClick(product)}
                    >
                      <div className="search-result-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="search-result-info">
                        <h4 className="search-result-name">{product.name}</h4>
                        <span className="search-result-price">₹{product.price.toLocaleString()}</span>
                      </div>
                      <ChevronRight className="search-result-arrow" size={20} />
                    </div>
                  ))}
                </div>
                <button 
                  className="search-view-all-btn"
                  onClick={handleSubmit}
                >
                  View all results for "{query}"
                </button>
              </>
            ) : (
              <div className="search-no-results">
                <p>No products found for "{query}"</p>
                <span>Try checking your spelling or use more general terms</span>
              </div>
            )}
          </div>
        )}
        
        {query.trim().length <= 1 && (
          <div className="search-suggestions">
            <div className="search-results-label">Popular Searches</div>
            <div className="search-tags">
              {['Kanjivaram', 'Banarasi', 'Red Saree', 'Silk', 'Wedding', 'Party Wear'].map((tag) => (
                <button 
                  key={tag} 
                  className="search-tag-btn"
                  onClick={() => {
                    setQuery(tag);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
