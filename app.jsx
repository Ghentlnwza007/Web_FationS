// =============================================
// MAISON - Premium Lifestyle Wear
// React Application with Modern UI
// =============================================

const { useState, useEffect, createContext, useContext } = React;

// =============================================
// PRODUCT DATA
// =============================================
const collections = {
  men: {
    title: "Men's Collection",
    description: "คอลเลคชั่นผู้ชายสไตล์พรีเมี่ยม",
    image:
      "https://calvinklein.scene7.com/is/image/CalvinKlein/4RE100G_2EX_main?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp",
    products: [
      {
        id: 0,
        name: "Cropped Relaxed Button-Down Shirt",
        price: 1990.00,
        model: "Cropped Relaxed",
        size: "S, M, L, XL",
        material: "100% Cotton",
        color: "Brown, White,",
        stock: 10,
        image: "https://calvinklein.scene7.com/is/image/CalvinKlein/4RE100G_2EX_alternate3?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp",
        colorVariants: [
          { name: "Brown", hex: "#8B4513", image: "https://calvinklein.scene7.com/is/image/CalvinKlein/4RE100G_2EX_alternate3?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp" },
          { name: "White", hex: "#fafafa", image: "https://calvinklein.scene7.com/is/image/CalvinKlein/4RE100G_YAA_main?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp" },
        ],
      },
      {
        id: 1,
        name: "Lanvin Embroidered",
        price: 17147.9,
        model: "Lanvin x Gallery Dept. Embroidered Logo",
        size: "S, M, L, XL, XXL",
        material: "100% Premium Cotton",
        color: "Milk, Black, Red",
        stock: 10,
        image: "https://www.careofcarl.com/bilder/artiklar/zoom/24874411r_1.jpg?m=1678713083",
        colorVariants: [
          { name: "Milk", hex: "#FFFAF0", image: "https://www.careofcarl.com/bilder/artiklar/zoom/24874411r_1.jpg?m=1678713083" },
          { name: "Black", hex: "#000000", image: "https://us.lanvin.com/cdn/shop/files/RM-TS0012-J303-H2510_3.jpg?v=1753304215&width=600" },
          { name: "Red", hex: "#DC143C", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRVqaj1axInipgUfKUF8ZoYvF1hsdjWzjjNswDHQpRIGeAHm1TX9N-GbL92f3u8BnNsZpCz_hGdLpf8CvdiZEauUXRGQW3dJAjbVYT_nJbX1_DTeA0pvZ492g" },
        ],
      },
      {
        id: 2,
        name: "JADED LONDON JEANS",
        price: 3490.65,
        model: "Colossus",
        size: "28, 30, 32, 34, 36",
        material: "Denim Cotton 100%",
        color: "Blue, ",
        stock: 10,
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/Artboard3_645df2f2-2859-407f-ba66-2cfcb3b8335e.jpg?v=1758557493",
        colorVariants: [
          { name: "Blue", hex: "#4169E1", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/Artboard3_645df2f2-2859-407f-ba66-2cfcb3b8335e.jpg?v=1758557493" },
        ],
      },
      {
        id: 3,
        name: "Air Jordan 1 Low SE",
        price: 4200.87,
        model: "DC6991-400",
        size: "42, 44, 46, 48",
        material: "Premium Leather",
        color: "Sky",
        stock: 10,
        image:
          "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b82e5764-c9ce-4fec-b72a-d4ea98d28614/AIR+JORDAN+1+LOW+SE.png",
        colorVariants: [
          { name: "Sky", hex: "#4fc3f7", image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b82e5764-c9ce-4fec-b72a-d4ea98d28614/AIR+JORDAN+1+LOW+SE.png" },
        ],
      },
      {
        id: 4,
        name: "Shield Sunglasses",
        price: 7600.34,
        model: "Horizon Slate",
        size: "-",
        material: "Stainless Steel, Titanium",
        color: "Gold Silver",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JADEDEYEWEAR7136.jpg?v=1752057589",
        colorVariants: [
          { name: "Gold Silver", hex: "#ae917c", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JADEDEYEWEAR7136.jpg?v=1752057589" },
        ],
      },
      {
        id: 5,
        name: "Tour Belt",
        price: 16990.34,
        model: "925 Sterling Silver Necklace",
        size: "-",
        material: "leather",
        color: "Cream",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/FLAT6.jpg",
        colorVariants: [
          { name: "Cream", hex: "#fff", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/FLAT6.jpg" },
        ],
      },
    ],
  },
  women: {
    title: "Women's Collection",
    description: "คอลเลคชั่นผู้หญิงสไตล์หรูหรา",
    image:
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/15JANWWECCOM1725_b7eeee80-0a2c-46b7-8113-65b6913bdb0a.jpg",
    products: [
      {
        id: 5,                                    // ID ไม่ซ้ำกัน
        name: "Mid Blue Slub Colossus Jeans",                          // ชื่อ
        price: 1990.00,                            // ราคา (บาท)
        model: "Colossus Jeans",                          // รุ่น
        size: "S, M, L, XL",                       // ไซส์ที่มี
        material: "100% Cotton",                   // วัสดุ
        color: "Blue",                     // สี
        stock: 10,                                 // จำนวนในสต็อก
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/19DECWW1715.jpg",
        colorVariants: [
          { name: "Blue", hex: "#4169E1", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/19DECWW1792.jpg?v=1735045513" },
        ],
      },
      {
        id: 6,                                    // ID ไม่ซ้ำกัน
        name: "Sand Oil Wash Colossus Jorts",                          // ชื่อ
        price: 1990.00,                            // ราคา (บาท)
        model: "Colossus Jorts",                          // รุ่น
        size: "S, M, L, XL",                       // ไซส์ที่มี
        material: "100% Cotton",                   // วัสดุ
        color: "Brown",                     // สี
        stock: 10,                                 // จำนวนในสต็อก
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/sow4.jpg?v=1718728210",
        colorVariants: [
          { name: "Brown", hex: "#d7ccc8", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/sow2.jpg?v=1718728210" },
        ],
      },
      {
        id: 6,                                    // ID ไม่ซ้ำกัน
        name: "Liberty 2 In 1 Detachable Denim Black Midi Dress",                          // ชื่อ
        price: 4560.00,                            // ราคา (บาท)
        model: "Midi Dress",                          // รุ่น
        size: "S, M, L, XL",                       // ไซส์ที่มี
        material: "100% Cotton",                   // วัสดุ
        color: "Gray",                     // สี
        stock: 10,                                 // จำนวนในสต็อก
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/products/WOMENS4125.jpg",
        colorVariants: [
          { name: "Gray", hex: "#757575", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/products/WOMENS4125.jpg" },
        ],
      },
      {
        id: 6,
        name: "Woodland Camo Colossus Baggy Jeans",
        price: 4350.34,
        model: "Camo Colossus",
        size: "XS, S, M, L",
        material: "Heavyweight Cotton Canvas",
        color: "Brown",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/Artboard9_5aa03e9d-b79e-475f-8296-985e8ab60f7c.jpg?v=1764004687",
        colorVariants: [
          { name: "Brown", hex: "#9d877eff", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/Artboard9_5aa03e9d-b79e-475f-8296-985e8ab60f7c.jpg?v=1764004687" },
        ],
      },
      {
        id: 7,
        name: "Haka Mongolian Faux Fur Knit Shrug",
        price: 3490.76,
        model: "Cropped Zip-up Hoodie",
        size: "XS, S, M, L",
        material: "Cotton Fleece, Synthetic Faux Fur",
        color: "Burgundy",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/15JANWWECCOM0527.jpg",
        colorVariants: [
          { name: "Burgundy", hex: "#ec407a", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/15JANWWECCOM0527.jpg" },
        ],
      },
      {
        id: 8,
        name: "Maison Margiela Future High-Top",
        price: 34708.1,
        model: "Maison Margiela",
        size: "XS, S, M, L",
        material: "Nappa Leather",
        color: "Off-White / Bone",
        stock: 10,
        image:
          "https://cdn-images.farfetch-contents.com/32/12/66/11/32126611_61968168_1000.jpg",
        colorVariants: [
          { name: "Off-White / Bone", hex: "#fffde7", image: "https://cdn-images.farfetch-contents.com/32/12/66/11/32126611_61968168_1000.jpg" },
        ],
      },
      {
        id: 9,
        name: "Oversized Shield Sunglasses",
        price: 4490.61,
        model: "BELOW 0° Sunglasses",
        size: "Oversized",
        material: "Premium Acetate",
        color: "Jelly Brown/Amber",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/STYLE_12.jpg?v=1751897296",
        colorVariants: [
          { name: "Jelly Brown/Amber", hex: "#bcaaa4", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/STYLE_12.jpg?v=1751897296" },
        ],
      },
    ],
  },
  unisex: {
    title: "Unisex Collection",
    description: "เครื่องประดับและอุปกรณ์เสริม",
    image:
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMG5580_FLF5_0925_fed9e934-530c-4e4f-8272-5f8b9c123beb.jpg?v=1759308216",
    products: [
      {
        id: 11,
        name: "Asymmetrical Faux Fur Buckle Vest",
        price: 2490.87,
        model: "Faux Fur Buckle",
        size: "-",
        material: "High-quality Faux Fur",
        color: "Brown / Sandy Brown",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMA4434_F2_0925_fc2f751c-639a-4ded-b756-62bbcffb36c2.jpg?v=1759308172",
        colorVariants: [
          { name: "Brown", hex: "#a1887f", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMA4434_F2_0925_fc2f751c-639a-4ded-b756-62bbcffb36c2.jpg?v=1759308172" },
        ],
      },
      {
        id: 11,
        name: "Rebel Military Jacket in Khaki",
        price: 3670.87,
        model: "Military Jacket",
        size: "M, L, XL",
        material: "100% Cutton",
        color: "Green, Gray, Black",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMDJ6064_F1_1125.jpg",
        colorVariants: [
          { name: "Green", hex: "#33691e", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMDJ6064_F1_1125.jpg" },
          { name: "Gray", hex: "#bdbdbd", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMJK4056_F1_0725.jpg" },
          { name: "Black", hex: "#000000", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JADEDMAN23MAY73480.jpg" },
        ],
      },
      {
        id: 11,
        name: "Sporty Baggy Monster Hoodie",
        price: 5470.87,
        model: "Sporty Baggy",
        size: "M, L, XL",
        material: "100% Cutton",
        color: "Gray, Blue",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1292.jpg?v=1737996348",
        colorVariants: [
          { name: "Gray", hex: "#bdbdbd", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1292.jpg?v=1737996348" },
          { name: "Blue", hex: "#283593", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/Artboard1_a7af62d9-1df2-4e06-a649-003dee60d630.jpg" },
        ],
      },
      {
        id: 11,
        name: "Strike Metal Belt",
        price: 2200.87,
        model: "Strike Metal ",
        size: "-",
        material: "High-quality Leather",
        color: "Black",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMA6231_F1_0925edited.jpg",
        colorVariants: [
          { name: "Black", hex: "#000000", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMA6231_F1_0925.jpg?v=1760096508" },
        ],
      },
      {
        id: 12,
        name: "Super Baggy Distressed Jeans",
        price: 2990.87,
        model: "Baggy Distressed Jeans",
        size: "M, L, XL",
        material: "Washed Denim",
        color: "Light Blue",
        stock: 10,
        image:
          "https://www.fugazee.com/cdn/shop/files/28-04-202533082.jpg?v=1746881795&width=860",
        colorVariants: [
          { name: "Light Blue", hex: "#4fc3f7", image: "https://www.fugazee.com/cdn/shop/files/28-04-202533082.jpg?v=1746881795&width=860" },
        ],
      },
      {
        id: 13,
        name: "Fluffy Tote Bag",
        price: 1398.73,
        model: "Fluffy",
        size: "-",
        material: "Fluffy Material",
        color: "Cream",
        stock: 10,
        image:
          "https://futurefusiononline.com/cdn/shop/files/HNE024.0.jpg?v=1701783873",
          colorVariants: [
          { name: "Brown", hex: "#a1887f", image: "https://futurefusiononline.com/cdn/shop/files/HNE024.0.jpg?v=1701783873" },
        ],
      },
      {
        id: 14,
        name: "Raised Embroidery XL Jeans",
        price: 1498.73,
        model: "Embroidery",
        size: "M, L, XL",
        material: "Washed Denim",
        color: "Black",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/12-12-25FLATS1.jpg",
        colorVariants: [
          { name: "Black", hex: "#000000", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/12-12-25FLATS1.jpg" },
        ],
      },
      {
        id: 15,
        name: "Ecru Merida Jacket",
        price: 2698.43,
        model: "Ecru Merida",
        size: "M, L, XL",
        material: "High-quality Fluffy",
        color: "Cream",
        stock: 10,
        image:
          "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/29-10-25FLATS27.jpg",
        colorVariants: [
          { name: "Cream", hex: "#a1887f", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/29-10-25FLATS27.jpg" },
        ],
      },
      {
        id: 16,
        name: "Premium Silk Scarf",
        price: 1990.0,
        model: "AC-SC-2026",
        size: "90x90 cm",
        material: "100% Silk",
        color: "Various Patterns",
        stock: 10,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
        colorVariants: [
          { name: "Various Patterns", hex: "#b27c68ff", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600" },
        ],
      },
      {
        id: 17,
        name: "Chunky Silver Bangles",
        price: 12990.25,
        model: "Chunky silver bangle",
        size: "7.8mm x 2mm",
        material: "Stainless Steel",
        color: "Silver",
        stock: 10,
        image:
          "https://hotdiamonds.co.uk/images/trio-bangle-p3481-11871_image.jpg",
        colorVariants: [
          { name: "Silver", hex: "#e0e0e0", image: "https://hotdiamonds.co.uk/images/trio-bangle-p3481-11871_image.jpg" },
        ],
      },
    ],
  },
};

// =============================================
// CONTEXTS
// =============================================
const CartContext = createContext();
const ThemeContext = createContext();
const WishlistContext = createContext();
const AuthContext = createContext();

// =============================================
// AUTH PROVIDER
// =============================================
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('menu'); // 'menu', 'login', 'register'
  const [authError, setAuthError] = useState('');

  const register = (userData) => {
    // Check if username already exists
    const existingUser = users.find(u => u.username === userData.username);
    if (existingUser) {
      setAuthError('Username already exists!');
      return false;
    }
    // Check if email already exists
    const existingEmail = users.find(u => u.email === userData.email);
    if (existingEmail) {
      setAuthError('Email already registered!');
      return false;
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    setAuthError('');
    setIsAuthModalOpen(false);
    return true;
  };

  const login = (username, password) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setAuthError('');
      setIsAuthModalOpen(false);
      return true;
    } else {
      setAuthError('Invalid username or password!');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = !!user;

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        register,
        login,
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
// WISHLIST PROVIDER
// =============================================
function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
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
// CART PROVIDER
// =============================================
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
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
function ThemeProvider({ children }) {
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
// NAVBAR COMPONENT
// =============================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useContext(CartContext);
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <a href="#home">HOME</a>
        <a href="#shop">SHOP</a>
        <a href="#about">ABOUT</a>
        <a href="#lookbook">LOOKBOOK</a>
      </div>
      <div className="logo">MAISON</div>
      <div className="nav-right">
        <button className="nav-icon" title="Search">
          🔍
        </button>
        <button
          className="nav-icon"
          onClick={() => setIsCartOpen(true)}
          title="Cart"
        >
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button className="nav-icon" title="Account">
          👤
        </button>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle Theme"
        />
      </div>
    </nav>
  );
}

// =============================================
// HERO COMPONENT
// =============================================
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <iframe
          src="https://www.youtube-nocookie.com/embed/YDErLmbjSRM?autoplay=1&mute=1&loop=1&playlist=YDErLmbjSRM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&fs=0&disablekb=1&origin=file://"
          title="MAISON Hero Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {/* Overlay to block YouTube end screen */}
        <div className="hero-video-overlay"></div>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <span>✨</span>
          <span>New Collection 2026</span>
        </div>
        <h1 className="hero-title">MAISON</h1>
        <p className="hero-subtitle">Premium Lifestyle Wear</p>
        <div className="hero-buttons">
          <a href="#shop" className="btn btn-primary">
            Shop Now
          </a>
          <a href="#about" className="btn btn-outline">
            Our Story
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// =============================================
// COLLECTION CARD COMPONENT
// =============================================
function CollectionCard({ collectionKey, data, onClick }) {
  return (
    <div className="collection-card" onClick={onClick}>
      <img src={data.image} alt={data.title} />
      <div className="collection-info">
        <h3 className="collection-name">{data.title}</h3>
        <p className="collection-desc">{data.description}</p>
        <span className="collection-count">
          {data.products.length} Products →
        </span>
      </div>
    </div>
  );
}

// =============================================
// COLLECTIONS SECTION
// =============================================
function Collections({ onOpenModal }) {
  return (
    <section className="collections" id="shop">
      <div className="section-header">
        <span className="section-tag">Discover</span>
        <h2 className="section-title">Featured Collections</h2>
        <div className="section-line" />
      </div>
      <div className="collection-grid">
        {Object.entries(collections).map(([key, data]) => (
          <CollectionCard
            key={key}
            collectionKey={key}
            data={data}
            onClick={() => onOpenModal(key)}
          />
        ))}
      </div>
    </section>
  );
}

// =============================================
// NEW ARRIVALS DATA
// =============================================
const newArrivalsData = [
  {
    id: 101,
    name: "Kasper Digi Waffle T-Shirt",
    price: 12990.43,
    size: "S, M, L, XL",
    stock: 10,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMT6381_3.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/12-12-25FLATS16.jpg?v=1765796400",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMT6381_1.jpg?v=1765796400"
    ],
    tag: "NEW",
    description: "เสื้อสเวตเตอร์"
  },
  {
    id: 102,
    name: "Shadow Studded Corset Top",
    price: 15490.76,
    size: "S, M, L, XL, XXL",
    stock: 10,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/11NOVWW0238.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/11NOVWW02636.jpg?v=1742381921",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/11NOVWW0261.jpg?v=1742381921"
    ],
    tag: "HOT",
    description: "เสื้อหนังสายเดี่ยว กระโปรงหนัง"
  },
  {
    id: 103,
    name: "Black Mist Mini Dress",
    price: 8990.90,
    size: "XS, S, M, L",
    stock: 10,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/Artboard1_89082489-8716-4060-b764-2095115259e3.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/Artboard2_bbd8f9a1-5df7-4352-858f-6753d0fe8dfa.jpg?v=1764686209",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/Artboard3_59f5cece-6486-4999-81ae-7fb38fcd13a7.jpg?v=1764686209"
    ],
    tag: "NEW",
    description: "มินิเดรสเกรดพรีเมี่ยม"
  },
  {
    id: 104,
    name: "Mendoza Faux Fur Jacket",
    price: 6490.87,
    size: "One Size",
    stock: 10,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/29SEP1629.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/29SEP1593.jpg?v=1696350547",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/29SEP1679.jpg?v=1696350547"
    ],
    tag: "SALE",
    description: "เสื้อกันหนาวขนสัตว์"
  }
];

// =============================================
// SIZE SELECTION MODAL COMPONENT
// =============================================
function SizeSelectionModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Parse sizes from the product's size string
  const getSizes = () => {
    if (!product.size) return [];
    if (product.size === "One Size" || product.size === "-") {
      return ["One Size"];
    }
    return product.size.split(",").map(s => s.trim());
  };
  
  const sizes = getSizes();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("size-modal-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({
        ...product,
        image: product.images ? product.images[0] : product.image,
        selectedSize: selectedSize
      });
      onClose();
    }
  };

  return (
    <div className="size-modal-overlay active" onClick={handleOverlayClick}>
      <div className="size-modal">
        <button className="size-modal-close" onClick={onClose}>×</button>
        
        <div className="size-modal-content">
          <div className="size-modal-image">
            <img 
              src={product.images ? product.images[0] : product.image} 
              alt={product.name} 
            />
          </div>
          
          <div className="size-modal-info">
            <h3 className="size-modal-title">{product.name}</h3>
            <p className="size-modal-price">{formatPrice(product.price)}</p>
            <p className="size-modal-stock">In Stock: {product.stock || 0}</p>
            
            <div className="size-selection">
              <p className="size-label">เลือกไซส์</p>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="size-hint">กรุณาเลือกไซส์ก่อนเพิ่มลงตะกร้า</p>
              )}
            </div>
            
            <button
              className={`size-add-btn ${!selectedSize ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              {selectedSize ? `Add to Cart - ${selectedSize}` : 'Please Select Size'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
// NEW ARRIVAL CARD COMPONENT
// =============================================
function NewArrivalCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    setShowSizeModal(true);
  };

  return (
    <>
      <div 
        className="new-arrival-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="new-arrival-image">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
          />
          <span className={`arrival-tag ${product.tag.toLowerCase()}`}>
            {product.tag}
          </span>
          
          {isHovered && product.images.length > 1 && (
            <>
              <button className="carousel-arrow left" onClick={prevImage}>
                ‹
              </button>
              <button className="carousel-arrow right" onClick={nextImage}>
                ›
              </button>
            </>
          )}
          
          <div className="image-dots">
            {product.images.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
          
          <button 
            className="arrival-add-to-cart"
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </button>
        </div>
        <div className="new-arrival-info">
          <h3 className="arrival-name">{product.name}</h3>
          <p className="arrival-desc">{product.description}</p>
          <span className="arrival-price">{formatPrice(product.price)}</span>
        </div>
      </div>
      
      {showSizeModal && (
        <SizeSelectionModal
          product={product}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}

// =============================================
// NEW ARRIVALS SECTION
// =============================================
function NewArrivals() {
  return (
    <section className="new-arrivals" id="new-arrivals">
      <div className="section-header">
        <span className="section-tag">Just In</span>
        <h2 className="section-title">New Arrivals</h2>
        <div className="section-line" />
      </div>
      <div className="arrivals-grid">
        {newArrivalsData.map((product) => (
          <NewArrivalCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// =============================================
// ABOUT SECTION
// =============================================
function About() {
  return (
    <section className="about" id="about">
      <div className="about-wrapper">
        <div className="about-image">
          <img
            src="https://a-static.besthdwallpaper.com/aespa-s-ningning-drama-album-the-giant-vers-shoot-wallpaper-2560x1600-123396_7.jpg"
            alt="About MAISON"
          />
        </div>
        <div className="about-content">
          <span className="section-tag">About Us</span>
          <h2 className="about-title">Our Story</h2>
          <p className="about-text">
            MAISON
            เป็นแบรนด์แฟชั่นพรีเมี่ยมที่มุ่งเน้นการสร้างสรรค์เสื้อผ้าคุณภาพสูง
            ด้วยการออกแบบที่เรียบง่ายแต่หรูหรา
            เราเชื่อว่าแฟชั่นที่ดีควรเป็นการแสดงออกถึงตัวตนที่แท้จริงของคุณ
            ทุกชิ้นงานของเราได้รับการคัดสรรวัสดุอย่างพิถีพิถัน
            และผลิตด้วยความใส่ใจในทุกรายละเอียด
          </p>
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-number">500+</div>
              <div className="feature-label">Products</div>
            </div>
            <div className="feature-item">
              <div className="feature-number">10K+</div>
              <div className="feature-label">Customers</div>
            </div>
            <div className="feature-item">
              <div className="feature-number">50+</div>
              <div className="feature-label">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================
// FOOTER COMPONENT
// =============================================
function Footer() {
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
            <a href="#" className="social-icon">
              📘
            </a>
            <a href="#" className="social-icon">
              📷
            </a>
            <a href="#" className="social-icon">
              🐦
            </a>
            <a href="#" className="social-icon">
              📺
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="#">Men's Collection</a>
            </li>
            <li>
              <a href="#">Women's Collection</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">New Arrivals</a>
            </li>
            <li>
              <a href="#">Sale</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Shipping Info</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Size Guide</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className="footer-column contact-column">
          <h4>ติดต่อเรา</h4>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <div className="contact-info">
                <span className="contact-label">ที่อยู่</span>
                <span>123 ถนนสุขุมวิท แขวงคลองตัน</span>
                <span>เขตคลองเตย กรุงเทพฯ 10110</span>
              </div>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <div className="contact-info">
                <span className="contact-label">โทรศัพท์</span>
                <a href="tel:+6621234567">02-123-4567</a>
                <a href="tel:+66812345678">081-234-5678</a>
              </div>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <div className="contact-info">
                <span className="contact-label">อีเมล</span>
                <a href="mailto:contact@maison.co.th">contact@maison.co.th</a>
              </div>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <div className="contact-info">
                <span className="contact-label">Line Official</span>
                <a href="https://line.me/ti/p/@maison">@maison</a>
              </div>
            </li>
            <li>
              <span className="contact-icon">🕐</span>
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

// =============================================
// PRODUCT CARD COMPONENT
// =============================================
function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { isLoggedIn, openAuthModal } = useContext(AuthContext);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  const wishlisted = isInWishlist(product.id);
  
  // Get current image based on selected color
  const hasColorVariants = product.colorVariants && product.colorVariants.length > 0;
  const currentImage = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].image 
    : product.image;
  const currentColorName = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].name 
    : product.color;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const handleAddToCartClick = () => {
    if (!isLoggedIn) {
      openAuthModal('menu');
      return;
    }
    setShowSizeModal(true);
  };

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      openAuthModal('menu');
      return;
    }
    toggleWishlist({
      ...product,
      selectedColor: currentColorName,
      image: currentImage,
    });
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={currentImage} alt={product.name} />
          <span className="product-badge">In Stock: {product.stock}</span>
          <button
            className={`product-wishlist ${wishlisted ? 'active' : ''}`}
            onClick={handleWishlistClick}
          >
            {wishlisted ? "❤️" : "🤍"}
          </button>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          
          {/* Color Selector */}
          {hasColorVariants && (
            <div className="color-selector">
              <span className="color-label">Color: {currentColorName}</span>
              <div className="color-options">
                {product.colorVariants.map((variant, index) => (
                  <button
                    key={variant.name}
                    className={`color-option ${selectedColorIndex === index ? 'active' : ''}`}
                    style={{ backgroundColor: variant.hex }}
                    onClick={() => setSelectedColorIndex(index)}
                    title={variant.name}
                  />
                ))}
              </div>
            </div>
          )}
          
          <ul className="product-details">
            <li>
              <span className="detail-label">Model</span>
              <span className="detail-value">{product.model}</span>
            </li>
            <li>
              <span className="detail-label">Size</span>
              <span className="detail-value">{product.size}</span>
            </li>
            <li>
              <span className="detail-label">Material</span>
              <span className="detail-value">{product.material}</span>
            </li>
          </ul>
          <div className="product-price">{formatPrice(product.price)}</div>
          <button className="add-to-cart" onClick={handleAddToCartClick}>
            Add to Cart
          </button>
        </div>
      </div>
      
      {showSizeModal && (
        <SizeSelectionModal
          product={{...product, image: currentImage, selectedColor: currentColorName}}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}

// =============================================
// PRODUCT MODAL COMPONENT
// =============================================
function ProductModal({ collectionKey, onClose }) {
  const collection = collections[collectionKey];

  if (!collection) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay active" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{collection.title}</h2>
            <p className="modal-subtitle">{collection.description}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="products-grid">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================
// CART SIDEBAR COMPONENT
// =============================================
function CartSidebar() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useContext(CartContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <div className={`cart-overlay ${isCartOpen ? "active" : ""}`}>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3 className="cart-title">Shopping Cart</h3>
          <button className="modal-close" onClick={() => setIsCartOpen(false)}>
            ×
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-price">{formatPrice(cartTotal)}</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// WISHLIST SIDEBAR COMPONENT
// =============================================
function WishlistSidebar() {
  const {
    wishlist,
    removeFromWishlist,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  if (!isWishlistOpen) return null;

  return (
    <div className={`wishlist-overlay ${isWishlistOpen ? "active" : ""}`}>
      <div className="wishlist-sidebar">
        <div className="wishlist-header">
          <h3 className="wishlist-title">❤️ My Wishlist ({wishlistCount})</h3>
          <button className="modal-close" onClick={() => setIsWishlistOpen(false)}>
            ×
          </button>
        </div>
        <div className="wishlist-items">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">💔</div>
              <p>Your wishlist is empty</p>
              <span className="wishlist-empty-hint">Click ❤️ on products you love!</span>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-item-image">
                  <img src={item.image || item.images?.[0]} alt={item.name} />
                </div>
                <div className="wishlist-item-info">
                  <h4 className="wishlist-item-name">{item.name}</h4>
                  <p className="wishlist-item-price">{formatPrice(item.price)}</p>
                  <button
                    className="wishlist-add-cart-btn"
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  className="wishlist-item-remove"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================
// AUTH MODAL COMPONENT
// =============================================
function AuthModal() {
  const {
    user,
    isLoggedIn,
    register,
    login,
    logout,
    isAuthModalOpen,
    authMode,
    setAuthMode,
    authError,
    setAuthError,
    closeAuthModal,
  } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    other: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [registerErrors, setRegisterErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setAuthError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setRegisterErrors({ ...registerErrors, [e.target.name]: '' });
    setAuthError('');
  };

  const validateRegister = () => {
    const errors = {};
    if (!registerData.firstName.trim()) errors.firstName = 'First name is required';
    if (!registerData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!registerData.phone.trim()) errors.phone = 'Phone is required';
    if (!registerData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) errors.email = 'Invalid email format';
    if (!registerData.address.trim()) errors.address = 'Address is required';
    if (!registerData.username.trim()) errors.username = 'Username is required';
    else if (registerData.username.length < 4) errors.username = 'Username must be at least 4 characters';
    if (!registerData.password) errors.password = 'Password is required';
    else if (registerData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setAuthError('Please enter username and password');
      return;
    }
    login(loginData.username, loginData.password);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateRegister()) {
      register(registerData);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('auth-overlay')) {
      closeAuthModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isAuthModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="auth-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button className="modal-close" onClick={closeAuthModal}>×</button>
        
        {/* Menu View */}
        {authMode === 'menu' && (
          <div className="auth-menu">
            <div className="auth-icon">👤</div>
            <h2 className="auth-title">Welcome to MAISON</h2>
            {isLoggedIn ? (
              <>
                <div className="auth-user-info">
                  <p className="user-greeting">Hello, <strong>{user.firstName}!</strong></p>
                  <p className="user-email">{user.email}</p>
                </div>
                <button className="auth-btn logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <p className="auth-subtitle">Sign in to add items to cart and wishlist</p>
                <button className="auth-btn signin-btn" onClick={() => setAuthMode('login')}>
                  Sign In
                </button>
                <button className="auth-btn register-btn" onClick={() => setAuthMode('register')}>
                  Create Account
                </button>
              </>
            )}
          </div>
        )}

        {/* Login View */}
        {authMode === 'login' && (
          <div className="auth-login">
            <button className="auth-back" onClick={() => setAuthMode('menu')}>← Back</button>
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">Enter your credentials</p>
            
            {authError && <div className="auth-error">{authError}</div>}
            
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="auth-submit-btn">
                Sign In
              </button>
            </form>
            
            <p className="auth-switch">
              Don't have an account?{' '}
              <button className="auth-link" onClick={() => setAuthMode('register')}>
                Create Account
              </button>
            </p>
          </div>
        )}

        {/* Register View */}
        {authMode === 'register' && (
          <div className="auth-register">
            <button className="auth-back" onClick={() => setAuthMode('menu')}>← Back</button>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Fill in your details</p>
            
            {authError && <div className="auth-error">{authError}</div>}
            
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    placeholder="First name"
                    className={registerErrors.firstName ? 'error' : ''}
                  />
                  {registerErrors.firstName && <span className="field-error">{registerErrors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    placeholder="Last name"
                    className={registerErrors.lastName ? 'error' : ''}
                  />
                  {registerErrors.lastName && <span className="field-error">{registerErrors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    placeholder="Phone number"
                    className={registerErrors.phone ? 'error' : ''}
                  />
                  {registerErrors.phone && <span className="field-error">{registerErrors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Email address"
                    className={registerErrors.email ? 'error' : ''}
                  />
                  {registerErrors.email && <span className="field-error">{registerErrors.email}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label>Shipping Address *</label>
                <textarea
                  name="address"
                  value={registerData.address}
                  onChange={handleRegisterChange}
                  placeholder="Enter your shipping address"
                  rows="2"
                  className={registerErrors.address ? 'error' : ''}
                />
                {registerErrors.address && <span className="field-error">{registerErrors.address}</span>}
              </div>
              
              <div className="form-group">
                <label>Other Information</label>
                <textarea
                  name="other"
                  value={registerData.other}
                  onChange={handleRegisterChange}
                  placeholder="Any special notes (optional)"
                  rows="2"
                />
              </div>
              
              <div className="form-divider">
                <span>Account Credentials</span>
              </div>
              
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  placeholder="Choose a username (min 4 characters)"
                  className={registerErrors.username ? 'error' : ''}
                />
                {registerErrors.username && <span className="field-error">{registerErrors.username}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Min 6 characters"
                    className={registerErrors.password ? 'error' : ''}
                  />
                  {registerErrors.password && <span className="field-error">{registerErrors.password}</span>}
                </div>
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Confirm password"
                    className={registerErrors.confirmPassword ? 'error' : ''}
                  />
                  {registerErrors.confirmPassword && <span className="field-error">{registerErrors.confirmPassword}</span>}
                </div>
              </div>
              
              <button type="submit" className="auth-submit-btn">
                Create Account
              </button>
            </form>
            
            <p className="auth-switch">
              Already have an account?{' '}
              <button className="auth-link" onClick={() => setAuthMode('login')}>
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// TOAST NOTIFICATION COMPONENT
// =============================================
function Toast() {
  const { toast } = useContext(CartContext);

  return (
    <div className={`toast ${toast.show ? "show" : ""}`}>
      <span className="toast-icon">✓</span>
      {toast.message}
    </div>
  );
}

// =============================================
// CHECKOUT MODAL COMPONENT
// =============================================
function CheckoutModal() {
  const { 
    cart, 
    cartTotal, 
    clearCart, 
    isCheckoutOpen, 
    setIsCheckoutOpen 
  } = useContext(CartContext);
  
  const [step, setStep] = useState(1); // 1: shipping, 2: payment, 3: success
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [formData, setFormData] = useState({
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
  
  const [errors, setErrors] = useState({});

  const shippingCost = cartTotal > 2000 ? 0 : 150;
  const discount = cartTotal > 5000 ? 500 : 0;
  const finalTotal = cartTotal + shippingCost - discount;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderNumber = 'ORD-' + Date.now().toString().slice(-8);
    setOrderNumber(newOrderNumber);
    setIsProcessing(false);
    setStep(3);
    clearCart();
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
                      <span className="payment-icon">💳</span>
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
                      <span className="payment-icon">📱</span>
                      <span className="payment-name">PromptPay QR Code</span>
                      <span className="payment-check">{paymentMethod === 'promptpay' ? '✓' : ''}</span>
                    </div>
                    {paymentMethod === 'promptpay' && (
                      <div className="promptpay-section">
                        <div className="qr-placeholder">
                          <div className="qr-code">
                            <div className="qr-pattern"></div>
                          </div>
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
                      <span className="payment-icon">💵</span>
                      <span className="payment-name">ชำระเงินปลายทาง (COD)</span>
                      <span className="payment-check">{paymentMethod === 'cod' ? '✓' : ''}</span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div className="cod-section">
                        <p className="cod-info">💡 ชำระเงินสดเมื่อได้รับสินค้า</p>
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
                  <p>📦 คาดว่าจะจัดส่งภายใน 3-5 วันทำการ</p>
                  <p>📧 เราจะแจ้งเลขพัสดุให้ทางอีเมล</p>
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
              <h3 className="summary-title">🛒 สรุปคำสั่งซื้อ</h3>
              
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
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>ส่วนลด</span>
                    <span>-{formatPrice(discount)}</span>
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
                  🎉 คุณได้รับฟรีค่าจัดส่ง!
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

// =============================================
// REGISTRATION FORM COMPONENT
// =============================================
function RegistrationForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    other: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter your first name";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Please enter your last name";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your shipping address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        other: "",
      });
      setSubmitSuccess(false);
      if (onClose) onClose();
    }, 2000);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("registration-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="registration-overlay active" onClick={handleOverlayClick}>
      <div className="registration-modal">
        <div className="registration-header">
          <div>
            <h2 className="registration-title">Register</h2>
            <p className="registration-subtitle">
              Fill in your information to receive exclusive benefits
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {submitSuccess ? (
          <div className="registration-success">
            <div className="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Thank you for joining MAISON</p>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0XX-XXX-XXXX"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Shipping Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your shipping address (Street, City, State, Postal Code)"
                rows="3"
                className={errors.address ? "error" : ""}
              />
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="other">Other (Additional Info)</label>
              <textarea
                id="other"
                name="other"
                value={formData.other}
                onChange={handleChange}
                placeholder="Additional notes, e.g., delivery instructions, specific interests, etc."
                rows="3"
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// =============================================
// SEARCH MODAL COMPONENT
// =============================================
function SearchModal({ onClose, onSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('search-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Combine all products for quick suggestions
  const allProducts = [
    ...collections.men.products,
    ...collections.women.products,
    ...collections.unisex.products,
  ];

  // Filter suggestions based on input
  const suggestions = searchInput.length > 1
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.model.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="search-overlay active" onClick={handleOverlayClick}>
      <div className="search-modal">
        <div className="search-header">
          <form onSubmit={handleSubmit} className="search-form">
            <span className="search-input-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
          <button className="search-close" onClick={onClose}>×</button>
        </div>
        
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            <p className="suggestions-title">Suggested Products</p>
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="suggestion-item"
                onClick={() => {
                  onSearch(product.name);
                  onClose();
                }}
              >
                <img src={product.image} alt={product.name} />
                <div className="suggestion-info">
                  <span className="suggestion-name">{product.name}</span>
                  <span className="suggestion-model">{product.model}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {searchInput.length === 0 && (
          <div className="search-popular">
            <p className="suggestions-title">Popular Categories</p>
            <div className="popular-tags">
              <button onClick={() => { onSearch('Jeans'); onClose(); }}>👖 Jeans</button>
              <button onClick={() => { onSearch('Sunglasses'); onClose(); }}>🕶️ Sunglasses</button>
              <button onClick={() => { onSearch('Jacket'); onClose(); }}>🧥 Jacket</button>
              <button onClick={() => { onSearch('Jordan'); onClose(); }}>👟 Jordan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// PRODUCT GALLERY COMPONENT
// =============================================
function ProductGallery({ onBack, initialSearchTerm = '', initialCategory = 'all' }) {
  const { addToCart } = useContext(CartContext);
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Update searchTerm when initialSearchTerm changes
  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  // Update activeFilter when initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setActiveFilter(initialCategory);
    }
  }, [initialCategory]);

  // Combine all products from all collections
  const allProducts = [
    ...collections.men.products.map((p) => ({ ...p, category: "men" })),
    ...collections.women.products.map((p) => ({ ...p, category: "women" })),
    ...collections.unisex.products.map((p) => ({ ...p, category: "unisex" })),
  ];

  // Filter products
  let filteredProducts = allProducts.filter((product) => {
    const matchesFilter =
      activeFilter === "all" || product.category === activeFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
  };

  const filters = [
    { key: "all", label: "All", count: allProducts.length },
    { key: "men", label: "Men's", count: collections.men.products.length },
    {
      key: "women",
      label: "Women's",
      count: collections.women.products.length,
    },
    {
      key: "unisex",
      label: "Unisex",
      count: collections.unisex.products.length,
    },
  ];

  return (
    <>
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <button className="back-btn" onClick={onBack}>
                      ← Back to Home
          </button>
          <div className="section-header">
            <span className="section-tag">Shop</span>
            <h2 className="section-title">Product Gallery</h2>
            <div className="section-line" />
          </div>
        </div>

        <div className="gallery-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={`filter-btn ${
                  activeFilter === filter.key ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
                <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </div>

          <div className="sort-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low - High</option>
              <option value="price-high">Price: High - Low</option>
              <option value="name">Name: A - Z</option>
            </select>
          </div>
        </div>

        <div className="gallery-results">
          <p>Showing {filteredProducts.length} items</p>
        </div>

        <div className="gallery-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="gallery-card">
              <div className="gallery-card-image">
                <img src={product.image} alt={product.name} />
                <span className={`category-badge ${product.category}`}>
                  {product.category === "men"
                    ? "Men's"
                    : product.category === "women"
                    ? "Women's"
                    : "Unisex"}
                </span>
                <button className="quick-add" onClick={() => handleAddToCartClick(product)}>
                  + Add to Cart
                </button>
              </div>
              <div className="gallery-card-info">
                <h3 className="gallery-card-name">{product.name}</h3>
                <p className="gallery-card-model">{product.model}</p>
                <div className="gallery-card-footer">
                  <span className="gallery-card-price">
                    {formatPrice(product.price)}
                  </span>
                  <span className="gallery-card-stock">
                    In Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try a different search term or select another category</p>
          </div>
        )}
      </section>
      
      {selectedProduct && (
        <SizeSelectionModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}

// =============================================
// MAIN APP COMPONENT
// =============================================
function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('all');

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToCategory = (category) => {
    setGalleryCategory(category);
    setGlobalSearchTerm('');
    navigateTo('gallery');
  };

  const handleGlobalSearch = (term) => {
    setGlobalSearchTerm(term);
    setGalleryCategory('all');
    navigateTo('gallery');
  };

  return (
    <ThemeProvider>
      <CartProvider>
      <WishlistProvider>
      <AuthProvider>
        <div className="app">
          <NavbarWithPages
            currentPage={currentPage}
            onNavigate={navigateTo}
            onNavigateCategory={navigateToCategory}
            onShowSearch={() => setShowSearch(true)}
          />

          {currentPage === "home" && (
            <>
              <Hero />
              <Collections onOpenModal={setActiveModal} />
              <NewArrivals />
              <About />
            </>
          )}

          {currentPage === "gallery" && (
            <ProductGallery 
              onBack={() => {
                setGlobalSearchTerm('');
                setGalleryCategory('all');
                navigateTo("home");
              }}
              initialSearchTerm={globalSearchTerm}
              initialCategory={galleryCategory}
            />
          )}

          <Footer onNavigate={navigateTo} />

          {activeModal && (
            <ProductModal
              collectionKey={activeModal}
              onClose={() => setActiveModal(null)}
            />
          )}

          {showSearch && (
            <SearchModal
              onClose={() => setShowSearch(false)}
              onSearch={handleGlobalSearch}
            />
          )}

          <CartSidebar />
          <WishlistSidebar />
          <AuthModal />
          <CheckoutModal />
          <Toast />
        </div>
      </AuthProvider>
      </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

// =============================================
// NAVBAR WITH PAGES COMPONENT
// =============================================
function NavbarWithPages({ currentPage, onNavigate, onNavigateCategory, onShowSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useContext(CartContext);
  const { toggleTheme, isDark } = useContext(ThemeContext);
  const { wishlistCount, setIsWishlistOpen } = useContext(WishlistContext);
  const { isLoggedIn, openAuthModal, user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      {/* Main Navigation Row */}
      <nav className="main-nav">
        <div className="main-nav-left">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰ <span>MENU</span>
          </button>
        </div>
        
        <div
          className="logo"
          onClick={() => onNavigate("home")}
          style={{ cursor: "pointer" }}
        >
          MAISON
        </div>
        
        <div className="main-nav-right">
          <button className="nav-icon lang-btn" title="Language">
            🌐 <span className="lang-text">TH ▾</span>
          </button>
          <button className="nav-icon" title="Search" onClick={onShowSearch}>
            🔍
          </button>
          <button
            className="nav-icon wishlist-btn"
            title="Wishlist"
            onClick={() => setIsWishlistOpen(true)}
          >
            ❤️
            {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </button>
          <button
            className={`nav-icon account-btn ${isLoggedIn ? 'logged-in' : ''}`}
            title={isLoggedIn ? `Hi, ${user.firstName}` : 'Account'}
            onClick={() => openAuthModal('menu')}
          >
            👤
            {isLoggedIn && <span className="login-indicator"></span>}
          </button>
          <button
            className="nav-icon cart-btn"
            onClick={() => setIsCartOpen(true)}
            title="Cart"
          >
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle Theme"
          />
        </div>
      </nav>

      {/* Secondary Navigation Row - Hides on scroll */}
      <nav className={`secondary-nav ${scrolled ? "hidden" : ""}`}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("women");
          }}
        >
          WOMENS+
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("men");
          }}
        >
          MENS+
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("unisex");
          }}
        >
          UNISEX+
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateCategory("all");
          }}
          className="sale-link"
        >
          🔥 FINAL SALE
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlistOpen(true);
          }}
          className="wishlist-link"
        >
          ❤️ WISHLIST
        </a>
        <a href="#about">ABOUT US</a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onShowRegistration();
          }}
        >
          CONTACT US
        </a>
        <a href="#faq">FAQ</a>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>×</button>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); setMenuOpen(false); }}>🏠 HOME</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("gallery"); setMenuOpen(false); }}>👗 WOMENS</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("gallery"); setMenuOpen(false); }}>👔 MENS</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("gallery"); setMenuOpen(false); }}>🏷️ BRANDS</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("gallery"); setMenuOpen(false); }}>🔥 FINAL SALE</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>ℹ️ ABOUT US</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onShowRegistration(); setMenuOpen(false); }}>📞 CONTACT US</a>
          </div>
        </div>
      )}
    </header>
  );
}

// =============================================
// RENDER APP
// =============================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
