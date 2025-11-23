import React, { useState } from 'react';
import '../../CSS/profile.css'
import {
  UserProfile,
  CandidateSkill,
  Skill,
  mockUserProfile,
  mockCandidateSkills,
  proficiencyLevels,
  formatDate,
  getAvailableSkills
} from '../../../MockData/Profile';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [candidateSkills, setCandidateSkills] = useState<CandidateSkill[]>(mockCandidateSkills);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockUserProfile);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  
  // New skill form state
  const [newSkill, setNewSkill] = useState({
    skill_id: 0,
    years_experience: 0,
    proficiency_level: 'Beginner'
  });

  // Handle profile edit
  const handleEditProfile = () => {
    setEditedProfile(profile);
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditingProfile(false);
  };

  const handleSaveProfile = () => {
    // TODO: API call to update profile
    setProfile(editedProfile);
    setIsEditingProfile(false);
    console.log('Saving profile:', editedProfile);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  // Handle skill operations
  const handleAddSkill = () => {
    setIsAddingSkill(true);
    setNewSkill({
      skill_id: 0,
      years_experience: 0,
      proficiency_level: 'Beginner'
    });
  };

  const handleSaveNewSkill = () => {
    if (newSkill.skill_id === 0) {
      alert('Please select a skill');
      return;
    }

    const skill = getAvailableSkills(candidateSkills).find(s => s.skill_id === newSkill.skill_id);
    
    const candidateSkill: CandidateSkill = {
      jobseeker_id: profile.jobseeker_id,
      skill_id: newSkill.skill_id,
      years_experience: newSkill.years_experience,
      proficiency_level: newSkill.proficiency_level,
      skill: skill
    };

    // TODO: API call to add skill
    setCandidateSkills([...candidateSkills, candidateSkill]);
    setIsAddingSkill(false);
    console.log('Adding skill:', candidateSkill);
  };

  const handleUpdateSkill = (skillId: number, field: 'years_experience' | 'proficiency_level', value: number | string) => {
    setCandidateSkills(candidateSkills.map(cs => 
      cs.skill_id === skillId ? { ...cs, [field]: value } : cs
    ));
    // TODO: API call to update skill
    console.log('Updating skill:', skillId, field, value);
  };

  const handleDeleteSkill = (skillId: number) => {
    if (window.confirm('Are you sure you want to remove this skill?')) {
      setCandidateSkills(candidateSkills.filter(cs => cs.skill_id !== skillId));
      // TODO: API call to delete skill
      console.log('Deleting skill:', skillId);
    }
  };

  const availableSkills = getAvailableSkills(candidateSkills);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-role">{profile.current_role}</p>
            <p className="profile-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {profile.location}
            </p>
          </div>
        </div>
        <div className="profile-meta">
          <span className="member-since">Member since {formatDate(profile.created_at)}</span>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="profile-section">
        <div className="section-header">
          <h2 className="section-title">Personal Information</h2>
          {!isEditingProfile ? (
            <button onClick={handleEditProfile} className="edit-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
              <button onClick={handleSaveProfile} className="save-button">Save Changes</button>
            </div>
          )}
        </div>

        <div className="info-grid">
          <div className="info-column info-column-left">
            <div className="info-item">
              {isEditingProfile ? (
                <>
                  <label className="info-label">Full Name</label>
                  <input
                    type="text"
                    className="info-input"
                    value={editedProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </>
              ) : (
                <div className="info-row">
                  <span className="info-label-inline">Full Name:</span>
                  <span className="info-value-inline">{profile.name}</span>
                </div>
              )}
            </div>

            <div className="info-item">
              {isEditingProfile ? (
                <>
                  <label className="info-label">Email Address</label>
                  <input
                    type="email"
                    className="info-input"
                    value={editedProfile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </>
              ) : (
                <div className="info-row">
                  <span className="info-label-inline">Email Address:</span>
                  <span className="info-value-inline">{profile.email}</span>
                </div>
              )}
            </div>

            <div className="info-item">
              {isEditingProfile ? (
                <>
                  <label className="info-label">Phone Number</label>
                  <input
                    type="tel"
                    className="info-input"
                    value={editedProfile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </>
              ) : (
                <div className="info-row">
                  <span className="info-label-inline">Phone Number:</span>
                  <span className="info-value-inline">{profile.phone}</span>
                </div>
              )}
            </div>

            <div className="info-item">
              {isEditingProfile ? (
                <>
                  <label className="info-label">Location</label>
                  <input
                    type="text"
                    className="info-input"
                    value={editedProfile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                  />
                </>
              ) : (
                <div className="info-row">
                  <span className="info-label-inline">Location:</span>
                  <span className="info-value-inline">{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="info-column info-column-right">
            <div className="info-item">
              {isEditingProfile ? (
                <>
                  <label className="info-label">Education</label>
                  <textarea
                    className="info-textarea"
                    rows={4}
                    value={editedProfile.education}
                    onChange={(e) => handleProfileChange('education', e.target.value)}
                  />
                </>
              ) : (
                <div className="info-row">
                  <span className="info-label-inline">Education:</span>
                  <span className="info-value-inline">{profile.education}</span>
                </div>
              )}
            </div>

            <div className="info-item">
              {isEditingProfile ? (
                <>
                  <label className="info-label">Current Role</label>
                  <textarea
                    className="info-textarea"
                    rows={4}
                    value={editedProfile.current_role}
                    onChange={(e) => handleProfileChange('current_role', e.target.value)}
                  />
                </>
              ) : (
                <div className="info-row">
                  <span className="info-label-inline">Current Role:</span>
                  <span className="info-value-inline">{profile.current_role}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="profile-section">
        <div className="section-header">
          <h2 className="section-title">Skills & Expertise</h2>
          {!isAddingSkill && (
            <button onClick={handleAddSkill} className="add-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Skill
            </button>
          )}
        </div>

        {/* Add New Skill Form */}
        {isAddingSkill && (
          <div className="add-skill-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Select Skill</label>
                <select
                  className="form-select"
                  value={newSkill.skill_id}
                  onChange={(e) => setNewSkill({ ...newSkill, skill_id: parseInt(e.target.value) })}
                >
                  <option value={0}>Choose a skill...</option>
                  {availableSkills.map(skill => (
                    <option key={skill.skill_id} value={skill.skill_id}>
                      {skill.skill_name} ({skill.skill_category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  max="50"
                  value={newSkill.years_experience}
                  onChange={(e) => setNewSkill({ ...newSkill, years_experience: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Proficiency Level</label>
                <select
                  className="form-select"
                  value={newSkill.proficiency_level}
                  onChange={(e) => setNewSkill({ ...newSkill, proficiency_level: e.target.value })}
                >
                  {proficiencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button onClick={() => setIsAddingSkill(false)} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleSaveNewSkill} className="save-button">
                Add Skill
              </button>
            </div>
          </div>
        )}

        {/* Skills List */}
        <div className="skills-list">
          {candidateSkills.length === 0 ? (
            <p className="empty-message">No skills added yet. Click "Add Skill" to get started!</p>
          ) : (
            candidateSkills.map((cs) => (
              <div key={cs.skill_id} className="skill-card">
                <div className="skill-header">
                  <div className="skill-info">
                    <h3 className="skill-name">{cs.skill?.skill_name}</h3>
                    <span className="skill-category">{cs.skill?.skill_category}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(cs.skill_id)}
                    className="delete-skill-button"
                    title="Remove skill"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>

                <div className="skill-details">
                  <div className="skill-detail-item">
                    <label className="skill-label">Years of Experience</label>
                    {editingSkillId === cs.skill_id ? (
                      <input
                        type="number"
                        className="skill-input"
                        min="0"
                        max="50"
                        value={cs.years_experience}
                        onChange={(e) => handleUpdateSkill(cs.skill_id, 'years_experience', parseInt(e.target.value) || 0)}
                        onBlur={() => setEditingSkillId(null)}
                        autoFocus
                      />
                    ) : (
                      <div
                        className="skill-value clickable"
                        onClick={() => setEditingSkillId(cs.skill_id)}
                      >
                        {cs.years_experience} {cs.years_experience === 1 ? 'year' : 'years'}
                      </div>
                    )}
                  </div>

                  <div className="skill-detail-item">
                    <label className="skill-label">Proficiency Level</label>
                    <select
                      className="skill-select"
                      value={cs.proficiency_level}
                      onChange={(e) => handleUpdateSkill(cs.skill_id, 'proficiency_level', e.target.value)}
                    >
                      {proficiencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Proficiency Badge */}
                <div className="proficiency-badge-container">
                  <span className={`proficiency-badge ${cs.proficiency_level.toLowerCase()}`}>
                    {cs.proficiency_level}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;