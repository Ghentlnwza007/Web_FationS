
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

// =============================================
// ORDER HISTORY COMPONENT
// =============================================
export default function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const unsubscribe = db.collection('orders')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const ordersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(ordersData);
          setLoading(false);
        }, (error) => {
          console.error("Error loading orders:", error);
          setLoading(false);
        });
      
      return () => unsubscribe();
    }
  }, [userId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(price);
  };

  if (loading) {
    return <div className="orders-loading">กำลังโหลด...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="orders-empty-icon">📦</div>
        <p>ยังไม่มีประวัติการสั่งซื้อ</p>
      </div>
    );
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div className="order-id">#{order.id.slice(-8).toUpperCase()}</div>
            <div className={`order-status status-${order.status || 'pending'}`}>
              {order.status === 'completed' ? 'สำเร็จ' : 
               order.status === 'shipped' ? 'กำลังจัดส่ง' : 'รอดำเนินการ'}
            </div>
          </div>
          <div className="order-date">
            {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'ไม่ระบุวันที่'}
          </div>
          <div className="order-items">
            {order.items?.slice(0, 3).map((item, idx) => (
              <span key={idx} className="order-item-name">{item.name}</span>
            ))}
            {order.items?.length > 3 && <span className="order-more">+{order.items.length - 3} รายการ</span>}
          </div>
          <div className="order-total">
            รวม: <strong>{formatPrice(order.total)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
