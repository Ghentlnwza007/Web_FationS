
import React, { useState, useEffect, useContext } from 'react';
import { CurrencyContext } from '../context/Contexts';

// =============================================
// RECENTLY VIEWED COMPONENT
// =============================================
export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([]);
  const { formatPrice } = useContext(CurrencyContext);
  
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentProducts(JSON.parse(stored));
    }
  }, []);
  
  if (recentProducts.length === 0) return null;
  
  return (
    <section className="recently-viewed">
      <div className="section-header">
        <h2 className="section-title">👁️ สินค้าที่ดูล่าสุด</h2>
      </div>
      <div className="recent-products-grid">
        {recentProducts.slice(0, 6).map((product, index) => (
          <div key={index} className="recent-product-card">
            <div className="recent-product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="recent-product-info">
              <h4>{product.name}</h4>
              <span className="recent-product-price">{formatPrice(product.price)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Helper function to add product to recently viewed
export function addToRecentlyViewed(product) {
  try {
    const stored = localStorage.getItem('recentlyViewed');
    let recent = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists
    recent = recent.filter(p => p.id !== product.id);
    
    // Add to beginning
    recent.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Keep only last 10
    recent = recent.slice(0, 10);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recent));
  } catch (e) {
    console.error('Error saving to recently viewed:', e);
  }
}
