
import React, { useState, useEffect } from 'react';
import { db, firebase } from '../../../services/firebase';
import AdminAddProduct from '../products/AdminAddProduct';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import './AdminPanel.css';
import { collections, newArrivalsData, saleProductsData } from '../../../data/products';

// =============================================
// ADMIN DASHBOARD - ENHANCED VERSION
// =============================================
export default function AdminPanel({ onBack }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  });

  // Chat Support State
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const unreadChats = chats.filter(c => c.unreadByAdmin).length;

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Real-time listener for chats
  useEffect(() => {
    const unsubscribe = db.collection('chats')
      .orderBy('lastMessageAt', 'desc')
      .onSnapshot((snapshot) => {
        const chatsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChats(chatsData);
      }, (error) => {
        console.log('Error loading chats:', error);
      });
    
    return () => unsubscribe();
  }, []);

  // Load messages when chat is selected
  useEffect(() => {
    if (!selectedChat) {
      setChatMessages([]);
      return;
    }
    
    const unsubscribe = db.collection('chats')
      .doc(selectedChat.id)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChatMessages(msgs);
      });
    
    // Mark as read when admin opens chat
    db.collection('chats').doc(selectedChat.id).update({
      unreadByAdmin: false
    }).catch(err => console.log('Error marking as read:', err));
    
    return () => unsubscribe();
  }, [selectedChat?.id]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load orders
      const ordersSnap = await db.collection('orders').orderBy('createdAt', 'desc').limit(50).get();
      const ordersData = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);

      // Load products
      const productsSnap = await db.collection('products').get();
      const productsData = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);

      // Load customers count
      const usersSnap = await db.collection('users').get();

      // Calculate stats
      const totalSales = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
      setStats({
        totalSales,
        totalOrders: ordersData.length,
        totalProducts: productsData.length,
        totalCustomers: usersSnap.size
      });
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
    setLoading(false);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      // 1. Gather all static products first
      let allStaticProducts = [];
      
      // From Collections
      Object.entries(collections).forEach(([key, col]) => {
        col.products.forEach(p => {
          allStaticProducts.push({ 
            ...p, 
            collection: key, 
            category: 'collection',
            source: 'static'
          });
        });
      });

      // From New Arrivals
      newArrivalsData.forEach(p => {
        allStaticProducts.push({ 
          ...p, 
          image: p.images?.[0] || p.image,
          category: 'new_arrival',
          source: 'static'
        });
      });

      // From Sale
      saleProductsData.forEach(p => {
        allStaticProducts.push({ 
          ...p, 
          image: p.images?.[0] || p.image,
          category: 'sale',
          source: 'static'
        });
      });

      // 2. Load from Firestore
      const snapshot = await db.collection('products').get();
      const firestoreProducts = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        source: 'firestore'
      }));

      // 3. Merge: Firestore products override static if same ID
      const productMap = new Map();
      
      // Add static products first
      allStaticProducts.forEach(p => {
        productMap.set(String(p.id), p);
      });
      
      // Override with Firestore products
      firestoreProducts.forEach(p => {
        productMap.set(String(p.id), p);
      });

      const mergedProducts = Array.from(productMap.values())
        .filter(p => !p.deleted); // Filter out soft-deleted products
      setProducts(mergedProducts);
    } catch (err) {
      console.error("Error loading products:", err);
      // If Firestore fails, still show static products
      let allStaticProducts = [];
      Object.values(collections).forEach(col => {
        col.products.forEach(p => {
          allStaticProducts.push({ ...p, collection: col.title, source: 'static' });
        });
      });
      newArrivalsData.forEach(p => {
        allStaticProducts.push({ ...p, image: p.images?.[0] || p.image, source: 'static' });
      });
      saleProductsData.forEach(p => {
        allStaticProducts.push({ ...p, image: p.images?.[0] || p.image, source: 'static' });
      });
      setProducts(allStaticProducts);
    }
    setLoading(false);
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
    setLoading(false);
  };

  const syncProducts = async () => {
    if (!window.confirm('ยืนยันการนำเข้าสินค้าจาก Static Data ไปยัง Database? (สินค้าที่มี ID ซ้ำจะถูกข้าม)')) return;
    
    setSyncing(true);
    let addedCount = 0;
    let skippedCount = 0;

    try {
        // 1. Gather all static products
        let allStaticProducts = [];
        
        // From Collections
        Object.entries(collections).forEach(([key, col]) => {
            col.products.forEach(p => {
                allStaticProducts.push({ ...p, collection: key, category: 'collection' });
            });
        });

        // From New Arrivals
        newArrivalsData.forEach(p => {
            allStaticProducts.push({ ...p, category: 'new_arrival' });
        });

        // From Sale
        saleProductsData.forEach(p => {
            allStaticProducts.push({ ...p, category: 'sale' });
        });

        // 2. Upload to Firestore
        const batch = db.batch(); // Use batch for better performance (limit 500 ops)
        let opCount = 0;

        for (const product of allStaticProducts) {
            const productRef = db.collection('products').doc(String(product.id));
            const doc = await productRef.get();

            if (!doc.exists) {
                // Ensure image format is consistent (string)
                let mainImage = product.image;
                if (!mainImage && product.images && product.images.length > 0) {
                    mainImage = product.images[0];
                }

                batch.set(productRef, {
                    ...product,
                    image: mainImage || '',
                    images: product.images || (product.image ? [product.image] : []),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                addedCount++;
                opCount++;
            } else {
                skippedCount++;
            }

            // Commit batch if limit reached (safety margin 400)
            if (opCount >= 400) {
                await batch.commit();
                opCount = 0; // Reset
            }
        }

        if (opCount > 0) {
            await batch.commit();
        }

        alert(`Sync เสร็จสิ้น!\n✅ เพิ่มสินค้าใหม่: ${addedCount} รายการ\n⏭️ ข้ามสินค้าเดิม: ${skippedCount} รายการ`);
        loadProducts(); // Refresh list

    } catch (err) {
        console.error("Sync error:", err);
        alert(`เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
        setSyncing(false);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      // Soft delete: Mark as deleted instead of actual delete
      await db.collection('products').doc(String(productToDelete.id)).set({ 
          deleted: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      setProducts(products.filter(p => p.id !== productToDelete.id));
      loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert('เกิดข้อผิดพลาดในการลบสินค้า: ' + err.message);
    }
    setProductToDelete(null);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await db.collection('orders').doc(orderId).update({ 
        status: newStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price || 0);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'รอชำระ', class: 'status-pending' },
      paid: { label: 'ชำระแล้ว', class: 'status-paid' },
      shipping: { label: 'กำลังจัดส่ง', class: 'status-shipping' },
      delivered: { label: 'ส่งแล้ว', class: 'status-delivered' },
      cancelled: { label: 'ยกเลิก', class: 'status-cancelled' }
    };
    const s = statusMap[status] || { label: status || 'ไม่ระบุ', class: 'status-pending' };
    return <span className={`status-badge ${s.class}`}>{s.label}</span>;
  };

  // Send reply to customer
  const sendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedChat || sendingReply) return;
    
    setSendingReply(true);
    try {
      await db.collection('chats')
        .doc(selectedChat.id)
        .collection('messages')
        .add({
          text: replyText.trim(),
          senderId: 'admin',
          senderName: 'MAISON Support',
          isAdmin: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      
      await db.collection('chats').doc(selectedChat.id).update({
        lastMessage: replyText.trim(),
        lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      setReplyText('');
    } catch (err) {
      console.error('Error sending reply:', err);
    }
    setSendingReply(false);
  };

  // Menu items
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'chat', icon: '💬', label: 'Chat Support', badge: unreadChats },
    { id: 'products', icon: '📦', label: 'Products' },
    { id: 'add-product', icon: '➕', label: 'Add Product' },
    { id: 'orders', icon: '🛒', label: 'Orders' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🔧 Admin</h2>
          <p>MAISON Dashboard</p>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveMenu(item.id);
                setSelectedChat(null);
                if (item.id === 'products') loadProducts();
                if (item.id === 'orders') loadOrders();
                if (item.id === 'dashboard') loadDashboardData();
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {item.badge > 0 && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <button className="sidebar-back" onClick={onBack}>
          ← กลับหน้าหลัก
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* Dashboard View */}
        {activeMenu === 'dashboard' && (
          <div className="dashboard-view">
            <h1 className="page-title">📊 Dashboard Overview</h1>
            
            <div className="stats-grid">
              <div className="stat-card sales">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-value">{formatPrice(stats.totalSales)}</span>
                  <span className="stat-label">Total Sales</span>
                </div>
              </div>
              <div className="stat-card orders">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalOrders}</span>
                  <span className="stat-label">Total Orders</span>
                </div>
              </div>
              <div className="stat-card products">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalProducts}</span>
                  <span className="stat-label">Products</span>
                </div>
              </div>
              <div className="stat-card customers">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalCustomers}</span>
                  <span className="stat-label">Customers</span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="dashboard-section">
              <h2>🕐 Recent Orders</h2>
              {loading ? (
                <div className="admin-loading">กำลังโหลด...</div>
              ) : orders.length === 0 ? (
                <div className="empty-state">ยังไม่มีคำสั่งซื้อ</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id}>
                        <td className="order-id">#{order.id.slice(-6).toUpperCase()}</td>
                        <td>{order.customerName || order.customerEmail || 'ไม่ระบุ'}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td className="order-total">{formatPrice(order.total)}</td>
                        <td>{getStatusBadge(order.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Chat Support View */}
        {activeMenu === 'chat' && (
          <div className="chat-support-view">
            <h1 className="page-title">💬 Chat Support {unreadChats > 0 && <span className="title-badge">{unreadChats} new</span>}</h1>
            
            <div className="chat-container">
              {/* Chat List */}
              <div className="chat-list">
                <h3>Conversations</h3>
                {chats.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">💬</span>
                    <p>ยังไม่มีข้อความ</p>
                  </div>
                ) : (
                  chats.map(chat => (
                    <div 
                      key={chat.id}
                      className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''} ${chat.unreadByAdmin ? 'unread' : ''}`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="chat-item-avatar">
                        {chat.userName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="chat-item-info">
                        <div className="chat-item-name">{chat.userName || 'Guest'}</div>
                        <div className="chat-item-preview">{chat.lastMessage || 'No messages'}</div>
                      </div>
                      {chat.unreadByAdmin && <span className="unread-dot" />}
                    </div>
                  ))
                )}
              </div>

              {/* Chat Detail */}
              <div className="chat-detail">
                {!selectedChat ? (
                  <div className="chat-placeholder">
                    <span>💬</span>
                    <p>เลือก Chat เพื่อดูข้อความ</p>
                  </div>
                ) : (
                  <>
                    <div className="chat-detail-header">
                      <h3>{selectedChat.userName || 'Guest'}</h3>
                      <span className="chat-email">{selectedChat.userEmail}</span>
                    </div>
                    
                    <div className="chat-messages-container">
                      {chatMessages.map(msg => (
                        <div key={msg.id} className={`chat-msg ${msg.isAdmin ? 'admin' : 'user'}`}>
                          <div className="chat-msg-content">{msg.text}</div>
                          <div className="chat-msg-time">
                            {msg.createdAt?.toDate?.()?.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) || ''}
                          </div>
                        </div>
                      ))}
                    </div>

                    <form className="chat-reply-form" onSubmit={sendReply}>
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="พิมพ์ข้อความตอบกลับ..."
                        className="chat-reply-input"
                      />
                      <button type="submit" className="chat-reply-btn" disabled={sendingReply}>
                        {sendingReply ? '...' : 'ส่ง'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products View */}
        {activeMenu === 'products' && (
          <div className="products-view">
            <div className="page-header">
              <h1 className="page-title">📦 Product Management</h1>
              <div style={{display:'flex', gap: 10}}>
                <button 
                    className="btn-secondary" 
                    onClick={syncProducts} 
                    disabled={syncing || loading}
                    style={{backgroundColor: '#4b5563', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', border: 'none'}}
                >
                    {syncing ? 'Syncing...' : '🔄 Sync Static Data'}
                </button>
                <button className="btn-primary" onClick={() => setActiveMenu('add-product')}>
                    ➕ Add New Product
                </button>
              </div>
            </div>

            {loading ? (
              <div className="admin-loading">กำลังโหลด...</div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📦</span>
                <h3>ยังไม่มีสินค้า</h3>
                <p>เริ่มต้นด้วยการเพิ่มสินค้าใหม่ หรือกด Sync เพื่อดึงข้อมูลเดิม</p>
                <div style={{display:'flex', gap: 10, marginTop: 20}}>
                    <button className="btn-secondary" onClick={syncProducts} style={{backgroundColor: '#4b5563', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', border: 'none'}}>
                        🔄 Sync Static Data
                    </button>
                    <button className="btn-primary" onClick={() => setActiveMenu('add-product')}>
                        ➕ Add Product
                    </button>
                </div>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-price">{formatPrice(product.price)}</p>
                      <p className="product-collection">{product.collection}</p>
                    </div>
                    <div className="product-actions">
                      <button className="btn-edit" title="Edit" onClick={() => { setEditingProduct(product); setActiveMenu('add-product'); }}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDeleteClick(product)} title="Delete" data-testid={`delete-btn-${product.id}`}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Product View */}
        {activeMenu === 'add-product' && (
          <div className="add-product-view">
            <AdminAddProduct 
              onBack={() => { setActiveMenu('products'); setEditingProduct(null); }} 
              onSuccess={() => {
                setActiveMenu('products');
                setEditingProduct(null);
                loadProducts();
              }}
              editingProduct={editingProduct}
            />
          </div>
        )}

        {/* Orders View */}
        {activeMenu === 'orders' && (
          <div className="orders-view">
            <h1 className="page-title">🛒 Order Management</h1>

            {loading ? (
              <div className="admin-loading">กำลังโหลด...</div>
            ) : orders.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🛒</span>
                <h3>ยังไม่มีคำสั่งซื้อ</h3>
                <p>เมื่อลูกค้าสั่งซื้อสินค้า คำสั่งซื้อจะแสดงที่นี่</p>
              </div>
            ) : (
              <table className="admin-table orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.id.slice(-6).toUpperCase()}</td>
                      <td>
                        <div className="customer-info">
                          <span className="customer-name">{order.customerName || 'ไม่ระบุ'}</span>
                          <span className="customer-email">{order.customerEmail}</span>
                        </div>
                      </td>
                      <td>{order.items?.length || 0} items</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td className="order-total">{formatPrice(order.total)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <select 
                          className="status-select"
                          value={order.status || 'pending'}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="pending">รอชำระ</option>
                          <option value="paid">ชำระแล้ว</option>
                          <option value="shipping">กำลังจัดส่ง</option>
                          <option value="delivered">ส่งแล้ว</option>
                          <option value="cancelled">ยกเลิก</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Analytics View */}
        {activeMenu === 'analytics' && (
          <div className="analytics-view">
            <h1 className="page-title">📈 Analytics & Reports</h1>
            
            <div className="stats-grid">
              <div className="stat-card sales">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-value">{formatPrice(stats.totalSales)}</span>
                  <span className="stat-label">Total Revenue</span>
                </div>
              </div>
              <div className="stat-card orders">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-value">{formatPrice(stats.totalOrders > 0 ? stats.totalSales / stats.totalOrders : 0)}</span>
                  <span className="stat-label">Avg. Order Value</span>
                </div>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="dashboard-section">
              <h2>📊 Order Status Distribution</h2>
              <div className="chart-container">
                {['pending', 'paid', 'shipping', 'delivered', 'cancelled'].map(status => {
                  const count = orders.filter(o => o.status === status).length;
                  const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0;
                  return (
                    <div key={status} className="chart-bar-row">
                      <span className="chart-label">{getStatusBadge(status)}</span>
                      <div className="chart-bar-container">
                        <div 
                          className={`chart-bar ${status}`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="chart-value">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Products */}
            <div className="dashboard-section">
              <h2>🔥 Products in Stock</h2>
              <div className="top-products-list">
                {products.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="top-product-item">
                    <span className="rank">#{index + 1}</span>
                    <img src={product.image} alt={product.name} />
                    <div className="product-details">
                      <span className="name">{product.name}</span>
                      <span className="price">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <DeleteConfirmationModal 
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={confirmDelete}
        productName={productToDelete?.name}
      />
    </div>
  );
}
