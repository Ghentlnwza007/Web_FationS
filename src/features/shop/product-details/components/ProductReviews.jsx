
import React, { useState, useEffect } from 'react';
import { db } from '../../../../services/firebase';
import StarRating from '../../../../components/ui/StarRating';

// =============================================
// PRODUCT REVIEWS DISPLAY COMPONENT
// =============================================
export default function ProductReviews({ productId }) {
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
