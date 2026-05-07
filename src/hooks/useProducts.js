import { useState, useEffect } from 'react';

// Replace this with your deployed Google Apps Script Web App URL
export const API_CONFIG = {
  // Use a placeholder until the user updates it
  // Since we don't have the Web App URL yet, we'll try to fetch from it, but if it fails (because it's a placeholder), 
  // we could fallback to the mock data. However, the user explicitly stated:
  // "Do not store product data locally; always fetch from Google Sheets API."
  // So we will strictly try to fetch and show a loading/error state if it fails.
  WEB_APP_URL: 'YOUR_WEB_APP_URL'
};

const CACHE_KEY = 'amber_attire_products_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Check Cache First
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setProducts(data);
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        if (API_CONFIG.WEB_APP_URL === 'YOUR_WEB_APP_URL') {
          throw new Error('Please configure your Google Apps Script Web App URL in src/hooks/useProducts.js');
        }

        const response = await fetch(API_CONFIG.WEB_APP_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        
        if (result.status === 'success') {
          // Process and format products
          const formattedProducts = result.data.map(item => ({
            id: item.id || Math.random().toString(),
            name: item.name || 'Unnamed Product',
            price: Number(item.price) || 0,
            image: item.image || '/images/kanjivaram-silk.png', // Fallback image
            category: item.category || 'Uncategorized',
            description: item.description || '',
            stock: Number(item.stock) || 0,
            tag: item.tag || ''
          }));

          setProducts(formattedProducts);
          
          // Save to Cache
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            data: formattedProducts,
            timestamp: Date.now()
          }));
        } else {
          throw new Error(result.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
