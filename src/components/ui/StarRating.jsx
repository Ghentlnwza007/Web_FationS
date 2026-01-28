
import React, { useState } from 'react';

export default function StarRating({ rating, onRatingChange, readonly = false, size = 24 }) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleKeyDown = (e, value) => {
    if (readonly) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(value);
    }
  };
  
  return (
    <div 
      className={`star-rating ${readonly ? 'readonly' : ''}`}
      role="radiogroup"
      aria-label={`Rating: ${rating} out of 5 stars`}
      aria-disabled={readonly}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          onKeyDown={(e) => handleKeyDown(e, star)}
          style={{ 
            fontSize: size, 
            cursor: readonly ? 'default' : 'pointer', 
            background: 'none', 
            border: 'none', 
            padding: 0,
            transition: 'color 0.2s ease, transform 0.1s ease',
            color: star <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9' 
          }}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          aria-pressed={star === rating}
          disabled={readonly}
          tabIndex={readonly ? -1 : 0}
        >
          ★
        </button>
      ))}
    </div>
  );
}
