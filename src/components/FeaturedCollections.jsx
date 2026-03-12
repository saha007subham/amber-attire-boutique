import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import './FeaturedCollections.css';

const collections = [
  {
    id: 1,
    title: 'Silk Sarees',
    subtitle: 'Timeless Elegance',
    image: '/images/silk-sarees.png',
    size: 'large'
  },
  {
    id: 2,
    title: 'Wedding Collection',
    subtitle: 'Bridal Grandeur',
    image: '/images/wedding-collection.png',
    size: 'small'
  },
  {
    id: 3,
    title: 'Party Wear',
    subtitle: 'Modern Glamour',
    image: '/images/party-wear.png',
    size: 'small'
  },
  {
    id: 4,
    title: 'Festive Wear',
    subtitle: 'Traditional Hues',
    image: '/images/festive-wear.png',
    size: 'wide'
  }
];

const FeaturedCollections = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Adding a slight delay to children
            const cards = entry.target.querySelectorAll('.collection-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('active');
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
    <section id="collections" className="featured-section reveal" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Curated Collections</h2>
          <p className="section-subtitle">Discover our handpicked selection of premium weaves</p>
        </div>

        <div className="collections-grid">
          {collections.map((collection) => (
            <div 
              key={collection.id} 
              className={`collection-card reveal ${collection.size}`}
            >
              <div className="card-image-wrapper">
                <img src={collection.image} alt={collection.title} className="card-image" loading="lazy" />
              </div>
              <div className="card-overlay">
                <div className="card-content">
                  <span className="card-subtitle">{collection.subtitle}</span>
                  <h3 className="card-title">{collection.title}</h3>
                  <a href={`#${collection.title.toLowerCase().replace(' ', '-')}`} className="card-link">
                    Explore <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
