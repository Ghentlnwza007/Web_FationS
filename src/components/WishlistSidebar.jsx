
import React, { useContext } from 'react';
import { WishlistContext, CartContext, CurrencyContext } from '../context/Contexts';

// =============================================
// WISHLIST SIDEBAR COMPONENT
// =============================================
export default function WishlistSidebar() {
  const {
    wishlist,
    removeFromWishlist,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { formatPrice } = useContext(CurrencyContext);

  if (!isWishlistOpen) return null;

  return (
    <div className={`wishlist-overlay ${isWishlistOpen ? "active" : ""}`}>
      <div className="wishlist-sidebar">
        <div className="wishlist-header">
          <h3 className="wishlist-title"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', display: 'inline'}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> My Wishlist ({wishlistCount})</h3>
          <button className="modal-close" onClick={() => setIsWishlistOpen(false)}>
            ×
          </button>
        </div>
        <div className="wishlist-items">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
              </div>
              <p>Your wishlist is empty</p>
              <span className="wishlist-empty-hint">Click the heart icon on products you love!</span>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-item-image">
                  <img src={item.image || item.images?.[0]} alt={item.name} />
                </div>
                <div className="wishlist-item-info">
                  <h4 className="wishlist-item-name">{item.name}</h4>
                  <p className="wishlist-item-price">{formatPrice(item.price)}</p>
                  <button
                    className="wishlist-add-cart-btn"
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  className="wishlist-item-remove"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
