
import React, { createContext, useState, useEffect, useContext } from 'react';
import { firebase, auth, db } from '../firebase';

import { collections } from '../data/products';
import { translations } from '../data/translations';

// =============================================
// CONTEXT CREATION
// =============================================
export const CartContext = createContext();
export const ThemeContext = createContext();
export const WishlistContext = createContext();
export const AuthContext = createContext();
export const CurrencyContext = createContext();
export const CompareContext = createContext();
export const ProductContext = createContext();
export const OrderContext = createContext();

// =============================================
// PRODUCT PROVIDER (Static + Dynamic)
// =============================================
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Static Products
    const staticProducts = [
      ...collections.men.products.map((p) => ({ ...p, category: "men" })),
      ...collections.women.products.map((p) => ({ ...p, category: "women" })),
      ...collections.unisex.products.map((p) => ({ ...p, category: "unisex" })),
      ...collections.sports.products.map((p) => ({ ...p, category: "sports" })),
    ];

    // 2. Realtime Dynamic Products from Firestore
    const unsubscribe = db.collection('products').onSnapshot((snapshot) => {
      const dynamicProducts = snapshot.docs.map(doc => ({
        id: `fs-${doc.id}`, // specific prefix for firestore items if needed, or just use doc.id if unique enough
        ...doc.data(),
        category: doc.data().collection || 'unisex',
        model: doc.data().model || doc.data().name // Ensure model exists for search
      }));

      // Merge: Dynamic products might duplicate static ones if not careful. 
      // For now, we assume admin only adds NEW products.
      // If we wanted to override, we'd keys.
      
      setProducts([...staticProducts, ...dynamicProducts]);
      setLoading(false);
    }, (error) => {
      console.error("Error loading products:", error);
      setProducts(staticProducts); // Fallback to static
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
        {children}
    </ProductContext.Provider>
  );
}

