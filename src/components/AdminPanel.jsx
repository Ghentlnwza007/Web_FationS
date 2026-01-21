
import React, { useState, useEffect } from 'react';
import { db, firebase } from '../firebase';
import AdminAddProduct from './AdminAddProduct';
import './AdminPanel.css';

// =============================================
// ADMIN DASHBOARD - ENHANCED VERSION
// =============================================
export default function AdminPanel({ onBack }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  });

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, []);

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
      const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    } catch (err) {
      console.error("Error loading products:", err);
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

  const deleteProduct = async (productId) => {
    if (window.confirm('ต้องการลบสินค้านี้?')) {
      try {
        await db.collection('products').doc(productId).delete();
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
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

  // Menu items
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
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
                if (item.id === 'products') loadProducts();
                if (item.id === 'orders') loadOrders();
                if (item.id === 'dashboard') loadDashboardData();
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
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

        {/* Products View */}
        {activeMenu === 'products' && (
          <div className="products-view">
            <div className="page-header">
              <h1 className="page-title">📦 Product Management</h1>
              <button className="btn-primary" onClick={() => setActiveMenu('add-product')}>
                ➕ Add New Product
              </button>
            </div>

            {loading ? (
              <div className="admin-loading">กำลังโหลด...</div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📦</span>
                <h3>ยังไม่มีสินค้า</h3>
                <p>เริ่มต้นด้วยการเพิ่มสินค้าใหม่</p>
                <button className="btn-primary" onClick={() => setActiveMenu('add-product')}>
                  ➕ Add Product
                </button>
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
                      <button className="btn-edit" title="Edit">✏️</button>
                      <button className="btn-delete" onClick={() => deleteProduct(product.id)} title="Delete">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Product View */}
        {activeMenu === 'add-product' && (
          <div className="add-product-view">
            <AdminAddProduct 
              onBack={() => setActiveMenu('products')} 
              onSuccess={() => {
                setActiveMenu('products');
                loadProducts();
              }} 
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
    </div>
  );
}
