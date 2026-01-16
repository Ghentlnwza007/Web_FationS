// =============================================
// MAISON - Premium Lifestyle Wear
// React Application with Modern UI
// =============================================

const { useState, useEffect, createContext, useContext } = React;
const { createPortal } = ReactDOM;

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
        id: 201,                                  // แก้ไข ID ไม่ให้ซ้ำกับ men collection
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
        id: 601,                                    // ID ไม่ซ้ำกัน
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
        id: 602,
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
        id: 1101,
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
        id: 1102,
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
        id: 1103,
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
  sports: {
    title: "Sports & Lifestyle",
    description: "คอลเลคชั่นสปอร์ตและไลฟ์สไตล์",
    image:
      "https://backend.liverpoolfc.com/sites/default/files/styles/lg/public/2025-08/lfc-adidas-kit-players-gallery-290725-_%285%29_aa98730959953c4ca02084644878a82b.webp?itok=E8bSx0tx&width=1680",
    products: [
      {
        id: 301,
        name: "Premium Running Sneakers",
        price: 4990.00,
        model: "Air Flow X",
        size: "39, 40, 41, 42, 43, 44",
        material: "Mesh & Synthetic",
        color: "White/Black, Red/White",
        stock: 15,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        colorVariants: [
          { name: "White/Black", hex: "#ffffff", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" },
          { name: "Red/White", hex: "#e53935", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800" },
        ],
        tag: "NEW",
      },
      {
        id: 302,
        name: "Athletic Performance Hoodie",
        price: 2490.00,
        model: "Comfort Fit",
        size: "S, M, L, XL, XXL",
        material: "Cotton Blend with DryFit",
        color: "Black, Gray, Navy",
        stock: 20,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
        colorVariants: [
          { name: "Black", hex: "#212121", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800" },
          { name: "Gray", hex: "#9e9e9e", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800" },
        ],
      },
      {
        id: 303,
        name: "Premium Jogger Pants",
        price: 1890.00,
        model: "Flex Motion",
        size: "S, M, L, XL",
        material: "Stretch Cotton",
        color: "Black, Olive",
        stock: 18,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800",
        colorVariants: [
          { name: "Black", hex: "#212121", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800" },
          { name: "Olive", hex: "#6d7c4e", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800" },
        ],
      },
      {
        id: 304,
        name: "Sports Duffle Bag",
        price: 2290.00,
        model: "Gym Essential",
        size: "50x30x25 cm",
        material: "Durable Nylon",
        color: "Black, Navy",
        stock: 12,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        colorVariants: [
          { name: "Black", hex: "#212121", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800" },
        ],
      },
      {
        id: 305,
        name: "Training Tank Top",
        price: 890.00,
        model: "Breathe Tech",
        size: "S, M, L, XL",
        material: "Quick-Dry Polyester",
        color: "White, Black, Blue",
        stock: 25,
        image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
        colorVariants: [
          { name: "White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800" },
          { name: "Black", hex: "#212121", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800" },
        ],
        tag: "HOT",
      },
      {
        id: 306,
        name: "Performance Compression Shorts",
        price: 1290.00,
        model: "Pro Stretch",
        size: "S, M, L, XL",
        material: "Spandex Blend",
        color: "Black, Gray",
        stock: 20,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
        colorVariants: [
          { name: "Black", hex: "#212121", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800" },
        ],
      },
    ],
  },
};

// =============================================
// ERROR BOUNDARY COMPONENT
// =============================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h1>เกิดข้อผิดพลาด</h1>
            <p>ขออภัย เกิดปัญหาบางอย่างขึ้น กรุณาลองใหม่อีกครั้ง</p>
            <button className="error-reload-btn" onClick={this.handleReload}>
              🔄 โหลดหน้าใหม่
            </button>
            {this.state.error && (
              <details className="error-details">
                <summary>รายละเอียดข้อผิดพลาด (สำหรับนักพัฒนา)</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// =============================================
// CONTEXTS
// ==============================================
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
  const modalRef = React.useRef(null);
  const firstFocusableRef = React.useRef(null);
  
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

  // Focus trap and keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    // Store previous focus
    const previousFocus = document.activeElement;
    
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    // Focus first focusable element
    setTimeout(() => {
      if (firstFocusableRef.current) {
        firstFocusableRef.current.focus();
      }
    }, 100);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      // Return focus to previous element
      if (previousFocus) {
        previousFocus.focus();
      }
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

  // Use createPortal to render modal directly to document.body
  // This ensures the modal is positioned relative to viewport, not parent containers
  return createPortal(
    <div 
      className="size-modal-overlay active" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-modal-title"
    >
      <div className="size-modal" ref={modalRef}>
        <button 
          className="size-modal-close" 
          onClick={onClose}
          aria-label="ปิดหน้าต่างเลือกไซส์"
          ref={firstFocusableRef}
        >×</button>
        
        <div className="size-modal-content">
          <div className="size-modal-image">
            <img 
              src={product.images ? product.images[0] : product.image} 
              alt={`รูปภาพสินค้า ${product.name}`} 
            />
          </div>
          
          <div className="size-modal-info">
            <h3 className="size-modal-title" id="size-modal-title">{product.name}</h3>
            <p className="size-modal-price">{formatPrice(product.price)}</p>
            <p className="size-modal-stock">In Stock: {product.stock || 0}</p>
            
            <div className="size-selection" role="group" aria-label="เลือกไซส์สินค้า">
              <p className="size-label" id="size-group-label">เลือกไซส์</p>
              <div className="size-options" role="radiogroup" aria-labelledby="size-group-label">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`ไซส์ ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="size-hint" role="alert">กรุณาเลือกไซส์ก่อนเพิ่มลงตะกร้า</p>
              )}
            </div>
            
            <button
              className={`size-add-btn ${!selectedSize ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!selectedSize}
              aria-label={selectedSize ? `เพิ่มสินค้าไซส์ ${selectedSize} ลงตะกร้า` : 'กรุณาเลือกไซส์ก่อน'}
            >
              {selectedSize ? `Add to Cart - ${selectedSize}` : 'Please Select Size'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
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
      name: "Mr.Kantawan Maisonklang",
      role: "Lead Developer & Designer",
      image: "data:image/jpeg;base64,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",
      description: "รับผิดชอบการพัฒนาระบบ Front-end และออกแบบ UI/UX ของเว็บไซต์",
      skills: ["React", "JavaScript", "CSS", "UI Design"]
    },
    {
      id: 2,
      name: "Mr.Thanaphat Wibakthaisong",
      role: "Backend Developer & Project Manager",
      image: "data:image/jpeg;base64,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",
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
  const { addToCompare, isInCompare } = useContext(CompareContext);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  const wishlisted = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  
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
    // Add to recently viewed
    addToRecentlyViewed({...product, image: currentImage});
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

  const handleCompareClick = () => {
    addToCompare({...product, image: currentImage});
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
          {/* Quick action buttons */}
          <div className="product-quick-actions">
            <button 
              className={`quick-action-btn compare ${inCompare ? 'active' : ''}`} 
              onClick={handleCompareClick}
              title={inCompare ? 'ในรายการเปรียบเทียบ' : 'เปรียบเทียบ'}
            >
              📊
            </button>
            <button 
              className="quick-action-btn share" 
              onClick={() => setShowShareMenu(!showShareMenu)}
              title="แชร์"
            >
              📤
            </button>
          </div>
          {/* Share dropdown */}
          {showShareMenu && (
            <div className="share-dropdown">
              <ShareButtons product={{...product, image: currentImage}} />
            </div>
          )}
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
          <div className="product-actions">
            <button className="add-to-cart" onClick={handleAddToCartClick}>
              Add to Cart
            </button>
            <button className="review-btn" onClick={() => setShowReviewModal(true)} title="รีวิวสินค้า">
              ⭐ Reviews
            </button>
          </div>
        </div>
      </div>
      
      {showSizeModal && (
        <SizeSelectionModal
          product={{...product, image: currentImage, selectedColor: currentColorName}}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={addToCart}
        />
      )}
      
      {showReviewModal && (
        <ReviewModal
          product={{...product, image: currentImage}}
          onClose={() => setShowReviewModal(false)}
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
  const [firestoreProducts, setFirestoreProducts] = useState([]);

  // Load products from Firestore for this collection
  useEffect(() => {
    const loadFirestoreProducts = async () => {
      try {
        const snapshot = await db.collection('products')
          .where('collection', '==', collectionKey)
          .get();
        const products = snapshot.docs.map(doc => ({
          id: `fs-${doc.id}`,
          ...doc.data(),
          model: doc.data().model || doc.data().name,
          colorVariants: doc.data().colorVariants || [
            { name: doc.data().color || 'Default', hex: '#888888', image: doc.data().image }
          ]
        }));
        setFirestoreProducts(products);
      } catch (error) {
        console.log("Error loading Firestore products:", error);
      }
    };
    if (collectionKey) {
      loadFirestoreProducts();
    }
  }, [collectionKey]);

  if (!collection) return null;

  // Combine hardcoded products with Firestore products
  const allProducts = [...collection.products, ...firestoreProducts];

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
          {allProducts.map((product) => (
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
              <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-size">Size: {item.selectedSize}</p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
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
// EDIT PROFILE FORM COMPONENT
// =============================================
function EditProfileForm({ user, onBack, onSave }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
    address: user.address || '',
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Error saving:", error);
    }
    setSaving(false);
  };

  return (
    <div className="auth-edit-profile">
      <button className="auth-back" onClick={onBack}>← Back</button>
      <h2 className="auth-title">แก้ไขข้อมูลส่วนตัว</h2>
      
      {success && <div className="auth-success">บันทึกข้อมูลเรียบร้อยแล้ว!</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label>ชื่อ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="ชื่อ"
            />
          </div>
          <div className="form-group">
            <label>นามสกุล</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="นามสกุล"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์"
          />
        </div>
        
        <div className="form-group">
          <label>ที่อยู่จัดส่ง</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="ที่อยู่จัดส่ง"
            rows="3"
          />
        </div>
        
        <button type="submit" className="auth-submit-btn" disabled={saving}>
          {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
        </button>
      </form>
    </div>
  );
}

// =============================================
// ORDER HISTORY COMPONENT
// =============================================
function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const unsubscribe = db.collection('orders')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const ordersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(ordersData);
          setLoading(false);
        }, (error) => {
          console.error("Error loading orders:", error);
          setLoading(false);
        });
      
      return () => unsubscribe();
    }
  }, [userId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(price);
  };

  if (loading) {
    return <div className="orders-loading">กำลังโหลด...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="orders-empty-icon">📦</div>
        <p>ยังไม่มีประวัติการสั่งซื้อ</p>
      </div>
    );
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div className="order-id">#{order.id.slice(-8).toUpperCase()}</div>
            <div className={`order-status status-${order.status || 'pending'}`}>
              {order.status === 'completed' ? 'สำเร็จ' : 
               order.status === 'shipped' ? 'กำลังจัดส่ง' : 'รอดำเนินการ'}
            </div>
          </div>
          <div className="order-date">
            {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'ไม่ระบุวันที่'}
          </div>
          <div className="order-items">
            {order.items?.slice(0, 3).map((item, idx) => (
              <span key={idx} className="order-item-name">{item.name}</span>
            ))}
            {order.items?.length > 3 && <span className="order-more">+{order.items.length - 3} รายการ</span>}
          </div>
          <div className="order-total">
            รวม: <strong>{formatPrice(order.total)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================
// SHARE BUTTONS COMPONENT
// =============================================
function ShareButtons({ product, onClose }) {
  const shareUrl = window.location.href;
  const shareText = `${product.name} - ฿${product.price?.toLocaleString()} | MAISON Premium Lifestyle Wear`;
  
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400');
  };
  
  const shareToLine = () => {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400');
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400');
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('คัดลอกลิงก์แล้ว!');
    });
  };
  
  return (
    <div className="share-buttons">
      <button className="share-btn facebook" onClick={shareToFacebook} title="Share to Facebook">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </button>
      <button className="share-btn line" onClick={shareToLine} title="Share to Line">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
      </button>
      <button className="share-btn twitter" onClick={shareToTwitter} title="Share to X/Twitter">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </button>
      <button className="share-btn copy" onClick={copyLink} title="Copy Link">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>
    </div>
  );
}

// =============================================
// FLASH SALE TIMER COMPONENT
// =============================================
function FlashSaleTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;
      
      if (difference <= 0) {
        setIsExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endTime]);
  
  if (isExpired) {
    return <div className="flash-timer expired">⏰ หมดเวลาโปรโมชั่น</div>;
  }
  
  return (
    <div className="flash-timer">
      <span className="flash-label">🔥 FLASH SALE สิ้นสุดใน</span>
      <div className="timer-blocks">
        <div className="timer-block">
          <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="timer-label">ชม.</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-block">
          <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="timer-label">นาที</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-block">
          <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="timer-label">วินาที</span>
        </div>
      </div>
    </div>
  );
}

// =============================================
// RECENTLY VIEWED COMPONENT
// =============================================
function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([]);
  const { formatPrice } = useContext(CurrencyContext);
  
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentProducts(JSON.parse(stored));
    }
  }, []);
  
  if (recentProducts.length === 0) return null;
  
  return (
    <section className="recently-viewed">
      <div className="section-header">
        <h2 className="section-title">👁️ สินค้าที่ดูล่าสุด</h2>
      </div>
      <div className="recent-products-grid">
        {recentProducts.slice(0, 6).map((product, index) => (
          <div key={index} className="recent-product-card">
            <div className="recent-product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="recent-product-info">
              <h4>{product.name}</h4>
              <span className="recent-product-price">{formatPrice(product.price)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Helper function to add product to recently viewed
function addToRecentlyViewed(product) {
  try {
    const stored = localStorage.getItem('recentlyViewed');
    let recent = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists
    recent = recent.filter(p => p.id !== product.id);
    
    // Add to beginning
    recent.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Keep only last 10
    recent = recent.slice(0, 10);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recent));
  } catch (e) {
    console.error('Error saving to recently viewed:', e);
  }
}

// =============================================
// PRODUCT COMPARE CONTEXT
// =============================================
const CompareContext = createContext();

function CompareProvider({ children }) {
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
// PRODUCT COMPARE MODAL
// =============================================
function ProductCompareModal() {
  const { compareList, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useContext(CompareContext);
  const { formatPrice } = useContext(CurrencyContext);
  
  useEffect(() => {
    if (isCompareOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCompareOpen]);
  
  if (!isCompareOpen) return null;
  
  return (
    <div className="compare-modal-overlay active" onClick={() => setIsCompareOpen(false)}>
      <div className="compare-modal" onClick={e => e.stopPropagation()}>
        <button className="compare-modal-close" onClick={() => setIsCompareOpen(false)}>×</button>
        <h2 className="compare-title">📊 เปรียบเทียบสินค้า</h2>
        
        {compareList.length === 0 ? (
          <div className="compare-empty">
            <p>ยังไม่มีสินค้าในรายการเปรียบเทียบ</p>
            <p className="compare-hint">กดปุ่ม "Compare" ที่การ์ดสินค้าเพื่อเพิ่ม</p>
          </div>
        ) : (
          <div className="compare-grid" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
            {compareList.map((product) => (
              <div key={product.id} className="compare-product">
                <button className="compare-remove" onClick={() => removeFromCompare(product.id)}>×</button>
                <img src={product.image} alt={product.name} className="compare-product-image" />
                <h4 className="compare-product-name">{product.name}</h4>
                <div className="compare-product-price">{formatPrice(product.price)}</div>
                
                <div className="compare-specs">
                  <div className="compare-spec">
                    <span className="spec-label">Model</span>
                    <span className="spec-value">{product.model}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Size</span>
                    <span className="spec-value">{product.size}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Material</span>
                    <span className="spec-value">{product.material}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Color</span>
                    <span className="spec-value">{product.color}</span>
                  </div>
                  <div className="compare-spec">
                    <span className="spec-label">Stock</span>
                    <span className="spec-value">{product.stock} ชิ้น</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {compareList.length > 0 && (
          <button className="compare-clear-btn" onClick={clearCompare}>
            🗑️ ล้างรายการ
          </button>
        )}
      </div>
    </div>
  );
}

// =============================================
// COMPARE FLOATING BUTTON
// =============================================
function CompareFloatingButton() {
  const { compareCount, setIsCompareOpen } = useContext(CompareContext);
  
  if (compareCount === 0) return null;
  
  return (
    <button className="compare-floating-btn" onClick={() => setIsCompareOpen(true)}>
      <span className="compare-icon">📊</span>
      <span className="compare-count">{compareCount}</span>
      <span className="compare-text">เปรียบเทียบ</span>
    </button>
  );
}

// =============================================
// STOCK NOTIFICATION COMPONENT
// =============================================
function StockNotification({ productId, productName, onClose }) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('กรุณากรอกอีเมลที่ถูกต้อง');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      await db.collection('stockNotifications').add({
        productId,
        productName,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        notified: false
      });
      
      setSuccess(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="stock-notification-form">
      <h4 className="stock-notification-title">🔔 แจ้งเตือนเมื่อสินค้ากลับมา</h4>
      <p className="stock-notification-desc">กรอกอีเมลเพื่อรับแจ้งเตือนเมื่อ {productName} กลับมาในสต็อก</p>
      
      {success ? (
        <div className="stock-notification-success">
          ✅ บันทึกเรียบร้อย! เราจะแจ้งเตือนคุณทันทีที่สินค้ากลับมา
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="stock-notification-error">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@email.com"
            className="stock-notification-input"
          />
          <button type="submit" className="stock-notification-btn" disabled={submitting}>
            {submitting ? 'กำลังบันทึก...' : '📧 แจ้งเตือนฉัน'}
          </button>
        </form>
      )}
    </div>
  );
}

// =============================================
// LOYALTY POINTS DISPLAY COMPONENT
// =============================================
function LoyaltyPointsDisplay() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      // Get user's points
      const unsubscribe = db.collection('loyaltyPoints')
        .doc(user.id)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setPoints(doc.data().points || 0);
          }
        });
      
      // Get recent transactions
      db.collection('loyaltyTransactions')
        .where('userId', '==', user.id)
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTransactions(data);
        });
      
      return () => unsubscribe();
    }
  }, [isLoggedIn, user?.id]);
  
  if (!isLoggedIn) return null;
  
  return (
    <div className="loyalty-points-display">
      <div className="loyalty-header">
        <span className="loyalty-icon">🎁</span>
        <div className="loyalty-info">
          <span className="loyalty-label">คะแนนสะสม</span>
          <span className="loyalty-value">{points.toLocaleString()} แต้ม</span>
        </div>
      </div>
      <div className="loyalty-footer">
        <span className="loyalty-hint">แลก 100 แต้ม = ส่วนลด ฿10</span>
      </div>
    </div>
  );
}

// Helper function to add loyalty points
async function addLoyaltyPoints(userId, amount, description) {
  const pointsToAdd = Math.floor(amount); // 1 baht = 1 point
  
  try {
    // Update total points
    const pointsRef = db.collection('loyaltyPoints').doc(userId);
    const doc = await pointsRef.get();
    
    if (doc.exists) {
      await pointsRef.update({
        points: firebase.firestore.FieldValue.increment(pointsToAdd),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      await pointsRef.set({
        points: pointsToAdd,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    
    // Add transaction record
    await db.collection('loyaltyTransactions').add({
      userId,
      points: pointsToAdd,
      type: 'earn',
      description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    return pointsToAdd;
  } catch (err) {
    console.error("Error adding loyalty points:", err);
    return 0;
  }
}

// =============================================
// LIVE CHAT WIDGET COMPONENT
// =============================================
function LiveChatWidget() {
  const { user, isLoggedIn } = useContext(AuthContext);
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

// =============================================
// AI CHATBOT COMPONENT
// =============================================
function AIChatbot() {
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

// =============================================
// 3D PRODUCT VIEWER COMPONENT
// =============================================
function Product3DViewer({ images, productName, onClose }) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Simulate 360 view with multiple angles (using same image for demo)
  const totalAngles = 12;
  
  useEffect(() => {
    if (autoRotate && !isDragging) {
      const interval = setInterval(() => {
        setCurrentAngle(prev => (prev + 1) % totalAngles);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isDragging]);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoRotate(false);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 20) {
      setCurrentAngle(prev => {
        if (delta > 0) return (prev + 1) % totalAngles;
        return (prev - 1 + totalAngles) % totalAngles;
      });
      setStartX(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setAutoRotate(false);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    if (Math.abs(delta) > 20) {
      setCurrentAngle(prev => {
        if (delta > 0) return (prev + 1) % totalAngles;
        return (prev - 1 + totalAngles) % totalAngles;
      });
      setStartX(e.touches[0].clientX);
    }
  };
  
  return (
    <div className="viewer-3d-overlay" onClick={onClose}>
      <div className="viewer-3d-container" onClick={e => e.stopPropagation()}>
        <button className="viewer-3d-close" onClick={onClose}>×</button>
        <h3 className="viewer-3d-title">🔄 360° View: {productName}</h3>
        
        <div 
          className="viewer-3d-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <img 
            src={images} 
            alt={productName}
            style={{ transform: `rotateY(${currentAngle * 30}deg)` }}
            draggable={false}
          />
          <div className="viewer-3d-indicator">
            <span className="angle-display">{currentAngle * 30}°</span>
          </div>
        </div>
        
        <div className="viewer-3d-controls">
          <button 
            className={`control-btn ${autoRotate ? 'active' : ''}`} 
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? '⏸ หยุด' : '▶ หมุนอัตโนมัติ'}
          </button>
          <p className="viewer-3d-hint">👆 ลากซ้าย-ขวาเพื่อหมุนสินค้า</p>
        </div>
      </div>
    </div>
  );
}

// =============================================
// VIRTUAL TRY-ON COMPONENT
// =============================================
function VirtualTryOn({ product, onClose }) {
  const [userImage, setUserImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState(null);
  const fileInputRef = React.useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTryOn = async () => {
    if (!userImage) return;
    
    setIsProcessing(true);
    
    // Simulate AR processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, we'll show a combined view
    setTryOnResult({
      userImage,
      productImage: product.image
    });
    
    setIsProcessing(false);
  };
  
  return (
    <div className="try-on-overlay" onClick={onClose}>
      <div className="try-on-container" onClick={e => e.stopPropagation()}>
        <button className="try-on-close" onClick={onClose}>×</button>
        <h3 className="try-on-title">👗 Virtual Try-On</h3>
        <p className="try-on-product">{product.name}</p>
        
        {!tryOnResult ? (
          <>
            <div className="try-on-upload-area">
              {userImage ? (
                <img src={userImage} alt="Your photo" className="try-on-preview" />
              ) : (
                <div 
                  className="try-on-placeholder"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="upload-icon">📷</span>
                  <p>คลิกเพื่ออัปโหลดรูปของคุณ</p>
                  <p className="upload-hint">รูปหน้าตรง ยืนเต็มตัว</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            
            {userImage && (
              <div className="try-on-actions">
                <button 
                  className="try-on-btn secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  🔄 เปลี่ยนรูป
                </button>
                <button 
                  className="try-on-btn primary"
                  onClick={handleTryOn}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'กำลังประมวลผล...' : '✨ ลองสวมใส่'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="try-on-result">
            <div className="try-on-result-grid">
              <div className="result-item">
                <img src={tryOnResult.userImage} alt="You" />
                <span>คุณ</span>
              </div>
              <span className="result-plus">+</span>
              <div className="result-item">
                <img src={tryOnResult.productImage} alt="Product" />
                <span>สินค้า</span>
              </div>
            </div>
            
            <div className="try-on-preview-result">
              <p>🎉 ดูเข้ากันดีมาก!</p>
              <p className="preview-note">* นี่เป็น Demo version - ระบบ AR จริงกำลังพัฒนา</p>
            </div>
            
            <button 
              className="try-on-btn primary"
              onClick={() => setTryOnResult(null)}
            >
              ลองใหม่
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// STAR RATING COMPONENT
// =============================================
function StarRating({ rating, onRatingChange, readonly = false, size = 24 }) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };
  
  return (
    <div className={`star-rating ${readonly ? 'readonly' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          style={{ fontSize: size, cursor: readonly ? 'default' : 'pointer' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// =============================================
// PRODUCT REVIEW FORM COMPONENT
// =============================================
function ProductReviewForm({ productId, productName, onSubmit, onCancel }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('กรุณาให้คะแนนดาว');
      return;
    }
    
    if (reviewText.trim().length < 10) {
      setError('กรุณาเขียนรีวิวอย่างน้อย 10 ตัวอักษร');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      const reviewData = {
        productId,
        productName,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName?.charAt(0) || ''}.`,
        rating,
        reviewText: reviewText.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      await db.collection('reviews').add(reviewData);
      
      setRating(0);
      setReviewText('');
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error("Error submitting review:", err);
      setError('เกิดข้อผิดพลาดในการส่งรีวิว');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="review-form">
      <h4 className="review-form-title">เขียนรีวิวสินค้า</h4>
      
      {error && <div className="review-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="review-rating-section">
          <label>ให้คะแนน:</label>
          <StarRating rating={rating} onRatingChange={setRating} size={28} />
        </div>
        
        <div className="review-text-section">
          <label>รีวิวของคุณ:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="แชร์ประสบการณ์การใช้สินค้านี้..."
            rows="4"
            maxLength="500"
          />
          <span className="char-count">{reviewText.length}/500</span>
        </div>
        
        <div className="review-form-actions">
          <button type="button" className="review-cancel-btn" onClick={onCancel}>
            ยกเลิก
          </button>
          <button type="submit" className="review-submit-btn" disabled={submitting}>
            {submitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
          </button>
        </div>
      </form>
    </div>
  );
}

// =============================================
// PRODUCT REVIEWS DISPLAY COMPONENT
// =============================================
function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (productId) {
      const unsubscribe = db.collection('reviews')
        .where('productId', '==', productId)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .onSnapshot((snapshot) => {
          const reviewsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setReviews(reviewsData);
          setLoading(false);
        }, (error) => {
          console.error("Error loading reviews:", error);
          setLoading(false);
        });
      
      return () => unsubscribe();
    }
  }, [productId]);
  
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;
  
  if (loading) {
    return <div className="reviews-loading">กำลังโหลดรีวิว...</div>;
  }
  
  return (
    <div className="product-reviews">
      <div className="reviews-summary">
        <div className="average-rating">
          <span className="rating-number">{averageRating}</span>
          <StarRating rating={Math.round(averageRating)} readonly size={20} />
          <span className="review-count">({reviews.length} รีวิว)</span>
        </div>
      </div>
      
      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
          <p className="no-reviews-hint">เป็นคนแรกที่รีวิว!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.userName}</span>
                  <StarRating rating={review.rating} readonly size={16} />
                </div>
                <span className="review-date">
                  {review.createdAt ? new Date(review.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : ''}
                </span>
              </div>
              <p className="review-text">{review.reviewText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
// REVIEW MODAL COMPONENT
// =============================================
function ReviewModal({ product, onClose }) {
  const { user, isLoggedIn, openAuthModal } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("review-modal-overlay")) {
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
  
  // Inline styles for overlay - ensures highest z-index and fixed positioning
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000,
    overflow: 'hidden'
  };
  
  // Inline styles for modal content
  const modalStyle = {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    padding: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  };
  
  // Use createPortal to render modal directly to document.body
  // This ensures the modal is positioned relative to viewport, not parent containers
  return createPortal(
    <div className="review-modal-overlay active" style={overlayStyle} onClick={handleOverlayClick}>
      <div className="review-modal" style={modalStyle}>
        <button className="review-modal-close" onClick={onClose} style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#666'
        }}>×</button>
        
        <div className="review-modal-header" style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <img 
            src={product.image || product.images?.[0]} 
            alt={product.name} 
            className="review-product-image" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div className="review-product-info" style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{product.name}</h3>
          </div>
        </div>
        
        {showForm && isLoggedIn ? (
          <ProductReviewForm 
            productId={product.id}
            productName={product.name}
            onSubmit={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <ProductReviews productId={product.id} />
            <div className="review-modal-actions" style={{ marginTop: '20px', textAlign: 'center' }}>
              {isLoggedIn ? (
                <button className="write-review-btn" onClick={() => setShowForm(true)} style={{
                  background: 'linear-gradient(135deg, #c9a55a, #dbb978)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  ✏️ เขียนรีวิว
                </button>
              ) : (
                <button className="write-review-btn" onClick={() => openAuthModal('login')} style={{
                  background: 'linear-gradient(135deg, #c9a55a, #dbb978)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  เข้าสู่ระบบเพื่อเขียนรีวิว
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

// =============================================
// ADMIN ADD PRODUCT FORM COMPONENT
// =============================================
function AdminAddProduct({ onBack, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    model: '',
    size: 'S, M, L, XL',
    material: '',
    color: '',
    colorHex: '#3498db',
    stock: '10',
    image: '',
    collection: 'men'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      setError('กรุณากรอกชื่อ, ราคา และ URL รูปภาพ');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        model: formData.model || formData.name,
        size: formData.size,
        material: formData.material || 'Mixed Materials',
        color: formData.color || 'Various',
        stock: parseInt(formData.stock) || 10,
        image: formData.image,
        collection: formData.collection,
        colorVariants: [
          { name: formData.color || 'Default', hex: formData.colorHex || '#888888', image: formData.image }
        ],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      await db.collection('products').add(productData);
      
      setSuccess(true);
      setFormData({
        name: '',
        price: '',
        model: '',
        size: 'S, M, L, XL',
        material: '',
        color: '',
        colorHex: '#3498db',
        stock: '10',
        image: '',
        collection: 'men'
      });
      
      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      console.error("Error adding product:", err);
      setError('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="admin-add-product">
      <button className="auth-back" onClick={onBack}>← กลับ</button>
      <h2 className="admin-title">➕ เพิ่มสินค้าใหม่</h2>
      
      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">✓ เพิ่มสินค้าสำเร็จ!</div>}
      
      <form onSubmit={handleSubmit} className="admin-product-form">
        <div className="form-group">
          <label>ชื่อสินค้า *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ชื่อสินค้า"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>ราคา (บาท) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="1990.00"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>จำนวนในสต็อก</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="10"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>รุ่น / Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="รุ่นสินค้า"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>ไซส์</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="S, M, L, XL"
            />
          </div>
          <div className="form-group">
            <label>ชื่อสี</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="White / Clear Blue"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>เลือกสี (สำหรับวงกลมสี)</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                name="colorHex"
                value={formData.colorHex}
                onChange={handleChange}
                className="color-picker-input"
              />
              <input
                type="text"
                name="colorHex"
                value={formData.colorHex}
                onChange={handleChange}
                placeholder="#3498db"
                className="color-hex-input"
              />
              <div 
                className="color-preview" 
                style={{ backgroundColor: formData.colorHex }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>วัสดุ</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="100% Cotton"
          />
        </div>
        
        <div className="form-group">
          <label>URL รูปภาพ *</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label>เลือก Collection *</label>
          <select name="collection" value={formData.collection} onChange={handleChange}>
            <option value="men">Men's Collection</option>
            <option value="women">Women's Collection</option>
            <option value="unisex">Unisex Collection</option>
            <option value="sports">Sports & Lifestyle</option>
          </select>
        </div>
        
        <button type="submit" className="admin-submit-btn" disabled={submitting}>
          {submitting ? 'กำลังเพิ่ม...' : '➕ เพิ่มสินค้า'}
        </button>
      </form>
    </div>
  );
}

// =============================================
// ADMIN PANEL COMPONENT
// =============================================
function AdminPanel({ onBack }) {
  const [view, setView] = useState('menu'); // 'menu', 'add', 'list'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const loadProducts = () => {
    setLoading(true);
    db.collection('products')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()
      .then((snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  };
  
  const deleteProduct = async (productId) => {
    if (window.confirm('ต้องการลบสินค้านี้?')) {
      try {
        await db.collection('products').doc(productId).delete();
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };
  
  if (view === 'add') {
    return <AdminAddProduct onBack={() => setView('menu')} onSuccess={() => setView('menu')} />;
  }
  
  if (view === 'list') {
    return (
      <div className="admin-product-list">
        <button className="auth-back" onClick={() => setView('menu')}>← กลับ</button>
        <h2 className="admin-title">📦 สินค้าที่เพิ่มจาก Admin</h2>
        
        {loading ? (
          <div className="admin-loading">กำลังโหลด...</div>
        ) : products.length === 0 ? (
          <div className="admin-empty">ยังไม่มีสินค้าที่เพิ่มจาก Admin</div>
        ) : (
          <div className="admin-products-grid">
            {products.map((product) => (
              <div key={product.id} className="admin-product-card">
                <img src={product.image} alt={product.name} />
                <div className="admin-product-info">
                  <h4>{product.name}</h4>
                  <p className="admin-product-price">฿{product.price?.toLocaleString()}</p>
                  <p className="admin-product-collection">{product.collection}</p>
                </div>
                <button className="admin-delete-btn" onClick={() => deleteProduct(product.id)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="admin-panel">
      <button className="auth-back" onClick={onBack}>← กลับ</button>
      <h2 className="admin-title">🔧 Admin Panel</h2>
      
      <div className="admin-menu">
        <button className="admin-menu-btn" onClick={() => setView('add')}>
          <span className="admin-menu-icon">➕</span>
          <span className="admin-menu-text">เพิ่มสินค้าใหม่</span>
        </button>
        <button className="admin-menu-btn" onClick={() => { setView('list'); loadProducts(); }}>
          <span className="admin-menu-icon">📦</span>
          <span className="admin-menu-text">ดูสินค้าที่เพิ่ม</span>
        </button>
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
            
            <div className="profile-tabs">
              <button className="profile-tab active" onClick={(e) => {
                e.target.parentElement.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('profile-info').style.display = 'block';
                document.getElementById('profile-orders').style.display = 'none';
              }}>ข้อมูลส่วนตัว</button>
              <button className="profile-tab" onClick={(e) => {
                e.target.parentElement.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('profile-info').style.display = 'none';
                document.getElementById('profile-orders').style.display = 'block';
              }}>ประวัติการสั่งซื้อ</button>
            </div>
            
            <div id="profile-info" className="profile-details">
              <div className="profile-item">
                <span className="profile-label">ชื่อ-นามสกุล</span>
                <span className="profile-value">{user.firstName} {user.lastName}</span>
              </div>
              
              <div className="profile-item">
                <span className="profile-label">อีเมล</span>
                <span className="profile-value">{user.email}</span>
              </div>
              
              <div className="profile-item">
                <span className="profile-label">เบอร์โทรศัพท์</span>
                <span className="profile-value">{user.phone || 'ไม่ได้ระบุ'}</span>
              </div>
              
              <div className="profile-item">
                <span className="profile-label">ที่อยู่จัดส่ง</span>
                <span className="profile-value">{user.address || 'ไม่ได้ระบุ'}</span>
              </div>
              
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
              
              <button className="auth-btn edit-profile-btn" onClick={() => setAuthMode('editProfile')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                แก้ไขข้อมูล
              </button>
            </div>
            
            <div id="profile-orders" className="profile-orders" style={{display: 'none'}}>
              <OrderHistory userId={user.id} />
            </div>
            
            <div className="profile-actions">
              <button className="auth-btn admin-btn" onClick={() => setAuthMode('admin')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Admin Panel
              </button>
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

        {/* Edit Profile View */}
        {authMode === 'editProfile' && isLoggedIn && (
          <EditProfileForm user={user} onBack={() => setAuthMode('profile')} onSave={async (updatedData) => {
            try {
              await db.collection('users').doc(user.id).update(updatedData);
              // Refresh user data
              const userDoc = await db.collection('users').doc(user.id).get();
              if (userDoc.exists) {
                // Update will be reflected through auth state listener
              }
              setAuthMode('profile');
            } catch (error) {
              console.error("Error updating profile:", error);
            }
          }} />
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

        {/* Admin View */}
        {authMode === 'admin' && isLoggedIn && (
          <AdminPanel onBack={() => setAuthMode('profile')} />
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
        <img 
          src={currentImage} 
          alt={`${product.name} - ${currentColorName}`} 
          loading="lazy"
        />
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
  const [firestoreProducts, setFirestoreProducts] = useState([]);

  // Load products from Firestore (added via Admin Panel)
  useEffect(() => {
    const loadFirestoreProducts = async () => {
      try {
        const snapshot = await db.collection('products').get();
        const products = snapshot.docs.map(doc => ({
          id: `fs-${doc.id}`,
          ...doc.data(),
          category: doc.data().collection || 'unisex'
        }));
        setFirestoreProducts(products);
      } catch (error) {
        console.log("No Firestore products or error loading:", error);
      }
    };
    loadFirestoreProducts();
  }, []);

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

  // Combine all products from all collections + Firestore
  const allProducts = [
    ...collections.men.products.map((p) => ({ ...p, category: "men" })),
    ...collections.women.products.map((p) => ({ ...p, category: "women" })),
    ...collections.unisex.products.map((p) => ({ ...p, category: "unisex" })),
    ...collections.sports.products.map((p) => ({ ...p, category: "sports" })),
    ...firestoreProducts.map((p) => ({ ...p, model: p.model || p.name })),
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
    {
      key: "sports",
      label: "Sports",
      count: collections.sports.products.length,
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
      <CompareProvider>
      <CartProvider>
      <WishlistProvider>
        <div className="app" id="main-content" role="main">
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
          <ProductCompareModal />
          <CompareFloatingButton />
          <LiveChatWidget />
          <AIChatbot />
          <Toast />
        </div>
      </WishlistProvider>
      </CartProvider>
      </CompareProvider>
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
          <button 
            className="menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="เปิดเมนูหลัก"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
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
              aria-label={`เปลี่ยนสกุลเงิน ตอนนี้ ${currency}`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
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
          <button className="nav-icon" title="Search" aria-label="ค้นหาสินค้า" onClick={onShowSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button
            className="nav-icon wishlist-btn"
            title="Wishlist"
            onClick={() => setIsWishlistOpen(true)}
            aria-label="รายการโปรด"
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
            aria-label={isLoggedIn ? `เมนูผู้ใช้ ${user.firstName}` : 'เข้าสู่ระบบ'}
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
            aria-label={`ตะกร้าสินค้า ${cartCount} ชิ้น`}
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
            aria-label={isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
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
            onNavigateCategory("sports");
          }}
          className="sports-link"
        >
          ⚡ SPORTS
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
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} role="dialog" aria-modal="true" aria-label="เมนูหลัก">
          <div className="mobile-menu" id="mobile-menu" onClick={(e) => e.stopPropagation()} role="navigation">
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="ปิดเมนู">×</button>
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
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