// =============================================
// CURRENCY PROVIDER
// =============================================
const EXCHANGE_RATE = 0.029; // 1 THB = 0.029 USD

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('THB');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Derived language state
  const language = currency === 'THB' ? 'th' : 'en';

  const formatPrice = (priceInTHB) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(priceInTHB * EXCHANGE_RATE);
    }
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(priceInTHB);
  };

  const toggleCurrency = (cur) => {
    setCurrency(cur);
    setIsDropdownOpen(false);
  };

  // Translation helper
  const t = (key) => {
    if (!translations || !translations[key]) return key;
    return translations[key][language] || translations[key]['en'] || key;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        isDropdownOpen,
        setIsDropdownOpen,
        toggleCurrency,
        language,
        t,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

// =============================================
// AUTH PROVIDER (Firebase)
// =============================================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('menu'); // 'menu', 'login', 'register'
  const [authError, setAuthError] = useState('');

  // Listen to Firebase auth state changes
  // Listen to Firebase auth state changes
  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Subscribe to real-time user data from Firestore
        // This ensures profile updates are reflected immediately
        if (unsubscribeFirestore) {
            unsubscribeFirestore();
            unsubscribeFirestore = null;
        }

        unsubscribeFirestore = db.collection('users').doc(firebaseUser.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              setUser({
                id: firebaseUser.uid,
                email: firebaseUser.email,
                role: userData.role || 'user',
                ...userData
              });
            } else {
              // User exists in Auth but not in Firestore yet
              setUser({
                id: firebaseUser.uid,
                email: firebaseUser.email,
                firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
                lastName: firebaseUser.displayName?.split(' ')[1] || '',
                role: 'user'
              });
            }
            setLoading(false);
          }, (error) => {
            console.error("Error fetching user data:", error);
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: 'User',
              role: 'user'
            });
            setLoading(false);
          });
      } else {
        if (unsubscribeFirestore) {
            unsubscribeFirestore();
            unsubscribeFirestore = null;
        }
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const register = async (userData) => {
    try {
      setAuthError('');
      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      
      // Save additional user data to Firestore
      await db.collection('users').doc(userCredential.user.uid).set({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || '',
        otherInfo: userData.otherInfo || '',
        username: userData.username,
        role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      setIsAuthModalOpen(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setAuthError('อีเมลนี้ถูกใช้งานแล้ว!');
      } else if (error.code === 'auth/weak-password') {
        setAuthError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร!');
      } else if (error.code === 'auth/invalid-email') {
        setAuthError('รูปแบบอีเมลไม่ถูกต้อง!');
      } else {
        setAuthError('เกิดข้อผิดพลาด: ' + error.message);
      }
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      setAuthError('');
      await auth.signInWithEmailAndPassword(email, password);
      setIsAuthModalOpen(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setAuthError('อีเมลหรือรหัสผ่านไม่ถูกต้อง!');
      } else if (error.code === 'auth/invalid-email') {
        setAuthError('รูปแบบอีเมลไม่ถูกต้อง!');
      } else {
        setAuthError('เกิดข้อผิดพลาด: ' + error.message);
      }
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setAuthError('');
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      
      // Check if user exists in Firestore, if not create one
      const userDoc = await db.collection('users').doc(result.user.uid).get();
      if (!userDoc.exists) {
        await db.collection('users').doc(result.user.uid).set({
          firstName: result.user.displayName?.split(' ')[0] || 'User',
          lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
          email: result.user.email,
          phone: '',
          address: '',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      
      setIsAuthModalOpen(false);
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError('เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Google');
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  const openAuthModal = (mode = 'menu') => {
    setAuthMode(mode);
    setAuthError('');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthMode('menu');
    setAuthError('');
  };

  if (loading) {
    return <div className="auth-loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAdmin,
        register,
        login,
        loginWithGoogle,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        authError,
        setAuthError,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =============================================
// WISHLIST PROVIDER (Firebase)
// =============================================
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Load wishlist from Firestore when user logs in
  useEffect(() => {
    if (user?.id) {
      const unsubscribe = db.collection('wishlists').doc(user.id)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setWishlist(doc.data().items || []);
          } else {
            setWishlist([]);
          }
        }, (error) => {
          console.error("Error loading wishlist:", error);
        });
      
      return () => unsubscribe();
    } else {
      setWishlist([]);
    }
  }, [user?.id]);

  // Save wishlist to Firestore
  const saveWishlistToFirestore = async (items) => {
    if (user?.id) {
      try {
        await db.collection('wishlists').doc(user.id).set({
          items: items,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (error) {
        console.error("Error saving wishlist:", error);
      }
    }
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      const newWishlist = [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0]
      }];
      saveWishlistToFirestore(newWishlist);
      return newWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item) => item.id !== productId);
      saveWishlistToFirestore(newWishlist);
      return newWishlist;
    });
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// =============================================
// CART PROVIDER (Firebase)
// =============================================
export function CartProvider({ children }) {
  // 1. Initialize from LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from local storage", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const { user } = useContext(AuthContext);

  // 2. Persist to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('maison_cart', JSON.stringify(cart));
  }, [cart]);

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (user?.id) {
      const unsubscribe = db.collection('carts').doc(user.id)
        .onSnapshot((doc) => {
          if (doc.exists) {
            // Merge or overwrite strategy? 
            // For now, let's overwrite local with cloud if cloud exists, 
            // OR we could merge. Standard behavior often favors cloud.
            // But if we just refreshed, cloud is SOT for logged in user.
            const cloudItems = doc.data().items || [];
            setCart(cloudItems); 
          }
           // If cloud doc doesn't exist yet, we might want to push local to cloud?
           // For simplicity and safety, we simply don't overwrite local with empty if cloud is empty unless explicit.
           // However, keeping standard behavior: User logs in -> they see their account cart.
        }, (error) => {
          console.error("Error loading cart:", error);
        });
      
      return () => unsubscribe();
    } 
    // REMOVED: else { setCart([]); } 
    // We do NOT want to clear cart if user is guest.
  }, [user?.id]);

  // Save cart to Firestore
  const saveCartToFirestore = async (items) => {
    if (user?.id) {
      try {
        await db.collection('carts').doc(user.id).set({
          items: items,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
    if (user?.id) {
      saveCartToFirestore([]);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === product.selectedSize);
      let newCart;
      if (existing) {
        newCart = prev.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0],
          selectedSize: product.selectedSize,
          quantity: 1
        }];
      }
      saveCartToFirestore(newCart);
      return newCart;
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => !(item.id === productId && item.selectedSize === selectedSize));
      saveCartToFirestore(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, selectedSize, delta) => {
    setCart((prev) => {
      const newCart = prev.map((item) => {
        if (item.id === productId && item.selectedSize === selectedSize) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      saveCartToFirestore(newCart);
      return newCart;
    });
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// =============================================
// THEME PROVIDER
// =============================================
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================
// COMPARE PROVIDER
// =============================================
export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  const addToCompare = (product) => {
    if (compareList.length >= 3) {
      alert('สามารถเปรียบเทียบได้สูงสุด 3 รายการ');
      return;
    }
    if (compareList.find(p => p.id === product.id)) {
      alert('สินค้านี้อยู่ในรายการเปรียบเทียบแล้ว');
      return;
    }
    setCompareList([...compareList, product]);
  };
  
  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter(p => p.id !== productId));
  };
  
  const clearCompare = () => {
    setCompareList([]);
  };
  
  const isInCompare = (productId) => {
    return compareList.some(p => p.id === productId);
  };
  
  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      isCompareOpen,
      setIsCompareOpen,
      compareCount: compareList.length
    }}>
      {children}
    </CompareContext.Provider>
  );
}

// =============================================
// ORDER PROVIDER (Local Badge)
// =============================================
// OrderContext is now created at the top

export function OrderProvider({ children }) {
  const [orderCount, setOrderCount] = useState(0);

  const calculateOrderCount = () => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
      // Sum the item quantities
      const totalItems = savedOrders.reduce((total, order) => {
        const orderItemsCount = order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
        return total + orderItemsCount;
      }, 0);
      
      setOrderCount(totalItems);
    } catch (e) {
      console.error("Error calculating order count", e);
      setOrderCount(0);
    }
  };

  useEffect(() => {
    calculateOrderCount();
    window.addEventListener('storage', calculateOrderCount);
    return () => window.removeEventListener('storage', calculateOrderCount);
  }, []);

  const refreshOrderCount = () => {
    calculateOrderCount();
  };

  return (
    <OrderContext.Provider value={{ orderCount, refreshOrderCount }}>
      {children}
    </OrderContext.Provider>
  );
}
