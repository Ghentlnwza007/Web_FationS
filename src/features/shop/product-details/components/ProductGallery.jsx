
import React, { useState, useEffect, useContext } from 'react';

import { CartContext, CurrencyContext, WishlistContext, AuthContext, ProductContext } from '../../../../context/Contexts';
import { db } from '../../../../services/firebase';
// Collections import removed as we use Context now
import GalleryProductCard from '../../product-list/components/GalleryProductCard';
import SizeSelectionModal from './SizeSelectionModal';
import './ProductGallery.css';

// =============================================
// PRODUCT GALLERY COMPONENT
// ==============================================
export default function ProductGallery({ onBack, initialSearchTerm = '', initialCategory = 'all' }) {
  const { addToCart } = useContext(CartContext);
  const { products: allProducts, loading } = useContext(ProductContext);
  
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Firestore loading logic removed (moved to Context)

  // Update searchTerm when initialSearchTerm changes
  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  // Update activeFilter when initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setActiveFilter(initialCategory);
    }
  }, [initialCategory]);

  // allProducts is now from Context

  // Filter products
  let filteredProducts = allProducts.filter((product) => {
    const matchesFilter =
      activeFilter === "all" || product.category === activeFilter;
    const productName = product.name || "";
    const productModel = product.model || "";
    const matchesSearch =
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productModel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
  }

  const { formatPrice } = useContext(CurrencyContext);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
  };

  const filters = [
    { key: "all", label: "All", count: allProducts.length },
    { key: "men", label: "Men's", count: allProducts.filter(p => p.category === 'men').length },
    {
      key: "women",
      label: "Women's",
      count: allProducts.filter(p => p.category === 'women').length,
    },
    {
      key: "unisex",
      label: "Unisex",
      count: allProducts.filter(p => p.category === 'unisex').length,
    },
    {
      key: "sports",
      label: "Sports",
      count: allProducts.filter(p => p.category === 'sports').length,
    },
  ];

  return (
    <>
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <button className="back-btn" onClick={onBack}>
                      ← Back to Home
          </button>
          <div className="section-header">
            <span className="section-tag">Shop</span>
            <h2 className="section-title">Product Gallery</h2>
            <div className="section-line" />
          </div>
        </div>

        <div className="gallery-controls">
          <div className="search-box">
            <span className="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={`filter-btn ${
                  activeFilter === filter.key ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="sort-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low - High</option>
              <option value="price-high">Price: High - Low</option>
              <option value="name">Name: A - Z</option>
            </select>
          </div>
        </div>

        <div className="gallery-results">
          <p>Showing {filteredProducts.length} items</p>
        </div>

        <div className="gallery-grid">
          {filteredProducts.map((product, index) => (
            <GalleryProductCard 
              key={`${product.id}-${index}`} 
              product={product} 
              formatPrice={formatPrice}
              onAddToCart={handleAddToCartClick}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <h3>No products found</h3>
            <p>Try a different search term or select another category</p>
          </div>
        )}
      </section>
      
      {selectedProduct && (
        <SizeSelectionModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}
