
import React, { useContext } from 'react';
import { CompareContext } from '../context/Contexts';

// =============================================
// COMPARE FLOATING BUTTON
// =============================================
export default function CompareFloatingButton() {
  const { compareCount, setIsCompareOpen } = useContext(CompareContext);
  
  if (compareCount === 0) return null;
  
  return (
    <button className="compare-floating-btn" onClick={() => setIsCompareOpen(true)}>
      <span className="compare-icon">📊</span>
      <span className="compare-count">{compareCount}</span>
      <span className="compare-text">เปรียบเทียบ</span>
    </button>
  );
}
