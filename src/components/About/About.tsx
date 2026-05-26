import React, { useEffect, useRef, useState } from 'react';
import { personalInfo, metrics } from '../../config/portfolioData';
import './About.css';

// Custom CountUp sub-component for metrics counters
const CountUpItem: React.FC<{ label: string; value: number; suffix: string; isVisible: boolean }> = ({ label, value, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = value / (duration / 16); // ~60fps refresh rate

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value, isVisible]);

  return (
    <div className="metric-card glass-panel">
      <h3 className="metric-number">
        {count}
        <span className="metric-suffix">{suffix}</span>
      </h3>
      <p className="metric-label">{label}</p>
    </div>
  );
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: unobserve once visible to prevent animation re-triggers
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15 } // Trigger when 15% is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get to know me</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          {/* Left Column: Bio & Counters */}
          <div className={`about-text-col reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
            <h3 className="about-tagline">
              Bridge the gap between <span className="gradient-text">Design & Engineering</span>
            </h3>
            
            <p className="about-paragraph">{personalInfo.bio}</p>
            
            <p className="about-paragraph">
              I believe software development is an art. From planning clean state schemas to polishing micro-animations, every line of code should work towards creating a fluid, unified, and deeply engaging user journey.
            </p>

            {/* Grid of CountUp Metrics */}
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <CountUpItem
                  key={index}
                  label={metric.label}
                  value={metric.value}
                  suffix={metric.suffix}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Premium visual profile avatar placeholder card */}
          <div className={`about-visual-col reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
            <div className="profile-card-wrapper glow-border-trigger">
              <div className="profile-card glass-panel">
                <div className="avatar-placeholder">
                  {/* Decorative glowing graphic since we are build-independent */}
                  <div className="graphic-orbit"></div>
                  <div className="graphic-core">
                    <span>{personalInfo.name[0]}</span>
                  </div>
                </div>
                <div className="profile-card-info">
                  <h4>{personalInfo.name}</h4>
                  <p>{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
