import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';
import './OurStory.css';

const OurStory = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="our-story-page" ref={pageRef}>
      {/* Hero Section */}
      <section className="story-hero">
        <div className="story-hero-content animate-slide-up">
          <span className="story-hero-subtitle">Est. 2024</span>
          <h1>Our Story</h1>
          <div className="story-hero-divider"></div>
          <p>Weaving tradition into modern elegance, one thread at a time.</p>
        </div>
      </section>

      {/* The Beginning */}
      <section className="story-section container">
        <div className="premium-grid">
          <div className="premium-image-wrapper reveal">
            <img 
              src="/images/gallery-2.png" 
              alt="Artisan weaving a saree" 
              className="premium-image"
            />
            <div className="premium-image-accent"></div>
          </div>
          <div className="premium-text-content reveal delay-1">
            <h2 className="premium-heading">How It All Began</h2>
            <p className="premium-paragraph first-letter">
              Amber Attiire was born out of a profound love for Indian heritage and the timeless elegance of the saree. What started as a small passion project in a living room has now blossomed into a beloved destination for ethnic wear enthusiasts.
            </p>
            <p className="premium-paragraph">
              We realized that while fashion evolves, the grace of a well-crafted saree remains eternal. Our mission became clear: to bring authentic, high-quality, and beautifully designed ethnic wear to women who cherish both tradition and contemporary style.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="premium-quote-section reveal">
        <div className="container">
          <blockquote className="premium-quote">
            "A saree is not just a garment. It's a power, an identity, a language."
          </blockquote>
        </div>
      </section>

      {/* Our Values */}
      <section className="story-values-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-subtitle">What We Stand For</span>
            <h2 className="premium-heading text-center">Our Core Values</h2>
            <div className="heading-divider mx-auto"></div>
          </div>
          <div className="premium-values-grid reveal delay-1">
            <div className="premium-value-card">
              <div className="value-icon-minimal">
                <Heart size={28} strokeWidth={1.5} />
              </div>
              <h3>Passion for Craft</h3>
              <p>Every piece is curated with love and a deep appreciation for the artisans who spend hours perfecting their craft.</p>
            </div>
            <div className="premium-value-card">
              <div className="value-icon-minimal">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              <h3>Uncompromising Quality</h3>
              <p>From the sourcing of the finest silks to the final stitch, we ensure our products meet the highest standards.</p>
            </div>
            <div className="premium-value-card">
              <div className="value-icon-minimal">
                <Sparkles size={28} strokeWidth={1.5} />
              </div>
              <h3>Timeless Elegance</h3>
              <p>We create pieces that aren't just for a season, but become cherished heirlooms passed down through generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Forward */}
      <section className="story-section container mb-5">
        <div className="premium-grid reverse">
          <div className="premium-image-wrapper reveal">
            <img 
              src="/images/gallery-5.png" 
              alt="Beautiful saree collection" 
              className="premium-image"
            />
            <div className="premium-image-accent left"></div>
          </div>
          <div className="premium-text-content reveal delay-1">
            <h2 className="premium-heading">The Journey Forward</h2>
            <p className="premium-paragraph">
              As we continue to grow, our commitment remains the same. We strive to empower women by making them feel confident, beautiful, and connected to their roots.
            </p>
            <p className="premium-paragraph">
              Thank you for being part of the Amber Attiire family. Whether you are buying your first saree or adding to a lifelong collection, we are honored to be part of your story.
            </p>
            <div className="signature-font mt-4">
               With love,<br/>The Amber Attiire Team
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
