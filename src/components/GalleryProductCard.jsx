
import React, { useState, useContext } from 'react';
import { WishlistContext, AuthContext } from '../context/Contexts';
import ReviewModal from './ReviewModal';
import SizeSelectionModal from './SizeSelectionModal';

// =============================================
// GALLERY PRODUCT CARD COMPONENT
// =============================================
export default function GalleryProductCard({ product, formatPrice, onAddToCart }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { isLoggedIn, openAuthModal } = useContext(AuthContext);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  
  const wishlisted = isInWishlist(product.id);
  
  // Get current image based on selected color
  const hasColorVariants = product.colorVariants && product.colorVariants.length > 0;
  const currentImage = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].image 
    : product.image;
  const currentColorName = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].name 
    : product.color;

  const handleAddToCartClick = () => {
    // Pass the product with current selected color/image
    onAddToCart({
      ...product,
      image: currentImage,
      selectedColor: currentColorName,
    });
  };

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      openAuthModal('menu');
      return;
    }
    toggleWishlist({
      ...product,
      selectedColor: currentColorName,
      image: currentImage,
    });
  };

  return (
    <div className="gallery-card">
      <div className="gallery-card-image">
        <img 
          src={currentImage} 
          alt={`${product.name} - ${currentColorName}`} 
          loading="lazy"
          decoding="async"
        />
        <span className={`category-badge ${product.category}`}>
          {product.category === "men"
            ? "Men's"
            : product.category === "women"
            ? "Women's"
            : "Unisex"}
        </span>
        <button
          className={`gallery-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        {/* Add to Cart Overlay - Shows on Hover */}
        <div className="gallery-hover-overlay">
          <button className="gallery-add-cart-overlay" onClick={() => setShowSizeModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="gallery-card-info">
        <h3 className="gallery-card-name">{product.name}</h3>

        {/* Color Selector */}
        {hasColorVariants && (
          <div className="gallery-color-selector">
            <span className="gallery-color-label">Color: {currentColorName}</span>
            <div className="gallery-color-options">
              {product.colorVariants.map((variant, index) => (
                <button
                  key={variant.name}
                  className={`gallery-color-option ${selectedColorIndex === index ? 'active' : ''}`}
                  style={{ backgroundColor: variant.hex }}
                  onClick={() => setSelectedColorIndex(index)}
                  title={variant.name}
                >
                  {selectedColorIndex === index && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Details Table */}
        <ul className="gallery-details">
          {product.model && (
            <li>
              <span className="gallery-detail-label">Model</span>
              <span className="gallery-detail-value">{product.model}</span>
            </li>
          )}
          {product.size && (
            <li>
              <span className="gallery-detail-label">Size</span>
              <span className="gallery-detail-value">{product.size}</span>
            </li>
          )}
          {product.material && (
            <li>
              <span className="gallery-detail-label">Material</span>
              <span className="gallery-detail-value">{product.material}</span>
            </li>
          )}
        </ul>
        
        <div className="gallery-card-price">
          {formatPrice(product.price)}
        </div>

        <div className="gallery-actions">
          <button className="gallery-review-btn" onClick={() => setShowReviewModal(true)}>
            Reviews
          </button>
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal
          product={{...product, image: currentImage}}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {showSizeModal && (
        <SizeSelectionModal
          product={{...product, image: currentImage, selectedColor: currentColorName}}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
