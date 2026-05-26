import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { projects } from '../../config/portfolioData';
import type { Project } from '../../config/portfolioData';
import './Projects.css';

const GithubIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 20, style }) => (
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
    style={style}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// 3D Tilt Card Sub-component
const ProjectCard: React.FC<{ project: Project; onOpenModal: (p: Project) => void }> = ({ project, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse x position relative to card
    const y = e.clientY - rect.top;  // Mouse y position relative to card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation degree (max 15 degrees)
    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className="project-card glass-panel"
    >
      <div className="project-image-container">
        {/* Modern styled placeholder image utilizing geometric gradient meshes */}
        <div className="project-placeholder-image">
          <div className="mesh-gradient-overlay"></div>
          <div className="project-category-tag">{project.category}</div>
          <span className="project-visual-logo">{project.title[0]}</span>
        </div>
      </div>

      <div className="project-info">
        <h3 className="project-title-h">{project.title}</h3>
        <p className="project-desc-short">{project.shortDescription}</p>
        
        <div className="project-tags">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
          {project.tags.length > 3 && <span className="project-tag-more">+{project.tags.length - 3}</span>}
        </div>

        <button 
          onClick={() => onOpenModal(project)} 
          className="project-details-btn"
        >
          View Case Study
        </button>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Full-Stack' | 'Frontend' | 'Mobile' | 'Design'>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter projects
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  // Viewport Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Selected Work</span>
          <h2 className="section-title">Projects Showcase</h2>
        </div>

        {/* Categories Tab Pill Filter */}
        <div className="projects-filters">
          {(['All', 'Full-Stack', 'Frontend', 'Design'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className={`projects-grid ${isVisible ? 'revealed' : ''}`}>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Details Modal Overlay */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="modal-body">
              <div className="modal-visuals">
                <div className="modal-mesh-image">
                  <div className="mesh-gradient-overlay"></div>
                  <h2>{selectedProject.title}</h2>
                </div>
              </div>

              <div className="modal-info">
                <div className="modal-header-details">
                  <span className="modal-category">{selectedProject.category}</span>
                  <h3 className="modal-title">{selectedProject.title}</h3>
                </div>

                <p className="modal-description">{selectedProject.longDescription}</p>

                <div className="modal-features">
                  <h4>Key Features</h4>
                  <ul>
                    {selectedProject.keyFeatures.map((feat, index) => (
                      <li key={index}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-tags">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="modal-btn btn-primary"
                    >
                      Live Demo <ExternalLink size={16} style={{ marginLeft: 6 }} />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="modal-btn btn-secondary"
                    >
                      Source Code <GithubIcon size={16} style={{ marginLeft: 6 }} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Projects;
