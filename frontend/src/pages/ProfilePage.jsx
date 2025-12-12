import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock User Data
  const [user, setUser] = useState({
    fullName: "Mehmet Yılmaz",
    email: "mehmet.yilmaz@itu.edu.tr",
    studentId: "150210123",
    role: "Undergraduate",
    department: "Computer Engineering",
    phone: "+90 555 123 4567",
    memberSince: "September 2022",
    avatarUrl: null
  });

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotif: true,
    webNotif: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-container dark">
      {/* Header */}
      <header className="profile-header-nav">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/')}>Find a Space</button>
            <button className="nav-link" onClick={() => navigate('/bookings')}>My Bookings</button>
          </div>
          
          <div className="user-avatar-small">
            <span className="material-symbols-outlined">person</span>
          </div>

          {/* Hamburger Button */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined" style={{fontSize: '28px'}}>menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => navigate('/')} className="nav-link" style={{textAlign:'left'}}>Find a Space</button>
        <button className="nav-link" style={{textAlign:'left', color:'white'}}>My Bookings</button>
      </div>

      {/* Main Content */}
      <main className="profile-main">
        <div className="content-wrapper">
          
          <h1 className="page-title">My Profile</h1>

          <div className="profile-grid">
            
            {/* Left Column: Summary Card */}
            <aside>
              <div className="profile-card">
                <div className="profile-summary">
                  <div className="avatar-large">
                    <span className="material-symbols-outlined" style={{fontSize: '64px'}}>person</span>
                    <button className="camera-btn">
                      <span className="material-symbols-outlined" style={{fontSize: '20px'}}>camera_alt</span>
                    </button>
                  </div>
                  <h2 className="user-name">{user.fullName}</h2>
                  <p className="user-role">Student</p>
                  <p className="user-status">Active</p>
                </div>
                
                <div className="member-since">
                  <p className="label-text">Member Since</p>
                  <p className="value-text">{user.memberSince}</p>
                </div>
              </div>
            </aside>

            {/* Right Column: Details */}
            <section className="content-column">
              
              {/* Personal Information */}
              <div className="info-section">
                <div className="section-header">
                  <h3 className="section-title">Personal Information</h3>
                  {!isEditing && (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                      <span className="material-symbols-outlined" style={{fontSize: '16px'}}>edit</span> Edit
                    </button>
                  )}
                </div>

                <div className="info-grid">
                  <div className="input-group">
                    <label className="label-text">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      className="profile-input" 
                      value={user.fullName}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    />
                  </div>

                  <div className="input-group">
                    <label className="label-text">Email</label>
                    <input 
                      type="email" 
                      className="profile-input" 
                      value={user.email}
                      readOnly
                      disabled
                    />
                    <p className="helper-text">Email cannot be changed</p>
                  </div>

                  <div className="input-group">
                    <label className="label-text">Student Number</label>
                    <input 
                      type="text" 
                      className="profile-input" 
                      value={user.studentId}
                      readOnly
                      disabled
                    />
                    <p className="helper-text">Student number cannot be changed</p>
                  </div>

                  <div className="input-group">
                    <label className="label-text">Phone Number</label>
                    <div className="phone-wrapper">
                      <input 
                        type="tel" 
                        name="phone"
                        className="profile-input" 
                        value={user.phone}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        style={{paddingRight: '32px'}}
                      />
                      {isEditing && (
                        <button className="phone-edit-icon">
                          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>edit</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="label-text">Role</label>
                    <input type="text" className="profile-input" value={user.role} readOnly disabled />
                  </div>

                  <div className="input-group">
                    <label className="label-text">Department</label>
                    <input type="text" className="profile-input" value={user.department} readOnly disabled />
                  </div>
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="info-section">
                <div className="section-header">
                  <h3 className="section-title">Contact Preferences</h3>
                </div>
                
                <div className="pref-row">
                  <div>
                    <p className="value-text" style={{fontWeight: 500}}>Email Notifications</p>
                    <p className="helper-text">Receive notifications about booking confirmations</p>
                  </div>
                  <label className="toggle-label">
                    <input 
                      type="checkbox" 
                      checked={preferences.emailNotif}
                      onChange={() => handleToggle('emailNotif')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="pref-row">
                  <div>
                    <p className="value-text" style={{fontWeight: 500}}>Web Notifications</p>
                    <p className="helper-text">Receive browser notifications for updates</p>
                  </div>
                  <label className="toggle-label">
                    <input 
                      type="checkbox" 
                      checked={preferences.webNotif}
                      onChange={() => handleToggle('webNotif')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {/* Security */}
              <div className="info-section">
                <div className="section-header">
                  <h3 className="section-title">Security</h3>
                  <button className="edit-btn">
                    <span className="material-symbols-outlined" style={{fontSize: '16px'}}>lock</span> Change Password
                  </button>
                </div>
                
                <div className="security-status">
                  <span className="material-symbols-outlined check-icon">check_circle</span>
                  <div>
                    <p className="value-text" style={{fontWeight: 500}}>Password Last Changed</p>
                    <p className="helper-text">3 months ago</p>
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div className="info-section delete-section">
                <div className="pref-row">
                  <div>
                    <p className="delete-title">Delete Account</p>
                    <p className="helper-text">Once deleted, there is no going back. Please be certain.</p>
                  </div>
                  <button className="delete-btn" onClick={() => alert("Delete Account Clicked")}>
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Save Buttons */}
              {isEditing && (
                <div className="action-footer">
                  <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button className="btn-save" onClick={handleSave}>Save Changes</button>
                </div>
              )}

            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;