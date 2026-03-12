import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Wallet, Banknote, Landmark, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems = [], clearCart }) => {
    const navigate = useNavigate();
    const [deliveryOption, setDeliveryOption] = useState('standard');
    const [paymentOption, setPaymentOption] = useState('card');
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        if (!price) return 0;
        return parseInt(String(price).replace(/[^\d]/g, ''), 10);
    };

    const subtotal = cartItems.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
    const shippingCost = deliveryOption === 'express' ? 500 : 0;
    const total = subtotal + shippingCost - discount;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (couponCode.toLowerCase() === 'welcome10') {
            setDiscount(Math.floor(subtotal * 0.1));
        } else {
            setDiscount(0);
            alert('Invalid coupon code. Try WELCOME10');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let paymentMethodLabel = 'Credit/Debit Card';
        if (paymentOption === 'upi') paymentMethodLabel = 'UPI';
        if (paymentOption === 'netbanking') paymentMethodLabel = 'Net Banking';
        if (paymentOption === 'cod') paymentMethodLabel = 'Cash on Delivery';

        let productsList = cartItems.map(item =>
            `${item.name} – Qty ${item.quantity} – ₹${(parsePrice(item.price) * item.quantity).toLocaleString('en-IN')}`
        ).join('\n');

        const orderData = {
            customerName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            products: productsList,
            totalAmount: total,
            paymentMethod: paymentMethodLabel,
            notes: formData.notes
        };

        try {
            // Replace this URL with your actual deployed Google Apps Script Webhook URL
            const GOOGLE_SCRIPT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby105A-lVEjbNe2uW0orGdLXHL0G2-6PGTwVDSNbaIGvWhEuWLfK2tzWY_IiI1Pnj8-PQ/exec";

            // Uncomment the actual fetch call once you have the Webhook URL

            await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });


            // Simulated delay for UX
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (clearCart) clearCart();
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('There was a problem processing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0 && !showSuccessModal) {
        return (
            <div className="checkout-empty-container">
                <h2>Your cart is empty</h2>
                <p>Return to the shop to add items before checking out.</p>
                <a href="/shop" className="btn-primary">Return to Shop</a>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <h1 className="checkout-title">Checkout</h1>

            <form className="checkout-grid" onSubmit={handleSubmit}>

                {/* Left Section: Customer Info */}
                <div className="checkout-section">
                    <h2 className="section-heading">Customer Information</h2>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="fullName" required placeholder="Jane Doe" value={formData.fullName} onChange={handleInputChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" required placeholder="jane@example.com" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" required placeholder="+91 9876543210" value={formData.phone} onChange={handleInputChange} />
                        </div>
                    </div>

                    <h3 className="sub-heading mt-2">Shipping Address</h3>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" required placeholder="123 Luxury Lane, Apartment 4B" value={formData.address} onChange={handleInputChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" required placeholder="Mumbai" value={formData.city} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input type="text" name="state" required placeholder="Maharashtra" value={formData.state} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Pincode</label>
                            <input type="text" name="pincode" required placeholder="400001" value={formData.pincode} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" name="country" required value={formData.country} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group mt-2">
                        <label>Order Notes (Optional)</label>
                        <textarea name="notes" placeholder="Special instructions for delivery..." rows="3" value={formData.notes} onChange={handleInputChange}></textarea>
                    </div>
                </div>

                {/* Middle Section: Delivery Options */}
                <div className="checkout-section">
                    <h2 className="section-heading">Delivery Options</h2>
                    <div className="delivery-options">
                        <label className={`delivery-card ${deliveryOption === 'standard' ? 'active' : ''}`}>
                            <div className="delivery-info">
                                <input
                                    type="radio"
                                    name="delivery"
                                    checked={deliveryOption === 'standard'}
                                    onChange={() => setDeliveryOption('standard')}
                                />
                                <div>
                                    <span className="delivery-title">Standard Delivery</span>
                                    <span className="delivery-desc">3–5 Business Days</span>
                                </div>
                            </div>
                            <span className="delivery-price">Free</span>
                        </label>

                        <label className={`delivery-card ${deliveryOption === 'express' ? 'active' : ''}`}>
                            <div className="delivery-info">
                                <input
                                    type="radio"
                                    name="delivery"
                                    checked={deliveryOption === 'express'}
                                    onChange={() => setDeliveryOption('express')}
                                />
                                <div>
                                    <span className="delivery-title">Express Delivery</span>
                                    <span className="delivery-desc">1–2 Business Days</span>
                                </div>
                            </div>
                            <span className="delivery-price">₹500</span>
                        </label>
                    </div>
                </div>

                {/* Right Section: Order Summary & Payment */}
                <div className="checkout-section summary-section">
                    <h2 className="section-heading">Order Summary</h2>

                    <div className="summary-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="summary-item">
                                <img src={item.image} alt={item.name} className="summary-image" />
                                <div className="summary-details">
                                    <h4 className="summary-name">{item.name}</h4>
                                    <span className="summary-qty">Qty: {item.quantity}</span>
                                </div>
                                <span className="summary-price">
                                    ₹{(parsePrice(item.price) * item.quantity).toLocaleString('en-IN')}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="coupon-section">
                        <div className="coupon-input-group">
                            <input
                                type="text"
                                placeholder="Discount code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button className="btn-secondary" onClick={handleApplyCoupon}>Apply</button>
                        </div>
                    </div>

                    <div className="financials">
                        <div className="financial-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="financial-row">
                            <span>Shipping</span>
                            <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString('en-IN')}`}</span>
                        </div>
                        {discount > 0 && (
                            <div className="financial-row discount-row">
                                <span>Discount</span>
                                <span>-₹{discount.toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        <div className="financial-row total-row">
                            <span>Total</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <h3 className="sub-heading mt-3">Payment Method</h3>
                    <div className="payment-options">
                        <label className={`payment-card ${paymentOption === 'card' ? 'active' : ''}`}>
                            <input type="radio" name="payment" checked={paymentOption === 'card'} onChange={() => setPaymentOption('card')} />
                            <CreditCard size={18} /> Credit / Debit Card
                        </label>
                        <label className={`payment-card ${paymentOption === 'upi' ? 'active' : ''}`}>
                            <input type="radio" name="payment" checked={paymentOption === 'upi'} onChange={() => setPaymentOption('upi')} />
                            <Wallet size={18} /> UPI
                        </label>
                        <label className={`payment-card ${paymentOption === 'netbanking' ? 'active' : ''}`}>
                            <input type="radio" name="payment" checked={paymentOption === 'netbanking'} onChange={() => setPaymentOption('netbanking')} />
                            <Landmark size={18} /> Net Banking
                        </label>
                        <label className={`payment-card ${paymentOption === 'cod' ? 'active' : ''}`}>
                            <input type="radio" name="payment" checked={paymentOption === 'cod'} onChange={() => setPaymentOption('cod')} />
                            <Banknote size={18} /> Cash on Delivery
                        </label>
                    </div>

                    <button type="submit" className="btn-primary place-order-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>

                    {/* Trust Indicators */}
                    {/* <div className="trust-indicators-sm">
                        <div className="indicator">
                            <ShieldCheck size={16} /> Secure Payment
                        </div>
                        <div className="indicator">
                            <Truck size={16} /> Free Shipping
                        </div>
                        <div className="indicator">
                            <RotateCcw size={16} /> Easy Returns
                        </div>
                    </div> */}
                    {/* </div> */}
                </div>
            </form>

            {/* Order Success Modal */}
            {showSuccessModal && (
                <div className="order-success-overlay">
                    <div className="order-success-modal">
                        <div className="success-icon-wrapper">
                            <CheckCircle size={64} className="success-icon" />
                        </div>
                        <h2>Order Placed Successfully! 🎉</h2>
                        <p>Thank you for shopping with Amber Attiire.<br />Your order has been received and our team will contact you shortly.</p>

                        <div className="modal-actions">
                            <button className="btn-primary" onClick={() => navigate('/shop')}>Continue Shopping</button>
                            <button className="btn-secondary" onClick={() => { setShowSuccessModal(false); navigate('/') }}>View Orders</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
