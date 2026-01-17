
import React, { useEffect, useContext } from 'react';
import { CompareContext, CurrencyContext } from '../context/Contexts';

// =============================================
// PRODUCT COMPARE MODAL
// =============================================
export default function ProductCompareModal() {
  const { compareList, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useContext(CompareContext);
  const { formatPrice } = useContext(CurrencyContext);
  
  useEffect(() => {
    if (isCompareOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCompareOpen]);
  
  if (!isCompareOpen) return null;
  
  return (
    <div className="compare-modal-overlay active" onClick={() => setIsCompareOpen(false)}>
      <div className="compare-modal" onClick={e => e.stopPropagation()}>
        <button className="compare-modal-close" onClick={() => setIsCompareOpen(false)}>×</button>
        <h2 className="compare-title">📊 เปรียบเทียบสินค้า</h2>
        
        {compareList.length === 0 ? (
          <div className="compare-empty">
            <p>ยังไม่มีสินค้าในรายการเปรียบเทียบ</p>
            <p className="compare-hint">กดปุ่ม "Compare" ที่การ์ดสินค้าเพื่อเพิ่ม</p>
          </div>
        ) : (
          <div className="compare-grid" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
            {compareList.map((product) => (
              <div key={product.id} className="compare-product">
                <button className="compare-remove" onClick={() => removeFromCompare(product.id)}>×</button>
                <img src={product.image} alt={product.name} className="compare-product-image" />
                <h4 className="compare-product-name">{product.name}</h4>
                <div className="compare-product-price">{formatPrice(product.price)}</div>
                
                <div className="compare-specs">
                  <div className="compare-spec">
                    <span className="spec-label">Model</span>
                    <span className="spec-value">{product.model}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Size</span>
                    <span className="spec-value">{product.size}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Material</span>
                    <span className="spec-value">{product.material}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Color</span>
                    <span className="spec-value">{product.color}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Stock</span>
                    <span className="spec-value">{product.stock} ชิ้น</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {compareList.length > 0 && (
          <button className="compare-clear-btn" onClick={clearCompare}>
            🗑️ ล้างรายการ
          </button>
        )}
      </div>
    </div>
  );
}
