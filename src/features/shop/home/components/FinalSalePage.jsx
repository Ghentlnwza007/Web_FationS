
import React, { useState, useContext } from 'react';
import { CurrencyContext, CartContext, WishlistContext } from '../../../../context/Contexts';
import SizeSelectionModal from '../../product-details/components/SizeSelectionModal';
import './NewArrivals.css'; // Re-use styling from New Arrivals

// =============================================
// FINAL SALE PRODUCTS DATA (Now 4 Items)
// =============================================
const saleProductsData = [
  {
    id: 201,
    name: "Rebel Military Jacket in Khaki",
    originalPrice: 3670.00,
    price: 2936.00, // 20% off
    model: "Military Jacket",
    material: "100% Cotton",
    color: "Green",
    size: "S, M, L",
    stock: 5,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMDJ6064_F1_1125.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMDJ6064_B1_1125.jpg?v=1763996764",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMDJ6064_F4_1125.jpg?v=1763996764"
    ],
    colorVariants: [
          { name: "Green", hex: "#2f6640ff", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMDJ6064_F1_1125.jpg" },
        ],
    tag: "SALE",
    description: "เสื้อแจ็คเก็ตยีนส์วินเทจสไตล์"
  },
  {
    id: 202,
    name: "Black Vapor Tracksuit Top",
    originalPrice: 3900.00,
    price: 3120.00, // 20% off
    model: "Black Vapor Tracksuit",
    material: "100% Cotton",
    color: "Black",
    size: "S, M, L, XL",
    stock: 8,
    images: [
      "https://jadedldn.com/cdn/shop/files/JMDJ5193_F1_0625_1200x1800.jpg?v=1749725050",
      "https://jadedldn.com/cdn/shop/files/17JANMWECCOM00681_1200x1800.jpg?v=1749725043",
      "https://jadedldn.com/cdn/shop/files/JMDJ5193_F3_0625_1200x1800.jpg?v=1749725043"
    ],
    colorVariants: [
          { name: "Black", hex: "#000000ff", image: "https://jadedldn.com/cdn/shop/files/JMDJ5193_F1_0625_1200x1800.jpg?v=1749725050" },
        ],
    tag: "SALE",
    description: "เสื้อกันหนาวคุณภาพสูง"
  },
  {
    id: 203,
    name: "Sporty Baggy Monster Hoodie",
    originalPrice: 5470.00,
    price: 4370.00, // 20% off
    model: "Sporty Baggy",
    material: "100% Cotton",
    color: "Gray",
    size: "M, L, XL",
    stock: 12,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1292.jpg?v=1737996348",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1279.jpg?v=1737996348",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1325.jpg?v=1737996348"
    ],
    colorVariants: [
          { name: "Gray", hex: "#848894ff", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1292.jpg?v=1737996348" },
        ],
    tag: "SALE",
    description: "เสื้อฮู้ดกราฟิก"
  },
  {
    id: 204, // New 4th Item
    name: "Argentina Away Jersey 2006 Messi",
    originalPrice: 4300.00,
    price: 3440.00, // 20% off
    model: "JN3709",
    material: "100% polyester (100% recycled)",
    color: "Dark Blue",
    size: "S, M, L, XL",
    stock: 15,
    images: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f0011b687bb44caf9ef73bfd0698f69b_9366/Argentina_Away_Jersey_2006_Messi_Blue_JN3709_HM1.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9aee22649f74d7c936245cc495c3fa2_9366/Argentina_Away_Jersey_2006_Messi_Blue_JN3709_HM3_hover.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/bd9934bafeb04096ad71a78c6a627573_9366/Argentina_Away_Jersey_2006_Messi_Blue_JN3709_HM11.jpg"
    ],
    colorVariants: [
          { name: "Dark Blue", hex: "#50639bff", image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f0011b687bb44caf9ef73bfd0698f69b_9366/Argentina_Away_Jersey_2006_Messi_Blue_JN3709_HM1.jpg" },
        ],
    tag: "SALE",
    description: "เสื้อฟุตบอลแท้ 100%"
  }
];

// Reusing the Card logic but adapted for Sale Data
function SaleCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { formatPrice } = useContext(CurrencyContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div 
        className="new-arrival-card" // Using New Arrival styles
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="new-arrival-image">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            loading="lazy"
          />
          <span className="arrival-tag sale">SALE -20%</span>
          
          {isHovered && product.images.length > 1 && (
            <>
              <button className="carousel-arrow left" onClick={prevImage}>‹</button>
              <button className="carousel-arrow right" onClick={nextImage}>›</button>
            </>
          )}
          
          <button 
            className="arrival-add-to-cart"
            onClick={(e) => { e.stopPropagation(); setShowSizeModal(true); }}
          >
            Add to Cart
          </button>
        </div>
        <div className="new-arrival-info">
          <h3 className="arrival-name">{product.name}</h3>
          <p className="arrival-desc">{product.description}</p>
          <div className="sale-price-container" style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
             <span className="arrival-price" style={{color: '#d32f2f'}}>{formatPrice(product.price)}</span>
             <span className="sale-original-price" style={{textDecoration: 'line-through', color: '#999', fontSize: '14px'}}>{formatPrice(product.originalPrice)}</span>
          </div>
        </div>
      </div>

      {showSizeModal && (
        <SizeSelectionModal
          product={{...product, image: product.images[0]}}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}

export default function FinalSalePage({ onBack }) {
  return (
    <section id="final-sale" className="new-arrivals" style={{paddingTop: '40px', paddingBottom: '80px', background: '#fff'}}>
      <div className="section-header">
        <span className="section-tag" style={{color: '#d32f2f'}}>Final Offer</span>
        <h2 className="section-title">FINAL SALE</h2>
        <div className="section-line" />
      </div>
      
      <div className="arrivals-grid">
        {saleProductsData.map((product) => (
          <SaleCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
