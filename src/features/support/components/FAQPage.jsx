import React, { useState } from 'react';
import { CurrencyContext } from '../../../context/Contexts';
import './ClientServices.css'; // Reusing styles

const FAQPage = () => {
  const { language } = React.useContext(CurrencyContext);
  const [activeFaq, setActiveFaq] = useState(null);

  const t = {
    en: {
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How do I schedule a private styling session?", a: "You can book a private styling appointment using the form above. We offer both virtual consultations and in-store experiences at our flagship boutiques." },
          { q: "What is your return policy?", a: "We offer complimentary returns within 30 days of purchase. Items must be unworn, with original tags and packaging intact." },
          { q: "Do you offer international shipping?", a: "Yes, MAISON ships to over 50 countries worldwide. Express delivery ensures your items arrive within 3-5 business days." },
          { q: "Can I alter my order after it has been placed?", a: "Please contact our Concierge immediately. If your order has not yet been processed, we will do our best to accommodate your request." }
        ]
      }
    },
    th: {
      faq: {
        title: "คำถามที่พบบ่อย",
        items: [
          { q: "ฉันจะจองคิวบริการออกแบบสไตล์ส่วนตัวได้อย่างไร?", a: "คุณสามารถจองคิวบริการส่วนตัวได้โดยใช้แบบฟอร์มด้านบน เรามีบริการทั้งแบบปรึกษาออนไลน์และแบบนัดหมายที่บูติคสาขาหลักของเรา" },
          { q: "นโยบายการคืนสินค้าเป็นอย่างไร?", a: "เราให้บริการคืนสินค้าฟรีภายใน 30 วันนับจากวันที่สั่งซื้อ สินค้าจะต้องอยู่ในสภาพสมบูรณ์ ไม่ผ่านการใช้งาน และป้ายสินค้ายังอยู่ครบถ้วน" },
          { q: "มีบริการจัดส่งสินค้าไปต่างประเทศหรือไม่?", a: "ใช่ MAISON จัดส่งสินค้าไปกว่า 50 ประเทศทั่วโลก บริการจัดส่งด่วนจะทำให้คุณได้รับสินค้าภายใน 3-5 วันทำการ" },
          { q: "ฉันสามารถแก้ไขคำสั่งซื้อหลังจากสั่งไปแล้วได้หรือไม่?", a: "โปรดติดต่อทีมงาน Concierge ของเราทันที หากคำสั่งซื้อยังไม่ถูกดำเนินการ เราจะพยายามอย่างเต็มที่เพื่อช่วยเหลือคุณ" }
        ]
      }
    }
  };

  const text = t[language] || t.en;

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="client-services-container" style={{paddingTop: '120px', minHeight: '60vh'}}>
      <section className="faq-container">
        <header className="faq-header" style={{marginBottom: '60px', textAlign: 'center'}}>
           <h2 className="section-title" style={{border: 'none', display: 'inline-block', fontSize: '2.5rem', letterSpacing: '2px'}}>{text.faq.title.toUpperCase()}</h2>
        </header>
        
        {text.faq.items.map((item, index) => (
          <div key={index} className="faq-item" style={{borderBottom: '1px solid #eee'}}>
            <button 
              className="faq-question"
              onClick={() => toggleFaq(index)}
              aria-expanded={activeFaq === index}
              style={{padding: '24px 0', fontSize: '1.1rem'}}
            >
              {item.q}
              <span className={`faq-icon ${activeFaq === index ? 'active' : ''}`} style={{color: '#c9a55a'}}>
                +
              </span>
            </button>
            <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
              <div className="faq-answer-content" style={{paddingBottom: '24px', color: '#666', lineHeight: '1.8'}}>
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FAQPage;
