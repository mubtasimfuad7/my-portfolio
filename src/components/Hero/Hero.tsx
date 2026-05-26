import React, { useRef, useState } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { personalInfo } from '../../config/portfolioData';
import { InteractiveCanvas } from './InteractiveCanvas';
import './Hero.css';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-linkedin"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Hero: React.FC = () => {
  const [btnTranslate, setBtnTranslate] = useState({ x: 0, y: 0 });
  const [contactBtnTranslate, setContactBtnTranslate] = useState({ x: 0, y: 0 });
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  const handleMagnetic = (e: React.MouseEvent, ref: React.RefObject<HTMLElement | null>, setTranslate: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic pull strength (lower = more subtle, higher = stronger)
    const strength = 0.35; 
    setTranslate({ x: x * strength, y: y * strength });
  };

  const resetMagnetic = (setTranslate: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    setTranslate({ x: 0, y: 0 });
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <InteractiveCanvas />
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-greeting-tag reveal-on-scroll">
            <span className="pulse-dot"></span> Available for Freelance & Full-time
          </div>
          
          <h1 className="hero-title reveal-on-scroll">
            Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            <br />
            <span className="hero-role">{personalInfo.title}</span>
          </h1>
          
          <p className="hero-description reveal-on-scroll">
            {personalInfo.tagline}
          </p>

          {/* Magnetic CTA Buttons */}
          <div className="hero-actions reveal-on-scroll">
            <button
              ref={primaryBtnRef}
              onMouseMove={(e) => handleMagnetic(e, primaryBtnRef, setBtnTranslate)}
              onMouseLeave={() => resetMagnetic(setBtnTranslate)}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary"
              style={{ transform: `translate3d(${btnTranslate.x}px, ${btnTranslate.y}px, 0)` }}
            >
              <span className="btn-text">View My Work</span>
              <span className="btn-glow"></span>
            </button>
            
            <a
              ref={secondaryBtnRef}
              onMouseMove={(e) => handleMagnetic(e, secondaryBtnRef, setContactBtnTranslate)}
              onMouseLeave={() => resetMagnetic(setContactBtnTranslate)}
              href="#contact"
              className="btn btn-secondary"
              style={{ transform: `translate3d(${contactBtnTranslate.x}px, ${contactBtnTranslate.y}px, 0)` }}
            >
              Contact Me
            </a>
          </div>

          {/* Social connections */}
          <div className="hero-socials reveal-on-scroll">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon">
              <GithubIcon size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
              <LinkedinIcon size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="social-icon">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Floating background decorative blobs */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>

      {/* Scroll Down Indicator */}
      <div className="scroll-down-indicator" onClick={scrollToAbout}>
        <div className="mouse-wheel">
          <ArrowDown size={14} className="wheel-arrow" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};
