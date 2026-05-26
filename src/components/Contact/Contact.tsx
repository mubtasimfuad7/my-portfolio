import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../../config/portfolioData';
import './Contact.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'success'>('idle');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSendState('sending');

    // Simulate network latency (2 seconds)
    setTimeout(() => {
      setSendState('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset button to idle after 5 seconds
      setTimeout(() => {
        setSendState('idle');
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Let's talk</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct info cards */}
          <div className={`contact-info-col reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
            <h3 className="contact-heading">Let's build something <span className="gradient-text">extraordinary</span> together.</h3>
            <p className="contact-pitch">
              Whether you have a project idea, want to collaborate on a software stack, or simply want to say hello—my inbox is always open. Fill out the form or reach out directly!
            </p>

            <div className="contact-cards">
              <div className="info-card glass-panel">
                <div className="info-icon-wrapper">
                  <Mail size={20} className="info-icon" />
                </div>
                <div className="info-details">
                  <span>Email Me</span>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon-wrapper">
                  <MapPin size={20} className="info-icon" />
                </div>
                <div className="info-details">
                  <span>Location</span>
                  <p>{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fully-interactive Form */}
          <div className={`contact-form-col reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
            <form onSubmit={handleSubmit} className="contact-form glass-panel">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  disabled={sendState === 'sending'}
                />
                <label htmlFor="name">Your Name</label>
                <div className="input-glow-bar"></div>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  disabled={sendState === 'sending'}
                />
                <label htmlFor="email">Email Address</label>
                <div className="input-glow-bar"></div>
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder=" "
                  disabled={sendState === 'sending'}
                ></textarea>
                <label htmlFor="message">Your Message</label>
                <div className="input-glow-bar"></div>
              </div>

              <button
                type="submit"
                className={`submit-btn btn-primary ${sendState}`}
                disabled={sendState !== 'idle'}
              >
                {sendState === 'idle' && (
                  <>
                    <span className="btn-text">Send Message</span>
                    <Send size={16} className="btn-icon" />
                  </>
                )}

                {sendState === 'sending' && (
                  <>
                    <span className="btn-text">Transmitting...</span>
                    <span className="form-spinner"></span>
                  </>
                )}

                {sendState === 'success' && (
                  <>
                    <span className="btn-text">Delivered!</span>
                    <CheckCircle size={18} className="btn-icon" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
