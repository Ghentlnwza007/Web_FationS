
import React, { useState, useContext } from 'react';
import { WishlistContext, AuthContext } from '../context/Contexts';

// =============================================
// GALLERY PRODUCT CARD COMPONENT
// =============================================
export default function GalleryProductCard({ product, formatPrice, onAddToCart }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { isLoggedIn, openAuthModal } = useContext(AuthContext);
  
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
        {product.tag && (
          <span className={`gallery-tag ${product.tag.toLowerCase()}`}>
            {product.tag}
          </span>
        )}
        {/* Wishlist Button */}
        <button
          className={`gallery-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button className="quick-add" onClick={handleAddToCartClick}>
          + Add to Cart
        </button>
      </div>
      <div className="gallery-card-info">
        <h3 className="gallery-card-name">{product.name}</h3>
        <p className="gallery-card-model">{product.model}</p>
        
        {/* Color Selector - Show for all products with colorVariants */}
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
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="gallery-card-footer">
          <span className="gallery-card-price">
            {formatPrice(product.price)}
          </span>
          <span className="gallery-card-stock">
            In Stock: {product.stock}
          </span>
        </div>
      </div>
    </div>
  );
}
