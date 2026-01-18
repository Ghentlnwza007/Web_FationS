
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, CartContext } from '../context/Contexts';
import { db, firebase } from '../firebase';

// =============================================
// LIVE CHAT WIDGET COMPONENT
// =============================================
export default function LiveChatWidget() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const { isCartOpen } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = React.useRef(null);
  
  // Load chat messages
  useEffect(() => {
    if (isLoggedIn && user?.id && isOpen) {
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
          setMessages(msgs);
          scrollToBottom();
        });
      
      return () => unsubscribe();
    }
  }, [isLoggedIn, user?.id, isOpen]);
  
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;
    
    setSending(true);
    const chatId = `chat_${user.id}`;
    
    try {
      await db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text: newMessage.trim(),
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
        lastMessage: newMessage.trim(),
        lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
        unreadByAdmin: true
      }, { merge: true });
      
      setNewMessage('');
    } catch (err) {
      console.error("Error sending message:", err);
    }
    
    setSending(false);
  };
  
  if (!isLoggedIn) {
    return (
      <button className="chat-widget-btn" onClick={() => alert('กรุณาเข้าสู่ระบบเพื่อใช้งาน Live Chat')}>
        💬
      </button>
    );
  }

  if (isCartOpen) return null;
  
  return (
    <>
      <button className={`chat-widget-btn ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chat-widget-panel">
          <div className="chat-widget-header">
            <div className="chat-header-info">
              <span className="chat-status-dot"></span>
              <span>MAISON Support</span>
            </div>
            <button className="chat-minimize" onClick={() => setIsOpen(false)}>−</button>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-welcome">
                <p>สวัสดีครับ! 👋</p>
                <p>มีอะไรให้เราช่วยไหมครับ?</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`chat-message ${msg.isAdmin ? 'admin' : 'user'}`}
                >
                  <div className="chat-message-content">{msg.text}</div>
                  <div className="chat-message-time">
                    {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString('th-TH', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : ''}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="พิมพ์ข้อความ..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn" disabled={sending}>
              {sending ? '...' : '➤'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
