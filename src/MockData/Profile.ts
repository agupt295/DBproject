// User Profile Data Structure
export interface UserProfile {
  jobseeker_id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  current_role: string;
}

// Skill Data Structure
export interface Skill {
  skill_id: number;
  skill_name: string;
  skill_category: string;
}

// Candidate Skill Data Structure
export interface CandidateSkill {
  jobseeker_id: number;
  skill_id: number;
  years_experience: number;
  proficiency_level: string;
  skill?: Skill; // Joined data
}

// Mock User Data
export const mockUserProfile: UserProfile = {
  jobseeker_id: 1,
  created_at: '2024-01-15',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  education: 'B.S. Computer Science - Stanford University',
  current_role: 'Senior Software Engineer at Google'
};

// Mock Skills Database
export const mockSkills: Skill[] = [
  { skill_id: 1, skill_name: 'JavaScript', skill_category: 'Programming Language' },
  { skill_id: 2, skill_name: 'Python', skill_category: 'Programming Language' },
  { skill_id: 3, skill_name: 'React', skill_category: 'Frontend Framework' },
  { skill_id: 4, skill_name: 'Node.js', skill_category: 'Backend Framework' },
  { skill_id: 5, skill_name: 'TypeScript', skill_category: 'Programming Language' },
  { skill_id: 6, skill_name: 'SQL', skill_category: 'Database' },
  { skill_id: 7, skill_name: 'MongoDB', skill_category: 'Database' },
  { skill_id: 8, skill_name: 'AWS', skill_category: 'Cloud Platform' },
  { skill_id: 9, skill_name: 'Docker', skill_category: 'DevOps' },
  { skill_id: 10, skill_name: 'Git', skill_category: 'Version Control' },
  { skill_id: 11, skill_name: 'Java', skill_category: 'Programming Language' },
  { skill_id: 12, skill_name: 'C++', skill_category: 'Programming Language' },
  { skill_id: 13, skill_name: 'Angular', skill_category: 'Frontend Framework' },
  { skill_id: 14, skill_name: 'Vue.js', skill_category: 'Frontend Framework' },
  { skill_id: 15, skill_name: 'Django', skill_category: 'Backend Framework' },
];

// Mock Candidate Skills (User's current skills)
export const mockCandidateSkills: CandidateSkill[] = [
  {
    jobseeker_id: 1,
    skill_id: 1,
    years_experience: 5,
    proficiency_level: 'Expert',
    skill: { skill_id: 1, skill_name: 'JavaScript', skill_category: 'Programming Language' }
  },
  {
    jobseeker_id: 1,
    skill_id: 3,
    years_experience: 4,
    proficiency_level: 'Expert',
    skill: { skill_id: 3, skill_name: 'React', skill_category: 'Frontend Framework' }
  },
  {
    jobseeker_id: 1,
    skill_id: 5,
    years_experience: 4,
    proficiency_level: 'Advanced',
    skill: { skill_id: 5, skill_name: 'TypeScript', skill_category: 'Programming Language' }
  },
  {
    jobseeker_id: 1,
    skill_id: 2,
    years_experience: 3,
    proficiency_level: 'Advanced',
    skill: { skill_id: 2, skill_name: 'Python', skill_category: 'Programming Language' }
  },
  {
    jobseeker_id: 1,
    skill_id: 4,
    years_experience: 3,
    proficiency_level: 'Advanced',
    skill: { skill_id: 4, skill_name: 'Node.js', skill_category: 'Backend Framework' }
  },
  {
    jobseeker_id: 1,
    skill_id: 8,
    years_experience: 2,
    proficiency_level: 'Intermediate',
    skill: { skill_id: 8, skill_name: 'AWS', skill_category: 'Cloud Platform' }
  }
];

// Proficiency level options
export const proficiencyLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
];

// Helper function to get skill by ID
export const getSkillById = (skillId: number): Skill | undefined => {
  return mockSkills.find(skill => skill.skill_id === skillId);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Helper function to get available skills (skills not yet added by user)
export const getAvailableSkills = (candidateSkills: CandidateSkill[]): Skill[] => {
  const userSkillIds = candidateSkills.map(cs => cs.skill_id);
  return mockSkills.filter(skill => !userSkillIds.includes(skill.skill_id));
};