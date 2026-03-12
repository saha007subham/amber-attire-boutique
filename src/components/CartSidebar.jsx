import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose, cartItems = [], onRemove, onUpdateQuantity }) => {
  const navigate = useNavigate();

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    return parseInt(String(price).replace(/[^\d]/g, ''), 10);
  };

  const subtotal = cartItems.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  const formattedTotal = '₹' + subtotal.toLocaleString('en-IN');

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length > 0 ? (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-price">
                      {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price}
                    </span>
                    <div className="item-quantity">
                      <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="item-remove" aria-label="Remove item" onClick={() => onRemove(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Your cart is empty.</p>
              <button className="btn-primary" onClick={onClose}>Continue Shopping</button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>{formattedTotal}</span>
            </div>
            <p className="shipping-note">Taxes and shipping calculated at checkout</p>
            <button className="btn-primary checkout-btn" onClick={() => {
              onClose();
              navigate('/checkout');
            }}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
