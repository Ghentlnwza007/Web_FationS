
import React, { useState, useContext } from 'react';
import { CartContext, WishlistContext, AuthContext, CurrencyContext, CompareContext } from '../context/Contexts';
import ReviewModal from './ReviewModal';
import ShareButtons from './ShareButtons';
import SizeSelectionModal from './SizeSelectionModal';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { isLoggedIn, openAuthModal } = useContext(AuthContext);
  const { formatPrice } = useContext(CurrencyContext);
  const { addToCompare, isInCompare } = useContext(CompareContext);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  const wishlisted = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  
  // Get current image based on selected color
  const hasColorVariants = product.colorVariants && product.colorVariants.length > 0;
  const currentImage = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].image 
    : product.image;
  const currentColorName = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].name 
    : product.color;

  const handleAddToCartClick = () => {
    if (!isLoggedIn) {
      openAuthModal('menu');
      return;
    }
    // Add to recently viewed (if function exists, previously global, now removed or moved? - Skipping for now if not in context)
    // addToRecentlyViewed({...product, image: currentImage}); 
    setShowSizeModal(true);
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

  const handleCompareClick = () => {
    addToCompare({...product, image: currentImage});
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img 
            src={currentImage} 
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
          <span className="product-badge">In Stock: {product.stock}</span>
          <button
            className={`product-wishlist ${wishlisted ? 'active' : ''}`}
            onClick={handleWishlistClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          {/* Quick action buttons */}
          <div className="product-quick-actions">
            <button 
              className={`quick-action-btn compare ${inCompare ? 'active' : ''}`} 
              onClick={handleCompareClick}
              title={inCompare ? 'ในรายการเปรียบเทียบ' : 'เปรียบเทียบ'}
            >
              📊
            </button>
            <button 
              className="quick-action-btn share" 
              onClick={() => setShowShareMenu(!showShareMenu)}
              title="แชร์"
            >
              📤
            </button>
          </div>
          {/* Share dropdown */}
          {showShareMenu && (
            <div className="share-dropdown">
              <ShareButtons product={{...product, image: currentImage}} />
            </div>
          )}
          {/* Add to Cart Overlay - Shows on Hover */}
          <div className="product-hover-overlay">
            <button className="add-to-cart-overlay" onClick={handleAddToCartClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">{formatPrice(product.price)}</div>
        </div>
      </div>
      
      {showSizeModal && (
        <SizeSelectionModal
          product={{...product, image: currentImage, selectedColor: currentColorName}}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={addToCart}
        />
      )}
      
      {showReviewModal && (
        <ReviewModal
          product={{...product, image: currentImage}}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </>
  );
}
