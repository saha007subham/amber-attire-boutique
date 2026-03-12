import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleCart, cartCount = 0, toggleWishlist, wishlistCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `navbar ${(!isHomePage || isScrolled) ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

  return (
    <nav className={navbarClasses}>
      <div className="navbar-container container">
        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">Amber Attiire</Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li><Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop Collection</Link></li>
          <li><a href="/#collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</a></li>
          <li><a href="/#new-arrivals" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</a></li>
          <li><a href="/#about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a></li>
        </ul>

        {/* Icons */}
        <div className="navbar-icons">
          <button className="icon-btn search-btn" aria-label="Search">
            <Search size={22} />
          </button>
          <button className="icon-btn wishlist-btn" onClick={toggleWishlist} aria-label="Wishlist">
            <Heart size={22} />
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </button>
          <button className="icon-btn cart-btn" onClick={toggleCart} aria-label="Cart">
            <ShoppingBag size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
