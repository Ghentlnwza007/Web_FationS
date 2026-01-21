
import React, { useState, useEffect, useContext } from 'react';
import { CartContext, CurrencyContext, WishlistContext, AuthContext } from '../context/Contexts';
import { db } from '../firebase';
import { collections } from '../data/products';
import GalleryProductCard from './GalleryProductCard';
import SizeSelectionModal from './SizeSelectionModal';

// =============================================
// PRODUCT GALLERY COMPONENT
// ==============================================
export default function ProductGallery({ onBack, initialSearchTerm = '', initialCategory = 'all' }) {
  const { addToCart } = useContext(CartContext);
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [firestoreProducts, setFirestoreProducts] = useState([]);

  // Load products from Firestore (added via Admin Panel)
  useEffect(() => {
    const loadFirestoreProducts = async () => {
      try {
        const snapshot = await db.collection('products').get();
        const products = snapshot.docs.map(doc => ({
          id: `fs-${doc.id}`,
          ...doc.data(),
          category: doc.data().collection || 'unisex'
        }));
        setFirestoreProducts(products);
      } catch (error) {
        console.log("No Firestore products or error loading:", error);
      }
    };
    loadFirestoreProducts();
  }, []);

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

  // Combine all products from all collections + Firestore
  const allProducts = [
    ...collections.men.products.map((p) => ({ ...p, category: "men" })),
    ...collections.women.products.map((p) => ({ ...p, category: "women" })),
    ...collections.unisex.products.map((p) => ({ ...p, category: "unisex" })),
    ...collections.sports.products.map((p) => ({ ...p, category: "sports" })),
    ...firestoreProducts.map((p) => ({ ...p, model: p.model || p.name })),
  ];

  // Filter products
  let filteredProducts = allProducts.filter((product) => {
    const matchesFilter =
      activeFilter === "all" || product.category === activeFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const { formatPrice } = useContext(CurrencyContext);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
  };

  const filters = [
    { key: "all", label: "All", count: allProducts.length },
    { key: "men", label: "Men's", count: collections.men.products.length },
    {
      key: "women",
      label: "Women's",
      count: collections.women.products.length,
    },
    {
      key: "unisex",
      label: "Unisex",
      count: collections.unisex.products.length,
    },
    {
      key: "sports",
      label: "Sports",
      count: collections.sports.products.length,
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
