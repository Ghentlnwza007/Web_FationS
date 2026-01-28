
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// =============================================
// ORDERING GUIDE MODAL COMPONENT - PREMIUM EDITION
// อธิบายวิธีการสั่งซื้อสินค้า
// =============================================
export default function OrderingGuide({ isOpen, onClose }) {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setAnimateIn(true), 50);
    } else {
      setAnimateIn(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    {
      number: 1,
      title: "เลือกสินค้า",
      description: "เลือกสินค้าที่ต้องการจากหมวดหมู่ต่างๆ เช่น Men's, Women's, Unisex หรือจาก New Arrivals",
      icon: "🛍️"
    },
    {
      number: 2,
      title: "เลือกไซส์และสี",
      description: "คลิกที่สินค้าเพื่อดูรายละเอียด เลือกไซส์และสีที่ต้องการ",
      icon: "📏"
    },
    {
      number: 3,
      title: "เพิ่มลงตะกร้า",
      description: "กดปุ่ม 'Add to Cart' เพื่อเพิ่มสินค้าลงตะกร้า",
      icon: "🛒"
    },
    {
      number: 4,
      title: "ตรวจสอบตะกร้า",
      description: "คลิกที่ไอคอนตะกร้าเพื่อตรวจสอบรายการสินค้า",
      icon: "✅"
    },
    {
      number: 5,
      title: "เข้าสู่ระบบ",
      description: "กรุณาเข้าสู่ระบบหรือสมัครสมาชิกเพื่อดำเนินการ",
      icon: "👤"
    },
    {
      number: 6,
      title: "กรอกข้อมูลจัดส่ง",
      description: "กรอกชื่อ ที่อยู่ และเบอร์โทรศัพท์สำหรับการจัดส่ง",
      icon: "📦"
    },
    {
      number: 7,
      title: "ชำระเงิน",
      description: "เลือกวิธีชำระเงิน: โอนเงิน, บัตรเครดิต หรือ PromptPay",
      icon: "💳"
    },
    {
      number: 8,
      title: "รอรับสินค้า",
      description: "ติดตามสถานะได้ในหน้าประวัติ สินค้าจะถึงภายใน 3-5 วัน",
      icon: "🚚"
    }
  ];

  // Add Google Fonts dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Sarabun:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.98) 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100000,
      padding: '20px',
      opacity: animateIn ? 1 : 0,
      transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)'
    },
    modal: {
      background: 'linear-gradient(180deg, #1f1f1f 0%, #141414 100%)',
      borderRadius: '24px',
      maxWidth: '720px',
      width: '100%',
      maxHeight: '88vh',
      overflow: 'hidden',
      color: '#fff',
      position: 'relative',
      boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,165,90,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
      transform: animateIn ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      opacity: animateIn ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      fontFamily: "'Sarabun', sans-serif"
    },
    header: {
      padding: '32px 32px 24px',
      background: 'linear-gradient(180deg, rgba(201,165,90,0.12) 0%, transparent 100%)',
      borderBottom: '1px solid rgba(201,165,90,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 2
    },
    closeBtn: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#fff',
      fontSize: '20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #c9a55a 0%, #f5e6c3 50%, #c9a55a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0,
      textAlign: 'center',
      fontFamily: "'Playfair Display', serif",
      letterSpacing: '1px'
    },
    subtitle: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '10px',
      fontSize: '0.95rem',
      fontWeight: 300,
      letterSpacing: '0.5px'
    },
    content: {
      padding: '28px 32px',
      overflowY: 'auto',
      maxHeight: 'calc(88vh - 200px)'
    },
    stepContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.05)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    stepIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #c9a55a 0%, #a8853d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '26px',
      flexShrink: 0,
      boxShadow: '0 8px 24px rgba(201,165,90,0.3)'
    },
    stepNumber: {
      color: '#c9a55a',
      fontSize: '0.8rem',
      fontWeight: 600,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      marginBottom: '4px',
      fontFamily: "'Playfair Display', serif"
    },
    stepTitle: {
      fontSize: '1.15rem',
      fontWeight: 600,
      color: '#fff',
      margin: '0 0 8px 0',
      fontFamily: "'Playfair Display', serif"
    },
    stepDesc: {
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.6)',
      margin: 0,
      lineHeight: 1.7,
      fontWeight: 300
    },
    footer: {
      padding: '24px 32px',
      background: 'linear-gradient(180deg, rgba(201,165,90,0.08) 0%, rgba(201,165,90,0.15) 100%)',
      borderTop: '1px solid rgba(201,165,90,0.2)',
      textAlign: 'center'
    },
    footerTitle: {
      margin: '0 0 8px 0',
      color: '#c9a55a',
      fontWeight: 500,
      fontSize: '1rem',
      fontFamily: "'Playfair Display', serif"
    },
    footerText: {
      margin: 0,
      color: 'rgba(255,255,255,0.5)',
      fontSize: '0.9rem'
    },
    goldText: {
      color: '#c9a55a',
      fontWeight: 500
    },
    decorLine: {
      width: '60px',
      height: '3px',
      background: 'linear-gradient(90deg, transparent, #c9a55a, transparent)',
      margin: '16px auto 0',
      borderRadius: '2px'
    }
  };

  return createPortal(
    <div 
      style={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <button 
            onClick={onClose}
            style={styles.closeBtn}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(201,165,90,0.2)';
              e.target.style.borderColor = 'rgba(201,165,90,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.05)';
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
            aria-label="ปิด"
          >✕</button>
          <h2 style={styles.title}>วิธีการสั่งซื้อสินค้า</h2>
          <p style={styles.subtitle}>How to Order from MAISON</p>
          <div style={styles.decorLine}></div>
        </div>

        {/* Steps Content */}
        <div style={styles.content}>
          {steps.map((step, index) => (
            <div 
              key={step.number}
              style={{
                ...styles.stepContainer,
                animationDelay: `${index * 0.08}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,165,90,0.08) 0%, rgba(201,165,90,0.03) 100%)';
                e.currentTarget.style.borderColor = 'rgba(201,165,90,0.2)';
                e.currentTarget.style.transform = 'translateX(8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={styles.stepIcon}>
                {step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.stepNumber}>ขั้นตอนที่ {step.number}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerTitle}>✨ มีคำถามเพิ่มเติม?</p>
          <p style={styles.footerText}>
            ติดต่อเราทาง LINE: <span style={styles.goldText}>@maison</span> หรือโทร <span style={styles.goldText}>02-123-4567</span>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
