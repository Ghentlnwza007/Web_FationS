
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/Contexts';
import { db } from '../firebase';
import OrderHistory from './OrderHistory';
import EditProfileForm from './EditProfileForm';
import AdminPanel from './AdminPanel';

// =============================================
// AUTH MODAL COMPONENT
// =============================================
export default function AuthModal() {
  const {
    user,
    isLoggedIn,
    register,
    login,
    loginWithGoogle,
    logout,
    isAuthModalOpen,
    authMode,
    setAuthMode,
    authError,
    setAuthError,
    closeAuthModal,
  } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    other: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
    const [registerErrors, setRegisterErrors] = useState({});
  const [activeTab, setActiveTab] = useState('info');

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setAuthError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setRegisterErrors({ ...registerErrors, [e.target.name]: '' });
    setAuthError('');
  };

  const validateRegister = () => {
    const errors = {};
    if (!registerData.firstName.trim()) errors.firstName = 'First name is required';
    if (!registerData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!registerData.phone.trim()) errors.phone = 'Phone is required';
    if (!registerData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) errors.email = 'Invalid email format';
    if (!registerData.address.trim()) errors.address = 'Address is required';
    if (!registerData.username.trim()) errors.username = 'Username is required';
    else if (registerData.username.length < 4) errors.username = 'Username must be at least 4 characters';
    if (!registerData.password) errors.password = 'Password is required';
    else if (registerData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setAuthError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    await login(loginData.email, loginData.password);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (validateRegister()) {
      await register(registerData);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('auth-overlay')) {
      closeAuthModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isAuthModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="auth-overlay" onClick={handleOverlayClick}>
      <div className={`auth-modal ${authMode === 'profile' ? 'fullscreen' : ''}`}>
        <button className="modal-close" onClick={closeAuthModal}>×</button>
        
        {/* Menu View */}
        {authMode === 'menu' && (
          <div className="auth-menu">
            <div className="auth-icon">👤</div>
            <h2 className="auth-title">Welcome to MAISON</h2>
            {isLoggedIn ? (
              <>
                <div className="auth-user-info">
                  <p className="user-greeting">Hello, <strong>{user.firstName}!</strong></p>
                  <p className="user-email">{user.email}</p>
                </div>
                <button className="auth-btn profile-btn" onClick={() => setAuthMode('profile')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  View Profile
                </button>
                <button className="auth-btn logout-btn" onClick={logout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <p className="auth-subtitle">Sign in to add items to cart and wishlist</p>
                <button className="auth-btn signin-btn" onClick={() => setAuthMode('login')}>
                  Sign In
                </button>
                <button className="auth-btn register-btn" onClick={() => setAuthMode('register')}>
                  Create Account
                </button>
              </>
            )}
          </div>
        )}

        {/* Profile View - Fullscreen Dashboard */}
        {authMode === 'profile' && isLoggedIn && (
          <>
            <div className="fullscreen-sidebar">
              <div className="sidebar-profile">
                <div className="sidebar-avatar">
                  {user.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h3 className="sidebar-name">{user.firstName} {user.lastName}</h3>
                <p className="sidebar-email">{user.email}</p>
              </div>
              
              <div className="sidebar-menu">
                <div 
                  className={`sidebar-item ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  <span>👤</span> Profile Info
                </div>
                <div 
                  className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <span>📦</span> Order History
                </div>
              </div>

               <button className="auth-btn logout-btn" onClick={logout} style={{marginTop: 'auto', borderRadius: 8}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
               </button>
            </div>

            <div className="fullscreen-content">
              <button className="modal-close" onClick={() => setAuthMode('menu')} style={{position:'absolute', top:20, right:20, zIndex:100}}>×</button>

              {activeTab === 'info' && (
                <div className="dashboard-section">
                  <h2 className="dashboard-title">My Profile</h2>
                  <div className="profile-details">
                    <div className="profile-item">
                      <span className="profile-label">Full Name</span>
                      <span className="profile-value">{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="profile-item">
                      <span className="profile-label">Email</span>
                      <span className="profile-value">{user.email}</span>
                    </div>
                    <div className="profile-item">
                      <span className="profile-label">Phone</span>
                      <span className="profile-value">{user.phone || '-'}</span>
                    </div>
                    <div className="profile-item">
                      <span className="profile-label">Address</span>
                      <span className="profile-value">{user.address || '-'}</span>
                    </div>

                    {user.username && (
                      <div className="profile-item">
                        <span className="profile-label">Username</span>
                        <span className="profile-value">{user.username}</span>
                      </div>
                    )}
                    
                    <button 
                      className="auth-btn edit-profile-btn" 
                      onClick={() => setAuthMode('editProfile')}
                      style={{maxWidth: 300, marginTop: 40}}
                    >
                      Edit Information
                    </button>
                    
                     <div className="profile-actions" style={{margin: '20px 0', borderTop:'none'}}>
                        <button className="auth-btn admin-btn" onClick={() => setAuthMode('admin')} style={{maxWidth: 200, fontSize: 13}}>
                          Admin Panel
                        </button>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="dashboard-section">
                  <h2 className="dashboard-title">Order History</h2>
                  {/* Reuse OrderHistory component */}
                  <div style={{marginTop: 20}}>
                     <OrderHistory userId={user.id} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

      {/* Edit Profile View */}
        {authMode === 'editProfile' && isLoggedIn && (
          <EditProfileForm user={user} onBack={() => setAuthMode('profile')} onSave={async (updatedData) => {
            try {
              await db.collection('users').doc(user.id).update(updatedData);
              // Refresh user data
              const userDoc = await db.collection('users').doc(user.id).get();
              if (userDoc.exists) {
                // Update will be reflected through auth state listener
              }
              setAuthMode('profile');
            } catch (error) {
              console.error("Error updating profile:", error);
            }
          }} />
        )}

        {/* Admin View */}
        {authMode === 'admin' && isLoggedIn && (
          <AdminPanel onBack={() => setAuthMode('profile')} />
        )}

        {/* Login View */}
        {authMode === 'login' && (
          <div className="auth-login">
            <button className="auth-back" onClick={() => setAuthMode('menu')}>← Back</button>
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">กรอกอีเมลและรหัสผ่านของคุณ</p>
            
            {authError && <div className="auth-error">{authError}</div>}
            
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="auth-submit-btn">
                Sign In
              </button>
            </form>
            
            <div className="auth-divider">
              <span>หรือ</span>
            </div>
            
            <button className="google-signin-btn" onClick={handleGoogleLogin}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            
            <p className="auth-switch">
              Don't have an account?{' '}
              <button className="auth-link" onClick={() => setAuthMode('register')}>
                Create Account
              </button>
            </p>
          </div>
        )}

        {/* Register View */}
        {authMode === 'register' && (
          <div className="auth-register">
            <button className="auth-back" onClick={() => setAuthMode('menu')}>← Back</button>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Fill in your details</p>
            
            {authError && <div className="auth-error">{authError}</div>}
            
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    placeholder="First name"
                    className={registerErrors.firstName ? 'error' : ''}
                  />
                  {registerErrors.firstName && <span className="field-error">{registerErrors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    placeholder="Last name"
                    className={registerErrors.lastName ? 'error' : ''}
                  />
                  {registerErrors.lastName && <span className="field-error">{registerErrors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    placeholder="Phone"
                    className={registerErrors.phone ? 'error' : ''}
                  />
                  {registerErrors.phone && <span className="field-error">{registerErrors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Email"
                    className={registerErrors.email ? 'error' : ''}
                  />
                  {registerErrors.email && <span className="field-error">{registerErrors.email}</span>}
                </div>
              </div>

              <div className="form-group full">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={registerData.address}
                  onChange={handleRegisterChange}
                  placeholder="Address"
                  className={registerErrors.address ? 'error' : ''}
                />
                {registerErrors.address && <span className="field-error">{registerErrors.address}</span>}
              </div>

               <div className="form-group full">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  placeholder="Username (at least 4 chars)"
                  className={registerErrors.username ? 'error' : ''}
                />
                {registerErrors.username && <span className="field-error">{registerErrors.username}</span>}
              </div>

              <div className="form-group full">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Password (at least 6 chars)"
                  className={registerErrors.password ? 'error' : ''}
                />
                {registerErrors.password && <span className="field-error">{registerErrors.password}</span>}
              </div>

              <div className="form-group full">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Confirm Password"
                  className={registerErrors.confirmPassword ? 'error' : ''}
                />
                {registerErrors.confirmPassword && <span className="field-error">{registerErrors.confirmPassword}</span>}
              </div>

              <button type="submit" className="auth-submit-btn">
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
