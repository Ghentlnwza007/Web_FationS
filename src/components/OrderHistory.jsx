import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import styles from './OrderHistory.module.css';

// =============================================
// ORDER HISTORY COMPONENT
// =============================================
export default function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (userId) {
      // Real-time listener for Firestore orders
      // Note: We don't use .orderBy() to avoid requiring a composite index
      const unsubscribe = db.collection('orders')
        .where('userId', '==', userId)
        .onSnapshot((snapshot) => {
          const cloudOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // Load local orders INSIDE the callback to get fresh data
          const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
          
          // Merge: Cloud orders take precedence
          const cloudIds = new Set(cloudOrders.map(o => o.id));
          const uniqueLocal = localOrders
            .filter(o => o.userId === userId && !cloudIds.has(o.id));
          
          // Sort by date desc
          const allOrders = [...cloudOrders, ...uniqueLocal].sort((a, b) => {
             const tA = a.createdAt?.seconds || a.createdAt?.getTime?.() / 1000 || 0;
             const tB = b.createdAt?.seconds || b.createdAt?.getTime?.() / 1000 || 0;
             return tB - tA;
          });

          setOrders(allOrders);
          setLoading(false);
        }, (error) => {
          console.error("Error loading orders:", error);
          setLoading(false);
          // Fallback to local only on error
          const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
          setOrders(localOrders.filter(o => o.userId === userId));
        });
      
      return () => unsubscribe();
    } else {
        // Guest mode: show only local orders
        const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
        setOrders(localOrders);
        setLoading(false);
    }
  }, [userId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(price);
  };

  const getStepStatus = (orderStatus, step) => {
    // Simple mapping for demo purposes
    const flow = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = flow.indexOf(orderStatus || 'pending');
    const stepIndex = flow.indexOf(step);

    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  const handleAction = async (action, orderId) => {
    if (action === 'Cancel Order') {
      if (window.confirm('ต้องการยกเลิกคำสั่งซื้อนี้หรือไม่?')) {
        try {
          await db.collection('orders').doc(orderId).update({ status: 'cancelled' });
          setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
        } catch (err) {
          console.error('Error cancelling order:', err);
          alert('ไม่สามารถยกเลิกคำสั่งซื้อได้');
        }
      }
    } else if (action === 'Track Package') {
      // Show tracking modal or info
      const order = orders.find(o => o.id === orderId);
      alert(`📦 Order #${orderId.slice(-6).toUpperCase()}\n\nสถานะ: ${order?.status || 'pending'}\n\nติดตามพัสดุผ่านทาง Kerry Express หรือ Thailand Post`);
    } else {
      alert(`${action} - ระบบกำลังพัฒนา`);
    }
  };

  // Load demo orders from local storage on mount
  // Load demo orders (Legacy support)
  useEffect(() => {
    const savedDemo = localStorage.getItem('demo_orders');
    if (savedDemo) {
        setOrders(prev => {
            const newOrders = JSON.parse(savedDemo);
            const contentIds = new Set(prev.map(o => o.id));
            return [...prev, ...newOrders.filter(o => !contentIds.has(o.id))];
        });
    }
  }, []);

  const handleDemoOrder = () => {
      const newOrder = {
          id: 'DEMO-' + Math.floor(Math.random() * 100000),
          userId: userId || 'demo-user',
          createdAt: { seconds: Date.now() / 1000 },
          status: 'shipped',
          total: 4590,
          items: [
              { name: 'Oversized Silk Shirt', quantity: 1, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=100&q=80', price: 2500 }
          ]
      };
      
      setOrders(prev => [newOrder, ...prev]);
      
      // Persist to local storage
      const existingDemo = JSON.parse(localStorage.getItem('demo_orders') || '[]');
      localStorage.setItem('demo_orders', JSON.stringify([newOrder, ...existingDemo]));
  };

  const getStatusInThai = (status) => {
    switch (status) {
      case 'pending': return 'รอชำระ';
      case 'paid': return 'ชำระแล้ว';
      case 'processing': return 'ชำระแล้ว';
      case 'shipped': return 'กำลังจัดส่ง';
      case 'delivered': return 'ส่งแล้ว';
      case 'cancelled': return 'ยกเลิก';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>⏳</div>
        <h3>กำลังโหลดประวัติคำสั่งซื้อ...</h3>
        <p>กรุณารอสักครู่</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>✨</div>
        <h3>ยังไม่มีประวัติการสั่งซื้อ</h3>
        <p>เมื่อคุณสั่งซื้อสินค้า ประวัติจะแสดงที่นี่</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.orderId}>
              <span style={{fontWeight: 'bold'}}>Order #{order.id.slice(-8).toUpperCase()}</span>
              <span className={styles.orderDate}>
                {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
                  day: 'numeric', month: 'short', year: 'numeric'
                }) : 'Date N/A'}
              </span>
            </div>
            <div className={`${styles.statusBadge} ${styles[`status_${order.status || 'pending'}`]}`}>
              {getStatusInThai(order.status || 'pending')}
            </div>
          </div>

          {/* CONTENT */}
          <div className={styles.content}>
            <div className={styles.itemsList}>
              {order.items?.map((item, idx) => (
                <img 
                   key={idx} 
                   src={item.image} 
                   alt={item.name} 
                   className={styles.itemThumb} 
                   title={`${item.name} x${item.quantity}`}
                />
              ))}
            </div>

            {/* EXPANDABLE TIMELINE (Always visible for now for better UX) */}
            <div className={styles.timeline}>
               {['pending', 'processing', 'shipped', 'delivered'].map((step, idx) => {
                  const status = getStepStatus(order.status, step);
                  const labels = {
                      pending: 'รอชำระ',
                      processing: 'ชำระแล้ว',
                      shipped: 'กำลังจัดส่ง',
                      delivered: 'ส่งแล้ว'
                  };
                  const icons = {
                      pending: '🕒',
                      processing: '💰',
                      shipped: '🚚',
                      delivered: '✅'
                  };

                  return (
                      <div key={step} className={`${styles.timelineStep} ${styles[status]}`}>
                          <div className={styles.stepDot}>
                              {status === 'completed' ? '✓' : icons[step]}
                          </div>
                          <div className={styles.stepLabel}>{labels[step]}</div>
                      </div>
                  );
               })}
            </div>
          </div>

          {/* ACTIONS FOOTER */}
          <div className={styles.footer}>
            <div className={styles.total}>
               ยอดรวม: {formatPrice(order.total)}
            </div>
            <div className={styles.actions}>
               {(order.status === 'pending' || order.status === 'processing') && (
                   <button 
                      className={`${styles.actionBtn} ${styles.btnDanger}`}
                      onClick={() => handleAction('Cancel Order', order.id)}
                   >
                      ยกเลิกคำสั่งซื้อ
                   </button>
               )}
               {order.status === 'delivered' && (
                   <button 
                      className={`${styles.actionBtn} ${styles.btnOutline}`}
                      onClick={() => handleAction('Return Item', order.id)}
                   >
                      คืนสินค้า / เปลี่ยนสินค้า
                   </button>
               )}
               <button 
                  className={`${styles.actionBtn} ${styles.btnPrimary}`}
                  onClick={() => handleAction('Track Package', order.id)}
               >
                  🚚 ติดตามพัสดุ
               </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
