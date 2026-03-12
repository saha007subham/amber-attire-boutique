import React, { useEffect, useRef } from 'react';
import { Gem, Scissors, Truck, ShieldCheck } from 'lucide-react';
import './Features.css';

const features = [
  {
    id: 1,
    icon: <Gem size={32} />,
    title: 'Premium Quality Fabrics',
    description: 'We source only the finest pure silks, organzas, and cottons for an authentic feel and lasting drape.'
  },
  {
    id: 2,
    icon: <Scissors size={32} />,
    title: 'Handpicked Designs',
    description: 'Each piece is carefully selected to represent the rich heritage of Indian craftsmanship.'
  },
  {
    id: 3,
    icon: <ShieldCheck size={32} />,
    title: 'Authenticity Guarantee',
    description: '100% genuine products directly sourced from master weavers across India.'
  },
  {
    id: 4,
    icon: <Truck size={32} />,
    title: 'Reliable Delivery',
    description: 'Fast, insured shipping globally so your perfect ensemble arrives safely and on time.'
  }
];

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('active');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="features-section reveal" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Amber Attiire</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card reveal">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
