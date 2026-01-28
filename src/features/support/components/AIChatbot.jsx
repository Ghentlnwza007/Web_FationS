
import React, { useState, useContext } from 'react';
import { CartContext } from '../../../context/Contexts';

// =============================================
// AI CHATBOT COMPONENT
// =============================================
export default function AIChatbot() {
  const { isCartOpen } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'สวัสดีครับ! 🤖 ผมเป็น AI ช่วยเหลือของ MAISON\n\nคุณสามารถถามเกี่ยวกับ:\n• การสั่งซื้อและการจัดส่ง\n• ขนาดและการวัดไซส์\n• การคืนสินค้า\n• สินค้าแนะนำ' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef(null);
  
  // FAQ responses
  const faqResponses = {
    'ส่ง': { 
      keywords: ['ส่ง', 'จัดส่ง', 'delivery', 'shipping'],
      response: '📦 การจัดส่ง:\n\n• ส่งฟรีเมื่อซื้อครบ ฿1,500\n• จัดส่งภายใน 2-3 วันทำการ\n• สามารถติดตามพัสดุได้ทาง SMS/Email\n• รองรับ Kerry, Flash, ไปรษณีย์ไทย'
    },
    'ไซส์': {
      keywords: ['ไซส์', 'size', 'ขนาด', 'วัด'],
      response: '📏 การเลือกไซส์:\n\n• S: อก 34-36"\n• M: อก 36-38"\n• L: อก 38-40"\n• XL: อก 40-42"\n\nหากไม่แน่ใจ แนะนำให้เลือกไซส์ใหญ่กว่าปกติ 1 ไซส์'
    },
    'คืน': {
      keywords: ['คืน', 'เปลี่ยน', 'return', 'exchange'],
      response: '🔄 นโยบายการคืนสินค้า:\n\n• คืนได้ภายใน 14 วัน\n• สินค้าต้องอยู่ในสภาพเดิม พร้อมป้ายแท็ก\n• ติดต่อ support@maison.com\n• คืนเงินภายใน 5-7 วันทำการ'
    },
    'แนะนำ': {
      keywords: ['แนะนำ', 'recommend', 'ยอดนิยม', 'best'],
      response: '⭐ สินค้าแนะนำ:\n\n1. Cropped Relaxed Button-Down - ฿1,990\n2. Lanvin Embroidered - ฿17,147\n3. JADED LONDON JEANS - ฿3,490\n\nกดที่ปุ่ม "Shop Now" เพื่อดูสินค้าเพิ่มเติม!'
    },
    'ติดต่อ': {
      keywords: ['ติดต่อ', 'contact', 'โทร', 'email'],
      response: '📞 ติดต่อเรา:\n\n• Email: support@maison.com\n• Line: @maison\n• Tel: 02-xxx-xxxx\n\nเปิดให้บริการ 9:00 - 18:00 น. ทุกวัน'
    },
    'ชำระ': {
      keywords: ['จ่าย', 'ชำระ', 'payment', 'บัตร'],
      response: '💳 ช่องทางชำระเงิน:\n\n• บัตรเครดิต/เดบิต\n• โอนผ่านธนาคาร\n• PromptPay\n• เก็บเงินปลายทาง (COD)\n\nทุกช่องทางปลอดภัย 100%'
    }
  };
  
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);
    scrollToBottom();
    
    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Find matching FAQ response
    let response = '🤔 ขอโทษครับ ผมไม่เข้าใจคำถามนี้\n\nลองถามเกี่ยวกับ:\n• การจัดส่ง\n• ไซส์และขนาด\n• การคืนสินค้า\n• สินค้าแนะนำ\n• วิธีชำระเงิน';
    
    const lowerInput = userMessage.toLowerCase();
    for (const key in faqResponses) {
      if (faqResponses[key].keywords.some(k => lowerInput.includes(k))) {
        response = faqResponses[key].response;
        break;
      }
    }
    
    setMessages(prev => [...prev, { type: 'bot', text: response }]);
    setIsTyping(false);
    scrollToBottom();
  };
  
  if (isCartOpen) return null;

  return (
    <>
      <button 
        className={`ai-chatbot-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        title="AI Assistant"
      >
        🤖
      </button>
      
      {isOpen && (
        <div className="ai-chatbot-panel">
          <div className="ai-chatbot-header">
            <span className="ai-header-title">🤖 MAISON AI Assistant</span>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="ai-chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="ai-message bot typing">
                <span className="typing-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="ai-chatbot-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์คำถามของคุณ..."
            />
            <button type="submit">➤</button>
          </form>
        </div>
      )}
    </>
  );
}
