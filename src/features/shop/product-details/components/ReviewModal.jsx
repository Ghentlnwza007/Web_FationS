
import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { AuthContext } from '../../../../context/Contexts';
import { firebase, db } from '../../../../services/firebase';
import StarRating from '../../../../components/ui/StarRating';

// =============================================
// PRODUCT REVIEW FORM COMPONENT
// =============================================
function ProductReviewForm({ productId, productName, onSubmit, onCancel }) {
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

// =============================================
// PRODUCT REVIEWS DISPLAY COMPONENT
// =============================================
function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (productId) {
      const unsubscribe = db.collection('reviews')
        .where('productId', '==', productId)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .onSnapshot((snapshot) => {
          const reviewsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setReviews(reviewsData);
          setLoading(false);
        }, (error) => {
          console.error("Error loading reviews:", error);
          setLoading(false);
        });
      
      return () => unsubscribe();
    }
  }, [productId]);
  
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;
  
  if (loading) {
    return <div className="reviews-loading">กำลังโหลดรีวิว...</div>;
  }
  
  return (
    <div className="product-reviews">
      <div className="reviews-summary">
        <div className="average-rating">
          <span className="rating-number">{averageRating}</span>
          <StarRating rating={Math.round(averageRating)} readonly size={20} />
          <span className="review-count">({reviews.length} รีวิว)</span>
        </div>
      </div>
      
      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
          <p className="no-reviews-hint">เป็นคนแรกที่รีวิว!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.userName}</span>
                  <StarRating rating={review.rating} readonly size={16} />
                </div>
                <span className="review-date">
                  {review.createdAt ? new Date(review.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : ''}
                </span>
              </div>
              <p className="review-text">{review.reviewText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
// REVIEW MODAL COMPONENT (DEFAULT EXPORT)
// =============================================
export default function ReviewModal({ product, onClose }) {
  const { user, isLoggedIn, openAuthModal } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("review-modal-overlay")) {
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
  
  // Inline styles for overlay - ensures highest z-index and fixed positioning
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000,
    overflow: 'hidden'
  };
  
  // Inline styles for modal content
  const modalStyle = {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    padding: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  };
  
  // Use createPortal to render modal directly to document.body
  // This ensures the modal is positioned relative to viewport, not parent containers
  return createPortal(
    <div className="review-modal-overlay active" style={overlayStyle} onClick={handleOverlayClick}>
      <div className="review-modal" style={modalStyle}>
        <button className="review-modal-close" onClick={onClose} style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#666'
        }}>×</button>
        
        <div className="review-modal-header" style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <img 
            src={product.image || product.images?.[0]} 
            alt={product.name} 
            className="review-product-image" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div className="review-product-info" style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{product.name}</h3>
          </div>
        </div>
        
        {showForm && isLoggedIn ? (
          <ProductReviewForm 
            productId={product.id}
            productName={product.name}
            onSubmit={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <ProductReviews productId={product.id} />
            <div className="review-modal-actions" style={{ marginTop: '20px', textAlign: 'center' }}>
              {isLoggedIn ? (
                <button className="write-review-btn" onClick={() => setShowForm(true)} style={{
                  background: 'linear-gradient(135deg, #c9a55a, #dbb978)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  ✏️ เขียนรีวิว
                </button>
              ) : (
                <button className="write-review-btn" onClick={() => openAuthModal('login')} style={{
                  background: 'linear-gradient(135deg, #c9a55a, #dbb978)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  เข้าสู่ระบบเพื่อเขียนรีวิว
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
