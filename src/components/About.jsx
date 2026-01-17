import React, { useState } from 'react';
import kantawanImg from '../assets/images/kantawan.jpg';
import thanaphatImg from '../assets/images/thanaphat.jpg';

// =============================================
// ABOUT SECTION COMPONENT
// =============================================
export default function About() {
  const [showCreators, setShowCreators] = useState(false);

  const creators = [
    {
      id: 1,
      name: "Mr.Kantawan Maisonklang",
      role: "Lead Developer & Designer",
      image: kantawanImg,
      description: "รับผิดชอบการพัฒนาระบบ Front-end และออกแบบ UI/UX ของเว็บไซต์",
      skills: ["React", "JavaScript", "CSS", "UI Design"]
    },
    {
      id: 2,
      name: "Mr.Thanaphat Wibakthaisong",
      role: "Backend Developer & Project Manager",
      image: thanaphatImg,
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
            loading="lazy"
            decoding="async"
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
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                    loading="lazy"
                    decoding="async"
                  />
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
