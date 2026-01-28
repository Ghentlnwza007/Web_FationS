
import React, { useState, useContext } from 'react';
import { CartContext, CurrencyContext } from '../context/Contexts';
import { saleProductsData } from '../data/products';
import SizeSelectionModal from './SizeSelectionModal';

// =============================================
// SALE PRODUCT CARD COMPONENT
// =============================================
function SaleProductCard({ product }) {
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
        className="sale-product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="sale-product-image">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
          <span className="sale-discount-tag">-{product.discount}%</span>
          
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
            className="sale-add-to-cart"
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </button>
        </div>
        <div className="sale-product-info">
          <h3 className="sale-product-name">{product.name}</h3>
          <p className="sale-product-desc">{product.description}</p>
          <div className="sale-price-container">
            <span className="sale-original-price">{formatPrice(product.originalPrice)}</span>
            <span className="sale-discounted-price">{formatPrice(product.price)}</span>
          </div>
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
// FINAL SALE PAGE COMPONENT
// =============================================
export default function FinalSalePage({ onBack }) {
  return (
    <section className="final-sale-page">
      <div className="sale-page-header">
        <button className="back-button" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
        <h2 className="sale-page-title">Final Sale</h2>
        <p className="sale-page-subtitle">สินค้าลดพิเศษ 20% - 50%</p>
      </div>
      
      <div className="sale-page-grid">
        {saleProductsData.map((product) => (
          <SaleProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
