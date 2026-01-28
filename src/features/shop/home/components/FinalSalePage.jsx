
import React, { useState, useContext } from 'react';
import { CurrencyContext, CartContext, WishlistContext } from '../../../../context/Contexts';

// =============================================
// FINAL SALE PRODUCTS DATA (20% OFF)
// =============================================
const saleProductsData = [
  {
    id: 201,
    name: "Vintage Denim Jacket",
    originalPrice: 5990.00,
    price: 4792.00, // 20% off
    size: "S, M, L, XL",
    stock: 5,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JADEDMAN23MAY73480.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMJK4056_F1_0725.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMDJ6064_F1_1125.jpg"
    ],
    discount: 20,
    description: "เสื้อแจ็คเก็ตยีนส์วินเทจสไตล์"
  },
  {
    id: 202,
    name: "Premium Leather Belt",
    originalPrice: 2490.00,
    price: 1992.00, // 20% off
    size: "S, M, L",
    stock: 8,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMA6231_F1_0925.jpg?v=1760096508",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMA6231_F1_0925edited.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/FLAT6.jpg"
    ],
    discount: 20,
    description: "เข็มขัดหนังพรีเมี่ยมคุณภาพสูง"
  },
  {
    id: 203,
    name: "Oversized Graphic Tee",
    originalPrice: 1890.00,
    price: 1512.00, // 20% off
    size: "M, L, XL, XXL",
    stock: 12,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1292.jpg?v=1737996348",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/Artboard1_a7af62d9-1df2-4e06-a649-003dee60d630.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMT6381_3.jpg"
    ],
    discount: 20,
    description: "เสื้อยืดโอเวอร์ไซส์กราฟิก"
  }
];

// Sub-component for Sale Product Card
function SaleProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { formatPrice } = useContext(CurrencyContext);
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="sale-product-card">
      <div className="sale-product-image">
        <img src={product.images[0]} alt={product.name} />
        <span className="sale-discount-tag">-{product.discount}%</span>
        {product.stock < 5 && <span className="sale-badge" style={{ fontSize: '12px', padding: '5px 10px', top: '60px', left: '15px', position: 'absolute', background: 'rgba(0,0,0,0.7)', animation: 'none' }}>Only {product.stock} left!</span>}
        
        <button 
          className={`wishlist-icon ${wishlisted ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist({ ...product, image: product.images[0] }); }}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "#e74c3c" : "none"} stroke={wishlisted ? "#e74c3c" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      
      <div className="sale-product-info">
        <h3 className="sale-product-name">{product.name}</h3>
        <p className="sale-product-desc">{product.description}</p>
        <div className="sale-price-container">
          <span className="sale-discounted-price">{formatPrice(product.price)}</span>
          <span className="sale-original-price">{formatPrice(product.originalPrice)}</span>
        </div>
        <div className="sale-product-sizes" style={{ margin: '10px 0', fontSize: '13px', color: '#666' }}>
          <span>Sizes: </span>
          <span className="sizes-list" style={{ fontWeight: 500, color: '#333' }}>{product.size}</span>
        </div>
        <button 
          className="sale-add-to-cart"
          onClick={(e) => { e.stopPropagation(); addToCart({ ...product, image: product.images[0], selectedSize: product.size.split(',')[0].trim() }); }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// =============================================
// FINAL SALE PAGE COMPONENT
// =============================================
export default function FinalSalePage({ onBack }) {
  return (
    <section className="final-sale-page">
      <div className="sale-page-header">
        <button className="back-button" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
        <div className="sale-banner">
          <span className="sale-badge">FINAL SALE</span>
          <h1 className="sale-title">🔥 Special Discount 20% OFF 🔥</h1>
          <p className="sale-subtitle">สินค้าลดราคาพิเศษ จำนวนจำกัด!</p>
        </div>
      </div>
      
      <div className="sale-products-grid">
        {saleProductsData.map((product) => (
          <SaleProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
