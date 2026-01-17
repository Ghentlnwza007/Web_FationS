
import React, { useState } from 'react';
import heroFallback from '../assets/images/hero-fallback.jpg';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="hero" id="home" aria-label="Welcome to MAISON">
      <div className="hero-bg">
        {/* Fallback Image - Visible initially */}
        <img 
          src={heroFallback} 
          alt="MAISON Hero Background" 
          className="hero-fallback"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoLoaded ? 0 : 1,
            transition: 'opacity 1s ease-in-out',
            zIndex: 1
          }}
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Helper Video Background - Lazy Loaded */}
        <iframe
          src="https://www.youtube-nocookie.com/embed/YDErLmbjSRM?autoplay=1&mute=1&loop=1&playlist=YDErLmbjSRM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="MAISON Hero Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => {
            // Add a small delay to ensure video rendering has started
            setTimeout(() => setVideoLoaded(true), 1500);
          }}
          loading="lazy"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: 2,
          }}
        ></iframe>
        
        {/* Overlay to block YouTube end screen/controls */}
        <div className="hero-video-overlay" style={{ zIndex: 3 }}></div>
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
