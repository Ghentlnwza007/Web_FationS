import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ClientServices.css';
import { CurrencyContext } from '../../../context/Contexts';

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" style={{ display: 'flex', opacity: 1, visibility: 'visible' }}>
      <div className="success-modal-content">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="success-title">{title}</h3>
        <p className="success-message">{message}</p>
        <button className="success-btn" onClick={onClose} data-testid="success-modal-close">
          {/* Note: This button text might need to be passed as prop for translation if needed */}
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

const ClientServices = () => {
  const { language } = React.useContext(CurrencyContext);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Page Translations
  const t = {
    en: {
      title: "Client Services",
      subtitle: "Dedicated Assistance & Personalized Care",
      appointment: {
        title: "Private Appointments",
        desc: "Experience MAISON your way. Book a dedicated time with our style experts.",
        serviceType: "Service Type",
        serviceOptions: {
          virtual: "Virtual Styling Consultation",
          instore: "In-Store Private Shopping",
          fitting: "Personal Fitting Session"
        },
        date: "Preferred Date",
        time: "Available Times",
        name: "Name",
        email: "Email",
        phone: "Phone Number",
        submit: "Request Appointment",
        successTitle: "Appointment Confirmed",
        successMsg: (type, date, time, email) => `We have received your request for a ${type} on ${date} at ${time}. A confirmation email has been sent to ${email}.`
      },
      contact: {
        title: "Maison Concierge",
        desc: <>Our team is available Monday to Friday, 9am - 6pm EST.<br/>For immediate assistance, call <b style={{color: '#1a1a1a'}}>+1 (800) 555-0199</b>.</>,
        name: "Name",
        email: "Email",
        subject: "Subject",
        subjectOptions: {
          default: "Select a Topic",
          order: "Order Inquiry",
          product: "Product Information",
          press: "Press & Partnerships",
          other: "Other"
        },
        message: "Message",
        submit: "Send Message",
        successTitle: "Message Sent",
        successMsg: (subject, email) => `Thank you for contacting Maison Concierge. We have received your message regarding ${subject} and will respond to ${email} within 24 hours.`
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How do I schedule a private styling session?", a: "You can book a private styling appointment using the form above. We offer both virtual consultations and in-store experiences at our flagship boutiques." },
          { q: "What is your return policy?", a: "We offer complimentary returns within 30 days of purchase. Items must be unworn, with original tags and packaging intact." },
          { q: "Do you offer international shipping?", a: "Yes, MAISON ships to over 50 countries worldwide. Express delivery ensures your items arrive within 3-5 business days." },
          { q: "Can I alter my order after it has been placed?", a: "Please contact our Concierge immediately. If your order has not yet been processed, we will do our best to accommodate your request." }
        ]
      },
      locations: {
        address: "Address",
        phone: "Phone",
        email: "Email"
      },
      modal: {
        close: "Continue Shopping"
      }
    },
    th: {
      title: "บริการลูกค้า",
      subtitle: "ผู้ช่วยส่วนตัวและการดูแลที่ใส่ใจ",
      appointment: {
        title: "นัดหมายส่วนตัว",
        desc: "สัมผัสประสบการณ์ MAISON ในแบบของคุณ จองเวลากับผู้เชี่ยวชาญด้านสไตล์ของเรา",
        serviceType: "ประเภทบริการ",
        serviceOptions: {
          virtual: "ปรึกษาด้านสไตล์ออนไลน์ (Virtual)",
          instore: "บริการช้อปปิ้งส่วนตัวที่สาขา",
          fitting: "บริการลองชุดส่วนตัว"
        },
        date: "วันที่สะดวก",
        time: "เลือกเวลา",
        name: "ชื่อ",
        email: "อีเมล",
        phone: "เบอร์โทรศัพท์",
        submit: "ขอนัดหมาย",
        successTitle: "ยืนยันการนัดหมาย",
        successMsg: (type, date, time, email) => `เราได้รับคำขอนัดหมายของคุณสำหรับ ${type} ในวันที่ ${date} เวลา ${time} แล้ว อีเมลยืนยันได้ถูกส่งไปยัง ${email} เรียบร้อยแล้ว`
      },
      contact: {
        title: "เมซง คอนเซียจ",
        desc: <>ทีมงานของเราพร้อมให้บริการ วันจันทร์ - ศุกร์, 9:00 - 18:00 น.<br/>หากต้องการความช่วยเหลือเร่งด่วน โทร <b style={{color: '#1a1a1a'}}>02-123-4567</b></>,
        name: "ชื่อ",
        email: "อีเมล",
        subject: "หัวข้อ",
        subjectOptions: {
          default: "เลือกหัวข้อ",
          order: "สอบถามเรื่องคำสั่งซื้อ",
          product: "ข้อมูลสินค้า",
          press: "สื่อและพันธมิตร",
          other: "อื่นๆ"
        },
        message: "ข้อความ",
        submit: "ส่งข้อความ",
        successTitle: "ส่งข้อความสำเร็จ",
        successMsg: (subject, email) => `ขอบคุณที่ติดต่อ Maison Concierge เราได้รับข้อความของคุณเกี่ยวกับ ${subject} แล้ว และจะติดต่อกลับไปที่ ${email} ภายใน 24 ชั่วโมง`
      },
      faq: {
        title: "คำถามที่พบบ่อย",
        items: [
          { q: "ฉันจะจองคิวบริการออกแบบสไตล์ส่วนตัวได้อย่างไร?", a: "คุณสามารถจองคิวบริการส่วนตัวได้โดยใช้แบบฟอร์มด้านบน เรามีบริการทั้งแบบปรึกษาออนไลน์และแบบนัดหมายที่บูติคสาขาหลักของเรา" },
          { q: "นโยบายการคืนสินค้าเป็นอย่างไร?", a: "เราให้บริการคืนสินค้าฟรีภายใน 30 วันนับจากวันที่สั่งซื้อ สินค้าจะต้องอยู่ในสภาพสมบูรณ์ ไม่ผ่านการใช้งาน และป้ายสินค้ายังอยู่ครบถ้วน" },
          { q: "มีบริการจัดส่งสินค้าไปต่างประเทศหรือไม่?", a: "ใช่ MAISON จัดส่งสินค้าไปกว่า 50 ประเทศทั่วโลก บริการจัดส่งด่วนจะทำให้คุณได้รับสินค้าภายใน 3-5 วันทำการ" },
          { q: "ฉันสามารถแก้ไขคำสั่งซื้อหลังจากสั่งไปแล้วได้หรือไม่?", a: "โปรดติดต่อทีมงาน Concierge ของเราทันที หากคำสั่งซื้อยังไม่ถูกดำเนินการ เราจะพยายามอย่างเต็มที่เพื่อช่วยเหลือคุณ" }
        ]
      },
      locations: {
        address: "ที่อยู่",
        phone: "โทรศัพท์",
        email: "อีเมล"
      },
      modal: {
        close: "ซื้อสินค้าต่อ"
      }
    }
  };

  const text = t[language] || t.en;

  // Appointment Form State
  const [appointment, setAppointment] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    type: 'virtual' // virtual or instore
  });

  // Contact Form State
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment submitting...", appointment);
    // DEBUG ALERT REMOVED
    setModalState({
      isOpen: true,
      title: text.appointment.successTitle,
      message: text.appointment.successMsg(appointment.type, appointment.date, selectedSlot, appointment.email)
    });
    // Reset form or other logic
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setModalState({
      isOpen: true,
      title: text.contact.successTitle,
      message: text.contact.successMsg(contact.subject, contact.email)
    });
    setContact({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="client-services-container">
      <header className="services-header">
        <h1 className="services-title">{text.title}</h1>
        <p className="services-subtitle">{text.subtitle}</p>
      </header>

      <div className="services-content">
        <div className="services-grid">
          {/* Appointment Section */}
          <section className="service-section">
            <h2 className="section-title">{text.appointment.title}</h2>
            <p style={{marginBottom: '30px', color: '#666', lineHeight: '1.6'}}>
              {text.appointment.desc}
            </p>
            <form onSubmit={handleAppointmentSubmit}>
              <div className="form-group">
                <label className="form-label">{text.appointment.serviceType}</label>
                <select 
                  className="form-select"
                  value={appointment.type}
                  onChange={(e) => setAppointment({...appointment, type: e.target.value})}
                >
                  <option value="virtual">{text.appointment.serviceOptions.virtual}</option>
                  <option value="instore">{text.appointment.serviceOptions.instore}</option>
                  <option value="fitting">{text.appointment.serviceOptions.fitting}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">{text.appointment.date}</label>
                <input 
                  type="date" 
                  className="form-input" 
                  required
                  onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{text.appointment.time}</label>
                <div className="appointment-slots">
                  {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map(time => (
                    <div 
                      key={time}
                      className={`time-slot ${selectedSlot === time ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{text.appointment.name}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  onChange={(e) => setAppointment({...appointment, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{text.appointment.email}</label>
                <input 
                  type="email" 
                  className="form-input" 
                  required 
                  onChange={(e) => setAppointment({...appointment, email: e.target.value})}
                />
              </div>

               <div className="form-group">
                <label className="form-label">{text.appointment.phone}</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  required 
                  onChange={(e) => setAppointment({...appointment, phone: e.target.value})}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={!selectedSlot}>
                {text.appointment.submit}
              </button>
            </form>
          </section>

          {/* Contact Form Section */}
          <section className="service-section">
            <h2 className="section-title">{text.contact.title}</h2>
            <p style={{marginBottom: '30px', color: '#666', lineHeight: '1.6'}}>
              {text.contact.desc}
            </p>
            <form onSubmit={handleContactSubmit}>
               <div className="form-group">
                <label className="form-label">{text.contact.name}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  value={contact.name}
                  onChange={(e) => setContact({...contact, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{text.contact.email}</label>
                <input 
                  type="email" 
                  className="form-input" 
                  required
                  value={contact.email}
                  onChange={(e) => setContact({...contact, email: e.target.value})}
                />
              </div>

               <div className="form-group">
                <label className="form-label">{text.contact.subject}</label>
                <select 
                  className="form-select"
                  value={contact.subject}
                  onChange={(e) => setContact({...contact, subject: e.target.value})}
                >
                  <option value="">{text.contact.subjectOptions.default}</option>
                  <option value="order">{text.contact.subjectOptions.order}</option>
                  <option value="product">{text.contact.subjectOptions.product}</option>
                  <option value="press">{text.contact.subjectOptions.press}</option>
                  <option value="other">{text.contact.subjectOptions.other}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{text.contact.message}</label>
                <textarea 
                  className="form-textarea" 
                  required
                  value={contact.message}
                  onChange={(e) => setContact({...contact, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                {text.contact.submit}
              </button>
            </form>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="faq-container">
          <header className="faq-header">
             <h2 className="section-title" style={{border: 'none', display: 'inline-block'}}>{text.faq.title}</h2>
          </header>
          
          {text.faq.items.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={activeFaq === index}
              >
                {item.q}
                <span className={`faq-icon ${activeFaq === index ? 'active' : ''}`}>
                  +
                </span>
              </button>
              <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Locations */}
      <section className="locations-section">
        <div className="locations-grid">
            <div className="location-item">
                <div className="location-city">{text.locations.address}</div>
                <div className="location-address">
                    99/1 ถนนสุรนารี ซ.ตรอกโรงไฟฟ้า<br/>
                    เขตในเมือง นครราชสีมา 30000<br/>
                    Thailand
                </div>
            </div>
             <div className="location-item">
                <div className="location-city">{text.locations.phone}</div>
                <div className="location-address">
                    02-123-4567<br/>
                    093-479-9071
                </div>
            </div>
             <div className="location-item">
                <div className="location-city">{text.locations.email}</div>
                <div className="location-address">
                    fation@maison.co.th<br/>
                    contact@maison.co.th
                </div>
            </div>
        </div>
      </section>


      <SuccessModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
      />
    </div>
  );
};

export default ClientServices;
