import React, { useState, useEffect, useRef } from 'react';
import { skills } from '../../config/portfolioData';
import type { Skill } from '../../config/portfolioData';
import './TechStack.css';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter logic
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(s => s.category === activeCategory));
    }
  }, [activeCategory]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { key: 'all', label: 'All Technologies' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend & Databases' },
    { key: 'tools', label: 'Tools & DevOps' },
  ] as const;

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">My Arsenal</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="skills-tabs">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`skills-tab-btn ${activeCategory === category.key ? 'active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Dynamic Skills Grid */}
        <div className={`skills-grid ${isVisible ? 'revealed' : ''}`}>
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card glass-panel"
              style={{ 
                '--skill-glow': skill.glowColor,
                animationDelay: `${index * 50}ms`
              } as React.CSSProperties}
            >
              <div className="skill-icon-wrapper">
                {/* Dynamically draw a stylized placeholder code graphic based on skill */}
                <div className="skill-avatar">
                  {skill.name.slice(0, 2)}
                </div>
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <span className="skill-category-badge">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TechStack;
