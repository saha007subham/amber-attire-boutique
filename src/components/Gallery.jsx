import React, { useEffect, useRef } from 'react';
import { Instagram } from 'lucide-react';
import './Gallery.css';

const galleryImages = [
  { id: 1, src: '/images/gallery-1.png', cls: 'tall' },
  { id: 2, src: '/images/gallery-2.png', cls: '' },
  { id: 3, src: '/images/gallery-wide.png', cls: 'wide' },
  { id: 4, src: '/images/gallery-4.png', cls: 'top-align' },
  { id: 5, src: '/images/gallery-5.png', cls: 'tall' },
  { id: 6, src: '/images/gallery-6.png', cls: '' }
];

const Gallery = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const items = entry.target.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('active');
              }, index * 100);
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
    <section className="gallery-section reveal" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header">
          <div>
            <h2 className="section-title">Follow Our Journey</h2>
            <p className="section-subtitle">@amberattiire</p>
          </div>
          <a href="#" className="btn-secondary instagram-btn">
            <Instagram size={18} /> Follow Us
          </a>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((img) => (
            <div key={img.id} className={`gallery-item ${img.cls} reveal`}>
              <img src={img.src} alt="Amber Attiire on Instagram" loading="lazy" />
              <div className="gallery-overlay">
                <Instagram size={32} color="white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
