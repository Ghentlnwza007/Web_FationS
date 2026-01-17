
import React, { useState, useEffect, useContext } from 'react';
import { CartContext, AuthContext } from '../context/Contexts';
import { db, firebase } from '../firebase';

// =============================================
// CHECKOUT MODAL COMPONENT
// =============================================
export default function CheckoutModal() {
  const { 
    cart, 
    cartTotal, 
    clearCart, 
    isCheckoutOpen, 
    setIsCheckoutOpen 
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  
  const [step, setStep] = useState(1); // 1: shipping, 2: payment, 3: success
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Coupon system
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  
  const availableCoupons = {
    'WELCOME10': { type: 'percent', value: 10, description: 'ส่วนลด 10%' },
    'MAISON20': { type: 'percent', value: 20, description: 'ส่วนลด 20%' },
    'FREESHIP': { type: 'shipping', value: 0, description: 'ฟรีค่าจัดส่ง' },
    'SAVE100': { type: 'fixed', value: 100, description: 'ลด 100 บาท' },
    'SAVE500': { type: 'fixed', value: 500, description: 'ลด 500 บาท' },
  };
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    notes: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });
  
  const [errors, setErrors] = useState({});

  // Calculate costs
  const shippingCost = appliedCoupon?.type === 'shipping' ? 0 : (cartTotal > 2000 ? 0 : 150);
  
  const couponDiscount = appliedCoupon ? 
    (appliedCoupon.type === 'percent' ? cartTotal * (appliedCoupon.value / 100) :
     appliedCoupon.type === 'fixed' ? appliedCoupon.value : 0) : 0;
     
  const autoDiscount = cartTotal > 5000 ? 500 : 0;
  const totalDiscount = couponDiscount + autoDiscount;
  const finalTotal = Math.max(0, cartTotal + shippingCost - totalDiscount);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (!code) {
      setCouponError('กรุณากรอกรหัสคูปอง');
      return;
    }
    if (availableCoupons[code]) {
      setAppliedCoupon({ code, ...availableCoupons[code] });
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('รหัสคูปองไม่ถูกต้อง');
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formData.lastName.trim()) newErrors.lastName = 'กรุณากรอกนามสกุล';
    if (!formData.phone.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'รูปแบบเบอร์โทรไม่ถูกต้อง';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    if (!formData.address.trim()) newErrors.address = 'กรุณากรอกที่อยู่จัดส่ง';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!paymentMethod) {
      newErrors.paymentMethod = 'กรุณาเลือกวิธีการชำระเงิน';
    }
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'กรุณากรอกหมายเลขบัตร';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'กรุณากรอกวันหมดอายุ';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'กรุณากรอก CVV';
      if (!formData.cardName.trim()) newErrors.cardName = 'กรุณากรอกชื่อบนบัตร';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      processOrder();
    }
  };

  const processOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Create order data
      const orderData = {
        userId: user?.id || 'guest',
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          image: item.image
        })),
        subtotal: cartTotal,
        shipping: shippingCost,
        discount: totalDiscount,
        coupon: appliedCoupon?.code || null,
        total: finalTotal,
        paymentMethod: paymentMethod,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          notes: formData.notes
        },
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      // Save to Firestore
      const orderRef = await db.collection('orders').add(orderData);
      
      setOrderNumber(orderRef.id.slice(-8).toUpperCase());
      setIsProcessing(false);
      setStep(3);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
      setIsProcessing(false);
      // Fallback to local order number if Firestore fails
      const newOrderNumber = 'ORD-' + Date.now().toString().slice(-8);
      setOrderNumber(newOrderNumber);
      setStep(3);
      clearCart();
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    // Reset form after closing
    setTimeout(() => {
      setStep(1);
      setPaymentMethod('');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        cardName: '',
      });
      setErrors({});
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('checkout-overlay')) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCheckoutOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isCheckoutOpen) handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  return (
    <div className={`checkout-overlay ${isCheckoutOpen ? 'active' : ''}`} onClick={handleOverlayClick}>
      <div className="checkout-modal">
        <button className="checkout-close" onClick={handleClose}>×</button>
        
        {/* Progress Steps */}
        <div className="checkout-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">ข้อมูลจัดส่ง</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">ชำระเงิน</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">เสร็จสิ้น</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* Left: Form Section */}
          <div className="checkout-form-section">
            {step === 1 && (
              <div className="shipping-form">
                <h3 className="form-title">📦 ข้อมูลการจัดส่ง</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>ชื่อ *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="ชื่อ"
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>นามสกุล *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="นามสกุล"
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>เบอร์โทรศัพท์ *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08X-XXX-XXXX"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label>อีเมล *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group full">
                  <label>ที่อยู่จัดส่ง *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
                    rows="3"
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-msg">{errors.address}</span>}
                </div>

                <div className="form-group full">
                  <label>หมายเหตุ (ถ้ามี)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="คำแนะนำในการจัดส่ง, เวลาที่สะดวกรับ ฯลฯ"
                    rows="2"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="payment-form">
                <h3 className="form-title">💳 วิธีการชำระเงิน</h3>
                
                {errors.paymentMethod && (
                  <div className="payment-error">{errors.paymentMethod}</div>
                )}

                <div className="payment-options">
                  <div 
                    className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="payment-option-header">
                      <span className="payment-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
                      <span className="payment-name">บัตรเครดิต / เดบิต</span>
                      <span className="payment-check">{paymentMethod === 'card' ? '✓' : ''}</span>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="card-form">
                        <div className="form-group full">
                          <label>หมายเลขบัตร</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className={errors.cardNumber ? 'error' : ''}
                          />
                          {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>วันหมดอายุ</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              maxLength="5"
                              className={errors.cardExpiry ? 'error' : ''}
                            />
                            {errors.cardExpiry && <span className="error-msg">{errors.cardExpiry}</span>}
                          </div>
                          <div className="form-group">
                            <label>CVV</label>
                            <input
                              type="text"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleChange}
                              placeholder="123"
                              maxLength="4"
                              className={errors.cardCvv ? 'error' : ''}
                            />
                            {errors.cardCvv && <span className="error-msg">{errors.cardCvv}</span>}
                          </div>
                        </div>
                        <div className="form-group full">
                          <label>ชื่อบนบัตร</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="JOHN DOE"
                            className={errors.cardName ? 'error' : ''}
                          />
                          {errors.cardName && <span className="error-msg">{errors.cardName}</span>}
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className={`payment-option ${paymentMethod === 'promptpay' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('promptpay')}
                  >
                    <div className="payment-option-header">
                      <span className="payment-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>
                      <span className="payment-name">PromptPay QR Code</span>
                      <span className="payment-check">{paymentMethod === 'promptpay' ? '✓' : ''}</span>
                    </div>
                    {paymentMethod === 'promptpay' && (
                      <div className="promptpay-section">
                        <div className="qr-placeholder">
                          <img 
                            src="https://scontent.fbkk4-3.fna.fbcdn.net/v/t1.15752-9/611668838_770002659476648_8793778093247162605_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHZcyqljRo3wEexKCZLhcYrL3QFaPz4uzYvdAVo_Pi7NuetOgtrAz_KciXkWN5i4mEN42h3oi4dzqm9xaKKlmo1&_nc_ohc=YhQfwfUAgCoQ7kNvwHWLEik&_nc_oc=AdlJMIb9ujWZoJKFlvCd8IfMMe99rvvrnLchH_BO0cwU2o_wDcMLmCUE7w6n88Rvqhk&_nc_ad=z-m&_nc_cid=1483&_nc_zt=23&_nc_ht=scontent.fbkk4-3.fna&oh=03_Q7cD4QHvRfpZrEhmKhkjHBN13WTyo6NF-u8pxzRSwqc3PzIC-Q&oe=698EF370" 
                            alt="PromptPay QR Code" 
                            className="promptpay-qr-image"
                          />
                          <p className="qr-amount">ยอดชำระ: {formatPrice(finalTotal)}</p>
                          <p className="qr-hint">สแกน QR Code เพื่อชำระเงิน</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="payment-option-header">
                      <span className="payment-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
                      <span className="payment-name">ชำระเงินปลายทาง (COD)</span>
                      <span className="payment-check">{paymentMethod === 'cod' ? '✓' : ''}</span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div className="cod-section">
                        <p className="cod-info"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> ชำระเงินสดเมื่อได้รับสินค้า</p>
                        <p className="cod-fee">ค่าบริการ COD: ฿30 (รวมในยอดชำระแล้ว)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="success-section">
                <div className="success-icon">✓</div>
                <h3 className="success-title">สั่งซื้อสำเร็จ!</h3>
                <p className="success-order-number">หมายเลขคำสั่งซื้อ: <strong>{orderNumber}</strong></p>
                <p className="success-message">
                  ขอบคุณสำหรับการสั่งซื้อ! เราได้ส่งรายละเอียดไปยังอีเมล {formData.email} แล้ว
                </p>
                <div className="success-details">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"/></svg> คาดว่าจะจัดส่งภายใน 3-5 วันทำการ</p>
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> เราจะแจ้งเลขพัสดุให้ทางอีเมล</p>
                </div>
                <button className="success-btn" onClick={handleClose}>
                  กลับหน้าหลัก
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          {step !== 3 && (
            <div className="checkout-summary">
              <h3 className="summary-title"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> สรุปคำสั่งซื้อ</h3>
              
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="summary-item-info">
                      <p className="summary-item-name">{item.name}</p>
                      <p className="summary-item-details">
                        {item.selectedSize && `ไซส์: ${item.selectedSize} | `}
                        จำนวน: {item.quantity}
                      </p>
                    </div>
                    <div className="summary-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>ยอดสินค้า</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="summary-row">
                  <span>ค่าจัดส่ง</span>
                  <span>{shippingCost === 0 ? 'ฟรี' : formatPrice(shippingCost)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="summary-row discount">
                    <span>ส่วนลด</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}
                {paymentMethod === 'cod' && (
                  <div className="summary-row">
                    <span>ค่าบริการ COD</span>
                    <span>{formatPrice(30)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>ยอดรวมทั้งหมด</span>
                  <span>{formatPrice(finalTotal + (paymentMethod === 'cod' ? 30 : 0))}</span>
                </div>
              </div>

              {shippingCost === 0 && (
                <div className="free-shipping-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  คุณได้รับฟรีค่าจัดส่ง!
                </div>
              )}

              <div className="checkout-actions">
                {step > 1 && step < 3 && (
                  <button className="back-btn" onClick={() => setStep(step - 1)}>
                    ← ย้อนกลับ
                  </button>
                )}
                {step < 3 && (
                  <button 
                    className={`next-btn ${isProcessing ? 'processing' : ''}`}
                    onClick={handleNextStep}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner"></span>
                        กำลังดำเนินการ...
                      </>
                    ) : step === 1 ? (
                      'ดำเนินการต่อ →'
                    ) : (
                      'ยืนยันคำสั่งซื้อ'
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
