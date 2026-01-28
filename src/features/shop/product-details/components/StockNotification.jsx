
import React, { useState } from 'react';
import { db, firebase } from '../../../../services/firebase';

// =============================================
// STOCK NOTIFICATION COMPONENT
// =============================================
export default function StockNotification({ productId, productName, onClose }) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('กรุณากรอกอีเมลที่ถูกต้อง');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      await db.collection('stockNotifications').add({
        productId,
        productName,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        notified: false
      });
      
      setSuccess(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="stock-notification-form">
      <h4 className="stock-notification-title">🔔 แจ้งเตือนเมื่อสินค้ากลับมา</h4>
      <p className="stock-notification-desc">กรอกอีเมลเพื่อรับแจ้งเตือนเมื่อ {productName} กลับมาในสต็อก</p>
      
      {success ? (
        <div className="stock-notification-success">
          ✅ บันทึกเรียบร้อย! เราจะแจ้งเตือนคุณทันทีที่สินค้ากลับมา
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="stock-notification-error">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@email.com"
            className="stock-notification-input"
          />
          <button type="submit" className="stock-notification-btn" disabled={submitting}>
            {submitting ? 'กำลังบันทึก...' : '📧 แจ้งเตือนฉัน'}
          </button>
        </form>
      )}
    </div>
  );
}
