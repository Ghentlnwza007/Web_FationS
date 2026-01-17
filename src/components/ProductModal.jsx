
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collections } from '../data/products';
import ProductCard from './ProductCard';

// =============================================
// PRODUCT MODAL COMPONENT
// =============================================
export default function ProductModal({ collectionKey, onClose }) {
  const collection = collections[collectionKey];
  const [firestoreProducts, setFirestoreProducts] = useState([]);

  // Load products from Firestore for this collection
  useEffect(() => {
    const loadFirestoreProducts = async () => {
      try {
        const snapshot = await db.collection('products')
          .where('collection', '==', collectionKey)
          .get();
        const products = snapshot.docs.map(doc => ({
          id: `fs-${doc.id}`,
          ...doc.data(),
          model: doc.data().model || doc.data().name,
          colorVariants: doc.data().colorVariants || [
            { name: doc.data().color || 'Default', hex: '#888888', image: doc.data().image }
          ]
        }));
        setFirestoreProducts(products);
      } catch (error) {
        console.log("Error loading Firestore products:", error);
      }
    };
    if (collectionKey) {
      loadFirestoreProducts();
    }
  }, [collectionKey]);

  if (!collection) return null;

  // Combine hardcoded products with Firestore products
  const allProducts = [...collection.products, ...firestoreProducts];

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay active" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{collection.title}</h2>
            <p className="modal-subtitle">{collection.description}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="products-grid">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
