import React, { useState, useContext, useEffect } from 'react';
import { CartContext, AuthContext, OrderContext } from '../context/Contexts';
import styles from './CheckoutModal.module.css';
import { db, firebase } from '../firebase';

// =============================================
// SUB-COMPONENTS
// =============================================

const FloatingInput = ({ label, name, type = "text", value, onChange, error, half = false }) => (
  <div className={`${styles.inputWrapper} ${half ? styles.half : ''}`}>
    <input 
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder=" " 
      className={styles.inputField}
      style={error ? {borderColor: '#ef4444', background: '#fff9f9'} : {}}
    />
    <label className={styles.floatingLabel} style={error ? {color: '#ef4444'} : {}}>
      {label}
    </label>
    {error && (
       <span style={{position: 'absolute', right: 12, top: 16, color: '#ef4444'}}>!</span>
    )}
  </div>
);

const CheckoutHeader = ({ step, setStep, onLogoClick }) => (
  <div className={styles.header}>
    <h1 
      className={styles.logo} 
      onClick={onLogoClick} 
      role="button" 
      tabIndex={0}
      title="Return to Home"
    >
      MAISON
    </h1>
    <nav className={styles.breadcrumbs}>
      <span 
        className={`${styles.breadcrumbItem} ${step === 1 ? styles.active : styles.completed}`}
        onClick={() => step > 1 && setStep(1)}
      >
        Information
      </span>
      <span>›</span>
      <span 
        className={`${styles.breadcrumbItem} ${step === 2 ? styles.active : step > 2 ? styles.completed : ''}`}
        onClick={() => step > 2 && setStep(2)}
      >
        Shipping
      </span>
      <span>›</span>
      <span className={`${styles.breadcrumbItem} ${step === 3 ? styles.active : ''}`}>
        Payment
      </span>
    </nav>
  </div>
);

// =============================================
// MAIN COMPONENT
// =============================================

