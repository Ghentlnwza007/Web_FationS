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
    // Load local orders first (immediate feedback)
    const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
    
    // Filter local orders to match current user if logged in, or show all if we want guest persistence
    // For now, let's show all local orders created on this device as a fallback
    
    if (userId) {
      const unsubscribe = db.collection('orders')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const cloudOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // Merge: Cloud orders take precedence, but add any local orders not in cloud yet
          const cloudIds = new Set(cloudOrders.map(o => o.id));
          const uniqueLocal = localOrders.filter(o => !cloudIds.has(o.id));
          
          // Sort by date desc
          const allOrders = [...cloudOrders, ...uniqueLocal].sort((a, b) => {
             const tA = a.createdAt?.seconds || 0;
             const tB = b.createdAt?.seconds || 0;
             return tB - tA;
          });

          setOrders(allOrders);
          setLoading(false);
        }, (error) => {
          console.error("Error loading orders:", error);
          setLoading(false);
          // Fallback to local only on error
          setOrders(localOrders);
        });
      
      return () => unsubscribe();
    } else {
        // Guest mode: show only local orders
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

  const handleAction = (action, orderId) => {
    alert(`${action} functionality coming soon for Order #${orderId.slice(-6)}`);
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

  if (loading) {
    return <div style={{padding:40, textAlign:'center'}}>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📦</div>
        <h3>No orders yet</h3>
        <p>Start shopping to see your orders here.</p>
        <button 
            onClick={handleDemoOrder}
            style={{
                marginTop: 20,
                padding: '10px 20px',
                background: '#f0f0f0',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 13
            }}
        >
            View Demo Order
        </button>
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
                {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric'
                }) : 'Date N/A'}
              </span>
            </div>
            <div className={`${styles.statusBadge} ${styles[`status_${order.status || 'pending'}`]}`}>
              {order.status || 'Pending'}
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
                      pending: 'Placed',
                      processing: 'Processing',
                      shipped: 'Shipped',
                      delivered: 'Delivered'
                  };
                  const icons = {
                      pending: '✓',
                      processing: '⚙️',
                      shipped: '🚚',
                      delivered: '🏡'
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
               Total: {formatPrice(order.total)}
            </div>
            <div className={styles.actions}>
               {(order.status === 'pending' || order.status === 'processing') && (
                   <button 
                      className={`${styles.actionBtn} ${styles.btnDanger}`}
                      onClick={() => handleAction('Cancel Order', order.id)}
                   >
                      Cancel Order
                   </button>
               )}
               {order.status === 'delivered' && (
                   <button 
                      className={`${styles.actionBtn} ${styles.btnOutline}`}
                      onClick={() => handleAction('Return Item', order.id)}
                   >
                      Return / Exchange
                   </button>
               )}
               <button 
                  className={`${styles.actionBtn} ${styles.btnOutline}`}
                  onClick={() => alert(`Tracking details for #${order.id}`)}
               >
                  Track Package
               </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
