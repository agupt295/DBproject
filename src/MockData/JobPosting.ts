export interface JobPosting {
  job_id: number;
  company_id: number;
  cluster_id: number;
  job_description: string;
  posted_date: string;
  job_title: string;
  location: string;
  salary_min: number;
  salary_max: number;
  experience_level: string;
  status: string;
  application_link: string;
}

export const mockJobPostings: JobPosting[] = [
  {
    job_id: 1,
    company_id: 101,
    cluster_id: 1,
    job_description: "We are seeking a talented Graduate Software Engineer to join our trading technology team. You will work on high-performance systems that power our global trading operations.",
    posted_date: "2025-11-22",
    job_title: "Graduate Software Engineer",
    location: "Chicago, IL",
    salary_min: 175000,
    salary_max: 175000,
    experience_level: "New Grad",
    status: "Full-time",
    application_link: "https://careers.imc.com/apply/graduate-software-engineer"
  },
  {
    job_id: 2,
    company_id: 102,
    cluster_id: 1,
    job_description: "Join Amazon's Delivery team to build scalable database solutions that handle millions of transactions daily. Work with cutting-edge technologies in a fast-paced environment.",
    posted_date: "2025-11-22",
    job_title: "Software Development Engineer – Database 2026 (US)",
    location: "Seattle, WA",
    salary_min: 100000,
    salary_max: 200000,
    experience_level: "Entry Level",
    status: "Full-time",
    application_link: "https://amazon.jobs/en/jobs/2534567/software-development-engineer"
  },
  {
    job_id: 3,
    company_id: 103,
    cluster_id: 2,
    job_description: "The Virtual Expert Platform team is looking for a Software Engineer to help build the next generation of AI-powered tax preparation tools. You'll work on features used by millions of customers.",
    posted_date: "2025-11-21",
    job_title: "Software Engineer I, Virtual Expert Platform (VEP) – Intuit",
    location: "Mountain View, CA",
    salary_min: 0,
    salary_max: 0,
    experience_level: "Entry Level",
    status: "Full-time",
    application_link: "https://jobs.intuit.com/job/mountain-view/software-engineer/27595/65432198"
  },
  {
    job_id: 4,
    company_id: 104,
    cluster_id: 2,
    job_description: "Microsoft is hiring Software Engineers for our Cloud Infrastructure team. You'll design and implement solutions that power Azure services used by millions worldwide.",
    posted_date: "2025-11-21",
    job_title: "Software Engineer - Cloud Infrastructure",
    location: "Redmond, WA",
    salary_min: 120000,
    salary_max: 180000,
    experience_level: "Entry Level",
    status: "Full-time",
    application_link: "https://careers.microsoft.com/apply/software-engineer-cloud"
  },
  {
    job_id: 5,
    company_id: 105,
    cluster_id: 3,
    job_title: "Full Stack Engineer - Early Career",
    job_description: "Join our startup as a Full Stack Engineer! Work on exciting projects using React, Node.js, and AWS. Great opportunity to grow and make an impact.",
    posted_date: "2025-11-20",
    location: "San Francisco, CA",
    salary_min: 110000,
    salary_max: 150000,
    experience_level: "New Grad",
    status: "Full-time",
    application_link: "https://example-startup.com/careers/full-stack-engineer"
  },
  {
    job_id: 6,
    company_id: 106,
    cluster_id: 3,
    job_title: "Backend Software Engineer",
    job_description: "We're looking for a Backend Engineer to join our payments team. Work with Java, Spring Boot, and Kafka to build robust financial systems.",
    posted_date: "2025-11-20",
    location: "New York, NY",
    salary_min: 130000,
    salary_max: 170000,
    experience_level: "0-1 Years",
    status: "Full-time",
    application_link: "https://fintech-company.com/careers/backend-engineer"
  }
];

// Helper function to get company name from company_id
export const getCompanyName = (companyId: number): string => {
  const companyMap: { [key: number]: string } = {
    101: "IMC Trading",
    102: "Amazon",
    103: "Intuit",
    104: "Microsoft",
    105: "TechStartup Inc",
    106: "FinTech Solutions"
  };
  return companyMap[companyId] || "Unknown Company";
};

// Helper function to get company logo/icon color
export const getCompanyColor = (companyId: number): string => {
  const colorMap: { [key: number]: string } = {
    101: "#003d82",
    102: "#FF9900",
    103: "#0077C5",
    104: "#00A4EF",
    105: "#6366F1",
    106: "#8B5CF6"
  };
  return colorMap[companyId] || "#666666";
};

// Helper function to get company industry
export const getCompanyIndustry = (companyId: number): string => {
  const industryMap: { [key: number]: string } = {
    101: "Financial Services",
    102: "Delivery · E-Commerce · Public Company",
    103: "Accounting · Financial Services · Public Company",
    104: "Technology · Public Company",
    105: "Technology · Startup",
    106: "Financial Services · Fintech"
  };
  return industryMap[companyId] || "Technology";
};

// Helper function to calculate days ago
export const getDaysAgo = (postedDate: string): string => {
  const posted = new Date(postedDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - posted.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

// Helper function to format salary range
export const formatSalary = (min: number, max: number): string => {
  if (min === 0 && max === 0) return "Competitive salary";
  
  const formatNumber = (num: number): string => {
    if (num >= 1000) return `$${Math.floor(num / 1000)}K`;
    return `$${num}`;
  };
  
  if (min === max) return `${formatNumber(min)}/yr`;
  return `${formatNumber(min)}/yr - ${formatNumber(max)}/yr`;
};

// Helper function to get match percentage (mock data)
export const getMatchPercentage = (jobId: number): number => {
  // Generate consistent "random" percentage based on job_id
  const percentages = [90, 88, 93, 85, 92, 87];
  return percentages[jobId % percentages.length] || 85;
};

// Helper function to determine if job has growth opportunities
export const hasGrowthOpportunities = (companyId: number): boolean => {
  return [101, 103, 104].includes(companyId);
};

// Helper function to determine if H1B sponsorship is likely
export const hasH1BSponsorship = (companyId: number): boolean => {
  return [101, 102, 103, 104].includes(companyId);
};