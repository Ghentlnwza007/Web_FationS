
import React, { useState, useRef } from 'react';

// =============================================
// VIRTUAL TRY-ON COMPONENT
// =============================================
export default function VirtualTryOn({ product, onClose }) {
  const [userImage, setUserImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTryOn = async () => {
    if (!userImage) return;
    
    setIsProcessing(true);
    
    // Simulate AR processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, we'll show a combined view
    setTryOnResult({
      userImage,
      productImage: product.image
    });
    
    setIsProcessing(false);
  };
  
  return (
    <div className="try-on-overlay" onClick={onClose}>
      <div className="try-on-container" onClick={e => e.stopPropagation()}>
        <button className="try-on-close" onClick={onClose}>×</button>
        <h3 className="try-on-title">👗 Virtual Try-On</h3>
        <p className="try-on-product">{product.name}</p>
        
        {!tryOnResult ? (
          <>
            <div className="try-on-upload-area">
              {userImage ? (
                <img src={userImage} alt="Your photo" className="try-on-preview" />
              ) : (
                <div 
                  className="try-on-placeholder"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="upload-icon">📷</span>
                  <p>คลิกเพื่ออัปโหลดรูปของคุณ</p>
                  <p className="upload-hint">รูปหน้าตรง ยืนเต็มตัว</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            
            {userImage && (
              <div className="try-on-actions">
                <button 
                  className="try-on-btn secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  🔄 เปลี่ยนรูป
                </button>
                <button 
                  className="try-on-btn primary"
                  onClick={handleTryOn}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'กำลังประมวลผล...' : '✨ ลองสวมใส่'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="try-on-result">
            <div className="try-on-result-grid">
              <div className="result-item">
                <img src={tryOnResult.userImage} alt="You" />
                <span>คุณ</span>
              </div>
              <span className="result-plus">+</span>
              <div className="result-item">
                <img src={tryOnResult.productImage} alt="Product" />
                <span>สินค้า</span>
              </div>
            </div>
            
            <div className="try-on-preview-result">
              <p>🎉 ดูเข้ากันดีมาก!</p>
              <p className="preview-note">* นี่เป็น Demo version - ระบบ AR จริงกำลังพัฒนา</p>
            </div>
            
            <button 
              className="try-on-btn primary"
              onClick={() => setTryOnResult(null)}
            >
              ลองใหม่
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
