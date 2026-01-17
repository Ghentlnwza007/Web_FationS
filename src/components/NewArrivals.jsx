
import React, { useState, useContext } from 'react';
import { CartContext, CurrencyContext } from '../context/Contexts';
import { newArrivalsData } from '../data/products';
import SizeSelectionModal from './SizeSelectionModal';

// =============================================
// NEW ARRIVAL CARD COMPONENT
// =============================================
function NewArrivalCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { formatPrice } = useContext(CurrencyContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    setShowSizeModal(true);
  };

  return (
    <>
      <div 
        className="new-arrival-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="new-arrival-image">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
          <span className={`arrival-tag ${product.tag.toLowerCase()}`}>
            {product.tag}
          </span>
          
          {isHovered && product.images.length > 1 && (
            <>
              <button className="carousel-arrow left" onClick={prevImage}>
                ‹
              </button>
              <button className="carousel-arrow right" onClick={nextImage}>
                ›
              </button>
            </>
          )}
          
          <div className="image-dots">
            {product.images.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
          
          <button 
            className="arrival-add-to-cart"
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </button>
        </div>
        <div className="new-arrival-info">
          <h3 className="arrival-name">{product.name}</h3>
          <p className="arrival-desc">{product.description}</p>
          <span className="arrival-price">{formatPrice(product.price)}</span>
        </div>
      </div>
      
      {showSizeModal && (
        <SizeSelectionModal
          product={product}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}

// =============================================
// NEW ARRIVALS SECTION
// =============================================
export default function NewArrivals() {
  return (
    <section className="new-arrivals" id="new-arrivals">
      <div className="section-header">
        <span className="section-tag">Just In</span>
        <h2 className="section-title">New Arrivals</h2>
        <div className="section-line" />
      </div>
      <div className="arrivals-grid">
        {newArrivalsData.map((product) => (
          <NewArrivalCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
