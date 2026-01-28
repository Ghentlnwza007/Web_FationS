
import React, { useContext } from 'react';
import { CartContext } from '../../context/Contexts';

// =============================================
// TOAST COMPONENT
// =============================================
export default function Toast() {
  const { toast } = useContext(CartContext);

  return (
    <div className={`toast ${toast.show ? "show" : ""}`}>
      <span className="toast-icon">✓</span>
      {toast.message}
    </div>
  );
}
