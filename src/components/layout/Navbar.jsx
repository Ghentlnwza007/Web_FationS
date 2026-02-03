
// -------------------
// IMPORTS (การนำเข้าส่วนประกอบ)
// -------------------
import React, { useState, useEffect, useContext } from 'react';
// Import Contexts: นำเข้าข้อมูลส่วนกลางของแอพ เพื่อให้ Navbar เข้าถึงข้อมูลเช่น ตะกร้าสินค้า, ธีม, สถานะล็อกอิน
import { CartContext, ThemeContext, WishlistContext, AuthContext, CurrencyContext, OrderContext } from '../../context/Contexts';
// Import Icons: นำเข้าไอคอน SVG เพื่อใช้แสดงผลปุ่มต่างๆ
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
} from '../common/Icons';

// -------------------
// COMPONENT DEFINITION (ส่วนหลักของคอมโพเนนต์)
// -------------------
/**
 * Navbar Component: เป็นแถบเมนูหลักด้านบนของเว็บไซต์
 * รับ props:
 * - currentPage: หน้าปัจจุบันที่กำลังแสดง
 * - onNavigate: ฟังก์ชันสำหรับเปลี่ยนหน้า
 * - onNavigateCategory: ฟังก์ชันสำหรับเลือกหมวดหมู่สินค้า
 * - onShowSearch: ฟังก์ชันเปิด Modal ค้นหา
 * - onShowRegistration: ฟังก์ชันเปิด Modal สมัครสมาชิก
 */
