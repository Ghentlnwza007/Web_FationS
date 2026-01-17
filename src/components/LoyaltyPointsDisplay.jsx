
import React, { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/Contexts';

// =============================================
// LOYALTY POINTS DISPLAY COMPONENT
// =============================================
export default function LoyaltyPointsDisplay() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      // Get user's points
      const unsubscribe = db.collection('loyaltyPoints')
        .doc(user.id)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setPoints(doc.data().points || 0);
          }
        });
      
      // Get recent transactions
      db.collection('loyaltyTransactions')
        .where('userId', '==', user.id)
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTransactions(data);
        });
      
      return () => unsubscribe();
    }
  }, [isLoggedIn, user]);
  
  if (!isLoggedIn) return null;
  
  return (
    <div className="loyalty-points-card">
      <div className="loyalty-header">
        <span className="loyalty-icon">💎</span>
        <div className="loyalty-info">
          <h3>My Points</h3>
          <span className="points-value">{points}</span>
        </div>
      </div>
      <div className="loyalty-tier">
        <span>Silver Member</span>
        <div className="tier-progress">
          <div className="progress-bar" style={{ width: `${Math.min(100, (points / 1000) * 100)}%` }}></div>
        </div>
        <span className="tier-next">Next Tier: 1,000 pts</span>
      </div>
    </div>
  );
}
