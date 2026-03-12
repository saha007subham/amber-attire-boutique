import React from 'react';
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import NewArrivals from '../components/NewArrivals';
import Features from '../components/Features';
import Reviews from '../components/Reviews';
import Gallery from '../components/Gallery';

const Home = ({ addToCart, addToWishlist, wishlistItems }) => {
  return (
    <main className="main-content">
      <Hero />
      <FeaturedCollections />
      <NewArrivals addToCart={addToCart} addToWishlist={addToWishlist} wishlistItems={wishlistItems} />
      <Features />
      <Reviews />
      <Gallery />
    </main>
  );
};

export default Home;