export default function CheckoutModal({ onGoHome }) {
  const { cart, cartTotal, clearCart, isCheckoutOpen, setIsCheckoutOpen } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { refreshOrderCount } = useContext(OrderContext);
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleLogoClick = () => {
    setIsCheckoutOpen(false);
    if (onGoHome) onGoHome();
    setTimeout(() => setStep(1), 300);
  };

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || '',
    city: '',
    postalCode: '',
    phone: '',
    country: 'Thailand',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });

  const [errors, setErrors] = useState({});

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Derived Values
  const shippingCost = appliedCoupon?.type === 'shipping' ? 0 : (cartTotal > 2000 ? 0 : 150);
  const couponDiscount = appliedCoupon ? 
    (appliedCoupon.type === 'percent' ? cartTotal * (appliedCoupon.value / 100) : 0) : 0;
  const finalTotal = Math.max(0, cartTotal + shippingCost - couponDiscount);

  const formatPrice = (p) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(p);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'phone'].forEach(field => {
       if (!formData[field]) newErrors[field] = 'Required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
        setStep(2);
        window.scrollTo(0,0);
    } else if (step === 2) {
        setStep(3);
        window.scrollTo(0,0);
    } else if (step === 3) {
        processOrder();
    }
  };

  const processOrder = async () => {
    if (!formData.cardNumber) {
        setErrors({ cardNumber: 'Required' });
        return;
    }
    
    setIsProcessing(true);
    
    // Generate Order ID
    const newOrderNumber = `MS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(newOrderNumber);

    const orderData = {
        id: newOrderNumber,
        userId: user?.id || 'guest',
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        items: cart,
        total: finalTotal,
        status: 'processing', // Auto-set to processing (Paid) for Credit Card
        shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            phone: formData.phone
        },
        paymentMethod: 'Credit Card',
        createdAt: { seconds: Date.now() / 1000 } // Use simple timestamp for local
    };

    // 1. Save to Local Storage (Immediate Persistence)
    try {
        const existingOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
        localStorage.setItem('maison_orders', JSON.stringify([orderData, ...existingOrders]));
        refreshOrderCount(); // <--- REFRESH BADGE HERE
    } catch (e) {
        console.error("Failed to save order locally", e);
    }

    try {
        // 2. Save to Firestore if user is logged in
        if (user && user.id) {
            await db.collection('orders').doc(newOrderNumber).set({
                ...orderData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp() // Overwrite with server timestamp
            });
        }
    } catch (error) {
        console.error("Error saving order:", error);
    }

    setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
        clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => setStep(1), 300);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        
        {/* LEFT COLUMN */}
        <div className={styles.mainColumn}>
          {step < 4 && <CheckoutHeader step={step} setStep={setStep} onLogoClick={handleLogoClick} />}

          {step === 1 && (
            <div className={styles.fadeInContent}>
                <h2 className={styles.sectionTitle}>Contact information</h2>
                <FloatingInput label="Email or mobile phone number" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                
                <h2 className={styles.sectionTitle} style={{marginTop: 30}}>Shipping address</h2>
                <div className={styles.row}>
                    <FloatingInput label="First name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} half />
                    <FloatingInput label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} half />
                </div>
                <FloatingInput label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
                <div className={styles.row}>
                    <FloatingInput label="Postal code" name="postalCode" value={formData.postalCode} onChange={handleChange} error={errors.postalCode} half />
                    <FloatingInput label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} half />
                </div>
                <FloatingInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />

                <div className={styles.actions}>
                    <button className={styles.textBtn} onClick={handleClose}>Return to cart</button>
                    <button className={styles.primaryBtn} onClick={handleNext}>Continue to shipping</button>
                </div>
            </div>
          )}

          {step === 2 && (
             <div className={styles.fadeInContent}>
                <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 24}}>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize: 14, marginBottom: 12}}>
                        <span style={{color:'#666'}}>Contact</span>
                        <span>{formData.email}</span>
                        <span style={{color:'#c9a96e', cursor:'pointer'}} onClick={()=>setStep(1)}>Change</span>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize: 14}}>
                        <span style={{color:'#666'}}>Ship to</span>
                        <span>{formData.address}, {formData.city}</span>
                        <span style={{color:'#c9a96e', cursor:'pointer'}} onClick={()=>setStep(1)}>Change</span>
                    </div>
                </div>

                <h2 className={styles.sectionTitle}>Shipping method</h2>
                <div style={{padding: 16, border: '1px solid #c9a96e', borderRadius: 6, display: 'flex', justifyContent: 'space-between', background:'#fffbf5'}}>
                    <span style={{fontSize:14, fontWeight:500}}>Standard Shipping</span>
                    <span style={{fontWeight:600}}>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>

                <div className={styles.actions}>
                    <button className={styles.textBtn} onClick={() => setStep(1)}>Return to information</button>
                    <button className={styles.primaryBtn} onClick={handleNext}>Continue to payment</button>
                </div>
             </div>
          )}

          {step === 3 && (
             <div className={styles.fadeInContent}>
                <h2 className={styles.sectionTitle}>Payment</h2>
                <p style={{fontSize:13, color:'#666', marginBottom:20}}>All transactions are secure and encrypted.</p>
                
                {/* LIVE CARD PREVIEW */}
                <div className={styles.cardPreview}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardChip}></div>
                    <div className={styles.cardBrand}>
                      {formData.cardNumber.startsWith('4') ? 'VISA' : formData.cardNumber.startsWith('5') ? 'MC' : 'CARD'}
                    </div>
                  </div>
                  <div className={styles.cardNumber}>
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.cardDetail}>
                      <div className={styles.cardInfoTitle}>Card Holder</div>
                      <div className={styles.cardInfoValue}>{formData.cardName || 'YOUR NAME'}</div>
                    </div>
                    <div className={styles.cardDetail}>
                      <div className={styles.cardInfoTitle}>Expires</div>
                      <div className={styles.cardInfoValue}>{formData.cardExpiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                <div style={{border:'1px solid #eee', borderRadius:6, overflow:'hidden', marginTop: 24}}>
                    <div style={{padding:16, borderBottom:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fafafa'}}>
                        <span style={{fontWeight:500, fontSize:14}}>Credit Card</span>
                        <span>💳</span>
                    </div>
                    <div style={{padding:20, background:'#fff'}}>
                        <FloatingInput 
                            label="Card number" 
                            name="cardNumber" 
                            value={formData.cardNumber} 
                            onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                                handleChange({ target: { name: 'cardNumber', value: val } });
                            }} 
                            error={errors.cardNumber} 
                        />
                        <div className={styles.row}>
                            <FloatingInput 
                                label="Exp (MM/YY)" 
                                name="cardExpiry" 
                                value={formData.cardExpiry} 
                                onChange={(e) => {
                                    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                                    handleChange({ target: { name: 'cardExpiry', value: val } });
                                }} 
                                half 
                            />
                            <FloatingInput 
                                label="CVV" 
                                name="cardCvv" 
                                value={formData.cardCvv} 
                                onChange={(e) => {
                                    let val = e.target.value.replace(/\D/g, '').slice(0, 3);
                                    handleChange({ target: { name: 'cardCvv', value: val } });
                                }} 
                                half 
                            />
                        </div>
                        <FloatingInput label="Name on card" name="cardName" value={formData.cardName} onChange={handleChange} />
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.textBtn} onClick={() => setStep(2)}>Return to shipping</button>
                    <button className={styles.primaryBtn} onClick={handleNext} disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Pay now'}
                    </button>
                </div>
             </div>
          )}

          {step === 4 && (
            <div className={styles.fadeInContent}>
               <div className={styles.successContainer}>
                  <div className={styles.successIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                  </div>
                  <h2 className={styles.successTitle}>Thank you, {formData.firstName}!</h2>
                  <p className={styles.successMessage}>Your order #{orderNumber} is confirmed.</p>
                  <div className={styles.continueBtn}>
                     <button className={styles.primaryBtn} onClick={handleClose}>Continue Shopping</button>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (SIDEBAR) */}
        <div className={styles.sidebar}>
           <div className={styles.orderSummaryItems}>
             {cart.map((item) => (
                <div key={item.id + item.selectedSize} className={styles.summaryItem}>
                  <div className={styles.imageBadge}>
                    <img src={item.image} alt={item.name} />
                    <span className={styles.qtyBadge}>{item.quantity}</span>
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemVariant}>{item.selectedSize}</div>
                  </div>
                  <div className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</div>
                </div>
             ))}
           </div>

           <div className={styles.discountSection}>
              <div className={styles.discountForm}>
                <input 
                  type="text" 
                  className={styles.inputField} 
                  placeholder="Discount code" 
                  value={couponCode} 
                  onChange={(e) => setCouponCode(e.target.value)} 
                  style={{height: 46, fontSize:13}}
                />
                <button 
                  className={`${styles.applyBtn} ${couponCode ? styles.active : ''}`}
                  onClick={() => {
                     if (couponCode === 'MAISON20') setAppliedCoupon({code: 'MAISON20', type: 'percent', value: 20});
                     setCouponCode('');
                  }}
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                 <div style={{marginTop:10, fontSize:12, color:'#166534', display:'flex', alignItems:'center', gap:5}}>
                    🏷️ {appliedCoupon.code} applied!
                 </div>
              )}
           </div>

           <div>
              <div className={styles.totalRow}>
                 <span>Subtotal</span>
                 <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className={styles.totalRow}>
                 <span>Shipping</span>
                 <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className={styles.totalRow} style={{color: '#166534'}}>
                    <span>Discount</span>
                    <span>- {formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className={styles.grandTotal}>
                 <span>Total</span>
                 <div style={{display:'flex', alignItems:'baseline'}}>
                    <span className={styles.currency}>THB</span>
                    <span className={styles.finalPrice}>{formatPrice(finalTotal)}</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
