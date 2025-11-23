import React, { useState } from 'react';
import '../CSS/mainPage.css'
import JobListings from './Entities/JobListings';
import Profile from './Entities/Profile';

const MainPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>('jobs');

  const renderContent = () => {
    switch (activeNav) {
      case 'jobs':
        return (
          <>
            {/* Top Navigation Bar */}
            <header className="top-bar">
              <div className="top-bar-left">
                <h1 className="page-title">JOBS</h1>
                <button className="tab-button active">Recommended</button>
                <button className="tab-button">
                  Liked <span className="tab-badge">0</span>
                </button>
                <button className="tab-button">
                  Applied <span className="tab-badge">10</span>
                </button>
                <button className="tab-button">
                  External <span className="tab-badge">0</span>
                </button>
              </div>
            </header>

            {/* Filter Bar */}
            <div className="filter-bar">
              <div className="filter-chips">
                <button className="filter-chip">Backend Engineer</button>
                <button className="filter-chip">Frontend Software Engineer</button>
                <button className="filter-chip">Within the US</button>
                <button className="filter-chip">Full-time</button>
                <button className="filter-chip">Onsite</button>
                <button className="filter-chip">Remote</button>
              </div>
              <div className="filter-actions">
                <button className="help-button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </button>
                <button className="recommended-dropdown">
                  Recommended ▼
                </button>
              </div>
            </div>

            <div className="filter-bar-secondary">
              <div className="filter-chips">
                <button className="filter-chip">Hybrid</button>
                <button className="filter-chip">Entry Level</button>
                <button className="filter-chip">Intern/New Grad</button>
                <button className="filter-chip">0-1 Years</button>
                <button className="filter-chip">+6</button>
                <button className="filter-edit-button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Filters
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="job-listings">
              <JobListings />
            </div>
          </>
        );

      case 'cluster':
        return (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Cluster View</h2>
            <p>Cluster view content coming soon...</p>
          </div>
        );

      case 'profile':
        return (
          <Profile/>
        );

      case 'agent':
        return (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>AI Agent</h2>
            <p>AI Agent content coming soon...</p>
          </div>
        );

      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Welcome to Jobright</h2>
            <p>Select an option from the sidebar to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="jobright-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="#00D4AA"/>
              <path d="M15 20L18 23L25 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Jobright</span>
        </div>

        <nav className="nav-menu">
          <a href="#" className={`nav-item ${activeNav === 'jobs' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('jobs'); }}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            <span>Jobs</span>
          </a>

          <a href="#" className={`nav-item ${activeNav === 'cluster' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('cluster'); }}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            <span>Cluster</span>
          </a>

          <a href="#" className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('profile'); }}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="10" r="3"/>
              <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
            </svg>
            <span>Profile</span>
          </a>

          <a href="#" className={`nav-item ${activeNav === 'agent' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('agent'); }}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8m-4-4h8"/>
            </svg>
            <span>Agent</span>
            <span className="badge-new">NEW</span>
          </a>
        </nav>

        <div className="referral-box">
          <svg className="referral-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="8" width="18" height="12" rx="2"/>
            <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
            <circle cx="12" cy="14" r="2"/>
          </svg>
          <div className="referral-content">
            <h3>Refer & Earn</h3>
            <p>Invite friends or share on LinkedIn to earn extra rewards!</p>
          </div>
          <svg className="referral-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>

        <div className="sidebar-footer">
          <a href="#" className="footer-item">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Messages</span>
          </a>

          <a href="#" className="footer-item">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download App</span>
          </a>

          <a href="#" className="footer-item">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>Feedback</span>
          </a>

          <a href="#" className="footer-item">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Settings</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainPage;