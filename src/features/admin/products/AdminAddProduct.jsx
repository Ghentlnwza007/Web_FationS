
import React, { useState, useEffect } from 'react';
import { db, firebase } from '../../../services/firebase';
import './AdminProducts.css';

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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        const productId = String(editingProduct.id);
        await db.collection('products').doc(productId).set({
          ...productData,
          createdAt: editingProduct.createdAt || firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        setSuccess(true);
      } else {
        productData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection('products').add(productData);
        setSuccess(true);
        setFormData({
            name: '', price: '', model: '', size: 'S, M, L, XL', 
            material: '', color: '', colorHex: '#3498db', stock: '10', 
            image: '', collection: 'men'
        });
      }
      
      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      console.error("Error saving product:", err);
      setError(isEditMode ? 'เกิดข้อผิดพลาดในการแก้ไขสินค้า' : 'เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="admin-add-product-page">
      {/* Header */}
      <div className="admin-page-header">
        <button className="back-button" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="page-title">
            <h2>{isEditMode ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h2>
        </div>
      </div>
      
      {error && <div className="admin-error" style={{marginBottom: 20, padding: 10, background: '#fee2e2', color: '#b91c1c', borderRadius: 8}}>{error}</div>}
      {success && <div className="admin-success" style={{marginBottom: 20, padding: 10, background: '#dcfce7', color: '#15803d', borderRadius: 8}}>✓ {isEditMode ? 'บันทึกสำเร็จ' : 'เพิ่มสำเร็จ'}</div>}
      
      <form onSubmit={handleSubmit} className="admin-product-container">
        
        {/* Left Column: Media & Visuals */}
        <div className="admin-product-media">
          <div className="media-card">
            <h3 className="form-section-title">รูปภาพสินค้า</h3>
            
            <div className={`media-preview-area ${formData.image ? 'has-image' : ''}`}>
              {formData.image ? (
                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
              ) : (
                <div className="media-placeholder">
                  <span className="media-placeholder-icon">🖼️</span>
                  <p>รูปตัวอย่างจะแสดงที่นี่</p>
                </div>
              )}
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">URL รูปภาพ *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
               <label className="admin-form-label">สีสินค้า (Preview)</label>
               <div className="color-picker-container" onClick={() => document.getElementById('colorPickerInput').click()}>
                  <div className="color-preview-circle" style={{backgroundColor: formData.colorHex}}></div>
                  <input 
                    type="text" 
                    value={formData.colorHex} 
                    readOnly 
                    className="color-hex-text"
                  />
                  <input
                    id="colorPickerInput"
                    type="color"
                    name="colorHex"
                    value={formData.colorHex}
                    onChange={handleChange}
                    className="color-input-hidden"
                  />
               </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Details Form */}
        <div className="admin-product-form-section">
            <h3 className="form-section-title">ข้อมูลทั่วไป</h3>
            
            <div className="admin-form-group">
              <label className="admin-form-label">ชื่อสินค้า *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ชื่อสินค้า"
                className="admin-input"
              />
            </div>
            
            <div className="admin-form-row">
                <div className="admin-form-group">
                <label className="admin-form-label">ราคา (บาท) *</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    className="admin-input"
                />
                </div>
                <div className="admin-form-group">
                <label className="admin-form-label">จำนวนในสต็อก</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="10"
                    className="admin-input"
                />
                </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Collection *</label>
              <select 
                name="collection" 
                value={formData.collection} 
                onChange={handleChange}
                className="admin-select"
              >
                <option value="men">Men's Collection</option>
                <option value="women">Women's Collection</option>
                <option value="unisex">Unisex Collection</option>
                <option value="sports">Sports & Lifestyle</option>
              </select>
            </div>

            <h3 className="form-section-title" style={{marginTop: 32}}>รายละเอียดสินค้า</h3>
            
            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label className="admin-form-label">รุ่น / Model</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="รุ่นสินค้า"
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-form-label">วัสดุ / Material</label>
                    <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="เช่น 100% Cotton"
                        className="admin-input"
                    />
                </div>
            </div>

            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label className="admin-form-label">ขนาดที่ระบุ / Size</label>
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder="S, M, L, XL"
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-form-label">ชื่อสี (ข้อความ)</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="White / Clear Blue"
                        className="admin-input"
                    />
                </div>
            </div>

            <div className="admin-actions">
                <button type="button" className="btn-cancel" onClick={onBack}>ยกเลิก</button>
                <button type="submit" className="btn-save" disabled={submitting}>
                    {submitting ? 'กำลังบันทึก...' : '💾 บันทึกการแก้ไข'}
                </button>
            </div>
        </div>
      </form>
    </div>
  );
}
