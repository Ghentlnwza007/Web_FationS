
import React from 'react';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  LineIcon,
  ClockIcon
} from '../common/Icons';

export default function Footer({ onNavigate, onNavigateCategory, onShowOrderingGuide }) {
  
  const handleShopLink = (e, category) => {
    e.preventDefault();
    if (onNavigateCategory) {
      onNavigateCategory(category);
    }
  };

  const handlePageLink = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleScrollLink = (e, id) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("home");
      // Allow time for home render if not on home
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">MAISON</div>
          <p>
            แบรนด์แฟชั่นพรีเมี่ยมที่มุ่งเน้นการสร้างสรรค์เสื้อผ้าคุณภาพสูง
            ด้วยการออกแบบที่เรียบง่ายแต่หรูหรา
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube" aria-label="YouTube">
              <YouTubeIcon />
            </a>
          </div>
        </div>
        
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="#men" onClick={(e) => handleShopLink(e, 'men')}>Men's Collection</a>
            </li>
            <li>
              <a href="#women" onClick={(e) => handleShopLink(e, 'women')}>Women's Collection</a>
            </li>
            <li>
              <a href="#accessories" onClick={(e) => handleShopLink(e, 'accessories')}>Accessories</a>
            </li>
            <li>
              <a href="#new" onClick={(e) => handleShopLink(e, 'new-arrivals')}>New Arrivals</a>
            </li>
            <li>
              <a href="#sale" onClick={(e) => handlePageLink(e, 'sale')}>Sale</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#contact" onClick={(e) => handlePageLink(e, 'contact')}>Contact Us</a>
            </li>
            <li>
              <a href="#faqs">FAQs</a>
            </li>
            <li>
              <a href="#shipping" onClick={(e) => { e.preventDefault(); onShowOrderingGuide && onShowOrderingGuide(); }}>Shipping Info / วิธีสั่งซื้อ</a>
            </li>
            <li>
              <a href="#returns">Returns</a>
            </li>
            <li>
              <a href="#size-guide">Size Guide</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#about" onClick={(e) => handleScrollLink(e, 'about')}>About Us</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#press">Press</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-column contact-column">
          <h4>ติดต่อเรา</h4>
          <ul className="contact-list">
            <li>
              <span className="contact-icon"><MapPinIcon /></span>
              <div className="contact-info">
                <span className="contact-label">ที่อยู่</span>
                <span>123 ถนนสุขุมวิท แขวงคลองตัน</span>
                <span>เขตคลองเตย กรุงเทพฯ 10110</span>
              </div>
            </li>
            <li>
              <span className="contact-icon"><PhoneIcon /></span>
              <div className="contact-info">
                <span className="contact-label">โทรศัพท์</span>
                <a href="tel:+6621234567">02-123-4567</a>
                <a href="tel:+66812345678">081-234-5678</a>
              </div>
            </li>
            <li>
              <span className="contact-icon"><MailIcon /></span>
              <div className="contact-info">
                <span className="contact-label">อีเมล</span>
                <a href="mailto:contact@maison.co.th">contact@maison.co.th</a>
              </div>
            </li>
            <li>
              <span className="contact-icon"><LineIcon /></span>
              <div className="contact-info">
                <span className="contact-label">Line Official</span>
                <a href="https://line.me/ti/p/@maison" target="_blank" rel="noopener noreferrer">@maison</a>
              </div>
            </li>
            <li>
              <span className="contact-icon"><ClockIcon /></span>
              <div className="contact-info">
                <span className="contact-label">เวลาทำการ</span>
                <span>จันทร์ - ศุกร์: 10:00 - 20:00</span>
                <span>เสาร์ - อาทิตย์: 11:00 - 21:00</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MAISON. All rights reserved.</p>
        <p>Made with ❤️ in Thailand</p>
      </div>
    </footer>
  );
}
