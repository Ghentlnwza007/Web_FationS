import { useState, useEffect } from 'react';
import { db } from '../services/firebase';

/**
 * Hook สำหรับซิงค์ข้อมูลสินค้าเริ่มต้น (Static Data) ให้เป็นปัจจุบันเสมอด้วยข้อมูลจาก Firestore (Real-time)
 * 
 * @param {Array} staticProducts - อาร์เรย์ของข้อมูลสินค้าเริ่มต้น (จากไฟล์ JSON)
 * @returns {Array} - อาร์เรย์ของสินค้าที่ซิงค์ข้อมูลล่าสุดแล้ว
 */
export const useSyncedProducts = (staticProducts) => {
      const [syncedProducts, setSyncedProducts] = useState(staticProducts);

      useEffect(() => {
        // เชื่อมต่อ (Subscribe) เพื่อรอรับข้อมูลอัปเดตแบบ Real-time จาก collection 'products'
        const unsubscribe = db.collection('products').onSnapshot(snapshot => {
          const dbProducts = {};
          
      // รวบรวมข้อมูลสินค้าจาก Firestore ทั้งหมดมาเก็บในตัวแปร Map (ใช้ ID เป็นคีย์)
      snapshot.docs.forEach(doc => {
        dbProducts[doc.id] = { id: doc.id, ...doc.data() };
      });
      console.log("SYNC DEBUG: Firestore Products Map:", dbProducts);
      // console.log("SYNC DEBUG: Firestore Products Map:", dbProducts);
      
      // Logic การผสานข้อมูล (Merge Logic):
      // 1. เริ่มจากข้อมูลสินค้าเริ่มต้น (Static Products)
      // 2. ถ้ามีข้อมูลสินค้าชิ้นเดียวกันอยู่ใน Firestore (เช็คจาก ID):
      //    b. ถ้าถูกมาร์คว่าลบ (deleted: true) -> ให้ตัดทิ้งไป
      //    a. ถ้ายังใช้งานอยู่ -> ให้ใช้ข้อมูลจาก Firestore เขียนทับข้อมูลเดิม
      // 3. (เพิ่มเติม) เราสามารถเพิ่มสินค้าใหม่ที่สร้างจาก Firestore ได้ที่นี่
      //    แต่ตอนนี้เราเน้นแค่การอัปเดตข้อมูลสินค้าเดิมและการลบก่อน
      
      const merged = staticProducts.map(product => {
        const idString = String(product.id);
        const dbProduct = dbProducts[idString];
        
        if (dbProduct) {
          // ถ้าถูกระบุใน DB ว่าให้ลบ -> ส่งค่า null กลับไป (เพื่อไปกรองออกทีหลัง)
          if (dbProduct.deleted) {
            return null;
          }
          // ถ้าไม่ลบ -> ผสานข้อมูลเดิมเข้ากับข้อมูลใหม่จาก DB (ข้อมูลจาก DB จะทับข้อมูลเดิม)
          console.log(`SYNC DEBUG: Merging product ${idString} with DB data`, dbProduct);
          return { ...product, ...dbProduct };
        }
        
        return product;
      }).filter(Boolean); // กรองค่า null ออก (สินค้าที่ถูกลบ)
      
      setSyncedProducts(merged);
    }, error => {
      console.error("Error syncing products:", error);
    });

    return () => unsubscribe();
  }, [staticProducts]);

  return syncedProducts;
};
