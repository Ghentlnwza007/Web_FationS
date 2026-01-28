
import React, { useState, useEffect } from 'react';

// =============================================
// FLASH SALE TIMER COMPONENT
// =============================================
export default function FlashSaleTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;
      
      if (difference <= 0) {
        setIsExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endTime]);
  
  if (isExpired) {
    return <div className="flash-timer expired">⏰ หมดเวลาโปรโมชั่น</div>;
  }
  
  return (
    <div className="flash-timer">
      <span className="flash-label">🔥 FLASH SALE สิ้นสุดใน</span>
      <div className="timer-blocks">
        <div className="timer-block">
          <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="timer-label">ชม.</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-block">
          <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="timer-label">นาที</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-block">
          <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="timer-label">วินาที</span>
        </div>
      </div>
    </div>
  );
}