export default function Navbar({ currentPage, onNavigate, onNavigateCategory, onShowSearch, onShowRegistration }) {
  
  // -------------------
  // LOCAL STATE (สถานะภายใน Component)
  // -------------------
  // scrolled: เก็บค่า boolean ว่าหน้าจอมีการเลื่อนลงมาหรือไม่ (ใช้เปลี่ยนสี Navbar)
  const [scrolled, setScrolled] = useState(false);
  // menuOpen: เก็บสถานะการเปิด/ปิดเมนูในโหมดมือถือ (True = เปิด, False = ปิด)
  const [menuOpen, setMenuOpen] = useState(false);

  // -------------------
  // GLOBAL STATE (ดึงข้อมูลจาก Context)
  // -------------------
  // ดึงข้อมูลตะกร้าสินค้า (จำนวนสินค้า, ฟังก์ชันเปิดตะกร้า)
  const { cartCount, setIsCartOpen } = useContext(CartContext);
  // ดึงข้อมูลธีม (โหมดมืด/สว่าง)
  const { toggleTheme, isDark } = useContext(ThemeContext);
  // ดึงข้อมูล Wishlist (จำนวนสินค้าที่ถูกใจ)
  const { wishlistCount, setIsWishlistOpen } = useContext(WishlistContext);
  // ดึงข้อมูลผู้ใช้ (สถานะล็อกอิน, ข้อมูล user, ฟังก์ชันเปิด Modal ล็อกอิน)
  const { isLoggedIn, isAdmin, openAuthModal, user } = useContext(AuthContext);
  // ดึงจำนวนรายการคำสั่งซื้อ
  const { orderCount } = useContext(OrderContext);
  // ดึงข้อมูลสกุลเงินและการตั้งค่าภาษา (t = translation function)
  const { currency, toggleCurrency, isDropdownOpen, setIsDropdownOpen, t } = useContext(CurrencyContext);

  // -------------------
  // EFFECTS (การทำงานที่เกิดจากการเปลี่ยนแปลง State หรือ Lifecycle)
  // -------------------
  // useEffect นี้ทำงานเมื่อ Component ถูก Mount (โหลดครั้งแรก)
  // หน้าที่: ตรวจจับการ Scroll ของผู้ใช้เพื่อเปลี่ยนสไตล์ของ Navbar
  useEffect(() => {
    const handleScroll = () => {
      // ถ้าเลื่อนหน้าจอลงมากกว่า 50px ให้ setScrolled เป็น true
      setScrolled(window.scrollY > 50);
    };
    
    // เริ่มดักจับเหตุการณ์ scroll
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup Function: ยกเลิกการดักจับเมื่อ Component ถูกทำลาย (Unmount)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] หมายถึงทำแค่ครั้งเดียวตอนโหลด Component

  // -------------------
  // UI RENDERING (ส่วนแสดงผล HTML/JSX)
  // -------------------
  return (
    // เปลี่ยน Class ตามสถานะ scrolled (ถ้าเลื่อนจอจะมีพื้นหลังทึบ)
    <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      
      {/* 1. Main Navigation Row: แถวบนสุด (Logo, Search, User, Cart) */}
      <nav className="main-nav">
        {/* ปุ่มเมนูสำหรับมือถือ (Hamburger Menu) */}
        <div className="main-nav-left">
          <button 
            className="menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)} // สลับสถานะเปิด/ปิดเมนู
            aria-label="เปิดเมนูหลัก"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            ☰ <span>{t('nav.menu')}</span>
          </button>
        </div>
        
        {/* โลโก้เว็บไซต์ - คลิกเพื่อกลับหน้า Home */}
        <div
          className="logo"
          onClick={() => onNavigate("home")}
          style={{ cursor: "pointer" }}
        >
          MAISON
        </div>
        
        {/* ไอคอนทางขวา (Currency, Search, Wishlist, User, Cart) */}
        <div className="main-nav-right">
          
          {/* ส่วนเลือกสกุลเงิน */}
          <div className="currency-selector">
            <button 
              className="nav-icon currency-btn" 
              title="Currency"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // เปิด/ปิด Dropdown
              aria-label={`เปลี่ยนสกุลเงิน ตอนนี้ ${currency}`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <CurrencyIcon />
              {/* แสดงสกุลเงินปัจจุบัน */}
              <span className="currency-text">{currency === 'THB' ? '฿ THB' : '$ USD'} ▾</span>
            </button>
            
            {/* Conditional Rendering: แสดง Dropdown ถ้า isDropdownOpen เป็น true */}
            {isDropdownOpen && (
              <div className="currency-dropdown">
                <button 
                  className={`currency-option ${currency === 'THB' ? 'active' : ''}`}
                  onClick={() => toggleCurrency('THB')} // เลือกเป็น THB
                >
                  <span className="currency-symbol">฿</span>
                  <span className="currency-name">THB - Thai Baht</span>
                </button>
                <button 
                  className={`currency-option ${currency === 'USD' ? 'active' : ''}`}
                  onClick={() => toggleCurrency('USD')} // เลือกเป็น USD
                >
                  <span className="currency-symbol">$</span>
                  <span className="currency-name">USD - US Dollar</span>
                </button>
              </div>
            )}
          </div>

          {/* ปุ่มค้นหา */}
          <button className="nav-icon" title="Search" aria-label="ค้นหาสินค้า" onClick={onShowSearch}>
            <SearchIcon />
          </button>

          {/* ปุ่ม Wishlist (รายการโปรด) */}
          <button
            className="nav-icon wishlist-btn"
            title="Wishlist"
            onClick={() => setIsWishlistOpen(true)} // เปิด Side drawer wishlist
            aria-label="รายการโปรด"
          >
            <WishlistIcon />
            {/* แสดง Badge จำนวนสินค้า ถ้ามีมากกว่า 0 */}
            {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </button>

          {/* ปุ่ม User Account */}
          <button
            className={`nav-icon account-btn ${isLoggedIn ? 'logged-in' : ''}`}
            title={isLoggedIn ? `Hi, ${user.firstName}` : 'Account'}
            onClick={() => openAuthModal('menu')} // เปิด Modal สมัคร/จัดการบัญชี
            aria-label={isLoggedIn ? `เมนูผู้ใช้ ${user.firstName}` : 'เข้าสู่ระบบ'}
          >
            <UserIcon />
            {/* แสดงจุดสีเขียวถ้าล็อกอินแล้ว */}
            {isLoggedIn && <span className="login-indicator"></span>}
            {/* แสดงจำนวนออเดอร์ (ถ้ามี) */}
            {orderCount > 0 && <span className="cart-badge" style={{background: '#ef4444', right: -6, top: -2}}>{orderCount}</span>}
          </button>

          {/* ปุ่มตะกร้าสินค้า */}
          <button
            className="nav-icon cart-btn"
            onClick={() => setIsCartOpen(true)} // เปิด Side drawer Cart
            title="Cart"
            aria-label={`ตะกร้าสินค้า ${cartCount} ชิ้น`}
          >
            <CartIcon />
            {/* แสดงจำนวนสินค้าในตะกร้า */}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* ปุ่มเปลี่ยน Theme (มืด/สว่าง) */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle Theme"
            aria-label={isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
          />
        </div>
      </nav>

      {/* 2. Secondary Navigation Row: เมนูหมวดหมู่ (ซ่อนเมื่อเลื่อนหน้าจอ) */}
      <nav className={`secondary-nav ${scrolled ? "hidden" : ""}`}>
        {/* ลิงก์หมวดหมู่ต่างๆ - ใช้ preventDefault เพื่อจัดการการเปลี่ยนหน้าด้วย JS แทนการโหลดใหม่ */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("women");
          }}
        >
          {t('nav.women')}
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("men");
          }}
        >
          {t('nav.men')}
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("unisex");
          }}
        >
          {t('collection.unisex')}
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage !== 'home') {
              onNavigate("home", { skipScroll: true });
            }
            setTimeout(() => {
              const element = document.getElementById("final-sale");
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          className="sale-link"
        >
          ◆ {t('nav.sale')}
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("sports");
          }}
          className="sports-link"
        >
          ⚡ {t('collection.sports')}
        </a>
        
        {/* Smooth Scroll ไปที่ section About */}
        <a href="#about" onClick={(e) => { 
            e.preventDefault(); 
            onNavigate("home"); 
            setTimeout(() => document.getElementById("about").scrollIntoView(), 100); 
          }}>
          {t('nav.about')}
        </a>
        
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('contact');
          }}
        >
          {t('nav.contact')}
        </a>

        {/* แสดงลิงก์ Admin เฉพาะเมื่อล็อกอินเป็น Admin */}
        {isAdmin && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("admin");
            }}
            className="admin-link"
          >
            🔧 {t('nav.admin')}
          </a>
        )}
      </nav>

      {/* 3. Mobile Menu Overlay: เมนูสำหรับมือถือ */}
      {/* Conditional Rendering: แสดงเฉพาะเมื่อ menuOpen = true */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} role="dialog" aria-modal="true" aria-label="เมนูหลัก">
          <div className="mobile-menu" id="mobile-menu" onClick={(e) => e.stopPropagation()} role="navigation">
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="ปิดเมนู">×</button>
            
            {/* รายการเมนูในมือถือ */}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); setMenuOpen(false); }}>
              <HomeIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              {t('nav.home')}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("women"); setMenuOpen(false); }}>
              <WomenIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              {t('nav.women')}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("men"); setMenuOpen(false); }}>
              <MenIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              {t('nav.men')}
            </a>
            {/* ... Other mobile links ... */}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("all"); setMenuOpen(false); }}>
              <BrandsIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              {t('nav.brands')}
            </a>
            <a href="#" onClick={(e) => { 
              e.preventDefault(); 
              if (currentPage !== 'home') {
                onNavigate("home", { skipScroll: true }); 
              }
              setMenuOpen(false);
              setTimeout(() => {
                const element = document.getElementById("final-sale");
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}>
              <SaleIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              {t('nav.sale')}
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("home"); setTimeout(() => document.getElementById("about").scrollIntoView(), 100); setMenuOpen(false); }}>
              <InfoIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              {t('nav.about')}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("contact"); setMenuOpen(false); }}>
              <MailIcon style={{marginRight: '12px', verticalAlign: 'middle'}} />
              {t('nav.contact')}
            </a>
            {isAdmin && (
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("admin"); setMenuOpen(false); }} className="admin-link">
                <span style={{marginRight: '12px', verticalAlign: 'middle'}}>🔧</span>
                {t('nav.admin')}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
