import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext, CartContext } from '../context/Contexts';
import { db, firebase } from '../firebase';

// =============================================
// UNIFIED CHAT WIDGET
// Combines Live Support and AI Assistant
// =============================================
export default function UnifiedChatWidget() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const { isCartOpen } = useContext(CartContext);
  
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('menu'); // 'menu', 'live', 'bot'
  const [isMinimized, setIsMinimized] = useState(false);

  // Live Chat State
  const [liveMessages, setLiveMessages] = useState([]);
  const [liveInput, setLiveInput] = useState('');
  const [sendingLive, setSendingLive] = useState(false);
  
  // AI Bot State
  const [botMessages, setBotMessages] = useState([
     { type: 'bot', text: 'สวัสดีครับ! 🤖 ผมเป็น AI ช่วยเหลือของ MAISON\n\nคุณสามารถถามเกี่ยวกับ:\n• การสั่งซื้อและการจัดส่ง\n• ขนาดและการวัดไซส์\n• การคืนสินค้า\n• สินค้าแนะนำ' }
  ]);
  const [botInput, setBotInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // ===================================
  // HELPERS
  // ===================================
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
        setMode('menu'); // Reset to menu on open
    }
  };

  // ===================================
  // LIVE CHAT LOGIC
  // ===================================
  useEffect(() => {
    if (isLoggedIn && user?.id && isOpen && mode === 'live') {
      const chatId = `chat_${user.id}`;
      const unsubscribe = db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .limit(50)
        .onSnapshot((snapshot) => {
          const msgs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setLiveMessages(msgs);
          scrollToBottom();
        });
      
      return () => unsubscribe();
    }
  }, [isLoggedIn, user?.id, isOpen, mode]);

  const sendLiveMessage = async (e) => {
    e.preventDefault();
    if (!liveInput.trim() || sendingLive) return;
    
    setSendingLive(true);
    const chatId = `chat_${user.id}`;
    
    try {
      await db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text: liveInput.trim(),
          senderId: user.id,
          senderName: user.firstName || 'User',
          isAdmin: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      
      // Update chat metadata
      await db.collection('chats').doc(chatId).set({
        userId: user.id,
        userName: `${user.firstName} ${user.lastName || ''}`,
        userEmail: user.email,
        lastMessage: liveInput.trim(),
        lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
        unreadByAdmin: true
      }, { merge: true });
      
      setLiveInput('');
    } catch (err) {
      console.error("Error sending message:", err);
    }
    setSendingLive(false);
  };

  // ===================================
  // AI CHATBOT LOGIC
  // ===================================
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

  const sendBotMessage = async (e) => {
    e.preventDefault();
    if (!botInput.trim()) return;
    
    const userMessage = botInput.trim();
    setBotMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setBotInput('');
    setIsBotTyping(true);
    scrollToBottom();
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    let response = '🤔 ขอโทษครับ ผมไม่เข้าใจคำถามนี้\n\nลองถามเกี่ยวกับ:\n• การจัดส่ง\n• ไซส์และขนาด\n• การคืนสินค้า\n• สินค้าแนะนำ\n• วิธีชำระเงิน';
    
    const lowerInput = userMessage.toLowerCase();
    for (const key in faqResponses) {
      if (faqResponses[key].keywords.some(k => lowerInput.includes(k))) {
        response = faqResponses[key].response;
        break;
      }
    }
    
    setBotMessages(prev => [...prev, { type: 'bot', text: response }]);
    setIsBotTyping(false);
    scrollToBottom();
  };

  if (isCartOpen) return null;

  return (
    <>
      <button 
        className={`chat-widget-btn ${isOpen ? 'active' : ''}`} 
        onClick={toggleOpen}
        title="MAISON Chat"
        style={{ 
          zIndex: 3000, 
          background: isOpen ? '#1a1a1a' : '#ffffff', 
          color: isOpen ? '#ffffff' : '#000000' 
        }}
      >
        {isOpen ? (
            '✕'
        ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                <circle cx="8" cy="10" r="1.5" fill="white"/>
                <circle cx="12" cy="10" r="1.5" fill="white"/>
                <circle cx="16" cy="10" r="1.5" fill="white"/>
            </svg>
        )}
      </button>

      {isOpen && (
        <div className="chat-widget-panel unified-chat-panel">
          {/* HEADER */}
          <div className="chat-widget-header">
            {mode !== 'menu' && (
                <button className="chat-back-btn" onClick={() => setMode('menu')}>‹</button>
            )}
            <div className="chat-header-info">
              {mode === 'menu' && <span>MAISON Assistance</span>}
              {mode === 'live' && <span>MAISON Support (Live)</span>}
              {mode === 'bot' && <span>MAISON AI Assistant</span>}
            </div>
            <button className="chat-minimize" onClick={() => setIsOpen(false)}>−</button>
          </div>

          {/* CONTENT */}
          <div className="chat-body" style={{height: 350, display:'flex', flexDirection:'column'}}>
            
            {/* MENU MODE */}
            {mode === 'menu' && (
                <div className="chat-menu">
                    <div style={{padding: 20, textAlign: 'center'}}>
                        <h3 style={{fontSize: 18, marginBottom: 10, fontFamily: 'Georgia, serif'}}>How can we help?</h3>
                        <p style={{fontSize: 13, color: '#666'}}>Select an option to start chatting</p>
                    </div>
                    
                    <button 
                        className="chat-menu-btn" 
                        onClick={() => {
                            if (!isLoggedIn) {
                                alert('Please log in to use Live Support.');
                            } else {
                                setMode('live');
                            }
                        }}
                    >
                        <div className="menu-icon">💬</div>
                        <div className="menu-text">
                            <strong>Live Support</strong>
                            <span>Chat with our team</span>
                        </div>
                    </button>

                    <button className="chat-menu-btn" onClick={() => setMode('bot')}>
                         <div className="menu-icon">🤖</div>
                        <div className="menu-text">
                            <strong>AI Assistant</strong>
                            <span>Instant answers 24/7</span>
                        </div>
                    </button>
                </div>
            )}

            {/* LIVE CHAT MODE */}
            {mode === 'live' && (
                <>
                <div className="chat-messages">
                    {liveMessages.length === 0 ? (
                    <div className="chat-welcome">
                        <p>👋 Hello {user?.firstName}!</p>
                        <p>An agent will join you shortly.</p>
                    </div>
                    ) : (
                    liveMessages.map((msg) => (
                        <div key={msg.id} className={`chat-message ${msg.isAdmin ? 'admin' : 'user'}`}>
                        <div className="chat-message-content">{msg.text}</div>
                        </div>
                    ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-input-form" onSubmit={sendLiveMessage}>
                    <input
                    type="text"
                    value={liveInput}
                    onChange={(e) => setLiveInput(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                    />
                    <button type="submit" className="chat-send-btn" disabled={sendingLive}>➤</button>
                </form>
                </>
            )}

            {/* AI BOT MODE */}
            {mode === 'bot' && (
                <>
                <div className="chat-messages ai-theme">
                    {botMessages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${msg.type === 'bot' ? 'admin' : 'user'}`}>
                        <div className="chat-message-content" style={{whiteSpace:'pre-wrap'}}>{msg.text}</div>
                    </div>
                    ))}
                    {isBotTyping && (
                    <div className="chat-message admin">
                         <div className="chat-message-content">...</div>
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-input-form" onSubmit={sendBotMessage}>
                    <input
                    type="text"
                    value={botInput}
                    onChange={(e) => setBotInput(e.target.value)}
                    placeholder="Ask AI anything..."
                    className="chat-input"
                    />
                    <button type="submit" className="chat-send-btn">➤</button>
                </form>
                </>
            )}

          </div>
        </div>
      )}

      {/* STYLES FOR MENU */}
      <style jsx>{`
        .chat-widget-panel.unified-chat-panel {
            width: 340px;
        }
        .chat-menu {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 16px;
        }
        .chat-menu-btn {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 16px;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
        }
        .chat-menu-btn:hover {
            border-color: #c9a96e;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .menu-icon {
            font-size: 24px;
        }
        .menu-text strong {
            display: block;
            font-size: 14px;
            color: #1a1a1a;
        }
        .menu-text span {
            font-size: 12px;
            color: #666;
        }
        .chat-back-btn {
            background: none;
            border: none;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            padding: 0 10px;
            margin-right: -10px;
        }
      `}</style>
    </>
  );
}
