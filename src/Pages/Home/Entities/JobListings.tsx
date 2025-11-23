import React from 'react';
import JobCard from '../../../Components/JobCard';
import { mockJobPostings } from '../../../MockData/JobPosting';
import '../../CSS/jobListing.css';

const JobListings: React.FC = () => {
  return (
    <div className="job-listings-container">
      {mockJobPostings.map((job) => (
        <JobCard key={job.job_id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;