import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Reviews.css';

const reviews = [
  {
    id: 1,
    name: "Shalini Saha",
    location: "Siliguri",
    rating: 5,
    text: "The Kanjivaram silk saree I ordered for my sister's wedding was even more gorgeous in person. The quality is exceptional and the delivery was prompt."
  },
  {
    id: 2,
    name: "Saona Saha",
    location: "Jamshedpur",
    rating: 5,
    text: "Amber Attiire never disappoints! Their Banarasi weaves are truly authentic. I received so many compliments at the Diwali party."
  },
  {
    id: 3,
    name: "Sayantika Saha",
    location: "Delhi",
    rating: 5,
    text: "Beautiful packaging and a lovely handwritten note came with my order. The soft silk saree is incredibly comfortable for all-day wear."
  },
  {
    id: 4,
    name: "Pritha Bhowmick",
    location: "Kolkata",
    rating: 5,
    text: "Absolutely stunning collection! The embroidered organza saree I bought was an instant hit at my anniversary dinner. Highly recommend them."
  }
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="reviews-section reveal" ref={sectionRef}>
      <div className="container reviews-container">
        
        <div className="reviews-content-wrapper">
          <div className="reviews-header">
            <h2 className="section-title">Client Diaries</h2>
            <p className="section-subtitle">Read what our lovely patrons have to say</p>
          </div>

          <div className="carousel-container">
            <div className="quote-icon">
              <Quote size={48} strokeWidth={1} />
            </div>
            
            <div className="review-slider">
              {reviews.map((review, index) => (
                <div 
                  key={review.id}
                  className={`review-slide ${index === currentIndex ? 'active' : ''}`}
                >
                  <div className="stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="reviewer-info">
                    <h4 className="reviewer-name">{review.name}</h4>
                    <span className="reviewer-location">{review.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button className="control-btn" onClick={prevReview} aria-label="Previous review">
                <ChevronLeft size={24} />
              </button>
              <div className="carousel-indicators">
                {reviews.map((_, index) => (
                  <button 
                    key={index}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
              <button className="control-btn" onClick={nextReview} aria-label="Next review">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;
