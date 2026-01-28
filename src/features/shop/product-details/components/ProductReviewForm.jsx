
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../context/Contexts';
import StarRating from '../../../../components/ui/StarRating';
import { db, firebase } from '../../../../services/firebase';

// =============================================
// PRODUCT REVIEW FORM COMPONENT
// =============================================
export default function ProductReviewForm({ productId, productName, onSubmit, onCancel }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('กรุณาให้คะแนนดาว');
      return;
    }
    
    if (reviewText.trim().length < 10) {
      setError('กรุณาเขียนรีวิวอย่างน้อย 10 ตัวอักษร');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      const reviewData = {
        productId,
        productName,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName?.charAt(0) || ''}.`,
        rating,
        reviewText: reviewText.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      await db.collection('reviews').add(reviewData);
      
      setRating(0);
      setReviewText('');
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error("Error submitting review:", err);
      setError('เกิดข้อผิดพลาดในการส่งรีวิว');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="review-form">
      <h4 className="review-form-title">เขียนรีวิวสินค้า</h4>
      
      {error && <div className="review-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="review-rating-section">
          <label>ให้คะแนน:</label>
          <StarRating rating={rating} onRatingChange={setRating} size={28} />
        </div>
        
        <div className="review-text-section">
          <label>รีวิวของคุณ:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="แชร์ประสบการณ์การใช้สินค้านี้..."
            rows="4"
            maxLength="500"
          />
          <span className="char-count">{reviewText.length}/500</span>
        </div>
        
        <div className="review-form-actions">
          <button type="button" className="review-cancel-btn" onClick={onCancel}>
            ยกเลิก
          </button>
          <button type="submit" className="review-submit-btn" disabled={submitting}>
            {submitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
          </button>
        </div>
      </form>
    </div>
  );
}
