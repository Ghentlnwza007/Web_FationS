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
      {
        id: 101,
        name: "Kasper Digi Waffle T-Shirt",
        price: 12990.43,
        model: "Digi Waffle Premium",
        size: "S, M, L, XL",
        material: "100% Cotton Waffle Knit",
        color: "Cream",
        stock: 10,
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMT6381_3.jpg",
        colorVariants: [
          { name: "Cream", hex: "#f5f5dc", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMT6381_3.jpg" },
        ],
        tag: "NEW",
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
      {
        id: 102,
        name: "Shadow Studded Corset Top",
        price: 15490.76,
        model: "Studded Leather Corset",
        size: "S, M, L, XL, XXL",
        material: "Premium Leather with Metal Studs",
        color: "Black",
        stock: 10,
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/11NOVWW0238.jpg",
        colorVariants: [
          { name: "Black", hex: "#1a1a1a", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/11NOVWW0238.jpg" },
        ],
        tag: "HOT",
      },
      {
        id: 103,
        name: "Black Mist Mini Dress",
        price: 8990.90,
        model: "Mist Collection",
        size: "XS, S, M, L",
        material: "Premium Stretch Fabric",
        color: "Black",
        stock: 10,
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/Artboard1_89082489-8716-4060-b764-2095115259e3.jpg",
        colorVariants: [
          { name: "Black", hex: "#0d0d0d", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/Artboard1_89082489-8716-4060-b764-2095115259e3.jpg" },
        ],
        tag: "NEW",
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
      {
        id: 104,
        name: "Mendoza Faux Fur Jacket",
        price: 6490.87,
        model: "Mendoza Collection",
        size: "One Size",
        material: "High-Quality Faux Fur",
        color: "Brown",
        stock: 10,
        image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/29SEP1629.jpg",
        colorVariants: [
          { name: "Brown", hex: "#8d6e63", image: "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/29SEP1629.jpg" },
        ],
        tag: "SALE",
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
const CurrencyContext = createContext();

// =============================================
// CURRENCY PROVIDER
// =============================================
const EXCHANGE_RATE = 0.029; // 1 THB = 0.029 USD

function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('THB');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        isDropdownOpen,
        setIsDropdownOpen,
        toggleCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

// =============================================
// AUTH PROVIDER (Firebase)
// =============================================
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('menu'); // 'menu', 'login', 'register'
  const [authError, setAuthError] = useState('');

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        try {
          const userDoc = await db.collection('users').doc(firebaseUser.uid).get();
          if (userDoc.exists) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data()
            });
          } else {
            // User exists in Auth but not in Firestore (e.g., Google sign-in first time)
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firebaseUser.displayName?.split(' ')[1] || ''
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            firstName: 'User'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
function WishlistProvider({ children }) {
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
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const { user } = useContext(AuthContext);

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (user?.id) {
      const unsubscribe = db.collection('carts').doc(user.id)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setCart(doc.data().items || []);
          } else {
            setCart([]);
          }
        }, (error) => {
          console.error("Error loading cart:", error);
        });
      
      return () => unsubscribe();
    } else {
      setCart([]);
    }
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
// FINAL SALE PRODUCTS DATA (20% OFF)
// =============================================
const saleProductsData = [
  {
    id: 201,
    name: "Vintage Denim Jacket",
    originalPrice: 5990.00,
    price: 4792.00, // 20% off
    size: "S, M, L, XL",
    stock: 5,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JADEDMAN23MAY73480.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMJK4056_F1_0725.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMDJ6064_F1_1125.jpg"
    ],
    discount: 20,
    description: "เสื้อแจ็คเก็ตยีนส์วินเทจสไตล์"
  },
  {
    id: 202,
    name: "Premium Leather Belt",
    originalPrice: 2490.00,
    price: 1992.00, // 20% off
    size: "S, M, L",
    stock: 8,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/JMA6231_F1_0925.jpg?v=1760096508",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMA6231_F1_0925edited.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/FLAT6.jpg"
    ],
    discount: 20,
    description: "เข็มขัดหนังพรีเมี่ยมคุณภาพสูง"
  },
  {
    id: 203,
    name: "Oversized Graphic Tee",
    originalPrice: 1890.00,
    price: 1512.00, // 20% off
    size: "M, L, XL, XXL",
    stock: 12,
    images: [
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1600,c_limit/shopi///cdn/shop/files/15JANWWECCOM1292.jpg?v=1737996348",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/Artboard1_a7af62d9-1df2-4e06-a649-003dee60d630.jpg",
      "https://assets.jadedldn.com/image/upload/e_sharpen:50,w_1000,c_limit/shopi///cdn/shop/files/JMT6381_3.jpg"
    ],
    discount: 20,
    description: "เสื้อยืดโอเวอร์ไซส์กราฟิก"
  }
];

// =============================================
// SIZE SELECTION MODAL COMPONENT
// =============================================
function SizeSelectionModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const { formatPrice } = useContext(CurrencyContext);
  
  // Parse sizes from the product's size string
  const getSizes = () => {
    if (!product.size) return [];
    if (product.size === "One Size" || product.size === "-") {
      return ["One Size"];
    }
    return product.size.split(",").map(s => s.trim());
  };
  
  const sizes = getSizes();

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
  const { formatPrice } = useContext(CurrencyContext);
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
// SALE PRODUCT CARD COMPONENT
// =============================================
function SaleProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { formatPrice } = useContext(CurrencyContext);
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

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    setShowSizeModal(true);
  };

  return (
    <>
      <div 
        className="sale-product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="sale-product-image">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
          />
          <span className="sale-discount-tag">-{product.discount}%</span>
          
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
            className="sale-add-to-cart"
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </button>
        </div>
        <div className="sale-product-info">
          <h3 className="sale-product-name">{product.name}</h3>
          <p className="sale-product-desc">{product.description}</p>
          <div className="sale-price-container">
            <span className="sale-original-price">{formatPrice(product.originalPrice)}</span>
            <span className="sale-discounted-price">{formatPrice(product.price)}</span>
          </div>
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
// FINAL SALE PAGE COMPONENT
// =============================================
function FinalSalePage({ onBack }) {
  return (
    <section className="final-sale-page">
      <div className="sale-page-header">
        <button className="back-button" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
        <div className="sale-banner">
          <span className="sale-badge">FINAL SALE</span>
          <h1 className="sale-title">🔥 Special Discount 20% OFF 🔥</h1>
          <p className="sale-subtitle">สินค้าลดราคาพิเศษ จำนวนจำกัด!</p>
        </div>
      </div>
      
      <div className="sale-products-grid">
        {saleProductsData.map((product) => (
          <SaleProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// =============================================
// ABOUT SECTION
// =============================================
function About() {
  const [showCreators, setShowCreators] = useState(false);

  const creators = [
    {
      id: 1,
      name: "ผู้จัดทำคนที่ 1",
      role: "Lead Developer & Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "รับผิดชอบการพัฒนาระบบ Front-end และออกแบบ UI/UX ของเว็บไซต์",
      skills: ["React", "JavaScript", "CSS", "UI Design"]
    },
    {
      id: 2,
      name: "ผู้จัดทำคนที่ 2",
      role: "Backend Developer & Project Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      description: "รับผิดชอบการพัฒนาระบบ Backend และจัดการโปรเจกต์",
      skills: ["Node.js", "Database", "API", "Project Management"]
    }
  ];

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
      
      {/* MORE Button */}
      <div className="more-section">
        <button 
          className={`more-btn ${showCreators ? 'active' : ''}`}
          onClick={() => setShowCreators(!showCreators)}
        >
          <span>{showCreators ? 'CLOSE' : 'MORE'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={showCreators ? 'rotate' : ''}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        
        {/* Creators Section */}
        <div className={`creators-panel ${showCreators ? 'open' : ''}`}>
          <div className="creators-header">
            <h3>ผู้จัดทำโปรเจกต์</h3>
            <p>พบกับทีมผู้พัฒนาเว็บไซต์ MAISON</p>
          </div>
          <div className="creators-grid">
            {creators.map((creator) => (
              <div key={creator.id} className="creator-card">
                <div className="creator-image">
                  <img src={creator.image} alt={creator.name} />
                </div>
                <div className="creator-info">
                  <h4 className="creator-name">{creator.name}</h4>
                  <span className="creator-role">{creator.role}</span>
                  <p className="creator-description">{creator.description}</p>
                  <div className="creator-skills">
                    {creator.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
            <a href="#" className="social-icon" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="social-icon" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-icon" title="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="social-icon" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
              <span className="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
              <div className="contact-info">
                <span className="contact-label">ที่อยู่</span>
                <span>123 ถนนสุขุมวิท แขวงคลองตัน</span>
                <span>เขตคลองเตย กรุงเทพฯ 10110</span>
              </div>
            </li>
            <li>
              <span className="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              <div className="contact-info">
                <span className="contact-label">โทรศัพท์</span>
                <a href="tel:+6621234567">02-123-4567</a>
                <a href="tel:+66812345678">081-234-5678</a>
              </div>
            </li>
            <li>
              <span className="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
              <div className="contact-info">
                <span className="contact-label">อีเมล</span>
                <a href="mailto:contact@maison.co.th">contact@maison.co.th</a>
              </div>
            </li>
            <li>
              <span className="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
              <div className="contact-info">
                <span className="contact-label">Line Official</span>
                <a href="https://line.me/ti/p/@maison">@maison</a>
              </div>
            </li>
            <li>
              <span className="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
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
  const { formatPrice } = useContext(CurrencyContext);
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
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
  const { formatPrice } = useContext(CurrencyContext);

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
              <div className="cart-empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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
  const { formatPrice } = useContext(CurrencyContext);

  if (!isWishlistOpen) return null;

  return (
    <div className={`wishlist-overlay ${isWishlistOpen ? "active" : ""}`}>
      <div className="wishlist-sidebar">
        <div className="wishlist-header">
          <h3 className="wishlist-title"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', display: 'inline'}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> My Wishlist ({wishlistCount})</h3>
          <button className="modal-close" onClick={() => setIsWishlistOpen(false)}>
            ×
          </button>
        </div>
        <div className="wishlist-items">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
              </div>
              <p>Your wishlist is empty</p>
              <span className="wishlist-empty-hint">Click the heart icon on products you love!</span>
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
    loginWithGoogle,
    logout,
    isAuthModalOpen,
    authMode,
    setAuthMode,
    authError,
    setAuthError,
    closeAuthModal,
  } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setAuthError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    await login(loginData.email, loginData.password);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (validateRegister()) {
      await register(registerData);
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
                <button className="auth-btn profile-btn" onClick={() => setAuthMode('profile')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  View Profile
                </button>
                <button className="auth-btn logout-btn" onClick={logout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
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

        {/* Profile View */}
        {authMode === 'profile' && isLoggedIn && (
          <div className="auth-profile">
            <button className="auth-back" onClick={() => setAuthMode('menu')}>← Back</button>
            <div className="profile-header">
              <div className="profile-avatar">
                {user.firstName?.charAt(0).toUpperCase()}{user.lastName?.charAt(0).toUpperCase() || ''}
              </div>
              <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
            
            <div className="profile-details">
              <h3 className="profile-section-title">ข้อมูลส่วนตัว</h3>
              
              <div className="profile-item">
                <span className="profile-label">ชื่อ-นามสกุล</span>
                <span className="profile-value">{user.firstName} {user.lastName}</span>
              </div>
              
              <div className="profile-item">
                <span className="profile-label">อีเมล</span>
                <span className="profile-value">{user.email}</span>
              </div>
              
              {user.phone && (
                <div className="profile-item">
                  <span className="profile-label">เบอร์โทรศัพท์</span>
                  <span className="profile-value">{user.phone}</span>
                </div>
              )}
              
              {user.address && (
                <div className="profile-item">
                  <span className="profile-label">ที่อยู่จัดส่ง</span>
                  <span className="profile-value">{user.address}</span>
                </div>
              )}
              
              {user.username && (
                <div className="profile-item">
                  <span className="profile-label">Username</span>
                  <span className="profile-value">{user.username}</span>
                </div>
              )}
              
              <div className="profile-item">
                <span className="profile-label">สมาชิกตั้งแต่</span>
                <span className="profile-value">
                  {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'ไม่ระบุ'}
                </span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="auth-btn logout-btn" onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Login View */}
        {authMode === 'login' && (
          <div className="auth-login">
            <button className="auth-back" onClick={() => setAuthMode('menu')}>← Back</button>
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">กรอกอีเมลและรหัสผ่านของคุณ</p>
            
            {authError && <div className="auth-error">{authError}</div>}
            
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter email"
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
            
            <div className="auth-divider">
              <span>หรือ</span>
            </div>
            
            <button className="google-signin-btn" onClick={handleGoogleLogin}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            
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
            <span className="search-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
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
              <button onClick={() => { onSearch('Jeans'); onClose(); }}>◆ Jeans</button>
              <button onClick={() => { onSearch('Sunglasses'); onClose(); }}>◎ Sunglasses</button>
              <button onClick={() => { onSearch('Jacket'); onClose(); }}>◇ Jacket</button>
              <button onClick={() => { onSearch('Jordan'); onClose(); }}>★ Jordan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// GALLERY PRODUCT CARD COMPONENT (with color selector)
// =============================================
function GalleryProductCard({ product, formatPrice, onAddToCart }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { isLoggedIn, openAuthModal } = useContext(AuthContext);
  
  const wishlisted = isInWishlist(product.id);
  
  // Get current image based on selected color
  const hasColorVariants = product.colorVariants && product.colorVariants.length > 0;
  const currentImage = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].image 
    : product.image;
  const currentColorName = hasColorVariants 
    ? product.colorVariants[selectedColorIndex].name 
    : product.color;

  const handleAddToCartClick = () => {
    // Pass the product with current selected color/image
    onAddToCart({
      ...product,
      image: currentImage,
      selectedColor: currentColorName,
    });
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
    <div className="gallery-card">
      <div className="gallery-card-image">
        <img src={currentImage} alt={product.name} />
        <span className={`category-badge ${product.category}`}>
          {product.category === "men"
            ? "Men's"
            : product.category === "women"
            ? "Women's"
            : "Unisex"}
        </span>
        {product.tag && (
          <span className={`gallery-tag ${product.tag.toLowerCase()}`}>
            {product.tag}
          </span>
        )}
        {/* Wishlist Button */}
        <button
          className={`gallery-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button className="quick-add" onClick={handleAddToCartClick}>
          + Add to Cart
        </button>
      </div>
      <div className="gallery-card-info">
        <h3 className="gallery-card-name">{product.name}</h3>
        <p className="gallery-card-model">{product.model}</p>
        
        {/* Color Selector - Show for all products with colorVariants */}
        {hasColorVariants && (
          <div className="gallery-color-selector">
            <span className="gallery-color-label">Color: {currentColorName}</span>
            <div className="gallery-color-options">
              {product.colorVariants.map((variant, index) => (
                <button
                  key={variant.name}
                  className={`gallery-color-option ${selectedColorIndex === index ? 'active' : ''}`}
                  style={{ backgroundColor: variant.hex }}
                  onClick={() => setSelectedColorIndex(index)}
                  title={variant.name}
                />
              ))}
            </div>
          </div>
        )}
        
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
  );
}

// =============================================
// PRODUCT GALLERY COMPONENT
// ==============================================
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

  const { formatPrice } = useContext(CurrencyContext);

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
            <span className="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
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
          {filteredProducts.map((product, index) => (
            <GalleryProductCard 
              key={`${product.id}-${index}`} 
              product={product} 
              formatPrice={formatPrice}
              onAddToCart={handleAddToCartClick}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
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
      <CurrencyProvider>
      <AuthProvider>
      <CartProvider>
      <WishlistProvider>
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

          {currentPage === "sale" && (
            <FinalSalePage onBack={() => navigateTo("home")} />
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
      </WishlistProvider>
      </CartProvider>
      </AuthProvider>
      </CurrencyProvider>
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
  const { currency, toggleCurrency, isDropdownOpen, setIsDropdownOpen } = useContext(CurrencyContext);

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
          <div className="currency-selector">
            <button 
              className="nav-icon currency-btn" 
              title="Currency"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="currency-text">{currency === 'THB' ? '฿ THB' : '$ USD'} ▾</span>
            </button>
            {isDropdownOpen && (
              <div className="currency-dropdown">
                <button 
                  className={`currency-option ${currency === 'THB' ? 'active' : ''}`}
                  onClick={() => toggleCurrency('THB')}
                >
                  <span className="currency-symbol">฿</span>
                  <span className="currency-name">THB - Thai Baht</span>
                </button>
                <button 
                  className={`currency-option ${currency === 'USD' ? 'active' : ''}`}
                  onClick={() => toggleCurrency('USD')}
                >
                  <span className="currency-symbol">$</span>
                  <span className="currency-name">USD - US Dollar</span>
                </button>
              </div>
            )}
          </div>
          <button className="nav-icon" title="Search" onClick={onShowSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button
            className="nav-icon wishlist-btn"
            title="Wishlist"
            onClick={() => setIsWishlistOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </button>
          <button
            className={`nav-icon account-btn ${isLoggedIn ? 'logged-in' : ''}`}
            title={isLoggedIn ? `Hi, ${user.firstName}` : 'Account'}
            onClick={() => openAuthModal('menu')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {isLoggedIn && <span className="login-indicator"></span>}
          </button>
          <button
            className="nav-icon cart-btn"
            onClick={() => setIsCartOpen(true)}
            title="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
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
            onNavigate("sale");
          }}
          className="sale-link"
        >
          ◆ FINAL SALE
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlistOpen(true);
          }}
          className="wishlist-link"
        >
          ♥ WISHLIST
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
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); setMenuOpen(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '12px', verticalAlign: 'middle'}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              HOME
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("women"); setMenuOpen(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '12px', verticalAlign: 'middle'}}><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/></svg>
              WOMENS
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("men"); setMenuOpen(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '12px', verticalAlign: 'middle'}}><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"/></svg>
              MENS
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory("all"); setMenuOpen(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '12px', verticalAlign: 'middle'}}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              BRANDS
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("sale"); setMenuOpen(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '12px', verticalAlign: 'middle'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              FINAL SALE
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '12px', verticalAlign: 'middle'}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              ABOUT US
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '12px', verticalAlign: 'middle'}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              CONTACT US
            </a>
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
