import React, { useEffect, useRef } from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer className="footer reveal" ref={footerRef}>
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <h2 className="footer-logo">Amber Attiire</h2>
            <p className="footer-bio">
              We bring you the finest collection of authentic Indian ethnic wear. 
              Grace, tradition, and elegance woven into every thread.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Shop Collection</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="contact-list">
              <li>
                <MapPin size={18} />
                <span>123 Silk weavers lane, Heritage District, Mumbai, 400001</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+91 62900 96893</span>
              </li>
              <li>
                <Mail size={18} />
                <span>support@amberattiire.com</span>
              </li>
            </ul>
            <a href="https://wa.me/916290096893" className="whatsapp-btn" target="_blank" rel="noreferrer">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.062-.301-.15-1.264-.468-2.406-1.487-.888-.788-1.49-1.761-1.665-2.059-.175-.3-.019-.461.13-.611.133-.133.301-.35.45-.524.149-.176.2-.301.3-.499.098-.201.05-.376-.025-.526-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.36z" />
                <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z" />
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.76.455 3.414 1.246 4.88L2 22l5.311-1.127A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10z" />
              </svg>
              WhatsApp Support
            </a>
          </div>

          <div className="footer-newsletter">
            <h3 className="footer-heading">Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Amber Attiire. All Rights Reserved.</p>
          <div className="payment-methods">
            {/* Visual placeholders for payment methods */}
            <span className="payment-icon">Visa</span>
            <span className="payment-icon">Mastercard</span>
            <span className="payment-icon">Amex</span>
            <span className="payment-icon">UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
