
import React, { useState, useEffect } from 'react';
import { db } from '../../../../services/firebase';
import { collections } from '../../../../data/products';
import ProductCard from '../../product-list/components/ProductCard';
import './ProductModal.css';

// =============================================
// PRODUCT MODAL COMPONENT
// =============================================
export default function ProductModal({ collectionKey, onClose }) {
  const collection = collections[collectionKey];
  const [syncedProducts, setSyncedProducts] = useState(collection?.products || []);

  // Sync with Firestore
  useEffect(() => {
    if (!collectionKey || !collection) return;

    // Start with static products
    const initialProducts = [...collection.products];
    
    // Subscribe to Firestore updates for this collection
    // Note: We listen to ALL products to ensure ID-based sync works even if the 'collection' field is mismatched/outdated in existing docs.
    const unsubscribe = db.collection('products')
      .onSnapshot(snapshot => {
        const dbProductsMap = new Map();
        
        snapshot.docs.forEach(doc => {
          dbProductsMap.set(doc.id, { id: doc.id, ...doc.data() });
        });

        // 1. Merge Firestore updates into static products
        const mergedProducts = initialProducts.map(p => {
          const idStr = String(p.id);
          if (dbProductsMap.has(idStr)) {
            const dbP = dbProductsMap.get(idStr);
            // Identify if deleted
            if (dbP.deleted) return null;
            // Override with DB data
            dbProductsMap.delete(idStr); // Remove from map so we know what's left is new
            return { ...p, ...dbP };
          }
          return p;
        }).filter(Boolean); // Filter out nulls (deleted)

        // 2. Add remaining Firestore products (newly added dynamic products)
        dbProductsMap.forEach((product) => {
          if (!product.deleted && product.collection === collectionKey) {
             // Ensure new products have the necessary fields
             mergedProducts.push({
               ...product,
               model: product.model || product.name,
               colorVariants: product.colorVariants || [
                 { name: product.color || 'Default', hex: '#888888', image: product.image }
               ]
             });
          }
        });

        setSyncedProducts(mergedProducts);
      }, error => {
        console.error("Error syncing collection:", error);
      });

    return () => unsubscribe();
  }, [collectionKey, collection]);

  if (!collection) return null;

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
          {syncedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
