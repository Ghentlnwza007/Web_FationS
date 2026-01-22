
import React, { useState, useEffect, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CurrencyContext } from '../context/Contexts';

export default function SizeSelectionModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { formatPrice } = useContext(CurrencyContext);
  const modalRef = useRef(null);
  const firstFocusableRef = useRef(null);
  
  // Parse sizes from the product's size string
  const getSizes = () => {
    if (!product.size) return [];
    if (product.size === "One Size" || product.size === "-") {
      return ["One Size"];
    }
    return product.size.split(",").map(s => s.trim());
  };
  
  const sizes = getSizes();
  
  // Check for color variants
  const hasColorVariants = product.colorVariants && product.colorVariants.length > 0;
  const currentImage = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].image 
    : product.image;
  const currentColorName = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].name 
    : product.color;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("size-modal-overlay")) {
      onClose();
    }
  };

  // Focus trap and keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    // Store previous focus
    const previousFocus = document.activeElement;
    
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    // Focus first focusable element
    setTimeout(() => {
      if (firstFocusableRef.current) {
        firstFocusableRef.current.focus();
      }
    }, 100);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      // Return focus to previous element
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({
        ...product,
        image: currentImage,
        selectedColor: currentColorName,
        selectedSize: selectedSize
      });
      onClose();
    }
  };

  // Use createPortal to render modal directly to document.body
  // This ensures the modal is positioned relative to viewport, not parent containers
  return createPortal(
    <div 
      className="size-modal-overlay active" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-modal-title"
    >
      <div className="size-modal" ref={modalRef}>
        <button 
          className="size-modal-close" 
          onClick={onClose}
          aria-label="ปิดหน้าต่าง"
          ref={firstFocusableRef}
        >×</button>
        
        <div className="size-modal-content">
          <div className="size-modal-image">
            <img 
              src={currentImage} 
              alt={`รูปภาพสินค้า ${product.name}`} 
            />
          </div>
          
          <div className="size-modal-info">
            <h3 className="size-modal-title" id="size-modal-title">{product.name}</h3>
            <p className="size-modal-price">{formatPrice(product.price)}</p>
            <p className="size-modal-stock">In Stock: {product.stock || 0}</p>
            
            {/* Product Details */}
            <div className="size-modal-details">
              {product.model && (
                <div className="detail-row">
                  <span className="detail-label">Model</span>
                  <span className="detail-value">{product.model}</span>
                </div>
              )}
              {product.material && (
                <div className="detail-row">
                  <span className="detail-label">Material</span>
                  <span className="detail-value">{product.material}</span>
                </div>
              )}
            </div>
            
            {/* Color Selection */}
            {hasColorVariants && (
              <div className="color-selection" role="group" aria-label="เลือกสีสินค้า">
                <p className="selection-label" id="color-group-label">เลือกสี: {currentColorName}</p>
                <div className="color-options" role="radiogroup" aria-labelledby="color-group-label">
                  {product.colorVariants.map((variant, index) => (
                    <button
                      key={variant.name}
                      className={`color-option ${selectedColorIndex === index ? 'selected' : ''}`}
                      style={{ backgroundColor: variant.hex }}
                      onClick={() => setSelectedColorIndex(index)}
                      role="radio"
                      aria-checked={selectedColorIndex === index}
                      aria-label={`สี ${variant.name}`}
                      title={variant.name}
                    >
                      {selectedColorIndex === index && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            <div className="size-selection" role="group" aria-label="เลือกไซส์สินค้า">
              <p className="selection-label" id="size-group-label">เลือกไซส์</p>
              <div className="size-options" role="radiogroup" aria-labelledby="size-group-label">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`ไซส์ ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="size-hint" role="alert">กรุณาเลือกไซส์ก่อนเพิ่มลงตะกร้า</p>
              )}
            </div>
            
            <button
              className={`size-add-btn ${!selectedSize ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!selectedSize}
              aria-label={selectedSize ? `เพิ่มสินค้าไซส์ ${selectedSize} ลงตะกร้า` : 'กรุณาเลือกไซส์ก่อน'}
            >
              {selectedSize ? `Add to Cart - ${selectedSize}` : 'Please Select Size'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
