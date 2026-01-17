
import React, { useState } from 'react';
import { db } from '../firebase';
import AdminAddProduct from './AdminAddProduct';

// =============================================
// ADMIN PANEL COMPONENT
// =============================================
export default function AdminPanel({ onBack }) {
  const [view, setView] = useState('menu'); // 'menu', 'add', 'list'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const loadProducts = () => {
    setLoading(true);
    db.collection('products')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()
      .then((snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  };
  
  const deleteProduct = async (productId) => {
    if (window.confirm('ต้องการลบสินค้านี้?')) {
      try {
        await db.collection('products').doc(productId).delete();
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };
  
  if (view === 'add') {
    return <AdminAddProduct onBack={() => setView('menu')} onSuccess={() => setView('menu')} />;
  }
  
  if (view === 'list') {
    return (
      <div className="admin-product-list">
        <button className="auth-back" onClick={() => setView('menu')}>← กลับ</button>
        <h2 className="admin-title">📦 สินค้าที่เพิ่มจาก Admin</h2>
        
        {loading ? (
          <div className="admin-loading">กำลังโหลด...</div>
        ) : products.length === 0 ? (
          <div className="admin-empty">ยังไม่มีสินค้าที่เพิ่มจาก Admin</div>
        ) : (
          <div className="admin-products-grid">
            {products.map((product) => (
              <div key={product.id} className="admin-product-card">
                <img src={product.image} alt={product.name} />
                <div className="admin-product-info">
                  <h4>{product.name}</h4>
                  <p className="admin-product-price">฿{product.price?.toLocaleString()}</p>
                  <p className="admin-product-collection">{product.collection}</p>
                </div>
                <button className="admin-delete-btn" onClick={() => deleteProduct(product.id)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="admin-panel">
      <button className="auth-back" onClick={onBack}>← กลับ</button>
      <h2 className="admin-title">🔧 Admin Panel</h2>
      
      <div className="admin-menu">
        <button className="admin-menu-btn" onClick={() => setView('add')}>
          <span className="admin-menu-icon">➕</span>
          <span className="admin-menu-text">เพิ่มสินค้าใหม่</span>
        </button>
        <button className="admin-menu-btn" onClick={() => { setView('list'); loadProducts(); }}>
          <span className="admin-menu-icon">📦</span>
          <span className="admin-menu-text">ดูสินค้าที่เพิ่ม</span>
        </button>
      </div>
    </div>
  );
}
