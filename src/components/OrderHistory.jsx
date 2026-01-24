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
  
  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'cancel' or 'receive'
  const [activeOrderId, setActiveOrderId] = useState(null);

  useEffect(() => {
    if (userId) {
      // Real-time listener for Firestore orders
      // Note: We don't use .orderBy() to avoid requiring a composite index
      const unsubscribe = db.collection('orders')
        .where('userId', '==', userId)
        .onSnapshot((snapshot) => {
          const cloudOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            source: 'firebase' // Tag as firebase order
          }));
          
          // Load local orders INSIDE the callback to get fresh data
          const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]')
            .map(o => ({ ...o, source: 'local' })); // Tag as local order
          
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
          const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]')
            .map(o => ({ ...o, source: 'local' }));
          setOrders(localOrders.filter(o => o.userId === userId));
        });
      
      return () => unsubscribe();
    } else {
        // Guest mode: show only local orders
        const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]')
            .map(o => ({ ...o, source: 'local' }));
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
    // Normalize status from Admin Panel
    let currentStatus = orderStatus || 'pending';
    if (currentStatus === 'shipping') currentStatus = 'shipped';
    if (currentStatus === 'paid') currentStatus = 'processing';

    // Simple mapping for demo purposes
    const flow = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = flow.indexOf(currentStatus);
    const stepIndex = flow.indexOf(step);

    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  const handleAction = async (action, orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    if (action === 'Cancel Order') {
      setActiveOrderId(orderId);
      setActiveModal('cancel');
    } else if (action === 'Confirm Received') {
      setActiveOrderId(orderId);
      setActiveModal('receive');
    } else if (action === 'Track Package') {
      alert(`📦 Order #${orderId.slice(-6).toUpperCase()}\n\nสถานะ: ${getStatusInThai(order?.status || 'pending')}\n\nติดตามพัสดุผ่านทาง Kerry Express หรือ Thailand Post`);
    } else {
      setActiveOrderId(orderId);
      setActiveModal('return');
    }
  };

  // Load demo orders from local storage on mount
  // Load demo orders (Legacy support)
  useEffect(() => {
    const savedDemo = localStorage.getItem('demo_orders');
    if (savedDemo) {
        setOrders(prev => {
            const newOrders = JSON.parse(savedDemo).map(o => ({ ...o, source: 'local' }));
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
          source: 'local',
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
      case 'processing': return 'ชำระแล้ว'; // Both map to paid/processing step
      case 'shipping': return 'กำลังจัดส่ง';
      case 'shipped': return 'กำลังจัดส่ง';  // Both map to shipping step
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

  const closeModal = () => {
    setActiveModal(null);
    setActiveOrderId(null);
  };

  const confirmAction = async () => {
    if (!activeOrderId || !activeModal) return;
    
    // Find order
    const order = orders.find(o => o.id === activeOrderId);
    if (!order) return;
    
    const newStatus = activeModal === 'receive' ? 'delivered' : 'cancelled';
    const previousOrders = [...orders];

    // Optimistic Update
    setOrders(orders.map(o => o.id === activeOrderId ? { ...o, status: newStatus } : o));
    closeModal();
    
    try {
      if (order.source === 'local') {
          // Update local orders
          const localOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
          const updatedLocal = localOrders.map(o => 
            o.id === activeOrderId ? { ...o, status: newStatus } : o
          );
          localStorage.setItem('maison_orders', JSON.stringify(updatedLocal));
          
          // Also update demo orders
          const demoOrders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
          const updatedDemo = demoOrders.map(o => 
            o.id === activeOrderId ? { ...o, status: newStatus } : o
          );
          localStorage.setItem('demo_orders', JSON.stringify(updatedDemo));
      } else {
          // Update Firestore
          await db.collection('orders').doc(activeOrderId).update({ status: newStatus });
      }
    } catch (err) {
      console.error('Error updating order:', err);
      // Revert if failed
      setOrders(previousOrders);
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
  };

  // ... (existing code)

  return (
    <div className={styles.container}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.orderId}>
              <span style={{fontWeight: 'bold'}}>คำสั่งซื้อ #{order.id.slice(-8).toUpperCase()}</span>
              <span className={styles.orderDate}>
                {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
                  day: 'numeric', month: 'short', year: 'numeric'
                }) : 'ไม่ระบุวันที่'}
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
               {/* Cancel button - only for pending or processing orders */}
               {(order.status === 'pending' || order.status === 'processing' || order.status === 'paid') && (
                   <button 
                      className={`${styles.actionBtn} ${styles.btnDanger}`}
                      onClick={() => handleAction('Cancel Order', order.id)}
                   >
                      ยกเลิกคำสั่งซื้อ
                   </button>
               )}
               
               {/* Return button - only for delivered orders */}
               {order.status === 'delivered' && (
                   <button 
                      className={`${styles.actionBtn} ${styles.btnOutline}`}
                      onClick={() => handleAction('Return Item', order.id)}
                   >
                      คืนสินค้า / เปลี่ยนสินค้า
                   </button>
               )}
               
               {/* Unified Received Button - Visible for processing/shipped/shipping/paid, Disabled unless shipped/shipping */}
               {(['shipped', 'shipping', 'processing', 'paid'].includes(order.status)) && (
                   <button 
                      className={`${styles.actionBtn} ${['shipped', 'shipping'].includes(order.status) ? styles.btnPrimary : styles.btnOutline}`}
                      onClick={() => ['shipped', 'shipping'].includes(order.status) && handleAction('Confirm Received', order.id)}
                      disabled={!['shipped', 'shipping'].includes(order.status)}
                      style={!['shipped', 'shipping'].includes(order.status) ? { opacity: 0.5, cursor: 'not-allowed', borderColor: '#ccc', color: '#ccc' } : {}}
                   >
                      {['shipped', 'shipping'].includes(order.status) ? '✅ ได้รับสินค้าแล้ว' : '🚚 รอจัดส่ง'}
                   </button>
               )}
            </div>
          </div>
        </div>
      ))}

      {/* GENERIC ACTION MODAL */}
      {activeModal && (
        <div className={styles.modalOverlay} onClick={(e) => {
            if(e.target === e.currentTarget) closeModal();
        }}>
            <div className={styles.modalContent}>
                <div className={
                    activeModal === 'receive' ? styles.receiveIcon : 
                    activeModal === 'return' ? styles.returnIcon : 
                    styles.cancelIcon
                }>
                    {activeModal === 'receive' ? '✓' : activeModal === 'return' ? '↺' : '!'}
                </div>
                <h3 className={styles.cancelTitle}>
                    {activeModal === 'receive' ? 'ยืนยันการรับสินค้า' : 
                     activeModal === 'return' ? 'การคืน/เปลี่ยนสินค้า' :
                     'ยืนยันการยกเลิก'}
                </h3>
                <p className={styles.cancelMessage}>
                    {activeModal === 'receive' 
                        ? 'คุณได้รับสินค้าและตรวจสอบความเรียบร้อยแล้วใช่หรือไม่?' 
                        : activeModal === 'return'
                        ? 'หากต้องการคืนหรือเปลี่ยนสินค้า กรุณาติดต่อฝ่ายบริการลูกค้าผ่านทาง LINE: @MAISON หรือ Facebook Page พร้อมแจ้งหมายเลขคำสั่งซื้อ'
                        : 'คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้'
                    }
                </p>
                <div className={styles.modalActions}>
                    {activeModal !== 'return' && (
                        <button className={`${styles.modalBtn} ${styles.btnSecondary}`} onClick={closeModal}>
                            {activeModal === 'receive' ? 'ยังไม่ได้รับ' : 'ไม่, ฉันเปลี่ยนใจ'}
                        </button>
                    )}
                    <button 
                        className={`${styles.modalBtn} ${
                            activeModal === 'receive' ? styles.btnSuccess : 
                            activeModal === 'return' ? styles.btnInfo :
                            styles.btnConfirm
                        }`} 
                        onClick={activeModal === 'return' ? closeModal : confirmAction}
                        style={activeModal === 'return' ? {width: '100%'} : {}}
                    >
                        {activeModal === 'receive' ? 'ยืนยันการรับสินค้า' : 
                         activeModal === 'return' ? 'เข้าใจแล้ว' :
                         'ยืนยันการยกเลิก'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
