
import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/Contexts';

// =============================================
// SEARCH MODAL COMPONENT
// =============================================
export default function SearchModal({ onClose, onSearch }) {
  const [searchInput, setSearchInput] = useState('');
  const { products: allProducts } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('search-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Combine all products for quick suggestions
  // Products retrieved from Context


  // Filter suggestions based on input
  const suggestions = searchInput.length > 1
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.model.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="search-overlay active" onClick={handleOverlayClick}>
      <div className="search-modal">
        <div className="search-header">
          <form onSubmit={handleSubmit} className="search-form">
            <span className="search-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
          <button className="search-close" onClick={onClose}>×</button>
        </div>
        
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            <p className="suggestions-title">Suggested Products</p>
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="suggestion-item"
                onClick={() => {
                  onSearch(product.name);
                  onClose();
                }}
              >
                <img src={product.image} alt={product.name} />
                <div className="suggestion-info">
                  <span className="suggestion-name">{product.name}</span>
                  <span className="suggestion-model">{product.model}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {searchInput.length === 0 && (
          <div className="search-popular">
            <p className="suggestions-title">Popular Categories</p>
            <div className="popular-tags">
              <button onClick={() => { onSearch('Jeans'); onClose(); }}>◆ Jeans</button>
              <button onClick={() => { onSearch('Sunglasses'); onClose(); }}>◎ Sunglasses</button>
              <button onClick={() => { onSearch('Jacket'); onClose(); }}>◇ Jacket</button>
              <button onClick={() => { onSearch('Jordan'); onClose(); }}>★ Jordan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
