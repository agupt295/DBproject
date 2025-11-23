import React from 'react';
import './CSS/jobCard.css';
import {
  JobPosting,
  getCompanyName,
  getCompanyColor,
  getCompanyIndustry,
  getDaysAgo,
  formatSalary,
  getMatchPercentage,
  hasGrowthOpportunities,
  hasH1BSponsorship
} from '../MockData/JobPosting';

interface JobCardProps {
  job: JobPosting;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const companyName = getCompanyName(job.company_id);
  const companyColor = getCompanyColor(job.company_id);
  const companyIndustry = getCompanyIndustry(job.company_id);
  const daysAgo = getDaysAgo(job.posted_date);
  const salaryRange = formatSalary(job.salary_min, job.salary_max);
  const matchPercentage = getMatchPercentage(job.job_id);
  const hasGrowth = hasGrowthOpportunities(job.company_id);
  const hasH1B = hasH1BSponsorship(job.company_id);

  // Get company initials for logo
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-left">
          <div className="company-logo" style={{ backgroundColor: companyColor }}>
            <span>{getInitials(companyName)}</span>
          </div>

          <div className="job-info">
            <div className="job-meta">
              <span className="job-posted">{daysAgo}</span>
              <span className="job-alumni">5 school alumni work here</span>
            </div>

            <h3 className="job-title">{job.job_title}</h3>

            <br/>

            <div className="company-info">
              <span className="company-name">{companyName}</span>
              <span className="company-divider">/</span>
              <span className="company-industry">{companyIndustry}</span>
            </div>

            <div className="job-details">
              <div className="job-detail-item">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{job.location}</span>
              </div>

              <div className="job-detail-item">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span>{job.status}</span>
              </div>

              <div className="job-detail-item">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Onsite</span>
              </div>
            </div>

            <div className="job-details">
              <div className="job-detail-item">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{job.experience_level}</span>
              </div>

              <div className="job-detail-item salary">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span>{salaryRange}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="job-card-right">
          <div className="match-score">
            <div className="match-circle">
              <svg viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#00D4AA"
                  strokeWidth="8"
                  strokeDasharray={`${(matchPercentage / 100) * 326.73} 326.73`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  fontSize="28"
                  fontWeight="700"
                  fill="#000"
                >
                  {matchPercentage}%
                </text>
              </svg>
            </div>
            <div className="match-label">STRONG MATCH</div>

            {hasGrowth && (
              <div className="match-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                <span>Growth Opportunities</span>
              </div>
            )}

            {hasH1B && (
              <div className="match-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>H1B Sponsor Likely</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="job-card-footer">
        <button className="action-button hide-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
          </svg>
        </button>

        <button className="action-button save-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <button className="action-button ask-orion-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          ASK ORION
        </button>

        <button className="action-button apply-button">
          APPLY NOW
        </button>
      </div>
    </div>
  );
};

export default JobCard;