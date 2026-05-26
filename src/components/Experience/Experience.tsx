import React, { useEffect, useRef, useState } from 'react';
import { experiences } from '../../config/portfolioData';
import './Experience.css';

const TimelineCard: React.FC<{ experience: typeof experiences[0]; index: number; isVisible: boolean }> = ({ experience, index, isVisible }) => {
  return (
    <div 
      className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'revealed' : ''}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="timeline-dot-wrapper">
        <div className="timeline-dot"></div>
      </div>

      <div className="timeline-card-wrapper">
        <div className="timeline-card glass-panel">
          <span className="timeline-period">{experience.period}</span>
          <h3 className="timeline-role">{experience.role}</h3>
          <h4 className="timeline-company">{experience.company}</h4>
          
          <ul className="timeline-bullet-list">
            {experience.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="experience" ref={sectionRef} className="experience-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">My Career Road</span>
          <h2 className="section-title">Experience Timeline</h2>
        </div>

        <div className="timeline-container">
          {/* Vertical Track Line */}
          <div className="timeline-track"></div>

          {/* List of Cards */}
          {experiences.map((experience, index) => (
            <TimelineCard
              key={experience.id}
              experience={experience}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
