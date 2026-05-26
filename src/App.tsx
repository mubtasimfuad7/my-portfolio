import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { TechStack } from './components/TechStack/TechStack';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Contact } from './components/Contact/Contact';
import { personalInfo } from './config/portfolioData';
import './App.css';

// Modular quick Footer component
const Footer: React.FC = () => {
  return (
    <footer className="portfolio-footer">
      <div className="container footer-container">
        <p className="footer-copyright">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <p className="footer-built">
          Designed & Engineered by mubtasim fuad
        </p>
      </div>
    </footer>
  );
};

export const App: React.FC = () => {
  // Global Scroll Reveal handler using Intersection Observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Trigger slightly before element leaves bottom viewport
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Stop tracking once visible
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-app">
      {/* Sticky top glass navigation */}
      <Navbar />

      {/* Main sections sequence */}
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
