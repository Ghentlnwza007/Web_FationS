import React from 'react';
import { createPortal } from 'react-dom';

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <div className="delete-modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 className="delete-modal-title">ยืนยันการลบสินค้า</h3>
        <p className="delete-modal-message">
          คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?
          <br />
          <span style={{ fontSize: '0.9em', color: '#666' }}>"{productName}"</span>
        </p>
        <div className="delete-modal-actions">
          <button className="delete-modal-btn cancel" onClick={onClose} data-testid="cancel-delete-btn">
            ยกเลิก
          </button>
          <button className="delete-modal-btn confirm" onClick={onConfirm} data-testid="confirm-delete-btn">
            ลบสินค้า
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
