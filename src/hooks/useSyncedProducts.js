import { useState, useEffect } from 'react';
import { db } from '../services/firebase';

/**
 * Hook to sync a list of static products with real-time updates from Firestore.
 * 
 * @param {Array} staticProducts - The initial array of product objects from static data
 * @returns {Array} - The synced array of products
 */
export const useSyncedProducts = (staticProducts) => {
  const [syncedProducts, setSyncedProducts] = useState(staticProducts);

  useEffect(() => {
    // Subscribe to real-time updates from the 'products' collection
    const unsubscribe = db.collection('products').onSnapshot(snapshot => {
      const dbProducts = {};
      
      // Collect all Firestore products into a map by ID
      snapshot.docs.forEach(doc => {
        dbProducts[doc.id] = { id: doc.id, ...doc.data() };
      });
      console.log("SYNC DEBUG: Firestore Products Map:", dbProducts);
      // console.log("SYNC DEBUG: Firestore Products Map:", dbProducts);
      
      // Merge logic:
      // 1. Start with static products
      // 2. If a Firestore product exists with the same ID:
      //    b. If deleted: true, filter it out
      //    a. If active, override static data with Firestore data
      // 3. (Optional) We could also add completely new products from Firestore if they match criteria,
      //    but for now, we focus on overriding existing static products + handling deletions.
      
      const merged = staticProducts.map(product => {
        const idString = String(product.id);
        const dbProduct = dbProducts[idString];
        
        if (dbProduct) {
          // If marked as deleted in DB, return null (to filter out later)
          if (dbProduct.deleted) {
            return null;
          }
          // Otherwise, merge static data with DB updates (DB takes precedence)
          console.log(`SYNC DEBUG: Merging product ${idString} with DB data`, dbProduct);
          return { ...product, ...dbProduct };
        }
        
        return product;
      }).filter(Boolean); // Remove nulls (deleted products)
      
      setSyncedProducts(merged);
    }, error => {
      console.error("Error syncing products:", error);
    });

    return () => unsubscribe();
  }, [staticProducts]);

  return syncedProducts;
};
