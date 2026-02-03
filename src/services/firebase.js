// การตั้งค่าและเริ่มต้นการทำงานของ Firebase (ใช้โหมด Compat สำหรับไวยากรณ์ v8)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// การตั้งค่า Firebase สำหรับโปรเจกต์ web-kantawan (ระบุ Key ต่างๆ)
const firebaseConfig = {
  apiKey: "AIzaSyCieAhFTn4dL0FuB-SAC4-gtYBVrJlpHrA",
  authDomain: "web-kantawan.firebaseapp.com",
  projectId: "web-kantawan",
  storageBucket: "web-kantawan.firebasestorage.app",
  messagingSenderId: "281106098218",
  appId: "1:281106098218:web:1d782331286c6b779e7b53",
  measurementId: "G-T4J8H8WN7P"
};

// ตรวจสอบว่าเป็น Config ตัวอย่างหรือไม่ (ถ้าใช่จะแสดง Error แจ้งเตือน)
const isPlaceholderConfig = firebaseConfig.apiKey === "YOUR_API_KEY_HERE";

// เริ่มต้นการทำงานของ Firebase (Initialize)
let auth, db;

if (isPlaceholderConfig) {
  console.warn("⚠️ ยังไม่ได้ตั้งค่า Firebase! กรุณาอัปเดตไฟล์ src/firebase.js ด้วยข้อมูล Config ของคุณ");
  console.warn("รับข้อมูล Config ได้ที่: https://console.firebase.google.com/");
  
    // สร้าง Mock Object (ของปลอม) เพื่อป้องกันหน้าเว็บพัง ถ้ายังไม่ได้ใส่ Config
  auth = {
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    },
    signInWithEmailAndPassword: () => Promise.reject(new Error("ยังไม่ได้ตั้งค่า Firebase")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("ยังไม่ได้ตั้งค่า Firebase")),
    signInWithPopup: () => Promise.reject(new Error("ยังไม่ได้ตั้งค่า Firebase")),
    signOut: () => Promise.resolve()
  };
  
  db = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({ exists: false }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve()
      }),
      get: () => Promise.resolve({ docs: [] }),
      add: () => Promise.resolve({ id: 'mock-id' })
    })
  };
} else {
  // เริ่มต้น Firebase จริง (ถ้ายังไม่ได้เริ่ม)
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // ส่งออกตัวแปรสำหรับใช้งาน: auth (ระบบสมาชิก), db (ฐานข้อมูล)
  auth = firebase.auth();
  db = firebase.firestore();
}

export { firebase, auth, db };
