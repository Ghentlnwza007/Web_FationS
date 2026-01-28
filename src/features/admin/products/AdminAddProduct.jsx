
import React, { useState, useEffect } from 'react';
import { db, firebase } from '../../../services/firebase';

// =============================================
// ADMIN ADD/EDIT PRODUCT FORM COMPONENT
// =============================================
export default function AdminAddProduct({ onBack, onSuccess, editingProduct }) {
  const isEditMode = !!editingProduct;
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    model: '',
    size: 'S, M, L, XL',
    material: '',
    color: '',
    colorHex: '#3498db',
    stock: '10',
    image: '',
    collection: 'men'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Populate form when editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        price: String(editingProduct.price || ''),
        model: editingProduct.model || '',
        size: editingProduct.size || 'S, M, L, XL',
        material: editingProduct.material || '',
        color: editingProduct.color || editingProduct.colorVariants?.[0]?.name || '',
        colorHex: editingProduct.colorVariants?.[0]?.hex || '#3498db',
        stock: String(editingProduct.stock || '10'),
        image: editingProduct.image || editingProduct.images?.[0] || '',
        collection: editingProduct.collection || 'men'
      });
    }
  }, [editingProduct]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      setError('กรุณากรอกชื่อ, ราคา และ URL รูปภาพ');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        model: formData.model || formData.name,
        size: formData.size,
        material: formData.material || 'Mixed Materials',
        color: formData.color || 'Various',
        stock: parseInt(formData.stock) || 10,
        image: formData.image,
        collection: formData.collection,
        colorVariants: [
          { name: formData.color || 'Default', hex: formData.colorHex || '#888888', image: formData.image }
        ],
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      if (isEditMode) {
        // Update existing product
        const productId = String(editingProduct.id);
        await db.collection('products').doc(productId).set({
          ...productData,
          createdAt: editingProduct.createdAt || firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        setSuccess(true);
      } else {
        // Add new product
        productData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection('products').add(productData);
        setSuccess(true);
        setFormData({
          name: '',
          price: '',
          model: '',
          size: 'S, M, L, XL',
          material: '',
          color: '',
          colorHex: '#3498db',
          stock: '10',
          image: '',
          collection: 'men'
        });
      }
      
      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      console.error("Error saving product:", err);
      setError(isEditMode ? 'เกิดข้อผิดพลาดในการแก้ไขสินค้า' : 'เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="admin-add-product">
      <button className="auth-back" onClick={onBack}>← กลับ</button>
      <h2 className="admin-title">{isEditMode ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}</h2>
      
      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">✓ {isEditMode ? 'แก้ไขสำเร็จ!' : 'เพิ่มสินค้าสำเร็จ!'}</div>}
      
      <form onSubmit={handleSubmit} className="admin-product-form">
        <div className="form-group">
          <label>ชื่อสินค้า *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ชื่อสินค้า"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>ราคา (บาท) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="1990.00"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>จำนวนในสต็อก</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="10"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>รุ่น / Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="รุ่นสินค้า"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>ไซส์</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="S, M, L, XL"
            />
          </div>
          <div className="form-group">
            <label>ชื่อสี</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="White / Clear Blue"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>เลือกสี (สำหรับวงกลมสี)</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                name="colorHex"
                value={formData.colorHex}
                onChange={handleChange}
                className="color-picker-input"
              />
              <input
                type="text"
                name="colorHex"
                value={formData.colorHex}
                onChange={handleChange}
                placeholder="#3498db"
                className="color-hex-input"
              />
              <div 
                className="color-preview" 
                style={{ backgroundColor: formData.colorHex }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>วัสดุ</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="100% Cotton"
          />
        </div>
        
        <div className="form-group">
          <label>URL รูปภาพ *</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label>เลือก Collection *</label>
          <select name="collection" value={formData.collection} onChange={handleChange}>
            <option value="men">Men's Collection</option>
            <option value="women">Women's Collection</option>
            <option value="unisex">Unisex Collection</option>
            <option value="sports">Sports & Lifestyle</option>
          </select>
        </div>
        
        <button type="submit" className="admin-submit-btn" disabled={submitting}>
          {submitting ? 'กำลังบันทึก...' : (isEditMode ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มสินค้า')}
        </button>
      </form>
    </div>
  );
}
