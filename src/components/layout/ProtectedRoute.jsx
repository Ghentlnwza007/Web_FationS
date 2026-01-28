import React, { useContext } from 'react';
import { AuthContext } from '../../context/Contexts';

/**
 * ProtectedRoute Component
 * ใช้สำหรับป้องกันหน้าที่ต้องการสิทธิ์พิเศษ
 * 
 * @param {string} requiredRole - role ที่ต้องการ ('admin', 'user', หรือ undefined สำหรับแค่ต้อง login)
 * @param {React.ReactNode} children - component ที่จะแสดง
 * @param {function} onAccessDenied - callback เมื่อไม่มีสิทธิ์ (optional)
 */
export default function ProtectedRoute({ 
  requiredRole, 
  children, 
  onAccessDenied,
  fallback = null 
}) {
  const { user, isLoggedIn, isAdmin, openAuthModal } = useContext(AuthContext);

  // ถ้ายังไม่ล็อกอิน
  if (!isLoggedIn) {
    // แสดง AuthModal
    if (typeof openAuthModal === 'function') {
      setTimeout(() => openAuthModal('login'), 100);
    }
    
    return fallback || (
      <div className="protected-route-message">
        <div className="access-denied-card">
          <span className="access-denied-icon">🔒</span>
          <h3>กรุณาเข้าสู่ระบบ</h3>
          <p>คุณต้องเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</p>
        </div>
      </div>
    );
  }

  // ถ้าต้องการ role เฉพาะ
  if (requiredRole === 'admin' && !isAdmin) {
    if (onAccessDenied) {
      onAccessDenied();
    }
    
    return fallback || (
      <div className="protected-route-message">
        <div className="access-denied-card">
          <span className="access-denied-icon">⛔</span>
          <h3>ไม่มีสิทธิ์เข้าถึง</h3>
          <p>หน้านี้สำหรับ Admin เท่านั้น</p>
          <p className="access-denied-hint">
            ถ้าคุณคิดว่าเป็นข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ
          </p>
        </div>
      </div>
    );
  }

  // ผ่านการตรวจสอบ - แสดง children
  return children;
}
