import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import './WishlistSidebar.css';

const WishlistSidebar = ({ isOpen, onClose, wishlistItems = [], onRemove, onMoveToCart }) => {
  return (
    <>
      <div className={`wishlist-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`wishlist-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="wishlist-header">
          <h3>My Wishlist</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={24} />
          </button>
        </div>

        <div className="wishlist-content">
          {wishlistItems.length > 0 ? (
            <div className="wishlist-items">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-price">
                      {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price}
                    </span>
                    <button 
                      className="add-to-cart-from-wishlist"
                      onClick={() => onMoveToCart(item)}
                    >
                      <ShoppingBag size={14} /> Move to Cart
                    </button>
                  </div>
                  <button className="item-remove" aria-label="Remove item" onClick={() => onRemove(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-wishlist">
              <Heart size={48} />
              <p>Your wishlist is currently empty.</p>
              <button className="btn-primary" onClick={onClose}>Continue Shopping</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
