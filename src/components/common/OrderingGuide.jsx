
import React, { useState, useEffect } from 'react';

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

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100000,
      padding: '20px',
      opacity: animateIn ? 1 : 0,
      transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(8px)'
    },
    modal: {
      background: '#ffffff',
      borderRadius: '24px',
      maxWidth: '720px',
      width: '100%',
      maxHeight: '88vh',
      overflow: 'hidden',
      color: '#1a1a1a',
      position: 'relative',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transform: animateIn ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      opacity: animateIn ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      fontFamily: "'Sarabun', sans-serif"
    },
    header: {
      padding: '32px 32px 24px',
      background: '#ffffff',
      borderBottom: '1px solid #f0f0f0',
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
      background: '#f5f5f5',
      border: '1px solid #e0e0e0',
      color: '#1a1a1a',
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
      color: '#1a1a1a',
      margin: 0,
      textAlign: 'center',
      fontFamily: "'Playfair Display', serif",
      letterSpacing: '0.5px'
    },
    subtitle: {
      textAlign: 'center',
      color: '#666666',
      marginTop: '8px',
      fontSize: '0.95rem',
      fontWeight: 400,
      letterSpacing: '0.5px'
    },
    content: {
      padding: '28px 32px',
      overflowY: 'auto',
      maxHeight: 'calc(88vh - 200px)',
      background: '#fafafa'
    },
    stepContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '16px',
      padding: '20px',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #eeeeee',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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
      color: '#ffffff',
      boxShadow: '0 8px 16px rgba(201,165,90,0.25)'
    },
    stepNumber: {
      color: '#c9a55a',
      fontSize: '0.8rem',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      marginBottom: '4px',
      fontFamily: "'Playfair Display', serif"
    },
    stepTitle: {
      fontSize: '1.15rem',
      fontWeight: 600,
      color: '#1a1a1a',
      margin: '0 0 6px 0',
      fontFamily: "'Playfair Display', serif"
    },
    stepDesc: {
      fontSize: '0.9rem',
      color: '#555555',
      margin: 0,
      lineHeight: 1.6,
      fontWeight: 400
    },

    decorLine: {
      width: '60px',
      height: '3px',
      background: '#c9a55a',
      margin: '16px auto 0',
      borderRadius: '2px'
    }
  };

  return (
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
              e.target.style.background = '#e0e0e0';
              e.target.style.borderColor = '#c0c0c0';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f5f5f5';
              e.target.style.borderColor = '#e0e0e0';
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
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#c9a55a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#eeeeee';
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


      </div>
    </div>
  );
}
