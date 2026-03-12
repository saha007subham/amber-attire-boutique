import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section">
      <div 
        className="hero-background"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      ></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content container">
        <div className="hero-text-wrapper animate-slide-up">
          <span className="hero-subtitle">New Collection 2026</span>
          <h1 className="hero-title">Amber Attiire</h1>
          <p className="hero-description">
            Grace, Tradition and Elegance in Every Saree
          </p>
          <div className="hero-buttons">
            <Link to="/shop">
              <button className="btn-primary">Shop Collection</button>
            </Link>
            <a href="#new-arrivals">
              <button className="btn-secondary" style={{borderColor: 'var(--ivory)', color: 'var(--ivory)'}}>Explore New Arrivals</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
