
import React, { useState, useEffect } from 'react';

// =============================================
// 3D PRODUCT VIEWER COMPONENT
// =============================================
export default function Product3DViewer({ images, productName, onClose }) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Simulate 360 view with multiple angles (using same image for demo)
  const totalAngles = 12;
  
  useEffect(() => {
    if (autoRotate && !isDragging) {
      const interval = setInterval(() => {
        setCurrentAngle(prev => (prev + 1) % totalAngles);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isDragging]);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoRotate(false);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 20) {
      setCurrentAngle(prev => {
        if (delta > 0) return (prev + 1) % totalAngles;
        return (prev - 1 + totalAngles) % totalAngles;
      });
      setStartX(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setAutoRotate(false);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    if (Math.abs(delta) > 20) {
      setCurrentAngle(prev => {
        if (delta > 0) return (prev + 1) % totalAngles;
        return (prev - 1 + totalAngles) % totalAngles;
      });
      setStartX(e.touches[0].clientX);
    }
  };
  
  return (
    <div className="viewer-3d-overlay" onClick={onClose}>
      <div className="viewer-3d-container" onClick={e => e.stopPropagation()}>
        <button className="viewer-3d-close" onClick={onClose}>×</button>
        <h3 className="viewer-3d-title">🔄 360° View: {productName}</h3>
        
        <div 
          className="viewer-3d-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <img 
            src={images} 
            alt={productName}
            style={{ transform: `rotateY(${currentAngle * 30}deg)` }}
            draggable={false}
          />
          <div className="viewer-3d-indicator">
            <span className="angle-display">{currentAngle * 30}°</span>
          </div>
        </div>
        
        <div className="viewer-3d-controls">
          <button 
            className={`control-btn ${autoRotate ? 'active' : ''}`} 
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? '⏸ หยุด' : '▶ หมุนอัตโนมัติ'}
          </button>
          <p className="viewer-3d-hint">👆 ลากซ้าย-ขวาเพื่อหมุนสินค้า</p>
        </div>
      </div>
    </div>
  );
}
