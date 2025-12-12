import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookSpacePage.css';

const BookSpacePage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '11:00',
    duration: '1',
    peopleCount: 1,
    purpose: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed for ${formData.date} at ${formData.startTime} for ${formData.peopleCount} people!`);
    navigate('/profile');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="book-container dark">
      <header className="book-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/')}>Find a Space</button>
          </div>
          
          <div className="user-avatar" onClick={() => navigate('/profile')}>
            <span className="material-symbols-outlined">person</span>
          </div>

          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined" style={{fontSize: '28px'}}>menu</span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => navigate('/')} className="nav-link" style={{textAlign:'left'}}>Find a Space</button>
        <button onClick={() => navigate('/profile')} className="nav-link" style={{textAlign:'left'}}>My Bookings</button>
      </div>

      <main className="book-main">
        <div className="content-wrapper">
          
          <div className="page-heading">
            <h1 className="page-title">Book a Study Space</h1>
            <p className="page-subtitle">Complete the form below to reserve your spot.</p>
          </div>

          <div className="summary-card">
            <div className="summary-header">
              <div className="space-info">
                <h3>Mustafa İnan Library - Group Study Room 2</h3>
                <p>Ayazağa Campus • Mustafa İnan Library • Room 204</p>
              </div>
              <div className="availability-badge">
                <div className="badge-dot"></div>
                Available
              </div>
            </div>
            
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label-small">Capacity</span>
                <span className="value-small">25 People</span>
              </div>
              <div className="summary-item">
                <span className="label-small">Campus</span>
                <span className="value-small">Ayazağa</span>
              </div>
              <div className="summary-item">
                <span className="label-small">Building</span>
                <span className="value-small">Mustafa İnan Library</span>
              </div>
              <div className="summary-item">
                <span className="label-small">Room</span>
                <span className="value-small">204</span>
              </div>
            </div>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit} className="booking-form">
              
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">Date</label>
                  <div className="input-wrapper">
                    <span className="material-symbols-outlined input-icon">calendar_today</span>
                    <input 
                      type="date" 
                      name="date"
                      className="book-input" 
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Start Time</label>
                  <div className="input-wrapper">
                    <span className="material-symbols-outlined input-icon">schedule</span>
                    <input 
                      type="time" 
                      name="startTime"
                      className="book-input" 
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">Duration</label>
                  <div className="input-wrapper">
                    <span className="material-symbols-outlined input-icon">timelapse</span>
                    <select 
                      name="duration"
                      className="book-select"
                      value={formData.duration}
                      onChange={handleChange}
                    >
                      <option value="1">1 Hour</option>
                      <option value="2">2 Hours</option>
                      <option value="3">3 Hours</option>
                    </select>
                    <span className="material-symbols-outlined select-arrow">expand_more</span>
                  </div>
                  <p className="helper-text">Maximum booking duration is 3 hours.</p>
                </div>

                <div className="input-group">
                  <label className="input-label">Number of People</label>
                  <div className="input-wrapper">
                    <span className="material-symbols-outlined input-icon">group</span>
                    <input 
                      type="number" 
                      name="peopleCount"
                      className="book-input" 
                      min="1"
                      max="25" 
                      value={formData.peopleCount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <p className="helper-text">Default is 1 person.</p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Purpose (Optional)</label>
                <textarea 
                  name="purpose"
                  className="book-textarea"
                  placeholder="e.g., Project meeting, quiet study session..."
                  value={formData.purpose}
                  onChange={handleChange}
                />
              </div>

              <div className="form-footer">
                <button type="submit" className="btn-confirm">
                  <span className="material-symbols-outlined">check_circle</span>
                  Confirm Booking
                </button>
                <p className="terms-text">By confirming, you agree to the booking terms and conditions.</p>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BookSpacePage;