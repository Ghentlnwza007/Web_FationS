
import React, { useState, useEffect, useContext } from 'react';
import { CartContext, ThemeContext, WishlistContext, AuthContext, CurrencyContext, OrderContext } from '../context/Contexts';
import { 
  CurrencyIcon, 
  SearchIcon, 
  WishlistIcon, 
  UserIcon, 
  CartIcon, 
  HomeIcon, 
  WomenIcon, 
  MenIcon, 
  BrandsIcon, 
  SaleIcon, 
  InfoIcon, 
  MailIcon 
} from './Icons';

export default function Navbar({ currentPage, onNavigate, onNavigateCategory, onShowSearch, onShowRegistration }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useContext(CartContext);
  const { toggleTheme, isDark } = useContext(ThemeContext);
  const { wishlistCount, setIsWishlistOpen } = useContext(WishlistContext);
  const { isLoggedIn, isAdmin, openAuthModal, user } = useContext(AuthContext);
  const { orderCount } = useContext(OrderContext);
  const { currency, toggleCurrency, isDropdownOpen, setIsDropdownOpen } = useContext(CurrencyContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      {/* Main Navigation Row */}
      <nav className="main-nav">
        <div className="main-nav-left">
          <button 
            className="menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="เปิดเมนูหลัก"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            ☰ <span>MENU</span>
          </button>
        </div>
        
        <div
          className="logo"
          onClick={() => onNavigate("home")}
          style={{ cursor: "pointer" }}
        >
          MAISON
        </div>
        
        <div className="main-nav-right">
          <div className="currency-selector">
            <button 
              className="nav-icon currency-btn" 
              title="Currency"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label={`เปลี่ยนสกุลเงิน ตอนนี้ ${currency}`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <CurrencyIcon />
              <span className="currency-text">{currency === 'THB' ? '฿ THB' : '$ USD'} ▾</span>
            </button>
            {isDropdownOpen && (
              <div className="currency-dropdown">
                <button 
                  className={`currency-option ${currency === 'THB' ? 'active' : ''}`}
                  onClick={() => toggleCurrency('THB')}
                >
                  <span className="currency-symbol">฿</span>
                  <span className="currency-name">THB - Thai Baht</span>
                </button>
                <button 
                  className={`currency-option ${currency === 'USD' ? 'active' : ''}`}
                  onClick={() => toggleCurrency('USD')}
                >
                  <span className="currency-symbol">$</span>
                  <span className="currency-name">USD - US Dollar</span>
                </button>
              </div>
            )}
          </div>
          <button className="nav-icon" title="Search" aria-label="ค้นหาสินค้า" onClick={onShowSearch}>
            <SearchIcon />
          </button>
          <button
            className="nav-icon wishlist-btn"
            title="Wishlist"
            onClick={() => setIsWishlistOpen(true)}
            aria-label="รายการโปรด"
          >
            <WishlistIcon />
            {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </button>
          <button
            className={`nav-icon account-btn ${isLoggedIn ? 'logged-in' : ''}`}
            title={isLoggedIn ? `Hi, ${user.firstName}` : 'Account'}
            onClick={() => openAuthModal('menu')}
            aria-label={isLoggedIn ? `เมนูผู้ใช้ ${user.firstName}` : 'เข้าสู่ระบบ'}
          >
            <UserIcon />
            {isLoggedIn && <span className="login-indicator"></span>}
            {orderCount > 0 && <span className="cart-badge" style={{background: '#ef4444', right: -6, top: -2}}>{orderCount}</span>}
          </button>
          <button
            className="nav-icon cart-btn"
            onClick={() => setIsCartOpen(true)}
            title="Cart"
            aria-label={`ตะกร้าสินค้า ${cartCount} ชิ้น`}
          >
            <CartIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle Theme"
            aria-label={isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
          />
        </div>
      </nav>

      {/* Secondary Navigation Row - Hides on scroll */}
      <nav className={`secondary-nav ${scrolled ? "hidden" : ""}`}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("women");
          }}
        >
          WOMENS+
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("men");
          }}
        >
          MENS+
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("unisex");
          }}
        >
          UNISEX+
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("sale");
          }}
          className="sale-link"
        >
          ◆ FINAL SALE
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("sports");
          }}
          className="sports-link"
        >
          ⚡ SPORTS
        </a>
        <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("home"); setTimeout(() => document.getElementById("about").scrollIntoView(), 100); }}>ABOUT US</a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('contact');
          }}
        >
          CONTACT US
        </a>
        <a href="#faq" onClick={(e) => { e.preventDefault(); onNavigate("home"); setTimeout(() => document.getElementById("faq").scrollIntoView(), 100); }}>FAQ</a>
        {isAdmin && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("admin");
            }}
            className="admin-link"
          >
            🔧 ADMIN
          </a>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} role="dialog" aria-modal="true" aria-label="เมนูหลัก">
          <div className="mobile-menu" id="mobile-menu" onClick={(e) => e.stopPropagation()} role="navigation">
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="ปิดเมนู">×</button>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); setMenuOpen(false); }}>
              <HomeIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              HOME
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("women"); setMenuOpen(false); }}>
              <WomenIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              WOMENS
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("men"); setMenuOpen(false); }}>
              <MenIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              MENS
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("all"); setMenuOpen(false); }}>
              <BrandsIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              BRANDS
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("sale"); setMenuOpen(false); }}>
              <SaleIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              FINAL SALE
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("home"); setTimeout(() => document.getElementById("about").scrollIntoView(), 100); setMenuOpen(false); }}>
              <InfoIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              ABOUT US
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("contact"); setMenuOpen(false); }}>
              <MailIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              CONTACT US
            </a>
            {isAdmin && (
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("admin"); setMenuOpen(false); }} className="admin-link">
                <span style={{marginRight: '12px', verticalAlign: 'middle'}}>🔧</span>
                ADMIN PANEL
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
